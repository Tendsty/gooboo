import store from "../../../store";
import { buildNum } from "../../utils/format";

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
    training: {cap: 100, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {horde_bone: Math.pow(1.35, lvl) * 2500};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
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
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    anger: {cap: 10, requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {horde_bone: Math.pow(1.65, lvl) * buildNum(145, 'K')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
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
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    luckyStrike: {cap: 15, requirementBase, requirementStat, requirementValue: 21, price(lvl) {
        return {horde_bone: Math.pow(1.85, lvl) * buildNum(30, 'B')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.19, lvl)},
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    hoarding: {cap: 20, requirementBase, requirementStat, requirementValue: 25, price(lvl) {
        return {horde_bone: Math.pow(2.1, lvl) * buildNum(1.1, 'T')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    thickSkin: {cap: 30, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {horde_bone: Math.pow(1.85, lvl) * buildNum(52.5, 'T')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.22, lvl)},
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => Math.min(1, lvl)}
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
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.48, lvl)}
    ]},
    plunderSecret: {cap: 1, requirementBase, requirementStat, requirementValue: 53, price() {
        return {horde_bone: buildNum(25, 'Sx')};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl >= 1 ? 100 : null},
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    dodgingGuide: {cap: 15, requirementBase, requirementStat, requirementValue: 59, price(lvl) {
        return {horde_bone: Math.pow(2.1, lvl) * buildNum(980, 'Sx')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    survivalGuide: {cap: 25, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_bone: Math.pow(2.25, lvl) * buildNum(1.25, 'O')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    looting: {cap: 25, requirementBase, requirementStat, requirementValue: 69, price(lvl) {
        return {horde_bone: Math.pow(3.3, lvl) * buildNum(22, 'O')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.05, lvl)}
    ]},
    whitePaint: {cap: 25, requirementBase, requirementStat, requirementValue: 80, price(lvl) {
        return {horde_bone: Math.pow(2.8, lvl) * buildNum(1.11, 'UD')};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    targetDummy: {cap: 100, capMult: true, requirementBase, requirementStat, requirementValue: 92, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.005 + 1.7 + (lvl >= 100 ? 0.5 : 0), lvl) * buildNum(250, 'TD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    grossBag: {cap: 1, requirementBase, requirementStat, requirementValue: 98, price() {
        return {horde_bone: buildNum(155, 'QaD')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => Math.min(1, lvl)}
    ]},
    milestone: {requirementBase, requirementStat, requirementValue: 110, price(lvl) {
        return {horde_bone: Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'SxD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1000, lvl)}
    ]},
    combatLesson: {cap: 15, requirementBase, requirementStat, requirementValue: 120, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.4 + 3.4, lvl) * buildNum(650, 'SpD')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.22, lvl)}
    ]},
    carving: {cap: 5, requirementBase, requirementStat, requirementValue: 125, price(lvl) {
        return {horde_bone: Math.pow(12, lvl) * buildNum(2, 'ND')};
    }, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(8, lvl)},
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    mysticalBag: {cap: 1, requirementBase, requirementStat, requirementValue: 135, price(lvl) {
        return {horde_mysticalShard: 25 * (lvl + 1)};
    }, effect: [
        {name: 'hordeMaxEquipment', type: 'base', value: lvl => lvl}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    unlimitedAnger: {cap: 20, requirementBase, requirementStat, requirementValue: 145, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.1 + 4.7, lvl) * buildNum(4, 'QaV')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    strangePower: {cap: 25, requirementBase, requirementStat, requirementValue: 155, price(lvl) {
        return {horde_mysticalShard: lvl * 4 + 28};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    collector: {cap: 25, requirementBase, requirementStat, requirementValue: 165, price(lvl) {
        return {horde_mysticalShard: lvl * 8 + 34};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
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
    mysticalPower: {cap: 20, requirementBase, requirementStat, requirementValue: 185, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.35 + 3, lvl) * 3.5e75};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => lvl},
    ]},
    redPaint: {cap: 15, requirementBase, requirementStat, requirementValue: 195, price(lvl) {
        return {horde_monsterPart: Math.pow(lvl * 0.1 + 2.5, lvl) * 5e15};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.225, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    scalpel: {cap: 25, requirementBase, requirementStat, requirementValue: 205, price(lvl) {
        return {horde_mysticalShard: lvl * 12 + 125};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    pocketKnife: {cap: 6, requirementBase, requirementStat, requirementValue: 220, price(lvl) {
        return {horde_bone: Math.pow(750, lvl) * 7.5e98};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    protectiveVest: {cap: 6, requirementBase, requirementStat, requirementValue: 235, price(lvl) {
        return {horde_bone: Math.pow(850, lvl) * 2e104};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
    ]},
    luckyArtifact: {cap: 75, requirementBase, requirementStat, requirementValue: 250, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.05 + 2.75, lvl) * 7.77e109};
    }, effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => Math.pow(1.08, lvl)},
    ]},
    brownPaint: {cap: 30, requirementBase, requirementStat, requirementValue: 270, price(lvl) {
        return {horde_monsterPart: Math.pow(lvl * 0.05 + 1.9, lvl) * 1.75e21};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
    ]},
    grindstone: {cap: 40, requirementBase, requirementStat, requirementValue: 290, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.08 + 2.2, lvl) * 9.3e131};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.14, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
    ]},
    strangeDetector: {cap: 20, requirementBase, requirementStat, requirementValue: 310, price(lvl) {
        return {horde_mysticalShard: lvl * 15 + 250};
    }, effect: [
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => Math.pow(1.4, lvl)}
    ], onBuy() {
        store.dispatch('horde/checkPlayerHealth');
    }},
    weaponStorage: {cap: 100, requirementBase, requirementStat, requirementValue: 330, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.01 + 1.85, lvl) * 4.8e155};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
    ]},
    frostSpear: {cap: 30, requirementBase, requirementStat, requirementValue: 350, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.1 + 2.75, lvl) * 1e167};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.21, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.09, lvl)},
    ]},
    lightningShield: {cap: 30, requirementBase, requirementStat, requirementValue: 375, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.1 + 2.75, lvl) * 1e180};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.09, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.21, lvl)},
    ]},
    waterBubble: {cap: 50, requirementBase, requirementStat, requirementValue: 400, price(lvl) {
        return {horde_bone: Math.pow(lvl * 0.1 + 2.75, lvl) * 1e190};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
    ]},
}
