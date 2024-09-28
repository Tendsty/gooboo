<style scoped>
.icon-card-container {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-card-tag {
  position: absolute;
  right: 2px;
  bottom: -2px;
  font-size: 14px;
}
.icon-card-tag-up {
  position: absolute;
  right: 2px;
  top: -2px;
  font-size: 14px;
}
.no-beacon {
  opacity: 0.1;
}
</style>

<template>
  <div class="ma-1">
    <div class="d-flex justify-center align-center ma-1">
      <v-btn icon :disabled="depth <= 1 || isFrozen" @click="depthMin"><v-icon>mdi-skip-backward</v-icon></v-btn>
      <v-btn icon :disabled="depth <= 1 || isFrozen" @click="depthPrev10"><v-icon>mdi-step-backward-2</v-icon></v-btn>
      <v-btn icon :disabled="depth <= 1 || isFrozen" @click="depthPrev"><v-icon>mdi-step-backward</v-icon></v-btn>
      <span class="mx-1">{{ depth }}m</span>
      <v-btn icon :disabled="isDeepest || isFrozen" @click="depthNext"><v-icon>mdi-step-forward</v-icon></v-btn>
      <v-btn icon :disabled="isDeepest || isFrozen" @click="depthNext10"><v-icon>mdi-step-forward-2</v-icon></v-btn>
      <v-btn icon :disabled="isDeepest || isFrozen" @click="depthMax"><v-icon>mdi-skip-forward</v-icon></v-btn>
    </div>
    <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.durability')">
      <template v-slot:activator="{ on, attrs }">
        <div class="ma-1">
          <v-progress-linear color="red" height="25" class="balloon-text-dynamic rounded" v-bind="attrs" v-on="on" :value="durabilityPercent">
            {{ $formatNum(durability) }} / {{ $formatNum(maxDurability) }}
          </v-progress-linear>
        </div>
      </template>
      <div>{{ $vuetify.lang.t('$vuetify.mining.durabilityDescription') }}</div>
      <div>{{ $vuetify.lang.t(`$vuetify.mining.durabilityBreaks.${ currentBreaks === 1 ? 's' : 'p' }`, $formatNum(currentBreaks)) }}</div>
    </gb-tooltip>
    <div class="d-flex flex-wrap">
      <gb-tooltip v-if="toughness > 0" :title-text="$vuetify.lang.t('$vuetify.mining.toughness')">
        <template v-slot:activator="{ on, attrs }">
          <div class="bg-tile-default elevation-2 rounded ma-1 pa-2 flex-grow-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-shield</v-icon>
            <span :class="{'warning--text': currentDamage < toughness && currentDamage > 0, 'error--text': currentDamage <= 0}">{{ $formatNum(toughness) }}</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.toughnessDescription') }}</div>
        <alert-text v-if="currentDamage <= 0" type="error">{{ $vuetify.lang.t('$vuetify.mining.toughnessTooHigh') }}</alert-text>
        <alert-text v-else-if="currentDamage < toughness" type="warning">{{ $vuetify.lang.t('$vuetify.mining.toughnessHigh') }}</alert-text>
        <stat-breakdown :base="baseToughness" name="miningToughness"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.currency.mining_scrap.name')">
        <template v-slot:activator="{ on, attrs }">
          <div class="bg-tile-default elevation-2 rounded ma-1 pa-2 flex-grow-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">{{ currency.mining_scrap.icon }}</v-icon>
            <span :class="{'warning--text': isDeepest}">
              <span v-if="scrapPerSecond === null">-</span>
              <span v-else>{{ $formatNum(scrapPerSecond) }}/s</span>
            </span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.scrapDescription', $formatNum(scrapBreakMult)) }}</div>
        <alert-text v-if="isDeepest" type="warning">{{ $vuetify.lang.t('$vuetify.mining.scrapNotBroken') }}</alert-text>
        <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
        <stat-breakdown :base="baseScrap" name="currencyMiningScrapGain"></stat-breakdown>
        <div>{{ $vuetify.lang.t('$vuetify.mining.gainSummary', $formatNum(scrap), $formatNum(scrapOnBreak), scrapBreakMult, $formatNum(scrapPerSecond !== null ? scrapPerSecond : 0)) }}</div>
      </gb-tooltip>
    </div>
    <div class="d-flex flex-wrap">
      <template v-if="subfeature === 0">
        <gb-tooltip v-for="(item, key, index) in ore" :key="`loot-${ index }`" :title-text="$vuetify.lang.t(`$vuetify.currency.mining_${key}.name`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label class="balloon-text-dynamic ma-1" :class="$vuetify.theme.dark ? 'darken-2' : 'lighten-2'" :color="currency['mining_' + key].color" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">{{ currency['mining_' + key].icon }}</v-icon>
              <span :class="{'warning--text': isDeepest}">
                <span v-if="oreMultPerSecond === null">-</span>
                <span v-else>{{ $formatNum(item.amount * oreMultPerSecond, true) }}/s</span>
              </span>
            </v-chip>
          </template>
          <div v-if="maxTotalDepth <= item.maxDepth">{{ $vuetify.lang.t(`$vuetify.mining.oreDescription.short`, item.minDepth) }}</div>
          <div v-else>{{ $vuetify.lang.t(`$vuetify.mining.oreDescription.long`, item.minDepth, item.maxDepth, item.modulo) }}</div>
          <alert-text v-if="isDeepest" type="warning">{{ $vuetify.lang.t('$vuetify.mining.oreNotBroken') }}</alert-text>
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
          <stat-breakdown :base="item.baseAmount" :name="gainMultName('mining', key)"></stat-breakdown>
          <div>{{ $vuetify.lang.t('$vuetify.mining.gainSummary', $formatNum(item.amount, true), $formatNum(item.amount * oreBreakMult, true), oreBreakMult, $formatNum(item.amount * (oreMultPerSecond !== null ? oreMultPerSecond : 0), true)) }}</div>
        </gb-tooltip>
        <gb-tooltip v-for="(item, key, index) in rareDrops" :key="`loot-${ Object.keys(ore).length + index }`" :title-text="$vuetify.lang.t(`$vuetify.currency.mining_${key}.name`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label class="balloon-text-dynamic ma-1" :class="$vuetify.theme.dark ? 'darken-2' : 'lighten-2'" :color="currency['mining_' + key].color" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">{{ currency['mining_' + key].icon }}</v-icon>
              <span :class="{'warning--text': isDeepest && rareEarthType[key] !== 'hit'}">
                <span v-if="rareEarthType[key] === 'hit'">{{ $formatNum(item, true) }}</span>
                <span v-else-if="rareEarthMultPerSecond === null">-</span>
                <span v-else-if="rareEarthType[key] === 'break'">{{ $formatNum(item, true) }}</span>
                <span v-else>{{ $formatNum(item * rareEarthMultPerSecond, true) }}/s</span>
              </span>
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.mining.rareEarthDescription.${ key }`, rareEarthDepth[key]) }}</div>
          <alert-text v-if="isDeepest && rareEarthType[key] !== 'hit'" type="warning">{{ $vuetify.lang.t('$vuetify.mining.rareEarthNotBroken') }}</alert-text>
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
          <stat-breakdown :base="rareDropBase(key)" :multArray="key === 'granite' ? graniteMult : []" :name="gainMultName('mining', key)"></stat-breakdown>
          <div v-if="rareEarthType[key] === 'hit'">{{ $vuetify.lang.t('$vuetify.mining.gainSummaryHit', $formatNum(item, true)) }}</div>
          <div v-else-if="rareEarthType[key] === 'break'">{{ $vuetify.lang.t('$vuetify.mining.gainSummaryBreak', $formatNum(item, true)) }}</div>
          <div v-else>{{ $vuetify.lang.t('$vuetify.mining.gainSummary', $formatNum(item, true), $formatNum(item * rareEarthBreakMult, true), rareEarthBreakMult, $formatNum(item * (rareEarthMultPerSecond !== null ? rareEarthMultPerSecond : 0), true)) }}</div>
          <alert-text v-if="key === 'coal' || key === 'niter'" type="info">{{ $vuetify.lang.t('$vuetify.mining.rareEarthNotAffected') }}</alert-text>
        </gb-tooltip>
      </template>
      <template v-else-if="subfeature === 1">
        <v-chip v-if="smoke > 0" label class="balloon-text-dynamic ma-1" :class="$vuetify.theme.dark ? 'darken-2' : 'lighten-2'" :color="currency.mining_smoke.color">
          <v-icon class="mr-2">{{ currency.mining_smoke.icon }}</v-icon>
          <span>{{ $formatNum(smoke, true) }}</span>
        </v-chip>
        <template v-if="isDeepest">
          <gb-tooltip v-for="(amount, gas) in gasses" :key="gas" :title-text="$vuetify.lang.t(`$vuetify.currency.mining_${ gas }.name`)">
            <template v-slot:activator="{ on, attrs }">
              <v-chip label class="ma-1" :class="$vuetify.theme.dark ? 'darken-2' : 'lighten-2'" :color="currency[`mining_${gas}`].color" v-bind="attrs" v-on="on">
                <v-icon class="mr-2">{{ currency[`mining_${gas}`].icon }}</v-icon>
                <span>{{ $formatNum(amount) }}</span>
              </v-chip>
            </template>
            <div>
              <span>{{ $vuetify.lang.t(`$vuetify.mining.gasGain.0`) }}</span>
              <span>{{ $formatNum(mult(`currencyMining${ gas.charAt(0).toUpperCase() + gas.slice(1) }Gain`) * 100, true) }}</span>
              <span>{{ $vuetify.lang.t(`$vuetify.mining.gasGain.1`) }}</span>
              <currency-icon :name="`mining_${gas}`"></currency-icon>
              <span>{{ $vuetify.lang.t(`$vuetify.mining.gasGain.2`) }}</span>
              <span>{{ $formatNum(gasLimit(gas)) }}&nbsp;</span>
              <currency-icon :name="`mining_${gas}`"></currency-icon>
              <span>{{ $vuetify.lang.t(`$vuetify.mining.gasGain.3`) }}</span>
            </div>
          </gb-tooltip>
        </template>
      </template>
    </div>
    <alert-text v-if="showScrapHint" class="ma-1" type="info">{{ $vuetify.lang.t('$vuetify.mining.scrapGainHint') }}</alert-text>
    <div class="d-flex justify-space-around mt-8 mt-lg-12">
      <gb-tooltip v-if="unlock.miningPickaxeCrafting.see" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="icon-card-container bg-tile-default elevation-2 rounded" v-bind="attrs" v-on="on">
            <v-icon size="36">mdi-pickaxe</v-icon>
            <span class="icon-card-tag">{{ $formatNum(pickaxePower) }}</span>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.pickaxePower') }}</div>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.damage')">
        <template v-slot:activator="{ on, attrs }">
          <div class="icon-card-container bg-tile-default elevation-2 rounded" v-bind="attrs" v-on="on">
            <v-icon size="36">mdi-bomb</v-icon>
            <span class="icon-card-tag">{{ $formatNum(damage) }}</span>
            <span class="icon-card-tag-up">{{ $formatNum(currentDamage) }}</span>
          </div>
        </template>
        <stat-breakdown :base="pickaxePower" name="miningDamage"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="icon-card-container bg-tile-default elevation-2 rounded" v-bind="attrs" v-on="on">
            <v-icon size="36">mdi-timer-sand</v-icon>
            <v-icon class="icon-card-tag" :color="$vuetify.theme.dark ? 'white' : 'black'" v-if="hitsNeeded === Infinity">mdi-infinity</v-icon>
            <span class="icon-card-tag" v-else>{{ $formatTime(hitsNeeded) }}</span>
            <v-icon class="icon-card-tag-up" :color="$vuetify.theme.dark ? 'white' : 'black'" v-if="currentHitsNeeded === Infinity">mdi-infinity</v-icon>
            <span class="icon-card-tag-up" v-else>{{ $formatTime(currentHitsNeeded) }}</span>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.timeToBreak') }}</div>
      </gb-tooltip>
      <gb-tooltip v-if="canSeeBeacons" :title-text="$vuetify.lang.t(`$vuetify.mining.beacon.${ currentDepthBeacon ? currentDepthBeacon : 'noBeacon' }`)" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="icon-card-container bg-tile-default elevation-2 rounded" style="cursor: pointer;" v-bind="attrs" v-on="on" @click="showBeacons = !showBeacons">
            <v-icon :class="{'no-beacon': currentDepthBeacon === null}" :color="currentDepthBeacon ? beacon[currentDepthBeacon].color : undefined" size="72">mdi-spotlight</v-icon>
          </div>
        </template>
        <div v-if="!currentDepthBeacon" class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.beacon.clickToPlace') }}</div>
        <display-row class="mt-0" v-for="(effect, key) in beaconEffect" :key="`effect-beacon-${ key }`" :type="effect.type" :name="effect.name" :after="effect.value"></display-row>
      </gb-tooltip>
    </div>
    <div v-if="enhancementLevel > 0" class="d-flex justify-center mt-8 mt-lg-12">
      <v-icon class="mr-2">mdi-package-up</v-icon>
      <div>
        <gb-tooltip v-for="(enhancement, name) in enhancements" :key="`enhancement-${ name }`" :title-text="$vuetify.lang.t(`$vuetify.mining.enhancement.${ name }`)">
          <template v-slot:activator="{ on, attrs }">
            <div :class="[`${ currency['mining_' + name].color }--text`, {'text--lighten-2': $vuetify.theme.dark, 'text--darken-2': !$vuetify.theme.dark}]" v-bind="attrs" v-on="on">{{ $vuetify.lang.t(`$vuetify.mining.enhancement.${ name }`) }} {{ $formatRoman(enhancement.level) }}</div>
          </template>
          <display-row class="mt-0" v-for="(effect, key) in enhancement.effect" :key="`effect-${ name }-${ key }`" :type="effect.type" :name="effect.name" :after="effect.value"></display-row>
        </gb-tooltip>
      </div>
    </div>
    <beacon-sector v-if="showBeacons" class="ma-2"></beacon-sector>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { MINING_COAL_DEPTH, MINING_DEEPROCK_DEPTH, MINING_GLOWSHARD_DEPTH, MINING_GRANITE_DEPTH, MINING_NITER_DEPTH, MINING_OBSIDIAN_DEPTH, MINING_ORE_BREAK, MINING_RARE_DROP_BREAK, MINING_SALT_DEPTH, MINING_SCRAP_BREAK, MINING_SULFUR_DEPTH } from '../../../js/constants';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import BeaconSector from './BeaconSector.vue';

export default {
  components: { StatBreakdown, CurrencyIcon, AlertText, DisplayRow, BeaconSector },
  data: () => ({
    rareEarthType: {
      granite: 'both',
      salt: 'both',
      coal: 'break',
      sulfur: 'hit',
      niter: 'break',
      obsidian: 'both',
      deeprock: 'both',
      glowshard: 'hit',
    },
    rareEarthDepth: {
      granite: MINING_GRANITE_DEPTH,
      salt: MINING_SALT_DEPTH,
      coal: MINING_COAL_DEPTH,
      sulfur: MINING_SULFUR_DEPTH,
      niter: MINING_NITER_DEPTH,
      obsidian: MINING_OBSIDIAN_DEPTH,
      deeprock: MINING_DEEPROCK_DEPTH,
      glowshard: MINING_GLOWSHARD_DEPTH,
    },
    showBeacons: false,
  }),
  computed: {
    ...mapState({
      depth: state => state.mining.depth,
      pickaxePower: state => state.mining.pickaxePower,
      durability: state => state.mining.durability,
      currency: state => state.currency,
      ingredientList: state => state.mining.ingredientList,
      unlock: state => state.unlock,
      subfeature: state => state.system.features.mining.currentSubfeature,
      beacon: state => state.mining.beacon,
      isFrozen: state => state.cryolab.mining.active,
    }),
    ...mapGetters({
      damage: 'mining/damage',
      maxDurability: 'mining/currentDurability',
      toughness: 'mining/currentToughness',
      baseToughness: 'mining/currentBaseToughness',
      scrap: 'mining/currentScrap',
      baseScrap: 'mining/currentBaseScrap',
      ore: 'mining/currentOre',
      smoke: 'mining/currentSmoke',
      gasses: 'mining/currentGas',
      gasLimit: 'mining/currentGasLimit',
      hitsNeeded: 'mining/hitsNeeded',
      currentHitsNeeded: 'mining/currentHitsNeeded',
      currentDamage: 'mining/currentDamage',
      mult: 'mult/get',
      gainMultName: 'currency/gainMultName',
      currentBreaks: 'mining/currentBreaks',
      rareDrops: 'mining/rareDrops',
      rareDropBase: 'mining/rareDropBase',
      enhancementLevel: 'mining/enhancementLevel',
      currentDepthBeacon: 'mining/currentDepthBeacon',
    }),
    maxDepth() {
      return this.$store.state.stat[`mining_maxDepth${this.subfeature}`].value;
    },
    maxTotalDepth() {
      return this.$store.state.stat[`mining_maxDepth${this.subfeature}`].total;
    },
    isDeepest() {
      return this.$store.state.mining.depth >= this.maxDepth;
    },
    durabilityPercent() {
      return 100 * this.durability / this.maxDurability;
    },
    scrapBreakMult() {
      return MINING_SCRAP_BREAK + 1;
    },
    oreBreakMult() {
      return MINING_ORE_BREAK + 1;
    },
    rareEarthBreakMult() {
      return MINING_RARE_DROP_BREAK + 1;
    },
    scrapOnBreak() {
      return this.scrap * this.scrapBreakMult;
    },
    scrapPerSecond() {
      if (this.hitsNeeded === Infinity) {
        return null;
      }
      return ((this.hitsNeeded - 1) * this.scrap + this.scrapOnBreak) / this.hitsNeeded;
    },
    oreMultPerSecond() {
      if (this.hitsNeeded === Infinity) {
        return null;
      }
      return (this.hitsNeeded + MINING_ORE_BREAK) / this.hitsNeeded;
    },
    rareEarthMultPerSecond() {
      if (this.hitsNeeded === Infinity) {
        return null;
      }
      return (this.hitsNeeded + MINING_RARE_DROP_BREAK) / this.hitsNeeded;
    },
    graniteMult() {
      const mult = this.$store.getters['mining/graniteBreaksMult'];
      return mult > 1 ? [{name: 'graniteBreaksMult', value: mult}] : [];
    },
    enhancements() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.state.mining.enhancement)) {
        if (elem.level > 0) {
          obj[key] = {...elem, effect: elem.effect.map(eff => {
            return {...eff, value: eff.value(elem.level)};
          })};
        }
      }
      return obj;
    },
    showScrapHint() {
      const maxDepth = this.$store.state.stat.mining_maxDepth0.total;
      return maxDepth >= 5 && maxDepth <= 10;
    },
    canSeeBeacons() {
      return this.$store.getters['mult/get']('miningBeaconPiercing') >= 1;
    },
    beaconEffect() {
      if (this.currentDepthBeacon) {
        const beacon = this.beacon[this.currentDepthBeacon];
        return beacon.effect.map(effect => {
          return {...effect, value: effect.value(beacon.level)};
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    resetDurability() {
      this.$store.commit('mining/updateKey', {key: 'durability', value: this.$store.getters['mining/currentDurability']});
      this.$store.dispatch('mining/applyBeaconEffects');
    },
    depthMin() {
      this.$store.commit('mining/updateKey', {key: 'depth', value: 1});
      this.resetDurability();
    },
    depthPrev() {
      if (this.depth > 1) {
        this.$store.commit('mining/updateKey', {key: 'depth', value: this.depth - 1});
        this.resetDurability();
      }
    },
    depthPrev10() {
      if (this.depth > 1) {
        this.$store.commit('mining/updateKey', {key: 'depth', value: Math.max(this.depth - 10, 1)});
        this.resetDurability();
      }
    },
    depthNext() {
      if (this.depth < this.maxDepth) {
        this.$store.commit('mining/updateKey', {key: 'depth', value: this.depth + 1});
        this.$store.commit('system/updateTutorialKey', {name: 'miningDepth', key: 'completed', value: true});
        this.resetDurability();
      }
    },
    depthNext10() {
      if (this.depth < this.maxDepth) {
        this.$store.commit('mining/updateKey', {key: 'depth', value: Math.min(this.depth + 10, this.maxDepth)});
        this.$store.commit('system/updateTutorialKey', {name: 'miningDepth', key: 'completed', value: true});
        this.resetDurability();
      }
    },
    depthMax() {
      this.$store.commit('mining/updateKey', {key: 'depth', value: this.maxDepth});
      this.$store.commit('system/updateTutorialKey', {name: 'miningDepth', key: 'completed', value: true});
      this.resetDurability();
    }
  }
}
</script>
