export default {
    basic: {
        found: true,
        type: 'all',
        color: 'brown',
        price: {farm_gold: 1},
        effect: {farmCropGain: 1.25, farmGrow: 1 / 1.25}
    },
    flower: {
        found: true,
        type: 'flower',
        color: 'pink',
        price: {farm_gold: 3},
        effect: {farmGrow: 1 / 3}
    },
    speedGrow: {
        found: true,
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 4}
    },
    richSoil: {
        found: true,
        type: 'all',
        color: 'green',
        price: {gem_sapphire: 1},
        effect: {farmCropGain: 1.5, farmGrow: 1 / 2}
    },
    shiny: {
        found: true,
        type: 'all',
        color: 'amber',
        price: {gem_sapphire: 1},
        effect: {farmGoldChance: 2.5, farmRareDropChance: 1.35, farmGrow: 1 / 2}
    },
    juicy: {
        found: true,
        type: 'all',
        color: 'lime',
        price: {farm_grass: 5},
        effect: {farmRareDropChance: 1.25}
    },
    potatoWater: {
        type: 'vegetable',
        color: 'indigo',
        effect: {farmCropGain: 1.2}
    },
    roseWater: {
        type: 'flower',
        color: 'red-pink',
        effect: {farmCropGain: 1.15, farmGoldChance: 1.4}
    },
    weedKiller: {
        type: 'grain',
        color: 'beige',
        price: {farm_gold: 4},
        effect: {farmCropGain: 1.8, farmGrow: 1 / 1.75, farmRareDropChance: 1 / 1.25}
    },
    turboGrow: {
        type: 'all',
        color: 'red',
        price: {gem_sapphire: 1},
        effect: {farmGrow: 1 / 10, farmCropGain: 0.5, farmGoldChance: 0.5, farmRareDropChance: 0.5, farmExperience: 0.5}
    },
    premium: {
        type: 'all',
        color: 'purple',
        price: {gem_sapphire: 2},
        effect: {farmCropGain: 1.6, farmGrow: 1 / 3, farmGoldChance: 1.8, farmRareDropChance: 1.4}
    },
    sunshine: {
        type: 'all',
        color: 'yellow',
        effect: {farmGrow: 1 / 2, farmGoldChance: 4, farmRareDropChance: 1.4}
    },
    superFlower: {
        type: 'flower',
        color: 'orange-red',
        effect: {farmGrow: 1 / 2.5, farmCropGain: 2.25, farmGoldChance: 2}
    },
    smellyMud: {
        type: 'vegetable',
        color: 'brown',
        effect: {farmGrow: 1 / 2, farmCropGain: 2.5, farmGoldChance: 1.5, farmRareDropChance: 1.25}
    },
    tropicalWater: {
        type: 'fruit',
        icon: 'mdi-flask-round-bottom',
        color: 'cyan',
        effect: {farmGrow: 1 / 4, farmGoldChance: 2.5, farmRareDropChance: 1.25}
    },
    fieldBlessing: {
        type: 'grain',
        icon: 'mdi-auto-fix',
        color: 'pink-purple',
        effect: {farmGrow: 1 / 6, farmGoldChance: 5}
    },
    cinnamonBag: {
        type: 'all',
        color: 'brown',
        effect: {farmGrow: 1 / 2, farmCropGain: 1.8, farmGoldChance: 2.5}
    },
}
