export default {
    attack: {subfeature: 0, scalesWithGL: true, minGL: 25, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    health: {subfeature: 0, scalesWithGL: true, minGL: 25, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    boneGain: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    boneCap: {subfeature: 0, scalesWithGL: true, minGL: 50, effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => Math.pow(1.015, lvl)}
    ]},
    itemChance: {subfeature: 0, scalesWithGL: true, minGL: 60, maxGL: 159, effect: [
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    monsterPartCap: {subfeature: 0, scalesWithGL: true, minGL: 80, maxGL: 179, effect: [
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    corruptedFleshGain: {subfeature: 0, scalesWithGL: true, minGL: 120, maxGL: 219, effect: [
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    shardChance: {subfeature: 0, scalesWithGL: true, minGL: 150, maxGL: 249, effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},

    attack2: {subfeature: 1, scalesWithGL: true, minGL: 10, effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    health2: {subfeature: 1, scalesWithGL: true, minGL: 10, effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    bloodGain: {subfeature: 1, scalesWithGL: true, minGL: 20, maxGL: 119, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    bloodCap: {subfeature: 1, scalesWithGL: true, minGL: 30, maxGL: 129, effect: [
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
}
