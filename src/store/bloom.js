import Vue from "vue";
import { buildNum, capitalize } from "../js/utils/format";
import { randomElem } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        inventory: [],
        breeder: [],
        selling: false,
        flower: {
            daisy: {
                icon: 'mdi-flower',
                color: 'pale-yellow',
                baseValue: 10,
                humusPrice: 1,
                tokens: 2,
                unlock: null
            },
            poppy: {
                icon: 'mdi-flower-tulip',
                color: 'pale-red',
                baseValue: buildNum(30, 'K'),
                humusPrice: 5,
                tokens: 5,
                unlock: 'bloomPoppyFlower'
            },
            iris: {
                icon: 'mdi-flower',
                color: 'purple',
                baseValue: buildNum(10, 'M'),
                humusPrice: 10,
                tokens: 9,
                unlock: 'bloomIrisFlower'
            },
            lily: {
                icon: 'mdi-flower',
                color: 'white',
                baseValue: buildNum(3, 'B'),
                humusPrice: 15,
                tokens: 14,
                unlock: 'bloomLilyFlower'
            },
            orchid: {
                icon: 'mdi-flower',
                color: 'pink',
                baseValue: buildNum(1, 'T'),
                humusPrice: 20,
                tokens: 20,
                unlock: 'bloomOrchidFlower'
            },
            cornflower: {
                icon: 'mdi-flower',
                color: 'blue',
                baseValue: buildNum(300, 'T'),
                humusPrice: 25,
                tokens: 27,
                unlock: 'bloomCornflowerFlower'
            },
        },
        gene: {
            valuable: {
                icon: 'mdi-shimmer'
            },
            mutating: {
                icon: 'mdi-multiplication'
            },
            splitting: {
                icon: 'mdi-call-split'
            },
            resistant: {
                icon: 'mdi-shield-bug'
            },
            huge: {
                icon: 'mdi-resize'
            }
        }
    },
    getters: {
        hasInventorySpace: (state, getters, rootState, rootGetters) => {
            return rootGetters['mult/get']('bloomInventorySize') > state.inventory.length;
        },
        flowerValue: (state, getters, rootState, rootGetters) => (type, tier, gene = []) => {
            return rootGetters['mult/get']('currencyEventBlossomGain', state.flower[type].baseValue * Math.pow(1.75, tier) * (gene.includes('valuable') ? 3 : 1) * Math.pow(1.01, rootGetters['meta/globalEventLevel']));
        },
        slotContent: (state) => (slot) => {
            const slotSplit = slot.split('_');
            const slotNum = parseInt(slotSplit[1]);

            if (slotSplit[0] === 'inventory') {
                return slotNum >= state.inventory.length ? null : {...state.inventory[slotNum]};
            } else {
                return slotNum >= state.breeder.length ? null : {...state.breeder[slotNum]};
            }
        },
        buildFlower: () => (flower = {}, hasTime = false) => {
            let obj = {
                type: flower.type ?? 'daisy',
                tier: flower.tier ?? 0,
                gene: flower.gene ?? []
            };
            if (hasTime) {
                obj.time = flower.time ?? 0;
            }
            return obj;
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.key], o.subkey, o.value);
        },
        pushKey(state, o) {
            state[o.key].push(o.value);
        },
        removeKey(state, o) {
            state[o.key].splice(o.value, 1);
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'inventory', value: []});
            commit('updateKey', {key: 'breeder', value: []});
            commit('updateKey', {key: 'selling', value: false});
        },
        addFlower({ getters, commit }, o) {
            if (getters.hasInventorySpace) {
                commit('pushKey', {key: 'inventory', value: o});
            }
        },
        moveFlower({ state, getters, commit, dispatch }, o) {
            const fromSlot = getters.slotContent(o.from);
            const toSlot = getters.slotContent(o.to);

            const fromSplit = o.from.split('_');
            const toSplit = o.to.split('_');

            if (fromSlot) {
                if (toSlot) {
                    if (fromSlot.type === toSlot.type && fromSlot.tier === toSlot.tier) {
                        // merge flowers and increase tier
                        const hugeGenes = ([...toSlot.gene].includes('huge') ? 1 : 0) + ([...fromSlot.gene].includes('huge') ? 1 : 0);
                        const newTier = toSlot.tier + (hugeGenes > 0 ? 2 : 1);
                        const baseGene = hugeGenes >= 2 ? [...toSlot.gene, ...fromSlot.gene] : [...toSlot.gene, ...fromSlot.gene].filter(el => el !== 'huge');
                        commit('updateSubkey', {key: toSplit[0], subkey: parseInt(toSplit[1]), value: {
                            ...toSlot,
                            tier: newTier,
                            gene: baseGene.filter((v, i, a) => a.indexOf(v) === i).slice(0, 3)
                        }});
                        commit('removeKey', {key: fromSplit[0], value: parseInt(fromSplit[1])});
                        dispatch('updateFlowerStat', {type: toSlot.type, tier: newTier});
                    } else {
                        // switch
                        commit('updateSubkey', {key: toSplit[0], subkey: parseInt(toSplit[1]), value: getters.buildFlower(fromSlot, toSplit[0] === 'breeder')});
                        commit('updateSubkey', {key: fromSplit[0], subkey: parseInt(fromSplit[1]), value: getters.buildFlower(toSlot, fromSplit[0] === 'breeder')});
                    }
                } else {
                    // move
                    if (parseInt(toSplit[1]) >= state[toSplit[0]].length) {
                        commit('pushKey', {key: toSplit[0], value: getters.buildFlower(fromSlot, toSplit[0] === 'breeder')});
                    } else {
                        commit('updateSubkey', {key: toSplit[0], subkey: parseInt(toSplit[1]), value: getters.buildFlower(fromSlot, toSplit[0] === 'breeder')});
                    }
                    commit('removeKey', {key: fromSplit[0], value: parseInt(fromSplit[1])});
                }
            }
        },
        sellFlower({ getters, commit, dispatch }, slot) {
            const flowerSlot = getters.slotContent(slot);

            if (flowerSlot) {
                const flowerSplit = slot.split('_');
                dispatch('currency/gain', {feature: 'event', name: 'blossom', amount: getters.flowerValue(flowerSlot.type, flowerSlot.tier, flowerSlot.gene)}, {root: true});
                commit('removeKey', {key: flowerSplit[0], value: parseInt(flowerSplit[1])});
                dispatch('note/find', 'event_13', {root: true});
            }
        },
        buyFlower({ state, getters, rootGetters, commit, dispatch }, name) {
            const price = state.flower[name].humusPrice;

            if (getters.hasInventorySpace && rootGetters['currency/value']('event_humus') >= price) {
                commit('pushKey', {key: 'inventory', value: getters.buildFlower({type: name, tier: 0, gene: []})});
                dispatch('currency/spend', {feature: 'event', name: 'humus', amount: price}, {root: true});
            }
        },
        updateFlowerStat({ state, rootState, commit, dispatch }, o) {
            const statName = 'bloomMax' + capitalize(o.type);
            const amount = Math.max(0, o.tier - rootState.stat['event_' + statName].value);
            if (amount > 0) {
                dispatch('event/giveTokens', {event: 'bloom', amount: amount * state.flower[o.type].tokens}, {root: true});
                dispatch('note/find', 'event_14', {root: true});
            }
            commit('stat/increaseTo', {feature: 'event', name: statName, value: o.tier}, {root: true});
        },
        triggerWildgrowth({ state, commit }) {
            const geneList = Object.keys(state.gene);
            commit('updateKey', {key: 'inventory', value: state.inventory.map(flower => {
                return {...flower, gene: [...flower.gene, randomElem(geneList.filter(e => flower.gene.indexOf(e) === -1))].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3)};
            })});
        }
    }
}
