import Vue from "vue"
import { decapitalize } from "../js/utils/format";
import { getSequence } from "../js/utils/math";
import { HORDE_HEIRLOOM_CHANCE_PER_NOSTALGIA } from "../js/constants";

export default {
    namespaced: true,
    state: {
        items: {},
        cache: {}
    },
    getters: {
        get: (state) => (name, base = 0, mult = 1, bonus = 0) => {
            const item = state.items[name];
            if (!item) {
                return null;
            }

            let val = (item.baseCache + base) * item.multCache * mult + item.bonusCache + bonus;

            // Apply modifiers
            if (item.min !== null) {
                val = Math.max(val, item.min);
            }
            if (item.max !== null) {
                val = Math.min(val, item.max);
            }
            if (item.round) {
                val = Math.round(val);
            }
            if (item.roundNearZero && val < 0.000000001 && val > -0.000000001) {
                val = 0;
            }

            return val;
        },
        isUpgradeCap: () => (name) => {
            return name.match(/upgrade(\w|-)+Cap/);
        },
        isCurrencyCap: () => (name) => {
            return name.match(/currency(\w|-)+Cap/) && !name.match(/currency(\w|-)+Gain/);
        },
        isCurrencyGain: () => (name) => {
            return name.match(/currency(\w|-)+Gain/) && !name.match(/currency(\w|-)+CapGain/);
        },
        isHeirloomEffect: () => (name) => {
            return name.match(/(\w|-)+HeirloomEffect/) && name !== 'hordeHeirloomEffect';
        },
        isCryolabPassive: () => (name) => {
            return name.match(/(\w|-)+CryolabPassive\d+/);
        },
        isCryolabActive: () => (name) => {
            return name.match(/(\w|-)+CryolabActive\d+/);
        },
        getCurrencyName: () => (name, chars = 3) => {
            let parts = name.slice(8, 0 - chars).split(/(?=[A-Z])/);
            const feature = decapitalize(parts[0]);
            parts.splice(0, 1);
            const currency = decapitalize(parts.join(''));
            return `${feature}_${currency}`;
        },
        getUpgradeName: () => (name, chars = 3) => {
            let parts = name.slice(7, 0 - chars).split(/(?=[A-Z])/);
            const feature = decapitalize(parts[0]);
            parts.splice(0, 1);
            const upgrade = decapitalize(parts.join(''));
            return `${feature}_${upgrade}`;
        },
        needsTrigger: () => (name) => {
            return ['galleryInspirationStart'].includes(name);
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state.items, o.name, {
                feature: o.feature ?? 'meta',
                baseValue: o.baseValue ?? 0,
                baseCache: o.baseValue ?? 0,
                group: o.group ?? [],
                roundNearZero: o.roundNearZero ?? false,
                multCache: 1,
                bonusCache: 0,
                baseValues: {},
                multValues: {},
                bonusValues: {},
                min: o.min ?? null,
                max: o.max ?? null,
                round: o.round ?? false,
                display: o.display ?? 'number',
                unlock: o.unlock ?? null,
                type: o.type ?? null
            });
        },
        updateMultGroup(state, o) {
            Vue.set(state.items[o.key], 'group', o.value);
        },
        setBase(state, o) {
            Vue.set(state.items[o.name].baseValues, o.key, o.value);

            // update cache
            let val = state.items[o.name].baseValue;
            for (const [, elem] of Object.entries(state.items[o.name].baseValues)) {
                val += elem;
            }
            Vue.set(state.items[o.name], 'baseCache', val);
        },
        setMult(state, o) {
            Vue.set(state.items[o.name].multValues, o.key, o.value);

            // update cache
            let val = 1;
            for (const [, elem] of Object.entries(state.items[o.name].multValues)) {
                val *= elem;
            }
            Vue.set(state.items[o.name], 'multCache', val);
        },
        setBonus(state, o) {
            Vue.set(state.items[o.name].bonusValues, o.key, o.value);

            // update cache
            let val = 0;
            for (const [, elem] of Object.entries(state.items[o.name].bonusValues)) {
                val += elem;
            }
            Vue.set(state.items[o.name], 'bonusCache', val);
        },
        removeKey(state, o) {
            let newObj = {};
            for (const [key, elem] of Object.entries(state.items[o.name][o.type + 'Values'])) {
                if (key !== o.key) {
                    newObj[key] = elem;
                }
            }
            Vue.set(state.items[o.name], [o.type + 'Values'], newObj);

            // update cache
            let val = 0;
            if (o.type === 'base') {
                val = state.items[o.name].baseValue;
            } else if (o.type === 'mult') {
                val = 1;
            }
            for (const [, elem] of Object.entries(state.items[o.name][o.type + 'Values'])) {
                if (o.type === 'mult') {
                    val *= elem;
                } else {
                    val += elem;
                }
            }
            Vue.set(state.items[o.name], o.type + 'Cache', val);
        },
        setCacheKey(state, o) {
            Vue.set(state.cache, o.key, o.value);
        },
        clearCache(state) {
            Vue.set(state, 'cache', {});
        },
        resetMult(state, name) {
            Vue.set(state.items[name], 'multCache', 1);
            Vue.set(state.items[name], 'bonusCache', 0);
            Vue.set(state.items[name], 'baseValues', {});
            Vue.set(state.items[name], 'multValues', {});
            Vue.set(state.items[name], 'bonusValues', {});
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.items)) {
                commit('resetMult', key);
            }
            commit('clearCache');
        },
        addToGroup({ state, rootState, rootGetters, commit }, o) {
            let group = [...state.items[o.mult].group];
            const blacklist = o.blacklist ?? [];
            switch (o.name) {
                case 'upgradeCap': {
                    for (const [key, elem] of Object.entries(rootState.upgrade.item)) {
                        if (elem.feature === o.feature && !blacklist.includes(key) &&
                            (o.subtype === undefined || elem.subtype === o.subtype)
                        ) {
                            group.push(rootGetters['upgrade/capMultName'](...key.split('_')));
                        }
                    }
                    break;
                }
                case 'currencyCap': {
                    for (const [key, elem] of Object.entries(rootState.currency)) {
                        if (elem.feature === o.feature && !blacklist.includes(key) &&
                            (o.subtype === undefined || elem.subtype === o.subtype)
                        ) {
                            group.push(rootGetters['currency/capMultName'](...key.split('_')));
                        }
                    }
                    break;
                }
                case 'currencyGain': {
                    for (const [key, elem] of Object.entries(rootState.currency)) {
                        if (elem.feature === o.feature && !blacklist.includes(key) &&
                            (o.type === undefined || elem.type === o.type) &&
                            (o.subtype === undefined || elem.subtype === o.subtype)
                        ) {
                            group.push(rootGetters['currency/gainMultName'](...key.split('_')));
                        }
                    }
                    break;
                }
                case 'multType': {
                    for (const [key, elem] of Object.entries(state.items)) {
                        if (elem.type === o.type && !blacklist.includes(key)) {
                            group.push(key);
                        }
                    }
                    break;
                }
                default:
                    console.warn(`Mult group type ${o.type} not found`);
                    break;
            }
            commit('updateMultGroup', {key: o.mult, value: group});
        },
        setBase({ state, getters, commit, dispatch }, o) {
            const hasTrigger = o.trigger && getters.needsTrigger(o.name);
            const oldValue = hasTrigger ? getters.get(o.name) : null;
            commit('setBase', o);
            dispatch('updateExternalCaches', o.name);
            state.items[o.name].group.forEach(name => {
                dispatch('setBase', {...o, name});
            });
            if (hasTrigger) {
                dispatch('updateTriggerCaches', {name: o.name, oldValue});
            }
        },
        setMult({ state, getters, commit, dispatch }, o) {
            const hasTrigger = o.trigger && getters.needsTrigger(o.name);
            const oldValue = hasTrigger ? getters.get(o.name) : null;
            commit('setMult', o);
            dispatch('updateExternalCaches', o.name);
            state.items[o.name].group.forEach(name => {
                dispatch('setMult', {...o, name});
            });
            if (hasTrigger) {
                dispatch('updateTriggerCaches', {name: o.name, oldValue});
            }
        },
        setBonus({ state, getters, commit, dispatch }, o) {
            const hasTrigger = o.trigger && getters.needsTrigger(o.name);
            const oldValue = hasTrigger ? getters.get(o.name) : null;
            commit('setBonus', o);
            dispatch('updateExternalCaches', o.name);
            state.items[o.name].group.forEach(name => {
                dispatch('setBonus', {...o, name});
            });
            if (hasTrigger) {
                dispatch('updateTriggerCaches', {name: o.name, oldValue});
            }
        },
        removeKey({ state, commit, dispatch }, o) {
            commit('removeKey', o);
            dispatch('updateExternalCaches', o.name);
            state.items[o.name].group.forEach(name => {
                dispatch('removeKey', {...o, name});
            });
        },
        updateExternalCaches({ getters, commit, dispatch }, name) {
            if (getters.isUpgradeCap(name)) {
                dispatch('upgrade/updateCap', getters.getUpgradeName(name), {root: true});
            } else if (getters.isCurrencyCap(name)) {
                commit('currency/updateKey', {name: getters.getCurrencyName(name), key: 'cap', value: getters.get(name)}, {root: true});
                dispatch('currency/updateCurrencyMult', getters.getCurrencyName(name), {root: true});
            } else if (getters.isHeirloomEffect(name)) {
                dispatch('horde/applyHeirloomEffects', name.slice(0, -14), {root: true});
            } else if (name === 'villageOfferingPower') {
                dispatch('village/applyOfferingEffect', null, {root: true});
            } else if (name === 'villagePollution' || name === 'villagePollutionTolerance') {
                // Calculate village pollution effect on happiness
                const pollution = getters.get('villagePollution');
                const tolerance = getters.get('villagePollutionTolerance');
                let total = Math.min(pollution, tolerance);
                if (pollution > tolerance) {
                    total += getSequence(2, pollution - tolerance);
                }
                if (total > 0) {
                    dispatch('setBonus', {name: 'villageHappiness', key: 'villagePollution', value: 0 - total / 100});
                } else {
                    dispatch('removeKey', {name: 'villageHappiness', type: 'bonus', key: 'villagePollution'});
                }
            } else if (name === 'villagePower') {
                const power = getters.get('villagePower');
                const value = power * 0.2 + 1;
                if (value > 1) {
                    dispatch('setMult', {name: 'villageMaterialGain', key: 'villagePower', value});
                    dispatch('setMult', {name: 'villageFoodGain', key: 'villagePower', value});
                } else {
                    dispatch('removeKey', {name: 'villageMaterialGain', type: 'mult', key: 'villagePower'});
                    dispatch('removeKey', {name: 'villageFoodGain', type: 'mult', key: 'villagePower'});
                }
            } else if (name === 'villageHappiness') {
                const value = getters.get('villageHappiness');
                if (value === 1) {
                    dispatch('removeKey', {name: 'villageResourceGain', type: 'mult', key: 'villageHappiness'});
                } else {
                    dispatch('setMult', {name: 'villageResourceGain', key: 'villageHappiness', value});
                }
            } else if (name === 'hordeNostalgia') {
                const value = getters.get('hordeNostalgia');
                if (value > 0) {
                    dispatch('setBase', {name: 'hordeHeirloomChance', key: 'hordeNostalgia', value: value * HORDE_HEIRLOOM_CHANCE_PER_NOSTALGIA});
                } else {
                    dispatch('removeKey', {name: 'hordeHeirloomChance', type: 'base', key: 'hordeNostalgia'});
                }
            } else if (name.slice(0, 5) === 'horde') {
                dispatch('horde/updatePlayerCache', null, {root: true});
            }
        },
        updateTriggerCaches({ getters, dispatch }, o) {
            if (o.name === 'galleryInspirationStart') {
                dispatch('currency/gain', {feature: 'gallery', name: 'inspiration', amount: getters.get(o.name) - o.oldValue}, {root: true});
            }
        }
    }
}
