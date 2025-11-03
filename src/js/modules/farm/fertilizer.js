export default {
    // Unlocked from the beginning
    speedGrow: {
        found: true,
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.5, farmOvergrow: 2.5}
    },
    richSoil: {
        found: true,
        type: 'all',
        color: 'green',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.25, farmOvergrow: 1.25, farmCropGain: 1.4}
    },
    shiny: {
        found: true,
        type: 'all',
        color: 'amber',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.25, farmOvergrow: 1.25, farmGoldChance: 1.3, farmRareDropChance: 1.4}
    },
    juicy: {
        found: true,
        type: 'all',
        color: 'lime',
        price: {farm_grass: 16},
        effect: {farmCropGain: 1.25, farmRareDropChance: 1.25}
    },
    dissolving: {
        found: true,
        type: 'all',
        icon: 'mdi-test-tube',
        color: 'cyan',
        price: {farm_grass: 22},
        effect: {farmExperience: 1.4, farmCropGain: 0, farmRareDropChance: 0, farmGoldChance: 0}
    },
    supplementsS: {
        found: true,
        type: 'special',
        icon: 'mdi-gradient-vertical',
        color: 'cherry',
        price: {farm_grass: 25, farm_gold: 3},
        effect: {farmGrow: 1 / 1.25}
    },
    supplementsM: {
        found: true,
        type: 'special',
        icon: 'mdi-gradient-vertical',
        color: 'green',
        price: {gem_sapphire: 4},
        effect: {farmGrow: 1 / 1.5}
    },

    // Crop-specific
    potatoWater: {
        type: 'vegetable',
        color: 'indigo',
        effect: {farmGrow: 1 / 1.25, farmOvergrow: 1.25, farmCropGain: 1.3}
    },
    roseWater: {
        type: 'flower',
        color: 'red-pink',
        effect: {farmGrow: 1 / 1.25, farmOvergrow: 1.25, farmCropGain: 1.2, farmGoldChance: 1.1}
    },

    // Unlocked with upgrade
    weedKiller: {
        type: 'grain',
        color: 'beige',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.2, farmOvergrow: 1, farmCropGain: 1.8, farmRareDropChance: 1 / 1.5}
    },
    turboGrow: {
        type: 'all',
        color: 'red',
        price: {gem_sapphire: 2},
        effect: {farmGrow: 1 / 1.75, farmOvergrow: 3.75, farmExperience: 1 / 1.5}
    },
    premium: {
        type: 'all',
        color: 'purple',
        price: {gem_sapphire: 2},
        effect: {farmGrow: 1 / 1.5, farmOvergrow: 2.5, farmCropGain: 1.35, farmGoldChance: 1.2, farmRareDropChance: 1.2}
    },
    supplementsL: {
        type: 'special',
        icon: 'mdi-gradient-vertical',
        color: 'dark-blue',
        price: {gem_sapphire: 10},
        effect: {farmGrow: 1 / 2}
    },

    // Unlocked with second upgrade
    analyzing: {
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 5},
        effect: {farmExperience: 1.35}
    },
    superJuicy: {
        type: 'berry',
        color: 'orange-red',
        price: {gem_sapphire: 3},
        effect: {farmGrow: 1 / 1.75, farmOvergrow: 3.75, farmCropGain: 1.5, farmRareDropChance: 1.2}
    },
    pellets: {
        type: 'vegetable',
        icon: 'mdi-pill',
        color: 'beige',
        price: {farm_smallSeed: 20},
        effect: {farmGoldChance: 1.2, farmRareDropChance: 1.2, farmExperience: 1.1}
    },
    supplementsXL: {
        type: 'special',
        icon: 'mdi-gradient-vertical',
        color: 'orange-red',
        price: {gem_sapphire: 25},
        effect: {farmGrow: 1 / 3}
    },

    // Special unlocks
    supplementsXXL: {
        type: 'special',
        icon: 'mdi-gradient-vertical',
        color: 'babypink',
        effect: {farmGrow: 1 / 5}
    },
}
