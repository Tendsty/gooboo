import { getSequence } from "../../utils/math";

export default {
    // Tier 1
    makeItPretty: {tier: 1, owned: true, icon: 'mdi-image', color: 'deep-purple', effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => lvl * 0.4 + getSequence(1, lvl) * 0.1 + 1},
    ]},
    stompBerries: {tier: 1, owned: true, icon: 'mdi-fruit-grapes', color: 'red', effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryRedConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    carvePumpkins: {tier: 1, icon: 'mdi-halloween', color: 'orange', effect: [
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryOrangeConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryRedGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    sortWaste: {tier: 1, icon: 'mdi-delete-variant', color: 'pale-light-green', effect: [
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.25 + 1},
    ]},
    advertise: {tier: 1, icon: 'mdi-cash', color: 'green', effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    beImpatient: {tier: 1, icon: 'mdi-run-fast', color: 'light-blue', effect: [
        {name: 'currencyGalleryPackageGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyGalleryPackageCap', type: 'mult', value: lvl => lvl + 1},
    ]},
    beExcited: {tier: 1, icon: 'mdi-emoticon-excited', color: 'pink-purple', effect: [
        {name: 'currencyGalleryMotivationGain', type: 'base', value: lvl => lvl * 0.02},
        {name: 'currencyGalleryMotivationCap', type: 'base', value: lvl => lvl * 35},
    ]},

    // Tier 2
    makeLemonade: {tier: 2, icon: 'mdi-fruit-citrus', color: 'yellow', effect: [
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryYellowConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryOrangeGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    growATree: {tier: 2, icon: 'mdi-tree', color: 'green', effect: [
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryGreenConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryYellowGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    buildComposter: {tier: 2, icon: 'mdi-archive-sync', color: 'brown', effect: [
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => lvl * 0.5 + 1},
    ]},
    observeRainbow: {tier: 2, icon: 'mdi-looks', color: 'babypink', effect: [
        {name: 'galleryColorGain', type: 'mult', value: lvl => lvl * 0.12 + 1},
    ]},
    buildRedReservoir: {tier: 2, icon: 'mdi-hoop-house', color: 'red', effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
    orderMassiveSafe: {tier: 2, icon: 'mdi-safe-square', color: 'dark-grey', effect: [
        {name: 'galleryColorDrumCap', type: 'base', value: lvl => lvl * 3},
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => 1 - (lvl / (lvl + 10))},
    ]},
    buyPen: {tier: 2, icon: 'mdi-pen', color: 'indigo', effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => lvl * 0.12 + 1},
    ]},

    // Tier 3
    drawOcean: {tier: 3, icon: 'mdi-waves', color: 'blue', effect: [
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryBlueConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryGreenGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    makeWine: {tier: 3, icon: 'mdi-bottle-wine', color: 'purple', effect: [
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryPurpleConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryBlueGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    calculateOdds: {tier: 3, icon: 'mdi-strategy', color: 'indigo', effect: [
        {name: 'galleryColorDrumChance', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
    buildOrangeReservoir: {tier: 3, icon: 'mdi-hoop-house', color: 'orange', effect: [
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
    thinkHarder: {tier: 3, icon: 'mdi-head-lightbulb', color: 'amber', effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl * 2},
    ]},
    paintFaster: {tier: 3, icon: 'mdi-brush', color: 'orange-red', effect: [
        {name: 'galleryCanvasSpeed', type: 'mult', value: lvl => lvl * 0.25 + 1},
    ]},
    buyBrush: {tier: 3, icon: 'mdi-brush-variant', color: 'beige', effect: [
        {name: 'gallerySpecialShapeChance', type: 'base', value: lvl => lvl * 0.002},
        {name: 'gallerySpecialShapeMult', type: 'base', value: lvl => lvl * 1.5},
    ]},

    // Tier 4
    harvestOranges: {tier: 4, icon: 'mdi-fruit-citrus', color: 'deep-orange', effect: [
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryDeep-orangeConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryPurpleGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    pulverizeGold: {tier: 4, icon: 'mdi-shimmer', color: 'amber', effect: [
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryAmberConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryDeep-orangeGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    buildYellowReservoir: {tier: 4, icon: 'mdi-hoop-house', color: 'yellow', effect: [
        {name: 'currencyGalleryYellowDrumCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
    paintForFun: {tier: 4, icon: 'mdi-emoticon-happy', color: 'pink', effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(4, lvl)},
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => Math.pow(0.5, lvl)},
    ]},
    printNewspaper: {tier: 4, icon: 'mdi-newspaper', color: 'light-grey', effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => getSequence(2, lvl) * 0.25 + 1},
    ]},
    expandCanvas: {tier: 4, icon: 'mdi-artboard', color: 'wooden', effect: [
        {name: 'galleryCanvasSize', type: 'base', value: lvl => lvl * 3},
    ]},
    hyperfocus: {tier: 4, icon: 'mdi-image-filter-center-focus-strong-outline', color: 'red-pink', effect: [
        {name: 'currencyGalleryMotivationGain', type: 'base', value: lvl => lvl * 0.08},
        {name: 'currencyGalleryCircleGain', type: 'mult', value: lvl => lvl * 0.24 + 1},
    ]},

    // Tier 5
    cutGrass: {tier: 5, icon: 'mdi-grass', color: 'light-green', effect: [
        {name: 'currencyGalleryLight-greenGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryLight-greenConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryAmberGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    shapeClay: {tier: 5, icon: 'mdi-pot', color: 'teal', effect: [
        {name: 'currencyGalleryTealGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryTealConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryLight-greenGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    buildGreenReservoir: {tier: 5, icon: 'mdi-hoop-house', color: 'green', effect: [
        {name: 'currencyGalleryGreenDrumCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
    beMysterious: {tier: 5, icon: 'mdi-wizard-hat', color: 'pale-purple', effect: [
        {name: 'currencyGalleryMysteryShapeGain', type: 'base', value: lvl => lvl},
    ]},

    // Tier 6
    lookAtTheSky: {tier: 6, icon: 'mdi-clouds', color: 'light-blue', effect: [
        {name: 'currencyGalleryLight-blueGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryLight-blueConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryTealGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    chewBubblegum: {tier: 6, icon: 'mdi-dots-circle', color: 'pink', effect: [
        {name: 'currencyGalleryPinkGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'galleryPinkConversion', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryLight-blueGain', type: 'mult', value: lvl => Math.pow(0.5, lvl / 2)},
    ]},
    buildBlueReservoir: {tier: 6, icon: 'mdi-hoop-house', color: 'blue', effect: [
        {name: 'currencyGalleryBlueDrumCap', type: 'mult', value: lvl => lvl * 0.4 + 1},
    ]},
}
