import cardList from "./cardList";

export default {
    feature: {
        prefix: 'HO',
        reward: [
            {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.03 + 1},
            {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.03 + 1},
        ],
        shinyReward: [
            {name: 'hordePrestigeIncome', type: 'mult', value: lvl => lvl * 0.05 + 1},
        ],
        powerReward: [
            {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
            {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.06, lvl)},
            {name: 'hordePrestigeIncome', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
        ],
        unlock: 'hordeFeature'
    },
    collection: {
        dangerousWeapons: {reward: [
            {name: 'hordeAttack', type: 'mult', value: 1.35},
        ]},
        supplyAndSupport: {reward: [
            {name: 'hordeHealth', type: 'mult', value: 1.35},
            {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.25},
        ]},
        againstTheCorruption: {reward: [
            {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: 1.5},
        ]},
        artOfWar: {reward: [
            {name: 'hordeShardChance', type: 'mult', value: 1.5},
            {name: 'galleryCanvasSpeed', type: 'mult', value: 1.35},
        ]},
        skillfulCombat: {reward: [
            {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 2},
            {name: 'hordeSkillPointsPerLevel', type: 'base', value: 1},
        ]},
    },
    pack: {
        rookieOnTheBattlefield: {unlock: 'hordeEquipment', amount: 3, price: 20, content: {
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
        taintedWorld: {unlock: 'hordeEquipmentMastery', amount: 6, price: 225, content: {
            'HO-0023': 0.72,
            'HO-0024': 1.2, 'HO-0025': 1.3, 'HO-0026': 1.55, 'HO-0027': 1.15, 'HO-0028': 2, 'HO-0029': 1.1, 'HO-0030': 2.3,
            'HO-0031': 3.5, 'HO-0032': 2.1, 'HO-0033': 0.9, 'HO-0034': 1.22, 'HO-0035': 1.58, 'HO-0036': 1.18,
            'HO-0037': 1.4, 'HO-0038': 0.65, 'HO-0039': 0.77, 'HO-0040': 1.36, 'HO-0041': 0.96,
        }},
        towerOfPower: {unlock: 'hordeBrickTower', amount: 2, price: 115, content: {
            'HO-0033': 1.2, 'HO-0037': 1.45, 'HO-0038': 0.4, 'HO-0039': 1.12, 'HO-0041': 1.22,
            'HO-0044': 2.3, 'HO-0045': 2.02, 'HO-0046': 2, 'HO-0047': 1.92,
        }},
        learnToFight: {unlock: 'hordeClassesSubfeature', amount: 5, price: 410, content: {
            'HO-0044': 1.26, 'HO-0045': 1.13, 'HO-0046': 1.15, 'HO-0047': 1.1,
            'HO-0048': 0.75, 'HO-0049': 0.3, 'HO-0050': 1.95, 'HO-0051': 2.2,
            'HO-0052': 1.45, 'HO-0053': 1.1, 'HO-0054': 0.8, 'HO-0055': 0.95,
            'HO-0056': 0.6, 'HO-0057': 0.55,
        }},
        combatExpert: {unlock: 'hordeClassPirate', amount: 3, price: 350, content: {
            'HO-0048': 1.15, 'HO-0049': 0.7,
            'HO-0052': 1, 'HO-0053': 1.1, 'HO-0054': 1.28, 'HO-0055': 1.2,
            'HO-0056': 1.75, 'HO-0057': 1.8,
            'HO-0058': 0.85, 'HO-0059': 1.5, 'HO-0060': 1.9, 'HO-0061': 1.85,
            'HO-0062': 1.35, 'HO-0063': 2.05, 'HO-0064': 2.2, 'HO-0065': 1.4,
        }},
    },
    card: cardList
}
