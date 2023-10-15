import store from "../../../store";
import { refundCurrency, removeCurrency, removeUpgrade } from "./helper";

export default function(save) {
    // Convert boss status
    if (save.horde && save.horde.bossFight !== undefined) {
        save.horde.bossFight = save.horde.bossFight ? 2 : 0;
    }

    // Unequip all items
    if (save.horde && save.horde.items) {
        for (const [, elem] of Object.entries(save.horde.items)) {
            elem.equipped = false;
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
    save = refundCurrency(save, 'horde_soulEmpowered');

    // Multiply all souls by 1000 to match the new increased gains
    if (save.currency.horde_soulCorrupted !== undefined) {
        save.currency.horde_soulCorrupted *= 1000;
    }
    if (save.currency.horde_soulEmpowered !== undefined) {
        save.currency.horde_soulEmpowered *= 1000;
    }

    if (save.horde) {
        // Get 1000 times the current zone loot as bones
        const newBones = store.getters['horde/enemyBone'](save.horde.zone ?? 1, 0) * 1000;
        save.currency.horde_bone = newBones;
        save.stat.horde_bone = {value: newBones, total: newBones};

        // Then reset zone
        save.horde.zone = 1;
    }

    return save;
}
