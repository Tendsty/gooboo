<style scoped>
.card-count-chip {
  min-width: 72px;
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
    <div class="d-flex flex-wrap align-center ma-1">
      <currency class="ma-1" name="card_shinyDust"></currency>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <gb-tooltip v-for="(item, key) in unlockedFeature" :key="`feature-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.feature.${ key }`) + $vuetify.lang.t(`$vuetify.card.cardsSuffix`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="ma-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <span>{{ item.amount }}</span>
            <span v-if="item.shiny > 0"><v-icon>mdi-circle-small</v-icon><v-icon x-small>mdi-shimmer</v-icon>{{ item.shiny }}</span>
          </v-chip>
        </template>
        <display-row class="mt-0" v-for="subitem in item.reward" :key="`stat-${ key }-${ subitem.name }`" :name="subitem.name" :type="subitem.type" :after="subitem.value(item.amount)"></display-row>
        <template v-if="item.shiny > 0">
          <display-row
            class="mt-0 light-blue--text"
            :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'"
            v-for="subitem in item.shinyReward"
            :key="`shiny-stat-${ key }-${ subitem.name }`"
            :name="subitem.name"
            :type="subitem.type"
            :after="subitem.value(item.shiny)"
          ></display-row>
        </template>
      </gb-tooltip>
    </div>
    <div v-if="canSeeTutorial" class="d-flex justify-center ma-2">
      <alert-text type="info" style="max-width: 600px;">
        <div>
          <div class="mb-2">{{ $vuetify.lang.t(`$vuetify.card.equipTutorial.description`) }}</div>
          <ol>
            <li v-for="i in 5" :key="`equip-tutorial-${ i }`">{{ $vuetify.lang.t(`$vuetify.card.equipTutorial.${ i }`) }}</li>
          </ol>
        </div>
      </alert-text>
    </div>
    <div class="ma-2">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(coll, key) in collection" :key="'collection-' + key">
          <v-expansion-panel-header :class="{'pa-2 card-header-reduce-minheight': $vuetify.breakpoint.xsOnly}">
            <v-chip v-if="coll.cacheCards < coll.cards.length" class="card-count-chip justify-center flex-grow-0 mr-2 px-2" label small>{{ coll.cacheCards }} / {{ coll.cards.length }}</v-chip>
            <v-chip v-else-if="!unlock.cardShiny.see" class="card-count-chip justify-center flex-grow-0 mr-2 px-2" color="orange" label small><v-icon class="mr-2">mdi-crown</v-icon>{{ coll.cards.length }}</v-chip>
            <template v-if="unlock.cardShiny.see">
              <v-chip v-if="coll.cacheShinyCards < coll.cards.length" class="card-count-chip justify-center flex-grow-0 mr-2 px-2" color="dark-blue" label small><v-icon class="mr-2">mdi-shimmer</v-icon>{{ coll.cacheShinyCards }} / {{ coll.cards.length }}</v-chip>
              <v-chip v-else class="card-count-chip justify-center flex-grow-0 mr-2 px-2" color="pale-light-blue" label small><v-icon>mdi-shimmer</v-icon><v-icon class="mr-2">mdi-crown</v-icon>{{ coll.cards.length }}</v-chip>
            </template>
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
import AlertText from '../partial/render/AlertText.vue';
import MultStat from '../partial/render/MultStat.vue';
import DisplayRow from '../partial/upgrade/DisplayRow.vue';
import Currency from '../render/Currency.vue';
import MultName from '../render/MultName.vue';

export default {
  components: { CardItem, MultStat, CardPack, MultName, DisplayRow, AlertText, Currency },
  data: () => ({
    selectedPack: null
  }),
  computed: {
    ...mapState({
      feature: state => state.card.feature,
      unlock: state => state.unlock,
      packList: state => state.card.pack,
      stat: state => state.stat
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
          obj[key] = {amount: elem.cacheCards, shiny: elem.cacheShinyCards, reward: elem.reward, shinyReward: elem.shinyReward, icon: this.$store.state.system.features[key].icon};
        }
      }
      return obj;
    },
    canSeeTutorial() {
      let hasCards = false;
      for (const [, elem] of Object.entries(this.unlockedFeature)) {
        if (elem.amount > 0) {
          hasCards = true;
        }
      }
      return hasCards && this.stat.mining_prestigeCount.total <= 0 && this.stat.village_prestigeCount.total <= 0 && this.stat.horde_prestigeCount.total <= 0;
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
