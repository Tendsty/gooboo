import store from "../../store"
import { buildArray } from "../utils/array";
import { capitalize } from "../utils/format";
import { logBase } from "../utils/math";
import achievement from "./gallery/achievement";
import idea from "./gallery/idea";
import relic from "./gallery/relic";
import upgrade from "./gallery/upgrade";
import upgradePremium from "./gallery/upgradePremium";
import upgradePrestige from "./gallery/upgradePrestige";
import bookGallery from "./school/bookGallery";

export default {
    name: 'gallery',
    tickspeed: 1,
    unlockNeeded: 'galleryFeature',
    tick(seconds) {
        store.commit('stat/add', {feature: 'gallery', name: 'timeSpent', value: seconds});

        const segments = Math.ceil(Math.pow(seconds, 0.5) / 8);
        let secondsSpent = 0;
        for (let i = 0; i < segments; i++) {
            const secondsSegment = Math.round(seconds * (i + 1) / segments) - secondsSpent;
            secondsSpent += secondsSegment;

            const colors = ['beauty', ...store.state.gallery.color].reverse();
            const baseGain = colors.map(color => store.getters['mult/get'](`currencyGallery${ capitalize(color) }Gain`));

            colors.forEach((color, index) => {
                const gain = (baseGain[index] + store.getters['mult/get'](`currencyGallery${ capitalize(color) }Gain`)) / 2;
                if (gain > 0) {
                    store.dispatch('currency/gain', {feature: 'gallery', name: color, amount: secondsSegment * gain});
                }
            });
        }

        const globalLevelGallery = Math.floor(logBase(store.state.stat.gallery_beauty.total, 5));
        if (globalLevelGallery > 0) {
            store.dispatch('meta/globalLevelPart', {key: 'gallery_0', amount: globalLevelGallery});
        }

        if (store.state.unlock.galleryConversion.use) {
            store.dispatch('currency/gain', {feature: 'gallery', name: 'converter', amount: seconds * store.getters['mult/get']('currencyGalleryConverterGain')});
        }
        if (store.state.unlock.galleryDrums.use) {
            store.dispatch('currency/gain', {feature: 'gallery', name: 'package', amount: seconds * store.getters['mult/get']('currencyGalleryPackageGain')});
        }

        if (store.state.unlock.galleryInspiration.use) {
            let newTime = store.state.gallery.inspirationTime + seconds;
            let newAmount = store.state.gallery.inspirationAmount;

            while (newTime >= store.getters['gallery/inspirationTimeNeeded'](newAmount)) {
                newTime -= store.getters['gallery/inspirationTimeNeeded'](newAmount);
                newAmount++;
            }

            store.commit('gallery/updateKey', {key: 'inspirationTime', value: newTime});
            if (newAmount > store.state.gallery.inspirationAmount) {
                store.dispatch('currency/gain', {feature: 'gallery', name: 'inspiration', amount: newAmount - store.state.gallery.inspirationAmount});
                store.commit('gallery/updateKey', {key: 'inspirationAmount', value: newAmount});
            }
        }
    },
    unlock: ['galleryFeature', 'galleryConversion', 'galleryInspiration', 'galleryAuction', 'galleryDrums'],
    stat: {
        timeSpent: {display: 'time'},
        bestPrestige: {},
        highestTierIdea: {},
        prestigeCount: {}
    },
    mult: {
        galleryInspirationBase: {baseValue: 300, display: 'time'},
        galleryInspirationIncrement: {baseValue: 1, min: 0, display: 'percent'},
        galleryInspirationStart: {}
    },
    currency: {
        beauty: {color: 'deep-purple', icon: 'mdi-image-filter-vintage', gainMult: {baseValue: 1, display: 'perSecond'}, showGainMult: true},
        converter: {color: 'pale-green', icon: 'mdi-recycle', gainMult: {baseValue: 1, display: 'perSecond'}, showGainMult: true, capMult: {baseValue: 1000}},
        inspiration: {color: 'yellow', icon: 'mdi-lightbulb-on'},
        package: {color: 'beige', icon: 'mdi-package-variant', overcapMult: 0.8, overcapScaling: 0.8, gainMult: {baseValue: 0.025, display: 'perSecond'}, showGainMult: true, capMult: {baseValue: 5}},
        cash: {type: 'prestige', alwaysVisible: true, color: 'green', icon: 'mdi-cash', gainMult: {}}
    },
    note: buildArray(10).map(() => 'g'),
    upgrade: {
        ...upgrade,
        ...upgradePrestige,
        ...upgradePremium,
        ...bookGallery
    },
    relic,
    achievement,
    init() {
        // Add each color as a mult and currency
        store.state.gallery.color.forEach((elem, index) => {
            const colorMult = ['beauty', ...store.state.gallery.color][index];

            store.dispatch('currency/init', {feature: 'gallery', multUnlock: 'galleryFeature', name: elem, color: elem, icon: 'mdi-liquid-spot', currencyMult: {
                [`currencyGallery${ capitalize(colorMult) }Gain`]: {type: 'base', value: val => val > 100 ? Math.pow(val * 100, 0.5) : val}
            }, gainMult: {display: 'perSecond'}, showGainMult: true});
            store.dispatch('currency/init', {feature: 'gallery', multUnlock: 'galleryDrums', name: elem + 'Drum', color: elem, icon: 'mdi-barrel', currencyMult: elem === 'red' ? {
                currencyGalleryBeautyGain: {type: 'mult', value: val => Math.pow(val * 0.1 + 1, 2)}
            } : {
                currencyGalleryBeautyGain: {type: 'mult', value: val => val * 0.1 + 1},
                [`currencyGallery${ capitalize(colorMult) }Gain`]: {type: 'mult', value: val => val * 0.1 + 1},
                [`currencyGallery${ capitalize(colorMult) }DrumCap`]: {type: 'bonus', value: val => val}
            }, overcapMult: 0, capMult: {baseValue: 10, round: true}});

            store.commit('mult/init', {name: `gallery${ capitalize(elem) }Conversion`, unlock: 'galleryFeature', baseValue: 1}, {root: true});
            store.commit('mult/init', {name: `gallery${ capitalize(elem) }DrumChance`, unlock: 'galleryDrums', display: 'percent'}, {root: true});
        });

        store.commit('mult/init', {name: 'galleryColorGain', unlock: 'galleryFeature', group: store.state.gallery.color.map(elem => `currencyGallery${ capitalize(elem) }Gain`)}, {root: true});
        store.commit('mult/init', {name: 'galleryColorDrumChance', unlock: 'galleryDrums', group: store.state.gallery.color.map(elem => `gallery${ capitalize(elem) }DrumChance`)}, {root: true});
        store.commit('mult/init', {name: 'galleryColorDrumCap', unlock: 'galleryDrums', group: store.state.gallery.color.map(elem => `currencyGallery${ capitalize(elem) }DrumCap`)}, {root: true});

        for (const [key, elem] of Object.entries(idea)) {
            store.commit('gallery/initIdea', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {};

        if (store.state.gallery.inspirationTime > 0) {
            obj.inspirationTime = store.state.gallery.inspirationTime;
        }
        if (store.state.gallery.inspirationAmount > 0) {
            obj.inspirationAmount = store.state.gallery.inspirationAmount;
        }
        if (store.state.unlock.galleryInspiration.use) {
            let ideas = {};
            for (const [key, elem] of Object.entries(store.state.gallery.idea)) {
                if (elem.owned) {
                    ideas[key] = elem.level;
                }
            }
            obj.idea = ideas;
        }

        return obj;
    },
    loadGame(data) {
        if (data.inspirationTime) {
            store.commit('gallery/updateKey', {key: 'inspirationTime', value: data.inspirationTime});
        }
        if (data.inspirationAmount) {
            store.commit('gallery/updateKey', {key: 'inspirationAmount', value: data.inspirationAmount});
        }
        if (data.idea !== undefined) {
            for (const [key, elem] of Object.entries(data.idea)) {
                if (store.state.gallery.idea[key] !== undefined) {
                    store.commit('gallery/updateIdeaKey', {name: key, key: 'owned', value: true});
                    if (elem > 0) {
                        store.commit('gallery/updateIdeaKey', {name: key, key: 'level', value: elem});
                        store.dispatch('gallery/applyIdea', {name: key});
                    }
                }
            }
        }
    }
}
