<style scoped>
.card-count-chip {
  min-width: 64px;
  cursor: pointer;
}
.card-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 16px 16px;
}
.card-panel-no-padding >>> .v-expansion-panel-content__wrap {
  padding: 0 3px 3px;
}
.card-header-reduce-minheight {
  min-height: 32px !important;
}
</style>

<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <div class="d-flex align-center ma-1" :class="{'flex-wrap justify-end': $vuetify.breakpoint.xsOnly}">
      <v-select data-cy="card-pack-selector" class="ma-1" :class="{'w-100': $vuetify.breakpoint.xsOnly}" outlined hide-details :items="pack" item-value="name" v-model="selectedPack" :label="$vuetify.lang.t(`$vuetify.card.cardPack`)">
        <template v-slot:selection="{ item }"><card-pack :item="item"></card-pack></template>
        <template v-slot:item="{ item }"><card-pack :item="item"></card-pack></template>
      </v-select>
      <v-btn small class="ma-1" color="primary" :disabled="!canBuyPack" @click="buyPack(true)">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <v-btn class="ma-1" color="primary" :disabled="!canBuyPack" @click="buyPack(false)">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <gb-tooltip v-for="(item, key) in unlockedFeature" :key="`feature-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.feature.${ key }`) + $vuetify.lang.t(`$vuetify.card.cardsSuffix`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="ma-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <span>{{ item.amount }}</span>
          </v-chip>
        </template>
        <display-row class="mt-0" v-for="subitem in item.reward" :key="`stat-${ key }-${ subitem.name }`" :name="subitem.name" :type="subitem.type" :after="subitem.value(item.amount)"></display-row>
      </gb-tooltip>
    </div>
    <div class="ma-2">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(coll, key) in collection" :key="'collection-' + key">
          <v-expansion-panel-header :class="{'pa-2 card-header-reduce-minheight': $vuetify.breakpoint.xsOnly}">
            <v-chip v-if="coll.cacheCards < coll.cards.length" class="card-count-chip justify-center flex-grow-0 mr-2 px-2" label small>{{ coll.cacheCards }} / {{ coll.cards.length }}</v-chip>
            <v-chip v-else class="card-count-chip justify-center flex-grow-0 mr-2 px-2" color="orange" label small><v-icon class="mr-2">mdi-crown</v-icon>{{ coll.cards.length }}</v-chip>
            {{ $vuetify.lang.t(`$vuetify.card.collection.${key}`) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="card-panel-content" :class="{'card-panel-no-padding': $vuetify.breakpoint.xsOnly}">
            <div class="ml-1">{{ $vuetify.lang.t(`$vuetify.card.fullCollectionReward`) }}:</div>
            <div class="d-flex align-center ml-1" v-for="(reward, rkey) in coll.reward" :key="'reward-' + key + '-' + rkey">
              <v-icon>mdi-circle-small</v-icon>
              <mult-name :name="reward.name"></mult-name>:&nbsp;
              <mult-stat :mult="reward.name" :type="reward.type" :value="reward.value"></mult-stat>
            </div>
            <div class="d-flex mx-n1 mb-n1 mt-3 flex-wrap">
              <card-item v-for="item in coll.cards" :key="item" :id="item"></card-item>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardItem from '../partial/card/CardItem.vue';
import CardPack from '../partial/card/CardPack.vue';
import MultStat from '../partial/render/MultStat.vue';
import DisplayRow from '../partial/upgrade/DisplayRow.vue';
import MultName from '../render/MultName.vue';

export default {
  components: { CardItem, MultStat, CardPack, MultName, DisplayRow },
  data: () => ({
    selectedPack: null
  }),
  computed: {
    ...mapState({
      feature: state => state.card.feature,
      unlock: state => state.unlock,
      packList: state => state.card.pack
    }),
    collection() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.state.card.collection)) {
        if (elem.cacheCards > 0) {
          obj[key] = elem;
        }
      }
      return obj;
    },
    pack() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.packList)) {
        if (elem.price !== null && (elem.unlock === null || this.unlock[elem.unlock].see)) {
          arr.push({...elem, name: key});
        }
      }
      return arr;
    },
    canBuyPack() {
      if (this.selectedPack === null) {
        return false;
      }
      return this.$store.getters['currency/value']('gem_emerald') >= this.packList[this.selectedPack].price;
    },
    unlockedFeature() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.feature)) {
        const unlock = this.$store.state.system.features[key].unlock;
        if (elem.cacheCards > 0 && (unlock === null || this.$store.state.unlock[unlock].see)) {
          obj[key] = {amount: elem.cacheCards, reward: elem.reward, icon: this.$store.state.system.features[key].icon};
        }
      }
      return obj;
    }
  },
  methods: {
    buyPack(max) {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        const maxAfford = max ? Math.floor(this.$store.state.currency.gem_emerald.value / this.packList[this.selectedPack].price) : 1;
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'cardPack',
          name: this.selectedPack,
          price: {gem_emerald: this.packList[this.selectedPack].price * maxAfford},
          amount: maxAfford,
        }});
      } else {
        this.$store.dispatch('card/buyPack', {name: this.selectedPack, notify: true, max});
      }
    }
  }
}
</script>
