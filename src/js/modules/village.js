import store from "../../store"
import achievement from "./village/achievement";
import upgradePrestige from "./village/upgradePrestige";
import upgrade from "./village/upgrade";
import upgradePremium from "./village/upgradePremium";
import building from "./village/building";
import { buildArray } from "../utils/array";
import relic from "./village/relic";
import job from "./village/job";
import offering from "./village/offering";
import policy from "./village/policy";
import { SECONDS_PER_HOUR, VILLAGE_COINS_PER_FOOD, VILLAGE_MIN_HAPPINESS } from "../constants";
import bookVillage from "./school/bookVillage";

let upgradeBuilding = {};
for (const [key, elem] of Object.entries(building)) {
    upgradeBuilding[key] = {...elem, mode: 'queue', type: 'building'};
}

export default {
    name: 'village',
    tickspeed: 1,
    unlockNeeded: 'villageFeature',
    tick(seconds) {
        store.commit('stat/add', {feature: 'village', name: 'timeSpent', value: seconds});

        store.dispatch('upgrade/tickQueue', {key: 'village_building', seconds: seconds * store.getters['mult/get']('queueSpeedVillageBuilding')});

        const happiness = store.getters['mult/get']('villageHappiness');
        const taxpayers = store.getters['mult/get']('villageTaxRate') * store.getters['village/employed'];

        store.getters['currency/list']('village', 'regular').filter(elem => !['village_coin', 'village_joy'].includes(elem)).forEach(currency => {
            const name = currency.split('_')[1];
            const gain = store.getters['mult/get'](store.getters['currency/gainMultName']('village', name));
            if (gain > 0) {
                store.dispatch('currency/gain', {feature: 'village', name, amount: gain * seconds});
            }
        });

        if (store.state.stat.village_faith.total >= 50) {
            store.commit('unlock/unlock', 'villagePrestige');
        }

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
        'villageCraftingSubfeature'
    ],
    stat: {
        maxBuilding: {},
        maxHousing: {},
        timeSpent: {display: 'time'},
        bestPrestige: {},
        prestigeCount: {},
        totalOffering: {},
        minHappiness: {},
        bestOffering: {},
        offeringAmount: {},
        highestPower: {},
    },
    mult: {
        villageWorker: {baseValue: 1, round: true},
        queueSpeedVillageBuilding: {baseValue: 1},
        villageTaxRate: {display: 'percent'},
        villageHappiness: {display: 'percent', baseValue: 1, min: VILLAGE_MIN_HAPPINESS},
        villagePollution: {round: true},
        villagePollutionTolerance: {baseValue: 5, round: true},
        villagePower: {min: 0},
        villageOfferingPower: {},

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

        // Prestige currency
        blessing: {type: 'prestige', alwaysVisible: true, color: 'yellow', icon: 'mdi-flare'},
        offering: {type: 'prestige', color: 'orange-red', icon: 'mdi-candle', gainMult: {display: 'perHour'}, showGainMult: true, gainTimerFunction() {
            return store.getters['village/offeringPerSecond'] * SECONDS_PER_HOUR;
        }, timerIsEstimate: true}
    },
    upgrade: {
        ...upgradeBuilding,
        ...upgrade,
        ...upgradePrestige,
        ...upgradePremium,
        ...bookVillage
    },
    note: [...buildArray(31).map(() => 'g'), 'system'],
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
                    obj.offering[key] = {offeringBought: elem.offeringBought, upgradeBought: elem.upgradeBought};
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
                    store.commit('village/updateOfferingKey', {name: key, key: 'offeringBought', value: elem.offeringBought});
                    store.commit('village/updateOfferingKey', {name: key, key: 'upgradeBought', value: elem.upgradeBought});
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
