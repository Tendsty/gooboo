export default {
    moreSlots: {type: 'premium', price(lvl) {
        return {gem_ruby: lvl * 10 + 50};
    }, effect: [
        {name: 'treasureSlots', type: 'base', value: lvl => lvl}
    ]},
    moreFragments: {type: 'premium', price(lvl) {
        return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 150};
    }, effect: [
        {name: 'currencyTreasureFragmentGain', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]}
}
