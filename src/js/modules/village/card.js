import cardList from "./cardList";

export default {
    feature: {
        prefix: 'VI',
        reward: [{name: 'villageResourceGain', type: 'mult', value: lvl => lvl * 0.03 + 1}],
        shinyReward: [
            {name: 'villagePrestigeIncome', type: 'mult', value: lvl => lvl * 0.05 + 1},
        ],
        powerReward: [
            {name: 'villageMaterialGain', type: 'mult', value: lvl => Math.pow(1.07, lvl)},
            {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.03, lvl)},
            {name: 'villagePrestigeIncome', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        ],
        unlock: 'villageFeature'
    },
    collection: {
        neighborhood: {reward: [
            {name: 'villageWorker', type: 'base', value: 8}
        ]},
        plantsInTheCity: {reward: [
            {name: 'currencyVillagePlantFiberGain', type: 'mult', value: 1.5}
        ]},
        industrialRevolution: {reward: [
            {name: 'currencyVillageWoodGain', type: 'mult', value: 1.5}
        ]},
        maintainingSafety: {reward: [
            {name: 'villageCardCap', type: 'base', value: 1},
            {name: 'hordeCardCap', type: 'base', value: 1}
        ]},
    },
    pack: {
        meetingNewPeople: {unlock: 'villageBuildings3', amount: 3, price: 18, content: {
            'VI-0001': 1.11, 'VI-0003': 0.9, 'VI-0004': 1.04, 'VI-0005': 1.11,
            'VI-0006': 2.4, 'VI-0007': 0.63, 'VI-0008': 2.8, 'VI-0010': 2.55, 'VI-0011': 1.85, 'VI-0012': 1.6, 'VI-0014': 0.7,
            'VI-0015': 0.1, 'VI-0016': 1.11, 'VI-0017': 0.35, 'VI-0018': 0.1, 'VI-0019': 1.44,
            'VI-0024': 0.97, 'VI-0025': 1.03, 'VI-0027': 0.7,
        }},
        darkCult: {unlock: 'villageBuildings4', amount: 5, price: 65, content: {
            'VI-0002': 0.84, 'VI-0009': 1.75,
            'VI-0015': 0.22, 'VI-0017': 0.82, 'VI-0018': 0.22, 'VI-0019': 1.33,
            'VI-0020': 0.84, 'VI-0021': 1.25, 'VI-0022': 1.4,
            'VI-0024': 1.07, 'VI-0025': 1.23, 'VI-0026': 2.55, 'VI-0027': 0.7,
            'VI-0028': 2.3, 'VI-0029': 0.38, 'VI-0030': 1.6, 'VI-0031': 1.15,
        }},
        technologicalAdvancement: {unlock: 'villageBuildings5', amount: 4, price: 115, content: {
            'VI-0013': 0.5, 'VI-0023': 1.1,
            'VI-0030': 2.6, 'VI-0031': 1.65, 'VI-0032': 0.38, 'VI-0033': 0.7,
            'VI-0034': 1.32, 'VI-0035': 1.05, 'VI-0036': 0.82, 'VI-0037': 1.02, 'VI-0038': 1.4, 'VI-0039': 0.9,
        }},
    },
    card: cardList
}
