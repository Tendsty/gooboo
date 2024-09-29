import store from "../../store"
import { MINING_COAL_DEPTH, MINING_DEEPROCK_DEPTH, MINING_DWELLER_OVERCAP_MULT, MINING_DWELLER_OVERFLOW, MINING_GRANITE_DEPTH, MINING_NITER_DEPTH, MINING_OBSIDIAN_DEPTH, MINING_ORE_BREAK, MINING_RARE_DROP_BREAK, MINING_SALT_DEPTH, MINING_SCRAP_BREAK, MINING_SMOKE_BREAK, MINING_SULFUR_DEPTH } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";
import { digitSum } from "../utils/math";
import achievement from "./mining/achievement";
import beacon from "./mining/beacon";
import enhancement from "./mining/enhancement";
import ore from "./mining/ore";
import relic from "./mining/relic";
import smeltery from "./mining/smeltery";
import upgrade from "./mining/upgrade";
import upgrade2 from "./mining/upgrade2";
import upgradePremium from "./mining/upgradePremium";
import upgradePrestige from "./mining/upgradePrestige";
import bookMining from "./school/bookMining";

const notes = {
    1: 'mining_0',
    2: 'mining_1',
    4: 'mining_2',
    7: 'mining_3',
    9: 'meta_1',
    11: 'meta_2',
    14: 'mining_4',
    16: 'mining_5',
    19: 'mining_6',
    21: 'mining_7',
    24: 'mining_8',
    29: 'mining_9',
    31: 'mining_10',
    34: 'mining_11',
    39: 'mining_12',
    45: 'mining_13',
    49: 'mining_14',
    51: 'mining_15',
    56: 'mining_16',
    62: 'mining_17',
    69: 'mining_19',
    70: 'mining_20',
    79: 'mining_21',
    90: 'mining_22',
    95: 'mining_23',
    103: 'mining_24',
    119: 'mining_26',
    124: 'mining_27',
    133: 'mining_28',
    144: 'mining_29',
    157: 'mining_31',
    166: 'mining_32',
    174: 'mining_33',
};

function awardLoot(breaks, loots, hits) {
    const gotLoot = breaks > 0 || loots > 0;
    if (gotLoot) {
        for (const [key, elem] of Object.entries(store.getters['mining/currentOre'])) {
            store.dispatch('currency/gain', {feature: 'mining', name: key, amount: elem.amount * (MINING_ORE_BREAK * breaks + loots)});
        }
        store.dispatch('currency/gain', {feature: 'mining', name: 'scrap', amount: store.getters['mining/currentScrap'] * (MINING_SCRAP_BREAK * breaks + loots)});
        const smokeGain = store.getters['mining/currentSmoke'] * (MINING_SMOKE_BREAK * breaks + loots);
        if (smokeGain > 0) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'smoke', amount: smokeGain});
        }
    }
    if (store.state.system.features.mining.currentSubfeature === 0) {
        const depth = store.state.mining.depth;
        const existingBreaks = store.getters['mining/currentBreaks'];
        const totalBreaks = existingBreaks + breaks;
        if (gotLoot && depth >= MINING_GRANITE_DEPTH && totalBreaks >= 1000) {
            let breaksMult = 0;
            let currentBreaks = existingBreaks;
            while (currentBreaks < totalBreaks) {
                const breaksBase = currentBreaks > 0 ? Math.floor(Math.log10(currentBreaks)) : -1;
                const adds = Math.min(totalBreaks - currentBreaks, Math.pow(10, breaksBase + 1) - currentBreaks);
                currentBreaks += adds;
                if (breaksBase >= 3) {
                    breaksMult += adds * Math.pow(2, breaksBase - 3);
                }
            }
            breaksMult = breaks > 0 ? (breaksMult / breaks) : Math.pow(2, Math.floor(Math.log10(existingBreaks)) - 3);
            store.dispatch('currency/gain', {feature: 'mining', name: 'granite', amount: store.getters['mining/rareDropFinal']('granite') * (MINING_RARE_DROP_BREAK * breaks + loots) * breaksMult});
        }
        if (gotLoot && depth >= MINING_SALT_DEPTH && Object.keys(store.getters['mining/currentOre']).length === 1) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'salt', amount: store.getters['mining/rareDropFinal']('salt') * (MINING_RARE_DROP_BREAK * breaks + loots)});
        }
        if (depth >= MINING_COAL_DEPTH && existingBreaks === 0 && breaks > 0) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'coal', amount: store.getters['mining/rareDropFinal']('coal')});
        }
        if (depth >= MINING_SULFUR_DEPTH && existingBreaks === 0 && hits > loots) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'sulfur', amount: store.getters['mining/rareDropFinal']('sulfur') * (hits - loots)});
        }
        if (depth >= MINING_NITER_DEPTH && breaks > 0) {
            let breaksMult = 0;
            let currentBreaks = existingBreaks;
            while (currentBreaks < totalBreaks) {
                const breaksBase = currentBreaks > 0 ? Math.floor(Math.log10(currentBreaks)) : -1;
                const nextStep = Math.pow(10, breaksBase + 1);
                currentBreaks = Math.min(totalBreaks, nextStep);
                if (currentBreaks === nextStep) {
                    breaksMult++;
                }
            }
            store.dispatch('currency/gain', {feature: 'mining', name: 'niter', amount: store.getters['mining/rareDropFinal']('niter') * breaksMult});
        }
        if (gotLoot && depth >= MINING_OBSIDIAN_DEPTH && store.getters['mining/enhancementLevel'] <= 0) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'obsidian', amount: store.getters['mining/rareDropFinal']('obsidian') * (MINING_RARE_DROP_BREAK * breaks + loots)});
        }
        if (gotLoot && depth >= MINING_DEEPROCK_DEPTH && digitSum(depth) >= 14) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'deeprock', amount: store.getters['mining/rareDropFinal']('deeprock') * (MINING_RARE_DROP_BREAK * breaks + loots)});
        }
    }
    if (breaks > 0) {
        store.commit('mining/addBreaks', {depth: store.state.mining.depth, amount: breaks});
    }
}

export default {
    name: 'mining',
    tickspeed: 1,
    unlockNeeded: null,
    tick: function(seconds) {
        const subfeature = store.state.system.features.mining.currentSubfeature;

        store.commit('stat/add', {feature: 'mining', name: 'timeSpent', value: seconds});

        if (store.state.mining.beaconCooldown > 0) {
            store.commit('mining/updateKey', {key: 'beaconCooldown', value: Math.max(store.state.mining.beaconCooldown - seconds, 0)});
        }

        // Smeltery
        for (const [key, elem] of Object.entries(store.state.mining.smeltery)) {
            if (elem.stored > 0) {
                let newProgress = elem.progress + seconds / store.getters['mining/smelteryTimeNeeded'](key);
                const bars = Math.min(elem.stored, Math.floor(newProgress));
                if (bars > 0) {
                    store.commit('mining/updateSmelteryKey', {name: key, key: 'stored', value: elem.stored - bars});
                    const barSplit = elem.output.split('_');
                    store.dispatch('currency/gain', {feature: barSplit[0], name: barSplit[1], amount: bars});
                    if ((elem.stored - bars) <= 0) {
                        newProgress = 0;
                    } else {
                        newProgress -= bars;
                    }
                }
                store.commit('mining/updateSmelteryKey', {name: key, key: 'progress', value: newProgress});
            }
        }

        // Resin
        if (store.state.unlock.miningResin.use && subfeature === 0) {
            store.dispatch('currency/gain', {feature: 'mining', name: 'resin', amount: seconds * store.getters['mult/get']('currencyMiningResinGain')});
        }

        // Mining
        if (store.getters['mining/currentDamage'] > 0) {
            let secondsLeft = seconds;
            while (secondsLeft > 0) {
                const maxDepth = store.state.stat[`mining_maxDepth${subfeature}`].value;

                let breaks = 0;
                let loots = 0;
                let preHits = Math.min(secondsLeft, store.getters['mining/currentHitsNeeded']);

                if (store.state.mining.depth < maxDepth) {
                    loots += preHits;
                }
                secondsLeft -= preHits;

                store.commit('stat/increaseTo', {feature: 'mining', name: 'maxDamage', value: store.getters['mining/currentDamage']});
                store.commit('stat/add', {feature: 'mining', name: 'totalDamage', value: preHits * store.getters['mining/currentDamage']});

                let newDurability = store.state.mining.durability - preHits * store.getters['mining/currentDamage'];

                if (newDurability <= 0) {
                    breaks++;
                    let isLatest = maxDepth === store.state.mining.depth;
                    if (isLatest) {
                        // Get gasses for the first time
                        for (const [key, elem] of Object.entries(store.getters['mining/currentGas'])) {
                            store.dispatch('currency/gain', {feature: 'mining', name: key, amount: elem});
                        }

                        // also count the first break as loot
                        loots++;
                        store.commit('stat/increaseTo', {feature: 'mining', name: 'maxDepth' + subfeature, value: store.state.mining.depth + 1});
                        store.dispatch('meta/globalLevelPart', {key: 'mining_' + subfeature, amount: store.state.stat[`mining_maxDepth${subfeature}`].total - 1});

                        // Find notes based on depth
                        if (subfeature === 0) {
                            const note = notes[store.state.stat.mining_maxDepth0.total - 1];
                            if (note !== undefined) {
                                store.dispatch('note/find', note);
                            }
                        }

                        // Speedrun stat
                        if (store.state.stat.mining_timeSpent.value <= 900 && subfeature === 0) {
                            store.commit('stat/increaseTo', {feature: 'mining', name: 'maxDepthSpeedrun', value: store.state.mining.depth + 1});
                        }

                        // Update dweller stat
                        store.dispatch('mining/updateDwellerStat');
                    }
                    if (
                        isLatest &&
                        store.getters['mining/depthHitsNeeded'](store.state.mining.depth + 1) <= (store.state.system.settings.automation.items.progressMining.value ?? 0)
                    ) {
                        awardLoot(breaks, loots, preHits);
                        store.commit('mining/updateKey', {key: 'depth', value: store.state.mining.depth + 1});
                        newDurability = store.getters['mining/currentDurability'];
                        store.dispatch('mining/applyBeaconEffects');
                    } else {
                        store.commit('stat/add', {feature: 'mining', name: 'totalDamage', value: secondsLeft * store.getters['mining/currentDamage']});
                        breaks += Math.floor(secondsLeft / store.getters['mining/hitsNeeded']);
                        loots += secondsLeft;
                        newDurability = store.getters['mining/currentDurability'] - store.getters['mining/currentDamage'] * (secondsLeft % store.getters['mining/hitsNeeded']);
                        awardLoot(breaks, loots, preHits + secondsLeft);
                        secondsLeft = 0;
                    }
                } else {
                    awardLoot(breaks, loots, preHits);
                }

                store.commit('mining/updateKey', {key: 'durability', value: newDurability});
            }
        } else {
            // Sulfur gain
            if (store.state.mining.depth >= MINING_SULFUR_DEPTH && store.getters['mining/currentBreaks'] === 0) {
                store.dispatch('currency/gain', {feature: 'mining', name: 'sulfur', amount: store.getters['mining/rareDropFinal']('sulfur') * seconds});
            }
        }

        // Depth dweller
        if (store.state.unlock.miningDepthDweller.use) {
            const dwellerLimit = store.getters['mining/dwellerLimit'];
            const dwellerSpeed = store.getters['mult/get']('miningDepthDwellerSpeed') / dwellerLimit;
            let timeLeft = seconds;
            if (store.state.stat[`mining_depthDweller${subfeature}`].value < dwellerLimit) {
                // Regular dweller calculation
                const newDweller = Math.min(
                    MINING_DWELLER_OVERFLOW + dwellerLimit -
                    (MINING_DWELLER_OVERFLOW + dwellerLimit - store.state.stat[`mining_depthDweller${subfeature}`].value) *
                    Math.pow(1 - dwellerSpeed, seconds), dwellerLimit
                );
                if (newDweller >= dwellerLimit) {
                    store.commit('stat/increaseTo', {feature: 'mining', name: 'dwellerCapHit', value: 1});
                    timeLeft -= Math.ceil(store.getters['mining/timeUntilNext'](dwellerLimit));
                } else {
                    timeLeft = 0;
                }
                store.commit('stat/increaseTo', {feature: 'mining', name: 'depthDweller' + subfeature, value: newDweller});
                store.commit('stat/increaseTo', {feature: 'mining', name: 'depthDwellerCap' + subfeature, value: newDweller});
            }
            if (timeLeft > 0 && dwellerLimit > 0) {
                // Dweller overcap
                let newDweller = store.state.stat[`mining_depthDweller${subfeature}`].value;
                let dwellerProgress = dwellerSpeed * MINING_DWELLER_OVERFLOW * timeLeft;
                while (dwellerProgress > 0) {
                    const breakpointCount = Math.floor(10 * (newDweller + 0.000000000001) / dwellerLimit) - 10;
                    const targetAmount = ((breakpointCount + 1) / 10) * dwellerLimit;
                    const progressMade = Math.min(dwellerProgress * Math.pow(MINING_DWELLER_OVERCAP_MULT, breakpointCount + 1), targetAmount);
                    newDweller += progressMade;
                    dwellerProgress -= progressMade * Math.pow(1 / MINING_DWELLER_OVERCAP_MULT, breakpointCount + 1);
                }
                store.commit('stat/increaseTo', {feature: 'mining', name: 'depthDweller' + subfeature, value: newDweller});
            }
        }
    },
    unlock: ['miningPickaxeCrafting', 'miningDepthDweller', 'miningSmeltery', 'miningEnhancement', 'miningResin', 'miningGasSubfeature', 'miningSmoke'],
    stat: {
        maxDepth0: {value: 1, showInStatistics: true},
        maxDepth1: {value: 1, showInStatistics: true},
        depthDweller0: {},
        depthDwellerCap0: {showInStatistics: true},
        depthDweller1: {},
        depthDwellerCap1: {showInStatistics: true},
        totalDamage: {showInStatistics: true},
        maxDamage: {showInStatistics: true},
        craftingCount: {showInStatistics: true},
        craftingLuck: {value: 1},
        craftingWasted: {},
        dwellerCapHit: {},
        timeSpent: {display: 'time'},
        bestPrestige0: {showInStatistics: true},
        bestPrestige1: {showInStatistics: true},
        prestigeCount: {showInStatistics: true},
        maxDepthSpeedrun: {value: 1}
    },
    mult: {
        miningDamage: {},
        miningToughness: {},
        miningOreGain: {},
        miningOreCap: {},
        miningRareEarthGain: {},
        miningPickaxeCraftingSlots: {round: true, baseValue: 1},
        miningPickaxePremiumCraftingSlots: {round: true},
        miningPickaxeCraftingPower: {},
        miningPickaxeCraftingQuality: {},
        miningOreQuality: {baseValue: 1},
        miningDepthDwellerSpeed: {baseValue: 0.000065},
        miningDepthDwellerMax: {display: 'percent', baseValue: 0.1},
        miningResinMax: {round: true, baseValue: 1},
        currencyMiningHeliumIncrement: {display: 'percent'},
        currencyMiningNeonIncrement: {display: 'percent'},
        currencyMiningArgonIncrement: {display: 'percent'},
        currencyMiningKryptonIncrement: {display: 'percent'},
        currencyMiningXenonIncrement: {display: 'percent'},
        currencyMiningRadonIncrement: {display: 'percent'},
        miningSmelterySpeed: {baseValue: 1},
        miningSmelteryTemperature: {display: 'temperature', baseValue: 100},
        miningEnhancementBarsIncrement: {display: 'percent', baseValue: 0.75, min: 0},
        miningEnhancementFinalIncrement: {display: 'percent', baseValue: 3, min: 0},
        miningPrestigeIncome: {group: ['currencyMiningCrystalGreenGain', 'currencyMiningCrystalYellowGain']}
    },
    multGroup: [
        {mult: 'miningOreGain', name: 'currencyGain', subtype: 'ore'},
        {mult: 'miningOreCap', name: 'currencyCap', subtype: 'ore'},
        {mult: 'miningRareEarthGain', name: 'currencyGain', subtype: 'rareEarth'}
    ],
    currency: {
        scrap: {color: 'brown', icon: 'mdi-dots-triangle', gainMult: {}, capMult: {baseValue: buildNum(10, 'K')}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            return hitsNeeded === Infinity ? null : (((hitsNeeded + MINING_SCRAP_BREAK) * store.getters['mining/currentScrap']) / hitsNeeded);
        }, timerIsEstimate: true},
        oreAluminium: {subtype: 'ore', color: 'blue-grey', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 12, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreAluminium) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreAluminium.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreCopper: {subtype: 'ore', color: 'orange', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 4, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreCopper) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreCopper.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreTin: {subtype: 'ore', color: 'grey', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 2, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreTin) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreTin.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreIron: {subtype: 'ore', color: 'deep-orange', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreIron) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreIron.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreTitanium: {subtype: 'ore', color: 'pale-light-green', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreTitanium) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreTitanium.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        orePlatinum: {subtype: 'ore', color: 'skyblue', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.orePlatinum) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.orePlatinum.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreIridium: {subtype: 'ore', color: 'pale-purple', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreIridium) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreIridium.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreOsmium: {subtype: 'ore', color: 'pale-green', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreOsmium) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreOsmium.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        oreLead: {subtype: 'ore', color: 'pale-blue', icon: 'mdi-chart-bubble', gainMult: {}, capMult: {baseValue: 1, round: true}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const oreGain = store.getters['mining/currentOre'];
            return (hitsNeeded === Infinity || !oreGain.oreLead) ? null : (((hitsNeeded + MINING_ORE_BREAK) * oreGain.oreLead.amount) / hitsNeeded);
        }, timerIsEstimate: true},
        barAluminium: {subtype: 'bar', color: 'blue-grey', icon: 'mdi-gold'},
        barBronze: {subtype: 'bar', color: 'pale-orange', icon: 'mdi-gold'},
        barSteel: {subtype: 'bar', color: 'grey', icon: 'mdi-gold'},
        barTitanium: {subtype: 'bar', color: 'pale-green', icon: 'mdi-gold'},
        barShiny: {subtype: 'bar', color: 'pale-blue', icon: 'mdi-gold'},
        barIridium: {subtype: 'bar', color: 'pale-pink', icon: 'mdi-gold'},
        barDarkIron: {subtype: 'bar', color: 'darker-grey', icon: 'mdi-gold'},
        granite: {subtype: 'rareEarth', color: 'skyblue', icon: 'mdi-cube', gainMult: {}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const rareDropGain = store.getters['mining/rareDrops'];
            return (hitsNeeded === Infinity || !rareDropGain.granite) ? null : (((hitsNeeded + MINING_RARE_DROP_BREAK) * rareDropGain.granite) / hitsNeeded);
        }, timerIsEstimate: true},
        salt: {subtype: 'rareEarth', color: 'lighter-grey', icon: 'mdi-shaker', gainMult: {}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const rareDropGain = store.getters['mining/rareDrops'];
            return (hitsNeeded === Infinity || !rareDropGain.salt) ? null : (((hitsNeeded + MINING_RARE_DROP_BREAK) * rareDropGain.salt) / hitsNeeded);
        }, timerIsEstimate: true},
        coal: {color: 'dark-grey', icon: 'mdi-chart-bubble', gainMult: {round: true}},
        sulfur: {subtype: 'rareEarth', color: 'pale-yellow', icon: 'mdi-fire-circle', gainMult: {}, gainTimerFunction() {
            return store.getters['mining/rareDrops'].sulfur ?? null;
        }, timerIsEstimate: true},
        niter: {color: 'pale-light-green', icon: 'mdi-water-circle', gainMult: {}},
        obsidian: {subtype: 'rareEarth', color: 'deep-purple', icon: 'mdi-cone', gainMult: {}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const rareDropGain = store.getters['mining/rareDrops'];
            return (hitsNeeded === Infinity || !rareDropGain.obsidian) ? null : (((hitsNeeded + MINING_RARE_DROP_BREAK) * rareDropGain.obsidian) / hitsNeeded);
        }, timerIsEstimate: true},
        deeprock: {subtype: 'rareEarth', color: 'darker-grey', icon: 'mdi-gamepad-circle', gainMult: {}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const rareDropGain = store.getters['mining/rareDrops'];
            return (hitsNeeded === Infinity || !rareDropGain.deeprock) ? null : (((hitsNeeded + MINING_RARE_DROP_BREAK) * rareDropGain.deeprock) / hitsNeeded);
        }, timerIsEstimate: true},
        glowshard: {color: 'cyan', icon: 'mdi-lightbulb-fluorescent-tube', gainMult: {}, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            const rareDropGain = store.getters['mining/rareDrops'];
            return (hitsNeeded === Infinity || !rareDropGain.glowshard) ? null : (((hitsNeeded + MINING_RARE_DROP_BREAK) * rareDropGain.glowshard) / hitsNeeded);
        }, timerIsEstimate: true},
        smoke: {color: 'grey', icon: 'mdi-smoke', gainMult: {}, capMult: {baseValue: 10}, overcapScaling: 0.25, gainTimerFunction() {
            const hitsNeeded = store.getters['mining/hitsNeeded'];
            return hitsNeeded === Infinity ? null : (((hitsNeeded + MINING_SMOKE_BREAK) * store.getters['mining/currentSmoke']) / hitsNeeded);
        }, timerIsEstimate: true},
        ember: {type: 'prestige', color: 'orange-red', icon: 'mdi-fire', overcapMult: 0, gainMult: {display: 'percent'}, capMult: {baseValue: 100}, currencyMult: {
            miningSmelterySpeed: {type: 'mult', value: val => val * 0.02 + 1}
        }},
        resin: {type: 'prestige', color: 'orange', icon: 'mdi-water', gainMult: {baseValue: 0.0001, display: 'perSecond'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 5}},
        crystalGreen: {type: 'prestige', alwaysVisible: true, color: 'light-green', icon: 'mdi-star-three-points', gainMult: {}},
        helium: {type: 'prestige', color: 'pale-blue', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}, currencyMult: {
            currencyMiningScrapCap: {type: 'mult', value: val => val * 0.01 + 1}
        }},
        neon: {type: 'prestige', color: 'orange-red', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}, currencyMult: {
            miningPickaxeCraftingPower: {type: 'mult', value: val => val * 0.01 + 1}
        }},
        argon: {type: 'prestige', color: 'pink-purple', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}, currencyMult: {
            currencyMiningScrapGain: {type: 'mult', value: val => val * 0.01 + 1}
        }},
        krypton: {type: 'prestige', color: 'light-blue', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}},
        xenon: {type: 'prestige', color: 'blue', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}},
        radon: {type: 'prestige', color: 'light-green', icon: 'mdi-gas-cylinder', gainMult: {display: 'percent', baseValue: 0.01}},
        crystalYellow: {type: 'prestige', alwaysVisible: true, color: 'yellow', icon: 'mdi-star-four-points', gainMult: {}}
    },
    upgrade: {
        ...upgrade,
        ...upgrade2,
        ...upgradePrestige,
        ...upgradePremium,
        ...bookMining
    },
    relic,
    achievement,
    note: buildArray(34).map(() => 'g'),
    consumable: {
        goldenHammer: {
            icon: 'mdi-hammer',
            color: 'amber',
            price: {gem_sapphire: 20}
        }
    },
    init() {
        for (const [key, elem] of Object.entries(ore)) {
            store.commit('unlock/init', 'miningCompress' + key.slice(3));
            store.commit('mining/initOre', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(smeltery)) {
            store.commit('mining/initSmeltery', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(enhancement)) {
            store.commit('mining/initEnhancement', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(beacon)) {
            store.commit('mining/initBeacon', {name: key, ...elem});
            store.commit('mult/init', {feature: 'mining', name: elem.ownedMult, round: true});
        }

        store.commit('mining/updateKey', {key: 'durability', value: store.getters['mining/currentDurability']});
    },
    saveGame() {
        let obj = {
            depth: store.state.mining.depth,
            durability: store.state.mining.durability,
            pickaxePower: store.state.mining.pickaxePower,
        };

        if (store.state.mining.breaks.length > 0) {
            obj.breaks = store.state.mining.breaks;
        }
        if (store.state.unlock.miningPickaxeCrafting.see) {
            obj.ingredientList = store.state.mining.ingredientList;
        }
        if (store.state.mining.enhancementBars > 0) {
            obj.enhancementBars = store.state.mining.enhancementBars;
        }
        if (store.state.mining.enhancementIngredient !== null) {
            obj.enhancementIngredient = store.state.mining.enhancementIngredient;
        }
        if (store.state.mining.resin > 0) {
            obj.resin = store.state.mining.resin;
        }

        let smelteryData = {};
        for (const [key, elem] of Object.entries(store.state.mining.smeltery)) {
            if (elem.total > 0) {
                smelteryData[key] = [elem.progress, elem.stored, elem.total];
            }
        }
        if (Object.keys(smelteryData).length > 0) {
            obj.smeltery = smelteryData;
        }

        let enhancementData = {};
        for (const [key, elem] of Object.entries(store.state.mining.enhancement)) {
            if (elem.level > 0) {
                enhancementData[key] = elem.level;
            }
        }
        if (Object.keys(enhancementData).length > 0) {
            obj.enhancement = enhancementData;
        }

        if (Object.keys(store.state.mining.beaconPlaced).length > 0) {
            obj.beaconPlaced = store.state.mining.beaconPlaced;
        }
        if (store.state.mining.beaconCooldown > 0) {
            obj.beaconCooldown = store.state.mining.beaconCooldown;
        }

        return obj;
    },
    loadGame(data) {
        ['depth', 'durability', 'pickaxePower', 'breaks', 'ingredientList', 'enhancementBars', 'enhancementIngredient', 'resin', 'beaconPlaced', 'beaconCooldown'].forEach(elem => {
            if (data[elem] !== undefined) {
                store.commit('mining/updateKey', {key: elem, value: data[elem]});
            }
        });
        if (data.smeltery !== undefined) {
            for (const [key, elem] of Object.entries(data.smeltery)) {
                if (store.state.mining.smeltery[key] !== undefined) {
                    store.commit('mining/updateSmelteryKey', {name: key, key: 'progress', value: elem[0]});
                    store.commit('mining/updateSmelteryKey', {name: key, key: 'stored', value: elem[1]});
                    store.commit('mining/updateSmelteryKey', {name: key, key: 'total', value: elem[2]});
                }
            }
        }
        if (data.enhancement !== undefined) {
            for (const [key, elem] of Object.entries(data.enhancement)) {
                if (store.state.mining.enhancement[key] !== undefined) {
                    store.commit('mining/updateEnhancementKey', {name: key, key: 'level', value: elem});
                    store.dispatch('mining/applyEnhancement', {trigger: false, name: key});
                }
            }
        }
        store.dispatch('mining/applyBeaconEffects');
    }
}
