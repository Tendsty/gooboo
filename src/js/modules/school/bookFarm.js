export default {
    vegetableGain: {subfeature: 0, scalesWithGL: true, minGL: 10, effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: lvl => Math.pow(1.005, lvl)}
    ]},
    berryGain: {subfeature: 0, scalesWithGL: true, minGL: 10, effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: lvl => Math.pow(1.005, lvl)}
    ]},
    grainGain: {subfeature: 0, scalesWithGL: true, minGL: 10, effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: lvl => Math.pow(1.005, lvl)}
    ]},
    flowerGain: {subfeature: 0, scalesWithGL: true, minGL: 10, effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: lvl => Math.pow(1.005, lvl)}
    ]},
    grassCap: {subfeature: 0, scalesWithGL: true, minGL: 30, maxGL: 129, effect: [
        {name: 'currencyFarmGrassCap', type: 'base', value: lvl => lvl * 6}
    ]},
    seedHullCap: {subfeature: 0, scalesWithGL: true, minGL: 60, maxGL: 159, effect: [
        {name: 'currencyFarmSeedHullCap', type: 'base', value: lvl => lvl * 6}
    ]},
    bugCap: {subfeature: 0, scalesWithGL: true, minGL: 80, maxGL: 179, effect: [
        {name: 'currencyFarmBugCap', type: 'base', value: lvl => lvl * 3}
    ]},
    petalCap: {subfeature: 0, scalesWithGL: true, minGL: 100, maxGL: 199, effect: [
        {name: 'currencyFarmPetalCap', type: 'base', value: lvl => lvl * 2}
    ]},
    butterflyCap: {subfeature: 0, scalesWithGL: true, minGL: 140, maxGL: 238, effect: [
        {name: 'currencyFarmButterflyCap', type: 'base', value: lvl => Math.ceil(lvl / 2)}
    ]},
    ladybugCap: {subfeature: 0, scalesWithGL: true, minGL: 180, maxGL: 279, effect: [
        {name: 'currencyFarmLadybugCap', type: 'base', value: lvl => lvl * 3}
    ]},
    spiderCap: {subfeature: 0, scalesWithGL: true, minGL: 220, maxGL: 315, effect: [
        {name: 'currencyFarmSpiderCap', type: 'base', value: lvl => Math.ceil(lvl / 5)}
    ]},
    beeCap: {subfeature: 0, scalesWithGL: true, minGL: 260, maxGL: 359, effect: [
        {name: 'currencyFarmBeeCap', type: 'base', value: lvl => lvl * 10}
    ]},
    smallSeedCap: {subfeature: 0, scalesWithGL: true, minGL: 320, maxGL: 419, effect: [
        {name: 'currencyFarmSmallSeedCap', type: 'base', value: lvl => lvl * 8}
    ]},
}
