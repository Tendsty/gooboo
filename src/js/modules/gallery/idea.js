export default {
    // Tier 1
    makeItPretty: {tier: 1, owned: true, icon: 'mdi-image', color: 'deep-purple', effect: [
        {name: 'currencyGalleryBeautyGain', type: 'mult', value: lvl => lvl * 0.75 + 1},
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
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
    ]},
    advertise: {tier: 1, icon: 'mdi-cash', color: 'green', effect: [
        {name: 'currencyGalleryCashGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
    ]},
    beImpatient: {tier: 1, icon: 'mdi-run-fast', color: 'light-blue', effect: [
        {name: 'currencyGalleryPackageGain', type: 'mult', value: lvl => lvl * 0.5 + 1},
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
        {name: 'currencyGalleryConverterGain', type: 'mult', value: lvl => lvl * 0.3 + 1},
        {name: 'currencyGalleryConverterCap', type: 'mult', value: lvl => lvl * 0.3 + 1},
    ]},
    observeRainbow: {tier: 2, icon: 'mdi-looks', color: 'pink', effect: [
        {name: 'galleryColorGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
    ]},
    buildRedReservoir: {tier: 2, icon: 'mdi-hoop-house', color: 'red', effect: [
        {name: 'currencyGalleryRedDrumCap', type: 'mult', value: lvl => lvl + 1},
        {name: 'galleryRedDrumChance', type: 'mult', value: lvl => Math.pow(2/3, lvl)},
    ]},
    orderMassiveSafe: {tier: 2, icon: 'mdi-safe-square', color: 'dark-grey', effect: [
        {name: 'galleryColorDrumCap', type: 'base', value: lvl => lvl * 3},
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
        {name: 'currencyGalleryOrangeDrumCap', type: 'mult', value: lvl => lvl + 1},
        {name: 'galleryOrangeDrumChance', type: 'mult', value: lvl => Math.pow(2/3, lvl)},
    ]},
    thinkHarder: {tier: 3, icon: 'mdi-head-lightbulb', color: 'amber', effect: [
        {name: 'galleryInspirationStart', type: 'base', value: lvl => lvl * 2},
    ]},
}
