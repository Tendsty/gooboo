export default {
    // Generic small event
    tinfoilHat: {icon: 'mdi-hat-fedora', feature: ['event', 'mining'], color: 'blue-grey', effect() {return [
        {name: 'currencyMiningOreAluminiumGain', type: 'mult', value: 1.12}
    ];}, glyph() {return {clay: 2, book: 2};}},
    cupOfWater: {icon: 'mdi-cup-water', feature: ['event', 'village'], color: 'blue', effect() {return [
        {name: 'currencyVillageWaterGain', type: 'mult', value: 1.12},
        {name: 'currencyVillageGlassGain', type: 'mult', value: 1.05}
    ];}, glyph() {return {wood: 2, flow: 2};}},
    combatStrategy: {icon: 'mdi-clipboard-list', feature: ['event', 'horde'], color: 'pale-green', effect() {return [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.1}
    ];}, glyph() {return {spike: 2, clover: 2};}},

    // Merchant
    hundredDollarBill: {icon: 'mdi-cash-100', feature: ['event', 'village'], color: 'green', effect() {return [
        {name: 'currencyVillageCoinGain', type: 'mult', value: 1.1}
    ];}, glyph() {return {flow: 2, coin: 2};}},
    hotAirBalloon: {icon: 'mdi-airballoon', feature: ['event', 'mining'], color: 'orange-red', effect() {return [
        {name: 'miningSmelteryTime', type: 'mult', value: 1 / 1.1}
    ];}, glyph() {return {heat: 3};}},

    // Bingo
    largeClover: {icon: 'mdi-clover', feature: ['event', 'horde'], color: 'light-green', effect() {return [
        {name: 'hordeEquipmentChance', type: 'mult', value: 1.15}
    ];}, glyph() {return {clover: 3};}},
    eightBall: {icon: 'mdi-billiards', feature: ['event', 'mining'], color: 'darker-grey', effect() {return [
        {name: 'miningDamage', type: 'mult', value: 1.08}
    ];}, glyph() {return {dust: 2, book: 2};}},

    // Wheel of fortune
    youngPig: {icon: 'mdi-pig-variant', feature: ['event', 'horde'], color: 'pale-pink', effect() {return [
        {name: 'hordeNostalgia', type: 'base', value: 5}
    ];}, glyph() {return {dream: 3};}},
    silverHorseshoe: {icon: 'mdi-horseshoe', feature: ['event', 'farm'], color: 'lighter-grey', effect() {return [
        {name: 'farmRareDropChance', type: 'mult', value: 1.05}
    ];}, glyph() {return {rain: 2, sun: 2};}},

    // Generic big event
    bronzeTools: {icon: 'mdi-tools', feature: ['event', 'mining'], color: 'amber', effect() {return [
        {name: 'currencyMiningOreCopperGain', type: 'mult', value: 1.12},
        {name: 'currencyMiningOreTinGain', type: 'mult', value: 1.12}
    ];}, glyph() {return {clay: 2, heat: 2};}},
    minersHat: {icon: 'mdi-hard-hat', feature: ['event', 'mining'], color: 'yellow', effect() {return [
        {name: 'currencyMiningOreIronGain', type: 'mult', value: 1.12},
        {name: 'currencyMiningOreTitaniumGain', type: 'mult', value: 1.12}
    ];}, glyph() {return {dust: 2, clay: 2};}},
    dictionary: {icon: 'mdi-book-alphabet', feature: ['event', 'village'], color: 'brown', effect() {return [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: 1.1}
    ];}, glyph() {return {book: 3};}},
    expertTools: {icon: 'mdi-toolbox', feature: ['event', 'village'], color: 'cherry', effect() {return [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: 1.07},
        {name: 'currencyVillageGemGain', type: 'mult', value: 1.07}
    ];}, glyph() {return {flow: 2, stone: 2};}},
    bloodBag: {icon: 'mdi-blood-bag', feature: ['event', 'gallery'], color: 'red', effect() {return [
        {name: 'currencyGalleryRedGain', type: 'mult', value: 1.15}
    ];}, glyph() {return {blossom: 3};}},

    // Cinders
    geode: {icon: 'mdi-circle-double', feature: ['event', 'mining'], color: 'indigo', effect() {return [
        {name: 'miningOreGain', type: 'mult', value: 1.06}
    ];}, glyph() {return {dust: 3};}},
    birthdayCake: {icon: 'mdi-cake', feature: ['event', 'treasure'], color: 'red', effect() {return [
        {name: 'treasureSlots', type: 'base', value: 2}
    ];}, glyph() {return {coin: 3};}},

    // Bloom
    colorfulFlower: {icon: 'mdi-flower', feature: ['event', 'farm'], color: 'red-pink', effect() {return [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: 1.15}
    ];}, glyph() {return {cloud: 2, coin: 2};}},
    heatingBulb: {icon: 'mdi-lightbulb-on', feature: ['event', 'gallery'], color: 'orange', effect() {return [
        {name: 'galleryInspirationStart', type: 'base', value: 1}
    ];}, glyph() {return {paper: 3};}},

    // Weather chaos
    trashCan: {icon: 'mdi-trash-can', feature: ['event', 'mining'], color: 'dark-grey', effect() {return [
        {name: 'currencyMiningScrapGain', type: 'mult', value: 1.1}
    ];}, glyph() {return {dust: 2, book: 2};}},
    suitcase: {icon: 'mdi-bag-carry-on', feature: ['event', 'horde'], color: 'dark-blue', effect() {return [
        {name: 'currencyHordeBoneCap', type: 'mult', value: 1.1}
    ];}, glyph() {return {spike: 3};}},

    // Summer festival
    tropicalTent: {icon: 'mdi-tent', feature: ['event', 'village'], color: 'green', effect() {return [
        {name: 'villageWorker', type: 'base', value: 3}
    ];}, glyph() {return {wood: 3};}},
    fruitBasket: {icon: 'mdi-basket', feature: ['event', 'farm'], color: 'red', effect() {return [
        {name: 'currencyFarmBerryGain', type: 'mult', value: 1.15}
    ];}, glyph() {return {sun: 3};}},

    // Night hunt
    massiveGrain: {icon: 'mdi-barley', feature: ['event', 'farm'], color: 'pale-yellow', effect() {return [
        {name: 'currencyFarmGrainGain', type: 'mult', value: 1.15}
    ];}, glyph() {return {cloud: 2, book: 2};}},
    enchantedBottle: {icon: 'mdi-flask-round-bottom', feature: ['event', 'mining'], color: 'purple', effect() {return [
        {name: 'currencyMiningResinCap', type: 'base', value: 1}
    ];}, glyph() {return {clay: 3};}},

    // Snowdown
    moneyGift: {icon: 'mdi-gift', feature: ['event', 'village'], color: 'green', effect() {return [
        {name: 'currencyVillageCoinGain', type: 'mult', value: 1.1}
    ];}, glyph() {return {flow: 3};}},
    frozenCarrot: {icon: 'mdi-carrot', feature: ['event', 'farm'], color: 'light-blue', effect() {return [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.15}
    ];}, glyph() {return {rain: 3};}},
}
