export default {
    basic: {
        found: true,
        type: 'all',
        color: 'brown',
        price: {farm_gold: 1},
        effect: {yield: 1.15, grow: 1.2}
    },
    flower: {
        found: true,
        type: 'flower',
        color: 'pink',
        price: {farm_gold: 3},
        effect: {grow: 2.5}
    },
    speedGrow: {
        found: true,
        type: 'all',
        color: 'blue',
        price: {gem_sapphire: 1},
        effect: {grow: 1.75}
    },
    richSoil: {
        found: true,
        type: 'all',
        color: 'green',
        price: {gem_sapphire: 1},
        effect: {yield: 1.4}
    },
    shiny: {
        found: true,
        type: 'all',
        color: 'amber',
        price: {gem_sapphire: 1},
        effect: {gold: 1.75, drop: 0.05}
    },
    potatoWater: {
        type: 'vegetable',
        color: 'indigo',
        effect: {yield: 1.2}
    },
    roseWater: {
        type: 'flower',
        color: 'red-pink',
        effect: {yield: 1.15, gold: 1.1}
    },
    weedKiller: {
        type: 'grain',
        color: 'beige',
        price: {farm_gold: 4},
        effect: {yield: 1.5, grow: 1.4, drop: -0.1}
    },
    turboGrow: {
        type: 'all',
        color: 'red',
        price: {gem_sapphire: 1},
        effect: {yield: 0.75, grow: 5, gold: 0.75, drop: -0.1}
    },
    premium: {
        type: 'all',
        color: 'purple',
        price: {gem_sapphire: 2},
        effect: {yield: 1.25, grow: 1.4, gold: 1.3, drop: 0.05}
    },
    sunshine: {
        type: 'all',
        color: 'yellow',
        effect: {gold: 3.5, drop: 0.05}
    },
    superFlower: {
        type: 'flower',
        color: 'orange-red',
        effect: {yield: 2.25, grow: 1.25, gold: 1.5}
    },
    smellyMud: {
        type: 'vegetable',
        color: 'brown',
        effect: {yield: 2.5, gold: 1.5, drop: 0.05}
    },
    tropicalWater: {
        type: 'fruit',
        icon: 'mdi-flask-round-bottom',
        color: 'cyan',
        effect: {grow: 2, gold: 2.5, drop: 0.05}
    },
    fieldBlessing: {
        type: 'grain',
        icon: 'mdi-auto-fix',
        color: 'pink-purple',
        effect: {grow: 3, gold: 2}
    },
    cinnamonBag: {
        type: 'all',
        color: 'brown',
        effect: {yield: 1.8, gold: 2}
    },
}
