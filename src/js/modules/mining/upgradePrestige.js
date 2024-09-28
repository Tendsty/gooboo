import store from "../../../store";
import { buildNum } from "../../utils/format";

const requirementStat0 = 'mining_depthDwellerCap0';
const requirementBase0 = () => store.state.stat[requirementStat0].total;

const requirementStat1 = 'mining_depthDwellerCap1';
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
    crystalPlatinumStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 175;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(5, 'M')};
    }, effect: [
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalIridiumStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 260;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreIridiumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalOsmiumStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 350;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreOsmiumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalLeadStorage: {type: 'prestige', cap: 16, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 450;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreLeadCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    crystalDrill: {type: 'prestige', cap: 90, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 5, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.01 + 1.5, lvl) * 30};
    }, effect: [
        {name: 'miningDepthDwellerMax', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ], onBuy() {
        store.dispatch('mining/updateDwellerStat');
    }},
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
    crystalRefinery: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 25, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 650};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.1 + 1)},
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'miningOreQuality', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalSmeltery: {type: 'prestige', cap: 100, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 30, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 3300};
    }, effect: [
        {name: 'miningSmelteryTemperature', type: 'base', value: lvl => 10 * lvl},
        {name: 'miningSmelterySpeed', type: 'mult', value: lvl => Math.pow(1.02, lvl) * (lvl * 0.08 + 1)}
    ]},
    crystalEnhancer: {type: 'prestige', cap: 25, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 35, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(20, 'K')};
    }, effect: [
        {name: 'miningEnhancementBarsIncrement', type: 'mult', value: lvl => Math.pow(1 / 1.01, lvl)},
        {name: 'miningEnhancementFinalIncrement', type: 'mult', value: lvl => Math.pow(1 / 1.05, lvl)}
    ]},
    crystalTreetap: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 40, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(75, 'K')};
    }, effect: [
        {name: 'currencyMiningResinGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalSalt: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 50, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(1.1, 'M')};
    }, effect: [
        {name: 'currencyMiningSaltGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.2 + 1)}
    ]},
    crystalBottle: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 60, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(12.5, 'M')};
    }, effect: [
        {name: 'currencyMiningResinCap', type: 'base', value: lvl => lvl}
    ]},
    crystalEngine: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 75, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(230, 'M')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.25 + 1)}
    ]},
    crystalCoal: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 100, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.02 + 1.4, lvl) * buildNum(27, 'B')};
    }, effect: [
        {name: 'currencyMiningCoalGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalTruck: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 125, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.5, lvl) * (lvl * 0.5 + 1)}
    ]},
    crystalExpansion: {type: 'prestige', cap: 9, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 150, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * Math.pow(1000, Math.max(0, lvl - 6)) * buildNum(25, 'T')};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => lvl >= 1 ? 1000 : null},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl >= 2 ? 1000 : null},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => lvl >= 3 ? 1000 : null},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => lvl >= 4 ? 1000 : null},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl >= 5 ? 1000 : null},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl >= 6 ? 1000 : null},
        {name: 'currencyMiningOreIridiumCap', type: 'mult', value: lvl => lvl >= 7 ? 1000 : null},
        {name: 'currencyMiningOreOsmiumCap', type: 'mult', value: lvl => lvl >= 8 ? 1000 : null},
        {name: 'currencyMiningOreLeadCap', type: 'mult', value: lvl => lvl >= 9 ? 1000 : null}
    ]},
    crystalTnt: {cap: 25, type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 175, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * buildNum(6, 'Qa')};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(0.5, lvl)}
    ]},
    crystalBeacon: {type: 'prestige', cap: 4, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 200, price(lvl) {
        return {mining_crystalGreen: Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'Sx')};
    }, effect: [
        {name: 'miningBeaconPiercing', type: 'base', value: lvl => lvl >= 1 ? 1 : null},
        {name: 'miningBeaconRich', type: 'base', value: lvl => lvl >= 2 ? 1 : null},
        {name: 'miningBeaconWonder', type: 'base', value: lvl => lvl >= 3 ? 1 : null},
        {name: 'miningBeaconHope', type: 'base', value: lvl => lvl >= 4 ? 1 : null},
    ]},
    crystalNiter: {type: 'prestige', requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 225, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.02 + 1.4, lvl) * buildNum(3, 'Sx')};
    }, effect: [
        {name: 'currencyMiningNiterGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalBunker: {type: 'prestige', cap: 20, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 250, price(lvl) {
        return {mining_crystalGreen: Math.pow(4.5, lvl) * buildNum(65, 'Sx')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.4 + 1)},
        {name: 'miningOreCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalOreBag: {type: 'prestige', cap: 40, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 300, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.2, lvl) * buildNum(1, 'Sp')};
    }, effect: [
        {name: 'miningOreCap', type: 'base', value: lvl => lvl}
    ]},

    crystalSpikes: {type: 'prestige', requirement() {
        return store.state.unlock.miningGasSubfeature.see;
    }, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.025 + 1.3, lvl) * 5};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.15 + 1)}
    ]},
    crystalBooster: {type: 'prestige', cap: 8, requirement() {
        return store.state.unlock.miningGasSubfeature.see;
    }, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.75, lvl) * 8};
    }, effect: [
        {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => lvl * 0.125 + 1}
    ]},
    heliumReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 5, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 100};
    }, effect: [
        {name: 'currencyMiningHeliumIncrement', type: 'base', value: lvl => lvl * 0.01}
    ]},
    crystalSmoke: {type: 'prestige', requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 10, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * 250};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    neonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 15, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 1000};
    }, effect: [
        {name: 'currencyMiningNeonIncrement', type: 'base', value: lvl => lvl * 0.005}
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
        {name: 'currencyMiningArgonIncrement', type: 'base', value: lvl => lvl * 0.003}
    ]},
    crystalTunnel: {type: 'prestige', requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 60, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(8, 'M')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.3 + 1)}
    ]},
    crystalDust: {type: 'prestige', requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 80, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(120, 'M')};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.15, lvl) * (lvl * 0.35 + 1)}
    ]},
    kryptonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 100, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * buildNum(3.3, 'B')};
    }, effect: [
        {name: 'currencyMiningKryptonIncrement', type: 'base', value: lvl => lvl * 0.002}
    ]},
}
