import Vue from "vue";
import { HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME, HORDE_HEIRLOOM_MIN_ZONE, HORDE_HEIRLOOM_TOWER_FLOORS, HORDE_KEYS_PER_TOWER, HORDE_LEVEL_MIN_SECONDS, HORDE_MASTERY_MINIBOSS_MULT, HORDE_MINIBOSS_MIN_ZONE, HORDE_SHARD_INCREMENT, HORDE_SHARD_PER_EQUIP } from "../js/constants";
import { buildNum, capitalize, decapitalize } from "../js/utils/format";
import { chance, randomElem, randomInt, randomRound, weightSelect } from "../js/utils/random";
import { logBase } from "../js/utils/math";

const notes = {
    1: 'horde_1',
    2: 'horde_2',
    5: 'horde_3',
    6: 'horde_4',
    8: 'horde_5',
    10: 'horde_6',
    13: 'horde_7',
    16: 'horde_8',
    19: 'horde_9',
    20: 'horde_10',
    21: 'horde_11',
    24: 'horde_12',
    27: 'horde_13',
    30: 'horde_14',
    34: 'horde_15',
    40: 'horde_16',
    41: 'horde_17',
    47: 'horde_19',
    50: 'horde_20',
    54: 'horde_21',
    60: 'horde_22',
    67: 'horde_23',
    75: 'horde_24',
    78: 'horde_25',
    84: 'horde_26',
    90: 'horde_27',
    96: 'horde_28',
    100: 'horde_29',
    107: 'horde_30',
};

const BATTLE_PASS_COMBAT_REWARD = 1.5;
const BATTLE_PASS_LOOT_REWARD = 1.3;
const BATTLE_PASS_PRESTIGE_REWARD = 1.4;

export default {
    namespaced: true,
    state: {
        zone: 1,
        combo: 0,
        respawn: 0,
        maxRespawn: 1,
        bossAvailable: false,
        bossFight: 0,
        player: {},
        enemy: null,
        items: {},
        sigil: {},
        sigilZones: [],
        enemyActive: {},
        heirloom: {},
        heirloomsFound: null,
        fightTime: 0,
        fightRampage: 0,
        loadout: [],
        nextLoadoutId: 1,
        enemyTimer: 0,
        minibossTimer: 0,
        nostalgiaLost: 0,
        chosenActive: null,
        itemStatMult: {},
        tower: {},
        currentTower: null,
        towerFloor: 0,
        taunt: false,
        fighterClass: {},
        selectedClass: 'adventurer',
        nextClass: 'adventurer',
        area: {},
        selectedArea: null,
        cachePlayerStats: null,
        cacheEnemyStats: null,
        playerBuff: {},
        expLevel: 0,
        skillPoints: 0,
        skillLevel: {},
        skillActive: {},
        trinket: {},
        battlePassEffect: {},
        enemyType: {},
        areaBoss: {},
        autocast: [],
        activeTimer: 0,
        trinketAmountNeeded: [1, 8, 36, 150, 600, 2350, 9000, 33000, 115000, 380000],
        trinketDrop: null,
        bossStage: 0,
        bossBonusDifficulty: 0,
        sacrificeLevel: 0,
        nextSacrificeLevel: 0,
    },
    getters: {
        playerBaseStats: (state, getters, rootState) => {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            switch (subfeature) {
                case 0:
                    return {
                        attack: 5,
                        health: 500
                    };
                case 1:
                    return state.fighterClass[state.selectedClass].baseStats;
                default:
                    return {};
            }
        },
        enemyStats: (state, getters, rootState) => (difficulty, combo = 0, baseAttack = 2, baseHealth = 50) => {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            const statMult = subfeature === 1 ? 2000 : 1;
            return {
                attack: Math.pow(2.1, difficulty) * Math.pow(HORDE_COMBO_ATTACK, combo) * statMult * baseAttack,
                health: Math.pow(2.1, difficulty) * Math.pow(HORDE_COMBO_HEALTH, combo) * statMult * baseHealth,
                critChance: 0,
                critMult: 0.5,
                revive: 0,
                toxic: 0,
                firstStrike: 0,
                cutting: 0,
                divisionShield: 0,
                stunResist: 0,
                defense: 0,
                execute: 0,

                // Damage type specifics
                physicConversion: 1,
                magicConversion: 0,
                bioConversion: 0,
                physicAttack: 1,
                magicAttack: 1,
                bioAttack: 1,
                physicTaken: 1,
                magicTaken: 1,
                bioTaken: 1,

                // Multiplies the amount of basic loot (bones and monster parts)
                loot: 1
            };
        },
        enemyBone: () => (zone, combo = 0) => {
            return Math.pow(1.6, zone) * (combo * HORDE_COMBO_BONE + 1) * 90;
        },
        enemyBlood: () => (difficulty, combo = 0) => {
            return Math.pow(1.5, difficulty) * (combo * HORDE_COMBO_BONE + 1) * 2;
        },
        enemyMonsterPart: () => (zone) => {
            return Math.pow(1.1, zone - 10) * 0.2;
        },
        enemyCorruption: (state, getters, rootState, rootGetters) => (zone) => {
            return rootGetters['mult/get']('hordeCorruption', getters.enemyCorruptionBase(zone));
        },
        enemyCorruptionBase: (state, getters, rootState) => (zone) => {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            const baseValue = subfeature === 1 ? 2.5 : -4;
            return Math.max(0, zone * 0.1 + baseValue);
        },
        currentBone: (state, getters) => {
            return getters.enemyBone(state.zone, state.combo);
        },
        currentBlood: (state, getters) => {
            if (state.selectedArea === null) {
                return 0;
            }
            return getters.enemyBlood(state.area[state.selectedArea].zones[state.zone].difficulty, state.combo);
        },
        currentMonsterPart: (state, getters) => {
            return getters.enemyMonsterPart(state.zone);
        },
        currentCorruption: (state, getters, rootState) => {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            const tower = state.currentTower !== null ? state.tower[state.currentTower] : null;
            return getters.enemyCorruption(tower ? tower.statBase : (subfeature === 1 ? state.area[state.selectedArea].zones[state.zone].difficulty : state.zone));
        },
        currentCorruptionBase: (state, getters, rootState) => {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            const tower = state.currentTower !== null ? state.tower[state.currentTower] : null;
            return getters.enemyCorruptionBase(tower ? tower.statBase : (subfeature === 1 ? state.area[state.selectedArea].zones[state.zone].difficulty : state.zone));
        },
        currentCorruptionStats: (state, getters, rootState) => {
            const corruption = getters.currentCorruption;
            const subfeature = rootState.system.features.horde.currentSubfeature;
            let stats = {};

            if (corruption > 0) {
                stats.power = 1.2 * Math.pow(0.005 * corruption + 1.01, corruption * 100);
            }
            if (corruption >= 0.5 && subfeature === 0) {
                stats.sigil = Math.floor(corruption * 2);
            }
            if (corruption >= 1.25) {
                stats.revive = Math.floor(corruption / 1.25);
            }
            if (corruption >= 10) {
                stats.execute = 0.9 - Math.pow(14 / 15, corruption / 2 - 4) * 0.75;
            }

            return stats;
        },
        currentBaseZone: (state) => {
            const tower = state.currentTower !== null ? state.tower[state.currentTower] : null;
            return tower ? (tower.statBase + tower.statScaling * state.towerFloor) : state.zone;
        },
        currentSigils: (state, getters) => {
            return Math.max(0, Math.floor((getters.currentBaseZone - 20) / 30 + 1));
        },
        currentSigilVariety: (state, getters) => {
            let amount = 0;
            [20, 30, 70, 150].forEach(elem => {
                if (getters.currentBaseZone >= elem) {
                    amount++;
                }
            });
            return amount;
        },
        comboRequiredBase: (state) => {
            return Math.round(state.zone * 2 + 20);
        },
        comboRequired: (state, getters, rootState, rootGetters) => {
            return Math.round(rootGetters['mult/get']('hordeBossRequirement', getters.comboRequiredBase));
        },
        itemsEquipped: (state) => {
            let i = 0;
            for (const [, elem] of Object.entries(state.items)) {
                if (elem.equipped) {
                    i++;
                }
            }
            return i;
        },
        trinketsEquipped: (state) => {
            let i = 0;
            for (const [, elem] of Object.entries(state.trinket)) {
                if (elem.equipped) {
                    i++;
                }
            }
            return i;
        },
        itemsActiveList: (state) => {
            let obj = {};
            for (const [key, elem] of Object.entries(state.items)) {
                if (elem.equipped && !elem.passive) {
                    obj[key] = elem;
                }
            }
            return obj;
        },
        itemsList: (state) => {
            let obj = {};
            for (const [key, elem] of Object.entries(state.items)) {
                if (elem.known) {
                    obj[key] = elem;
                }
            }
            return obj;
        },
        masteryRequired: (state) => (name, lvl) => {
            const item = state.items[name];
            return Math.pow(10, lvl) * Math.pow(1.04, item.findZone) * (item.unlock === 'hordeChessItems' ? buildNum(20, 'K') : 500);
        },
        baseRespawnTime: (state) => {
            if (state.selectedArea !== null) {
                return state.area[state.selectedArea].zones[state.zone].difficulty + 912;
            }
            return state.zone * 3 + 12;
        },
        canSpawnMiniboss: (state, getters, rootState) => {
            return rootState.stat.horde_maxZone.value >= HORDE_MINIBOSS_MIN_ZONE;
        },
        canFindHeirloom: (state, getters, rootState) => {
            return rootState.stat.horde_maxZone.value >= HORDE_HEIRLOOM_MIN_ZONE;
        },
        masteryBaseGain: (state) => (name) => {
            return state.zone - state.items[name].findZone - 24;
        },
        expIncrement: (state, getters, rootState, rootGetters) => (className) => {
            const incLowerLimit = className === 'scholar' ? 1.12 : 1.15;
            return rootGetters['mult/get']('hordeExpIncrement', state.fighterClass[className].exp.increment - incLowerLimit) + incLowerLimit;
        },
        expDifficulty: (state, getters, rootState, rootGetters) => (lvl) => {
            return Math.max(HORDE_LEVEL_MIN_SECONDS, Math.pow(getters.expIncrement(state.selectedClass), lvl) * rootGetters['mult/get']('hordeExpBase', state.fighterClass[state.selectedClass].exp.base));
        },
        classLevelEffect: () => (lvl) => {
            return [
                {name: 'currencyHordeCourageGain', type: 'base', value: lvl >= 10 ? ((lvl - 8) * 2 * Math.pow(1.175, lvl - 10)) : 0},
                {name: 'currencyHordeBloodGain', type: 'mult', value: Math.pow(1.175, lvl)},
                {name: 'currencyHordeBloodCap', type: 'mult', value: Math.pow(1.5, lvl)},
            ];
        },
        battlePassEffectAtLevel: (state) => (lvl) => {
            if (lvl <= 0) {
                return null;
            } else if (state.battlePassEffect[lvl] !== undefined) {
                return {...state.battlePassEffect[lvl], isSpecial: true};
            } else {
                const finalLevel = lvl - Object.keys(state.battlePassEffect).filter(elem => lvl > parseInt(elem)).length - 1;
                const rewardLevel = Math.floor(finalLevel / 3) + 1;
                switch (finalLevel % 3) {
                    case 0:
                        return {icon: 'mdi-sword-cross', color: 'grey', effect: [
                            {name: 'hordeAttack', type: 'mult', before: Math.pow(BATTLE_PASS_COMBAT_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_COMBAT_REWARD, rewardLevel)},
                            {name: 'hordeHealth', type: 'mult', before: Math.pow(BATTLE_PASS_COMBAT_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_COMBAT_REWARD, rewardLevel)},
                        ], isSpecial: false};
                    case 1:
                        return {icon: 'mdi-bone', color: 'grey', effect: [
                            {name: 'currencyHordeBoneGain', type: 'mult', before: Math.pow(BATTLE_PASS_LOOT_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_LOOT_REWARD, rewardLevel)},
                            {name: 'currencyHordeBloodGain', type: 'mult', before: Math.pow(BATTLE_PASS_LOOT_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_LOOT_REWARD, rewardLevel)},
                        ], isSpecial: false};
                    case 2:
                        return {icon: 'mdi-ghost', color: 'grey', effect: [
                            {name: 'currencyHordeSoulCorruptedGain', type: 'mult', before: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, rewardLevel)},
                            {name: 'currencyHordeCourageGain', type: 'mult', before: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, rewardLevel - 1), value: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, rewardLevel)},
                        ], isSpecial: false};
                    default:
                        return null;
                }
            }
        },
        battlePassCurrentLevel: (state) => {
            let lvl = 0;
            for (const [, elem] of Object.entries(state.fighterClass)) {
                for (const [, qelem] of Object.entries(elem.questsCompleted)) {
                    lvl += qelem;
                }
            }
            return lvl;
        },
        sacrificeEffectAtLevel: () => (lvl) => {
            return [
                {name: 'hordeAttack', type: 'mult', value: Math.pow(5, lvl)},
                {name: 'hordeHealth', type: 'mult', value: Math.pow(5, lvl)},
                {name: 'hordeCorruption', type: 'mult', value: 1 / (0.25 * lvl + 1)},
                {name: 'hordeItemMasteryGain', type: 'mult', value: Math.pow(0.5, lvl)},
                {name: 'hordeMaxItems', type: 'bonus', value: lvl * -1},
            ];
        },
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        },
        updatePlayerKey(state, o) {
            Vue.set(state.player, o.key, o.value);
        },
        updateEnemyKey(state, o) {
            if (state.enemy !== null) {
                Vue.set(state.enemy, o.key, o.value);
            }
        },
        updateEnemyActive(state, o) {
            Vue.set(state.enemy.active[o.name], o.key, o.value);
        },
        updateItemKey(state, o) {
            Vue.set(state.items[o.name], o.key, o.value);
        },
        updateHeirloomKey(state, o) {
            Vue.set(state.heirloom[o.name], o.key, o.value);
        },
        updateTowerKey(state, o) {
            Vue.set(state.tower[o.name], o.key, o.value);
        },
        initItem(state, o) {
            Vue.set(state.items, o.name, {
                level: 1,
                cap: o.cap ?? null,
                unlock: o.unlock ?? null,
                equipped: false,
                found: o.found ?? false,
                foundDefault: o.found ?? false,
                known: o.found ?? false,
                findZone: o.findZone ?? 0,
                findChance: o.findChance ?? 0.001,
                price: o.price ?? (() => 100),
                stats: o.stats ?? (() => { return {}; }),
                active: o.active ?? (() => []),
                activeType: o.activeType ?? 'combat',
                activeCost: o.activeCost ?? (() => { return {}; }),
                cooldown: o.cooldown,
                cooldownLeft: 0,
                usableInStun: o.usableInStun ?? false,
                icon: o.icon ?? 'mdi-sack',
                activeIcon: o.activeIcon ?? 'mdi-hand-back-left',
                activeColor: o.activeColor ?? 'red',
                collapse: false,
                masteryPoint: 0,
                masteryLevel: 0,
                masteryBoost: o.masteryBoost ?? 0.5,
                passive: false
            });
        },
        initHeirloom(state, o) {
            Vue.set(state.heirloom, o.name, {
                amount: 0,
                minZone: o.minZone ?? 0,
                icon: o.icon ?? 'mdi-circle',
                color: o.color ?? 'grey',
                effect: o.effect ?? []
            });
        },
        initSigil(state, o) {
            Vue.set(state.sigil, o.name, {
                minZone: o.minZone ?? 0,
                icon: o.icon ?? 'mdi-circle',
                color: o.color ?? 'grey',
                cap: o.cap ?? null,
                stats: o.stats ?? (() => {return {};}),
                active: o.active ?? null,
                exclude: o.exclude ?? []
            });
        },
        initTower(state, o) {
            Vue.set(state.tower, o.name, {
                unlock: o.unlock ?? null,
                sigils: o.sigils ?? ['generic'],
                statBase: o.statBase ?? 100,
                statScaling: o.statScaling ?? 1,
                crowns: o.crowns ?? 1,
                heirlooms: o.heirlooms ?? [],
                reward: o.reward ?? {},
                highest: 0
            });
        },
        initFighterClass(state, o) {
            Vue.set(state.fighterClass, o.name, {
                unlock: o.unlock ?? null,
                icon: o.icon ?? 'mdi-circle',
                baseStats: o.baseStats,
                courageMult: o.courageMult ?? 1,
                exp: o.exp,
                skills: o.skills,
                skillTree: o.skillTree,
                quests: o.quests,
                questsCompleted: {stat: 0, zone: 0, level: 0, boss: 0}
            });
        },
        initArea(state, o) {
            let zones = {};
            for (const [key, elem] of Object.entries(o.zones)) {
                zones[key] = {
                    unlocked: elem.unlockedBy === null,
                    enemyAmount: elem.type === 'regular' ? 100 : null,
                    ...elem,
                    unlockedBy: elem.unlockedBy ? (Array.isArray(elem.unlockedBy) ? elem.unlockedBy : [elem.unlockedBy]) : null,
                };
            }
            Vue.set(state.area, o.name, {
                unlock: o.unlock ?? null,
                icon: o.icon ?? 'mdi-nature',
                color: o.color ?? 'grey',
                zones: zones,
                decoration: o.decoration
            });
        },
        initTrinket(state, o) {
            Vue.set(state.trinket, o.name, {
                amount: 0,
                level: 0,
                rarity: o.rarity ?? 0,
                icon: o.icon ?? 'mdi-circle',
                color: o.color ?? 'grey',
                isTimeless: o.isTimeless ?? false,
                needsEnergy: o.needsEnergy ?? false,
                needsMana: o.needsMana ?? false,
                usableInStun: o.usableInStun ?? false,
                uniqueToBoss: o.uniqueToBoss ?? null,
                effect: o.effect ?? [],
                active: o.active ?? (() => []),
                activeType: o.activeType ?? null,
                activeCost: o.activeCost ?? (() => { return {}; }),
                cooldown: o.cooldown ?? (() => 60),
                equipped: false,
                isActive: false
            });
        },
        initEnemyType(state, o) {
            Vue.set(state.enemyType, o.name, {
                attack: o.attack,
                health: o.health,
                sigil: o.sigil ?? {},
                stats: o.stats ?? {}
            });
        },
        initAreaBoss(state, o) {
            Vue.set(state.areaBoss, o.name, {
                attack: o.attack,
                health: o.health,
                textShadow: o.textShadow ?? null,
                sigil: o.sigil ?? {},
                stats: o.stats ?? {}
            });
        },
        addSigilZone(state, value) {
            state.sigilZones.push(value);
        },
        addEmptyLoadout(state) {
            state.loadout.push({id: state.nextLoadoutId, name: '#' + (state.loadout.length + 1), content: []});
            Vue.set(state, 'nextLoadoutId', state.nextLoadoutId + 1);
        },
        addExistingLoadout(state, o) {
            state.loadout.push(o);
        },
        updateLoadoutKey(state, o) {
            Vue.set(state.loadout[o.id], o.key, o.value);
        },
        updateClassQuestKey(state, o) {
            Vue.set(state.fighterClass[o.name].questsCompleted, o.key, o.value);
        },
        updateAreaZoneKey(state, o) {
            Vue.set(state.area[o.name].zones[o.zone], o.key, o.value);
        },
        updateTrinketKey(state, o) {
            Vue.set(state.trinket[o.name], o.key, o.value);
        },
        deleteLoadout(state, index) {
            state.loadout.splice(index, 1);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'zone', value: 1});
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'respawn', value: 0});
            commit('updateKey', {key: 'maxRespawn', value: 1});
            commit('updateKey', {key: 'bossAvailable', value: false});
            commit('updateKey', {key: 'bossFight', value: 0});
            commit('updateKey', {key: 'sigilZones', value: []});
            commit('updateKey', {key: 'heirloomsFound', value: null});
            commit('updateKey', {key: 'fightTime', value: 0});
            commit('updateKey', {key: 'fightRampage', value: 0});
            commit('updateKey', {key: 'loadout', value: []});
            commit('updateKey', {key: 'nextLoadoutId', value: 1});
            commit('updateKey', {key: 'enemyTimer', value: 0});
            commit('updateKey', {key: 'minibossTimer', value: 0});
            commit('updateKey', {key: 'nostalgiaLost', value: 0});
            commit('updateKey', {key: 'chosenActive', value: null});
            commit('updateKey', {key: 'itemStatMult', value: {}});
            commit('updateKey', {key: 'currentTower', value: null});
            commit('updateKey', {key: 'towerFloor', value: 0});
            commit('updateKey', {key: 'taunt', value: false});
            commit('updateKey', {key: 'selectedClass', value: 'adventurer'});
            commit('updateKey', {key: 'nextClass', value: 'adventurer'});
            commit('updateKey', {key: 'selectedArea', value: null});

            commit('updateKey', {key: 'player', value: {}});
            commit('updateKey', {key: 'enemy', value: null});
            commit('updateKey', {key: 'enemyActive', value: {}});
            commit('updateKey', {key: 'cachePlayerStats', value: null});
            commit('updateKey', {key: 'cacheEnemyStats', value: null});
            commit('updateKey', {key: 'playerBuff', value: {}});
            commit('updateKey', {key: 'expLevel', value: 0});
            commit('updateKey', {key: 'skillPoints', value: 0});
            commit('updateKey', {key: 'skillLevel', value: {}});
            commit('updateKey', {key: 'skillActive', value: {}});
            commit('updateKey', {key: 'autocast', value: []});
            commit('updateKey', {key: 'activeTimer', value: 0});
            commit('updateKey', {key: 'trinketDrop', value: null});
            commit('updateKey', {key: 'bossStage', value: 0});
            commit('updateKey', {key: 'bossBonusDifficulty', value: 0});
            commit('updateKey', {key: 'sacrificeLevel', value: 0});
            commit('updateKey', {key: 'nextSacrificeLevel', value: 0});

            for (const [key, elem] of Object.entries(state.items)) {
                commit('updateItemKey', {name: key, key: 'level', value: 1});
                commit('updateItemKey', {name: key, key: 'found', value: elem.foundDefault});
                commit('updateItemKey', {name: key, key: 'known', value: elem.foundDefault});
                commit('updateItemKey', {name: key, key: 'equipped', value: false});
                commit('updateItemKey', {name: key, key: 'collapse', value: false});
                commit('updateItemKey', {name: key, key: 'cooldownLeft', value: 0});
                commit('updateItemKey', {name: key, key: 'masteryPoint', value: 0});
                commit('updateItemKey', {name: key, key: 'masteryLevel', value: 0});
                commit('updateItemKey', {name: key, key: 'passive', value: false});
            }
            for (const [key] of Object.entries(state.heirloom)) {
                commit('updateHeirloomKey', {name: key, key: 'amount', value: 0});
            }
            for (const [key, elem] of Object.entries(state.area)) {
                for (const [subkey, subelem] of Object.entries(elem.zones)) {
                    commit('updateAreaZoneKey', {name: key, zone: subkey, key: 'unlocked', value: subelem.unlockedBy === null});
                }
            }
            for (const [key] of Object.entries(state.trinket)) {
                commit('updateTrinketKey', {name: key, key: 'amount', value: 0});
                commit('updateTrinketKey', {name: key, key: 'level', value: 0});
                commit('updateTrinketKey', {name: key, key: 'equipped', value: false});
                commit('updateTrinketKey', {name: key, key: 'isActive', value: false});
            }
            for (const [key] of Object.entries(state.tower)) {
                commit('updateTowerKey', {name: key, key: 'highest', value: 0});
            }
            for (const [name, elem] of Object.entries(state.fighterClass)) {
                for (const [key] of Object.entries(elem.questsCompleted)) {
                    commit('updateClassQuestKey', {name, key, value: 0});
                }
            }
        },
        initHeirloom({ commit }, o) {
            commit('initHeirloom', o);
            commit('mult/init', {feature: 'horde', name: `${ o.name }HeirloomEffect`, type: 'heirloomEffect'}, {root: true});
        },
        updatePlayerStats({ state, rootState, getters, rootGetters, commit }) {
            const baseStats = getters.playerBaseStats;
            let newPlayerStats = {
                health: rootGetters['mult/get']('hordeHealth', baseStats.health),
                revive: rootGetters['mult/get']('hordeRevive'),
                divisionShield: rootGetters['mult/get']('hordeDivisionShield'),
                silence: 0,
                stun: 0,
                poison: 0,
                hits: 0,
                spells: 0,
            };

            // Preserve energy and mana, they are NOT reset on player death / combat change
            if (rootState.system.features.horde.currentSubfeature === 1) {
                if (state.player.energy !== undefined) {
                    newPlayerStats.energy = state.player.energy;
                }
                if (state.player.mana !== undefined) {
                    newPlayerStats.mana = state.player.mana;
                }
            }

            commit('updateKey', {key: 'player', value: newPlayerStats});
        },
        checkPlayerHealth({ state, getters, rootGetters, commit }) {
            const maxHealth = rootGetters['mult/get']('hordeHealth', getters.playerBaseStats.health);
            if (state.respawn <= 0 && state.player.health > maxHealth) {
                commit('updatePlayerKey', {key: 'health', value: maxHealth});
            }
        },
        updateEnemyStats({ state, rootState, getters, rootGetters, commit, dispatch }) {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            if (state.respawn <= 0) {
                const inTower = state.currentTower !== null;
                let enemyName = null;
                let currentArea = null;
                if (subfeature === 1) {
                    currentArea = state.area[state.selectedArea].zones[state.zone];
                    enemyName = currentArea.type === 'boss' ? currentArea.boss[state.bossStage] : randomElem(currentArea.enemyType);
                }
                if (state.bossFight === 0 && !inTower && state.minibossTimer >= 1) {
                    commit('updateKey', {key: 'bossFight', value: 1});
                } else if (state.bossFight === 0 && currentArea !== null && currentArea.type === 'boss') {
                    commit('updateKey', {key: 'bossFight', value: 2});
                }
                const canSpawn = !(subfeature === 1 && state.selectedArea === null) &&
                    (inTower || state.enemyTimer >= HORDE_ENEMY_RESPAWN_TIME || state.bossFight > 0);
                if (canSpawn || (subfeature === 0 && state.zone === rootState.stat.horde_maxZone.value && !state.bossAvailable && state.taunt)) {
                    const enemyData = enemyName !== null ? (currentArea.type === 'boss' ? state.areaBoss[enemyName] : state.enemyType[enemyName]) : null;
                    const bonusDifficulty = (enemyName !== null && currentArea.type === 'boss' && rootState.unlock[currentArea.reward].use) ? state.bossBonusDifficulty : 0;
                    let stats = getters.enemyStats(
                        subfeature === 1 ? (currentArea.difficulty + bonusDifficulty) : getters.currentBaseZone,
                        inTower ? 0 : state.combo,
                        enemyName ? enemyData.attack : undefined,
                        enemyName ? enemyData.health : undefined
                    );
                    const corruptionStats = inTower ? {} : getters.currentCorruptionStats;

                    if (corruptionStats.power !== undefined) {
                        stats.attack *= corruptionStats.power;
                        stats.health *= corruptionStats.power;
                    }
                    if (corruptionStats.revive !== undefined) {
                        stats.revive += corruptionStats.revive;
                    }
                    if (corruptionStats.execute !== undefined) {
                        stats.execute += corruptionStats.execute;
                    }

                    if (subfeature === 1) {
                        stats.attack *= buildNum(100, 'K');
                        stats.health *= buildNum(100, 'K');
                    }

                    // update sigil zones
                    if (subfeature === 0 && !inTower) {
                        while (state.sigilZones.length < state.zone) {
                            let sigils = [];
                            let sigilsAvailable = [];
                            for (const [key, elem] of Object.entries(state.sigil)) {
                                if (state.zone >= elem.minZone) {
                                    sigilsAvailable.push(key);
                                }
                            }

                            let amt = getters.currentSigilVariety;
                            let rngGen = rootGetters['system/getRng']('horde_sigilZone');
                            while (amt > 0 && sigilsAvailable.length > 0) {
                                const newSigil = randomElem(sigilsAvailable, rngGen());
                                sigils.push(newSigil);
                                sigilsAvailable = sigilsAvailable.filter(sigil => sigil !== newSigil && !state.sigil[newSigil].exclude.includes(sigil));
                                amt--;
                            }
                            commit('system/nextRng', {name: 'horde_sigilZone', amount: 1}, {root: true});

                            commit('addSigilZone', sigils);
                        }
                    }

                    let amt = getters.currentSigils + (corruptionStats.sigil ?? 0);
                    let sigil = {};
                    if (enemyName) {
                        for (const [stat, amount] of Object.entries(enemyData.stats)) {
                            const split = stat.split('_');
                            if (split[1] === 'mult') {
                                stats[split[0]] *= amount;
                            } else {
                                stats[split[0]] += amount;
                            }
                        }
                        sigil = {...enemyData.sigil};
                    } else if (subfeature === 0) {
                        let sigilSource = inTower ? [...state.tower[state.currentTower].sigils] : [...state.sigilZones[state.zone - 1]];
                        let rngGen = state.bossFight === 0 ? null : rootGetters['system/getRng']('horde_sigil' + (state.bossFight === 2 ? 'Boss' : 'Miniboss'));
                        while (amt > 0) {
                            let chosen = null;
                            if (sigilSource.length > 0) {
                                if (state.bossFight === 0) {
                                    chosen = randomElem(sigilSource);
                                } else {
                                    chosen = randomElem(sigilSource, rngGen());
                                }
                            } else {
                                chosen = 'generic';
                            }
                            if (!sigil[chosen]) {
                                sigil[chosen] = 0;
                            }
                            sigil[chosen]++;
                            if (state.sigil[chosen].cap !== null && sigil[chosen] >= state.sigil[chosen].cap) {
                                sigilSource.splice(sigilSource.findIndex(elem => elem === chosen), 1);
                            }
                            amt--;
                        }
                    }

                    if (state.bossFight >= 1) {
                        stats.attack *= state.bossFight === 2 ? 15 : 1.5;
                        stats.health *= state.bossFight === 2 ? 15 : 2.5;
                        stats.magicTaken *= state.bossFight === 2 ? 1.35 : 1.1;
                        stats.bioTaken /= state.bossFight === 2 ? 10 : 2;
                        stats.stunResist += state.bossFight;
                    }

                    let active = {};
                    const cooldownStart = rootGetters['mult/get']('hordeEnemyActiveStart');

                    for (const [key, elem] of Object.entries(sigil)) {
                        if (subfeature !== 1) {
                            for (const [stat, obj] of Object.entries(state.sigil[key].stats(elem, state.bossFight))) {
                                if (obj.type === 'mult') {
                                    stats[stat] *= obj.amount;
                                } else {
                                    stats[stat] += obj.amount;
                                }
                            }
                        }
                        if (state.sigil[key].active) {
                            active[key] = {
                                cooldown: Math.round(state.sigil[key].active.startCooldown(elem, state.bossFight) * (1 - cooldownStart) + state.sigil[key].active.cooldown(elem, state.bossFight) * cooldownStart),
                                uses: state.sigil[key].active.uses(elem, state.bossFight)
                            };
                        }
                    }

                    // Taunted enemies give no loot
                    if (!canSpawn) {
                        stats.loot = 0;
                    }

                    commit('updateKey', {key: 'enemy', value: {}});
                    for (const [key, elem] of Object.entries(stats)) {
                        commit('updateEnemyKey', {key, value: elem});
                    }
                    commit('updateEnemyKey', {key: 'maxHealth', value: stats.health});
                    commit('updateEnemyKey', {key: 'maxRevive', value: stats.revive});
                    commit('updateEnemyKey', {key: 'maxDivisionShield', value: stats.divisionShield});
                    commit('updateEnemyKey', {key: 'silence', value: 0});
                    commit('updateEnemyKey', {key: 'stun', value: 0});
                    commit('updateEnemyKey', {key: 'poison', value: 0});
                    commit('updateEnemyKey', {key: 'hits', value: 0});
                    commit('updateEnemyKey', {key: 'sigil', value: sigil});
                    commit('updateEnemyKey', {key: 'active', value: active});

                    commit('updateEnemyKey', {key: 'name', value: enemyName});

                    commit('updateKey', {key: 'fightTime', value: 0});
                    commit('updateKey', {key: 'fightRampage', value: 0});

                    // Reset after x time effects
                    dispatch('system/resetEffect', {
                        type: 'mult',
                        name: 'hordeAttack',
                        multKey: `hordeTime`
                    }, {root: true});
                    dispatch('system/resetEffect', {
                        type: 'base',
                        name: 'hordeStrength',
                        multKey: `hordeTime`
                    }, {root: true});
                    dispatch('system/resetEffect', {
                        type: 'base',
                        name: 'hordeIntelligence',
                        multKey: `hordeTime`
                    }, {root: true});
                } else {
                    commit('updateKey', {key: 'enemy', value: null});
                }
            }
        },
        fightBoss({ commit, dispatch }) {
            commit('updateKey', {key: 'bossFight', value: 2});

            dispatch('resetStats');
        },
        stopFightBoss({ commit, dispatch }) {
            commit('updateKey', {key: 'bossFight', value: 0});

            dispatch('resetStats');
        },
        updateZone({ rootState, commit, dispatch }, zone) {
            commit('updateKey', {key: 'zone', value: Math.min(zone, rootState.stat.horde_maxZone.value)});
            commit('updateKey', {key: 'bossFight', value: 0});

            dispatch('resetStats');
        },
        updateAreaZone({ state, commit, dispatch }, o) {
            commit('updateKey', {key: 'selectedArea', value: o.area});
            commit('updateKey', {key: 'zone', value: o.zone});

            commit('updateKey', {key: 'bossStage', value: 0});
            commit('updateKey', {key: 'bossFight', value: state.area[o.area].zones[o.zone].type === 'boss' ? 2 : 0});

            dispatch('resetStats');
        },
        equipItem({ state, getters, rootGetters, commit, dispatch }, name) {
            if (state.items[name] && !state.items[name].equipped && state.items[name].found && getters.itemsEquipped < rootGetters['mult/get']('hordeMaxItems')) {
                commit('updateItemKey', {name, key: 'equipped', value: true});
                dispatch('applyItemEffects', name);
                dispatch('updateMysticalShardCap');
                dispatch('resetStats');
                commit('stat/increaseTo', {feature: 'horde', name: 'maxItems', value: getters.itemsEquipped}, {root: true});
            }
        },
        unequipItem({ state, commit, dispatch }, name) {
            if (state.items[name]?.equipped) {
                commit('updateItemKey', {name, key: 'equipped', value: false});

                state.items[name].stats(state.items[name].level).forEach(elem => {
                    if (elem.type === 'tag') {
                        commit('tag/reset', {name: elem.name, key: 'item_' + name}, {root: true});
                    } else {
                        dispatch('mult/removeKey', {name: elem.name, key: 'item_' + name, type: elem.type}, {root: true});
                    }
                });

                if (state.chosenActive === name) {
                    commit('updateKey', {key: 'chosenActive', value: null});
                }
                commit('updateKey', {key: 'autocast', value: state.autocast.filter(el => el !== name)});

                dispatch('updateMysticalShardCap');
                dispatch('resetStats');
            }
        },
        applyItemEffects({ state, commit, dispatch }, name) {
            state.items[name].stats(state.items[name].level).forEach(elem => {
                let value = elem.value;
                if (state.items[name].passive && elem.isPositive) {
                    const masteryMult = (state.items[name].masteryLevel >= 4 ? 2 : 1) * state.items[name].masteryBoost + 1;
                    if (elem.type === 'base' || elem.type === 'bonus') {
                        value *= masteryMult;
                        if (elem.name === 'hordeDivisionShield' || elem.name === 'hordeRevive') {
                            value = Math.round(value);
                        }
                    } else if (elem.type === 'mult' && elem.value > 0) {
                        value = Math.pow(value, masteryMult);
                    } else if (elem.type === 'tag') {
                        value = value.map(el => el * masteryMult);
                    }
                }
                if (elem.type === 'tag') {
                    commit('tag/set', {name: elem.name, key: 'item_' + name, value}, {root: true});
                } else {
                    dispatch('mult/set' + capitalize(elem.type), {name: elem.name, key: 'item_' + name, value}, {root: true});
                }
            });
        },
        resetStats({ commit, dispatch }) {
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'playerBuff', value: {}});
            dispatch('updatePlayerStats');
            dispatch('updateEnemyStats');
        },
        checkZoneUnlocks({ rootState, commit, dispatch }) {
            const maxZone = rootState.stat.horde_maxZone.value;
            const maxZoneTotal = rootState.stat.horde_maxZone.total;
            if (maxZoneTotal > 1) {
                dispatch('meta/globalLevelPart', {key: 'horde_0', amount: maxZoneTotal - 1}, {root: true});
            }
            if (!rootState.unlock.hordeItems.use && maxZoneTotal > 5) {
                commit('unlock/unlock', 'hordeItems', {root: true});
            }
            if (!rootState.unlock.hordePrestige.use && maxZoneTotal > 20) {
                commit('unlock/unlock', 'hordePrestige', {root: true});
            }
            if (!rootState.unlock.hordeDamageTypes.use && maxZoneTotal > 24) {
                commit('unlock/unlock', 'hordeDamageTypes', {root: true});
            }
            if (!rootState.unlock.hordeHeirlooms.use && maxZoneTotal > 30) {
                commit('unlock/unlock', 'hordeHeirlooms', {root: true});
            }
            if (!rootState.unlock.hordeItemMastery.use && maxZoneTotal > 75) {
                commit('unlock/unlock', 'hordeItemMastery', {root: true});
            }

            // Tower unlocks
            if (!rootState.unlock.hordeBrickTower.use && maxZoneTotal >= 140) {
                commit('unlock/unlock', 'hordeBrickTower', {root: true});
                dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: HORDE_KEYS_PER_TOWER}, {root: true});
            }
            if (!rootState.unlock.hordeFireTower.use && maxZoneTotal >= 170) {
                commit('unlock/unlock', 'hordeFireTower', {root: true});
                dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: HORDE_KEYS_PER_TOWER}, {root: true});
            }
            if (!rootState.unlock.hordeIceTower.use && maxZoneTotal >= 200) {
                commit('unlock/unlock', 'hordeIceTower', {root: true});
                dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: HORDE_KEYS_PER_TOWER}, {root: true});
            }
            if (!rootState.unlock.hordeDangerTower.use && maxZoneTotal >= 245) {
                commit('unlock/unlock', 'hordeDangerTower', {root: true});
                dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: HORDE_KEYS_PER_TOWER}, {root: true});
            }
            if (!rootState.unlock.hordeToxicTower.use && maxZoneTotal >= 290) {
                commit('unlock/unlock', 'hordeToxicTower', {root: true});
                dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: HORDE_KEYS_PER_TOWER}, {root: true});
            }

            // Raise miniboss rewards
            if (maxZoneTotal >= HORDE_MINIBOSS_MIN_ZONE) {
                const zoneBase = maxZoneTotal - HORDE_MINIBOSS_MIN_ZONE;
                dispatch('mult/setBase', {name: 'currencyHordeSoulCorruptedCap', key: 'zoneClearedTotal', value: Math.round(Math.pow(1.16, zoneBase) * (zoneBase + 1) * 200)}, {root: true});
                dispatch('mult/setBase', {name: 'hordeBossRequirement', key: 'zoneClearedTotal', value: (zoneBase + 1) * -2}, {root: true});
            }
            if (maxZone >= HORDE_MINIBOSS_MIN_ZONE) {
                const zoneBase = maxZone - HORDE_MINIBOSS_MIN_ZONE;
                dispatch('mult/setBase', {name: 'currencyHordeSoulCorruptedGain', key: 'zoneCleared', value: Math.pow(1.16, zoneBase) * (zoneBase + 1)}, {root: true});
            }
            if (maxZone >= HORDE_HEIRLOOM_MIN_ZONE) {
                const zoneBase = maxZone - HORDE_HEIRLOOM_MIN_ZONE;
                dispatch('mult/setBase', {name: 'hordeHeirloomChance', key: 'zoneCleared', value: zoneBase * 0.001 + 0.01}, {root: true});
            }
        },
        getMinibossReward({ state, getters, rootGetters, commit, dispatch }, amount = 1) {
            // Get souls
            dispatch('currency/gain', {feature: 'horde', name: 'soulCorrupted', amount: amount * rootGetters['mult/get']('currencyHordeSoulCorruptedGain')}, {root: true});

            // Chance for heirloom
            if (getters.canFindHeirloom) {
                for (let i = 0; i < amount; i++) {
                    let rngGen = rootGetters['system/getRng']('horde_heirloom');
                    if (chance(rootGetters['mult/get']('hordeHeirloomChance'), rngGen())) {
                        dispatch('findHeirloom', {zone: state.zone});

                        // Finding a heirloom with help removes 1 nostalgia
                        if (rootGetters['mult/get']('hordeNostalgia') > 0) {
                            commit('updateKey', {key: 'nostalgiaLost', value: state.nostalgiaLost + 1});
                            dispatch('updateNostalgia');
                        }
                    } else if (rootGetters['mult/get']('hordeHeirloomChance') >= 0.99) {
                        commit('stat/increaseTo', {feature: 'horde', name: 'unlucky', value: 1}, {root: true});
                    }
                    commit('system/nextRng', {name: 'horde_heirloom', amount: 1}, {root: true});
                }
            }

            if (state.zone >= 75) {
                // Add item mastery
                dispatch('gainMastery', amount * HORDE_MASTERY_MINIBOSS_MULT);
            }
        },
        killEnemy({ state, rootState, getters, rootGetters, commit, dispatch }) {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            if (subfeature === 0 && state.bossFight === 0 && state.currentTower === null) {
                dispatch('currency/gain', {feature: 'horde', name: 'bone', amount: rootGetters['mult/get']('currencyHordeBoneGain', getters.currentBone, state.enemy.loot)}, {root: true});
                dispatch('findItems', 1);
            }
            if (subfeature === 1 && state.bossFight === 0) {
                dispatch('currency/gain', {feature: 'horde', name: 'blood', amount: rootGetters['mult/get']('currencyHordeBloodGain', getters.currentBlood)}, {root: true});
            }

            if (state.currentTower === null && getters.currentCorruption > 0) {
                commit('stat/increaseTo', {feature: 'horde', name: 'maxCorruptionKill', value: getters.currentCorruption}, {root: true});
            }

            // Reset some stats
            commit('updatePlayerKey', {key: 'divisionShield', value: rootGetters['mult/get']('hordeDivisionShield')});
            commit('updatePlayerKey', {key: 'hits', value: 0});
            commit('updatePlayerKey', {key: 'silence', value: 0});
            commit('updatePlayerKey', {key: 'stun', value: 0});

            const recovery = state.cachePlayerStats.recovery;
            const maxHealth = state.cachePlayerStats.health;
            const missingHealth = maxHealth - state.player.health;
            if (recovery > 0 && missingHealth > 0) {
                commit('updatePlayerKey', {key: 'health', value: Math.min(maxHealth, state.player.health + missingHealth * recovery * state.cachePlayerStats.healing)});
            }

            const manasteal = rootGetters['tag/values']('hordeManasteal')[0];
            if (state.player.mana !== undefined && state.player.mana < state.cachePlayerStats.mana && manasteal > 0) {
                dispatch('updateMana', Math.min(state.player.mana + manasteal, state.cachePlayerStats.mana));
            }

            if (state.currentTower !== null) {
                // Give tower rewards
                const tower = state.tower[state.currentTower];
                dispatch('currency/gain', {feature: 'horde', name: 'crown', amount: tower.crowns}, {root: true});
                const newFloor = state.towerFloor + 1
                commit('updateKey', {key: 'towerFloor', value: newFloor});
                if (newFloor > tower.highest) {
                    commit('updateTowerKey', {name: state.currentTower, key: 'highest', value: newFloor});
                    dispatch('applyTowerEffects');
                }
                if (newFloor % HORDE_HEIRLOOM_TOWER_FLOORS === 0) {
                    dispatch('findHeirloom', {zone: getters.currentBaseZone, heirlooms: tower.heirlooms});
                }
            } else if (state.bossFight === 1) {
                commit('updateKey', {key: 'combo', value: state.combo + 4});
                dispatch('getMinibossReward', 1);

                commit('updateKey', {key: 'minibossTimer', value: state.minibossTimer - 1});
                commit('updateKey', {key: 'bossFight', value: 0});
                commit('system/nextRng', {name: 'horde_sigilMiniboss', amount: 1}, {root: true});
            } else if (state.bossFight === 2) {
                if (subfeature === 0) {
                    // Find notes based on depth
                    const note = notes[rootState.stat.horde_maxZone.value];
                    if (note !== undefined) {
                        dispatch('note/find', note, {root: true});
                    }

                    commit('system/nextRng', {name: 'horde_sigilBoss', amount: 1}, {root: true});
                    commit('updateKey', {key: 'bossAvailable', value: false});
                    commit('updateKey', {key: 'enemyTimer', value: HORDE_ENEMY_RESPAWN_TIME * HORDE_ENEMY_RESPAWN_MAX});
                    commit('stat/increaseTo', {feature: 'horde', name: 'maxZone', value: rootState.stat.horde_maxZone.value + 1}, {root: true});
                    commit('updateKey', {key: 'zone', value: state.zone + 1});
                    // Speedrun stat
                    if (rootState.stat.horde_timeSpent.value <= 1800) {
                        commit('stat/increaseTo', {feature: 'horde', name: 'maxZoneSpeedrun', value: rootState.stat.horde_maxZone.value}, {root: true});
                    }
                    if (state.zone >= 75) {
                        // Add item mastery
                        dispatch('gainMastery', 1);
                    }
                    dispatch('checkZoneUnlocks');
                    commit('updateKey', {key: 'bossFight', value: 0});
                    dispatch('updatePlayerStats');
                } else if (subfeature === 1) {
                    const bossData = state.area[state.selectedArea].zones[state.zone];
                    const bossName = bossData.boss[bossData.boss.length - 1];
                    if ((state.bossStage + 1) >= bossData.boss.length) {
                        // Check if one of the conditions is met to give trinkets
                        let hasTrinket = false;
                        let difficulty = bossData.difficulty;
                        const classObj = state.fighterClass[state.selectedClass];
                        const questObj = classObj.questsCompleted.boss < classObj.quests.boss.length ? classObj.quests.boss[classObj.questsCompleted.boss] : null;
                        if (!rootState.unlock[bossData.reward].use) {
                            commit('unlock/unlock', bossData.reward, {root: true});
                            hasTrinket = true;
                        } else if (questObj !== null && questObj.boss === bossName && questObj.difficulty === state.bossBonusDifficulty) {
                            commit('updateClassQuestKey', {name: state.selectedClass, key: 'boss', value: classObj.questsCompleted.boss + 1});
                            dispatch('applyBattlePassEffects');
                            difficulty += state.bossBonusDifficulty;
                            hasTrinket = true;
                        } else if (state.selectedClass === 'pirate' && rootGetters['currency/value']('horde_lockpick') >= 1) {
                            dispatch('currency/spend', {feature: 'horde', name: 'lockpick', amount: 1}, {root: true});
                            difficulty += state.bossBonusDifficulty;
                            hasTrinket = true;
                        }

                        if (hasTrinket) {
                            // Get a random trinket
                            let trinkets = [];
                            let eligible = [];
                            for (const [key, elem] of Object.entries(state.trinket)) {
                                const diff = rootGetters['mult/get']('hordeTrinketQuality', difficulty) - elem.rarity;
                                if (diff >= 0 && (elem.uniqueToBoss === null || elem.uniqueToBoss === bossName) && (!elem.isTimeless || elem.level <= 0)) {
                                    eligible.push({name: key, weight: (diff * 0.1 + 1) * (elem.isTimeless ? 0.05 : 1), maxAmount: elem.isTimeless ? 1 : Math.floor(rootGetters['mult/get']('hordeTrinketGain', Math.pow(diff, 1.5) * 0.01) + 1)});
                                }
                            }
                            let rngGen = rootGetters['system/getRng']('horde_trinket');
                            for (let i = 0; i < 3; i++) {
                                if (eligible.length > 0) {
                                    const chosenId = weightSelect(eligible.map(el => el.weight), rngGen());
                                    if (chosenId !== -1) {
                                        const chosenObj = eligible[chosenId];
                                        trinkets.push({name: chosenObj.name, amount: randomInt(1, chosenObj.maxAmount, rngGen())});
                                        eligible.splice(chosenId, 1);
                                    }
                                }
                            }
                            commit('system/nextRng', {name: 'horde_trinket', amount: 1}, {root: true});
                            commit('updateKey', {key: 'trinketDrop', value: trinkets});
                        }

                        // Go back to last zone
                        commit('updateKey', {key: 'zone', value: bossData.unlockedBy[0]});
                        commit('updateKey', {key: 'bossFight', value: 0});
                        dispatch('updatePlayerStats');
                    } else {
                        commit('updateKey', {key: 'bossStage', value: state.bossStage + 1});
                    }
                }
            } else {
                commit('updateKey', {key: 'combo', value: state.combo + 1});
                if (state.enemy.loot > 0) {
                    commit('updateKey', {key: 'enemyTimer', value: state.enemyTimer - HORDE_ENEMY_RESPAWN_TIME});
                }

                // Reset zone in classes subfeature
                if (rootState.system.features.horde.currentSubfeature === 1) {
                    const maxAmount = state.area[state.selectedArea].zones[state.zone].enemyAmount;
                    if (maxAmount !== null && state.combo >= maxAmount) {
                        commit('stat/increaseTo', {feature: 'horde', name: 'maxDifficulty', value: state.area[state.selectedArea].zones[state.zone].difficulty}, {root: true});
                        commit('updateKey', {key: 'combo', value: 0});
                        dispatch('resetStats');
                        dispatch('updateMaxDifficulty');

                        // Unlock new zones
                        for (const [key, elem] of Object.entries(state.area[state.selectedArea].zones)) {
                            if (!elem.unlocked && elem.unlockedBy !== null && elem.unlockedBy.includes(state.zone)) {
                                commit('updateAreaZoneKey', {name: state.selectedArea, zone: key, key: 'unlocked', value: true});
                            }
                        }

                        // Complete zone quest
                        const classObj = state.fighterClass[state.selectedClass];
                        if (
                            classObj.questsCompleted.zone < classObj.quests.zone.length &&
                            classObj.quests.zone[classObj.questsCompleted.zone].area === state.selectedArea &&
                            classObj.quests.zone[classObj.questsCompleted.zone].zone === state.zone
                        ) {
                            commit('updateClassQuestKey', {name: state.selectedClass, key: 'zone', value: classObj.questsCompleted.zone + 1});
                            dispatch('applyBattlePassEffects');
                        }
                    }
                }
            }

            let skipStats = false;
            if (subfeature === 0 && state.zone === rootState.stat.horde_maxZone.value && !state.bossAvailable && state.combo >= getters.comboRequired) {
                commit('updateKey', {key: 'bossAvailable', value: true});
                if (rootState.system.settings.automation.items.fightHordeBoss.value) {
                    skipStats = true;
                    dispatch('fightBoss');
                }
            }

            if (!skipStats) {
                dispatch('updateEnemyStats');
            }
        },
        gainMastery({ state, getters, rootGetters, commit, dispatch }, amount = 1) {
            let updateMasteryStats = false;
            for (const [key, elem] of Object.entries(state.items)) {
                const masteryBase = getters.masteryBaseGain(key);
                if (elem.equipped && masteryBase > 0) {
                    commit('updateItemKey', {name: key, key: 'masteryPoint', value: elem.masteryPoint + rootGetters['mult/get']('hordeItemMasteryGain', masteryBase) * amount});
                    while (state.items[key].masteryPoint >= getters.masteryRequired(key, state.items[key].masteryLevel)) {
                        updateMasteryStats = true;
                        commit('updateItemKey', {name: key, key: 'masteryLevel', value: state.items[key].masteryLevel + 1});
                        if (state.items[key].masteryLevel === 4) {
                            if (elem.equipped && elem.passive) {
                                // Update passive bonus from +50% to +100% for equipped passive items
                                dispatch('applyItemEffects', key);
                            }
                            if (elem.cooldownLeft > 0) {
                                // Current cooldown gets halved
                                commit('updateItemKey', {name: key, key: 'cooldownLeft', value: Math.ceil(elem.cooldownLeft / 2)});
                            }
                        } else if (state.items[key].masteryLevel >= 5 && elem.equipped) {
                            dispatch('updateMysticalShardCap');
                        }
                    }
                }
            }
            if (updateMasteryStats) {
                let maxMastery = 0;
                let totalMastery = 0;
                for (const [, elem] of Object.entries(state.items)) {
                    if (elem.masteryLevel > maxMastery) {
                        maxMastery = elem.masteryLevel;
                    }
                    totalMastery += elem.masteryLevel;
                }
                commit('stat/increaseTo', {feature: 'horde', name: 'maxMastery', value: maxMastery}, {root: true});
                commit('stat/increaseTo', {feature: 'horde', name: 'totalMastery', value: totalMastery}, {root: true});
            }
        },
        findItems({ state, rootState, rootGetters, commit }, amount) {
            for (const [key, elem] of Object.entries(state.items)) {
                if (
                    !elem.found &&
                    state.zone >= elem.findZone &&
                    (elem.unlock === null || rootState.unlock[elem.unlock].use) &&
                    chance(rootGetters['mult/get']('hordeItemChance', elem.findChance * (1 + state.zone - elem.findZone)) * amount)
                ) {
                    commit('updateItemKey', {name: key, key: 'found', value: true});
                    if (!elem.known) {
                        commit('updateItemKey', {name: key, key: 'known', value: true});
                    }
                }
            }
        },
        useActive({ state, rootState, getters, commit, dispatch }, name) {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            let item = null;
            if (subfeature === 0) {
                item = state.items[name];
            } else if (subfeature === 1) {
                const split = name.split('_');
                if (split[0] === 'skill') {
                    item = state.fighterClass[state.selectedClass].skills[split[1]];
                } else if (split[0] === 'trinket') {
                    item = state.trinket[split[1]];
                }
            }
            const cooldownLeft = subfeature === 1 ? state.skillActive[name] : item.cooldownLeft;
            const level = subfeature === 1 ? (state.skillLevel[name.split('_')[1]] ?? 0) : item.level;
            const activeCost = item.activeCost !== undefined ? item.activeCost(level) : {};
            if (
                item &&
                (subfeature !== 0 || item.equipped) &&
                cooldownLeft <= 0 &&
                (activeCost.energy === undefined || state.player.energy >= activeCost.energy) &&
                (activeCost.mana === undefined || state.player.mana >= activeCost.mana)
            ) {
                if (item.activeType === 'utility') {
                    const cooldown = Math.ceil(item.cooldown(level) / ((subfeature === 0 && item.masteryLevel >= 4) ? 2 : 1));
                    const charges = Math.floor(logBase(2 - (cooldownLeft / cooldown), 2));

                    item.active(level).forEach(elem => {
                        let value = 0;
                        let critEffect = elem.canCrit ?? 0;
                        for (let i = 0; i < charges; i++) {
                            value += elem.value * (critEffect > 0 ? Math.pow((state.cachePlayerStats.critMult - 1) * critEffect + 1, randomRound(state.cachePlayerStats.critChance)) : 1);
                        }
                        if (elem.type === 'bone') {
                            dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: value * getters.enemyBone(rootState.stat.horde_maxZone.value, 0)}, {root: true});
                        } else if (elem.type === 'blood') {
                            dispatch('currency/gain', {feature: 'horde', name: 'blood', gainMult: true, amount: value * getters.enemyBlood(rootState.stat.horde_maxDifficulty.value, 0)}, {root: true});
                        } else if (elem.type === 'monsterPart') {
                            dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: value * getters.enemyMonsterPart(rootState.stat.horde_maxZone.value, 0)}, {root: true});
                        } else if (elem.type === 'permanentStat') {
                            const statValue = (state.itemStatMult[elem.stat] ?? 0) + value;
                            const split = elem.stat.split('_');
                            commit('updateSubkey', {name: 'itemStatMult', key: elem.stat, value: statValue});
                            dispatch('system/applyEffect', {type: split[1], name: split[0], multKey: `hordeItemPermanent`, value: statValue + (split[1] === 'mult' ? 1 : 0)}, {root: true});
                        }
                    });

                    if (activeCost.energy !== undefined) {
                        dispatch('updateEnergy', state.player.energy - activeCost.energy);
                    }
                    if (activeCost.mana !== undefined) {
                        dispatch('updateMana', state.player.mana - activeCost.mana);
                    }

                    const newCooldown = Math.ceil(cooldown * ((cooldownLeft / cooldown) - (2 - Math.pow(2, charges + 1))) / Math.pow(2, charges));
                    if (subfeature === 0) {
                        commit('updateItemKey', {name, key: 'cooldownLeft', value: newCooldown});
                    } else if (subfeature === 1) {
                        commit('updateSubkey', {name: 'skillActive', key: name, value: newCooldown});
                    }
                } else {
                    commit('updateKey', {key: 'chosenActive', value: name === state.chosenActive ? null : name});
                }
            }
        },
        upgradeItem({ state, rootGetters, commit, dispatch }, name) {
            let item = state.items[name];
            if ((item.cap === null || item.level < item.cap) && rootGetters['currency/value']('horde_monsterPart') >= item.price(item.level)) {
                dispatch('currency/spend', {feature: 'horde', name: 'monsterPart', amount: item.price(item.level)}, {root: true});
                commit('updateItemKey', {name, key: 'level', value: item.level + 1});
                if (item.equipped) {
                    dispatch('applyItemEffects', name);
                }
            }
        },
        prestige({ state, rootState, getters, rootGetters, commit, dispatch }, subfeature) {
            const currentSubfeature = rootState.system.features.horde.currentSubfeature;
            const prestigeGain = [rootState.currency.horde_soulCorrupted.value, rootGetters['mult/get']('currencyHordeCourageGain')][currentSubfeature];
            commit('stat/increaseTo', {feature: 'horde', name: 'bestPrestige' + currentSubfeature, value: prestigeGain}, {root: true});
            commit('stat/add', {feature: 'horde', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'horde', name: ['soulEmpowered', 'courage'][currentSubfeature], amount: prestigeGain}, {root: true});

            for (const [key, elem] of Object.entries(state.items)) {
                if (elem.equipped) {
                    dispatch('unequipItem', key);
                }
                if (elem.masteryLevel < 3) {
                    commit('updateItemKey', {name: key, key: 'level', value: 1});
                }
                if (elem.masteryLevel < 1) {
                    commit('updateItemKey', {name: key, key: 'found', value: elem.foundDefault});
                }
                commit('updateItemKey', {name: key, key: 'cooldownLeft', value: 0});
            }

            // Reset per-run item effects
            for (const [key] of Object.entries(state.itemStatMult)) {
                const split = key.split('_');
                dispatch('system/resetEffect', {type: split[1], name: split[0], multKey: `hordeItemPermanent`}, {root: true});
            }
            commit('updateKey', {key: 'itemStatMult', value: {}});

            dispatch('upgrade/reset', {feature: 'horde', subfeature, type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'horde', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'horde', type: 'regular'}, {root: true});

            dispatch('mult/removeKey', {name: 'currencyHordeSoulCorruptedGain', type: 'base', key: 'zoneCleared'}, {root: true});
            dispatch('mult/removeKey', {name: 'hordeHeirloomChance', type: 'base', key: 'zoneCleared'}, {root: true});

            commit('system/updateSubfeature', {key: 'horde', value: subfeature}, {root: true});

            commit('updateKey', {key: 'zone', value: subfeature === 1 ? '1' : 1});
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'respawn', value: 0});
            commit('updateKey', {key: 'maxRespawn', value: 1});
            commit('updateKey', {key: 'bossAvailable', value: false});
            commit('updateKey', {key: 'bossFight', value: 0});
            commit('updateKey', {key: 'sigilZones', value: []});
            commit('updateKey', {key: 'enemyTimer', value: HORDE_ENEMY_RESPAWN_TIME * HORDE_ENEMY_RESPAWN_MAX});
            commit('updateKey', {key: 'minibossTimer', value: 0});
            commit('updateKey', {key: 'chosenActive', value: null});
            commit('updateKey', {key: 'nostalgiaLost', value: 0});
            commit('updateKey', {key: 'currentTower', value: null});
            commit('updateKey', {key: 'towerFloor', value: 0});
            commit('updateKey', {key: 'selectedArea', value: subfeature === 1 ? 'warzone' : null});
            commit('updateKey', {key: 'playerBuff', value: {}});
            commit('updateKey', {key: 'expLevel', value: 0});
            commit('updateKey', {key: 'skillPoints', value: 0});
            commit('updateKey', {key: 'autocast', value: []});
            commit('updateKey', {key: 'bossStage', value: 0});
            dispatch('updateActiveTimer', 0);
            dispatch('updateNostalgia');

            // Apply sacrifice level
            commit('updateKey', {key: 'sacrificeLevel', value: subfeature === 0 ? state.nextSacrificeLevel : 0});
            dispatch('updateSacrifice');

            // Reset all heirloom effects in case of subfeature switch
            for (const [key] of Object.entries(state.heirloom)) {
                dispatch('applyHeirloomEffects', key);
            }

            for (const [key] of Object.entries(state.skillLevel)) {
                commit('updateSubkey', {name: 'skillLevel', key, value: 0});
                dispatch('applySkillEffects', key);
            }
            commit('updateKey', {key: 'skillLevel', value: {}});
            commit('updateKey', {key: 'skillActive', value: {}});
            for (const [key, elem] of Object.entries(state.trinket)) {
                if (elem.isActive) {
                    commit('updateTrinketKey', {name: key, key: 'isActive', value: false});
                    dispatch('removeTrinketEffects', key);
                }
                if (subfeature === 1 && elem.equipped) {
                    const fighterStats = state.fighterClass[state.nextClass].baseStats;
                    if ((!elem.needsEnergy || fighterStats.energy !== undefined) && (!elem.needsMana || fighterStats.mana !== undefined)) {
                        commit('updateTrinketKey', {name: key, key: 'isActive', value: true});
                        dispatch('applyTrinketEffects', key);
                    }
                }
            }

            // Switch classes
            if (subfeature === 1) {
                commit('updateKey', {key: 'selectedClass', value: state.nextClass});

                const skillInnate = state.fighterClass[state.nextClass].skillTree[0];
                if (skillInnate.isInnate) {
                    skillInnate.items.forEach(key => {
                        commit('updateSubkey', {name: 'skillLevel', key, value: 1});
                        dispatch('applySkillEffects', key);
                    });
                }
            }

            dispatch('applyClassEffects');
            dispatch('applyClassLevelEffects');

            dispatch('card/activateCards', 'horde', {root: true});

            dispatch('updatePlayerStats');
            dispatch('updateEnemyStats');
            dispatch('updatePlayerCache');

            const baseStats = getters.playerBaseStats;
            if (baseStats.energy !== undefined) {
                dispatch('updateEnergy', rootGetters['mult/get']('hordeEnergy', baseStats.energy));
            } else {
                dispatch('updateEnergy');
            }
            if (baseStats.mana !== undefined) {
                dispatch('updateMana', rootGetters['mult/get']('hordeMana', baseStats.mana));
            } else {
                dispatch('updateMana');
            }
        },
        findHeirloom({ state, rootGetters, commit, dispatch }, o) {
            let eligibleHeirlooms = [];
            let lowestItem = null;
            let lowestAmount = Infinity;

            if (o.heirlooms) {
                eligibleHeirlooms = o.heirlooms;
            } else {
                for (const [key, elem] of Object.entries(state.heirloom)) {
                    if (o.zone >= elem.minZone) {
                        eligibleHeirlooms.push(key);

                        if (elem.amount < lowestAmount) {
                            lowestItem = key;
                            lowestAmount = elem.amount;
                        } else if (elem.amount === lowestAmount) {
                            lowestItem = null;
                        }
                    }
                }
                // The heirloom with the lowest amount is added to the list twice
                // (but only if no other heirloom has the same amount)
                if (lowestItem !== null) {
                    eligibleHeirlooms.push(lowestItem);
                }
            }

            let rngGen = rootGetters['system/getRng']('horde_heirloomType');
            const chosen = randomElem(eligibleHeirlooms, rngGen());
            const amount = randomInt(1, rootGetters['mult/get']('hordeHeirloomAmount'), rngGen());
            commit('system/nextRng', {name: 'horde_heirloomType', amount: 1}, {root: true});
            commit('updateHeirloomKey', {name: chosen, key: 'amount', value: state.heirloom[chosen].amount + amount});
            dispatch('applyHeirloomEffects', chosen);

            let found = state.heirloomsFound !== null ? {...state.heirloomsFound} : {};
            if (found[chosen] === undefined) {
                found[chosen] = 0;
            }
            found[chosen] += amount;
            commit('updateKey', {key: 'heirloomsFound', value: found});
        },
        applyHeirloomEffects({ state, rootState, rootGetters, dispatch }, name) {
            const subfeature = rootState.system.features.horde.currentSubfeature;
            if (state.heirloom[name].amount > 0) {
                state.heirloom[name].effect.forEach(eff => {
                    if (subfeature === 0) {
                        dispatch('system/applyEffect', {
                            type: eff.type,
                            name: eff.name,
                            multKey: `hordeHeirloom_${name}`,
                            value: eff.value(rootGetters['mult/get'](`${ name }HeirloomEffect`, state.heirloom[name].amount))
                        }, {root: true});
                    } else {
                        dispatch('system/resetEffect', {
                            type: eff.type,
                            name: eff.name,
                            multKey: `hordeHeirloom_${name}`
                        }, {root: true});
                    }
                });
            }
        },
        toggleItemPassive({ state, commit, dispatch }, name) {
            commit('updateItemKey', {name, key: 'passive', value: !state.items[name].passive});
            if (state.items[name].equipped) {
                dispatch('applyItemEffects', name);
                dispatch('resetStats');
            }
        },
        applyPermanentEffects({ state, dispatch }) {
            for (const [key, elem] of Object.entries(state.itemStatMult)) {
                const split = key.split('_');
                dispatch('system/applyEffect', {type: split[1], name: split[0], multKey: `hordeItemPermanent`, value: elem + (split[1] === 'mult' ? 1 : 0)}, {root: true});
            }
        },
        applyTowerEffects({ state, dispatch }) {
            for (const [name, tower] of Object.entries(state.tower)) {
                for (const [floor, reward] of Object.entries(tower.reward)) {
                    if (tower.highest >= parseInt(floor)) {
                        dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `hordeTower_${ name }_${ floor }`, value: reward.value, trigger: true}, {root: true});
                    }
                }
            }
        },
        unequipAll({ state, dispatch }) {
            for (const [key, elem] of Object.entries(state.items)) {
                if (elem.equipped) {
                    dispatch('unequipItem', key);
                }
            }
        },
        equipLoadout({ state, getters, rootGetters, dispatch }, index) {
            const loadout = state.loadout[index];
            let freeSlots = rootGetters['mult/get']('hordeMaxItems') - getters.itemsEquipped;
            if (loadout) {
                loadout.content.forEach(name => {
                    const item = state.items[name];
                    if (freeSlots > 0 && item && !item.equipped && item.found) {
                        dispatch('equipItem', name);
                        freeSlots--;
                    }
                });
            }
        },
        unequipLoadout({ state, dispatch }, index) {
            const loadout = state.loadout[index];
            if (loadout) {
                loadout.content.forEach(name => {
                    dispatch('unequipItem', name);
                });
            }
        },
        updateNostalgia({ state, dispatch }) {
            if (state.nostalgiaLost > 0) {
                dispatch('mult/setBonus', {name: 'hordeNostalgia', key: 'hordeNostalgiaLost', value: 0 - state.nostalgiaLost}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'hordeNostalgia', type: 'bonus', key: 'hordeNostalgiaLost'}, {root: true});
            }
        },
        enterTower({ rootGetters, commit, dispatch }, name) {
            if (rootGetters['currency/value']('horde_towerKey') >= 1) {
                dispatch('currency/spend', {feature: 'horde', name: 'towerKey', amount: 1}, {root: true});
                commit('updateKey', {key: 'combo', value: 0});
                commit('updateKey', {key: 'bossFight', value: 0});
                commit('updateKey', {key: 'currentTower', value: name});
                commit('updateKey', {key: 'towerFloor', value: 0});
                dispatch('resetStats');
            }
        },
        updatePlayerCache({ state, rootState, getters, rootGetters, commit, dispatch }) {
            const subfeature = rootState.system.features.horde.currentSubfeature;

            let stats = [
                // Offense
                'attack', 'critChance', 'critMult', 'toxic', 'firstStrike', 'spellblade', 'cutting', 'shieldbreak', 'execute',

                // Defense
                'health', 'revive', 'divisionShield', 'stunResist', 'recovery', 'defense', 'healing',

                // Damage types
                'physicConversion', 'magicConversion', 'bioConversion', 'physicAttack', 'magicAttack', 'bioAttack', 'physicTaken', 'magicTaken', 'bioTaken',

                // Horde 2 stuff
                'strength', 'intelligence', 'haste',
            ];
            if (subfeature === 1) {
                stats.push('mana', 'manaRegen', 'energy', 'energyRegen');
            }

            // Convert stats to cache object
            let cache = {};
            let cacheObj = {};
            stats.forEach(name => {
                cache[name] = {name: `horde${ capitalize(name) }`, base: 0, mult: 1, bonus: 0};
            });
            for (const [name, value] of Object.entries(getters.playerBaseStats)) {
                cache[name].base += value;
            }
            cache.critMult.bonus = 1;

            // Apply buffs
            for (const [, buff] of Object.entries(state.playerBuff)) {
                buff.effect.forEach(effect => {
                    const name = decapitalize(effect.name.slice(5));
                    if (effect.type === 'mult') {
                        cache[name].mult *= effect.value;
                    } else {
                        cache[name][effect.type] += effect.value;
                    }
                });
            }

            // Calculate caches
            for (const [name, elem] of Object.entries(cache)) {
                cacheObj[name] = rootGetters['mult/get'](elem.name, elem.base, elem.mult, elem.bonus);
            }

            // Turn conversion values into percentages
            const conversionTotal = cacheObj.physicConversion + cacheObj.magicConversion + cacheObj.bioConversion;
            cacheObj.physicConversion /= conversionTotal;
            cacheObj.magicConversion /= conversionTotal;
            cacheObj.bioConversion /= conversionTotal;

            commit('updateKey', {key: 'cachePlayerStats', value: cacheObj});

            // Check quests
            if (subfeature === 1) {
                const classObj = state.fighterClass[state.selectedClass];
                const questObj = classObj.quests.stat[classObj.questsCompleted.stat];
                if (classObj.questsCompleted.stat < classObj.quests.stat.length) {
                    let current = 0;
                    switch (questObj.type) {
                        case 'base':
                            current = (cache[decapitalize(questObj.stat.slice(5))].base ?? 0) + (rootState.mult.items[questObj.stat].baseCache ?? 0);
                            break;
                        case 'total':
                            current = cacheObj[decapitalize(questObj.stat.slice(5))] ?? 0;
                            break;
                    }

                    if (current >= questObj.value) {
                        commit('updateClassQuestKey', {name: state.selectedClass, key: 'stat', value: classObj.questsCompleted.stat + 1});
                        dispatch('applyBattlePassEffects');
                    }
                }
            }
        },
        updateEnemyCache({ commit }) {
            let cache = {};
            commit('updateKey', {key: 'cacheEnemyStats', value: cache});
        },
        addBuff({ commit, dispatch }, o) {
            commit('updateSubkey', {name: 'playerBuff', key: o.name, value: {time: o.time, maxTime: o.time, positive: o.positive ?? false, effect: o.effect}});
            dispatch('updatePlayerCache');
        },
        applySkillEffects({ state, commit, dispatch }, name) {
            const skill = state.fighterClass[state.selectedClass].skills[name];
            const skillLevel = state.skillLevel[name] ?? 0;
            if (skill.type === 'active') {
                if (skillLevel > 0 && state.skillActive[name] === undefined) {
                    commit('updateSubkey', {name: 'skillActive', key: `skill_${ name }`, value: 0});
                }
            } else {
                skill.effect.forEach(eff => {
                    if (skillLevel > 0) {
                        dispatch('system/applyEffect', {
                            type: eff.type,
                            name: eff.name,
                            multKey: `hordeSkill_${name}`,
                            value: eff.value(skillLevel)
                        }, {root: true});
                    } else {
                        dispatch('system/resetEffect', {
                            type: eff.type,
                            name: eff.name,
                            multKey: `hordeSkill_${name}`
                        }, {root: true});
                    }
                });
            }
        },
        upgradeSkill({ state, commit, dispatch }, name) {
            const skill = state.fighterClass[state.selectedClass].skills[name];
            const skillLevel = state.skillLevel[name] ?? 0;
            if (skillLevel < skill.max && state.skillPoints >= skill.cost) {
                commit('updateKey', {key: 'skillPoints', value: state.skillPoints - skill.cost});
                commit('updateSubkey', {name: 'skillLevel', key: name, value: skillLevel + 1});
                dispatch('applySkillEffects', name);
            }
        },
        applyClassEffects({ state, dispatch }) {
            const value = state.fighterClass[state.selectedClass].courageMult;
            if (value !== 1) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeCourageGain',
                    multKey: `hordeClassMult`,
                    value: value
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'mult',
                    name: 'currencyHordeCourageGain',
                    multKey: `hordeClassMult`
                }, {root: true});
            }
        },
        applyClassLevelEffects({ state, getters, dispatch }) {
            const level = Math.floor(state.expLevel);
            getters.classLevelEffect(level).forEach(effect => {
                if (level > 0) {
                    dispatch('system/applyEffect', {
                        type: effect.type,
                        name: effect.name,
                        multKey: `hordeClassLevel`,
                        value: effect.value
                    }, {root: true});
                } else {
                    dispatch('system/resetEffect', {
                        type: effect.type,
                        name: effect.name,
                        multKey: `hordeClassLevel`
                    }, {root: true});
                }
            });
        },
        applyBattlePassEffects({ state, getters, dispatch }) {
            const level = getters.battlePassCurrentLevel;
            if (level > 0) {
                dispatch('meta/globalLevelPart', {key: 'horde_1', amount: level}, {root: true});
            }
            for (const [key, elem] of Object.entries(state.battlePassEffect)) {
                if (level >= parseInt(key)) {
                    elem.effect.forEach(effect => {
                        dispatch('system/applyEffect', {
                            type: effect.type,
                            name: effect.name,
                            multKey: `hordeBattlePass_${ key }`,
                            value: effect.value
                        }, {root: true});
                    });
                }
            }
            const finalLevel = level - Object.keys(state.battlePassEffect).filter(elem => level >= parseInt(elem)).length;
            if (finalLevel >= 1) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'hordeAttack',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_COMBAT_REWARD, Math.floor((finalLevel + 2) / 3))
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'hordeHealth',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_COMBAT_REWARD, Math.floor((finalLevel + 2) / 3))
                }, {root: true});
            }
            if (finalLevel >= 2) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeBoneGain',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_LOOT_REWARD, Math.floor((finalLevel + 1) / 3))
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeBloodGain',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_LOOT_REWARD, Math.floor((finalLevel + 1) / 3))
                }, {root: true});
            }
            if (finalLevel >= 3) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeSoulCorruptedGain',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, Math.floor(finalLevel / 3))
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeCourageGain',
                    multKey: `hordeBattlePass`,
                    value: Math.pow(BATTLE_PASS_PRESTIGE_REWARD, Math.floor(finalLevel / 3))
                }, {root: true});
            }
        },
        updateEnergy({ state, rootGetters, commit, dispatch }, amount = null) {
            if (amount !== null) {
                commit('updatePlayerKey', {key: 'energy', value: amount});
            } else {
                amount = state.player.energy;
            }
            if (amount === null || amount === undefined) {
                amount = 0;
            }
            const value = amount * rootGetters['tag/values']('hordeEnergyToStr')[0];
            if (value > 0) {
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'hordeStrength',
                    multKey: `hordeEnergy`,
                    value
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'hordeStrength',
                    multKey: `hordeEnergy`
                }, {root: true});
            }
            const value2 = (state.cachePlayerStats.energy - amount) * rootGetters['tag/values']('hordeEnergyToEnergyReg')[0];
            if (value2 > 0) {
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'hordeEnergyRegen',
                    multKey: `hordeEnergy`,
                    value: value2
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'hordeEnergyRegen',
                    multKey: `hordeEnergy`
                }, {root: true});
            }
        },
        updateMana({ state, commit }, amount = null) {
            if (amount !== null) {
                commit('updatePlayerKey', {key: 'mana', value: amount});
            } else {
                amount = state.player.mana;
            }
        },
        updateActiveTimer({ rootGetters, commit, dispatch }, amount) {
            commit('updateKey', {key: 'activeTimer', value: amount});

            const values = rootGetters['tag/values']('hordeManaRest');
            if (amount >= values[0] && values[1] > 0) {
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'hordeManaRegen',
                    multKey: `hordeRest`,
                    value: values[1]
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'hordeManaRegen',
                    multKey: `hordeRest`
                }, {root: true});
            }
        },
        updateMaxDifficulty({ rootState, dispatch }) {
            const level = rootState.stat.horde_maxDifficulty.value;
            if (level > 0) {
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'currencyHordeCourageGain',
                    multKey: `hordeMaxDifficulty`,
                    value: Math.pow(1.125, level)
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'mult',
                    name: 'currencyHordeCourageGain',
                    multKey: `hordeMaxDifficulty`
                }, {root: true});
            }
        },
        updateMysticalShardCap({ state, dispatch }) {
            let value = 0;
            for (const [, elem] of Object.entries(state.items)) {
                if (elem.equipped && elem.masteryLevel >= 5) {
                    value += (elem.masteryLevel - 5) * HORDE_SHARD_INCREMENT + HORDE_SHARD_PER_EQUIP;
                }
            }
            if (value > 0) {
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'currencyHordeMysticalShardCap',
                    multKey: `hordeMastery`,
                    value
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'currencyHordeMysticalShardCap',
                    multKey: `hordeMastery`
                }, {root: true});
            }
        },
        updateSacrifice({ state, getters, dispatch }) {
            const stats = getters.sacrificeEffectAtLevel(state.sacrificeLevel);
            if (state.sacrificeLevel > 0) {
                stats.forEach(elem => {
                    dispatch('system/applyEffect', {
                        type: elem.type,
                        name: elem.name,
                        multKey: `hordeSacrifice`,
                        value: elem.value
                    }, {root: true});
                });
            } else {
                stats.forEach(elem => {
                    dispatch('system/resetEffect', {
                        type: elem.type,
                        name: elem.name,
                        multKey: `hordeSacrifice`
                    }, {root: true});
                });
            }
        },
        toggleAutocast({ state, rootGetters, commit }, name) {
            if (state.autocast.includes(name)) {
                commit('updateKey', {key: 'autocast', value: state.autocast.filter(el => el !== name)});
            } else if (state.autocast.length < rootGetters['mult/get']('hordeAutocast')) {
                commit('updateKey', {key: 'autocast', value: [...state.autocast, name]});
            }
        },
        findTrinket({ state, commit }, index) {
            const chosen = state.trinketDrop[index];
            if (chosen) {
                const chosenTrinket = state.trinket[chosen.name];
                const newAmount = chosenTrinket.amount + chosen.amount;
                commit('updateTrinketKey', {name: chosen.name, key: 'amount', value: newAmount});
                const newLevel = state.trinketAmountNeeded.filter(el => newAmount >= el).length;
                if (newLevel > chosenTrinket.level) {
                    commit('updateTrinketKey', {name: chosen.name, key: 'level', value: newLevel});
                }
            }
            commit('updateKey', {key: 'trinketDrop', value: null});
        },
        applyTrinketEffects({ state, commit, dispatch }, name) {
            state.trinket[name].effect.forEach(elem => {
                dispatch('mult/set' + capitalize(elem.type), {name: elem.name, key: 'trinket_' + name, value: elem.value(state.trinket[name].level)}, {root: true});
            });
            if (state.trinket[name].activeType !== null) {
                commit('updateSubkey', {name: 'skillActive', key: `trinket_${ name }`, value: 0});
            }
        },
        removeTrinketEffects({ state, dispatch }, name) {
            state.trinket[name].effect.forEach(elem => {
                dispatch('mult/removeKey', {name: elem.name, key: 'trinket_' + name, type: elem.type}, {root: true});
            });
        },
        useManaPotion({ state, rootGetters, dispatch }) {
            if (rootGetters['consumable/canAfford']('horde_manaPotion')) {
                dispatch('updateMana', Math.min(state.player.mana + state.cachePlayerStats.mana * 0.5, state.cachePlayerStats.mana));
                dispatch('consumable/use', 'horde_manaPotion', {root: true});
            }
        }
    }
}
