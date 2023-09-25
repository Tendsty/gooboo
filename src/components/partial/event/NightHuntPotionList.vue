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
      <v-col class="pa-1" v-for="(item, key) in finalItems" :key="key" :cols="cols">
        <night-hunt-potion :name="item"></night-hunt-potion>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NightHuntPotion from './NightHuntPotion.vue';

export default {
  components: { NightHuntPotion },
  props: {
    cols: {
      type: Number,
      required: false,
      default: 12
    }
  },
  data: () => ({
    page: 1,
    cacheKey: 'nighthunt_potion'
  }),
  mounted() {
    const cachePage = this.$store.state.system.cachePage[this.cacheKey];
    if (cachePage !== undefined) {
      this.page = Math.min(Math.max(cachePage, 1), this.pages);
    }
  },
  computed: {
    items() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.nightHunt.potion)) {
        if (elem.level > 0) {
          arr.push(key);
        }
      }
      return arr;
    },
    finalItems() {
      if (this.upgradeLimit === null) {
        return this.items;
      }
      return this.items.slice(this.upgradeLimit * (this.page - 1), this.upgradeLimit * this.page);
    },
    upgradeLimit() {
      return this.$store.state.system.settings.performance.items.upgradeListItems.value;
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
