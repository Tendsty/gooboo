<style scoped>
.health-bar-icon {
  position: absolute;
  left: 4px;
  top: 4px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">
      <span v-if="bossFight">{{ $vuetify.lang.t('$vuetify.horde.boss') }}</span>
      <gb-tooltip v-else>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.horde.enemy') + ' #' + (combo + 1) }}</span>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.enemyDescription`, comboAttackBase, comboHealthBase, comboBoneBase, combo + 1, $formatNum(comboAttack, true), $formatNum(comboHealth, true), $formatNum(comboBone, true)) }}</div>
        <div v-if="hasSigils">
          <span>{{ $vuetify.lang.t(`$vuetify.horde.enemySigil1.${ currentSigils === 1 ? 's' : 'p' }`, currentSigils) }}</span>
          <span>{{ $vuetify.lang.t(`$vuetify.horde.enemySigil2.${ currentSigilVariety === 1 ? 's' : 'p' }`, currentSigilVariety) }}</span>
        </div>
      </gb-tooltip>
    </v-card-title>
    <v-card-text class="pb-2">
      <div v-if="hasSigils" class="d-flex flex-wrap mx-n1 mt-n1 mb-1">
        <sigil v-for="(item, key) in enemyStats.sigil" :key="'sigil-' + key" class="ma-1" :name="key" :tier="item"></sigil>
      </div>
      <v-progress-linear height="24" color="green" class="balloon-text-dynamic" :value="enemyPercentHealth">
        <v-icon class="health-bar-icon" small>mdi-heart</v-icon>
        {{ $formatNum(enemyStats.health) }} / {{ $formatNum(enemyStats.maxHealth) }}
      </v-progress-linear>
      <entity-status
        :is-player="false"
        :revive="enemyStats.revive"
        :max-revive="enemyStats.maxRevive"
        :attack="enemyStats.attack"
        :crit-chance="enemyStats.critChance"
        :crit-mult="enemyStats.critMult"
        :first-strike="enemyStats.firstStrike"
        :cutting="enemyStats.cutting"
        :toxic="enemyStats.toxic"
        :division-shield="enemyStats.divisionShield"
        :max-division-shield="enemyStats.maxDivisionShield"
        :stun="enemyStats.stun"
        :poison="enemyStats.poison"
        :physic-conversion="enemyStats.physicConversion"
        :physic-attack="enemyStats.physicAttack"
        :physic-taken="enemyStats.physicTaken"
        :magic-conversion="enemyStats.magicConversion"
        :magic-attack="enemyStats.magicAttack"
        :magic-taken="enemyStats.magicTaken"
        :bio-conversion="enemyStats.bioConversion"
        :bio-attack="enemyStats.bioAttack"
        :bio-taken="enemyStats.bioTaken"
        :hits="enemyStats.hits"
      >
        <gb-tooltip v-if="currentCorruption > 0" :title-text="$vuetify.lang.t(`$vuetify.horde.corruption.name`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small :color="`deep-purple ${ themeModifier }`" class="balloon-text-dynamic ma-1 px-2" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-skull</v-icon>{{ $formatNum(currentCorruption * 100) }}%</v-chip>
          </template>
          <stat-breakdown name="hordeCorruption" :base="corruptionBase"></stat-breakdown>
          <div class="text-center">{{ $vuetify.lang.t(`$vuetify.horde.corruption.effects`) }}</div>
          <div class="mt-0" v-for="(stat, name) in corruptionStats" :key="name">{{ $vuetify.lang.t(`$vuetify.horde.corruption.${ name }`) }}{{ $formatNum(stat, true) }}</div>
        </gb-tooltip>
        <gb-tooltip v-if="fightRampage > 0" :title-text="$vuetify.lang.t('$vuetify.horde.rampage.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`deep-orange ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-emoticon-angry</v-icon>
              {{ $formatNum(fightRampage) }}
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.description', $formatTime(fightTime), $formatTime(enemyRampageTime)) }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.effect', $formatNum(rampageStats.attack, true), $formatNum(rampageStats.critChance * 100, true), $formatNum(rampageStats.critDamage * 100, true)) }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.effectCurrent', $formatNum(fightRampage), $formatNum(rampageStats.attackNow, true), $formatNum(rampageStats.critChanceNow * 100, true), $formatNum(rampageStats.critDamageNow * 100, true)) }}</div>
        </gb-tooltip>
      </entity-status>
      <div class="d-flex flex-wrap my-1 mx-n1">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_bone.name'))">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_bone.color } ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-bone</v-icon>{{ $formatNum(currentBone) }}</v-chip>
          </template>
          <stat-breakdown name="currencyHordeBoneGain" :base="currentBoneBase" :multArray="basicLootMult"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip v-if="zone >= monsterPartMinZone && combo >= monsterPartMinCombo" :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_monsterPart.name'))">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_monsterPart.color } ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-stomach</v-icon>{{ $formatNum(currentMonsterPart, true) }}</v-chip>
          </template>
          <stat-breakdown name="currencyHordeMonsterPartGain" :base="currentMonsterPartBase" :multArray="basicLootMult"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip v-if="bossFight && currentSoulChance > 0" :title-text="$vuetify.lang.t('$vuetify.currency.horde_soulCorrupted.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_soulCorrupted.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-ghost</v-icon>
              {{ $formatNum(currentSoulChance * 100, true) }}%
              <v-icon>mdi-circle-small</v-icon>
              {{ $formatNum(currentSoulAmount) }}
            </v-chip>
          </template>
          <template v-if="zone > 20">
            <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</div>
            <stat-breakdown name="hordeSoulChance" :base="currentSoulChanceBase"></stat-breakdown>
            <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
            <stat-breakdown name="hordeSoulGain" :base="currentSoulAmountBase"></stat-breakdown>
          </template>
        </gb-tooltip>
        <gb-tooltip v-if="bossFight && currentHeirloomChance > 0" :title-text="$vuetify.lang.t('$vuetify.horde.heirloom.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`cyan ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-necklace</v-icon>
              {{ $formatNum(currentHeirloomChance * 100, true) }}%
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.description', $formatTime(nostalgia), $formatNum(nostalgiaRemovePercent)) }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.description2') }}</div>
          <div v-if="(zone % 10) === 0">{{ $vuetify.lang.t('$vuetify.horde.heirloom.guaranteed') }}</div>
          <template v-else>
            <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</div>
            <stat-breakdown name="hordeHeirloomChance" :base="enemyHeirloomChanceBase" :baseArray="[{name: 'nostalgia', value: enemyHeirloomChanceNostalgia}]"></stat-breakdown>
          </template>
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
          <stat-breakdown name="hordeHeirloomAmount"></stat-breakdown>
        </gb-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_MONSTER_PART_MIN_COMBO, HORDE_MONSTER_PART_MIN_ZONE, HORDE_NOSTALGIA_REMOVE, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_CRIT_CHANCE, HORDE_RAMPAGE_CRIT_DAMAGE, HORDE_RAMPAGE_ENEMY_TIME } from '../../../js/constants';
import StatBreakdown from '../../render/StatBreakdown.vue';
import EntityStatus from './EntityStatus.vue';
import Sigil from './Sigil.vue';

export default {
  components: { Sigil, StatBreakdown, EntityStatus },
  computed: {
    ...mapState({
      enemyStats: state => state.horde.enemy,
      combo: state => state.horde.combo,
      zone: state => state.horde.zone,
      bossFight: state => state.horde.bossFight,
      unlock: state => state.unlock,
      nostalgia: state => state.horde.nostalgia,
      currency: state => state.currency,
      fightTime: state => state.horde.fightTime,
      fightRampage: state => state.horde.fightRampage
    }),
    ...mapGetters({
      currentSoulChance: 'horde/currentSoulChance',
      currentSoulChanceBase: 'horde/currentSoulChanceBase',
      currentSoulAmount: 'horde/currentSoulAmount',
      currentSoulAmountBase: 'horde/currentSoulAmountBase',
      currentHeirloomChance: 'horde/currentHeirloomChance',
      currentCorruption: 'horde/currentCorruption',
      currentBoneBase: 'horde/currentBone',
      currentMonsterPartBase: 'horde/currentMonsterPart',
      enemyHeirloomChanceNostalgia: 'horde/enemyHeirloomChanceNostalgia',
      corruptionStats: 'horde/currentCorruptionStats',
      corruptionBase: 'horde/currentCorruptionBase',
      currentSigils: 'horde/currentSigils',
      currentSigilVariety: 'horde/currentSigilVariety'
    }),
    enemyPercentHealth() {
      return 100 * this.enemyStats.health / this.enemyStats.maxHealth;
    },
    currentBone() {
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.currentBoneBase, this.enemyStats.loot);
    },
    currentMonsterPart() {
      return this.$store.getters['mult/get']('currencyHordeMonsterPartGain', this.currentMonsterPartBase, this.enemyStats.loot);
    },
    enemyHeirloomChanceBase() {
      return this.$store.getters['horde/enemyHeirloomChanceBase'](this.zone);
    },
    hasSigils() {
      return Object.keys(this.enemyStats.sigil).length > 0;
    },
    nostalgiaRemovePercent() {
      return HORDE_NOSTALGIA_REMOVE * 100;
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'darken-2' : 'lighten-2';
    },
    comboAttackBase() {
      return HORDE_COMBO_ATTACK;
    },
    comboHealthBase() {
      return HORDE_COMBO_HEALTH;
    },
    comboBoneBase() {
      return HORDE_COMBO_BONE * 100;
    },
    comboAttack() {
      return Math.pow(HORDE_COMBO_ATTACK, this.combo);
    },
    comboHealth() {
      return Math.pow(HORDE_COMBO_HEALTH, this.combo);
    },
    comboBone() {
      return HORDE_COMBO_BONE * 100 * this.combo;
    },
    monsterPartMinZone() {
      return HORDE_MONSTER_PART_MIN_ZONE;
    },
    monsterPartMinCombo() {
      return HORDE_MONSTER_PART_MIN_COMBO;
    },
    basicLootMult() {
      return this.enemyStats.loot === 1 ? [] : [{name: 'hordeBasicLoot', value: this.enemyStats.loot}];
    },
    enemyRampageTime() {
      return this.bossFight ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
    },
    rampageStats() {
      return {
        attack: HORDE_RAMPAGE_ATTACK,
        critChance: HORDE_RAMPAGE_CRIT_CHANCE,
        critDamage: HORDE_RAMPAGE_CRIT_DAMAGE,
        attackNow: Math.pow(HORDE_RAMPAGE_ATTACK, this.fightRampage),
        critChanceNow: HORDE_RAMPAGE_CRIT_CHANCE * this.fightRampage,
        critDamageNow: HORDE_RAMPAGE_CRIT_DAMAGE * this.fightRampage
      };
    }
  }
}
</script>
