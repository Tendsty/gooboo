import Vue from "vue"

export default {
    namespaced: true,
    state: {
        globalLevel: 0,
        globalLevelParts: {},
        globalLevelUnlocks: {
            gemFeature: 10,
            villageFeature: 12,
            achievementFeature: 15,
            schoolFeature: 25,
            relicFeature: 40,
            schoolLiteratureSubfeature: 50,
            hordeFeature: 60,
            cardFeature: 80,
            generalFeature: 100,
            farmFeature: 130,
            eventFeature: 150,
            schoolHistorySubfeature: 180,
            treasureFeature: 225,
            cryolabFeature: 290,
            galleryFeature: 360,
            schoolArtSubfeature: 440,
            miningGasSubfeature: 625,
            villageCraftingSubfeature: 800,
            // generalOrladeeSubfeature: 1000,
            hordeClassesSubfeature: 1100,
        },
        globalLevelNotes: {
            meta_0: 5,
            meta_7: 8,
            gem_0: 10,
            village_0: 12,
            meta_3: 13,
            achievement_0: 15,
            meta_4: 18,
            gem_1: 22,
            school_0: 25,
            meta_5: 30,
            relic_0: 40,
            meta_6: 42,
            school_3: 50,
            horde_0: 60,
            card_0: 80,
            general_0: 100,
            farm_0: 130,
            event_0: 150,
            school_4: 180,
            treasure_0: 225,
            treasure_1: 228,
            treasure_2: 232,
            cryolab_0: 290,
            gallery_0: 360,
        },
        globalLevelList: ['mining_0', 'mining_1', 'village_0', 'village_1', 'horde_0', 'horde_1', 'farm_0', 'gallery_0']
    },
    getters: {
        globalEventLevel: (state) => {
            return Math.max(0, state.globalLevel - state.globalLevelUnlocks.eventFeature);
        },
        globalLevelParts: (state) => {
            let obj = {};
            state.globalLevelList.forEach(part => {
                if (state.globalLevelParts[part] !== undefined) {
                    obj[part] = state.globalLevelParts[part];
                }
            });
            return obj;
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        },
        updateGlobalLevel(state) {
            let lvl = 0;
            for (const [, elem] of Object.entries(state.globalLevelParts)) {
                lvl += elem;
            }
            state.globalLevel = lvl;
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'globalLevel', value: 0});
            commit('updateKey', {key: 'globalLevelParts', value: {}});
        },
        globalLevelPart({ state, commit, dispatch }, o) {
            const oldGlobalLevel = state.globalLevel;
            if (state.globalLevelParts[o.key] === undefined || state.globalLevelParts[o.key] < o.amount) {
                commit('updateSubkey', {name: 'globalLevelParts', key: o.key, value: o.amount});
                commit('updateGlobalLevel');
                dispatch('globalLevelUnlocks');

                // Update exam passes
                const globalLevelDiff = Math.floor(state.globalLevel / 10) - Math.floor(oldGlobalLevel / 10);
                if (globalLevelDiff > 0) {
                    dispatch('currency/gain', {feature: 'school', name: 'examPass', amount: globalLevelDiff}, {root: true});
                }
            }
        },
        globalLevelUnlocks({ state, rootState, getters, rootGetters, commit, dispatch }) {
            // Global level unlocks
            for (const [key, elem] of Object.entries(state.globalLevelUnlocks)) {
                if (state.globalLevel >= elem && !rootState.unlock[key].use) {
                    let parentFeature = null;
                    for (const [subkey, subelem] of Object.entries(rootState.system.features)) {
                        if (subelem.subfeatures.includes(key)) {
                            parentFeature = subkey;
                        }
                    }

                    commit('system/addNotification', {color: 'success', timeout: -1, message: {
                        type: 'feature',
                        name: parentFeature ?? key.slice(0, -7),
                        subfeature: parentFeature ? key.slice(0, -10) : null
                    }}, {root: true});
                    commit('unlock/unlock', key, {root: true});

                    // Gain various gems on feature unlock to let new players experience the feature right away
                    if (key === 'gemFeature') {
                        dispatch('currency/gain', {feature: 'gem', name: 'ruby', amount: 50}, {root: true});
                        dispatch('currency/gain', {feature: 'gem', name: 'amethyst', amount: 800}, {root: true});
                    } else if (key === 'cardFeature') {
                        dispatch('currency/gain', {feature: 'gem', name: 'emerald', amount: 100}, {root: true});
                    } else if (key === 'eventFeature') {
                        dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount: 500}, {root: true});

                        // Start current event if events just got unlocked
                        const currentEvent = rootGetters['event/currentEvent'];
                        if (currentEvent !== null) {
                            dispatch('event/start', currentEvent, {root: true});
                        }
                    } else if (key === 'treasureFeature') {
                        dispatch('currency/gain', {feature: 'gem', name: 'emerald', amount: 300}, {root: true});
                    }
                }
            }

            // Global level notes
            for (const [key, elem] of Object.entries(state.globalLevelNotes)) {
                if (state.globalLevel >= elem && !rootState.note[key].found) {
                    dispatch('note/find', key, {root: true});
                }
            }

            // Get a relic at global level 40 (when relics unlock)
            if (state.globalLevel >= 40 && !rootState.relic.item.friendlyBat.found) {
                dispatch('relic/find', 'friendlyBat', {root: true});
            }

            // Apply effects
            if (getters.globalEventLevel > 0) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'snowdownResourceGain',
                    multKey: `globalLevel`,
                    value: Math.pow(1.01, getters.globalEventLevel)
                }, {root: true});
            }
        }
    }
}
