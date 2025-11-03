import store from "../../../store";
import { fallbackArray } from "../../utils/array";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'farm_seedBox';
const requirementBase = () => store.state.upgrade.item[requirementStat].highestLevel;

export default {
    seedBox: {cap: 32, hideCap: true, price(lvl) {
        return [
            {farm_vegetable: 30},
            {farm_berry: 120},
            {farm_grain: 230},
            {farm_flower: 800, farm_gold: 1},
            {farm_vegetable: 4600},
            {farm_berry: 5e4},
            {farm_grain: 3.35e5},
            {farm_flower: 2e6},
            {farm_vegetable: 1.75e7},
            {farm_berry: 1.2e8},
            {farm_grain: 9e8},
            {farm_flower: 7.2e9},
            {farm_vegetable: 5.4e10},
            {farm_berry: 3.7e11},
            {farm_grain: 2.2e12},
            {farm_flower: 3.5e13},
            {farm_vegetable: 8.75e14},
            {farm_berry: 3.1e16},
            {farm_grain: 1.3e18},
            {farm_flower: 8.5e19},
            {farm_vegetable: 5e21},
            {farm_berry: 6.5e23},
            {farm_grain: 3e26},
            {farm_flower: 3.2e29},
            {farm_vegetable: 4.4e32},
            {farm_berry: 7.5e35},
            {farm_grain: 1.2e39},
            {farm_flower: 2.25e43},
            {farm_vegetable: 4.8e47},
            {farm_berry: 1.1e52},
            {farm_grain: 2.8e56},
            {farm_flower: 7.5e60},
        ][lvl];
    }, effect: [
        {name: 'blueberry', type: 'farmSeed', value: lvl => lvl >= 1},
        {name: 'wheat', type: 'farmSeed', value: lvl => lvl >= 2},
        {name: 'tulip', type: 'farmSeed', value: lvl => lvl >= 3},
        {name: 'potato', type: 'farmSeed', value: lvl => lvl >= 4},
        {name: 'raspberry', type: 'farmSeed', value: lvl => lvl >= 5},
        {name: 'barley', type: 'farmSeed', value: lvl => lvl >= 6},
        {name: 'dandelion', type: 'farmSeed', value: lvl => lvl >= 7},
        {name: 'corn', type: 'farmSeed', value: lvl => lvl >= 8},
        {name: 'watermelon', type: 'farmSeed', value: lvl => lvl >= 9},
        {name: 'rice', type: 'farmSeed', value: lvl => lvl >= 10},
        {name: 'rose', type: 'farmSeed', value: lvl => lvl >= 11},
        {name: 'leek', type: 'farmSeed', value: lvl => lvl >= 12},
        {name: 'honeymelon', type: 'farmSeed', value: lvl => lvl >= 13},
        {name: 'rye', type: 'farmSeed', value: lvl => lvl >= 14},
        {name: 'daisy', type: 'farmSeed', value: lvl => lvl >= 15},
        {name: 'cucumber', type: 'farmSeed', value: lvl => lvl >= 16},
        {name: 'grapes', type: 'farmSeed', value: lvl => lvl >= 17},
        {name: 'hops', type: 'farmSeed', value: lvl => lvl >= 18},
        {name: 'violet', type: 'farmSeed', value: lvl => lvl >= 19},
        {name: 'sweetPotato', type: 'farmSeed', value: lvl => lvl >= 20},
        {name: 'strawberry', type: 'farmSeed', value: lvl => lvl >= 21},
        {name: 'sesame', type: 'farmSeed', value: lvl => lvl >= 22},
        {name: 'sunflower', type: 'farmSeed', value: lvl => lvl >= 23},
        {name: 'spinach', type: 'farmSeed', value: lvl => lvl >= 24},
        {name: 'currant', type: 'farmSeed', value: lvl => lvl >= 25},
        {name: 'redwheat', type: 'farmSeed', value: lvl => lvl >= 26},
        {name: 'poppy', type: 'farmSeed', value: lvl => lvl >= 27},
        {name: 'pumpkin', type: 'farmSeed', value: lvl => lvl >= 28},
        {name: 'blackberry', type: 'farmSeed', value: lvl => lvl >= 29},
        {name: 'millet', type: 'farmSeed', value: lvl => lvl >= 30},
        {name: 'petunia', type: 'farmSeed', value: lvl => lvl >= 31},
        {name: 'chili', type: 'farmSeed', value: lvl => lvl >= 32},
    ]},
    fertility: {requirementBase, requirementStat, requirementValue: 1, price(lvl) {
        return {farm_vegetable: 50 * Math.min(lvl * 0.1 + 0.5, 1) * Math.pow(lvl * 0.005 + 1.3, lvl), farm_berry: 50 * Math.min(lvl * 0.1 + 0.5, 1) * Math.pow(lvl * 0.005 + 1.3, lvl)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    overgrowth: {cap: 7, requirementBase, requirementStat, requirementValue: 1, price(lvl) {
        return fallbackArray([
            {farm_berry: 80},
            {farm_grain: 425, farm_flower: 650},
        ], {farm_flower: 240 * Math.pow(5 + lvl, lvl)}, lvl);
    }, effect: [
        {name: 'farmOvergrow', type: 'base', value: lvl => lvl >= 1 ? (lvl * 0.1 + 0.3) : null}
    ], onBuy() {
        store.dispatch('farm/updateFieldCaches');
    }},
    expansion: {cap: 45, requirementBase, requirementStat, requirementValue: 2, price(lvl) {
        return {farm_grain: 300 * Math.min(lvl * 0.1 + 0.5, 1) * Math.pow(lvl * 0.05 + 2, lvl)};
    }, effect: [
        {name: 'farmTiles', type: 'farmTile', value: lvl => lvl},
        {name: 'farmMaxCare', type: 'base', value: lvl => lvl >= 3 ? Math.floor(lvl / 3) : null},
    ]},
    gardenGnome: {cap: 5, hasDescription: true, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {farm_vegetable: 250 * Math.pow(128, lvl), farm_berry: 250 * Math.pow(128, lvl), farm_flower: 500 * Math.pow(192, lvl)};
    }, effect: [
        {name: 'gardenGnome', type: 'farmBuilding', value: lvl => lvl},
        {name: 'farmDisableEarlyGame', type: 'unlock', value: lvl => lvl >= 1},
    ], onBuy() {
        store.dispatch('farm/applyEarlyGameBuff');
    }},
    learning: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 4, price() {
        return {farm_gold: 1};
    }, effect: [
        {name: 'farmCropExp', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    wateringCan: {cap: 1, hasDescription: true, requirement() {
        return store.state.upgrade.item.farm_learning.level >= 1;
    }, price() {
        return {farm_berry: 2500, farm_gold: 2};
    }, effect: [
        {name: 'farmCare', type: 'unlock', value: lvl => lvl >= 1}
    ], onBuy() {
        store.dispatch('currency/gain', {feature: 'farm', name: 'rainwater', amount: 100});
    }},
    manure: {cap: 1, requirement() {
        return store.state.upgrade.item.farm_learning.level >= 1;
    }, price() {
        return {farm_gold: 5};
    }, effect: [
        {name: 'farmFertilizer', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    seedBag: {cap: 1, requirement() {
        return store.state.upgrade.item.farm_learning.level >= 1;
    }, price() {
        return {farm_gold: 80};
    }, effect: [
        {name: 'fern', type: 'farmSeed', value: lvl => lvl >= 1},
        {name: 'reed', type: 'farmSeed', value: lvl => lvl >= 1},
        {name: 'wildflower', type: 'farmSeed', value: lvl => lvl >= 1},
    ]},
    groundSeeds: {cap: 50, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_flower: 6000 * Math.pow(lvl * 0.04 + 1.5, lvl), farm_seedHull: Math.round(4 * lvl * Math.pow(1.08, Math.max(0, lvl - 10)) + 10)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.02}
    ], onBuy() {
        store.dispatch('farm/updateFieldCaches');
    }},
    roastedSeeds: {cap: 5, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.8, lvl) * 4)};
    }, effect: [
        {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.1}
    ]},
    rainBarrel: {cap: 50, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_berry: 4500 * Math.pow(lvl * 0.2 + 2.5, lvl)};
    }, effect: [
        {name: 'currencyFarmRainwaterCap', type: 'base', value: lvl => lvl * 10}
    ]},
    smallCrate: {cap: 7, requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {farm_vegetable: 1.8e4 * Math.pow(1.9, lvl), farm_grain: 6000 * Math.pow(2.25, lvl)};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 10}
    ]},
    sprinkler: {cap: 2, hasDescription: true, note: 'farm_8', requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {farm_vegetable: buildNum(120, 'K') * Math.pow(buildNum(4, 'M'), lvl), farm_seedHull: 50 * Math.pow(10, lvl)};
    }, effect: [
        {name: 'sprinkler', type: 'farmBuilding', value: lvl => lvl}
    ]},
    hayBales: {cap: 50, requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {farm_grass: getSequence(12, lvl) * 15 + 75};
    }, effect: [
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 200}
    ]},
    magnifyingGlass: {cap: 20, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grain: buildNum(54, 'K') * Math.pow(lvl * 0.1 + 2, lvl), farm_flower: buildNum(33, 'K') * Math.pow(lvl * 0.1 + 2, lvl)};
    }, effect: [
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    scarecrow: {cap: 10, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grain: buildNum(110, 'K') * Math.pow(1.8, lvl), farm_petal: Math.round(Math.pow(1.4, lvl) * 3), farm_gold: 6 + lvl};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 3}
    ]},
    anthill: {cap: 20, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grass: getSequence(3, lvl) * 75 + 200};
    }, effect: [
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    bugPowder: {cap: 40, requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {farm_grain: buildNum(675, 'K') * Math.pow(1.75, lvl), farm_bug: Math.round(5 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    shed: {cap: 10, requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {farm_seedHull: 5 * getSequence(3, lvl) + 35, farm_bug: 5 * getSequence(3, lvl) + 35, farm_petal: 4 * getSequence(1, lvl) + 10};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 10}
    ]},
    gutter: {cap: 10, requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {farm_gold: Math.round(Math.pow(1.35, lvl) * (lvl + 1) * 100)};
    }, effect: [
        {name: 'currencyFarmRainwaterGain', type: 'base', value: lvl => lvl}
    ]},
    lectern: {cap: 2, hasDescription: true, note: 'farm_12', requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {farm_flower: buildNum(3.5, 'M') * Math.pow(buildNum(3, 'M'), lvl), farm_petal: 75 * Math.pow(5, lvl)};
    }, effect: [
        {name: 'lectern', type: 'farmBuilding', value: lvl => lvl}
    ]},
    pheromones: {cap: 25, requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {
            farm_petal: Math.round(4 * lvl * Math.pow(1.05, lvl) + 4),
            farm_bug: Math.round(5 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10),
            farm_butterfly: Math.round(lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 2),
        };
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.04 + 1},
    ]},
    perfume: {cap: 20, note: 'farm_13', requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {farm_berry: buildNum(9, 'M') * Math.pow(1.45, lvl), farm_bug: Math.round(2 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10)};
    }, effect: [
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 10},
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01},
    ]},
    mediumCrate: {cap: 8, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {farm_vegetable: buildNum(90, 'M') * Math.pow(1.75, lvl), farm_grain: buildNum(54, 'M') * Math.pow(2.1, lvl)};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 25},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 40}
    ]},
    stompedSeeds: {cap: 25, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.15, lvl) * 150)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    insectParadise: {cap: 6, requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {farm_berry: buildNum(750, 'M') * Math.pow(2.4, lvl), farm_petal: Math.round(Math.pow(1.75, lvl) * 11)};
    }, effect: [
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 40},
        {name: 'currencyFarmButterflyCap', type: 'base', value: lvl => lvl * 5},
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 30}
    ]},
    goldenTools: {cap: 20, requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {farm_gold: Math.round(Math.pow(1.25, lvl) * 350)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    butterflyWings: {cap: 6, requirementBase, requirementStat, requirementValue: 12, price(lvl) {
        return {farm_butterfly: Math.round(Math.pow(1.35, lvl) * 14)};
    }, effect: [
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 15}
    ]},
    fertileGround: {cap: 40, requirementBase, requirementStat, requirementValue: 12, price(lvl) {
        return {farm_berry: buildNum(4, 'B') * Math.pow(2.25, lvl), farm_flower: buildNum(3.3, 'B') * Math.pow(2.25, lvl)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    pinwheel: {cap: 1, hasDescription: true, note: 'farm_17', requirementBase, requirementStat, requirementValue: 13, price() {
        return {farm_flower: buildNum(250, 'B'), farm_petal: 150, farm_ladybug: 50};
    }, effect: [
        {name: 'pinwheel', type: 'farmBuilding', value: lvl => lvl}
    ]},
    pileOfPlants: {cap: 15, requirementBase, requirementStat, requirementValue: 13, price(lvl) {
        return {
            farm_seedHull: Math.round(Math.pow(1.24, lvl) * 225),
            farm_grass: Math.round(Math.pow(1.15, lvl) * (lvl * 0.2 + 1) * 300),
            farm_petal: Math.round(Math.pow(1.2, lvl) * 90),
        };
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
    ]},
    compostBin: {cap: 15, requirementBase, requirementStat, requirementValue: 13, price(lvl) {
        return {
            farm_vegetable: buildNum(40, 'B') * Math.pow(lvl * 0.25 + 4, lvl),
            farm_flower: buildNum(12, 'B') * Math.pow(lvl * 0.3 + 4, lvl),
        };
    }, effect: [
        {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.04},
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01},
    ]},
    mysticGround: {cap: 40, requirementBase, requirementStat, requirementValue: 13, price(lvl) {
        return {farm_vegetable: buildNum(37.5, 'B') * Math.pow(2.25, lvl), farm_ladybug: Math.round(Math.pow(1.12, lvl) * 10)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 20}
    ]},
    fertilizerBag: {cap: 1, requirementBase, requirementStat, requirementValue: 14, price() {
        return {farm_gold: 700};
    }, effect: [
        {name: 'farm_weedKiller', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_turboGrow', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_premium', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_supplementsL', type: 'findConsumable', value: lvl => lvl >= 1},
    ]},
    bigCrate: {cap: 10, requirementBase, requirementStat, requirementValue: 14, price(lvl) {
        return {farm_berry: buildNum(190, 'B') * Math.pow(1.85, lvl), farm_grain: buildNum(240, 'B') * Math.pow(1.85, lvl)};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 60},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 80},
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 25}
    ]},
    artificialWebs: {cap: 3, requirementBase, requirementStat, requirementValue: 15, price(lvl) {
        return {farm_flower: buildNum(1, 'T') * Math.pow(9, lvl), farm_ladybug: Math.round(Math.pow(1.5, lvl) * 100)};
    }, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => lvl * 4}
    ]},
    studyInsects: {cap: 10, requirementBase, requirementStat, requirementValue: 15, price(lvl) {
        return {farm_berry: buildNum(1.35, 'T') * Math.pow(2.65, lvl), farm_butterfly: Math.round(Math.pow(1.25, lvl) * 28)};
    }, effect: [
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    beehive: {cap: 20, requirementBase, requirementStat, requirementValue: 16, price(lvl) {
        return {farm_flower: buildNum(22.5, 'T') * Math.pow(1.4, lvl), farm_seedHull: Math.round(Math.pow(1.14, lvl) * 280), farm_bug: Math.round(Math.pow(1.16, lvl) * 160)};
    }, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => lvl},
        {name: 'currencyFarmBeeCap', type: 'base', value: lvl => lvl * 200},
    ]},
    potOfSand: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 16, price() {
        return {farm_gold: 1500, farm_butterfly: 100, farm_ladybug: 1100};
    }, effect: [
        {name: 'cactus', type: 'farmSeed', value: lvl => lvl >= 1},
    ]},
    darkCorner: {cap: 10, requirementBase, requirementStat, requirementValue: 17, price(lvl) {
        return {farm_vegetable: buildNum(175, 'T') * Math.pow(1.75, lvl), farm_grain: buildNum(300, 'T') * Math.pow(1.6, lvl), farm_bug: Math.round(Math.pow(1.24, lvl) * 115)};
    }, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => lvl * 2},
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01},
    ]},
    carrotCake: {cap: 20, requirementBase, requirementStat, requirementValue: 17, price(lvl) {
        return {farm_vegetable: 2e15 * Math.pow(2.05, lvl), farm_grain: 3e15 * Math.pow(2.25, lvl)};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
    ]},
    flag: {cap: 1, hasDescription: true, note: 'farm_20', requirementBase, requirementStat, requirementValue: 18, price() {
        return {farm_gold: buildNum(10, 'K'), farm_spider: 50, farm_bee: 2500};
    }, effect: [
        {name: 'flag', type: 'farmBuilding', value: lvl => lvl},
    ]},
    honeyJar: {cap: 20, requirementBase, requirementStat, requirementValue: 18, price(lvl) {
        return {farm_berry: 1.5e16 * Math.pow(3.3, lvl), farm_bee: Math.round(Math.pow(1.1, lvl) * 1250)};
    }, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    wormBait: {cap: 10, requirementBase, requirementStat, requirementValue: 19, price(lvl) {
        return {farm_grass: Math.round(Math.pow(1.22, lvl) * 1350), farm_petal: Math.round(Math.pow(1.19, lvl) * 175), farm_butterfly: Math.round(Math.pow(1.16, lvl) * 50)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 35},
    ]},
    hayStorage: {cap: 8, requirementBase, requirementStat, requirementValue: 19, price(lvl) {
        return {farm_flower: 6.7e17 * Math.pow(5.5, lvl), farm_seedHull: Math.round(Math.pow(1.2, lvl) * 600)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 60},
    ]},
    shinySoil: {cap: 20, requirementBase, requirementStat, requirementValue: 20, price(lvl) {
        return {farm_bee: Math.round(Math.pow(1.16, lvl) * 2000), farm_petal: lvl * 30 + 500};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmButterflyCap', type: 'base', value: lvl => lvl * 4},
    ]},
    fieldBlessing: {cap: 20, requirementBase, requirementStat, requirementValue: 20, price(lvl) {
        return {farm_vegetable: 5.1e20 * Math.pow(2.65, lvl), farm_spider: lvl * 4 + 40};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.05 + 1},
    ]},
    bigFertilizerBag: {cap: 1, requirementBase, requirementStat, requirementValue: 21, price() {
        return {farm_gold: 2000};
    }, effect: [
        {name: 'farm_analyzing', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_superJuicy', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_pellets', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_supplementsXL', type: 'findConsumable', value: lvl => lvl >= 1},
    ]},
    smellyMud: {cap: 15, requirementBase, requirementStat, requirementValue: 21, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.12, lvl) * 1000), farm_grass: lvl * 600 + 4000, farm_bug: Math.round(Math.pow(1.08, lvl) * 1350)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    openSesame: {cap: 20, requirementBase, requirementStat, requirementValue: 22, price(lvl) {
        return {farm_flower: 1.7e23 * Math.pow(1.6, lvl), farm_smallSeed: Math.round(Math.pow(1.28, lvl) * 225)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 50},
        {name: 'currencyFarmSmallSeedCap', type: 'base', value: lvl => lvl * 150},
    ]},
    prettyFlowerPot: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 22, price() {
        return {farm_gold: 3500, farm_smallSeed: 975};
    }, effect: [
        {name: 'cress', type: 'farmSeed', value: lvl => lvl >= 1},
    ]},
    flowerPainting: {cap: 20, requirementBase, requirementStat, requirementValue: 23, price(lvl) {
        return {farm_grain: 9.2e25 * Math.pow(1.6, lvl), farm_bee: Math.round(Math.pow(1.12, lvl) * 3000)};
    }, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmBeeCap', type: 'base', value: lvl => lvl * 150},
    ]},
    plantEncyclopedia: {cap: 90, requirementBase, requirementStat, requirementValue: 24, price(lvl) {
        return {farm_grain: 7.5e28 * Math.pow(1.5, lvl)};
    }, effect: [
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    smallSeedBag: {cap: 12, requirementBase, requirementStat, requirementValue: 25, price(lvl) {
        return {farm_vegetable: 1.4e32 * Math.pow(2.85, lvl), farm_berry: 1.75e32 * Math.pow(2.75, lvl), farm_petal: Math.round(Math.pow(1.15, lvl) * 650)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.075 + 1},
        {name: 'currencyFarmSmallSeedCap', type: 'base', value: lvl => lvl * 350},
    ]},
    crateOfGrain: {cap: 60, requirementBase, requirementStat, requirementValue: 26, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.05, lvl) * 1200), farm_smallSeed: Math.round(Math.pow(1.08, lvl) * 1350)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
    ]},
    crateOfFlowers: {cap: 60, requirementBase, requirementStat, requirementValue: 27, price(lvl) {
        return {farm_petal: Math.round(Math.pow(1.05, lvl) * 750), farm_ladybug: Math.round(Math.pow(1.07, lvl) * 1500)};
    }, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
    ]},
    crateOfVegetables: {cap: 60, requirementBase, requirementStat, requirementValue: 28, price(lvl) {
        return {farm_bug: Math.round(Math.pow(1.05, lvl) * 1050), farm_spider: Math.round(Math.pow(1.075, lvl) * 40)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
    ]},
    crateOfBerries: {cap: 60, requirementBase, requirementStat, requirementValue: 29, price(lvl) {
        return {farm_butterfly: Math.round(Math.pow(1.06, lvl) * 100), farm_bee: Math.round(Math.pow(1.09, lvl) * 2500)};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
    ]},
    ancientFlowerPot: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 30, price() {
        return {farm_gold: 2.5e4, farm_smallSeed: 1e4, farm_snail: 50};
    }, effect: [
        {name: 'ancientFern', type: 'farmSeed', value: lvl => lvl >= 1},
    ]},
    trailOfSlime: {cap: 10, requirementBase, requirementStat, requirementValue: 30, price(lvl) {
        return {farm_flower: 3.15e51 * Math.pow(lvl * 0.15 + 1.45, lvl), farm_grass: Math.round(Math.pow(1.12, lvl) * 6000)};
    }, effect: [
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmSnailCap', type: 'base', value: lvl => lvl * 5},
    ]},
    bucketOfSnails: {cap: 25, requirementBase, requirementStat, requirementValue: 31, price(lvl) {
        return {farm_grain: 1e56 * Math.pow(2.35, lvl), farm_snail: Math.round(Math.pow(1.05, lvl) * (lvl * 3 + 24))};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.08 + 1},
    ]},
}
