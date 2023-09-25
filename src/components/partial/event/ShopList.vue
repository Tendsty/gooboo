<style scoped>
.upgrade-pagination {
  position: sticky;
  z-index: 2;
  top: 0;
}
.upgrade-pagination-mobile {
  top: 104px;
}
</style>

<template>
  <div v-if="items.length > 0">
    <div class="upgrade-pagination text-center px-2" :class="{'upgrade-pagination-mobile': $vuetify.breakpoint.xsOnly}" v-if="pages > 1">
      <v-pagination class="bg-tile-default rounded-b elevation-2" v-model="page" :length="pages"></v-pagination>
    </div>
    <v-row class="pa-1" no-gutters>
      <v-col class="pa-1" v-for="item in finalItems" :key="item" :cols="cols">
        <shop :pool="pool" :index="item"></shop>
      </v-col>
    </v-row>
  </div>
  <div v-else class="text-center">{{ $vuetify.lang.t(`$vuetify.event.shop.notFound`) }}</div>
</template>

<script>
import Shop from './Shop.vue';

export default {
  components: { Shop },
  props: {
    pool: {
      type: String,
      required: true
    },
    cols: {
      type: Number,
      required: false,
      default: 12
    }
  },
  data: () => ({
    page: 1
  }),
  mounted() {
    const cachePage = this.$store.state.system.cachePage[this.cacheKey];
    if (cachePage !== undefined) {
      this.page = Math.min(Math.max(cachePage, 1), this.pages);
    }
  },
  computed: {
    cacheKey() {
      return this.pool === 'merchant' ? 'shop_merchant' : 'shop_big';
    },
    items() {
      return this.$store.state.event[this.cacheKey].map((e, key) => key);
    },
    finalItems() {
      if (this.upgradeLimit === null) {
        return this.items;
      }
      return this.items.slice(this.upgradeLimit * (this.page - 1), this.upgradeLimit * this.page);
    },
    upgradeLimit() {
      return this.$vuetify.breakpoint.xlOnly ? 12 : this.$store.state.system.settings.performance.items.upgradeListItems.value;
    },
    pages() {
      return this.upgradeLimit === null ? null : Math.ceil(this.items.length / this.upgradeLimit);
    }
  },
  watch: {
    page(newVal) {
      this.$store.commit('system/updateCachePageKey', {key: this.cacheKey, value: newVal});
    },
    pages(newVal) {
      if (this.page > newVal) {
        this.page = Math.max(newVal, 1);
      }
    }
  }
}
</script>
