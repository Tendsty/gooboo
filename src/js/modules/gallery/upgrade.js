import store from "../../../store";
import { buildNum } from "../../utils/format";
import { splicedPowLinear } from "../../utils/math";

export default {
    newStyle: {cap: 10, note: 'gallery_1', price(lvl) {
        return {gallery_beauty: Math.pow(2.1 + 0.05 * lvl, lvl) * 15};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'base', value: lvl => Math.pow(2, lvl) - 1}
    ]},
    recycling: {cap: 1, hasDescription: true, note: 'gallery_2', price() {
        return {gallery_beauty: 2000};
    }, effect: [
        {name: 'galleryConversion', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    redPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_red.total > 0;
    }, price(lvl) {
        return {gallery_red: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    redConversion: {cap: 10, note: 'gallery_3', requirement() {
        return store.state.stat.gallery_red.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(5, lvl) * buildNum(20, 'K')};
    }, effect: [
        {name: 'galleryRedConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    filters: {note: 'gallery_4', requirement() {
        return store.state.stat.gallery_red.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(4.8, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},

    orangePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_orange: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    redLuck: {cap: 40, hasDescription: true, requirement() {
        return store.state.stat.gallery_orange.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_orange: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryRedDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    epiphany: {note: 'gallery_5', cap: 1, hasDescription: true, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price() {
        return {gallery_beauty: buildNum(17.5, 'M')};
    }, effect: [
        {name: 'galleryInspiration', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    trashCan: {note: 'gallery_6', requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(15, lvl) * buildNum(350, 'M')};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => Math.pow(1.9, lvl)}
    ]},
    orangeConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(10, lvl) * buildNum(500, 'M')};
    }, effect: [
        {name: 'galleryOrangeConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    brush: {note: 'gallery_7', requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(8 + lvl * 0.5, lvl) * buildNum(7, 'B')};
    }, effect: [
        {name: 'galleryColorGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    auctionHouse: {persistent: true, cap: 1, hasDescription: true, note: 'gallery_8', requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price() {
        return {gallery_beauty: buildNum(1, 'T')};
    }, effect: [
        {name: 'galleryAuction', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    yellowPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_yellow: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    orangeLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_yellow.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_yellow: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryOrangeDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    yellowConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(15, lvl) * buildNum(12, 'T')};
    }, effect: [
        {name: 'galleryYellowConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    paintDrumStorage: {note: 'gallery_9', cap: 1, hasDescription: true, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price() {
        return {gallery_beauty: buildNum(250, 'T')};
    }, effect: [
        {name: 'galleryDrums', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    greenPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_green: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    yellowLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_green: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryYellowDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    greenConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(20, lvl) * buildNum(1.35, 'Qi')};
    }, effect: [
        {name: 'galleryGreenConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    redRage: {cap: 40, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_red: Math.pow(2.75 + 0.1 * lvl, lvl) * buildNum(100, 'T')};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryRedDrumCap', type: 'base', value: lvl => lvl * 2}
    ]},

    bluePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_blue: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    greenLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_blue.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_blue: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryGreenDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    blueConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(25, lvl) * buildNum(35, 'Sx')};
    }, effect: [
        {name: 'galleryBlueConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    purplePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_purple: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    blueLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_purple.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_purple: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryBlueDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    purpleConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(30, lvl) * buildNum(9.4, 'N')};
    }, effect: [
        {name: 'galleryPurpleConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    deepOrangePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price(lvl) {
        return {'gallery_deep-orange': Math.pow(2.5, lvl) * 4};
    }, effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    purpleLuck: {cap: 40, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {'gallery_deep-orange': Math.pow(3 + 0.1 * lvl, lvl) * buildNum(3, 'M')};
    }, effect: [
        {name: 'galleryPurpleDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    deepOrangeConversion: {cap: 10, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(35, lvl) * buildNum(11, 'UD')};
    }, effect: [
        {name: 'galleryDeep-orangeConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    emptyCanvas: {cap: 1, hasDescription: true, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price() {
        return {gallery_beauty: buildNum(40, 'UD'), 'gallery_deep-orange': 10};
    }, effect: [
        {name: 'galleryCanvas', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    linen: {requirement() {
        return store.state.unlock.galleryCanvas.use;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(1000, lvl) * buildNum(1, 'DD')};
    }, effect: [
        {name: 'galleryCanvasSize', type: 'base', value: lvl => lvl}
    ]},

    amberPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_amber.total > 0;
    }, price(lvl) {
        return {gallery_amber: Math.pow(2.5, lvl) * 8};
    }, effect: [
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    deepOrangeLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_amber.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_amber: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(9, 'M')};
    }, effect: [
        {name: 'galleryDeep-orangeDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    amberConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_amber.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(50, lvl) * buildNum(555, 'QiD')};
    }, effect: [
        {name: 'galleryAmberConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    lightGreenPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat['gallery_light-green'].total > 0;
    }, price(lvl) {
        return {'gallery_light-green': Math.pow(2.5, lvl) * 16};
    }, effect: [
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    amberLuck: {cap: 40, requirement() {
        return store.state.stat['gallery_light-green'].total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {'gallery_light-green': Math.pow(3 + 0.1 * lvl, lvl) * buildNum(27, 'M')};
    }, effect: [
        {name: 'galleryAmberDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    lightGreenConversion: {cap: 10, requirement() {
        return store.state.stat['gallery_light-green'].total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(60, lvl) * buildNum(90, 'ND')};
    }, effect: [
        {name: 'galleryLight-greenConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    tealPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_teal.total > 0;
    }, price(lvl) {
        return {gallery_teal: Math.pow(2.5, lvl) * 32};
    }, effect: [
        {name: 'currencyGalleryLight-greenGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    lightGreenLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_teal.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_teal: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(81, 'M')};
    }, effect: [
        {name: 'galleryLight-greenDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    tealConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_teal.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(80, lvl) * buildNum(750, 'DV')};
    }, effect: [
        {name: 'galleryTealConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    lightBluePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat['gallery_light-blue'].total > 0;
    }, price(lvl) {
        return {'gallery_light-blue': Math.pow(2.5, lvl) * 64};
    }, effect: [
        {name: 'currencyGalleryTealGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    tealLuck: {cap: 40, requirement() {
        return store.state.stat['gallery_light-blue'].total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {'gallery_light-blue': Math.pow(3 + 0.1 * lvl, lvl) * buildNum(243, 'M')};
    }, effect: [
        {name: 'galleryTealDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    lightBlueConversion: {cap: 10, requirement() {
        return store.state.stat['gallery_light-blue'].total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(100, lvl) * buildNum(38, 'SxV')};
    }, effect: [
        {name: 'galleryLight-blueConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    pinkPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_pink.total > 0;
    }, price(lvl) {
        return {gallery_pink: Math.pow(2.5, lvl) * 128};
    }, effect: [
        {name: 'currencyGalleryLight-blueGain', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.1, 15, lvl)}
    ]},
    lightBlueLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_pink.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_pink: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(729, 'M')};
    }, effect: [
        {name: 'galleryLight-blueDrumChance', type: 'base', value: lvl => lvl * 0.02}
    ]},
    pinkConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_pink.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(125, lvl) * buildNum(5, 'Tg')};
    }, effect: [
        {name: 'galleryPinkConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
}
