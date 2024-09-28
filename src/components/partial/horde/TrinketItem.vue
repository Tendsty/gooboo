<template>
  <v-card class="pa-1">
    <v-card-title class="pa-2 pt-0 justify-center">
      <v-icon class="mr-1" :color="trinket.color">{{ trinket.icon }}</v-icon>
      <span :class="`${ trinket.color }--text`">{{ $vuetify.lang.t(`$vuetify.horde.trinket.${ name }`) }}</span>
    </v-card-title>
    <v-card-subtitle class="pa-1 d-flex justify-center align-center">
      <span v-if="trinket.isTimeless">{{ $vuetify.lang.t(`$vuetify.horde.trinket.rarity.timeless`) }}</span>
      <span v-else :class="levelColor ? `${ levelColor }--text` : null">{{ $vuetify.lang.t(`$vuetify.horde.trinket.rarity.${ trinket.level }`) }}</span>
      <template v-if="trinket.level > 0 && !trinket.isTimeless && tillNext !== null">
        <v-icon size="12" class="mx-2">mdi-circle-medium</v-icon>
        <span>{{ $formatNum(trinket.amount) }} / {{ $formatNum(tillNext) }}</span>
      </template>
      <v-icon v-if="gain !== null && tillNext !== null && gain >= (tillNext - trinket.amount)" size="16" class="ml-1" color="success">mdi-arrow-up-circle</v-icon>
    </v-card-subtitle>
    <v-card-text class="px-2 pb-0">
      <display-row class="mt-0" v-for="(item, key) in stats" :key="key" :name="item.name" :type="item.type" :after="item.value"></display-row>
      <template v-if="trinket.activeType !== null">
        <active-cost
          class="mt-0"
          :cooldown="cooldown / hasteMult"
          :cost="activeCost"
        ></active-cost>
        <active-tooltip v-for="(elem, key) in active" :key="`active-effect-${ key }`" class="mt-0" :effect="elem"></active-tooltip>
      </template>
      <alert-text v-if="gain === null && trinket.equipped && trinket.needsEnergy && nextFighterStats.energy === undefined">{{ $vuetify.lang.t(`$vuetify.horde.energyIncompatible`) }}</alert-text>
      <alert-text v-if="gain === null && trinket.equipped && trinket.needsMana && nextFighterStats.mana === undefined">{{ $vuetify.lang.t(`$vuetify.horde.manaIncompatible`) }}</alert-text>
    </v-card-text>
    <v-card-actions v-if="gain === null">
      <v-icon v-if="trinket.isActive">mdi-check</v-icon>
      <v-spacer></v-spacer>
      <v-btn small :color="trinket.equipped ? 'error' : 'primary'" @click="toggleEquipped" :disabled="isFrozen || !trinket.equipped && !canEquip">{{ $vuetify.lang.t(`$vuetify.gooboo.${ trinket.equipped ? 'deselect' : 'select' }`) }}</v-btn>
    </v-card-actions>
    <v-card-actions v-else>
      <div v-if="!trinket.isTimeless">+{{ $formatNum(gain) }}</div>
      <v-spacer></v-spacer>
      <v-btn small color="success" @click="findTrinket">{{ $vuetify.lang.t(`$vuetify.gooboo.take`) }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import ActiveCost from './ActiveCost.vue';
import ActiveTooltip from './ActiveTooltip.vue';

export default {
  components: { DisplayRow, ActiveCost, ActiveTooltip, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    gain: {
      type: Number,
      required: false,
      default: null
    },
    index: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.horde.active,
    }),
    trinket() {
      return this.$store.state.horde.trinket[this.name];
    },
    tillNext() {
      return [...this.$store.state.horde.trinketAmountNeeded, null][this.trinket.level];
    },
    levelColor() {
      return ['grey', null, 'green', 'blue', 'purple', 'orange', 'red', 'yellow', 'cyan', 'pink', 'lime'][this.trinket.level];
    },
    displayLevel() {
      return Math.max(1, Math.min(10, this.trinket.level));
    },
    stats() {
      return this.trinket.effect.map(elem => {
        return {...elem, value: elem.value(this.displayLevel)};
      });
    },
    active() {
      return this.trinket.active(this.displayLevel);
    },
    hasteMult() {
      return this.trinket.activeType === 'combat' ? (this.$store.state.horde.cachePlayerStats.haste * 0.01 + 1) : 1;
    },
    cooldown() {
      return this.trinket.cooldown(this.displayLevel);
    },
    activeCost() {
      return this.trinket.activeCost(this.displayLevel);
    },
    canEquip() {
      return this.$store.getters['horde/trinketsEquipped'] < this.$store.getters['mult/get']('hordeMaxTrinkets');
    },
    nextFighterStats() {
      return this.$store.state.horde.fighterClass[this.$store.state.horde.nextClass].baseStats;
    }
  },
  methods: {
    toggleEquipped() {
      this.$store.commit('horde/updateTrinketKey', {name: this.name, key: 'equipped', value: !this.trinket.equipped});
    },
    findTrinket() {
      this.$store.dispatch('horde/findTrinket', this.index);
    }
  }
}
</script>
