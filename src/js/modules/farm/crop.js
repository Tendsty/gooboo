import { MINUTES_PER_HOUR } from "../../constants";
import { buildNum } from "../../utils/format";

export default {
    carrot: {
        found: true,
        icon: 'mdi-carrot',
        color: 'orange',
        grow: MINUTES_PER_HOUR,
        yield: 40,
        tier: 0,
        type: 'vegetable'
    },
    blueberry: {
        icon: 'mdi-fruit-grapes',
        color: 'blue',
        grow: 2 * MINUTES_PER_HOUR,
        yield: 70,
        tier: 1,
        type: 'berry'
    },
    wheat: {
        icon: 'mdi-barley',
        color: 'yellow',
        grow: 4 * MINUTES_PER_HOUR,
        yield: 120,
        tier: 2,
        type: 'grain'
    },
    tulip: {
        icon: 'mdi-flower-tulip',
        color: 'red',
        grow: 8 * MINUTES_PER_HOUR,
        yield: 200,
        tier: 3,
        type: 'flower'
    },
    potato: {
        icon: 'mdi-circle',
        color: 'brown',
        cost: {farm_gold: 1},
        grow: 20 * MINUTES_PER_HOUR,
        yield: 640,
        rareDrop: [
            {name: 'farm_potatoWater', type: 'consumable', chance: 0.15, value: 3}
        ],
        tier: 4,
        type: 'vegetable'
    },
    raspberry: {
        icon: 'mdi-fruit-grapes',
        color: 'pink',
        cost: {farm_gold: 1},
        grow: 6 * MINUTES_PER_HOUR,
        yield: 300,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.2, value: 6}
        ],
        tier: 5,
        type: 'berry'
    },
    barley: {
        icon: 'mdi-barley',
        color: 'amber',
        grow: 10 * MINUTES_PER_HOUR,
        yield: 230,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.06, value: 1}
        ],
        tier: 6,
        type: 'grain'
    },
    dandelion: {
        icon: 'mdi-flower',
        color: 'pale-yellow',
        cost: {farm_gold: 1},
        grow: 1 * MINUTES_PER_HOUR + 30,
        yield: 160,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.15, value: 2}
        ],
        tier: 7,
        type: 'flower'
    },
    corn: {
        icon: 'mdi-corn',
        color: 'amber',
        cost: {farm_grass: 10},
        grow: 30 * MINUTES_PER_HOUR,
        yield: 550,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.02, value: 2}
        ],
        tier: 8,
        type: 'vegetable'
    },
    watermelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'red',
        cost: {farm_gold: 4},
        grow: 12 * MINUTES_PER_HOUR,
        yield: 1100,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.1, value: 10},
            {name: 'farm_butterfly', type: 'currency', chance: -0.02, value: 2}
        ],
        tier: 9,
        type: 'berry'
    },
    rice: {
        icon: 'mdi-rice',
        color: 'light-grey',
        cost: {farm_gold: 2},
        grow: 24 * MINUTES_PER_HOUR,
        yield: 1200,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.05, value: 12},
            {name: 'farm_ladybug', type: 'currency', chance: -0.05, value: 4}
        ],
        tier: 10,
        type: 'grain'
    },
    rose: {
        icon: 'mdi-flower',
        color: 'red',
        cost: {farm_gold: 10},
        grow: 48 * MINUTES_PER_HOUR,
        yield: 4500,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0, value: 12},
            {name: 'farm_ladybug', type: 'currency', chance: -0.08, value: 10},
            {name: 'farm_roseWater', type: 'consumable', chance: -0.12, value: 8}
        ],
        tier: 11,
        type: 'flower'
    },
    leek: {
        icon: 'mdi-leek',
        color: 'light-green',
        cost: {farm_gold: 5},
        grow: 3 * MINUTES_PER_HOUR,
        yield: 780,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.1, value: 3},
            {name: 'farm_ladybug', type: 'currency', chance: -0.15, value: 3}
        ],
        tier: 12,
        type: 'vegetable'
    },
    honeymelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'amber',
        grow: 42 * MINUTES_PER_HOUR,
        yield: 800,
        rareDrop: [
            {name: 'farm_butterfly', type: 'currency', chance: -0.12, value: 2},
            {name: 'farm_spider', type: 'currency', chance: -0.3, value: 1, mult: 0.5}
        ],
        tier: 13,
        type: 'berry'
    },
    rye: {
        icon: 'mdi-barley',
        color: 'pale-orange',
        cost: {farm_gold: 3},
        grow: 7 * MINUTES_PER_HOUR,
        yield: 875,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: -0.16, value: 20},
            {name: 'farm_spider', type: 'currency', chance: -0.25, value: 1, mult: 0.5}
        ],
        tier: 14,
        type: 'grain'
    },
    daisy: {
        icon: 'mdi-flower',
        color: 'yellow',
        cost: {farm_gold: 8},
        grow: 14 * MINUTES_PER_HOUR,
        yield: 2350,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: -0.18, value: 12},
            {name: 'farm_butterfly', type: 'currency', chance: -0.21, value: 10},
            {name: 'farm_bee', type: 'currency', chance: -0.25, value: 10}
        ],
        tier: 15,
        type: 'flower'
    },
    cucumber: {
        icon: 'mdi-ruler',
        color: 'pale-green',
        cost: {farm_gold: 6},
        grow: 2 * MINUTES_PER_HOUR + 30,
        yield: 1000,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.24, value: 4}
        ],
        tier: 16,
        type: 'vegetable'
    },
    grapes: {
        icon: 'mdi-fruit-grapes',
        color: 'purple',
        cost: {farm_gold: 9},
        grow: 5 * MINUTES_PER_HOUR,
        yield: 1700,
        rareDrop: [
            {name: 'farm_ladybug', type: 'currency', chance: -0.23, value: 7},
            {name: 'farm_bee', type: 'currency', chance: -0.28, value: 10}
        ],
        tier: 17,
        type: 'berry'
    },
    hops: {
        icon: 'mdi-hops',
        color: 'green',
        cost: {farm_gold: 5},
        grow: 1 * MINUTES_PER_HOUR + 15,
        yield: 550,
        rareDrop: [
            {name: 'farm_spider', type: 'currency', chance: -0.32, value: 1, mult: 0.5}
        ],
        tier: 18,
        type: 'grain'
    },
    violet: {
        icon: 'mdi-flower',
        color: 'deep-purple',
        cost: {farm_petal: 5},
        grow: 36 * MINUTES_PER_HOUR,
        yield: 970,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: -0.3, value: 3},
            {name: 'farm_bee', type: 'currency', chance: -0.33, value: 3}
        ],
        tier: 19,
        type: 'flower'
    },
    goldenRose: {
        icon: 'mdi-flower',
        color: 'amber',
        cost: {farm_gold: 100},
        grow: 168 * MINUTES_PER_HOUR,
        yield: buildNum(64, 'K'),
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: -0.1, value: 30},
            {name: 'farm_goldenPetal', type: 'currency', chance: -0.4, value: 1, mult: 0.05},
            {name: 'farm_roseWater', type: 'consumable', chance: -0.45, value: 100}
        ],
        tier: 20,
        type: 'flower'
    },
    sweetPotato: {
        icon: 'mdi-circle',
        color: 'beige',
        cost: {farm_gold: 8},
        grow: 11 * MINUTES_PER_HOUR + 30,
        yield: 3300,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.36, value: 8}
        ],
        tier: 20,
        type: 'vegetable'
    },
    strawberry: {
        icon: 'mdi-fruit-grapes',
        color: 'red',
        cost: {farm_butterfly: 1},
        grow: 27 * MINUTES_PER_HOUR,
        yield: 875,
        rareDrop: [
            {name: 'farm_ladybug', type: 'currency', chance: -0.4, value: 8},
            {name: 'farm_bee', type: 'currency', chance: -0.45, value: 5}
        ],
        tier: 21,
        type: 'berry'
    },
    sesame: {
        icon: 'mdi-grain',
        color: 'pale-orange',
        cost: {farm_gold: 5, farm_seedHull: 25},
        grow: 4 * MINUTES_PER_HOUR + 30,
        yield: 1500,
        rareDrop: [
            {name: 'farm_smallSeed', type: 'currency', chance: -0.48, value: 3},
            {name: 'farm_spider', type: 'currency', chance: -0.51, value: 1, mult: 0.5}
        ],
        tier: 22,
        type: 'grain'
    },
    sunflower: {
        icon: 'mdi-flower-outline',
        color: 'brown',
        cost: {farm_gold: 14},
        grow: 28 * MINUTES_PER_HOUR,
        yield: 8300,
        rareDrop: [
            {name: 'farm_smallSeed', type: 'currency', chance: -0.5, value: 15},
            {name: 'farm_petal', type: 'currency', chance: -0.53, value: 4}
        ],
        tier: 23,
        type: 'flower'
    },
    spinach: {
        icon: 'mdi-flower-poppy',
        color: 'green',
        cost: {farm_gold: 3, farm_grass: 100},
        grow: 5 * MINUTES_PER_HOUR + 45,
        yield: 1425,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: -0.55, value: 3}
        ],
        tier: 24,
        type: 'vegetable'
    },
}
