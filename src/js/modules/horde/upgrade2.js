import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementBase = () => store.getters['horde/battlePassCurrentLevel'];

export default {
    transfusion: {subfeature: 1, cap: 50, price(lvl) {
        return {horde_blood: Math.pow(1.3, lvl) * 300};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => getSequence(5, lvl) * 0.02 + 1},
        {name: 'hordeHealth', type: 'mult', value: lvl => getSequence(5, lvl) * 0.02 + 1}
    ]},
    darkAttack: {subfeature: 1, requirementBase, requirementValue: 1, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.0025 + 1.325, lvl) * buildNum(24, 'K')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.18, lvl)}
    ]},
    darkHealth: {subfeature: 1, requirementBase, requirementValue: 3, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.0025 + 1.325, lvl) * buildNum(110, 'K')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.19, lvl)}
    ]},
    harvest: {subfeature: 1, requirementBase, requirementValue: 8, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.003 + 1.45, lvl) * buildNum(3, 'M')};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},
    protectiveShell: {subfeature: 1, cap: 20, requirementBase, requirementValue: 14, price(lvl) {
        return {horde_blood: Math.pow(2.35, lvl) * buildNum(190, 'M')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.07, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.14, lvl)}
    ]},
    bloodStorage: {subfeature: 1, cap: 20, requirementBase, requirementValue: 18, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.04 + 1.9, lvl) * buildNum(2.2, 'B')};
    }, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.175, lvl)}
    ]},
    darkMilestone: {subfeature: 1, requirementBase, requirementValue: 24, price(lvl) {
        return {horde_blood: Math.pow(1000, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(3, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(10, lvl)}
    ]},
    endlessAnger: {subfeature: 1, cap: 20, requirementBase, requirementValue: 31, price(lvl) {
        return {horde_blood: Math.pow(2.8, lvl) * buildNum(25, 'Qi')};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.33, lvl)}
    ]},
    fistFight: {subfeature: 1, cap: 30, requirementBase, requirementValue: 42, price(lvl) {
        return {horde_blood: Math.pow(2.45, lvl) * buildNum(400, 'Sx')};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.23, lvl)}
    ]},
    syringe: {subfeature: 1, cap: 30, requirementBase, requirementValue: 55, price(lvl) {
        return {horde_blood: Math.pow(lvl * 0.02 + 1.7, lvl) * buildNum(65, 'Sp')};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.18, lvl)}
    ]},
    bloodRitual: {subfeature: 1, requirementBase, requirementValue: 70, price(lvl) {
        return {horde_blood: Math.pow(10, lvl) * buildNum(1, 'O')};
    }, effect: [
        {name: 'hordeCorruption', type: 'bonus', value: lvl => -0.07 * lvl}
    ]},
}
