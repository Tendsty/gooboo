import store from "../../store"
import { SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import achievement from "./farm/achievement";
import building from "./farm/building";
import crop from "./farm/crop";
import fertilizer from "./farm/fertilizer";
import gene from "./farm/gene";
import relic from "./farm/relic";
import upgrade from "./farm/upgrade";
import upgradePremium from "./farm/upgradePremium";
import bookFarm from "./school/bookFarm";

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
        const decoration = store.state.farm.building.gardenGnome.cacheAmount + store.state.farm.building.gardenGnome.cachePremium;
        let highestGrow = 0;
        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && cell.type === 'crop') {
                    if (cell.cache.overgrow === null) {
                        store.commit('farm/updateFieldKey', {x, y, key: 'grow', value: Math.min(cell.grow + cell.cache.grow * ticks / 12, 1)});
                    } else {
                        let grow = cell.grow;
                        let stage = Math.floor(cell.grow);
                        let amt = cell.cache.grow * ticks / 12;
                        while (amt > 0) {
                            const left = (stage + 1) - grow;
                            const stageMult = stage > 0 ? Math.pow(cell.cache.overgrow, stage) : 1;
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
                }
            });
        });
        if (highestGrow > 1) {
            store.commit('stat/increaseTo', {feature: 'farm', name: 'maxOvergrow', value: highestGrow});
        }
        store.dispatch('farm/updateGrownHint');
    },
    unlock: ['farmFeature', 'farmDisableEarlyGame', 'farmCropExp', 'farmFertilizer', 'farmAdvancedCardPack', 'farmLuxuryCardPack'],
    stat: {
        harvests: {showInStatistics: true},
        maxOvergrow: {showInStatistics: true},
        bestPrestige: {showInStatistics: true},
        totalMystery: {showInStatistics: true}
    },
    mult: {
        farmExperience: {baseValue: 1},
        farmGoldChance: {display: 'percent'},
        farmGrow: {display: 'time'},
        farmOvergrow: {display: 'percent'},
        farmHuntChance: {display: 'percent'},
        farmRareDropChance: {display: 'percent', group: ['farmHuntChance']},
        farmMystery: {},
        farmCropGain: {group: ['currencyFarmVegetableGain', 'currencyFarmBerryGain', 'currencyFarmGrainGain', 'currencyFarmFlowerGain']},
        farmAllGain: {group: ['farmCropGain', 'farmExperience', 'farmGoldChance', 'farmRareDropChance']},
        farmCropCost: {},
        farmFertilizerCost: {},
        farmLuckyHarvestMult: {display: 'mult', baseValue: 8},
    },
    currency: {
        vegetable: {color: 'orange', icon: 'mdi-carrot', gainMult: {}},
        berry: {color: 'purple', icon: 'mdi-fruit-grapes', gainMult: {}},
        grain: {color: 'yellow', icon: 'mdi-barley', gainMult: {}},
        flower: {color: 'pink', icon: 'mdi-flower', gainMult: {}},
        gold: {color: 'amber', icon: 'mdi-gold'},
        seedHull: {color: 'beige', icon: 'mdi-seed', overcapMult: 0, capMult: {baseValue: 50}},
        grass: {color: 'green', icon: 'mdi-grass', overcapMult: 0, capMult: {baseValue: 200}},
        petal: {color: 'light-blue', icon: 'mdi-leaf', overcapMult: 0, currencyMult: {
            currencyFarmFlowerGain: {type: 'mult', value: val => val * 0.03 + 1}
        }, capMult: {baseValue: 50}},
        bug: {color: 'brown', icon: 'mdi-bug', overcapMult: 0, capMult: {baseValue: 50}},
        butterfly: {color: 'babypink', icon: 'mdi-butterfly', overcapMult: 0, capMult: {baseValue: 30}},
        ladybug: {color: 'pale-red', icon: 'mdi-ladybug', overcapMult: 0, currencyMult: {
            farmRareDropChance: {type: 'base', value: val => val * 0.0001}
        }, capMult: {baseValue: 150}},
        spider: {color: 'dark-grey', icon: 'mdi-spider', overcapMult: 0, currencyMult: {
            currencyFarmBugCap: {type: 'base', value: val => val * 20},
            currencyFarmButterflyCap: {type: 'base', value: val => val},
            currencyFarmLadybugCap: {type: 'base', value: val => val * 5}
        }, capMult: {baseValue: 20}},
        bee: {color: 'yellow', icon: 'mdi-bee', overcapMult: 0, currencyMult: {
            currencyFarmBerryGain: {type: 'mult', value: val => val * 0.001 + 1}
        }, capMult: {baseValue: 1000}},
        mysteryStone: {color: 'pale-purple', icon: 'mdi-eye-circle-outline', overcapMult: 0, capMult: {baseValue: 1337}},
        goldenPetal: {color: 'amber', icon: 'mdi-leaf', overcapMult: 0, currencyMult: {
            currencyFarmPetalCap: {type: 'base', value: val => val * 25}
        }, capMult: {baseValue: 10}},
        smallSeed: {color: 'brown', icon: 'mdi-grain', overcapMult: 0, capMult: {baseValue: 800}},
    },
    note: buildArray(22).map(() => 'g'),
    upgrade: {
        ...upgrade,
        ...upgradePremium,
        ...bookFarm
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
                let rareDrops = {};
                elem.rareDrop.forEach((drop, index) => {
                    if (drop.found) {
                        rareDrops[index] = drop.hunter;
                    }
                });
                obj.crop[key] = {
                    exp: elem.exp,
                    level: elem.level,
                    levelMax: elem.levelMax,
                    dna: elem.dna,
                    genes: elem.genes,
                    genesBlocked: elem.genesBlocked,
                    cardSelected: elem.cardSelected,
                    cardEquipped: elem.cardEquipped,
                    upgrades: elem.upgrades
                };
                if (Object.keys(rareDrops).length > 0) {
                    obj.crop[key].rareDrop = rareDrops;
                }
                if (elem.patientStacks > 0) {
                    obj.patientStacks = elem.patientStacks;
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
                store.commit('farm/updateCropKey', {name: key, key: 'exp', value: elem.exp});
                store.commit('farm/updateCropKey', {name: key, key: 'level', value: elem.level});
                store.commit('farm/updateCropKey', {name: key, key: 'levelMax', value: elem.levelMax});
                if (elem.rareDrop) {
                    for (const [index, value] of Object.entries(elem.rareDrop)) {
                        if (store.state.farm.crop[key].rareDrop[index] !== undefined) {
                            store.commit('farm/findCropRareDrop', {name: key, index});
                            store.commit('farm/huntCropRareDrop', {name: key, index, value});
                        }
                    }
                }
                store.commit('farm/updateCropKey', {name: key, key: 'dna', value: elem.dna});
                store.commit('farm/updateCropKey', {name: key, key: 'genes', value: elem.genes});
                store.commit('farm/updateCropKey', {name: key, key: 'genesBlocked', value: elem.genesBlocked});
                store.commit('farm/updateCropKey', {name: key, key: 'cardSelected', value: elem.cardSelected});
                store.commit('farm/updateCropKey', {name: key, key: 'cardEquipped', value: elem.cardEquipped});
                store.commit('farm/updateCropKey', {name: key, key: 'upgrades', value: elem.upgrades});

                if (elem.patientStacks !== undefined) {
                    store.commit('farm/updateCropKey', {name: key, key: 'patientStacks', value: elem.patientStacks});
                }

                // Apply level ups
                store.dispatch('farm/getCropExp', {crop: key, value: 0});
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
