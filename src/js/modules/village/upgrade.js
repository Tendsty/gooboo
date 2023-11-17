import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    wallet: {cap: 12, capMult: true, requirement() {
        return store.state.unlock.villageCoinUpgrades.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.3, lvl) * 200)};
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 150}
    ]},
    resourceBag: {cap: 10, capMult: true, requirement() {
        return store.state.unlock.villageCoinUpgrades.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.4, lvl) * 200)};
    }, effect: [
        {name: 'currencyVillagePlantFiberCap', type: 'base', value: lvl => lvl * 200},
        {name: 'currencyVillageWoodCap', type: 'base', value: lvl => lvl * 200},
        {name: 'currencyVillageStoneCap', type: 'base', value: lvl => lvl * 200}
    ]},
    metalBag: {cap: 5, capMult: true, requirement() {
        return store.state.unlock.villageCoinUpgrades.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.7, lvl) * 300)};
    }, effect: [
        {name: 'currencyVillageMetalCap', type: 'base', value: lvl => lvl * 400}
    ]},

    // Coin upgrades
    scythe: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeScythe.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.55, lvl) * 2500)};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)},
        {name: 'currencyVillageGrainGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    hatchet: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeHatchet.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.55, lvl) * 5000)};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)},
        {name: 'currencyVillageFruitGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    pickaxe: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradePickaxe.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.55, lvl) * 7500)};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)},
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => Math.pow(1.04, lvl) * (lvl * 0.04 + 1)}
    ]},
    wateringCan: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeWateringCan.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.55, lvl) * buildNum(10, 'K'))};
    }, effect: [
        {name: 'currencyVillageGrainGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyVillageFruitGain', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.22, lvl)}
    ]},
    investment: {cap: 50, requirement() {
        return store.state.unlock.villageUpgradeInvestment.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.35, lvl) * buildNum(12.5, 'K'))};
    }, effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => Math.pow(1.11, lvl)}
    ]},

    // Knowledge upgrades
    basics: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeBasics.use;
    }, price(lvl) {
        return {village_knowledge: 12 * lvl + 80};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.15 + 1)},
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)},
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)}
    ]},
    processing: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeProcessing.use;
    }, price(lvl) {
        return {village_knowledge: 12 * lvl + 120};
    }, effect: [
        {name: 'villageFoodGain', type: 'mult', value: lvl => Math.pow(1.07, lvl)},
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)}
    ]},
    pump: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradePump.use;
    }, price(lvl) {
        return {village_knowledge: 12 * lvl + 160};
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.04 + 1)}
    ]},
    sand: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeSand.use;
    }, price(lvl) {
        return {village_knowledge: 12 * lvl + 200};
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => Math.pow(1.08, lvl) * (lvl * 0.08 + 1)}
    ]},
    book: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeBook.use;
    }, price(lvl) {
        return {village_knowledge: 12 * lvl + 240};
    }, effect: [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: lvl => lvl * 0.04 + 1}
    ]},

    // More coin upgrades
    axe: {cap: 40, requirement() {
        return store.state.unlock.villageUpgradeAxe.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.3, lvl) * buildNum(500, 'K'))};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    bomb: {cap: 40, requirement() {
        return store.state.unlock.villageUpgradeBomb.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.3, lvl) * buildNum(1.5, 'M'))};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageGemGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    toll: {cap: 40, requirement() {
        return store.state.unlock.villageUpgradeToll.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.3, lvl) * buildNum(4, 'M'))};
    }, effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    fishingRod: {cap: 40, requirement() {
        return store.state.unlock.villageUpgradeFishingRod.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.3, lvl) * buildNum(10, 'M'))};
    }, effect: [
        {name: 'currencyVillageFishGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    holyBook: {cap: 40, requirement() {
        return store.state.unlock.villageUpgradeHolyBook.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.45, lvl) * buildNum(22.5, 'M'))};
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 8}
    ]},

    // Science upgrades
    breakthrough: {cap: 50, requirement() {
        return store.state.unlock.villageUpgradeBreakthrough.use;
    }, price(lvl) {
        return {village_science: Math.round(Math.pow(1.05, Math.max(lvl - 25, 0)) * lvl * 10 + 20)};
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 5},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl * 2}
    ]},
    modifiedPlants: {cap: 10, requirement() {
        return store.state.unlock.villageUpgradeModifiedPlants.use;
    }, price(lvl) {
        return {village_science: lvl * 15 + 30};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageGrainGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageFruitGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageVegetableGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    dopamine: {cap: 15, requirement() {
        return store.state.unlock.villageUpgradeDopamine.use;
    }, price(lvl) {
        return {village_science: lvl * 15 + 40};
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.002},
        {name: 'currencyVillageJoyCap', type: 'base', value: lvl => lvl * 50}
    ]},
    adrenaline: {cap: 15, requirement() {
        return store.state.unlock.villageUpgradeAdrenaline.use;
    }, price(lvl) {
        return {village_science: lvl * 15 + 50};
    }, effect: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageGemGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageFishGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},

    // Old library upgrades
    sprinkler: {cap: 15, requirement() {
        return store.state.unlock.villageUpgradeSprinkler.use;
    }, price(lvl) {
        return {village_coin: Math.ceil(Math.pow(1.65, lvl) * buildNum(2, 'T'))};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyVillageGrainGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageFruitGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageVegetableGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
    ]},
    greed: {cap: 15, requirement() {
        return store.state.unlock.villageUpgradeGreed.use;
    }, price(lvl) {
        return {village_knowledge: lvl * 160 + 2200, village_science: lvl * 45 + 500};
    }, effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},

    // Loot upgrades
    ambition: {requirement() {
        return store.state.unlock.villageUpgradeAmbition.use;
    }, price(lvl) {
        return {village_loot0: Math.ceil(Math.pow(1.15, lvl) * (lvl * 2 + 6))};
    }, effect: [
        {name: 'villageLootGain', type: 'mult', value: lvl => lvl * 0.01 + 1},
        {name: 'villageLootQuality', type: 'base', value: lvl => lvl * 3}
    ]},
    understanding: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeUnderstanding.use;
    }, price(lvl) {
        return {village_loot0: Math.ceil(Math.pow(1.2, lvl) * 55)};
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageScienceCap', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    curiosity: {requirement() {
        return store.state.unlock.villageUpgradeCuriosity.use;
    }, price(lvl) {
        return {village_loot1: Math.ceil(Math.pow(1.15, lvl) * (lvl + 4))};
    }, effect: [
        {name: 'villageLootGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    worship: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeWorship.use;
    }, price(lvl) {
        return {village_loot1: Math.ceil(Math.pow(1.18, lvl) * 55)};
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => getSequence(2, lvl) * 0.1 + 1}
    ]},
    bartering: {requirement() {
        return store.state.unlock.villageUpgradeBartering.use;
    }, price(lvl) {
        return {village_loot2: Math.ceil(Math.pow(1.15, lvl) * (lvl + 2.5))};
    }, effect: [
        {name: 'villageLootQuality', type: 'base', value: lvl => lvl},
        {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
    ]},
    sparks: {cap: 20, requirement() {
        return store.state.unlock.villageUpgradeSparks.use;
    }, price(lvl) {
        return {village_loot2: Math.ceil(Math.pow(1.16, lvl) * 55)};
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl}
    ]},
}
