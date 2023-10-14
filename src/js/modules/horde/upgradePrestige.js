import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementBase = () => store.state.stat[requirementStat].total;

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
    beginnerLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 26, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 275};
    }, effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
    ]},
    balance: {type: 'prestige', requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 700};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    advancedLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 36, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 2200};
    }, effect: [
        {name: 'hordeHeirloomChance', type: 'mult', value: lvl => Math.min(lvl * 0.05 + 1, 3)},
        {name: 'hordeNostalgia', type: 'base', value: lvl => lvl}
    ]},
    boneTrader: {type: 'prestige', requirementBase, requirementStat, requirementValue: 41, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.65, lvl) * 9250};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    soulCage: {type: 'prestige', requirementBase, requirementStat, requirementValue: 46, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.35, lvl) * buildNum(45, 'K')};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)}
    ]},
    offenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 51, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * buildNum(200, 'K')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    defenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 56, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * buildNum(900, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)}
    ]},
    ashCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 61, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.02 + 1.25, lvl) * buildNum(5.75, 'M')};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.12}
    ]},
    lastWill: {type: 'prestige', cap: 15, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.5 + 3, lvl) * buildNum(15, 'M')};
    }, effect: [
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl}
    ]},
    candleCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 71, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.002 + 1.3, lvl) * buildNum(770, 'M')};
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
    mausoleum: {type: 'prestige', requirementBase, requirementStat, requirementValue: 91, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.005 + 1.4, lvl) * buildNum(2.4, 'T')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => Math.pow(1.075, lvl)}
    ]},
    combatStudies: {type: 'prestige', requirementBase, requirementStat, requirementValue: 111, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45 + lvl * 0.025, lvl) * buildNum(85, 'Qa')};
    }, effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    boneChamber: {type: 'prestige', requirementBase, requirementStat, requirementValue: 131, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.7 + lvl * 0.05, lvl) * buildNum(275, 'Qi')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
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
}
