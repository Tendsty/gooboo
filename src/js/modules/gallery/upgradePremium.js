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
    prettyRed: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_redDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 750};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryRedDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyOrange: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_orangeDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1050};
    }, effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryOrangeDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyYellow: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_yellowDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 1400};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryYellowDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryYellowDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyGreen: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_greenDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 2000};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryGreenDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryGreenDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyBlue: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_blueDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 2875};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryBlueDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryBlueDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyPurple: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_purpleDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 3900};
    }, effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryPurpleDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryPurpleDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    'prettyDeep-orange': {type: 'premium', cap: 1, requirement() {
        return store.state.stat['gallery_deep-orangeDrum'].total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 5200};
    }, effect: [
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryDeep-orangeDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryDeep-orangeDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    prettyAmber: {type: 'premium', cap: 1, requirement() {
        return store.state.stat.gallery_amberDrum.total > 0;
    }, price(lvl) {
        return {gem_ruby: Math.pow(2, lvl) * 6750};
    }, effect: [
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'galleryAmberDrumChance', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyGalleryAmberDrumCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
}
