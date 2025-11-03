export default {
    // mining
    dust: {icon: 'mdi-weather-dust', color: 'brown', effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.45, lvl)},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.65, lvl)},
    ]},
    clay: {icon: 'mdi-ellipse', color: 'pale-orange', effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.6, lvl)},
    ]},
    heat: {icon: 'mdi-scent', color: 'red', effect: [
        {name: 'miningSmelteryTime', type: 'mult', value: lvl => Math.pow(1 / 1.35, lvl)},
        {name: 'currencyMiningEmberCap', type: 'base', value: lvl => lvl * 130},
    ]},

    // village
    wood: {icon: 'mdi-tree', color: 'wooden', effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 32},
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
    ]},
    flow: {icon: 'mdi-waterfall', color: 'light-blue', effect: [
        {name: 'villageMaterialGain', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
    ]},
    stone: {icon: 'mdi-chart-bubble', color: 'dark-grey', effect: [
        {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
    ]},

    // horde
    spike: {icon: 'mdi-nail', color: 'pale-red', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
    ]},
    dream: {icon: 'mdi-sleep', color: 'pale-light-blue', effect: [
        {name: 'hordeHeirloomEffect', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'hordeNostalgia', type: 'base', value: lvl => lvl * 100},
    ]},
    clover: {icon: 'mdi-clover', color: 'light-green', effect: [
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => Math.pow(1.85, lvl)},
    ]},

    // farm
    rain: {icon: 'mdi-weather-pouring', color: 'dark-blue', effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 300},
    ]},
    sun: {icon: 'mdi-white-balance-sunny', color: 'yellow', effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'farmGoldChance', type: 'mult', value: lvl => lvl * 0.05 + 1},
    ]},
    cloud: {icon: 'mdi-clouds', color: 'blue-grey', effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
    ]},

    // gallery
    blossom: {icon: 'mdi-image-filter-vintage', color: 'purple', effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(2.25, lvl)},
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => Math.pow(1.6, lvl)},
    ]},
    leaf: {icon: 'mdi-leaf', color: 'pale-green', effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'currencyGalleryMotivationCap', type: 'base', value: lvl => lvl * 30},
    ]},
    paper: {icon: 'mdi-note', color: 'pale-yellow', effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl * 2},
        {name: 'galleryCanvasSize', type: 'base', value: lvl => lvl * 2},
    ]},

    // other
    book: {icon: 'mdi-book', color: 'beige', effect: [
        {name: 'schoolBook', type: 'base', value: lvl => lvl * 2},
        {name: 'currencySchoolGoldenDustCap', type: 'base', value: lvl => lvl * 2500},
    ]},
    coin: {icon: 'mdi-circle-multiple', color: 'amber', effect: [
        {name: 'currencyTreasureFragmentGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'treasureSlots', type: 'base', value: lvl => lvl},
    ]},
    card: {icon: 'mdi-cards-playing-spade', color: 'pale-blue', effect: [
        {name: 'cardShinyChance', type: 'base', value: lvl => lvl * 0.002},
    ]},
}
