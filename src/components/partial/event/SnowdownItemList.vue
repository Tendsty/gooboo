<template>
  <div>
    <div class="d-flex justify-center flex-wrap pa-1">
      <snowdown-item owned class="ma-1" v-for="item in itemList" :key="'owned-' + item" :name="item" @click="rerollItem(item)"></snowdown-item>
    </div>
    <div v-if="rewardProducer" class="d-flex justify-center flex-wrap pa-1 mt-4">
      <div class="text-center w-100">{{ $vuetify.lang.t(`$vuetify.event.snowdown.pickProducer`) }}</div>
      <snowdown-item class="ma-1" v-for="item in producerList" :key="'producer-' + item" :name="item" hide-amount @click="getProducer(item)"></snowdown-item>
    </div>
    <div v-if="rewardItem" class="d-flex justify-center flex-wrap pa-1 mt-4">
      <div class="text-center w-100">{{ $vuetify.lang.t(`$vuetify.event.snowdown.pickItem`) }}</div>
      <snowdown-item class="ma-1" v-for="(item, key) in rewardItem" :key="'reward-' + item" :name="item" hide-amount @click="getRewardItem(key)"></snowdown-item>
    </div>
    <div v-if="itemList.length > 0" class="d-flex flex-wrap justify-center align-center pa-1 mt-4">
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_snowball" :amount="rerollCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn :disabled="!rerollMode && (rewardItem !== null || snowball < rerollCost)" @click="toggleRerollMode" :color="rerollMode ? 'primary' : 'secondary'">
                <v-icon class="mr-2">mdi-refresh</v-icon>
                {{ $vuetify.lang.t(`$vuetify.event.snowdown.reroll`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.rerollDescription') }}</div>
        </gb-tooltip>
      </div>
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_snow" :amount="itemSnowCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn :disabled="rewardItem !== null || snow < itemSnowCost" @click="buySnowItem" color="primary">
                <v-icon class="mr-2">mdi-plus</v-icon>
                {{ $vuetify.lang.t(`$vuetify.event.snowdown.buyItem`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.buyItemDescription') }}</div>
        </gb-tooltip>
      </div>
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="gem_topaz" :amount="itemTopazCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn :disabled="rewardItem !== null || topaz < itemTopazCost" @click="buyTopazItem" color="primary">
                <v-icon class="mr-2">mdi-plus</v-icon>
                {{ $vuetify.lang.t(`$vuetify.event.snowdown.buyItem`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.buyItemDescription') }}</div>
        </gb-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { SNOWDOWN_REROLL_COST } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import SnowdownItem from './SnowdownItem.vue';

export default {
  components: { SnowdownItem, PriceTag },
  data: () => ({
    rerollMode: false
  }),
  computed: {
    ...mapState({
      rewardProducer: state => state.snowdown.rewardProducer,
      rewardItem: state => state.snowdown.rewardItem,
      snowball: state => state.currency.event_snowball.value,
      snow: state => state.currency.event_snow.value,
      topaz: state => state.currency.gem_topaz.value,
    }),
    ...mapGetters({
      itemSnowCost: 'snowdown/itemSnowCost',
      itemTopazCost: 'snowdown/itemTopazCost',
    }),
    itemList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.snowdown.item)) {
        if (elem.amount > 0) {
          arr.push(key);
        }
      }
      return arr;
    },
    producerList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.snowdown.item)) {
        if (elem.type === 'producer') {
          arr.push(key);
        }
      }
      return arr;
    },
    rerollCost() {
      return SNOWDOWN_REROLL_COST;
    }
  },
  methods: {
    getProducer(name) {
      this.$store.dispatch('snowdown/getProducer', name);
    },
    getRewardItem(index) {
      this.$store.dispatch('snowdown/getRewardItem', index);
    },
    toggleRerollMode() {
      this.rerollMode = !this.rerollMode;
    },
    rerollItem(name) {
      if (this.rerollMode && this.snowball >= this.rerollCost && this.rewardItem === null && this.$store.state.snowdown.item[name].type !== 'producer') {
        this.$store.dispatch('snowdown/rerollItem', name);
        this.rerollMode = false;
      }
    },
    buySnowItem() {
      if (this.snow >= this.itemSnowCost && this.rewardItem === null) {
        this.$store.dispatch('snowdown/buySnowItem');
      }
    },
    buyTopazItem() {
      if (this.topaz >= this.itemTopazCost && this.rewardItem === null) {
        this.$store.dispatch('snowdown/buyTopazItem');
      }
    }
  }
}
</script>
