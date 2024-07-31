export default {
    // Level 1 genes
    yield: {
        icon: 'mdi-sack',
        effect: [{name: 'farmCropGain', type: 'mult', value: 1.3}],
        upgrade: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.1 + 1}]
    },
    gold: {
        icon: 'mdi-gold',
        effect: [{name: 'farmGoldChance', type: 'mult', value: 1.4}],
        upgrade: [{name: 'farmGoldChance', type: 'mult', value: lvl => lvl * 0.05 + 1}]
    },
    exp: {
        icon: 'mdi-star',
        effect: [{name: 'farmExperience', type: 'mult', value: 1.175}],
        upgrade: [{name: 'farmExperience', type: 'base', value: lvl => lvl * 0.15}]
    },
    rareDrop: {
        icon: 'mdi-dice-2',
        effect: [{name: 'farmRareDropChance', type: 'mult', value: 1.25}],
        upgrade: [{name: 'farmRareDropChance', type: 'mult', value: lvl => lvl * 0.09 + 1}]
    },

    // Level 5 genes
    grow: {
        icon: 'mdi-timer',
        effect: [{name: 'farmGrow', type: 'mult', value: 0.8}],
        upgrade: [
            {name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.01 + 1)},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.1}
        ]
    },
    overgrow: {
        icon: 'mdi-sprout',
        effect: [{name: 'farmOvergrow', type: 'mult', value: 2.5}],
        upgrade: [{name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.15}]
    },
    giant: {
        icon: 'mdi-numeric-5-box-multiple',
        effect: [
            {name: 'farmGrow', type: 'mult', value: 5},
            {name: 'farmAllGain', type: 'mult', value: 4}
        ],
        upgrade: [
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.06 + 1},
            {name: 'farmRareDropChance', type: 'mult', value: lvl => lvl * 0.04 + 1}
        ]
    },
    grass: {
        icon: 'mdi-grass',
        effect: [{name: 'farm_grass', type: 'addRareDrop', value: 8}],
        upgrade: [{name: 'farm_grass', type: 'addRareDropAmount', value: lvl => lvl}]
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
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.04 + 1},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.05}
        ]
    },
    lonely: {
        icon: 'mdi-circle-expand',
        effect: [{name: 'farmLonelyGrow', type: 'text'}],
        upgrade: [
            {name: 'farmGrow', type: 'mult', value: lvl => 1 / (lvl * 0.01 + 1)},
            {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.12}
        ]
    },
    fertile: {
        icon: 'mdi-sack-percent',
        effect: [{name: 'farmFertileBoost', type: 'text'}],
        upgrade: [
            {name: 'farmAllGain', type: 'mult', value: lvl => lvl * 0.02 + 1},
            {name: 'farmOvergrow', type: 'base', value: lvl => lvl * 0.05}
        ]
    },

    // Level 15 genes
    mystery: {
        icon: 'mdi-eye-circle-outline',
        effect: [{name: 'farm_mysteryStone', type: 'addRareDrop', value: 1}],
        upgrade: [{name: 'farmMystery', type: 'base', value: lvl => lvl}]
    },
    conversion: {
        icon: 'mdi-swap-horizontal',
        effect: [{name: 'farmYieldConversion', type: 'text'}],
        upgrade: [
            {name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.04 + 1},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.05}
        ]
    },
    prestige: {
        icon: 'mdi-shimmer',
        effect: [{name: 'farmFastPrestige', type: 'text'}],
        upgrade: [{name: 'farmDnaNext', type: 'base', value: lvl => lvl * 10}]
    },
    rareDropChance: {
        icon: 'mdi-dice-multiple',
        effect: [{name: 'farmRareDropChance', type: 'base', value: 0.05}],
        upgrade: [{name: 'farmRareDropChance', type: 'base', value: lvl => lvl * 0.001}]
    },
}
