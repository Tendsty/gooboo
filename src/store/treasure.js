import Vue from "vue";
import { TREASURE_FRAGMENT_BUY_COST, TREASURE_FRAGMENT_BUY_GAIN, TREASURE_TIER_DESTROY_MULT, TREASURE_TIER_REGULAR_MULT, TREASURE_TIER_SPECIAL_MULT, TREASURE_TIER_UPGRADE_MULT } from "../js/constants";
import { chance, randomElem } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        // Contains all equipped treasure items
        items: [],

        // Contains the new bought item (or null)
        newItem: null,

        // Contains all features with their possible effects
        effect: {},

        // Contains translations from mult to feature
        effectToFeature: {},

        // Contains all different types of treasure
        type: {},

        // Contains all tier colors
        tierColor: ['white', 'yellow', 'orange', 'red', 'pink', 'purple', 'indigo', 'blue', 'teal', 'green', 'light-green', 'lime', 'amber', 'orange-red', 'red-pink', 'pink-purple', 'dark-blue', 'light-blue', 'cyan'],

        // Contains all item icons
        iconList: [
            'mdi-star', 'mdi-hexagram', 'mdi-star-four-points', 'mdi-star-three-points', 'mdi-lightning-bolt',
            'mdi-spear', 'mdi-stamper', 'mdi-magnify', 'mdi-shaker', 'mdi-checkerboard', 'mdi-sd', 'mdi-bullseye',
            'mdi-spa', 'mdi-sim', 'mdi-drama-masks', 'mdi-tag', 'mdi-water-pump', 'mdi-asterisk', 'mdi-filmstrip',
            'mdi-pillar', 'mdi-vhs'
        ],

        // Contains a list of all effects, also used to apply the mults
        effectCache: {},

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
                return [{tier: 0, chance: 1}];
            }

            upgradeChances.forEach((elem, key) => {
                if (elem < 1) {
                    const chance = (1 - totalChance) * (1 - elem)
                    arr.push({tier, chance});
                    totalChance += chance;
                }
                tier++;
                if ((key + 1) >= upgradeChances.length) {
                    arr.push({tier, chance: (1 - totalChance)});
                }
            });

            return arr;
        },
        effectValue: () => (base, tier = 0, level = 0, type) => {
            return base * Math.pow(type === 'special' ? TREASURE_TIER_SPECIAL_MULT : TREASURE_TIER_REGULAR_MULT, tier) * (level * (type === 'special' ? 0.05 : 0.2) + 1);
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
        averageFragments: (state, getters) => {
            return getters.tierChancesRaw.reduce((a, b) => a + b.chance * getters.destroyFragments(b.tier, 'regular'), 0);
        },
        fragmentGain: (state, getters) => {
            return Math.round(getters.averageFragments * TREASURE_FRAGMENT_BUY_GAIN);
        },
        generateItem: (state, getters, rootState, rootGetters) => (type, tier = 0, auto = false, rngSkip = 0, bonusTier = 0) => {
            let rngGen = rootGetters['system/getRng']('treasure_' + type, rngSkip);

            let effectList = {};
            for (const [key, elem] of Object.entries(state.effect)) {
                if (key === 'mining' || rootState.unlock[`${key}Feature`].see) {
                    for (const [subkey, subelem] of Object.entries(elem)) {
                        if (subelem.unlock === null || rootState.unlock[subelem.unlock].see) {
                            if (!effectList[subelem.type]) {
                                effectList[subelem.type] = [];
                            }
                            effectList[subelem.type].push(subkey);
                        }
                    }
                }
            }

            let chosenEffect = [];
            state.type[type].slots.forEach(slot => {
                const chosenElem = randomElem(effectList[slot.type], rngGen());
                effectList[slot.type] = effectList[slot.type].filter(el => el !== chosenElem);
                chosenEffect.push(chosenElem);
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
                icon: randomElem(state.iconList, rngGen()),
                effect: chosenEffect,
                valueCache: chosenEffect.map((el, i) => getters.effectValue(
                    state.effect[state.effectToFeature[el]][el].value * state.type[type].slots[i].power,
                    tier,
                    level,
                    type
                ))
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
                icon: o.icon ?? null
            });
        },
        initEffect(state, o) {
            // Create feature if it doesn't exist
            const feature = o.feature ?? 'meta';
            if (!state.effect[feature]) {
                Vue.set(state.effect, feature, {});
            }

            Vue.set(state.effect[feature], o.name, {
                unlock: o.unlock ?? null,
                type: o.type ?? 'regular',
                icon: o.icon ?? 'mdi-circle',
                unique: o.unique ?? false,
                value: o.value ?? 0
            });

            // Create entry in translation object
            Vue.set(state.effectToFeature, o.name, o.feature);
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
        moveItem(state, o) {
            while (state.items.length < (Math.max(o.from, o.to) + 1)) {
                state.items.push(null);
            }
            const fromContent = o.from === -1 ? state.newItem : state.items[o.from];
            const toContent = o.to === -1 ? state.newItem : state.items[o.to];

            // Cannot switch treasure in the temp slot
            if (o.from === -1 && fromContent && toContent) {
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
        },
        deleteItem(state, id) {
            if (id === -1) {
                Vue.set(state, 'newItem', null);
            } else {
                Vue.set(state.items, id, null);
            }
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'items', value: []});
            commit('updateKey', {key: 'newItem', value: null});
            commit('updateKey', {key: 'effectCache', value: {}});
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
        buy({ state, rootGetters, dispatch }, type) {
            const price = state.type[type].buyPrice;
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
                    commit('updateItemKey', {id, key: 'valueCache', value: item.effect.map((el, i) => getters.effectValue(
                        state.effect[state.effectToFeature[el]][el].value * state.type[item.type].slots[i].power,
                        item.tier,
                        item.level + 1,
                        item.type
                    ))});
                    commit('updateItemKey', {id, key: 'fragmentsSpent', value: item.fragmentsSpent + cost});
                    commit('updateItemKey', {id, key: 'level', value: item.level + 1});

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
        moveItem({ commit, dispatch }, o) {
            commit('moveItem', o);
            dispatch('updateEffectCache');
        },
        deleteItem({ state, getters, commit, dispatch }, id) {
            const item = id === -1 ? state.newItem : state.items[id];
            if (item) {
                dispatch('currency/gain', {feature: 'treasure', name: 'fragment', amount: item.fragmentsSpent + getters.destroyFragments(item.tier, item.type)}, {root: true});
                item.effect.forEach(ef => {
                    commit('mult/removeKey', {name: ef, type: 'mult', key: 'treasure'}, {root: true});
                });
                commit('deleteItem', id);
                dispatch('updateEffectCache');
            }
        },
        updateEffectCache({ state, commit, dispatch }) {
            let effects = {};

            state.items.forEach(item => {
                if (item) {
                    item.effect.forEach((el, i) => {
                        const effectFeature = state.effectToFeature[el];
                        if (effects[effectFeature] === undefined) {
                            effects[effectFeature] = {};
                        }
                        if (effects[effectFeature][el] === undefined) {
                            effects[effectFeature][el] = 1;
                        }
                        effects[effectFeature][el] += item.valueCache[i];
                    });
                }
            });

            commit('updateKey', {key: 'effectCache', value: effects});

            for (const [, group] of Object.entries(effects)) {
                for (const [key, elem] of Object.entries(group)) {
                    dispatch('mult/setMult', {name: key, key: 'treasure', value: elem}, {root: true});
                }
            }
        }
    }
}
