import store from "../../store"
import { buildArray } from "../utils/array";
import achievement from "./farm/achievement";
import building from "./farm/building";
import crop from "./farm/crop";
import fertilizer from "./farm/fertilizer";
import relic from "./farm/relic";
import upgrade from "./farm/upgrade";
import upgradePremium from "./farm/upgradePremium";
import bookFarm from "./school/bookFarm";

export default {
    name: 'farm',
    tickspeed: 60,
    unlockNeeded: 'farmFeature',
    tick(minutes) {
        const decoration = store.state.farm.building.gardenGnome.cacheAmount + store.state.farm.building.gardenGnome.cachePremium;
        let sprinklerRows = [];
        let lecternColumns = [];
        let pinwheels = [];
        let pinwheelCrops = [];
        let flags = [];
        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && cell.type === 'building') {
                    switch (cell.building) {
                        case 'sprinkler':
                            sprinklerRows.push({y, premium: cell.premium});
                            break;
                        case 'lectern':
                            lecternColumns.push({x, premium: cell.premium});
                            break;
                        case 'pinwheel':
                            pinwheels.push({x, y, premium: cell.premium});
                            break;
                        case 'flag':
                            flags.push({x, y, premium: cell.premium});
                            break;
                        default:
                            break;
                    }
                }
            });
        });
        if (pinwheels.length > 0) {
            store.state.farm.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && !pinwheelCrops.find(c => c.premium && c.crop === cell.crop)) {
                        // Prioritize premium pinwheels
                        let pinwheelFound = pinwheels.find(p => p.premium && Math.abs(x - p.x) <= 1 && Math.abs(y - p.y) <= 1);
                        if (!pinwheelFound) {
                            pinwheelFound = pinwheels.find(p => Math.abs(x - p.x) <= 1 && Math.abs(y - p.y) <= 1);
                        }
                        if (pinwheelFound) {
                            const pinwheelCropFound = pinwheelCrops.find(c => c.crop === cell.crop);

                            if (pinwheelFound.premium) {
                                if (pinwheelCropFound) {
                                    pinwheelCropFound.premium = true;
                                } else {
                                    pinwheelCrops.push({crop: cell.crop, premium: true});
                                }
                            } else if (!pinwheelCropFound) {
                                pinwheelCrops.push({crop: cell.crop, premium: false});
                            }
                        }
                    }
                });
            });
        }
        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && cell.type === 'crop') {
                    const growTime = (sprinklerRows.find(e => e.premium && e.y === y) ? 3 : (sprinklerRows.find(e => e.y === y) ? 2 : 1)) * minutes;
                    store.commit('farm/updateFieldKey', {x, y, key: 'grow', value: cell.grow + growTime});
                    if (decoration > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'gardenGnome', value: decoration * growTime});
                    }
                    if (lecternColumns.find(e => e.x === x)) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'lectern', value: (lecternColumns.find(e => e.premium && e.x === x) ? 2 : 1) * growTime});
                    }
                    if (pinwheelCrops.length > 0) {
                        store.commit('farm/addFieldBuildingEffect', {x, y, key: 'pinwheel', value: (pinwheelCrops.filter(e => e.premium).length + pinwheelCrops.length) * growTime});
                    }
                    if (flags.length) {
                        let flagMult = 0;
                        const cropType = store.state.farm.crop[cell.crop].type;
                        flags.forEach(flag => {
                            if (
                                (cropType === 'vegetable' && x < flag.x && y < flag.y) ||
                                (cropType === 'fruit' && x > flag.x && y < flag.y) ||
                                (cropType === 'grain' && x < flag.x && y > flag.y) ||
                                (cropType === 'flower' && x > flag.x && y > flag.y)
                            ) {
                                flagMult += flag.premium ? 2 : 1;
                            }
                        });
                        if (flagMult > 0) {
                            store.commit('farm/addFieldBuildingEffect', {x, y, key: 'flag', value: flagMult * growTime});
                        }
                    }
                }
            });
        });
        store.dispatch('farm/updateGrownHint');
    },
    unlock: ['farmFeature', 'farmCropExp', 'farmFertilizer', 'farmAdvancedCardPack', 'farmLuxuryCardPack'],
    stat: {
        harvests: {},
        maxOvergrow: {},
        bestPrestige: {}
    },
    mult: {
        farmExperience: {baseValue: 1},
        farmOvergrow: {display: 'percent'},
        farmRareDrop: {display: 'percent'},
        farmCropGain: {group: ['currencyFarmVegetableGain', 'currencyFarmFruitGain', 'currencyFarmGrainGain', 'currencyFarmFlowerGain']}
    },
    currency: {
        vegetable: {color: 'orange', icon: 'mdi-carrot', gainMult: {}},
        fruit: {color: 'red', icon: 'mdi-food-apple', gainMult: {}},
        grain: {color: 'yellow', icon: 'mdi-barley', gainMult: {}},
        flower: {color: 'pink', icon: 'mdi-flower', gainMult: {}},
        gold: {color: 'amber', icon: 'mdi-gold'},
        seedHull: {color: 'beige', icon: 'mdi-seed', overcapMult: 0, capMult: {baseValue: 50}},
        petal: {color: 'light-blue', icon: 'mdi-leaf', overcapMult: 0, currencyMult: {
            currencyFarmFlowerGain: {type: 'mult', value: val => val * 0.03 + 1}
        }, capMult: {baseValue: 50}},
        bug: {color: 'brown', icon: 'mdi-bug', overcapMult: 0, capMult: {baseValue: 50}},
        butterfly: {color: 'pink', icon: 'mdi-butterfly', overcapMult: 0, capMult: {baseValue: 30}},
        ladybug: {color: 'pale-red', icon: 'mdi-ladybug', overcapMult: 0, currencyMult: {
            farmRareDrop: {type: 'base', value: val => val * 0.0001}
        }, capMult: {baseValue: 150}},
        spider: {color: 'dark-grey', icon: 'mdi-spider', overcapMult: 0, currencyMult: {
            currencyFarmBugCap: {type: 'base', value: val => val * 20},
            currencyFarmButterflyCap: {type: 'base', value: val => val},
            currencyFarmLadybugCap: {type: 'base', value: val => val * 5}
        }, capMult: {baseValue: 20}},
        bee: {color: 'yellow', icon: 'mdi-bee', overcapMult: 0, currencyMult: {
            currencyFarmFruitGain: {type: 'mult', value: val => val * 0.001 + 1}
        }, capMult: {baseValue: 1000}},
        goldenPetal: {color: 'amber', icon: 'mdi-leaf', overcapMult: 0, currencyMult: {
            currencyFarmPetalCap: {type: 'base', value: val => val * 5}
        }, capMult: {baseValue: 10}}
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
        for (const [key, elem] of Object.entries(fertilizer)) {
            store.commit('farm/initFertilizer', {name: key, ...elem});
        }

        store.commit('farm/initField');
        store.dispatch('farm/seedAllUpgrades');
    },
    saveGame() {
        let obj = {
            field: [],
            crop: {}
        };

        store.state.farm.field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== null && (cell.type !== null || cell.color !== null)) {
                    obj.field.push({x, y, content: cell});
                }
            });
        });
        for (const [key, elem] of Object.entries(store.state.farm.crop)) {
            if (elem.found) {
                let rareDrops = [];
                elem.rareDrop.forEach((drop, index) => {
                    if (drop.found) {
                        rareDrops.push(index);
                    }
                });
                obj.crop[key] = {
                    exp: elem.exp,
                    level: elem.level,
                    levelMax: elem.levelMax,
                    upgrades: elem.upgrades,
                    nextUpgrades: elem.nextUpgrades
                };
                if (rareDrops.length > 0) {
                    obj.crop[key].rareDrop = rareDrops;
                }
            }
        }

        return obj;
    },
    loadGame(data) {
        if (data.field) {
            data.field.forEach(item => {
                store.commit('farm/updateField', {x: item.x, y: item.y, value: item.content});
            });
        }
        if (data.crop) {
            for (const [key, elem] of Object.entries(data.crop)) {
                store.commit('farm/updateCropKey', {name: key, key: 'exp', value: elem.exp});
                store.commit('farm/updateCropKey', {name: key, key: 'level', value: elem.level});
                store.commit('farm/updateCropKey', {name: key, key: 'levelMax', value: elem.levelMax});
                store.commit('farm/updateCropKey', {name: key, key: 'nextUpgrades', value: elem.nextUpgrades});
                for (const [subkey, subelem] of Object.entries(elem.upgrades)) {
                    if (subelem > 0) {
                        store.commit('farm/applyCropUpgrade', {crop: key, upgrade: subkey, amount: subelem, setFixed: true});
                    }
                }
                if (elem.rareDrop) {
                    elem.rareDrop.forEach(index => {
                        store.commit('farm/findCropRareDrop', {name: key, index});
                    });
                }
            }
        }
        store.commit('farm/calculateCropUpgradeCaches');
        store.commit('farm/calculateCropBuildingCaches');
        store.dispatch('farm/applyCropPrestige');
        store.dispatch('farm/updateGrownHint');
    }
}
