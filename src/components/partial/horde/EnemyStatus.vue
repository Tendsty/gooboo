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
      <span v-if="bossFight === 2">{{ $vuetify.lang.t('$vuetify.horde.boss') }}</span>
      <span v-else-if="bossFight === 1">{{ $vuetify.lang.t('$vuetify.horde.miniboss') }}</span>
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
      <div v-else-if="zone >= 20" style="height: 48px;"></div>
      <v-progress-linear height="24" color="green" class="balloon-text-dynamic" :value="enemyPercentHealth">
        <v-icon class="health-bar-icon" small>mdi-heart</v-icon>
        <span v-if="enemyStats === null">-</span>
        <span v-else>{{ $formatNum(enemyStats.health) }} / {{ $formatNum(enemyStats.maxHealth) }}</span>
      </v-progress-linear>
      <entity-status
        v-if="enemyStats !== null"
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
        :stun-resist="enemyStats.stunResist"
        :silence="enemyStats.silence"
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
      <div v-else style="height: 60px;"></div>
      <div class="d-flex flex-wrap my-1 mx-n1" style="min-height: 32px;">
        <template v-if="enemyStats !== null">
          <gb-tooltip key="reward-bone" v-if="bossFight === 0" :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_bone.name'))">
            <template v-slot:activator="{ on, attrs }">
              <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_bone.color } ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-bone</v-icon>{{ $formatNum(currentBone) }}</v-chip>
            </template>
            <stat-breakdown name="currencyHordeBoneGain" :base="currentBoneBase" :multArray="basicLootMult"></stat-breakdown>
          </gb-tooltip>
          <gb-tooltip key="reward-soul" v-if="bossFight === 1" :title-text="$vuetify.lang.t('$vuetify.currency.horde_soulCorrupted.name')">
            <template v-slot:activator="{ on, attrs }">
              <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_soulCorrupted.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
                <v-icon class="mr-2">mdi-ghost</v-icon>
                {{ $formatNum(hordeSoulGain) }}
              </v-chip>
            </template>
            <stat-breakdown name="currencyHordeSoulCorruptedGain"></stat-breakdown>
          </gb-tooltip>
          <gb-tooltip key="reward-heirloom" v-if="bossFight === 1 && canFindHeirloom && hordeHeirloomChance > 0" :title-text="$vuetify.lang.t('$vuetify.horde.heirloom.name')">
            <template v-slot:activator="{ on, attrs }">
              <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`cyan ${ themeModifier }`" v-bind="attrs" v-on="on">
                <v-icon class="mr-2">mdi-necklace</v-icon>
                {{ $formatNum(hordeHeirloomChance * 100, true) }}%
              </v-chip>
            </template>
            <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.description') }}</div>
            <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</h3>
            <stat-breakdown name="hordeHeirloomChance"></stat-breakdown>
            <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</h3>
            <stat-breakdown name="hordeHeirloomAmount"></stat-breakdown>
            <alert-text class="mt-2" type="info">{{ $vuetify.lang.t('$vuetify.horde.heirloom.descriptionDouble') }}</alert-text>
            <template v-if="hordeNostalgia > 0">
              <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.hordeNostalgia') }}</h3>
              <stat-breakdown name="hordeNostalgia"></stat-breakdown>
              <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.descriptionNostalgia') }}</div>
            </template>
          </gb-tooltip>
        </template>
        <gb-tooltip
          key="reward-monster-part"
          v-else-if="respawn <= 0 && zone >= monsterPartMinZone && combo > 0"
          :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_monsterPart.name'))"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_monsterPart.color } ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-stomach</v-icon>{{ $formatNum(currentMonsterPart, true) }}/s</v-chip>
          </template>
          <stat-breakdown name="currencyHordeMonsterPartGain" :base="currentMonsterPartBase" :multArray="basicLootMult"></stat-breakdown>
        </gb-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_MONSTER_PART_MIN_ZONE, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_CRIT_CHANCE, HORDE_RAMPAGE_CRIT_DAMAGE, HORDE_RAMPAGE_ENEMY_TIME } from '../../../js/constants';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import EntityStatus from './EntityStatus.vue';
import Sigil from './Sigil.vue';

export default {
  components: { Sigil, StatBreakdown, EntityStatus, AlertText },
  computed: {
    ...mapState({
      enemyStats: state => state.horde.enemy,
      combo: state => state.horde.combo,
      zone: state => state.horde.zone,
      bossFight: state => state.horde.bossFight,
      unlock: state => state.unlock,
      currency: state => state.currency,
      fightTime: state => state.horde.fightTime,
      fightRampage: state => state.horde.fightRampage,
      respawn: state => state.horde.respawn
    }),
    ...mapGetters({
      currentCorruption: 'horde/currentCorruption',
      currentBoneBase: 'horde/currentBone',
      currentMonsterPartBase: 'horde/currentMonsterPart',
      corruptionStats: 'horde/currentCorruptionStats',
      corruptionBase: 'horde/currentCorruptionBase',
      currentSigils: 'horde/currentSigils',
      currentSigilVariety: 'horde/currentSigilVariety',
      canFindHeirloom: 'horde/canFindHeirloom'
    }),
    enemyPercentHealth() {
      if (this.enemyStats === null) {
        return 0;
      }
      return 100 * this.enemyStats.health / this.enemyStats.maxHealth;
    },
    currentBone() {
      if (this.enemyStats === null) {
        return 0;
      }
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.currentBoneBase, this.enemyStats.loot);
    },
    currentMonsterPart() {
      return this.$store.getters['mult/get']('currencyHordeMonsterPartGain', this.currentMonsterPartBase);
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
    hasSigils() {
      return this.enemyStats && Object.keys(this.enemyStats.sigil).length > 0;
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
    basicLootMult() {
      return (this.enemyStats === null || this.enemyStats.loot === 1) ? [] : [{name: 'hordeBasicLoot', value: this.enemyStats.loot}];
    },
    enemyRampageTime() {
      return this.bossFight > 0 ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
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
