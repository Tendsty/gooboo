import cardList from "./cardList";

export default {
    feature: {
        prefix: 'MI',
        reward: [{name: 'miningDamage', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        shinyReward: [{name: 'miningPrestigeIncome', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        powerReward: [
            {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.08, lvl)},
            {name: 'miningPrestigeIncome', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        ],
        unlock: null
    },
    collection: {
        minersAndEquipment: {reward: [
            {name: 'miningDamage', type: 'mult', value: 1.35}
        ]},
        scrapLogistics: {reward: [
            {name: 'miningCardCap', type: 'base', value: 1},
            {name: 'currencyMiningScrapCap', type: 'mult', value: 2}
        ]},
        caveLocations: {reward: [
            {name: 'villageCardCap', type: 'base', value: 1},
            {name: 'currencyVillageStoneGain', type: 'mult', value: 1.5}
        ]},
        dangersInTheDark: {reward: [
            {name: 'miningCardCap', type: 'base', value: 1},
            {name: 'hordeCardCap', type: 'base', value: 1}
        ]}
    },
    pack: {
        intoDarkness: {amount: 3, price: 15, content: {
            'MI-0001': 2.75, 'MI-0002': 0.3, 'MI-0003': 0.58, 'MI-0004': 1.1, 'MI-0005': 1.22, 'MI-0006': 0.9,
            'MI-0007': 0.65, 'MI-0008': 1.11, 'MI-0009': 1.56, 'MI-0010': 0.28, 'MI-0011': 0.73, 'MI-0012': 0.86,
            'MI-0013': 1.05, 'MI-0014': 1.45, 'MI-0015': 0.49, 'MI-0016': 0.55, 'MI-0017': 0.52, 'MI-0018': 1.16,
            'MI-0023': 0.18, 'MI-0024': 0.05,
        }},
        drillsAndDepths: {unlock: 'miningDepthDweller', amount: 4, price: 35, content: {
            'MI-0001': 1.8, 'MI-0002': 0.4, 'MI-0003': 0.65, 'MI-0004': 1.1, 'MI-0005': 1.22, 'MI-0006': 0.9,
            'MI-0013': 1.05, 'MI-0014': 1.45, 'MI-0015': 0.69, 'MI-0016': 0.55, 'MI-0017': 0.52, 'MI-0018': 1.16,
            'MI-0019': 1.55, 'MI-0020': 2.3, 'MI-0021': 1.91, 'MI-0022': 2.12,
            'MI-0023': 0.36, 'MI-0024': 0.12, 'MI-0025': 0.46, 'MI-0026': 0.62, 'MI-0027': 1.35,
        }},
        hotStuff: {unlock: 'miningSmeltery', amount: 5, price: 70, content: {
            'MI-0007': 1.3, 'MI-0008': 1.77, 'MI-0009': 1.56, 'MI-0010': 0.28, 'MI-0011': 0.58, 'MI-0012': 0.51,
            'MI-0023': 0.72, 'MI-0024': 0.24, 'MI-0025': 0.46, 'MI-0026': 0.62, 'MI-0027': 1.35,
            'MI-0028': 0.8, 'MI-0029': 0.66, 'MI-0030': 2.8, 'MI-0031': 1.35,
            'MI-0032': 0.5,
        }},
        dangerZone: {unlock: 'miningResin', amount: 4, price: 105, content: {
            'MI-0032': 1.6, 'MI-0033': 1.45, 'MI-0034': 1.35, 'MI-0035': 2.1, 'MI-0036': 1.95, 'MI-0037': 3.35, 'MI-0038': 2.1,
        }}
    },
    card: cardList
}
