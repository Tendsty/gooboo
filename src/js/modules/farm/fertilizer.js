export default {
    basic: {
        found: true,
        type: 'all',
        color: 'brown',
        price: {farm_gold: 1},
        effect: {farmCropGain: 1.15, farmGrow: 1 / 1.25}
    },
    flower: {
        found: true,
        type: 'flower',
        color: 'pink',
        price: {farm_gold: 3},
        effect: {farmGrow: 1 / 2.5}
    },
    speedGrow: {
        found: true,
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 1.75}
    },
    richSoil: {
        found: true,
        type: 'all',
        color: 'green',
        price: {gem_sapphire: 1},
        effect: {farmCropGain: 1.4}
    },
    shiny: {
        found: true,
        type: 'all',
        color: 'amber',
        price: {gem_sapphire: 1},
        effect: {farmGoldChance: 1.75, farmRareDropChance: 1.1}
    },
    potatoWater: {
        type: 'vegetable',
        color: 'indigo',
        effect: {farmCropGain: 1.2}
    },
    roseWater: {
        type: 'flower',
        color: 'red-pink',
        effect: {farmCropGain: 1.15, farmGoldChance: 1.1}
    },
    weedKiller: {
        type: 'grain',
        color: 'beige',
        price: {farm_gold: 4},
        effect: {farmCropGain: 1.5, farmGrow: 1 / 1.4, farmRareDropChance: 1 / 1.25}
    },
    turboGrow: {
        type: 'all',
        color: 'red',
        price: {gem_sapphire: 1},
        effect: {farmCropGain: 0.75, farmGrow: 1 / 5, farmGoldChance: 0.75, farmRareDropChance: 1 / 1.25}
    },
    premium: {
        type: 'all',
        color: 'purple',
        price: {gem_sapphire: 2},
        effect: {farmCropGain: 1.25, farmGrow: 1 / 1.4, farmGoldChance: 1.3, farmRareDropChance: 1.1}
    },
    sunshine: {
        type: 'all',
        color: 'yellow',
        effect: {farmGoldChance: 3.5, farmRareDropChance: 1.1}
    },
    superFlower: {
        type: 'flower',
        color: 'orange-red',
        effect: {farmCropGain: 2.25, farmGrow: 1 / 1.25, farmGoldChance: 1.5}
    },
    smellyMud: {
        type: 'vegetable',
        color: 'brown',
        effect: {farmCropGain: 2.5, farmGoldChance: 1.5, farmRareDropChance: 1.1}
    },
    tropicalWater: {
        type: 'fruit',
        icon: 'mdi-flask-round-bottom',
        color: 'cyan',
        effect: {farmGrow: 1 / 2, farmGoldChance: 2.5, farmRareDropChance: 1.1}
    },
    fieldBlessing: {
        type: 'grain',
        icon: 'mdi-auto-fix',
        color: 'pink-purple',
        effect: {farmGrow: 1 / 3, farmGoldChance: 2}
    },
    cinnamonBag: {
        type: 'all',
        color: 'brown',
        effect: {farmCropGain: 1.8, farmGoldChance: 2}
    },
}
