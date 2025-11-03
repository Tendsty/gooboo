import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from "../../constants";

export default {
    carrot: {
        found: true,
        icon: 'mdi-carrot',
        color: 'orange',
        grow: MINUTES_PER_HOUR,
        yield: 130,
        rareDrop: [
            {name: 'farm_oldRoot', type: 'currency', chance: -1, value: 5},
        ],
        tier: 0,
        type: 'vegetable'
    },
    blueberry: {
        icon: 'mdi-fruit-grapes',
        color: 'blue',
        grow: 2 * MINUTES_PER_HOUR,
        yield: 250,
        rareDrop: [
            {name: 'farm_oldRoot', type: 'currency', chance: -1, value: 9},
        ],
        tier: 1,
        type: 'berry'
    },
    wheat: {
        icon: 'mdi-barley',
        color: 'yellow',
        grow: 4 * MINUTES_PER_HOUR,
        yield: 480,
        rareDrop: [
            {name: 'farm_oldRoot', type: 'currency', chance: -1, value: 16},
        ],
        tier: 2,
        type: 'grain'
    },
    tulip: {
        icon: 'mdi-flower-tulip',
        color: 'red',
        grow: 8 * MINUTES_PER_HOUR,
        yield: 850,
        rareDrop: [
            {name: 'farm_oldRoot', type: 'currency', chance: -1, value: 28},
        ],
        tier: 3,
        type: 'flower'
    },
    potato: {
        icon: 'mdi-circle',
        color: 'brown',
        grow: 20 * MINUTES_PER_HOUR,
        yield: 1600,
        rareDrop: [
            {name: 'farm_potatoWater', type: 'consumable', chance: 0.15, value: 3},
        ],
        tier: 4,
        type: 'vegetable'
    },
    raspberry: {
        icon: 'mdi-fruit-grapes',
        color: 'pink',
        grow: 6 * MINUTES_PER_HOUR,
        yield: 680,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.2, value: 6},
        ],
        tier: 5,
        type: 'berry'
    },
    barley: {
        icon: 'mdi-barley',
        color: 'amber',
        grow: 10 * MINUTES_PER_HOUR,
        yield: 1050,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.18, value: 10},
        ],
        tier: 6,
        type: 'grain'
    },
    dandelion: {
        icon: 'mdi-flower',
        color: 'pale-yellow',
        grow: 1 * MINUTES_PER_HOUR + 30,
        yield: 230,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.15, value: 1},
        ],
        tier: 7,
        type: 'flower'
    },
    corn: {
        icon: 'mdi-corn',
        color: 'amber',
        grow: 30 * MINUTES_PER_HOUR,
        yield: 2600,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.12, value: 15},
        ],
        tier: 8,
        type: 'vegetable'
    },
    watermelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'red',
        grow: 12 * MINUTES_PER_HOUR,
        yield: 1250,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.1, value: 6},
            {name: 'farm_butterfly', type: 'currency', chance: -0.02, value: 2},
        ],
        tier: 9,
        type: 'berry'
    },
    rice: {
        icon: 'mdi-rice',
        color: 'light-grey',
        grow: 24 * MINUTES_PER_HOUR,
        yield: 2200,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.05, value: 24},
            {name: 'farm_ladybug', type: 'currency', chance: -0.05, value: 12},
        ],
        tier: 10,
        type: 'grain'
    },
    rose: {
        icon: 'mdi-flower',
        color: 'red',
        grow: 48 * MINUTES_PER_HOUR,
        yield: 3500,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0, value: 32},
            {name: 'farm_ladybug', type: 'currency', chance: -0.08, value: 24},
            {name: 'farm_roseWater', type: 'consumable', chance: -0.12, value: 8},
        ],
        tier: 11,
        type: 'flower'
    },
    leek: {
        icon: 'mdi-leek',
        color: 'light-green',
        grow: 3 * MINUTES_PER_HOUR,
        yield: 490,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.1, value: 2},
            {name: 'farm_ladybug', type: 'currency', chance: -0.15, value: 2},
        ],
        tier: 12,
        type: 'vegetable'
    },
    honeymelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'amber',
        grow: 42 * MINUTES_PER_HOUR,
        yield: 3875,
        rareDrop: [
            {name: 'farm_butterfly', type: 'currency', chance: -0.12, value: 7},
            {name: 'farm_spider', type: 'currency', chance: -0.3, value: 1},
        ],
        tier: 13,
        type: 'berry'
    },
    rye: {
        icon: 'mdi-barley',
        color: 'pale-orange',
        grow: 7 * MINUTES_PER_HOUR,
        yield: 1050,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: -0.16, value: 7},
            {name: 'farm_spider', type: 'currency', chance: -0.25, value: 1, mult: 0.5},
        ],
        tier: 14,
        type: 'grain'
    },
    daisy: {
        icon: 'mdi-flower',
        color: 'yellow',
        grow: 14 * MINUTES_PER_HOUR,
        yield: 1700,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: -0.18, value: 9},
            {name: 'farm_butterfly', type: 'currency', chance: -0.21, value: 2},
            {name: 'farm_bee', type: 'currency', chance: -0.25, value: 28},
        ],
        tier: 15,
        type: 'flower'
    },
    cucumber: {
        icon: 'mdi-ruler',
        color: 'pale-green',
        grow: 2 * MINUTES_PER_HOUR + 30,
        yield: 560,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.24, value: 1},
        ],
        tier: 16,
        type: 'vegetable'
    },
    grapes: {
        icon: 'mdi-fruit-grapes',
        color: 'purple',
        grow: 5 * MINUTES_PER_HOUR,
        yield: 950,
        rareDrop: [
            {name: 'farm_ladybug', type: 'currency', chance: -0.23, value: 3},
            {name: 'farm_bee', type: 'currency', chance: -0.28, value: 10},
        ],
        tier: 17,
        type: 'berry'
    },
    hops: {
        icon: 'mdi-hops',
        color: 'green',
        grow: 1 * MINUTES_PER_HOUR + 15,
        yield: 340,
        rareDrop: [
            {name: 'farm_spider', type: 'currency', chance: -0.32, value: 1, mult: 0.25},
        ],
        tier: 18,
        type: 'grain'
    },
    violet: {
        icon: 'mdi-flower',
        color: 'deep-purple',
        grow: 36 * MINUTES_PER_HOUR,
        yield: 4600,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: -0.3, value: 24},
            {name: 'farm_bee', type: 'currency', chance: -0.33, value: 72},
        ],
        tier: 19,
        type: 'flower'
    },
    sweetPotato: {
        icon: 'mdi-circle',
        color: 'beige',
        grow: 11 * MINUTES_PER_HOUR + 30,
        yield: 2300,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.36, value: 6},
        ],
        tier: 20,
        type: 'vegetable'
    },
    strawberry: {
        icon: 'mdi-fruit-grapes',
        color: 'red',
        grow: 27 * MINUTES_PER_HOUR,
        yield: 4100,
        rareDrop: [
            {name: 'farm_ladybug', type: 'currency', chance: -0.4, value: 14},
            {name: 'farm_bee', type: 'currency', chance: -0.45, value: 54},
        ],
        tier: 21,
        type: 'berry'
    },
    sesame: {
        icon: 'mdi-grain',
        color: 'pale-orange',
        grow: 4 * MINUTES_PER_HOUR + 30,
        yield: 1125,
        rareDrop: [
            {name: 'farm_smallSeed', type: 'currency', chance: -0.48, value: 3},
            {name: 'farm_spider', type: 'currency', chance: -0.51, value: 1, mult: 0.5},
        ],
        tier: 22,
        type: 'grain'
    },
    sunflower: {
        icon: 'mdi-flower-outline',
        color: 'brown',
        grow: 28 * MINUTES_PER_HOUR,
        yield: 4650,
        rareDrop: [
            {name: 'farm_smallSeed', type: 'currency', chance: -0.5, value: 15},
            {name: 'farm_petal', type: 'currency', chance: -0.53, value: 18},
        ],
        tier: 23,
        type: 'flower'
    },
    spinach: {
        icon: 'mdi-flower-poppy',
        color: 'green',
        grow: 5 * MINUTES_PER_HOUR + 45,
        yield: 1650,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.55, value: 3},
        ],
        tier: 24,
        type: 'vegetable'
    },
    currant: {
        icon: 'mdi-fruit-grapes',
        color: 'red',
        grow: 18 * MINUTES_PER_HOUR,
        yield: 4500,
        rareDrop: [
            {name: 'farm_butterfly', type: 'currency', chance: -0.58, value: 3},
            {name: 'farm_smallSeed', type: 'currency', chance: -0.6, value: 10},
        ],
        tier: 25,
        type: 'berry'
    },
    redwheat: {
        icon: 'mdi-barley',
        color: 'pale-red',
        grow: 68 * MINUTES_PER_HOUR,
        yield: 13000,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: -0.62, value: 68},
            {name: 'farm_spider', type: 'currency', chance: -0.64, value: 3},
        ],
        tier: 26,
        type: 'grain'
    },
    poppy: {
        icon: 'mdi-flower-poppy',
        color: 'red',
        grow: 3 * MINUTES_PER_HOUR + 30,
        yield: 1450,
        rareDrop: [
            {name: 'farm_smallSeed', type: 'currency', chance: -0.67, value: 2},
        ],
        tier: 27,
        type: 'flower'
    },
    pumpkin: {
        icon: 'mdi-pumpkin',
        color: 'orange',
        grow: 60 * MINUTES_PER_HOUR,
        yield: 13000,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.69, value: 30},
            {name: 'farm_spider', type: 'currency', chance: -0.75, value: 3},
        ],
        tier: 28,
        type: 'vegetable'
    },
    blackberry: {
        icon: 'mdi-fruit-grapes',
        color: 'pale-purple',
        grow: 22 * MINUTES_PER_HOUR,
        yield: 6400,
        rareDrop: [
            {name: 'farm_bee', type: 'currency', chance: -0.73, value: 44},
            {name: 'farm_smallSeed', type: 'currency', chance: -0.76, value: 15},
        ],
        tier: 29,
        type: 'berry'
    },
    millet: {
        icon: 'mdi-feather',
        color: 'lime',
        grow: 16 * MINUTES_PER_HOUR,
        yield: 5300,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: -0.78, value: 16},
            {name: 'farm_snail', type: 'currency', chance: -0.8, value: 4},
        ],
        tier: 30,
        type: 'grain'
    },
    petunia: {
        icon: 'mdi-flower',
        color: 'babypink',
        grow: 21 * MINUTES_PER_HOUR,
        yield: 6800,
        rareDrop: [
            {name: 'farm_snail', type: 'currency', chance: -0.83, value: 5},
            {name: 'farm_petal', type: 'currency', chance: -0.85, value: 14},
        ],
        tier: 31,
        type: 'flower'
    },
    chili: {
        icon: 'mdi-chili-mild',
        color: 'red',
        grow: 40 * MINUTES_PER_HOUR,
        yield: 11500,
        rareDrop: [
            {name: 'farm_snail', type: 'currency', chance: -0.87, value: 10},
        ],
        tier: 32,
        type: 'vegetable'
    },

    // Special crops
    fern: {
        icon: 'mdi-grass',
        color: 'pale-green',
        cost: {farm_grass: 15},
        grow: 10 * MINUTES_PER_HOUR,
        giantGrow: 92 * MINUTES_PER_HOUR,
        giantMult: 7,
        baseExp: 10,
        specialEffect: [
            {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => (lvl * 0.1 + 1) * Math.pow(1.1, lvl)},
            {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => (lvl * 0.1 + 1) * Math.pow(1.1, lvl)},
        ],
        type: 'special'
    },
    reed: {
        icon: 'mdi-feather',
        color: 'beige',
        cost: {farm_gold: 10},
        grow: 20 * MINUTES_PER_HOUR,
        giantGrow: 140 * MINUTES_PER_HOUR,
        giantMult: 6,
        baseExp: 12,
        specialEffect: [
            {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => (lvl * 0.1 + 1) * Math.pow(1.1, lvl)},
            {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => (lvl * 0.1 + 1) * Math.pow(1.1, lvl)},
        ],
        type: 'special'
    },
    wildflower: {
        icon: 'mdi-flower-pollen',
        color: 'lime',
        cost: {farm_mixedSeeds: 1},
        grow: 5 * MINUTES_PER_HOUR,
        giantGrow: 68 * MINUTES_PER_HOUR,
        giantMult: 10,
        baseExp: 25,
        specialEffect: [
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.04 + 1},
        ],
        type: 'special'
    },
    cactus: {
        icon: 'mdi-cactus',
        color: 'green',
        cost: {farm_cactusSeed: 1},
        grow: 5 * MINUTES_PER_DAY,
        giantGrow: 24 * MINUTES_PER_DAY,
        giantMult: 4,
        baseExp: 7,
        specialEffect: [
            {name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.03 + 1},
        ],
        type: 'special'
    },
    cress: {
        icon: 'mdi-leaf-circle-outline',
        color: 'light-green',
        cost: {farm_smallSeed: 2},
        grow: MINUTES_PER_HOUR + 30,
        giantGrow: 20 * MINUTES_PER_HOUR,
        giantMult: 10,
        baseExp: 80,
        specialEffect: [
            {name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.01},
        ],
        type: 'special'
    },
    goldenRose: {
        icon: 'mdi-flower',
        color: 'amber',
        cost: {farm_gold: 250},
        grow: 14 * MINUTES_PER_DAY,
        giantGrow: 48 * MINUTES_PER_DAY,
        giantMult: 3,
        baseExp: 4,
        specialEffect: [
            {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 50},
        ],
        type: 'special'
    },
    ancientFern: {
        icon: 'mdi-grass',
        color: 'pale-blue',
        cost: {farm_ancientSeed: 1},
        grow: 30 * MINUTES_PER_DAY,
        giantGrow: 100 * MINUTES_PER_DAY,
        giantMult: 3,
        baseExp: 1,
        type: 'special'
    },
}
