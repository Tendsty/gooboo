<style scoped>
.opacity-half {
  opacity: 0.5;
}
</style>

<template>
  <div>
    <div class="d-flex justify-end mb-1 mt-n2" style="min-height: 32px;">
      <gb-tooltip key="status-division-shield" v-if="maxDivisionShield > 0 || divisionShield > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeDivisionShield')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`pale-blue ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-circle-half-full</v-icon>{{ $formatNum(divisionShield) }}</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.divisionShieldDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeDivisionShield"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-revive" v-if="maxRevive > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeRevive')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`pale-yellow ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-compass-rose</v-icon>{{ $formatNum(revive) }}</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.reviveDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeRevive"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-recovery" v-if="recovery > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeRecovery')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`pink ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-heart-plus</v-icon>{{ $formatNum(recovery * 100, true) }}%</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.recoveryDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeRecovery"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-defense" v-if="defense > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeDefense')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`dark-blue ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-shield</v-icon>{{ $formatNum(defense * 100, true) }}%</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.defenseDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeDefense"></stat-breakdown>
      </gb-tooltip>
    </div>
    <slot name="between"></slot>
    <div class="d-flex flex-wrap my-1 mx-n1">
      <gb-tooltip key="status-attack" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeAttack')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`red ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-sword-cross</v-icon>{{ $formatNum(attack) }}</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.attackDescription') }}</div>
        <div>
          <span>{{ $vuetify.lang.t('$vuetify.horde.attackConversion.text') }}</span>
          <span v-for="(amount, type, index) in damageDistribution" :key="`damage-distribution-${ type }`">{{ index > 0 ? ', ' : '' }}{{ $vuetify.lang.t(`$vuetify.horde.attackConversion.${ type }`, $formatNum(amount * 100, true)) }}</span>
        </div>
        <div v-if="isPlayer && strength > 0">{{ $vuetify.lang.t('$vuetify.horde.attackConversion.strengthAmp', $formatNum(strengthAmp * 100), $formatNum(strengthAmp * 100 * strength), $formatNum(attack * (strengthAmp * strength + 1))) }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeAttack" :base="playerBaseAttack"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-first-strike" v-if="firstStrike > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeFirstStrike')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`pink-purple ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-spear</v-icon>
            <span>{{ $formatNum(firstStrike * 100, true) }}% (</span>
            <v-icon>{{ hits > 0 ? 'mdi-close' : 'mdi-check' }}</v-icon>
            <span>)</span>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.firstStrikeDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeFirstStrike"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-spellblade" v-if="spellblade > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeSpellblade')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`pale-red ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-auto-fix</v-icon>
            <span>{{ $formatNum(spellblade * 100, true) }}% ({{ $formatNum(spells) }})</span>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.spellbladeDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeSpellblade"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-crit" v-if="critChance > 0" :min-width="tooltipWidth">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`orange ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-motion</v-icon>
            {{ $formatNum(critChance * 100) }}%
            <v-icon>mdi-circle-small</v-icon>
            x{{ $formatNum(critMult, true) }}
          </v-chip>
        </template>
        <h3 class="text-center mt-0">{{ $vuetify.lang.t('$vuetify.horde.stat.crit') }}</h3>
        <div>{{ $vuetify.lang.t('$vuetify.horde.critDescription') }}</div>
        <template v-if="isPlayer">
          <h3 class="text-center mt-0">{{ $vuetify.lang.t('$vuetify.mult.hordeCritChance') }}</h3>
          <stat-breakdown name="hordeCritChance"></stat-breakdown>
          <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.hordeCritMult') }}</h3>
          <stat-breakdown name="hordeCritMult"></stat-breakdown>
        </template>
      </gb-tooltip>
      <gb-tooltip key="status-cutting" v-if="cutting > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeCutting')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`brown ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-content-cut</v-icon>{{ $formatNum(cutting * 100, true) }}%</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.cuttingDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeCutting"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-shieldbreak" v-if="shieldbreak > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeShieldbreak')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`teal ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-circle-off-outline</v-icon>{{ $formatNum(shieldbreak) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.shieldbreak`) }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeShieldbreak"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-stun-resist" v-if="stunResist > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeStunResist')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`wooden ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-alert-octagram-outline</v-icon>{{ $formatNum(stunResist) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.stunResist`) }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeStunResist"></stat-breakdown>
        <alert-text v-if="!isPlayer && bossFight === 1" type="info">{{ $vuetify.lang.t(`$vuetify.horde.stunMiniboss`) }}</alert-text>
        <alert-text v-if="!isPlayer && bossFight === 2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.stunBoss`) }}</alert-text>
      </gb-tooltip>
      <gb-tooltip key="status-toxic" v-if="toxic > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeToxic')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`light-green ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-water</v-icon>{{ $formatNum(toxic * 100, true) }}%</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.toxicDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeToxic"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-execute" v-if="execute > 0" :min-width="tooltipWidth" :title-text="$vuetify.lang.t('$vuetify.mult.hordeExecute')">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`pale-red ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-skull</v-icon>{{ $formatNum(execute * 100, true) }}%</v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.executeDescription') }}</div>
        <stat-breakdown v-if="isPlayer" name="hordeExecute"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip key="status-silence" v-if="silence > 0" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`cyan ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-flash-off</v-icon>{{ $formatNum(silence) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.silence${ isPlayer ? 'Player' : 'Enemy' }`) }}</div>
      </gb-tooltip>
      <gb-tooltip key="status-stun" v-if="stun > 0" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`cherry ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-octagram-outline</v-icon>{{ $formatNum(stun) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.stun${ isPlayer ? 'Player' : 'Enemy' }`) }}</div>
      </gb-tooltip>
      <gb-tooltip key="status-poison" v-if="poison > 0" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip label small :color="`lime ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-bottle-tonic-skull</v-icon>{{ $formatNum(poison) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.poison${ isPlayer ? 'Player' : 'Enemy' }`, $formatNum(poison)) }}</div>
      </gb-tooltip>
      <slot></slot>
      <v-spacer></v-spacer>
      <gb-tooltip v-if="canSeeDamageTypes" :title-text="$vuetify.lang.t('$vuetify.horde.damageTypes.title')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="opacity-half" v-bind="attrs" v-on="on">mdi-shape</v-icon>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.damageTypes.description') }}</div>
        <v-simple-table dense>
          <thead>
            <tr>
              <th></th>
              <th class="text-center">{{ $vuetify.lang.t('$vuetify.horde.damageTypes.dealt') }}</th>
              <th class="text-center">{{ $vuetify.lang.t('$vuetify.horde.damageTypes.taken') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(values, type) in damageTypes" :key="`damage-${ type }`">
              <td>{{ $vuetify.lang.t(`$vuetify.horde.damageTypes.${ type }`) }}</td>
              <td class="text-center" :class="{'success--text': values.dealt > 1, 'error--text': values.dealt < 1}">{{ $formatNum(values.dealt * 100, true) }}%</td>
              <td class="text-center" :class="{'success--text': values.taken < 1, 'error--text': values.taken > 1}">{{ $formatNum(values.taken * 100, true) }}%</td>
            </tr>
          </tbody>
        </v-simple-table>
        <alert-text v-if="!isPlayer && bossFight === 1" type="info">{{ $vuetify.lang.t(`$vuetify.horde.minibossBioResist`) }}</alert-text>
        <alert-text v-if="!isPlayer && bossFight === 2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.bossBioResist`) }}</alert-text>
      </gb-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HORDE_DAMAGE_INCREASE_PER_STRENGTH } from '../../../js/constants';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { StatBreakdown, AlertText },
  props: {
    isPlayer: {
      type: Boolean,
      required: true
    },
    revive: {
      type: Number,
      required: true
    },
    maxRevive: {
      type: Number,
      required: true
    },
    attack: {
      type: Number,
      required: true
    },
    critChance: {
      type: Number,
      required: true
    },
    critMult: {
      type: Number,
      required: true
    },
    toxic: {
      type: Number,
      required: true
    },
    firstStrike: {
      type: Number,
      required: true
    },
    spellblade: {
      type: Number,
      required: false,
      default: 0
    },
    cutting: {
      type: Number,
      required: true
    },
    defense: {
      type: Number,
      required: false,
      default: 0
    },
    execute: {
      type: Number,
      required: false,
      default: 0
    },
    divisionShield: {
      type: Number,
      required: false,
      default: 0
    },
    maxDivisionShield: {
      type: Number,
      required: false,
      default: 0
    },
    stunResist: {
      type: Number,
      required: false,
      default: 0
    },
    shieldbreak: {
      type: Number,
      required: false,
      default: 0
    },
    silence: {
      type: Number,
      required: false,
      default: 0
    },
    stun: {
      type: Number,
      required: false,
      default: 0
    },
    poison: {
      type: Number,
      required: false,
      default: 0
    },
    recovery: {
      type: Number,
      required: false,
      default: 0
    },
    physicConversion: {
      type: Number,
      required: true
    },
    physicAttack: {
      type: Number,
      required: true
    },
    physicTaken: {
      type: Number,
      required: true
    },
    magicConversion: {
      type: Number,
      required: true
    },
    magicAttack: {
      type: Number,
      required: true
    },
    magicTaken: {
      type: Number,
      required: true
    },
    bioConversion: {
      type: Number,
      required: true
    },
    bioAttack: {
      type: Number,
      required: true
    },
    bioTaken: {
      type: Number,
      required: true
    },
    hits: {
      type: Number,
      required: false,
      default: 0
    },
    spells: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    ...mapState({
      bossFight: state => state.horde.bossFight,
      canSeeDamageTypes: state => state.unlock.hordeDamageTypes.see,
      strength: state => state.horde.cachePlayerStats.strength
    }),
    tooltipWidth() {
      return this.isPlayer ? undefined : 0;
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'darken-2' : 'lighten-2';
    },
    damageTypes() {
      return {
        physic: {dealt: this.physicAttack, taken: this.physicTaken},
        magic: {dealt: this.magicAttack, taken: this.magicTaken},
        bio: {dealt: this.bioAttack, taken: this.bioTaken}
      };
    },
    damageDistribution() {
      let obj = {};
      const total = this.physicConversion + this.magicConversion + this.bioConversion;
      if (total <= 0) {
        return {};
      }
      ['physic', 'magic', 'bio'].forEach(damageType => {
        const value = this[damageType + 'Conversion'];
        if (value > 0) {
          obj[damageType] = value / total;
        }
      });
      return obj;
    },
    playerBaseAttack() {
      return this.$store.getters['horde/playerBaseStats'].attack;
    },
    strengthAmp() {
      return HORDE_DAMAGE_INCREASE_PER_STRENGTH;
    }
  }
}
</script>
