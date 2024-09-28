import store from "../../../store";
import { getSequence } from "../../utils/math";

export default {
    biggerVegetables: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 80};
    }, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
    ]},
    biggerBerries: {type: 'premium', requirement() {
        return store.state.upgrade.item.farm_seedBox.level >= 1;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 80};
    }, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
    ]},
    biggerGrain: {type: 'premium', requirement() {
        return store.state.upgrade.item.farm_seedBox.level >= 2;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 80};
    }, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
    ]},
    biggerFlowers: {type: 'premium', requirement() {
        return store.state.upgrade.item.farm_seedBox.level >= 3;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 80};
    }, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
    ]},
    moreExperience: {type: 'premium', requirement() {
        return store.state.unlock.farmCropExp.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 120};
    }, effect: [
        {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.25}
    ]},
    premiumGardenGnome: {type: 'premium', hasDescription: true, cap: 5, hideCap: true, requirement(lvl) {
        return store.state.upgrade.item.farm_gardenGnome.level >= (lvl + 1);
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 180};
    }, effect: [
        {name: 'gardenGnome', type: 'farmBuildingPremium', value: lvl => lvl}
    ]},
    premiumSprinkler: {type: 'premium', hasDescription: true, cap: 2, hideCap: true, requirement(lvl) {
        return store.state.upgrade.item.farm_sprinkler.level >= (lvl + 1);
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 500};
    }, effect: [
        {name: 'sprinkler', type: 'farmBuildingPremium', value: lvl => lvl}
    ]},
    premiumLectern: {type: 'premium', hasDescription: true, cap: 2, hideCap: true, requirement(lvl) {
        return store.state.upgrade.item.farm_lectern.level >= (lvl + 1);
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 675};
    }, effect: [
        {name: 'lectern', type: 'farmBuildingPremium', value: lvl => lvl}
    ]},
    premiumPinwheel: {type: 'premium', hasDescription: true, cap: 1, hideCap: true, requirement(lvl) {
        return store.state.upgrade.item.farm_pinwheel.level >= (lvl + 1);
    }, price(lvl) {
        return {gem_ruby: Math.pow(3, lvl) * 1200};
    }, effect: [
        {name: 'pinwheel', type: 'farmBuildingPremium', value: lvl => lvl}
    ]},
    premiumFlag: {type: 'premium', hasDescription: true, cap: 1, hideCap: true, requirement(lvl) {
        return store.state.upgrade.item.farm_flag.level >= (lvl + 1);
    }, price(lvl) {
        return {gem_ruby: Math.pow(4, lvl) * 2100};
    }, effect: [
        {name: 'flag', type: 'farmBuildingPremium', value: lvl => lvl}
    ]}
}
