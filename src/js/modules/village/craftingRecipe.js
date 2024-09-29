import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    // Base recipes
    rope: {
        icon: 'mdi-lasso',
        color: 'beige',
        price: {village_plantFiber: buildNum(100, 'K')},
        value: 10,
        timeNeeded: 60,
        milestone: {
            100: {type: 'villageCraft', name: 'pouch', value: true},
            750: {type: 'changeStat', name: 'timeNeeded', value: 40},
            4800: {type: 'changeStat', name: 'value', value: 14},
            27000: {type: 'changeStat', name: 'timeNeeded', value: 30},
        }
    },
    woodenPlanks: {
        icon: 'mdi-view-dashboard-variant',
        color: 'brown',
        price: {village_wood: buildNum(250, 'K')},
        value: 22,
        timeNeeded: 120,
        milestone: {
            60: {type: 'changeStat', name: 'timeNeeded', value: 90},
            450: {type: 'villageCraft', name: 'cupboard', value: true},
            3200: {type: 'changeStat', name: 'value', value: 30},
            16500: {type: 'changeStat', name: 'timeNeeded', value: 75},
        }
    },
    brick: {
        icon: 'mdi-wall',
        color: 'cherry',
        price: {village_stone: buildNum(600, 'K')},
        value: 48,
        timeNeeded: 240,
        milestone: {
            40: {type: 'changeStat', name: 'value', value: 66},
            300: {type: 'changeStat', name: 'timeNeeded', value: 180},
            2000: {type: 'villageCraft', name: 'weight', value: true},
            12000: {type: 'changeStat', name: 'value', value: 84},
        }
    },
    screws: {
        icon: 'mdi-screw-flat-top',
        color: 'light-grey',
        price: {village_metal: buildNum(800, 'K')},
        value: 25,
        timeNeeded: 120,
        milestone: {
            100: {type: 'changeStat', name: 'value', value: 34},
            550: {type: 'changeStat', name: 'timeNeeded', value: 100},
            4400: {type: 'villageCraft', name: 'scissors', value: true},
            21000: {type: 'changeStat', name: 'value', value: 44},
        }
    },
    waterBottle: {
        icon: 'mdi-bottle-soda',
        color: 'blue',
        price: {village_water: buildNum(1.5, 'M')},
        value: 15,
        timeNeeded: 70,
        milestone: {
            300: {type: 'changeStat', name: 'timeNeeded', value: 50},
            1700: {type: 'changeStat', name: 'timeNeeded', value: 35},
            9250: {type: 'villageCraft', name: 'herbTea', value: true},
            53000: {type: 'changeStat', name: 'timeNeeded', value: 25},
        }
    },
    cocktailGlass: {
        icon: 'mdi-glass-cocktail',
        color: 'light-blue',
        price: {village_glass: buildNum(2.5, 'M')},
        value: 50,
        timeNeeded: 210,
        milestone: {
            45: {type: 'changeStat', name: 'value', value: 67},
            360: {type: 'changeStat', name: 'timeNeeded', value: 180},
            2500: {type: 'villageCraft', name: 'glasses', value: true},
            14500: {type: 'changeStat', name: 'value', value: 86},
        }
    },
    boomerang: {
        icon: 'mdi-boomerang',
        color: 'cherry',
        price: {village_hardwood: buildNum(4, 'M')},
        value: 38,
        timeNeeded: 140,
        milestone: {
            45: {type: 'changeStat', name: 'value', value: 51},
            360: {type: 'changeStat', name: 'timeNeeded', value: 120},
            // 2500: {type: 'villageCraft', name: 'weight', value: true},
            14500: {type: 'changeStat', name: 'value', value: 65},
        }
    },
    polishedGem: {
        icon: 'mdi-diamond-stone',
        color: 'cyan',
        price: {village_gem: buildNum(6.5, 'M')},
        value: 36,
        timeNeeded: 160,
        milestone: {
            55: {type: 'changeStat', name: 'value', value: 47},
            380: {type: 'changeStat', name: 'timeNeeded', value: 140},
            // 2475: {type: 'villageCraft', name: 'weight', value: true},
            13500: {type: 'changeStat', name: 'value', value: 60},
        }
    },
    oilLamp: {
        icon: 'mdi-oil-lamp',
        color: 'pale-orange',
        price: {village_oil: buildNum(10, 'M')},
        value: 51,
        timeNeeded: 270,
        milestone: {
            40: {type: 'changeStat', name: 'value', value: 65},
            330: {type: 'changeStat', name: 'timeNeeded', value: 225},
            // 2100: {type: 'villageCraft', name: 'weight', value: true},
            12400: {type: 'changeStat', name: 'value', value: 82},
        }
    },
    shower: {
        icon: 'mdi-shower',
        color: 'pale-blue',
        price: {village_marble: buildNum(15, 'M')},
        value: 70,
        timeNeeded: 360,
        milestone: {
            40: {type: 'changeStat', name: 'timeNeeded', value: 300},
            330: {type: 'changeStat', name: 'value', value: 90},
            // 2100: {type: 'villageCraft', name: 'weight', value: true},
            12400: {type: 'changeStat', name: 'timeNeeded', value: 250},
        }
    },

    // Advanced recipes
    pouch: {
        icon: 'mdi-sack',
        color: 'pale-orange',
        price: {village_plantFiber: buildNum(1, 'M')},
        value: 18,
        timeNeeded: 90,
        milestone: {
            80: {type: 'changeStat', name: 'value', value: 26},
            600: {type: 'changeStat', name: 'timeNeeded', value: 70},
            4000: {type: 'changeStat', name: 'value', value: 35},
            22000: {type: 'changeStat', name: 'timeNeeded', value: 60},
        }
    },
    cupboard: {
        icon: 'mdi-cupboard',
        color: 'wooden',
        price: {village_wood: buildNum(3, 'M')},
        value: 33,
        timeNeeded: 150,
        milestone: {
            50: {type: 'changeStat', name: 'value', value: 42},
            400: {type: 'changeStat', name: 'timeNeeded', value: 125},
            2800: {type: 'changeStat', name: 'value', value: 52},
            15000: {type: 'changeStat', name: 'timeNeeded', value: 100},
        }
    },
    weight: {
        icon: 'mdi-weight',
        color: 'dark-grey',
        price: {village_stone: buildNum(7, 'M')},
        value: 65,
        timeNeeded: 300,
        milestone: {
            50: {type: 'changeStat', name: 'value', value: 87},
            400: {type: 'changeStat', name: 'timeNeeded', value: 255},
            2800: {type: 'villageCraft', name: 'handSaw', value: true},
            15000: {type: 'changeStat', name: 'timeNeeded', value: 210},
        }
    },
    scissors: {
        icon: 'mdi-content-cut',
        color: 'light-grey',
        price: {village_metal: buildNum(8, 'M'), village_wood: buildNum(3, 'M')},
        value: 30,
        timeNeeded: 125,
        milestone: {
            55: {type: 'changeStat', name: 'timeNeeded', value: 110},
            420: {type: 'changeStat', name: 'value', value: 40},
            3100: {type: 'changeStat', name: 'timeNeeded', value: 100},
            17000: {type: 'changeStat', name: 'value', value: 50},
        }
    },
    herbTea: {
        icon: 'mdi-tea',
        color: 'green',
        price: {village_water: buildNum(12, 'M'), village_plantFiber: buildNum(5, 'M')},
        value: 54,
        timeNeeded: 200,
        milestone: {
            48: {type: 'changeStat', name: 'value', value: 78},
            380: {type: 'changeStat', name: 'value', value: 106},
            2600: {type: 'changeStat', name: 'timeNeeded', value: 170},
            14000: {type: 'changeStat', name: 'value', value: 140},
        }
    },
    glasses: {
        icon: 'mdi-glasses',
        color: 'red-pink',
        price: {village_glass: buildNum(14, 'M'), village_metal: buildNum(11, 'M')},
        value: 21,
        timeNeeded: 80,
        milestone: {
            100: {type: 'changeStat', name: 'timeNeeded', value: 65},
            750: {type: 'changeStat', name: 'value', value: 28},
            5400: {type: 'changeStat', name: 'timeNeeded', value: 55},
            30000: {type: 'changeStat', name: 'timeNeeded', value: 45},
        }
    },

    // Book recipes
    arrows: {
        icon: 'mdi-arrow-projectile-multiple',
        color: 'wooden',
        price: {village_wood: buildNum(1.25, 'M'), village_stone: buildNum(400, 'K')},
        value: 21,
        timeNeeded: 100,
        milestone: {
            85: {type: 'changeStat', name: 'timeNeeded', value: 85},
            400: {type: 'changeStat', name: 'timeNeeded', value: 70},
            // 2200: {type: 'villageCraft', name: 'weight', value: true},
            10000: {type: 'changeStat', name: 'timeNeeded', value: 60},
            // 47500: {type: 'villageCraft', name: 'weight', value: true},
        }
    },
    bowl: {
        icon: 'mdi-bowl',
        color: 'brown',
        price: {village_wood: buildNum(2.5, 'M')},
        value: 25,
        timeNeeded: 130,
        milestone: {
            90: {type: 'changeStat', name: 'timeNeeded', value: 100},
            675: {type: 'villageCraft', name: 'bush', value: true},
            4800: {type: 'changeStat', name: 'value', value: 34},
            25000: {type: 'changeStat', name: 'timeNeeded', value: 80},
        }
    },
    chain: {
        icon: 'mdi-link-variant',
        color: 'light-grey',
        price: {village_plantFiber: buildNum(3, 'M'), village_metal: buildNum(1.35, 'M')},
        value: 19,
        timeNeeded: 70,
        milestone: {
            140: {type: 'changeStat', name: 'timeNeeded', value: 60},
            875: {type: 'villageCraft', name: 'garage', value: true},
            4300: {type: 'changeStat', name: 'value', value: 25},
            23000: {type: 'changeStat', name: 'timeNeeded', value: 50},
        }
    },
    spear: {
        icon: 'mdi-spear',
        color: 'dark-grey',
        price: {village_wood: buildNum(8, 'M'), village_metal: buildNum(1.75, 'M')},
        value: 26,
        timeNeeded: 120,
        milestone: {
            110: {type: 'changeStat', name: 'timeNeeded', value: 95},
            800: {type: 'changeStat', name: 'value', value: 35},
            5750: {type: 'changeStat', name: 'timeNeeded', value: 75},
            28000: {type: 'changeStat', name: 'value', value: 45},
        }
    },
    goldenRing: {
        icon: 'mdi-circle-outline',
        color: 'amber',
        price: {village_metal: buildNum(5, 'M'), village_water: buildNum(750, 'K')},
        value: 140,
        timeNeeded: 600,
        milestone: {
            30: {type: 'changeStat', name: 'value', value: 188},
            225: {type: 'changeStat', name: 'value', value: 239},
            1800: {type: 'changeStat', name: 'value', value: 295},
        }
    },

    // Special ingredient recipes
    poisonedArrows: {
        icon: 'mdi-arrow-projectile-multiple',
        color: 'light-green',
        price: {craft_arrows: 5, village_acidVial: 1},
        prio: 1,
        value: 850,
        timeNeeded: 600,
        milestone: {
            120: {type: 'changeStat', name: 'value', value: 1100},
            700: {type: 'changeStat', name: 'value', value: 1400},
            5000: {type: 'changeStat', name: 'timeNeeded', value: 300},
        }
    },
    frostSpear: {
        icon: 'mdi-spear',
        color: 'cyan',
        price: {craft_spear: 10, village_snowflake: 1},
        prio: 1,
        value: 2200,
        timeNeeded: 1500,
        milestone: {
            55: {type: 'changeStat', name: 'value', value: 3000},
            300: {type: 'changeStat', name: 'value', value: 3950},
            2350: {type: 'changeStat', name: 'value', value: 5100},
        }
    },
    spicySoup: {
        icon: 'mdi-pot-steam',
        color: 'orange-red',
        price: {craft_bowl: 15, village_plantFiber: buildNum(250, 'M'), village_water: buildNum(35, 'M'), village_chiliBundle: 1},
        prio: 1,
        value: 2550,
        timeNeeded: 75,
        milestone: {
            40: {type: 'changeStat', name: 'value', value: 3400},
            240: {type: 'changeStat', name: 'value', value: 4500},
            1900: {type: 'changeStat', name: 'value', value: 5750},
        }
    },
    stopwatch: {
        icon: 'mdi-timer',
        color: 'pale-blue',
        price: {craft_screws: 20, village_metal: buildNum(1.44, 'B'), village_gears: 1},
        prio: 1,
        value: 8600,
        timeNeeded: 3600,
        milestone: {
            65: {type: 'changeStat', name: 'timeNeeded', value: 1800},
            335: {type: 'changeStat', name: 'value', value: buildNum(12.5, 'K')},
        }
    },

    // Random recipes

    // Special recipes
    smallChest: {
        icon: 'mdi-treasure-chest',
        color: 'pale-yellow',
        price: {
            craft_rope: lvl => Math.pow(2, lvl) * 60,
            craft_woodenPlanks: lvl => Math.pow(2, lvl) * 30,
            craft_brick: lvl => Math.pow(2, lvl) * 15,
            craft_screws: lvl => Math.pow(2, lvl) * 25
        },
        prio: 1,
        isSpecial: true,
        effect: [
            {name: 'villageMaterialCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
        ],
        timeNeeded: 7200
    },
    bush: {
        icon: 'mdi-nature',
        color: 'green',
        price: {
            village_water: lvl => Math.pow(1.25, lvl) * buildNum(500, 'K'),
            craft_pouch: lvl => getSequence(5, lvl + 1) * 8,
            craft_bowl: lvl => getSequence(2, lvl + 1) * 10
        },
        prio: 1,
        isSpecial: true,
        effect: [
            {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'currencyVillagePlantFiberCap', type: 'base', value: lvl => getSequence(2, lvl) * 500}
        ],
        timeNeeded: 3600
    },
    handSaw: {
        icon: 'mdi-hand-saw',
        color: 'light-grey',
        price: {
            village_metal: lvl => Math.pow(1.25, lvl) * buildNum(1.8, 'M'),
            craft_weight: lvl => getSequence(3, lvl + 1) * 15
        },
        prio: 1,
        isSpecial: true,
        effect: [
            {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'currencyVillageWoodCap', type: 'base', value: lvl => getSequence(2, lvl) * 500}
        ],
        timeNeeded: 3600
    },
    garage: {
        icon: 'mdi-garage-open-variant',
        color: 'dark-grey',
        price: {
            village_wood: lvl => Math.pow(1.25, lvl) * buildNum(14, 'M'),
            craft_chain: lvl => getSequence(3, lvl + 1) * 15
        },
        prio: 1,
        isSpecial: true,
        effect: [
            {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'currencyVillageStoneCap', type: 'base', value: lvl => getSequence(2, lvl) * 500}
        ],
        timeNeeded: 3600
    },

    diamondRing: {
        icon: 'mdi-ring',
        color: 'cyan',
        price: {
            village_metal: lvl => Math.pow(1.25, lvl) * buildNum(14, 'M'),
            village_gem: lvl => Math.pow(1.25, lvl) * buildNum(2, 'M'),
            craft_goldenRing: lvl => getSequence(2, lvl) * 5
        },
        prio: 1,
        isSpecial: true,
        effect: [
            {name: 'currencyVillageCoinGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
            {name: 'currencyVillageCopperCoinGain', type: 'mult', value: lvl => lvl * 0.2 + 1},
        ],
        timeNeeded: 14400
    },
}
