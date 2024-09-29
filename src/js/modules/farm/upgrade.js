import store from "../../../store";
import { fallbackArray } from "../../utils/array";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

const requirementStat = 'farm_seedBox';
const requirementBase = () => store.state.upgrade.item[requirementStat].highestLevel;

export default {
    seedBox: {cap: 24, hideCap: true, price(lvl) {
        return [
            {farm_vegetable: 70},
            {farm_berry: 150},
            {farm_grain: 260},
            {farm_flower: 800, farm_gold: 1},
            {farm_vegetable: 4600},
            {farm_berry: buildNum(50, 'K')},
            {farm_grain: buildNum(335, 'K')},
            {farm_flower: buildNum(2, 'M')},
            {farm_vegetable: buildNum(17.5, 'M')},
            {farm_berry: buildNum(120, 'M')},
            {farm_grain: buildNum(900, 'M')},
            {farm_flower: buildNum(7.2, 'B')},
            {farm_vegetable: buildNum(54, 'B')},
            {farm_berry: buildNum(370, 'B')},
            {farm_grain: buildNum(2.2, 'T')},
            {farm_flower: buildNum(35, 'T')},
            {farm_vegetable: buildNum(875, 'T')},
            {farm_berry: buildNum(3.1, 'Qa')},
            {farm_grain: buildNum(130, 'Qa')},
            {farm_flower: buildNum(8.5, 'Qi')},
            {farm_vegetable: buildNum(500, 'Qi')},
            {farm_berry: buildNum(35, 'Sx')},
            {farm_grain: buildNum(3, 'Sp')},
            {farm_flower: buildNum(320, 'Sp')},
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
    ]},
    fertility: {requirementBase, requirementStat, requirementValue: 1, price(lvl) {
        return {farm_vegetable: 50 * Math.pow(lvl * 0.005 + 1.3, lvl), farm_berry: 50 * Math.pow(lvl * 0.005 + 1.3, lvl)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    overgrowth: {cap: 9, requirementBase, requirementStat, requirementValue: 1, price(lvl) {
        return fallbackArray([
            {farm_berry: 200},
            {farm_grain: 850, farm_flower: 1300},
        ], {farm_flower: 240 * Math.pow(5 + lvl, lvl)}, lvl);
    }, effect: [
        {name: 'farmOvergrow', type: 'base', value: lvl => lvl >= 1 ? (lvl * 0.05 + 0.05) : null}
    ], onBuy() {
        store.dispatch('farm/updateFieldCaches');
    }},
    expansion: {cap: 45, requirementBase, requirementStat, requirementValue: 2, price(lvl) {
        return {farm_grain: 300 * Math.pow(lvl * 0.05 + 2, lvl)};
    }, effect: [
        {name: 'farmTiles', type: 'farmTile', value: lvl => lvl}
    ]},
    gardenGnome: {cap: 5, hasDescription: true, requirementBase, requirementStat, requirementValue: 3, price(lvl) {
        return {farm_vegetable: 500 * Math.pow(96, lvl), farm_berry: 500 * Math.pow(96, lvl), farm_flower: 1000 * Math.pow(128, lvl)};
    }, effect: [
        {name: 'gardenGnome', type: 'farmBuilding', value: lvl => lvl},
        {name: 'farmDisableEarlyGame', type: 'unlock', value: lvl => lvl >= 1}
    ], onBuy() {
        store.dispatch('farm/applyEarlyGameBuff');
    }},
    learning: {cap: 1, hasDescription: true, requirementBase, requirementStat, requirementValue: 4, price() {
        return {farm_gold: 1};
    }, effect: [
        {name: 'farmCropExp', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    manure: {cap: 1, requirement() {
        return store.state.upgrade.item.farm_learning.level >= 1;
    }, price() {
        return {farm_gold: 5};
    }, effect: [
        {name: 'farmFertilizer', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    groundSeeds: {requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_flower: 6000 * Math.pow(1.75, lvl), farm_seedHull: Math.round(4 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.01}
    ], onBuy() {
        store.dispatch('farm/updateFieldCaches');
    }},
    roastedSeeds: {cap: 5, requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.8, lvl) * 4)};
    }, effect: [
        {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.1}
    ]},
    hayBales: {requirementBase, requirementStat, requirementValue: 5, price(lvl) {
        return {farm_grass: lvl * 125 + 75};
    }, effect: [
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 100}
    ]},
    smallCrate: {cap: 7, capMult: true, requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {farm_berry: buildNum(24.5, 'K') * Math.pow(1.9, lvl)};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 10}
    ]},
    sprinkler: {cap: 2, hasDescription: true, note: 'farm_8', requirementBase, requirementStat, requirementValue: 6, price(lvl) {
        return {farm_vegetable: buildNum(120, 'K') * Math.pow(buildNum(4, 'M'), lvl), farm_seedHull: 50 * Math.pow(10, lvl)};
    }, effect: [
        {name: 'sprinkler', type: 'farmBuilding', value: lvl => lvl}
    ]},
    magnifyingGlass: {cap: 20, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grain: buildNum(54, 'K') * Math.pow(lvl * 0.1 + 2, lvl), farm_flower: buildNum(33, 'K') * Math.pow(lvl * 0.1 + 2, lvl)};
    }, effect: [
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    scarecrow: {cap: 10, capMult: true, requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grain: buildNum(110, 'K') * Math.pow(1.8, lvl), farm_petal: Math.round(Math.pow(1.4, lvl) * 3), farm_gold: 6 + lvl};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 3}
    ]},
    anthill: {requirementBase, requirementStat, requirementValue: 7, price(lvl) {
        return {farm_grass: getSequence(3, lvl) * 50 + 200};
    }, effect: [
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.015}
    ]},
    bugPowder: {requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {farm_grain: buildNum(675, 'K') * Math.pow(1.75, lvl), farm_bug: Math.round(5 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    shed: {cap: 10, capMult: true, requirementBase, requirementStat, requirementValue: 8, price(lvl) {
        return {farm_seedHull: 5 * getSequence(3, lvl) + 35, farm_bug: 5 * getSequence(3, lvl) + 35, farm_petal: 4 * getSequence(1, lvl) + 10};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 10}
    ]},
    lectern: {cap: 2, hasDescription: true, note: 'farm_12', requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {farm_flower: buildNum(3.5, 'M') * Math.pow(buildNum(3, 'M'), lvl), farm_petal: 75 * Math.pow(5, lvl)};
    }, effect: [
        {name: 'lectern', type: 'farmBuilding', value: lvl => lvl}
    ]},
    perfume: {cap: 25, note: 'farm_13', requirementBase, requirementStat, requirementValue: 9, price(lvl) {
        return {farm_bug: Math.round(5 * lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 10), farm_butterfly: Math.round(lvl * Math.pow(1.1, Math.max(0, lvl - 10)) + 2)};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    mediumCrate: {cap: 8, capMult: true, requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {farm_vegetable: buildNum(90, 'M') * Math.pow(1.75, lvl), farm_grain: buildNum(54, 'M') * Math.pow(2.1, lvl)};
    }, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 25},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 40}
    ]},
    stompedSeeds: {requirementBase, requirementStat, requirementValue: 10, price(lvl) {
        return {farm_seedHull: Math.round(Math.pow(1.15, lvl) * 150)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    insectParadise: {cap: 6, capMult: true, requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {farm_berry: buildNum(750, 'M') * Math.pow(2.4, lvl), farm_petal: Math.round(Math.pow(1.75, lvl) * 11)};
    }, effect: [
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 40},
        {name: 'currencyFarmButterflyCap', type: 'base', value: lvl => lvl * 5},
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 30}
    ]},
    goldenTools: {requirementBase, requirementStat, requirementValue: 11, price(lvl) {
        return {farm_gold: Math.round(Math.pow(1.25, lvl) * 350)};
    }, effect: [
        {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    butterflyWings: {cap: 6, requirementBase, requirementStat, requirementValue: 12, price(lvl) {
        return {farm_butterfly: Math.round(Math.pow(1.35, lvl) * 14)};
    }, effect: [
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 15}
    ]},
    fertileGround: {requirementBase, requirementStat, requirementValue: 12, price(lvl) {
        return {farm_berry: buildNum(4, 'B') * Math.pow(2.25, lvl), farm_flower: buildNum(3.3, 'B') * Math.pow(2.25, lvl)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    pinwheel: {cap: 1, hasDescription: true, note: 'farm_17', requirementBase, requirementStat, requirementValue: 13, price() {
        return {farm_flower: buildNum(250, 'B'), farm_petal: 150, farm_ladybug: 50};
    }, effect: [
        {name: 'pinwheel', type: 'farmBuilding', value: lvl => lvl}
    ]},
    mysticGround: {requirementBase, requirementStat, requirementValue: 13, price(lvl) {
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
        {name: 'farm_premium', type: 'findConsumable', value: lvl => lvl >= 1}
    ]},
    bigCrate: {cap: 10, capMult: true, requirementBase, requirementStat, requirementValue: 14, price(lvl) {
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
        {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    beehive: {cap: 20, requirementBase, requirementStat, requirementValue: 16, price(lvl) {
        return {farm_flower: buildNum(22.5, 'T') * Math.pow(1.4, lvl), farm_seedHull: Math.round(Math.pow(1.14, lvl) * 280), farm_bug: Math.round(Math.pow(1.16, lvl) * 160)};
    }, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => lvl},
        {name: 'currencyFarmBeeCap', type: 'base', value: lvl => lvl * 200}
    ]},
    darkCorner: {cap: 10, requirementBase, requirementStat, requirementValue: 17, price(lvl) {
        return {farm_vegetable: buildNum(175, 'T') * Math.pow(1.75, lvl), farm_grain: buildNum(300, 'T') * Math.pow(1.6, lvl), farm_bug: Math.round(Math.pow(1.24, lvl) * 230)};
    }, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => lvl * 2},
        {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    flag: {cap: 1, hasDescription: true, note: 'farm_20', requirementBase, requirementStat, requirementValue: 18, price() {
        return {farm_spider: 50, farm_bee: 2500, farm_goldenPetal: 10};
    }, effect: [
        {name: 'flag', type: 'farmBuilding', value: lvl => lvl}
    ]},
    wormBait: {requirementBase, requirementStat, requirementValue: 19, price(lvl) {
        return {farm_grass: Math.round(Math.pow(1.22, lvl) * 1350), farm_petal: Math.round(Math.pow(1.16, lvl) * 175), farm_butterfly: Math.round(Math.pow(1.16, lvl) * 50)};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 20},
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 35},
    ]},
    shinySoil: {requirementBase, requirementStat, requirementValue: 20, price(lvl) {
        return {farm_bee: Math.round(Math.pow(1.16, lvl) * 4000), farm_goldenPetal: Math.round(lvl * 0.3 + 5)};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmButterflyCap', type: 'base', value: lvl => lvl * 4},
    ]},
    bigFertilizerBag: {cap: 1, requirementBase, requirementStat, requirementValue: 21, price() {
        return {farm_gold: 2000};
    }, effect: [
        {name: 'farm_analyzing', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_superJuicy', type: 'findConsumable', value: lvl => lvl >= 1},
        {name: 'farm_pellets', type: 'findConsumable', value: lvl => lvl >= 1}
    ]},
    openSesame: {requirementBase, requirementStat, requirementValue: 22, price(lvl) {
        return {farm_flower: buildNum(870, 'Sx') * Math.pow(1.6, lvl), farm_smallSeed: Math.round(Math.pow(1.28, lvl) * 225)};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 50},
        {name: 'currencyFarmSmallSeedCap', type: 'base', value: lvl => lvl * 150},
    ]},
    flowerPainting: {requirementBase, requirementStat, requirementValue: 23, price(lvl) {
        return {farm_berry: buildNum(92, 'Sp') * Math.pow(1.6, lvl), farm_bee: Math.round(Math.pow(1.28, lvl) * 6000)};
    }, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'currencyFarmBeeCap', type: 'base', value: lvl => lvl * 150},
    ]},
}
