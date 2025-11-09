import store from "../../../store";
import { getDiminishing, getSequence } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementStat2 = 'custom_hordeBattlepass';
const requirementBase = () => store.state.stat[requirementStat].total;
const requirementBase2 = () => store.getters['horde/battlePassCurrentLevel'];

export default {
    wrath: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 60};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    peace: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 60};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    milk: {type: 'prestige', cap: 45, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45, lvl) * 80};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'base', value: lvl => Math.pow(2, lvl) * 50},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)}
    ]},
    butcher: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 100};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'base', value: lvl => lvl * 0.05},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 30},
        {name: 'hordeBossRequirement', type: 'base', value: lvl => lvl * -1}
    ]},
    beginnerLuck: {type: 'prestige', cap: 120, requirementBase, requirementStat, requirementValue: 26, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.65, lvl) * 375};
    }, effect: [
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    balance: {type: 'prestige', requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.375, lvl) * 1100};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.13, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.13, lvl)}
    ]},
    advancedLuck: {type: 'prestige', cap: 40, requirementBase, requirementStat, requirementValue: 36, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.65, lvl) * 3250};
    }, effect: [
        {name: 'hordeHeirloomChance', type: 'base', value: lvl => lvl * 0.0025},
        {name: 'hordeNostalgia', type: 'base', value: lvl => lvl * 5}
    ]},
    boneTrader: {type: 'prestige', cap: 150, requirementBase, requirementStat, requirementValue: 41, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45, lvl) * 1.15e4};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    soulCage: {type: 'prestige', cap: 80, requirementBase, requirementStat, requirementValue: 46, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.95, lvl) * 4.5e4};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.04 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => Math.pow(1.3, lvl) * (lvl * 0.1 + 1)}
    ]},
    victoryCelebration: {type: 'prestige', cap: 7, requirementBase, requirementStat, requirementValue: 48, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1000, lvl) * 7.5e4};
    }, effect: [
        {name: 'hordeRaidHealth', type: 'base', value: lvl => lvl >= 1 ? (Math.floor((lvl + 1) / 2) * 0.05) : null},
        {name: 'hordeRaidAttack', type: 'base', value: lvl => lvl >= 2 ? (Math.floor(lvl / 2) * 0.05) : null},
    ]},
    offenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 51, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.225, lvl) * 2.25e5};
    }, effect: [
        {name: 'powerHeirloomEffect', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    defenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 56, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.225, lvl) * 7.5e5};
    }, effect: [
        {name: 'fortitudeHeirloomEffect', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    ashCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 61, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.015 + 1.2, lvl) * 4e6};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.12}
    ]},
    lastWill: {type: 'prestige', cap: 15, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.375 + 2.5, lvl) * 3e7};
    }, effect: [
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl}
    ]},
    candleCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 71, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.0015 + 1.225, lvl) * 6e8};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.03, lvl)},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    spoilsOfWar: {type: 'prestige', cap: 5, requirementBase, requirementStat, requirementValue: 76, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1e4, lvl) * 3e9};
    }, effect: [
        {name: 'hordeRaidEquipmentChance', type: 'base', value: lvl => getSequence(1, lvl) * 0.05}
    ]},
    containmentChamber: {type: 'prestige', cap: 100, requirementBase, requirementStat, requirementValue: 81, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.225 + lvl * 0.0075, lvl) * 2e10};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'hordeHeirloomEffect', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    mausoleum: {type: 'prestige', cap: 80, requirementBase, requirementStat, requirementValue: 91, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.00375 + 1.3, lvl) * 2.4e11};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.06, lvl)}
    ]},
    combatStudies: {type: 'prestige', requirementBase, requirementStat, requirementValue: 111, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.35 + lvl * 0.02, lvl) * 3.5e15};
    }, effect: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.1 + 1)}
    ]},
    boneChamber: {type: 'prestige', requirementBase, requirementStat, requirementValue: 131, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.3 + lvl * 0.04, lvl) * 1.25e18};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    deepHatred: {type: 'prestige', cap: 30, requirementBase, requirementStat, requirementValue: 151, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.015 + 1.45, lvl) * 9e19};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.08, lvl) * (lvl * 0.1 + 1)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.04, lvl) * (lvl * 0.05 + 1)}
    ]},
    moreDummies: {type: 'prestige', cap: 20, raiseOtherCap: 'horde_targetDummy', requirementBase, requirementStat, requirementValue: 171, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.3 + 6, lvl) * 9e21};
    }, effect: [
        {name: 'upgradeHordeTargetDummyCap', type: 'base', value: lvl => lvl * 5}
    ]},
    spiritLure: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 191, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.18, lvl) * 3.33e24};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.06 + 1}
    ]},
    mysticalCondenser: {type: 'prestige', cap: 25, requirementBase, requirementStat, requirementValue: 211, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.075 + 1.75, lvl) * 1.5e28};
    }, effect: [
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl * 2}
    ]},
    secretTraining: {type: 'prestige', cap: 20, requirementBase, requirementStat, requirementValue: 241, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.0225 + 1.6, lvl) * 2.2e30};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.2 + 1)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.2 + 1)}
    ]},
    secretStorage: {type: 'prestige', cap: 30, requirementBase, requirementStat, requirementValue: 271, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.015 + 1.5, lvl) * 6.3e32};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl}
    ]},
    pathfinder: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 301, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.0075 + 1.375, lvl) * 1.15e35};
    }, effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    exoskeleton: {type: 'prestige', cap: 25, requirementBase, requirementStat, requirementValue: 331, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.85 + lvl * 0.075, lvl) * 5.1e38};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    essenceCollector: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 361, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.12 + 1.4, lvl) * 1.85e41};
    }, effect: [
        {name: 'hordeEssenceGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},

    // Royal upgrades
    royalSword: {type: 'prestige', requirementBase, requirementStat, requirementValue: 140, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 10)};
    }, effect: [
        {name: 'hordeRaidAttack', type: 'base', value: lvl => lvl * 0.01},
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
    ]},
    royalArmor: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalArmor.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 14)};
    }, effect: [
        {name: 'hordeRaidHealth', type: 'base', value: lvl => lvl * 0.01},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
    ]},
    royalStorage: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalStorage.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 28)};
    }, effect: [
        {name: 'hordeRaidBoneGain', type: 'base', value: lvl => lvl * 0.01},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
    ]},
    royalButcher: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalButcher.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 55)};
    }, effect: [
        {name: 'hordeRaidMonsterPartGain', type: 'base', value: lvl => lvl * 0.005},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.05 * lvl + 1)},
    ]},
    royalCrypt: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalCrypt.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 111)};
    }, effect: [
        {name: 'hordeRaidSoulCorruptedGain', type: 'base', value: lvl => getDiminishing(lvl) * 0.001},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => getSequence(5, lvl) * 0.01 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => getSequence(5, lvl) * 0.01 + 1},
    ]},
    royalSecret: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalSecret.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 222)};
    }, effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl * 2}
    ]},
    royalBlessing: {type: 'prestige', cap: 6, requirement() {
        return store.state.unlock.hordeUpgradeRoyalBlessing.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(2, lvl) * 1000)};
    }, effect: [
        {name: 'hordeEquipmentBlessedSword', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'hordeEquipmentBlessedArmor', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'hordeEquipmentBlessedBow', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'hordeEquipmentBlessedFlame', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'hordeEquipmentBlessedWater', type: 'unlock', value: lvl => lvl >= 5},
        {name: 'hordeEquipmentBlessedShield', type: 'unlock', value: lvl => lvl >= 6},
    ]},

    precision: {type: 'prestige', requirement() {
        return store.state.unlock.hordeClassesSubfeature.see;
    }, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.01 + 1.55, lvl) * 1000};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    resolve: {type: 'prestige', requirement() {
        return store.state.unlock.hordeClassesSubfeature.see;
    }, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.01 + 1.55, lvl) * 1250};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    determination: {type: 'prestige', requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 7, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.02 + 2.35, lvl) * 6000};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    education: {type: 'prestige', requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 10, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.01 + 1.6, lvl) * 1.1e4};
    }, effect: [
        {name: 'hordeExpBase', type: 'mult', value: lvl => Math.pow(1 / 1.1, lvl)}
    ]},
    bloodChamber: {type: 'prestige', requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 12, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.05 + 2.5, lvl) * 1.6e4};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(2.25, lvl)}
    ]},
    stoneSkin: {type: 'prestige', cap: 30, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 16, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.5 + 5, lvl) * 7e4};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    university: {type: 'prestige', requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 20, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.02 + 1.85, lvl) * 2.5e5};
    }, effect: [
        {name: 'hordeExpIncrement', type: 'mult', value: lvl => Math.pow(1 / 1.05, lvl) / (lvl * 0.05 + 1)}
    ]},
    discovery: {type: 'prestige', cap: 40, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 27, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.25 + 4, lvl) * 5e6};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => Math.pow(lvl * 0.01 + 1.4, lvl)},
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl},
        {name: 'hordeTrinketGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    innerFocus: {type: 'prestige', cap: 30, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 33, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.5 + 2, lvl) * 2.8e7};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    purge: {type: 'prestige', requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 45, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.015 + 1.25, lvl) * 1.5e11};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.09}
    ]},
    defensiveStance: {type: 'prestige', cap: 20, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 53, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.1 + 2.25, lvl) * 6e12};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.16, lvl)},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    chaosCrate: {type: 'prestige', cap: 10, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 65, price(lvl) {
        return {horde_courage: Math.pow(10, lvl) * 1e14};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => lvl >= 1 ? (Math.floor((lvl + 4) / 5) * 0.5 + 1) : null},
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl >= 2 ? (Math.floor((lvl + 3) / 5) * 5) : null},
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => lvl >= 3 ? (Math.floor((lvl + 2) / 5) * 0.5 + 1) : null},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl >= 4 ? (Math.floor((lvl + 1) / 5) * 10) : null},
        {name: 'hordeSkillPointsPerLevel', type: 'base', value: lvl => lvl >= 5 ? Math.floor(lvl / 5) : null},
    ]},
    limitBreak: {type: 'prestige', cap: 25, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 85, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.1 + 1.65, lvl) * 7.75e15};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    headhunter: {type: 'prestige', cap: 10, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 113, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.85 + 2.75, lvl) * 2.25e17};
    }, effect: [
        {name: 'currencyHordeMonsterToothWarzoneGain', type: 'base', value: lvl => lvl * 0.015},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl * 5}
    ]},
    templeExploration: {type: 'prestige', cap: 10, requirementBase: requirementBase2, requirementStat: requirementStat2, requirementValue: 130, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.85 + 2.75, lvl) * 1.6e19};
    }, effect: [
        {name: 'currencyHordeMonsterToothMonkeyJungleGain', type: 'base', value: lvl => lvl * 0.015},
        {name: 'hordeHeirloomEffect', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
}
