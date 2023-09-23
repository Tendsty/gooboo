export default {
    juicyBait: {
        icon: 'mdi-fruit-grapes',
        stackSize: 10,
        effect: [
            {name: 'weatherChaosFishingTime', type: 'mult', value: 0.1},
            {name: 'weatherChaosFishChance', type: 'base', value: 1},
            {name: 'weatherChaosFishDoubleChance', type: 'base', value: 0.35},
            {name: 'weatherChaosTreasureChance', type: 'mult', value: 0.1},
        ],
    },
    rainbowBait: {
        icon: 'mdi-looks',
        stackSize: 3,
        effect: [
            {name: 'weatherChaosFishChance', type: 'base', value: 1},
            {name: 'weatherChaosIgnoreWeather', type: 'base', value: 0.25},
            {name: 'weatherChaosFishSizeMax', type: 'mult', value: 1 / 1.1},
            {name: 'weatherChaosFishSizeAverage', type: 'mult', value: 0.8},
        ],
    },
    trashNet: {
        icon: 'mdi-spider-web',
        stackSize: 10,
        effect: [
            {name: 'weatherChaosFishingTime', type: 'mult', value: 0.1},
            {name: 'weatherChaosFishChance', type: 'base', value: -1},
            {name: 'weatherChaosTrashGain', type: 'mult', value: 3},
            {name: 'weatherChaosTreasureChance', type: 'mult', value: 0.1},
        ],
    },
    magnet: {
        icon: 'mdi-magnet',
        effect: [
            {name: 'weatherChaosTreasureChance', type: 'base', value: 1},
        ],
    },
}
