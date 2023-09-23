export default {
    // Mining effects
    miningDamage: {feature: 'mining', value: 0.25},
    currencyMiningScrapGain: {feature: 'mining', value: 0.3},
    miningOreGain: {feature: 'mining', value: 0.2},
    miningSmelterySpeed: {feature: 'mining', unlock: 'miningSmeltery', value: 0.2},
    currencyMiningCrystalGreenGain: {feature: 'mining', type: 'special', unique: true, value: 0.1},
    currencyMiningCrystalYellowGain: {feature: 'mining', unlock: 'miningGasSubfeature', type: 'special', unique: true, value: 0.05},

    // Village effects
    queueSpeedVillageBuilding: {feature: 'village', value: 0.3},
    villageMaterialGain: {feature: 'village', value: 0.25},
    currencyVillageCoinGain: {feature: 'village', value: 0.25},
    villageMentalGain: {feature: 'village', value: 0.1},
    currencyVillageFaithGain: {feature: 'village', type: 'special', unique: true, value: 0.1},

    // Horde effects
    hordeAttack: {feature: 'horde', value: 0.2},
    currencyHordeBoneGain: {feature: 'horde', value: 0.3},
    currencyHordeMonsterPartGain: {feature: 'horde', value: 0.15},
    hordeItemMasteryGain: {feature: 'horde', unlock: 'hordeItemMastery', value: 0.1},
    hordeSoulGain: {feature: 'horde', type: 'special', unique: true, value: 0.1},

    // Farm effects
    currencyFarmVegetableGain: {feature: 'farm', value: 0.35},
    currencyFarmFruitGain: {feature: 'farm', value: 0.35},
    currencyFarmGrainGain: {feature: 'farm', value: 0.35},
    currencyFarmFlowerGain: {feature: 'farm', value: 0.35},
    farmExperience: {feature: 'farm', unlock: 'farmCropExp', type: 'special', unique: true, value: 0.1},

    // Gallery effects
    currencyGalleryBeautyGain: {feature: 'gallery', value: 0.4},
    currencyGalleryConverterGain: {feature: 'gallery', unlock: 'galleryConversion', value: 0.15},
    currencyGalleryPackageGain: {feature: 'gallery', unlock: 'galleryDrums', value: 0.15},
    currencyGalleryCashGain: {feature: 'gallery', type: 'special', unique: true, value: 0.1},
}
