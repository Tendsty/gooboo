import store from "../../../store";
import { fallbackArray } from "../../utils/array";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    artAcademy: {type: 'prestige', price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.01 + 1.65, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)}
    ]},
    redCrayon: {type: 'prestige', cap: 15, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * 8};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    rainbowJar: {type: 'prestige', cap: 11, price(lvl) {
        return {gallery_cash: fallbackArray([10, 100], Math.pow(1000, lvl - 1) * 10, lvl)};
    }, effect: [
        {name: 'carvePumpkins', type: 'galleryIdea', value: lvl => lvl >= 1},
        {name: 'makeLemonade', type: 'galleryIdea', value: lvl => lvl >= 2},
        {name: 'growATree', type: 'galleryIdea', value: lvl => lvl >= 3},
        {name: 'drawOcean', type: 'galleryIdea', value: lvl => lvl >= 4},
        {name: 'makeWine', type: 'galleryIdea', value: lvl => lvl >= 5},
        {name: 'harvestOranges', type: 'galleryIdea', value: lvl => lvl >= 6},
        {name: 'pulverizeGold', type: 'galleryIdea', value: lvl => lvl >= 7},
        {name: 'cutGrass', type: 'galleryIdea', value: lvl => lvl >= 8},
        {name: 'shapeClay', type: 'galleryIdea', value: lvl => lvl >= 9},
        {name: 'lookAtTheSky', type: 'galleryIdea', value: lvl => lvl >= 10},
        {name: 'chewBubblegum', type: 'galleryIdea', value: lvl => lvl >= 11},
    ]},
    trashContainer: {type: 'prestige', cap: 8, price(lvl) {
        return {gallery_cash: Math.pow(2, lvl) * 25};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'base', value: lvl => lvl * 500}
    ]},
    orangeCrayon: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * 30};
    }, effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    shapes: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(3 + lvl, lvl) * 150};
    }, effect: [
        {name: 'galleryShape', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'rectangle', type: 'galleryShape', value: lvl => lvl >= 2},
        {name: 'triangle', type: 'galleryShape', value: lvl => lvl >= 3},
        {name: 'star', type: 'galleryShape', value: lvl => lvl >= 4},
        {name: 'ellipse', type: 'galleryShape', value: lvl => lvl >= 5},
        {name: 'heart', type: 'galleryShape', value: lvl => lvl >= 6},
        {name: 'square', type: 'galleryShape', value: lvl => lvl >= 7},
        {name: 'octagon', type: 'galleryShape', value: lvl => lvl >= 8},
        {name: 'pentagon', type: 'galleryShape', value: lvl => lvl >= 9},
        {name: 'hexagon', type: 'galleryShape', value: lvl => lvl >= 10},
    ]},
    forklift: {type: 'prestige', cap: 9, requirement() {
        return store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(3, lvl) * 150};
    }, effect: [
        {name: 'currencyGalleryPackageCap', type: 'base', value: lvl => lvl * 10}
    ]},
    redCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * 360};
    }, effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    yellowCrayon: {type: 'prestige', cap: 25, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * 725};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    inspiringBooks: {type: 'prestige', requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2 + 0.25 * lvl, lvl) * 1400};
    }, effect: [
        {name: 'galleryInspirationBase', type: 'mult', value: lvl => Math.pow(0.8, lvl)},
        {name: 'galleryInspirationIncrement', type: 'mult', value: lvl => Math.pow(0.95, lvl)}
    ]},
    expressDelivery: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.25 * lvl, lvl) * 3000};
    }, effect: [
        {name: 'currencyGalleryPackageGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    orangeCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * buildNum(13.5, 'K')};
    }, effect: [
        {name: 'currencyGalleryOrangeDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    biggerShapes: {type: 'prestige', requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryShape.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.05 + 1.75, lvl) * buildNum(35.5, 'K')};
    }, effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(1.45, lvl)}
    ]},
    greenCrayon: {type: 'prestige', cap: 30, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(110, 'K')};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    sortingSystem: {type: 'prestige', cap: 15, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.2, lvl) * buildNum(275, 'K')};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyGalleryPackageCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    redTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(880, 'K')};
    }, effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    yellowCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_blue.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * buildNum(2.4, 'M')};
    }, effect: [
        {name: 'currencyGalleryYellowDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    blueCrayon: {type: 'prestige', cap: 35, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(130, 'M')};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    orangeTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(550, 'M')};
    }, effect: [
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    greenCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_purple.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * buildNum(2.3, 'B')};
    }, effect: [
        {name: 'currencyGalleryGreenDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    investment: {type: 'prestige', requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(1.75 + 0.08 * lvl, lvl) * buildNum(12, 'B')};
    }, effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    purpleCrayon: {type: 'prestige', cap: 40, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(140, 'B')};
    }, effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    yellowTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(790, 'B')};
    }, effect: [
        {name: 'currencyGalleryYellowDrumCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    blueCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * buildNum(3.75, 'T')};
    }, effect: [
        {name: 'currencyGalleryBlueDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    artClass: {type: 'prestige', requirement() {
        return store.state.unlock.galleryCanvas.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(1.5 + 0.1 * lvl, lvl) * buildNum(40, 'T')};
    }, effect: [
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    preparation: {type: 'prestige', requirement() {
        return store.state.unlock.galleryCanvas.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5, getSequence(1, lvl)) * buildNum(500, 'T')};
    }, effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl},
        {name: 'galleryCanvasSize', type: 'base', value: lvl => lvl}
    ]},
    deepOrangeCrayon: {type: 'prestige', cap: 45, requirement() {
        return store.state.stat.gallery_amber.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(6.25, 'Qa')};
    }, effect: [
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    greenTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat.gallery_amber.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(70, 'Qa')};
    }, effect: [
        {name: 'currencyGalleryGreenDrumCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    purpleCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_amber.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.2 * lvl, lvl) * buildNum(420, 'Qa')};
    }, effect: [
        {name: 'currencyGalleryPurpleDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    amberCrayon: {type: 'prestige', cap: 50, requirement() {
        return store.state.stat['gallery_light-green'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(2, 'Qi')};
    }, effect: [
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    truckConvoy: {type: 'prestige', requirement() {
        return store.state.stat['gallery_light-green'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(1.2 + 0.1 * lvl, lvl) * buildNum(750, 'Qa')};
    }, effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => Math.min(lvl * 0.1 + 1, 3)},
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => lvl > 5 ? Math.min((lvl - 5) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryYellowDrumCap', type: 'mult', value: lvl => lvl > 10 ? Math.min((lvl - 10) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryGreenDrumCap', type: 'mult', value: lvl => lvl > 15 ? Math.min((lvl - 15) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryBlueDrumCap', type: 'mult', value: lvl => lvl > 20 ? Math.min((lvl - 20) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryPurpleDrumCap', type: 'mult', value: lvl => lvl > 25 ? Math.min((lvl - 25) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryDeep-orangeDrumCap', type: 'mult', value: lvl => lvl > 30 ? Math.min((lvl - 30) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryAmberDrumCap', type: 'mult', value: lvl => lvl > 35 ? Math.min((lvl - 35) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryLight-greenDrumCap', type: 'mult', value: lvl => lvl > 40 ? Math.min((lvl - 40) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryTealDrumCap', type: 'mult', value: lvl => lvl > 45 ? Math.min((lvl - 45) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryLight-blueDrumCap', type: 'mult', value: lvl => lvl > 50 ? Math.min((lvl - 50) * 0.1 + 1, 3) : null},
        {name: 'currencyGalleryPinkDrumCap', type: 'mult', value: lvl => lvl > 55 ? Math.min((lvl - 55) * 0.1 + 1, 3) : null},
    ]},
    lightGreenCrayon: {type: 'prestige', cap: 55, requirement() {
        return store.state.stat.gallery_teal.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(2, 'Sx')};
    }, effect: [
        {name: 'currencyGalleryLight-greenGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    tealCrayon: {type: 'prestige', cap: 60, requirement() {
        return store.state.stat['gallery_light-blue'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(2, 'Sp')};
    }, effect: [
        {name: 'currencyGalleryTealGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    lightBlueCrayon: {type: 'prestige', cap: 65, requirement() {
        return store.state.stat.gallery_pink.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(2, 'O')};
    }, effect: [
        {name: 'currencyGalleryLight-blueGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    pinkCrayon: {type: 'prestige', cap: 70, requirement() {
        return store.state.stat.gallery_brown.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.02 + 1.5, lvl) * buildNum(2, 'N')};
    }, effect: [
        {name: 'currencyGalleryPinkGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
}
