import Vue from "vue"
import { weightSelect } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        card: {},
        collection: {},
        pack: {},
        feature: {}
    },
    mutations: {
        initCard(state, o) {
            let num = o.id.toString();
            while (num.length < 4) {
                num = `0${num}`;
            }
            let id = state.feature[o.feature].prefix + '-' + num;
            Vue.set(state.card, id, {
                feature: o.feature,
                id: o.id,
                instant: o.instant ?? false,
                reward: o.reward,
                amount: 0,
                collection: o.collection,
                color: o.color ?? 'red',
                icons: o.icons ?? []
            });
            state.collection[o.collection].cards.push(id);
        },
        initCollection(state, o) {
            Vue.set(state.collection, o.name, {
                name: o.name,
                reward: o.reward,
                cards: [],
                cacheCards: 0
            });
        },
        initPack(state, o) {
            let cacheWeight = [];
            let cacheContent = [];

            for (const [key, elem] of Object.entries(o.content)) {
                cacheWeight.push(elem);
                cacheContent.push(key);
            }

            Vue.set(state.pack, o.name, {
                price: o.price ?? null,
                unlock: o.unlock ?? null,
                amount: o.amount ?? 1,
                content: o.content,
                cacheWeight,
                cacheWeightTotal: cacheWeight.reduce((a, b) => a + b),
                cacheContent
            });
        },
        initFeature(state, o) {
            Vue.set(state.feature, o.name, {
                prefix: o.prefix,
                reward: o.reward,
                cardSelected: [],
                cardEquipped: [],
                cacheCards: 0
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.type][o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.card)) {
                commit('updateKey', {type: 'card', name: key, key: 'amount', value: 0});
            }
            for (const [key] of Object.entries(state.collection)) {
                commit('updateKey', {type: 'collection', name: key, key: 'cacheCards', value: 0});
            }
            for (const [key] of Object.entries(state.feature)) {
                commit('updateKey', {type: 'feature', name: key, key: 'cardSelected', value: []});
                commit('updateKey', {type: 'feature', name: key, key: 'cardEquipped', value: []});
                commit('updateKey', {type: 'feature', name: key, key: 'cacheCards', value: 0});
            }
        },
        buyPack({ state, rootState, rootGetters, dispatch }, o) {
            const pack = state.pack[o.name];
            if ((pack.unlock === null || rootState.unlock[pack.unlock].see) && pack.price !== null && rootGetters['currency/value']('gem_emerald') >= pack.price) {
                const amount = o.amount ?? (o.max ? Math.floor(rootState.currency.gem_emerald.value / pack.price) : 1);
                dispatch('currency/spend', {feature: 'gem', name: 'emerald', amount: pack.price * amount}, {root: true});
                dispatch('openPack', {name: o.name, notify: o.notify, amount});
            }
        },
        openPack({ state, rootState, rootGetters, commit, dispatch }, o) {
            const pack = state.pack[o.name];
            let content = {};
            for (let i = 0, n = o.amount; i < n; i++) {
                const nextChances = rootGetters['system/nextRng']('cardPack_' + o.name);
                for (let j = 0, m = pack.amount; j < m; j++) {
                    const cardChosen = pack.cacheContent[weightSelect(pack.cacheWeight, nextChances[j])];
                    const card = state.card[cardChosen];
                    if (content[cardChosen] === undefined) {
                        content[cardChosen] = {amount: 0, isNew: card.amount <= 0};
                    }
                    content[cardChosen].amount++;
                    if (card.amount <= 0) {
                        const feature = state.feature[card.feature];
                        const collection = state.collection[card.collection];

                        commit('updateKey', {type: 'collection', name: card.collection, key: 'cacheCards', value: collection.cacheCards + 1});
                        commit('updateKey', {type: 'feature', name: card.feature, key: 'cacheCards', value: feature.cacheCards + 1});
                        dispatch('applyFeatureEffects', card.feature);

                        // Full collection rewards
                        if (collection.cacheCards >= collection.cards.length) {
                            collection.reward.forEach(elem => {
                                dispatch('system/applyEffect', {type: elem.type, name: elem.name, multKey: `cardCollection_${ card.collection }`, value: elem.value, trigger: true}, {root: true});
                            });
                            dispatch('note/find', 'card_1', {root: true});
                        }
                    }
                    if (card.amount > 0 && card.instant) {
                        // Activate instant effect(s)
                        if (content[cardChosen].effect === undefined) {
                            content[cardChosen].effect = {};
                        }
                        card.reward.forEach(eff => {
                            dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `card_${card}`}, {root: true});
                            switch (eff.type) {
                                case 'consumable': {
                                    const value = eff.value;
                                    if (content[cardChosen].effect['consumable_' + eff.name] === undefined) {
                                        content[cardChosen].effect['consumable_' + eff.name] = 0;
                                    }
                                    content[cardChosen].effect['consumable_' + eff.name] += value;
                                    dispatch('consumable/gain', {name: eff.name, amount: value}, {root: true});
                                    break;
                                }
                                case 'currency': {
                                    const value = eff.useMult ? rootGetters['mult/get'](rootGetters['currency/gainMultName'](...eff.name.split('_')), eff.value) : eff.value;
                                    if (content[cardChosen].effect['currency_' + eff.name] === undefined) {
                                        content[cardChosen].effect['currency_' + eff.name] = 0;
                                    }
                                    content[cardChosen].effect['currency_' + eff.name] += value;
                                    dispatch('currency/gain', {feature: eff.name.split('_')[0], name: eff.name.split('_')[1], amount: value}, {root: true});
                                    break;
                                }
                                default:
                                    console.warn(`Card instant effect type ${eff.type} not found`);
                                    break;
                            }
                        });
                    } else {
                        commit('updateKey', {type: 'card', name: cardChosen, key: 'amount', value: card.amount + 1});
                    }
                }
                commit('system/takeRng', 'cardPack_' + o.name, {root: true});
            }
            if (o.notify && rootState.system.settings.notification.items.cardPackContent.value) {
                commit('system/addNotification', {color: 'success', timeout: 5000, message: {
                    type: 'cardPack',
                    value: content
                }}, {root: true});
            }
        },
        initFeature({ commit }, o) {
            commit('initFeature', o);
            commit('mult/init', {name: o.name + 'CardCap', unlock: o.unlock ?? null, baseValue: 1, round: true}, {root: true});
        },
        calculateCaches({ state, commit, dispatch }) {
            // Reset existing caches
            for (const [key] of Object.entries(state.collection)) {
                commit('updateKey', {type: 'collection', name: key, key: 'cacheCards', value: 0});
            }
            for (const [key] of Object.entries(state.feature)) {
                commit('updateKey', {type: 'feature', name: key, key: 'cacheCards', value: 0});
            }
            for (const [, elem] of Object.entries(state.card)) {
                if (elem.amount > 0) {
                    commit('updateKey', {type: 'collection', name: elem.collection, key: 'cacheCards', value: state.collection[elem.collection].cacheCards + 1});
                    commit('updateKey', {type: 'feature', name: elem.feature, key: 'cacheCards', value: state.feature[elem.feature].cacheCards + 1});
                }
            }
            for (const [collKey, collElem] of Object.entries(state.collection)) {
                if (collElem.cacheCards >= collElem.cards.length) {
                    collElem.reward.forEach(elem => {
                        dispatch('system/applyEffect', {type: elem.type, name: elem.name, multKey: `cardCollection_${ collKey }`, value: elem.value, trigger: false}, {root: true});
                    });
                }
            }
            for (const [featKey] of Object.entries(state.feature)) {
                dispatch('applyCardEffects', featKey);
                dispatch('applyFeatureEffects', featKey);
            }
        },
        activateCards({ state, commit, dispatch }, feature) {
            state.feature[feature].cardEquipped.forEach(card => {
                state.card[card].reward.forEach(eff => {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `card_${card}`}, {root: true});
                });
            });

            commit('updateKey', {type: 'feature', name: feature, key: 'cardEquipped', value: [...state.feature[feature].cardSelected]});
            commit('updateKey', {type: 'feature', name: feature, key: 'cardSelected', value: []});

            let active = {};
            state.feature[feature].cardEquipped.forEach(elem => {
                if (active[elem]) {
                    active[elem]++;
                } else {
                    active[elem] = 1;
                }
            });

            let canAfford = true;
            for (const [card, amount] of Object.entries(active)) {
                if ((state.card[card].amount - 1) < amount) {
                    canAfford = false;
                }
            }

            if (canAfford) {
                for (const [card, amount] of Object.entries(active)) {
                    commit('updateKey', {type: 'card', name: card, key: 'amount', value: state.card[card].amount - amount});
                }

                dispatch('applyCardEffects', feature);
            }
        },
        applyCardEffects({ state, dispatch }, feature) {
            let active = {};
            state.feature[feature].cardEquipped.forEach(elem => {
                if (active[elem]) {
                    active[elem]++;
                } else {
                    active[elem] = 1;
                }
            });

            for (const [card, amount] of Object.entries(active)) {
                let cardItem = state.card[card];
                cardItem.reward.forEach(elem => {
                    let value = elem.value;
                    if (['base', 'bonus'].includes(elem.type)) {
                        value *= amount;
                    } else if (elem.type === 'mult') {
                        if (value >= 1) {
                            value = (value - 1) * amount + 1;
                        } else {
                            value = Math.pow(value, amount);
                        }
                    }
                    dispatch('system/applyEffect', {type: elem.type, name: elem.name, multKey: `card_${card}`, value, trigger: false}, {root: true});
                });
            }
        },
        applyFeatureEffects({ state, dispatch }, feature) {
            if (state.feature[feature].cacheCards > 0) {
                state.feature[feature].reward.forEach(reward => {
                    dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `cards_${ feature }`, value: reward.value(state.feature[feature].cacheCards), trigger: true}, {root: true});
                });
            }
        }
    }
}
