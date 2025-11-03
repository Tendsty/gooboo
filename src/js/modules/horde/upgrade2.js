import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'custom_hordeBattlepass';
const requirementBase = () => store.getters['horde/battlePassCurrentLevel'];

export default {
    transfusion: {subfeature: 1, cap: 50, price(lvl) {
        return {horde_blood: Math.pow(1.3, lvl) * 300};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => getSequence(5, lvl) * 0.02 + 1},
        {name: 'hordeHealth', type: 'mult', value: lvl => getSequence(5, lvl) * 0.02 + 1}
    ]},
    darkAttack: {subfeature: 1, requirementBase, requirementStat, requirementValue: 1, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.0025 + 1.325, lvl) * buildNum(24, 'K')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.18, lvl)}
    ]},
    darkHealth: {subfeature: 1, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.0025 + 1.325, lvl) * buildNum(110, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.19, lvl)}
    ]},
    harvest: {subfeature: 1, requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.003 + 1.45, lvl) * buildNum(3, 'M')};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},
    protectiveShell: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 14, price(lvl) {
        return {horde_blood: Math.pow(2.35, lvl) * buildNum(190, 'M')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.07, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
        {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.001}
    ]},
    bloodStorage: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 18, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.04 + 1.9, lvl) * buildNum(2.2, 'B')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.175, lvl)}
    ]},
    secondChance: {subfeature: 1, cap: 1, requirementBase, requirementStat, requirementValue: 22, price() {
        return {horde_blood: buildNum(333, 'B')};
    }, effect: [
        {name: 'hordeRevive', type: 'base', value: lvl => lvl}
    ]},
    darkMilestone: {subfeature: 1, requirementBase, requirementStat, requirementValue: 24, price(lvl) {
        return {horde_blood: Math.pow(1000, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(10, lvl)},
    ]},
    endlessAnger: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {horde_blood: Math.pow(2.8, lvl) * buildNum(25, 'Qi')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.33, lvl)}
    ]},
    fistFight: {subfeature: 1, cap: 30, requirementBase, requirementStat, requirementValue: 42, price(lvl) {
        return {horde_blood: Math.pow(2.45, lvl) * buildNum(400, 'Sx')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
    ]},
    syringe: {subfeature: 1, cap: 30, requirementBase, requirementStat, requirementValue: 55, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.02 + 1.7, lvl) * buildNum(65, 'Sp')};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.18, lvl)},
    ]},
    bloodRitual: {subfeature: 1, requirementBase, requirementStat, requirementValue: 66, price(lvl) {
        return {horde_blood: Math.pow(10, lvl) * buildNum(1, 'O')};
    }, effect: [
        {name: 'hordeCorruption', type: 'bonus', value: lvl => -0.07 * lvl},
    ]},
    darkDummy: {subfeature: 1, cap: 50, requirementBase, requirementStat, requirementValue: 77, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.01 + 1.9, lvl) * 7.5e29};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
    ]},
    banishingRitual: {subfeature: 1, requirementBase, requirementStat, requirementValue: 90, price(lvl) {
        return {horde_blood: Math.pow(250, lvl) * 1.5e34};
    }, effect: [
        {name: 'hordeCorruption', type: 'bonus', value: lvl => -0.15 * lvl},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    toothSpear: {subfeature: 1, persistent: true, cap: 25, requirementBase, requirementStat, requirementValue: 105, price(lvl) {
        return {horde_monsterToothWarzone: lvl * 4 + 2};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.125, lvl)},
    ]},
    toothNecklace: {subfeature: 1, persistent: true, cap: 25, requirementBase, requirementStat, requirementValue: 111, price(lvl) {
        return {horde_monsterToothWarzone: lvl * 4 + 4};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.13, lvl)},
    ]},
    darkShield: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 115, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.5 + 3.75, lvl) * 8e42};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
    ]},
}
