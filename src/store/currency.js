import Vue from "vue";
import { capitalize } from "../js/utils/format";

const typeList = {
    gem: [
        'gem_ruby',
        'gem_emerald',
        'gem_sapphire',
        'gem_amethyst',
        'gem_topaz',
        'gem_diamond',
        'gem_onyx',
    ],
    eventToken: [
        'event_cindersToken',
        'event_bloomToken',
        'event_weatherChaosToken',
        'event_summerFestivalToken',
        'event_nightHuntToken',
        'event_snowdownToken',
    ],
    farmRareResource: [
        'farm_gold',
    ]
};

export default {
    namespaced: true,
    state: {},
    getters: {
        value: (state) => (name) => {
            return Math.min(state[name].value, state[name].cap ?? Infinity);
        },
        gainMultName: () => (feature, name) => {
            return 'currency' + capitalize(feature) + capitalize(name) + 'Gain';
        },
        capMultName: () => (feature, name) => {
            return 'currency' + capitalize(feature) + capitalize(name) + 'Cap';
        },
        list: (state) => (feature, type = null, subtype = null) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state)) {
                if (elem.feature === feature && (type === null || elem.type === type) && (subtype === null || elem.subtype === subtype)) {
                    arr.push(key);
                }
            }
            return arr;
        },
        contains: () => (obj, type = 'gem') => {
            for (const [key] of Object.entries(obj)) {
                if (typeList[type].includes(key)) {
                    return true;
                }
            }
            return false;
        },
        filterPrice: () => (obj, type = 'gem') => {
            let newObj = {};
            for (const [key, elem] of Object.entries(obj)) {
                if (typeList[type].includes(key)) {
                    newObj[key] = elem;
                }
            }
            return newObj;
        },
        canAfford: (state, getters) => (total = {}, highest = {}) => {
            for (const [key, elem] of Object.entries(total)) {
                if (state[key].value < elem) {
                    return false;
                }
            }
            for (const [key, elem] of Object.entries(highest)) {
                if (getters.value(key) < elem) {
                    return false;
                }
            }
            return true;
        }
    },
    mutations: {
        init(state, o) {
            const feature = o.feature ?? 'meta';
            const name = feature + '_' + o.name;

            Vue.set(state, name, {
                feature: feature,
                type: o.type ?? 'regular',
                subtype: o.subtype ?? null,
                value: 0,
                alwaysVisible: o.alwaysVisible ?? false,
                cap: o.capMult ? o.capMult.baseValue : null,
                showGainMult: o.showGainMult ?? false,
                hideGainTag: o.hideGainTag ?? false,
                currencyMult: o.currencyMult ?? null,
                overcapMult: o.overcapMult ?? 0.25,
                overcapScaling: o.overcapScaling ?? 0.5,
                showGainTimer: o.showGainTimer ?? false,
                gainTimerFunction: o.gainTimerFunction ?? null,
                timerIsEstimate: o.timerIsEstimate ?? false,
                color: o.color ?? '#808080',
                icon: o.icon ?? 'mdi-sack'
            });
        },
        add(state, o) {
            const name = o.feature + '_' + o.name;
            Vue.set(state[name], 'value', state[name].value + o.amount);
        },
        spend(state, o) {
            const name = o.feature + '_' + o.name;
            Vue.set(state[name], 'value', state[name].value - o.amount);
        },
        spendAll(state, o) {
            const name = o.feature + '_' + o.name;
            Vue.set(state[name], 'value', 0);
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'value', value: 0});
            }
        },
        init({ getters, commit }, o) {
            const feature = o.feature ?? 'meta';

            if (o.gainMult !== undefined) {
                commit('mult/init', {feature, name: getters.gainMultName(feature, o.name), unlock: o.multUnlock ?? null, ...o.gainMult}, {root: true});
            }
            if (o.capMult !== undefined) {
                commit('mult/init', {feature, name: getters.capMultName(feature, o.name), unlock: o.multUnlock ?? null, ...o.capMult}, {root: true});
            }

            commit('init', o);
            commit('stat/init', {feature, name: o.name}, {root: true});
            commit('stat/init', {feature, name: o.name + 'Max'}, {root: true});
        },
        gain({ state, getters, rootState, rootGetters, commit, dispatch }, o) {
            const feature = o.feature ?? 'meta';
            const name = feature + '_' + o.name;
            let gained = 0;
            const amount = o.gainMult ? rootGetters['mult/get'](getters.gainMultName(feature, o.name), o.amount) : o.amount;
            if (state[name].cap === null) {
                gained = amount;
            } else if (state[name].overcapMult > 0) {
                let stage = Math.floor(state[name].value / state[name].cap);
                let amt = amount;
                while (amt > 0) {
                    const left = state[name].cap * (stage + 1) - state[name].value - gained;
                    const stageMult = stage > 0 ? (state[name].overcapMult * Math.pow(state[name].overcapScaling, stage - 1)) : 1;
                    const given = Math.min(left, amt * stageMult);

                    gained += given;
                    amt -= given / stageMult;
                    stage++;
                }
            } else {
                gained = Math.min(state[name].value + amount, state[name].cap) - state[name].value;
            }
            if (gained < 0) {
                gained = 0;
            }
            commit('add', {feature, name: o.name, amount: gained});
            if (!o.refund) {
                commit('stat/add', {feature, name: o.name, value: gained}, {root: true});
            }
            if (name === 'gem_topaz' && gained < amount && rootState.event.bank_loan > 0) {
                commit('event/updateKey', {key: 'bank_loan', value: Math.max(0, rootState.event.bank_loan + gained - amount)}, {root: true});
            }
            commit('stat/increaseTo', {feature, name: o.name + 'Max', value: state[name].value}, {root: true});
            dispatch('updateCurrencyMult', name);
        },
        spend({ commit, dispatch }, o) {
            const feature = o.feature ?? 'meta';
            commit('spend', {feature, ...o});
            dispatch('updateCurrencyMult', (o.feature ?? 'meta') + '_' + o.name);
        },
        spendAll({ commit, dispatch }, o) {
            const feature = o.feature ?? 'meta';
            commit('spendAll', {feature, ...o});
            dispatch('updateCurrencyMult', (o.feature ?? 'meta') + '_' + o.name);
        },
        reset({ state, commit, dispatch }, o) {
            for (const [key, elem] of Object.entries(state)) {
                if (elem.feature === o.feature && (o.type === undefined || elem.type === o.type)) {
                    commit('updateKey', {name: key, key: 'value', value: 0});
                    dispatch('updateCurrencyMult', key);
                }
            }
        },
        updateCurrencyMult({ state, getters, dispatch }, name) {
            if (state[name].currencyMult) {
                for (const [key, elem] of Object.entries(state[name].currencyMult)) {
                    const value = elem.value(getters.value(name));
                    if (elem.type === 'mult' && value !== 1) {
                        dispatch('mult/setMult', {name: key, key: 'currencyMult_' + name, value}, {root: true});
                    } else if (elem.type === 'base' && value !== 0) {
                        dispatch('mult/setBase', {name: key, key: 'currencyMult_' + name, value}, {root: true});
                    } else if (elem.type === 'bonus' && value !== 0) {
                        dispatch('mult/setBonus', {name: key, key: 'currencyMult_' + name, value}, {root: true});
                    } else {
                        dispatch('mult/removeKey', {name: key, type: elem.type, key: 'currencyMult_' + name}, {root: true});
                    }
                }
            }
        }
    }
}
