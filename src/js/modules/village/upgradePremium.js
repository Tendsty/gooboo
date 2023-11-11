import store from "../../../store";
import { fallbackArray } from "../../utils/array";
import { getSequence } from "../../utils/math";

export default {
    overtime: {type: 'premium', price(lvl) {
        return {gem_ruby: fallbackArray([70], [2, 3][(lvl - 1) % 2] * Math.pow(2, Math.floor((lvl - 1) / 2)) * 100, lvl)};
    }, effect: [
        {name: 'villageMaterialGain', type: 'mult', value: lvl => fallbackArray([1, 1.1], Math.pow(1.25, lvl - 1), lvl)}
    ]},
    goldenThrone: {type: 'premium', requirement() {
        return store.state.stat.village_coin.total > 0;
    }, price(lvl) {
        return {gem_ruby: fallbackArray([30], [2, 3][(lvl - 1) % 2] * Math.pow(2, Math.floor((lvl - 1) / 2)) * 60, lvl)};
    }, effect: [
        {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => fallbackArray([1, 1.5], getSequence(2, lvl - 1) * 0.5 + 1, lvl)}
    ]},
    fasterBuilding: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 75};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: lvl => lvl + 1}
    ]},
    moreFaith: {type: 'premium', requirement() {
        return store.state.stat.village_faith.total > 0;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 80};
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    morePlantFiber: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_plantFiber.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 275};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreWood: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_wood.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 275};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreStone: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_stone.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 275};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreMetal: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_metal.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 375};
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreWater: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_water.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 450};
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreGlass: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_glass.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 600};
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreHardwood: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_hardwood.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 900};
    }, effect: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreGem: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_gem.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 900};
    }, effect: [
        {name: 'currencyVillageGemGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreKnowledge: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_knowledge.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 675};
    }, effect: [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)}
    ]},
    moreScience: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_science.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1300};
    }, effect: [
        {name: 'currencyVillageScienceGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)}
    ]},
    moreOil: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_oil.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1800};
    }, effect: [
        {name: 'currencyVillageOilGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    moreMarble: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.village_marble.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 2250};
    }, effect: [
        {name: 'currencyVillageMarbleGain', type: 'mult', value: lvl => Math.pow(1.75, lvl)},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
}
