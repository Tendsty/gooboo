import Vue from "vue";
import store from "../store";
import { download } from "./utils/file";
import mining from "./modules/mining";
import village from "./modules/village";
import horde from "./modules/horde";
import farm from "./modules/farm";
import gallery from "./modules/gallery";
import gem from "./modules/gem";
import achievement from "./modules/achievement";
import school from "./modules/school";
import card from "./modules/card";
import treasure from "./modules/treasure";
import general from "./modules/general";
import event from "./modules/event";
import cryolab from "./modules/cryolab";
import v1_1_0 from "./modules/migration/v1_1_0";
import { getDay } from "./utils/date";
import v1_1_2 from "./modules/migration/v1_1_2";
import v1_3_0 from "./modules/migration/v1_3_0";
import { APP_TESTING, LOCAL_STORAGE_NAME } from "./constants";
import v1_3_4 from "./modules/migration/v1_3_4";
import v1_3_5 from "./modules/migration/v1_3_5";
import v1_4_0 from "./modules/migration/v1_4_0";
import v1_4_1 from "./modules/migration/v1_4_1";
import { simpleHash } from "./utils/random";
import v1_5_0 from "./modules/migration/v1_5_0";
import v1_5_1 from "./modules/migration/v1_5_1";
import v1_5_3 from "./modules/migration/v1_5_3";
import v1_5_4 from "./modules/migration/v1_5_4";
import v1_5_6 from "./modules/migration/v1_5_6";

const migrations = {
    '1.1.0': v1_1_0,
    '1.1.2': v1_1_2,
    '1.3.0': v1_3_0,
    '1.3.4': v1_3_4,
    '1.3.5': v1_3_5,
    '1.4.0': v1_4_0,
    '1.4.1': v1_4_1,
    '1.5.0': v1_5_0,
    '1.5.1': v1_5_1,
    '1.5.3': v1_5_3,
    '1.5.4': v1_5_4,
    '1.5.6': v1_5_6,
};

export { checkLocal, saveLocal, loadFile, exportFile, cleanStore, getSavefile, getSavefileName, encodeFile, decodeFile }
const semverCompare = require('semver/functions/compare');

/**
 * An array of modules that save and load data to the savefile
 */
const modules = [event, mining, village, horde, farm, gallery, gem, achievement, school, card, general, treasure, cryolab];

function checkLocal() {
    return localStorage.getItem(LOCAL_STORAGE_NAME);
}

function saveLocal() {
    localStorage.setItem(LOCAL_STORAGE_NAME, getSavefile());
}

function cleanStore() {
    Object.keys(store._modules.root._children).forEach(module => {
        store.dispatch(`${ module }/cleanState`);
    });
    store.commit('upgrade/initCache');
    store.commit('mining/updateKey', {key: 'durability', value: store.getters['mining/currentDurability']});
    store.dispatch('horde/updatePlayerStats');
    store.dispatch('horde/updateEnemyStats');
}

function migrate(file) {
    for (const [version, migration] of Object.entries(migrations)) {
        if (semverCompare(file.version, version) === -1) {
            file = migration(file);
        }
    }
    return file;
}

function encodeFile(file) {
    return btoa(JSON.stringify(file));
}

function decodeFile(file, showErrors = true) {
    // Base64 decode if needed
    if (file.charAt(0) !== '{') {
        try {
            file = atob(file);
        } catch {
            if (showErrors) {
                store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                    type: 'import',
                    error: 'base64'
                }});
            }
            return null;
        }
    }

    // Parse JSON
    try {
        file = JSON.parse(file);
    } catch {
        if (showErrors) {
            store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                type: 'import',
                error: 'json'
            }});
        }
        return null;
    }

    // Check if keys are missing
    [
        'version', 'timestamp', 'theme', 'unlock', 'settings', 'subfeature',
        'currency', 'stat', 'upgrade', 'upgradeQueue', 'relic', 'globalLevel',
        'keybinds', 'note', 'consumable', 'rng'
    ].forEach(key => {
        if (file[key] === undefined) {
            if (showErrors) {
                store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                    type: 'import',
                    error: 'key'
                }});
            }
            return null;
        }
    });

    // Check if loaded from a newer version
    if (semverCompare(file.version, store.state.system.version) === 1) {
        if (showErrors) {
            store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                type: 'import',
                error: 'version',
                version: file.version
            }});
        }
        return null;
    }

    // Check if loaded from testing build
    if (file.testing && !APP_TESTING) {
        if (showErrors) {
            store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                type: 'import',
                error: 'testing'
            }});
        }
        return null;
    }

    // Check if loaded from different testing build
    if (APP_TESTING && file.testing && file.version !== store.state.system.version) {
        if (showErrors) {
            store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
                type: 'import',
                error: 'testingVersion'
            }});
        }
        return null;
    }

    // Check for invalid checksum
    // eslint-disable-next-line no-unused-vars
    const {checksum: _, ...rawFile} = file;
    if (semverCompare(file.version, '1.5.0') === 1 && simpleHash(JSON.stringify(rawFile)) !== file.checksum) {
        if (showErrors) {
            store.commit('system/addNotification', {color: APP_TESTING ? 'warning' : 'error', timeout: -1, message: {
                type: 'import',
                error: 'checksum'
            }});
        }
        if (!APP_TESTING) {
            return null;
        }
    }

    return file;
}

function loadFile(file) {
    // Try to run migrations
    let save = null;
    try {
        save = migrate(file);
    } catch {
        store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
            type: 'import',
            error: 'migration',
            version: file.version
        }});
        return null;
    }
    if (!save) {
        return;
    }

    ['timestamp', 'currentDay', 'lastPlayedDays', 'theme', 'backupTimer', 'playerId', 'noteHint', 'cheaterSelfMark', 'cheatDetected'].forEach(elem => {
        if (save[elem]) {
            store.commit('system/updateKey', {key: elem, value: save[elem]});
        }
    });

    if (save.playerName) {
        store.commit('system/updateKey', {key: 'playerName', value: decodeURIComponent(save.playerName)})
    }

    // Generic systems
    if (save.themesOwned) {
        save.themesOwned.forEach(elem => {
            if (store.state.system.themes[elem]) {
                store.commit('system/updateThemeKey', {name: elem, key: 'owned', value: true});
            }
        });
    }
    if (save.completedTutorial) {
        save.completedTutorial.forEach(elem => {
            if (store.state.system.tutorial[elem]) {
                store.commit('system/updateTutorialKey', {name: elem, key: 'completed', value: true});
            }
        });
    }
    if (save.subfeature) {
        for (const [key, elem] of Object.entries(save.subfeature)) {
            store.commit('system/updateSubfeature', {key, value: elem});
        }
    }
    if (save.nextSubfeature) {
        for (const [key, elem] of Object.entries(save.nextSubfeature)) {
            store.commit('system/updateNextSubfeature', {key, value: elem});
        }
    }
    if (save.note) {
        save.note.forEach(name => {
            Vue.set(store.state.note[name], 'found', true);
        });
    }
    if (save.unlock) {
        for (const [key, elem] of Object.entries(save.unlock)) {
            if (store.state.unlock[key] !== undefined) {
                Vue.set(store.state.unlock[key], 'see', true);
                Vue.set(store.state.unlock[key], 'use', !!elem);
            }

            // Detect unobtainable unlocks
            const illegalUnlocks = {
                debugFeature: 'meta',
                relicMuseum: 'relic',
                treasureSpecialEffect: 'treasure',
                treasureDual: 'treasure',
                cardShiny: 'card',
                generalOrladeeSubfeature: 'general',
                generalOppenschroeSubfeature: 'general',
                generalBelluxSubfeature: 'general',
                generalOnocluaSubfeature: 'general',
                generalOmnisolixSubfeature: 'general',
                hordeChessItems: 'horde',
                hordeClassAssassin: 'horde',
                hordeClassShaman: 'horde',
                hordeClassUndead: 'horde',
                hordeClassCultist: 'horde',
                hordeClassScholar: 'horde',
            };
            if (Object.keys(illegalUnlocks).includes(key)) {
                store.commit('system/registerCheat', {
                    feature: illegalUnlocks[key] ?? 'meta',
                    name: 'illegalunlock:' + key,
                    severity: 200
                });
            }
        }
    }
    if (save.currency) {
        for (const [key, elem] of Object.entries(save.currency)) {
            if (store.state.currency[key] !== undefined) {
                Vue.set(store.state.currency[key], 'value', elem);
            }
        }
    }
    if (save.stat) {
        for (const [key, elem] of Object.entries(save.stat)) {
            if (store.state.stat[key] !== undefined) {
                Vue.set(store.state.stat[key], 'value', elem[0]);
                Vue.set(store.state.stat[key], 'total', elem[1]);
            }
        }
    }
    if (save.upgrade) {
        for (const [key, elem] of Object.entries(save.upgrade)) {
            if (store.state.upgrade.item[key] !== undefined) {
                Vue.set(store.state.upgrade.item[key], 'collapse', elem[0]);
                Vue.set(store.state.upgrade.item[key], 'highestLevel', elem[2]);

                if (store.state.upgrade.item[key].mode === 'instant') {
                    Vue.set(store.state.upgrade.item[key], 'bought', elem[1]);
                } else if (elem.length >= 4) {
                    Vue.set(store.state.upgrade.item[key], 'bought', elem[3]);
                    Vue.set(store.state.upgrade.item[key], 'timeProgress', elem[4]);
                }

                if (elem[1] > 0) {
                    Vue.set(store.state.upgrade.item[key], 'level', elem[1]);
                    store.dispatch('upgrade/apply', {name: key});
                }

                // Award "lost" notes
                if (elem[2] > 0 && store.state.upgrade.item[key].note !== null) {
                    store.dispatch('note/find', store.state.upgrade.item[key].note);
                }
            }
        }
    }
    if (save.upgradeQueue) {
        for (const [key, elem] of Object.entries(save.upgradeQueue)) {
            if (store.state.upgrade.queue[key] !== undefined) {
                Vue.set(store.state.upgrade.queue, key, [...elem]);
            }
        }
    }
    if (save.relic) {
        save.relic.forEach(elem => {
            if (store.state.relic.item[elem]) {
                Vue.set(store.state.relic.item[elem], 'found', true);
                store.dispatch('relic/apply', {name: elem});
            }
        });
    }
    if (save.globalLevel) {
        for (const [key, elem] of Object.entries(save.globalLevel)) {
            if (store.state.meta.globalLevelList.includes(key)) {
                Vue.set(store.state.meta.globalLevelParts, key, elem);
            }
        }
        store.commit('meta/updateGlobalLevel');

        // Global level unlocks
        for (const [key, elem] of Object.entries(store.state.meta.globalLevelUnlocks)) {
            if (store.state.meta.globalLevel >= elem && !store.state.unlock[key].use) {
                store.commit('unlock/unlock', key);
            }
        }
    }
    if (save.settings) {
        for (const [key, elem] of Object.entries(save.settings)) {
            for (const [subkey, subelem] of Object.entries(elem)) {
                if (store.state.system.settings[key] !== undefined && store.state.system.settings[key].items[subkey] !== undefined) {
                    Vue.set(store.state.system.settings[key].items[subkey], 'value', subelem);
                }
            }
        }
    }
    if (save.keybinds) {
        for (const [key, elem] of Object.entries(save.keybinds)) {
            store.commit('system/updateKeybind', {name: key, value: {
                ctrl: elem.ctrl,
                alt: elem.alt,
                shift: elem.shift,
                code: elem.code
            }});
        }
    }
    if (save.consumable) {
        for (const [key, elem] of Object.entries(save.consumable)) {
            if (store.state.consumable[key] !== undefined) {
                if (!store.state.consumable[key].found) {
                    store.commit('consumable/updateKey', {name: key, key: 'found', value: true});
                }
                store.commit('consumable/updateKey', {name: key, key: 'amount', value: elem});
            }
        }
    }
    if (save.rng) {
        for (const [key, elem] of Object.entries(save.rng)) {
            Vue.set(store.state.system.rng, key, elem);
        }
    }
    if (save.cachePage) {
        for (const [key, elem] of Object.entries(save.cachePage)) {
            store.commit('system/updateCachePageKey', {key, value: elem});
        }
    }

    // Load feature specific things
    modules.forEach(module => {
        if (module && save[module.name] !== undefined) {
            module.loadGame(save[module.name]);
        }
    });

    // Add autoplay data if it was used
    if (save.autoplayData) {
        store.commit('system/updateKey', {key: 'autoplayData', value: save.autoplayData});
    }
    if (save.autoplayChoice) {
        store.commit('system/updateKey', {key: 'autoplayChoice', value: save.autoplayChoice});
    }

    if (save.timeMult) {
        store.commit('system/updateKey', {key: 'timeMult', value: save.timeMult});
    }

    // Update currency mults
    if (save.currency) {
        for (const [key, elem] of Object.entries(save.currency)) {
            if (store.state.currency[key] !== undefined) {
                store.dispatch('currency/updateCurrencyMult', key);

                // Detect some cheats
                if (save.stat[key] && elem > (save.stat[key][1] * 1.5)) {
                    store.commit('system/registerCheat', {
                        feature: store.state.currency[key].feature,
                        name: 'currencyoverstat:' + key.replace('_', '').toLowerCase(),
                        severity: 200
                    });
                }
            }
        }
    }

    return save;
}

function exportFile(file) {
    if (!file) {
        file = getSavefile();
    }
    download(file, getSavefileName(), 'text/plain');
}

function getSavefileName() {
    const now = getDay();
    let year = now.slice(2, 4);
    let month = now.slice(5, 7);
    let day = now.slice(8, 10);
    return `Gooboo_${ year }${ month }${ day }.txt`;
}

function getSavefile() {
    let save = {
        version: store.state.system.version,
        timestamp: store.state.system.timestamp,
        currentDay: store.state.system.currentDay,
        lastPlayedDays: store.state.system.lastPlayedDays,
        theme: store.state.system.theme,
        backupTimer: store.state.system.backupTimer,
        playerId: store.state.system.playerId,
        themesOwned: [],
        completedTutorial: [],
        cheaterSelfMark: store.state.system.cheaterSelfMark,
        cheatDetected: store.state.system.cheatDetected,

        // Generic systems
        subfeature: {},
        nextSubfeature: {},
        unlock: {},
        currency: {},
        stat: {},
        upgrade: {},
        upgradeQueue: {},
        relic: [],
        globalLevel: {},
        settings: {},
        keybinds: {},
        note: [],
        consumable: {},
        rng: {},
        cachePage: {}
    };

    if (store.state.system.playerName !== null) {
        save.playerName = encodeURIComponent(store.state.system.playerName);
    }

    if (APP_TESTING) {
        save.testing = true;
    }

    // Generic systems
    for (const [key, elem] of Object.entries(store.state.system.themes)) {
        if (elem.owned) {
            save.themesOwned.push(key);
        }
    }
    for (const [key, elem] of Object.entries(store.state.system.tutorial)) {
        if (elem.completed) {
            save.completedTutorial.push(key);
        }
    }
    for (const [key, elem] of Object.entries(store.state.system.features)) {
        if (elem.currentSubfeature > 0) {
            save.subfeature[key] = elem.currentSubfeature;
        }
        if (elem.nextSubfeature > 0) {
            save.nextSubfeature[key] = elem.nextSubfeature;
        }
    }
    for (const [key, elem] of Object.entries(store.state.unlock)) {
        if (elem.see) {
            save.unlock[key] = elem.use;
        }
    }
    for (const [key, elem] of Object.entries(store.state.currency)) {
        if (elem.value !== 0) {
            save.currency[key] = elem.value;
        }
    }
    for (const [key, elem] of Object.entries(store.state.stat)) {
        if (elem.value > elem.default || elem.total > elem.default) {
            save.stat[key] = [elem.value, elem.total];
        }
    }
    for (const [key, elem] of Object.entries(store.state.upgrade.item)) {
        if (elem.bought > 0 || elem.highestLevel > 0 || elem.collapse) {
            save.upgrade[key] = elem.mode === 'instant' ?
                [elem.collapse, elem.level, elem.highestLevel] :
                [elem.collapse, elem.level, elem.highestLevel, elem.bought, elem.timeProgress];
        }
    }
    for (const [key, elem] of Object.entries(store.state.upgrade.queue)) {
        if (elem.length > 0) {
            save.upgradeQueue[key] = [...elem];
        }
    }
    for (const [key, elem] of Object.entries(store.state.relic.item)) {
        if (elem.found) {
            save.relic.push(key);
        }
    }
    for (const [key, elem] of Object.entries(store.getters['meta/globalLevelParts'])) {
        save.globalLevel[key] = elem;
    }
    for (const [key, elem] of Object.entries(store.state.system.settings)) {
        if (elem.unlock === null || store.state.unlock[elem.unlock].see) {
            save.settings[key] = {};
            for (const [subkey, subelem] of Object.entries(elem.items)) {
                if (subelem.unlock === null || store.state.unlock[subelem.unlock].see) {
                    save.settings[key][subkey] = subelem.value;
                }
            }
        }
    }
    for (const [key, elem] of Object.entries(store.state.system.keybinds)) {
        if (elem !== null) {
            save.keybinds[key] = {
                ctrl: elem.ctrl,
                alt: elem.alt,
                shift: elem.shift,
                code: elem.code
            };
        }
    }
    save.note = store.getters['note/list']();
    if (store.state.system.noteHint.length > 0) {
        save.noteHint = store.state.system.noteHint;
    }
    for (const [key, elem] of Object.entries(store.state.consumable)) {
        if (elem.amount > 0 || (!elem.foundDefault && elem.found)) {
            save.consumable[key] = elem.amount;
        }
    }
    for (const [key, elem] of Object.entries(store.state.system.rng)) {
        if (elem > 0) {
            save.rng[key] = elem;
        }
    }
    for (const [key, elem] of Object.entries(store.state.system.cachePage)) {
        if (elem > 1) {
            save.cachePage[key] = elem;
        }
    }

    // Save feature specific things
    modules.forEach(module => {
        if (module && (module.unlockNeeded === null || store.state.unlock[module.unlockNeeded].see)) {
            save[module.name] = module.saveGame();
        }
    });

    // Add autoplay data to savefile if it was used
    if (store.state.system.autoplayData.length > 0) {
        save.autoplayData = store.state.system.autoplayData;
    }
    if (Object.keys(store.state.system.autoplayChoice).length > 0) {
        save.autoplayChoice = store.state.system.autoplayChoice;
    }

    if (store.state.system.timeMult > 1) {
        save.timeMult = store.state.system.timeMult;
    }

    save.checksum = simpleHash(JSON.stringify(save));

    return encodeFile(save);
}
