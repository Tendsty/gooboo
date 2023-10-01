import Vue from "vue";
import { HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_MONSTER_PART_MIN_COMBO, HORDE_MONSTER_PART_MIN_ZONE, HORDE_NOSTALGIA_REMOVE, HORDE_SHARD_INCREMENT, HORDE_SHARD_PER_EQUIP, SECONDS_PER_HOUR } from "../js/constants";
import { buildNum, capitalize, decapitalize } from "../js/utils/format";
import { chance, randomElem, randomInt } from "../js/utils/random";

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
    59: 'horde_22',
    67: 'horde_23',
    75: 'horde_24',
    78: 'horde_25',
    84: 'horde_26',
    90: 'horde_27',
    96: 'horde_28',
    100: 'horde_29',
    107: 'horde_30',
};

export default {
    namespaced: true,
    state: {
        zone: 1,
        combo: 0,
        respawn: 0,
        maxRespawn: 1,
        bossAvailable: false,
        bossFight: false,
        player: {},
        enemy: {},
        items: {},
        sigil: {},
        sigilZones: [],
        heirloom: {},
        heirloomsFound: null,
        nostalgia: 0,
        itemAttackMult: 0,
        itemHealthMult: 0,
        fightTime: 0,
        fightRampage: 0,
        loadout: [],
        nextLoadoutId: 1
    },
    getters: {
        enemyStats: () => (zone, combo = 0) => {
            return {
                attack: Math.pow(2.1, zone) * Math.pow(HORDE_COMBO_ATTACK, combo) * 2,
                health: Math.pow(2.1, zone) * Math.pow(HORDE_COMBO_HEALTH, combo) * 50,
                critChance: 0,
                critMult: 0.5,
                revive: 0,
                toxic: 0,
                firstStrike: 0,
                cutting: 0,
                divisionShield: 0,

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
            return Math.pow(2.5, zone) * (combo * HORDE_COMBO_BONE + 1) * 30;
        },
        enemyMonsterPart: () => (zone) => {
            return Math.pow(1.1, zone - 10) * 0.2;
        },
        enemySoulChance: (state, getters, rootState, rootGetters) => (zone, isBase = false) => {
            if (zone < 20) {
                return 0;
            } else {
                const baseValue = 0.7 - zone * 0.005;
                if (isBase) {
                    return baseValue;
                }
                return Math.min(1, Math.max(0, rootGetters['mult/get']('hordeSoulChance', baseValue)));
            }
        },
        enemySoulAmount: (state, getters, rootState, rootGetters) => (zone, isBase = false) => {
            const zoneBase = zone - 20;
            if (zoneBase < 0) {
                return 0;
            } else {
                const baseValue = Math.pow(1.16, zoneBase);
                if (isBase) {
                    return baseValue;
                }
                return rootGetters['mult/get']('hordeSoulGain', baseValue);
            }
        },
        enemyHeirloomChance: (state, getters, rootState, rootGetters) => (zone) => {
            if (zone < 30) {
                return 0;
            } else {
                return rootGetters['mult/get']('hordeHeirloomChance', getters.enemyHeirloomChanceNostalgia + getters.enemyHeirloomChanceBase(zone));
            }
        },
        enemyHeirloomChanceNostalgia: (state) => {
            return Math.min(state.nostalgia / buildNum(100, 'K'));
        },
        enemyHeirloomChanceBase: () => (zone) => {
            return 0.08 - zone * 0.001;
        },
        enemyCorruption: (state, getters, rootState, rootGetters) => (zone) => {
            return rootGetters['mult/get']('hordeCorruption', getters.enemyCorruptionBase(zone));
        },
        enemyCorruptionBase: () => (zone) => {
            return Math.max(0, (zone - 40) * 0.1);
        },
        currentBone: (state, getters) => {
            return getters.enemyBone(state.zone, state.combo);
        },
        currentMonsterPart: (state, getters) => {
            return getters.enemyMonsterPart(state.zone);
        },
        currentSoulChance: (state, getters) => {
            return getters.enemySoulChance(state.zone, false);
        },
        currentSoulChanceBase: (state, getters) => {
            return getters.enemySoulChance(state.zone, true);
        },
        currentSoulAmount: (state, getters) => {
            return getters.enemySoulAmount(state.zone, false);
        },
        currentSoulAmountBase: (state, getters) => {
            return getters.enemySoulAmount(state.zone, true);
        },
        currentSoulMult: (state, getters, rootState) => {
            return Math.min(Math.pow(rootState.stat.horde_timeSpent.value / SECONDS_PER_HOUR + 1, 0.5) * 0.45 - 0.35, 1);
        },
        currentHeirloomChance: (state, getters) => {
            return getters.enemyHeirloomChance(state.zone);
        },
        currentCorruption: (state, getters) => {
            return getters.enemyCorruption(state.zone);
        },
        currentCorruptionBase: (state, getters) => {
            return getters.enemyCorruptionBase(state.zone);
        },
        currentCorruptionStats: (state, getters) => {
            const corruption = getters.currentCorruption;
            let stats = {};

            if (corruption > 0) {
                stats.power = 1.2 * Math.pow(0.005 * corruption + 1.01, corruption * 100);
            }
            if (corruption >= 0.5) {
                stats.sigil = Math.floor(corruption * 2);
            }
            if (corruption >= 1.25) {
                stats.revive = Math.floor(corruption / 1.25);
            }

            return stats;
        },
        currentSigils: (state) => {
            return Math.max(0, Math.floor((state.zone - 20) / 30 + 1));
        },
        currentSigilVariety: (state) => {
            let amount = 0;
            [20, 30, 70, 150].forEach(elem => {
                if (state.zone >= elem) {
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
            return state.zone * 3 + 12;
        },
        maxMysticalShards: (state) => {
            let i = 0;
            for (const [, elem] of Object.entries(state.items)) {
                if (elem.equipped && elem.masteryLevel >= 5) {
                    i += (elem.masteryLevel - 5) * HORDE_SHARD_INCREMENT + HORDE_SHARD_PER_EQUIP;
                }
            }
            return i;
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updatePlayerKey(state, o) {
            Vue.set(state.player, o.key, o.value);
        },
        updateEnemyKey(state, o) {
            Vue.set(state.enemy, o.key, o.value);
        },
        updateItemKey(state, o) {
            Vue.set(state.items[o.name], o.key, o.value);
        },
        updateHeirloomKey(state, o) {
            Vue.set(state.heirloom[o.name], o.key, o.value);
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
                cooldown: o.cooldown,
                cooldownLeft: 0,
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
                stats: o.stats ?? (() => {return {};}),
                exclude: o.exclude ?? []
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
            commit('updateKey', {key: 'bossFight', value: false});
            commit('updateKey', {key: 'sigilZones', value: []});
            commit('updateKey', {key: 'heirloomsFound', value: null});
            commit('updateKey', {key: 'nostalgia', value: 0});
            commit('updateKey', {key: 'itemAttackMult', value: 0});
            commit('updateKey', {key: 'itemHealthMult', value: 0});
            commit('updateKey', {key: 'fightTime', value: 0});
            commit('updateKey', {key: 'fightRampage', value: 0});
            commit('updateKey', {key: 'loadout', value: []});
            commit('updateKey', {key: 'nextLoadoutId', value: 1});

            commit('updateKey', {key: 'player', value: {}});
            commit('updateKey', {key: 'enemy', value: {}});

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
        },
        initHeirloom({ commit }, o) {
            commit('initHeirloom', o);
            commit('mult/init', {name: `${ o.name }HeirloomEffect`, type: 'heirloomEffect'}, {root: true});
        },
        updatePlayerStats({ rootGetters, commit }) {
            commit('updatePlayerKey', {key: 'health', value: rootGetters['mult/get']('hordeHealth')});
            commit('updatePlayerKey', {key: 'revive', value: rootGetters['mult/get']('hordeRevive')});
            commit('updatePlayerKey', {key: 'divisionShield', value: rootGetters['mult/get']('hordeDivisionShield')});
            commit('updatePlayerKey', {key: 'poison', value: 0});
            commit('updatePlayerKey', {key: 'hits', value: 0});
            commit('updatePlayerKey', {key: 'spells', value: 0});
        },
        updateEnemyStats({ state, getters, commit }) {
            let stats = getters.enemyStats(state.zone, state.combo);
            const corruptionStats = getters.currentCorruptionStats;

            if (corruptionStats.power !== undefined) {
                stats.attack *= corruptionStats.power;
                stats.health *= corruptionStats.power;
            }
            if (corruptionStats.revive !== undefined) {
                stats.revive += corruptionStats.revive;
            }

            // update sigil zones
            while (state.sigilZones.length < state.zone) {
                let sigils = [];
                let sigilsAvailable = [];
                for (const [key, elem] of Object.entries(state.sigil)) {
                    if (state.zone >= elem.minZone) {
                        sigilsAvailable.push(key);
                    }
                }

                let amt = getters.currentSigilVariety;
                while (amt > 0 && sigilsAvailable.length > 0) {
                    const newSigil = randomElem(sigilsAvailable);
                    sigils.push(newSigil);
                    sigilsAvailable = sigilsAvailable.filter(sigil => sigil !== newSigil && !state.sigil[newSigil].exclude.includes(sigil));
                    amt--;
                }

                commit('addSigilZone', sigils);
            }

            let amt = getters.currentSigils + (corruptionStats.sigil ?? 0);
            let sigil = {};
            if (state.sigilZones[state.zone - 1].length > 0) {
                while (amt > 0) {
                    const chosen = randomElem(state.sigilZones[state.zone - 1]);
                    if (sigil[chosen]) {
                        sigil[chosen]++;
                    } else {
                        sigil[chosen] = 1;
                    }
                    amt--;
                }
            }

            if (state.bossFight) {
                stats.attack *= Math.pow(1.01, state.zone) * 15;
                stats.health *= Math.pow(1.012, state.zone) * 15;
                stats.bioTaken /= 10;
            }

            for (const [key, elem] of Object.entries(sigil)) {
                for (const [stat, obj] of Object.entries(state.sigil[key].stats(elem))) {
                    if (obj.type === 'mult') {
                        stats[stat] *= obj.amount;
                    } else {
                        stats[stat] += obj.amount;
                    }
                }
            }

            for (const [key, elem] of Object.entries(stats)) {
                commit('updateEnemyKey', {key, value: elem});
            }
            commit('updateEnemyKey', {key: 'maxHealth', value: stats.health});
            commit('updateEnemyKey', {key: 'maxRevive', value: stats.revive});
            commit('updateEnemyKey', {key: 'maxDivisionShield', value: stats.divisionShield});
            commit('updateEnemyKey', {key: 'stun', value: 0});
            commit('updateEnemyKey', {key: 'poison', value: 0});
            commit('updateEnemyKey', {key: 'hits', value: 0});
            commit('updateEnemyKey', {key: 'sigil', value: sigil});

            commit('updateKey', {key: 'fightTime', value: 0});
            commit('updateKey', {key: 'fightRampage', value: 0});
        },
        fightBoss({ commit, dispatch }) {
            commit('updateKey', {key: 'bossFight', value: true});

            dispatch('resetStats');
        },
        stopFightBoss({ commit, dispatch }) {
            commit('updateKey', {key: 'bossFight', value: false});

            dispatch('resetStats');
        },
        updateZone({ rootState, commit, dispatch }, zone) {
            commit('updateKey', {key: 'zone', value: Math.min(zone, rootState.stat.horde_maxZone.value)});
            commit('updateKey', {key: 'bossFight', value: false});

            dispatch('resetStats');
        },
        equipItem({ state, getters, rootGetters, commit, dispatch }, name) {
            if (state.items[name] && !state.items[name].equipped && getters.itemsEquipped < rootGetters['mult/get']('hordeMaxItems')) {
                commit('updateItemKey', {name, key: 'equipped', value: true});
                dispatch('applyItemEffects', name);
                dispatch('resetStats');
                commit('stat/increaseTo', {feature: 'horde', name: 'maxItems', value: getters.itemsEquipped}, {root: true});
            }
        },
        unequipItem({ state, commit, dispatch }, name) {
            if (state.items[name]?.equipped) {
                commit('updateItemKey', {name, key: 'equipped', value: false});

                state.items[name].stats(state.items[name].level).forEach(elem => {
                    dispatch('mult/removeKey', {name: elem.name, key: 'item_' + name, type: elem.type}, {root: true});
                });

                dispatch('resetStats');
            }
        },
        applyItemEffects({ state, dispatch }, name) {
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
                    }
                }
                dispatch('mult/set' + capitalize(elem.type), {name: elem.name, key: 'item_' + name, value}, {root: true});
            });
        },
        resetStats({ commit, dispatch }) {
            commit('updateKey', {key: 'combo', value: 0});
            dispatch('updatePlayerStats');
            dispatch('updateEnemyStats');
        },
        checkZoneUnlocks({ rootState, commit, dispatch }) {
            const maxZone = rootState.stat.horde_maxZone.value;
            if (maxZone > 1) {
                dispatch('meta/globalLevelPart', {key: 'horde_0', amount: maxZone - 1}, {root: true});
                dispatch('mult/setMult', {name: 'currencyHordeBoneCap', key: 'zoneCleared', value: Math.pow(2, maxZone - 1)}, {root: true});
            }
            if (!rootState.unlock.hordeItems.use && maxZone > 5) {
                commit('unlock/unlock', 'hordeItems', {root: true});
            }
            if (!rootState.unlock.hordePrestige.use && maxZone > 20) {
                commit('unlock/unlock', 'hordePrestige', {root: true});
            }
            if (!rootState.unlock.hordeDamageTypes.use && maxZone > 24) {
                commit('unlock/unlock', 'hordeDamageTypes', {root: true});
            }
            if (!rootState.unlock.hordeHeirlooms.use && maxZone > 30) {
                commit('unlock/unlock', 'hordeHeirlooms', {root: true});
            }
            if (!rootState.unlock.hordeItemMastery.use && maxZone > 75) {
                commit('unlock/unlock', 'hordeItemMastery', {root: true});
            }
        },
        killEnemy({ state, rootState, getters, rootGetters, commit, dispatch }) {
            dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: getters.currentBone * state.enemy.loot}, {root: true});

            if (state.zone >= HORDE_MONSTER_PART_MIN_ZONE && state.combo >= HORDE_MONSTER_PART_MIN_COMBO) {
                dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: getters.currentMonsterPart * state.enemy.loot}, {root: true});
            }

            dispatch('findItems', 1);

            // Reset some stats
            commit('updatePlayerKey', {key: 'divisionShield', value: rootGetters['mult/get']('hordeDivisionShield')});
            commit('updatePlayerKey', {key: 'hits', value: 0});

            const recovery = rootGetters['mult/get']('hordeRecovery');
            const missingHealth = rootGetters['mult/get']('hordeHealth') - state.player.health;
            if (recovery > 0 && missingHealth > 0) {
                commit('updatePlayerKey', {key: 'health', value: Math.min(rootGetters['mult/get']('hordeHealth'), state.player.health + missingHealth * recovery)});
            }

            if (state.bossFight) {
                // Find notes based on depth
                const note = notes[rootState.stat.horde_maxZone.value];
                if (note !== undefined) {
                    dispatch('note/find', note, {root: true});
                }
                if (chance(getters.currentSoulChance, rootGetters['system/nextRng']('horde_soul')[0])) {
                    dispatch('currency/gain', {feature: 'horde', name: 'soulCorrupted', amount: getters.currentSoulAmount}, {root: true});
                } else if (getters.currentSoulChance >= 0.99) {
                    commit('stat/increaseTo', {feature: 'horde', name: 'unlucky', value: 1}, {root: true});
                }
                if (chance(getters.currentHeirloomChance, rootGetters['system/nextRng']('horde_heirloom')[0])) {
                    dispatch('findHeirloom', state.zone);

                    // Finding a heirloom halves nostalgia value
                    commit('updateKey', {key: 'nostalgia', value: state.nostalgia * (1 - HORDE_NOSTALGIA_REMOVE)});
                } else if (getters.currentHeirloomChance >= 0.99) {
                    commit('stat/increaseTo', {feature: 'horde', name: 'unlucky', value: 1}, {root: true});
                }
                commit('system/takeRng', 'horde_soul', {root: true});
                commit('system/takeRng', 'horde_heirloom', {root: true});
                if (state.zone >= 75) {
                    // Add item mastery
                    let updateMasteryStats = false;
                    for (const [key, elem] of Object.entries(state.items)) {
                        const masteryBase = state.zone - elem.findZone - 24;
                        if (elem.equipped && masteryBase > 0) {
                            commit('updateItemKey', {name: key, key: 'masteryPoint', value: elem.masteryPoint + rootGetters['mult/get']('hordeItemMasteryGain', masteryBase)});
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
                }
                commit('updateKey', {key: 'bossFight', value: false});
                commit('updateKey', {key: 'bossAvailable', value: false});
                commit('stat/increaseTo', {feature: 'horde', name: 'maxZone', value: rootState.stat.horde_maxZone.value + 1}, {root: true});
                commit('updateKey', {key: 'zone', value: state.zone + 1});
                // Speedrun stat
                if (rootState.stat.horde_timeSpent.value <= 1800) {
                    commit('stat/increaseTo', {feature: 'horde', name: 'maxZoneSpeedrun', value: rootState.stat.horde_maxZone.value}, {root: true});
                }
                dispatch('updatePlayerStats');
                dispatch('checkZoneUnlocks');
            } else {
                commit('updateKey', {key: 'combo', value: state.combo + 1});
            }

            let skipStats = false;
            if (state.zone === rootState.stat.horde_maxZone.value && !state.bossAvailable && state.combo >= getters.comboRequired) {
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
        useActive({ state, rootState, getters, rootGetters, commit, dispatch }, name) {
            if (state.items[name].equipped && state.items[name].cooldownLeft <= 0) {
                let kill = false;

                state.items[name].active(state.items[name].level).forEach(elem => {
                    if (state.respawn <= 0 || elem.type === 'bone') {
                        if (elem.type === 'heal') {
                            commit('updatePlayerKey', {key: 'health', value: Math.min(rootGetters['mult/get']('hordeHealth'), state.player.health + rootGetters['mult/get']('hordeHealth') * elem.value)});
                        } else if (elem.type === 'bone') {
                            dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: elem.value * getters.enemyBone(rootState.stat.horde_maxZone.value, 0)}, {root: true});
                        } else if (elem.type === 'stun') {
                            commit('updateEnemyKey', {key: 'stun', value: state.enemy.stun + elem.value});
                        } else if (elem.type === 'revive') {
                            commit('updatePlayerKey', {key: 'revive', value: Math.min(rootGetters['mult/get']('hordeRevive'), state.player.revive + elem.value)});
                        } else if (elem.type === 'removeAttack') {
                            commit('updateEnemyKey', {key: 'attack', value: Math.max(0, state.enemy.attack * (1 - elem.value))});
                        } else if (elem.type === 'poison') {
                            const damage = elem.value * rootGetters['mult/get']('hordeAttack') * rootGetters['mult/get'](`hordeBioAttack`) * state.enemy.bioTaken;
                            commit('updateEnemyKey', {key: 'poison', value: damage / (state.enemy.divisionShield + 1) + state.enemy.poison});
                            if (state.enemy.divisionShield > 0) {
                                commit('updateEnemyKey', {key: 'divisionShield', value: state.enemy.divisionShield - 1});
                            }
                        } else if (elem.type === 'antidote') {
                            commit('updatePlayerKey', {key: 'poison', value: state.player.poison * (1 - elem.value)});
                        } else if (elem.type === 'permanentAttack') {
                            commit('updateKey', {key: 'itemAttackMult', value: state.itemAttackMult + elem.value});
                            dispatch('applyPermanentEffects');
                        } else if (elem.type === 'permanentHealth') {
                            commit('updateKey', {key: 'itemHealthMult', value: state.itemHealthMult + elem.value});
                            dispatch('applyPermanentEffects');
                        } else if (elem.type.substring(0, 6) === 'damage') {
                            const damageType = elem.type.substring(6);
                            const damage = elem.value * rootGetters['mult/get']('hordeAttack') * rootGetters['mult/get'](`horde${ damageType }Attack`) * state.enemy[decapitalize(damageType) + 'Taken'];
                            let enemyHealth = Math.max(0, state.enemy.health - damage / (state.enemy.divisionShield + 1));
                            if (state.enemy.divisionShield > 0) {
                                commit('updateEnemyKey', {key: 'divisionShield', value: state.enemy.divisionShield - 1});
                            }
                            if (enemyHealth <= 0) {
                                if (state.enemy.revive) {
                                    commit('updateEnemyKey', {key: 'health', value: state.enemy.maxHealth});
                                    commit('updateEnemyKey', {key: 'revive', value: state.enemy.revive - 1});
                                } else {
                                    kill = true;
                                }
                            } else {
                                commit('updateEnemyKey', {key: 'health', value: enemyHealth});
                            }
                        }
                    }
                });

                // kill AFTER all effects resolve
                if (kill) {
                    dispatch('killEnemy');
                }

                const cooldown = Math.ceil(state.items[name].cooldown(state.items[name].level) / (state.items[name].masteryLevel >= 4 ? 2 : 1));
                commit('updateItemKey', {name, key: 'cooldownLeft', value: cooldown});

                // Add stat for spellblade
                if (cooldown >= 10 || chance(cooldown * 0.1)) {
                    commit('updatePlayerKey', {key: 'spells', value: state.player.spells + 1});
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
        prestige({ state, getters, rootGetters, commit, dispatch }) {
            const prestigeGain = rootGetters['currency/value']('horde_soulCorrupted') * getters.currentSoulMult;
            commit('stat/increaseTo', {feature: 'horde', name: 'bestPrestige', value: prestigeGain}, {root: true});
            commit('stat/add', {feature: 'horde', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'horde', name: 'soulEmpowered', amount: prestigeGain}, {root: true});

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
            commit('updateKey', {key: 'itemAttackMult', value: 0});
            commit('updateKey', {key: 'itemHealthMult', value: 0});
            dispatch('applyPermanentEffects');

            dispatch('upgrade/reset', {feature: 'horde', type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'horde', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'horde', type: 'regular'}, {root: true});

            dispatch('mult/removeKey', {type: 'mult', name: 'currencyHordeBoneCap', key: 'zoneCleared'}, {root: true});

            commit('updateKey', {key: 'zone', value: 1});
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'respawn', value: 0});
            commit('updateKey', {key: 'maxRespawn', value: 1});
            commit('updateKey', {key: 'bossAvailable', value: false});
            commit('updateKey', {key: 'bossFight', value: false});
            commit('updateKey', {key: 'sigilZones', value: []});
            commit('updateKey', {key: 'nostalgia', value: 0});

            dispatch('card/activateCards', 'horde', {root: true});

            dispatch('updatePlayerStats');
            dispatch('updateEnemyStats');
        },
        findHeirloom({ state, rootGetters, commit, dispatch }, zone) {
            let eligibleHeirlooms = [];
            let lowestItem = null;
            let lowestAmount = Infinity;

            for (const [key, elem] of Object.entries(state.heirloom)) {
                if (zone >= elem.minZone) {
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

            const rng = rootGetters['system/nextRng']('horde_heirloomType');
            commit('system/takeRng', 'horde_heirloomType', {root: true});
            const chosen = randomElem(eligibleHeirlooms, rng[0]);
            const amount = randomInt(1, rootGetters['mult/get']('hordeHeirloomAmount'), rng[1]);
            commit('updateHeirloomKey', {name: chosen, key: 'amount', value: state.heirloom[chosen].amount + amount});
            dispatch('applyHeirloomEffects', chosen);

            let found = state.heirloomsFound !== null ? {...state.heirloomsFound} : {};
            if (found[chosen] === undefined) {
                found[chosen] = 0;
            }
            found[chosen] += amount;
            commit('updateKey', {key: 'heirloomsFound', value: found});
        },
        applyHeirloomEffects({ state, rootGetters, dispatch }, name) {
            if (state.heirloom[name].amount > 0) {
                state.heirloom[name].effect.forEach(eff => {
                    dispatch('system/applyEffect', {
                        type: eff.type,
                        name: eff.name,
                        multKey: `hordeHeirloom_${name}`,
                        value: eff.value(rootGetters['mult/get'](`${ name }HeirloomEffect`, state.heirloom[name].amount))
                    }, {root: true});
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
            if (state.itemAttackMult > 0) {
                dispatch('system/applyEffect', {type: 'mult', name: 'hordeAttack', multKey: `hordeItemPermanent`, value: state.itemAttackMult + 1}, {root: true});
            } else {
                dispatch('system/resetEffect', {type: 'mult', name: 'hordeAttack', multKey: `hordeItemPermanent`}, {root: true});
            }
            if (state.itemHealthMult > 0) {
                dispatch('system/applyEffect', {type: 'mult', name: 'hordeHealth', multKey: `hordeItemPermanent`, value: state.itemHealthMult + 1}, {root: true});
            } else {
                dispatch('system/resetEffect', {type: 'mult', name: 'hordeHealth', multKey: `hordeItemPermanent`}, {root: true});
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
                    if (freeSlots > 0 && item && !item.equipped) {
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
        }
    }
}
