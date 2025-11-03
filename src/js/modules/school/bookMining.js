export default {
    damage: {subfeature: 0, scalesWithGL: true, minGL: 25, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    oreAluminiumCap: {subfeature: 0, scalesWithGL: true, minGL: 40, maxGL: 139, effect: [
        {name: 'currencyMiningOreAluminiumCap', type: 'base', value: lvl => lvl * 8}
    ]},
    oreGain: {subfeature: 0, scalesWithGL: true, minGL: 50, maxGL: 249, effect: [
        {name: 'miningOreGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    oreCopperCap: {subfeature: 0, scalesWithGL: true, minGL: 55, maxGL: 154, effect: [
        {name: 'currencyMiningOreCopperCap', type: 'base', value: lvl => lvl * 4}
    ]},
    scrapGain: {subfeature: 0, scalesWithGL: true, minGL: 75, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    oreTinCap: {subfeature: 0, scalesWithGL: true, minGL: 75, maxGL: 174, effect: [
        {name: 'currencyMiningOreTinCap', type: 'base', value: lvl => lvl * 3}
    ]},
    scrapCap: {subfeature: 0, scalesWithGL: true, minGL: 100, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    oreIronCap: {subfeature: 0, scalesWithGL: true, minGL: 105, maxGL: 204, effect: [
        {name: 'currencyMiningOreIronCap', type: 'base', value: lvl => lvl * 2}
    ]},
    oreTitaniumCap: {subfeature: 0, scalesWithGL: true, minGL: 145, maxGL: 244, effect: [
        {name: 'currencyMiningOreTitaniumCap', type: 'base', value: lvl => lvl}
    ]},
    emberCap: {subfeature: 0, alwaysActive: true, scalesWithGL: true, minGL: 160, effect: [
        {name: 'currencyMiningEmberCap', type: 'base', value: lvl => lvl * 2}
    ]},
    corrosiveFumesUncap: {subfeature: 0, minGL: 175, raiseOtherCap: 'mining_corrosiveFumes', effect: [
        {name: 'mining_corrosiveFumes', type: 'uncapUpgrade', value: lvl => lvl >= 1}
    ]},
    orePlatinumCap: {subfeature: 0, scalesWithGL: true, minGL: 200, maxGL: 299, effect: [
        {name: 'currencyMiningOrePlatinumCap', type: 'base', value: lvl => lvl}
    ]},
    oreIridiumCap: {subfeature: 0, scalesWithGL: true, minGL: 285, maxGL: 384, effect: [
        {name: 'currencyMiningOreIridiumCap', type: 'base', value: lvl => lvl}
    ]},
    oreOsmiumCap: {subfeature: 0, scalesWithGL: true, minGL: 375, maxGL: 474, effect: [
        {name: 'currencyMiningOreOsmiumCap', type: 'base', value: lvl => lvl}
    ]},
    oreLeadCap: {subfeature: 0, scalesWithGL: true, minGL: 475, maxGL: 574, effect: [
        {name: 'currencyMiningOreLeadCap', type: 'base', value: lvl => lvl}
    ]},

    damage2: {subfeature: 1, scalesWithGL: true, minGL: 25, effect: [
        {name: 'miningDamage', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    scrapCap2: {subfeature: 1, scalesWithGL: true, minGL: 50, effect: [
        {name: 'currencyMiningScrapCap', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    smokeCap: {subfeature: 1, scalesWithGL: true, minGL: 75, maxGL: 174, effect: [
        {name: 'currencyMiningSmokeCap', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    scrapGain2: {subfeature: 1, scalesWithGL: true, minGL: 100, effect: [
        {name: 'currencyMiningScrapGain', type: 'mult', value: lvl => Math.pow(1.01, lvl)}
    ]},
    smokeGain: {subfeature: 1, scalesWithGL: true, minGL: 125, maxGL: 224, effect: [
        {name: 'currencyMiningSmokeGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
}
