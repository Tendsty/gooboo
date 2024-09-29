import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    arch: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.35, lvl) * 50};
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 2}
    ]},
    holyGrass: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 50};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyTree: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 50};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyRock: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 50};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyMetal: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 70};
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    churchTax: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.85, lvl) * 80};
    }, effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    holyWater: {name: 'holyWater', feature: 'village', type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 90};
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyGlass: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 100};
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyCrane: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(2.15, lvl) * 125};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'base', value: lvl => lvl},
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    monk: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(1.85, lvl) * 150};
    }, effect: [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 10}
    ]},
    holyPiggyBank: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(2.3, lvl) * 200};
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    deepWorship: {type: 'prestige', price(lvl) {
        return {village_blessing: Math.pow(2.75, lvl) * 250};
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    cityPlanning: {type: 'prestige', cap: 5, requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(3.2, lvl) * 1750};
    }, effect: [
        {name: 'villageHousingCap', type: 'base', value: lvl => lvl * 5}
    ]},
    managers: {type: 'prestige', cap: 5, requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(3.2, lvl) * 2100};
    }, effect: [
        {name: 'villageWorkstationCap', type: 'base', value: lvl => lvl * 2}
    ]},
    warehouse: {type: 'prestige', cap: 6, requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(3.3, lvl) * 1300};
    }, effect: [
        {name: 'village_storage', type: 'keepUpgrade', value: lvl => lvl >= 1},
        {name: 'village_forge', type: 'keepUpgrade', value: lvl => lvl >= 2},
        {name: 'village_safe', type: 'keepUpgrade', value: lvl => lvl >= 3},
        {name: 'village_aquarium', type: 'keepUpgrade', value: lvl => lvl >= 4},
        {name: 'village_knowledgeTower', type: 'keepUpgrade', value: lvl => lvl >= 5},
        {name: 'village_bigStorage', type: 'keepUpgrade', value: lvl => lvl >= 6}
    ]},
    sandstone: {type: 'prestige', raiseOtherCap: 'village_obelisk', cap: 10, note: 'village_22', requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(2.25, lvl) * 1500};
    }, effect: [
        {name: 'upgradeVillageObeliskCap', type: 'base', value: lvl => lvl}
    ]},
    holyForest: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 1800};
    }, effect: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyGem: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings4.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * 1800};
    }, effect: [
        {name: 'currencyVillageGemGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    deeperWorship: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings5.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(lvl * 0.15 + 1.75, lvl) * buildNum(40, 'K')};
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    holyLab: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings5.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.85, lvl) * buildNum(70, 'K')};
    }, effect: [
        {name: 'currencyVillageScienceGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl * 10}
    ]},
    charity: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings5.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(2.35, lvl) * buildNum(120, 'K')};
    }, effect: [
        {name: 'currencyVillageJoyGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.01}
    ]},
    holyOil: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings6.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * buildNum(75, 'M')};
    }, effect: [
        {name: 'currencyVillageOilGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    holyMarble: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings6.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * buildNum(110, 'M')};
    }, effect: [
        {name: 'currencyVillageMarbleGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    calmingSpeech: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings6.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(0.08 * lvl + 1.8, lvl) * buildNum(150, 'M')};
    }, effect: [
        {name: 'villagePollutionTolerance', type: 'base', value: lvl => lvl}
    ]},
    holyLoot: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings7.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(1.65, lvl) * buildNum(800, 'M')};
    }, effect: [
        {name: 'villageLootGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.1 + 1)}
    ]},
    holyChisel: {type: 'prestige', requirement() {
        return store.state.unlock.villageBuildings7.see;
    }, price(lvl) {
        return {village_blessing: Math.pow(0.05 * lvl + 1.5, lvl) * buildNum(2.5, 'B')};
    }, effect: [
        {name: 'villageLootQuality', type: 'base', value: lvl => lvl * 2}
    ]},

    hireArtisans: {type: 'prestige', requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(10, getSequence(1, lvl)) * 10};
    }, effect: [
        {name: 'villageArtisan', type: 'base', value: lvl => lvl}
    ]},
    hireWorkers: {type: 'prestige', requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(lvl * 0.02 + 1.65, lvl) * 5};
    }, effect: [
        {name: 'villageMaterialGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.05 + 1)}
    ]},
    hireAccountants: {type: 'prestige', requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(1.9, lvl) * 8};
    }, effect: [
        {name: 'currencyVillageCopperCoinCap', type: 'mult', value: lvl => Math.pow(1.75, lvl)}
    ]},
    recipeBook: {type: 'prestige', cap: 6, requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(2.5, lvl) * 60};
    }, effect: [
        {name: 'arrows', type: 'villageCraft', value: lvl => lvl >= 1},
        {name: 'bowl', type: 'villageCraft', value: lvl => lvl >= 2},
        {name: 'smallChest', type: 'villageCraft', value: lvl => lvl >= 3},
        {name: 'chain', type: 'villageCraft', value: lvl => lvl >= 4},
        {name: 'spear', type: 'villageCraft', value: lvl => lvl >= 5},
        {name: 'goldenRing', type: 'villageCraft', value: lvl => lvl >= 6},
    ]},
    adCampaign: {type: 'prestige', requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(lvl * 0.05 + 1.9, lvl) * 80};
    }, effect: [
        {name: 'currencyVillageCopperCoinGain', type: 'mult', value: lvl => Math.pow(1.1, lvl) * (lvl * 0.2 + 1)}
    ]},
    hireExplorers: {type: 'prestige', cap: 4, requirement() {
        return store.state.unlock.villageCraftingSubfeature.see;
    }, price(lvl) {
        return {village_shares: Math.pow(15, getSequence(1, lvl)) * 575};
    }, effect: [
        {name: 'villageSpecialIngredient', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageIngredientCount', type: 'base', value: lvl => lvl > 1 ? (lvl - 1) : null},
        {name: 'villageIngredientBoxAmount', type: 'base', value: lvl => lvl > 1 ? (4 * (lvl - 1)) : null},
        {name: 'poisonedArrows', type: 'villageCraft', value: lvl => lvl >= 1},
        {name: 'frostSpear', type: 'villageCraft', value: lvl => lvl >= 2},
        {name: 'spicySoup', type: 'villageCraft', value: lvl => lvl >= 3},
        {name: 'stopwatch', type: 'villageCraft', value: lvl => lvl >= 4},
        {name: 'villageIngredientBoxGet', type: 'text', value: lvl => lvl},
    ], onBuy() {
        store.dispatch('consumable/gain', {name: 'village_ingredientBox', amount: 3});
    }},
    hireGardeners: {type: 'prestige', requirement() {
        return store.state.upgrade.item.village_woodBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_shares: Math.pow(1.75, lvl) * 140};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    hireMiners: {type: 'prestige', requirement() {
        return store.state.upgrade.item.village_metalBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_shares: Math.pow(1.75, lvl) * 220};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    hireBartenders: {type: 'prestige', requirement() {
        return store.state.upgrade.item.village_glassBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_shares: Math.pow(1.75, lvl) * 335};
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    hireExperts: {type: 'prestige', requirement() {
        return store.state.upgrade.item.village_gemBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_shares: Math.pow(1.75, lvl) * 520};
    }, effect: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageGemGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
}
