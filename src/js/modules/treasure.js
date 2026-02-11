import store from "../../store";
import { buildArray } from "../utils/array";
import effect from "./treasure/effect";
import modifier from "./treasure/modifier";
import upgradePremium from "./treasure/upgradePremium";

const filterItem = function(item) {
    return {
        tier: item.tier,
        type: item.type,
        level: item.level,
        fragmentsSpent: item.fragmentsSpent,
        effect: item.effect.map(el => store.state.treasure.effect[el] ? el : null),
        modifier: item.modifier ?? [],
        days: item.days ?? 0,
    }
}

const treasureTypes = {
    regular: {
        buyPrice: 1,
        upgradePrice: 10,
        upgradeLimit: 4,
        upgradeScaling: 1.25,
        destroyPrice: 8,
        slots: [
            {type: 'regular', power: 1}
        ],
        maxModifiers: 1
    },
    dual: {
        buyPrice: 1.5,
        upgradePrice: 12,
        upgradeLimit: 4,
        upgradeScaling: 1.25,
        destroyPrice: 12,
        slots: [
            {type: 'regular', power: 0.55},
            {type: 'regular', power: 0.55}
        ],
        icon: 'mdi-call-split',
        maxModifiers: 2
    },
    prestigious: {
        buyPrice: 4,
        upgradePrice: 40,
        upgradeLimit: 4,
        upgradeScaling: 1.25,
        destroyPrice: 32,
        slots: [
            {type: 'prestige', power: 1}
        ],
        icon: 'mdi-star-shooting',
        maxModifiers: 1
    },
};

export default {
    name: 'treasure',
    tickspeed: 86400,
    unlockNeeded: 'treasureFeature',
    tick(days) {
        if (days > 0) {
            if (store.state.treasure.newItem !== null && store.state.treasure.newItem.modifier.includes('expander')) {
                const newDays = store.state.treasure.newItem.days + days;
                store.commit('treasure/updateItemKey', {id: -1, key: 'days', value: newDays});
                store.commit('treasure/updateItemKey', {id: -1, key: 'level', value: store.getters['treasure/levelAtDay'](
                    store.state.treasure.newItem.type,
                    store.state.treasure.newItem.tier,
                    newDays
                )});
                store.dispatch('treasure/updateItemCache', -1);
            }
            store.state.treasure.items.forEach((elem, key) => {
                if (elem !== null && elem.modifier.includes('expander')) {
                    const newDays = elem.days + days;
                    store.commit('treasure/updateItemKey', {id: key, key: 'days', value: newDays});
                    store.commit('treasure/updateItemKey', {id: key, key: 'level', value: store.getters['treasure/levelAtDay'](
                        elem.type,
                        elem.tier,
                        newDays
                    )});
                    store.dispatch('treasure/updateItemCache', key);
                }
            });
            store.dispatch('treasure/updateEffectCache');
        }
    },
    unlock: ['treasureFeature', 'treasureDual', 'treasurePrestigious'],
    mult: {
        treasureSlots: {round: true, baseValue: 10}
    },
    currency: {
        fragment: {color: 'amber', icon: 'mdi-shimmer', gainMult: {}}
    },
    upgrade: upgradePremium,
    note: buildArray(3).map(() => 'g'),
    consumable: modifier,
    init() {
        for (const [key, elem] of Object.entries(effect)) {
            store.commit('treasure/initEffect', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(treasureTypes)) {
            store.commit('treasure/initType', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(modifier)) {
            store.commit('treasure/initModifier', {name: key, ...elem});
        }
    },
    postInit() {
        for (const [key, elem] of Object.entries(effect)) {
            if (elem.unlock) {
                store.commit('unlock/addTrigger', {unlock: elem.unlock, trigger: `treasure_${ elem.feature }_${ key }`});
            }
        }
    },
    saveGame() {
        return {
            items: store.state.treasure.items.map(elem => elem ? filterItem(elem) : null),
            newItem: store.state.treasure.newItem ? filterItem(store.state.treasure.newItem) : null
        };
    },
    loadGame(data) {
        if (data.items) {
            store.commit('treasure/updateKey', {key: 'items', value: data.items.map(elem => elem ? {
                ...filterItem(elem),
                valueCache: elem.effect.map(el => store.state.treasure.effect[el] ? el : null).map((el, i) => store.getters['treasure/effectValue'](
                    el,
                    elem.tier,
                    elem.level,
                    store.state.treasure.type[elem.type].slots[i].power
                ))
            } : null)});
        }
        if (data.newItem) {
            store.commit('treasure/updateKey', {key: 'newItem', value: {
                ...filterItem(data.newItem),
                valueCache: data.newItem.effect.map(el => store.state.treasure.effect[el] ? el : null).map((el, i) => store.getters['treasure/effectValue'](
                    el,
                    data.newItem.tier,
                    data.newItem.level,
                    store.state.treasure.type[data.newItem.type].slots[i].power
                ))
            }});
        }
        store.dispatch('treasure/updateEffectCache');
    }
}
