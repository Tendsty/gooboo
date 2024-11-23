<style scoped>
.snowdown-fighter {
  position: relative;
  width: 144px;
  height: 112px;
}
.snowdown-fighter-mobile {
  height: 88px;
}
.snowdown-fighter-text {
  font-size: 10px;
}
.snowdown-fighter-label {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 28px;
  opacity: 0.75;
}
.snowdown-fighter-crit {
  font-size: 36px;
}
.snowdown-fighter-buff {
  font-size: 16px;
}
.snowdown-fighter-stun {
  position: absolute;
  right: 8px;
  top: 2px;
}
.snowdown-fighter-health {
  height: 20px !important;
  font-size: 16px;
}
</style>

<template>
  <div class="snowdown-fighter bg-tile-default d-flex flex-column justify-space-between align-center rounded-lg elevation-2" :class="{'snowdown-fighter-mobile': $vuetify.breakpoint.xsOnly}">
    <div :class="{'pt-1': $vuetify.breakpoint.smAndUp}">
      <span v-if="type === 'player' || stats.name === 'player'">{{ playerName }}</span>
      <span v-else>{{ $vuetify.lang.t(`$vuetify.event.snowdown.fighter.${stats.name}`) }}</span>
    </div>
    <div class="snowdown-fighter-stun" v-if="stats.stun !== undefined && stats.stun > 0">
      <v-icon class="mr-1" x-small>mdi-octagram-outline</v-icon>
      <span class="snowdown-fighter-text">{{ $formatNum(stats.stun) }}</span>
    </div>
    <div class="d-flex align-center w-100 px-2">
      <gb-tooltip :disabled="!type" :title-text="$vuetify.lang.t(`$vuetify.mult.snowdownAttack`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" x-small>mdi-snowflake</v-icon>
            <span class="snowdown-fighter-text">{{ $formatNum(Math.round(stats.attack * 0.8)) }} - {{ $formatNum(Math.round(stats.attack * 1.2)) }}</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.attackDescription') }}</div>
        <stat-breakdown :name="type === 'player' ? 'snowdownAttack' : 'snowdownPetAttack'" :base="type === 'pet' && petStats.attack ? petStats.attack : null"></stat-breakdown>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <gb-tooltip v-if="stats.defense > 0" :disabled="!type" :title-text="$vuetify.lang.t(`$vuetify.mult.snowdownDefense`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" x-small>mdi-shield</v-icon>
            <span class="snowdown-fighter-text">{{ $formatNum(stats.defense) }}</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.defenseDescription') }}</div>
        <stat-breakdown :name="type === 'player' ? 'snowdownDefense' : 'snowdownPetDefense'" :base="type === 'pet' && petStats.defense ? petStats.defense : null"></stat-breakdown>
      </gb-tooltip>
    </div>
    <div class="d-flex align-center w-100 px-2">
      <gb-tooltip v-if="stats.critRating !== undefined && stats.critRating > 0" :disabled="!type" :title-text="$vuetify.lang.t(`$vuetify.mult.snowdownCritRating`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" x-small>mdi-exclamation-thick</v-icon>
            <span class="snowdown-fighter-text">{{ $formatNum(critChance(stats.critRating) * 100) }}% +{{ $formatNum(Math.round(critDamage(stats.critRating) * critMult)) }}</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.critDescription') }}</div>
        <stat-breakdown :name="type === 'player' ? 'snowdownCritRating' : 'snowdownPetCritRating'" :base="type === 'pet' && petStats.critRating ? petStats.critRating : null"></stat-breakdown>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <gb-tooltip v-if="stats.blockRating !== undefined && stats.blockRating > 0" :disabled="!type" :title-text="$vuetify.lang.t(`$vuetify.mult.snowdownBlockRating`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" x-small>mdi-weather-windy</v-icon>
            <span class="snowdown-fighter-text">{{ $formatNum(blockChance(stats.blockRating) * 100) }}%</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.blockDescription') }}</div>
        <stat-breakdown :name="type === 'player' ? 'snowdownBlockRating' : 'snowdownPetBlockRating'" :base="type === 'pet' && petStats.blockRating ? petStats.blockRating : null"></stat-breakdown>
      </gb-tooltip>
    </div>
    <div class="snowdown-fighter-health d-flex justify-center align-center w-100 blue rounded-b-lg" v-if="stats.healthCurrent !== undefined && stats.healthCurrent <= 0">
      <v-icon x-small>mdi-snowflake</v-icon>
    </div>
    <gb-tooltip v-else :disabled="!type" :title-text="$vuetify.lang.t(`$vuetify.mult.snowdownHealth`)">
      <template v-slot:activator="{ on, attrs }">
        <v-progress-linear class="snowdown-fighter-health rounded-b-lg" color="red" :value="healthPercent" v-bind="attrs" v-on="on">
          <span v-if="stats.healthCurrent !== undefined">{{ $formatNum(stats.healthCurrent) }} /&nbsp;</span>
          <span>{{ $formatNum(stats.health) }}</span>
        </v-progress-linear>
      </template>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.healthDescription') }}</div>
      <stat-breakdown :name="type === 'player' ? 'snowdownHealth' : 'snowdownPetHealth'" :base="type === 'pet' && petStats.health ? petStats.health : null"></stat-breakdown>
    </gb-tooltip>
    <div v-if="stats.label" class="snowdown-fighter-label balloon-text-dynamic d-flex justify-center align-center">
      <v-icon v-if="stats.label.type === 'attack'" class="yellow--text">mdi-sword</v-icon>
      <v-icon v-else-if="stats.label.type === 'block'" class="blue--text">mdi-shield</v-icon>
      <span v-else-if="stats.label.type === 'damage'" :class="stats.label.crit ? 'snowdown-fighter-crit orange-red--text' : 'red--text'">{{ $formatNum(stats.label.value) }}{{ stats.label.crit ? '!' : '' }}</span>
      <span v-else-if="stats.label.type === 'heal'" class="green--text">{{ $formatNum(stats.label.value) }}</span>
      <span v-else-if="stats.label.type === 'buff'" class="d-flex align-center snowdown-fighter-buff light-green--text"><v-icon class="mr-1" small color="light-green">{{ statIcon[stats.label.stat] }}</v-icon>{{ stats.label.value >= 0 ? '+' : '' }}{{ $formatNum(stats.label.value, true) }}</span>
      <span v-else-if="stats.label.type === 'stun'" class="d-flex align-center purple--text"><v-icon class="mr-1" small color="purple">mdi-octagram-outline</v-icon>{{ $formatNum(stats.label.value) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { StatBreakdown },
  props: {
    stats: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    statIcon: {
      attack: 'mdi-snowflake',
      defense: 'mdi-shield',
      critRating: 'mdi-exclamation-thick',
      blockRating: 'mdi-weather-windy'
    }
  }),
  computed: {
    ...mapGetters({
      critChance: 'snowdown/critChance',
      critDamage: 'snowdown/critDamage',
      blockChance: 'snowdown/blockChance'
    }),
    healthPercent() {
      if (this.stats.healthCurrent === undefined) {
        return 100;
      }
      return 100 * this.stats.healthCurrent / this.stats.health;
    },
    petStats() {
      if (this.type !== 'pet') {
        return null;
      }
      return this.$store.state.snowdown.pet[this.stats.name];
    },
    critMult() {
      if (this.stats.critMult !== undefined) {
        return this.stats.critMult;
      } else if (this.stats.name === 'player') {
        return this.$store.state.mult.items.snowdownAttack.multCache;
      } else if (this.type === 'pet') {
        return this.$store.state.mult.items.snowdownPetAttack.multCache;
      } else {
        return 1;
      }
    },
    playerName() {
      return this.$store.state.system.playerName ?? this.$vuetify.lang.t('$vuetify.info.statistics.defaultPlayerName');
    }
  }
}
</script>
