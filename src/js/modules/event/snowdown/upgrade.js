export default {
    pineTrees: {type: 'snowdown', price(lvl) {
        return {event_sapling: 250 * Math.pow(lvl * 0.5 + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownAllAttack', type: 'mult', value: lvl => Math.pow(1.02, lvl) * (lvl * 0.05 + 1)}
    ]},
    woolHat: {type: 'snowdown', price(lvl) {
        return {event_yarn: 250 * Math.pow(lvl * 0.5 + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownAllHealth', type: 'mult', value: lvl => Math.pow(1.02, lvl) * (lvl * 0.05 + 1)},
        {name: 'snowdownAllDefense', type: 'mult', value: lvl => Math.pow(1.02, lvl) * (lvl * 0.05 + 1)},
    ]},
    cookies: {type: 'snowdown', price(lvl) {
        return {event_dough: 250 * Math.pow(lvl * 0.5 + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownRevengeStats', type: 'base', value: lvl => lvl * 0.0005},
        {name: 'snowdownRevengeCrit', type: 'base', value: lvl => lvl * 0.06},
        {name: 'snowdownRevengeBlock', type: 'base', value: lvl => lvl * 0.04},
    ]},

    // topaz upgrades
    attackBoost: {type: 'snowdown', price(lvl) {
        return {gem_topaz: lvl * 50 + 150};
    }, effect: [
        {name: 'snowdownAllAttack', type: 'mult', value: lvl => lvl * 0.5 + 1}
    ]},
    healthBoost: {type: 'snowdown', price(lvl) {
        return {gem_topaz: lvl * 40 + 100};
    }, effect: [
        {name: 'snowdownAllHealth', type: 'mult', value: lvl => lvl * 0.5 + 1},
        {name: 'snowdownAllDefense', type: 'mult', value: lvl => lvl * 0.5 + 1},
    ]},
}
