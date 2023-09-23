export default {
    pineTrees: {type: 'snowdown', price(lvl) {
        return {event_sapling: 250 * Math.pow(lvl + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownAttack', type: 'base', value: lvl => lvl * 0.5}
    ]},
    woolHat: {type: 'snowdown', price(lvl) {
        return {event_yarn: 250 * Math.pow(lvl + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownHealth', type: 'base', value: lvl => lvl * 5}
    ]},
    mulledWine: {type: 'snowdown', price(lvl) {
        return {event_cinnamon: 200 * Math.pow(lvl + 1, 2) * Math.pow(2 + lvl * 0.1, lvl)};
    }, effect: [
        {name: 'snowdownBlockRating', type: 'base', value: lvl => lvl * 2.5}
    ]},
    cookies: {type: 'snowdown', price(lvl) {
        return {event_dough: 200 * Math.pow(lvl + 1, 2) * Math.pow(2 + lvl * 0.1, lvl)};
    }, effect: [
        {name: 'snowdownCritRating', type: 'base', value: lvl => lvl * 5}
    ]},
    iceSculpture: {type: 'snowdown', price(lvl) {
        return {event_water: 250 * Math.pow(lvl + 1, 2) * Math.pow(2, lvl)};
    }, effect: [
        {name: 'snowdownLootRating', type: 'base', value: lvl => lvl * 2.5}
    ]},

    // topaz upgrades
    attackBoost: {type: 'snowdown', cap: 2, price(lvl) {
        return {gem_topaz: Math.pow(2, lvl) * 400};
    }, effect: [
        {name: 'snowdownAllAttack', type: 'mult', value: lvl => Math.pow(1.8, lvl)}
    ]},
    healthBoost: {type: 'snowdown', cap: 2, price(lvl) {
        return {gem_topaz: Math.pow(2, lvl) * 400};
    }, effect: [
        {name: 'snowdownAllHealth', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    lootBoost: {type: 'snowdown', cap: 3, price(lvl) {
        return {gem_topaz: Math.pow(2, lvl) * 300};
    }, effect: [
        {name: 'snowdownLootRating', type: 'base', value: lvl => lvl * 6}
    ]}
}
