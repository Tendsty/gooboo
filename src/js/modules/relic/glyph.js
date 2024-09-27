export default {
    // mining
    dust: {icon: 'mdi-weather-dust', color: 'brown', effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    clay: {icon: 'mdi-ellipse', color: 'pale-orange', effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.16, lvl)}
    ]},
    fire: {icon: 'mdi-fire', color: 'orange-red', effect: [
        {name: 'miningSmelterySpeed', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyMiningEmberCap', type: 'base', value: lvl => lvl * 30}
    ]},

    // village
    wood: {icon: 'mdi-tree', color: 'wooden', effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 12},
        {name: 'villageArtisan', type: 'base', value: lvl => lvl}
    ]},
    flow: {icon: 'mdi-waterfall', color: 'light-blue', effect: [
        {name: 'villageMaterialGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
    ]},
    stone: {icon: 'mdi-chart-bubble', color: 'dark-grey', effect: [
        {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.09, lvl)}
    ]},

    // horde
    spike: {icon: 'mdi-nail', color: 'pale-red', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.12, lvl)},
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.12, lvl)}
    ]},
    dream: {icon: 'mdi-sleep', color: 'pale-light-blue', effect: [
        {name: 'hordeNostalgia', type: 'base', value: lvl => lvl * 15},
        {name: 'hordeHeirloomAmount', type: 'base', value: lvl => lvl}
    ]},
    clover: {icon: 'mdi-clover', color: 'light-green', effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => Math.pow(1.18, lvl)}
    ]},

    // farm
    rain: {icon: 'mdi-weather-pouring', color: 'dark-blue', effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 100}
    ]},
    sun: {icon: 'mdi-white-balance-sunny', color: 'yellow', effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'farmGoldChance', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    cloud: {icon: 'mdi-clouds', color: 'blue-grey', effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},

    // gallery
    blossom: {icon: 'mdi-image-filter-vintage', color: 'purple', effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => Math.pow(1.06, lvl)}
    ]},
    leaf: {icon: 'mdi-leaf', color: 'pale-green', effect: [
        {name: 'galleryShapeGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)},
        {name: 'currencyGalleryMotivationCap', type: 'base', value: lvl => lvl * 5}
    ]},
    paper: {icon: 'mdi-note', color: 'pale-yellow', effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl},
        {name: 'galleryCanvasSize', type: 'base', value: lvl => lvl}
    ]},

    // other
    book: {icon: 'mdi-book', color: 'beige', effect: [
        {name: 'currencySchoolBookGain', type: 'base', value: lvl => lvl * 5},
        {name: 'currencySchoolGoldenDustCap', type: 'base', value: lvl => lvl * 2500}
    ]},
    coin: {icon: 'mdi-circle-multiple', color: 'amber', effect: [
        {name: 'currencyTreasureFragmentGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'treasureSlots', type: 'base', value: lvl => lvl}
    ]},
}
