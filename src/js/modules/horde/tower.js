export default {
    brick: {
        unlock: 'hordeBrickTower',
        sigils: ['bashing', 'toughness', 'strength', 'growing', 'fury'],
        statBase: 140,
        statScaling: 0.25,
        crowns: 1,
        heirlooms: ['brick'],
        reward: {
            50: {type: 'mult', name: 'hordeHealth', value: 1.2},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'mult', name: 'currencyHordeMonsterPartCap', value: 1.35},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
    fire: {
        unlock: 'hordeFireTower',
        sigils: ['generic'],
        statBase: 170,
        statScaling: 0.3,
        crowns: 2,
        heirlooms: ['heat'],
        reward: {
            50: {type: 'mult', name: 'hordeHealth', value: 1.2},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'mult', name: 'currencyHordeMonsterPartCap', value: 1.35},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
    ice: {
        unlock: 'hordeIceTower',
        sigils: ['generic'],
        statBase: 200,
        statScaling: 0.35,
        crowns: 3,
        heirlooms: ['ice'],
        reward: {
            50: {type: 'mult', name: 'hordeHealth', value: 1.2},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'mult', name: 'currencyHordeMonsterPartCap', value: 1.35},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
}
