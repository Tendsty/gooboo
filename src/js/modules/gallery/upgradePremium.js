import store from "../../../store";
import { getSequence } from "../../utils/math";

export default {
    prettyColors: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 100};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    prettyConverter: {type: 'premium', requirement() {
        return store.state.unlock.galleryConversion.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 150};
    }, effect: [
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.25 + 1},
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => getSequence(2, lvl) * 0.25 + 1}
    ]},
    prettyCash: {type: 'premium', requirement() {
        return store.state.unlock.galleryAuction.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 180};
    }, effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    prettyShapes: {type: 'premium', requirement() {
        return store.state.unlock.galleryShape.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 225};
    }, effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
    ]},
    prettyCanvas: {type: 'premium', requirement() {
        return store.state.unlock.galleryCanvas.see;
    }, price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 320};
    }, effect: [
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => getSequence(2, lvl) * 0.1 + 1}
    ]},
    prettyRed: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_redDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 750};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryRedDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyOrange: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_orangeDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 1050};
    }, effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryOrangeDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyYellow: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_yellowDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 1400};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryYellowDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryYellowDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyGreen: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_greenDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 1800};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryGreenDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryGreenDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyBlue: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_blueDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 2200};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryBlueDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryBlueDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyPurple: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_purpleDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 2600};
    }, effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryPurpleDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryPurpleDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    'prettyDeep-orange': {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat['gallery_deep-orangeDrum'].total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 3000};
    }, effect: [
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryDeep-orangeDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryDeep-orangeDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyAmber: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_amberDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 3500};
    }, effect: [
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryAmberDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryAmberDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    'prettyLight-green': {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat['gallery_light-greenDrum'].total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 4000};
    }, effect: [
        {name: 'currencyGalleryLight-greenGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryLight-greenDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryLight-greenDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyTeal: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_tealDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 4500};
    }, effect: [
        {name: 'currencyGalleryTealGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryTealDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryTealDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    'prettyLight-blue': {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat['gallery_light-blueDrum'].total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 5000};
    }, effect: [
        {name: 'currencyGalleryLight-blueGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryLight-blueDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryLight-blueDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyPink: {type: 'premium', cap: 1, capMult: true, subtype: 'premiumColor', requirement() {
        return store.state.stat.gallery_pinkDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(10, lvl) * 5500};
    }, effect: [
        {name: 'currencyGalleryPinkGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryPinkDrumChance', type: 'mult', value: lvl => lvl >= 1 ? 1.25 : null},
        {name: 'currencyGalleryPinkDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
}
