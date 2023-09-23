export default {
    extraBuildingSlot: {type: 'summerFestival', cap: 3, price(lvl) {
        return {gem_topaz: Math.pow(2, lvl) * 250};
    }, effect: [
        {name: 'summerFestivalBuildQueueSlots', type: 'base', value: lvl => lvl * 2}
    ]},
    doubleTime: {type: 'summerFestival', cap: 5, price(lvl) {
        return {gem_topaz: lvl * 100 + 200};
    }, effect: [
        {name: 'summerFestivalBuildQueueSpeed', type: 'mult', value: lvl => lvl + 1}
    ]},
    tropicalBlessing: {type: 'summerFestival', cap: 8, price(lvl) {
        return {gem_topaz: lvl * 50 + 100};
    }, effect: [
        {name: 'summerFestivalMaterialGain', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'summerFestivalMaterialStackCap', type: 'base', value: lvl => lvl * 5}
    ]},
}
