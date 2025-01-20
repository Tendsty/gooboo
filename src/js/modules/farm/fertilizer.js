export default {
    // Unlocked from the beginning
    basic: {
        found: true,
        type: 'all',
        color: 'brown',
        price: {farm_gold: 1},
        effect: {farmCropGain: 1.35}
    },
    flower: {
        found: true,
        type: 'flower',
        color: 'pink',
        price: {farm_gold: 3},
        effect: {farmCropGain: 1.5, farmGrow: 1 / 1.2}
    },
    speedGrow: {
        found: true,
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.5}
    },
    richSoil: {
        found: true,
        type: 'all',
        color: 'green',
        price: {gem_sapphire: 1},
        effect: {farmCropGain: 2}
    },
    shiny: {
        found: true,
        type: 'all',
        color: 'amber',
        price: {gem_sapphire: 1},
        effect: {farmGoldChance: 1.4, farmRareDropChance: 1.6}
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

    // Crop-specific
    potatoWater: {
        type: 'vegetable',
        color: 'indigo',
        effect: {farmCropGain: 1.65}
    },
    roseWater: {
        type: 'flower',
        color: 'red-pink',
        effect: {farmCropGain: 1.4, farmGoldChance: 1.3}
    },

    // Unlocked with upgrade
    weedKiller: {
        type: 'grain',
        color: 'beige',
        price: {farm_gold: 4},
        effect: {farmCropGain: 1.8, farmGrow: 1 / 1.2, farmRareDropChance: 1 / 1.5}
    },
    turboGrow: {
        type: 'all',
        color: 'red',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 2, farmCropGain: 1 / 1.15, farmGoldChance: 1 / 1.15, farmRareDropChance: 1 / 1.15, farmExperience: 1 / 1.75}
    },
    premium: {
        type: 'all',
        color: 'purple',
        price: {gem_sapphire: 2},
        effect: {farmCropGain: 1.75, farmGrow: 1 / 1.25, farmGoldChance: 1.4, farmRareDropChance: 1.4}
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
        effect: {farmCropGain: 2.5, farmRareDropChance: 1.6}
    },
    pellets: {
        type: 'vegetable',
        icon: 'mdi-pill',
        color: 'beige',
        price: {farm_smallSeed: 20},
        effect: {farmGoldChance: 1.25, farmRareDropChance: 1.25, farmExperience: 1.15}
    },

    // Event-exclusive
    sunshine: {
        type: 'all',
        color: 'yellow',
        effect: {farmGrow: 1 / 1.5, farmGoldChance: 2, farmRareDropChance: 1.4}
    },
    superFlower: {
        type: 'flower',
        color: 'orange-red',
        effect: {farmGrow: 1 / 1.75, farmCropGain: 2.25, farmGoldChance: 1.5}
    },
    smellyMud: {
        type: 'vegetable',
        color: 'brown',
        effect: {farmGrow: 1 / 1.5, farmCropGain: 2.5, farmGoldChance: 1.5, farmRareDropChance: 1.25}
    },
    tropicalWater: {
        type: 'berry',
        icon: 'mdi-flask-round-bottom',
        color: 'cyan',
        effect: {farmGrow: 1 / 2, farmGoldChance: 2, farmRareDropChance: 1.25}
    },
    fieldBlessing: {
        type: 'grain',
        icon: 'mdi-auto-fix',
        color: 'pink-purple',
        effect: {farmGrow: 1 / 2, farmGoldChance: 2.25}
    },
    cinnamonBag: {
        type: 'all',
        color: 'brown',
        effect: {farmGrow: 1 / 1.5, farmCropGain: 1.8, farmGoldChance: 1.75}
    },
}
