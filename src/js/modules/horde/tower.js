export default {
    brick: {
        unlock: 'hordeBrickTower',
        sigils: ['bashing', 'toughness', 'strength', 'growing', 'fury'],
        statBase: 140,
        statScaling: 0.25,
        crowns: 1,
        heirlooms: ['brick'],
        reward: {
            50: {type: 'unlock', name: 'hordeUpgradeRoyalArmor', value: true},
            100: {type: 'mult', name: 'hordeHealth', value: 1.5},
            150: {type: 'mult', name: 'currencyHordeMonsterPartCap', value: 1.35},
            200: {type: 'base', name: 'hordeNostalgia', value: 50},
            250: {type: 'unlock', name: 'hordeUpgradeRoyalButcher', value: true},
        },
    },
    fire: {
        unlock: 'hordeFireTower',
        sigils: ['magicBolt', 'fireball', 'sparks', 'wisdom', 'berserk'],
        statBase: 170,
        statScaling: 0.3,
        crowns: 2,
        heirlooms: ['heat'],
        reward: {
            50: {type: 'unlock', name: 'hordeUpgradeRoyalStorage', value: true},
            100: {type: 'base', name: 'hordeMaxItems', value: 1},
            150: {type: 'mult', name: 'hordeAttack', value: 1.35},
            200: {type: 'base', name: 'hordeCritMult', value: 0.2},
        },
    },
    ice: {
        unlock: 'hordeIceTower',
        sigils: ['health', 'resistance', 'cold', 'angelic', 'iceGiant'],
        statBase: 200,
        statScaling: 0.35,
        crowns: 3,
        heirlooms: ['ice'],
        reward: {
            50: {type: 'mult', name: 'currencyHordeBoneGain', value: 1.5},
            100: {type: 'unlock', name: 'hordeUpgradeRoyalCrypt', value: true},
            150: {type: 'mult', name: 'currencyHordeSoulCorruptedGain', value: 1.2},
        },
    },
}
