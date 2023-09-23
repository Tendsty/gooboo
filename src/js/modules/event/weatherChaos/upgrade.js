import { getSequence } from "../../../utils/math";

export default {
    juicyBait: {type: 'weatherChaos', price(lvl) {
        return {event_algae: Math.pow(1.35 + 0.08 * lvl, lvl) * 500};
    }, effect: [
        {name: 'weatherChaosFishSizeMax', type: 'base', value: lvl => lvl * 0.1},
        {name: 'weatherChaosFishSizeMax', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    incubator: {type: 'weatherChaos', price(lvl) {
        return {event_driftwood: Math.pow(1.25 + 0.065 * lvl, lvl) * 250};
    }, effect: [
        {name: 'weatherChaosFishSizeAverage', type: 'base', value: lvl => lvl * 0.2},
        {name: 'weatherChaosFishSizeAverage', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    fishWhistle: {type: 'weatherChaos', price(lvl) {
        return {event_plastic: Math.pow(1.15 + 0.015 * lvl, lvl) * 100};
    }, effect: [
        {name: 'weatherChaosFishingPower', type: 'base', value: lvl => getSequence(1, lvl) * 0.1 + lvl}
    ]},
    pollution: {type: 'weatherChaos', price(lvl) {
        return {event_slime: Math.pow(1.35, lvl) * 100};
    }, effect: [
        {name: 'weatherChaosTrashGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    goldenHook: {type: 'weatherChaos', cap: 4, price(lvl) {
        return {gem_topaz: lvl * 250 + 500};
    }, effect: [
        {name: 'weatherChaosFishingTime', type: 'mult', value: lvl => 1 / (lvl * 0.25 + 1)}
    ]},
}
