import Vue from "vue";
import { buildArray, shuffleArray } from "../js/utils/array";
import { chance, randomElem, randomInt } from "../js/utils/random";
import { NIGHT_HUNT_HINT_PENALTY } from "../js/constants";

export default {
    namespaced: true,
    state: {
        changedCurrency: {},
        ritualIngredients: [],
        bonusIngredients: [],
        ingredientStat: {},
        potion: {},
        performedRituals: [],
        ritualFamiliarity: {},
        ritualHint: {},
        favouriteIngredient: 'copy',
    },
    getters: {
        ritualCost: (state, getters) => {
            let obj = {};
            const potionRecipe = getters.ritualRecipe;
            const potionLevel = potionRecipe ? state.potion[potionRecipe].level : 0;
            state.ritualIngredients.forEach(elem => {
                if (obj[elem] === undefined) {
                    obj[elem] = 0;
                }
                obj[elem] += potionLevel + 1;
            });
            state.bonusIngredients.forEach(elem => {
                if (obj[elem.name] === undefined) {
                    obj[elem.name] = 0;
                }
                obj[elem.name] += elem.amount;
            });
            return obj;
        },
        ritualBaseStats: (state, getters) => {
            let obj = {
                nightHuntRitualStability: {},
                nightHuntRitualSuccessChance: {},
                nightHuntRitualHintChance: {},
                nightHuntRitualFamiliarity: {}
            };
            const tier = state.ritualIngredients.length;
            let bonus = 0;
            if (tier >= 1) {
                obj.nightHuntRitualStability.base = 0.8 - 0.2 * tier;
                obj.nightHuntRitualSuccessChance.base = 0.55 - 0.15 * tier;
                const familiarity = state.ritualFamiliarity[state.ritualIngredients.join(',')];
                if (familiarity !== undefined) {
                    bonus += familiarity;
                }
                if (state.ritualHint[tier] !== undefined) {
                    const hints = state.ritualHint[tier].position.length + state.ritualHint[tier].ingredient.length;
                    if (hints > 0) {
                        obj.nightHuntRitualHintChance.bonus = -NIGHT_HUNT_HINT_PENALTY * hints;
                    }
                }
            }
            if (tier >= 2) {
                obj.nightHuntRitualStability.mult = Math.pow(0.5, tier - 1);
                obj.nightHuntRitualSuccessChance.mult = Math.pow(0.5, tier - 1);
                obj.nightHuntRitualHintChance.mult = Math.pow(0.5, tier - 1);
                obj.nightHuntRitualFamiliarity.mult = Math.pow(0.4, tier - 1);
            }
            const potionRecipe = getters.ritualRecipe;
            const potionLevel = potionRecipe ? state.potion[potionRecipe].level : 0;

            if (potionLevel > 0) {
                bonus -= 0.05 * potionLevel;
            }
            if (bonus !== 0) {
                obj.nightHuntRitualStability.bonus = bonus;
                obj.nightHuntRitualSuccessChance.bonus = bonus;
            }

            return obj;
        },
        ritualBonusStats: (state) => {
            let obj = {
                nightHuntRitualStability: {},
                nightHuntRitualSuccessChance: {},
                nightHuntRitualHintChance: {},
                nightHuntRitualFamiliarity: {}
            };
            state.bonusIngredients.forEach(ingredient => {
                state.ingredientStat[ingredient.name].effect.forEach(effect => {
                    if (obj[effect.name][effect.type] === undefined) {
                        obj[effect.name][effect.type] = effect.type === 'mult' ? 1 : 0;
                    }
                    if (effect.type === 'mult') {
                        obj[effect.name][effect.type] *= Math.pow(effect.value, ingredient.amount);
                    } else {
                        obj[effect.name][effect.type] += effect.value * ingredient.amount;
                    }
                });
            });
            return obj;
        },
        ritualStats: (state, getters, rootState, rootGetters) => {
            const bonusStats = getters.ritualBonusStats;
            let obj = {};
            for (const [key, elem] of Object.entries(getters.ritualBaseStats)) {
                obj[key] = rootGetters['mult/get'](key, (elem.base ?? 0) + (bonusStats[key].base ?? 0), (elem.mult ?? 1) * (bonusStats[key].mult ?? 1), (elem.bonus ?? 0) + (bonusStats[key].bonus ?? 0));
            }
            return obj;
        },
        canPerformRitual: (state, getters, rootState, rootGetters) => {
            let canAfford = true;
            for (const [key, elem] of Object.entries(getters.ritualCost)) {
                if (rootGetters['currency/value']('event_' + key) < elem) {
                    canAfford = false;
                }
            }
            return state.ritualIngredients.length > 0 && canAfford;
        },
        ritualRecipe: (state) => {
            const thisRecipe = state.ritualIngredients.join(',');
            let potion = null;
            for (const [key, elem] of Object.entries(state.potion)) {
                if (elem.recipe !== null && elem.recipe.join(',') === thisRecipe) {
                    potion = key;
                }
            }
            return potion;
        },
        ritualPerformed: (state) => {
            return state.performedRituals.includes(state.ritualIngredients.join(','));
        },
        undiscoveredRituals: (state, getters, rootState, rootGetters) => {
            const currencyList = Object.keys(state.ingredientStat).slice(0, rootGetters['mult/get']('nightHuntFindableIngredients'));
            let amount = 0;
            for (const [, elem] of Object.entries(state.potion)) {
                if (elem.recipe !== null && elem.recipe.length === state.ritualIngredients.length && elem.level <= 0 && elem.recipe.findIndex(
                    el => !currencyList.includes(el)
                ) === -1) {
                    amount++;
                }
            }
            return amount;
        }
    },
    mutations: {
        initIngredientStat(state, o) {
            Vue.set(state.ingredientStat, o.name, {
                effect: o.effect ?? []
            });
        },
        initPotion(state, o) {
            Vue.set(state.potion, o.name, {
                color: o.color ?? 'purple',
                recipe: null,
                recipeSeed: o.recipe,
                effect: o.effect ?? [],
                level: 0
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        pushKey(state, o) {
            state[o.key].push(o.value);
        },
        pushHintKey(state, o) {
            state.ritualHint[o.key][o.type].push(o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.key], o.subkey, o.value);
        },
        updatePotionKey(state, o) {
            Vue.set(state.potion[o.name], o.key, o.value);
        },
        updateIngredientKey(state, o) {
            Vue.set(state[o.key][o.index], o.subkey, o.value);
        },
        addIngredient(state, o) {
            state[o.key].push(o.key === 'bonusIngredients' ? {name: o.name, amount: 1} : o.name);
        },
        removeIngredient(state, o) {
            state[o.key].splice(o.index, 1);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'changedCurrency', value: {}});
            commit('updateKey', {key: 'ritualIngredients', value: []});
            commit('updateKey', {key: 'bonusIngredients', value: []});
            commit('updateKey', {key: 'performedRituals', value: []});
            commit('updateKey', {key: 'ritualFamiliarity', value: {}});
            commit('updateKey', {key: 'ritualHint', value: {}});
            commit('updateKey', {key: 'favouriteIngredient', value: 'copy'});
            for (const [key] of Object.entries(state.potion)) {
                commit('updatePotionKey', {name: key, key: 'recipe', value: null});
                commit('updatePotionKey', {name: key, key: 'level', value: 0});
            }
        },
        addChangedCurrency({ state, rootState, rootGetters, commit }, o) {
            const currencyList = Object.keys(state.ingredientStat).slice(0, rootGetters['mult/get']('nightHuntFindableIngredients'));
            let targetList = Object.keys(rootState.currency).filter(key => key.split('_')[0] !== 'event' && state.changedCurrency[key] === undefined && rootState.stat[key].total > 0);

            for (let i = 0; i < o.sack && targetList.length > 0; i++) {
                const targetIndex = randomInt(0, targetList.length - 1);
                commit('updateSubkey', {key: 'changedCurrency', subkey: targetList[targetIndex], value: 'sack'});
                targetList.splice(targetIndex, 1);
            }
            for (let i = 0; i < o.random && targetList.length > 0; i++) {
                const targetIndex = randomInt(0, targetList.length - 1);
                commit('updateSubkey', {key: 'changedCurrency', subkey: targetList[targetIndex], value: randomElem(currencyList)});
                targetList.splice(targetIndex, 1);
            }
        },
        claimChangedCurrency({ state, rootGetters, commit, dispatch }, name) {
            const claimedName = state.changedCurrency[name];
            if (claimedName !== undefined) {
                if (claimedName === 'sack') {
                    const currencyList = Object.keys(state.ingredientStat).slice(0, rootGetters['mult/get']('nightHuntFindableIngredients'));
                    let amount = rootGetters['mult/get']('nightHuntIngredientSize') * 10;
                    if (state.favouriteIngredient === 'copy') {
                        amount += rootGetters['mult/get']('nightHuntFavouriteIngredientSize') * 10;
                    }
                    const amountPerIngredient = Math.floor(amount / currencyList.length);
                    const amountLeft = amount - amountPerIngredient;
                    if (amountPerIngredient > 0) {
                        currencyList.forEach(elem => {
                            dispatch('currency/gain', {feature: 'event', name: elem, amount: amountPerIngredient}, {root: true});
                        });
                    }
                    shuffleArray(currencyList).slice(0, amountLeft).forEach(elem => {
                        dispatch('currency/gain', {feature: 'event', name: elem, amount: 1}, {root: true});
                    });
                    if (state.favouriteIngredient !== 'copy' && rootGetters['mult/get']('nightHuntFavouriteIngredientSize') > 0) {
                        dispatch('currency/gain', {feature: 'event', name: state.favouriteIngredient, amount: rootGetters['mult/get']('nightHuntFavouriteIngredientSize') * 10}, {root: true});
                    }
                } else {
                    dispatch('currency/gain', {feature: 'event', name: claimedName, amount: rootGetters['mult/get']('nightHuntIngredientSize')}, {root: true});
                    if (rootGetters['mult/get']('nightHuntFavouriteIngredientSize') > 0) {
                        dispatch('currency/gain', {feature: 'event', name: state.favouriteIngredient === 'copy' ? claimedName : state.favouriteIngredient, amount: rootGetters['mult/get']('nightHuntFavouriteIngredientSize')}, {root: true});
                    }
                }
                let newObj = {};
                for (const [key, elem] of Object.entries(state.changedCurrency)) {
                    if (key !== name) {
                        newObj[key] = elem;
                    }
                }
                commit('updateKey', {key: 'changedCurrency', value: newObj});
                dispatch('note/find', 'event_27', {root: true});
            }
        },
        performRitual({ state, getters, rootGetters, commit, dispatch }) {
            if (getters.canPerformRitual) {
                const stats = getters.ritualStats;
                const potionRecipe = getters.ritualRecipe;
                const ritualKey = state.ritualIngredients.join(',');
                const tier = state.ritualIngredients.length;
                const rngSeed = `nightHunt_ritual${ potionRecipe ? ('_' + potionRecipe) : '' }`;
                let rngGen = rootGetters['system/getRng'](rngSeed);
                commit('system/nextRng', {name: rngSeed, amount: 1}, {root: true});
                const stabilityChance = rngGen();

                // Do not lose base resources if the ritual is really stable (100% - 200%)
                if (!chance(stats.nightHuntRitualStability - 1, stabilityChance)) {
                    state.ritualIngredients.forEach(elem => {
                        dispatch('currency/spend', {feature: 'event', name: elem, amount: potionRecipe ? (state.potion[potionRecipe].level + 1) : 1}, {root: true});
                    });
                }

                // Do not lose bonus resources if the ritual is stable (0% - 100%)
                if (!chance(stats.nightHuntRitualStability, stabilityChance)) {
                    state.bonusIngredients.forEach(elem => {
                        dispatch('currency/spend', {feature: 'event', name: elem.name, amount: elem.amount}, {root: true});
                    });
                }

                // Fail the whole ritual if it is really unstable (-100% - 0%)
                if (chance(stats.nightHuntRitualStability + 1, stabilityChance)) {
                    let canAddHint = false;
                    if (chance(stats.nightHuntRitualSuccessChance, rngGen())) {
                        if (!getters.ritualPerformed) {
                            if (!potionRecipe) {
                                dispatch('event/giveTokens', {event: 'nightHunt', amount: 1}, {root: true});
                                dispatch('note/find', 'event_29', {root: true});
                                canAddHint = true;
                            }
                            commit('pushKey', {key: 'performedRituals', value: ritualKey});
                        }

                        if (potionRecipe) {
                            commit('updatePotionKey', {name: potionRecipe, key: 'level', value: state.potion[potionRecipe].level + 1});
                            dispatch('applyPotionEffects', potionRecipe);
                            dispatch('event/giveTokens', {event: 'nightHunt', amount: tier * 2}, {root: true});
                            dispatch('note/find', 'event_28', {root: true});

                            // Remove the hint if you found the recipe
                            if (state.ritualHint[tier] !== undefined && state.ritualHint[tier].target === potionRecipe) {
                                // eslint-disable-next-line no-unused-vars
                                const {[tier]: _, ...newObj} = state.ritualHint;
                                commit('updateKey', {key: 'ritualHint', value: newObj});
                            }
                        }

                        if (state.ritualFamiliarity[ritualKey] !== undefined) {
                            // eslint-disable-next-line no-unused-vars
                            const {[ritualKey]: _, ...newObj} = state.ritualFamiliarity;
                            commit('updateKey', {key: 'ritualFamiliarity', value: newObj});
                        }
                    } else if (stats.nightHuntRitualFamiliarity > 0) {
                        commit('updateSubkey', {key: 'ritualFamiliarity', subkey: ritualKey, value: (state.ritualFamiliarity[ritualKey] ?? 0) + stats.nightHuntRitualFamiliarity});
                    }

                    if (canAddHint && chance(stats.nightHuntRitualHintChance, rngGen())) {
                        const currencyList = Object.keys(state.ingredientStat).slice(0, rootGetters['mult/get']('nightHuntFindableIngredients'));
                        if (state.ritualHint[tier] === undefined) {
                            // Hint structure does not exist, create it and set a random potion as target
                            let targetList = [];
                            for (const [key, elem] of Object.entries(state.potion)) {
                                if (elem.recipe !== null && elem.recipe.length === tier && elem.level <= 0 && elem.recipe.findIndex(
                                    el => !currencyList.includes(el)
                                ) === -1) {
                                    targetList.push(key);
                                }
                            }
                            if (targetList.length > 0) {
                                commit('updateSubkey', {key: 'ritualHint', subkey: tier, value: {target: randomElem(targetList), position: [], ingredient: []}});
                            }
                        }
                        if (state.ritualHint[tier] !== undefined) {
                            let rngGenHint = rootGetters['system/getRng']('nightHunt_hint');
                            commit('system/nextRng', {name: 'nightHunt_hint', amount: 1}, {root: true});
                            // Add hint item
                            if ((state.ritualHint[tier].position.length + 1) < tier && chance(0.5, rngGenHint())) {
                                // Positional hint, reveal the ingredient of a random position
                                const freePositions = buildArray(tier).filter(
                                    elem => state.ritualHint[tier].position.findIndex(el => el === elem) === -1
                                );
                                if (freePositions.length > 0) {
                                    commit('pushHintKey', {key: tier, type: 'position', value: randomElem(freePositions, rngGenHint())});
                                }
                            } else {
                                // Count hint, reveal the amount of a random ingredient
                                const freeIngredients = currencyList.filter(
                                    elem => state.ritualHint[tier].ingredient.findIndex(el => el === elem) === -1
                                );
                                if (freeIngredients.length > 0) {
                                    commit('pushHintKey', {key: tier, type: 'ingredient', value: randomElem(freeIngredients, rngGenHint())});
                                }
                            }
                        }
                    }
                }
            }
        },
        applyPotionEffects({ state, dispatch }, name) {
            state.potion[name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `nightHuntPotion_${name}`, value: eff.value(state.potion[name].level)}, {root: true});
            });
        },
        resetPotionEffects({ state, dispatch }, name) {
            state.potion[name].effect.forEach(eff => {
                dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `nightHuntPotion_${name}`}, {root: true});
            });
        },
        seedRecipes({ state, commit }) {
            const ingredientList = Object.keys(state.ingredientStat);
            let seedList = [];
            for (const [key, elem] of Object.entries(state.potion)) {
                let recipe = [];
                let isUnique = false;
                while (!isUnique) {
                    recipe = [];
                    shuffleArray(elem.recipeSeed).forEach(seed => {
                        recipe.push(ingredientList[randomInt(seed.min ?? 0, seed.max ?? (ingredientList.length - 1))]);
                    });
                    isUnique = seedList.findIndex(s => s === recipe.join(',')) === -1;
                }
                seedList.push(recipe.join(','));
                commit('updatePotionKey', {name: key, key: 'recipe', value: recipe});
            }
        },
        setToRecipe({ state, rootGetters, commit }, name) {
            const potion = state.potion[name];
            if (potion && potion.level >= 1 && potion.recipe && potion.recipe.length <= rootGetters['mult/get']('nightHuntMaxIngredients')) {
                commit('updateKey', {key: 'ritualIngredients', value: [...potion.recipe]});
            }
        }
    }
}
