import Vue from "vue";
import { chance, weightSelect } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        card: {},
        collection: {},
        pack: {},
        feature: {}
    },
    getters: {
        adaptivePower: (state) => (feature) => {
            let highest = 0;
            for (const [, elem] of Object.entries(state.card)) {
                if (elem.feature === feature && elem.amount >= 1 && elem.power > highest) {
                    highest = elem.power;
                }
            }
            return Math.max(0, highest - 2);
        },
        canOpenShinyPack: (state) => (name) => {
            for (const [key] of Object.entries(state.pack[name].content)) {
                if (!state.card[key].foundShiny) {
                    return true;
                }
            }
            return false;
        },
        missingQuestCards: (state) => {
            let obj = {};
            for (const [key, elem] of Object.entries(state.card)) {
                if (elem.collection === 'specialGadgets' && elem.amount > 0 && elem.amount < 6) {
                    obj[key] = 6 - elem.amount;
                }
            }
            return obj;
        },
        missingObtainableCards: (state, getters, rootState) => {
            let arr = [];
            for (const [, elem] of Object.entries(state.pack)) {
                if (elem.feature !== 'event' && (elem.unlock === null || rootState.unlock[elem.unlock].use)) {
                    Object.keys(elem.content).forEach(card => {
                        if (!arr.includes(card) && state.card[card].amount <= 0) {
                            arr.push(card);
                        }
                    });
                }
            }
            return arr;
        }
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
                group: o.group ?? null,
                instant: o.instant ?? false,
                power: o.power ?? 0,
                reward: o.reward ?? [],
                amount: 0,
                foundShiny: false,
                collection: o.collection,
                color: o.color ?? 'red',
                icons: o.icons ?? []
            });
            state.collection[o.collection].cards.push(id);
        },
        initCollection(state, o) {
            Vue.set(state.collection, o.name, {
                name: o.name,
                reward: o.reward ?? [],
                cards: [],
                cacheCards: 0,
                cacheShinyCards: 0
            });
        },
        initPack(state, o) {
            let cacheWeight = [];
            let cacheContent = [];

            for (const [key, elem] of Object.entries(o.content)) {
                cacheWeight.push(elem);
                cacheContent.push(key);
            }

            const amount = o.amount ?? 1;
            const shinyPrice = (o.price !== null) ? Math.ceil(10 * o.price / amount) : null;

            Vue.set(state.pack, o.name, {
                feature: o.feature ?? null,
                price: o.price ?? null,
                shinyPrice,
                unlock: o.unlock ?? null,
                amount,
                content: o.content,
                cacheWeight,
                cacheWeightTotal: cacheWeight.reduce((a, b) => a + b),
                cacheContent
            });
        },
        initFeature(state, o) {
            Vue.set(state.feature, o.name, {
                prefix: o.prefix,
                reward: o.reward ?? [],
                shinyReward: o.shinyReward ?? [],
                powerReward: o.powerReward ?? [],
                cardSelected: [],
                cardEquipped: [],
                cacheCards: 0,
                cacheShinyCards: 0
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
                commit('updateKey', {type: 'collection', name: key, key: 'cacheShinyCards', value: 0});
            }
            for (const [key] of Object.entries(state.feature)) {
                commit('updateKey', {type: 'feature', name: key, key: 'cardSelected', value: []});
                commit('updateKey', {type: 'feature', name: key, key: 'cardEquipped', value: []});
                commit('updateKey', {type: 'feature', name: key, key: 'cacheCards', value: 0});
                commit('updateKey', {type: 'feature', name: key, key: 'cacheShinyCards', value: 0});
            }
        },
        buyPack({ state, rootState, rootGetters, dispatch }, o) {
            const pack = state.pack[o.name];
            if ((pack.unlock === null || rootState.unlock[pack.unlock].see) && pack.price !== null && rootGetters['currency/value']('gem_emerald') >= (pack.price * o.amount)) {
                dispatch('currency/spend', {feature: 'gem', name: 'emerald', amount: pack.price * o.amount}, {root: true});
                dispatch('openPack', {name: o.name, amount: o.amount});
            }
        },
        buyShinyPack({ state, rootState, getters, rootGetters, commit, dispatch }, name) {
            const pack = state.pack[name];
            if ((pack.unlock === null || rootState.unlock[pack.unlock].see) && pack.shinyPrice !== null && rootGetters['currency/value']('card_shinyDust') >= pack.shinyPrice && getters.canOpenShinyPack(name)) {
                let cacheContent = [];
                let cacheWeight = [];
                for (const [key, elem] of Object.entries(pack.content)) {
                    // Guaranteed to find a new shiny card
                    if (!state.card[key].foundShiny) {
                        cacheWeight.push(elem);
                        cacheContent.push(key);
                    }
                }

                if (cacheContent.length > 0) {
                    dispatch('currency/spend', {feature: 'card', name: 'shinyDust', amount: pack.shinyPrice}, {root: true});

                    let rngGen = rootGetters['system/getRng']('cardPackShiny_' + name);
                    const cardChosen = cacheContent[weightSelect(cacheWeight, rngGen())];

                    if (rootState.system.settings.notification.items.cardPackContent.value) {
                        commit('system/addNotification', {color: 'success', timeout: 5000, message: {
                            type: 'cardPack',
                            value: {[cardChosen]: {amount: 1, shiny: 1, isNew: state.card[cardChosen].amount <= 0, isNewShiny: true}}
                        }}, {root: true});
                    }

                    dispatch('gainCard', {name: cardChosen, isShiny: true});

                    commit('system/nextRng', {name: 'cardPackShiny_' + name, amount: 1}, {root: true});
                }
            }
        },
        openPack({ state, rootState, rootGetters, commit, dispatch }, o) {
            const pack = state.pack[o.name];
            const shinyValueBase = pack.price === null ? 1 : (pack.price / pack.amount);
            let content = {};
            for (let i = 0, n = o.amount; i < n; i++) {
                let rngGen = rootGetters['system/getRng']('cardPack_' + o.name);
                let rngValues = [];
                for (let j = 0, m = pack.amount; j < m; j++) {
                    rngValues.push(rngGen());
                }
                for (let j = 0, m = pack.amount; j < m; j++) {
                    const cardChosen = pack.cacheContent[weightSelect(pack.cacheWeight, rngValues[j])];
                    const card = state.card[cardChosen];

                    if (content[cardChosen] === undefined) {
                        content[cardChosen] = {amount: 0, shiny: 0, isNew: card.amount <= 0, isNewShiny: false};
                    }
                    content[cardChosen].amount++;
                    const gotShiny = rootState.unlock.cardShiny.use && chance(rootGetters['mult/get']('cardShinyChance'), rngGen());
                    if (gotShiny) {
                        content[cardChosen].shiny++;
                        if (!card.foundShiny) {
                            content[cardChosen].isNewShiny = true;
                        }
                    }

                    if (card.amount > 0 && card.instant) {
                        // Track instant effect(s)
                        if (content[cardChosen].effect === undefined) {
                            content[cardChosen].effect = {};
                        }
                        card.reward.forEach(eff => {
                            switch (eff.type) {
                                case 'consumable': {
                                    if (content[cardChosen].effect['consumable_' + eff.name] === undefined) {
                                        content[cardChosen].effect['consumable_' + eff.name] = 0;
                                    }
                                    content[cardChosen].effect['consumable_' + eff.name] += eff.value;
                                    break;
                                }
                                case 'currency': {
                                    const value = eff.useMult ? rootGetters['mult/get'](rootGetters['currency/gainMultName'](...eff.name.split('_')), eff.value) : eff.value;
                                    if (content[cardChosen].effect['currency_' + eff.name] === undefined) {
                                        content[cardChosen].effect['currency_' + eff.name] = 0;
                                    }
                                    content[cardChosen].effect['currency_' + eff.name] += value;
                                    break;
                                }
                            }
                        });
                    }
                    dispatch('gainCard', {name: cardChosen, isShiny: gotShiny, shinyValue: Math.floor(shinyValueBase * (j + 1)) - Math.floor(shinyValueBase * j)});
                }
                commit('system/nextRng', {name: 'cardPack_' + o.name, amount: 1}, {root: true});
            }
            if (rootState.system.settings.notification.items.cardPackContent.value) {
                commit('system/addNotification', {color: 'success', timeout: 5000, message: {
                    type: 'cardPack',
                    value: content
                }}, {root: true});
            }
        },
        gainCard({ state, rootGetters, commit, dispatch }, o) {
            const card = state.card[o.name];
            const amount = o.amount ?? 1;
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
                card.reward.forEach(eff => {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `card_${card}`}, {root: true});
                    switch (eff.type) {
                        case 'consumable': {
                            dispatch('consumable/gain', {name: eff.name, amount: eff.value}, {root: true});
                            break;
                        }
                        case 'currency': {
                            const value = eff.useMult ? rootGetters['mult/get'](rootGetters['currency/gainMultName'](...eff.name.split('_')), eff.value) : eff.value;
                            dispatch('currency/gain', {feature: eff.name.split('_')[0], name: eff.name.split('_')[1], amount: value}, {root: true});
                            break;
                        }
                        default:
                            console.warn(`Card instant effect type ${eff.type} not found`);
                            break;
                    }
                });
            } else {
                commit('updateKey', {type: 'card', name: o.name, key: 'amount', value: card.amount + amount});
            }
            if (o.isShiny) {
                if (card.foundShiny) {
                    // get shiny dust
                    dispatch('currency/gain', {feature: 'card', name: 'shinyDust', amount: o.shinyValue ?? 1}, {root: true});
                } else {
                    // find shiny card
                    commit('updateKey', {type: 'card', name: o.name, key: 'foundShiny', value: true});

                    const feature = state.feature[card.feature];
                    const collection = state.collection[card.collection];
                    commit('updateKey', {type: 'collection', name: card.collection, key: 'cacheShinyCards', value: collection.cacheShinyCards + 1});
                    commit('updateKey', {type: 'feature', name: card.feature, key: 'cacheShinyCards', value: feature.cacheShinyCards + 1});
                    dispatch('applyCardEffects', card.feature);
                    dispatch('applyFeatureEffects', card.feature);
                }
            }
        },
        initFeature({ commit }, o) {
            commit('initFeature', o);
            commit('mult/init', {feature: 'card', name: o.name + 'CardCap', unlock: o.unlock ?? null, baseValue: 1, round: true}, {root: true});
        },
        calculateCaches({ state, commit, dispatch }) {
            // Reset existing caches
            for (const [key] of Object.entries(state.collection)) {
                commit('updateKey', {type: 'collection', name: key, key: 'cacheCards', value: 0});
                commit('updateKey', {type: 'collection', name: key, key: 'cacheShinyCards', value: 0});
            }
            for (const [key] of Object.entries(state.feature)) {
                commit('updateKey', {type: 'feature', name: key, key: 'cacheCards', value: 0});
                commit('updateKey', {type: 'feature', name: key, key: 'cacheShinyCards', value: 0});
            }
            for (const [, elem] of Object.entries(state.card)) {
                if (elem.amount > 0) {
                    commit('updateKey', {type: 'collection', name: elem.collection, key: 'cacheCards', value: state.collection[elem.collection].cacheCards + 1});
                    commit('updateKey', {type: 'feature', name: elem.feature, key: 'cacheCards', value: state.feature[elem.feature].cacheCards + 1});
                }
                if (elem.foundShiny) {
                    commit('updateKey', {type: 'collection', name: elem.collection, key: 'cacheShinyCards', value: state.collection[elem.collection].cacheShinyCards + 1});
                    commit('updateKey', {type: 'feature', name: elem.feature, key: 'cacheShinyCards', value: state.feature[elem.feature].cacheShinyCards + 1});
                }
            }
            for (const [collKey, collElem] of Object.entries(state.collection)) {
                if (collElem.cacheCards >= collElem.cards.length) {
                    collElem.reward.forEach(elem => {
                        dispatch('system/applyEffect', {type: elem.type, name: elem.name, multKey: `cardCollection_${ collKey }`, value: elem.value, trigger: false}, {root: true});
                    });
                } else {
                    collElem.reward.forEach(elem => {
                        dispatch('system/resetEffect', {type: elem.type, name: elem.name, multKey: `cardCollection_${ collKey }`}, {root: true});
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
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `card_${ card }`}, {root: true});
                });
            });
            state.feature[feature].powerReward.forEach(elem => {
                dispatch('system/resetEffect', {type: elem.type, name: elem.name, multKey: `cardPower_${ feature }`}, {root: true});
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
            } else {
                commit('updateKey', {type: 'feature', name: feature, key: 'cardEquipped', value: []});
            }
        },
        applyCardEffects({ state, getters, dispatch }, feature) {
            let active = {};
            state.feature[feature].cardEquipped.forEach(elem => {
                if (active[elem]) {
                    active[elem]++;
                } else {
                    active[elem] = 1;
                }
            });

            let cardPower = 0;
            for (const [card, amount] of Object.entries(active)) {
                let cardItem = state.card[card];
                cardPower += ((cardItem.power === 'adaptive' ? getters.adaptivePower(feature) : cardItem.power) + (cardItem.foundShiny ? 1 : 0)) * amount;
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
                if (cardPower > 0) {
                    state.feature[feature].powerReward.forEach(elem => {
                        dispatch('system/applyEffect', {type: elem.type, name: elem.name, multKey: `cardPower_${ feature }`, value: elem.value(cardPower), trigger: false}, {root: true});
                    });
                }
            }
        },
        applyFeatureEffects({ state, dispatch }, feature) {
            if (state.feature[feature].cacheCards > 0) {
                state.feature[feature].reward.forEach(reward => {
                    dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `cards_${ feature }`, value: reward.value(state.feature[feature].cacheCards), trigger: true}, {root: true});
                });
            } else {
                state.feature[feature].reward.forEach(reward => {
                    dispatch('system/resetEffect', {type: reward.type, name: reward.name, multKey: `cards_${ feature }`}, {root: true});
                });
            }
            if (state.feature[feature].cacheShinyCards > 0) {
                state.feature[feature].shinyReward.forEach(reward => {
                    dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `cardsShiny_${ feature }`, value: reward.value(state.feature[feature].cacheShinyCards), trigger: true}, {root: true});
                });
            } else {
                state.feature[feature].shinyReward.forEach(reward => {
                    dispatch('system/resetEffect', {type: reward.type, name: reward.name, multKey: `cardsShiny_${ feature }`}, {root: true});
                });
            }
        },
        resetCards({ state, commit, dispatch }, feature) {
            state.feature[feature].cardEquipped.forEach(card => {
                state.card[card].reward.forEach(eff => {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `card_${card}`}, {root: true});
                });
            });
            state.feature[feature].powerReward.forEach(elem => {
                dispatch('system/resetEffect', {type: elem.type, name: elem.name, multKey: `cardPower_${ feature }`}, {root: true});
            });
            commit('updateKey', {type: 'feature', name: feature, key: 'cardEquipped', value: []});
            commit('updateKey', {type: 'feature', name: feature, key: 'cardSelected', value: []});
        }
    }
}
