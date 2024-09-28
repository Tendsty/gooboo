import store from "../../../store";
import { buildNum } from "../../utils/format";
import { splicedPow, splicedPowLinear } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    attack: {price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.002 + 1.25, lvl) * 175};
    }, effect: [
        {name: 'hordeAttack', type: 'base', value: lvl => lvl},
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    health: {price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.002 + 1.25, lvl) * 210};
    }, effect: [
        {name: 'hordeHealth', type: 'base', value: lvl => lvl * 150},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    training: {cap: 100, capMult: true, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {horde_bone: splicedPow(1.35, 2.8, 100, lvl) * 2500};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPowLinear(1.1, 0.1, 100, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => splicedPowLinear(1.1, 0.1, 100, lvl)}
    ]},
    resilience: {cap: 1, requirementBase, requirementStat, requirementValue: 5, price() {
        return {horde_bone: buildNum(24, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'hordeRevive', type: 'base', value: lvl => lvl}
    ]},
    bones: {requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.01 + 1.35, lvl) * buildNum(52, 'K')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.22, lvl)}
    ]},
    boneBag: {cap: 4, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {horde_bone: Math.pow(10, lvl) * buildNum(480, 'K')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(10, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    anger: {cap: 10, requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {horde_bone: Math.pow(1.65, lvl) * buildNum(145, 'K')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.18, lvl)},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    rest: {cap: 2, requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {horde_bone: Math.pow(75, lvl) * buildNum(2.6, 'M')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.75 + 1},
        {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.01}
    ]},
    monsterSoup: {cap: 10, requirementBase, requirementStat, requirementValue: 13, price(lvl) {
        return {horde_monsterPart: Math.pow(1.1, lvl) * (lvl + 10) * 3};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 5}
    ]},
    monsterBag: {cap: 75, requirementBase, requirementStat, requirementValue: 17, price(lvl) {
        return {horde_monsterPart: Math.pow(lvl * 0.005 + 1.35, lvl) * 80};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.6, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    luckyStrike: {cap: 15, capMult: true, requirementBase, requirementStat, requirementValue: 21, price(lvl) {
        return {horde_bone: splicedPow(1.85, 4.6, 15, lvl) * buildNum(30, 'B')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPowLinear(1.14, 0.07, 15, lvl)},
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    hoarding: {cap: 20, requirementBase, requirementStat, requirementValue: 25, price(lvl) {
        return {horde_bone: Math.pow(2.1, lvl) * buildNum(1.1, 'T')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    thickSkin: {cap: 30, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {horde_bone: Math.pow(1.85, lvl) * buildNum(52.5, 'T')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.08, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.17, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    purifier: {persistent: true, hasDescription: true, cap: 1, note: 'horde_18', requirementBase, requirementStat, requirementValue: 42, price() {
        return {horde_bone: buildNum(10, 'Qi')};
    }, effect: [
        {name: 'hordeCorruptedFlesh', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    cleansingRitual: {requirement() {
        return store.state.unlock.hordeCorruptedFlesh.use;
    }, price(lvl) {
        return {horde_corruptedFlesh: Math.pow(1.12, lvl) * 2000};
    }, effect: [
        {name: 'hordeCorruption', type: 'bonus', value: lvl => -0.08 * lvl}
    ]},
    stabbingGuide: {cap: 5, requirementBase, requirementStat, requirementValue: 48, price(lvl) {
        return {horde_bone: Math.pow(7, lvl) * buildNum(130, 'Qi')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.46, lvl)},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    plunderSecret: {cap: 1, requirementBase, requirementStat, requirementValue: 53, price() {
        return {horde_bone: buildNum(25, 'Sx')};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl >= 1 ? 100 : null},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    dodgingGuide: {cap: 15, requirementBase, requirementStat, requirementValue: 59, price(lvl) {
        return {horde_bone: Math.pow(2.1, lvl) * buildNum(980, 'Sx')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    survivalGuide: {cap: 25, capMult: true, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_bone: splicedPow(2.25, 4.75, 25, lvl) * buildNum(1.25, 'O')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 25, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => splicedPowLinear(1.15, 0.075, 25, lvl)}
    ]},
    looting: {cap: 25, capMult: true, requirementBase, requirementStat, requirementValue: 69, price(lvl) {
        return {horde_bone: splicedPow(3.3, 8.7, 25, lvl) * buildNum(22, 'O')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => splicedPowLinear(2, 0.25, 25, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => splicedPowLinear(1.05, 0.05, 25, lvl)}
    ]},
    whitePaint: {cap: 25, capMult: true, requirementBase, requirementStat, requirementValue: 80, price(lvl) {
        return {horde_bone: Math.pow(2.8, lvl) * buildNum(1.11, 'UD')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => splicedPowLinear(1.15, 0.075, 25, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.125, 25, lvl)}
    ]},
    targetDummy: {requirementBase, requirementStat, requirementValue: 92, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.005 + 1.7, lvl) * buildNum(250, 'TD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    grossBag: {cap: 1, requirementBase, requirementStat, requirementValue: 98, price() {
        return {horde_bone: buildNum(155, 'QaD')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    milestone: {requirementBase, requirementStat, requirementValue: 110, price(lvl) {
        return {horde_bone: Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'SxD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1000, lvl)}
    ]},
    combatLesson: {cap: 15, requirementBase, requirementStat, requirementValue: 120, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.4 + 3.4, lvl) * buildNum(650, 'SpD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.22, lvl)}
    ]},
    carving: {cap: 5, capMult: true, requirementBase, requirementStat, requirementValue: 125, price(lvl) {
        return {horde_bone: Math.pow(12, lvl) * buildNum(2, 'ND')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => splicedPowLinear(8, 0.25, 5, lvl)},
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    mysticalBag: {cap: 1, requirementBase, requirementStat, requirementValue: 135, price(lvl) {
        return {horde_mysticalShard: 25 * (lvl + 1)};
    }, effect: [
        {name: 'hordeMaxItems', type: 'base', value: lvl => lvl}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    unlimitedAnger: {cap: 20, requirementBase, requirementStat, requirementValue: 145, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.1 + 4.7, lvl) * buildNum(4, 'QaV')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    strangePower: {requirementBase, requirementStat, requirementValue: 155, price(lvl) {
        return {horde_mysticalShard: lvl * 4 + 28};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.35, lvl)}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    collector: {requirementBase, requirementStat, requirementValue: 165, price(lvl) {
        return {horde_mysticalShard: lvl * 8 + 34};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.65, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.85, lvl)}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    prepareTheSacrifice: {persistent: true, alwaysActive: true, cap: 4, requirementBase, requirementStat, requirementValue: 175, price(lvl) {
        return {horde_mysticalShard: lvl * 40 + 20};
    }, effect: [
        {name: 'horde_mysticalBag', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'horde_strangePower', type: 'keepUpgrade', value: lvl => lvl >= 2},
        {name: 'horde_collector', type: 'keepUpgrade', value: lvl => lvl >= 3},
        {name: 'hordeSacrifice', type: 'unlock', value: lvl => lvl >= 4},
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
}
