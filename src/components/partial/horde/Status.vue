<style scoped>
.boss-count-chip {
  min-width: 120px;
}
.boss-count-chip >>> .v-chip__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.boss-difficulty-field {
  width: 200px;
}
</style>

<template>
  <div class="ma-1">
    <div v-if="subfeature === 0" class="d-flex justify-center align-center ma-1">
      <v-btn icon :disabled="zone <= 1 || isFrozen || currentTower !== null" @click="zoneMin"><v-icon>mdi-skip-backward</v-icon></v-btn>
      <v-btn icon :disabled="zone <= 1 || isFrozen || currentTower !== null" @click="zonePrev10"><v-icon>mdi-step-backward-2</v-icon></v-btn>
      <v-btn icon :disabled="zone <= 1 || isFrozen || currentTower !== null" @click="zonePrev"><v-icon>mdi-step-backward</v-icon></v-btn>
      <div v-if="currentTower !== null" class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.zone') }} ~{{ zoneEstimation }}</div>
      <div v-else class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ zone }}</div>
      <v-btn icon :disabled="isMaxZone || isFrozen || currentTower !== null" @click="zoneNext"><v-icon>mdi-step-forward</v-icon></v-btn>
      <v-btn icon :disabled="isMaxZone || isFrozen || currentTower !== null" @click="zoneNext10"><v-icon>mdi-step-forward-2</v-icon></v-btn>
      <v-btn icon :disabled="isMaxZone || isFrozen || currentTower !== null" @click="zoneMax"><v-icon>mdi-skip-forward</v-icon></v-btn>
    </div>
    <div v-if="subfeature === 0" class="d-flex flex-wrap justify-center align-center">
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip @click="toggleTaunt" class="ma-1 boss-count-chip balloon-text-dynamic" :color="`${ isTaunted ? 'pale-red' : 'pale-green' } ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" size="14">mdi-emoticon-frown</v-icon>
            <span v-if="enemyTimer < enemyRespawn">{{ $formatTime(enemyRespawn - enemyTimer) }}</span>
            <div v-else class="d-flex align-center">
              <v-icon v-if="enemyTimer >= (enemyRespawn * enemyRespawnMax)" class="mr-1">mdi-check-all</v-icon>
              <v-icon v-else class="mr-1">mdi-check</v-icon>
              <span>{{ $formatNum(Math.floor(enemyTimer / enemyRespawn)) }}</span>
            </div>
          </v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.enemyRespawn`, $formatTime(enemyRespawn), $formatNum(enemyRespawnMax)) }}</div>
        <h3 class="text-center">{{ $vuetify.lang.t(`$vuetify.horde.taunt.title`) }}</h3>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.taunt.description`) }}</div>
        <div>
          <span v-if="isTaunted">{{ $vuetify.lang.t(`$vuetify.horde.taunt.on`) }}</span>
          <span v-else>{{ $vuetify.lang.t(`$vuetify.horde.taunt.off`) }}</span>
          <span>&nbsp;({{ $vuetify.lang.t(`$vuetify.horde.taunt.clickToToggle`) }})</span>
        </div>
      </gb-tooltip>
      <gb-tooltip v-if="canSpawnMiniboss" :title-text="$vuetify.lang.t(`$vuetify.horde.miniboss`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="ma-1 boss-count-chip balloon-text-dynamic" :color="`pale-purple ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" size="18">mdi-skull</v-icon>
            <v-icon v-if="minibossTimer >= 1">mdi-check</v-icon>
            <span v-else>{{ $formatTime(Math.ceil((1 - minibossTimer) * minibossTime)) }}</span>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.minibossDescription') }}</div>
        <div v-if="canSeeHeirloom">{{ $vuetify.lang.t('$vuetify.horde.minibossHeirloom', $formatNum(hordeSoulGain), $formatNum(hordeHeirloomChance * 100, true), $formatNum(hordeNostalgia)) }}</div>
        <div v-else>{{ $vuetify.lang.t('$vuetify.horde.minibossSoul', $formatNum(hordeSoulGain)) }}</div>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.hordeMinibossTime') }}</h3>
        <stat-breakdown name="hordeMinibossTime"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.${ bossState }.title`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip @click="fightBoss" class="ma-1 boss-count-chip balloon-text-dynamic" :color="`dark-grey ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" size="24">mdi-skull-crossbones</v-icon>
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
      <gb-tooltip v-if="canSeeTower" :title-text="$vuetify.lang.t(`$vuetify.horde.tower.name`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip @click="toggleTowers" class="ma-1 boss-count-chip balloon-text-dynamic" :color="`pale-orange ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" size="24">mdi-office-building</v-icon>
            <v-spacer></v-spacer>
            <div v-if="currentTower !== null">{{ $vuetify.lang.t(`$vuetify.horde.tower.${ currentTower }`) }}</div>
            <div v-else class="d-flex align-center">
              <v-icon class="mr-1">{{ towerKey.icon }}</v-icon>
              {{ $formatNum(towerKey.value) }}
            </div>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.tower.description`) }}</div>
      </gb-tooltip>
    </div>
    <div v-if="subfeature === 1" class="d-flex justify-center align-center ma-1">
      <div class="mx-2">{{ $vuetify.lang.t(`$vuetify.horde.area.${ currentArea }`) }}</div>
      <v-icon class="mx-n1">mdi-circle-small</v-icon>
      <div v-if="zone === 'endless'" class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.area.zoneEndless') }}</div>
      <div v-else-if="zone.slice(0, 4) === 'boss'" class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.area.zoneBoss', $vuetify.lang.t(`$vuetify.horde.bossName.${ areaList[currentArea].zones[zone].boss[bossStage] }`)) }}</div>
      <div v-else class="mx-2">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ zone }}</div>
      <v-btn icon @click="toggleMap"><v-icon>mdi-map</v-icon></v-btn>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mx-2 boss-count-chip balloon-text-dynamic" :color="`pale-green ${ themeModifier }`" v-bind="attrs" v-on="on">
            <v-icon class="mr-1" size="14">mdi-emoticon-frown</v-icon>
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
    </div>
    <div v-if="subfeature === 1 && showMap" class="d-flex flex-column justify-center align-center ma-1">
      <div class="d-flex align-center mb-1">
        <v-btn v-for="(area, name) in areaVisible" :key="`area-btn-${ name }`" class="mx-1" icon :color="area.color" @click="changeArea(name)"><v-icon>{{ area.icon }}</v-icon></v-btn>
        <v-text-field v-if="canSeeBossDifficulty" dense class="ma-1 boss-difficulty-field" :disabled="isFrozen || isBossZone" type="number" step="1" min="0" max="999" :label="$vuetify.lang.t('$vuetify.horde.bossBonusDifficulty')" prefix="+" outlined hide-details v-model="bossBonusDifficulty"></v-text-field>
      </div>
      <area-map :name="selectedArea"></area-map>
    </div>
    <v-card v-if="showTowers" class="ma-1 mt-2 pa-1">
      <div class="d-flex flex-wrap">
        <currency class="ma-1" name="horde_crown"></currency>
        <currency class="ma-1" name="horde_towerKey">
          <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.horde.tower.keyDescription`, $formatNum(keysOnUnlock), $formatTime(secondsUntilWeeklyReset)) }}</alert-text>
        </currency>
        <v-spacer></v-spacer>
        <v-btn icon @click="showTowers = false"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <div class="d-flex flex-wrap">
        <tower-tile v-for="tower in visibleTowers" :key="`tower-${ tower }`" :name="tower"></tower-tile>
      </div>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card min-height="52" class="d-flex flex-wrap ma-1 mb-2 pa-1">
          <active class="ma-1" v-for="(item, key) in itemsActiveCombat" :key="'active-' + key" :name="key" :pretend="isFrozen" show-autocast></active>
          <v-spacer></v-spacer>
          <active class="ma-1" v-for="(item, key) in itemsActiveUtility" :key="'active-' + key" :name="key" :pretend="isFrozen"></active>
        </v-card>
        <player-status class="ma-1"></player-status>
        <v-card v-if="Object.keys(playerBuffParsed).length > 0" class="d-flex flex-wrap ma-1 mb-2 pa-1">
          <gb-tooltip :min-width="0" v-for="(item, key) in playerBuffParsed" :key="`buff-${ key }`">
            <template v-slot:activator="{ on, attrs }">
              <v-icon large :color="item.color" v-bind="attrs" v-on="on">mdi-chevron-double-{{ item.positive ? 'up' : 'down' }}</v-icon>
            </template>
            <div class="mt-0">{{ $formatTime(item.time) }} / {{ $formatTime(item.maxTime) }}</div>
            <display-row class="mt-0" v-for="(subitem, subkey) in item.effect" :key="`buff-effect-${ key }-${ subkey }`" :name="subitem.name" :type="subitem.type" :after="subitem.value"></display-row>
          </gb-tooltip>
        </v-card>
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
    <div v-if="trinketDrop !== null" class="d-flex justify-center">
      <trinket-item class="ma-1" style="width: 200px;" v-for="(item, key) in trinketDrop" :key="`trinket-drop-${ key }`" :name="item.name" :gain="item.amount" :index="key"></trinket-item>
    </div>
    <alert-text v-if="showMonsterPartHint" class="ma-1" type="info">{{ $vuetify.lang.t('$vuetify.horde.monsterPartHint') }}</alert-text>
    <div v-if="subfeature === 0" class="d-flex flex-wrap justify-center">
      <currency large class="ma-1" name="horde_bone"></currency>
      <currency class="ma-1" name="horde_monsterPart"></currency>
      <currency class="ma-1" name="horde_corruptedFlesh"></currency>
      <currency class="ma-1" name="horde_mysticalShard"></currency>
      <currency class="ma-1" name="horde_soulCorrupted"></currency>
    </div>
    <div v-else-if="subfeature === 1" class="d-flex flex-wrap justify-center">
      <currency large class="ma-1" name="horde_blood"></currency>
      <currency v-if="selectedClass === 'pirate'" class="ma-1" name="horde_lockpick"></currency>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME, HORDE_KEYS_PER_TOWER, SECONDS_PER_DAY } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import Active from './Active.vue';
import AreaMap from './AreaMap.vue';
import EnemyActive from './EnemyActive.vue';
import EnemyStatus from './EnemyStatus.vue';
import PlayerStatus from './PlayerStatus.vue';
import TowerTile from './TowerTile.vue';
import TrinketItem from './TrinketItem.vue';

export default {
  components: { Active, PlayerStatus, EnemyStatus, Currency, StatBreakdown, AlertText, EnemyActive, TowerTile, AreaMap, DisplayRow, TrinketItem },
  data: () => ({
    showTowers: false,
    showMap: false,
    selectedArea: 'warzone',
    bossBonusDifficulty: 0,
  }),
  mounted() {
    this.selectedArea = this.$store.state.horde.selectedArea;
    this.bossBonusDifficulty = this.$store.state.horde.bossBonusDifficulty;
  },
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
      minibossTimer: state => state.horde.minibossTimer,
      canSeeTower: state => state.unlock.hordeBrickTower.see,
      currentTower: state => state.horde.currentTower,
      towerKey: state => state.currency.horde_towerKey,
      canSeeHeirloom: state => state.unlock.hordeHeirlooms.see,
      canSeeBossDifficulty: state => state.unlock.hordeAreaMonkeyJungle.see,
      isTaunted: state => state.horde.taunt,
      subfeature: state => state.system.features.horde.currentSubfeature,
      playerBuff: state => state.horde.playerBuff,
      currentArea: state => state.horde.selectedArea,
      areaList: state => state.horde.area,
      trinketDrop: state => state.horde.trinketDrop,
      bossStage: state => state.horde.bossStage,
      selectedClass: state => state.horde.selectedClass,
    }),
    ...mapGetters({
      comboRequired: 'horde/comboRequired',
      comboRequiredBase: 'horde/comboRequiredBase',
      itemsActiveList: 'horde/itemsActiveList',
      canSpawnMiniboss: 'horde/canSpawnMiniboss',
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
    itemsActiveBase() {
      if (this.subfeature === 1) {
        let obj = {};
        for (const [key] of Object.entries(this.$store.state.horde.skillActive)) {
          const split = key.split('_');
          if (split[0] === 'skill') {
            obj[key] = this.$store.state.horde.fighterClass[this.selectedClass].skills[split[1]];
          } else if (split[0] === 'trinket') {
            obj[key] = this.$store.state.horde.trinket[split[1]];
          }
        }
        return obj;
      }
      return this.itemsActiveList;
    },
    itemsActiveCombat() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.itemsActiveBase)) {
        if (elem.activeType !== 'utility') {
          obj[key] = elem;
        }
      }
      return obj;
    },
    itemsActiveUtility() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.itemsActiveBase)) {
        if (elem.activeType === 'utility') {
          obj[key] = elem;
        }
      }
      return obj;
    },
    areaVisible() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.areaList)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].use) {
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
    },
    visibleTowers() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.horde.tower)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].use) {
          arr.push(key);
        }
      }
      return arr;
    },
    keysOnUnlock() {
      return HORDE_KEYS_PER_TOWER;
    },
    secondsUntilWeeklyReset() {
      return (SECONDS_PER_DAY * 7) - (this.$store.state.system.timestamp % (SECONDS_PER_DAY * 7));
    },
    zoneEstimation() {
      if (this.currentTower === null) {
        return null;
      }
      const tower = this.$store.state.horde.tower[this.currentTower];
      return Math.round(tower.statBase + this.$store.state.horde.towerFloor * tower.statScaling);
    },
    hordeSoulGain() {
      return this.$store.getters['mult/get']('currencyHordeSoulCorruptedGain');
    },
    hordeHeirloomChance() {
      return this.$store.getters['mult/get']('hordeHeirloomChance');
    },
    hordeNostalgia() {
      return this.$store.getters['mult/get']('hordeNostalgia');
    },
    playerBuffParsed() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.playerBuff)) {
        let color = null;
        const split = key.split('_');
        if (split[0] === 'equipment') {
          color = this.$store.state.horde.items[split[1]].activeColor;
        } else if (split[0] === 'skill') {
          color = this.$store.state.horde.fighterClass[this.selectedClass].skills[split[1]].color;
        } else if (split[0] === 'trinket') {
          color = this.$store.state.horde.trinket[split[1]].color;
        }
        obj[key] = {...elem, color};
      }
      return obj;
    },
    isBossZone() {
      return this.subfeature === 1 && this.areaList[this.currentArea].zones[this.zone].type === 'boss';
    }
  },
  methods: {
    fightBoss() {
      if (!this.isFrozen && this.currentTower === null && this.respawn <= 0) {
        if (this.isMaxZone && this.bossAvailable && !this.bossFight) {
          this.$store.dispatch('horde/fightBoss');
        } else if (this.bossFight) {
          this.$store.dispatch('horde/stopFightBoss');
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
    zonePrev10() {
      if (this.zone > 1) {
        this.$store.dispatch('horde/updateZone', Math.max(this.zone - 10, 1));
      }
    },
    zoneNext() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.zone + 1);
      }
    },
    zoneNext10() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', Math.min(this.zone + 10, this.maxZone));
      }
    },
    zoneMax() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.maxZone);
      }
    },
    toggleTowers() {
      this.showTowers = !this.showTowers;
    },
    toggleMap() {
      this.showMap = !this.showMap;
    },
    toggleTaunt() {
      this.$store.commit('horde/updateKey', {key: 'taunt', value: !this.isTaunted});
    },
    changeArea(name) {
      this.selectedArea = name;
    }
  },
  watch: {
    bossBonusDifficulty(newVal) {
      if (this.bossFight === 0 && newVal !== null && parseInt(newVal) >= 0 && parseInt(newVal) <= 999) {
        this.$store.commit('horde/updateKey', {key: 'bossBonusDifficulty', value: parseInt(newVal)});
      }
    }
  }
}
</script>
