export default {
    // Mining effects
    miningDamage: {feature: 'mining', icon: 'mdi-bomb', value: 0.25},
    currencyMiningScrapGain: {feature: 'mining', icon: 'mdi-dots-triangle', value: 0.3},
    miningOreGain: {feature: 'mining', icon: 'mdi-chart-bubble', value: 0.2},
    miningSmelterySpeed: {feature: 'mining', unlock: 'miningSmeltery', icon: 'mdi-fire', value: 0.2},
    currencyMiningSmokeGain: {feature: 'mining', unlock: 'miningSmoke', icon: 'mdi-smoke', value: 0.04},
    currencyMiningCrystalGreenGain: {feature: 'mining', type: 'special', icon: 'mdi-star-three-points', unique: true, value: 0.1},
    currencyMiningCrystalYellowGain: {feature: 'mining', unlock: 'miningGasSubfeature', type: 'special', icon: 'mdi-star-four-points', unique: true, value: 0.05},

    // Village effects
    queueSpeedVillageBuilding: {feature: 'village', icon: 'mdi-hammer', value: 0.3},
    villageMaterialGain: {feature: 'village', icon: 'mdi-tree', value: 0.1},
    currencyVillageCoinGain: {feature: 'village', icon: 'mdi-circle-multiple', value: 0.25},
    villageMentalGain: {feature: 'village', icon: 'mdi-brain', value: 0.1},
    currencyVillageFaithGain: {feature: 'village', type: 'special', icon: 'mdi-hands-pray', unique: true, value: 0.1},
    currencyVillageSharesGain: {feature: 'village', unlock: 'villageCraftingSubfeature', type: 'special', icon: 'mdi-certificate', unique: true, value: 0.05},

    // Horde effects
    hordeAttack: {feature: 'horde', icon: 'mdi-sword', value: 0.2},
    currencyHordeBoneGain: {feature: 'horde', icon: 'mdi-bone', value: 0.3},
    currencyHordeMonsterPartGain: {feature: 'horde', icon: 'mdi-stomach', value: 0.15},
    hordeItemMasteryGain: {feature: 'horde', unlock: 'hordeItemMastery', icon: 'mdi-seal', value: 0.1},
    currencyHordeSoulCorruptedGain: {feature: 'horde', type: 'special', icon: 'mdi-ghost', unique: true, value: 0.1},

    // Farm effects
    currencyFarmVegetableGain: {feature: 'farm', icon: 'mdi-carrot', value: 0.35},
    currencyFarmBerryGain: {feature: 'farm', icon: 'mdi-fruit-grapes', value: 0.35},
    currencyFarmGrainGain: {feature: 'farm', icon: 'mdi-barley', value: 0.35},
    currencyFarmFlowerGain: {feature: 'farm', icon: 'mdi-flower', value: 0.35},
    farmExperience: {feature: 'farm', unlock: 'farmCropExp', type: 'special', icon: 'mdi-star', unique: true, value: 0.1},

    // Gallery effects
    currencyGalleryBeautyGain: {feature: 'gallery', icon: 'mdi-image-filter-vintage', value: 0.4},
    currencyGalleryConverterGain: {feature: 'gallery', unlock: 'galleryConversion', icon: 'mdi-recycle', value: 0.15},
    currencyGalleryPackageGain: {feature: 'gallery', unlock: 'galleryDrums', icon: 'mdi-package-variant', value: 0.15},
    currencyGalleryCashGain: {feature: 'gallery', type: 'special', icon: 'mdi-cash', unique: true, value: 0.1},
}
