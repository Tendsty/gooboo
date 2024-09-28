import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence, splicedLinear, splicedPowLinear } from "../../utils/math";

const requirementStat = 'mining_maxDepth0';
const requirementBase = () => store.state.stat[requirementStat].total;

export default {
    damageUp: {price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(lvl * 0.012 + 1.24, lvl) * 120)};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.12, lvl) * Math.pow(lvl * 0.2 + 1, 2)}
    ]},
    scrapGainUp: {requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(lvl * 0.1 + 2.5, lvl) * 1250)};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    scrapCapacityUp: {cap: 50, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(3.3, lvl) * 3000)};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(3, lvl)}
    ]},
    aluminiumCache: {cap: 10, requirementBase, requirementStat, requirementValue: 15, price(lvl) {
        return {mining_oreAluminium: Math.round(3 * (lvl + 1))};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => 2 * lvl}
    ]},
    aluminiumHardening: {cap: 6, capMult: true, requirementBase, requirementStat, requirementValue: 15, price(lvl) {
        return {mining_oreAluminium: Math.round(Math.pow(1.5, Math.max(0, lvl - 5)) * 4 * lvl + 2)};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => (lvl + 1) * Math.pow(1.5, Math.min(6, lvl))}
    ]},
    craftingStation: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 20, price() {
        return {mining_scrap: buildNum(1.8, 'M')};
    }, effect: [
        {name: 'miningPickaxeCrafting', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    forge: {requirement() {
        return store.state.unlock.miningPickaxeCrafting.use;
    }, price(lvl) {
        return {mining_scrap: Math.ceil(Math.pow(1.35, lvl) * buildNum(2.5, 'M'))};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    oreSlots: {cap: 10, hideCap: true, requirementBase, requirementStat, requirementValue: 25, requirement(lvl) {
        return store.state.stat.mining_maxDepth0.total >= [25, 25, 30, 50, 80, 120, 175, 260, 350, 450][lvl];
    }, price(lvl) {
        return [
            {mining_oreAluminium: 10},
            {mining_oreAluminium: 30},
            {mining_oreCopper: 20},
            {mining_oreTin: 15},
            {mining_oreIron: 12},
            {mining_oreTitanium: 10},
            {mining_orePlatinum: 8},
            {mining_oreIridium: 6},
            {mining_oreOsmium: 5},
            {mining_oreLead: 4}
        ][lvl];
    }, effect: [
        {name: 'miningPickaxeCraftingSlots', type: 'base', value: lvl => lvl}
    ]},
    compressor: {cap: 9, hasDescription: true, hideCap: true, requirementBase, requirementStat, requirementValue: 25, requirement(lvl) {
        return store.state.stat.mining_maxDepth0.total >= [25, 35, 60, 95, 140, 200, 280, 375, 480][lvl];
    }, price(lvl) {
        return [
            {mining_oreAluminium: 20},
            {mining_oreAluminium: 80},
            {mining_oreAluminium: buildNum(10, 'K')},
            {mining_oreAluminium: buildNum(30, 'K')},
            {mining_oreAluminium: buildNum(750, 'K')},
            {mining_oreAluminium: buildNum(1, 'B')},
            {mining_oreAluminium: buildNum(100, 'T')},
            {mining_oreAluminium: buildNum(100, 'Qi')},
            {mining_oreAluminium: buildNum(1, 'O')}
        ][lvl];
    }, effect: [
        {name: 'miningCompressAluminium', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'miningCompressCopper', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'miningCompressTin', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'miningCompressIron', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'miningCompressTitanium', type: 'unlock', value: lvl => lvl >= 5},
        {name: 'miningCompressPlatinum', type: 'unlock', value: lvl => lvl >= 6},
        {name: 'miningCompressIridium', type: 'unlock', value: lvl => lvl >= 7},
        {name: 'miningCompressOsmium', type: 'unlock', value: lvl => lvl >= 8},
        {name: 'miningCompressLead', type: 'unlock', value: lvl => lvl >= 9}
    ]},
    copperCache: {cap: 8, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {mining_oreCopper: Math.round(lvl + 3)};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => 2 * lvl},
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => lvl}
    ]},
    aluminiumTanks: {cap: 8, capMult: true, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {mining_scrap: Math.pow(4.75, lvl) * buildNum(40, 'M')};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => Math.round(Math.pow(lvl, 1.2) * Math.pow(1.1, Math.min(8, lvl)) * 5)}
    ]},
    aluminiumAnvil: {cap: 10, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {mining_oreAluminium: Math.ceil(Math.pow(1.1, lvl) * (lvl + 1) * 10)};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    hullbreaker: {cap: 10, requirementBase, requirementStat, requirementValue: 35, price(lvl) {
        return {mining_scrap: Math.pow(1.8, lvl) * buildNum(550, 'M')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.3, lvl)}
    ]},
    copperTanks: {cap: 5, requirementBase, requirementStat, requirementValue: 40, price(lvl) {
        return {mining_scrap: Math.pow(2.3, lvl) * buildNum(3.5, 'B')};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => 4 * lvl}
    ]},
    depthDweller: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 40, price() {
        return {mining_oreCopper: 24};
    }, effect: [
        {name: 'miningDepthDweller', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    aluminiumExpansion: {cap: 5, requirementBase, requirementStat, requirementValue: 45, price(lvl) {
        return {mining_oreAluminium: Math.pow(2.25, lvl) * 150};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    refinery: {cap: 5, capMult: true, requirementBase, requirementStat, requirementValue: 45, price(lvl) {
        return {mining_oreCopper: 10 * lvl + 30};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => splicedLinear(0.1, 0.05, 5, lvl) + 1},
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => 12 * lvl}
    ]},
    copperExpansion: {cap: 3, requirementBase, requirementStat, requirementValue: 50, price(lvl) {
        return {mining_scrap: Math.pow(4.2, lvl) * buildNum(90, 'B')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    drillFuel: {requirementBase, requirementStat, requirementValue: 50, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.1 + 2.4, lvl) * buildNum(35, 'B')};
    }, effect: [
        {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => Math.pow(1.02, lvl) * (lvl * 0.05 + 1)}
    ]},
    graniteHardening: {cap: 6, requirementBase, requirementStat, requirementValue: 55, price(lvl) {
        return {mining_granite: Math.pow(2.5, lvl) * 1600, mining_oreTin: lvl + 2};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    smeltery: {cap: 1, hasDescription: true, persistent: true, note: 'mining_18', requirementBase, requirementStat, requirementValue: 60, price() {
        return {mining_granite: buildNum(50, 'K')};
    }, effect: [
        {name: 'miningSmeltery', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    oreShelf: {cap: 4, requirementBase, requirementStat, requirementValue: 60, price(lvl) {
        return {mining_oreCopper: Math.pow(1.5, lvl) * 160, mining_barAluminium: 5};
    }, effect: [
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl}
    ]},
    heatShield: {requirementBase, requirementStat, requirementValue: 62, price(lvl) {
        return {mining_granite: Math.pow(1.55, lvl) * buildNum(20, 'K')};
    }, effect: [
        {name: 'miningSmelteryTemperature', type: 'base', value: lvl => lvl * 15}
    ]},
    tinCache: {cap: 4, requirementBase, requirementStat, requirementValue: 65, price(lvl) {
        return {mining_scrap: Math.pow(5.75, lvl) * buildNum(25, 'T'), mining_oreTin: lvl * 2 + 1};
    }, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => lvl * 24},
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl}
    ]},
    furnace: {cap: 25, capMult: true, requirementBase, requirementStat, requirementValue: 70, price(lvl) {
        let obj = {mining_scrap: Math.pow(1.3, lvl) * buildNum(70, 'T'), mining_oreTin: Math.floor(lvl * 0.2 * Math.pow(1.15, lvl) + 2)};
        if (lvl >= 5) {
            obj.mining_salt = Math.pow(1.45, lvl - 5) * 60;
        }
        return obj;
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => splicedPowLinear(1.1, 0.05, 25, lvl)},
        {name: 'miningOreGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    bronzeCache: {cap: 4, requirementBase, requirementStat, requirementValue: 75, price(lvl) {
        return {mining_salt: Math.pow(4, lvl) * 175, mining_barAluminium: 7};
    }, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    ironCache: {cap: 3, requirementBase, requirementStat, requirementValue: 80, price(lvl) {
        return {mining_scrap: Math.pow(8.5, lvl) * buildNum(12, 'Qa'), mining_barAluminium: 12};
    }, effect: [
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl}
    ]},
    oreWashing: {cap: 15, requirementBase, requirementStat, requirementValue: 82, price(lvl) {
        return {mining_scrap: Math.pow(1.35, lvl) * buildNum(16.5, 'Qa')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'miningOreQuality', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    ironExpansion: {cap: 3, capMult: true, requirementBase, requirementStat, requirementValue: 85, price(lvl) {
        return {mining_oreIron: Math.pow(1.3, Math.max(0, lvl - 2)) * lvl * 3 + 2, mining_barBronze: 4};
    }, effect: [
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => splicedPowLinear(1.5, 0.1, 3, lvl)},
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl}
    ]},
    ironHardening: {cap: 12, requirementBase, requirementStat, requirementValue: 90, price(lvl) {
        return {mining_oreIron: Math.floor(Math.pow(1.35, lvl) + 1)};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl * 2}
    ]},
    ironFilter: {cap: 8, requirementBase, requirementStat, requirementValue: 95, price(lvl) {
        return {mining_oreIron: Math.floor(Math.pow(1.85, lvl) * 5), mining_barBronze: 5};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => lvl * 36}
    ]},
    masterForge: {requirementBase, requirementStat, requirementValue: 98, price(lvl) {
        return {mining_coal: lvl * 20 + 80};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    starForge: {requirementBase, requirementStat, requirementValue: 98, price(lvl) {
        return {mining_coal: lvl * 20 + 80};
    }, effect: [
        {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => lvl * 0.075 + 1}
    ]},
    magnet: {cap: 10, capMult: true, requirementBase, requirementStat, requirementValue: 100, price(lvl) {
        return {mining_scrap: Math.pow(1.55, lvl) * buildNum(440, 'Qa'), mining_oreIron: Math.pow(1.2, Math.max(0, lvl - 9)) * lvl * 5 + 10, mining_barBronze: 6};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => splicedPowLinear(1.15, 0.15, 10, lvl)},
        {name: 'miningOreGain', type: 'mult', value: lvl => splicedLinear(0.1, 0.05, 10, lvl) + 1}
    ]},
    enhancingStation: {cap: 1, hasDescription: true, persistent: true, note: 'mining_25', requirementBase, requirementStat, requirementValue: 105, price() {
        return {mining_coal: 250};
    }, effect: [
        {name: 'miningEnhancement', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    warehouse: {cap: 12, requirementBase, requirementStat, requirementValue: 110, price(lvl) {
        return {mining_scrap: Math.pow(6, lvl) * buildNum(6.075, 'Qi'), mining_barAluminium: lvl * 5 + 40, mining_barBronze: lvl * 4 + 4};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    corrosiveFumes: {cap: 6, requirementBase, requirementStat, requirementValue: 112, price(lvl) {
        return {mining_sulfur: Math.pow(3.5, lvl) * 2000};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.2, lvl)}
    ]},
    smeltingSalt: {requirementBase, requirementStat, requirementValue: 115, price(lvl) {
        return {mining_salt: Math.pow(lvl * 0.01 + 1.4, lvl) * buildNum(10, 'K')};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},
    titaniumExpansion: {cap: 3, requirementBase, requirementStat, requirementValue: 120, price(lvl) {
        return {mining_oreCopper: Math.pow(2.75, lvl) * buildNum(250, 'K'), mining_oreTin: Math.pow(2.1, lvl) * buildNum(40, 'K')};
    }, effect: [
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl * 3},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl}
    ]},
    emberForge: {hasDescription: true, requirementBase, requirementStat, requirementValue: 125, price(lvl) {
        return {mining_coal: lvl * 3 + 80};
    }, effect: [
        {name: 'currencyMiningEmberGain', type: 'base', value: lvl => lvl * 0.03}
    ]},
    titaniumCache: {cap: 5, requirementBase, requirementStat, requirementValue: 130, price(lvl) {
        return {mining_scrap: Math.pow(7, lvl) * buildNum(80, 'Sx'), mining_oreTitanium: Math.pow(2, lvl) * 4, mining_sulfur: Math.pow(2.2, lvl) * buildNum(45, 'K'), mining_barSteel: 3};
    }, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl * 10},
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl * 4},
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl * 2}
    ]},
    giantForge: {persistent: true, alwaysActive: true, requirementBase, requirementStat, requirementValue: 132, price(lvl) {
        return {mining_coal: Math.round(Math.pow(1.25, lvl) * 1200)};
    }, effect: [
        {name: 'currencyMiningEmberCap', type: 'base', value: lvl => lvl * 50}
    ]},
    gunpowder: {requirementBase, requirementStat, requirementValue: 135, price(lvl) {
        return {mining_coal: Math.round(Math.pow(1.1, lvl) * (lvl * 20 + 100)), mining_sulfur: Math.pow(1.5, lvl) * buildNum(120, 'K'), mining_niter: Math.round(Math.pow(1.1, lvl) * (lvl * 100 + 500))};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.15, lvl)}
    ]},
    nitricAcid: {persistent: true, requirementBase, requirementStat, requirementValue: 138, price(lvl) {
        return {mining_niter: Math.round(Math.pow(1.05, lvl) * (lvl * 200 + 1000))};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'miningEnhancementBarsIncrement', type: 'mult', value: lvl => 1 / (lvl * 0.03 + 1)}
    ]},
    metalDetector: {cap: 12, capMult: true, requirementBase, requirementStat, requirementValue: 140, price(lvl) {
        return {mining_scrap: Math.pow(3.5, lvl) * buildNum(15, 'Sp'), mining_barSteel: lvl + 11};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => splicedPowLinear(1.1, 0.1, 12, lvl)},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => splicedPowLinear(1.3, 0.3, 12, lvl)},
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl * 2}
    ]},
    recycling: {persistent: true, requirementBase, requirementStat, requirementValue: 145, price(lvl) {
        return {mining_ember: Math.round(Math.pow(1.15, lvl) * 50)};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.25 + 1)}
    ]},
    stickyJar: {cap: 1, hasDescription: true, persistent: true, note: 'mining_30', requirementBase, requirementStat, requirementValue: 150, price() {
        return {mining_scrap: buildNum(4, 'O')};
    }, effect: [
        {name: 'miningResin', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    scanning: {persistent: true, requirementBase, requirementStat, requirementValue: 155, price(lvl) {
        return {mining_obsidian: Math.pow(2, lvl) * buildNum(10, 'K')};
    }, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.18, lvl)}
    ]},
    largerSurface: {cap: 5, requirementBase, requirementStat, requirementValue: 160, price(lvl) {
        return {mining_scrap: Math.pow(4000, lvl) * buildNum(6, 'N')};
    }, effect: [
        {name: 'miningResinMax', type: 'base', value: lvl => lvl},
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl * 12}
    ]},
    titaniumForge: {cap: 9, requirementBase, requirementStat, requirementValue: 170, price(lvl) {
        return {mining_barAluminium: Math.pow(2, lvl) * 500, mining_barBronze: lvl * 250 + 500, mining_barSteel: lvl * 5 + 35};
    }, effect: [
        {name: 'miningPickaxeCraftingPower', type: 'mult', value: lvl => Math.pow(1.17, lvl)},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl + 1}
    ]},
    platinumExpansion: {cap: 5, requirementBase, requirementStat, requirementValue: 180, price(lvl) {
        return {mining_oreCopper: Math.pow(1.75, lvl) * buildNum(150, 'M'), mining_barTitanium: 4};
    }, effect: [
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyMiningOrePlatinumCap', type: 'base', value: lvl => getSequence(3, lvl)}
    ]},
    platinumCache: {cap: 6, requirementBase, requirementStat, requirementValue: 190, price(lvl) {
        return {mining_oreTitanium: Math.pow(2, lvl) * 450, mining_salt: Math.pow(1.85, lvl) * buildNum(60, 'M'), mining_sulfur: Math.pow(2.2, lvl) * buildNum(800, 'M')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    colossalOreStorage: {cap: 1, requirementBase, requirementStat, requirementValue: 200, price() {
        return {mining_scrap: buildNum(10, 'D')};
    }, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => Math.pow(100, lvl)},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => Math.pow(100, lvl)}
    ]},
    titaniumBombs: {cap: 16, requirementBase, requirementStat, requirementValue: 220, price(lvl) {
        return {mining_barSteel: lvl * 8 + 20, mining_barTitanium: lvl * 4 + 4};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    undergroundRadar: {persistent: true, requirementBase, requirementStat, requirementValue: 240, price(lvl) {
        return {mining_barShiny: Math.round(Math.pow(1.15, lvl) * (lvl + 1) * 5)};
    }, effect: [
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.13, lvl)}
    ]},
    iridiumExpansion: {persistent: true, requirementBase, requirementStat, requirementValue: 260, price(lvl) {
        return {mining_barTitanium: Math.round(Math.pow(1.22, lvl) * (lvl + 3) * 2)};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.11, lvl)},
        {name: 'currencyMiningOreIridiumCap', type: 'base', value: lvl => getSequence(1, lvl)}
    ]},
    iridiumCache: {cap: 4, requirementBase, requirementStat, requirementValue: 270, price(lvl) {
        return {mining_scrap: Math.pow(22.5, lvl) * buildNum(10, 'DD'), mining_sulfur: Math.pow(2.45, lvl) * buildNum(13, 'T')};
    }, effect: [
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl * 0.5 + 1},
        {name: 'currencyMiningOreIridiumCap', type: 'mult', value: lvl => lvl + 1}
    ]},
    iridiumTreetap: {persistent: true, requirementBase, requirementStat, requirementValue: 280, price(lvl) {
        return {mining_deeprock: Math.pow(lvl + 1, 2) * buildNum(500, 'M'), mining_barIridium: Math.round(Math.pow(1.3, lvl) * (lvl + 2))};
    }, effect: [
        {name: 'currencyMiningResinCap', type: 'base', value: lvl => lvl * 10},
        {name: 'miningResinMax', type: 'base', value: lvl => lvl}
    ]},
    deepCuts: {requirementBase, requirementStat, requirementValue: 290, price(lvl) {
        return {mining_deeprock: Math.pow(lvl * 0.01 + 1.5, lvl) * buildNum(2.5, 'B')};
    }, effect: [
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.25, lvl)}
    ]},
    iridiumBombs: {cap: 7, requirementBase, requirementStat, requirementValue: 310, price(lvl) {
        return {mining_barBronze: Math.round(Math.pow(1.4, lvl) * buildNum(30, 'K')), mining_barIridium: lvl * 8 + 6};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.23, lvl)}
    ]},
    oreBag: {requirementBase, cap: 12, requirementStat, requirementValue: 330, price(lvl) {
        return {mining_deeprock: Math.pow(1.65, lvl) * buildNum(800, 'B'), mining_sulfur: Math.pow(1.9, lvl) * buildNum(450, 'T')};
    }, effect: [
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl * 12},
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl * 10},
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl * 4},
        {name: 'currencyMiningOrePlatinumCap', type: 'base', value: lvl => lvl * 4},
    ]},
    osmiumExpansion: {requirementBase, cap: 9, requirementStat, requirementValue: 350, price(lvl) {
        return {mining_barShiny: Math.round(Math.pow(1.44, lvl) * (lvl + 3) * 25), mining_barIridium: Math.round(Math.pow(1.22, lvl) * (lvl + 3) * 8)};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyMiningOreOsmiumCap', type: 'base', value: lvl => lvl * 4},
    ]},
    osmiumCache: {cap: 7, requirementBase, requirementStat, requirementValue: 355, price(lvl) {
        return {mining_scrap: Math.pow(6.75, lvl) * buildNum(900, 'SxD'), mining_deeprock: Math.pow(2.1, lvl) * buildNum(42, 'T')};
    }, effect: [
        {name: 'currencyMiningOreOsmiumCap', type: 'base', value: lvl => lvl * 2},
        {name: 'currencyMiningOreOsmiumCap', type: 'mult', value: lvl => lvl + 1}
    ]},
    darkBombs: {cap: 10, requirementBase, requirementStat, requirementValue: 375, price(lvl) {
        return {mining_barTitanium: Math.round(Math.pow(1.2, lvl) * 360), mining_barDarkIron: lvl * 6 + 2};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.55, lvl)},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
    ]},
    colossalScrapStorage: {cap: 1, requirementBase, requirementStat, requirementValue: 400, price() {
        return {mining_scrap: buildNum(1, 'V')};
    }, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(buildNum(1, 'M'), lvl)}
    ]},
    stoneDissolver: {cap: 50, requirementBase, requirementStat, requirementValue: 425, price(lvl) {
        return {mining_scrap: Math.pow(lvl * 0.02 + 1.8, lvl) * buildNum(1, 'UV')};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.3, lvl)},
    ]},
    leadExpansion: {requirementBase, cap: 5, requirementStat, requirementValue: 450, price(lvl) {
        return {mining_barDarkIron: Math.round(Math.pow(1.4, lvl) * (lvl + 3) * 4)};
    }, effect: [
        {name: 'miningOreCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyMiningOreLeadCap', type: 'base', value: lvl => lvl * 7},
    ]},
}
