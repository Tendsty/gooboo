import store from "../../../store";
import { buildNum } from "../../utils/format";
import { splicedPow } from "../../utils/math";

export default {
    newStyle: {cap: 10, note: 'gallery_1', price(lvl) {
        return {gallery_beauty: Math.pow(2.1 + 0.05 * lvl, lvl) * 15};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'base', value: lvl => Math.pow(2, lvl) - 1}
    ]},
    recycling: {cap: 1, note: 'gallery_2', price() {
        return {gallery_beauty: 2000};
    }, effect: [
        {name: 'galleryConversion', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    redPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_red.total > 0;
    }, price(lvl) {
        return {gallery_red: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
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
        return {gallery_beauty: Math.pow(10, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
    ]},

    orangePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_orange: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
    ]},
    redLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_orange.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_orange: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryRedDrumChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    epiphany: {note: 'gallery_5', cap: 1, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price() {
        return {gallery_beauty: buildNum(17.5, 'M')};
    }, effect: [
        {name: 'galleryInspiration', type: 'unlock', value: lvl => lvl >= 1}
    ]},
    trashCan: {note: 'gallery_6', requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(1000, lvl) * buildNum(350, 'M')};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
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
    auctionHouse: {persistent: true, cap: 1, note: 'gallery_8', requirement() {
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
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
    ]},
    orangeLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_yellow.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_yellow: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryOrangeDrumChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    yellowConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(15, lvl) * buildNum(60, 'T')};
    }, effect: [
        {name: 'galleryYellowConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    paintDrumStorage: {note: 'gallery_9', cap: 1, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price() {
        return {gallery_beauty: buildNum(1, 'Qa')};
    }, effect: [
        {name: 'galleryDrums', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    greenPower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_green: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
    ]},
    yellowLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_green: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryYellowDrumChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    greenConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(20, lvl) * buildNum(33.5, 'Qi')};
    }, effect: [
        {name: 'galleryGreenConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    redRage: {cap: 40, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_red: Math.pow(2.75 + 0.1 * lvl, lvl) * buildNum(1, 'T')};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyGalleryRedDrumCap', type: 'base', value: lvl => lvl * 2}
    ]},

    bluePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_blue: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
    ]},
    greenLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_blue.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_blue: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryGreenDrumChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    blueConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(25, lvl) * buildNum(7, 'Sp')};
    }, effect: [
        {name: 'galleryBlueConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},

    purplePower: {cap: 15, capMult: true, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_purple: Math.pow(2.5, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => splicedPow(1.25, 1.1, 15, lvl)}
    ]},
    blueLuck: {cap: 40, requirement() {
        return store.state.stat.gallery_purple.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_purple: Math.pow(3 + 0.1 * lvl, lvl) * buildNum(1, 'M')};
    }, effect: [
        {name: 'galleryBlueDrumChance', type: 'base', value: lvl => lvl * 0.01}
    ]},
    purpleConversion: {cap: 10, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_beauty: Math.pow(30, lvl) * buildNum(940, 'D')};
    }, effect: [
        {name: 'galleryPurpleConversion', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
}
