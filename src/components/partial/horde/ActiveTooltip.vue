<template>
  <div>
    <div>
      <span v-if="effect.value === null">{{ $vuetify.lang.t(`$vuetify.horde.active.${ effect.type }`) }}</span>
      <template v-else-if="effect.type === 'buff'">
        <div>{{ $vuetify.lang.t(`$vuetify.horde.activeBuffFor`, $formatTime(effect.value)) }}</div>
        <div v-for="(stat, index) in effect.effect" class="d-flex align-center" :key="`effect-${ index }`">
          <v-icon class="mx-1" x-small>mdi-circle-medium</v-icon>
          <display-row class="mt-0" :name="stat.name" :type="stat.type" :after="stat.value"></display-row>
        </div>
      </template>
      <template v-else>
        <template v-if="effect.stat">
          <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ effect.type }.0`) }}</span>
          <mult-name :name="statDisplayName"></mult-name>
          <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ effect.type }.2`) }} </span>
        </template>
        <span v-else>{{ $vuetify.lang.t(`$vuetify.horde.active.${ effect.type }.0`) }} </span>
        <span v-if="['revive', 'divisionShield'].includes(effect.type)">{{ $formatNum(finalValue) }} </span>
        <span v-else-if="['stun', 'silence'].includes(effect.type)">{{ $formatTime(finalValue) }} </span>
        <template v-else-if="['permanentStat', 'gainStat'].includes(effect.type)">
          <span v-if="effect.stat.split('_')[1] === 'mult'">{{ effect.type === 'permanentStat' ? '+' : ''}}{{ $formatNum(finalValue, true) }}x </span>
          <span v-else>+{{ $formatNum(finalValue, true) }} </span>
        </template>
        <span v-else>{{ $formatNum(finalValue * healingMult * 100, true) }}% </span>
        <span v-if="attack !== null && (effect.type === 'poison' || effect.type.substring(0, 6) === 'damage')">({{ $formatNum(finalValue * attack) }}) </span>
        <span v-else-if="health !== null && effect.type === 'heal'">({{ $formatNum(finalValue * healingMult * health) }}) </span>
        <span v-else-if="effect.type === 'bone'"> ({{ $formatNum(finalValue * highestBone) }}) </span>
        <span v-else-if="effect.type === 'blood'"> ({{ $formatNum(finalValue * highestBlood) }}) </span>
        <span v-else-if="effect.type === 'monsterPart'"> ({{ $formatNum(finalValue * highestMonsterPart) }}) </span>
        <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ effect.type }.1`) }}</span>
      </template>
    </div>
    <div v-if="hasBreakdown" class="ml-2 mt-n1">
      <span>({{ $formatNum(effect.value * healingMult * 100, true) }}% base</span>
      <span v-if="effect.str !== undefined">,&nbsp;</span>
      <span class="orange-red--text" :class="`text--${ themeModifier }`" v-if="effect.str !== undefined">+{{ $formatNum(effect.str * healingMult * 100, true) }}% <v-icon size="12" :color="`orange-red ${ themeModifier }`">mdi-arm-flex</v-icon></span>
      <span v-if="effect.int !== undefined">,&nbsp;</span>
      <span class="indigo--text" :class="`text--${ themeModifier }`" v-if="effect.int !== undefined">+{{ $formatNum(effect.int * healingMult * 100, true) }}% <v-icon size="12" :color="`indigo ${ themeModifier }`">mdi-lightbulb-on</v-icon></span>
      <span>)</span>
    </div>
    <div v-if="critEffect > 0" class="ml-2 mt-n1">({{ $vuetify.lang.t(`$vuetify.horde.active.canCrit`, $formatNum(critEffect * 100)) }})</div>
  </div>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import MultName from '../../render/MultName.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { MultName, DisplayRow },
  props: {
    effect: {
      type: Object,
      required: true
    },
    attack: {
      type: Number,
      required: false,
      default: null
    },
    health: {
      type: Number,
      required: false,
      default: null
    },
    isEnemy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    highestBone() {
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.$store.getters['horde/enemyBone'](this.$store.state.stat.horde_maxZone.value, 0));
    },
    highestBlood() {
      return this.$store.getters['mult/get']('currencyHordeBloodGain', this.$store.getters['horde/enemyBlood'](this.$store.state.stat.horde_maxDifficulty.value, 0));
    },
    highestMonsterPart() {
      return this.$store.getters['mult/get']('currencyHordeMonsterPartGain', this.$store.getters['horde/enemyMonsterPart'](this.$store.state.stat.horde_maxZone.value, 0));
    },
    finalValue() {
      let value = this.effect.value;
      if (this.effect.str !== undefined) {
        value += this.effect.str * this.$store.state.horde.cachePlayerStats.strength;
      }
      if (this.effect.int !== undefined) {
        value += this.effect.int * this.$store.state.horde.cachePlayerStats.intelligence;
      }
      return value;
    },
    hasBreakdown() {
      return this.$store.state.unlock.hordeClassesSubfeature.see && (this.effect.str !== undefined || this.effect.int !== undefined);
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-3' : 'darken-2';
    },
    critEffect() {
      return this.effect.canCrit ?? 0;
    },
    healingMult() {
      return this.effect.type === 'heal' && !this.isEnemy ? this.$store.state.horde.cachePlayerStats.healing : 1;
    },
    statDisplayName() {
      if (this.effect.stat) {
        if (this.effect.type === 'permanentStat') {
          return this.effect.stat.split('_')[0];
        } else if (this.effect.type === 'gainStat') {
          return 'horde' + capitalize(this.effect.stat.split('_')[0]);
        }
      }
      return null;
    }
  }
}
</script>
