import store from "../../store"
import { HORDE_DAMAGE_INCREASE_PER_STRENGTH, HORDE_ENEMY_RESPAWN_MAX, HORDE_ENEMY_RESPAWN_TIME, HORDE_INACTIVE_ITEM_COOLDOWN, HORDE_MONSTER_PART_MIN_ZONE, HORDE_RAID_KEYS_PER_DAY, HORDE_RAMPAGE_ATTACK, HORDE_RAMPAGE_BOSS_TIME, HORDE_RAMPAGE_ENEMY_TIME, HORDE_RAMPAGE_STUN_RESIST, HORDE_RARE_LOOT_HOLD, HORDE_SHARD_CHANCE_REDUCTION, HORDE_TOOTH_CHANCE_REDUCTION, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";
import { chance, randomRound } from "../utils/random";
import achievement from "./horde/achievement";
import heirloom from "./horde/heirloom";
import equipment from "./horde/equipment";
import relic from "./horde/relic";
import sigil from "./horde/sigil";
import upgrade from "./horde/upgrade";
import upgrade2 from "./horde/upgrade2";
import upgradePremium from "./horde/upgradePremium";
import upgradePrestige from "./horde/upgradePrestige";
import tower from "./horde/tower";
import adventurer from "./horde/fighterClass/adventurer";
import warzone from "./horde/area/warzone";
import loveIsland from "./horde/area/loveIsland";
import monkeyJungle from "./horde/area/monkeyJungle";
import battlePass from "./horde/battlePass";
import archer from "./horde/fighterClass/archer";
import mage from "./horde/fighterClass/mage";
import knight from "./horde/fighterClass/knight";
import assassin from "./horde/fighterClass/assassin";
import shaman from "./horde/fighterClass/shaman";
import pirate from "./horde/fighterClass/pirate";
import undead from "./horde/fighterClass/undead";
import cultist from "./horde/fighterClass/cultist";
import enemyType from "./horde/enemyType";
import boss from "./horde/boss";
import scholar from "./horde/fighterClass/scholar";
import trinket from "./horde/trinket";
import sigil_boss from "./horde/sigil_boss";
import element from "./horde/element";

function playerDie() {
    if (store.state.horde.player.revive) {
        store.commit('horde/updatePlayerKey', {key: 'health', value: store.state.horde.cachePlayerStats.health});
        store.commit('horde/updatePlayerKey', {key: 'revive', value: store.state.horde.player.revive - 1});

        const reviveDivShield = store.getters['tag/values']('hordeReviveDivisionShield')[0];
        if (reviveDivShield > 0 && store.state.horde.player.divisionShield < store.getters['mult/get']('hordeDivisionShield')) {
            store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: store.state.horde.player.divisionShield +
                Math.ceil((store.getters['mult/get']('hordeDivisionShield') - store.state.horde.player.divisionShield) * reviveDivShield)
            });
        }

        return false;
    } else {
        store.commit('horde/updatePlayerKey', {key: 'health', value: 0});
        store.commit('horde/updateKey', {key: 'combo', value: 0});
        store.commit('horde/updateKey', {key: 'bossStage', value: 0});
        store.commit('horde/updateKey', {key: 'bossFight', value: false});
        store.commit('horde/updateKey', {key: 'playerBuff', value: {}});
        store.dispatch('horde/updatePlayerCache');

        store.commit('horde/updateKey', {key: 'enemy', value: null});

        if (store.state.horde.currentTower !== null) {
            // No respawn time for tower deaths
            store.commit('horde/updateKey', {key: 'currentTower', value: null});
            store.commit('horde/updateKey', {key: 'towerFloor', value: 0});
            store.dispatch('horde/resetStats');
        } else if (store.state.horde.raidboss) {
            // No respawn time for raid deaths
            store.commit('horde/updateKey', {key: 'raidboss', value: false});
            store.dispatch('horde/getRaidbossReward');
            store.dispatch('horde/resetStats');
        } else {
            const respawnTimer = store.getters['mult/get']('hordeRespawn', store.getters['horde/baseRespawnTime']);
            store.commit('horde/updateKey', {key: 'respawn', value: respawnTimer});
            store.commit('horde/updateKey', {key: 'maxRespawn', value: respawnTimer});
        }
        return true;
    }
}

function tickEnemyRespawn(seconds = 1) {
    // Assassin doubles respawn speed
    if (store.state.horde.skillLevel.sneak >= 1) {
        seconds *= 2;
    }

    store.commit('horde/updateKey', {key: 'enemyTimer', value: Math.min(seconds + store.state.horde.enemyTimer, HORDE_ENEMY_RESPAWN_TIME * HORDE_ENEMY_RESPAWN_MAX)});
    if (store.getters['horde/canCollectRareLoot']) {
        store.commit('horde/updateKey', {key: 'rareLootTimer', value: Math.min(seconds / store.getters['mult/get']('hordeRareLootTime') + store.state.horde.rareLootTimer, HORDE_RARE_LOOT_HOLD)});
    }
}

function getDamage(amount, type, offender, defender) {
    return amount * offender[type + 'Attack'] * defender[type + 'Taken'];
}

function applyCritEffects(amount) {
    const energyOnCrit = store.getters['tag/values']('hordeEnergyOnCrit')[0];
    const healOnCrit = store.getters['tag/values']('hordeHealOnCrit')[0];
    const restoreCooldownOnCrit = store.getters['tag/values']('hordeRestoreCooldownOnCrit')[0];
    const bloodOnCrit = store.getters['tag/values']('hordeBloodOnCrit')[0];
    const stunOnCrit = store.getters['tag/values']('hordeStunOnCrit')[0];

    if (energyOnCrit > 0 && store.state.horde.player.energy < store.state.horde.cachePlayerStats.energy) {
        store.dispatch('horde/updateEnergy', Math.min(store.state.horde.player.energy + energyOnCrit * amount, store.state.horde.cachePlayerStats.energy));
    }
    if (healOnCrit > 0) {
        store.commit('horde/updatePlayerKey', {key: 'health', value: Math.min(store.state.horde.cachePlayerStats.health, store.state.horde.player.health + store.state.horde.cachePlayerStats.health * store.state.horde.cachePlayerStats.healing * healOnCrit * amount)});
    }
    if (restoreCooldownOnCrit > 0) {
        tickPlayerCooldowns(restoreCooldownOnCrit * amount);
    }
    if (bloodOnCrit > 0) {
        store.dispatch('currency/gain', {feature: 'horde', name: 'blood', gainMult: true, amount: bloodOnCrit * amount * store.getters['horde/enemyBlood'](store.state.stat.horde_maxDifficulty.value, 0)});
    }
    if (stunOnCrit > 0) {
        store.commit('horde/updateEnemyKey', {key: 'stun', value: store.state.horde.enemy.stun + Math.round(stunOnCrit)});
    }
}

function tickPlayerCooldowns(seconds) {
    const hasteMult = store.state.horde.cachePlayerStats.haste * 0.01 + 1;
    for (const [key, elem] of Object.entries(store.state.horde.items)) {
        if (elem.activeType === 'utility' ? (elem.equipped && !elem.passive) : elem.cooldownLeft > 0) {
            const newCooldown = elem.cooldownLeft - seconds * (elem.activeType === 'combat' ? hasteMult : 1) * ((elem.equipped && !elem.passive) ? 1 : HORDE_INACTIVE_ITEM_COOLDOWN);
            store.commit('horde/updateItemKey', {
                name: key,
                key: 'cooldownLeft',
                value: elem.activeType === 'utility' ? newCooldown : Math.max(0, newCooldown)
            });
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
        if (elem > 0 || type === 'utility') {
            const newCooldown = elem - seconds * (type === 'combat' ? hasteMult : 1);
            store.commit('horde/updateSubkey', {
                name: 'skillActive',
                key,
                value: type === 'utility' ? newCooldown : Math.max(0, newCooldown)
            });
        }
    }
}

const damageTypes = ['physic', 'magic', 'bio'];
const newSimulation = {
    dead: 0,
    time: 0,
    killed: 0,
    damage: 0,
    bone: 0,
    blood: 0,
    monsterPartTime: 0,
    complete: false
};

export default {
    name: 'horde',
    tickspeed: 1,
    unlockNeeded: 'hordeFeature',
    forceTick(seconds, oldTime, newTime) {
        const subfeature = store.state.system.features.horde.currentSubfeature;

        // Get raid keys
        if (subfeature === 0 && store.state.unlock.hordeRaidboss.see) {
            const dayDiff = Math.floor(newTime / SECONDS_PER_DAY) - Math.floor(oldTime / SECONDS_PER_DAY);
            if (dayDiff > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'raidKey', amount: dayDiff * HORDE_RAID_KEYS_PER_DAY});
            }
        }

        // Get tower keys
        if (store.state.unlock.hordeBrickTower.see) {
            const dayDiff = Math.floor(newTime / (SECONDS_PER_DAY * 7)) - Math.floor(oldTime / (SECONDS_PER_DAY * 7));
            if (dayDiff > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'towerKey', amount: dayDiff});
            }
        }
    },
    tick(seconds) {
        store.commit('stat/add', {feature: 'horde', name: 'timeSpent', value: seconds});

        const subfeature = store.state.system.features.horde.currentSubfeature;

        // Gain mystical shards
        if (subfeature === 0) {
            let secondsLeft = seconds;
            let baseChance = store.getters['mult/get']('hordeShardChance');
            let shards = 0;
            while (secondsLeft > 0 && store.state.currency.horde_mysticalShard.value < store.state.currency.horde_mysticalShard.cap) {
                if (baseChance * secondsLeft >= 1) {
                    // guaranteed shard
                    secondsLeft -= Math.ceil(1 / baseChance);
                    baseChance /= HORDE_SHARD_CHANCE_REDUCTION;
                    shards++;
                } else {
                    if (chance(baseChance * secondsLeft)) {
                        shards++;
                    }
                    secondsLeft = 0;
                }
            }
            if (shards > 0) {
                store.dispatch('currency/gain', {feature: 'horde', name: 'mysticalShard', amount: shards});
            }
        }

        // Gain corrupted flesh
        if (store.state.unlock.hordeCorruptedFlesh.use) {
            store.dispatch('currency/gain', {feature: 'horde', name: 'corruptedFlesh', amount: store.getters['mult/get'](`currencyHordeCorruptedFleshGain`) * seconds});
        }

        // Level up player
        if (subfeature === 1) {
            const oldProgress = store.state.horde.expLevel;
            let progress = store.state.horde.expLevel;
            let secondsLeft = seconds;
            while (secondsLeft > 0) {
                const difficulty = store.getters['horde/expDifficulty'](Math.floor(progress));
                const timeUsed = Math.min((Math.floor(progress + 1) - progress) * difficulty, secondsLeft);
                progress += timeUsed / difficulty;
                secondsLeft -= timeUsed;
            }
            store.commit('horde/updateKey', {key: 'expLevel', value: progress});
            const newLvl = Math.floor(progress);
            if (newLvl > Math.floor(oldProgress)) {
                store.commit('horde/updateKey', {key: 'skillPoints', value: (newLvl - Math.floor(oldProgress)) * store.getters['mult/get']('hordeSkillPointsPerLevel') + store.state.horde.skillPoints});
                store.dispatch('horde/applyClassLevelEffects');

                const classObj = store.state.horde.fighterClass[store.state.horde.selectedClass];
                if (classObj.questsCompleted.level < classObj.quests.level.length && newLvl >= classObj.quests.level[classObj.questsCompleted.level]) {
                    store.commit('horde/updateClassQuestKey', {name: store.state.horde.selectedClass, key: 'level', value: classObj.quests.level.filter(el => newLvl >= el).length});
                    store.dispatch('horde/applyBattlePassEffects');
                }

                if (newLvl > classObj.highestLevel) {
                    store.commit('horde/updateClassKey', {name: store.state.horde.selectedClass, key: 'highestLevel', value: newLvl});
                }
            }

            // Boss pass gain
            if (store.state.horde.selectedClass === 'pirate') {
                store.dispatch('currency/gain', {feature: 'horde', name: 'lockpick', amount: store.getters['mult/get'](`currencyHordeLockpickGain`) * seconds});
            }
        }

        // Prepare combat stats
        const playerStats = store.state.horde.cachePlayerStats;
        let simulation = {...newSimulation};
        let secondsLeft = seconds;

        // Run combat
        while (secondsLeft > 0) {
            let respawn = store.state.horde.respawn;
            let secondsSpent = 0;

            if ((simulation.dead >= 2 && simulation.killed >= 100 || simulation.dead >= 10) && !simulation.complete) {
                // Combat simulation: gain resources based on average
                const simTime = simulation.time + simulation.monsterPartTime;
                let cycles = Math.floor(secondsLeft / simTime) - 1;

                if (cycles > 0) {
                    // Regular drops first
                    if (simulation.bone > 0) {
                        store.dispatch('currency/gain', {feature: 'horde', name: 'bone', gainMult: true, amount: cycles * simulation.bone});
                    }
                    if (subfeature === 0 && simulation.monsterPartTime > 0) {
                        store.dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: cycles * simulation.monsterPartTime * store.getters['horde/currentMonsterPart']});
                    }
                    if (simulation.blood > 0) {
                        store.dispatch('currency/gain', {feature: 'horde', name: 'blood', gainMult: true, amount: cycles * simulation.blood});
                    }
                    store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: cycles * simulation.damage});
                    if (subfeature === 0) {
                        store.dispatch('horde/findItems', cycles * simulation.killed);
                    }

                    // Rare loot after
                    secondsSpent = simTime * cycles;
                    const rareLootTime = store.getters['mult/get']('hordeRareLootTime');
                    const rareLootTimer = secondsSpent / rareLootTime + store.state.horde.rareLootTimer;
                    const rareLootGained = Math.floor(rareLootTimer * Math.min(rareLootTime * simulation.killed / simulation.time, 1));
                    store.commit('horde/updateKey', {key: 'rareLootTimer', value: Math.min(rareLootTimer - rareLootGained, HORDE_RARE_LOOT_HOLD)});
                    store.dispatch('horde/getRareLootReward', rareLootGained);

                    secondsLeft -= cycles * simTime;
                    tickPlayerCooldowns(cycles * simTime);
                }

                simulation.complete = true;
            } else if (respawn > 0) {
                // Wait for the player to respawn
                secondsSpent = Math.min(respawn, secondsLeft);
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
                    let item = null;
                    let activeMult = 1;
                    if (store.state.horde.player.silence > 0) {
                        store.commit('horde/updatePlayerKey', {key: 'silence', value: Math.max(0, store.state.horde.player.silence - 1 - playerStats.statusResist)});
                    } else if (store.state.horde.chosenActive) {
                        if (subfeature === 0) {
                            item = store.state.horde.items[store.state.horde.chosenActive];
                            if (item.masteryLevel >= 4) {
                                activeMult *= 1.5;
                            }
                        } else if (subfeature === 1) {
                            const split = store.state.horde.chosenActive.split('_');
                            if (split[0] === 'skill') {
                                item = store.state.horde.fighterClass[store.state.horde.selectedClass].skills[split[1]];
                            } else if (split[0] === 'trinket') {
                                item = store.state.horde.trinket[split[1]];
                            }
                        }
                        if ((!isStunned || item.usableInStun) && (subfeature === 1 ? store.state.horde.skillActive[store.state.horde.chosenActive] : item.cooldownLeft) <= 0) {
                            usedAttack = store.state.horde.chosenActive;
                        }
                    }

                    if (isStunned) {
                        store.commit('horde/updatePlayerKey', {key: 'stun', value: Math.max(0, store.state.horde.player.stun - 1 - playerStats.statusResist)});
                    }
                    if (!isStunned || usedAttack) {
                        // PLAYER ATTACK
                        const divisionShieldMult = enemyStats.divisionShield + 1;
                        let damage = 0;
                        let hitShield = false;

                        if (usedAttack && item) {
                            const activeLevel = subfeature === 1 ? (
                                usedAttack.split('_')[0] === 'skill' ? (store.state.horde.skillLevel[usedAttack.split('_')[1]] ?? 0) : (store.state.horde.trinket[usedAttack.split('_')[1]].level)
                            ) : item.level;
                            const activeCost = item.activeCost !== undefined ? item.activeCost(activeLevel) : {};
                            if (
                                (activeCost.energy === undefined || playerStats.energy >= activeCost.energy) ||
                                (activeCost.mana === undefined || playerStats.mana >= activeCost.mana)
                            ) {
                                item.active(activeLevel).forEach(elem => {
                                    let value = elem.value;
                                    if (elem.str !== undefined) {
                                        value += elem.str * playerStats.strength;
                                    }
                                    if (elem.int !== undefined) {
                                        value += elem.int * playerStats.intelligence;
                                    }
                                    let critEffect = elem.canCrit ?? 0;
                                    if (elem.type === 'heal') {
                                        critEffect = Math.max(critEffect, store.getters['tag/values']('hordeActiveHealCrit')[0]);
                                    } else if (elem.type.substring(0, 9) === 'maxdamage' || elem.type.substring(0, 6) === 'damage') {
                                        critEffect = Math.max(critEffect, store.getters['tag/values']('hordeActiveDamageCrit')[0]);
                                    }
                                    if (critEffect > 0) {
                                        const crits = Math.max(randomRound(playerStats.critChance + store.state.horde.player.nocrit * store.getters['tag/values']('hordeCritOnNonCrit')[0]), store.state.horde.player.forcecrit > store.getters['tag/values']('hordeFirstAttacksCrit')[0] ? 1 : 0);
                                        if (crits > 0) {
                                            value *= playerStats.critMult * critEffect * crits + 1;
                                            applyCritEffects(crits);
                                            store.commit('horde/updatePlayerKey', {key: 'nocrit', value: 0});
                                            if (store.state.horde.player.forcecrit > store.getters['tag/values']('hordeFirstAttacksCrit')[0]) {
                                                store.commit('horde/updatePlayerKey', {key: 'forcecrit', value: store.state.horde.player.forcecrit + 1});
                                            }
                                        } else {
                                            store.commit('horde/updatePlayerKey', {key: 'nocrit', value: store.state.horde.player.nocrit + 1});
                                        }
                                    }
                                    if (elem.type === 'heal') {
                                        store.commit('horde/updatePlayerKey', {key: 'health', value: Math.min(playerStats.health, store.state.horde.player.health + playerStats.health * activeMult * playerStats.healing * value)});
                                    } else if (elem.type === 'refillEnergy') {
                                        store.commit('horde/updatePlayerKey', {key: 'energy', value: Math.min(playerStats.energy, store.state.horde.player.energy + playerStats.energy * activeMult * value)});
                                    } else if (elem.type === 'refillMana') {
                                        store.commit('horde/updatePlayerKey', {key: 'mana', value: Math.min(playerStats.mana, store.state.horde.player.mana + playerStats.mana * activeMult * value)});
                                    } else if (elem.type === 'stun') {
                                        store.commit('horde/updateEnemyKey', {key: 'stun', value: store.state.horde.enemy.stun + Math.round(activeMult * value)});
                                    } else if (elem.type === 'silence') {
                                        store.commit('horde/updateEnemyKey', {key: 'silence', value: store.state.horde.enemy.silence + Math.round(activeMult * value)});
                                    } else if (elem.type === 'revive') {
                                        store.commit('horde/updatePlayerKey', {key: 'revive', value: Math.min(playerStats.revive, store.state.horde.player.revive + Math.round(activeMult * value))});
                                    } else if (elem.type === 'reviveAll') {
                                        store.commit('horde/updatePlayerKey', {key: 'revive', value: playerStats.revive});
                                    } else if (elem.type === 'divisionShield') {
                                        store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: Math.max(Math.min(playerStats.divisionShield, store.state.horde.player.divisionShield) + Math.round(activeMult * value), store.state.horde.player.divisionShield)});
                                    } else if (elem.type === 'removeDivisionShield') {
                                        store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: Math.ceil(store.state.horde.enemy.divisionShield * Math.pow(1 - value, activeMult))});
                                    } else if (elem.type === 'removeAttack') {
                                        if (store.state.horde.fightRampage <= 0) {
                                            store.commit('horde/updateEnemyKey', {key: 'attack', value: Math.max(0, store.state.horde.enemy.attack * Math.pow(1 - value, activeMult))});
                                        }
                                    } else if (elem.type === 'poison') {
                                        const poisonDmg = Math.max(0, getDamage(activeMult * value * playerStats.attack, 'bio', playerStats, enemyStats) - enemyStats.defense * enemyStats.maxHealth) / divisionShieldMult;
                                        if (poisonDmg > 0) {
                                            store.commit('horde/updateEnemyKey', {key: 'poison', value: poisonDmg + store.state.horde.enemy.poison});
                                            hitShield = true;
                                        }
                                    } else if (elem.type === 'antidote') {
                                        store.commit('horde/updatePlayerKey', {key: 'poison', value: store.state.horde.player.poison * Math.pow(1 - value, activeMult)});
                                    } else if (elem.type === 'removeStun') {
                                        store.commit('horde/updatePlayerKey', {key: 'stun', value: 0});
                                    } else if (elem.type === 'buff') {
                                        store.dispatch('horde/addBuff', {name: `${ subfeature === 0 ? 'equipment_' : '' }${ usedAttack }`, time: Math.round(activeMult * value), positive: true, effect: elem.effect});
                                    } else if (elem.type.substring(0, 9) === 'maxdamage') {
                                        const maxdamage = Math.max(0, enemyStats.maxHealth * (enemyHealth / enemyStats.maxHealth - playerStats.execute));
                                        damage += getDamage(activeMult * value * maxdamage, elem.type.substring(9).toLowerCase(), playerStats, enemyStats);
                                    } else if (elem.type.substring(0, 6) === 'damage') {
                                        damage += getDamage(activeMult * value * playerStats.attack, elem.type.substring(6).toLowerCase(), playerStats, enemyStats);
                                    }
                                });

                                damage = Math.max(0, damage - enemyStats.defense * enemyStats.maxHealth) / divisionShieldMult;
                                if (damage > 0) {
                                    hitShield = true;
                                }

                                if (activeCost.health !== undefined) {
                                    store.commit('horde/updatePlayerKey', {key: 'health', value: store.state.horde.player.health * (1 - activeCost.health)});
                                }
                                if (activeCost.energy !== undefined) {
                                    store.dispatch('horde/updateEnergy', store.state.horde.player.energy - activeCost.energy);
                                }
                                if (activeCost.mana !== undefined) {
                                    store.dispatch('horde/updateMana', store.state.horde.player.mana - activeCost.mana);
                                }
                                if (activeCost.mysticalShard !== undefined) {
                                    store.dispatch('currency/spend', {feature: 'horde', name: 'mysticalShard', amount: activeCost.mysticalShard});
                                    store.dispatch('horde/checkPlayerHealth');
                                }

                                const cooldown = Math.ceil(item.cooldown(activeLevel));
                                if (subfeature === 0) {
                                    store.commit('horde/updateItemKey', {name: usedAttack, key: 'cooldownLeft', value: cooldown});
                                } else if (subfeature === 1) {
                                    store.commit('horde/updateSubkey', {name: 'skillActive', key: usedAttack, value: cooldown});
                                }

                                store.dispatch('horde/updateActiveTimer', 0);

                                // Add stat for spellblade
                                store.commit('horde/updatePlayerKey', {key: 'spells', value: store.state.horde.player.spells + 1 + Math.round(store.getters['tag/values']('hordeSpellbladeOnActive')[0])});
                            }
                            store.commit('horde/updateKey', {key: 'chosenActive', value: null});
                        } else {
                            // Perform regular attack
                            const crits = Math.max(randomRound(playerStats.critChance + store.state.horde.player.nocrit * store.getters['tag/values']('hordeCritOnNonCrit')[0]), store.state.horde.player.forcecrit > store.getters['tag/values']('hordeFirstAttacksCrit')[0] ? 1 : 0);
                            const baseDamage = playerStats.attack * (HORDE_DAMAGE_INCREASE_PER_STRENGTH * playerStats.strength + 1) * (playerStats.critMult * crits + 1);

                            damageTypes.forEach(damagetype => {
                                const conversion = playerStats[damagetype + 'Conversion'];
                                if (conversion > 0) {
                                    damage += getDamage(baseDamage * conversion, damagetype, playerStats, enemyStats)
                                }
                            });

                            // Count damage stats (regular attacks only)
                            if (damage > 0) {
                                store.commit('stat/increaseTo', {feature: 'horde', name: 'maxDamage', value: damage});
                                store.commit('stat/add', {feature: 'horde', name: 'totalDamage', value: damage});
                                if (simulation.dead) {
                                    simulation.damage += damage;
                                }
                            }

                            // Apply first strike effects
                            if (store.state.horde.player.hits <= 0) {
                                if (playerStats.firstStrike > 0) {
                                    damage += getDamage(playerStats.attack * playerStats.firstStrike, 'magic', playerStats, enemyStats);
                                }
                                if (store.getters['tag/values']('hordeFirstStrikeStun')[0] > 0) {
                                    store.commit('horde/updateEnemyKey', {key: 'stun', value: store.state.horde.enemy.stun + Math.round(store.getters['tag/values']('hordeFirstStrikeStun')[0])});
                                }
                            }
                            if (store.state.horde.player.spells > 0) {
                                if (playerStats.spellblade > 0) {
                                    damage += getDamage(playerStats.attack * playerStats.spellblade, 'magic', playerStats, enemyStats);
                                }
                                store.commit('horde/updatePlayerKey', {key: 'spells', value: store.state.horde.player.spells - 1});
                            }
                            store.commit('horde/updatePlayerKey', {key: 'hits', value: store.state.horde.player.hits + 1});

                            // Apply special effects
                            const attackReduceValues = store.getters['tag/values']('hordeReduceAttackOnAttack');
                            if (attackReduceValues[0] > 0 && store.state.horde.player.hits < attackReduceValues[1]) {
                                store.commit('horde/updateEnemyKey', {key: 'attack', value: Math.max(0, store.state.horde.enemy.attack * (1 - attackReduceValues[0]))});
                            }

                            if (crits > 0) {
                                store.commit('horde/updatePlayerKey', {key: 'nocrit', value: 0});
                                if (store.state.horde.player.forcecrit > store.getters['tag/values']('hordeFirstAttacksCrit')[0]) {
                                    store.commit('horde/updatePlayerKey', {key: 'forcecrit', value: store.state.horde.player.forcecrit + 1});
                                }
                            } else {
                                store.commit('horde/updatePlayerKey', {key: 'nocrit', value: store.state.horde.player.nocrit + 1});
                            }

                            damage = Math.max(damage - enemyStats.defense * enemyStats.maxHealth, 0) / divisionShieldMult;

                            if (damage > 0) {
                                if (enemyHealth > damage && playerStats.cutting > 0 && enemyHealth < Infinity) {
                                    const maxdamage = Math.max(0, enemyStats.maxHealth * ((enemyHealth - damage) / enemyStats.maxHealth - playerStats.execute));
                                    damage += getDamage(maxdamage * playerStats.cutting / divisionShieldMult, 'bio', playerStats, enemyStats);
                                }

                                if (playerStats.toxic > 0) {
                                    store.commit('horde/updateEnemyKey', {key: 'poison', value: getDamage(baseDamage * playerStats.toxic / divisionShieldMult, 'bio', playerStats, enemyStats) + store.state.horde.enemy.poison});
                                }

                                hitShield = true;
                            }

                            if (crits > 0) {
                                applyCritEffects(crits);
                            }
                        }

                        enemyHealth = Math.max(0, enemyHealth - damage);
                        if (enemyStats.divisionShield > 0 && hitShield) {
                            store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: Math.max(enemyStats.divisionShield - 1 - playerStats.shieldbreak, 0)});
                        }
                    }

                    // select autocast
                    if (store.state.horde.chosenActive === null && store.state.horde.autocast.length > 0) {
                        const sources = store.state.horde.autocast.map(name => {
                            if (subfeature === 0) {
                                const item = store.state.horde.items[name];
                                return {ready: item.cooldownLeft <= 0, type: item.activeType, effect: item.active(item.level), activeMult: item.masteryLevel >= 4 ? 1.5 : 1, cost: item.activeCost(item.level), name};
                            } else if (subfeature === 1) {
                                const split = name.split('_');
                                if (split[0] === 'skill') {
                                    const skill = store.state.horde.fighterClass[store.state.horde.selectedClass].skills[split[1]];
                                    return {ready: store.state.horde.skillActive[name] <= 0, type: skill.activeType, effect: skill.active(skill.level), activeMult: 1, cost: skill.activeCost(skill.level), name};
                                } else if (split[0] === 'trinket') {
                                    const trinket = store.state.horde.trinket[split[1]];
                                    return {ready: store.state.horde.skillActive[name] <= 0, type: trinket.activeType, effect: trinket.active(trinket.level), activeMult: 1, cost: trinket.activeCost(trinket.level), name};
                                }
                            }
                            return {};
                        }).filter(elem => elem.ready && elem.type === 'combat' &&
                            (elem.cost.health === undefined || (store.state.horde.player.health / playerStats.health) >= 0.5) &&
                            (elem.cost.energy === undefined || (store.state.horde.player.energy >= elem.cost.energy) && (store.state.horde.player.energy / playerStats.energy) >= 0.5) &&
                            (elem.cost.mana === undefined || (store.state.horde.player.mana >= elem.cost.mana) && (store.state.horde.player.mana / playerStats.mana) >= 0.5) &&
                            (elem.cost.mysticalShard === undefined || (store.state.currency.horde_mysticalShard.value >= elem.cost.mysticalShard && store.state.currency.horde_mysticalShard.value >= store.state.currency.horde_mysticalShard.cap))
                        );
                        sources.forEach(elem => {
                            if (store.state.horde.chosenActive === null) {
                                let usePositive = false;
                                let useNegative = false;
                                elem.effect.forEach(el => {
                                    let condition = null;
                                    if (el.type === 'heal') {
                                        condition = (store.state.horde.player.health / playerStats.health) <= (1 - el.value * elem.activeMult * playerStats.healing);
                                    } else if (el.type === 'stun') {
                                        condition = store.state.horde.enemy.stun <= 0;
                                    } else if (el.type === 'silence') {
                                        condition = store.state.horde.enemy.silence <= 0;
                                    } else if (el.type === 'divisionShield') {
                                        condition = store.state.horde.player.divisionShield <= 0;
                                    } else if (el.type === 'antidote') {
                                        condition = store.state.horde.player.poison > 0;
                                    } else if (el.type === 'removeStun') {
                                        condition = store.state.horde.player.stun > 0;
                                    }

                                    if (condition === true) {
                                        usePositive = true;
                                    } else if (condition === false) {
                                        useNegative = true;
                                    }
                                    if (usePositive || !useNegative) {
                                        store.commit('horde/updateKey', {key: 'chosenActive', value: elem.name});
                                    }
                                });
                            }
                        });
                    }
                }
                if ((enemyHealth / enemyStats.maxHealth) <= playerStats.execute) {
                    if (enemyStats.revive) {
                        store.commit('horde/updateEnemyKey', {key: 'health', value: enemyStats.maxHealth});
                        store.commit('horde/updateEnemyKey', {key: 'revive', value: enemyStats.revive - 1});
                    } else {
                        if (simulation.dead) {
                            simulation.killed++;
                            if (subfeature === 0) {
                                simulation.bone += store.getters['horde/currentBone'] * store.state.horde.enemy.loot;
                            } else if (subfeature === 1) {
                                simulation.blood += store.getters['horde/currentBlood'] * store.state.horde.enemy.loot;
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

                const isEnemyStunned = enemyStats.stun > 0;

                // determine which attack to use (first one with cooldown ready)
                let usedAttack = null;
                if (enemyStats.silence > 0) {
                    store.commit('horde/updateEnemyKey', {key: 'silence', value: Math.max(0, enemyStats.silence - 1 - enemyStats.statusResist)});
                } else {
                    for (const [key, elem] of Object.entries(enemyStats.active)) {
                        if (elem.cooldown <= 0 && (elem.uses === null || elem.uses > 0)) {
                            let usePositive = false;
                            let useNegative = false;
                            let usableInStun = false;
                            const activeEffect = (subfeature === 0 && store.getters['horde/currentElement'] !== null && store.state.horde.currentTower === null && !store.state.horde.raidboss) ?
                                store.state.horde.element[store.getters['horde/currentElement']].enemyActives(elem.power, store.state.horde.bossFight)[key].effect :
                                store.state.horde.sigil[key].active.effect(enemyStats.sigil[key], store.state.horde.bossFight);

                            activeEffect.forEach(el => {
                                let condition = null;
                                if (el.type === 'heal') {
                                    condition = (enemyStats.health / enemyStats.maxHealth) <= (1 - el.value);
                                } else if (el.type === 'stun') {
                                    condition = store.state.horde.player.stun <= 0;
                                } else if (el.type === 'silence') {
                                    condition = store.state.horde.player.silence <= 0;
                                } else if (el.type === 'divisionShield') {
                                    condition = enemyStats.divisionShield <= 0;
                                } else if (el.type === 'antidote') {
                                    condition = enemyStats.poison > 0;
                                } else if (el.type === 'removeStun') {
                                    usableInStun = true;
                                    condition = enemyStats.stun > 0;
                                }

                                if (condition === true) {
                                    usePositive = true;
                                } else if (condition === false) {
                                    useNegative = true;
                                }
                            });
                            if ((!isEnemyStunned || usableInStun) && (usePositive || !useNegative)) {
                                usedAttack = key;
                                break;
                            }
                        }
                    }
                }

                if (isEnemyStunned) {
                    store.commit('horde/updateEnemyKey', {key: 'stun', value: Math.max(0, enemyStats.stun - 1 - enemyStats.statusResist)});
                }
                if (!isEnemyStunned || usedAttack !== null) {
                    // ENEMY ATTACK

                    const enemyBaseDamage = enemyStats.attack * Math.pow(enemyStats.critMult + 1, randomRound(enemyStats.critChance));
                    const divisionShieldMult = store.state.horde.player.divisionShield + 1;
                    let enemyDamage = 0;
                    let hitShield = false;

                    if (usedAttack === null) {
                        // Perform a regular attack with all additional effects
                        const enemyConversionTotal = enemyStats.physicConversion + enemyStats.magicConversion + enemyStats.bioConversion;
                        damageTypes.forEach(damagetype => {
                            const conversion = enemyStats[damagetype + 'Conversion'] / enemyConversionTotal;
                            if (conversion > 0) {
                                enemyDamage += getDamage(enemyBaseDamage * conversion, damagetype, enemyStats, playerStats);
                            }
                        });
                        if (enemyStats.firstStrike > 0 && enemyStats.hits <= 0) {
                            enemyDamage += getDamage(enemyStats.attack * enemyStats.firstStrike, 'magic', enemyStats, playerStats);
                        }

                        if (playerHealth > enemyDamage && enemyStats.cutting > 0) {
                            enemyDamage += getDamage((playerHealth - enemyDamage) * enemyStats.cutting, 'bio', enemyStats, playerStats);
                        }

                        enemyDamage = Math.max(0, enemyDamage - playerStats.defense * playerStats.health) / divisionShieldMult;

                        if (enemyDamage > 0) {
                            if (enemyStats.toxic > 0) {
                                store.commit('horde/updatePlayerKey', {key: 'poison', value: getDamage(enemyBaseDamage * enemyStats.toxic / divisionShieldMult, 'bio', enemyStats, playerStats) + store.state.horde.player.poison});
                            }
                            store.commit('horde/updateEnemyKey', {key: 'hits', value: enemyStats.hits + 1});

                            hitShield = true;
                        }
                    } else {
                        // Perform an active attack
                        const isElemental = store.getters['horde/currentElement'] !== null && store.state.horde.currentTower === null && !store.state.horde.raidboss;
                        const active = isElemental ? null : store.state.horde.sigil[usedAttack].active;
                        const activeEffect = isElemental ?
                            store.state.horde.element[store.getters['horde/currentElement']].enemyActives(enemyStats.active[usedAttack].power, store.state.horde.bossFight)[usedAttack].effect :
                            active.effect(enemyStats.sigil[usedAttack], store.state.horde.bossFight);
                        activeEffect.forEach(elem => {
                            if (elem.type === 'heal') {
                                store.commit('horde/updateEnemyKey', {key: 'health', value: Math.min(enemyStats.maxHealth, store.state.horde.enemy.health + enemyStats.maxHealth * elem.value)});
                            } else if (elem.type === 'stun') {
                                store.commit('horde/updatePlayerKey', {key: 'stun', value: store.state.horde.player.stun + elem.value});
                            } else if (elem.type === 'silence') {
                                store.commit('horde/updatePlayerKey', {key: 'silence', value: store.state.horde.player.silence + elem.value});
                            } else if (elem.type === 'divisionShield') {
                                store.commit('horde/updateEnemyKey', {key: 'divisionShield', value: Math.max(Math.min(enemyStats.divisionShield, store.state.horde.enemy.divisionShield) + elem.value, store.state.horde.enemy.divisionShield)});
                            } else if (elem.type === 'removeDivisionShield') {
                                store.commit('horde/updatePlayerKey', {key: 'divisionShield', value: Math.ceil(store.state.horde.player.divisionShield * (1 - elem.value))});
                            } else if (elem.type === 'gainStat') {
                                const split = elem.stat.split('_');
                                if (split[1] === 'base') {
                                    store.commit('horde/updateEnemyKey', {key: split[0], value: store.state.horde.enemy[split[0]] + elem.value});
                                } else if (split[1] === 'mult') {
                                    store.commit('horde/updateEnemyKey', {key: split[0], value: store.state.horde.enemy[split[0]] * elem.value});
                                }
                            } else if (elem.type === 'poison') {
                                const poisonDmg = Math.max(0, getDamage(elem.value * enemyStats.attack, 'bio', enemyStats, playerStats) - playerStats.defense * playerStats.health) / divisionShieldMult;
                                if (poisonDmg > 0) {
                                    store.commit('horde/updatePlayerKey', {key: 'poison', value: poisonDmg + store.state.horde.player.poison});
                                    hitShield = true;
                                }
                            } else if (elem.type === 'antidote') {
                                store.commit('horde/updateEnemyKey', {key: 'poison', value: store.state.horde.enemy.poison * (1 - elem.value)});
                            } else if (elem.type === 'removeStun') {
                                store.commit('horde/updateEnemyKey', {key: 'stun', value: 0});
                            } else if (elem.type === 'removeAttack') {
                                store.dispatch('horde/updatePlayerAttackMult', Math.max(0, store.state.horde.playerAttackMult * (1 - elem.value)));
                            } else if (elem.type.substring(0, 9) === 'maxdamage') {
                                const maxdamage = Math.max(0, playerStats.health * (playerHealth / playerStats.health - enemyStats.execute));
                                const dmg = getDamage(elem.value * maxdamage, elem.type.substring(9).toLowerCase(), enemyStats, playerStats);
                                enemyDamage += Math.max(0, dmg - playerStats.defense * playerStats.health) / divisionShieldMult;
                                if (enemyDamage > 0) {
                                    hitShield = true;
                                }
                            } else if (elem.type.substring(0, 6) === 'damage') {
                                const dmg = getDamage(elem.value * enemyStats.attack, elem.type.substring(6).toLowerCase(), enemyStats, playerStats);
                                enemyDamage += Math.max(0, dmg - playerStats.defense * playerStats.health) / divisionShieldMult;
                                if (enemyDamage > 0) {
                                    hitShield = true;
                                }
                            }
                        });

                        // Count use and apply cooldown
                        store.commit('horde/updateEnemyActive', {name: usedAttack, key: 'cooldown', value: isElemental ?
                            store.state.horde.element[store.getters['horde/currentElement']].enemyActives(enemyStats.active[usedAttack].power, store.state.horde.bossFight)[usedAttack].cooldown :
                            active.cooldown(enemyStats.sigil[usedAttack], store.state.horde.bossFight)
                        });
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
                    if (!store.state.horde.bossFight) {
                        simulation.time++;
                    }
                }

                if ((playerHealth / playerStats.health) <= enemyStats.execute) {
                    if (playerDie()) {
                        // Dying to a boss resets the simulation
                        if (store.state.horde.bossFight && simulation.dead) {
                            simulation = {...newSimulation};
                        }
                        simulation.dead++;
                    }
                } else {
                    store.commit('horde/updatePlayerKey', {key: 'health', value: playerHealth});
                }

                // Tick respawn timers
                tickEnemyRespawn(1);

                if (killEnemy && store.state.horde.enemy) {
                    const wasBoss = store.state.horde.bossFight;
                    // Defeating a boss resets the simulation
                    if (store.state.horde.bossFight && simulation.dead) {
                        simulation = {...newSimulation};
                    }
                    store.dispatch('horde/killEnemy', store.state.horde.fightTime);
                    if (subfeature === 1 && !wasBoss && store.state.horde.combo === 0) {
                        // Resetting enemy count counts as death for classes subfeature
                        simulation.dead++;
                    }
                }

                secondsSpent = 1;

                // Apply rampage
                store.commit('horde/updateKey', {key: 'fightTime', value: store.state.horde.fightTime + secondsSpent});

                // Apply current health effects
                store.dispatch('horde/updateHealthStats');

                // Apply after x time effects
                store.dispatch('horde/applyTimeStats');

                const rampageTime = store.state.horde.bossFight ? HORDE_RAMPAGE_BOSS_TIME : HORDE_RAMPAGE_ENEMY_TIME;
                const newRampage = Math.floor(store.state.horde.fightTime / rampageTime);

                if (store.state.horde.enemy && newRampage > store.state.horde.fightRampage) {
                    const rampageDiff = newRampage - store.state.horde.fightRampage;
                    store.commit('horde/updateEnemyKey', {key: 'attack', value: enemyStats.attack * Math.pow(HORDE_RAMPAGE_ATTACK, rampageDiff)});
                    store.commit('horde/updateEnemyKey', {key: 'statusResist', value: enemyStats.statusResist + HORDE_RAMPAGE_STUN_RESIST * rampageDiff});
                    store.commit('horde/updateKey', {key: 'fightRampage', value: newRampage});
                }
            } else if (subfeature === 1 && store.state.horde.selectedArea === null) {
                secondsLeft = 0;
            } else if (subfeature === 0 && store.state.horde.taunt && !store.state.horde.bossAvailable && store.state.horde.zone === store.state.stat.horde_maxZone.value) {
                store.dispatch('horde/updateEnemyStats');
            } else {
                secondsSpent = Math.max(Math.min(secondsLeft, HORDE_ENEMY_RESPAWN_TIME - store.state.horde.enemyTimer), 1);
                tickEnemyRespawn(secondsSpent);
                if (simulation.dead) {
                    simulation.time += secondsSpent;
                }

                if (subfeature === 0 && store.state.horde.zone >= HORDE_MONSTER_PART_MIN_ZONE && store.state.horde.combo > 0) {
                    store.dispatch('currency/gain', {feature: 'horde', name: 'monsterPart', gainMult: true, amount: secondsSpent * store.getters['horde/currentMonsterPart']});
                    if (simulation.dead) {
                        simulation.monsterPartTime += secondsSpent;
                    }
                }

                store.dispatch('horde/updateEnemyStats');
            }

            // Apply recovery
            if (store.state.horde.player.health > 0) {
                const passiveRecovery = store.getters['tag/values']('hordePassiveRecovery')[0] * playerStats.recovery * playerStats.healing;
                const missingHealth = playerStats.health - store.state.horde.player.health;
                if (passiveRecovery > 0 && missingHealth > 0) {
                    store.commit('horde/updatePlayerKey', {key: 'health', value: Math.min(playerStats.health, store.state.horde.player.health + missingHealth * passiveRecovery)});
                }
            }

            // Tick player buffs
            let newBuffs = {};
            let refreshCache = false;
            for (const [key, elem] of Object.entries(store.state.horde.playerBuff)) {
                const newTime = elem.time - secondsSpent;
                if (newTime > 0) {
                    newBuffs[key] = {...elem, time: newTime};
                } else {
                    refreshCache = true;
                }
            }
            store.commit('horde/updateKey', {key: 'playerBuff', value: newBuffs});
            if (refreshCache) {
                store.dispatch('horde/updatePlayerCache');
            }

            store.dispatch('horde/updateActiveTimer', store.state.horde.activeTimer + secondsSpent);

            tickPlayerCooldowns(secondsSpent);

            // Regen energy and mana
            if (playerStats.energyRegen > 0 && store.state.horde.player.energy < playerStats.energy) {
                store.dispatch('horde/updateEnergy', Math.min(store.state.horde.player.energy + playerStats.energyRegen * secondsSpent, playerStats.energy));
            }
            if (playerStats.manaRegen > 0 && store.state.horde.player.mana < playerStats.mana) {
                store.dispatch('horde/updateMana', Math.min(store.state.horde.player.mana + playerStats.manaRegen * secondsSpent, playerStats.mana));
            }

            secondsLeft -= secondsSpent;
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
    },
    unlock: [
        'hordeFeature', 'hordeEquipment', 'hordeDamageTypes', 'hordePrestige', 'hordeHeirlooms',
        'hordeRaidboss', 'hordeCorruptedFlesh', 'hordeEquipmentMastery', 'hordeChessEquipment',
        'hordeBrickTower', 'hordeFireTower', 'hordeIceTower', 'hordeDangerTower', 'hordeToxicTower', 'hordeForestTower',
        ...[
            'Armor', 'Storage', 'Butcher', 'Crypt', 'Secret', 'Blessing',
        ].map(elem => 'hordeUpgradeRoyal' + elem),
        ...[
            'Sword', 'Armor', 'Bow', 'Flame', 'Water', 'Shield',
        ].map(elem => 'hordeEquipmentBlessed' + elem),
        ...[
            'Warzone', 'MonkeyJungle', 'LoveIsland',
        ].map(elem => 'hordeMonsterTooth' + elem),
        'hordeClassesSubfeature', 'hordeSacrifice', 'hordeEndOfContent'
    ],
    stat: {
        maxZone: {value: 1, showInStatistics: true},
        maxDifficulty: {showInStatistics: true},
        totalDamage: {showInStatistics: true},
        maxDamage: {showInStatistics: true},
        timeSpent: {display: 'time'},
        bestPrestige0: {showInStatistics: true},
        bestPrestige1: {showInStatistics: true},
        prestigeCount: {showInStatistics: true},
        maxZoneSpeedrun: {value: 1},
        maxItems: {},
        maxCorruptionKill: {display: 'percent', showInStatistics: true},
        maxMastery: {},
        totalMastery: {},
        unlucky: {},
        warzoneInfiniteScore: {showInStatistics: true},
        monkeyJungleInfiniteScore: {showInStatistics: true},
        loveIslandInfiniteScore: {showInStatistics: true},
    },
    mult: {
        // Base combat stats
        hordeAttack: {},
        hordeHealth: {},
        hordeRecovery: {display: 'percent', min: 0, max: 1},
        hordeCritChance: {display: 'percent'},
        hordeCritMult: {display: 'percent', baseValue: 0.75},
        hordeRevive: {round: true, min: 0},
        hordeToxic: {display: 'percent'},
        hordeFirstStrike: {display: 'percent'},
        hordeSpellblade: {display: 'percent'},
        hordeCutting: {display: 'percent', min: 0},
        hordeDivisionShield: {round: true, min: 0},
        hordeStatusResist: {round: true, min: 0},
        hordeShieldbreak: {round: true, min: 0},
        hordeEnemyActiveStart: {display: 'percent', min: 0, max: 1},
        hordeDefense: {display: 'percent', min: 0},
        hordeExecute: {display: 'percent', min: 0, max: 0.75},
        hordeHealing: {display: 'percent', baseValue: 1, min: 0},

        // Damage type specifics
        hordePhysicConversion: {display: 'percent', baseValue: 1},
        hordeMagicConversion: {display: 'percent', baseValue: 0},
        hordeBioConversion: {display: 'percent', baseValue: 0},
        hordePhysicAttack: {display: 'percent', baseValue: 1},
        hordeMagicAttack: {display: 'percent', baseValue: 1},
        hordeBioAttack: {display: 'percent', baseValue: 1},
        hordePhysicTaken: {display: 'percent', isPositive: false, baseValue: 1},
        hordeMagicTaken: {display: 'percent', isPositive: false, baseValue: 1},
        hordeBioTaken: {display: 'percent', isPositive: false, baseValue: 1},

        // Utility stats
        hordeMaxEquipment: {round: true, baseValue: 1},
        hordeEquipmentChance: {display: 'percent'},
        hordeBossRequirement: {round: true, isPositive: false, min: 1, max: 50},
        hordeRespawn: {display: 'time', round: true, isPositive: false, min: 1, max: 300},
        hordeRareLootTime: {display: 'time', round: true, isPositive: false, min: 60, baseValue: 300},
        hordeHeirloomChance: {display: 'percent', max: 1, roundNearZero: true},
        hordeHeirloomAmount: {baseValue: 1, round: true},
        hordeHeirloomEffect: {},
        hordeNostalgia: {baseValue: 25, round: true},
        hordeCorruption: {display: 'percent', isPositive: false, min: 0, roundNearZero: true},
        hordeEquipmentMasteryGain: {},
        hordeShardChance: {display: 'percent', baseValue: 0.001},
        hordeTrinketGain: {},
        hordeTrinketQuality: {min: 0},
        hordeMaxSacrifice: {round: true, baseValue: 1},
        hordeEssenceGain: {},
        hordeToothGain: {display: 'percent'},

        hordePremiumAncientCap: {},

        // Raidboss stats
        hordeRaidAttack: {display: 'mult', baseValue: 0.05},
        hordeRaidHealth: {display: 'mult'},
        hordeRaidEquipmentChance: {display: 'mult'},
        hordeRaidBoneGain: {display: 'mult'},
        hordeRaidMonsterPartGain: {display: 'mult'},
        hordeRaidSoulCorruptedGain: {display: 'mult'},

        // Classes stats
        hordeEnergy: {round: true},
        hordeEnergyRegen: {display: 'perSecond'},
        hordeMana: {round: true},
        hordeManaRegen: {display: 'perSecond'},
        hordeHaste: {min: -75},
        hordeStrength: {},
        hordeIntelligence: {},
        hordeExpBase: {display: 'time', isPositive: false},
        hordeExpIncrement: {display: 'mult', isPositive: false, min: 0},
        hordeMaxTrinkets: {baseValue: 1, round: true},
        hordeSkillPointsPerLevel: {baseValue: 10, round: true},
        hordeAutocast: {round: true},
        hordeCourageScore: {},

        hordePrestigeIncome: {group: ['currencyHordeSoulCorruptedGain', 'currencyHordeSoulCorruptedCap', 'currencyHordeCourageGain']}
    },
    multGroup: [
        {mult: 'hordeHeirloomEffect', name: 'multType', type: 'heirloomEffect'},
        {mult: 'hordePremiumAncientCap', name: 'upgradeCap', subtype: 'premiumAncient'},
        {mult: 'hordeEssenceGain', name: 'currencyGain', subtype: 'essence'},
        {mult: 'hordeToothGain', name: 'currencyGain', subtype: 'tooth'},
    ],
    currency: {
        bone: {color: 'lightest-grey', icon: 'mdi-bone', gainMult: {}, capMult: {baseValue: buildNum(5, 'M')}},
        monsterPart: {color: 'cherry', icon: 'mdi-stomach', showHint: true, gainMult: {display: 'perSecond'}, capMult: {baseValue: 100}},
        corruptedFlesh: {color: 'deep-purple', icon: 'mdi-food-steak', gainMult: {baseValue: 1, display: 'perSecond'}, showGainMult: true, showGainTimer: true},
        mysticalShard: {color: 'teal', icon: 'mdi-billiards-rack', showHint: true, display: 'int', overcapMult: 0, capMult: {baseValue: 0}, currencyMult: {
            hordeAttack: {type: 'mult', value: val => Math.pow(1.008, val)},
            hordeHealth: {type: 'mult', value: val => Math.pow(1.008, val)},
            currencyHordeBoneGain: {type: 'mult', value: val => Math.pow(1.008, val)},
            hordeShardChance: {type: 'mult', value: val => Math.pow(1 / HORDE_SHARD_CHANCE_REDUCTION, val)}
        }},
        soulCorrupted: {color: 'purple', icon: 'mdi-ghost', overcapMult: 0.75, overcapScaling: 0.85, gainMult: {}, capMult: {min: 200}, gainTimerFunction() {
            return store.getters['mult/get']('currencyHordeSoulCorruptedGain') / store.getters['mult/get']('hordeRareLootTime');
        }, timerIsEstimate: true},
        soulEmpowered: {type: 'prestige', alwaysVisible: true, color: 'pink', icon: 'mdi-ghost'},
        courage: {type: 'prestige', alwaysVisible: true, color: 'orange', icon: 'mdi-ghost', gainMult: {}},
        crown: {type: 'prestige', color: 'amber', icon: 'mdi-crown-circle-outline', display: 'int'},
        raidKey: {type: 'prestige', color: 'pale-orange', icon: 'mdi-key', overcapMult: 0, overcapFunction(amount) {
            store.dispatch('horde/getRaidbossReward', amount);
        }, capMult: {baseValue: 30}, display: 'int'},
        towerKey: {type: 'prestige', color: 'light-grey', icon: 'mdi-key-variant', display: 'int'},
        blood: {color: 'red', icon: 'mdi-iv-bag', gainMult: {}, capMult: {baseValue: 7500}},
        lockpick: {color: 'orange-red', icon: 'mdi-screwdriver', overcapMult: 0.9, overcapScaling: 0.75, gainMult: {}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 7}},

        // Essence
        fireEssence: {type: 'prestige', subtype: 'essence', color: 'deep-orange', icon: 'mdi-fire', gainMult: {}},
        thunderEssence: {type: 'prestige', subtype: 'essence', color: 'amber', icon: 'mdi-lightning-bolt', gainMult: {}},
        windEssence: {type: 'prestige', subtype: 'essence', color: 'light-blue', icon: 'mdi-weather-windy', gainMult: {}},
        waterEssence: {type: 'prestige', subtype: 'essence', color: 'dark-blue', icon: 'mdi-water', gainMult: {}},
        iceEssence: {type: 'prestige', subtype: 'essence', color: 'cyan', icon: 'mdi-snowflake', gainMult: {}},
        earthEssence: {type: 'prestige', subtype: 'essence', color: 'brown', icon: 'mdi-image-filter-hdr', gainMult: {}},
        natureEssence: {type: 'prestige', subtype: 'essence', color: 'green', icon: 'mdi-leaf', gainMult: {}},
        lightEssence: {type: 'prestige', subtype: 'essence', color: 'light-grey', icon: 'mdi-white-balance-sunny', gainMult: {}},
        shadowEssence: {type: 'prestige', subtype: 'essence', color: 'darker-grey', icon: 'mdi-weather-night', gainMult: {}},

        // Monster teeth
        monsterToothWarzone: {subtype: 'tooth', color: 'orange', icon: 'mdi-tooth', display: 'int', overcapMult: 0, gainMult: {baseValue: 0.05, display: 'percent'}, capMult: {baseValue: 0}, currencyMult: {
            hordeAttack: {type: 'mult', value: val => Math.pow(1.08, val)},
            hordeHealth: {type: 'mult', value: val => Math.pow(1.08, val)},
            currencyHordeMonsterToothWarzoneGain: {type: 'mult', value: val => Math.pow(1 / HORDE_TOOTH_CHANCE_REDUCTION, val)}
        }},
        monsterToothMonkeyJungle: {subtype: 'tooth', color: 'pale-green', icon: 'mdi-tooth', display: 'int', overcapMult: 0, gainMult: {baseValue: 0.05, display: 'percent'}, capMult: {baseValue: 0}},
        monsterToothLoveIsland: {subtype: 'tooth', color: 'babypink', icon: 'mdi-tooth', display: 'int', overcapMult: 0, gainMult: {baseValue: 0.05, display: 'percent'}, capMult: {baseValue: 0}},
    },
    upgrade: {
        ...upgrade,
        ...upgrade2,
        ...upgradePrestige,
        ...upgradePremium,
    },
    tag: {
        hordeEnergyToStr: {params: ['number'], stacking: 'add'},
        hordeEnergyToEnergyReg: {params: ['perSecond'], stacking: 'add'},
        hordeManaToHaste: {params: ['number'], stacking: 'add'},
        hordeEnergyOnCrit: {params: ['number'], stacking: 'add'},
        hordeHealOnCrit: {params: ['percent'], stacking: 'add'},
        hordeRestoreCooldownOnCrit: {params: ['time'], stacking: 'add'},
        hordeBloodOnCrit: {params: ['percent'], stacking: 'add'},
        hordeManaRest: {params: ['time', 'perSecond'], stacking: 'add'},
        hordeManasteal: {params: ['number'], stacking: 'add'},
        hordePassiveRecovery: {params: ['percent'], stacking: 'add'},
        hordeActiveDamageCrit: {params: ['percent'], stacking: 'add'},
        hordeActiveHealCrit: {params: ['percent'], stacking: 'add'},
        hordeFirstStrikeStun: {params: ['time'], stacking: 'add'},
        hordeSpellbladeOnActive: {params: ['number'], stacking: 'add'},
        hordeCritOnNonCrit: {params: ['percent'], stacking: 'add'},
        hordeStunOnCrit: {params: ['time'], stacking: 'add'},
        hordeReviveDivisionShield: {params: ['percent'], stacking: 'add'},
        hordeReduceAttackOnAttack: {params: ['percent', 'number'], stacking: 'add'},
        hordeAttackAfterTime: {params: ['mult'], stacking: 'add'},
        hordeStrIntAfterTime: {params: ['number'], stacking: 'add'},
        hordeFirstAttacksCrit: {params: ['number'], stacking: 'add'},
        hordeFastKillBonusBlood: {params: ['percent'], stacking: 'add'},
        hordeAttackPerMissingHealth: {params: ['number'], stacking: 'add'},
        hordeStrIntPerMissingHealth: {params: ['number'], stacking: 'add'},
    },
    relic,
    achievement,
    note: buildArray(31).map(() => 'g'),
    consumable: {
        manaPotion: {
            icon: 'mdi-flask-round-bottom',
            color: 'dark-blue',
            price: {gem_sapphire: 35}
        }
    },
    init() {
        for (const [key, elem] of Object.entries(equipment)) {
            store.commit('horde/initItem', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(heirloom)) {
            store.dispatch('horde/initHeirloom', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries({...sigil, ...sigil_boss})) {
            store.commit('horde/initSigil', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(tower)) {
            store.commit('horde/initTower', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries({adventurer, archer, mage, knight, pirate, assassin, shaman, undead, cultist, scholar})) {
            if (elem.unlock) {
                store.commit('unlock/init', elem.unlock);
            }
            store.commit('horde/initFighterClass', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries({warzone, monkeyJungle, loveIsland})) {
            if (elem.unlock) {
                store.commit('unlock/init', elem.unlock);
            }
            store.commit('horde/initArea', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(trinket)) {
            store.commit('horde/initTrinket', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(enemyType)) {
            store.commit('horde/initEnemyType', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(boss)) {
            store.commit('horde/initAreaBoss', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(element)) {
            store.commit('horde/initElement', {name: key, ...elem});
        }
        store.commit('horde/updateKey', {key: 'battlePassEffect', value: battlePass});
        store.dispatch('horde/updatePlayerStats');
        store.dispatch('horde/updateEnemyStats');
        store.dispatch('mult/updateExternalCaches', 'hordeNostalgia');
        store.dispatch('horde/updatePlayerCache');
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

        if (Object.keys(store.state.horde.playerBuff).length > 0) {
            obj.playerBuff = store.state.horde.playerBuff;
        }

        if (store.state.horde.enemy) {
            obj.enemy = {...store.state.horde.enemy};
        }

        if (store.state.unlock.hordeEquipment.see) {
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
                    if (elem.stacks > 0) {
                        obj.items[key].stacks = elem.stacks;
                    }
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
                return {name: encodeURIComponent(elem.name), content: elem.content};
            });
        }

        for (const [key, elem] of Object.entries(store.state.horde.heirloom)) {
            if (elem.amount > 0) {
                if (obj.heirloom === undefined) {
                    obj.heirloom = {};
                }
                obj.heirloom[key] = [elem.amount];
                if (elem.boost > 0 || elem.level > 0) {
                    obj.heirloom[key].push(elem.boost, elem.level);
                }
            }
        }

        if (store.state.horde.fightTime > 0) {
            obj.fightTime = store.state.horde.fightTime;
        }
        if (store.state.horde.fightRampage > 0) {
            obj.fightRampage = store.state.horde.fightRampage;
        }
        if (store.state.horde.rareLootTimer > 0) {
            obj.rareLootTimer = store.state.horde.rareLootTimer;
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
        if (store.state.horde.selectedClass !== null) {
            obj.selectedClass = store.state.horde.selectedClass;
        }
        if (store.state.horde.selectedArea !== null) {
            obj.selectedArea = store.state.horde.selectedArea;
        }
        if (store.state.horde.expLevel > 0) {
            obj.expLevel = store.state.horde.expLevel;
        }
        if (store.state.horde.skillPoints > 0) {
            obj.skillPoints = store.state.horde.skillPoints;
        }
        if (store.state.horde.activeTimer > 0) {
            obj.activeTimer = store.state.horde.activeTimer;
        }
        if (store.state.horde.bossStage > 0) {
            obj.bossStage = store.state.horde.bossStage;
        }
        if (store.state.horde.trinketDrop !== null) {
            obj.trinketDrop = store.state.horde.trinketDrop;
        }
        if (store.state.horde.bossBonusDifficulty > 0) {
            obj.bossBonusDifficulty = store.state.horde.bossBonusDifficulty;
        }
        if (store.state.horde.autocast.length > 0) {
            obj.autocast = store.state.horde.autocast;
        }
        if (store.state.horde.sacrificeLevel > 0) {
            obj.sacrificeLevel = store.state.horde.sacrificeLevel;
        }
        if (store.state.horde.nextSacrificeLevel > 0) {
            obj.nextSacrificeLevel = store.state.horde.nextSacrificeLevel;
        }
        if (store.state.horde.raidboss) {
            obj.raidboss = true;
        }
        if (store.state.horde.raidbossDefeated > 0) {
            obj.raidbossDefeated = store.state.horde.raidbossDefeated;
        }
        if (store.state.horde.raidbossStacks > 0) {
            obj.raidbossStacks = store.state.horde.raidbossStacks;
        }
        if (store.state.horde.courageScore > 0) {
            obj.courageScore = store.state.horde.courageScore;
        }
        if (store.state.horde.playerAttackMult !== 1) {
            obj.playerAttackMult = store.state.horde.playerAttackMult;
        }

        for (const [key, elem] of Object.entries(store.state.horde.tower)) {
            if (elem.highest > 0) {
                if (obj.tower === undefined) {
                    obj.tower = {};
                }
                obj.tower[key] = elem.highest;
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.element)) {
            if (Math.max(elem.upgradeEnemyStats, elem.upgradeEnemyActives, elem.upgradePlayerElemental, elem.upgradePlayerStats) > 0) {
                if (obj.element === undefined) {
                    obj.element = {};
                }
                obj.element[key] = [elem.upgradeEnemyStats, elem.upgradeEnemyActives, elem.upgradePlayerElemental, elem.upgradePlayerStats];
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.skillLevel)) {
            if (elem > 0) {
                if (obj.skillLevel === undefined) {
                    obj.skillLevel = {};
                }
                obj.skillLevel[key] = elem;
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.skillActive)) {
            if (elem > 0) {
                if (obj.skillActive === undefined) {
                    obj.skillActive = {};
                }
                obj.skillActive[key] = elem;
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.fighterClass)) {
            for (const [qkey, qelem] of Object.entries(elem.questsCompleted)) {
                if (qelem > 0) {
                    if (obj.classQuest === undefined) {
                        obj.classQuest = {};
                    }
                    if (obj.classQuest[key] === undefined) {
                        obj.classQuest[key] = {};
                    }
                    obj.classQuest[key][qkey] = qelem;
                }
            }
            if (elem.highestLevel > 0) {
                if (obj.classHighestLevel === undefined) {
                    obj.classHighestLevel = {};
                }
                obj.classHighestLevel[key] = elem.highestLevel;
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.area)) {
            for (const [qkey, qelem] of Object.entries(elem.zones)) {
                if (qelem.unlocked && qelem.unlockedBy !== null) {
                    if (obj.areaUnlock === undefined) {
                        obj.areaUnlock = {};
                    }
                    if (obj.areaUnlock[key] === undefined) {
                        obj.areaUnlock[key] = [];
                    }
                    obj.areaUnlock[key].push(qkey);
                }
            }
            if (elem.teeth > 0) {
                if (obj.areaTeeth === undefined) {
                    obj.areaTeeth = {};
                }
                obj.areaTeeth[key] = elem.teeth;
            }
        }

        for (const [key, elem] of Object.entries(store.state.horde.trinket)) {
            if (elem.amount > 0) {
                if (obj.trinket === undefined) {
                    obj.trinket = {};
                }
                obj.trinket[key] = {amount: elem.amount, equipped: elem.equipped, isActive: elem.isActive};
            }
        }

        return obj;
    },
    loadGame(data) {
        [
            'zone', 'combo', 'respawn', 'maxRespawn', 'bossAvailable', 'bossFight', 'fightTime', 'fightRampage', 'enemyTimer',
            'playerBuff', 'rareLootTimer', 'nostalgiaLost', 'chosenActive', 'currentTower', 'towerFloor', 'taunt',
            'selectedClass', 'selectedArea', 'expLevel', 'skillPoints', 'bossStage', 'trinketDrop', 'bossBonusDifficulty',
            'autocast', 'sacrificeLevel', 'nextSacrificeLevel', 'raidboss', 'raidbossDefeated', 'raidbossStacks', 'courageScore'
        ].forEach(elem => {
            if (data[elem] !== undefined) {
                store.commit('horde/updateKey', {key: elem, value: data[elem]});
            }
        });

        if (data.playerAttackMult !== undefined) {
            store.dispatch('horde/updatePlayerAttackMult', data.playerAttackMult);
        }

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
                    if (elem.stacks !== undefined) {
                        store.commit('horde/updateItemKey', {name: key, key: 'stacks', value: elem.stacks});
                    }
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
                    name: decodeURIComponent(elem.name),
                    content: elem.content
                });
                nextId++;
            });
            store.commit('horde/updateKey', {key: 'nextLoadoutId', value: nextId});
        }
        if (data.heirloom) {
            for (const [key, elem] of Object.entries(data.heirloom)) {
                if (store.state.horde.heirloom[key]) {
                    store.commit('horde/updateHeirloomKey', {name: key, key: 'amount', value: elem[0]});
                    if (elem.length >= 3) {
                        store.commit('horde/updateHeirloomKey', {name: key, key: 'boost', value: elem[1]});
                        store.commit('horde/updateHeirloomKey', {name: key, key: 'level', value: elem[2]});
                    }
                    store.dispatch('horde/applyHeirloomEffects', key);
                }
            }
        }
        if (data.itemStatMult) {
            for (const [key, elem] of Object.entries(data.itemStatMult)) {
                const split = key.split('_');
                store.commit('horde/updateSubkey', {name: 'itemStatMult', key, value: elem});
                store.dispatch('system/applyEffect', {type: split[1], name: split[0], multKey: `hordeEquipmentPermanent`, value: elem + (split[1] === 'mult' ? 1 : 0)});
            }
        }
        if (data.tower) {
            for (const [key, elem] of Object.entries(data.tower)) {
                if (store.state.horde.tower[key]) {
                    store.commit('horde/updateTowerKey', {name: key, key: 'highest', value: elem});
                }
            }
        }
        if (data.element) {
            for (const [key, elem] of Object.entries(data.element)) {
                if (store.state.horde.element[key]) {
                    store.commit('horde/updateElementKey', {name: key, key: 'upgradeEnemyStats', value: elem[0]});
                    store.commit('horde/updateElementKey', {name: key, key: 'upgradeEnemyActives', value: elem[1]});
                    store.commit('horde/updateElementKey', {name: key, key: 'upgradePlayerElemental', value: elem[2]});
                    store.commit('horde/updateElementKey', {name: key, key: 'upgradePlayerStats', value: elem[3]});

                    if (elem[2] > 0) {
                        store.dispatch('horde/applyUpgradePlayerElemental', key);
                    }
                    if (elem[3] > 0) {
                        store.dispatch('horde/applyUpgradePlayerStats', key);
                    }
                }
            }
        }
        if (data.skillLevel) {
            for (const [key, elem] of Object.entries(data.skillLevel)) {
                store.commit('horde/updateSubkey', {name: 'skillLevel', key, value: elem});
                store.dispatch('horde/applySkillEffects', key);
            }
        }
        if (data.skillActive) {
            for (const [key, elem] of Object.entries(data.skillActive)) {
                store.commit('horde/updateSubkey', {name: 'skillActive', key, value: elem});
            }
        }
        if (data.classQuest) {
            for (const [key, elem] of Object.entries(data.classQuest)) {
                for (const [qkey, qelem] of Object.entries(elem)) {
                    store.commit('horde/updateClassQuestKey', {name: key, key: qkey, value: qelem});
                }
            }
        }
        if (data.classHighestLevel) {
            for (const [key, elem] of Object.entries(data.classHighestLevel)) {
                store.commit('horde/updateClassKey', {name: key, key: 'highestLevel', value: elem});
            }
        }
        if (data.areaUnlock) {
            for (const [key, elem] of Object.entries(data.areaUnlock)) {
                elem.forEach(zone => {
                    if (store.state.horde.area[key]?.zones[zone]) {
                        store.commit('horde/updateAreaZoneKey', {name: key, zone, key: 'unlocked', value: true});
                    }
                });
            }
        }
        if (data.areaTeeth) {
            for (const [key, elem] of Object.entries(data.areaTeeth)) {
                if (store.state.horde.area[key]) {
                    store.commit('horde/updateAreaKey', {name: key, key: 'teeth', value: elem});
                    store.dispatch('horde/applyTeethCap', key);
                }
            }
        }
        if (data.activeTimer !== undefined) {
            store.dispatch('horde/updateActiveTimer', data.activeTimer);
        }
        if (data.trinket) {
            for (const [name, value] of Object.entries(data.trinket)) {
                store.commit('horde/updateTrinketKey', {name, key: 'amount', value: value.amount});
                store.commit('horde/updateTrinketKey', {name, key: 'level', value: store.state.horde.trinketAmountNeeded.filter(el => value.amount >= el).length});
                store.commit('horde/updateTrinketKey', {name, key: 'equipped', value: value.equipped});
                store.commit('horde/updateTrinketKey', {name, key: 'isActive', value: value.isActive});
                if (value.isActive) {
                    store.dispatch('horde/applyTrinketEffects', name);
                }
            }
        }
        store.dispatch('horde/checkZoneUnlocks');
        store.dispatch('mult/updateExternalCaches', 'hordeNostalgia');
        store.dispatch('horde/updateNostalgia');
        store.dispatch('horde/applyTowerEffects');
        store.dispatch('horde/updatePlayerCache');
        store.dispatch('horde/applyClassEffects');
        store.dispatch('horde/applyClassLevelEffects');
        store.dispatch('horde/applyBattlePassEffects');
        store.dispatch('horde/updateSacrifice');
        store.dispatch('horde/updateEnergy');
        store.dispatch('horde/updateMana');
        store.dispatch('horde/updateHealthStats');
        store.dispatch('horde/applyTimeStats');
        store.dispatch('horde/updateMysticalShardCap');
        store.dispatch('horde/applyRaidEffect');
        store.dispatch('horde/updateRaidbossEffect');
    }
}
