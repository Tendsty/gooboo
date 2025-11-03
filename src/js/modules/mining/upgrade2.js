import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'mining_maxDepth1';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    fumes: {subfeature: 1, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.012 + 1.24, lvl) * buildNum(750, 'K')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.12, lvl) * Math.pow(lvl * 0.2 + 1, 2)}
    ]},
    smallCrate: {subfeature: 1, cap: 25, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {mining_limestone: Math.pow(lvl * 0.025 + 1.35, lvl) * 1000};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    giantCrate: {subfeature: 1, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 2 + 8, lvl) * buildNum(2.5, 'M')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(6, lvl)}
    ]},
    morePressure: {subfeature: 1, cap: 25, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.025 + 1.75, lvl) * buildNum(400, 'M')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    gasDweller: {subfeature: 1, cap: 1, persistent: true, requirementBase, requirementStat, requirementValue: 15, price() {
        return {mining_helium: 250};
    }, effect: [
        {name: 'miningDepthDweller', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'miningDepthDwellerMax', type: 'mult', value: lvl => Math.pow(1 / 1.25, lvl)}
    ]},
    piston: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 20, price(lvl) {
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
        return {mining_scrap: Math.pow(1.4, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    hotAirBalloon: {subfeature: 1, cap: 8, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {mining_scrap: Math.pow(3.75, lvl) * buildNum(2.2, 'T')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    conductor: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 35, price(lvl) {
        return {
            mining_scrap: Math.pow(40, lvl) * buildNum(10, 'T'),
            mining_limestone: Math.pow(4.5, lvl) * buildNum(200, 'K')
        };
    }, effect: [
        {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    vent: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 40, price(lvl) {
        return {mining_scrap: Math.pow(1.85, lvl) * buildNum(40, 'T')};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    urn: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 45, price(lvl) {
        return {mining_limestone: Math.pow(2.8, lvl) * buildNum(850, 'K')};
    }, effect: [
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => getSequence(5, lvl) * 0.05 + 1}
    ]},
    lunarBlessing: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 50, price(lvl) {
        return {mining_moonshard: Math.pow(2, lvl) * 10};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.05, lvl)}
    ]},
    harvester: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 60, price(lvl) {
        return {mining_neon: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.3 + 1)}
    ]},
    chalkboard: {subfeature: 1, cap: 15, requirementBase, requirementStat, requirementValue: 70, price(lvl) {
        return {mining_moonshard: Math.pow(2.25, lvl) * buildNum(30, 'K')};
    }, effect: [
        {name: 'currencyMiningLimestoneGain', type: 'mult', value: lvl => Math.pow(1.35, lvl)}
    ]},
    graphiteRod: {subfeature: 1, cap: 40, requirementBase, requirementStat, requirementValue: 80, price(lvl) {
        return {mining_scrap: Math.pow(1.85, lvl) * buildNum(2, 'Qi')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    minecart: {subfeature: 1, cap: 25, requirementBase, requirementStat, requirementValue: 90, price(lvl) {
        return {mining_limestone: Math.pow(lvl * 0.03 + 2.15, lvl) * buildNum(5, 'B')};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
    ]},
    moonstone: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 100, price(lvl) {
        return {mining_moonshard: Math.pow(10, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    nightVisionDevice: {subfeature: 1, cap: 40, requirementBase, requirementStat, requirementValue: 115, price(lvl) {
        return {mining_scrap: Math.pow(1.85, lvl) * buildNum(75, 'O')};
    }, effect: [
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.1 + 1)}
    ]},
    enrichedCrystal: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 130, price(lvl) {
        return {mining_argon: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningCrystalYellowGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    matches: {subfeature: 1, requirementBase, requirementStat, requirementValue: 150, price(lvl) {
        return {mining_phosphorus: Math.pow(lvl * 0.05 + 2.25, lvl) * 8};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    smokeStabilizer: {subfeature: 1, cap: 50, requirementBase, requirementStat, requirementValue: 170, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.01 + 1.7, lvl) * buildNum(1.25, 'UD')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.14, lvl)}
    ]},
    elevator: {subfeature: 1, cap: 30, requirementBase, requirementStat, requirementValue: 190, price(lvl) {
        return {
            mining_limestone: Math.pow(lvl * 0.05 + 2.25, lvl) * buildNum(80, 'T'),
            mining_moonshard: Math.pow(lvl * 0.06 + 2.5, lvl) * buildNum(3.5, 'T'),
            mining_phosphorus: Math.pow(lvl * 0.03 + 1.75, lvl) * 6600
        };
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    shovel: {subfeature: 1, cap: 20, requirementBase, requirementStat, requirementValue: 210, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.08 + 2.16, lvl) * buildNum(860, 'TD')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    smoker: {subfeature: 1, cap: 10, requirementBase, requirementStat, requirementValue: 230, price(lvl) {
        return {mining_krypton: Math.round(Math.pow(1.35, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.2 + 1)}
    ]},
}
