import { fallbackArray } from "../../utils/array";

export default {
    student: {type: 'premium', price(lvl) {
        return {gem_ruby: fallbackArray([5, 20, 60, 125], [4, 5, 6, 7][lvl % 4] * Math.pow(2, Math.floor(lvl / 4)) * 25, lvl)};
    }, effect: [
        {name: 'currencySchoolBookGain', type: 'base', value: lvl => 5 * lvl}
    ]},
}
