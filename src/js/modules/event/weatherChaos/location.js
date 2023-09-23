export default {
    pond: {
        owned: true,
        next: {minPower: 40, name: 'lake'},
    },
    lake: {
        next: {minPower: 100, name: 'river'},
        effect: [
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 1.2},
            {name: 'weatherChaosAlgaeWeight', type: 'mult', value: 3},
            {name: 'currencyEventAlgaeGain', type: 'mult', value: 2},
        ],
    },
    river: {
        next: {minPower: 250, name: 'ocean'},
        effect: [
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 1.4},
            {name: 'weatherChaosDriftwoodWeight', type: 'mult', value: 3},
            {name: 'currencyEventDriftwoodGain', type: 'mult', value: 2},
        ],
    },
    ocean: {
        next: {minPower: 500, name: 'mountain'},
        effect: [
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 1.6},
            {name: 'weatherChaosPlasticWeight', type: 'mult', value: 3},
            {name: 'currencyEventPlasticGain', type: 'mult', value: 2},
        ],
    },
    mountain: {
        next: {minPower: 1000, name: 'cave'},
        effect: [
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 1.8},
            {name: 'currencyEventAlgaeGain', type: 'mult', value: 1.5},
            {name: 'currencyEventDriftwoodGain', type: 'mult', value: 1.5},
            {name: 'currencyEventPlasticGain', type: 'mult', value: 1.5},
        ],
    },
    cave: {
        effect: [
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 2},
            {name: 'weatherChaosTreasureChance', type: 'mult', value: 1.5},
        ],
    }
}
