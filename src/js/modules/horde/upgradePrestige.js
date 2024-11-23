import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementBase = () => store.state.stat[requirementStat].total;
const requirementBase2 = () => store.getters['horde/battlePassCurrentLevel'];

export default {
    wrath: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 60};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    peace: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 60};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    milk: {type: 'prestige', cap: 45, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.65, lvl) * 80};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'base', value: lvl => Math.pow(2, lvl) * 50},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)}
    ]},
    butcher: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.75, lvl) * 100};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'base', value: lvl => lvl * 0.05},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 30}
    ]},
    beginnerLuck: {type: 'prestige', cap: 120, requirementBase, requirementStat, requirementValue: 26, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 375};
    }, effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
    ]},
    balance: {type: 'prestige', requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 1100};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    advancedLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 36, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 4250};
    }, effect: [
        {name: 'hordeHeirloomChance', type: 'base', value: lvl => Math.min(lvl * 0.0025, 0.1)},
        {name: 'hordeNostalgia', type: 'base', value: lvl => lvl * 5}
    ]},
    boneTrader: {type: 'prestige', cap: 150, requirementBase, requirementStat, requirementValue: 41, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.65, lvl) * buildNum(18.5, 'K')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    soulCage: {type: 'prestige', cap: 80, requirementBase, requirementStat, requirementValue: 46, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.35, lvl) * buildNum(65, 'K')};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)}
    ]},
    offenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 51, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * buildNum(350, 'K')};
    }, effect: [
        {name: 'powerHeirloomEffect', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    defenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 56, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * buildNum(1.25, 'M')};
    }, effect: [
        {name: 'fortitudeHeirloomEffect', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    ashCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 61, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.02 + 1.25, lvl) * buildNum(9, 'M')};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.12}
    ]},
    lastWill: {type: 'prestige', cap: 15, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.5 + 3, lvl) * buildNum(75, 'M')};
    }, effect: [
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl}
    ]},
    candleCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 71, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.002 + 1.3, lvl) * buildNum(1.7, 'B')};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.03, lvl)},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    containmentChamber: {type: 'prestige', cap: 100, requirementBase, requirementStat, requirementValue: 81, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3 + lvl * 0.01, lvl) * buildNum(100, 'B')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'hordeHeirloomEffect', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    mausoleum: {type: 'prestige', cap: 80, requirementBase, requirementStat, requirementValue: 91, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.005 + 1.4, lvl) * buildNum(2.4, 'T')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.075, lvl)}
    ]},
    combatStudies: {type: 'prestige', requirementBase, requirementStat, requirementValue: 111, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45 + lvl * 0.025, lvl) * buildNum(85, 'Qa')};
    }, effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.1 + 1)}
    ]},
    boneChamber: {type: 'prestige', requirementBase, requirementStat, requirementValue: 131, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.7 + lvl * 0.05, lvl) * buildNum(275, 'Qi')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    deepHatred: {type: 'prestige', cap: 30, requirementBase, requirementStat, requirementValue: 151, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.02 + 1.6, lvl) * buildNum(2.25, 'Sx')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.06, lvl) * (lvl * 0.1 + 1)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.03, lvl) * (lvl * 0.05 + 1)}
    ]},
    spiritLure: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 181, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.25, lvl) * buildNum(333, 'Sp')};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
    ]},
    mysticalCondenser: {type: 'prestige', requirementBase, requirementStat, requirementValue: 211, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.1 + 2, lvl) * buildNum(15, 'N')};
    }, effect: [
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl}
    ]},

    // Royal upgrades
    royalSword: {type: 'prestige', requirementBase, requirementStat, requirementValue: 140, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 10)};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)}
    ]},
    royalArmor: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalArmor.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 14)};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)}
    ]},
    royalStorage: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalStorage.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 28)};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.1 * lvl + 1)}
    ]},
    royalButcher: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalButcher.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 55)};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (0.05 * lvl + 1)}
    ]},
    royalCrypt: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalCrypt.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 111)};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => getSequence(5, lvl) * 0.01 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => getSequence(5, lvl) * 0.01 + 1}
    ]},
    royalSecret: {type: 'prestige', requirement() {
        return store.state.unlock.hordeUpgradeRoyalSecret.use;
    }, price(lvl) {
        return {horde_crown: Math.round(Math.pow(1.08, lvl) * (lvl + 1) * 222)};
    }, effect: [
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl}
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
    determination: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 7, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.02 + 2.35, lvl) * 6000};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)},
        {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    education: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 10, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.01 + 1.6, lvl) * buildNum(11, 'K')};
    }, effect: [
        {name: 'hordeExpBase', type: 'mult', value: lvl => Math.pow(1 / 1.1, lvl)}
    ]},
    bloodChamber: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 12, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.05 + 2.5, lvl) * buildNum(16, 'K')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    stoneSkin: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 16, price(lvl) {
        return {horde_courage: Math.pow(lvl + 5, lvl) * buildNum(70, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'hordeHealing', type: 'mult', value: lvl => Math.pow(1 / 1.2, lvl)}
    ]},
    university: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 20, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.01 + 1.85, lvl) * buildNum(250, 'K')};
    }, effect: [
        {name: 'hordeExpIncrement', type: 'mult', value: lvl => Math.pow(1 / 1.1, lvl)}
    ]},
    discovery: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 27, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.25 + 4, lvl) * buildNum(5, 'M')};
    }, effect: [
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl},
        {name: 'hordeTrinketGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    innerFocus: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 33, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.5 + 2, lvl) * buildNum(28, 'M')};
    }, effect: [
        {name: 'hordeHealing', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    purge: {type: 'prestige', requirementBase: requirementBase2, requirementValue: 45, price(lvl) {
        return {horde_courage: Math.pow(lvl * 0.015 + 1.25, lvl) * buildNum(150, 'B')};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.09}
    ]},
    chaosCrate: {type: 'prestige', cap: 10, requirementBase: requirementBase2, requirementValue: 65, price(lvl) {
        return {horde_courage: Math.pow(10, lvl) * buildNum(1, 'Qa')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl >= 1 ? (Math.floor((lvl + 4) / 5) * 0.5 + 1) : null},
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl >= 2 ? (Math.floor((lvl + 3) / 5) * 5) : null},
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => lvl >= 3 ? (Math.floor((lvl + 2) / 5) * 0.5 + 1) : null},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl >= 4 ? (Math.floor((lvl + 1) / 5) * 10) : null},
        {name: 'hordeSkillPointsPerLevel', type: 'base', value: lvl => lvl >= 5 ? Math.floor(lvl / 5) : null},
    ]},
}
