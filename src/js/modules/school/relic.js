import store from "../../../store";
import { SCHOOL_EXAM_DUST_MIN } from "../../constants";
import { formatInt } from "../../utils/format";

export default {
    notebook: {icon: 'mdi-notebook', color: 'green', effect() {return [
        {name: 'currencySchoolGoldenDustCap', type: 'base', value: 2000}
    ];}, glyph() {return {book: 3};}, active: {
        cost: {relic_power: 3},
        params() {
            return [1000, 5000];
        },
        description(params, option) {
            return [formatInt(params[option ? 1 : 0])];
        },
        formula(params) {
            return [formatInt(params[0]), formatInt(params[1])];
        },
        disabled(params, option) {
            return option && store.state.currency.school_examPass.value < 1;
        },
        trigger(params, option) {
            if (option) {
                if (store.state.currency.school_examPass.value >= 1) {
                    store.dispatch('currency/spend', {feature: 'school', name: 'examPass', amount: 1}, {root: true});
                    store.dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: Math.round(SCHOOL_EXAM_DUST_MIN * store.getters['school/dustMult'])}, {root: true});
                    store.commit('stat/add', {feature: 'school', name: 'totalPoints', value: params[1]}, {root: true});
                }
            } else {
                store.commit('stat/add', {feature: 'school', name: 'totalPoints', value: params[0]}, {root: true});
            }
        }
    }},
}
