import cardList from "./cardList";

export default {
    feature: {
        prefix: 'FA',
        reward: [{name: 'farmCropGain', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        shinyReward: [{name: 'farmExperience', type: 'mult', value: lvl => lvl * 0.05 + 1}],
        powerReward: [
            {name: 'farmCropGain', type: 'mult', value: lvl => Math.pow(1.08, lvl)},
            {name: 'farmExperience', type: 'base', value: lvl => lvl * 0.08},
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
        insectWorld: {unlock: 'farmAdvancedCardPack', amount: 2, price: 90, content: {
            'FA-0010': 2, 'FA-0011': 1.8,
            'FA-0017': 1.4, 'FA-0019': 1.4, 'FA-0020': 1.4, 'FA-0021': 1.2, 'FA-0025': 0.8,
        }},
        beesAndFlowers: {unlock: 'farmLuxuryCardPack', amount: 3, price: 200, content: {
            'FA-0012': 0.7, 'FA-0013': 0.6, 'FA-0014': 0.4, 'FA-0015': 0.4, 'FA-0016': 0.4,
            'FA-0017': 1, 'FA-0018': 0.1,
            'FA-0019': 1, 'FA-0020': 1, 'FA-0021': 0.9,
            'FA-0022': 0.8, 'FA-0023': 0.8, 'FA-0024': 0.5, 'FA-0025': 0.6,
            'FA-0026': 0.4, 'FA-0027': 0.4,
        }},
    },
    card: cardList
}
