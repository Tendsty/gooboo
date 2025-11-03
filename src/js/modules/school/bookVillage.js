export default {
    coinCap: {subfeature: 0, scalesWithGL: true, minGL: 25, maxGL: 124, effect: [
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 50}
    ]},
    plantFiberCap: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    woodCap: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    stoneCap: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    metalCap: {subfeature: 0, scalesWithGL: true, minGL: 50, maxGL: 149, effect: [
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    taxRate: {subfeature: 0, scalesWithGL: true, minGL: 60, maxGL: 109, effect: [
        {name: 'villageTaxRate', type: 'base', value: lvl => lvl * 0.004}
    ]},
    waterCap: {subfeature: 0, scalesWithGL: true, minGL: 80, maxGL: 179, effect: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.04 + 1}
    ]},
    glassCap: {subfeature: 0, scalesWithGL: true, minGL: 90, maxGL: 189, effect: [
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    knowledgeCap: {subfeature: 0, scalesWithGL: true, minGL: 100, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl}
    ]},
    hardwoodCap: {subfeature: 0, scalesWithGL: true, minGL: 150, maxGL: 249, effect: [
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    gemCap: {subfeature: 0, scalesWithGL: true, minGL: 150, maxGL: 249, effect: [
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},

    plantFiberCap2: {subfeature: 1, scalesWithGL: true, minGL: 20, maxGL: 119, effect: [
        {name: 'currencyVillagePlantFiberCap', type: 'base', value: lvl => lvl * 30}
    ]},
    woodCap2: {subfeature: 1, scalesWithGL: true, minGL: 25, maxGL: 124, effect: [
        {name: 'currencyVillageWoodCap', type: 'base', value: lvl => lvl * 30}
    ]},
    stoneCap2: {subfeature: 1, scalesWithGL: true, minGL: 30, maxGL: 129, effect: [
        {name: 'currencyVillageStoneCap', type: 'base', value: lvl => lvl * 30}
    ]},
    metalCap2: {subfeature: 1, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyVillageMetalCap', type: 'base', value: lvl => lvl * 15}
    ]},
    waterCap2: {subfeature: 1, scalesWithGL: true, minGL: 60, maxGL: 159, effect: [
        {name: 'currencyVillageWaterCap', type: 'base', value: lvl => lvl * 15}
    ]},
    glassCap2: {subfeature: 1, scalesWithGL: true, minGL: 80, maxGL: 179, effect: [
        {name: 'currencyVillageGlassCap', type: 'base', value: lvl => lvl * 15}
    ]},
    hardwoodCap2: {subfeature: 1, scalesWithGL: true, minGL: 110, maxGL: 209, effect: [
        {name: 'currencyVillageHardwoodCap', type: 'base', value: lvl => lvl * 15}
    ]},
    gemCap2: {subfeature: 1, scalesWithGL: true, minGL: 140, maxGL: 239, effect: [
        {name: 'currencyVillageGemCap', type: 'base', value: lvl => lvl * 15}
    ]},
}
