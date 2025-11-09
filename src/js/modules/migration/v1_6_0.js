import { getApproaching, getSequence } from "../../utils/math";
import { addCurrencyToSave, applyTreasureFilter, lowerUpgradeLevel, removeCurrency, removeUpgrade, replaceTreasureEffect } from "./helper";

function isOutdatedPrize(name) {
    return name.slice(0, 8) === 'treasure' || name.slice(0, 3) === 'gem' || name.slice(-8) === 'prestige' || ['mining_scrap', 'mining_ember', 'village_offering', 'horde_bone', 'gallery_beauty'].includes(name);
}

export default function(save) {
    // Fix players being stuck in the wrong subfeature
    if (!save.unlock?.miningGasSubfeature) {
        if (save.subfeature?.mining) {
            delete save.subfeature.mining;
        }
        if (save.nextSubfeature?.mining) {
            delete save.nextSubfeature.mining;
        }
    }
    if (!save.unlock?.villageCraftingSubfeature) {
        if (save.subfeature?.village) {
            delete save.subfeature.village;
        }
        if (save.nextSubfeature?.village) {
            delete save.nextSubfeature.village;
        }
    }
    if (!save.unlock?.hordeClassesSubfeature) {
        if (save.subfeature?.horde) {
            delete save.subfeature.horde;
        }
        if (save.nextSubfeature?.horde) {
            delete save.nextSubfeature.horde;
        }
    }

    // Convert gem progress
    if (save.gem) {
        save.gem = {
            progressPrimary: save.gem.progress,
            progressSecondary: save.gem.progress,
        };
    }

    // Reset mining bars + enhancements
    save = removeCurrency(save, 'mining_barAluminium');
    save = removeCurrency(save, 'mining_barBronze');
    save = removeCurrency(save, 'mining_barSteel');
    save = removeCurrency(save, 'mining_barTitanium');
    save = removeCurrency(save, 'mining_barShiny');
    save = removeCurrency(save, 'mining_barIridium');
    save = removeCurrency(save, 'mining_barDarkIron');
    if (save.mining?.smeltery) {
        delete save.mining.smeltery;
    }
    if (save.mining?.enhancement) {
        delete save.mining.enhancement;
    }

    // Update dweller limit
    const miningSubfeature = save.subfeature?.mining ?? 0;
    let dwellerMax = 0.1;
    if (save.upgrade?.mining_crystalDrill) {
        dwellerMax += Math.min(getApproaching(0.01, 0.9, save.upgrade?.mining_crystalDrill[1]), 0.4);
    }
    if (miningSubfeature === 1) {
        dwellerMax /= 1.25;
    }
    if (save.stat?.[`mining_maxDepth${ miningSubfeature }`] && save.stat?.[`mining_depthDwellerCap${ miningSubfeature }`]) {
        dwellerMax *= save.stat[`mining_maxDepth${ miningSubfeature }`][0];
        if (dwellerMax < save.stat[`mining_depthDweller${ miningSubfeature }`][0]) {
            save.stat[`mining_depthDweller${ miningSubfeature }`][0] = dwellerMax;
        }
    }

    // Reset mining depth dweller stat + prestige currency
    if (save.upgrade?.mining_crystalDrill) {
        if (save.stat?.mining_maxDepth0 && save.stat?.mining_depthDwellerCap0) {
            if (save.upgrade?.mining_crystalDrill[1] > 40 && (save.stat.mining_maxDepth0[1] * 0.5) < save.stat.mining_depthDwellerCap0[1]) {
                const prestigeRatio = (Math.pow(1.15, Math.floor(save.stat.mining_depthDwellerCap0[1] * 2) / 2) * Math.floor(save.stat.mining_depthDwellerCap0[1] * 2) * 7) / (Math.pow(1.15, save.stat.mining_maxDepth0[1] / 2) * save.stat.mining_maxDepth0[1] * 7);
                save.stat.mining_depthDwellerCap0[1] = save.stat.mining_maxDepth0[1] * 0.5;
                if (prestigeRatio > 1) {
                    if (save.stat.mining_bestPrestige0) {
                        save.stat.mining_bestPrestige0[1] /= prestigeRatio;
                    }
                    if (save.stat.mining_crystalGreen) {
                        save.stat.mining_crystalGreen[0] /= prestigeRatio;
                        save.stat.mining_crystalGreen[1] /= prestigeRatio;
                    }
                    if (save.stat.mining_crystalGreenMax) {
                        save.stat.mining_crystalGreenMax[0] /= prestigeRatio;
                        save.stat.mining_crystalGreenMax[1] /= prestigeRatio;
                    }
                    if (save.currency?.mining_crystalGreen) {
                        save.currency.mining_crystalGreen /= prestigeRatio;
                    }
                }
            }
            const newDepthCap = save.stat.mining_maxDepth0[0] * Math.min(getApproaching(0.01, 0.9, save.upgrade?.mining_crystalDrill[1]), 0.4);
            if (newDepthCap < save.stat.mining_depthDwellerCap0[0]) {
                save.stat.mining_depthDwellerCap0[0] = newDepthCap;
            }
        }
        if (save.stat?.mining_maxDepth1 && save.stat?.mining_depthDwellerCap1) {
            if (save.upgrade?.mining_crystalDrill[1] > 40 && save.stat.mining_maxDepth1[1] * 0.5 < save.stat.mining_depthDwellerCap1[1]) {
                const prestigeRatio = (Math.pow(1.15, Math.floor(save.stat.mining_depthDwellerCap1[1] * 2) / 2) * Math.floor(save.stat.mining_depthDwellerCap1[1] * 2) * 7) / (Math.pow(1.15, save.stat.mining_maxDepth1[1] / 2) * save.stat.mining_maxDepth1[1] * 7);
                save.stat.mining_depthDwellerCap1[1] = save.stat.mining_maxDepth1[1] * 0.5;
                if (prestigeRatio > 1) {
                    if (save.stat.mining_bestPrestige1) {
                        save.stat.mining_bestPrestige1[1] /= prestigeRatio;
                    }
                    if (save.stat.mining_crystalYellow) {
                        save.stat.mining_crystalYellow[0] /= prestigeRatio;
                        save.stat.mining_crystalYellow[1] /= prestigeRatio;
                    }
                    if (save.stat.mining_crystalYellowMax) {
                        save.stat.mining_crystalYellowMax[0] /= prestigeRatio;
                        save.stat.mining_crystalYellowMax[1] /= prestigeRatio;
                    }
                    if (save.currency?.mining_crystalYellow) {
                        save.currency.mining_crystalYellow /= prestigeRatio;
                    }
                }
            }
            const newDepthCap = save.stat.mining_maxDepth1[0] * Math.min(getApproaching(0.01, 0.9, save.upgrade?.mining_crystalDrill[1]), 0.4);
            if (newDepthCap < save.stat.mining_depthDwellerCap1[0]) {
                save.stat.mining_depthDwellerCap1[0] = newDepthCap;
            }
        }
    }

    // Reset later gasses
    save = removeCurrency(save, 'mining_krypton');
    save = removeCurrency(save, 'mining_xenon');
    save = removeCurrency(save, 'mining_radon');

    // Reset village offerings
    if (save.village?.offering) {
        let refundOfferings = 0;
        for (const [key, elem] of Object.entries(save.village.offering)) {
            let spent = 0;
            let priceFactor = 1;
            if (['plantFiber', 'wood', 'stone'].includes(key)) {
                spent = elem[1];
                priceFactor = 1;
            } else if (['coin', 'metal', 'water'].includes(key)) {
                spent = elem[1] * 3;
                priceFactor = 9;
            } else if (['glass', 'hardwood', 'gem'].includes(key)) {
                spent = elem[1] * 8;
                priceFactor = 64;
            } else if (['knowledge', 'science', 'joy'].includes(key)) {
                spent = getSequence(20, elem[1]);
                priceFactor = 400;
            }

            let newUpgrades = 0;
            while (spent > 0) {
                const price = Math.round(priceFactor * Math.pow(1.15, newUpgrades));
                if (spent >= price) {
                    newUpgrades++;
                } else {
                    refundOfferings += spent;
                }
                spent -= price;
            }

            save.village.offering[key][1] = newUpgrades;
        }
        if (refundOfferings > 0) {
            save = addCurrencyToSave(save, 'village_offering', refundOfferings);
        }
    }

    // Reset horde permanent stacks
    if (save.subfeature?.horde !== 1 && save.horde?.itemStatMult) {
        save.horde.itemStatMult = {};
    }

    // New heirloom format
    if (save.horde?.heirloom) {
        for (const [key, elem] of Object.entries(save.horde.heirloom)) {
            save.horde.heirloom[key] = [elem];
        }
    }

    // Multiply mastery points by 10 so progress stays the same
    if (save.horde?.items) {
        for (const [key, elem] of Object.entries(save.horde.items)) {
            save.horde.items[key].level = 1;
            if (elem.masteryPoint) {
                save.horde.items[key].masteryPoint = elem.masteryPoint * 10;
            }
        }
    }

    // Reset horde prestige currency
    if (save.currency?.horde_soulCorrupted) {
        save.currency.horde_soulCorrupted = Math.pow(save.currency.horde_soulCorrupted, 0.75);
    }
    if (save.currency?.horde_soulEmpowered) {
        save.currency.horde_soulEmpowered = Math.pow(save.currency.horde_soulEmpowered, 0.75);
    }
    if (save.stat?.horde_soulCorrupted) {
        save.stat.horde_soulCorrupted[0] = Math.pow(save.stat.horde_soulCorrupted[0], 0.75);
        save.stat.horde_soulCorrupted[1] = Math.pow(save.stat.horde_soulCorrupted[1], 0.75);
    }
    if (save.stat?.horde_soulCorruptedMax) {
        save.stat.horde_soulCorruptedMax[0] = Math.pow(save.stat.horde_soulCorruptedMax[0], 0.75);
        save.stat.horde_soulCorruptedMax[1] = Math.pow(save.stat.horde_soulCorruptedMax[1], 0.75);
    }
    if (save.stat?.horde_soulEmpowered) {
        save.stat.horde_soulEmpowered[0] = Math.pow(save.stat.horde_soulEmpowered[0], 0.75);
        save.stat.horde_soulEmpowered[1] = Math.pow(save.stat.horde_soulEmpowered[1], 0.75);
    }
    if (save.stat?.horde_soulEmpoweredMax) {
        save.stat.horde_soulEmpoweredMax[0] = Math.pow(save.stat.horde_soulEmpoweredMax[0], 0.75);
        save.stat.horde_soulEmpoweredMax[1] = Math.pow(save.stat.horde_soulEmpoweredMax[1], 0.75);
    }
    if (save.stat?.horde_bestPrestige0) {
        save.stat.horde_bestPrestige0[1] = Math.pow(save.stat.horde_bestPrestige0[1], 0.75);
    }

    // Add care to farm cells and remove outdated fertilizer
    if (save.farm?.field) {
        for (const [, elem] of Object.entries(save.farm.field)) {
            if (elem.type === 'crop') {
                elem.giant = false;
                elem.care = {active: false, exp: 0, gold: 0};
                if (save.farm?.crop[elem.crop]?.genes?.includes('rareDrop')) {
                    elem.care.rareDrop = 0;
                } else {
                    elem.care.yield = 0;
                }
                if (['basic', 'flower', 'sunshine', 'superFlower', 'smellyMud', 'tropicalWater', 'fieldBlessing', 'cinnamonBag'].includes(elem.fertilizer)) {
                    elem.fertilizer = null;
                }
                if (elem.crop === 'goldenRose') {
                    elem.crop = 'rose';
                }
            }
        }
    }

    // Reset all gene upgrades and replace giant gene with mutate
    if (save.farm?.crop) {
        let highestLevelCrop = 0;
        for (const [key, elem] of Object.entries(save.farm.crop)) {
            if (key !== 'goldenRose') {
                elem.genes = elem.genes.map(el => el === 'giant' ? 'mutate' : el);
                elem.genesBlocked = elem.genesBlocked.map(el => el === 'giant' ? 'mutate' : el);
                elem.upgrades = {};
                if (elem.level > highestLevelCrop) {
                    highestLevelCrop = elem.level;
                }
                if (elem.levelMax > highestLevelCrop) {
                    highestLevelCrop = elem.levelMax;
                }
            }
        }
        [1, 5, 10, 15, 20, 25].forEach(el => {
            save.unlock[`farmGeneLevel${ el }`] = true;
        });
    }

    // Convert golden petals to golden rose levels
    if (save.farm?.crop.goldenRose) {
        save.farm.crop.goldenRose = {exp: 0, level: save.stat.farm_goldenPetalMax ? save.stat.farm_goldenPetalMax[0] : 0};
    }
    save = removeCurrency(save, 'farm_goldenPetal');

    // Convert overgrow stat
    if (save.stat?.farm_maxOvergrow) {
        save.stat.farm_maxOvergrow[0] = save.stat.farm_maxOvergrow[0] / 2;
        save.stat.farm_maxOvergrow[1] = save.stat.farm_maxOvergrow[1] / 2;
    }

    // Reset all upgrades with lower cap
    save = lowerUpgradeLevel(save, 'mining_aluminiumHardening', 6);
    save = lowerUpgradeLevel(save, 'mining_aluminiumTanks', 8);
    save = lowerUpgradeLevel(save, 'mining_refinery', 5);
    save = lowerUpgradeLevel(save, 'mining_drillFuel', 30);
    save = lowerUpgradeLevel(save, 'mining_furnace', 25);
    save = lowerUpgradeLevel(save, 'mining_ironExpansion', 3);
    save = lowerUpgradeLevel(save, 'mining_magnet', 10);
    save = lowerUpgradeLevel(save, 'mining_metalDetector', 14);
    save = lowerUpgradeLevel(save, 'mining_titaniumForge', 8);
    save = lowerUpgradeLevel(save, 'mining_platinumExpansion', 4);
    save = lowerUpgradeLevel(save, 'mining_undergroundRadar', 5);
    save = lowerUpgradeLevel(save, 'mining_iridiumExpansion', 10);
    save = lowerUpgradeLevel(save, 'mining_iridiumTreetap', 4);
    save = lowerUpgradeLevel(save, 'mining_darkBombs', 5);

    save = lowerUpgradeLevel(save, 'mining_morePressure', 25);
    save = lowerUpgradeLevel(save, 'mining_piston', 10);
    save = lowerUpgradeLevel(save, 'mining_harvester', 10);
    save = lowerUpgradeLevel(save, 'mining_enrichedCrystal', 10);
    save = lowerUpgradeLevel(save, 'mining_smoker', 10);

    save = lowerUpgradeLevel(save, 'mining_crystalDrill', 53);
    save = lowerUpgradeLevel(save, 'mining_crystalDetector', 50);
    save = lowerUpgradeLevel(save, 'mining_crystalExplosives', 200);
    save = lowerUpgradeLevel(save, 'mining_crystalEnhancer', 7);
    save = lowerUpgradeLevel(save, 'mining_crystalTreetap', 40);
    save = lowerUpgradeLevel(save, 'mining_crystalBottle', 25);
    save = lowerUpgradeLevel(save, 'mining_crystalEngine', 50);
    save = lowerUpgradeLevel(save, 'mining_crystalCoal', 20);
    save = lowerUpgradeLevel(save, 'mining_crystalTruck', 10);
    save = lowerUpgradeLevel(save, 'mining_crystalNiter', 20);

    save = lowerUpgradeLevel(save, 'mining_crystalSmoke', 20);
    save = lowerUpgradeLevel(save, 'mining_crystalFusion', 25);
    save = lowerUpgradeLevel(save, 'mining_crystalTunnel', 25);
    save = lowerUpgradeLevel(save, 'mining_crystalDust', 10);

    save = lowerUpgradeLevel(save, 'village_treasury', 10);
    save = removeUpgrade(save, 'village_storage');
    save = lowerUpgradeLevel(save, 'village_shed', 5);
    save = lowerUpgradeLevel(save, 'village_school', 5);
    save = removeUpgrade(save, 'village_bigStorage');
    save = lowerUpgradeLevel(save, 'village_wallet', 12);
    save = lowerUpgradeLevel(save, 'village_resourceBag', 10);
    save = lowerUpgradeLevel(save, 'village_metalBag', 5);

    save = lowerUpgradeLevel(save, 'horde_training', 100);
    save = lowerUpgradeLevel(save, 'horde_luckyStrike', 15);
    save = lowerUpgradeLevel(save, 'horde_survivalGuide', 25);
    save = lowerUpgradeLevel(save, 'horde_looting', 25);
    save = lowerUpgradeLevel(save, 'horde_whitePaint', 25);
    save = lowerUpgradeLevel(save, 'horde_targetDummy', 100);
    save = lowerUpgradeLevel(save, 'horde_carving', 5);
    save = lowerUpgradeLevel(save, 'horde_strangePower', 25);
    save = lowerUpgradeLevel(save, 'horde_collector', 25);

    save = lowerUpgradeLevel(save, 'horde_advancedLuck', 40);
    save = lowerUpgradeLevel(save, 'horde_mysticalCondenser', 25);

    save = lowerUpgradeLevel(save, 'horde_stoneSkin', 30);
    save = lowerUpgradeLevel(save, 'horde_discovery', 40);
    save = lowerUpgradeLevel(save, 'horde_innerFocus', 30);

    save = lowerUpgradeLevel(save, 'farm_overgrowth', 7);
    save = lowerUpgradeLevel(save, 'farm_groundSeeds', 50);
    save = lowerUpgradeLevel(save, 'farm_hayBales', 50);
    save = lowerUpgradeLevel(save, 'farm_smallCrate', 7);
    save = lowerUpgradeLevel(save, 'farm_scarecrow', 10);
    save = lowerUpgradeLevel(save, 'farm_anthill', 20);
    save = lowerUpgradeLevel(save, 'farm_bugPowder', 40);
    save = lowerUpgradeLevel(save, 'farm_shed', 10);
    save = lowerUpgradeLevel(save, 'farm_perfume', 20);
    save = lowerUpgradeLevel(save, 'farm_mediumCrate', 8);
    save = lowerUpgradeLevel(save, 'farm_stompedSeeds', 25);
    save = lowerUpgradeLevel(save, 'farm_insectParadise', 6);
    save = lowerUpgradeLevel(save, 'farm_goldenTools', 20);
    save = lowerUpgradeLevel(save, 'farm_fertileGround', 40);
    save = lowerUpgradeLevel(save, 'farm_mysticGround', 40);
    save = lowerUpgradeLevel(save, 'farm_bigCrate', 10);
    save = lowerUpgradeLevel(save, 'farm_wormBait', 10);
    save = lowerUpgradeLevel(save, 'farm_shinySoil', 20);
    save = lowerUpgradeLevel(save, 'farm_openSesame', 20);
    save = lowerUpgradeLevel(save, 'farm_flowerPainting', 20);

    save = lowerUpgradeLevel(save, 'gallery_redPower', 15);
    save = lowerUpgradeLevel(save, 'gallery_orangePower', 15);
    save = lowerUpgradeLevel(save, 'gallery_yellowPower', 15);
    save = lowerUpgradeLevel(save, 'gallery_greenPower', 15);
    save = lowerUpgradeLevel(save, 'gallery_bluePower', 15);
    save = lowerUpgradeLevel(save, 'gallery_purplePower', 15);

    if (save.upgradeQueue?.village_regular) {
        save.upgradeQueue.village_regular = save.upgradeQueue.village_regular.filter(elem => !['village_storage', 'village_bigStorage'].includes(elem));
    }

    // New school format and reset progress for updated school subjects
    if (save.school) {
        let newObj = {};
        for (const [key, elem] of Object.entries(save.school)) {
            let newElem = [...elem];
            if (elem[0] > 6) {
                const newGrade = Math.min(Math.floor(elem[0] / 2 + 3), 9);
                newElem = [newGrade, Math.min(elem[1], newGrade), 0];
            }
            newObj[key] = [...newElem, 0];
        }
        save.school = {subject: newObj};
    }

    // New relic format
    if (save.relic) {
        save.relic = {owned: save.relic};
    }

    // Immediately unlock the library for players past the early-game
    let totalGL = 0;
    for (const [, elem] of Object.entries(save.globalLevel)) {
        totalGL += elem;
    }
    if (totalGL >= 250) {
        save.unlock.schoolLibrarySubfeature = true;
    }

    // Add relic museum pre-progress for high GL players
    if (totalGL >= 1000) {
        save.unlock.relicMuseum = true;

        const preLevels = Math.min(Math.floor(totalGL / 250 - 3), 3);
        save.relic.glyph = {};
        ['dust', 'clay', 'heat', 'wood', 'flow', 'stone', 'spike', 'dream', 'clover', 'rain', 'sun', 'cloud', 'blossom', 'leaf', 'paper'].forEach(glyph => {
            save.relic.glyph[glyph] = preLevels;
        });
    }

    // Reset treasure slot premium upgrade + refund rubies
    if (save.upgrade?.treasure_moreSlots && save.upgrade.treasure_moreSlots[1] > 0) {
        const oldSlots = save.upgrade.treasure_moreSlots[1];
        let oldCost = getSequence(5, oldSlots) * 10;
        let newSlots = 0;
        let rubyRefund = 0;
        while (oldCost > 0) {
            const newCost = Math.max(newSlots * 10, Math.round(Math.pow(1.1, newSlots) * 6 * newSlots)) + 50;
            if (newCost <= oldCost) {
                newSlots++;
            } else {
                rubyRefund = oldCost;
            }
            oldCost -= newCost;
        }
        if (newSlots < oldSlots) {
            save.upgrade.treasure_moreSlots[1] = newSlots;
            save.upgrade.treasure_moreSlots[2] = newSlots;
            if (rubyRefund > 0) {
                save = addCurrencyToSave(save, 'gem_ruby', rubyRefund);
            }
        }
    }

    // Convert treasure effects
    save = replaceTreasureEffect(save, 'miningSmelterySpeed', 'miningSmelteryTime');
    save = replaceTreasureEffect(save, 'villageMentalGain');
    save = replaceTreasureEffect(save, 'hordeItemMasteryGain', 'hordeEquipmentMasteryGain');
    save = applyTreasureFilter(save, treasure => {
        delete treasure.icon;
        treasure.modifier = [];
        treasure.days = 0;
        if (treasure.type === 'empowered') {
            treasure.type = 'regular';
            treasure.modifier.push('eventStar');
        }
        return treasure;
    });

    // Convert event fertilizer to event seeds
    let seenEvents = 0;
    ['cindersEvent', 'bloomEvent', 'weatherChaosEvent', 'summerFestivalEvent', 'nightHuntEvent', 'snowdownEvent'].forEach(elem => {
        if (save.unlock && save.unlock[elem]) {
            seenEvents++;
        }
    });
    let eventFertilizer = 0;
    ['farm_sunshine', 'farm_superFlower', 'farm_smellyMud', 'farm_tropicalWater', 'farm_fieldBlessing', 'farm_cinnamonBag'].forEach(elem => {
        if (save.consumable && save.consumable[elem]) {
            eventFertilizer += save.consumable[elem];
        }
    });
    if (seenEvents > 0 && eventFertilizer > 0) {
        const mixedSeeds = Math.min(seenEvents * 250, Math.floor(eventFertilizer / 2));
        const cactusSeeds = Math.min(seenEvents * 120, Math.floor(eventFertilizer * 3 / 40));
        if (mixedSeeds > 0) {
            save = addCurrencyToSave(save, 'farm_mixedSeeds', mixedSeeds);
        }
        if (cactusSeeds > 0) {
            save = addCurrencyToSave(save, 'farm_cactusSeed', cactusSeeds);
        }
    }

    // Convert event rewards
    if (save.event?.shop_merchant) {
        save.event.shop_merchant = save.event.shop_merchant.filter(elem => {
            return elem.prize.slice(0, 8) !== 'treasure';
        });
    }
    if (save.event?.shop_big) {
        save.event.shop_big = save.event.shop_big.filter(elem => {
            return !['farm_sunshine', 'farm_superFlower', 'farm_smellyMud', 'farm_tropicalWater', 'farm_fieldBlessing', 'farm_cinnamonBag'].includes(elem.prize) && elem.prize.slice(0, 8) !== 'treasure';
        });
    }
    if (save.event?.casino_wheel_segments) {
        save.event.casino_wheel_segments.forEach(elem => {
            if (isOutdatedPrize(elem.prize.prize)) {
                elem.prize = {prize: elem.rarity > 1 ? 'cardPack_feelingLucky' : 'school_goldenDust', taken: 0, data: null};
            }
        });
    }
    if (save.event?.casino_bingo_card) {
        save.event.casino_bingo_card.forEach(row => {
            row.forEach(cell => {
                if (cell.prize !== null && isOutdatedPrize(cell.prize.prize)) {
                    cell.prize = {prize: 'school_goldenDust', taken: 0, data: null};
                }
            });
        });
    }
    if (save.event?.casino_bingo_prize_1 && isOutdatedPrize(save.event.casino_bingo_prize_1.prize)) {
        save.event.casino_bingo_prize_1 = {prize: 'cardPack_connectedLine', taken: 0, data: null};
    }
    if (save.event?.casino_bingo_prize_2 && isOutdatedPrize(save.event.casino_bingo_prize_2.prize)) {
        save.event.casino_bingo_prize_2 = {prize: 'cardPack_connectedLine', taken: 0, data: null};
    }
    if (save.event?.casino_bingo_prize_3 && isOutdatedPrize(save.event.casino_bingo_prize_3.prize)) {
        save.event.casino_bingo_prize_3 = {prize: 'cardPack_connectedLine', taken: 0, data: null};
    }
    if (save.event?.snowdown_rewardItem) {
        save.event.snowdown_rewardItem = save.event.snowdown_rewardItem.map(el => el === 'specialSnowflake' ? 'sharpSnowflake' : el);
    }
    if (save.event?.snowdown_item?.specialSnowflake) {
        save.event.snowdown_item.sharpSnowflake = save.event.snowdown_item.specialSnowflake;
        delete save.event.snowdown_item.specialSnowflake;
    }

    // Give event stars based on unique events seen
    if (seenEvents > 0 && save.unlock?.treasureFeature) {
        save.consumable.treasure_eventStar = seenEvents;
    }

    // Convert cryo lab levels (up to 1 year of progress with new formula)
    if (save.cryolab) {
        for (const [key, elem] of Object.entries(save.cryolab)) {
            elem.level.forEach((lvl, index) => {
                const GL = save.globalLevel[key + '_' + index];
                let exp = Math.round(Math.pow(1.015, GL) * GL * 2) * 365;

                let newLvl = 0;
                let newExp = 0;
                while (exp > 0) {
                    const expNeeded = Math.pow(newLvl + 2, 2) * Math.pow(2, newLvl) * 25;
                    if (exp >= expNeeded) {
                        newLvl++;
                    } else {
                        newExp = exp;
                    }
                    exp -= expNeeded;
                }

                if (newLvl === elem.level[index] && newExp < elem.exp[index]) {
                    elem.exp[index] = newExp;
                }
                if (newLvl < elem.level[index]) {
                    elem.exp[index] = newExp;
                    elem.level[index] = newLvl;
                }
            });
        }
    }

    return save;
}
