export default {
    carrot: {
        found: true,
        icon: 'mdi-carrot',
        color: 'orange',
        grow: 5,
        tier: 0,
        type: 'vegetable'
    },
    blueberry: {
        icon: 'mdi-fruit-grapes',
        color: 'blue',
        grow: 15,
        tier: 1,
        type: 'fruit'
    },
    wheat: {
        icon: 'mdi-barley',
        color: 'yellow',
        grow: 30,
        tier: 2,
        type: 'grain'
    },
    tulip: {
        icon: 'mdi-flower-tulip',
        color: 'red',
        grow: 60,
        tier: 3,
        type: 'flower'
    },
    potato: {
        icon: 'mdi-circle',
        color: 'brown',
        cost: 1,
        grow: 480,
        rareDrop: [
            {name: 'farm_potatoWater', type: 'consumable', chance: 0.15, value: 5}
        ],
        tier: 4,
        type: 'vegetable'
    },
    raspberry: {
        icon: 'mdi-fruit-grapes',
        color: 'pink',
        grow: 180,
        rareDrop: [
            {name: 'seedHull', type: 'currency', chance: 0.2, value: 2}
        ],
        tier: 5,
        type: 'fruit'
    },
    barley: {
        icon: 'mdi-barley',
        color: 'amber',
        grow: 360,
        rareDrop: [
            {name: 'seedHull', type: 'currency', chance: 0.2, value: 3}
        ],
        tier: 6,
        type: 'grain'
    },
    dandelion: {
        icon: 'mdi-flower',
        color: 'pale-yellow',
        grow: 20,
        rareDrop: [
            {name: 'petal', type: 'currency', chance: 0.05, value: 1}
        ],
        tier: 7,
        type: 'flower'
    },
    corn: {
        icon: 'mdi-corn',
        color: 'amber',
        grow: 1200,
        rareDrop: [
            {name: 'bug', type: 'currency', chance: 0.2, value: 6}
        ],
        tier: 8,
        type: 'vegetable'
    },
    watermelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'red',
        cost: 4,
        grow: 720,
        rareDrop: [
            {name: 'bug', type: 'currency', chance: 0.16, value: 3},
            {name: 'butterfly', type: 'currency', chance: 0.18, value: 1}
        ],
        tier: 9,
        type: 'fruit'
    },
    rice: {
        icon: 'mdi-rice',
        color: 'light-grey',
        cost: 2,
        grow: 1800,
        rareDrop: [
            {name: 'seedHull', type: 'currency', chance: 0.22, value: 7},
            {name: 'ladybug', type: 'currency', chance: 0.01, value: 1}
        ],
        tier: 10,
        type: 'grain'
    },
    rose: {
        icon: 'mdi-flower',
        color: 'red',
        cost: 10,
        grow: 2880,
        rareDrop: [
            {name: 'petal', type: 'currency', chance: 0.16, value: 8},
            {name: 'ladybug', type: 'currency', chance: 0.02, value: 1},
            {name: 'farm_roseWater', type: 'consumable', chance: 0.1, value: 10}
        ],
        tier: 11,
        type: 'flower'
    },
    leek: {
        icon: 'mdi-leek',
        color: 'light-green',
        cost: 5,
        grow: 180,
        rareDrop: [
            {name: 'bug', type: 'currency', chance: 0.175, value: 1},
            {name: 'ladybug', type: 'currency', chance: 0.35, value: 2}
        ],
        tier: 12,
        type: 'vegetable'
    },
    honeymelon: {
        icon: 'mdi-fruit-watermelon',
        color: 'amber',
        grow: 2160,
        rareDrop: [
            {name: 'butterfly', type: 'currency', chance: 0.11, value: 4},
            {name: 'spider', type: 'currency', chance: -0.03, value: 1}
        ],
        tier: 13,
        type: 'fruit'
    },
    rye: {
        icon: 'mdi-barley',
        color: 'pale-orange',
        cost: 3,
        grow: 900,
        rareDrop: [
            {name: 'seedHull', type: 'currency', chance: 0.19, value: 12},
            {name: 'spider', type: 'currency', chance: -0.02, value: 1}
        ],
        tier: 14,
        type: 'grain'
    },
    daisy: {
        icon: 'mdi-flower',
        color: 'yellow',
        grow: 1440,
        rareDrop: [
            {name: 'butterfly', type: 'currency', chance: 0.14, value: 5},
            {name: 'bee', type: 'currency', chance: 0.5, value: 1}
        ],
        tier: 15,
        type: 'flower'
    },
    cucumber: {
        icon: 'mdi-ruler',
        color: 'pale-green',
        grow: 45,
        rareDrop: [],
        tier: 16,
        type: 'vegetable'
    },
    grapes: {
        icon: 'mdi-fruit-grapes',
        color: 'purple',
        grow: 420,
        rareDrop: [],
        tier: 17,
        type: 'fruit'
    },
    hops: {
        icon: 'mdi-hops',
        color: 'green',
        grow: 150,
        rareDrop: [],
        tier: 18,
        type: 'grain'
    },
    violet: {
        icon: 'mdi-flower',
        color: 'deep-purple',
        grow: 600,
        rareDrop: [],
        tier: 19,
        type: 'flower'
    },
    goldenRose: {
        icon: 'mdi-flower',
        color: 'amber',
        cost: 100,
        grow: 4320,
        rareDrop: [
            {name: 'petal', type: 'currency', chance: 0.55, value: 10},
            {name: 'goldenPetal', type: 'currency', chance: 0.225, value: 1},
            {name: 'farm_roseWater', type: 'consumable', chance: 0.1, value: 100}
        ],
        tier: 20,
        type: 'flower'
    },
}
