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

const migrations = {
    '1.3.0': v1_3_0,
    '1.1.2': v1_1_2,
    '1.1.0': v1_1_0
};

export { checkLocal, saveLocal, loadFile, exportFile, cleanStore, getSavefile, getSavefileName }

/**
 * An array of modules that save and load data to the savefile
 */
const modules = [event, mining, village, horde, farm, gallery, gem, achievement, school, card, general, treasure, cryolab];

function checkLocal() {
    return localStorage.getItem('goobooSavefile');
}

function saveLocal() {
    localStorage.setItem('goobooSavefile', getSavefile());
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
    const semverCompare = require('semver/functions/compare');
    for (const [version, migration] of Object.entries(migrations)) {
        if (semverCompare(file.version, version) === -1) {
            file = migration(file);
        }
    }
    return file;
}

function loadFile(file) {
    const save = migrate(JSON.parse(file));

    ['timestamp', 'currentDay', 'theme', 'backupTimer', 'noteHint'].forEach(elem => {
        if (save[elem]) {
            store.commit('system/updateKey', {key: elem, value: save[elem]});
        }
    });

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
    if (save.unlock) {
        for (const [key, elem] of Object.entries(save.unlock)) {
            if (store.state.unlock[key] !== undefined) {
                Vue.set(store.state.unlock[key], 'see', !!elem.see);
                Vue.set(store.state.unlock[key], 'use', !!elem.use);
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
                Vue.set(store.state.stat[key], 'value', elem.value);
                Vue.set(store.state.stat[key], 'total', elem.total);
            }
        }
    }
    if (save.upgrade) {
        for (const [key, elem] of Object.entries(save.upgrade)) {
            if (store.state.upgrade.item[key] !== undefined) {
                Vue.set(store.state.upgrade.item[key], 'collapse', elem.collapse);
                Vue.set(store.state.upgrade.item[key], 'highestLevel', elem.highestLevel);

                if (store.state.upgrade.item[key].mode === 'instant') {
                    Vue.set(store.state.upgrade.item[key], 'bought', elem.level);
                } else {
                    Vue.set(store.state.upgrade.item[key], 'bought', elem.bought);
                    Vue.set(store.state.upgrade.item[key], 'timeProgress', elem.timeProgress);
                }

                if (elem.level > 0) {
                    Vue.set(store.state.upgrade.item[key], 'level', elem.level);
                    store.dispatch('upgrade/apply', {name: key});
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
            if (store.state.relic[elem]) {
                Vue.set(store.state.relic[elem], 'found', true);
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
    if (save.note) {
        save.note.forEach(name => {
            Vue.set(store.state.note[name], 'found', true);
        });
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
            if (store.state.system.rng[key] !== undefined) {
                Vue.set(store.state.system.rng[key], 'next', elem);
                store.commit('system/fillRng', key);
            }
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
        for (const [key] of Object.entries(save.currency)) {
            if (store.state.currency[key] !== undefined) {
                store.dispatch('currency/updateCurrencyMult', key);
            }
        }
    }

    return save;
}

function exportFile(file) {
    if (!file) {
        file = getSavefile();
    }
    download(file, getSavefileName(), 'application/json');
}

function getSavefileName() {
    const now = getDay();
    let year = now.slice(2, 4);
    let month = now.slice(5, 7);
    let day = now.slice(8, 10);
    return `Gooboo_${ year }${ month }${ day }.json`;
}

function getSavefile() {
    let save = {
        version: store.state.system.version,
        timestamp: store.state.system.timestamp,
        currentDay: store.state.system.currentDay,
        theme: store.state.system.theme,
        backupTimer: store.state.system.backupTimer,
        themesOwned: [],
        completedTutorial: [],

        // Generic systems
        subfeature: {},
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
    }
    for (const [key, elem] of Object.entries(store.state.unlock)) {
        if (elem.see || elem.use) {
            save.unlock[key] = {see: !!elem.see, use: !!elem.use};
        }
    }
    for (const [key, elem] of Object.entries(store.state.currency)) {
        if (elem.value > 0) {
            save.currency[key] = elem.value;
        }
    }
    for (const [key, elem] of Object.entries(store.state.stat)) {
        if (elem.value > elem.default || elem.total > elem.default) {
            save.stat[key] = {value: elem.value, total: elem.total};
        }
    }
    for (const [key, elem] of Object.entries(store.state.upgrade.item)) {
        if (elem.bought > 0 || elem.highestLevel > 0 || elem.collapse) {
            save.upgrade[key] = elem.mode === 'instant' ?
                {level: elem.level, highestLevel: elem.highestLevel, collapse: elem.collapse} :
                {bought: elem.bought, level: elem.level, highestLevel: elem.highestLevel, timeProgress: elem.timeProgress, collapse: elem.collapse};
        }
    }
    for (const [key, elem] of Object.entries(store.state.upgrade.queue)) {
        if (elem.length > 0) {
            save.upgradeQueue[key] = [...elem];
        }
    }
    for (const [key, elem] of Object.entries(store.state.relic)) {
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
        save.rng[key] = elem.next;
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

    return JSON.stringify(save);
}
