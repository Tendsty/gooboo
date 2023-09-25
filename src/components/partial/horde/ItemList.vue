<style scoped>
.horde-item-pagination {
  position: sticky;
  z-index: 2;
  top: 0;
}
.horde-item-pagination-mobile {
  top: 104px;
}
</style>

<template>
  <div>
    <div class="ma-2 d-flex justify-center">
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.hordeMaxItems`)">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ itemsEquipped }} / {{ maxItems }} {{ $vuetify.lang.t(`$vuetify.horde.itemsEquipped`) }}</span>
        </template>
        <stat-breakdown name="hordeMaxItems"></stat-breakdown>
      </gb-tooltip>
    </div>
    <div class="horde-item-pagination text-center bg-tile-default rounded-b elevation-2 mx-2" :class="{'horde-item-pagination-mobile': $vuetify.breakpoint.xsOnly}" v-if="pages > 1">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
    <item v-for="item in finalItems" :key="'item-' + item.name" :name="item.name" :disabled="isFrozen" class="ma-2"></item>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';
import Item from './Item.vue';

export default {
  components: { Item, StatBreakdown },
  data: () => ({
    page: 1,
    cacheKey: 'horde_0_equipment'
  }),
  mounted() {
    const cachePage = this.$store.state.system.cachePage[this.cacheKey];
    if (cachePage !== undefined) {
      this.page = Math.min(Math.max(cachePage, 1), this.pages);
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.horde.active
    }),
    ...mapGetters({
      itemsEquipped: 'horde/itemsEquipped',
      itemsList: 'horde/itemsList'
    }),
    maxItems() {
      return this.$store.getters['mult/get']('hordeMaxItems');
    },
    items() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.itemsList)) {
        arr.push({...elem, name: key});
      }
      return arr;
    },
    finalItems() {
      if (this.itemLimit === null) {
        return this.items;
      }
      return this.items.slice(this.itemLimit * (this.page - 1), this.itemLimit * this.page);
    },
    itemLimit() {
      return this.$store.state.system.settings.performance.items.upgradeListItems.value;
    },
    pages() {
      return this.itemLimit === null ? null : Math.ceil(this.items.length / this.itemLimit);
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
