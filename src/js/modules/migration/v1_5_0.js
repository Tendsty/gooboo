import { filterUnique } from "../../utils/array";
import { applyTreasureFilter, lowerUpgradeLevel, refundCurrency, removeCurrency, removeUpgrade, replaceTreasureEffect } from "./helper";

export default function(save) {
    // Add anticheat variables
    save.cheaterSelfMark = 0;
    save.cheatDetected = {};

    // Lower upgrade levels to new cap
    save = lowerUpgradeLevel(save, 'mining_crystalRefinery', 50);
    save = lowerUpgradeLevel(save, 'mining_crystalSalt', 50);
    save = lowerUpgradeLevel(save, 'mining_crystalSmeltery', 100);
    save = lowerUpgradeLevel(save, 'mining_crystalEnhancer', 25);
    save = lowerUpgradeLevel(save, 'horde_beginnerLuck', 120);
    save = lowerUpgradeLevel(save, 'horde_boneTrader', 150);
    save = lowerUpgradeLevel(save, 'horde_soulCage', 80);
    save = lowerUpgradeLevel(save, 'horde_mausoleum', 80);
    save = lowerUpgradeLevel(save, 'farm_goldenTools', 5);

    // Rename best prestige stats
    if (save.stat.village_bestPrestige !== undefined) {
        save.stat.village_bestPrestige0 = save.stat.village_bestPrestige;
        delete save.stat.village_bestPrestige;
    }
    if (save.stat.horde_bestPrestige !== undefined) {
        save.stat.horde_bestPrestige0 = save.stat.horde_bestPrestige;
        delete save.stat.horde_bestPrestige;
    }

    // Respec tier 4 offerings
    if (save.village && save.village.offering && (save.village.offering.knowledge !== undefined || save.village.offering.science !== undefined || save.village.offering.joy !== undefined)) {
        let spent = 0;
        ['plantFiber', 'wood', 'stone'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem].upgradeBought;
            }
        });
        ['coin', 'metal', 'water'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem].upgradeBought * 3;
            }
        });
        ['glass', 'hardwood', 'gem'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem].upgradeBought * 8;
            }
        });
        save.currency.village_offering = save.stat.village_offering[1] - spent;
        if (save.village.offering.knowledge !== undefined) {
            save.village.offering.knowledge.upgradeBought = 0;
        }
        if (save.village.offering.science !== undefined) {
            save.village.offering.science.upgradeBought = 0;
        }
        if (save.village.offering.joy !== undefined) {
            save.village.offering.joy.upgradeBought = 0;
        }
    }

    if (save.horde) {
        // Convert enemy status
        if (save.horde.enemy !== undefined) {
            save.horde.enemy.defense = 0;
            save.horde.enemy.execute = 0;
        }

        // Convert item stat multipliers
        if (save.horde.itemStatMult !== undefined) {
            let newObj = {};
            for (const [key, elem] of Object.entries(save.horde.itemStatMult)) {
                newObj[key + '_mult'] = elem;
            }
            save.horde.itemStatMult = newObj;
        }

        if (save.horde.items?.starShield) {
            save.horde.items.starShield.level = 1;
        }

        // Unequip all equipment
        if (save.horde.items) {
            for (const [, elem] of Object.entries(save.horde.items)) {
                if (elem.equipped) {
                    elem.equipped = false;
                }
            }
        }
    }

    if (save.farm?.crop) {
        for (const [, elem] of Object.entries(save.farm.crop)) {
            if (elem.rareDrop) {
                let newDrop = {};
                elem.rareDrop.forEach(key => {
                    newDrop[key] = 0;
                });
                elem.rareDrop = newDrop;
            }
        }
    }

    // Rename fruit to berries
    if (save.currency.farm_fruit !== undefined) {
        save.currency.farm_berry = save.currency.farm_fruit;
    }
    if (save.stat.farm_fruit !== undefined) {
        save.stat.farm_berry = save.stat.farm_fruit;
    }
    save = removeCurrency(save, 'farm_fruit');
    save = replaceTreasureEffect(save, 'currencyFarmFruitGain', 'currencyFarmBerryGain');
    if (save.upgrade.farm_biggerFruits !== undefined) {
        save.upgrade.farm_biggerBerries = save.upgrade.farm_biggerFruits;
        save = removeUpgrade(save, 'farm_biggerFruits');
    }

    // Remove excess gold
    if (save.currency.farm_gold !== undefined && save.currency.farm_gold > 1000) {
        save.currency.farm_gold = 1000;
    }
    if (save.stat.farm_gold !== undefined && save.stat.farm_gold[0] > 20759) {
        save.stat.farm_gold = [20759, 20759];
    }

    // Remove excess mystery stones
    if (save.currency.farm_mysteryStone !== undefined) {
        const newAmount = Math.ceil(save.currency.farm_mysteryStone / 100);
        save.currency.farm_mysteryStone = newAmount;
        save.stat.farm_mysteryStone = [newAmount, newAmount];
    }

    // Give increased amount of event fertilizer
    if (save.consumable) {
        ['farm_sunshine', 'farm_superFlower', 'farm_smellyMud', 'farm_tropicalWater', 'farm_fieldBlessing', 'farm_cinnamonBag'].forEach(elem => {
            if (save.consumable[elem] !== undefined && save.consumable[elem] > 0) {
                save.consumable[elem] *= 4;
            }
        });
    }

    // Respec gallery prestige upgrades
    [
        'artAcademy', 'redCrayon', 'rainbowJar', 'trashContainer', 'orangeCrayon',
        'headstart', 'forklift', 'redCrate', 'yellowCrayon', 'inspiringBooks',
        'expressDelivery', 'orangeCrate', 'greenCrayon', 'sortingSystem',
        'redTruck', 'yellowCrate', 'blueCrayon', 'orangeTruck', 'greenCrate',
        'purpleCrayon'
    ].forEach(name => {
        save = removeUpgrade(save, 'gallery_' + name);
    });
    save = refundCurrency(save, 'gallery_cash');

    // Remove 1 tier from event treasure
    save = applyTreasureFilter(save, treasure => {
        if (treasure.type === 'empowered' && treasure.tier > 0) {
            treasure.tier--;
        }
        return treasure;
    });

    // Update horde soul stats to prevent false positives from the anticheat
    if (save.currency.horde_soulCorrupted !== undefined && save.stat.horde_soulCorrupted !== undefined && save.currency.horde_soulCorrupted > save.stat.horde_soulCorrupted[1]) {
        save.stat.horde_soulCorrupted[1] = save.currency.horde_soulCorrupted;
    }
    if (save.currency.horde_soulEmpowered !== undefined && save.stat.horde_soulEmpowered !== undefined && save.currency.horde_soulEmpowered > save.stat.horde_soulEmpowered[1]) {
        save.stat.horde_soulEmpowered[1] = save.currency.horde_soulEmpowered;
    }

    // Remove duplicate cards
    if (save.card) {
        for (const [key, elem] of Object.entries(save.card.feature)) {
            save.card.feature[key].cardSelected = filterUnique(elem.cardSelected);
            save.card.feature[key].cardEquipped = filterUnique(elem.cardEquipped);
        }
    }

    // Award event highscores
    if (save.stat.event_cindersToken !== undefined) {
        save.stat.event_cindersHighscore = [0, save.stat.event_cindersToken[1]];
    }
    if (save.stat.event_bloomToken !== undefined) {
        save.stat.event_bloomHighscore = [0, save.stat.event_bloomToken[1]];
    }
    if (save.stat.event_weatherChaosToken !== undefined) {
        save.stat.event_weatherChaosHighscore = [0, save.stat.event_weatherChaosToken[1]];
    }
    if (save.stat.event_summerFestivalToken !== undefined) {
        save.stat.event_summerFestivalHighscore = [0, Math.min(save.stat.event_summerFestivalToken[1], 492)];
    }
    if (save.stat.event_nightHuntToken !== undefined) {
        save.stat.event_nightHuntHighscore = [0, save.stat.event_nightHuntToken[1]];
    }
    if (save.stat.event_snowdownToken !== undefined) {
        save.stat.event_snowdownHighscore = [0, save.stat.event_snowdownToken[1]];
    }

    return save;
}
