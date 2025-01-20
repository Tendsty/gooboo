import Vue from "vue";
import { tick } from "../js/tick";
import { randomHex } from "../js/utils/random";
import seedrandom from "seedrandom";
import { LOCAL_STORAGE_NAME } from "../js/constants";

export default {
    namespaced: true,
    state: {
        version: '1.5.8',
        cheaterSelfMark: 0,
        cheatDetected: {},
        lastPlayedDays: [],
        patchnote: {},
        timestamp: null,
        screen: 'newGame',
        notification: [],
        features: {
            mining: {
                unlock: null,
                subfeatures: ['miningGasSubfeature'],
                currentSubfeature: 0,
                nextSubfeature: 0,
                icon: 'mdi-pickaxe',
                offlineStat: ['mining_maxDepth0', 'mining_maxDepth1', 'mining_depthDwellerCap0', 'mining_depthDwellerCap1'],
                main: true
            },
            village: {
                unlock: 'villageFeature',
                subfeatures: ['villageCraftingSubfeature'],
                currentSubfeature: 0,
                nextSubfeature: 0,
                icon: 'mdi-home-group',
                offlineStat: ['village_maxBuilding'],
                main: true
            },
            horde: {
                unlock: 'hordeFeature',
                subfeatures: ['hordeClassesSubfeature'],
                currentSubfeature: 0,
                nextSubfeature: 0,
                icon: 'mdi-account-group',
                offlineStat: ['horde_maxZone', 'horde_totalMastery'],
                main: true
            },
            farm: {
                unlock: 'farmFeature',
                subfeatures: [],
                currentSubfeature: 0,
                nextSubfeature: 0,
                icon: 'mdi-barn',
                offlineStat: [],
                main: true
            },
            gallery: {
                unlock: 'galleryFeature',
                subfeatures: [],
                currentSubfeature: 0,
                nextSubfeature: 0,
                icon: 'mdi-image-frame',
                offlineStat: [],
                main: true
            },
            debug: {
                unlock: 'debugFeature',
                subfeatures: [],
                icon: 'mdi-cogs',
                main: false
            },
            note: {
                unlock: null,
                subfeatures: [],
                icon: 'mdi-note-multiple',
                main: false
            },
            gem: {
                unlock: 'gemFeature',
                subfeatures: [],
                icon: 'mdi-diamond-stone',
                main: false
            },
            achievement: {
                unlock: 'achievementFeature',
                subfeatures: [],
                icon: 'mdi-trophy',
                main: false
            },
            school: {
                unlock: 'schoolFeature',
                subfeatures: ['schoolLiteratureSubfeature', 'schoolHistorySubfeature', 'schoolArtSubfeature'],
                icon: 'mdi-school',
                main: false
            },
            relic: {
                unlock: 'relicFeature',
                subfeatures: [],
                icon: 'mdi-ring',
                main: false
            },
            card: {
                unlock: 'cardFeature',
                subfeatures: [],
                icon: 'mdi-cards',
                main: false
            },
            general: {
                unlock: 'generalFeature',
                subfeatures: ['generalOrladeeSubfeature', 'generalOppenschroeSubfeature', 'generalBelluxSubfeature', 'generalOnocluaSubfeature', 'generalOmnisolixSubfeature'],
                icon: 'mdi-medal',
                main: false
            },
            event: {
                unlock: 'eventFeature',
                subfeatures: [],
                icon: 'mdi-calendar',
                offlineStat: [],
                main: false
            },
            treasure: {
                unlock: 'treasureFeature',
                subfeatures: [],
                icon: 'mdi-treasure-chest',
                main: false
            },
            cryolab: {
                unlock: 'cryolabFeature',
                subfeatures: [],
                icon: 'mdi-test-tube',
                main: false
            }
        },
        settings: {
            general: {
                unlock: null,
                items: {
                    pause: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    dark: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    },
                    autosaveTimer: {
                        unlock: null,
                        hasDescription: false,
                        type: 'number',
                        min: 10,
                        max: 3600,
                        step: 5,
                        suffix: 's',
                        value: 30,
                        defaultValue: 30,
                        clearable: true
                    },
                    lang: {
                        unlock: null,
                        hasDescription: false,
                        type: 'select',
                        items: ['en', 'de'],
                        value: 'en',
                        defaultValue: 'en'
                    },
                    tabDisplayDesktop: {
                        unlock: null,
                        hasDescription: false,
                        mobile: false,
                        type: 'select',
                        items: ['icon', 'text', 'both'],
                        value: 'both',
                        defaultValue: 'both'
                    },
                    tabDisplayMobile: {
                        unlock: null,
                        hasDescription: false,
                        mobile: true,
                        type: 'select',
                        items: ['icon', 'text', 'both'],
                        value: 'icon',
                        defaultValue: 'icon'
                    },
                    relativeUpgradeStats: {
                        unlock: null,
                        hasDescription: true,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    },
                    useLegacyFarmSelect: {
                        unlock: 'farmFeature',
                        hasDescription: true,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    },
                }
            },
            automation: {
                unlock: null,
                items: {
                    progressMining: {
                        unlock: null,
                        hasDescription: true,
                        type: 'number',
                        min: 1,
                        max: 86400,
                        step: 1,
                        suffix: 's',
                        value: null,
                        defaultValue: null,
                        clearable: true
                    },
                    fightHordeBoss: {
                        unlock: 'hordeFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    }
                }
            },
            performance: {
                unlock: null,
                items: {
                    upgradeListItems: {
                        unlock: null,
                        hasDescription: false,
                        type: 'number',
                        min: 1,
                        value: 5,
                        defaultValue: 5,
                        clearable: true
                    },
                    cssShadows: {
                        unlock: null,
                        hasDescription: false,
                        type: 'select',
                        items: [0, 1, 2],
                        value: 2,
                        defaultValue: 2
                    },
                    particleAmount: {
                        unlock: 'gemFeature',
                        hasDescription: false,
                        type: 'select',
                        items: [0, 1, 2, 3],
                        value: 2,
                        defaultValue: 2
                    },
                    recordAutoplay: {
                        unlock: 'debugFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    }
                }
            },
            notification: {
                unlock: null,
                items: {
                    position: {
                        unlock: null,
                        hasDescription: false,
                        type: 'select',
                        items: [0, 1, 2, 3, 4, 5],
                        value: 3,
                        defaultValue: 3
                    },
                    autosave: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    backupHint: {
                        unlock: null,
                        hasDescription: false,
                        type: 'select',
                        items: [0, 1, 2, 3],
                        value: 2,
                        defaultValue: 2
                    },
                    updateCheck: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    note: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    achievement: {
                        unlock: 'achievementFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    heirloom: {
                        unlock: 'hordeHeirlooms',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    cardPackContent: {
                        unlock: 'cardFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    cropReady: {
                        unlock: 'farmFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                }
            },
            confirm: {
                unlock: null,
                items: {
                    prestige: {
                        unlock: null,
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    gem: {
                        unlock: 'gemFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    eventToken: {
                        unlock: 'eventFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    farmRareResources: {
                        unlock: 'farmFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    },
                    treasureDelete: {
                        unlock: 'treasureFeature',
                        hasDescription: false,
                        type: 'switch',
                        value: true,
                        defaultValue: true
                    }
                }
            },
            experiment: {
                unlock: null,
                items: {
                    currencyLabel: {
                        unlock: null,
                        hasDescription: true,
                        type: 'switch',
                        value: false,
                        defaultValue: false
                    }
                }
            }
        },
        keybinds: {
            prevMainFeature: null,
            nextMainFeature: null,
            debugSkip1m: null,
            debugSkip10m: null,
            debugSkip1h: null,
            debugSkip1d: null,
        },
        keybindCurrent: null,
        autosaveTimer: null,
        backupTimer: 0,
        autoplayData: [],
        autoplayChoice: {},
        note: null,
        confirm: null,
        currentDay: null,
        rng: {},
        theme: 'default',
        themes: {},
        offlineTime: 0,
        oldSavefile: null,
        timeMult: 1,
        noteHint: [],
        farmHint: false,
        tutorial: {},
        cachePage: {},
        playerId: null,
        playerName: null,
    },
    getters: {
        mainFeatures: (state, getters, rootState) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state.features)) {
                if (elem.main && (elem.unlock === null || rootState.unlock[elem.unlock].see)) {
                    arr.push({...elem, name: key});
                }
            }
            return arr;
        },
        sideFeatures: (state, getters, rootState) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state.features)) {
                if (!elem.main && (elem.unlock === null || rootState.unlock[elem.unlock].see)) {
                    arr.push({...elem, name: key});
                }
            }
            return arr;
        },
        nextFeature: (state, getters, rootState) => {
            let feat = null;

            for (const [key, elem] of Object.entries(state.features)) {
                if (elem.unlock && !rootState.unlock[elem.unlock].use && rootState.meta.globalLevelUnlocks[elem.unlock] && (feat === null || (rootState.meta.globalLevelUnlocks[elem.unlock] < feat.globalLevel))) {
                    feat = {...elem, name: key, globalLevel: rootState.meta.globalLevelUnlocks[elem.unlock], type: elem.main ? 'main' : 'side'};
                }

                elem.subfeatures.forEach(subelem => {
                    if (!rootState.unlock[subelem].use && rootState.meta.globalLevelUnlocks[subelem] && (feat === null || (rootState.meta.globalLevelUnlocks[subelem] < feat.globalLevel))) {
                        feat = {feature: key, name: subelem, globalLevel: rootState.meta.globalLevelUnlocks[subelem], type: 'subfeature'};
                    }
                });
            }

            return feat;
        },
        getRng: (state) => (name, skip = 0) => {
            return seedrandom(state.playerId + name + '_' + ((state.rng[name] ?? 0) + skip));
        },
        getRngById: (state) => (name, id) => {
            return seedrandom(state.playerId + name + '_' + id);
        },
        backupHint: (state) => {
            const mode = state.settings.notification.items.backupHint.value;

            return ((mode === 1 && state.backupTimer >= 172800) || // 2d  (rare)
                (mode === 2 && state.backupTimer >= 43200) ||      // 12h (average)
                (mode === 3 && state.backupTimer >= 10800));       // 3h  (common)
        },
        isEndOfFeature: (state, getters, rootState) => {
            switch (state.screen) {
                case 'mining': {
                    switch (state.features.mining.currentSubfeature) {
                        case 0:
                            return rootState.stat.mining_maxDepth0.total > 475;
                        case 1:
                            return rootState.stat.mining_maxDepth1.total > 160;
                    }
                    break;
                }
                case 'village': {
                    switch (state.features.village.currentSubfeature) {
                        case 0:
                            return rootState.upgrade.item.village_windTurbine.highestLevel > 0;
                        case 1:
                            return rootState.upgrade.item.village_marbleBin.highestLevel > 0;
                    }
                    break;
                }
                case 'horde': {
                    switch (state.features.horde.currentSubfeature) {
                        case 0:
                            return rootState.stat.horde_maxZone.total > 300;
                        case 1:
                            return rootState.unlock.hordeEndOfContent.use;
                    }
                    break;
                }
                case 'farm': {
                    return rootState.upgrade.item.farm_seedBox.highestLevel >= 24;
                }
                case 'gallery': {
                    return rootState.stat.gallery_brown.total > 0;
                }
                default:
                    return false;
            }
        },
        isOnMainFeature: (state, getters) => {
            return getters.mainFeatures.map(elem => elem.name).includes(state.screen);
        },
        activeTutorial: (state) => {
            for (const [key, elem] of Object.entries(state.tutorial)) {
                if (elem.active && !elem.completed && (elem.screen === null || elem.screen === state.screen)) {
                    return key;
                }
            }
            return null;
        },
        cheetahState: (state) => {
            let highest = 0;
            for (const [, elem] of Object.entries(state.cheatDetected)) {
                if (elem.severity > highest) {
                    highest = elem.severity;
                }
            }
            return highest;
        },
        cheetahBreakdown: (state) => {
            let obj = {};
            for (const [key, elem] of Object.entries(state.cheatDetected)) {
                const feature = key.split('_')[1];
                if (obj[feature] === undefined) {
                    obj[feature] = 0;
                }
                if (elem.severity > obj[feature]) {
                    obj[feature] = elem.severity;
                }
            }
            return obj;
        }
    },
    mutations: {
        nextRng(state, o) {
            state.rng[o.name] = (state.rng[o.name] ?? 0) + o.amount;
        },
        initTheme(state, o) {
            Vue.set(state.themes, o.name, {
                owned: o.owned ?? false,
                ownedDefault: o.owned ?? false,
                price: o.price ?? null,
                hasCustomNavbar: o.hasCustomNavbar ?? false,
                hasCustomBackground: o.hasCustomBackground ?? false,
                hasCustomColors: o.hasCustomColors ?? false,
                hasCustomUI: o.hasCustomUI ?? false,
                hasAnimations: o.hasAnimations ?? false,
                hasParticles: o.hasParticles ?? false,
                particles: o.particles ?? null,
                light: o.light,
                dark: o.dark
            });
        },
        initPatchnote(state, o) {
            Vue.set(state.patchnote, o.name, {
                day: o.day,
                content: o.content
            });
        },
        initTutorial(state, o) {
            Vue.set(state.tutorial, o.name, {
                screen: o.screen ?? null,
                enableCondition: o.enableCondition ?? (() => true),
                delay: o.delay ?? 5,
                currentDelay: 0,
                cssDesktop: o.cssDesktop ?? '',
                cssTablet: o.cssTablet ?? '',
                cssMobile: o.cssMobile ?? '',
                active: false,
                completed: false
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        },
        updateThemeKey(state, o) {
            Vue.set(state.themes[o.name], o.key, o.value);
        },
        updateTutorialKey(state, o) {
            Vue.set(state.tutorial[o.name], o.key, o.value);
        },
        updateCachePageKey(state, o) {
            Vue.set(state.cachePage, o.key, o.value);
        },
        updateSubfeature(state, o) {
            Vue.set(state.features[o.key], 'currentSubfeature', o.value);
        },
        updateNextSubfeature(state, o) {
            Vue.set(state.features[o.key], 'nextSubfeature', o.value);
        },
        updateKeybind(state, o) {
            Vue.set(state.keybinds, o.name, o.value);
        },
        updateSetting(state, o) {
            Vue.set(state.settings[o.category].items[o.name], 'value', o.value);
        },
        addNotification(state, value) {
            state.notification.push(value);
        },
        setNotification(state, value) {
            state.notification = value;
        },
        resetAutosaveTimer(state) {
            const timer = state.settings.general.items.autosaveTimer.value;
            Vue.set(state, 'autosaveTimer', timer !== null ? parseInt(timer) : timer);
        },
        addAutoplayData(state, data) {
            state.autoplayData.push(data);
        },
        updateAutoplayChoice(state, o) {
            Vue.set(state.autoplayChoice, o.key, o.value);
        },
        addNoteHint(state, name) {
            state.noteHint.push(name);
        },
        removeNoteHint(state, name) {
            Vue.set(state, 'noteHint', state.noteHint.filter(elem => elem !== name));
        },
        generatePlayerId(state) {
            if (state.playerId === null) {
                state.playerId = randomHex(16);
            }
        },
        registerCheat(state, o) {
            const key = (o.modid ?? 'gooboo') + '_' + (o.feature ?? 'meta') + '_' + o.name;
            const severity = o.severity ?? 200;
            if (state.cheatDetected[key] === undefined) {
                console.warn(`Cheat detected: ${ key } - severity ${ severity }`);
                Vue.set(state.cheatDetected, key, {version: state.version, severity});
            }
            if (state.cheatDetected[key] !== undefined && state.cheatDetected[key].severity < severity) {
                console.warn(`Cheat severity increased: ${ key } - severity ${ severity }`);
                Vue.set(state.cheatDetected[key], 'severity', severity);
            }
        },
        reformFeature(state, feature) {
            let newCheatObj = {};
            for (const [key, elem] of Object.entries(state.cheatDetected)) {
                if (key.split('_')[1] !== feature) {
                    newCheatObj[key] = elem;
                }
            }
            Vue.set(state, 'cheatDetected', newCheatObj);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'cheaterSelfMark', value: 0});
            commit('updateKey', {key: 'cheatDetected', value: {}});
            commit('updateKey', {key: 'lastPlayedDays', value: []});
            commit('updateKey', {key: 'notification', value: []});
            commit('updateKey', {key: 'keybindCurrent', value: null});
            commit('updateKey', {key: 'autosaveTimer', value: null});
            commit('updateKey', {key: 'backupTimer', value: 0});
            commit('updateKey', {key: 'autoplayData', value: []});
            commit('updateKey', {key: 'autoplayChoice', value: {}});
            commit('updateKey', {key: 'note', value: null});
            commit('updateKey', {key: 'confirm', value: null});
            commit('updateKey', {key: 'offlineTime', value: 0});
            commit('updateKey', {key: 'oldSavefile', value: null});
            commit('updateKey', {key: 'timeMult', value: 1});
            commit('updateKey', {key: 'noteHint', value: []});
            commit('updateKey', {key: 'farmHint', value: false});
            commit('updateKey', {key: 'rng', value: {}});
            commit('updateKey', {key: 'cachePage', value: {}});
            commit('updateKey', {key: 'playerId', value: null});
            commit('updateKey', {key: 'playerName', value: null});

            for (const [key, elem] of Object.entries(state.features)) {
                if (elem.currentSubfeature !== undefined) {
                    commit('updateSubfeature', {key, value: 0});
                }
            }
            for (const [key, elem] of Object.entries(state.settings)) {
                for (const [subkey, subelem] of Object.entries(elem.items)) {
                    commit('updateSetting', {category: key, name: subkey, value: subelem.defaultValue});
                }
            }
            for (const [key] of Object.entries(state.keybinds)) {
                commit('updateKeybind', {name: key, value: null});
            }
            for (const [key, elem] of Object.entries(state.themes)) {
                commit('updateThemeKey', {name: key, key: 'owned', value: elem.ownedDefault});
            }
            for (const [key] of Object.entries(state.tutorial)) {
                commit('updateTutorialKey', {name: key, key: 'active', value: false});
                commit('updateTutorialKey', {name: key, key: 'completed', value: false});
            }
        },
        applyEffect({ commit, dispatch }, o) {
            switch (o.type) {
                case 'base':
                    if (!isNaN(o.value) && o.value !== null) {
                        dispatch('mult/setBase', {name: o.name, key: o.multKey, value: o.value, trigger: o.trigger}, {root: true});
                    }
                    break;
                case 'mult':
                    if (!isNaN(o.value) && o.value !== null) {
                        dispatch('mult/setMult', {name: o.name, key: o.multKey, value: o.value, trigger: o.trigger}, {root: true});
                    }
                    break;
                case 'bonus':
                    if (!isNaN(o.value) && o.value !== null) {
                        dispatch('mult/setBonus', {name: o.name, key: o.multKey, value: o.value, trigger: o.trigger}, {root: true});
                    }
                    break;
                case 'unlock':
                    if (o.value) {
                        commit('unlock/unlock', o.name, {root: true});
                        if (o.trigger && o.name.slice(0, 15) === 'villageOffering') {
                            dispatch('village/applyOfferingEffect', null, {root: true});
                        }
                    }
                    break;
                case 'tag':
                    if (o.value !== null) {
                        commit('tag/set', {name: o.name, key: o.multKey, value: o.value}, {root: true});
                    }
                    break;
                case 'keepUpgrade':
                    if (o.value) {
                        dispatch('upgrade/makePersistent', o.name, {root: true});
                    }
                    break;
                case 'findConsumable':
                    if (o.value) {
                        commit('consumable/updateKey', {name: o.name, key: 'found', value: true}, {root: true});
                    }
                    break;
                case 'villageJob':
                    commit('village/updateJobKey', {name: o.name, key: 'max', value: o.value}, {root: true});
                    break;
                case 'villageCraft':
                    if (o.value) {
                        commit('village/updateSubkey', {key: 'crafting', name: o.name, subkey: 'unlocked', value: true}, {root: true});
                    }
                    break;
                case 'farmSeed':
                    if (o.value) {
                        commit('farm/updateCropKey', {name: o.name, key: 'found', value: true}, {root: true});
                    }
                    break;
                case 'farmTile':
                    commit('farm/applyTileUpgrade', o.value, {root: true});
                    break;
                case 'farmBuilding':
                    commit('farm/updateBuildingKey', {name: o.name, key: 'max', value: o.value}, {root: true});
                    break;
                case 'farmBuildingPremium':
                    commit('farm/updateBuildingKey', {name: o.name, key: 'maxPremium', value: o.value}, {root: true});
                    break;
                case 'galleryIdea':
                    if (o.value) {
                        commit('gallery/updateIdeaKey', {name: o.name, key: 'owned', value: true}, {root: true});
                    }
                    break;
                case 'galleryShape':
                    if (o.value) {
                        commit('gallery/updateShapeKey', {name: o.name, key: 'unlocked', value: true}, {root: true});
                    }
                    break;
                default:
                    break;
            }
        },
        resetEffect({ commit, dispatch }, o) {
            switch (o.type) {
                case 'base':
                    dispatch('mult/removeKey', {name: o.name, type: 'base', key: o.multKey}, {root: true});
                    break;
                case 'mult':
                    dispatch('mult/removeKey', {name: o.name, type: 'mult', key: o.multKey}, {root: true});
                    break;
                case 'bonus':
                    dispatch('mult/removeKey', {name: o.name, type: 'bonus', key: o.multKey}, {root: true});
                    break;
                case 'unlock':
                    commit('unlock/reset', o.name, {root: true});
                    break;
                case 'tag':
                    commit('tag/reset', {name: o.name, key: o.multKey}, {root: true});
                    break;
                case 'villageJob':
                    commit('village/updateJobKey', {name: o.name, key: 'max', value: 0}, {root: true});
                    break;
                case 'villageCraft':
                    commit('village/updateSubkey', {key: 'crafting', name: o.name, subkey: 'unlocked', value: false}, {root: true});
                    break;
                default:
                    break;
            }
        },
        processKeyPress({ state, rootState, getters, commit, dispatch }, e) {
            if (document.activeElement.tagName !== 'INPUT' && state.screen !== 'tab-duplicate') {
                if (state.confirm !== null && e.code === 'Enter') {
                    dispatch('confirmAction');
                    commit('updateKey', {key: 'confirm', value: null});
                } else if (state.keybindCurrent === null) {
                    // Not assigning a keybind, process it
                    let foundKeybind = null;
                    for (const [key, elem] of Object.entries(state.keybinds)) {
                        if (elem !== null && elem.code === e.code && elem.ctrl === e.ctrlKey && elem.alt === e.altKey && elem.shift === e.shiftKey) {
                            foundKeybind = key;
                        }
                    }
                    switch (foundKeybind) {
                        case 'prevMainFeature': {
                            const mainFeatureList = getters.mainFeatures.map(elem => elem.name).filter(elem => !rootState.cryolab[elem]?.active).reverse();
                            const currentIndex = mainFeatureList.findIndex(elem => elem === state.screen);
                            commit('updateKey', {key: 'screen', value: mainFeatureList[(currentIndex + 1) >= mainFeatureList.length ? 0 : (currentIndex + 1)]});
                            break;
                        }
                        case 'nextMainFeature': {
                            const mainFeatureList = getters.mainFeatures.map(elem => elem.name).filter(elem => !rootState.cryolab[elem]?.active);
                            const currentIndex = mainFeatureList.findIndex(elem => elem === state.screen);
                            commit('updateKey', {key: 'screen', value: mainFeatureList[(currentIndex + 1) >= mainFeatureList.length ? 0 : (currentIndex + 1)]});
                            break;
                        }
                        case 'debugSkip1m': {
                            tick(60, 0);
                            break;
                        }
                        case 'debugSkip10m': {
                            tick(600, 0);
                            break;
                        }
                        case 'debugSkip1h': {
                            tick(3600, 0);
                            break;
                        }
                        case 'debugSkip1d': {
                            tick(86400, 0);
                            break;
                        }
                        default:
                            break;
                    }
                    if (foundKeybind) {
                        e.stopPropagation();
                    }
                } else {
                    // Assign the input to the active keybind
                    commit('updateKeybind', {name: state.keybindCurrent, value: {
                        ctrl: e.ctrlKey,
                        alt: e.altKey,
                        shift: e.shiftKey,
                        code: e.code
                    }});
                    e.stopPropagation();
                }
            }
        },
        updateSetting({ commit, dispatch }, o) {
            commit('updateSetting', o);
            if (o.category === 'general' && o.name === 'autosaveTimer') {
                commit('resetAutosaveTimer');
            }
            if (o.category === 'general' && o.name === 'lang') {
                commit('mult/clearCache', null, {root: true});
            }
            if (o.category === 'notification' && o.name === 'note') {
                commit('updateKey', {key: 'noteHint', value: []});
            }
            if (o.category === 'notification' && o.name === 'cropReady') {
                dispatch('farm/updateGrownHint', null, {root: true});
            }
        },
        buyTheme({ state, rootGetters, commit, dispatch }, name) {
            const theme = state.themes[name];
            if (!theme.owned && theme.price !== null && rootGetters['currency/value']('gem_amethyst') >= theme.price) {
                commit('updateThemeKey', {name, key: 'owned', value: true});
                dispatch('currency/spend', {feature: 'gem', name: 'amethyst', amount: theme.price}, {root: true});
            }
        },
        resetFeatureProgress({ state, rootState, commit, dispatch }, o) {
            if (o.feature !== 'school') {
                commit('system/updateSubfeature', {key: o.feature, value: 0}, {root: true});
                for (let i = 0, n = state.features[o.feature].subfeatures.length + 1; i < n; i++) {
                    dispatch('upgrade/resetAll', {feature: o.feature, subfeature: i, type: 'regular'}, {root: true});
                    if (o.feature === 'village' && i === 0) {
                        dispatch('upgrade/resetAll', {feature: o.feature, subfeature: i, type: 'building'}, {root: true});
                    }
                    if (o.feature === 'gallery' && i === 0) {
                        dispatch('upgrade/resetAll', {feature: o.feature, subfeature: i, type: 'shape'}, {root: true});
                    }
                    if (o.feature !== 'farm') {
                        dispatch('upgrade/resetAll', {feature: o.feature, subfeature: i, type: 'prestige'}, {root: true});
                    }
                }
                dispatch('currency/reset', {feature: o.feature}, {root: true});
                dispatch('card/resetCards', o.feature, {root: true});
                dispatch('stat/resetAll', o.feature, {root: true});
            }

            // Feature specific effects before state wipe
            if (o.feature === 'mining') {
                for (const [key, elem] of Object.entries(rootState.mining.enhancement)) {
                    if (elem.level > 0) {
                        commit('mining/updateEnhancementKey', {name: key, key: 'level', value: 0}, {root: true});
                        dispatch('mining/resetEnhancement', key, {root: true});
                    }
                }
            }
            if (o.feature === 'horde') {
                for (const [key, elem] of Object.entries(rootState.horde.items)) {
                    if (elem.equipped) {
                        dispatch('horde/unequipItem', key, {root: true});
                    }
                }
                for (const [key] of Object.entries(rootState.horde.itemStatMult)) {
                    const split = key.split('_');
                    dispatch('system/resetEffect', {type: split[1], name: split[0], multKey: `hordeItemPermanent`}, {root: true});
                }
                for (const [key, elem] of Object.entries(rootState.horde.heirloom)) {
                    elem.effect.forEach(eff => {
                        dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `hordeHeirloom_${ key }`}, {root: true});
                    });
                }
                for (const [name, skill] of Object.entries(rootState.horde.fighterClass[rootState.horde.selectedClass].skills)) {
                    if (skill.type !== 'active') {
                        skill.effect.forEach(eff => {
                            dispatch('system/resetEffect', {
                                type: eff.type,
                                name: eff.name,
                                multKey: `hordeSkill_${name}`
                            }, {root: true});
                        });
                    }
                }
            }

            // Clean state
            dispatch(`${ o.feature }/cleanState`, null, {root: true});

            // Clear cheater status
            commit('reformFeature', o.feature);

            // Feature specific effects after state wipe
            if (o.feature === 'mining') {
                dispatch('mining/applyBeaconEffects', null, {root: true});
            }
            if (o.feature === 'village') {
                for (const [key] of Object.entries(rootState.village.job)) {
                    dispatch('village/applyJobEffect', key, {root: true});
                }
                for (const [key] of Object.entries(rootState.village.policy)) {
                    dispatch('village/applyPolicyEffect', key, {root: true});
                }
                for (const [key, elem] of Object.entries(rootState.village.crafting)) {
                    if (elem.isSpecial) {
                        elem.effect.forEach(reward => {
                            dispatch('system/resetEffect', {type: reward.type, name: reward.name, multKey: `villageSpecialCraft_${ key }`}, {root: true});
                        });
                    }
                }
                dispatch('village/applyOfferingEffect', null, {root: true});
                dispatch('upgrade/updateVillageStats', null, {root: true});
            }
            if (o.feature === 'horde') {
                dispatch('horde/resetStats', null, {root: true});
                dispatch('horde/updateNostalgia', null, {root: true});
                dispatch('horde/applyClassEffects', null, {root: true});
                dispatch('horde/applyClassLevelEffects', null, {root: true});
                dispatch('mult/updateExternalCaches', 'hordeNostalgia', {root: true});

                for (const [key] of Object.entries(rootState.horde.trinket)) {
                    dispatch('horde/removeTrinketEffects', key, {root: true})
                }

                // Reset tower rewards
                for (const [name, tower] of Object.entries(rootState.horde.tower)) {
                    for (const [floor, reward] of Object.entries(tower.reward)) {
                        dispatch('system/resetEffect', {type: reward.type, name: reward.name, multKey: `hordeTower_${ name }_${ floor }`}, {root: true});
                    }
                }

                // Reset battle pass rewards
                dispatch('system/resetEffect', {type: 'mult', name: 'hordeAttack', multKey: `hordeBattlePass`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: 'hordeHealth', multKey: `hordeBattlePass`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: 'currencyHordeBoneGain', multKey: `hordeBattlePass`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: 'currencyHordeBloodGain', multKey: `hordeBattlePass`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: 'currencyHordeSoulCorruptedGain', multKey: `hordeBattlePass`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: 'currencyHordeCourageGain', multKey: `hordeBattlePass`}, {root: true});
                for (const [key, elem] of Object.entries(rootState.horde.battlePassEffect)) {
                    elem.effect.forEach(effect => {
                        dispatch('system/resetEffect', {
                            type: effect.type,
                            name: effect.name,
                            multKey: `hordeBattlePass_${ key }`
                        }, {root: true});
                    });
                }

                dispatch('horde/updateEnergy', null, {root: true});
                dispatch('horde/updateMana', null, {root: true});
                dispatch('horde/updateActiveTimer', 0, {root: true});
                dispatch('horde/updateMaxDifficulty', null, {root: true});
                dispatch('horde/updateMysticalShardCap', null, {root: true});
                dispatch('horde/updateSacrifice', null, {root: true});
            }
            if (o.feature === 'farm') {
                commit('farm/initField', null, {root: true});
                dispatch('farm/applyEarlyGameBuff', null, {root: true});
                dispatch('farm/applyCropPrestige', null, {root: true});
                dispatch('farm/applyGeneEffects', null, {root: true});
            }
            if (o.feature === 'gallery') {
                for (const [key] of Object.entries(rootState.gallery.idea)) {
                    dispatch('gallery/applyIdeaReset', key, {root: true});
                }
                for (const [key] of Object.entries(rootState.gallery.colorData)) {
                    dispatch('gallery/applyCanvasLevel', {name: key}, {root: true});
                }
                commit('gallery/initShapeGrid', null, {root: true});
            }

            // Make sure premium buildings and relics get applied correctly
            for (const [key, elem] of Object.entries(rootState.upgrade.item)) {
                if (elem.feature === o.feature && elem.type === 'premium') {
                    dispatch('upgrade/apply', {name: key}, {root: true});
                }
            }
            for (const [key, elem] of Object.entries(rootState.relic.item)) {
                if (elem.feature.includes(o.feature) && elem.found) {
                    dispatch('relic/apply', {name: key, onFind: true}, {root: true});
                }
            }
        },
        confirmAction({ state, dispatch }) {
            switch (state.confirm.type) {
                case 'prestige': {
                    dispatch(`${state.confirm.feature}/prestige`, state.confirm.subfeature, {root: true});
                    break;
                }
                case 'prestigeCrop': {
                    dispatch('farm/cropPrestige', state.confirm.name, {root: true});
                    break;
                }
                case 'upgrade': {
                    const splitName = state.confirm.name.split('_');
                    dispatch('upgrade/buy', {feature: splitName[0], name: splitName[1], amount: state.confirm.amount}, {root: true});
                    break;
                }
                case 'shop': {
                    dispatch('event/buyShop', {pool: state.confirm.pool, index: state.confirm.index, max: state.confirm.max}, {root: true});
                    break;
                }
                case 'theme': {
                    dispatch('buyTheme', state.confirm.name);
                    break;
                }
                case 'cardPack': {
                    dispatch('card/buyPack', {name: state.confirm.name, notify: true, amount: state.confirm.amount}, {root: true});
                    break;
                }
                case 'farmCrop': {
                    switch (state.confirm.mode) {
                        case 'plantSingle':
                            dispatch('farm/plantCrop', {x: state.confirm.x, y: state.confirm.y, crop: state.confirm.crop, fertilizer: state.confirm.fertilizer}, {root: true});
                            break;
                        case 'plantAll':
                            dispatch('farm/plantAll', {crop: state.confirm.crop, fertilizer: state.confirm.fertilizer}, {root: true});
                            break;
                        case 'replantAll':
                            dispatch('farm/replantAll', null, {root: true});
                            break;
                    }
                    break;
                }
                case 'galleryMotivation': {
                    dispatch('gallery/buyMotivation', null, {root: true});
                    break;
                }
                case 'schoolExamPass': {
                    dispatch('school/buyPass', null, {root: true});
                    break;
                }
                case 'treasure': {
                    dispatch('treasure/buy', state.confirm.treasureType, {root: true});
                    break;
                }
                case 'treasureFragment': {
                    dispatch('treasure/buyFragments', null, {root: true});
                    break;
                }
                case 'treasureDelete': {
                    dispatch('treasure/deleteItem', state.confirm.id, {root: true});
                    break;
                }
                case 'casinoBingoBuy': {
                    dispatch('event/casinoBingoBuy', null, {root: true});
                    break;
                }
                case 'casinoWheelSpin': {
                    dispatch('event/casinoWheelSpin', null, {root: true});
                    break;
                }
                case 'weatherChaosFishingRodBuy': {
                    dispatch('weatherChaos/buyFishingRod', state.confirm.name, {root: true});
                    break;
                }
                case 'summerFestivalCellBuy': {
                    dispatch('summerFestival/buyIslandCell', state.confirm.cell, {root: true});
                    break;
                }
                case 'consumable': {
                    switch (state.confirm.subtype) {
                        case 'craftPickaxe': {
                            dispatch('mining/craftPickaxe', state.confirm.consumable, {root: true});
                            break;
                        }
                        case 'openIngredientBox': {
                            dispatch('village/openIngredientBox', null, {root: true});
                            break;
                        }
                        case 'useManaPotion': {
                            dispatch('horde/useManaPotion', null, {root: true});
                            break;
                        }
                        case 'fastPrestige': {
                            dispatch('gem/fastPrestige', state.confirm.prestige, {root: true});
                            break;
                        }
                    }
                    break;
                }
                case 'reset': {
                    dispatch('resetFeatureProgress', state.confirm);
                    break;
                }
                case 'resetAll': {
                    localStorage.removeItem(LOCAL_STORAGE_NAME);
                    location.reload();
                    break;
                }
            }
        }
    }
}
