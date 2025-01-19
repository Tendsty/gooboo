import store from "../../store"
import achievement from "./village/achievement";
import upgradePrestige from "./village/upgradePrestige";
import upgrade from "./village/upgrade";
import upgrade2 from "./village/upgrade2";
import upgradePremium from "./village/upgradePremium";
import building from "./village/building";
import { buildArray } from "../utils/array";
import relic from "./village/relic";
import job from "./village/job";
import offering from "./village/offering";
import policy from "./village/policy";
import { SECONDS_PER_DAY, SECONDS_PER_HOUR, VILLAGE_COINS_PER_FOOD, VILLAGE_MIN_HAPPINESS } from "../constants";
import bookVillage from "./school/bookVillage";
import craftingRecipe from "./village/craftingRecipe";
import { randomRound } from "../utils/random";

let upgradeBuilding = {};
for (const [key, elem] of Object.entries(building)) {
    upgradeBuilding[key] = {...elem, mode: 'queue', type: 'building'};
}

export default {
    name: 'village',
    tickspeed: 1,
    unlockNeeded: 'villageFeature',
    forceTick(seconds, oldTime, newTime) {
        // Get free boxes
        if (store.state.unlock.villageSpecialIngredient.use) {
            const dayDiff = Math.floor(newTime / (SECONDS_PER_DAY * 7)) - Math.floor(oldTime / (SECONDS_PER_DAY * 7));
            if (dayDiff > 0) {
                store.dispatch('consumable/gain', {name: 'village_ingredientBox', amount: dayDiff});
            }
        }
    },
    tick(seconds) {
        store.commit('stat/add', {feature: 'village', name: 'timeSpent', value: seconds});
        let diffs = {};
        store.getters['currency/list']('village', 'regular').filter(elem => !['village_coin', 'village_joy'].includes(elem)).forEach(currency => {
            const gain = store.getters['mult/get'](store.getters['currency/gainMultName'](...currency.split('_')));
            if (gain > 0) {
                if (diffs[currency] === undefined) {
                    diffs[currency] = 0;
                }
                diffs[currency] += gain * seconds;
            }
        });

        if (store.state.system.features.village.currentSubfeature === 0) {
            store.dispatch('upgrade/tickQueue', {key: 'village_building', seconds: seconds * store.getters['mult/get']('queueSpeedVillageBuilding')});

            const happiness = store.getters['mult/get']('villageHappiness');

            if (store.state.stat.village_faith.total >= 50) {
                store.commit('unlock/unlock', 'villagePrestige');
            }

            // Auto-gain 1% of offerings gained this run
            const offeringGain = store.getters['village/offeringPerSecond'];
            if (offeringGain > 0) {
                let newOffering = store.state.village.offeringGen + offeringGain * seconds;
                if (newOffering > 0) {
                    store.dispatch('currency/gain', {feature: 'village', name: 'offering', amount: Math.floor(newOffering)});
                    newOffering -= Math.floor(newOffering);
                }
                store.commit('village/updateKey', {key: 'offeringGen', value: newOffering});
            }

            const joyGain = store.getters['village/joyGainBase'];
            if (joyGain > 0) {
                store.dispatch('currency/gain', {feature: 'village', name: 'joy', gainMult: true, amount: joyGain * seconds});
            }
            if (happiness <= VILLAGE_MIN_HAPPINESS) {
                store.commit('stat/increaseTo', {feature: 'village', name: 'minHappiness', value: 1});
            }

            const lootGain = store.getters['mult/get']('villageLootGain');
            if (lootGain > 0) {
                let newLoot = store.state.village.explorerProgress + seconds * lootGain / SECONDS_PER_HOUR;
                if (newLoot >= 1) {
                    const lootDrops = Math.floor(newLoot);
                    store.dispatch('village/getLootDrops', lootDrops);
                    newLoot -= lootDrops;
                }
                store.commit('village/updateKey', {key: 'explorerProgress', value: newLoot});
                store.commit('unlock/unlock', 'villageLoot');
            }

            store.commit('stat/increaseTo', {feature: 'village', name: 'highestPower', value: store.getters['mult/get']('villagePower')});
        } else if (store.state.system.features.village.currentSubfeature === 1) {
            for (let p = 0; p < 2; p++) {
                for (const [key, elem] of Object.entries(store.state.village.crafting)) {
                    if (elem.isCrafting && elem.prio === p) {
                        let newProgress = elem.progress + seconds / elem.timeNeeded;
                        const payments = Math.ceil(newProgress) - Math.ceil(elem.progress);
                        if (payments > 0) {
                            let maxAfford = payments;
                            for (const [currency, value] of Object.entries(elem.price)) {
                                const split = currency.split('_');
                                if (elem.isSpecial) {
                                    let newMaxAfford = 0;
                                    let accumulatedPrice = 0;
                                    while (newMaxAfford < maxAfford) {
                                        accumulatedPrice += value(elem.owned + newMaxAfford);
                                        if (split[0] === 'craft') {
                                            if (store.state.village.crafting[split[1]].owned < accumulatedPrice) {
                                                break;
                                            }
                                        } else {
                                            // Can't afford any if cap is to small
                                            if (store.state.currency[currency].cap !== null && store.state.currency[currency].cap < value(elem.owned + newMaxAfford)) {
                                                break;
                                            }
                                            if ((store.state.currency[currency].value + (diffs[currency] ?? 0)) < accumulatedPrice) {
                                                break;
                                            }
                                        }
                                        newMaxAfford++;
                                    }
                                    maxAfford = newMaxAfford;
                                } else {
                                    if (split[0] === 'craft') {
                                        maxAfford = Math.min(Math.floor((store.state.village.crafting[split[1]].owned) / value), maxAfford);
                                    } else {
                                        // Can't afford any if cap is to small
                                        if (store.state.currency[currency].cap !== null && store.state.currency[currency].cap < value) {
                                            maxAfford = 0;
                                        }
                                        maxAfford = Math.min(Math.floor((store.state.currency[currency].value + (diffs[currency] ?? 0)) / value), maxAfford);
                                    }
                                }
                            }
                            if (maxAfford > 0) {
                                for (const [currency, value] of Object.entries(elem.price)) {
                                    const split = currency.split('_');
                                    let priceValue = 0;
                                    if (elem.isSpecial) {
                                        for (let i = 0; i < maxAfford; i++) {
                                            priceValue += value(elem.owned + i);
                                        }
                                    } else {
                                        priceValue = value * maxAfford;
                                    }
                                    if (split[0] === 'craft') {
                                        store.commit('village/updateSubkey', {key: 'crafting', name: split[1], subkey: 'owned', value: store.state.village.crafting[split[1]].owned - priceValue});
                                    } else {
                                        if (diffs[currency] === undefined) {
                                            diffs[currency] = 0;
                                        }
                                        diffs[currency] -= priceValue;
                                    }
                                }
                            }
                            if (maxAfford < payments) {
                                newProgress = maxAfford + Math.ceil(elem.progress);
                            }
                        }
                        if (newProgress >= 1) {
                            store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'owned', value: elem.owned + Math.floor(newProgress)});
                            store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'crafted', value: elem.crafted + Math.floor(newProgress)});
                            if (elem.isSpecial) {
                                store.dispatch('village/applySpecialCraftEffects', key);
                            } else {
                                store.dispatch('village/applyMilestoneEffects', key);
                                store.dispatch('village/applyMilestoneGlobalLevel');
                            }
                            newProgress -= Math.floor(newProgress);
                        }
                        store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'progress', value: newProgress});
                    }
                    if (elem.isSelling && elem.prio === p && elem.sellPrice > 0 && elem.owned > 0) {
                        const sold = Math.min(randomRound(seconds * elem.cacheSellChance), elem.owned);
                        if (sold > 0) {
                            store.dispatch('currency/gain', {feature: 'village', name: 'copperCoin', gainMult: true, amount: sold * elem.sellPrice});
                            store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'owned', value: elem.owned - sold});
                        }
                    }
                }
            }
        }

        // Apply currency diffs
        for (const [name, value] of Object.entries(diffs)) {
            const split = name.split('_');
            if (value > 0) {
                store.dispatch('currency/gain', {feature: split[0], name: split[1], amount: value});
            } else if (value < 0) {
                store.dispatch('currency/spend', {feature: split[0], name: split[1], amount: -value});
            }
        }

        if (store.state.system.features.village.currentSubfeature === 0) {
            const taxpayers = store.getters['mult/get']('villageTaxRate') * store.getters['village/employed'];
            if (taxpayers > 0) {
                store.getters['currency/list']('village', 'regular', 'food').forEach(foodName => {
                    const food = foodName.split('_')[1];
                    const foodConsumed = Math.min(taxpayers * seconds, store.getters['currency/value']('village_' + food));
                    if (foodConsumed > 0) {
                        store.dispatch('currency/spend', {feature: 'village', name: food, amount: foodConsumed});
                        store.dispatch('currency/gain', {feature: 'village', name: 'coin', gainMult: true, amount: foodConsumed * VILLAGE_COINS_PER_FOOD});
                    }
                });
            }
        }
    },
    unlock: [
        'villageFeature',
        'villageCoinUpgrades',
        'villagePrestige',
        ...buildArray(7).map(elem => 'villageBuildings' + (elem + 1)),
        ...[
            'Scythe', 'Hatchet', 'Pickaxe', 'WateringCan', 'Investment',
            'Basics', 'Processing', 'Pump', 'Sand', 'Book',
            'Axe', 'Bomb', 'Toll', 'FishingRod', 'HolyBook',
            'Breakthrough', 'ModifiedPlants', 'Dopamine', 'Adrenaline',
            'Sprinkler', 'Greed',
            'Ambition', 'Understanding', 'Curiosity', 'Worship',
            'Bartering', 'Sparks',
        ].map(elem => 'villageUpgrade' + elem),
        ...buildArray(4).map(elem => 'villageOffering' + (elem + 1)),
        'villageLoot',
        'villageCraftingSubfeature',
        'villageSpecialIngredient'
    ],
    stat: {
        maxBuilding: {showInStatistics: true},
        maxHousing: {},
        timeSpent: {display: 'time'},
        bestPrestige0: {showInStatistics: true},
        bestPrestige1: {showInStatistics: true},
        prestigeCount: {showInStatistics: true},
        minHappiness: {},
        highestPower: {showInStatistics: true},
    },
    mult: {
        villageWorker: {baseValue: 1, round: true},
        villageArtisan: {baseValue: 1, round: true},
        villageCounter: {baseValue: 1, round: true},
        queueSpeedVillageBuilding: {baseValue: 1},
        villageTaxRate: {display: 'percent'},
        villageHappiness: {display: 'percent', baseValue: 1, min: VILLAGE_MIN_HAPPINESS},
        villagePollution: {round: true},
        villagePollutionTolerance: {baseValue: 5, round: true},
        villagePower: {min: 0},
        villageOfferingPower: {},
        villageIngredientCount: {baseValue: 1, round: true},
        villageIngredientBoxAmount: {baseValue: 12, round: true},
        villagePrestigeIncome: {group: ['currencyVillageFaithGain', 'currencyVillageFaithCap', 'currencyVillageSharesGain']},

        // Upgrade cap mults
        villageHousingCap: {},
        villageWorkstationCap: {},

        // Gain mults
        villageResourceGain: {},
        villageMaterialGain: {},
        villageFoodGain: {},
        villageMentalGain: {},

        // Cap mults
        villageMaterialCap: {},

        // Policy limits
        villagePolicyTaxes: {round: true},
        villagePolicyImmigration: {round: true},
        villagePolicyReligion: {round: true},
        villagePolicyScanning: {round: true},

        // Loot mults
        villageLootGain: {display: 'perHour'},
        villageLootQuality: {round: true},
    },
    multGroup: [
        {mult: 'villageHousingCap', name: 'upgradeCap', subtype: 'housing'},
        {mult: 'villageWorkstationCap', name: 'upgradeCap', subtype: 'workstation'},
        {mult: 'villageMaterialGain', name: 'currencyGain', subtype: 'material'},
        {mult: 'villageMaterialCap', name: 'currencyCap', subtype: 'material'},
        {mult: 'villageFoodGain', name: 'currencyGain', subtype: 'food'},
        {mult: 'villageMentalGain', name: 'currencyGain', subtype: 'mental', blacklist: ['village_faith']},
        {mult: 'villageResourceGain', name: 'currencyGain', subtype: 'material'},
        {mult: 'villageResourceGain', name: 'currencyGain', subtype: 'food'},
        {mult: 'villageResourceGain', name: 'currencyGain', subtype: 'mental', blacklist: ['village_faith']},
    ],
    relic,
    achievement,
    currency: {
        coin: {overcapMult: 0.5, color: 'amber', icon: 'mdi-circle-multiple', gainMult: {display: 'perSecond'}, showGainMult: true, capMult: {baseValue: 500}, gainTimerFunction() {
            const taxpayers = store.getters['mult/get']('villageTaxRate') * store.getters['village/employed'];
            if (taxpayers <= 0) {
                return 0;
            }
            return store.getters['mult/get']('currencyVillageCoinGain', store.getters['currency/list']('village', 'regular', 'food').map(currencyName => {
                const food = currencyName.split('_')[1];
                const nextAmount = store.getters['currency/value']('village_' + food) + store.getters['mult/get'](store.getters['currency/gainMultName']('village', food));
                return Math.min(taxpayers, nextAmount) * VILLAGE_COINS_PER_FOOD;
            }).reduce((a, b) => a + b, 0));
        }, timerIsEstimate: true},
        copperCoin: {overcapMult: 0.5, color: 'orange', icon: 'mdi-circle-multiple', gainMult: {}, capMult: {baseValue: 4000}},

        // Basic material
        plantFiber: {subtype: 'material', overcapMult: 0.4, color: 'green', icon: 'mdi-leaf', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 2000}},
        wood: {subtype: 'material', overcapMult: 0.4, color: 'wooden', icon: 'mdi-tree', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 2000}},
        stone: {subtype: 'material', overcapMult: 0.4, color: 'grey', icon: 'mdi-chart-bubble', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 2000}},
        metal: {subtype: 'material', overcapMult: 0.4, color: 'lighter-grey', icon: 'mdi-gold', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 1000}},
        water: {subtype: 'material', overcapMult: 0.4, color: 'blue', icon: 'mdi-water', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 1000}},
        glass: {subtype: 'material', overcapMult: 0.4, color: 'cyan', icon: 'mdi-mirror', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 1000}},
        hardwood: {subtype: 'material', overcapMult: 0.4, color: 'cherry', icon: 'mdi-tree', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 1000}},
        gem: {subtype: 'material', overcapMult: 0.4, color: 'pink', icon: 'mdi-diamond', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 1000}},
        oil: {subtype: 'material', overcapMult: 0.4, color: 'pale-green', icon: 'mdi-oil', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 800}},
        marble: {subtype: 'material', overcapMult: 0.4, color: 'pale-blue', icon: 'mdi-mirror-rectangle', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 200}},

        // FOOD
        grain: {subtype: 'food', color: 'yellow', icon: 'mdi-barley', gainMult: {display: 'perSecond'}, showGainMult: true},
        fruit: {subtype: 'food', color: 'red', icon: 'mdi-food-apple', gainMult: {display: 'perSecond'}, showGainMult: true},
        fish: {subtype: 'food', color: 'blue-grey', icon: 'mdi-fish', gainMult: {display: 'perSecond'}, showGainMult: true},
        vegetable: {subtype: 'food', color: 'orange', icon: 'mdi-carrot', gainMult: {display: 'perSecond'}, showGainMult: true},
        meat: {subtype: 'food', color: 'brown', icon: 'mdi-food-steak', gainMult: {display: 'perSecond'}, showGainMult: true},

        // Mental resources
        knowledge: {subtype: 'mental', overcapScaling: 0.4, color: 'lime', icon: 'mdi-brain', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 100}},
        faith: {subtype: 'mental', overcapMult: 0.9, overcapScaling: 0.9, color: 'amber', icon: 'mdi-hands-pray', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 200}},
        science: {subtype: 'mental', overcapScaling: 0.4, color: 'light-blue', icon: 'mdi-flask', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 40}},
        joy: {subtype: 'mental', overcapScaling: 0.4, color: 'pink-purple', icon: 'mdi-party-popper', gainMult: {display: 'perSecond'}, capMult: {baseValue: 250}, showGainMult: true, gainTimerFunction() {
            return store.getters['mult/get']('currencyVillageJoyGain', store.getters['village/joyGainBase']);
        }},

        // Loot resources
        loot0: {subtype: 'loot', color: 'light-grey', icon: 'mdi-trophy-variant'},
        loot1: {subtype: 'loot', color: 'green', icon: 'mdi-trophy-variant'},
        loot2: {subtype: 'loot', color: 'indigo', icon: 'mdi-trophy-variant'},
        loot3: {subtype: 'loot', color: 'purple', icon: 'mdi-trophy-variant'},
        loot4: {subtype: 'loot', color: 'amber', icon: 'mdi-trophy-variant'},
        loot5: {subtype: 'loot', color: 'red', icon: 'mdi-trophy-variant'},

        // Special crafting ingredients
        acidVial: {subtype: 'specialIngredient', color: 'lime', icon: 'mdi-test-tube'},
        snowflake: {subtype: 'specialIngredient', color: 'cyan', icon: 'mdi-snowflake-variant'},
        chiliBundle: {subtype: 'specialIngredient', color: 'red-orange', icon: 'mdi-chili-hot'},
        gears: {subtype: 'specialIngredient', color: 'blue-grey', icon: 'mdi-cogs'},

        // Prestige currency
        blessing: {type: 'prestige', alwaysVisible: true, color: 'yellow', icon: 'mdi-flare'},
        shares: {type: 'prestige', alwaysVisible: true, color: 'beige', icon: 'mdi-certificate', gainMult: {}},
        offering: {type: 'prestige', color: 'orange-red', icon: 'mdi-candle', gainMult: {display: 'perHour'}, showGainMult: true, gainTimerFunction() {
            return store.getters['village/offeringPerSecond'] * SECONDS_PER_HOUR;
        }}
    },
    upgrade: {
        ...upgradeBuilding,
        ...upgrade,
        ...upgrade2,
        ...upgradePrestige,
        ...upgradePremium,
        ...bookVillage
    },
    note: [...buildArray(31).map(() => 'g'), 'system'],
    consumable: {
        ingredientBox: {
            icon: 'mdi-gift',
            color: 'indigo',
            price: {gem_sapphire: 80}
        }
    },
    init() {
        for (const [key, elem] of Object.entries(job)) {
            store.commit('village/initJob', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(offering)) {
            store.commit('village/initOffering', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(policy)) {
            store.commit('village/initPolicy', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(craftingRecipe)) {
            store.commit('village/initCrafting', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {
            job: {}
        };

        for (const [key, elem] of Object.entries(store.state.village.job)) {
            if (elem.amount > 0) {
                obj.job[key] = elem.amount;
            }
        }
        if (store.state.unlock.villageOffering1.see) {
            obj.offering = {};
            for (const [key, elem] of Object.entries(store.state.village.offering)) {
                if (elem.offeringBought > 0 || elem.upgradeBought > 0) {
                    obj.offering[key] = [elem.offeringBought, elem.upgradeBought];
                }
            }
        }

        let policies = {};
        let hasPolicy = false;
        for (const [key, elem] of Object.entries(store.state.village.policy)) {
            if (elem.value !== 0) {
                policies[key] = elem.value;
                hasPolicy = true;
            }
        }
        if (hasPolicy) {
            obj.policy = policies;
        }
        if (store.state.village.explorerProgress > 0) {
            obj.explorerProgress = store.state.village.explorerProgress;
        }
        if (store.state.village.offeringGen > 0) {
            obj.offeringGen = store.state.village.offeringGen;
        }

        // Add crafting stuff
        let crafting = {};
        for (const [key, elem] of Object.entries(store.state.village.crafting)) {
            if (elem.crafted > 0 || elem.isCrafting || elem.isSelling || elem.sellPrice !== elem.baseValue || elem.progress > 0) {
                crafting[key] = {
                    isCrafting: elem.isCrafting,
                    isSelling: elem.isSelling,
                    sellPrice: elem.sellPrice,
                    progress: elem.progress,
                    owned: elem.owned,
                    crafted: elem.crafted
                };
            }
        }
        if (Object.keys(crafting).length > 0) {
            obj.crafting = crafting;
        }

        return obj;
    },
    loadGame(data) {
        if (data.job !== undefined) {
            for (const [key, elem] of Object.entries(data.job)) {
                if (store.state.village.job[key] !== undefined) {
                    store.commit('village/updateJobKey', {name: key, key: 'amount', value: elem});
                }
            }
        }
        if (data.offering !== undefined) {
            for (const [key, elem] of Object.entries(data.offering)) {
                if (store.state.village.offering[key] !== undefined) {
                    store.commit('village/updateOfferingKey', {name: key, key: 'offeringBought', value: elem[0]});
                    store.commit('village/updateOfferingKey', {name: key, key: 'upgradeBought', value: elem[1]});
                }
            }
        }
        if (data.policy !== undefined) {
            for (const [key, elem] of Object.entries(data.policy)) {
                if (store.state.village.policy[key] !== undefined) {
                    store.commit('village/updatePolicyKey', {name: key, key: 'value', value: elem});
                    store.dispatch('village/applyPolicyEffect', key);
                }
            }
        }
        if (data.crafting !== undefined) {
            for (const [key, elem] of Object.entries(data.crafting)) {
                if (store.state.village.crafting[key] !== undefined) {
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'isCrafting', value: elem.isCrafting});
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'isSelling', value: elem.isSelling});
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'sellPrice', value: elem.sellPrice});
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'progress', value: elem.progress});
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'owned', value: elem.owned});
                    store.commit('village/updateSubkey', {key: 'crafting', name: key, subkey: 'crafted', value: elem.crafted});
                    if (store.state.village.crafting[key].isSpecial) {
                        if (elem.owned > 0) {
                            store.dispatch('village/applySpecialCraftEffects', key);
                        }
                    } else {
                        store.dispatch('village/applyMilestoneEffects', key);
                    }
                }
            }
        }
        if (data.explorerProgress !== undefined) {
            store.commit('village/updateKey', {key: 'explorerProgress', value: data.explorerProgress});
        }
        if (data.offeringGen !== undefined) {
            store.commit('village/updateKey', {key: 'offeringGen', value: data.offeringGen});
        }
        store.dispatch('village/applyAllJobs');
        store.dispatch('village/applyOfferingEffect');
    }
}
