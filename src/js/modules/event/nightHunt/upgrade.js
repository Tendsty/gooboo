import store from "../../../../store";
import { buildNum } from "../../../utils/format";
import { getSequence } from "../../../utils/math";

export default {
    essenceCondenser: {type: 'nightHunt', price(lvl) {
        return {event_essence: Math.pow(8 + 0.25 * lvl, lvl) * 200};
    }, effect: [
        {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},
    luckyCharm: {type: 'nightHunt', price(lvl) {
        return {event_essence: Math.pow(1.5 + 0.02 * lvl, lvl) * 1000};
    }, effect: [
        {name: 'nightHuntRitualSuccessChance', type: 'base', value: lvl => lvl * 0.03}
    ]},
    biggerCauldron: {type: 'nightHunt', cap: 5, price(lvl) {
        return {event_essence: Math.pow(buildNum(100, 'M'), getSequence(1, lvl)) * buildNum(10, 'K')};
    }, effect: [
        {name: 'nightHuntMaxIngredients', type: 'base', value: lvl => lvl}
    ]},
    potionShelf: {type: 'nightHunt', cap: 8, requirement() {
        return store.state.upgrade.item.event_biggerCauldron.level > 0;
    }, price(lvl) {
        return {event_essence: Math.pow(1000 * Math.pow(10, lvl), lvl) * buildNum(100, 'K')};
    }, effect: [
        {name: 'nightHuntFindableIngredients', type: 'base', value: lvl => lvl},
        {name: 'nightHuntFavouriteIngredientSize', type: 'base', value: lvl => lvl},
    ]},
    ritualChalk: {type: 'nightHunt', cap: 3, requirement() {
        return store.state.upgrade.item.event_biggerCauldron.level > 0;
    }, price(lvl) {
        return {event_essence: Math.pow(buildNum(10, 'M'), Math.pow(lvl, 2)) * buildNum(50, 'M')};
    }, effect: [
        {name: 'nightHuntBonusIngredientCount', type: 'base', value: lvl => lvl}
    ]},
    stabilizer: {type: 'nightHunt', requirement() {
        return store.state.upgrade.item.event_ritualChalk.level > 0;
    }, price(lvl) {
        return {event_essence: Math.pow(1.75 + 0.03 * lvl, lvl) * buildNum(300, 'M')};
    }, effect: [
        {name: 'nightHuntRitualStability', type: 'base', value: lvl => lvl * 0.02}
    ]},
    pedestals: {type: 'nightHunt', requirement() {
        return store.state.upgrade.item.event_ritualChalk.level > 0;
    }, price(lvl) {
        return {event_essence: Math.pow(120, lvl) * buildNum(7.5, 'B')};
    }, effect: [
        {name: 'nightHuntBonusIngredientAmount', type: 'base', value: lvl => lvl}
    ]},

    // topaz upgrades
    mystifier: {type: 'nightHunt', price(lvl) {
        return {gem_topaz: lvl * 125 + 100};
    }, effect: [
        {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => Math.pow(3, lvl)}
    ]},
    bundle: {type: 'nightHunt', price(lvl) {
        return {gem_topaz: lvl * 250 + 350};
    }, effect: [
        {name: 'nightHuntIngredientSize', type: 'base', value: lvl => lvl * 3},
        {name: 'nightHuntFavouriteIngredientSize', type: 'base', value: lvl => lvl},
    ]},
    bagOfCandy: {type: 'nightHunt', requirement() {
        return store.state.upgrade.item.event_ritualChalk.level > 0;
    }, price(lvl) {
        return {gem_topaz: lvl * 200 + 200};
    }, effect: [
        {name: 'nightHuntBonusIngredientAmount', type: 'base', value: lvl => lvl}
    ]},
}
