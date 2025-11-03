import store from "../../store"
import { FARM_BUILDING_PREMIUM_BONUS, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { randomRound, weightSelect } from "../utils/random";
import achievement from "./farm/achievement";
import building from "./farm/building";
import crop from "./farm/crop";
import fertilizer from "./farm/fertilizer";
import gene from "./farm/gene";
import geneLevels from "./farm/geneLevels";
import relic from "./farm/relic";
import upgrade from "./farm/upgrade";
import upgradePremium from "./farm/upgradePremium";

export default {
    name: 'farm',
    tickspeed: 5,
    unlockNeeded: 'farmFeature',
    forceTick(ticks, oldTime, newTime) {
        const dayDiff = Math.floor(newTime / SECONDS_PER_DAY) - Math.floor(oldTime / SECONDS_PER_DAY);
        if (dayDiff > 0) {
            for (const [key, elem] of Object.entries(store.state.farm.crop)) {
                if (elem.genes.includes('patient') && elem.patientStacks < 60) {
                    store.commit('farm/updateCropKey', {name: key, key: 'patientStacks', value: Math.min(elem.patientStacks + dayDiff, 60)});
                }
            }
        }
    },
    tick(ticks) {
        const decoration = store.state.farm.building.gardenGnome.cacheAmount + store.state.farm.building.gardenGnome.cachePremium * FARM_BUILDING_PREMIUM_BONUS;
        let highestGrow = 0;
        let careEligible = [];
        let careActive = 0;
        const careMax = store.getters['mult/get']('farmMaxCare');
        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && cell.type === 'crop') {
                    if (cell.cache.overgrowMult === null) {
                        store.commit('farm/updateFieldKey', {x, y, key: 'grow', value: Math.min(cell.grow + cell.cache.grow * ticks / 12, 1)});
                    } else {
                        let grow = cell.grow;
                        let stage = Math.floor(cell.grow);
                        let amt = cell.cache.grow * ticks / 12;
                        while (amt > 0) {
                            const left = (stage + 1) - grow;
                            const stageMult = stage > 0 ? Math.pow(cell.cache.overgrowMult, stage) : 1;
                            const given = Math.min(left, amt / stageMult);

                            grow += given;
                            amt -= given * stageMult;
                            stage++;
                        }
                        if (grow > highestGrow) {
                            highestGrow = grow;
                        }
                        store.commit('farm/updateFieldKey', {x, y, key: 'grow', value: grow});
                    }
                    store.commit('farm/updateFieldKey', {x, y, key: 'time', value: cell.time + ticks});
                    if (decoration > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'gardenGnome', value: decoration * ticks});
                    }
                    if (cell.cache.lectern > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'lectern', value: cell.cache.lectern * ticks});
                    }
                    if (cell.cache.pinwheel > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'pinwheel', value: cell.cache.pinwheel * ticks});
                    }
                    if (cell.cache.flag > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'flag', value: cell.cache.flag * ticks});
                    }
                    if (cell.cache.gnome > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'gnomeBoost', value: cell.cache.gnome * ticks});
                    }
                    if (cell.care.active) {
                        careActive++;
                    } else if (cell.cache.careWeight > 0) {
                        careEligible.push({x, y, weight: cell.cache.careWeight});
                    }
                }
            });
        });

        if (store.state.unlock.farmCare.use) {
            store.dispatch('currency/gain', {feature: 'farm', name: 'rainwater', amount: store.getters['mult/get'](`currencyFarmRainwaterGain`) * ticks / 720});

            // Apply care
            const careGiven = Math.min(careEligible.length, Math.floor(store.state.currency.farm_rainwater.value), careMax - careActive, randomRound(ticks * Math.max(0.2, 0.2 * store.state.currency.farm_rainwater.value / store.state.currency.farm_rainwater.cap)));
            if (careGiven > 0) {
                for (let i = 0; i < careGiven; i++) {
                    const index = weightSelect(careEligible.map(el => el.weight));
                    const cell = careEligible[index];
                    store.commit('farm/updateFieldCare', {x: cell.x, y: cell.y, key: 'active', value: true});
                    careEligible.splice(index, 1);
                }
                store.dispatch('currency/spend', {feature: 'farm', name: 'rainwater', amount: careGiven});
            }
        }

        // Update best harvest stat
        if (highestGrow > 1) {
            store.commit('stat/increaseTo', {feature: 'farm', name: 'maxOvergrow', value: highestGrow});
        }

        store.dispatch('farm/updateGrownHint');
    },
    unlock: [
        'farmFeature', 'farmDisableEarlyGame', 'farmCare', 'farmCropExp', 'farmFertilizer',
        'farmAdvancedCardPack', 'farmLuxuryCardPack', 'farmPowerCardPack', 'farmSeedCardPack',
        ...Object.keys(geneLevels).map(elem => 'farmGeneLevel' + elem),
    ],
    stat: {
        harvests: {showInStatistics: true},
        maxOvergrow: {showInStatistics: true, display: 'percent'},
        bestPrestige: {showInStatistics: true},
        totalMystery: {showInStatistics: true},
        care: {showInStatistics: true},
    },
    mult: {
        farmExperience: {baseValue: 1, unlock: 'farmCropExp'},
        farmGoldChance: {display: 'percent'},
        farmGrow: {display: 'time', isPositive: false},
        farmOvergrow: {display: 'percent'},
        farmHuntChance: {display: 'percent'},
        farmRareDropChance: {display: 'percent', group: ['farmHuntChance']},
        farmMystery: {},
        farmCropGain: {group: ['currencyFarmVegetableGain', 'currencyFarmBerryGain', 'currencyFarmGrainGain', 'currencyFarmFlowerGain']},
        farmAllGain: {group: ['farmCropGain', 'farmExperience', 'farmGoldChance', 'farmRareDropChance']},
        farmLuckyHarvestMult: {display: 'mult', baseValue: 8},
        farmMaxCare: {baseValue: 2, unlock: 'farmCare'},
        farmCareWeight: {baseValue: 1, unlock: 'farmCare'},
    },
    currency: {
        vegetable: {color: 'orange', icon: 'mdi-carrot', gainMult: {}},
        berry: {color: 'purple', icon: 'mdi-fruit-grapes', gainMult: {}},
        grain: {color: 'yellow', icon: 'mdi-barley', gainMult: {}},
        flower: {color: 'pink', icon: 'mdi-flower', gainMult: {}},
        rainwater: {color: 'dark-blue', icon: 'mdi-water', isHidden: true, overcapMult: 0.9, overcapScaling: 0.9, gainMult: {baseValue: 10, display: 'perHour'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 20}},
        gold: {color: 'amber', icon: 'mdi-gold', display: 'int'},
        mixedSeeds: {color: 'lime', icon: 'mdi-grain', showHint: true, display: 'int'},
        cactusSeed: {color: 'green', icon: 'mdi-grain', showHint: true, display: 'int'},
        seedHull: {color: 'beige', icon: 'mdi-seed', display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 50}},
        grass: {color: 'green', icon: 'mdi-grass', showHint: true, display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 200}},
        petal: {color: 'light-blue', icon: 'mdi-leaf', display: 'int', overcapMult: 1, overcapScaling: 0, currencyMult: {
            currencyFarmFlowerGain: {type: 'mult', value: val => (val > 1000 ? (Math.sqrt(val / 1000) * 1000) : val) * 0.03 + 1}
        }, capMult: {baseValue: 50}},
        bug: {color: 'brown', icon: 'mdi-bug', display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 50}},
        butterfly: {color: 'babypink', icon: 'mdi-butterfly', display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 30}},
        ladybug: {color: 'pale-red', icon: 'mdi-ladybug', display: 'int', overcapMult: 1, overcapScaling: 0, currencyMult: {
            farmRareDropChance: {type: 'base', value: val => (val > 1000 ? (Math.sqrt(val / 1000) * 1000) : val) * 0.0001}
        }, capMult: {baseValue: 150}},
        spider: {color: 'dark-grey', icon: 'mdi-spider', display: 'int', overcapMult: 1, overcapScaling: 0, currencyMult: {
            currencyFarmBugCap: {type: 'base', value: val => val * 10},
            currencyFarmButterflyCap: {type: 'base', value: val => val},
            currencyFarmLadybugCap: {type: 'base', value: val => val * 15},
        }, capMult: {baseValue: 20}},
        bee: {color: 'yellow', icon: 'mdi-bee', display: 'int', overcapMult: 1, overcapScaling: 0, currencyMult: {
            currencyFarmBerryGain: {type: 'mult', value: val => (val > 1e5 ? (Math.sqrt(val / 1e5) * 1e5) : val) * 0.001 + 1}
        }, capMult: {baseValue: 1000}},
        mysteryStone: {color: 'pale-purple', icon: 'mdi-eye-circle-outline', display: 'int', overcapMult: 0, capMult: {baseValue: 1337}},
        smallSeed: {color: 'brown', icon: 'mdi-grain', display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 800}},
        ancientSeed: {color: 'pale-purple', icon: 'mdi-rugby', showHint: true, display: 'int'},
        snail: {color: 'lime', icon: 'mdi-snail', display: 'int', overcapMult: 1, overcapScaling: 0, capMult: {baseValue: 40}},
        oldRoot: {color: 'brown', icon: 'mdi-carrot', display: 'int', overcapMult: 0, capMult: {baseValue: 1000}},
    },
    note: buildArray(22).map(() => 'g'),
    upgrade: {
        ...upgrade,
        ...upgradePremium,
    },
    relic,
    achievement,
    consumable: fertilizer,
    init() {
        for (const [key, elem] of Object.entries(crop)) {
            store.commit('farm/initCrop', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(building)) {
            store.commit('farm/initBuilding', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(gene)) {
            store.commit('farm/initGene', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(fertilizer)) {
            store.commit('farm/initFertilizer', {name: key, ...elem});
        }

        store.commit('farm/initField');

        store.dispatch('mult/setMult', {name: 'farmHuntChance', key: 'farmGene_hunter', value: 0.01});
    },
    saveGame() {
        let obj = {
            field: {},
            crop: {}
        };

        if (store.state.farm.showColors) {
            obj.showColors = true;
        }
        if (store.state.farm.selectedColor) {
            obj.selectedColor = store.state.farm.selectedColor;
        }

        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && (cell.type !== null || cell.color !== null)) {
                    // eslint-disable-next-line no-unused-vars
                    const {cache: _, ...newObj} = cell;
                    obj.field[y * 7 + x] = newObj;
                }
            });
        });
        for (const [key, elem] of Object.entries(store.state.farm.crop)) {
            if (elem.found) {
                obj.crop[key] = {exp: elem.exp, level: elem.level};
                if (elem.type !== 'special') {
                    if (elem.levelMax > 0) {
                        obj.crop[key].levelMax = elem.levelMax;
                    }
                    if (elem.genes.length > 0) {
                        obj.crop[key].genes = elem.genes;
                    }
                    if (elem.genesBlocked.length > 0) {
                        obj.crop[key].genesBlocked = elem.genesBlocked;
                    }
                    if (elem.cardSelected.length > 0) {
                        obj.crop[key].cardSelected = elem.cardSelected;
                    }
                    if (elem.cardEquipped.length > 0) {
                        obj.crop[key].cardEquipped = elem.cardEquipped;
                    }
                    if (Object.keys(elem.upgrades).length > 0) {
                        obj.crop[key].upgrades = elem.upgrades;
                    }

                    let rareDrops = {};
                    elem.rareDrop.forEach((drop, index) => {
                        if (drop.found) {
                            rareDrops[index] = drop.hunter;
                        }
                    });
                    if (Object.keys(rareDrops).length > 0) {
                        obj.crop[key].rareDrop = rareDrops;
                    }

                    if (elem.patientStacks > 0) {
                        obj.crop[key].patientStacks = elem.patientStacks;
                    }
                }
            }
        }

        return obj;
    },
    loadGame(data) {
        if (data.field) {
            for (const [key, elem] of Object.entries(data.field)) {
                const fieldId = parseInt(key);
                let cell = elem;
                if (cell.type === 'crop') {
                    cell.cache = {};
                }
                store.commit('farm/updateField', {x: fieldId % 7, y: Math.floor(fieldId / 7), value: elem});
            }
        }
        if (data.crop) {
            for (const [key, elem] of Object.entries(data.crop)) {
                if (store.state.farm.crop[key]) {
                    ['exp', 'level', 'levelMax', 'genes', 'genesBlocked', 'cardSelected', 'cardEquipped', 'upgrades', 'patientStacks'].forEach(el => {
                        if (elem[el] !== undefined) {
                            store.commit('farm/updateCropKey', {name: key, key: el, value: elem[el]});
                        }
                    });
                    if (elem.rareDrop) {
                        for (const [index, value] of Object.entries(elem.rareDrop)) {
                            if (store.state.farm.crop[key].rareDrop[index] !== undefined) {
                                store.commit('farm/findCropRareDrop', {name: key, index});
                                store.commit('farm/huntCropRareDrop', {name: key, index, value});
                            }
                        }
                    }

                    // Apply level ups
                    store.dispatch('farm/getCropExp', {crop: key, value: 0});
                    if (store.state.farm.crop[key]?.type === 'special' && elem.level > 0) {
                        store.dispatch('farm/applySpecialCropEffect', {name: key, trigger: false});
                    }
                }
            }
        }
        if (data.showColors) {
            store.commit('farm/updateKey', {key: 'showColors', value: true});
        }
        if (data.selectedColor) {
            store.commit('farm/updateKey', {key: 'selectedColor', value: data.selectedColor});
        }
        store.commit('farm/calculateCropBuildingCaches');
        store.dispatch('farm/applyGeneEffects');
        store.dispatch('farm/applyCropPrestige');
        store.dispatch('farm/updateGrownHint');
    }
}
