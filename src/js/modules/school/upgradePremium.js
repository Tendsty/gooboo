export default {
    student: {type: 'premium', price(lvl) {
        return {gem_ruby: [4, 5, 6, 7][lvl % 4] * Math.pow(2, Math.floor(lvl / 4)) * 50};
    }, effect: [
        {name: 'currencySchoolBookGain', type: 'base', value: lvl => 5 * lvl}
    ]},
}
