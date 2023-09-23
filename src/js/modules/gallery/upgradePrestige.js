import store from "../../../store";
import { buildNum } from "../../utils/format";

export default {
    artAcademy: {type: 'prestige', price(lvl) {
        return {gallery_cash: Math.pow(1.35, lvl) * 2};
    }, effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.6, lvl)}
    ]},
    redCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_orange.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * 8};
    }, effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    rainbowJar: {type: 'prestige', cap: 5, price(lvl) {
        return {gallery_cash: Math.pow(10, lvl) * 10};
    }, effect: [
        {name: 'carvePumpkins', type: 'galleryIdea', value: lvl => lvl >= 1},
        {name: 'makeLemonade', type: 'galleryIdea', value: lvl => lvl >= 2},
        {name: 'growATree', type: 'galleryIdea', value: lvl => lvl >= 3},
        {name: 'drawOcean', type: 'galleryIdea', value: lvl => lvl >= 4},
        {name: 'makeWine', type: 'galleryIdea', value: lvl => lvl >= 5},
    ]},
    trashContainer: {type: 'prestige', cap: 8, price(lvl) {
        return {gallery_cash: Math.pow(2, lvl) * 25};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'base', value: lvl => lvl * 500}
    ]},
    orangeCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * 30};
    }, effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    headstart: {type: 'prestige', requirement() {
        return store.state.stat.gallery_yellow.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2, lvl) * 60};
    }, effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl}
    ]},
    forklift: {type: 'prestige', cap: 9, requirement() {
        return store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(3, lvl) * 75};
    }, effect: [
        {name: 'currencyGalleryPackageCap', type: 'base', value: lvl => lvl * 5}
    ]},
    redCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.15, lvl) * 180};
    }, effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    yellowCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * 325};
    }, effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    inspiringBooks: {type: 'prestige', requirement() {
        return store.state.stat.gallery_green.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2, lvl) * 600};
    }, effect: [
        {name: 'galleryInspirationIncrement', type: 'mult', value: lvl => Math.pow(0.95, lvl)}
    ]},
    expressDelivery: {type: 'prestige', cap: 20, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.5 + 0.25 * lvl, lvl) * 700};
    }, effect: [
        {name: 'currencyGalleryPackageGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    orangeCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_green.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.15, lvl) * 4600};
    }, effect: [
        {name: 'currencyGalleryOrangeDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    greenCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * 9700};
    }, effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    sortingSystem: {type: 'prestige', cap: 15, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.2, lvl) * buildNum(15, 'K')};
    }, effect: [
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyGalleryPackageCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    redTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat.gallery_blue.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(28, 'K')};
    }, effect: [
        {name: 'galleryRedDrumChance', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    yellowCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_blue.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.15, lvl) * buildNum(40, 'K')};
    }, effect: [
        {name: 'currencyGalleryYellowDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    blueCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * buildNum(65, 'K')};
    }, effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
    orangeTruck: {type: 'prestige', cap: 5, requirement() {
        return store.state.stat.gallery_purple.total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(4 + 2 * lvl, lvl) * buildNum(110, 'K')};
    }, effect: [
        {name: 'galleryOrangeDrumChance', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    greenCrate: {type: 'prestige', cap: 9, requirement() {
        return store.state.stat.gallery_purple.total > 0 && store.state.unlock.galleryDrums.see;
    }, price(lvl) {
        return {gallery_cash: Math.pow(2.15, lvl) * buildNum(280, 'K')};
    }, effect: [
        {name: 'currencyGalleryGreenDrumCap', type: 'base', value: lvl => lvl * 10}
    ]},
    purpleCrayon: {type: 'prestige', cap: 10, requirement() {
        return store.state.stat['gallery_deep-orange'].total > 0;
    }, price(lvl) {
        return {gallery_cash: Math.pow(lvl * 0.15 + 1.75, lvl) * buildNum(720, 'K')};
    }, effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)}
    ]},
}
