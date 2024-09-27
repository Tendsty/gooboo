import { getSequence } from "../../utils/math";

export default {
    barAluminium: {
        effect: [
            {name: 'miningPickaxeCraftingQuality', type: 'mult', value: lvl => lvl * 0.5 + 1},
            {name: 'miningOreQuality', type: 'mult', value: lvl => Math.pow(2, lvl)}
        ]
    },
    barBronze: {
        effect: [
            {name: 'miningOreGain', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
            {name: 'miningRareEarthGain', type: 'mult', value: lvl => Math.pow(1.25, lvl)}
        ]
    },
    barSteel: {
        effect: [
            {name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.35 + 1},
            {name: 'miningToughness', type: 'mult', value: lvl => Math.pow(1 / 1.5, lvl)}
        ]
    },
    barTitanium: {
        effect: [
            {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => getSequence(2, lvl) + 1}
        ]
    },
    barShiny: {
        effect: [
            {name: 'miningDepthDwellerSpeed', type: 'mult', value: lvl => Math.pow(1.35, lvl)},
            {name: 'currencyMiningCrystalGreenGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
        ]
    },
    barIridium: {
        effect: [
            {name: 'currencyMiningEmberGain', type: 'mult', value: lvl => lvl + 1}
        ]
    },
    barDarkIron: {
        effect: [
            {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => getSequence(2, lvl) * 0.5 + 1}
        ]
    }
}
