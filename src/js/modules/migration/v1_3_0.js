import store from "../../../store";
import { removeCurrency, removeRelic, removeUpgrade, replaceTreasureEffect } from "./helper";

export default function(save) {
    if (save.horde) {
        // Convert boss status
        if (save.horde.bossFight !== undefined) {
            save.horde.bossFight = save.horde.bossFight ? 2 : 0;
        }

        // Convert enemy status
        if (save.horde.enemy !== undefined) {
            save.horde.enemy.silence = 0;
            save.horde.enemy.active = {};
        }

        // Convert player status
        if (save.horde.player !== undefined) {
            save.horde.player.silence = 0;
        }

        // Unequip all items
        if (save.horde.items) {
            for (const [, elem] of Object.entries(save.horde.items)) {
                elem.equipped = false;
            }
        }

        // Convert permanent equipment effects
        if (save.horde.itemAttackMult !== undefined || save.horde.itemHealthMult !== undefined) {
            save.horde.itemStatMult = {};
            if (save.horde.itemAttackMult !== undefined) {
                save.horde.itemStatMult.hordeAttack = save.horde.itemAttackMult;
            }
            if (save.horde.itemHealthMult !== undefined) {
                save.horde.itemStatMult.hordeHealth = save.horde.itemHealthMult;
            }
        }

        [
            // Regular upgrades
            'attack', 'health', 'training', 'resilience', 'boneBag', 'anger',
            'rest', 'monsterSoup', 'monsterBag', 'luckyStrike', 'hoarding',
            'thickSkin', 'stabbingGuide', 'plunderSecret', 'dodgingGuide',
            'survivalGuide', 'looting', 'whitePaint', 'targetDummy', 'grossBag',
            'milestone', 'carving',

            // Prestige upgrades
            'wrath', 'peace', 'milk', 'butcher', 'beginnerLuck', 'balance',
            'advancedLuck', 'offenseBook', 'defenseBook', 'ashCircle', 'lastWill',
            'candleCircle', 'containmentChamber', 'mausoleum', 'combatStudies',
        ].forEach(name => {
            save = removeUpgrade(save, 'horde_' + name);
        });

        save = removeCurrency(save, 'horde_bone');
        if (save.currency.horde_soulEmpowered !== undefined && save.stat.horde_soulEmpowered !== undefined) {
            save.currency.horde_soulEmpowered = save.stat.horde_soulEmpowered.total;
        }

        // Multiply all souls by 1000 to match the new increased gains
        if (save.currency.horde_soulCorrupted !== undefined) {
            save.currency.horde_soulCorrupted *= 1000;
        }
        if (save.currency.horde_soulEmpowered !== undefined) {
            save.currency.horde_soulEmpowered *= 1000;
        }

        // Adjust zone to be about the same power as the old one
        const oldZone = save.horde.zone ?? 1;
        const newZone = oldZone > 40 ? Math.round((oldZone - 40) * 2 / 3 + 40) : oldZone;

        // Get 1000 times the current zone loot as bones
        const newBones = store.getters['horde/enemyBone'](newZone, 0) * 1000;
        save.currency.horde_bone = newBones;
        save.stat.horde_bone = {value: newBones, total: newBones};

        // Adjust heirloom amounts
        if (save.horde.heirloom) {
            for (const [key, elem] of Object.entries(save.horde.heirloom)) {
                save.horde.heirloom[key] = Math.ceil((elem > 100 ? ((elem - 100) * 2 / 3 + 100) : elem) / 2);
            }
        }

        // Then reset zone
        save.horde.zone = 1;
        if (save.stat.horde_maxZone) {
            save.stat.horde_maxZone.value = newZone;
            save.stat.horde_maxZone.total = newZone;
        }
    }

    // Remove all horde relics (they are automatically re-awarded based on achievement levels)
    [
        'forgottenShield', 'burningSkull', 'energyDrink', 'luckyDice',
        'dumbbell', 'bandage', 'newBackpack', 'crackedSafe', 'ultimateGuide',
    ].forEach(name => {
        save = removeRelic(save, name);
    });

    // Renamed the treasure effect
    save = replaceTreasureEffect(save, 'hordeSoulGain', 'currencyHordeSoulCorruptedGain');

    return save;
}
