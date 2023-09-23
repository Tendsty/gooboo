import gem from "./modules/gem";
import achievement from "./modules/achievement";
import mining from "./modules/mining";
import village from "./modules/village";
import horde from "./modules/horde";
import farm from "./modules/farm";
import gallery from "./modules/gallery";
import card from "./modules/card";
import { loadFile } from "./savefile";
import { advance } from "./tick";
import store from "../store";
import relic from "./modules/relic";
import treasure from "./modules/treasure";
import meta from "./modules/meta";
import general from "./modules/general";
import event from "./modules/event";
import { getDay } from "./utils/date";
import school from "./modules/school";
import cryolab from "./modules/cryolab";

export { newGame, loadGame }

const modules = [meta, gem, relic, treasure, achievement, school, cryolab, card, general, mining, village, horde, farm, gallery, event];

function newGame(startTick = true) {
    prepare();

    modules.forEach(module => {
        // Module newgame init functions
        if (module.initNewGame) {
            module.initNewGame();
        }
    });

    store.commit('upgrade/initCache');
    store.dispatch('system/updateCurrentDay');

    if (startTick) {
        advance();
    }
}

function loadGame(file, runPrepare = true) {
    if (runPrepare) {
        prepare();
    }

    const parsedFile = loadFile(file);

    store.commit('system/updateKey', {key: 'currentDay', value: getDay(new Date(store.state.system.timestamp * 1000))});
    advance();

    const offlineTime = store.state.system.timestamp - parsedFile.timestamp;
    store.commit('system/updateKey', {key: 'offlineTime', value: offlineTime});
    if (parsedFile?.settings?.general?.pause || offlineTime < 60) {
        // No summary for very short offline times
        store.commit('system/updateKey', {key: 'screen', value: 'mining'});
    } else {
        store.commit('system/updateKey', {key: 'screen', value: 'offlineSummary'});
        store.commit('system/updateKey', {key: 'oldSavefile', value: parsedFile});
    }

    store.commit('upgrade/initCache');
    store.commit('system/resetAutosaveTimer');
}

function prepare() {
    modules.forEach(module => {
        // Common store inits
        if (module.unlock) {
            module.unlock.forEach(elem => {
                store.commit('unlock/init', elem);
            });
        }
        if (module.stat) {
            for (const [key, elem] of Object.entries(module.stat)) {
                store.commit('stat/init', {feature: module.name, name: key, ...elem});
            }
        }
        if (module.mult) {
            for (const [key, elem] of Object.entries(module.mult)) {
                store.commit('mult/init', {name: key, unlock: module.unlockNeeded ?? null, ...elem});
            }
        }
        if (module.currency) {
            for (const [key, elem] of Object.entries(module.currency)) {
                store.dispatch('currency/init', {feature: module.name, name: key, multUnlock: module.unlockNeeded ?? null, ...elem});
            }
        }
        if (module.upgrade) {
            for (const [key, elem] of Object.entries(module.upgrade)) {
                store.dispatch('upgrade/init', {feature: module.name, name: key, ...elem});
            }
        }
        if (module.relic) {
            for (const [key, elem] of Object.entries(module.relic)) {
                store.commit('relic/init', {feature: [module.name], name: key, ...elem});
            }
        }
        if (module.achievement) {
            for (const [key, elem] of Object.entries(module.achievement)) {
                store.commit('achievement/init', {feature: module.name, name: key, ...elem});
            }
        }
        if (module.note) {
            module.note.forEach((elem, key) => {
                store.commit('note/init', {feature: module.name, id: key, author: elem});
            });
        }
        if (module.consumable) {
            for (const [key, elem] of Object.entries(module.consumable)) {
                store.commit('consumable/init', {feature: module.name, name: key, ...elem});
            }
        }
        if (module.rng) {
            for (const [key, elem] of Object.entries(module.rng)) {
                store.commit('system/initRng', {name: key, ...elem});
            }
        }

        // Module init functions
        if (module.init) {
            module.init();
        }

        if (module.multGroup) {
            module.multGroup.forEach(elem => {
                store.dispatch('mult/addToGroup', {feature: module.name, ...elem});
            });
        }
    });
}
