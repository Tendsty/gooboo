export default {
    // Tier 1 potions
    power: {
        color: 'red',
        recipe: [{max: 3}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 2}
        ]
    },
    insight: {
        color: 'cyan',
        recipe: [{min: 5, max: 6}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl},
            {name: 'nightHuntRitualHintChance', type: 'base', value: lvl => lvl * 0.01}
        ]
    },

    // Tier 2 potions
    rage: {
        color: 'orange-red',
        recipe: [{max: 3}, {max: 3}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 6}
        ]
    },
    calming: {
        color: 'lime',
        recipe: [{max: 3}, {max: 3}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 3},
            {name: 'nightHuntRitualStability', type: 'base', value: lvl => lvl * 0.025}
        ]
    },
    sorrow: {
        color: 'skyblue',
        recipe: [{max: 4}, {max: 4}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 3},
            {name: 'nightHuntRitualSuccessChance', type: 'base', value: lvl => lvl * 0.02}
        ]
    },
    energy: {
        color: 'amber',
        recipe: [{max: 4}, {max: 4}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 3},
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
        ]
    },
    nature: {
        color: 'light-green',
        recipe: [{min: 5, max: 6}, {max: 6}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 3},
            {name: 'nightHuntRitualHintChance', type: 'base', value: lvl => lvl * 0.02}
        ]
    },
    intensity: {
        color: 'pink',
        recipe: [{min: 7, max: 8}, {max: 8}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 3},
            {name: 'nightHuntRitualFamiliarity', type: 'base', value: lvl => lvl * 0.01}
        ]
    },

    // Tier 3 potions
    hysteria: {
        color: 'red-pink',
        recipe: [{max: 5}, {max: 5}, {max: 5}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'nightHuntRitualStability', type: 'base', value: lvl => lvl * 0.04}
        ]
    },
    insanity: {
        color: 'orange',
        recipe: [{max: 5}, {max: 5}, {max: 5}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'nightHuntRitualSuccessChance', type: 'base', value: lvl => lvl * 0.04}
        ]
    },
    patience: {
        color: 'teal',
        recipe: [{max: 6}, {max: 6}, {max: 6}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'nightHuntRitualFamiliarity', type: 'base', value: lvl => lvl * 0.01}
        ]
    },
    transformation: {
        color: 'deep-purple',
        recipe: [{max: 7}, {max: 7}, {max: 7}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.075 + 1}
        ]
    },
    silence: {
        color: 'blue',
        recipe: [{min: 7, max: 8}, {max: 8}, {max: 8}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'nightHuntRitualHintChance', type: 'base', value: lvl => lvl * 0.02}
        ]
    },
    photosynthesis: {
        color: 'green',
        recipe: [{min: 8, max: 9}, {max: 9}, {max: 9}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 20}
        ]
    },
    sun: {
        color: 'yellow',
        recipe: [{min: 9, max: 10}, {max: 10}, {max: 10}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 8},
            {name: 'nightHuntRitualStability', type: 'base', value: lvl => lvl * 0.02},
            {name: 'nightHuntRitualSuccessChance', type: 'base', value: lvl => lvl * 0.02}
        ]
    },

    // Tier 4 potions
    growth: {
        color: 'lime',
        recipe: [{max: 7}, {max: 7}, {max: 7}, {max: 7}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.12 + 1}
        ]
    },
    solidification: {
        color: 'grey',
        recipe: [{max: 7}, {max: 7}, {max: 7}, {max: 7}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'nightHuntRitualSuccessChance', type: 'base', value: lvl => lvl * 0.05}
        ]
    },
    liquification: {
        color: 'dark-blue',
        recipe: [{max: 8}, {max: 8}, {max: 8}, {max: 8}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 22},
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
        ]
    },
    glowing: {
        color: 'yellow',
        recipe: [{max: 8}, {max: 8}, {max: 8}, {max: 8}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'nightHuntRitualStability', type: 'mult', value: lvl => lvl * 0.01 + 1}
        ]
    },
    stasis: {
        color: 'light-blue',
        recipe: [{min: 7, max: 8}, {max: 8}, {max: 8}, {max: 8}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'nightHuntRitualSuccessChance', type: 'mult', value: lvl => lvl * 0.01 + 1}
        ]
    },
    creativity: {
        color: 'pink',
        recipe: [{min: 8, max: 9}, {max: 9}, {max: 9}, {max: 9}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'base', value: lvl => lvl * 22},
            {name: 'nightHuntRitualHintChance', type: 'base', value: lvl => lvl * 0.02}
        ]
    },
    poison: {
        color: 'green',
        recipe: [{min: 9, max: 10}, {max: 10}, {max: 10}, {max: 10}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'nightHuntRitualStability', type: 'base', value: lvl => lvl * 0.05}
        ]
    },
    warmth: {
        color: 'orange',
        recipe: [{min: 10, max: 11}, {max: 11}, {max: 11}, {max: 11}],
        effect: [
            {name: 'currencyEventEssenceGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
            {name: 'nightHuntRitualFamiliarity', type: 'base', value: lvl => lvl * 0.01}
        ]
    },
}
