import store from "../../store"
import { GEM_SPEED_BASE, GEM_SPEED_DIAMOND_BASE, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { getDay } from "../utils/date";
import forge from "./gem/forge";
import relic from "./gem/relic";

export default {
    name: 'gem',
    tickspeed: 1,
    unlockNeeded: 'gemFeature',
    tick(seconds, oldTime, newTime) {
        const genSpeedPrimary = store.getters['gem/genSpeedPrimary'] / GEM_SPEED_BASE;
        let progressPrimary = store.state.gem.progressPrimary + seconds * genSpeedPrimary;
        if (progressPrimary >= 1) {
            const gems = Math.floor(progressPrimary);
            ['ruby', 'emerald'].forEach(elem => {
                store.dispatch('currency/gain', {feature: 'gem', name: elem, amount: (elem === 'ruby' ? store.getters['mult/get']('currencyGemRubyGain') : 1) * gems});
            });
            progressPrimary -= gems;
        }
        store.commit('gem/updateKey', {key: 'progressPrimary', value: progressPrimary});

        let progressSecondary = store.state.gem.progressSecondary;
        const genSpeedSecondary = store.getters['gem/genSpeedSecondary'] / GEM_SPEED_BASE;

        if (store.state.unlock.eventFeature.use) {
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

                progressSecondary += timeDiff * genSpeedSecondary * store.state.system.timeMult;

                if (progressSecondary >= 1) {
                    if (lastEventTime !== null && currentTime > lastEventTime) {
                        eventProgress += Math.floor(progressSecondary) - totalProgress;
                    } else {
                        const currentEvent = store.getters['event/eventOnDay'](getDay(new Date(isSimulation ? Date.now() : (currentTime * 1000))));
                        if (currentEvent === null || !store.getters['event/eventIsBig'](currentEvent)) {
                            topazProgress += Math.floor(progressSecondary) - totalProgress;
                        }
                    }
                }

                currentTime = nextDay;
                nextDay += SECONDS_PER_DAY;
                totalProgress = Math.floor(progressSecondary);
            }

            if (eventProgress > 0) {
                store.dispatch('currency/gain', {feature: 'event', name: store.state.event.big[lastEvent].currency, amount: eventProgress});
                store.dispatch('note/find', 'event_2');
            }
            if (topazProgress > 0) {
                store.dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount: topazProgress});
            }
        } else {
            progressSecondary += seconds * genSpeedSecondary;
        }

        if (progressSecondary >= 1) {
            const gems = Math.floor(progressSecondary);
            ['sapphire', 'amethyst'].forEach(elem => {
                store.dispatch('currency/gain', {feature: 'gem', name: elem, amount: (elem === 'ruby' ? store.getters['mult/get']('currencyGemRubyGain') : 1) * gems});
            });
            progressSecondary -= gems;
        }

        store.commit('gem/updateKey', {key: 'progressSecondary', value: progressSecondary});

        if (store.state.unlock.gemDiamond.use) {
            const diamondSpeed = 1 / GEM_SPEED_DIAMOND_BASE;
            let progressDiamond = store.state.gem.progressDiamond + seconds * diamondSpeed;

            if (progressDiamond >= 1) {
                const gems = Math.floor(progressDiamond);
                store.dispatch('currency/gain', {feature: 'gem', name: 'diamond', amount: gems});
                progressDiamond -= gems;
            }

            store.commit('gem/updateKey', {key: 'progressDiamond', value: progressDiamond});
        }
    },
    unlock: ['gemFeature', 'gemDiamond'],
    currency: {
        // Permanent upgrades
        ruby: {color: 'red', icon: 'mdi-rhombus', display: 'int', gainMult: {round: true, baseValue: 1}, gainTimerFunction() {
            return store.getters['gem/genSpeedPrimary'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Replacable items (semi-permanent)
        emerald: {color: 'green', icon: 'mdi-hexagon', display: 'int', gainTimerFunction() {
            return store.getters['gem/genSpeedPrimary'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Instant or temporary boosts
        sapphire: {color: 'indigo', icon: 'mdi-pentagon', display: 'int', gainTimerFunction() {
            return store.getters['gem/genSpeedSecondary'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Cosmetic items
        amethyst: {color: 'purple', icon: 'mdi-cards-diamond', display: 'int', gainTimerFunction() {
            return store.getters['gem/genSpeedSecondary'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Event currency
        topaz: {color: 'amber', icon: 'mdi-triangle', display: 'int', overcapMult: 0, capMult: {round: true, baseValue: 1000}, overcapFunction(amount) {
            if (store.state.event.bank_loan > 0) {
                store.commit('event/updateKey', {key: 'bank_loan', value: Math.max(0, store.state.event.bank_loan - amount)}, {root: true});
            }
        }, gainTimerFunction() {
            return store.getters['gem/genSpeedSecondary'] / GEM_SPEED_BASE;
        }, timerIsEstimate: true, hideGainTag: true},

        // Rare currency
        diamond: {color: 'cyan', icon: 'mdi-diamond', display: 'int'},

        // Extremely rare currency
        onyx: {color: 'deep-purple', icon: 'mdi-octagon', display: 'int'}
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
    relic,
    consumable: {
        prestigeStone: {
            icon: 'mdi-circle-double',
            color: 'deep-purple'
        }
    },
    init() {
        for (const [key, elem] of Object.entries(forge)) {
            store.commit('gem/initForge', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {
            progressPrimary: store.state.gem.progressPrimary,
            progressSecondary: store.state.gem.progressSecondary,
        };
        if (store.state.gem.progressDiamond > 0) {
            obj.progressDiamond = store.state.gem.progressDiamond;
        }
        return obj;
    },
    loadGame(data) {
        ['progressPrimary', 'progressSecondary', 'progressDiamond'].forEach(elem => {
            if (data[elem] !== undefined) {
                store.commit('gem/updateKey', {key: elem, value: data[elem]});
            }
        });
    }
}
