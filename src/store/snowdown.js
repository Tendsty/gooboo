import Vue from "vue";
import { SNOWDOWN_FIGHT_COST, SNOWDOWN_REROLL_COST } from "../js/constants";
import { chance, randomElem, randomFloat, randomInt } from "../js/utils/random";
import { getSequence } from "../js/utils/math";

export default {
    namespaced: true,
    state: {
        fight: 0,
        item: {},
        pet: {
            snowOwl: {
                attack: 3,
                health: 15,
                defense: 0,
                critRating: 0,
                blockRating: 0
            },
            dog: {
                attack: 2.5,
                health: 15,
                defense: 1,
                critRating: 0,
                blockRating: 0
            },
            cat: {
                attack: 2.75,
                health: 12,
                defense: 0,
                critRating: 20,
                blockRating: 0
            },
            penguin: {
                attack: 2.25,
                health: 24,
                defense: 0,
                critRating: 0,
                blockRating: 0
            },
            rabbit: {
                attack: 2.75,
                health: 10,
                defense: 0,
                critRating: 30,
                blockRating: 30
            },
            turtle: {
                attack: 1.75,
                health: 20,
                defense: 3,
                critRating: 0,
                blockRating: 25
            }
        },
        enemy: {
            toddler: {
                name: 'toddler',
                attack: 2,
                health: 15,
                defense: 0
            },
            kid: {
                name: 'kid',
                attack: 4,
                health: 60,
                defense: 0
            },
            babysitter: {
                name: 'babysitter',
                attack: 12,
                health: 55,
                defense: 1
            },
            toughKid: {
                name: 'toughKid',
                attack: 14,
                health: 200,
                defense: 4
            },
            teenager: {
                name: 'teenager',
                attack: 30,
                health: 350,
                defense: 6
            },
            bully: {
                name: 'bully',
                attack: 70,
                health: 260,
                defense: 5
            },
            youngAdult: {
                name: 'youngAdult',
                attack: 60,
                health: 850,
                defense: 14
            },
            hooligan: {
                name: 'hooligan',
                attack: 180,
                health: 650,
                defense: 9
            },
            adult: {
                name: 'adult',
                attack: 100,
                health: 2250,
                defense: 35
            },
            veteran: {
                name: 'veteran',
                attack: 225,
                health: 3600,
                defense: 75
            },
            wallOfIce1: {
                name: 'wallOfIce',
                attack: 0,
                health: 2000,
                defense: 0
            },
            wallOfIce2: {
                name: 'wallOfIce',
                attack: 0,
                health: 3000,
                defense: 0
            },
            wallOfIce3: {
                name: 'wallOfIce',
                attack: 0,
                health: 4000,
                defense: 0
            },
            wallOfIce4: {
                name: 'wallOfIce',
                attack: 0,
                health: 6000,
                defense: 0
            }
        },
        fights: [
            ['toddler', 'toddler'],
            ['toddler', 'toddler', 'toddler'],
            ['toddler', 'toddler', 'toddler', 'toddler'],
            ['kid', 'toddler'],
            ['kid', 'kid'],
            ['kid', 'toddler', 'toddler', 'toddler'],
            ['kid', 'kid', 'toddler', 'toddler'],
            ['babysitter', 'toddler', 'toddler', 'toddler'],
            ['babysitter', 'babysitter', 'toddler', 'toddler'],
            ['babysitter', 'babysitter', 'kid', 'kid'],
            ['toughKid', 'babysitter'],
            ['toughKid', 'babysitter', 'kid', 'kid'],
            ['toughKid', 'babysitter', 'babysitter'],
            ['toughKid', 'babysitter', 'babysitter', 'babysitter'],
            ['toughKid', 'toughKid', 'babysitter'],
            ['toughKid', 'toughKid', 'babysitter', 'babysitter'],
            ['toughKid', 'toughKid', 'toughKid', 'kid'],
            ['teenager', 'toddler', 'toddler', 'toddler'],
            ['teenager', 'kid', 'kid', 'kid'],
            ['teenager', 'toughKid', 'babysitter'],
            ['teenager', 'teenager'],
            ['teenager', 'bully'],
            ['teenager', 'bully', 'toughKid', 'toughKid'],
            ['teenager', 'bully', 'bully', 'toughKid'],
            ['teenager', 'bully', 'teenager', 'bully'],
            ['bully', 'bully', 'bully', 'bully'],
            ['youngAdult', 'bully', 'teenager'],
            ['youngAdult', 'bully', 'bully', 'bully'],
            ['youngAdult', 'youngAdult'],
            ['youngAdult', 'youngAdult', 'bully', 'bully'],
            ['youngAdult', 'youngAdult', 'youngAdult'],
            ['wallOfIce1', 'youngAdult', 'youngAdult', 'youngAdult'],
            ['wallOfIce1', 'hooligan'],
            ['wallOfIce1', 'hooligan', 'youngAdult'],
            ['wallOfIce1', 'hooligan', 'youngAdult', 'hooligan'],
            ['wallOfIce1', 'hooligan', 'hooligan', 'hooligan'],
            ['wallOfIce2', 'hooligan', 'hooligan', 'youngAdult'],
            ['wallOfIce2', 'hooligan', 'hooligan', 'hooligan'],
            ['wallOfIce2', 'adult'],
            ['wallOfIce2', 'adult', 'youngAdult', 'youngAdult'],
            ['wallOfIce2', 'adult', 'hooligan'],
            ['wallOfIce3', 'adult', 'adult'],
            ['wallOfIce3', 'adult', 'adult', 'youngAdult'],
            ['wallOfIce3', 'adult', 'adult', 'hooligan'],
            ['wallOfIce3', 'adult', 'adult', 'adult'],
            ['wallOfIce3', 'veteran'],
            ['wallOfIce3', 'veteran', 'hooligan'],
            ['wallOfIce3', 'veteran', 'hooligan', 'hooligan'],
            ['wallOfIce3', 'veteran', 'adult'],
            ['wallOfIce4', 'veteran', 'adult'],
            ['wallOfIce4', 'veteran', 'adult', 'hooligan'],
            ['wallOfIce4', 'veteran', 'adult', 'adult'],
            ['wallOfIce4', 'veteran', 'veteran'],
            ['wallOfIce4', 'veteran', 'veteran', 'hooligan'],
            ['wallOfIce4', 'veteran', 'veteran', 'adult'],
            ['wallOfIce4', 'veteran', 'veteran', 'veteran'],
        ],
        result: null,
        rewardProducer: false,
        rewardItem: null,
        itemsBought: 0,
        itemsBoughtTopaz: 0,
        revenge: 0,
    },
    getters: {
        playerStats: (state, getters, rootState, rootGetters) => {
            let arr = [{
                name: 'player',
                attack: rootGetters['mult/get']('snowdownAttack'),
                health: rootGetters['mult/get']('snowdownHealth'),
                defense: rootGetters['mult/get']('snowdownDefense', 5 * state.item.starShield.amount),
                critRating: rootGetters['mult/get']('snowdownCritRating'),
                blockRating: rootGetters['mult/get']('snowdownBlockRating')
            }];
            for (const [key, elem] of Object.entries(state.pet)) {
                if (state.item[key].amount >= 1) {
                    arr.push({
                        name: key,
                        attack: rootGetters['mult/get']('snowdownPetAttack', elem.attack),
                        health: rootGetters['mult/get']('snowdownPetHealth', elem.health),
                        defense: rootGetters['mult/get']('snowdownPetDefense', elem.defense),
                        critRating: rootGetters['mult/get']('snowdownPetCritRating', elem.critRating),
                        blockRating: rootGetters['mult/get']('snowdownPetBlockRating', elem.blockRating),
                    });
                }
            }
            return arr;
        },
        enemyStats: (state) => {
            if (state.fights.length <= state.fight) {
                const statMult = Math.pow(1.1, state.fight);
                return [{
                    name: 'wallOfIce',
                    attack: 0,
                    health: Math.round(statMult * 40),
                    defense: 0
                }, {
                    name: 'snowBot',
                    attack: statMult * 1.1,
                    health: Math.round(statMult * 15),
                    defense: Math.round(statMult * 0.4)
                }, {
                    name: 'snowBot',
                    attack: statMult * 2,
                    health: Math.round(statMult * 9),
                    defense: Math.round(statMult * 0.2)
                }];
            }
            return state.fights[state.fight].map(elem => {
                return {...state.enemy[elem]};
            });
        },
        critChance: () => (rating) => {
            const val = rating * 0.01;
            return val > 0.25 ? (0.25 + 0.5 * ((val - 0.25) / (val + 0.75))) : val;
        },
        critDamage: (state, getters) => (rating) => {
            const cc = getters.critChance(rating);
            return 10 + 20 * (rating * 0.01 - cc);
        },
        blockChance: () => (rating) => {
            const val = rating * 0.01;
            return val / (val + 1);
        },
        petCount: (state) => {
            let amount = 0;
            for (const [, elem] of Object.entries(state.item)) {
                if (elem.type === 'pet' && elem.amount > 0) {
                    amount++;
                }
            }
            return amount;
        },
        itemSnowCost: (state) => {
            return Math.pow(state.itemsBought * 10 + 10, state.itemsBought) * 1000;
        },
        itemTopazCost: (state) => {
            return state.itemsBoughtTopaz * 10 + 100;
        },
        winTokenGain: (state) => {
            return Math.floor(Math.pow(state.fight * 0.35 + 1, 0.75) + 3);
        },
        winItemGain: (state) => {
            return state.fight < 50 && (state.fight < 5 || (state.fight % 5) === 4);
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        initItem(state, o) {
            Vue.set(state.item, o.name, {
                type: o.type ?? 'regular',
                icon: o.icon ?? 'mdi-sack',
                effect: o.effect ?? [],
                amount: 0,
                max: o.max ?? null
            });
        },
        updateItemKey(state, o) {
            Vue.set(state.item[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'fight', value: 0});
            commit('updateKey', {key: 'result', value: null});
            commit('updateKey', {key: 'rewardProducer', value: false});
            commit('updateKey', {key: 'rewardItem', value: null});
            commit('updateKey', {key: 'itemsBought', value: 0});
            for (const [key] of Object.entries(state.item)) {
                commit('updateItemKey', {name: key, key: 'amount', value: 0});
            }
        },
        fight({ state, rootState, getters, rootGetters, commit, dispatch }) {
            if (rootGetters['currency/value']('event_snowball') >= SNOWDOWN_FIGHT_COST) {
                dispatch('currency/spend', {feature: 'event', name: 'snowball', amount: SNOWDOWN_FIGHT_COST}, {root: true});
                let turn = 0;
                let winner = null;
                const playerBase = getters.playerStats;
                const enemyBase = getters.enemyStats;
                const attackMult = rootGetters['mult/get']('snowdownAllAttack', 1);
                const healthMult = rootGetters['mult/get']('snowdownAllHealth', 1);
                let player = playerBase.map((elem, key) => {
                    return {...elem, healthCurrent: elem.health, critMult: elem.name === 'player' ? rootState.mult.items.snowdownAttack.multCache : rootState.mult.items.snowdownPetAttack.multCache, revive: 0, stun: 0, spikedCollar: false, key};
                });
                let enemy = enemyBase.map((elem, key) => {
                    return {...elem, healthCurrent: elem.health, critMult: 1, revive: 0, stun: 0, key};
                });
                let forceCrit = 5 * state.item.snowboard.amount; // Amount of attacks with a guaranteed crit (consumed on attack)
                let petHeal = 3 * state.item.treatBag.amount;
                let playerHeal = state.item.appleJuice.amount;
                if (state.item.hotWater.amount > 0) {
                    player[0].revive = state.item.hotWater.amount;
                }
                if (state.item.heartCollar.amount > 0) {
                    for (let i = 0; i < state.item.heartCollar.amount; i++) {
                        const eligible = player.filter(elem => elem.name !== 'player' && elem.revive <= 0);
                        if (eligible.length > 0) {
                            const picked = randomElem(eligible);
                            player[picked.key].revive++;
                        }
                    }
                }
                let battleLog = [];

                while (winner === null && turn < 1000) {
                    let log = [];
                    if (turn === 0 && state.item.spikedCollar.amount > 0) {
                        const eligible = player.filter(elem => elem.name !== 'player');
                        if (eligible.length > 0) {
                            const picked = randomElem(eligible);
                            player[picked.key].spikedCollar = true;
                            player[picked.key].critRating += 30 * state.item.spikedCollar.amount;
                            player[picked.key].blockRating += 30 * state.item.spikedCollar.amount;
                            log.push({type: 'buffStat', stat: 'critRating', targetKey: picked.key, power: 30 * state.item.spikedCollar.amount});
                            log.push({type: 'buffStat', stat: 'blockRating', targetKey: picked.key, power: 30 * state.item.spikedCollar.amount});
                        }
                    }
                    if (turn % 2) {
                        // Enemy turn
                        enemy.forEach(elemE => {
                            if (winner === null && elemE.healthCurrent > 0) {
                                if (elemE.stun > 0) {
                                    elemE.stun--;
                                    log.push({type: 'stun', targetKey: elemE.key, power: -1});
                                } else {
                                    // Attack random player
                                    const picked = randomElem(player.filter(elemP => elemP.healthCurrent > 0)).key;
                                    const damage = chance(getters.blockChance(player[picked].blockRating)) ? 0 : Math.max(0, Math.round(
                                        elemE.attack * randomFloat(0.8, 1.2) - // base damage
                                        player[picked].defense                 // player defense
                                    ));
                                    if (damage > 0) {
                                        player[picked].healthCurrent -= damage;
                                        log.push({type: 'attack', selfKey: elemE.key, targetKey: picked, power: damage});
                                    } else {
                                        log.push({type: 'attackBlocked', selfKey: elemE.key, targetKey: picked});
                                    }

                                    if (player[picked].healthCurrent <= 0) {
                                        if (player[picked].revive > 0) {
                                            // Perform revive
                                            player[picked].revive--;
                                            player[picked].healthCurrent = picked === 0 ? Math.ceil(player[picked].health * 0.25) : player[picked].health;
                                            log.push({type: 'revive', targetKey: picked, power: player[picked].healthCurrent});
                                        } else if (picked === 0) {
                                            // Player death effects
                                            if (state.item.tennisBall.amount > 0) {
                                                player.filter(elemP => elemP.name !== 'player' && elemP.healthCurrent < elemP.health).forEach(elemP => {
                                                    elemP.healthCurrent = elemP.health;
                                                    log.push({type: 'revive', targetKey: elemP.key, power: elemP.health});
                                                });
                                            }
                                        } else {
                                            // Pet death effects
                                            if (state.item.gravestone.amount > 0) {
                                                player.filter(elemP => elemP.healthCurrent > 0 && elemP.healthCurrent < elemP.health).forEach(elemP => {
                                                    const healAmount = 15 * healthMult * state.item.gravestone.amount;
                                                    elemP.healthCurrent = Math.min(elemP.health, elemP.healthCurrent + healAmount);
                                                    log.push({type: 'heal', targetKey: elemP.key, power: healAmount});
                                                });
                                            }
                                            if (player[picked].spikedCollar && state.item.spikedCollar.amount > 0) {
                                                const eligible = player.filter(elemP => elemP.name !== 'player' && elemP.healthCurrent > 0);
                                                if (eligible.length > 0) {
                                                    const pickedCollar = randomElem(eligible);

                                                    // Take stats from old owner
                                                    player[picked].spikedCollar = false;
                                                    player[picked].critRating -= 30 * state.item.spikedCollar.amount;
                                                    player[picked].blockRating -= 30 * state.item.spikedCollar.amount;
                                                    log.push({type: 'buffStat', stat: 'critRating', targetKey: player[picked].key, power: -30 * state.item.spikedCollar.amount});
                                                    log.push({type: 'buffStat', stat: 'blockRating', targetKey: player[picked].key, power: -30 * state.item.spikedCollar.amount});

                                                    // Give stats to new owner
                                                    player[pickedCollar.key].spikedCollar = true;
                                                    player[pickedCollar.key].critRating += 30 * state.item.spikedCollar.amount;
                                                    player[pickedCollar.key].blockRating += 30 * state.item.spikedCollar.amount;
                                                    log.push({type: 'buffStat', stat: 'critRating', targetKey: pickedCollar.key, power: 30 * state.item.spikedCollar.amount});
                                                    log.push({type: 'buffStat', stat: 'blockRating', targetKey: pickedCollar.key, power: 30 * state.item.spikedCollar.amount});
                                                }
                                            }
                                        }
                                    } else {
                                        if (picked === 0) {
                                            // Player hit effects
                                            if (state.item.gloves.amount > 0) {
                                                player[0].attack += state.item.gloves.amount * attackMult * 0.2;
                                                player[0].critRating += state.item.gloves.amount;
                                                log.push({type: 'buffStat', stat: 'attack', targetKey: 0, power: state.item.gloves.amount * attackMult * 0.2});
                                                log.push({type: 'buffStat', stat: 'critRating', targetKey: 0, power: state.item.gloves.amount});
                                            }
                                        } else {
                                            // Pet hit effects
                                        }
                                    }
                                }
                            }
                            if (player.filter(elemP => elemP.healthCurrent > 0).length <= 0) {
                                winner = 'enemy';
                            }
                        });
                    } else {
                        // Player turn
                        player.forEach(elemP => {
                            if (winner === null && elemP.healthCurrent > 0) {
                                if ((elemP.healthCurrent / elemP.health) <= 0.5 && ((elemP.name === 'player' && playerHeal > 0) || (elemP.name !== 'player' && petHeal > 0))) {
                                    // Use healing consumable
                                    const healAmount = Math.ceil(elemP.health / 2);
                                    elemP.healthCurrent = Math.min(elemP.health, elemP.healthCurrent + healAmount);
                                    log.push({type: 'heal', targetKey: elemP.key, power: healAmount});
                                    if (elemP.name === 'player') {
                                        playerHeal--;
                                    } else {
                                        petHeal--;
                                    }
                                } else {
                                    // Attack random enemy
                                    const picked = randomElem(enemy.filter(elemE => elemE.healthCurrent > 0)).key;
                                    const crit = (elemP.name === 'player' && forceCrit > 0) || chance(getters.critChance(elemP.critRating));
                                    if (elemP.name === 'player' && forceCrit > 0) {
                                        forceCrit--;
                                    }
                                    const damage = Math.max(0, Math.round(
                                        elemP.attack * randomFloat(0.8, 1.2) +                                 // base damage
                                        (crit ? (getters.critDamage(elemP.critRating) * elemP.critMult) : 0) - // crit damage
                                        enemy[picked].defense                                                  // enemy defense
                                    ));
                                    if (damage > 0) {
                                        enemy[picked].healthCurrent -= damage;
                                        log.push({type: 'attack', crit, selfKey: elemP.key, targetKey: picked, power: damage});
                                    } else {
                                        log.push({type: 'attackBlocked', selfKey: elemP.key, targetKey: picked});
                                    }

                                    if (elemP.name === 'player') {
                                        // Player attack effects
                                        if (state.item.dumbbell.amount > 0) {
                                            elemP.attack += state.item.dumbbell.amount * attackMult * 0.5;
                                            log.push({type: 'buffStat', stat: 'attack', targetKey: 0, power: state.item.dumbbell.amount * attackMult * 0.5});
                                        }
                                        if (state.item.target.amount > 0) {
                                            elemP.critRating += state.item.target.amount * 0.5;
                                            log.push({type: 'buffStat', stat: 'critRating', targetKey: 0, power: state.item.target.amount * 4});
                                        }
                                        if (state.item.coffee.amount > 0 && crit && elemP.healthCurrent < elemP.health) {
                                            const healAmount = 8 * healthMult * state.item.coffee.amount;
                                            elemP.healthCurrent = Math.min(elemP.health, elemP.healthCurrent + healAmount);
                                            log.push({type: 'heal', targetKey: 0, power: healAmount});
                                        }
                                        if (state.item.pebbles.amount > 0 && crit) {
                                            enemy[picked].stun += state.item.pebbles.amount;
                                            log.push({type: 'stun', targetKey: picked, power: state.item.pebbles.amount});
                                        }
                                    } else {
                                        // Pet attack effects
                                        if (state.item.mouse.amount > 0 && player[0].healthCurrent > 0 && player[0].healthCurrent < player[0].health) {
                                            player[0].healthCurrent = Math.min(player[0].health, player[0].healthCurrent + state.item.mouse.amount * healthMult);
                                            log.push({type: 'heal', targetKey: 0, power: state.item.mouse.amount * healthMult});
                                        }
                                        if (state.item.bone.amount > 0 && elemP.healthCurrent < elemP.health) {
                                            elemP.healthCurrent = Math.min(elemP.health, elemP.healthCurrent + state.item.bone.amount * healthMult);
                                            log.push({type: 'heal', targetKey: elemP.key, power: state.item.bone.amount * healthMult});
                                        }
                                    }

                                    if (enemy[picked].healthCurrent <= 0) {
                                        // Enemy death effects
                                        if (state.item.tea.amount > 0) {
                                            if (player[0].healthCurrent > 0 && player[0].healthCurrent < player[0].health) {
                                                const healAmount = 25 * healthMult * state.item.tea.amount;
                                                player[0].healthCurrent = Math.min(player[0].health, player[0].healthCurrent + healAmount);
                                                log.push({type: 'heal', targetKey: 0, power: healAmount});
                                            }
                                            if (forceCrit < state.item.tea.amount) {
                                                forceCrit = state.item.tea.amount;
                                            }
                                        }
                                    }
                                }
                            }
                            if (enemy.filter(elemE => elemE.healthCurrent > 0).length <= 0) {
                                winner = 'player';
                            }
                        });
                    }

                    // Disable star shield after 3 turns
                    if (turn === 5 && state.item.starShield.amount > 0) {
                        log.push({type: 'buffStat', stat: 'defense', targetKey: 0, power: rootGetters['mult/get']('snowdownDefense') - player[0].defense});
                        player[0].defense = rootGetters['mult/get']('snowdownDefense');
                    }
                    battleLog.push(log);
                    turn++;
                }

                commit('updateKey', {key: 'result', value: {player: playerBase.map(elem => {
                    return {...elem, critMult: elem.name === 'player' ? rootState.mult.items.snowdownAttack.multCache : rootState.mult.items.snowdownPetAttack.multCache};
                }), enemy: enemyBase, winner, battleLog}});

                if (winner === 'player') {
                    if (getters.winItemGain) {
                        dispatch('addRewardItem');
                    }
                    // Get currency rewards
                    dispatch('event/giveTokens', {event: 'snowdown', amount: getters.winTokenGain}, {root: true});

                    commit('updateKey', {key: 'fight', value: state.fight + 1});
                    commit('updateKey', {key: 'revenge', value: 0});
                    commit('updateKey', {key: 'rewardProducer', value: true});

                    dispatch('note/find', 'event_33', {root: true});
                    if (state.fight >= 4) {
                        dispatch('note/find', 'event_32', {root: true});
                    }
                } else {
                    commit('updateKey', {key: 'revenge', value: state.revenge + 1});
                }

                dispatch('applyRevengeEffect');
            }
        },
        getProducer({ state, commit, dispatch }, name) {
            if (state.rewardProducer) {
                commit('updateItemKey', {name, key: 'amount', value: state.item[name].amount + 1});
                dispatch('applyItemEffects', name);
                commit('updateKey', {key: 'rewardProducer', value: false});
            }
        },
        getRewardItem({ state, commit, dispatch }, index) {
            if (state.rewardItem) {
                const name = state.rewardItem[index];
                commit('updateItemKey', {name, key: 'amount', value: state.item[name].amount + 1});
                dispatch('applyItemEffects', name);
                commit('updateKey', {key: 'rewardItem', value: null});

                if (state.item[name].type === 'pet') {
                    dispatch('note/find', 'event_31', {root: true});
                }
            }
        },
        applyItemEffects({ state, dispatch }, name) {
            state.item[name].effect.forEach(eff => {
                if (state.item[name].amount > 0) {
                    dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `snowdownItem_${name}`, value: eff.value(state.item[name].amount), trigger: true}, {root: true});
                } else {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `snowdownItem_${name}`}, {root: true});
                }
            });
        },
        rerollItem({ state, getters, rootGetters, commit, dispatch }, name) {
            if (rootGetters['currency/value']('event_snowball') >= SNOWDOWN_REROLL_COST && state.rewardItem === null && state.item[name].type !== 'producer') {
                commit('updateItemKey', {name, key: 'amount', value: state.item[name].amount - 1});
                dispatch('applyItemEffects', name);

                let itemPool = [];
                let itemReward = [];

                // Exclude producer and max amount items, also exclude pets if you already have 3
                for (const [key, elem] of Object.entries(state.item)) {
                    if (
                        elem.type !== 'producer' &&                      // Only non-producers
                        name !== key &&                                  // Cannot get back the same item
                        (getters.petCount < 3 || elem.type !== 'pet') && // No more than 3 pets
                        (elem.max === null || elem.amount < elem.max)    // Respect item limits
                    ) {
                        itemPool.push(key);
                    }
                }

                // Pick (up to) 3 items
                let rngGen = rootGetters['system/getRng']('snowdown_itemReroll');
                commit('system/nextRng', {name: 'snowdown_itemReroll', amount: 1}, {root: true});
                for (let i = 0; i < 3; i++) {
                    if (itemPool.length > 0) {
                        const chosenIndex = randomInt(0, itemPool.length - 1, rngGen());
                        itemReward.push(itemPool[chosenIndex]);
                        itemPool.splice(chosenIndex, 1);
                    }
                }

                if (itemReward.length > 0) {
                    dispatch('currency/spend', {feature: 'event', name: 'snowball', amount: SNOWDOWN_REROLL_COST}, {root: true});
                    commit('updateKey', {key: 'rewardItem', value: itemReward});
                } else {
                    // if no eligible item was found, refund the original item
                    commit('updateItemKey', {name, key: 'amount', value: state.item[name].amount + 1});
                    dispatch('applyItemEffects', name);
                }
            }
        },
        addRewardItem({ state, getters, rootGetters, commit }) {
            let itemPool = [];
            let itemReward = [];

            // Exclude producer and max amount items, also exclude pets if you already have 3
            for (const [key, elem] of Object.entries(state.item)) {
                if (elem.type !== 'producer' && (state.fight > 0 || elem.type === 'pet') && (getters.petCount < 3 || elem.type !== 'pet') && (elem.max === null || elem.amount < elem.max)) {
                    itemPool.push(key);
                }
            }

            // Pick (up to) 3 items
            let rngGen = rootGetters['system/getRng']('snowdown_itemType');
            commit('system/nextRng', {name: 'snowdown_itemType', amount: 1}, {root: true});
            for (let i = 0; i < 3; i++) {
                if (itemPool.length > 0) {
                    const chosenIndex = randomInt(0, itemPool.length - 1, rngGen());
                    itemReward.push(itemPool[chosenIndex]);
                    itemPool.splice(chosenIndex, 1);
                }
            }

            if (itemReward.length > 0) {
                commit('updateKey', {key: 'rewardItem', value: itemReward});
            }
        },
        buySnowItem({ state, getters, rootGetters, commit, dispatch }) {
            if (rootGetters['currency/value']('event_snow') >= getters.itemSnowCost && state.rewardItem === null) {
                dispatch('currency/spend', {feature: 'event', name: 'snow', amount: getters.itemSnowCost}, {root: true});
                commit('updateKey', {key: 'itemsBought', value: state.itemsBought + 1});
                dispatch('addRewardItem');
            }
        },
        buyTopazItem({ state, getters, rootGetters, commit, dispatch }) {
            if (rootGetters['currency/value']('gem_topaz') >= getters.itemTopazCost && state.rewardItem === null) {
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount: getters.itemTopazCost}, {root: true});
                commit('updateKey', {key: 'itemsBoughtTopaz', value: state.itemsBoughtTopaz + 1});
                dispatch('addRewardItem');
            }
        },
        applyRevengeEffect({ state, rootGetters, dispatch }) {
            if (state.revenge > 0) {
                const revengeStats = state.revenge * 0.05 + getSequence(1, state.revenge) * rootGetters['mult/get']('snowdownRevengeStats') + 1;
                const revengeCrit = state.revenge * rootGetters['mult/get']('snowdownRevengeCrit');
                const revengeBlock = state.revenge * rootGetters['mult/get']('snowdownRevengeBlock');
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'snowdownAllAttack',
                    multKey: `snowdownRevenge`,
                    value: revengeStats
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'mult',
                    name: 'snowdownAllHealth',
                    multKey: `snowdownRevenge`,
                    value: revengeStats
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'snowdownCritRating',
                    multKey: `snowdownRevenge`,
                    value: revengeCrit
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'snowdownPetCritRating',
                    multKey: `snowdownRevenge`,
                    value: revengeCrit
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'snowdownBlockRating',
                    multKey: `snowdownRevenge`,
                    value: revengeBlock
                }, {root: true});
                dispatch('system/applyEffect', {
                    type: 'base',
                    name: 'snowdownPetBlockRating',
                    multKey: `snowdownRevenge`,
                    value: revengeBlock
                }, {root: true});
            } else {
                dispatch('system/resetEffect', {
                    type: 'mult',
                    name: 'snowdownAllAttack',
                    multKey: `snowdownRevenge`
                }, {root: true});
                dispatch('system/resetEffect', {
                    type: 'mult',
                    name: 'snowdownAllHealth',
                    multKey: `snowdownRevenge`
                }, {root: true});
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'snowdownCritRating',
                    multKey: `snowdownRevenge`
                }, {root: true});
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'snowdownPetCritRating',
                    multKey: `snowdownRevenge`
                }, {root: true});
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'snowdownBlockRating',
                    multKey: `snowdownRevenge`
                }, {root: true});
                dispatch('system/resetEffect', {
                    type: 'base',
                    name: 'snowdownPetBlockRating',
                    multKey: `snowdownRevenge`
                }, {root: true});
            }
        }
    }
}
