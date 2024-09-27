import store from "../../store";
import { buildArray } from "../utils/array";
import effect from "./treasure/effect";
import upgradePremium from "./treasure/upgradePremium";

const fallbackEffect = 'miningDamage';

const filterItem = function(item) {
    return {
        tier: item.tier,
        type: item.type,
        level: item.level,
        fragmentsSpent: item.fragmentsSpent,
        icon: item.icon,
        effect: item.effect.map(el => store.state.treasure.effectToFeature[el] ? el : fallbackEffect)
    }
}

const treasureTypes = {
    regular: {
        buyPrice: 30,
        upgradePrice: 10,
        upgradeLimit: 4,
        upgradeScaling: 1.25,
        destroyPrice: 8,
        slots: [
            {type: 'regular', power: 1}
        ]
    },
    dual: {
        buyPrice: 75,
        upgradePrice: 25,
        upgradeLimit: 4,
        upgradeScaling: 1.25,
        destroyPrice: 20,
        slots: [
            {type: 'regular', power: 0.7},
            {type: 'regular', power: 0.7}
        ],
        icon: 'mdi-call-split'
    },
    empowered: {
        destroyPrice: 32,
        slots: [
            {type: 'regular', power: 1}
        ],
        icon: 'mdi-star-circle'
    },
    ancient: {
        destroyPrice: 28,
        slots: [
            {type: 'special', power: 1}
        ],
        icon: 'mdi-eye-circle'
    }
};

let treasureRng = [];
for (const [key] of Object.entries(treasureTypes)) {
    treasureRng.push(`treasure_${key}`);
}

export default {
    name: 'treasure',
    unlockNeeded: 'treasureFeature',
    unlock: ['treasureFeature', 'treasureSpecialEffect', 'treasureDual'],
    mult: {
        treasureSlots: {round: true, baseValue: 10}
    },
    currency: {
        fragment: {color: 'amber', icon: 'mdi-shimmer', gainMult: {}}
    },
    upgrade: upgradePremium,
    rng: treasureRng,
    note: buildArray(3).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries(effect)) {
            store.commit('treasure/initEffect', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(treasureTypes)) {
            store.commit('treasure/initType', {name: key, ...elem});
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
                valueCache: elem.effect.map(el => store.state.treasure.effectToFeature[el] ? el : fallbackEffect).map((el, i) => store.getters['treasure/effectValue'](
                    store.state.treasure.effect[store.state.treasure.effectToFeature[el]][el].value * store.state.treasure.type[elem.type].slots[i].power,
                    elem.tier,
                    elem.level,
                    elem.type
                ))
            } : null)});
        }
        if (data.newItem) {
            store.commit('treasure/updateKey', {key: 'newItem', value: {
                ...filterItem(data.newItem),
                valueCache: data.newItem.effect.map(el => store.state.treasure.effectToFeature[el] ? el : fallbackEffect).map((el, i) => store.getters['treasure/effectValue'](
                    store.state.treasure.effect[store.state.treasure.effectToFeature[el]][el].value * store.state.treasure.type[data.newItem.type].slots[i].power,
                    data.newItem.tier,
                    data.newItem.level,
                    data.newItem.type
                ))
            }});
        }
        store.dispatch('treasure/updateEffectCache');
    }
}
