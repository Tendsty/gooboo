<style scoped>
.health-bar-icon {
  position: absolute;
  left: 4px;
  top: 4px;
}
.health-bar-defense {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
}
.health-bar-execute {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  opacity: 0.5;
}
.boss-title {
  font-size: 52px;
  height: 58px;
  line-height: 3.5rem;
  font-weight: 200;
  letter-spacing: 3px;
}
.rare-loot-row {
  position: relative;
}
.rare-loot-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.2;
}
.boss-count-chip {
  min-width: 110px;
}
.boss-count-chip >>> .v-chip__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.fight-time-chip {
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>

<template>
  <v-card v-if="isInZone">
    <v-card-title class="pa-2 justify-center">
      <span v-if="currentTower !== null">
        {{ $vuetify.lang.t(`$vuetify.horde.tower.${ currentTower }`) }}
        <v-icon>mdi-circle-small</v-icon>
        {{ $vuetify.lang.t(`$vuetify.horde.tower.floor`, towerFloor + 1) }}
      </span>
      <span v-else-if="raidboss">{{ $vuetify.lang.t('$vuetify.horde.raidboss') }}</span>
      <span v-else-if="subfeature === 1 && bossFight && enemyStats !== null" class="boss-title" :style="`text-shadow: ${ bossTextShadow ? bossTextShadow : 'none'};`">{{ $vuetify.lang.t(`$vuetify.horde.bossName.${ enemyStats.name }`) }}</span>
      <span v-else-if="bossFight">{{ $vuetify.lang.t('$vuetify.horde.boss') }}</span>
      <gb-tooltip v-else>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <span>{{ $vuetify.lang.t('$vuetify.horde.enemy') + ' #' + (combo + 1) }}</span>
            <span v-if="enemyAmount !== null">&nbsp;/&nbsp;{{ enemyAmount }}</span>
          </span>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.${ subfeature === 0 ? 'enemyDescription' : 'enemyDescriptionClasses' }`, comboAttackBase, comboHealthBase, comboBoneBase, combo + 1, $formatNum(comboAttack, true), $formatNum(comboHealth, true), $formatNum(comboBone, true)) }}</div>
        <div v-if="hasSigils">
          <span>{{ $vuetify.lang.t(`$vuetify.horde.enemySigil1.${ currentSigils === 1 ? 's' : 'p' }`, currentSigils) }}</span>
          <span>{{ $vuetify.lang.t(`$vuetify.horde.enemySigil2.${ currentSigilVariety === 1 ? 's' : 'p' }`, currentSigilVariety) }}</span>
        </div>
      </gb-tooltip>
    </v-card-title>
    <v-card-subtitle class="text-center mt-n3" style="min-height: 38px;" v-if="subfeature === 1 && !bossFight"><span v-if="enemyStats !== null && enemyStats.name">{{ $vuetify.lang.t(`$vuetify.horde.enemyName.${ enemyStats.name.split('_')[0] }`) }}</span></v-card-subtitle>
    <v-card-text class="pb-2">
      <div v-if="hasSigils" class="d-flex flex-wrap mx-n1 mt-n1 mb-1">
        <sigil v-for="sigilName in sigilList" :key="'sigil-' + sigilName" class="ma-1" :name="sigilName" :tier="enemyStats && enemyStats.sigil[sigilName] ? enemyStats.sigil[sigilName] : 0"></sigil>
      </div>
      <div v-else-if="zone >= 20" class="d-flex align-center" style="height: 48px;">
        <template v-if="currentElement !== null">
          <v-icon :color="elementCurrency.color">{{ elementCurrency.icon }}</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.horde.element.enemyStats')">
            <template v-slot:activator="{ on, attrs }">
              <v-chip small class="ml-2 px-2" v-bind="attrs" v-on="on">
                <v-icon class="mr-1">mdi-sword</v-icon>
                <span>{{ $formatInt(enemyStatsElementPower) }}</span>
              </v-chip>
            </template>
            <display-row class="mt-0" v-for="(item, key) in enemyElementalStats" :key="'enemy-elemental-' + key" :name="item.name" :type="item.type" :after="item.amount"></display-row>
          </gb-tooltip>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.horde.element.enemyActive')">
            <template v-slot:activator="{ on, attrs }">
              <v-chip v-if="enemyActivesElementPower > 0" small class="ml-2 px-2" v-bind="attrs" v-on="on">
                <v-icon class="mr-1">mdi-magic-staff</v-icon>
                <span>{{ $formatInt(enemyActivesElementPower) }}</span>
              </v-chip>
            </template>
            <div>{{ $vuetify.lang.t('$vuetify.horde.element.enemyActiveDescription') }}</div>
          </gb-tooltip>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.horde.element.playerElement')">
            <template v-slot:activator="{ on, attrs }">
              <v-chip v-if="playerElementPower > 0" small class="ml-2 px-2" v-bind="attrs" v-on="on">
                <v-icon class="mr-1">mdi-arrow-u-left-bottom</v-icon>
                <span>{{ $formatInt(playerElementPower) }}</span>
              </v-chip>
            </template>
            <display-row class="mt-0" v-for="(item, key) in playerElementalStats" :key="'player-elemental-' + key" :name="item.name" :type="item.type" :after="item.value"></display-row>
          </gb-tooltip>
          <v-spacer></v-spacer>
          <v-btn width="36" min-width="36" color="primary" @click="toggleShowElementalUpgrades">
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </template>
      </div>
      <div v-if="showElementalUpgrades">
        <currency :name="elementCurrencyName" class="mx-auto mb-2"></currency>
        <v-simple-table dense class="mb-2">
          <thead>
            <tr>
              <th></th>
              <th class="text-center"></th>
              <th class="text-center"></th>
              <th class="text-center">=</th>
              <th class="text-right"><span class="mr-2">{{ $vuetify.lang.t('$vuetify.gooboo.upgrade') }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><v-icon class="mr-1">mdi-sword</v-icon></td>
              <td class="text-center">{{ $formatInt(baseElementPower) }}</td>
              <td class="text-center">-{{ $formatInt(element.upgradeEnemyStats) }}</td>
              <td class="text-center">{{ $formatInt(enemyStatsElementPower) }}</td>
              <td class="text-right">
                <price-tag class="ma-1" :amount="upgradeEnemyStatsCost" :currency="elementCurrencyName"></price-tag>
                <v-btn class="ma-1" small color="primary" @click="buyElementalUpgrade('upgradeEnemyStats')">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
              </td>
            </tr>
            <tr>
              <td><v-icon class="mr-1">mdi-magic-staff</v-icon></td>
              <td class="text-center">{{ $formatInt(baseElementPower) }}</td>
              <td class="text-center">-{{ $formatInt(element.upgradeEnemyActives) }}</td>
              <td class="text-center">{{ $formatInt(enemyActivesElementPower) }}</td>
              <td class="text-right">
                <price-tag class="ma-1" :amount="upgradeEnemyActivesCost" :currency="elementCurrencyName"></price-tag>
                <v-btn class="ma-1" small color="primary" @click="buyElementalUpgrade('upgradeEnemyActives')">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
              </td>
            </tr>
            <tr>
              <td><v-icon class="mr-1">mdi-arrow-u-left-bottom</v-icon></td>
              <td class="text-center">{{ $formatInt(element.upgradePlayerElemental) }}</td>
              <td class="text-center">-{{ $formatInt(baseElementPlayerPower) }}</td>
              <td class="text-center">{{ $formatInt(playerElementPower) }}</td>
              <td class="text-right">
                <price-tag class="ma-1" :amount="upgradePlayerElementalCost" :currency="elementCurrencyName"></price-tag>
                <v-btn class="ma-1" small color="primary" @click="buyElementalUpgrade('upgradePlayerElemental')">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
              </td>
            </tr>
            <tr>
              <td><v-icon class="mr-1">mdi-arrow-up-bold</v-icon></td>
              <td></td>
              <td></td>
              <td class="text-center">{{ $formatInt(element.upgradePlayerStats) }}</td>
              <td class="text-right">
                <price-tag class="ma-1" :amount="upgradePlayerStatsCost" :currency="elementCurrencyName"></price-tag>
                <v-btn class="ma-1" small color="primary" @click="buyElementalUpgrade('upgradePlayerStats')">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <v-progress-linear height="24" color="green" class="balloon-text-dynamic" :value="enemyPercentHealth">
        <v-icon class="health-bar-icon" small>mdi-heart</v-icon>
        <span v-if="enemyStats !== null">{{ $formatNum(enemyStats.health) }} / {{ $formatNum(enemyStats.maxHealth) }}</span>
        <span v-else-if="nextEnemyStats !== null">({{ $formatNum(nextEnemyStats.health) }})</span>
        <div v-if="enemyStats !== null && enemyStats.defense > 0" class="health-bar-defense dark-blue" :style="`width: ${ enemyStats.defense * 100 }%;`"></div>
        <div v-if="playerExecute > 0" class="health-bar-execute red" :style="`left: calc(${ playerExecute * 100 }% - 1px);`"></div>
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
        :defense="enemyStats.defense"
        :execute="enemyStats.execute"
        :toxic="enemyStats.toxic"
        :division-shield="enemyStats.divisionShield"
        :max-division-shield="enemyStats.maxDivisionShield"
        :status-resist="enemyStats.statusResist"
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
          <div class="mt-0" v-for="(stat, name) in corruptionStats" :key="name">{{ $vuetify.lang.t(`$vuetify.horde.corruption.${ name }`, name === 'execute' ? $formatNum(stat * 100, true) : $formatNum(stat, true)) }}</div>
        </gb-tooltip>
        <gb-tooltip v-if="fightRampage > 0" :title-text="$vuetify.lang.t('$vuetify.horde.rampage.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`deep-orange ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-emoticon-angry</v-icon>
              {{ $formatNum(fightRampage) }}
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.description', $formatTime(fightTime), $formatTime(enemyRampageTime)) }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.effect', $formatNum(rampageStats.attack, true), $formatNum(rampageStats.statusResist)) }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rampage.effectCurrent', $formatNum(fightRampage), $formatNum(rampageStats.attackNow, true), $formatNum(rampageStats.statusResistNow)) }}</div>
        </gb-tooltip>
      </entity-status>
      <div v-else-if="nextEnemyStats !== null" style="height: 60px;">
        <v-chip label small :color="`red ${ themeModifier }`" class="balloon-text-dynamic mt-8 px-2"><v-icon class="mr-2">mdi-sword-cross</v-icon>({{ $formatNum(nextEnemyStats.attack) }})</v-chip>
        <v-chip v-if="currentCorruption > 0" label small :color="`deep-purple ${ themeModifier }`" class="balloon-text-dynamic mt-8 ml-2 px-2"><v-icon class="mr-2">mdi-skull</v-icon>({{ $formatNum(currentCorruption * 100) }}%)</v-chip>
      </div>
      <div class="d-flex flex-wrap my-1 mx-n1" style="min-height: 32px;">
        <gb-tooltip key="reward-bone" v-if="subfeature === 0 && !bossFight && currentTower === null" :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_bone.name'))">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_bone.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">{{ currency.horde_bone.icon }}</v-icon>
              <span v-if="enemyStats === null">(</span>
              <span>{{ $formatNum(currentBone) }}</span>
              <span v-if="enemyStats === null">)</span>
            </v-chip>
          </template>
          <stat-breakdown name="currencyHordeBoneGain" :base="currentBoneBase" :multArray="basicLootMult"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip key="reward-bone" v-if="subfeature === 1 && !bossFight" :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_blood.name'))">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_blood.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">{{ currency.horde_blood.icon }}</v-icon>
              <span v-if="enemyStats === null">(</span>
              <span>{{ $formatNum(currentBlood) }}</span>
              <span v-if="enemyStats === null">)</span>
            </v-chip>
          </template>
          <stat-breakdown name="currencyHordeBloodGain" :base="currentBloodBase"></stat-breakdown>
        </gb-tooltip>
        <template v-if="enemyStats !== null">
          <price-tag key="reward-crown" v-if="currentTower !== null" class="ma-1" currency="horde_crown" :amount="towerStats.crowns" add></price-tag>
        </template>
        <gb-tooltip
          key="reward-monster-part"
          v-else-if="subfeature === 0 && respawn <= 0 && zone >= monsterPartMinZone && combo > 0"
          :title-text="$vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t('$vuetify.currency.horde_monsterPart.name'))"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_monsterPart.color } ${ themeModifier }`" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-stomach</v-icon>{{ $formatNum(currentMonsterPart, true) }}/s</v-chip>
          </template>
          <stat-breakdown name="currencyHordeMonsterPartGain" :base="currentMonsterPartBase" :multArray="basicLootMult"></stat-breakdown>
        </gb-tooltip>
      </div>
      <div v-if="canCollectRareLoot" class="d-flex rare-loot-row flex-wrap align-center my-1 mx-n1">
        <div class="rare-loot-bg amber rounded-xl"></div>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.rareLoot`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-1 boss-count-chip balloon-text-dynamic" :color="`amber ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-1" size="18">mdi-creation</v-icon>
              <v-icon v-if="rareLootTimer >= 1">mdi-check</v-icon>
              <span v-else>{{ $formatTime(Math.ceil((1 - rareLootTimer) * rareLootTime)) }}</span>
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.horde.rareLootDescription') }}</div>
          <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.hordeRareLootTime') }}</h3>
          <stat-breakdown name="hordeRareLootTime"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip key="reward-soul" v-if="subfeature === 0" :title-text="$vuetify.lang.t('$vuetify.currency.horde_soulCorrupted.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_soulCorrupted.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-ghost</v-icon>
              {{ $formatNum(hordeSoulGain) }}
            </v-chip>
          </template>
          <stat-breakdown name="currencyHordeSoulCorruptedGain"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip key="reward-heirloom" v-if="subfeature === 0 && (canFindHeirloom && hordeHeirloomChance > 0) || (currentTower !== null && onHeirloomFloor)" :title-text="$vuetify.lang.t('$vuetify.horde.heirloom.name')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`cyan ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-necklace</v-icon>
              {{ $formatNum(currentTower !== null ? 100 : (hordeHeirloomChance * 100), true) }}%
            </v-chip>
          </template>
          <div v-if="currentTower === null">{{ $vuetify.lang.t('$vuetify.horde.heirloom.description') }}</div>
          <div v-else>{{ $vuetify.lang.t('$vuetify.horde.heirloom.descriptionTower', heirloomFloors) }}</div>
          <template v-if="currentTower === null">
            <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</h3>
            <stat-breakdown name="hordeHeirloomChance"></stat-breakdown>
          </template>
          <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</h3>
          <stat-breakdown name="hordeHeirloomAmount"></stat-breakdown>
          <alert-text class="mt-2" type="info">{{ $vuetify.lang.t('$vuetify.horde.heirloom.descriptionDouble') }}</alert-text>
          <template v-if="currentTower === null && hordeNostalgia > 0">
            <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.hordeNostalgia') }}</h3>
            <stat-breakdown name="hordeNostalgia"></stat-breakdown>
            <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.descriptionNostalgia') }}</div>
          </template>
        </gb-tooltip>
        <gb-tooltip key="reward-elemental-essence" v-if="canFindEssence" :title-text="$vuetify.lang.t(`$vuetify.currency.horde_${ currentElement }Essence.name`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency[`horde_${ currentElement }Essence`].color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">{{ currency[`horde_${ currentElement }Essence`].icon }}</v-icon>
              {{ $formatNum(elementalEssenceGain) }}
            </v-chip>
          </template>
          <stat-breakdown :name="currentEssenceCurrencyName" :base="elementalEssenceBaseGain"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip key="reward-courage" v-if="subfeature === 1 && courageScoreBaseGain > 0" :title-text="$vuetify.lang.t(`$vuetify.mult.hordeCourageScore`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency.horde_courage.color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-ghost</v-icon>
              {{ $formatNum(hordeCourageScore, true) }}
            </v-chip>
          </template>
          <stat-breakdown name="hordeCourageScore" :base="courageScoreBaseGain"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip key="reward-teeth" v-if="canFindTeeth" :title-text="$vuetify.lang.t(`$vuetify.currency.${ toothCurrencyName }.name`)">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="balloon-text-dynamic ma-1 px-2" :color="`${ currency[toothCurrencyName].color } ${ themeModifier }`" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-tooth</v-icon>
              {{ $formatNum(toothGainChance * 100, true) }}%
            </v-chip>
          </template>
          <stat-breakdown :name="toothCurrencyGainName"></stat-breakdown>
        </gb-tooltip>
      </div>
    </v-card-text>
    <v-chip v-if="enemyStats !== null" small class="fight-time-chip px-2">
      <v-icon class="mr-1">mdi-timer</v-icon>
      <span>{{ $formatTime(fightTime) }}</span>
    </v-chip>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { HORDE_BASE_ELEMENTAL_POWER, HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_HEIRLOOM_TOWER_FLOORS, HORDE_MONSTER_PART_MIN_ZONE, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_ENEMY_TIME, HORDE_RAMPAGE_STUN_RESIST } from '../../../js/constants';
import { buildNum, capitalize } from '../../../js/utils/format';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import EntityStatus from './EntityStatus.vue';
import Sigil from './Sigil.vue';

export default {
  components: { Sigil, StatBreakdown, EntityStatus, AlertText, PriceTag, Currency, DisplayRow },
  data: () => ({
    showElementalUpgrades: false
  }),
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
      respawn: state => state.horde.respawn,
      currentTower: state => state.horde.currentTower,
      towerFloor: state => state.horde.towerFloor,
      subfeature: state => state.system.features.horde.currentSubfeature,
      area: state => state.horde.area,
      selectedArea: state => state.horde.selectedArea,
      rareLootTimer: state => state.horde.rareLootTimer,
      raidboss: state => state.horde.raidboss,
    }),
    ...mapGetters({
      currentCorruption: 'horde/currentCorruption',
      currentBoneBase: 'horde/currentBone',
      currentBloodBase: 'horde/currentBlood',
      currentMonsterPartBase: 'horde/currentMonsterPart',
      corruptionStats: 'horde/currentCorruptionStats',
      corruptionBase: 'horde/currentCorruptionBase',
      currentSigils: 'horde/currentSigils',
      currentSigilVariety: 'horde/currentSigilVariety',
      canFindHeirloom: 'horde/canFindHeirloom',
      canCollectRareLoot: 'horde/canCollectRareLoot',
      currentElement: 'horde/currentElement',
      elementalEssenceBaseGain: 'horde/elementalEssenceBaseGain',
      elementalEssenceGain: 'horde/elementalEssenceGain',
      canFindTeeth: 'horde/canFindTeeth',
      courageScoreBaseGain: 'horde/courageScoreGain',
    }),
    enemyPercentHealth() {
      if (this.enemyStats === null) {
        return 0;
      }
      if (this.enemyStats.health === Infinity) {
        return 100;
      }
      return 100 * this.enemyStats.health / this.enemyStats.maxHealth;
    },
    currentBone() {
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.currentBoneBase, this.enemyStats === null ? 1 : this.enemyStats.loot);
    },
    currentBlood() {
      return this.$store.getters['mult/get']('currencyHordeBloodGain', this.currentBloodBase);
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
    hordeCourageScore() {
      return this.$store.getters['mult/get']('hordeCourageScore', this.courageScoreBaseGain);
    },
    hasSigils() {
      return Object.keys(this.sigilList).length > 0;
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
      return this.bossFight ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
    },
    rampageStats() {
      return {
        attack: HORDE_RAMPAGE_ATTACK,
        statusResist: HORDE_RAMPAGE_STUN_RESIST,
        attackNow: Math.pow(HORDE_RAMPAGE_ATTACK, this.fightRampage),
        statusResistNow: HORDE_RAMPAGE_STUN_RESIST * this.fightRampage
      };
    },
    sigilList() {
      if (this.currentTower !== null) {
        return this.$store.state.horde.tower[this.currentTower].sigils;
      }
      if (this.$store.state.horde.raidboss) {
        return ['raidRage', 'monstrousToughness'];
      }
      if (this.subfeature === 1 || this.currentElement !== null) {
        return [];
      }
      return this.$store.state.horde.sigilZones.length < this.zone ? [] : this.$store.state.horde.sigilZones[this.zone - 1];
    },
    towerStats() {
      if (this.currentTower === null) {
        return {};
      }
      return this.$store.state.horde.tower[this.currentTower];
    },
    heirloomFloors() {
      return HORDE_HEIRLOOM_TOWER_FLOORS;
    },
    onHeirloomFloor() {
      return (this.towerFloor + 1) % HORDE_HEIRLOOM_TOWER_FLOORS === 0;
    },
    nextEnemyStats() {
      if (this.subfeature === 1 && this.selectedArea === null) {
        return null;
      }
      const baseStats = this.$store.getters['horde/enemyStats'](this.subfeature === 1 ? this.area[this.selectedArea].zones[this.zone].difficulty : this.zone, this.combo);
      const corruptionStats = this.$store.getters['horde/currentCorruptionStats'];
      const statMult = (corruptionStats.power ?? 1) * (this.subfeature === 1 ? buildNum(100, 'K') : 1);
      return {
        attack: baseStats.attack * statMult,
        health: baseStats.health * statMult,
      };
    },
    isInZone() {
      return this.subfeature !== 1 || this.selectedArea !== null;
    },
    enemyAmount() {
      if (this.subfeature !== 1 || this.selectedArea === null) {
        return null;
      }
      return this.area[this.selectedArea].zones[this.zone].enemyAmount;
    },
    bossTextShadow() {
      return (this.subfeature !== 1 || !this.bossFight || this.enemyStats === null || this.zone === 'digsite') ? null : this.$store.state.horde.areaBoss[this.enemyStats.name].textShadow;
    },
    playerExecute() {
      return this.$store.state.horde.cachePlayerStats.execute;
    },
    rareLootTime() {
      return this.$store.getters['mult/get']('hordeRareLootTime');
    },
    element() {
      return this.currentElement !== null ? this.$store.state.horde.element[this.currentElement] : null;
    },
    elementCurrencyName() {
      return this.currentElement !== null ? `horde_${ this.currentElement }Essence` : null;
    },
    elementCurrency() {
      return this.currentElement !== null ? this.$store.state.currency[this.elementCurrencyName] : null;
    },
    baseElementPower() {
      return HORDE_BASE_ELEMENTAL_POWER + this.zone - this.element.minZone;
    },
    baseElementPlayerPower() {
      return this.zone - this.element.minZone;
    },
    enemyStatsElementPower() {
      return Math.max(0, this.baseElementPower - this.element.upgradeEnemyStats);
    },
    enemyActivesElementPower() {
      return Math.max(0, this.baseElementPower - this.element.upgradeEnemyActives);
    },
    playerElementPower() {
      return Math.max(0, this.element.upgradePlayerElemental - this.baseElementPlayerPower);
    },
    upgradeEnemyStatsCost() {
      return this.$store.getters['horde/elementalUpgradeCost']('upgradeEnemyStats');
    },
    upgradeEnemyActivesCost() {
      return this.$store.getters['horde/elementalUpgradeCost']('upgradeEnemyActives');
    },
    upgradePlayerElementalCost() {
      return this.$store.getters['horde/elementalUpgradeCost']('upgradePlayerElemental');
    },
    upgradePlayerStatsCost() {
      return this.$store.getters['horde/elementalUpgradeCost']('upgradePlayerStats');
    },
    playerElementalStats() {
      return this.currentElement !== null ? this.$store.state.horde.element[this.currentElement].playerElemental(this.playerElementPower) : [];
    },
    enemyElementalStats() {
      let obj = {};
      if (this.currentElement !== null) {
        for (const [key, elem] of Object.entries(this.$store.state.horde.element[this.currentElement].enemyStats(this.enemyStatsElementPower))) {
          obj[key] = {type: elem.type, name: 'horde' + capitalize(key), amount: elem.amount};
        }
      }
      return obj;
    },
    toothCurrencyName() {
      return this.canFindTeeth ? `horde_monsterTooth${ capitalize(this.selectedArea) }` : null;
    },
    toothCurrencyGainName() {
      return this.canFindTeeth ? `currencyHordeMonsterTooth${ capitalize(this.selectedArea) }Gain` : null;
    },
    toothGainChance() {
      return this.toothCurrencyGainName ? this.$store.getters['mult/get'](this.toothCurrencyGainName) : 0;
    },
    canFindEssence() {
      return this.$store.state.horde.items.essenceExtractor.equipped && this.elementalEssenceGain > 0;
    },
    currentEssenceCurrencyName() {
      return this.currentElement === null ? null : `currencyHorde${ capitalize(this.currentElement) }EssenceGain`;
    }
  },
  methods: {
    toggleShowElementalUpgrades() {
      this.showElementalUpgrades = !this.showElementalUpgrades;
    },
    buyElementalUpgrade(name) {
      this.$store.dispatch('horde/buyElementalUpgrade', name);
    }
  }
}
</script>
