<style scoped>
.boss-count-chip {
  width: 120px;
}
.boss-count-chip >>> .v-chip__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>

<template>
  <div class="ma-1">
    <div class="d-flex justify-center align-center ma-1">
      <v-btn icon :disabled="zone <= 1 || isFrozen" @click="zoneMin"><v-icon>mdi-skip-backward</v-icon></v-btn>
      <v-btn icon :disabled="zone <= 1 || isFrozen" @click="zonePrev"><v-icon>mdi-step-backward</v-icon></v-btn>
      <div class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ zone }}</div>
      <v-btn icon :disabled="isMaxZone || isFrozen" @click="zoneNext"><v-icon>mdi-step-forward</v-icon></v-btn>
      <v-btn icon :disabled="isMaxZone || isFrozen" @click="zoneMax"><v-icon>mdi-skip-forward</v-icon></v-btn>
    </div>
    <div class="d-flex justify-center align-center ma-1">
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mx-1 boss-count-chip" :color="`pale-green ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon size="14">mdi-emoticon-frown</v-icon>
            <span v-if="enemyTimer < enemyRespawn">{{ $formatTime(enemyRespawn - enemyTimer) }}</span>
            <div v-else class="d-flex align-center">
              <v-icon v-if="enemyTimer >= (enemyRespawn * enemyRespawnMax)" class="mr-1">mdi-check-all</v-icon>
              <v-icon v-else class="mr-1">mdi-check</v-icon>
              <span>{{ $formatNum(Math.floor(enemyTimer / enemyRespawn)) }}</span>
            </div>
          </v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.enemyRespawn`, $formatTime(enemyRespawn), $formatNum(enemyRespawnMax)) }}</div>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.hordeMinibossTime`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mx-1 boss-count-chip" :color="`pale-purple ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon size="18">mdi-skull</v-icon>
            <v-icon v-if="minibossTimer >= 1">mdi-check</v-icon>
            <span v-else>{{ $formatTime(Math.ceil((1 - minibossTimer) * minibossTime)) }}</span>
          </v-chip>
        </template>
        <stat-breakdown name="hordeMinibossTime"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.${ bossState }.title`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip @click="fightBoss" class="mx-1 boss-count-chip" :color="`dark-grey ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon size="24">mdi-skull-crossbones</v-icon>
            <v-spacer></v-spacer>
            <div v-if="!isMaxZone">{{ $vuetify.lang.t(`$vuetify.horde.cleared`) }}</div>
            <div v-else-if="bossFight === 2">{{ $vuetify.lang.t(`$vuetify.horde.fighting`) }}</div>
            <v-icon v-else-if="bossAvailable">mdi-check</v-icon>
            <div v-else>{{ combo }} / {{ comboRequired }}</div>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.${ bossState }.description`, comboRequired) }}</div>
        <stat-breakdown v-if="bossState === 'reachBoss'" name="hordeBossRequirement" :base="comboRequiredBase"></stat-breakdown>
      </gb-tooltip>
    </div>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card min-height="52" class="d-flex flex-wrap ma-1 mb-2 pa-1">
          <active class="ma-1" v-for="(item, key) in itemsActiveCombat" :key="'active-' + key" :name="key" :pretend="isFrozen"></active>
          <v-spacer></v-spacer>
          <active class="ma-1" v-for="(item, key) in itemsActiveUtility" :key="'active-' + key" :name="key" :pretend="isFrozen"></active>
        </v-card>
        <player-status class="ma-1"></player-status>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card min-height="52" class="d-flex flex-wrap ma-1 mb-2 pa-1">
          <template v-if="enemy !== null">
            <enemy-active class="ma-1 mr-2" v-for="(item, key) in enemy.active" :key="'active-' + key" :name="key"></enemy-active>
          </template>
        </v-card>
        <enemy-status class="ma-1"></enemy-status>
      </v-col>
    </v-row>
    <alert-text v-if="showMonsterPartHint" class="ma-1" type="info">{{ $vuetify.lang.t('$vuetify.horde.monsterPartHint') }}</alert-text>
    <div class="d-flex flex-wrap justify-center">
      <currency large class="ma-1" name="horde_bone"></currency>
      <currency class="ma-1" name="horde_monsterPart"></currency>
      <currency class="ma-1" name="horde_corruptedFlesh"></currency>
      <currency class="ma-1" name="horde_mysticalShard" :customCap="maxMysticalShards > 0 ? maxMysticalShards : undefined"></currency>
      <currency class="ma-1" name="horde_soulCorrupted">
        <alert-text v-if="currentSoulMult < 1" type="warning">{{ $vuetify.lang.t('$vuetify.horde.earlyPrestige', $formatNum(currentSoulMult * 100, true)) }}</alert-text>
      </currency>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import Active from './Active.vue';
import EnemyActive from './EnemyActive.vue';
import EnemyStatus from './EnemyStatus.vue';
import PlayerStatus from './PlayerStatus.vue';

export default {
  components: { Active, PlayerStatus, EnemyStatus, Currency, StatBreakdown, AlertText, EnemyActive },
  computed: {
    ...mapState({
      combo: state => state.horde.combo,
      bossAvailable: state => state.horde.bossAvailable,
      zone: state => state.horde.zone,
      maxZone: state => state.stat.horde_maxZone.value,
      bossFight: state => state.horde.bossFight,
      respawn: state => state.horde.respawn,
      enemy: state => state.horde.enemy,
      isFrozen: state => state.cryolab.horde.active,
      enemyTimer: state => state.horde.enemyTimer,
      minibossTimer: state => state.horde.minibossTimer
    }),
    ...mapGetters({
      comboRequired: 'horde/comboRequired',
      comboRequiredBase: 'horde/comboRequiredBase',
      itemsActiveList: 'horde/itemsActiveList',
      maxMysticalShards: 'horde/maxMysticalShards',
      currentSoulMult: 'horde/currentSoulMult'
    }),
    isMaxZone() {
      return this.zone >= this.maxZone;
    },
    bossState() {
      if (this.bossFight === 2) {
        return 'fleeBoss';
      } else if (!this.isMaxZone) {
        return 'defeatedBoss';
      } else if (this.bossAvailable) {
        return 'fightBoss';
      } else {
        return 'reachBoss';
      }
    },
    showMonsterPartHint() {
      return this.$store.state.stat.horde_maxZone.total >= 15 && this.$store.state.stat.horde_monsterPart.total <= 0;
    },
    itemsActiveCombat() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.itemsActiveList)) {
        if (elem.activeType !== 'utility') {
          obj[key] = elem;
        }
      }
      return obj;
    },
    itemsActiveUtility() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.itemsActiveList)) {
        if (elem.activeType === 'utility') {
          obj[key] = elem;
        }
      }
      return obj;
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'darken-2' : 'lighten-2';
    },
    minibossTime() {
      return this.$store.getters['mult/get']('hordeMinibossTime');
    },
    enemyRespawn() {
      return HORDE_ENEMY_RESPAWN_TIME;
    },
    enemyRespawnMax() {
      return HORDE_ENEMY_RESPAWN_MAX;
    }
  },
  methods: {
    fightBoss() {
      if (!this.isFrozen) {
        if (this.respawn <= 0) {
          if (this.isMaxZone && this.bossAvailable && !this.bossFight) {
            this.$store.dispatch('horde/fightBoss');
          } else if (this.bossFight) {
            this.$store.dispatch('horde/stopFightBoss');
          }
        }
      }
    },
    zoneMin() {
      if (this.zone > 1) {
        this.$store.dispatch('horde/updateZone', 1);
      }
    },
    zonePrev() {
      if (this.zone > 1) {
        this.$store.dispatch('horde/updateZone', this.zone - 1);
      }
    },
    zoneNext() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.zone + 1);
      }
    },
    zoneMax() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.maxZone);
      }
    }
  }
}
</script>
