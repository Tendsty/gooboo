import store from "../../store"
import { GEM_SPEED_BASE, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { getDay } from "../utils/date";

export default {
    name: 'gem',
    tickspeed: 1,
    unlockNeeded: 'gemFeature',
    tick(seconds, oldTime, newTime) {
        let progress = store.state.gem.progress;
        const genSpeed = store.getters['gem/genSpeed'] / GEM_SPEED_BASE;

        if (store.state.unlock.eventFeature.see) {
            let currentTime = oldTime;
            let nextDay = Math.floor((new Date(oldTime * 1000)).setHours(0, 0, 0, 0) / 1000) + SECONDS_PER_DAY;

            let topazProgress = 0;
            let eventProgress = 0;
            let totalProgress = 0;

            const isSimulation = oldTime === 0 || store.state.event.force_event !== null;

            const lastEvent = store.getters['event/eventOnDay'](getDay(new Date(isSimulation ? Date.now() : (newTime * 1000))));
            let lastEventTime = null;
            if (lastEvent !== null && store.getters['event/eventIsBig'](lastEvent)) {
                const year = (new Date(newTime * 1000)).getFullYear();
                const start = store.state.event.big[lastEvent].start;
                lastEventTime = isSimulation ? -1 : Math.floor((new Date(`${year}-${start}T00:00:00`)).getTime() / 1000);
            }

            while (currentTime < newTime) {
                let timeDiff = Math.min(nextDay, newTime) - currentTime;

                progress += timeDiff * genSpeed * store.state.system.timeMult;

                if (progress >= 1) {
                    if (lastEventTime !== null && currentTime > lastEventTime) {
                        eventProgress += Math.floor(progress) - totalProgress;
                    } else {
                        const currentEvent = store.getters['event/eventOnDay'](getDay(new Date(isSimulation ? Date.now() : (currentTime * 1000))));
                        if (currentEvent === null || !store.getters['event/eventIsBig'](currentEvent)) {
                            topazProgress += Math.floor(progress) - totalProgress;
                        }
                    }
                }

                currentTime = nextDay;
                nextDay += SECONDS_PER_DAY;
                totalProgress = Math.floor(progress);
            }

            if (eventProgress > 0) {
                store.dispatch('currency/gain', {feature: 'event', name: store.state.event.big[lastEvent].currency, amount: eventProgress});
                store.dispatch('note/find', 'event_2');
            }
            if (topazProgress > 0) {
                store.dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount: topazProgress});
            }
        } else {
            progress += seconds * genSpeed;
        }

        if (progress >= 1) {
            const gems = Math.floor(progress);
            ['ruby', 'emerald', 'sapphire', 'amethyst'].forEach(elem => {
                store.dispatch('currency/gain', {feature: 'gem', name: elem, amount: gems});
            });
            progress -= gems;
        }

        store.commit('gem/updateKey', {key: 'progress', value: progress});
    },
    unlock: ['gemFeature'],
    currency: {
        // Permanent upgrades
        ruby: {color: 'red', icon: 'mdi-rhombus', gainTimerFunction() {
            return store.getters['gem/genSpeed'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Replacable items (semi-permanent)
        emerald: {color: 'green', icon: 'mdi-hexagon', gainTimerFunction() {
            return store.getters['gem/genSpeed'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Instant or temporary boosts
        sapphire: {color: 'indigo', icon: 'mdi-pentagon', gainTimerFunction() {
            return store.getters['gem/genSpeed'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Cosmetic items
        amethyst: {color: 'purple', icon: 'mdi-cards-diamond', gainTimerFunction() {
            return store.getters['gem/genSpeed'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Event currency
        topaz: {color: 'amber', icon: 'mdi-triangle', overcapMult: 0, capMult: {round: true, baseValue: 1000}, gainTimerFunction() {
            return store.getters['gem/genSpeed'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Rare currency
        diamond: {color: 'cyan', icon: 'mdi-diamond'},

        // Extremely rare currency
        onyx: {color: 'deep-purple', icon: 'mdi-octagon'}
    },
    upgrade: {
        topazBag: {type: 'premium', requirement() {
            return store.state.unlock.eventFeature.see;
        }, price(lvl) {
            return {gem_ruby: [2, 3][lvl % 2] * Math.pow(2, Math.floor(lvl / 2)) * 100};
        }, effect: [
            {name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 200}
        ]}
    },
    note: buildArray(2).map(() => 'g'),
    consumable: {
        prestigeStone: {
            icon: 'mdi-circle-double',
            color: 'deep-purple',
            price: {gem_sapphire: 400}
        }
    },
    saveGame() {
        return {
            progress: store.state.gem.progress
        };
    },
    loadGame(data) {
        if (data.progress !== undefined) {
            store.commit('gem/updateKey', {key: 'progress', value: data.progress});
        }
    }
}
