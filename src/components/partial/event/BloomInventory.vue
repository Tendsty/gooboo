<style scoped>
.upside-down-triangle {
  rotate: 180deg;
}
.hoverable-triangle:hover {
  color: red;
}
.draggable-flower {
  touch-action: none;
}
</style>

<template>
  <div>
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in currencies" :key="`currency-${item}`" class="ma-1" :name="`event_${item}`"></currency>
    </div>
    <div class="d-flex flex-wrap justify-center align-center pa-1">
      <bloom-buy-flower class="ma-1" v-for="item in availableFlowers" :key="`flower-${item}`" :name="item"></bloom-buy-flower>
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_humus" :amount="wildgrowthCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn color="primary" :disabled="humus < wildgrowthCost" @click="useWildgrowth">
                <v-icon class="mr-2">mdi-resize</v-icon>
                {{ $vuetify.lang.t(`$vuetify.event.bloom.wildgrowth`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.bloom.wildGrowth') }}</div>
        </gb-tooltip>
      </div>
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_humus" :amount="boostCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn color="primary" :disabled="humus < boostCost" @click="useBoost">
                <v-icon class="mr-2">mdi-chevron-double-right</v-icon>
                {{ $vuetify.lang.t(`$vuetify.gooboo.boost`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.bloom.boost') }}</div>
        </gb-tooltip>
      </div>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn class="ma-1" :color="isSelling ? 'primary' : 'secondary'" @click="toggleSelling"><v-icon>mdi-cash-register</v-icon></v-btn>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.bloom.sell') }}</div>
      </gb-tooltip>
    </div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <bloom-breeder
        class="ma-1 draggable-flower"
        v-for="(item, key) in breeder"
        :key="'breeder-' + key"
        :id="'bloom-breeder_' + key"
        :slot-id="key"
        :draggable="item"
        @click="sell('breeder_' + key)"
        @dragstart="drag($event, 'breeder_' + key)"
        @drop="drop($event, 'breeder_' + key)"
        @dragover="allowDrop"
        @touchend="touchdrop($event, 'breeder_' + key)"
      ></bloom-breeder>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <bloom-inventory-slot
        class="ma-1 draggable-flower"
        v-for="(item, key) in inventory"
        :key="'inventory-' + key"
        :id="'bloom-inventory_' + key"
        :slot-id="key"
        :draggable="item"
        @click="sell('inventory_' + key)"
        @dragstart="drag($event, 'inventory_' + key)"
        @drop="drop($event, 'inventory_' + key)"
        @dragover="allowDrop"
        @touchend="touchdrop($event, 'inventory_' + key)"
      ></bloom-inventory-slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BLOOM_BOOST_COST, BLOOM_WILDGROWTH_COST, SECONDS_PER_DAY } from '../../../js/constants';
import tick from '../../../js/modules/event/bloom/tick';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import BloomBreeder from './BloomBreeder.vue';
import BloomBuyFlower from './BloomBuyFlower.vue';
import BloomInventorySlot from './BloomInventorySlot.vue';

export default {
  components: { BloomBreeder, BloomInventorySlot, Currency, BloomBuyFlower, PriceTag },
  data: () => ({
    currencies: ['blossom', 'humus', 'bloomToken']
  }),
  computed: {
    ...mapState({
      humus: state => state.currency.event_humus.value
    }),
    isSelling() {
      return this.$store.state.bloom.selling;
    },
    inventory() {
      let arr = [...this.$store.state.bloom.inventory];
      for (let i = 0, n = this.$store.getters['mult/get']('bloomInventorySize') - arr.length; i < n; i++) {
        arr.push(null);
      }
      return arr;
    },
    breeder() {
      let arr = [...this.$store.state.bloom.breeder];
      for (let i = 0, n = this.$store.getters['mult/get']('bloomBreederSize') - arr.length; i < n; i++) {
        arr.push(null);
      }
      return arr;
    },
    availableFlowers() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.bloom.flower)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].use) {
          arr.push(key);
        }
      }
      return arr;
    },
    wildgrowthCost() {
      return BLOOM_WILDGROWTH_COST;
    },
    boostCost() {
      return BLOOM_BOOST_COST;
    }
  },
  methods: {
    drag(ev, id) {
      ev.dataTransfer.setData("text", id);
    },
    drop(ev, id) {
      ev.preventDefault();
      const draggedId = ev.dataTransfer.getData("text");
      if (draggedId !== id) {
        this.$store.dispatch('bloom/moveFlower', {from: draggedId, to: id});
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    touchdrop(ev, draggedId) {
      const elemList = document.elementsFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      if (elemList) {
        const endElem = elemList.find(el => el.id.slice(0, 6) === 'bloom-');
        if (endElem) {
          const endId = endElem.id.slice(6);
          if (draggedId !== endId) {
            this.$store.dispatch('bloom/moveFlower', {from: draggedId, to: endId});
          }
        }
      }
    },
    toggleSelling() {
      this.$store.commit('bloom/updateKey', {key: 'selling', value: !this.isSelling});
    },
    sell(id) {
      if (this.isSelling) {
        this.$store.dispatch('bloom/sellFlower', id);
      }
    },
    useWildgrowth() {
      if (this.humus >= this.wildgrowthCost) {
        this.$store.dispatch('bloom/triggerWildgrowth');
        this.$store.dispatch('currency/spend', {feature: 'event', name: 'humus', amount: this.wildgrowthCost});
      }
    },
    useBoost() {
      if (this.humus >= this.boostCost) {
        tick(SECONDS_PER_DAY);
        this.$store.dispatch('currency/spend', {feature: 'event', name: 'humus', amount: this.boostCost});
      }
    }
  }
}
</script>
