import store from "../../store";
import { buildArray } from "../utils/array";
import grobodal from "./general/grobodal";
import orladee from "./general/orladee";

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
                        while (quest.stage < quest.stages.length && complete) {
                            const tasks = quest.stages[quest.stage].tasks;
                            tasks.forEach(task => {
                                let current = 0;
                                switch (task.type) {
                                    case 'stat': {
                                        current = store.state.stat[task.name][task.subtype === 'current' ? 'value' : 'total'];
                                        break;
                                    }
                                    case 'unlock': {
                                        current = store.state.unlock[task.name].see;
                                        break;
                                    }
                                    case 'upgrade': {
                                        current = store.state.upgrade.item[task.name][task.subtype === 'current' ? 'level' : 'highestLevel'];
                                        break;
                                    }
                                    case 'cropLevel': {
                                        current = store.state.farm.crop[task.name][task.subtype === 'current' ? 'level' : 'levelMax'];
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
    relic: {
        torch: {icon: 'mdi-torch', feature: ['general', 'mining', 'village'], color: 'orange', effect: [
            {name: 'miningCardCap', type: 'base', value: 1},
            {name: 'villageCardCap', type: 'base', value: 1}
        ]},
        purpleHeart: {icon: 'mdi-heart', feature: ['general', 'horde'], color: 'purple', effect: [
            {name: 'hordeHealth', type: 'mult', value: 1.5},
            {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.2}
        ]},
        rottenLeaf: {icon: 'mdi-leaf', feature: ['general', 'farm'], color: 'brown', effect: [
            {name: 'farmCropGain', type: 'mult', value: 1.75},
            {name: 'farmExperience', type: 'mult', value: 1.2},
            {name: 'farmOvergrow', type: 'base', value: 0.1}
        ]},
        stonepiercer: {icon: 'mdi-screwdriver', feature: ['general', 'mining'], color: 'cherry', effect: [
            {name: 'miningDamage', type: 'mult', value: 2.25}
        ]},
        consolationPrize: {icon: 'mdi-seal-variant', feature: ['general', 'village', 'horde', 'farm'], color: 'lighter-grey', effect: [
            {name: 'villageResourceGain', type: 'mult', value: 1.4},
            {name: 'hordeItemMasteryGain', type: 'mult', value: 1.4},
            {name: 'farmExperience', type: 'mult', value: 1.4}
        ]},
        prettyLamp: {icon: 'mdi-vanity-light', feature: ['general', 'gallery'], color: 'light-blue', effect: [
            {name: 'galleryInspirationStart', type: 'base', value: 3},
            {name: 'thinkHarder', type: 'galleryIdea', value: true},
        ]},
        chessboard: {icon: 'mdi-checkerboard', feature: ['general', 'horde'], color: 'grey', effect: [
            {name: 'hordeChessItems', type: 'unlock', value: true},
        ]},
        iridiscentFlower: {icon: 'mdi-flower-pollen', feature: ['general', 'cryolab'], color: 'pink', effect: [
            {name: 'cryolabMaxFeatures', type: 'base', value: 1},
        ]},
    },
    init() {
        for (const [key, elem] of Object.entries({
            grobodal,
            orladee,
            oppenschroe: {unlock: 'generalOppenschroeSubfeature', quests: {}},
            bellux: {unlock: 'generalBelluxSubfeature', quests: {}},
            onoclua: {unlock: 'generalOnocluaSubfeature', quests: {}},
            omnisolix: {unlock: 'generalOmnisolixSubfeature', quests: {}}
        })) {
            store.commit('general/init', {name: key, ...elem});
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
        }
    }
}
