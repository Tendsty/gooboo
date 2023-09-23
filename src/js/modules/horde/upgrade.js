import store from "../../../store";
import { buildNum } from "../../utils/format";
import { splicedPow } from "../../utils/math";

const requirementStat = 'horde_maxZone';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    attack: {price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.0025 + 1.25, lvl) * 175};
    }, effect: [
        {name: 'hordeAttack', type: 'base', value: lvl => lvl},
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    health: {price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.0025 + 1.25, lvl) * 210};
    }, effect: [
        {name: 'hordeHealth', type: 'base', value: lvl => lvl * 150},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    training: {cap: 50, capMult: true, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {horde_bone: splicedPow(1.55, 2.8, 50, lvl) * 6500};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPow(1.1, 1.05, 50, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => splicedPow(1.1, 1.05, 50, lvl)}
    ]},
    resilience: {cap: 1, requirementBase, requirementStat, requirementValue: 5, price() {
        return {horde_bone: buildNum(72, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'hordeRevive', type: 'base', value: lvl => lvl}
    ]},
    boneBag: {cap: 1, requirementBase, requirementStat, requirementValue: 7, price() {
        return {horde_bone: buildNum(480, 'K')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => lvl}
    ]},
    anger: {cap: 10, requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {horde_bone: Math.pow(1.8, lvl) * buildNum(1.45, 'M')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.18, lvl)},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    rest: {cap: 2, requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {horde_bone: Math.pow(15.75, lvl) * buildNum(26, 'M')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.75 + 1},
        {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.01}
    ]},
    monsterBag: {requirementBase, requirementStat, requirementValue: 13, price(lvl) {
        return {horde_monsterPart: Math.pow(lvl * 0.005 + 1.35, lvl) * 40};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'hordeMaxItems', type: 'base', value: lvl => Math.min(4, Math.floor(Math.sqrt(lvl)))}
    ]},
    thickSkin: {cap: 50, requirementBase, requirementStat, requirementValue: 15, price(lvl) {
        return {horde_bone: Math.pow(1.45, lvl) * buildNum(640, 'M')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},
    haste: {cap: 20, requirementBase, requirementStat, requirementValue: 17, price(lvl) {
        return {horde_bone: Math.pow(2.3, lvl) * buildNum(8.25, 'B')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.05, lvl)}
    ]},
    cooling: {cap: 5, capMult: true, requirementBase, requirementStat, requirementValue: 19, price(lvl) {
        return {horde_bone: splicedPow(3.4, 6.5, 5, lvl) * buildNum(133, 'B')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => splicedPow(1.15, 1.075, 5, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 10}
    ]},
    luckyStrike: {cap: 15, capMult: true, requirementBase, requirementStat, requirementValue: 21, price(lvl) {
        return {horde_bone: splicedPow(2.3, 6.6, 15, lvl) * buildNum(300, 'B')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPow(1.14, 1.06, 15, lvl)},
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    monsterSoup: {cap: 50, requirementBase, requirementStat, requirementValue: 27, price(lvl) {
        return {horde_bone: Math.pow(1.85, lvl) * buildNum(250, 'T'), horde_monsterPart: Math.pow(1.1, lvl) * (lvl + 10) * 5};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: lvl => lvl * 5}
    ]},
    hoarding: {cap: 20, requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_bone: Math.pow(2.3, lvl) * buildNum(8.5, 'Qa')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    looting: {cap: 50, capMult: true, requirementBase, requirementStat, requirementValue: 35, price(lvl) {
        return {horde_bone: splicedPow(1.4, 3.3, 50, lvl) * buildNum(220, 'Qa')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.09, lvl)},
        {name: 'hordeItemChance', type: 'mult', value: lvl => Math.pow(1.05, lvl)}
    ]},
    pockets: {cap: 2, requirementBase, requirementStat, requirementValue: 39, price(lvl) {
        return {horde_bone: Math.pow(buildNum(1.024, 'M'), lvl) * buildNum(640, 'Qi')};
    }, effect: [
        {name: 'hordeMaxItems', type: 'base', value: lvl => lvl}
    ]},
    purifier: {persistent: true, cap: 1, note: 'horde_18', requirementBase, requirementStat, requirementValue: 42, price() {
        return {horde_bone: buildNum(100, 'Sx')};
    }, effect: [
        {name: 'hordeCorruptedFlesh', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    cleansingRitual: {requirement() {
        return store.state.unlock.hordeCorruptedFlesh.use;
    }, price(lvl) {
        return {horde_corruptedFlesh: Math.pow(1.1, lvl) * 2000};
    }, effect: [
        {name: 'hordeCorruption', type: 'bonus', value: lvl => -0.08 * lvl}
    ]},
    stabbingGuide: {cap: 5, requirementBase, requirementStat, requirementValue: 43, price(lvl) {
        return {horde_bone: Math.pow(16, lvl) * buildNum(70, 'Sx')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.26, lvl)},
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    dodgingGuide: {cap: 15, requirementBase, requirementStat, requirementValue: 46, price(lvl) {
        return {horde_bone: Math.pow(3.2, lvl) * buildNum(1.8, 'Sp')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    knifePocket: {cap: 20, requirementBase, requirementStat, requirementValue: 51, price(lvl) {
        return {horde_bone: Math.pow(3.35, lvl) * buildNum(74, 'O')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    plunderSecret: {cap: 1, requirementBase, requirementStat, requirementValue: 56, price() {
        return {horde_bone: buildNum(55, 'N')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl >= 1 ? 2 : null},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl >= 1 ? 5 : null}
    ]},
    survivalGuide: {cap: 15, capMult: true, requirementBase, requirementStat, requirementValue: 60, price(lvl) {
        return {horde_bone: Math.pow(3.2, lvl) * buildNum(925, 'N')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => splicedPow(1.1, 1.05, 15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => splicedPow(1.2, 1.05, 15, lvl)}
    ]},
    grindstone: {cap: 8, requirementBase, requirementStat, requirementValue: 64, price(lvl) {
        return {horde_bone: Math.pow(5, lvl) * buildNum(750, 'D')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    adaption: {cap: 8, requirementBase, requirementStat, requirementValue: 72, price(lvl) {
        return {horde_bone: Math.pow(4.75, lvl) * buildNum(2.8, 'DD')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.26, lvl)}
    ]},
    ferocity: {cap: 20, requirementBase, requirementStat, requirementValue: 76, price(lvl) {
        return {horde_bone: Math.pow(3.3, lvl) * buildNum(600, 'DD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.18, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    carving: {cap: 5, capMult: true, requirementBase, requirementStat, requirementValue: 80, price(lvl) {
        return {horde_bone: Math.pow(12, lvl) * buildNum(200, 'TD')};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyHordeCorruptedFleshGain', type: 'base', value: lvl => lvl * 0.1}
    ]},
    bloodlust: {cap: 12, requirementBase, requirementStat, requirementValue: 85, price(lvl) {
        return {horde_bone: Math.pow(5, lvl) * buildNum(80, 'QaD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.32, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    whitePaint: {cap: 25, capMult: true, requirementBase, requirementStat, requirementValue: 90, price(lvl) {
        return {horde_bone: Math.pow(2.8, lvl) * buildNum(50, 'QiD')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    grossBag: {cap: 1, requirementBase, requirementStat, requirementValue: 95, price() {
        return {horde_bone: buildNum(2.5, 'SpD')};
    }, effect: [
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl + 1},
        {name: 'hordeMaxItems', type: 'base', value: lvl => lvl}
    ]},
    targetDummy: {cap: 40, requirementBase, requirementStat, requirementValue: 100, price(lvl) {
        return {horde_bone: Math.pow(1.75, lvl) * buildNum(2.5, 'OD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},
    rottenPaint: {cap: 15, requirementBase, requirementStat, requirementValue: 105, price(lvl) {
        return {horde_monsterPart: Math.pow(2, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    milestone: {cap: 4, capMult: true, requirementBase, requirementStat, requirementValue: 110, price(lvl) {
        return {horde_bone: Math.pow(1000, lvl) * buildNum(1, 'V')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(10, lvl)}
    ]},
    meditation: {cap: 25, requirementBase, requirementStat, requirementValue: 115, price(lvl) {
        return {horde_bone: Math.pow(2.2, lvl) * buildNum(35, 'V')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.23, lvl)}
    ]},
}
