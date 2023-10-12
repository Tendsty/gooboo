export default {
    brick: {
        unlock: 'hordeBrickTower',
        sigils: ['generic'],
        statBase: 40,
        statScaling: 0.25,
        crowns: 1,
        heirloom: 'brick',
        reward: {
            50: {type: 'relic', name: 'test'},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'relic', name: 'test2'},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
    fire: {
        unlock: 'hordeFireTower',
        sigils: ['generic'],
        statBase: 170,
        statScaling: 0.3,
        crowns: 2,
        heirloom: 'heat',
        reward: {
            50: {type: 'relic', name: 'test'},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'relic', name: 'test2'},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
    ice: {
        unlock: 'hordeIceTower',
        sigils: ['generic'],
        statBase: 200,
        statScaling: 0.35,
        crowns: 3,
        heirloom: 'ice',
        reward: {
            50: {type: 'relic', name: 'test'},
            100: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            150: {type: 'relic', name: 'test2'},
            200: {type: 'bonus', name: 'hordeHeirloomChance', value: 0.05},
        },
    },
}
