import store from "../../store"
import { HORDE_INACTIVE_ITEM_COOLDOWN, HORDE_MONSTER_PART_MIN_COMBO, HORDE_MONSTER_PART_MIN_ZONE, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_CRIT_CHANCE, HORDE_RAMPAGE_CRIT_DAMAGE, HORDE_RAMPAGE_ENEMY_TIME } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";
import { randomRound } from "../utils/random";
import achievement from "./horde/achievement";
import heirloom from "./horde/heirloom";
import equipment from "./horde/equipment";
import relic from "./horde/relic";
import sigil from "./horde/sigil";
import upgrade from "./horde/upgrade";
import upgradePremium from "./horde/upgradePremium";
import upgradePrestige from "./horde/upgradePrestige";
import bookHorde from "./school/bookHorde";

function playerDie() {
    if (store.state.horde.player.revive) {
        store.commit('horde/updatePlayerKey', {key: 'health', value: store.getters['mult/get']('hordeHealth')});
        store.commit('horde/updatePlayerKey', {key: 'revive', value: store.state.horde.player.revive - 1});
    } else {
        store.commit('horde/updatePlayerKey', {key: 'health', value: 0});
        store.commit('horde/updateKey', {key: 'combo', value: 0});

        let respawnTimer = store.getters['mult/get']('hordeRespawn', store.getters['horde/baseRespawnTime']);
        store.commit('horde/updateKey', {key: 'respawn', value: respawnTimer});
        store.commit('horde/updateKey', {key: 'maxRespawn', value: respawnTimer});
        store.dispatch('horde/updateEnemyStats');
    }
}

function getDamage(amount, type, offender, defender) {
    return amount * offender[type + 'Attack'] * defender[type + 'Taken'];
}

const damageTypes = ['physic', 'magic', 'bio'];

export default {
    name: 'horde',
    tickspeed: 1,
    unlockNeeded: 'hordeFeature',
    tick(seconds) {
        store.commit('stat/add', {feature: 'horde', name: 'timeSpent', value: seconds});

        const shardsMaxGain = store.getters['horde/maxMysticalShards'] - store.state.currency.horde_mysticalShard.value;
        if (shardsMaxGain > 0) {
            const gain = Math.min(randomRound(seconds * store.getters['mult/get']('hordeShardChance')), shardsMaxGain);
            if (gain > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'mysticalShard', amount: gain});
            }
        }

        if (store.state.unlock.hordeCorruptedFlesh.use) {
            store.dispatch('currency/gain', {feature: 'horde', name: 'corruptedFlesh', amount: store.getters['mult/get'](`currencyHordeCorruptedFleshGain`) * seconds});
        }

        for (const [key, elem] of Object.entries(store.state.horde.items)) {
            if (elem.cooldownLeft > 0) {
                store.commit('horde/updateItemKey', {
                    name: key,
                    key: 'cooldownLeft',
                    value: Math.max(0, elem.cooldownLeft - seconds * ((elem.equipped && !elem.passive) ? 1 : HORDE_INACTIVE_ITEM_COOLDOWN))
                });
            }
        }

        const conversionTotal = store.getters['mult/get']('hordePhysicConversion') + store.getters['mult/get']('hordeMagicConversion') + store.getters['mult/get']('hordeBioConversion');

        const playerStats = {
            attack: store.getters['mult/get']('hordeAttack'),
            critChance: store.getters['mult/get']('hordeCritChance'),
            critMult: store.getters['mult/get']('hordeCritMult', 0, 1, 1),
            toxic: store.getters['mult/get']('hordeToxic'),
            firstStrike: store.getters['mult/get']('hordeFirstStrike'),
            spellblade: store.getters['mult/get']('hordeSpellblade'),
            cutting: store.getters['mult/get']('hordeCutting'),

            // Damage type specifics
            physicConversion: store.getters['mult/get']('hordePhysicConversion') / conversionTotal,
            magicConversion: store.getters['mult/get']('hordeMagicConversion') / conversionTotal,
            bioConversion: store.getters['mult/get']('hordeBioConversion') / conversionTotal,
            physicAttack: store.getters['mult/get']('hordePhysicAttack'),
            magicAttack: store.getters['mult/get']('hordeMagicAttack'),
            bioAttack: store.getters['mult/get']('hordeBioAttack'),
            physicTaken: store.getters['mult/get']('hordePhysicTaken'),
            magicTaken: store.getters['mult/get']('hordeMagicTaken'),
            bioTaken: store.getters['mult/get']('hordeBioTaken'),
        };

        let simulation = {
            dead: 0,
            time: 0,
            killed: 0,
            damage: 0,
            bone: 0,
            monsterPart: 0,
            complete: false
        };

        while (seconds > 0) {
            let respawn = store.state.horde.respawn;
            let secondsSpent = 0;

            if (simulation.dead >= 2 && simulation.killed >= 50 && !simulation.complete) {
                let cycles = Math.floor(seconds / simulation.time);
                store.dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: cycles * simulation.bone});
                store.dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: cycles * simulation.monsterPart});
                store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: cycles * simulation.damage});
                store.dispatch('horde/findItems', cycles * simulation.killed);
                secondsSpent = simulation.time * cycles;
                simulation.complete = true;
            } else if (respawn > 0) {
                secondsSpent = Math.min(respawn, seconds);
                let newRespawn = respawn - secondsSpent;

                store.commit('horde/updateKey', {key: 'respawn', value: newRespawn});
                if (newRespawn <= 0) {
                    if (store.state.horde.bossFight) {
                        store.commit('horde/updateKey', {key: 'bossFight', value: false});
                        store.dispatch('horde/updateEnemyStats');
                    }

                    store.dispatch('horde/updatePlayerStats');
                }
            } else {
                const enemyStats = store.state.horde.enemy;

                let enemyHealth = enemyStats.health;
                let killEnemy = false;

                // Apply poison damage
                if (enemyStats.poison > 0) {
                    enemyHealth = Math.max(0, enemyHealth - enemyStats.poison);
                }

                if (store.state.horde.player.health > 0) {
                    const baseDamage = playerStats.attack * Math.pow(playerStats.critMult, randomRound(playerStats.critChance));
                    const divisionShieldMult = enemyStats.divisionShield + 1;
                    let damage = 0;
                    damageTypes.forEach(damagetype => {
                        const conversion = playerStats[damagetype + 'Conversion'];
                        if (conversion > 0) {
                            damage += getDamage(baseDamage * conversion / divisionShieldMult, damagetype, playerStats, enemyStats)
                        }
                    });
                    if (playerStats.firstStrike > 0 && store.state.horde.player.hits <= 0) {
                        damage += getDamage(playerStats.attack * playerStats.firstStrike / divisionShieldMult, 'magic', playerStats, enemyStats);
                    }
                    if (store.state.horde.player.spells > 0) {
                        if (playerStats.spellblade > 0) {
                            damage += getDamage(playerStats.attack * playerStats.spellblade / divisionShieldMult, 'magic', playerStats, enemyStats);
                        }
                        store.commit('horde/updatePlayerKey', {key: 'spells', value: store.state.horde.player.spells - 1});
                    }
                    enemyHealth = Math.max(0, enemyHealth - damage);

                    if (enemyHealth > 0 && playerStats.cutting > 0) {
                        enemyHealth = Math.max(0, enemyHealth - getDamage(enemyHealth * playerStats.cutting / divisionShieldMult, 'bio', playerStats, enemyStats));
                    }

                    if (playerStats.toxic > 0) {
                        store.commit('horde/updateEnemyKey', {key: 'poison', value: getDamage(baseDamage * playerStats.toxic / divisionShieldMult, 'bio', playerStats, enemyStats) + store.state.horde.enemy.poison});
                    }

                    if (enemyStats.divisionShield > 0) {
                        store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: enemyStats.divisionShield - 1});
                    }

                    store.commit('horde/updatePlayerKey', {key: 'hits', value: store.state.horde.player.hits + 1});

                    // count damage stats
                    store.commit('stat/increaseTo', {feature: 'horde', name: 'maxDamage', value: damage});
                    store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: damage});
                    if (simulation.dead) {
                        simulation.damage += damage;
                    }
                }
                if (enemyHealth <= 0) {
                    if (enemyStats.revive) {
                        store.commit('horde/updateEnemyKey', {key: 'health', value: enemyStats.maxHealth});
                        store.commit('horde/updateEnemyKey', {key: 'revive', value: enemyStats.revive - 1});
                    } else {
                        if (simulation.dead) {
                            simulation.killed++;
                            simulation.bone += store.getters['horde/currentBone'] * store.state.horde.enemy.loot;
                            if (store.state.horde.zone >= HORDE_MONSTER_PART_MIN_ZONE && store.state.horde.combo >= HORDE_MONSTER_PART_MIN_COMBO) {
                                simulation.monsterPart += store.getters['horde/currentMonsterPart'] * store.state.horde.enemy.loot;
                            }
                        }
                        killEnemy = true;
                    }
                } else {
                    store.commit('horde/updateEnemyKey', {key: 'health', value: enemyHealth});
                }

                let playerHealth = store.state.horde.player.health;

                if (store.state.horde.player.poison > 0) {
                    playerHealth = Math.max(0, playerHealth - store.state.horde.player.poison);
                }

                if (enemyStats.stun > 0) {
                    store.commit('horde/updateEnemyKey', {key: 'stun', value: Math.max(0, enemyStats.stun - (store.state.horde.bossFight ? 2 : 1))});
                } else {
                    const enemyBaseDamage = enemyStats.attack * Math.pow(enemyStats.critMult + 1, randomRound(enemyStats.critChance));
                    const divisionShieldMult = store.state.horde.player.divisionShield + 1;
                    let enemyDamage = 0;
                    const enemyConversionTotal = enemyStats.physicConversion + enemyStats.magicConversion + enemyStats.bioConversion;
                    damageTypes.forEach(damagetype => {
                        const conversion = enemyStats[damagetype + 'Conversion'] / enemyConversionTotal;
                        if (conversion > 0) {
                            enemyDamage += getDamage(enemyBaseDamage * conversion / divisionShieldMult, damagetype, enemyStats, playerStats);
                        }
                    });
                    if (enemyStats.firstStrike > 0 && enemyStats.hits <= 0) {
                        enemyDamage += getDamage(enemyStats.attack * enemyStats.firstStrike / divisionShieldMult, 'magic', enemyStats, playerStats);
                    }
                    playerHealth = Math.max(0, playerHealth - enemyDamage);

                    if (playerHealth > 0 && enemyStats.cutting > 0) {
                        playerHealth = Math.max(0, playerHealth - getDamage(playerHealth * enemyStats.cutting / divisionShieldMult, 'bio', enemyStats, playerStats));
                    }

                    if (enemyStats.toxic > 0) {
                        store.commit('horde/updatePlayerKey', {key: 'poison', value: getDamage(enemyBaseDamage * enemyStats.toxic / divisionShieldMult, 'bio', enemyStats, playerStats) + store.state.horde.player.poison});
                    }

                    if (store.state.horde.player.divisionShield > 0) {
                        store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: store.state.horde.player.divisionShield - 1});
                    }

                    store.commit('horde/updateEnemyKey', {key: 'hits', value: enemyStats.hits + 1});
                }

                if (playerHealth <= 0) {
                    simulation.dead++;
                    playerDie();
                } else {
                    store.commit('horde/updatePlayerKey', {key: 'health', value: playerHealth});
                }

                if (killEnemy) {
                    store.dispatch('horde/killEnemy');
                }

                secondsSpent = 1;

                // Apply rampage
                store.commit('horde/updateKey', {key: 'fightTime', value: store.state.horde.fightTime + secondsSpent});

                const rampageTime = store.state.horde.bossFight ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
                const newRampage = Math.floor(store.state.horde.fightTime / rampageTime);

                if (newRampage > store.state.horde.fightRampage) {
                    const rampageDiff = newRampage - store.state.horde.fightRampage;
                    store.commit('horde/updateEnemyKey', {key: 'attack', value: enemyStats.attack * Math.pow(HORDE_RAMPAGE_ATTACK, rampageDiff)});
                    store.commit('horde/updateEnemyKey', {key: 'critChance', value: enemyStats.critChance + HORDE_RAMPAGE_CRIT_CHANCE * rampageDiff});
                    store.commit('horde/updateEnemyKey', {key: 'critMult', value: enemyStats.critMult + HORDE_RAMPAGE_CRIT_DAMAGE * rampageDiff});
                    store.commit('horde/updateKey', {key: 'fightRampage', value: newRampage});
                }
            }

            if (simulation.dead) {
                simulation.time += secondsSpent;
            }

            // Tick nostalgia
            if (store.state.stat.horde_maxZone.value > 30) {
                store.commit('horde/updateKey', {key: 'nostalgia', value: store.getters['mult/get']('hordeNostalgia', secondsSpent) + store.state.horde.nostalgia});
            }

            seconds -= secondsSpent;
        }

        if (store.state.horde.heirloomsFound !== null) {
            if (store.state.system.settings.notification.items.heirloom.value) {
                store.commit('system/addNotification', {color: 'success', timeout: 3000, message: {
                    type: 'heirloom',
                    value: store.state.horde.heirloomsFound
                }});
            }
            store.commit('horde/updateKey', {key: 'heirloomsFound', value: null});
        }
    },
    unlock: ['hordeFeature', 'hordeItems', 'hordeDamageTypes', 'hordePrestige', 'hordeHeirlooms', 'hordeCorruptedFlesh', 'hordeItemMastery', 'hordeChessItems'],
    stat: {
        maxZone: {value: 1},
        totalDamage: {},
        maxDamage: {},
        timeSpent: {display: 'time'},
        bestPrestige: {},
        prestigeCount: {},
        maxZoneSpeedrun: {value: 1},
        maxItems: {},
        maxMastery: {},
        totalMastery: {},
        unlucky: {},
    },
    mult: {
        // Base combat stats
        hordeAttack: {baseValue: 5},
        hordeHealth: {baseValue: 500},
        hordeRecovery: {display: 'percent', min: 0, max: 1},
        hordeCritChance: {display: 'percent'},
        hordeCritMult: {display: 'percent', baseValue: 0.5},
        hordeRevive: {round: true, min: 0},
        hordeToxic: {display: 'percent'},
        hordeFirstStrike: {display: 'percent'},
        hordeSpellblade: {display: 'percent'},
        hordeCutting: {display: 'percent', min: 0},
        hordeDivisionShield: {round: true, min: 0},

        // Damage type specifics
        hordePhysicConversion: {display: 'percent', baseValue: 1},
        hordeMagicConversion: {display: 'percent', baseValue: 0},
        hordeBioConversion: {display: 'percent', baseValue: 0},
        hordePhysicAttack: {display: 'percent', baseValue: 1},
        hordeMagicAttack: {display: 'percent', baseValue: 1},
        hordeBioAttack: {display: 'percent', baseValue: 1},
        hordePhysicTaken: {display: 'percent', baseValue: 1},
        hordeMagicTaken: {display: 'percent', baseValue: 1},
        hordeBioTaken: {display: 'percent', baseValue: 1},

        hordeMaxItems: {round: true, baseValue: 1},
        hordeItemChance: {display: 'percent'},
        hordeBossRequirement: {round: true, min: 10},
        hordeRespawn: {display: 'time', round: true, min: 1},
        hordeSoulChance: {display: 'percent', min: 0, max: 1},
        hordeSoulGain: {},
        hordeHeirloomChance: {display: 'percent'},
        hordeHeirloomAmount: {baseValue: 1, round: true},
        hordeHeirloomEffect: {},
        hordeNostalgia: {},
        hordeCorruption: {display: 'percent', min: 0},
        hordeItemMasteryGain: {},
        hordeShardChance: {display: 'percent', baseValue: 0.001},
    },
    multGroup: [
        {mult: 'hordeHeirloomEffect', name: 'multType', type: 'heirloomEffect'}
    ],
    currency: {
        bone: {color: 'lightest-grey', icon: 'mdi-bone', gainMult: {}, capMult: {baseValue: buildNum(12.5, 'K')}},
        monsterPart: {color: 'cherry', icon: 'mdi-stomach', gainMult: {}, capMult: {baseValue: 100}},
        corruptedFlesh: {color: 'deep-purple', icon: 'mdi-food-steak', gainMult: {baseValue: 1, display: 'perSecond'}, showGainMult: true},
        mysticalShard: {color: 'teal', icon: 'mdi-billiards-rack', currencyMult: {
            hordeAttack: {type: 'mult', value: val => Math.pow(1.1, val)},
            hordeHealth: {type: 'mult', value: val => Math.pow(1.1, val)},
            currencyHordeBoneGain: {type: 'mult', value: val => Math.pow(1.1, val)}
        }},
        soulCorrupted: {color: 'purple', icon: 'mdi-ghost'},
        soulEmpowered: {type: 'prestige', alwaysVisible: true, color: 'pink', icon: 'mdi-ghost'}
    },
    upgrade: {
        ...upgrade,
        ...upgradePrestige,
        ...upgradePremium,
        ...bookHorde
    },
    relic,
    achievement,
    note: buildArray(31).map(() => 'g'),
    rng: {
        horde_soul: {amount: 25},
        horde_heirloom: {amount: 25},
        horde_heirloomType: {size: 2, amount: 25}
    },
    init() {
        for (const [key, elem] of Object.entries(equipment)) {
            store.commit('horde/initItem', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(heirloom)) {
            store.dispatch('horde/initHeirloom', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(sigil)) {
            store.commit('horde/initSigil', {name: key, ...elem});
        }
        store.dispatch('horde/updatePlayerStats');
        store.dispatch('horde/updateEnemyStats');
    },
    saveGame() {
        let obj = {
            zone: store.state.horde.zone,
            combo: store.state.horde.combo,
            respawn: store.state.horde.respawn,
            maxRespawn: store.state.horde.maxRespawn,
            bossAvailable: store.state.horde.bossAvailable,
            bossFight: store.state.horde.bossFight,
            player: {...store.state.horde.player},
            enemy: {...store.state.horde.enemy},
            sigilZones: [...store.state.horde.sigilZones],
        };

        if (store.state.unlock.hordeItems.see) {
            obj.items = {};
            for (const [key, elem] of Object.entries(store.state.horde.items)) {
                if (elem.known) {
                    obj.items[key] = {
                        found: elem.found,
                        level: elem.level,
                        equipped: elem.equipped,
                        cooldownLeft: elem.cooldownLeft,
                        collapse: elem.collapse
                    };
                    if (elem.masteryPoint > 0) {
                        obj.items[key].masteryPoint = elem.masteryPoint;
                        obj.items[key].masteryLevel = elem.masteryLevel;
                    }
                    if (elem.passive) {
                        obj.items[key].passive = true;
                    }
                }
            }
        }

        if (store.state.horde.loadout.length > 0) {
            obj.loadout = store.state.horde.loadout.map(elem => {
                return {name: elem.name, content: elem.content};
            });
        }

        for (const [key, elem] of Object.entries(store.state.horde.heirloom)) {
            if (elem.amount > 0) {
                if (obj.heirloom === undefined) {
                    obj.heirloom = {};
                }
                obj.heirloom[key] = elem.amount;
            }
        }

        if (store.state.horde.nostalgia > 0) {
            obj.nostalgia = store.state.horde.nostalgia;
        }

        if (store.state.horde.itemAttackMult > 0) {
            obj.itemAttackMult = store.state.horde.itemAttackMult;
        }
        if (store.state.horde.itemHealthMult > 0) {
            obj.itemHealthMult = store.state.horde.itemHealthMult;
        }
        if (store.state.horde.fightTime > 0) {
            obj.fightTime = store.state.horde.fightTime;
        }
        if (store.state.horde.fightRampage > 0) {
            obj.fightRampage = store.state.horde.fightRampage;
        }

        return obj;
    },
    loadGame(data) {
        ['zone', 'combo', 'respawn', 'maxRespawn', 'bossAvailable', 'bossFight', 'nostalgia', 'itemAttackMult', 'itemHealthMult', 'fightTime', 'fightRampage'].forEach(elem => {
            if (data[elem] !== undefined) {
                store.commit('horde/updateKey', {key: elem, value: data[elem]});
            }
        });

        if (data.sigilZones) {
            store.commit('horde/updateKey', {key: 'sigilZones', value: data.sigilZones.map(zone => zone.filter(item => Object.keys(sigil).includes(item)))});
        }

        if (data.player) {
            for (const [key, elem] of Object.entries(data.player)) {
                store.commit('horde/updatePlayerKey', {key, value: elem});
            }
        }
        if (data.enemy) {
            for (const [key, elem] of Object.entries(data.enemy)) {
                store.commit('horde/updateEnemyKey', {key, value: key === sigil ? elem.filter(item => Object.keys(sigil).includes(item)) : elem});
            }
        }
        if (data.items) {
            for (const [key, elem] of Object.entries(data.items)) {
                if (store.state.horde.items[key]) {
                    if (elem.found) {
                        store.commit('horde/updateItemKey', {name: key, key: 'found', value: true});
                    }
                    if (elem.passive) {
                        store.commit('horde/updateItemKey', {name: key, key: 'passive', value: true});
                    }
                    store.commit('horde/updateItemKey', {name: key, key: 'known', value: true});
                    store.commit('horde/updateItemKey', {name: key, key: 'level', value: elem.level});
                    store.commit('horde/updateItemKey', {name: key, key: 'cooldownLeft', value: elem.cooldownLeft});
                    store.commit('horde/updateItemKey', {name: key, key: 'collapse', value: elem.collapse});
                    if (elem.masteryPoint !== undefined) {
                        store.commit('horde/updateItemKey', {name: key, key: 'masteryPoint', value: elem.masteryPoint});
                        store.commit('horde/updateItemKey', {name: key, key: 'masteryLevel', value: elem.masteryLevel});
                    }
                    if (elem.equipped) {
                        store.commit('horde/updateItemKey', {name: key, key: 'equipped', value: true});
                        store.dispatch('horde/applyItemEffects', key);
                    }
                }
            }
        }
        if (data.loadout) {
            let nextId = 1;
            data.loadout.forEach(elem => {
                store.commit('horde/addExistingLoadout', {
                    id: nextId,
                    name: elem.name,
                    content: elem.content
                });
                nextId++;
            });
            store.commit('horde/updateKey', {key: 'nextLoadoutId', value: nextId});
        }
        if (data.heirloom) {
            for (const [key, elem] of Object.entries(data.heirloom)) {
                if (store.state.horde.heirloom[key]) {
                    store.commit('horde/updateHeirloomKey', {name: key, key: 'amount', value: elem});
                    store.dispatch('horde/applyHeirloomEffects', key);
                }
            }
        }
        store.dispatch('horde/checkZoneUnlocks');
        store.dispatch('horde/applyPermanentEffects');
    }
}
