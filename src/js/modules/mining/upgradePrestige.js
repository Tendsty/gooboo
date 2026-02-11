import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getApproaching, getSequence } from "../../utils/math";

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
    crystalAluminiumStorage: {type: 'prestige', cap: 20, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 10};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => lvl * 12},
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalCopperStorage: {type: 'prestige', cap: 20, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 15};
    }, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => lvl * 4},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalTinStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 50;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 60};
    }, effect: [
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl * 2},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalIronStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 80;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 450};
    }, effect: [
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalTitaniumStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 120;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(12, 'K')};
    }, effect: [
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalPlatinumStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 175;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(5, 'M')};
    }, effect: [
        {name: 'currencyMiningOrePlatinumCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalIridiumStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 260;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreIridiumCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreIridiumCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalOsmiumStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 350;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreOsmiumCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreOsmiumCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalLeadStorage: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 450;
    }, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(2.6, 'T')};
    }, effect: [
        {name: 'currencyMiningOreLeadCap', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreLeadCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalDrill: {type: 'prestige', cap: 53, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 5, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.01 + 1.5, lvl) * 30};
    }, effect: [
        {name: 'miningDepthDwellerMax', type: 'base', value: lvl => Math.min(getApproaching(0.01, 0.9, lvl), 0.4)}
    ]},
    crystalDetector: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 10, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 40};
    }, effect: [
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalReplicator: {type: 'prestige', cap: 100, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 12, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.7 + lvl * 0.008, lvl) * 90};
    }, effect: [
        {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
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
        return {mining_crystalGreen: Math.pow(Math.max((lvl - 100) * 0.0005, 0) + 1.15, lvl) * 200};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.2, lvl)}
    ]},
    crystalRefinery: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 25, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 650};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => lvl * 0.04 + 1},
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    crystalSmeltery: {type: 'prestige', cap: 100, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 30, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * 3300};
    }, effect: [
        {name: 'miningSmelteryTemperature', type: 'base', value: lvl => 10 * lvl},
        {name: 'miningSmelteryTime', type: 'mult', value: lvl => 1 / (Math.pow(1.02, lvl) * (lvl * 0.08 + 1))}
    ]},
    crystalEnhancer: {type: 'prestige', cap: 7, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 35, price(lvl) {
        return {mining_crystalGreen: Math.pow(100, lvl) * 2e5};
    }, effect: [
        {name: 'miningEnhancementMax', type: 'base', value: lvl => lvl}
    ]},
    crystalTreetap: {type: 'prestige', cap: 40, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 40, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(75, 'K')};
    }, effect: [
        {name: 'currencyMiningResinGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalSalt: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 50, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(1.1, 'M')};
    }, effect: [
        {name: 'currencyMiningSaltGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.2 + 1)}
    ]},
    crystalBottle: {type: 'prestige', cap: 25, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 60, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.1 + 2, lvl) * buildNum(12.5, 'M')};
    }, effect: [
        {name: 'currencyMiningResinCap', type: 'base', value: lvl => lvl}
    ]},
    crystalSafe: {type: 'prestige', cap: 17, hideCap: true, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 65, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * 1e8};
    }, effect: [
        {name: 'mining_oreShelf', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_oreShelf', type: 'uncapUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_ironCache', type: 'keepUpgrade', value: lvl => lvl >= 2},
        {name: 'mining_ironCache', type: 'uncapUpgrade', value: lvl => lvl >= 2},
        {name: 'mining_bronzeDrill', type: 'keepUpgrade', value: lvl => lvl >= 3},
        {name: 'mining_bronzeDrill', type: 'uncapUpgrade', value: lvl => lvl >= 3},
        {name: 'mining_bronzeFilter', type: 'keepUpgrade', value: lvl => lvl >= 4},
        {name: 'mining_bronzeFilter', type: 'uncapUpgrade', value: lvl => lvl >= 4},
        {name: 'mining_smallBombs', type: 'keepUpgrade', value: lvl => lvl >= 5},
        {name: 'mining_smallBombs', type: 'uncapUpgrade', value: lvl => lvl >= 5},
        {name: 'mining_nails', type: 'keepUpgrade', value: lvl => lvl >= 6},
        {name: 'mining_nails', type: 'uncapUpgrade', value: lvl => lvl >= 6},
        {name: 'mining_titaniumForge', type: 'keepUpgrade', value: lvl => lvl >= 7},
        {name: 'mining_titaniumForge', type: 'uncapUpgrade', value: lvl => lvl >= 7},
        {name: 'mining_hiddenStash', type: 'keepUpgrade', value: lvl => lvl >= 8},
        {name: 'mining_hiddenStash', type: 'uncapUpgrade', value: lvl => lvl >= 8},
        {name: 'mining_smallOreStorage', type: 'keepUpgrade', value: lvl => lvl >= 9},
        {name: 'mining_smallOreStorage', type: 'uncapUpgrade', value: lvl => lvl >= 9},
        {name: 'mining_titaniumPickaxe', type: 'keepUpgrade', value: lvl => lvl >= 10},
        {name: 'mining_titaniumPickaxe', type: 'uncapUpgrade', value: lvl => lvl >= 10},
        {name: 'mining_undergroundRadar', type: 'keepUpgrade', value: lvl => lvl >= 11},
        {name: 'mining_undergroundRadar', type: 'uncapUpgrade', value: lvl => lvl >= 11},
        {name: 'mining_iridiumExpansion', type: 'keepUpgrade', value: lvl => lvl >= 12},
        {name: 'mining_iridiumExpansion', type: 'uncapUpgrade', value: lvl => lvl >= 12},
        {name: 'mining_iridiumTreetap', type: 'keepUpgrade', value: lvl => lvl >= 13},
        {name: 'mining_iridiumTreetap', type: 'uncapUpgrade', value: lvl => lvl >= 13},
        {name: 'mining_iridiumBombs', type: 'keepUpgrade', value: lvl => lvl >= 14},
        {name: 'mining_iridiumBombs', type: 'uncapUpgrade', value: lvl => lvl >= 14},
        {name: 'mining_osmiumExpansion', type: 'keepUpgrade', value: lvl => lvl >= 15},
        {name: 'mining_osmiumExpansion', type: 'uncapUpgrade', value: lvl => lvl >= 15},
        {name: 'mining_darkBombs', type: 'keepUpgrade', value: lvl => lvl >= 16},
        {name: 'mining_darkBombs', type: 'uncapUpgrade', value: lvl => lvl >= 16},
        {name: 'mining_leadExpansion', type: 'keepUpgrade', value: lvl => lvl >= 17},
        {name: 'mining_leadExpansion', type: 'uncapUpgrade', value: lvl => lvl >= 17},
    ]},
    crystalEngine: {type: 'prestige', cap: 50, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 75, price(lvl) {
        return {mining_crystalGreen: Math.pow(1.4, lvl) * buildNum(230, 'M')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.25 + 1)}
    ]},
    crystalCoal: {type: 'prestige', cap: 20, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 90, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.05 + 1.75, lvl) * buildNum(27, 'B')};
    }, effect: [
        {name: 'currencyMiningCoalGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalTruck: {type: 'prestige', cap: 10, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 105, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.5, lvl) * (lvl * 0.5 + 1)}
    ]},
    crystalExpansion: {type: 'prestige', cap: 9, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 120, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * Math.pow(1000, Math.max(0, lvl - 6)) * buildNum(25, 'T')};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => lvl >= 1 ? 10 : null},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl >= 2 ? 10 : null},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => lvl >= 3 ? 10 : null},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => lvl >= 4 ? 10 : null},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl >= 5 ? 10 : null},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl >= 6 ? 10 : null},
        {name: 'currencyMiningOreIridiumCap', type: 'mult', value: lvl => lvl >= 7 ? 10 : null},
        {name: 'currencyMiningOreOsmiumCap', type: 'mult', value: lvl => lvl >= 8 ? 10 : null},
        {name: 'currencyMiningOreLeadCap', type: 'mult', value: lvl => lvl >= 9 ? 10 : null}
    ]},
    crystalTnt: {type: 'prestige', cap: 25, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 135, price(lvl) {
        return {mining_crystalGreen: Math.pow(10, lvl) * buildNum(6, 'Qa')};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(0.5, lvl)}
    ]},
    crystalBeacon: {type: 'prestige', cap: 4, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 150, price(lvl) {
        return {mining_crystalGreen: Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'Sx')};
    }, effect: [
        {name: 'miningBeaconPiercing', type: 'base', value: lvl => lvl >= 1 ? 1 : null},
        {name: 'miningBeaconRich', type: 'base', value: lvl => lvl >= 2 ? 1 : null},
        {name: 'miningBeaconWonder', type: 'base', value: lvl => lvl >= 3 ? 1 : null},
        {name: 'miningBeaconHope', type: 'base', value: lvl => lvl >= 4 ? 1 : null},
    ]},
    crystalNiter: {type: 'prestige', cap: 20, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 165, price(lvl) {
        return {mining_crystalGreen: Math.pow(lvl * 0.02 + 1.4, lvl) * buildNum(3, 'Sx')};
    }, effect: [
        {name: 'currencyMiningNiterGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    crystalBunker: {type: 'prestige', cap: 20, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 180, price(lvl) {
        return {mining_crystalGreen: Math.pow(4.5, lvl) * buildNum(65, 'Sx')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.4 + 1)},
        {name: 'miningOreCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    crystalOreBag: {type: 'prestige', cap: 40, requirementBase: requirementBase0, requirementStat: requirementStat0, requirementValue: 200, price(lvl) {
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
    heliumReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 4, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 100};
    }, effect: [
        {name: 'currencyMiningHeliumIncrement', type: 'base', value: lvl => lvl * 0.01}
    ]},
    crystalSmoke: {type: 'prestige', cap: 20, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 8, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * 250};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    crystalConductor: {type: 'prestige', cap: 25, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 12, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.02 + 1.5, lvl) * 1000};
    }, effect: [
        {name: 'miningDepthDwellerMax', type: 'base', value: lvl => lvl * 0.005}
    ]},
    crystalFusion: {type: 'prestige', cap: 25, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 16, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.75, lvl) * 2300};
    }, effect: [
        {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyMiningCrystalYellowGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    neonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 20, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * 7000};
    }, effect: [
        {name: 'currencyMiningNeonIncrement', type: 'base', value: lvl => lvl * 0.005}
    ]},
    crystalRefuge: {type: 'prestige', cap: 2, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 24, price(lvl) {
        return {mining_crystalYellow: Math.pow(20, lvl) * buildNum(25, 'K')};
    }, effect: [
        {name: 'mining_piston', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_harvester', type: 'keepUpgrade', value: lvl => lvl >= 2}
    ]},
    crystalCave: {type: 'prestige', cap: 10, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 28, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(75, 'K')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.15 + 1)},
        {name: 'miningOreCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    crystalFilter: {type: 'prestige', cap: 20, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 32, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.5, lvl) * buildNum(450, 'K')};
    }, effect: [
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    heliumWarehouse: {type: 'prestige', cap: 5, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 40, price(lvl) {
        return {mining_crystalYellow: Math.pow(10 * Math.pow(2, lvl), lvl) * buildNum(1.8, 'M')};
    }, effect: [
        {name: 'currencyMiningHeliumLimit', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    crystalTunnel: {type: 'prestige', cap: 25, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 48, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.05 + 1.5, lvl) * buildNum(8, 'M')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.3 + 1)}
    ]},
    argonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 56, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * buildNum(30, 'M')};
    }, effect: [
        {name: 'currencyMiningArgonIncrement', type: 'base', value: lvl => lvl * 0.003}
    ]},
    crystalDust: {type: 'prestige', cap: 10, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 64, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(120, 'M')};
    }, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => Math.pow(1.15, lvl) * (lvl * 0.35 + 1)}
    ]},
    neonWarehouse: {type: 'prestige', cap: 5, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 72, price(lvl) {
        return {mining_crystalYellow: Math.pow(10 * Math.pow(2, lvl), lvl) * buildNum(750, 'M')};
    }, effect: [
        {name: 'currencyMiningNeonLimit', type: 'mult', value: lvl => getSequence(1, lvl) + 1},
        {name: 'currencyMiningNeonIncrement', type: 'base', value: lvl => lvl * 0.002}
    ]},
    crystalBombs: {type: 'prestige', cap: 20, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 80, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(3.3, 'B')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.1 + 1)}
    ]},
    crystalCollector: {type: 'prestige', cap: 20, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 96, price(lvl) {
        return {mining_crystalYellow: Math.pow(1.65, lvl) * buildNum(66, 'B')};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.1 + 1)}
    ]},
    kryptonReserves: {type: 'prestige', cap: 8, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 112, price(lvl) {
        return {mining_crystalYellow: Math.pow(lvl * 0.5 + 2, lvl) * buildNum(1.3, 'T')};
    }, effect: [
        {name: 'currencyMiningKryptonIncrement', type: 'base', value: lvl => lvl * 0.002}
    ]},
    crystalResort: {type: 'prestige', cap: 2, requirementBase: requirementBase1, requirementStat: requirementStat1, requirementValue: 120, price(lvl) {
        return {mining_crystalYellow: Math.pow(4000, lvl) * buildNum(6, 'T')};
    }, effect: [
        {name: 'mining_enrichedCrystal', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'mining_smoker', type: 'keepUpgrade', value: lvl => lvl >= 2}
    ]},
}
