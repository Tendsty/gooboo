import cardList from "./cardList";

export default {
    feature: {
        prefix: 'HO',
        reward: [
            {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.03 + 1},
            {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.03 + 1}
        ],
        shinyReward: [
            {name: 'hordePrestigeIncome', type: 'mult', value: lvl => lvl * 0.05 + 1},
        ],
        powerReward: [
            {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
            {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
            {name: 'hordePrestigeIncome', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        ],
        unlock: 'hordeFeature'
    },
    collection: {
        dangerousWeapons: {reward: [
            {name: 'hordeAttack', type: 'mult', value: 1.35}
        ]},
        supplyAndSupport: {reward: [
            {name: 'hordeHealth', type: 'mult', value: 1.35},
            {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.25}
        ]},
        againstTheCorruption: {reward: [
            {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: 1.5}
        ]},
    },
    pack: {
        rookieOnTheBattlefield: {unlock: 'hordeItems', amount: 3, price: 20, content: {
            'HO-0001': 2.6, 'HO-0002': 0.45, 'HO-0003': 1.25, 'HO-0004': 0.92, 'HO-0005': 1.55, 'HO-0006': 1.36,
            'HO-0007': 0.6, 'HO-0008': 0.8, 'HO-0009': 0.88, 'HO-0010': 0.4, 'HO-0011': 0.48,
            'HO-0012': 2.1, 'HO-0013': 1.6, 'HO-0014': 0.77,
        }},
        spiritualSuccess: {unlock: 'hordePrestige', amount: 4, price: 65, content: {
            'HO-0003': 1.25, 'HO-0004': 0.92, 'HO-0005': 1.55, 'HO-0006': 1.36,
            'HO-0009': 0.88, 'HO-0010': 0.8, 'HO-0011': 0.96,
            'HO-0012': 2.1, 'HO-0013': 1.6, 'HO-0014': 0.77, 'HO-0015': 1.2, 'HO-0016': 1.3, 'HO-0017': 1.8,
            'HO-0018': 1.6, 'HO-0019': 0.75, 'HO-0020': 0.84, 'HO-0021': 1.05, 'HO-0022': 1.5, 'HO-0023': 0.43,
            'HO-0024': 0.7, 'HO-0026': 0.9,
        }},
        oldMemories: {unlock: 'hordeHeirlooms', amount: 2, price: 50, content: {
            'HO-0007': 1.2, 'HO-0010': 0.8, 'HO-0011': 0.96,
            'HO-0019': 1.5, 'HO-0020': 1.68, 'HO-0021': 2.1, 'HO-0022': 3.75,
            'HO-0024': 1.4, 'HO-0026': 1.8, 'HO-0027': 1.15, 'HO-0028': 2, 'HO-0030': 2.3,
        }},
        taintedWorld: {unlock: 'hordeItemMastery', amount: 6, price: 225, content: {
            'HO-0023': 0.72,
            'HO-0024': 1.2, 'HO-0025': 1.3, 'HO-0026': 1.55, 'HO-0027': 1.15, 'HO-0028': 2, 'HO-0029': 1.1, 'HO-0030': 2.3,
            'HO-0031': 3.5, 'HO-0032': 2.1, 'HO-0033': 0.9, 'HO-0034': 1.22, 'HO-0035': 1.58, 'HO-0036': 1.18,
            'HO-0037': 1.4, 'HO-0038': 0.5, 'HO-0039': 0.77, 'HO-0040': 1.36, 'HO-0041': 0.22,
        }},
    },
    card: cardList
}
