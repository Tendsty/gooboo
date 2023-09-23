import store from "../../../store";
import { getSequence } from "../../utils/math";

export default {
    moreDamage: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 75};
    }, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => getSequence(3, lvl) * 0.25 + 1}
    ]},
    moreScrap: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 75};
    }, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => getSequence(1, lvl) + 1},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => getSequence(1, lvl) + 1}
    ]},
    moreGreenCrystal: {type: 'premium', requirement() {
        return store.state.unlock.miningDepthDweller.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 75};
    }, effect: [
        {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    fasterSmeltery: {type: 'premium', requirement() {
        return store.state.unlock.miningSmeltery.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 100};
    }, effect: [
        {name: 'miningSmelterySpeed', type: 'mult', value: lvl => lvl + 1}
    ]},
    moreResin: {type: 'premium', requirement() {
        return store.state.unlock.miningResin.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 150};
    }, effect: [
        {name: 'currencyMiningResinGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyMiningResinCap', type: 'base', value: lvl => lvl}
    ]},
    premiumCraftingSlots: {type: 'premium', requirement() {
        return store.state.unlock.miningPickaxeCrafting.see;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 30};
    }, effect: [
        {name: 'miningPickaxePremiumCraftingSlots', type: 'base', value: lvl => lvl}
    ]},
    moreAluminium: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 15;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 300};
    }, effect: [
        {name: 'currencyMiningOreAluminiumGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreAluminiumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreCopper: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 30;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 450};
    }, effect: [
        {name: 'currencyMiningOreCopperGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreCopperCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreTin: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 50;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 600};
    }, effect: [
        {name: 'currencyMiningOreTinGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreTinCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreIron: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 80;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 900};
    }, effect: [
        {name: 'currencyMiningOreIronGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreIronCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreTitanium: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 120;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1200};
    }, effect: [
        {name: 'currencyMiningOreTitaniumGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOreTitaniumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    morePlatinum: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.mining_maxDepth0.total >= 175;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1800};
    }, effect: [
        {name: 'currencyMiningOrePlatinumGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyMiningOrePlatinumCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreHelium: {type: 'premium', cap: 10, requirement() {
        return store.state.unlock.miningGasSubfeature.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 300};
    }, effect: [
        {name: 'currencyMiningHeliumGain', type: 'base', value: lvl => lvl * 0.004}
    ]},
    moreSmoke: {type: 'premium', requirement() {
        return store.state.unlock.miningSmoke.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 325};
    }, effect: [
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    moreNeon: {type: 'premium', cap: 10, requirement() {
        return store.state.stat.mining_maxDepth1.total >= 40;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 525};
    }, effect: [
        {name: 'currencyMiningNeonGain', type: 'base', value: lvl => lvl * 0.004}
    ]},
    moreArgon: {type: 'premium', cap: 10, requirement() {
        return store.state.stat.mining_maxDepth1.total >= 90;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 800};
    }, effect: [
        {name: 'currencyMiningArgonGain', type: 'base', value: lvl => lvl * 0.004}
    ]},
}
