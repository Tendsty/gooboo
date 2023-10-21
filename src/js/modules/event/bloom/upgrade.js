import store from "../../../../store";
import { buildNum } from "../../../utils/format";

export default {
    colorfulSeedBag: {type: 'bloom', cap: 5, hideCap: true, price(lvl) {
        return {event_blossom: [buildNum(1, 'M'), buildNum(1, 'Qa'), buildNum(1, 'O'), buildNum(1, 'TD'), buildNum(1, 'ND')][lvl]};
    }, effect: [
        {name: 'bloomPoppyFlower', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'bloomIrisFlower', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'bloomLilyFlower', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'bloomOrchidFlower', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'bloomCornflowerFlower', type: 'unlock', value: lvl => lvl >= 5},
    ]},
    flowerPot: {type: 'bloom', price(lvl) {
        return {event_blossom: Math.pow(10, lvl) * 100};
    }, effect: [
        {name: 'bloomInventorySize', type: 'base', value: lvl => lvl}
    ]},
    daisyProtection: {type: 'bloom', price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * 2500};
    }, effect: [
        {name: 'bloomDaisyChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    poppyProtection: {type: 'bloom', requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 1;
    }, price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * buildNum(12, 'M')};
    }, effect: [
        {name: 'bloomPoppyChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    poppyFertilizer: {type: 'bloom', cap: 15, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 1;
    }, price(lvl) {
        return {event_blossom: Math.pow(2, lvl) * buildNum(60, 'M')};
    }, effect: [
        {name: 'bloomPoppyBreedTime', type: 'base', value: lvl => lvl * -20}
    ]},
    irisProtection: {type: 'bloom', requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 2;
    }, price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * buildNum(18, 'T')};
    }, effect: [
        {name: 'bloomIrisChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    irisFertilizer: {type: 'bloom', cap: 20, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 2;
    }, price(lvl) {
        return {event_blossom: Math.pow(2.3, lvl) * buildNum(80, 'T')};
    }, effect: [
        {name: 'bloomIrisBreedTime', type: 'base', value: lvl => lvl * -60}
    ]},
    lilyProtection: {type: 'bloom', requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 3;
    }, price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * buildNum(25, 'Sx')};
    }, effect: [
        {name: 'bloomLilyChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    lilyFertilizer: {type: 'bloom', cap: 30, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 3;
    }, price(lvl) {
        return {event_blossom: Math.pow(2.2, lvl) * buildNum(130, 'Sx')};
    }, effect: [
        {name: 'bloomLilyBreedTime', type: 'base', value: lvl => lvl * -120}
    ]},
    orchidProtection: {type: 'bloom', requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 4;
    }, price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * buildNum(35, 'D')};
    }, effect: [
        {name: 'bloomOrchidChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    orchidFertilizer: {type: 'bloom', cap: 40, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 4;
    }, price(lvl) {
        return {event_blossom: Math.pow(2.15, lvl) * buildNum(175, 'D')};
    }, effect: [
        {name: 'bloomOrchidBreedTime', type: 'base', value: lvl => lvl * -240}
    ]},
    cornflowerProtection: {type: 'bloom', requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 5;
    }, price(lvl) {
        return {event_blossom: Math.pow(lvl * 0.05 + 1.3, lvl) * buildNum(50, 'QiD')};
    }, effect: [
        {name: 'bloomCornflowerChance', type: 'base', value: lvl => lvl * 0.05}
    ]},
    cornflowerFertilizer: {type: 'bloom', cap: 40, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 5;
    }, price(lvl) {
        return {event_blossom: Math.pow(2.6, lvl) * buildNum(260, 'QiD')};
    }, effect: [
        {name: 'bloomCornflowerBreedTime', type: 'base', value: lvl => lvl * -480}
    ]},

    // topaz upgrades
    greenhouse: {type: 'bloom', cap: 3, price(lvl) {
        return {gem_topaz: lvl * 500 + 500};
    }, effect: [
        {name: 'bloomBreederSize', type: 'base', value: lvl => lvl}
    ]},
    hugeVase: {type: 'bloom', cap: 1, price() {
        return {gem_topaz: 1000};
    }, effect: [
        {name: 'bloomInventorySize', type: 'mult', value: lvl => lvl + 1}
    ]},
    framedDaisy: {type: 'bloom', cap: 1, price() {
        return {gem_topaz: 500};
    }, effect: [
        {name: 'bloomDaisyChance', type: 'base', value: lvl => lvl * 0.35},
        {name: 'bloomDaisyChance', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    framedPoppy: {type: 'bloom', cap: 1, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 1;
    }, price() {
        return {gem_topaz: 600};
    }, effect: [
        {name: 'bloomInventorySize', type: 'base', value: lvl => lvl * 8},
        {name: 'bloomPoppyChance', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    framedIris: {type: 'bloom', cap: 1, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 2;
    }, price() {
        return {gem_topaz: 700};
    }, effect: [
        {name: 'currencyEventBlossomGain', type: 'mult', value: lvl => lvl * 2 + 1},
        {name: 'bloomIrisChance', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    framedLily: {type: 'bloom', cap: 1, requirement() {
        return store.state.upgrade.item.event_colorfulSeedBag.level >= 3;
    }, price() {
        return {gem_topaz: 800};
    }, effect: [
        {name: 'bloomDaisyChance', type: 'base', value: lvl => lvl * 2},
        {name: 'bloomPoppyChance', type: 'base', value: lvl => lvl * 1.5},
        {name: 'bloomIrisChance', type: 'base', value: lvl => lvl},
        {name: 'bloomLilyChance', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
}
