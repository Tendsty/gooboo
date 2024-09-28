import meta from "./modules/meta";
import mining from "./modules/mining";
import village from "./modules/village";
import horde from "./modules/horde";
import farm from "./modules/farm";
import gallery from "./modules/gallery";
import gem from "./modules/gem";
import school from "./modules/school";
import cryolab from "./modules/cryolab";
import achievement from "./modules/achievement";
import store from "../store";
import { saveLocal } from "./savefile";
import general from "./modules/general";
import event from "./modules/event";
import { getDay } from "./utils/date";

export { advance, tick }

function advance() {
    const timestamp = Math.floor(Date.now() / 1000);
    const paused = store.state.system.settings.general.items.pause.value;

    if (store.state.system.timestamp !== null) {
        const timeDiff = timestamp - store.state.system.timestamp;

        // Update system day cache and calculate event changes
        const oldDay = store.state.system.currentDay;
        const newDay = getDay(new Date(timestamp * 1000));
        if (newDay !== oldDay) {
            store.commit('system/updateKey', {key: 'currentDay', value: newDay});
            store.commit('system/updateKey', {key: 'lastPlayedDays', value: [...store.state.system.lastPlayedDays, newDay].slice(-7)});
        }

        if (timeDiff > 0) {
            if (!paused) {
                store.commit('stat/increaseTo', {feature: 'meta', name: 'longestOfflineTime', value: timeDiff});
                tick(timestamp, store.state.system.timestamp);
            }

            // autosave stuff
            if (store.state.system.settings.general.items.autosaveTimer.value !== null && store.state.system.autosaveTimer !== null && !['offlineSummary', 'tab-duplicate'].includes(store.state.system.screen)) {
                let newTimer = store.state.system.autosaveTimer - timeDiff;
                if (newTimer > 0) {
                    store.commit('system/updateKey', {key: 'autosaveTimer', value: newTimer});
                } else {
                    store.commit('system/resetAutosaveTimer');
                    let saveError = null;
                    try {
                        saveLocal();
                    } catch (error) {
                        saveError = error;
                    }
                    if (saveError === null) {
                        if (store.state.system.settings.notification.items.autosave.value && store.state.system.notification.findIndex(elem => elem.message.type === 'save') === -1) {
                            store.commit('system/addNotification', {color: 'info', timeout: 2000, message: {
                                type: 'save',
                                name: 'auto'
                            }});
                        }
                    } else {
                        store.commit('system/addNotification', {color: 'error', timeout: 5000, message: {
                            type: 'save',
                            name: 'auto',
                            error: saveError
                        }});
                    }
                }
            }
            if (!paused && store.state.system.settings.notification.items.backupHint.value > 0) {
                store.commit('system/updateKey', {key: 'backupTimer', value: store.state.system.backupTimer + (timeDiff > 1800 ? ((timeDiff - 1800) * 0.05 + 1800) : timeDiff)});
            }
        }
    }

    store.commit('system/updateKey', {key: 'timestamp', value: timestamp});

    requestAnimationFrame(advance);
}

function tick(newTime, oldTime) {
    [meta, mining, village, horde, farm, gallery, gem, school, event, achievement, general, cryolab].forEach(module => {
        const isFrozen = !!store.state.cryolab[module.name] && store.state.cryolab[module.name].active;
        if ((module.unlockNeeded === null || store.state.unlock[module.unlockNeeded].use)) {
            const diff = Math.floor(newTime * store.state.system.timeMult / module.tickspeed) - Math.floor(oldTime * store.state.system.timeMult / module.tickspeed);
            if (diff > 0) {
                if (!isFrozen) {
                    module.tick(diff, oldTime, newTime);
                }
                if (module.forceTick !== undefined) {
                    module.forceTick(diff, oldTime, newTime);
                }
            }
        }
    });
}
