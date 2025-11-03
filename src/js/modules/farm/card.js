import cardList from "./cardList";

export default {
    feature: {
        prefix: 'FA',
        reward: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        shinyReward: [{name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        powerReward: [
            {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.05},
        ],
        unlock: 'farmFeature'
    },
    collection: {
        feedingTheWorld: {reward: [
            {name: 'currencyFarmGrainGain', type: 'mult', value: 1.25},
            {name: 'currencyFarmFlowerGain', type: 'mult', value: 1.25}
        ]},
        organicDyes: {reward: [
            {name: 'galleryCardCap', type: 'base', value: 1},
            {name: 'currencyFarmBerryGain', type: 'mult', value: 1.25}
        ]},
        countryLife: {reward: [
            {name: 'farmCardCap', type: 'base', value: 1},
            {name: 'farmExperience', type: 'mult', value: 1.25}
        ]},
        forgottenPlants: {reward: [
            {name: 'farmCardCap', type: 'base', value: 1},
            {name: 'miningDamage', type: 'mult', value: 1.35}
        ]},
    },
    pack: {
        bountifulHarvest: {unlock: 'farmCropExp', amount: 3, price: 30, content: {
            'FA-0001': 1.5, 'FA-0002': 1.5, 'FA-0003': 0.9, 'FA-0004': 1.5, 'FA-0005': 1.5,
            'FA-0006': 0.6, 'FA-0007': 0.6, 'FA-0008': 0.6, 'FA-0009': 0.6,
            'FA-0010': 0.5, 'FA-0011': 0.2,
        }},
        juicyYields: {unlock: 'farmFertilizer', amount: 4, price: 80, content: {
            'FA-0006': 1.2, 'FA-0007': 1.2, 'FA-0008': 1.2, 'FA-0009': 1.2,
            'FA-0010': 1.5, 'FA-0011': 1,
            'FA-0012': 0.9, 'FA-0013': 0.6, 'FA-0014': 0.4, 'FA-0015': 0.4, 'FA-0016': 0.4,
        }},
        insectWorld: {unlock: 'farmAdvancedCardPack', amount: 2, price: 70, content: {
            'FA-0010': 2, 'FA-0011': 1.8,
            'FA-0017': 1.4, 'FA-0019': 1.4, 'FA-0020': 1.4, 'FA-0021': 1.2, 'FA-0025': 0.8,
        }},
        beesAndFlowers: {unlock: 'farmLuxuryCardPack', amount: 3, price: 130, content: {
            'FA-0012': 0.7, 'FA-0013': 0.6, 'FA-0014': 0.4, 'FA-0015': 0.4, 'FA-0016': 0.4,
            'FA-0017': 1, 'FA-0018': 0.1,
            'FA-0019': 1, 'FA-0020': 1, 'FA-0021': 0.9,
            'FA-0022': 0.8, 'FA-0023': 0.8, 'FA-0024': 0.5, 'FA-0025': 0.6,
            'FA-0026': 0.4, 'FA-0027': 0.4,
        }},
        strongPlants: {unlock: 'farmPowerCardPack', amount: 4, price: 285, content: {
            'FA-0018': 0.3,
            'FA-0022': 0.5, 'FA-0023': 0.5, 'FA-0024': 0.3,
            'FA-0026': 0.5, 'FA-0027': 0.5,
            'FA-0032': 0.7, 'FA-0033': 1, 'FA-0034': 1, 'FA-0035': 1,
            'FA-0036': 1, 'FA-0037': 0.7, 'FA-0038': 1, 'FA-0041': 1,
        }},
        seedVariety: {unlock: 'farmSeedCardPack', amount: 2, price: 190, content: {
            'FA-0018': 0.4,
            'FA-0032': 0.8, 'FA-0037': 0.8,
            'FA-0039': 1, 'FA-0040': 1, 'FA-0042': 1, 'FA-0043': 1,
            'FA-0044': 1, 'FA-0045': 0.6, 'FA-0046': 0.6,
            'FA-0047': 0.6, 'FA-0048': 0.6, 'FA-0049': 0.6,
        }},
    },
    card: cardList
}
