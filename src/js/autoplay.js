import store from "../store";
import { MINING_CRAFTING_COMPRESSION, SECONDS_PER_DAY } from "./constants";
import enhancement from "./modules/mining/enhancement";
import { tick } from "./tick";
import { buildArray } from "./utils/array";
import { capitalize } from "./utils/format";
import { logBase } from "./utils/math";
import { randomElem, randomFloat, weightSelect } from "./utils/random";

/**
 * A simulated day that combines short phases of active play,
 * a lot of semi-active play, a few longer breaks and sleep time
 */
const dayDistribution = [
    ...buildArray(6).map(() => 5), 30,
    ...buildArray(3).map(() => 10), 150,
    ...buildArray(3).map(() => 10), 30,
    ...buildArray(3).map(() => 10), 150,
    ...buildArray(12).map(() => 5),
    180,
    ...buildArray(3).map(() => 10), 30,
    ...buildArray(3).map(() => 10), 30,
    480,
    ...buildArray(6).map(() => 5), 30,
    ...buildArray(3).map(() => 10), 30,
];

/**
 * Contains the weight of all prestige upgrades. Higher weight means
 * it will be purchased first.
 */
const prestigeUpgradeWeight = {
    mining: {
        crystalBasics: 2.5,
        crystalTips: 1.5,
        crystalStorage: 1.1,
        crystalLens: 1.2,
        crystalAluminiumStorage: 1,
        crystalCopperStorage: 1,
        crystalTinStorage: 1,
        crystalIronStorage: 1,
        crystalTitaniumStorage: 1,
        crystalDrill: 5,
        crystalDetector: 2,
        crystalPreservarium: 3,
        crystalTools: 1.5,
        crystalExplosives: 1.5,
        crystalRefinery: 1.35,
        crystalSmeltery: 1,
        crystalEnhancer: 0.8,
        crystalTreetap: 0.5,
    },
    village: {
        arch: 0.5,
        holyTree: 1,
        holyGrass: 1,
        holyRock: 1,
        holyMetal: 1,
        churchTax: 1.2,
        holyWater: 1,
        holyGlass: 1,
        holyCrane: 0.75,
        monk: 1.4,
        holyPiggyBank: 1.2,
        deepWorship: 5,
        cityPlanning: 1.75,
        managers: 1.75,
        warehouse: 3,
        sandstone: 2.5,
        holyForest: 1,
        holyGem: 1,
        deeperWorship: 5,
        holyLab: 1.4,
        charity: 1.2,
    },
    horde: {
        balance: 1,
        wrath: 1,
        peace: 1,
        milk: 1,
        butcher: 1,
        beginnerLuck: 2,
        advancedLuck: 2,
        soulCage: 3,
        offenseBook: 1,
        defenseBook: 1,
        candleCircle: 2,
        ashCircle: 2,
        containmentChamber: 1,
        mausoleum: 1.5,
        lastWill: 3,
        combatStudies: 1.5
    },
    gallery: {
        artAcademy: 1,
        redCrayon: 1,
        rainbowJar: 1.5,
        trashContainer: 0.75,
        orangeCrayon: 1,
        headstart: 1.5,
        forklift: 0.75,
        redCrate: 2,
        yellowCrayon: 1,
        inspiringBooks: 1.25,
        expressDelivery: 0.4,
        orangeCrate: 2,
        greenCrayon: 1,
        sortingSystem: 1,
        redTruck: 1.5,
        yellowCrate: 2,
        blueCrayon: 1,
        orangeTruck: 1.5,
        greenCrate: 2,
        purpleCrayon: 1
    }
};

export { autoplay }

function generateReport() {
    let report = {
        globalLevel: store.state.meta.globalLevel,
        relic: store.getters['relic/owned'],
        unlock: [],
        achievement: {},
        upgrade: {},
        stat: {},
        cardFeature: {},
        cardCollection: {}
    };

    for (let [key, elem] of Object.entries(store.state.unlock)) {
        if (elem.see) {
            report.unlock.push(key);
        }
    }

    for (let [, elem] of Object.entries(store.state.achievement)) {
        if (!report.achievement[elem.feature]) {
            report.achievement[elem.feature] = 0;
        }
        report.achievement[elem.feature] += elem.level;
    }

    for (let [, elem] of Object.entries(store.state.upgrade.item)) {
        if (!report.upgrade[elem.feature]) {
            report.upgrade[elem.feature] = {
                regular: {total: 0, unique: 0},
                premium: {total: 0, unique: 0},
                prestige: {total: 0, unique: 0}
            };
        }
        if (!report.upgrade[elem.feature][elem.type]) {
            report.upgrade[elem.feature][elem.type] = {total: 0, unique: 0};
        }
        report.upgrade[elem.feature][elem.type].total += elem.highestLevel;
        if (elem.highestLevel > 0) {
            report.upgrade[elem.feature][elem.type].unique++;
        }
    }

    for (let [key, elem] of Object.entries(store.state.stat)) {
        report.stat[key] = {value: elem.value, total: elem.total};
    }

    for (let [key, elem] of Object.entries(store.state.card.feature)) {
        report.cardFeature[key] = elem.cacheCards;
    }
    for (let [key, elem] of Object.entries(store.state.card.collection)) {
        report.cardCollection[key] = elem.cacheCards;
    }

    store.commit('system/addAutoplayData', report);
}

/**
 * Performs a prestige and buys prestige upgrades
 * @param {String} feature name of the feature
 */
function prestige(feature) {

    // Use cards if possible
    const maxCards = store.getters['mult/get'](feature + 'CardCap');

    let cardListBase = [];
    for (const [key, elem] of Object.entries(store.state.card.card)) {
        if (elem.feature === feature && elem.amount > 1) {
            cardListBase.push({name: key, amount: elem.amount});
        }
    }

    let equipCards = [];
    for (let i = 0; i < maxCards; i++) {
        // All cards with at least 1 extra copy are eligible (counts already equipped cards)
        let cardList = cardListBase.filter(elem => (elem.amount - equipCards.filter(el => el === elem.name).length) > 1).map(elem => elem.name);
        if (cardList.length > 0) {
            equipCards.push(randomElem(cardList));
        }
    }

    store.commit('card/updateKey', {type: 'feature', name: feature, key: 'cardSelected', value: equipCards});

    // Perform the actual prestige
    store.dispatch(`${feature}/prestige`, 0);

    let chosenUpgrade, chosenWeight;
    // Autobuy prestige upgrades
    do {
        chosenUpgrade = null;
        chosenWeight = Infinity;
        for (let [key, elem] of Object.entries(prestigeUpgradeWeight[feature])) {
            const upgrade = store.state.upgrade.item[`${feature}_${key}`];

            if (upgrade.requirement(upgrade.bought) && (upgrade.cap === null || upgrade.bought < upgrade.cap) && store.getters['upgrade/canAfford'](feature, key)) {
                // Calculate weight based on cost and individual weight
                let weight = 0;
                for (let [, elem] of Object.entries(upgrade.price(upgrade.bought))) {
                    weight += elem;
                }
                weight /= elem;

                if (weight < chosenWeight) {
                    chosenUpgrade = key;
                    chosenWeight = weight;
                }
            }
        }

        if (chosenUpgrade) {
            store.dispatch('upgrade/buy', {feature, name: chosenUpgrade});
        }
    } while (chosenUpgrade !== null)
}

/**
 * Returns information used to decide whether to prestige at this point or not
 * @returns {Object} contains prestige information for each feature with a regular prestige option
 */
function getPrestigeInfo() {
    return {
        mining: {
            canPrestige: store.state.stat.mining_depthDwellerCap0.value >= 1,
            statIndicator: store.state.stat.mining_depthDweller0.value,
            currencyGain: store.getters['mining/dwellerGreenCrystal'],
            timeSpent: Math.max(store.state.stat.mining_timeSpent.value, 1)
        },
        village: {
            canPrestige: store.state.currency.village_faith.value >= 50,
            statIndicator: store.state.currency.village_faith.value,
            currencyGain: store.state.currency.village_faith.value,
            timeSpent: Math.max(store.state.stat.village_timeSpent.value, 1)
        },
        horde: {
            canPrestige: store.getters['currency/value']('horde_soulCorrupted') > 0,
            statIndicator: store.state.stat.horde_maxZone.value,
            currencyGain: store.getters['currency/value']('horde_soulCorrupted'),
            timeSpent: Math.max(store.state.stat.horde_timeSpent.value, 1)
        },
        gallery: {
            canPrestige: store.state.unlock.galleryAuction.see && store.getters['gallery/prestigeGain'] > 0,
            statIndicator: store.state.stat.gallery_beauty.value,
            currencyGain: store.getters['gallery/prestigeGain'],
            timeSpent: Math.max(store.state.stat.gallery_timeSpent.value, 1)
        }
    };
}

function autoplayTicks(newTime, oldTime) {
    tick(newTime * 60, oldTime * 60);

    const unlockedFeatures = [...store.getters['system/mainFeatures'], ...store.getters['system/sideFeatures']].map(el => el.name);

    // Autobuy all upgrades
    for (let [key, elem] of Object.entries(store.state.upgrade.item)) {
        if (unlockedFeatures.includes(elem.feature) && elem.feature !== 'event' && key !== 'treasure_moreSlots' && elem.subfeature === 0 && elem.type !== 'prestige' && elem.requirement(elem.level) && (elem.cap === null || elem.level < elem.cap)) {
            store.dispatch('upgrade/buyMax', {feature: key.split('_')[0], name: key.split('_')[1]});
        }
    }

    // Buy a new treasure slot if you spend 25% or less of your current rubies
    if (unlockedFeatures.includes('treasure')) {
        const upgrade = store.state.upgrade.item.treasure_moreSlots;
        const price = upgrade.price(upgrade.bought);
        if ((store.getters['currency/value']('gem_ruby') * 0.25) >= price.gem_ruby) {
            store.dispatch('upgrade/buy', {feature: 'treasure', name: 'moreSlots'});
        }
    }

    let farmAtDepth = null;

    if (store.state.unlock.miningPickaxeCrafting.use && store.state.stat[`mining_oreAluminium`].value > 0) {
        // Adjust crafting materials
        const slots = store.getters['mult/get']('miningPickaxeCraftingSlots');
        let oreList = [];
        let newIngredients = [];
        for (const [key] of Object.entries(store.state.mining.ingredient)) {
            if (store.state.stat[`mining_${key}`].value > 0) {
                oreList.push(key);
            }
        }
        oreList.reverse();
        let oreGainList = {};
        for (const [key, elem] of Object.entries(store.getters['mining/depthOre'](store.state.stat.mining_maxDepth0.value - 1, true))) {
            oreGainList[key] = elem.amount;
        }
        for (let i = 0; i < slots; i++) {
            const oreName = oreList[i >= oreList.length ? (oreList.length - 1) : i];
            const oreCap = store.state.unlock[store.state.mining.ingredient[oreName].compressUnlock].use ? Math.min(
                store.getters['mult/get'](`currencyMining${ capitalize(oreName) }Cap`), // Cannot exceed ore cap
                oreGainList[oreName] * 3600 // Max 1 hour of farming
            ) : 1;
            newIngredients.push({
                name: oreName,
                compress: Math.max(0, Math.floor(logBase(oreCap / ((i + 1) >= oreList.length ? (1 + slots - oreList.length) : 1), MINING_CRAFTING_COMPRESSION)))
            });
        }
        store.commit('mining/updateKey', {key: 'ingredientList', value: newIngredients});

        // Take maximum resin
        if (store.state.unlock.miningResin.use) {
            store.commit('mining/updateKey', {key: 'resin', value: Math.floor(Math.min(store.getters['currency/value']('mining_resin'), store.getters['mult/get']('miningResinMax')))});
        }

        // Craft a pickaxe
        store.dispatch('mining/craftPickaxe');

        // If you can theoretically craft a pickaxe that is twice as good as the current one, farm ores for it
        if (store.state.mining.pickaxePower * 2 < store.getters['mining/pickaxeStats'].quality) {
            let neededOre = null;

            for (const [key, elem] of Object.entries(store.getters['mining/pickaxeCost'])) {
                if (neededOre === null && store.getters['currency/value']('mining_' + key) < elem) {
                    neededOre = key;
                }
            }

            if (neededOre !== null) {
                const oreData = store.state.mining.ingredient[neededOre];
                const deepest = store.state.stat.mining_maxDepth0.value - 1;

                if (deepest >= oreData.minDepth && deepest <= oreData.maxDepth) {
                    farmAtDepth = deepest;
                } else if (deepest > oreData.maxDepth) {
                    farmAtDepth = Math.floor(deepest / oreData.modulo) * oreData.modulo;
                }
            }
        }
    }

    // Smelt all bars
    if (store.state.unlock.miningSmeltery.use) {
        const temperature = store.getters['mult/get']('miningSmelteryTemperature');
        for (const [key, elem] of Object.entries(store.state.mining.smeltery)) {
            if (temperature >= elem.minTemperature) {
                store.dispatch('mining/addToSmeltery', {name: key, max: true});
            }
        }
    }

    // Enhance using excess bars
    if (store.state.unlock.miningEnhancement.use) {
        Object.keys(enhancement).reverse().forEach(mat => {
            const owned = store.getters['currency/value']('mining_' + mat);
            if (owned >= 50) {
                store.commit('mining/updateKey', {key: 'enhancementIngredient', value: mat});
                store.dispatch('mining/enhance', true);
            }
        });
    }

    // Advance mining
    if (farmAtDepth !== null) {
        if (store.state.mining.depth !== farmAtDepth) {
            store.commit('mining/updateKey', {key: 'depth', value: farmAtDepth});
            store.commit('mining/updateKey', {key: 'durability', value: store.getters['mining/currentDurability']});
        }
    } else if (
        store.state.mining.depth < store.state.stat.mining_maxDepth0.value &&
        store.getters['mining/depthHitsNeeded'](store.state.mining.depth + 1) <= (store.state.system.settings.automation.items.progressMining.value ?? 0)
    ) {
        store.commit('mining/updateKey', {key: 'depth', value: store.state.mining.depth + 1});
        store.commit('mining/updateKey', {key: 'durability', value: store.getters['mining/currentDurability']});
    }

    if (store.state.unlock.villageFeature.use) {
        let full = false;

        // Make sure collectors are free for other jobs
        store.dispatch('village/setWorkerCount', {name: 'collector', amount: 0});

        // Ensure autoplay doesn't get stuck in the early stages
        let needsCollector = false;
        ['farmer', 'harvester', 'miner'].forEach(elem => {
            const job = store.state.village.job[elem];
            if (job.max < 1) {
                needsCollector = true;
            }
        });
        if (needsCollector && store.getters['village/unemployed'] >= 1) {
            store.dispatch('village/addWorker', 'collector');
        }

        // Make sure each job has at least 1 worker. If not, fire all but 1 worker for each job
        let allJobsOccupied = true;
        for (const [, elem] of Object.entries(store.state.village.job)) {
            if (elem.max !== null && elem.max > 0 && elem.amount <= 0) {
                allJobsOccupied = false;
            }
        }
        if (!allJobsOccupied) {
            for (const [key, elem] of Object.entries(store.state.village.job)) {
                if (elem.max !== null && elem.amount > 1) {
                    store.dispatch('village/setWorkerCount', {name: key, amount: 1});
                }
            }
        }

        while (!full && store.getters['village/unemployed'] > 0) {
            let lowestAmount = Infinity;
            let lowestName = null;

            // Find the job (except unlimited) with the least workers
            for (const [key, elem] of Object.entries(store.state.village.job)) {
                if (elem.max !== null && elem.amount < elem.max && elem.amount < lowestAmount) {
                    lowestAmount = elem.amount;
                    lowestName = key;
                }
            }

            if (lowestName === null || store.getters['village/unemployed'] < store.state.village.job[lowestName].needed) {
                full = true;
            } else {
                store.dispatch('village/addWorker', lowestName);
            }
        }

        // Dump the rest on collectors
        store.dispatch('village/setWorkerCount', {name: 'collector', amount: store.state.village.job.collector.amount + store.getters['village/unemployed']});

        // Sacrifice resources for available offerings
        for (const [key, elem] of Object.entries(store.state.village.offering)) {
            if (elem.unlock === null || store.state.unlock[elem.unlock].use) {
                if (store.getters['currency/value']('village_' + key) >= elem.cost(elem.offeringBought)) {
                    store.dispatch('village/buyOffering', {name: key, max: true});
                }
            }
        }

        // Auto-upgrade offerings
        let canBuy = true;
        while (canBuy && store.getters['currency/value']('village_offering') >= 1) {
            let chosenOffering = null;
            let chosenAmount = Infinity;

            for (const [key, elem] of Object.entries(store.state.village.offering)) {
                const value = (elem.upgradeBought + 1) * elem.amount;
                if ((elem.unlock === null || store.state.unlock[elem.unlock].use) && value < chosenAmount) {
                    chosenOffering = key;
                    chosenAmount = value;
                }
            }

            if (chosenOffering && store.getters['currency/value']('village_offering') >= store.state.village.offering[chosenOffering].amount) {
                store.dispatch('village/upgradeOffering', {name: chosenOffering});
            } else {
                canBuy = false;
            }
        }
    }

    if (store.state.unlock.hordeFeature.use) {
        let hasMonsterPartGoal = false;
        const monsterPartFarmZone = Math.max(store.state.stat.horde_maxZone.value - 6, 10);
        if (store.state.stat.horde_maxZone.value >= 13) {
            const maxMonsterPartGoal = Math.min(
                store.state.currency.horde_monsterPart.cap, // Requirement cannot exceed resource cap
                store.getters['horde/enemyMonsterPart'](monsterPartFarmZone) * 2000 // Max 2000 kills
            );

            // Try to set an item as a goal
            if (store.state.unlock.hordeItems.use) {
                for (const [, elem] of Object.entries(store.state.horde.items)) {
                    if (elem.found && elem.equipped && (elem.cap === null || elem.level < elem.cap) && elem.price(elem.level) <= maxMonsterPartGoal) {
                        hasMonsterPartGoal = true;
                    }
                }
            }

            // Try to set an upgrade as a goal
            if (!hasMonsterPartGoal) {
                store.state.upgrade.cache.horde_0_regular.forEach(elem => {
                    const upgrade = store.state.upgrade.item[elem];
                    if (upgrade.requirement(upgrade.level) && (upgrade.cap === null || upgrade.level < upgrade.cap)) {
                        let cost = 0;

                        for (const [key, elem] of Object.entries(upgrade.price(upgrade.bought))) {
                            if (key === 'horde_monsterPart') {
                                cost += elem;
                            }
                        }
                        if (cost > 0 && cost < maxMonsterPartGoal && store.getters['currency/value']('horde_monsterPart') < cost) {
                            hasMonsterPartGoal = true;
                        }
                    }
                });
            }
        }

        // Farm monster parts
        if (hasMonsterPartGoal && store.state.horde.zone !== monsterPartFarmZone) {
            store.dispatch('horde/updateZone', monsterPartFarmZone);
        }

        // Autofight horde boss
        else if (store.state.horde.bossAvailable && store.state.horde.bossFight === 0) {
            store.dispatch('horde/updateZone', store.state.stat.horde_maxZone.value);
            store.dispatch('horde/fightBoss');
        }

        // Go to highest zone if not there already
        else if (store.state.horde.zone < store.state.stat.horde_maxZone.value) {
            store.dispatch('horde/updateZone', store.state.stat.horde_maxZone.value);
        }

        if (store.state.unlock.hordeItems.use) {
            // Auto-equip items
            if (store.getters['horde/itemsEquipped'] < store.getters['mult/get']('hordeMaxItems')) {
                for (const [key, elem] of Object.entries(store.state.horde.items)) {
                    if (elem.found && !elem.equipped) {
                        store.dispatch('horde/equipItem', key);
                    }
                }
            }

            // Auto-upgrade items
            for (const [key, elem] of Object.entries(store.state.horde.items)) {
                while (elem.found && elem.equipped && (elem.cap === null || elem.level < elem.cap) && store.getters['currency/value']('horde_monsterPart') >= elem.price(elem.level)) {
                    store.dispatch('horde/upgradeItem', key);
                }
            }

            // Auto-use item actives
            for (const [key, elem] of Object.entries(store.getters['horde/itemsActiveList'])) {
                if (elem.cooldownLeft <= 0) {
                    store.dispatch('horde/useActive', key);
                }
            }
        }
    }

    if (store.state.unlock.farmFeature.use) {
        // Auto harvest
        store.dispatch('farm/harvestAll');

        for (let [key, elem] of Object.entries(store.state.farm.crop)) {

            // Pick the first dna upgrade
            if (elem.cacheUpgradeCount < elem.level) {
                store.dispatch('farm/applyCropUpgrade', {crop: key, upgrade: elem.nextUpgrades[0]});
            }

            // Prestige at level 4, then every 2 levels
            if (elem.level >= 4 && elem.level >= (elem.levelMax + 2)) {
                store.dispatch('farm/cropPrestige', key);
            }
        }

        // Auto place a building if a spot is free
        let chosenBuilding = null;
        for (let [key, elem] of Object.entries(store.state.farm.building)) {
            if (elem.cacheAmount < elem.max) {
                chosenBuilding = key;
            }
        }
        if (chosenBuilding !== null) {

            // Find a free cell
            let freeCell = null;
            store.state.farm.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === null) {
                        freeCell = {x, y};
                    }
                });
            });

            // Place the building
            if (freeCell !== null) {
                store.dispatch('farm/placeBuilding', {x: freeCell.x, y: freeCell.y, name: chosenBuilding});
            }
        }

        let freeCells = 0;
        store.state.farm.field.forEach(row => {
            row.forEach(cell => {
                if (cell !== null && cell.type === null) {
                    freeCells++;
                }
            });
        });

        if (freeCells > 0) {
            // Determine needed resource based on which currency has the lowest amount
            let chosenType = 'vegetable';
            let chosenAmount = store.getters['currency/value']('farm_vegetable');
            ['berry', 'grain', 'flower'].forEach((elem, index) => {
                const seedValue = store.getters['currency/value']('farm_' + elem);
                if (store.state.upgrade.item.farm_seedBox.level > index && seedValue < chosenAmount) {
                    chosenType = elem;
                    chosenAmount = seedValue;
                }
            });

            // Pick a random seed with the given resource (slower growth means less weight to be picked)
            let seedList = [];
            let seedWeight = [];
            for (let [key, elem] of Object.entries(store.state.farm.crop)) {
                if (elem.found && elem.type === chosenType && store.getters['currency/value']('farm_gold') >= (elem.cost * freeCells)) {
                    seedList.push(key);
                    seedWeight.push(1 / Math.sqrt(elem.grow))
                }
            }

            if (seedList.length > 0) {
                // Auto plant
                store.dispatch('farm/plantAll', {crop: seedList[weightSelect(seedWeight)], fertilizer: null});
            }
        }
    }

    if (store.state.unlock.galleryFeature.use) {
        while (store.getters['currency/value']('gallery_inspiration') >= 1) {
            let pool = [];
            for (const [key, elem] of Object.entries(store.state.gallery.idea)) {
                if (elem.owned && store.getters['gallery/canAccessIdea'](elem.tier)) {
                    pool.push(key);
                }
            }
            store.dispatch('gallery/buyIdea', randomElem(pool));
        }
        [...store.state.gallery.color].reverse().forEach(color => {
            store.dispatch('gallery/convertColor', {toColor: color, max: true});
        });
        store.dispatch('gallery/openPackages');
    }

    // Perform prestiges
    let prestigeData = {};
    for (let [key, elem] of Object.entries(getPrestigeInfo())) {
        let bestData = (
            store.state.system.autoplayChoice.prestige !== undefined &&
            store.state.system.autoplayChoice.prestige[key]
        ) ? {...store.state.system.autoplayChoice.prestige[key]} : {stat: 0, currency: 0, days: 0};

        if (
            elem.canPrestige &&
            (elem.currencyGain >= bestData.stat * 1.25 || (elem.timeSpent / SECONDS_PER_DAY) >= bestData.days) &&
            bestData.currency >= (0.75 * elem.currencyGain / elem.timeSpent)
        ) {
            bestData = {stat: elem.currencyGain, currency: 0, days: Math.pow(2, randomFloat(0, 3))};
            prestige(key);
        } else {
            bestData.currency = Math.max(bestData.currency, elem.currencyGain / elem.timeSpent);
        }

        prestigeData[key] = bestData;
    }
    store.commit('system/updateAutoplayChoice', {key: 'prestige', value: prestigeData});
}

async function autoplayEndOfDay() {
    let canBuy = true;
    let nextChoice = store.state.system.autoplayChoice.nextEmerald ?? null;

    while (canBuy) {
        if (nextChoice === null) {
            // No choice listed, generate one if possible
            nextChoice = getRandomEmeraldChoice();
            canBuy = nextChoice !== null;
        } else if (nextChoice === 'treasure') {
            // Try to buy a new treasure
            if (store.getters['currency/value']('gem_emerald') >= store.state.treasure.type.regular.buyPrice) {
                // Destroy the item if there is one in the temp slot
                if (store.state.treasure.newItem !== null) {
                    store.dispatch('treasure/deleteItem', -1);
                }

                await store.dispatch('treasure/buy', 'regular');

                // Try to find an empty slot
                let emptyId = null;
                if (store.state.treasure.items.length < store.getters['mult/get']('treasureSlots')) {
                    emptyId = store.state.treasure.items.length;
                } else {
                    const emptySlot = store.state.treasure.items.findIndex(elem => elem === null);
                    if (emptySlot !== -1) {
                        emptyId = emptySlot;
                    }
                }

                // When all slots are taken, find the treasure with the lowest tier, then most duplicates to destroy
                if (emptyId === null) {
                    const allItems = [store.state.treasure.newItem, ...store.state.treasure.items];
                    const prioItems = allItems.map((item, key) => {
                        return {key: key - 1, tier: item.tier, duplicates: allItems.filter(elem => elem.effect[0] === item.effect[0]).length};
                    }).sort((a, b) => a.tier === b.tier ? (b.duplicates - a.duplicates) : (a.tier - b.tier));

                    if (prioItems[0].key !== -1) {
                        emptyId = prioItems[0].key;
                        store.dispatch('treasure/deleteItem', prioItems[0].key);
                    }
                }

                // Place it in an empty slot if one is available
                if (emptyId !== null) {
                    store.dispatch('treasure/moveItem', {from: -1, to: emptyId});
                } else {
                    store.dispatch('treasure/deleteItem', -1);
                }
                nextChoice = getRandomEmeraldChoice();
            } else {
                canBuy = false;
            }
        } else if (nextChoice.split('_')[0] === 'card') {
            // Try to buy the selected card pack
            const pack = nextChoice.split('_')[1];
            if (store.getters['currency/value']('gem_emerald') >= store.state.card.pack[pack].price) {
                store.dispatch('card/buyPack', {name: pack});
                nextChoice = getRandomEmeraldChoice();
            } else {
                canBuy = false;
            }
        }
    }

    store.commit('system/updateAutoplayChoice', {key: 'nextEmerald', value: nextChoice});

    // Try to upgrade treasures with fragments
    if (store.state.unlock.treasureFeature.see) {
        let canUpgrade = true;
        while (canUpgrade) {
            let cheapestId = null;
            let cheapestAmount = Infinity;
            let cheapestLevel = Infinity;
            store.state.treasure.items.forEach((elem, key) => {
                if (elem !== null) {
                    const cost = store.getters['treasure/upgradeFragments'](elem.tier, elem.level, elem.type);
                    if (cost !== null && cost < cheapestAmount || (cost === cheapestAmount && elem.level < cheapestLevel)) {
                        cheapestId = key;
                        cheapestAmount = cost;
                        cheapestLevel = elem.level;
                    }
                }
            });

            if (cheapestId !== null && store.getters['currency/value']('treasure_fragment') >= cheapestAmount) {
                store.dispatch('treasure/upgradeItem', cheapestId);
            } else {
                canUpgrade = false;
            }
        }
    }
}

function getRandomEmeraldChoice() {
    let packList = [];
    let packWeight = [];

    if (store.state.unlock.cardFeature.see) {
        for (let [key, elem] of Object.entries(store.state.card.pack)) {
            if (elem.price !== null && (elem.unlock === null || store.state.unlock[elem.unlock].see)) {
                packList.push(`card_${key}`);
                packWeight.push(1 / elem.price);
            }
        }
    }
    if (store.state.unlock.treasureFeature.see) {
        packList.push('treasure');
        packWeight.push(3 / store.state.treasure.type.regular.buyPrice);
    }

    if (packList.length <= 0) {
        return null;
    }

    return packList[weightSelect(packWeight)];
}

/**
 * Simulates active playtime and creates a report at the end of each simulated day
 * @param {Number} days The amount of days simulated
 */
async function autoplay(days = 1) {
    for (let i = 0; i < days; i++) {
        let totalSeconds = 0;
        dayDistribution.forEach(seconds => {
            autoplayTicks(totalSeconds + seconds, totalSeconds);
            totalSeconds += seconds;
        });
        await autoplayEndOfDay();
        if (store.state.system.settings.performance.items.recordAutoplay.value) {
            generateReport();
        }
        console.info(`Simulated day ${i + 1} of ${days}. Total days simulated: ${store.state.system.autoplayData.length}`);
    }
}
