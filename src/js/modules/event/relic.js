export default {
    // Generic small event
    tinfoilHat: {icon: 'mdi-hat-fedora', feature: ['event', 'mining'], color: 'blue-grey', effect: [
        {name: 'currencyMiningOreAluminiumGain', type: 'mult', value: 1.12}
    ]},
    cupOfWater: {icon: 'mdi-cup-water', feature: ['event', 'village'], color: 'blue', effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: 1.12},
        {name: 'currencyVillageGlassGain', type: 'mult', value: 1.05}
    ]},
    combatStrategy: {icon: 'mdi-clipboard-list', feature: ['event', 'horde'], color: 'pale-green', effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: 1.18}
    ]},

    // Merchant
    hundredDollarBill: {icon: 'mdi-cash-100', feature: ['event', 'village'], color: 'green', effect: [
        {name: 'currencyVillageCoinGain', type: 'mult', value: 1.1}
    ]},
    hotAirBalloon: {icon: 'mdi-airballoon', feature: ['event', 'mining'], color: 'orange-red', effect: [
        {name: 'miningSmelterySpeed', type: 'mult', value: 1.1}
    ]},

    // Bingo
    largeClover: {icon: 'mdi-clover', feature: ['event', 'horde'], color: 'light-green', effect: [
        {name: 'hordeItemChance', type: 'mult', value: 1.15}
    ]},
    eightBall: {icon: 'mdi-billiards', feature: ['event', 'mining'], color: 'darker-grey', effect: [
        {name: 'miningDamage', type: 'mult', value: 1.08}
    ]},

    // Wheel of fortune
    youngPig: {icon: 'mdi-pig-variant', feature: ['event', 'horde'], color: 'pale-pink', effect: [
        {name: 'hordeNostalgia', type: 'base', value: 5}
    ]},
    silverHorseshoe: {icon: 'mdi-horseshoe', feature: ['event', 'farm'], color: 'lighter-grey', effect: [
        {name: 'farmRareDropChance', type: 'mult', value: 1.05}
    ]},

    // Generic big event
    bronzeTools: {icon: 'mdi-tools', feature: ['event', 'mining'], color: 'amber', effect: [
        {name: 'currencyMiningOreCopperGain', type: 'mult', value: 1.12},
        {name: 'currencyMiningOreTinGain', type: 'mult', value: 1.12}
    ]},
    minersHat: {icon: 'mdi-hard-hat', feature: ['event', 'mining'], color: 'yellow', effect: [
        {name: 'currencyMiningOreIronGain', type: 'mult', value: 1.12},
        {name: 'currencyMiningOreTitaniumGain', type: 'mult', value: 1.12}
    ]},
    dictionary: {icon: 'mdi-book-alphabet', feature: ['event', 'village'], color: 'brown', effect: [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: 1.1}
    ]},
    expertTools: {icon: 'mdi-toolbox', feature: ['event', 'village'], color: 'cherry', effect: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: 1.07},
        {name: 'currencyVillageGemGain', type: 'mult', value: 1.07}
    ]},
    bloodBag: {icon: 'mdi-blood-bag', feature: ['event', 'gallery'], color: 'red', effect: [
        {name: 'currencyGalleryRedGain', type: 'mult', value: 1.15}
    ]},

    // Cinders
    geode: {icon: 'mdi-circle-double', feature: ['event', 'mining'], color: 'indigo', effect: [
        {name: 'miningOreGain', type: 'mult', value: 1.06}
    ]},
    birthdayCake: {icon: 'mdi-cake', feature: ['event', 'treasure'], color: 'red', effect: [
        {name: 'treasureSlots', type: 'base', value: 2}
    ]},

    // Bloom
    colorfulFlower: {icon: 'mdi-flower', feature: ['event', 'farm'], color: 'red-pink', effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: 1.15}
    ]},
    heatingBulb: {icon: 'mdi-lightbulb-on', feature: ['event', 'gallery'], color: 'orange', effect: [
        {name: 'galleryInspirationStart', type: 'base', value: 1}
    ]},

    // Weather chaos
    trashCan: {icon: 'mdi-trash-can', feature: ['event', 'mining'], color: 'dark-grey', effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: 1.1}
    ]},
    suitcase: {icon: 'mdi-bag-carry-on', feature: ['event', 'horde'], color: 'dark-blue', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: 1.1}
    ]},

    // Summer festival
    tropicalTent: {icon: 'mdi-tent', feature: ['event', 'village'], color: 'green', effect: [
        {name: 'villageWorker', type: 'base', value: 3}
    ]},
    fruitBasket: {icon: 'mdi-basket', feature: ['event', 'farm'], color: 'red', effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: 1.15}
    ]},

    // Night hunt
    massiveGrain: {icon: 'mdi-barley', feature: ['event', 'farm'], color: 'pale-yellow', effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: 1.15}
    ]},
    enchantedBottle: {icon: 'mdi-flask-round-bottom', feature: ['event', 'mining'], color: 'purple', effect: [
        {name: 'currencyMiningResinCap', type: 'base', value: 1}
    ]},

    // Snowdown
    moneyGift: {icon: 'mdi-gift', feature: ['event', 'village'], color: 'green', effect: [
        {name: 'currencyVillageCoinGain', type: 'mult', value: 1.1}
    ]},
    frozenCarrot: {icon: 'mdi-carrot', feature: ['event', 'farm'], color: 'light-blue', effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.15}
    ]},
}
