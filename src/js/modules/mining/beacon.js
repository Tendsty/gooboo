export default {
    piercing: {
        color: 'purple',
        ownedMult: 'miningBeaconPiercing',
        effect: [
            {name: 'miningToughness', type: 'mult', value: lvl => 1 / (lvl * 0.25 + 5)}
        ]
    },
    rich: {
        color: 'orange',
        ownedMult: 'miningBeaconRich',
        effect: [
            {name: 'miningOreGain', type: 'mult', value: lvl => lvl * 0.05 + 2}
        ]
    },
    wonder: {
        color: 'blue',
        ownedMult: 'miningBeaconWonder',
        effect: [
            {name: 'miningRareEarthGain', type: 'mult', value: lvl => lvl * 0.04 + 1.6}
        ]
    },
    hope: {
        color: 'green',
        ownedMult: 'miningBeaconHope',
        range: 5,
        effect: [
            {name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.01 + 1.1},
            {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => lvl * 0.015 + 1.2}
        ]
    }
}
