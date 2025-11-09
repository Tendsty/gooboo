import store from "../../../store";
import { formatInt } from "../../utils/format";

export default {
    energyDrink: {icon: 'mdi-bottle-soda', color: 'yellow', effect() {return [
        {name: 'currencyHordeMonsterPartGain', type: 'base', value: 0.5},
        {name: 'horde_monsterSoup', type: 'keepUpgrade', value: true}
    ];}, glyph() {return {dream: 3, clover: 1};}, active: {
        cost: {relic_power: 3},
        feature: 'horde',
        params() {
            let actives = 0;
            for (const [, elem] of Object.entries(store.state.horde.items)) {
                if (elem.activeType === 'combat' && elem.cooldownLeft > 0) {
                    actives++;
                }
            }
            for (const [key, elem] of Object.entries(store.state.horde.skillActive)) {
                const split = key.split('_');
                let type = null;
                if (split[0] === 'skill') {
                    type = store.state.horde.fighterClass[store.state.horde.selectedClass].skills[split[1]].activeType;
                } else if (split[0] === 'trinket') {
                    type = store.state.horde.trinket[split[1]].activeType;
                }
                if (type === 'combat' && elem > 0) {
                    actives++;
                }
            }
            return [actives];
        },
        description() {
            return [];
        },
        formula(params) {
            return [formatInt(params[0])];
        },
        disabled(params) {
            return store.state.cryolab.horde.active || params[0] <= 0;
        },
        trigger() {
            for (const [key, elem] of Object.entries(store.state.horde.items)) {
                if (elem.activeType === 'combat' && elem.cooldownLeft > 0) {
                    store.commit('horde/updateItemKey', {name: key, key: 'cooldownLeft', value: 0});
                }
            }
            for (const [key, elem] of Object.entries(store.state.horde.skillActive)) {
                const split = key.split('_');
                let type = null;
                if (split[0] === 'skill') {
                    type = store.state.horde.fighterClass[store.state.horde.selectedClass].skills[split[1]].activeType;
                } else if (split[0] === 'trinket') {
                    type = store.state.horde.trinket[split[1]].activeType;
                }
                if (type === 'combat' && elem > 0) {
                    store.commit('horde/updateSubkey', {name: 'skillActive', key, value: 0});
                }
            }
            store.dispatch('horde/resetStats');
        }
    }},
}
