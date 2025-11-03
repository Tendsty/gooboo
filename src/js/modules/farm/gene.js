import { getDiminishing } from "../../utils/math";

export default {
    // Level 1 genes
    yield: {
        icon: 'mdi-sack',
        effect: [
            {name: 'farmCropGain', type: 'mult', value: 1.2},
            {name: 'yield', type: 'farmCareImprove', value: {amount: 5, max: 0.1, weight: 0.5}}
        ],
        upgrade: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.05 + 1}]
    },
    gold: {
        icon: 'mdi-gold',
        effect: [
            {name: 'farmGoldChance', type: 'mult', value: 1.2},
            {name: 'gold', type: 'farmCareImprove', value: {amount: 1, max: 2, weight: 0.03}}
        ],
        upgrade: [{name: 'farmGoldChance', type: 'mult', value: lvl => getDiminishing(lvl) * 0.03 + lvl * 0.01 + 1}]
    },
    exp: {
        icon: 'mdi-star',
        effect: [
            {name: 'farmExperience', type: 'mult', value: 1.15},
            {name: 'exp', type: 'farmCareImprove', value: {amount: 5, max: 0.1, weight: 0.5}}
        ],
        upgrade: [{name: 'farmExperience', type: 'base', value: lvl => lvl * 0.1}]
    },
    rareDrop: {
        icon: 'mdi-dice-2',
        effect: [
            {name: 'farmRareDropChance', type: 'mult', value: 1.2},
            {name: 'rareDrop', type: 'farmCareAdd', value: {amount: 10, max: 0.4, weight: 2.5}},
            {name: 'yield', type: 'farmCareDisable', value: true}
        ],
        upgrade: [{name: 'farmRareDropChance', type: 'mult', value: lvl => lvl * 0.04 + 1}]
    },

    // Level 5 genes
    grow: {
        icon: 'mdi-timer',
        effect: [
            {name: 'farmGrow', type: 'mult', value: 1 / 1.2},
            {name: 'time', type: 'farmCareImprove', value: {amount: 3, weight: 0.75}}
        ],
        upgrade: [{name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.02 + 1)}],
        maxLevel: 5
    },
    overgrow: {
        icon: 'mdi-sprout',
        effect: [
            {name: 'farmOvergrow', type: 'mult', value: 1.5},
            {name: 'farmAllGain', type: 'mult', value: 1.1},
        ],
        upgrade: [{name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.2}]
    },
    mutate: {
        icon: 'mdi-flower-pollen',
        effect: [{name: 'farmBonusDna', type: 'text'}],
        maxLevel: 0
    },
    grass: {
        icon: 'mdi-grass',
        effect: [{name: 'farm_grass', type: 'addRareDrop', value: 10, chance: 0.4}],
        upgrade: [{name: 'farm_grass', type: 'addRareDropAmount', value: lvl => lvl * 2}]
    },

    // Level 10 genes
    dna: {
        icon: 'mdi-dna',
        effect: [{name: 'farmUnlockDna', type: 'text'}],
        upgrade: []
    },
    gnome: {
        icon: 'mdi-human-child',
        effect: [{name: 'farmGnomeBoost', type: 'text'}],
        upgrade: [
            {name: 'farmGoldChance', type: 'mult', value: lvl => lvl * 0.01 + 1},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.08}
        ]
    },
    lonely: {
        icon: 'mdi-circle-expand',
        effect: [{name: 'farmLonelyGrow', type: 'text'}],
        upgrade: [
            {name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.01 + 1)},
            {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.15}
        ],
        maxLevel: 5
    },
    fertile: {
        icon: 'mdi-sack-percent',
        effect: [{name: 'farmFertileBoost', type: 'text'}],
        upgrade: [
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.03 + 1},
            {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.1}
        ]
    },

    // Level 15 genes
    mystery: {
        icon: 'mdi-eye-circle-outline',
        effect: [{name: 'farm_mysteryStone', type: 'addRareDrop', value: 1, chance: -0.1, mult: 0.02}],
        upgrade: [{name: 'farmMystery', type: 'base', value: lvl => lvl}]
    },
    conversion: {
        icon: 'mdi-swap-horizontal',
        effect: [{name: 'farmYieldConversion', type: 'text'}],
        upgrade: [
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.03 + 1},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.07}
        ],
        maxLevel: 5
    },
    prestige: {
        icon: 'mdi-shimmer',
        effect: [{name: 'farmFastPrestige', type: 'text'}],
        maxLevel: 0
    },
    rareDropChance: {
        icon: 'mdi-dice-multiple',
        effect: [{name: 'farmRareDropChance', type: 'base', value: 0.05}],
        maxLevel: 0
    },

    // Level 20 genes
    lucky: {
        icon: 'mdi-horseshoe',
        effect: [{name: 'farmLuckyHarvest', type: 'text'}],
        upgrade: [{name: 'farmLuckyHarvestMult', type: 'base', value: lvl => lvl}]
    },
    finalize: {
        icon: 'mdi-lock-alert',
        effect: [
            {name: 'farmCropGain', type: 'mult', value: 1.5},
            {name: 'farmGoldChance', type: 'mult', value: 1.2},
            {name: 'farmRareDropChance', type: 'mult', value: 1.2},
            {name: 'farmExperience', type: 'mult', value: 0}
        ],
        upgrade: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1}],
        maxLevel: 5
    },
    selfless: {
        icon: 'mdi-charity',
        effect: [{name: 'farmSelfless', type: 'text'}],
        upgrade: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.08 + 1}],
        maxLevel: 5
    },
    unyielding: {
        icon: 'mdi-compost',
        effect: [{name: 'farmUnyielding', type: 'text'}],
        upgrade: [
            {name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.01 + 1)},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.07}
        ],
        maxLevel: 5
    },

    // Level 25 genes
    teamwork: {
        icon: 'mdi-handshake',
        effect: [{name: 'farmTeamwork', type: 'text'}],
        upgrade: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.08 + 1}],
        maxLevel: 5
    },
    hunter: {
        icon: 'mdi-bow-arrow',
        effect: [{name: 'farmHunter', type: 'text'}],
        upgrade: [{name: 'farmHuntChance', type: 'mult', value: lvl => Math.pow(1.1, lvl)}]
    },
    patient: {
        icon: 'mdi-sleep',
        effect: [{name: 'farmPatient', type: 'text'}],
        upgrade: [
            {name: 'farmAllGain', type: 'mult', value: lvl => lvl * 0.01 + 1},
            {name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.01 + 1)}
        ],
        maxLevel: 5
    },
}
