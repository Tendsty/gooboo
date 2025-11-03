import store from "../../store";
import { buildArray } from "../utils/array";
import grobodal from "./general/grobodal";
import orladee from "./general/orladee";
import relic from "./general/relic";

const generals = {
    grobodal,
    orladee,
    oppenschroe: {unlock: 'generalOppenschroeSubfeature', quests: {}},
    bellux: {unlock: 'generalBelluxSubfeature', quests: {}},
    onoclua: {unlock: 'generalOnocluaSubfeature', quests: {}},
    omnisolix: {unlock: 'generalOmnisolixSubfeature', quests: {}}
};

export default {
    name: 'general',
    tickspeed: 1,
    unlockNeeded: 'generalFeature',
    tick() {
        for (const [gkey, general] of Object.entries(store.state.general)) {
            if (general.unlock === null || store.state.unlock[general.unlock].see) {
                for (const [qkey, quest] of Object.entries(general.quests)) {
                    if (quest.unlock === null || store.state.unlock[quest.unlock].see) {
                        let complete = true;
                        let cardsGiven = [];
                        while (quest.stage < quest.stages.length && complete) {
                            const tasks = quest.stages[quest.stage].tasks;
                            tasks.forEach(task => {
                                let current = 0;
                                switch (task.type) {
                                    case 'subfeature': {
                                        current = store.state.system.features[task.name].currentSubfeature;
                                        break;
                                    }
                                    case 'stat': {
                                        current = store.state.stat[task.name][task.subtype === 'current' ? 'value' : 'total'];
                                        break;
                                    }
                                    case 'unlock': {
                                        current = store.state.unlock[task.name].see;
                                        break;
                                    }
                                    case 'cardEquipped': {
                                        current = store.state.card.feature[task.feature].cardEquipped.includes(task.name);
                                        if (task.giveCard && !cardsGiven.includes(task.name) && store.state.card.card[task.name].amount <= 0) {
                                            cardsGiven.push(task.name);
                                        }
                                        break;
                                    }
                                    case 'upgrade': {
                                        current = store.state.upgrade.item[task.name][task.subtype === 'current' ? 'level' : 'highestLevel'];
                                        break;
                                    }
                                    case 'cropLevel': {
                                        current = Math.max(store.state.farm.crop[task.name].level, store.state.farm.crop[task.name].levelMax);
                                        break;
                                    }
                                    case 'equipmentMastery': {
                                        current = store.state.horde.items[task.name].masteryLevel;
                                        break;
                                    }
                                }

                                if (
                                    task.operator === undefined && !current ||
                                    task.operator === '>=' && current < task.value ||
                                    task.operator === '>' && current <= task.value ||
                                    task.operator === '<=' && current > task.value ||
                                    task.operator === '<' && current >= task.value ||
                                    task.operator === '==' && current !== task.value
                                ) {
                                    complete = false;
                                }
                            });
                            cardsGiven.forEach(card => {
                                for (let i = 0; i < 6; i++) {
                                    store.dispatch('card/gainCard', {name: card, isShiny: false});
                                }
                            });
                            if (complete) {
                                store.dispatch('general/completeQuest', {general: gkey, quest: qkey});
                            }
                        }
                    }
                }
            }
        }
    },
    unlock: ['generalFeature', 'generalOrladeeSubfeature', 'generalOppenschroeSubfeature', 'generalBelluxSubfeature', 'generalOnocluaSubfeature', 'generalOmnisolixSubfeature'],
    note: ['g', ...buildArray(31).map(() => 'grobodal'), ...buildArray(9).map(() => 'orladee')],
    relic,
    init() {
        for (const [key, elem] of Object.entries(generals)) {
            store.commit('general/init', {name: key, ...elem});
            store.commit('system/updateSubkey', {name: 'questlineHint', key, value: []});
        }
    },
    postInit() {
        for (const [key, elem] of Object.entries(generals)) {
            for (const [subkey, subelem] of Object.entries(elem.quests)) {
                const unlock = subelem.unlock ?? elem.unlock;
                if (unlock) {
                    store.commit('unlock/addTrigger', {unlock, trigger: `general_${ key }_${ subkey }`});
                }
            }
        }
    },
    saveGame() {
        let obj = {};
        for (const [gkey, general] of Object.entries(store.state.general)) {
            if (general.unlock === null || store.state.unlock[general.unlock].see) {
                obj[gkey] = {};
                for (const [qkey, quest] of Object.entries(general.quests)) {
                    if (quest.stage > 0) {
                        obj[gkey][qkey] = quest.stage;
                    }
                }
            }
        }
        return obj;
    },
    loadGame(data) {
        if (data !== undefined) {
            for (const [gkey, general] of Object.entries(data)) {
                for (const [qkey, questStage] of Object.entries(general)) {
                    store.commit('general/updateQuestKey', {general: gkey, quest: qkey, key: 'stage', value: questStage});
                    store.dispatch('general/giveReward', {general: gkey, quest: qkey});
                }
            }
            store.dispatch('general/applyBattery');
        }
    }
}
