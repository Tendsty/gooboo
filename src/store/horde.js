import Vue from "vue";
import { HORDE_COMBO_ATTACK, HORDE_COMBO_BONE, HORDE_COMBO_HEALTH, HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME, HORDE_HEIRLOOM_MIN_ZONE, HORDE_MINIBOSS_MIN_ZONE, HORDE_SHARD_INCREMENT, HORDE_SHARD_PER_EQUIP } from "../js/constants";
import { buildNum, capitalize } from "../js/utils/format";
import { chance, randomElem, randomInt } from "../js/utils/random";
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
        towerFloor: 0
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
                stunResist: 0,

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
        enemyMonsterPart: () => (zone) => {
            return Math.pow(1.1, zone - 10) * 0.2;
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
        },
        canSpawnMiniboss: (state, getters, rootState) => {
            return rootState.stat.horde_maxZone.value >= HORDE_MINIBOSS_MIN_ZONE;
        },
        canFindHeirloom: (state, getters, rootState) => {
            return rootState.stat.horde_maxZone.value >= HORDE_HEIRLOOM_MIN_ZONE;
        }
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
                heirloom: o.heirloom ?? null,
                reward: o.reward ?? {},
                highest: 0
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
            commit('updatePlayerKey', {key: 'silence', value: 0});
            commit('updatePlayerKey', {key: 'stun', value: 0});
            commit('updatePlayerKey', {key: 'poison', value: 0});
            commit('updatePlayerKey', {key: 'hits', value: 0});
            commit('updatePlayerKey', {key: 'spells', value: 0});
        },
        updateEnemyStats({ state, getters, rootGetters, commit }) {
            const inTower = state.currentTower !== null;
            if (!inTower && state.minibossTimer >= 1 && state.bossFight === 0) {
                commit('updateKey', {key: 'bossFight', value: 1});
            }
            if (inTower || state.enemyTimer >= HORDE_ENEMY_RESPAWN_TIME || state.bossFight > 0) {
                let stats = getters.enemyStats(getters.currentBaseZone, inTower ? 0 : state.combo);
                const corruptionStats = inTower ? {} : getters.currentCorruptionStats;

                if (corruptionStats.power !== undefined) {
                    stats.attack *= corruptionStats.power;
                    stats.health *= corruptionStats.power;
                }
                if (corruptionStats.revive !== undefined) {
                    stats.revive += corruptionStats.revive;
                }

                // update sigil zones
                if (!inTower) {
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
                }

                let amt = getters.currentSigils + (corruptionStats.sigil ?? 0);
                let sigil = {};
                const sigilSource = inTower ? state.tower[state.currentTower].sigils : state.sigilZones[state.zone - 1];
                if (sigilSource.length > 0) {
                    while (amt > 0) {
                        const chosen = randomElem(sigilSource);
                        if (sigil[chosen]) {
                            sigil[chosen]++;
                        } else {
                            sigil[chosen] = 1;
                        }
                        amt--;
                    }
                }

                if (state.bossFight >= 1) {
                    stats.attack *= state.bossFight === 2 ? 15 : 3;
                    stats.health *= state.bossFight === 2 ? 15 : 5;
                    stats.bioTaken /= state.bossFight === 2 ? 10 : 5;
                    stats.stunResist += state.bossFight;
                }

                let active = {};
                const cooldownStart = rootGetters['mult/get']('hordeEnemyActiveStart');

                for (const [key, elem] of Object.entries(sigil)) {
                    for (const [stat, obj] of Object.entries(state.sigil[key].stats(elem))) {
                        if (obj.type === 'mult') {
                            stats[stat] *= obj.amount;
                        } else {
                            stats[stat] += obj.amount;
                        }
                    }
                    if (state.sigil[key].active) {
                        active[key] = {
                            cooldown: Math.round(state.sigil[key].active.startCooldown(elem) * (1 - cooldownStart) + state.sigil[key].active.cooldown(elem) * cooldownStart),
                            uses: state.sigil[key].active.uses(elem)
                        };
                    }
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

                commit('updateKey', {key: 'fightTime', value: 0});
                commit('updateKey', {key: 'fightRampage', value: 0});
            } else {
                commit('updateKey', {key: 'enemy', value: null});
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
        equipItem({ state, getters, rootGetters, commit, dispatch }, name) {
            if (state.items[name] && !state.items[name].equipped && state.items[name].found && getters.itemsEquipped < rootGetters['mult/get']('hordeMaxItems')) {
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

            // Raise miniboss rewards
            if (maxZoneTotal >= HORDE_MINIBOSS_MIN_ZONE) {
                const zoneBase = maxZoneTotal - HORDE_MINIBOSS_MIN_ZONE;
                dispatch('mult/setBase', {name: 'currencyHordeSoulCorruptedCap', key: 'zoneClearedTotal', value: Math.round(Math.pow(1.16, zoneBase) * (zoneBase + 1) * 100)}, {root: true});
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
                    if (chance(rootGetters['mult/get']('hordeHeirloomChance'), rootGetters['system/nextRng']('horde_heirloom')[0])) {
                        dispatch('findHeirloom', state.zone);

                        // Finding a heirloom with help removes 1 nostalgia
                        if (rootGetters['mult/get']('hordeNostalgia') > 0) {
                            commit('updateKey', {key: 'nostalgiaLost', value: state.nostalgiaLost + 1});
                            dispatch('updateNostalgia');
                        }
                    } else if (rootGetters['mult/get']('hordeHeirloomChance') >= 0.99) {
                        commit('stat/increaseTo', {feature: 'horde', name: 'unlucky', value: 1}, {root: true});
                    }
                    commit('system/takeRng', 'horde_heirloom', {root: true});
                }
            }

            if (state.zone >= 75) {
                // Add item mastery
                dispatch('gainMastery', amount * 0.05);
            }
        },
        killEnemy({ state, rootState, getters, rootGetters, commit, dispatch }) {
            if (state.bossFight === 0 && state.currentTower === null) {
                dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: getters.currentBone * state.enemy.loot}, {root: true});
                dispatch('findItems', 1);
            }

            // Reset some stats
            commit('updatePlayerKey', {key: 'divisionShield', value: rootGetters['mult/get']('hordeDivisionShield')});
            commit('updatePlayerKey', {key: 'hits', value: 0});

            const recovery = rootGetters['mult/get']('hordeRecovery');
            const missingHealth = rootGetters['mult/get']('hordeHealth') - state.player.health;
            if (recovery > 0 && missingHealth > 0) {
                commit('updatePlayerKey', {key: 'health', value: Math.min(rootGetters['mult/get']('hordeHealth'), state.player.health + missingHealth * recovery)});
            }

            if (state.currentTower !== null) {
                // Give tower rewards
                const tower = state.tower[state.currentTower];
                dispatch('currency/gain', {feature: 'horde', name: 'crown', amount: tower.crowns}, {root: true});
                const newFloor = state.towerFloor + 1
                commit('updateKey', {key: 'towerFloor', value: newFloor});
                if (newFloor > tower.highest) {
                    commit('updateTowerKey', {name: state.currentTower, key: 'highest', value: newFloor});
                }
            } else if (state.bossFight === 1) {
                dispatch('getMinibossReward', 1);

                commit('updateKey', {key: 'minibossTimer', value: state.minibossTimer - 1});
                commit('updateKey', {key: 'bossFight', value: 0});
            } else if (state.bossFight === 2) {
                // Find notes based on depth
                const note = notes[rootState.stat.horde_maxZone.value];
                if (note !== undefined) {
                    dispatch('note/find', note, {root: true});
                }

                commit('updateKey', {key: 'bossFight', value: 0});
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
                dispatch('updatePlayerStats');
                dispatch('checkZoneUnlocks');
            } else {
                commit('updateKey', {key: 'combo', value: state.combo + 1});
                commit('updateKey', {key: 'enemyTimer', value: state.enemyTimer - HORDE_ENEMY_RESPAWN_TIME});
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
        gainMastery({ state, getters, rootGetters, commit, dispatch }, amount = 1) {
            let updateMasteryStats = false;
            for (const [key, elem] of Object.entries(state.items)) {
                const masteryBase = state.zone - elem.findZone - 24;
                if (elem.equipped && masteryBase > 0) {
                    commit('updateItemKey', {name: key, key: 'masteryPoint', value: elem.masteryPoint + rootGetters['mult/get']('hordeItemMasteryGain', masteryBase * amount)});
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
            const item = state.items[name];
            if (item.equipped && item.cooldownLeft <= 0) {
                if (item.activeType === 'utility') {
                    const cooldown = Math.ceil(item.cooldown(item.level) / (item.masteryLevel >= 4 ? 2 : 1));
                    const charges = Math.floor(logBase(2 - (item.cooldownLeft / cooldown), 2));

                    item.active(item.level).forEach(elem => {
                        if (elem.type === 'bone') {
                            dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: elem.value * charges * getters.enemyBone(rootState.stat.horde_maxZone.value, 0)}, {root: true});
                        } else if (elem.type === 'monsterPart') {
                            dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: elem.value * charges * getters.enemyMonsterPart(rootState.stat.horde_maxZone.value, 0)}, {root: true});
                        } else if (elem.type === 'permanentStat') {
                            const value = (state.itemStatMult[elem.stat] ?? 0) + elem.value * charges;
                            commit('updateSubkey', {name: 'itemStatMult', key: elem.stat, value});
                            dispatch('system/applyEffect', {type: 'mult', name: elem.stat, multKey: `hordeItemPermanent`, value: value + 1}, {root: true});
                        }
                    });

                    commit('updateItemKey', {name, key: 'cooldownLeft', value: Math.ceil(cooldown * ((item.cooldownLeft / cooldown) - (2 - Math.pow(2, charges + 1))) / Math.pow(2, charges))});
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
        prestige({ state, rootState, commit, dispatch }) {
            const prestigeGain = rootState.currency.horde_soulCorrupted.value;
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
            for (const [key] of Object.entries(state.itemStatMult)) {
                dispatch('system/resetEffect', {type: 'mult', name: key, multKey: `hordeItemPermanent`}, {root: true});
            }
            commit('updateKey', {key: 'itemStatMult', value: {}});

            dispatch('upgrade/reset', {feature: 'horde', type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'horde', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'horde', type: 'regular'}, {root: true});

            dispatch('mult/removeKey', {name: 'currencyHordeSoulCorruptedGain', type: 'base', key: 'zoneCleared'}, {root: true});
            dispatch('mult/removeKey', {name: 'hordeHeirloomChance', type: 'base', key: 'zoneCleared'}, {root: true});

            commit('updateKey', {key: 'zone', value: 1});
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'respawn', value: 0});
            commit('updateKey', {key: 'maxRespawn', value: 1});
            commit('updateKey', {key: 'bossAvailable', value: false});
            commit('updateKey', {key: 'bossFight', value: 0});
            commit('updateKey', {key: 'sigilZones', value: []});
            commit('updateKey', {key: 'enemyTimer', value: 0});
            commit('updateKey', {key: 'minibossTimer', value: 0});
            commit('updateKey', {key: 'chosenActive', value: null});
            commit('updateKey', {key: 'nostalgiaLost', value: 0});
            dispatch('updateNostalgia');

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
            for (const [key, elem] of Object.entries(state.itemStatMult)) {
                dispatch('system/applyEffect', {type: 'mult', name: key, multKey: `hordeItemPermanent`, value: elem + 1}, {root: true});
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
        enterTower({ commit, dispatch }, name) {
            commit('updateKey', {key: 'combo', value: 0});
            commit('updateKey', {key: 'bossFight', value: 0});
            commit('updateKey', {key: 'currentTower', value: name});
            commit('updateKey', {key: 'towerFloor', value: 0});
            dispatch('resetStats');
        }
    }
}
