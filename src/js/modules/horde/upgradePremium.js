import store from "../../../store";
import { getSequence } from "../../utils/math";

export default {
    morePower: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 100};
    }, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => getSequence(2, lvl) * 0.3 + 1},
        {name: 'hordeHealth', type: 'mult', value: lvl => getSequence(2, lvl) * 0.3 + 1}
    ]},
    moreBones: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 75};
    }, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => getSequence(1, lvl) + 1},
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => getSequence(1, lvl) + 1}
    ]},
    moreMonsterParts: {type: 'premium', requirement() {
        return store.state.stat.horde_monsterPart.total > 0;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 90};
    }, effect: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    moreSouls: {type: 'premium', requirement() {
        return store.state.stat.horde_maxZone.total > 19;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 110};
    }, effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    moreMastery: {type: 'premium', requirement() {
        return store.state.stat.horde_maxZone.total > 75;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 125};
    }, effect: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.25 + 1}
    ]},
    ancientPower: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.power.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 300};
    }, effect: [
        {name: 'powerHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientFortitude: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.fortitude.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 300};
    }, effect: [
        {name: 'fortitudeHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientWealth: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.wealth.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 300};
    }, effect: [
        {name: 'wealthHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientSpirit: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.spirit.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 450};
    }, effect: [
        {name: 'spiritHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientSharpsight: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.sharpsight.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 600};
    }, effect: [
        {name: 'sharpsightHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientReaping: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.reaping.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 750};
    }, effect: [
        {name: 'reapingHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientRemembrance: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.remembrance.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 750};
    }, effect: [
        {name: 'remembranceHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientHolding: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.holding.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 975};
    }, effect: [
        {name: 'holdingHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientExpertise: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.expertise.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 1300};
    }, effect: [
        {name: 'expertiseHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientMystery: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.mystery.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 1800};
    }, effect: [
        {name: 'mysteryHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    ancientFreezing: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumAncient', requirement() {
        return store.state.horde.heirloom.freezing.amount > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 2500};
    }, effect: [
        {name: 'freezingHeirloomEffect', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    moreBlood: {type: 'premium', requirement() {
        return store.state.unlock.hordeClassesSubfeature.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 900};
    }, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(1, lvl) + 1},
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => getSequence(1, lvl) + 1},
    ]},
    moreCourage: {type: 'premium', requirement() {
        return store.state.unlock.hordeClassesSubfeature.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 1200};
    }, effect: [
        {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.25 + 1},
    ]},
    moreMonsterTeeth: {type: 'premium', cap: 5, requirement() {
        return store.state.unlock.hordeMonsterToothWarzone.see;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 2000};
    }, effect: [
        {name: 'hordeToothGain', type: 'base', value: lvl => lvl * 0.01},
        {name: 'hordeToothGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
}
