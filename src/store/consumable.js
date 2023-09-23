import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    getters: {
        canAfford: (state, getters, rootState, rootGetters) => (name) => {
            if (state[name].amount >= 1) {
                return true;
            }
            if (state[name].price === null) {
                return false;
            }
            let canAfford = true;
            for (const [key, elem] of Object.entries(state[name].price)) {
                if (rootGetters['currency/value'](key) < elem) {
                    canAfford = false;
                }
            }
            return canAfford;
        },
        priceMultiple: (state) => (obj) => {
            let price = {};
            let hasUnobtainable = false;
            for (const [key, elem] of Object.entries(obj)) {
                const diff = elem - state[key].amount;
                if (diff > 0) {
                    if (state[key].price === null) {
                        hasUnobtainable = true;
                    } else {
                        for (const [currency, cval] of Object.entries(state[key].price)) {
                            if (price[currency] === undefined) {
                                price[currency] = 0;
                            }
                            price[currency] += cval * diff;
                        }
                    }
                }
            }
            return {price, hasUnobtainable};
        },
        canAffordMultiple: (state, getters, rootState, rootGetters) => (obj) => {
            let canAfford = true;
            const priceBase = getters.priceMultiple(obj);
            if (priceBase.hasUnobtainable) {
                return false;
            }
            for (const [key, elem] of Object.entries(priceBase.price)) {
                if (rootGetters['currency/value'](key) < elem) {
                    canAfford = false;
                }
            }
            return canAfford;
        }
    },
    mutations: {
        init(state, o) {
            const feature = o.feature ?? 'meta';
            Vue.set(state, feature + '_' + o.name, {
                feature,
                amount: 0,
                found: o.found ?? false,
                foundDefault: o.found ?? false,
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'red',
                price: o.price ?? null
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key, elem] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'amount', value: 0});
                commit('updateKey', {name: key, key: 'found', value: elem.foundDefault});
            }
        },
        use({ state, getters, commit, dispatch }, name) {
            if (getters.canAfford(name)) {
                if (state[name].amount >= 1) {
                    commit('updateKey', {name, key: 'amount', value: state[name].amount - 1});
                } else if (state[name].price !== null) {
                    for (const [key, elem] of Object.entries(state[name].price)) {
                        dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem}, {root: true});
                    }
                }
            }
        },
        useMultiple({ state, getters, commit, dispatch }, obj) {
            if (getters.canAffordMultiple(obj)) {
                for (let [key, elem] of Object.entries(obj)) {
                    if (state[key].amount >= elem) {
                        commit('updateKey', {name: key, key: 'amount', value: state[key].amount - elem});
                    } else if (state[key].price !== null) {
                        elem -= state[key].amount;
                        commit('updateKey', {name: key, key: 'amount', value: 0});
                        for (const [ckey, cval] of Object.entries(state[key].price)) {
                            dispatch('currency/spend', {feature: ckey.split('_')[0], name: ckey.split('_')[1], amount: elem * cval}, {root: true});
                        }
                    }
                }
            }
        },
        gain({ state, commit }, o) {
            if (!state[o.name].found) {
                commit('updateKey', {name: o.name, key: 'found', value: true});
            }
            commit('updateKey', {name: o.name, key: 'amount', value: state[o.name].amount + o.amount});
        }
    }
}
