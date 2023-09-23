import { fallbackArray } from "../../../utils/array";
import { buildNum } from "../../../utils/format";
import { getSequence } from "../../../utils/math";

export default {
    // Default buildings
    collector: {
        icon: 'mdi-warehouse',
        price(lvl) {
            return {event_log: Math.pow(6, lvl) * 750};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.35, lvl) * 180),
        effect: [
            {name: 'autocollectMult', type: 'summerFestivalBuildingMult', value: lvl => getSequence(0, lvl + 2) * 0.3 + 1}
        ]
    },
    mainStage: {
        icon: 'mdi-boombox',
        shape: {0: 'land', 1: 'land', 2: 'land', 3: 'land', 4: 'land'},
        maxAmount: 1,
        price(lvl) {
            return fallbackArray([
                {event_log: 4500, event_coconut: 3000},
                {event_log: buildNum(500, 'K'), event_shell: buildNum(200, 'K'), event_solidPlate: 750},
                {event_log: buildNum(200, 'M'), event_solidPlate: buildNum(10, 'K'), event_sandstone: buildNum(30, 'K')},
                {event_log: buildNum(80, 'B'), event_solidPlate: buildNum(150, 'K'), event_hardSteel: 500},
            ], {event_log: Math.pow(600, lvl) * buildNum(50, 'T'), event_compositePlate: Math.pow(12, lvl) * 100}, lvl);
        },
        timeNeeded: lvl => Math.pow(3, lvl) * 900,
        effect: [
            {name: 'currencyEventMusicGain', type: 'base', value: lvl => Math.pow(2, lvl)},
        ]
    },

    // Level 1 buildings
    speaker: {
        icon: 'mdi-speaker',
        stageLevel: 1,
        price(lvl) {
            return {event_log: Math.pow(25, lvl) * buildNum(10, 'K'), event_coconut: Math.pow(25, lvl) * 3000};
        },
        timeNeeded: lvl => Math.pow(2, lvl) * 600,
        effect: [
            {name: 'currencyEventMusicGain', type: 'base', value: lvl => Math.pow(2, lvl) * 0.5},
        ]
    },
    vegetablePatch: {
        icon: 'mdi-sprout',
        stageLevel: 1,
        shape: {0: 'land', 1: 'land', 4: 'land'},
        price(lvl) {
            return {event_log: Math.pow(12, lvl) * buildNum(37.5, 'K')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 1500),
        effect: [
            {name: 'currencyEventVegetableGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.05},
        ]
    },
    sawmill: {
        icon: 'mdi-saw-blade',
        stageLevel: 1,
        shape: {0: 'land', 1: 'land'},
        price(lvl) {
            return {event_stoneBlock: Math.pow(16, lvl) * buildNum(440, 'K')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 1800),
        action: {
            cutPlates: {icon: 'mdi-layers', input: {event_log: 1000, event_stoneBlock: 800}, output: {event_solidPlate: 1}, minLevel: 1, speed: lvl => Math.pow(2, lvl) * 0.005},
            cutSandstone: {icon: 'mdi-wall', input: {event_sand: 400, event_stoneBlock: 600}, output: {event_sandstone: 1}, minLevel: 3, speed: lvl => Math.pow(2, lvl) * 0.01},
            smeltSteel: {icon: 'mdi-gold', input: {event_metalPart: 20, event_freshWater: 500}, output: {event_hardSteel: 1}, minLevel: 5, speed: lvl => Math.pow(2, lvl) * 0.008},
            combineMaterial: {icon: 'mdi-pillar', input: {event_solidPlate: 10, event_sandstone: 10, event_hardSteel: 10}, output: {event_compositePlate: 1}, minLevel: 7, speed: lvl => Math.pow(2, lvl) * 0.001},
        }
    },
    kitchen: {
        icon: 'mdi-countertop',
        stageLevel: 1,
        shape: {0: 'land', 1: 'land', 3: 'land', 5: 'land'},
        price(lvl) {
            return {event_solidPlate: Math.pow(10, lvl) * 80, event_coconut: Math.pow(30, lvl) * buildNum(1.2, 'M')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 2700),
        action: {
            coconutSalad: {icon: 'mdi-bowl-mix', input: {event_coconut: 4000, event_vegetable: 50}, output: {event_coconutSalad: 1}, minLevel: 1, speed: lvl => Math.pow(2, lvl) * 0.002},
            saltyShell: {icon: 'mdi-set-all', input: {event_shell: buildNum(60, 'K'), event_salt: 75}, output: {event_saltyShell: 1}, minLevel: 3, speed: lvl => Math.pow(2, lvl) * 0.0015},
            lemonCandy: {icon: 'mdi-candy', input: {event_citrusFruit: 30, event_honey: 20}, output: {event_lemonCandy: 1}, minLevel: 5, speed: lvl => Math.pow(2, lvl) * 0.008},
            steak: {icon: 'mdi-food-steak', input: {event_cookedMeat: 10, event_salt: 250, event_pepper: 250}, output: {event_steak: 1}, minLevel: 7, speed: lvl => Math.pow(2, lvl) * 0.001},
            fishSticks: {icon: 'mdi-tally-mark-4', input: {event_cookedFish: 5, event_citrusFruit: 250, event_vegetable: 300}, output: {event_fishSticks: 1}, minLevel: 9, speed: lvl => Math.pow(2, lvl) * 0.003},
        }
    },

    // Level 2 buildings
    huntingArea: {
        icon: 'mdi-bow-arrow',
        stageLevel: 2,
        shape: {0: 'forest', 1: 'land', 2: 'land', 3: 'land'},
        price(lvl) {
            return {event_log: Math.pow(25, lvl) * buildNum(6.6, 'M'), event_shell: Math.pow(25, lvl) * buildNum(2.4, 'M')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 5400),
        effect: [
            {name: 'currencyEventRawMeatGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.004},
        ]
    },
    hugeSpade: {
        icon: 'mdi-spade',
        stageLevel: 2,
        shape: {0: 'beach'},
        price(lvl) {
            return {event_solidPlate: Math.pow(6, lvl) * buildNum(12, 'K')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 9600),
        effect: [
            {name: 'currencyEventSandGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 2},
        ]
    },
    mine: {
        icon: 'mdi-tunnel',
        stageLevel: 2,
        shape: {0: 'mountain'},
        price(lvl) {
            return {event_log: Math.pow(25, lvl) * buildNum(30, 'M'), event_solidPlate: Math.pow(8, lvl) * buildNum(37.5, 'K'), event_sandstone: Math.pow(8, lvl) * 3300};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 10800),
        effect: [
            {name: 'currencyEventSaltGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.06},
            {name: 'currencyEventCoalGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.005},
        ]
    },
    grill: {
        icon: 'mdi-grill',
        stageLevel: 2,
        price(lvl) {
            return {event_coconut: Math.pow(25, lvl) * buildNum(100, 'M'), event_stoneBlock: Math.pow(25, lvl) * buildNum(60, 'M')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 7200),
        action: {
            cookMeat: {icon: 'mdi-food-steak', input: {event_rawMeat: 1, event_coal: 1}, output: {event_cookedMeat: 1}, minLevel: 1, speed: lvl => Math.pow(2, lvl) * 0.01},
            cookFish: {icon: 'mdi-fish', input: {event_rawFish: 1, event_coal: 1}, output: {event_cookedFish: 1}, minLevel: 2, speed: lvl => Math.pow(2, lvl) * 0.01},
        }
    },
    excavator: {
        icon: 'mdi-excavator',
        stageLevel: 2,
        maxLevel: 1,
        maxAmount: 1,
        price() {
            return {event_solidPlate: buildNum(120, 'K'), event_sandstone: buildNum(10, 'K'), event_cocktail: 25};
        },
        timeNeeded: () => 3600,
        effect: [
            {name: 'summerFestivalTerraform', type: 'unlock', value: () => true},
        ]
    },

    // Level 3 buildings
    shellOpener: {
        icon: 'mdi-filter',
        stageLevel: 3,
        shape: {0: 'land', 1: 'land', 3: 'land'},
        price(lvl) {
            return {event_coconut: Math.pow(40, lvl) * buildNum(8.5, 'B'), event_sandstone: Math.pow(12, lvl) * buildNum(50, 'K')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 14400),
        action: {
            openShell: {icon: 'mdi-filter', input: {event_shell: buildNum(20, 'K')}, output: {event_metalPart: 3}, minLevel: 1, speed: lvl => Math.pow(2, lvl) * 0.01},
        },
        effect: [
            {name: 'pearlChance', type: 'summerFestivalBuildingBase', value: lvl => 0.0002 * lvl + 0.001}
        ]
    },
    waterPurifier: {
        icon: 'mdi-air-filter',
        stageLevel: 3,
        shape: {0: 'land', 1: 'water'},
        price(lvl) {
            return {event_stoneBlock: Math.pow(25, lvl) * buildNum(60, 'B')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 21600),
        effect: [
            {name: 'currencyEventFreshWaterGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.08},
            {name: 'currencyEventSaltGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.01},
        ]
    },
    fishingNet: {
        icon: 'mdi-spider-web',
        stageLevel: 3,
        shape: {0: 'water', 1: 'water'},
        price(lvl) {
            return {event_solidPlate: Math.pow(9, lvl) * buildNum(350, 'K'), event_sandstone: Math.pow(7, lvl) * buildNum(405, 'K')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 28800),
        effect: [
            {name: 'currencyEventRawFishGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.03},
        ]
    },
    lighthouse: {
        icon: 'mdi-lighthouse',
        stageLevel: 3,
        maxLevel: 1,
        shape: {0: 'mountain'},
        price() {
            return {event_pearl: 1};
        },
        timeNeeded: () => 43200,
        effect: [
            {name: 'summerFestivalBuildQueueSpeed', type: 'mult', value: () => 2},
            {name: 'summerFestivalMaterialGain', type: 'mult', value: () => 1.5},
            {name: 'summerFestivalMaterialStackCap', type: 'mult', value: () => 5}
        ]
    },

    // Level 4 buildings
    pepperField: {
        icon: 'mdi-flower-outline',
        stageLevel: 4,
        shape: {0: 'palm', 1: 'land'},
        price(lvl) {
            return {event_coconut: Math.pow(25, lvl) * buildNum(975, 'B'), event_sandstone: Math.pow(8, lvl) * buildNum(2.75, 'M')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 57600),
        effect: [
            {name: 'currencyEventPepperGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.6},
        ]
    },
    beehive: {
        icon: 'mdi-beehive-outline',
        stageLevel: 4,
        shape: {0: 'forest'},
        price(lvl) {
            return {event_log: Math.pow(25, lvl) * buildNum(7.1, 'T'), event_hardSteel: Math.pow(6, lvl) * 75};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 72000),
        effect: [
            {name: 'currencyEventHoneyGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.04},
        ]
    },
    citrusPlantation: {
        icon: 'mdi-tree',
        stageLevel: 4,
        shape: {0: 'palm', 1: 'land', 2: 'land'},
        price(lvl) {
            return {event_stoneBlock: Math.pow(25, lvl) * buildNum(63, 'T'), event_solidPlate: Math.pow(8, lvl) * buildNum(5, 'M')};
        },
        timeNeeded: lvl => Math.round(Math.pow(1.5, lvl) * 86400),
        effect: [
            {name: 'currencyEventCitrusFruitGain', type: 'base', value: lvl => Math.pow(1.75, lvl) * 0.12},
        ]
    }
}
