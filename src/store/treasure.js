import Vue from "vue";
import { TREASURE_EVENT_POWER_PER_LEVEL, TREASURE_EVENT_POWER_PER_TIER, TREASURE_FRAGMENT_BUY_COST, TREASURE_FRAGMENT_BUY_GAIN, TREASURE_TIER_DESTROY_MULT, TREASURE_TIER_UPGRADE_MULT } from "../js/constants";
import { chance, randomElem } from "../js/utils/random";
import { roundNear } from "../js/utils/format";
import { getSequence, logBase } from "../js/utils/math";

export default {
    namespaced: true,
    state: {
        // Contains all equipped treasure items
        items: [],

        // Contains the new bought item (or null)
        newItem: null,

        // Contains all features with their possible effects
        effect: {},

        // Contains all different types of treasure
        type: {},

        // Contains all tier colors
        tierColor: [
            'lighter-grey', 'yellow', 'orange', 'red', 'pink',
            'purple', 'indigo', 'blue', 'teal', 'green',
            'light-green', 'lime', 'amber', 'orange-red', 'red-pink',
            'pink-purple', 'dark-blue', 'light-blue', 'cyan'
        ],

        // Contains a list of all effects, also used to apply the mults
        effectCache: {},
        eventPowerCache: 0,

        // Contains all modifiers
        modifier: {},

        // Special modes (upgrade item using fragments or destroy items to get fragments)
        upgrading: false,
        deleting: false
    },
    getters: {
        tierChances: (state, getters, rootState) => {
            let chances = [];
            let chanceValue = rootState.meta.globalLevel / 1000;

            while (chanceValue > 0) {
                chances.push(chanceValue);

                chanceValue *= 0.9;
                chanceValue -= 0.2;
            }

            return chances;
        },
        tierChancesRaw: (state, getters) => {
            let arr = [];
            let tier = 0;
            let totalChance = 0;

            const upgradeChances = getters.tierChances;

            if (upgradeChances.length <= 0) {
                return [{tier: 0, chance: 1, wildcardChance: getters.wildcardChance(0)}];
            }

            upgradeChances.forEach((elem, key) => {
                if (elem < 1) {
                    const chance = (1 - totalChance) * (1 - elem)
                    arr.push({tier, chance, wildcardChance: getters.wildcardChance(tier)});
                    totalChance += chance;
                }
                tier++;
                if ((key + 1) >= upgradeChances.length) {
                    arr.push({tier, chance: (1 - totalChance), wildcardChance: getters.wildcardChance(tier)});
                }
            });

            return arr;
        },
        tierPrice: () => (tier) => {
            return (getSequence(1, tier + 1) + 4) * 3;
        },
        treasurePrice: (state, getters) => (type) => {
            return getters.tierChancesRaw.reduce((a, b) => a + b.chance * getters.tierPrice(b.tier), 0) * state.type[type].buyPrice;
        },
        effectValue: (state) => (name, tier = 0, level = 0, mult = 1) => {
            if (name === null) {
                return null;
            }
            const effect = state.effect[name];
            const effectiveTier = tier + roundNear(logBase(level / 5 + 1, 2)) + 1 - effect.minTier;
            switch (effect.scaling) {
                case 'divisive':
                case 'multiplicative':
                    return (Math.pow(effect.value + 1, effectiveTier) - 1) * mult;
                case 'additive':
                    return effect.value * effectiveTier * mult + 1;
            }
            return 1;
        },
        destroyFragments: (state, getters, rootState, rootGetters) => (tier, type) => {
            return rootGetters['mult/get']('currencyTreasureFragmentGain', Math.pow(TREASURE_TIER_DESTROY_MULT, tier) * state.type[type].destroyPrice);
        },
        upgradeFragments: (state) => (tier, level, type) => {
            const typeObj = state.type[type];
            if (typeObj.upgradePrice === null || (level >= typeObj.upgradeLimit && typeObj.upgradeScaling === null)) {
                return null;
            }
            return Math.round(Math.pow(TREASURE_TIER_UPGRADE_MULT, tier) * Math.pow(typeObj.upgradeScaling, Math.max(0, level - typeObj.upgradeLimit)) * typeObj.upgradePrice);
        },
        wildcardChance: () => (tier) => {
            return 0.6 / (tier + 2);
        },
        averageFragments: (state, getters) => {
            return getters.tierChancesRaw.reduce((a, b) => a + b.chance * getters.destroyFragments(b.tier, 'regular'), 0);
        },
        fragmentGain: (state, getters) => {
            return Math.round(getters.averageFragments * TREASURE_FRAGMENT_BUY_GAIN * TREASURE_FRAGMENT_BUY_COST / getters.treasurePrice('regular'));
        },
        visibleTypes: (state, getters, rootState) => {
            let visibleTypes = ['regular'];
            if (rootState.unlock.treasurePrestigious.see) {
                visibleTypes.push('prestige');
            }
            return visibleTypes;
        },
        visibleEffect: (state, getters, rootState) => {
            let effectList = {};
            let highestTier = getters.tierChances.length - 1;
            for (const [key, elem] of Object.entries(state.effect)) {
                if (
                    (elem.feature === 'mining' || rootState.unlock[`${elem.feature}Feature`].see) &&
                    (elem.unlock === null || rootState.unlock[elem.unlock].see) &&
                    getters.visibleTypes.includes(elem.type) && highestTier >= elem.minTier
                ) {
                    effectList[key] = elem;
                }
            }
            return effectList;
        },
        eligibleEffects: (state, getters, rootState) => (type, tier, feature = null) => {
            let effectList = [];
            for (const [key, elem] of Object.entries(state.effect)) {
                if (
                    (elem.feature === 'mining' || rootState.unlock[`${elem.feature}Feature`].see) &&
                    (elem.unlock === null || rootState.unlock[elem.unlock].see) &&
                    (feature === null || elem.feature === feature) &&
                    elem.type === type && tier >= elem.minTier
                ) {
                    effectList.push(key);
                }
            }
            return effectList;
        },
        generateItem: (state, getters, rootState, rootGetters) => (type, tier = 0, auto = false, rngSkip = 0, bonusTier = 0) => {
            let rngGen = rootGetters['system/getRng']('treasure_' + type, rngSkip);
            let effectList = {};
            let chosenEffect = [];
            let eligibleFeatures = [];
            for (const [, elem] of Object.entries(state.effect)) {
                if (
                    !eligibleFeatures.includes(elem.feature) &&
                    (elem.feature === 'mining' || rootState.unlock[`${elem.feature}Feature`].see) &&
                    (elem.unlock === null || rootState.unlock[elem.unlock].see) &&
                    elem.type === type && tier >= elem.minTier
                ) {
                    eligibleFeatures.push(elem.feature);
                }
            }
            const chosenFeature = randomElem(eligibleFeatures);

            state.type[type].slots.forEach(slot => {
                if (!chance(getters.wildcardChance(tier), rngGen())) {
                    if (effectList[slot.type] === undefined) {
                        effectList[slot.type] = getters.eligibleEffects(slot.type, tier, chosenFeature);
                    }
                    const chosenElem = randomElem(effectList[slot.type], rngGen());
                    if (chosenElem !== null) {
                        effectList[slot.type] = effectList[slot.type].filter(el => el !== chosenElem);
                    }
                    chosenEffect.push(chosenElem);
                } else {
                    chosenEffect.push(null);
                }
            });

            let level = 0;
            if (auto) {
                const tierChances = getters.tierChances;
                const tierValue = Math.max(0, tierChances.length * 5 + Math.floor(tierChances[tierChances.length - 1] * 22.5) + bonusTier);
                tier = Math.floor(tierValue / 5);
                level = tierValue % 5;
            }

            return {
                tier,
                type: type,
                level,
                fragmentsSpent: Math.round(state.type[type].destroyPrice * level * 0.6), // track spent fragments to refund the correct amount, even after balance changes
                effect: chosenEffect,
                modifier: [],
                valueCache: chosenEffect.map((el, i) => getters.effectValue(
                    el,
                    tier,
                    level,
                    state.type[type].slots[i].power
                )),
                days: 0,
            };
        },
        firstEmptySlot: (state, getters, rootState, rootGetters) => {
            if (state.newItem === null) {
                return -1;
            }
            const id = state.items.findIndex(elem => elem === null);
            if (id !== -1) {
                return id;
            }
            if (state.items.length < rootGetters['mult/get']('treasureSlots')) {
                return state.items.length;
            }
            return null;
        },
        levelAtDay: (state) => (type, tier, days) => {
            const upgPrice = state.type[type].upgradePrice;
            const upgLimit = state.type[type].upgradeLimit;
            const upgScaling = state.type[type].upgradeScaling;
            let level = days / (tier * 0.2 + 0.8) / (upgPrice / 4);
            if (level > upgLimit) {
                level = upgLimit + logBase((level - upgLimit) / upgLimit + 1, Math.pow(upgScaling, 1.5));
            }
            return Math.floor(level);
        },
        maxEventPower: (state, getters, rootState) => {
            return Math.floor(rootState.meta.globalLevel / 5);
        },
        eventPowerPrestigeMult: (state, getters) => {
            return Math.min(state.eventPowerCache, getters.maxEventPower) * 0.0015 + 1;
        }
    },
    mutations: {
        initType(state, o) {
            Vue.set(state.type, o.name, {
                buyPrice: o.buyPrice ?? null,
                upgradePrice: o.upgradePrice ?? null,
                upgradeLimit: o.upgradeLimit ?? null,
                upgradeScaling: o.upgradeScaling ?? null,
                destroyPrice: o.destroyPrice ?? 10,
                slots: o.slots,
                maxModifiers: o.maxModifiers ?? 0,
                icon: o.icon ?? null
            });
        },
        initEffect(state, o) {
            Vue.set(state.effect, o.name, {
                feature: o.feature ?? 'meta',
                unlock: o.unlock ?? null,
                type: o.type ?? 'regular',
                icon: o.icon ?? 'mdi-circle',
                minTier: o.minTier ?? 0,
                max: o.max ?? null,
                value: o.value ?? 0,
                weight: o.weight ?? 1,
                scaling: o.scaling ?? 'multiplicative',
            });
        },
        initModifier(state, o) {
            Vue.set(state.modifier, o.name, {
                unique: o.unique ?? false,
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        setItem(state, o) {
            if (o.id === -1) {
                Vue.set(state, 'newItem', o.item);
            } else {
                Vue.set(state.items, o.id, o.item);
            }
        },
        updateItemKey(state, o) {
            if (o.id === -1) {
                Vue.set(state.newItem, o.key, o.value);
            } else {
                Vue.set(state.items[o.id], o.key, o.value);
            }
        },
        updateItemEffect(state, o) {
            if (o.id === -1) {
                Vue.set(state.newItem.effect, o.index, o.value);
            } else {
                Vue.set(state.items[o.id].effect, o.index, o.value);
            }
        },
        addItemModifier(state, o) {
            if (o.id === -1) {
                state.newItem.modifier.push(o.modifier);
            } else {
                state.items[o.id].modifier.push(o.modifier);
            }
        },
        moveItem(state, o) {
            while (state.items.length < (Math.max(o.from, o.to) + 1)) {
                state.items.push(null);
            }
            const fromContent = o.from === -1 ? state.newItem : state.items[o.from];
            const toContent = o.to === -1 ? state.newItem : state.items[o.to];

            // Cannot switch treasure in the temp slot or locked slots
            if ((o.from === -1 || o.from >= o.slots) && fromContent && toContent) {
                return;
            }

            if (o.from === -1) {
                Vue.set(state, 'newItem', toContent);
            } else {
                Vue.set(state.items, o.from, toContent);
            }
            if (o.to === -1) {
                Vue.set(state, 'newItem', fromContent);
            } else {
                Vue.set(state.items, o.to, fromContent);
            }

            while (state.items[state.items.length - 1] === null) {
                state.items.splice(state.items.length - 1, 1);
            }
        },
        deleteItem(state, id) {
            if (id === -1) {
                Vue.set(state, 'newItem', null);
            } else {
                Vue.set(state.items, id, null);
            }

            while (state.items[state.items.length - 1] === null) {
                state.items.splice(state.items.length - 1, 1);
            }
        },
        sortItems(state, slots) {
            const effectList = Object.keys(state.effect);
            const lockedItems = state.items.slice(slots);
            let newItems = state.items.slice(0, slots).sort((a, b) => {
                if (a === null) {
                    return 1;
                }
                if (b === null) {
                    return -1;
                }
                const effectA = effectList.findIndex(el => el === a.effect[0]);
                const effectB = effectList.findIndex(el => el === b.effect[0]);
                if (effectA === effectB) {
                    if (a.tier === b.tier) {
                        return a.level - b.level;
                    }
                    return a.tier - b.tier;
                }
                return effectA - effectB;
            });
            if (lockedItems.length <= 0) {
                newItems = newItems.filter(el => el !== null);
            }
            Vue.set(state, 'items', [...newItems, ...lockedItems]);
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'items', value: []});
            commit('updateKey', {key: 'newItem', value: null});
            commit('updateKey', {key: 'effectCache', value: {}});
            commit('updateKey', {key: 'eventPowerCache', value: 0});
            commit('updateKey', {key: 'upgrading', value: false});
            commit('updateKey', {key: 'deleting', value: false});
        },
        gain({ state, getters, rootGetters, commit }, type) {
            if (state.newItem === null) {

                // get tier based on first stored chance
                let rngGen = rootGetters['system/getRng']('treasureTier_' + type);
                commit('system/nextRng', {name: 'treasureTier_' + type, amount: 1}, {root: true});
                const nextChance = rngGen();

                let tier = null;
                let totalChance = 0;
                getters.tierChancesRaw.forEach(elem => {
                    totalChance += elem.chance;
                    if (tier === null && chance(totalChance, nextChance)) {
                        tier = elem.tier;
                    }
                });

                if (tier !== null) {
                    commit('updateKey', {key: 'newItem', value: getters.generateItem(type, tier)});
                    commit('system/nextRng', {name: 'treasure_' + type, amount: 1}, {root: true});
                } else {
                    console.error('Tier could not be defined');
                }
            }
        },
        buy({ state, getters, rootGetters, dispatch }, type) {
            const price = Math.round(getters.treasurePrice(type));
            if (state.newItem === null && rootGetters['currency/value']('gem_emerald') >= price) {
                dispatch('currency/spend', {feature: 'gem', name: 'emerald', amount: price}, {root: true});
                dispatch('gain', type);
            }
        },
        buyFragments({ getters, rootGetters, dispatch }) {
            if (rootGetters['currency/value']('gem_emerald') >= TREASURE_FRAGMENT_BUY_COST) {
                dispatch('currency/gain', {feature: 'treasure', name: 'fragment', amount: getters.fragmentGain}, {root: true});
                dispatch('currency/spend', {feature: 'gem', name: 'emerald', amount: TREASURE_FRAGMENT_BUY_COST}, {root: true});
            }
        },
        upgradeItem({ state, getters, rootGetters, commit, dispatch }, id) {
            const item = id === -1 ? state.newItem : state.items[id];
            if (item) {
                const cost = getters.upgradeFragments(item.tier, item.level, item.type);
                if (cost !== null && rootGetters['currency/value']('treasure_fragment') >= cost) {
                    dispatch('currency/spend', {feature: 'treasure', name: 'fragment', amount: cost}, {root: true});

                    // Increase level and update value cache
                    commit('updateItemKey', {id, key: 'fragmentsSpent', value: item.fragmentsSpent + cost});
                    commit('updateItemKey', {id, key: 'level', value: item.level + 1});
                    dispatch('updateItemCache', id);

                    // Refresh cache
                    dispatch('updateEffectCache');
                }
            }
        },
        winItem({ getters, commit, dispatch }, item) {
            const id = getters.firstEmptySlot;
            if (id !== null) {
                commit('setItem', {id, item});
            } else {
                dispatch('currency/gain', {feature: 'treasure', name: 'fragment', amount: item.fragmentsSpent + getters.destroyFragments(item.tier, item.type)}, {root: true});
            }
        },
        moveItem({ rootGetters, commit, dispatch }, o) {
            commit('moveItem', {...o, slots: rootGetters['mult/get']('treasureSlots')});
            dispatch('updateEffectCache');
        },
        deleteItem({ state, getters, commit, dispatch }, id) {
            const item = id === -1 ? state.newItem : state.items[id];
            if (item) {
                item.effect.forEach(effect => {
                    if (effect) {
                        dispatch('mult/removeKey', {name: effect, type: 'mult', key: 'treasure'}, {root: true});
                    }
                });
                dispatch('currency/gain', {feature: 'treasure', name: 'fragment', amount: item.fragmentsSpent + getters.destroyFragments(item.tier, item.type)}, {root: true});
                commit('deleteItem', id);
                dispatch('updateEffectCache');
            }
        },
        updateItemCache({ state, getters, commit }, id) {
            const item = id === -1 ? state.newItem : state.items[id];
            if (item) {
                commit('updateItemKey', {id, key: 'valueCache', value: item.effect.map((el, i) => getters.effectValue(
                    el,
                    item.tier,
                    item.level + item.modifier.filter(el => el === 'upArrow').length * 2,
                    state.type[item.type].slots[i].power
                ))});
            }
        },
        updateEffectCache({ state, getters, rootGetters, commit, dispatch }) {
            let effects = {};
            let eventPower = 0;

            const slots = rootGetters['mult/get']('treasureSlots');

            state.items.forEach((item, n) => {
                if (item && n < slots) {
                    item.effect.forEach((el, i) => {
                        if (el !== null) {
                            if (effects[el] === undefined) {
                                effects[el] = {owned: 0, value: []};
                            }
                            effects[el].owned++;
                            effects[el].value.push(item.valueCache[i]);
                        }
                    });

                    const eventStars = item.modifier.filter(el => el === 'eventStar').length;
                    if (eventStars > 0) {
                        eventPower += (item.tier + 1) * eventStars * TREASURE_EVENT_POWER_PER_TIER + item.level * TREASURE_EVENT_POWER_PER_LEVEL;
                    }
                }
            });

            for (const [key, elem] of Object.entries(effects)) {
                const maxEffects = state.effect[key].max;
                let effectValue = effects[key].value;
                if (maxEffects !== null) {
                    effectValue = effectValue.slice(0, maxEffects);
                }
                effects[key].value = effectValue.reduce((a, b) => a + b, 0) + 1;
                if (state.effect[key].scaling === 'divisive') {
                    effects[key].value = 1 / elem.value;
                }
            }

            commit('updateKey', {key: 'effectCache', value: effects});
            commit('updateKey', {key: 'eventPowerCache', value: eventPower});

            for (const [key, elem] of Object.entries(effects)) {
                if (elem.value !== 1) {
                    dispatch('mult/setMult', {name: key, key: 'treasure', value: elem.value}, {root: true});
                } else {
                    dispatch('mult/removeKey', {name: key, type: 'mult', key: 'treasure'}, {root: true});
                }
            }
            if (eventPower > 0) {
                dispatch('mult/setMult', {name: 'allPrestigeIncome', key: 'eventPower', value: getters.eventPowerPrestigeMult}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'allPrestigeIncome', type: 'mult', key: 'eventPower'}, {root: true});
            }
        },
        changeEffect({ state, commit, dispatch }, o) {
            const item = o.id === -1 ? state.newItem : state.items[o.id];
            if (item.effect[o.index] === null) {
                commit('updateItemEffect', {id: o.id, index: o.index, value: o.effect});
                dispatch('updateItemCache', o.id);
                dispatch('updateEffectCache');
            }
        },
        useModifier({ state, rootState, getters, rootGetters, commit, dispatch }, o) {
            const item = o.id === -1 ? state.newItem : state.items[o.id];
            if (item.modifier.length < state.type[item.type].maxModifiers && rootGetters['consumable/canAfford'](`treasure_${ o.modifier }`)) {
                commit('addItemModifier', o);
                if (o.modifier === 'expander') {
                    if (item.fragmentsSpent > 0) {
                        dispatch('currency/gain', {feature: 'treasure', name: 'fragment', amount: item.fragmentsSpent}, {root: true});
                    }
                    commit('updateItemKey', {id: o.id, key: 'fragmentsSpent', value: 0});
                    commit('updateItemKey', {id: o.id, key: 'level', value: 0});
                }
                if (o.modifier === 'wildcard') {
                    commit('updateItemKey', {id: o.id, key: 'effect', value: state.type[item.type].slots.map(() => null)});
                }
                dispatch('consumable/use', `treasure_${ o.modifier }`, {root: true});

                // Add emerald price as fragment value
                const emeraldPrice = rootState.consumable[`treasure_${ o.modifier }`].price?.gem_emerald ?? 0;
                if (emeraldPrice > 0) {
                    const newItem = o.id === -1 ? state.newItem : state.items[o.id];
                    commit('updateItemKey', {id: o.id, key: 'fragmentsSpent', value: newItem.fragmentsSpent + Math.round(getters.averageFragments * TREASURE_FRAGMENT_BUY_GAIN * emeraldPrice / getters.treasurePrice('regular'))});
                }

                // Update all caches
                dispatch('updateItemCache', o.id);
                dispatch('updateEffectCache');
            }
        }
    }
}
