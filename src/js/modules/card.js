import store from "../../store";
import miningCard from "./mining/card";
import villageCard from "./village/card";
import hordeCard from "./horde/card";
import farmCard from "./farm/card";
import galleryCard from "./gallery/card";
import gemCard from "./gem/card";
import eventCard from "./event/card";
import { buildArray } from "../utils/array";

export default {
    name: 'card',
    unlockNeeded: 'cardFeature',
    unlock: ['cardFeature', 'cardShiny'],
    mult: {
        cardShinyChance: {display: 'percent', baseValue: 0.1},
    },
    currency: {
        shinyDust: {color: 'pale-light-blue', icon: 'mdi-shimmer'}
    },
    note: buildArray(2).map(() => 'g'),
    init() {
        for (const [name, feature] of Object.entries({
            mining: miningCard,
            village: villageCard,
            horde: hordeCard,
            farm: farmCard,
            gallery: galleryCard,
            gem: gemCard,
            event: eventCard,
        })) {
            if (feature.feature) {
                store.dispatch('card/initFeature', {name, ...feature.feature});
            }

            for (const [key, elem] of Object.entries(feature.collection)) {
                store.commit('card/initCollection', {name: key, ...elem});
            }

            for (const [key, elem] of Object.entries(feature.pack)) {
                store.commit('card/initPack', {name: key, feature: name, ...elem});
            }

            if (feature.card) {
                feature.card.forEach(elem => {
                    store.commit('card/initCard', {feature: name, ...elem});
                });
            }
        }
    },
    saveGame() {
        let obj = {
            card: {},
            feature: {}
        };

        for (const [key, elem] of Object.entries(store.state.card.card)) {
            if (elem.amount > 0) {
                obj.card[key] = elem.amount;
            }
            if (elem.foundShiny) {
                if (obj.shiny === undefined) {
                    obj.shiny = [];
                }
                obj.shiny.push(key);
            }
        }
        for (const [key, elem] of Object.entries(store.state.card.feature)) {
            if (elem.cardSelected.length > 0 || elem.cardEquipped.length > 0) {
                obj.feature[key] = {cardSelected: elem.cardSelected, cardEquipped: elem.cardEquipped};
            }
        }

        return obj;
    },
    loadGame(data) {
        if (data.card) {
            for (const [key, elem] of Object.entries(data.card)) {
                if (store.state.card.card[key]) {
                    store.commit('card/updateKey', {type: 'card', name: key, key: 'amount', value: elem});
                }
            }
        }
        if (data.feature) {
            for (const [key, elem] of Object.entries(data.feature)) {
                if (store.state.card.feature[key]) {
                    store.commit('card/updateKey', {type: 'feature', name: key, key: 'cardSelected', value: elem.cardSelected});
                    store.commit('card/updateKey', {type: 'feature', name: key, key: 'cardEquipped', value: elem.cardEquipped});
                }
            }
        }
        if (data.shiny) {
            data.shiny.forEach(elem => {
                store.commit('card/updateKey', {type: 'card', name: elem, key: 'foundShiny', value: true});
            });
        }
        store.dispatch('card/calculateCaches');
    }
}
