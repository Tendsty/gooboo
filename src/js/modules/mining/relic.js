import store from "../../../store";
import { formatNum } from "../../utils/format";

export default {
    friendlyBat: {icon: 'mdi-bat', color: 'dark-grey', effect() {return [
        {name: 'currencyMiningScrapGain', type: 'mult', value: 1.25}
    ];}, glyph() {return {dust: 1, clay: 3};}, active: {
        cost: {relic_power: 8},
        params() {
            const maxPart = Math.pow(store.state.stat.mining_scrapMax.total, 0.5);
            const timePart = store.getters['mining/depthScrap'](store.state.stat[`mining_maxDepth${store.state.system.features.mining.currentSubfeature}`].value) * 1200;
            return [maxPart, timePart, maxPart + timePart];
        },
        description(params) {
            return [formatNum(params[2])];
        },
        formula(params) {
            return [formatNum(params[0]), formatNum(params[1])];
        },
        disabled() {
            return store.state.system.features.mining.currentSubfeature !== 0 || store.state.cryolab.mining.active;
        },
        trigger(params) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'scrap', amount: params[2]});
        }
    }},
    honeyPot: {icon: 'mdi-pot', color: 'amber', effect() {return [
        {name: 'miningResinMax', type: 'base', value: 1}
    ];}, glyph() {return {clay: 2, heat: 4};}, active: {
        cost: {relic_power: 10},
        params() {
            return [store.state.currency.mining_resin.cap];
        },
        description() {
            return [];
        },
        formula(params) {
            return [formatNum(params[0])];
        },
        disabled() {
            return store.state.system.features.mining.currentSubfeature !== 0 || store.state.cryolab.mining.active;
        },
        trigger(params) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'resin', amount: params[0]});
        }
    }},
}
