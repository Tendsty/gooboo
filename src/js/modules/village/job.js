export default {
    collector: {
        max: null,
        needed: 1,
        rewards: [
            {type: 'base', name: 'currencyVillagePlantFiberGain', amount: 0.3},
            {type: 'base', name: 'currencyVillageWoodGain', amount: 0.3},
            {type: 'base', name: 'currencyVillageStoneGain', amount: 0.3}
        ]
    },
    farmer: {
        max: 0,
        needed: 2,
        rewards: [
            {type: 'base', name: 'currencyVillagePlantFiberGain', amount: 2},
            {type: 'base', name: 'currencyVillageGrainGain', amount: 0.5}
        ]
    },
    harvester: {
        max: 0,
        needed: 2,
        rewards: [
            {type: 'base', name: 'currencyVillageWoodGain', amount: 2},
            {type: 'base', name: 'currencyVillageFruitGain', amount: 0.5}
        ]
    },
    miner: {
        max: 0,
        needed: 2,
        rewards: [
            {type: 'base', name: 'currencyVillageStoneGain', amount: 2},
            {type: 'base', name: 'currencyVillageMetalGain', amount: 0.5}
        ]
    },
    wellWorker: {
        max: 0,
        needed: 3,
        rewards: [
            {type: 'base', name: 'currencyVillageWaterGain', amount: 3}
        ]
    },
    librarian: {
        max: 0,
        needed: 4,
        rewards: [
            {type: 'base', name: 'currencyVillageKnowledgeGain', amount: 0.02}
        ]
    },
    glassblower: {
        max: 0,
        needed: 4,
        rewards: [
            {type: 'base', name: 'currencyVillageGlassGain', amount: 0.25}
        ]
    },
    entertainer: {
        max: 0,
        needed: 5,
        rewards: [
            {type: 'base', name: 'villageHappiness', amount: 0.03}
        ]
    },
    lumberjack: {
        max: 0,
        needed: 6,
        rewards: [
            {type: 'base', name: 'currencyVillageWoodGain', amount: 12},
            {type: 'base', name: 'currencyVillageHardwoodGain', amount: 0.25}
        ]
    },
    blastMiner: {
        max: 0,
        needed: 6,
        rewards: [
            {type: 'base', name: 'currencyVillageStoneGain', amount: 12},
            {type: 'base', name: 'currencyVillageGemGain', amount: 0.25}
        ]
    },
    fisherman: {
        max: 0,
        needed: 7,
        rewards: [
            {type: 'base', name: 'currencyVillageFishGain', amount: 30}
        ]
    },
    scientist: {
        max: 0,
        needed: 8,
        rewards: [
            {type: 'base', name: 'currencyVillageScienceGain', amount: 0.008}
        ]
    },
    gardener: {
        max: 0,
        needed: 8,
        rewards: [
            {type: 'base', name: 'currencyVillagePlantFiberGain', amount: 20},
            {type: 'base', name: 'currencyVillageVegetableGain', amount: 40}
        ]
    },
    oilWorker: {
        max: 0,
        needed: 11,
        rewards: [
            {type: 'base', name: 'currencyVillageOilGain', amount: 0.35}
        ]
    },
    sculptor: {
        max: 0,
        needed: 14,
        rewards: [
            {type: 'base', name: 'currencyVillageMarbleGain', amount: 0.001}
        ]
    },
    explorer: {
        max: 0,
        needed: 600,
        rewards: [
            {type: 'base', name: 'villageLootGain', amount: 0.5}
        ]
    }
}
