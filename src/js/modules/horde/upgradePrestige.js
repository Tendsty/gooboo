import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    decimate: {type: 'prestige', price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.55, lvl) * 4};
    }, effect: []},
    balance: {type: 'prestige', price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * 5};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.06, lvl)}
    ]},
    wrath: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 6};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    peace: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 6};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    milk: {type: 'prestige', price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 8};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    butcher: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.4, lvl) * 10};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'base', value: lvl => lvl * 0.05},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 30}
    ]},
    ritualTome: {type: 'prestige', cap: 10, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.6, lvl) * 14};
    }, effect: []},
    beginnerLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 26, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 40};
    }, effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'hordeSoulChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    backpack: {type: 'prestige', cap: 4, requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_soulEmpowered: Math.pow(10, lvl) * 50};
    }, effect: [
        {name: 'hordeMaxItems', type: 'base', value: lvl => lvl}
    ]},
    advancedLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 36, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.9, lvl) * 80};
    }, effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'hordeHeirloomChance', type: 'base', value: lvl => lvl * 0.004}
    ]},
    offenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 41, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * 140};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.3 + 1}
    ]},
    defenseBook: {type: 'prestige', cap: 50, requirementBase, requirementStat, requirementValue: 46, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * 280};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.3 + 1}
    ]},
    ashCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 51, price(lvl) {
        return {horde_soulEmpowered: Math.pow(lvl * 0.01 + 1.25, lvl) * 1000};
    }, effect: [
        {name: 'hordeCorruption', type: 'base', value: lvl => lvl * -0.12}
    ]},
    candleCircle: {type: 'prestige', requirementBase, requirementStat, requirementValue: 61, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * 4000};
    }, effect: [
        {name: 'hordeSoulGain', type: 'mult', value: lvl => Math.pow(1.03, lvl)},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -5}
    ]},
    soulLuck: {type: 'prestige', requirementBase, requirementStat, requirementValue: 71, price(lvl) {
        return {horde_soulEmpowered: Math.pow(2.5, lvl) * 7500};
    }, effect: [
        {name: 'hordeSoulGain', type: 'mult', value: lvl => Math.pow(1.03, lvl)},
        {name: 'hordeSoulChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    containmentChamber: {type: 'prestige', requirementBase, requirementStat, requirementValue: 81, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45, lvl) * buildNum(30, 'K')};
    }, effect: [
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeBossRequirement', type: 'base', value: lvl => lvl * -2},
        {name: 'hordeRespawn', type: 'base', value: lvl => lvl * -2}
    ]},
    mausoleum: {type: 'prestige', cap: 100, requirementBase, requirementStat, requirementValue: 91, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3 + lvl * 0.01, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'hordeHeirloomEffect', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    lastWill: {type: 'prestige', cap: 15, requirementBase, requirementStat, requirementValue: 101, price(lvl) {
        return {horde_soulEmpowered: Math.pow(3, getSequence(1, lvl + 1)) * buildNum(15, 'M')};
    }, effect: [
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl}
    ]},
    combatStudies: {type: 'prestige', requirementBase, requirementStat, requirementValue: 111, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.45 + lvl * 0.025, lvl) * buildNum(85, 'M')};
    }, effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    aggression: {type: 'prestige', cap: 30, requirementBase, requirementStat, requirementValue: 121, price(lvl) {
        return {horde_soulEmpowered: Math.pow(1.3, lvl) * buildNum(430, 'M')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
}
