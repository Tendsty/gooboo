import store from "../../../store";
import { buildNum } from "../../utils/format";

const requirementStat = 'mining_maxDepth1';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    fumes: {subfeature: 1, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(lvl * 0.012 + 1.24, lvl) * buildNum(750, 'K'))};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.12, lvl) * Math.pow(lvl * 0.2 + 1, 2)}
    ]},
    giantCrate: {subfeature: 1, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(lvl * 2 + 8, lvl) * buildNum(2.5, 'M'))};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(7, lvl)}
    ]},
    morePressure: {subfeature: 1, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(lvl * 0.025 + 1.75, lvl) * buildNum(400, 'M'))};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    gasDweller: {subfeature: 1, cap: 1, persistent: true, requirementBase, requirementStat, requirementValue: 15, price() {
        return {mining_helium: 250};
    }, effect: [
        {name: 'miningDepthDweller', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => Math.pow(3, lvl)}
    ]},
    piston: {subfeature: 1, requirementBase, requirementStat, requirementValue: 20, price(lvl) {
        return {mining_helium: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.2 + 1)}
    ]},
    pollution: {subfeature: 1, cap: 1, persistent: true, requirementBase, requirementStat, requirementValue: 25, price() {
        return {mining_helium: 1000};
    }, effect: [
        {name: 'miningSmoke', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    particleFilter: {subfeature: 1, requirement() {
        return store.state.unlock.miningSmoke.use;
    }, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(1.4, lvl) * buildNum(1, 'T'))};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    hotAirBalloon: {subfeature: 1, cap: 8, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(3.75, lvl) * buildNum(2.2, 'T'))};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    vent: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 40, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(1.65, lvl) * buildNum(40, 'T'))};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    harvester: {subfeature: 1, requirementBase, requirementStat, requirementValue: 50, price(lvl) {
        return {mining_neon: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.3 + 1)}
    ]},
    graphiteRod: {subfeature: 1, cap: 40, requirementBase, requirementStat, requirementValue: 75, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(1.85, lvl) * buildNum(1, 'Qi'))};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    enrichedCrystal: {subfeature: 1, requirementBase, requirementStat, requirementValue: 100, price(lvl) {
        return {mining_argon: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningCrystalYellowGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    smoker: {subfeature: 1, requirementBase, requirementStat, requirementValue: 160, price(lvl) {
        return {mining_krypton: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.2 + 1)}
    ]},
}
