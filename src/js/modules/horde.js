import store from "../../store"
import { HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME, HORDE_INACTIVE_ITEM_COOLDOWN, HORDE_MONSTER_PART_MIN_ZONE, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_CRIT_CHANCE, HORDE_RAMPAGE_CRIT_DAMAGE, HORDE_RAMPAGE_ENEMY_TIME, HORDE_RAMPAGE_STUN_RESIST, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";
import { chance, randomRound } from "../utils/random";
import achievement from "./horde/achievement";
import heirloom from "./horde/heirloom";
import equipment from "./horde/equipment";
import relic from "./horde/relic";
import sigil from "./horde/sigil";
import upgrade from "./horde/upgrade";
import upgradePremium from "./horde/upgradePremium";
import upgradePrestige from "./horde/upgradePrestige";
import bookHorde from "./school/bookHorde";
import tower from "./horde/tower";

function playerDie() {
    if (store.state.horde.player.revive) {
        store.commit('horde/updatePlayerKey', {key: 'health', value: store.getters['mult/get']('hordeHealth')});
        store.commit('horde/updatePlayerKey', {key: 'revive', value: store.state.horde.player.revive - 1});
    } else {
        store.commit('horde/updatePlayerKey', {key: 'health', value: 0});
        store.commit('horde/updateKey', {key: 'combo', value: 0});
        store.commit('horde/updateKey', {key: 'bossFight', value: 0});

        store.commit('horde/updateKey', {key: 'enemy', value: null});

        if (store.state.horde.currentTower === null) {
            const respawnTimer = store.getters['mult/get']('hordeRespawn', store.getters['horde/baseRespawnTime']);
            store.commit('horde/updateKey', {key: 'respawn', value: respawnTimer});
            store.commit('horde/updateKey', {key: 'maxRespawn', value: respawnTimer});
        } else {
            // No respawn time for tower deaths
            store.commit('horde/updateKey', {key: 'currentTower', value: null});
            store.commit('horde/updateKey', {key: 'towerFloor', value: 0});
            store.dispatch('horde/resetStats');
        }
    }
}

function tickEnemyRespawn(seconds = 1) {
    store.commit('horde/updateKey', {key: 'enemyTimer', value: Math.min(seconds + store.state.horde.enemyTimer, HORDE_ENEMY_RESPAWN_TIME * HORDE_ENEMY_RESPAWN_MAX)});
    if (store.getters['horde/canSpawnMiniboss']) {
        store.commit('horde/updateKey', {key: 'minibossTimer', value: Math.min(seconds / store.getters['mult/get']('hordeMinibossTime') + store.state.horde.minibossTimer, 2)});
    }
}

function getDamage(amount, type, offender, defender) {
    return amount * offender[type + 'Attack'] * defender[type + 'Taken'];
}

const damageTypes = ['physic', 'magic', 'bio'];
const newSimulation = {
    dead: 0,
    time: 0,
    minibossTime: 0,
    killed: 0,
    minibossKilled: 0,
    minibossDead: 0,
    damage: 0,
    bone: 0,
    monsterPartTime: 0,
    complete: false
};

export default {
    name: 'horde',
    tickspeed: 1,
    unlockNeeded: 'hordeFeature',
    tick(seconds, oldTime, newTime) {
        store.commit('stat/add', {feature: 'horde', name: 'timeSpent', value: seconds});

        // Gain mystical shards
        const shardsMaxGain = store.getters['horde/maxMysticalShards'] - store.state.currency.horde_mysticalShard.value;
        if (shardsMaxGain > 0) {
            const gain = Math.min(randomRound(seconds * store.getters['mult/get']('hordeShardChance')), shardsMaxGain);
            if (gain > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'mysticalShard', amount: gain});
            }
        }

        // Gain corrupted flesh
        if (store.state.unlock.hordeCorruptedFlesh.use) {
            store.dispatch('currency/gain', {feature: 'horde', name: 'corruptedFlesh', amount: store.getters['mult/get'](`currencyHordeCorruptedFleshGain`) * seconds});
        }

        // Tick player cooldowns
        for (const [key, elem] of Object.entries(store.state.horde.items)) {
            if (elem.cooldownLeft > 0 || (elem.activeType === 'utility' && elem.equipped && !elem.passive)) {
                const newCooldown = elem.cooldownLeft - seconds * ((elem.equipped && !elem.passive) ? 1 : HORDE_INACTIVE_ITEM_COOLDOWN);
                store.commit('horde/updateItemKey', {
                    name: key,
                    key: 'cooldownLeft',
                    value: elem.activeType === 'utility' ? newCooldown : Math.max(0, newCooldown)
                });
            }
        }

        // Prepare combat stats
        const conversionTotal = store.getters['mult/get']('hordePhysicConversion') + store.getters['mult/get']('hordeMagicConversion') + store.getters['mult/get']('hordeBioConversion');
        const playerStats = {
            attack: store.getters['mult/get']('hordeAttack'),
            critChance: store.getters['mult/get']('hordeCritChance'),
            critMult: store.getters['mult/get']('hordeCritMult', 0, 1, 1),
            toxic: store.getters['mult/get']('hordeToxic'),
            firstStrike: store.getters['mult/get']('hordeFirstStrike'),
            spellblade: store.getters['mult/get']('hordeSpellblade'),
            cutting: store.getters['mult/get']('hordeCutting'),
            stunResist: store.getters['mult/get']('hordeStunResist'),

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
        let simulation = {...newSimulation};

        // Run combat
        while (seconds > 0) {
            let respawn = store.state.horde.respawn;
            let secondsSpent = 0;

            if (simulation.dead >= 2 && simulation.killed >= 100 && !simulation.complete) {
                // Combat simulation: gain resources based on average
                const simTime = simulation.time + simulation.minibossTime + simulation.monsterPartTime;
                let cycles = Math.floor(seconds / simTime);

                // Regular drops first
                store.dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: cycles * simulation.bone});
                store.dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: cycles * simulation.monsterPartTime * store.getters['horde/currentMonsterPart']});
                store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: cycles * simulation.damage});
                store.dispatch('horde/findItems', cycles * simulation.killed);

                // Miniboss stuff after
                secondsSpent = simTime * cycles;
                const minibossTimer = secondsSpent / store.getters['mult/get']('hordeMinibossTime') + store.state.horde.minibossTimer;
                const minibossesKilled = Math.floor(minibossTimer) - (store.state.horde.bossFight === 1 ? 1 : 0);
                store.commit('horde/updateKey', {key: 'minibossTimer', value: Math.min(minibossTimer - minibossesKilled, 2)});
                store.dispatch('horde/getMinibossReward', minibossesKilled);

                simulation.complete = true;
            } else if (respawn > 0) {
                // Wait for the player to respawn
                secondsSpent = Math.min(respawn, seconds);
                let newRespawn = respawn - secondsSpent;

                tickEnemyRespawn(secondsSpent);
                if (simulation.dead) {
                    simulation.time += secondsSpent;
                }

                store.commit('horde/updateKey', {key: 'respawn', value: newRespawn});
                if (newRespawn <= 0) {
                    store.dispatch('horde/resetStats');
                }
            } else if (store.state.horde.enemy) {
                // Tick enemy cooldowns
                for (const [key, elem] of Object.entries(store.state.horde.enemy.active)) {
                    if (elem.cooldown > 0) {
                        store.commit('horde/updateEnemyActive', {name: key, key: 'cooldown', value: Math.max(0, elem.cooldown - 1)});
                    }
                }

                const enemyStats = store.state.horde.enemy;
                let enemyHealth = enemyStats.health;
                let killEnemy = false;

                // Apply poison damage
                if (enemyStats.poison > 0) {
                    enemyHealth = Math.max(0, enemyHealth - enemyStats.poison);
                }

                if (store.state.horde.player.health > 0) {
                    const isStunned = store.state.horde.player.stun > 0;

                    // determine if the chosen attack can be used
                    let usedAttack = null;
                    if (store.state.horde.player.silence > 0) {
                        store.commit('horde/updatePlayerKey', {key: 'silence', value: Math.max(0, store.state.horde.player.silence - 1)});
                    } else if (store.state.horde.chosenActive) {
                        const item = store.state.horde.items[store.state.horde.chosenActive];
                        if ((!isStunned || item.usableInStun) && item.cooldownLeft <= 0) {
                            usedAttack = store.state.horde.chosenActive;
                        }
                    }

                    if (isStunned) {
                        store.commit('horde/updatePlayerKey', {key: 'stun', value: Math.max(0, store.state.horde.player.stun - 1 - playerStats.stunResist)});
                    }
                    if (!isStunned || usedAttack) {
                        // PLAYER ATTACK

                        const baseDamage = playerStats.attack * Math.pow(playerStats.critMult, randomRound(playerStats.critChance));
                        const divisionShieldMult = enemyStats.divisionShield + 1;
                        let damage = 0;
                        let hitShield = false;

                        if (usedAttack) {
                            store.state.horde.items[usedAttack].active(store.state.horde.items[usedAttack].level).forEach(elem => {
                                if (elem.type === 'heal') {
                                    store.commit('horde/updatePlayerKey', {key: 'health', value: Math.min(store.getters['mult/get']('hordeHealth'), store.state.horde.player.health + store.getters['mult/get']('hordeHealth') * elem.value)});
                                } else if (elem.type === 'stun') {
                                    store.commit('horde/updateEnemyKey', {key: 'stun', value: store.state.horde.enemy.stun + elem.value});
                                } else if (elem.type === 'silence') {
                                    store.commit('horde/updateEnemyKey', {key: 'silence', value: store.state.horde.enemy.silence + elem.value});
                                } else if (elem.type === 'revive') {
                                    store.commit('horde/updatePlayerKey', {key: 'revive', value: Math.min(store.getters['mult/get']('hordeRevive'), store.state.horde.player.revive + elem.value)});
                                } else if (elem.type === 'reviveAll') {
                                    store.commit('horde/updatePlayerKey', {key: 'revive', value: store.getters['mult/get']('hordeRevive')});
                                } else if (elem.type === 'divisionShield') {
                                    store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: store.state.horde.player.divisionShield + elem.value});
                                } else if (elem.type === 'removeAttack') {
                                    if (store.state.horde.fightRampage <= 0) {
                                        store.commit('horde/updateEnemyKey', {key: 'attack', value: Math.max(0, store.state.horde.enemy.attack * (1 - elem.value))});
                                    }
                                } else if (elem.type === 'poison') {
                                    store.commit('horde/updateEnemyKey', {key: 'poison', value: getDamage(elem.value * playerStats.attack / divisionShieldMult, 'bio', playerStats, enemyStats) + store.state.horde.enemy.poison});
                                    hitShield = true;
                                } else if (elem.type === 'antidote') {
                                    store.commit('horde/updatePlayerKey', {key: 'poison', value: store.state.horde.player.poison * (1 - elem.value)});
                                } else if (elem.type === 'removeStun') {
                                    store.commit('horde/updatePlayerKey', {key: 'stun', value: 0});
                                } else if (elem.type.substring(0, 6) === 'damage') {
                                    damage += getDamage(elem.value * playerStats.attack / divisionShieldMult, elem.type.substring(6).toLowerCase(), playerStats, enemyStats);
                                    hitShield = true;
                                }
                            });

                            store.commit('horde/updateKey', {key: 'chosenActive', value: null});

                            const cooldown = Math.ceil(store.state.horde.items[usedAttack].cooldown(store.state.horde.items[usedAttack].level) / (store.state.horde.items[usedAttack].masteryLevel >= 4 ? 2 : 1));
                            store.commit('horde/updateItemKey', {name: usedAttack, key: 'cooldownLeft', value: cooldown});

                            // Add stat for spellblade
                            if (cooldown >= 10 || chance(cooldown * 0.1)) {
                                store.commit('horde/updatePlayerKey', {key: 'spells', value: store.state.horde.player.spells + 1});
                            }
                        } else {
                            damageTypes.forEach(damagetype => {
                                const conversion = playerStats[damagetype + 'Conversion'];
                                if (conversion > 0) {
                                    damage += getDamage(baseDamage * conversion / divisionShieldMult, damagetype, playerStats, enemyStats)
                                }
                            });

                            // Count damage stats (basic attacks only)
                            store.commit('stat/increaseTo', {feature: 'horde', name: 'maxDamage', value: damage});
                            store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: damage});
                            if (simulation.dead) {
                                simulation.damage += damage;
                            }

                            if (playerStats.firstStrike > 0 && store.state.horde.player.hits <= 0) {
                                damage += getDamage(playerStats.attack * playerStats.firstStrike / divisionShieldMult, 'magic', playerStats, enemyStats);
                            }
                            if (store.state.horde.player.spells > 0) {
                                if (playerStats.spellblade > 0) {
                                    damage += getDamage(playerStats.attack * playerStats.spellblade / divisionShieldMult, 'magic', playerStats, enemyStats);
                                }
                                store.commit('horde/updatePlayerKey', {key: 'spells', value: store.state.horde.player.spells - 1});
                            }
                            store.commit('horde/updatePlayerKey', {key: 'hits', value: store.state.horde.player.hits + 1});

                            if (enemyHealth > damage && playerStats.cutting > 0 && enemyHealth < Infinity) {
                                damage += getDamage((enemyHealth - damage) * playerStats.cutting / divisionShieldMult, 'bio', playerStats, enemyStats);
                            }

                            if (playerStats.toxic > 0) {
                                store.commit('horde/updateEnemyKey', {key: 'poison', value: getDamage(baseDamage * playerStats.toxic / divisionShieldMult, 'bio', playerStats, enemyStats) + store.state.horde.enemy.poison});
                            }

                            hitShield = true;
                        }

                        enemyHealth = Math.max(0, enemyHealth - damage);
                        if (enemyStats.divisionShield > 0 && hitShield) {
                            store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: enemyStats.divisionShield - 1});
                        }
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

                const isEnemyStunned = enemyStats.stun > 0;

                // determine which attack to use (first one with cooldown ready)
                let usedAttack = null;
                if (enemyStats.silence > 0) {
                    store.commit('horde/updateEnemyKey', {key: 'silence', value: Math.max(0, enemyStats.silence - 1)});
                } else {
                    for (const [key, elem] of Object.entries(enemyStats.active)) {
                        if (elem.cooldown <= 0 && (elem.uses === null || elem.uses > 0)) {
                            let usePositive = false;
                            let useNegative = false;
                            let usableInStun = false;
                            store.state.horde.sigil[key].active.effect(enemyStats.sigil[key], store.state.horde.bossFight).forEach(elem => {
                                let condition = null;
                                if (elem.type === 'heal') {
                                    condition = (enemyStats.health / enemyStats.maxHealth) <= (1 - elem.value);
                                } else if (elem.type === 'stun') {
                                    condition = store.state.horde.player.stun <= 0;
                                } else if (elem.type === 'silence') {
                                    condition = store.state.horde.player.silence <= 0;
                                } else if (elem.type === 'divisionShield') {
                                    condition = enemyStats.divisionShield <= 0;
                                } else if (elem.type === 'antidote') {
                                    condition = enemyStats.poison > 0;
                                } else if (elem.type === 'removeStun') {
                                    usableInStun = true;
                                    condition = enemyStats.stun > 0;
                                }

                                if (condition === true) {
                                    usePositive = true;
                                } else if (condition === false) {
                                    useNegative = true;
                                }
                            });
                            if ((!isEnemyStunned || usableInStun) && usePositive || !useNegative) {
                                usedAttack = key;
                                break;
                            }
                        }
                    }
                }

                if (isEnemyStunned) {
                    store.commit('horde/updateEnemyKey', {key: 'stun', value: Math.max(0, enemyStats.stun - 1 - enemyStats.stunResist)});
                }
                if (!isEnemyStunned || usedAttack !== null) {
                    // ENEMY ATTACK

                    const enemyBaseDamage = enemyStats.attack * Math.pow(enemyStats.critMult + 1, randomRound(enemyStats.critChance));
                    const divisionShieldMult = store.state.horde.player.divisionShield + 1;
                    let enemyDamage = 0;
                    let hitShield = false;

                    if (usedAttack === null) {
                        // Perform a basic attack with all additional effects
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

                        if (playerHealth > enemyDamage && enemyStats.cutting > 0) {
                            enemyDamage += getDamage((playerHealth - enemyDamage) * enemyStats.cutting / divisionShieldMult, 'bio', enemyStats, playerStats);
                        }

                        if (enemyStats.toxic > 0) {
                            store.commit('horde/updatePlayerKey', {key: 'poison', value: getDamage(enemyBaseDamage * enemyStats.toxic / divisionShieldMult, 'bio', enemyStats, playerStats) + store.state.horde.player.poison});
                        }
                        store.commit('horde/updateEnemyKey', {key: 'hits', value: enemyStats.hits + 1});

                        hitShield = true;
                    } else {
                        // Perform an active attack
                        const active = store.state.horde.sigil[usedAttack].active;
                        active.effect(enemyStats.sigil[usedAttack], store.state.horde.bossFight).forEach(elem => {
                            if (elem.type === 'heal') {
                                store.commit('horde/updateEnemyKey', {key: 'health', value: Math.min(enemyStats.maxHealth, store.state.horde.enemy.health + enemyStats.maxHealth * elem.value)});
                            } else if (elem.type === 'stun') {
                                store.commit('horde/updatePlayerKey', {key: 'stun', value: store.state.horde.player.stun + elem.value});
                            } else if (elem.type === 'silence') {
                                store.commit('horde/updatePlayerKey', {key: 'silence', value: store.state.horde.player.silence + elem.value});
                            } else if (elem.type === 'divisionShield') {
                                store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: store.state.horde.enemy.divisionShield + elem.value});
                            } else if (elem.type === 'raiseAttack') {
                                store.commit('horde/updateEnemyKey', {key: 'attack', value: store.state.horde.enemy.attack * (1 + elem.value)});
                            } else if (elem.type === 'poison') {
                                store.commit('horde/updatePlayerKey', {key: 'poison', value: getDamage(elem.value * enemyStats.attack / divisionShieldMult, 'bio', enemyStats, playerStats) + store.state.horde.player.poison});
                                hitShield = true;
                            } else if (elem.type === 'antidote') {
                                store.commit('horde/updateEnemyKey', {key: 'poison', value: store.state.horde.enemy.poison * (1 - elem.value)});
                            } else if (elem.type === 'removeStun') {
                                store.commit('horde/updateEnemyKey', {key: 'stun', value: 0});
                            } else if (elem.type.substring(0, 6) === 'damage') {
                                enemyDamage += getDamage(elem.value * enemyStats.attack / divisionShieldMult, elem.type.substring(6).toLowerCase(), enemyStats, playerStats);
                                hitShield = true;
                            }
                        });

                        // Count use and apply cooldown
                        store.commit('horde/updateEnemyActive', {name: usedAttack, key: 'cooldown', value: active.cooldown(enemyStats.sigil[usedAttack], store.state.horde.bossFight)});
                        if (enemyStats.active[usedAttack].uses !== null) {
                            store.commit('horde/updateEnemyActive', {name: usedAttack, key: 'uses', value: enemyStats.active[usedAttack].uses - 1});
                        }
                    }

                    playerHealth = Math.max(0, playerHealth - enemyDamage);
                    // Only hit shield and count hits if damage was dealt
                    if (store.state.horde.player.divisionShield > 0 && hitShield) {
                        store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: store.state.horde.player.divisionShield - 1});
                    }
                }

                if (simulation.dead) {
                    if (store.state.horde.bossFight === 0) {
                        simulation.time++;
                    } else if (store.state.horde.bossFight === 1) {
                        simulation.minibossTime++;
                    }
                }

                if (playerHealth <= 0) {
                    simulation.dead++;
                    if (store.state.horde.bossFight === 1 && simulation.dead) {
                        simulation.minibossDead++;
                    }
                    // Dying to a boss resets the simulation
                    if (store.state.horde.bossFight === 2 && simulation.dead) {
                        simulation = {...newSimulation};
                    }
                    playerDie();
                } else {
                    store.commit('horde/updatePlayerKey', {key: 'health', value: playerHealth});
                }

                // Tick respawn timers
                tickEnemyRespawn(1);

                if (killEnemy && store.state.horde.enemy) {
                    if (store.state.horde.bossFight === 1 && simulation.dead) {
                        simulation.minibossKilled++;
                    }
                    // Defeating a boss resets the simulation
                    if (store.state.horde.bossFight === 2 && simulation.dead) {
                        simulation = {...newSimulation};
                    }
                    store.dispatch('horde/killEnemy');
                }

                secondsSpent = 1;

                // Apply rampage
                store.commit('horde/updateKey', {key: 'fightTime', value: store.state.horde.fightTime + secondsSpent});

                const rampageTime = store.state.horde.bossFight > 0 ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
                const newRampage = Math.floor(store.state.horde.fightTime / rampageTime);

                if (store.state.horde.enemy && newRampage > store.state.horde.fightRampage) {
                    const rampageDiff = newRampage - store.state.horde.fightRampage;
                    store.commit('horde/updateEnemyKey', {key: 'attack', value: enemyStats.attack * Math.pow(HORDE_RAMPAGE_ATTACK, rampageDiff)});
                    store.commit('horde/updateEnemyKey', {key: 'critChance', value: enemyStats.critChance + HORDE_RAMPAGE_CRIT_CHANCE * rampageDiff});
                    store.commit('horde/updateEnemyKey', {key: 'critMult', value: enemyStats.critMult + HORDE_RAMPAGE_CRIT_DAMAGE * rampageDiff});
                    store.commit('horde/updateEnemyKey', {key: 'stunResist', value: enemyStats.stunResist + HORDE_RAMPAGE_STUN_RESIST * rampageDiff});
                    store.commit('horde/updateKey', {key: 'fightRampage', value: newRampage});
                }
            } else if (store.state.horde.taunt && !store.state.horde.bossAvailable && store.state.horde.zone === store.state.stat.horde_maxZone.value) {
                store.dispatch('horde/updateEnemyStats');
            } else {
                secondsSpent = Math.min(seconds, HORDE_ENEMY_RESPAWN_TIME - store.state.horde.enemyTimer);
                tickEnemyRespawn(secondsSpent);
                if (simulation.dead) {
                    simulation.time += secondsSpent;
                }

                if (store.state.horde.zone >= HORDE_MONSTER_PART_MIN_ZONE && store.state.horde.combo > 0) {
                    store.dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: secondsSpent * store.getters['horde/currentMonsterPart']});
                    if (simulation.dead) {
                        simulation.monsterPartTime += secondsSpent;
                    }
                }

                store.dispatch('horde/updateEnemyStats');
            }

            seconds -= secondsSpent;
        }

        // Show heirloom notification after all combat happened
        if (store.state.horde.heirloomsFound !== null) {
            if (store.state.system.settings.notification.items.heirloom.value) {
                store.commit('system/addNotification', {color: 'success', timeout: 3000, message: {
                    type: 'heirloom',
                    value: store.state.horde.heirloomsFound
                }});
            }
            store.commit('horde/updateKey', {key: 'heirloomsFound', value: null});
        }

        // Get tower keys
        if (store.state.unlock.hordeBrickTower.see) {
            const dayDiff = Math.floor(newTime / (SECONDS_PER_DAY * 7)) - Math.floor(oldTime / (SECONDS_PER_DAY * 7));
            if (dayDiff > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: dayDiff}, {root: true});
            }
        }
    },
    unlock: [
        'hordeFeature', 'hordeItems', 'hordeDamageTypes', 'hordePrestige', 'hordeHeirlooms', 'hordeCorruptedFlesh', 'hordeItemMastery', 'hordeChessItems',
        'hordeBrickTower', 'hordeFireTower', 'hordeIceTower',
        ...[
            'RoyalArmor', 'RoyalStorage', 'RoyalButcher', 'RoyalCrypt',
        ].map(elem => 'hordeUpgrade' + elem),
    ],
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
        hordeStunResist: {round: true, min: 0},
        hordeEnemyActiveStart: {display: 'percent', min: 0, max: 1},

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
        hordeBossRequirement: {round: true, min: 1, max: 50},
        hordeRespawn: {display: 'time', round: true, min: 1, max: 300},
        hordeMinibossTime: {display: 'time', round: true, min: 60, baseValue: 300},
        hordeHeirloomChance: {display: 'percent', max: 1, roundNearZero: true},
        hordeHeirloomAmount: {baseValue: 1, round: true},
        hordeHeirloomEffect: {},
        hordeNostalgia: {baseValue: 25, round: true},
        hordeCorruption: {display: 'percent', min: 0, roundNearZero: true},
        hordeItemMasteryGain: {},
        hordeShardChance: {display: 'percent', baseValue: 0.0001},
    },
    multGroup: [
        {mult: 'hordeHeirloomEffect', name: 'multType', type: 'heirloomEffect'}
    ],
    currency: {
        bone: {color: 'lightest-grey', icon: 'mdi-bone', gainMult: {}, capMult: {baseValue: buildNum(5, 'M')}},
        monsterPart: {color: 'cherry', icon: 'mdi-stomach', gainMult: {display: 'perSecond'}, capMult: {baseValue: 100}},
        corruptedFlesh: {color: 'deep-purple', icon: 'mdi-food-steak', gainMult: {baseValue: 1, display: 'perSecond'}, showGainMult: true},
        mysticalShard: {color: 'teal', icon: 'mdi-billiards-rack', currencyMult: {
            hordeAttack: {type: 'mult', value: val => Math.pow(1.1, val)},
            hordeHealth: {type: 'mult', value: val => Math.pow(1.1, val)},
            currencyHordeBoneGain: {type: 'mult', value: val => Math.pow(1.1, val)}
        }},
        soulCorrupted: {color: 'purple', icon: 'mdi-ghost', overcapMult: 0.75, overcapScaling: 0.85, gainMult: {}, capMult: {min: 100}},
        soulEmpowered: {type: 'prestige', alwaysVisible: true, color: 'pink', icon: 'mdi-ghost'},
        crown: {type: 'prestige', color: 'amber', icon: 'mdi-crown-circle-outline'},
        towerKey: {type: 'prestige', color: 'light-grey', icon: 'mdi-key-variant'}
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
    rng: ['horde_heirloom', 'horde_heirloomType'],
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
        for (const [key, elem] of Object.entries(tower)) {
            store.commit('horde/initTower', {name: key, ...elem});
        }
        store.dispatch('horde/updatePlayerStats');
        store.dispatch('horde/updateEnemyStats');
        store.dispatch('mult/updateExternalCaches', 'hordeNostalgia');
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
            sigilZones: [...store.state.horde.sigilZones],
            enemyTimer: store.state.horde.enemyTimer
        };

        if (store.state.horde.enemy) {
            obj.enemy = {...store.state.horde.enemy};
        }

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

        if (store.state.horde.fightTime > 0) {
            obj.fightTime = store.state.horde.fightTime;
        }
        if (store.state.horde.fightRampage > 0) {
            obj.fightRampage = store.state.horde.fightRampage;
        }
        if (store.state.horde.minibossTimer > 0) {
            obj.minibossTimer = store.state.horde.minibossTimer;
        }
        if (store.state.horde.nostalgiaLost > 0) {
            obj.nostalgiaLost = store.state.horde.nostalgiaLost;
        }
        if (store.state.horde.chosenActive !== null) {
            obj.chosenActive = store.state.horde.chosenActive;
        }
        if (Object.keys(store.state.horde.itemStatMult).length > 0) {
            obj.itemStatMult = store.state.horde.itemStatMult;
        }
        if (store.state.horde.currentTower !== null) {
            obj.currentTower = store.state.horde.currentTower;
        }
        if (store.state.horde.towerFloor > 0) {
            obj.towerFloor = store.state.horde.towerFloor;
        }
        if (store.state.horde.taunt) {
            obj.taunt = true;
        }

        for (const [key, elem] of Object.entries(store.state.horde.tower)) {
            if (elem.highest > 0) {
                if (obj.tower === undefined) {
                    obj.tower = {};
                }
                obj.tower[key] = elem.highest;
            }
        }

        return obj;
    },
    loadGame(data) {
        ['zone', 'combo', 'respawn', 'maxRespawn', 'bossAvailable', 'bossFight', 'fightTime', 'fightRampage', 'enemyTimer', 'minibossTimer', 'nostalgiaLost', 'chosenActive', 'currentTower', 'towerFloor', 'taunt'].forEach(elem => {
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
            store.commit('horde/updateKey', {key: 'enemy', value: {}});
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
        if (data.itemStatMult) {
            for (const [key, elem] of Object.entries(data.itemStatMult)) {
                store.commit('horde/updateSubkey', {name: 'itemStatMult', key, value: elem});
                store.dispatch('system/applyEffect', {type: 'mult', name: key, multKey: `hordeItemPermanent`, value: elem + 1});
            }
        }
        if (data.tower) {
            for (const [key, elem] of Object.entries(data.tower)) {
                if (store.state.horde.tower[key]) {
                    store.commit('horde/updateTowerKey', {name: key, key: 'highest', value: elem});
                }
            }
        }
        store.dispatch('horde/checkZoneUnlocks');
        store.dispatch('mult/updateExternalCaches', 'hordeNostalgia');
        store.dispatch('horde/updateNostalgia');
        store.dispatch('horde/applyTowerEffects');
    }
}
