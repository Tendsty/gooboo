import { MINUTES_PER_HOUR } from "../../constants";

export default {
    carrot: {
        found: true,
        icon: 'mdi-carrot',
        color: 'orange',
        grow: MINUTES_PER_HOUR + 30,
        tier: 0,
        type: 'vegetable'
    },
    blueberry: {
        icon: 'mdi-fruit-grapes',
        color: 'blue',
        grow: 3 * MINUTES_PER_HOUR,
        tier: 1,
        type: 'fruit'
    },
    wheat: {
        icon: 'mdi-barley',
        color: 'yellow',
        grow: 6 * MINUTES_PER_HOUR,
        tier: 2,
        type: 'grain'
    },
    tulip: {
        icon: 'mdi-flower-tulip',
        color: 'red',
        grow: 12 * MINUTES_PER_HOUR,
        tier: 3,
        type: 'flower'
    },
    potato: {
        icon: 'mdi-circle',
        color: 'brown',
        cost: 1,
        grow: 30 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_potatoWater', type: 'consumable', chance: 0.15, value: 5}
        ],
        tier: 4,
        type: 'vegetable'
    },
    raspberry: {
        icon: 'mdi-fruit-grapes',
        color: 'pink',
        cost: 1,
        grow: 16 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.35, value: 3}
        ],
        tier: 5,
        type: 'fruit'
    },
    barley: {
        icon: 'mdi-barley',
        color: 'amber',
        grow: 20 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.08, value: 1}
        ],
        tier: 6,
        type: 'grain'
    },
    dandelion: {
        icon: 'mdi-flower',
        color: 'pale-yellow',
        cost: 1,
        grow: 2 * MINUTES_PER_HOUR + 30,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.24, value: 1}
        ],
        tier: 7,
        type: 'flower'
    },
    corn: {
        icon: 'mdi-corn',
        color: 'amber',
        grow: 52 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.05, value: 2}
        ],
        tier: 8,
        type: 'vegetable'
    },
    watermelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'red',
        cost: 4,
        grow: 40 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.16, value: 5},
            {name: 'farm_butterfly', type: 'currency', chance: 0.18, value: 1}
        ],
        tier: 9,
        type: 'fruit'
    },
    rice: {
        icon: 'mdi-rice',
        color: 'light-grey',
        cost: 2,
        grow: 72 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.22, value: 7},
            {name: 'farm_ladybug', type: 'currency', chance: 0.01, value: 1}
        ],
        tier: 10,
        type: 'grain'
    },
    rose: {
        icon: 'mdi-flower',
        color: 'red',
        cost: 10,
        grow: 156 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.16, value: 8},
            {name: 'farm_ladybug', type: 'currency', chance: 0.02, value: 1},
            {name: 'farm_roseWater', type: 'consumable', chance: 0.1, value: 10}
        ],
        tier: 11,
        type: 'flower'
    },
    leek: {
        icon: 'mdi-leek',
        color: 'light-green',
        cost: 5,
        grow: 9 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.225, value: 1},
            {name: 'farm_ladybug', type: 'currency', chance: 0.35, value: 2}
        ],
        tier: 12,
        type: 'vegetable'
    },
    honeymelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'amber',
        grow: 64 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_butterfly', type: 'currency', chance: 0.06, value: 1},
            {name: 'farm_spider', type: 'currency', chance: -0.08, value: 1}
        ],
        tier: 13,
        type: 'fruit'
    },
    rye: {
        icon: 'mdi-barley',
        color: 'pale-orange',
        cost: 3,
        grow: 34 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_seedHull', type: 'currency', chance: 0.19, value: 12},
            {name: 'farm_spider', type: 'currency', chance: -0.02, value: 1}
        ],
        tier: 14,
        type: 'grain'
    },
    daisy: {
        icon: 'mdi-flower',
        color: 'yellow',
        cost: 8,
        grow: 44 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.13, value: 6},
            {name: 'farm_butterfly', type: 'currency', chance: 0.14, value: 5},
            {name: 'farm_bee', type: 'currency', chance: 0.5, value: 1}
        ],
        tier: 15,
        type: 'flower'
    },
    cucumber: {
        icon: 'mdi-ruler',
        color: 'pale-green',
        cost: 6,
        grow: 4 * MINUTES_PER_HOUR + 45,
        rareDrop: [
            {name: 'farm_bug', type: 'currency', chance: 0.33, value: 1}
        ],
        tier: 16,
        type: 'vegetable'
    },
    grapes: {
        icon: 'mdi-fruit-grapes',
        color: 'purple',
        cost: 9,
        grow: 7 * MINUTES_PER_HOUR + 30,
        rareDrop: [
            {name: 'farm_ladybug', type: 'currency', chance: 0.25, value: 3},
            {name: 'farm_bee', type: 'currency', chance: 0.2, value: 1}
        ],
        tier: 17,
        type: 'fruit'
    },
    hops: {
        icon: 'mdi-hops',
        color: 'green',
        cost: 5,
        grow: 2 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_bee', type: 'currency', chance: 0.12, value: 1},
            {name: 'farm_spider', type: 'currency', chance: -0.01, value: 1}
        ],
        tier: 18,
        type: 'grain'
    },
    violet: {
        icon: 'mdi-flower',
        color: 'deep-purple',
        grow: 116 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.08, value: 1},
            {name: 'farm_bee', type: 'currency', chance: 0.01, value: 1}
        ],
        tier: 19,
        type: 'flower'
    },
    goldenRose: {
        icon: 'mdi-flower',
        color: 'amber',
        cost: 100,
        grow: 720 * MINUTES_PER_HOUR,
        rareDrop: [
            {name: 'farm_petal', type: 'currency', chance: 0.55, value: 10},
            {name: 'farm_goldenPetal', type: 'currency', chance: 0.225, value: 1},
            {name: 'farm_roseWater', type: 'consumable', chance: 0.1, value: 100}
        ],
        tier: 20,
        type: 'flower'
    },
}
