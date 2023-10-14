<style scoped>
.horde-item-pagination {
  position: sticky;
  z-index: 2;
  top: 0;
}
.horde-item-pagination-mobile {
  top: 104px;
}
.loadout-header-reduce-minheight {
  min-height: 32px !important;
}
</style>

<template>
  <div>
    <div class="ma-2 d-flex justify-center align-center">
      <v-btn small class="mr-3 pa-1" color="beige" min-width="20" min-height="20" style="height: 24px;" @click="toggleLoadouts"><v-icon small>mdi-tray-full</v-icon></v-btn>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.hordeMaxItems`)">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ itemsEquipped }} / {{ maxItems }} {{ $vuetify.lang.t(`$vuetify.horde.itemsEquipped`) }}</span>
        </template>
        <stat-breakdown name="hordeMaxItems"></stat-breakdown>
      </gb-tooltip>
    </div>
    <div class="d-flex flex-column align-center bg-tile-default rounded-b elevation-2 ma-2 pa-1" v-if="showLoadouts">
      <div class="d-flex justify-space-between align-center w-100">
        <v-btn class="ma-1" color="success" @click="addEmptyLoadout">
          <v-icon class="mr-1">mdi-plus</v-icon>
          {{ $vuetify.lang.t(`$vuetify.horde.newLoadout`) }}
        </v-btn>
        <v-btn class="ma-1" color="error" :disabled="itemsBlocked" @click="unequipAll">{{ $vuetify.lang.t(`$vuetify.gooboo.unequipAll`) }}</v-btn>
        <v-btn icon @click="showLoadouts = false"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <div v-if="loadouts.length >= 1" class="ma-1 px-1 w-100">
        <v-expansion-panels accordion>
          <v-expansion-panel v-for="(loadout, key) in loadouts" :key="`loadout-${ key }`">
            <v-expansion-panel-header class="pa-2 loadout-header-reduce-minheight">
              <div class="d-flex align-center">
                <v-badge bottom overlap :content="'' + loadout.content.length"><v-icon>mdi-sack</v-icon></v-badge>
                <div class="ma-1 ml-3">{{ loadout.name }}</div>
              </div>
              <v-spacer></v-spacer>
              <div class="flex-grow-0">
                <v-btn small class="ma-1 pa-1" color="success" min-width="32" min-height="32" :disabled="itemsBlocked || loadout.content.length <= 0" @click.native.stop="equipLoadout(key)"><v-icon>mdi-plus</v-icon></v-btn>
                <v-btn small class="ma-1 pa-1" color="error" min-width="32" min-height="32" :disabled="itemsBlocked || loadout.content.length <= 0" @click.native.stop="unequipLoadout(key)"><v-icon>mdi-minus</v-icon></v-btn>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <equip-loadout :name="key" :key="loadout.id"></equip-loadout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else class="ma-1">{{ $vuetify.lang.t(`$vuetify.horde.noLoadouts`) }}</div>
    </div>
    <div class="horde-item-pagination text-center bg-tile-default rounded-b elevation-2 mx-2" :class="{'horde-item-pagination-mobile': $vuetify.breakpoint.xsOnly}" v-if="pages > 1">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
    <item v-for="item in finalItems" :key="'item-' + item.name" :name="item.name" :disabled="itemsBlocked" :active-disabled="isFrozen" class="ma-2"></item>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';
import EquipLoadout from './EquipLoadout.vue';
import Item from './Item.vue';

export default {
  components: { Item, StatBreakdown, EquipLoadout },
  data: () => ({
    page: 1,
    cacheKey: 'horde_0_equipment',
    showLoadouts: false
  }),
  mounted() {
    const cachePage = this.$store.state.system.cachePage[this.cacheKey];
    if (cachePage !== undefined) {
      this.page = Math.min(Math.max(cachePage, 1), this.pages);
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.horde.active,
      loadouts: state => state.horde.loadout
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
    },
    itemsBlocked() {
      return this.isFrozen || this.$store.state.horde.currentTower !== null;
    }
  },
  methods: {
    toggleLoadouts() {
      this.showLoadouts = !this.showLoadouts;
    },
    unequipAll() {
      this.$store.dispatch('horde/unequipAll');
    },
    addEmptyLoadout() {
      this.$store.commit('horde/addEmptyLoadout');
    },
    equipLoadout(index) {
      this.$store.dispatch('horde/equipLoadout', index);
    },
    unequipLoadout(index) {
      this.$store.dispatch('horde/unequipLoadout', index);
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
