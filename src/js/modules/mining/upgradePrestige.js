import store from "../../../store";
import { buildNum } from "../../utils/format";

const requirementStat0 = 'mining_depthDweller0';
const requirementBase0 = () => store.state.stat[requirementStat0].total;

const requirementStat1 = 'mining_depthDweller1';
const requirementBase1 = () => store.state.stat[requirementStat1].total;

export default {
    crystalBasics: {type: 'prestige', cap: 10, price(lvl) {
        return {mining_crystalGreen: Math.pow(2, lvl) * 5};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    crystalTips: {type: 'prestige', cap: 50, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.15, lvl) * 10};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalStorage: {type: 'prestige', cap: 50, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.15, lvl) * 5};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    crystalLens: {type: 'prestige', cap: 25, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.25, lvl) * 8};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    crystalAluminiumStorage: {type: 'prestige', cap: 16, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 10};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalCopperStorage: {type: 'prestige', cap: 16, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 15};
    }, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalTinStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 50;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 60};
    }, effect: [
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalIronStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 80;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 450};
    }, effect: [
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalTitaniumStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 120;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(12, 'K')};
    }, effect: [
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalDrill: {type: 'prestige', cap: 90, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 5, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.01 + 1.5, lvl) * 30};
    }, effect: [
        {name: 'miningDepthDwellerMax', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalDetector: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 10, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 40};
    }, effect: [
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalPreservarium: {type: 'prestige', cap: 3, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 15, price(lvl) {
        return {mining_crystalGreen: Math.pow(4, lvl) * 250};
    }, effect: [
        {name: 'mining_scrapCapacityUp', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_scrapGainUp', type: 'keepUpgrade', value: lvl => lvl >= 2},
        {name: 'mining_damageUp', type: 'keepUpgrade', value: lvl => lvl >= 3}
    ]},
    crystalTools: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 16, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.02 + 1.4, lvl) * 120};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    crystalExplosives: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 20, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.15, lvl) * 200};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.2, lvl)}
    ]},
    crystalRefinery: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 25, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 650};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.1 + 1)},
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'miningOreQuality', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalSmeltery: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 30, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 3300};
    }, effect: [
        {name: 'miningSmelteryTemperature', type: 'base', value: lvl => 10 * lvl},
        {name: 'miningSmelterySpeed', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    crystalEnhancer: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 35, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(20, 'K')};
    }, effect: [
        {name: 'miningEnhancementChanceBase', type: 'base', value: lvl => lvl * 0.02},
        {name: 'miningEnhancementChanceIncrement', type: 'mult', value: lvl => Math.pow(1 / 1.03, lvl)}
    ]},
    crystalTreetap: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 40, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(75, 'K')};
    }, effect: [
        {name: 'currencyMiningResinGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.1 + 1)}
    ]},

    crystalSpikes: {type: 'prestige', requirement() {
        return store.state.unlock.miningGasSubfeature.see;
    }, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.025 + 1.3, lvl) * 5};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    crystalBooster: {type: 'prestige', cap: 8, requirement() {
        return store.state.unlock.miningGasSubfeature.see;
    }, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.75, lvl) * 8};
    }, effect: [
        {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    heliumReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 5, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 100};
    }, effect: [
        {name: 'currencyMiningHeliumIncrement', type: 'base', value: lvl => lvl * 0.01}
    ]},
    crystalSmoke: {type: 'prestige', requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 10, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * 250};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    neonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 15, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 1000};
    }, effect: [
        {name: 'currencyMiningNeonIncrement', type: 'base', value: lvl => lvl * 0.0075}
    ]},
    crystalFusion: {type: 'prestige', requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 20, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.75, lvl) * 2300};
    }, effect: [
        {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyMiningCrystalYellowGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)}
    ]},
    crystalRefuge: {type: 'prestige', cap: 2, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 30, price(lvl) {
        return {mining_crystalYellow: Math.pow(4, lvl) * buildNum(25, 'K')};
    }, effect: [
        {name: 'mining_piston', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_harvester', type: 'keepUpgrade', value: lvl => lvl >= 2}
    ]},
    argonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 40, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * buildNum(450, 'K')};
    }, effect: [
        {name: 'currencyMiningArgonIncrement', type: 'base', value: lvl => lvl * 0.005}
    ]},
}
