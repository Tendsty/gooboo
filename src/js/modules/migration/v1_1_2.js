import { raiseUpgradeLevel } from "./helper";

export default function(save) {
    save = raiseUpgradeLevel(save, 'mining_moreDamage', 2);
    save = raiseUpgradeLevel(save, 'mining_moreScrap', 2);
    save = raiseUpgradeLevel(save, 'village_overtime', 1);
    save = raiseUpgradeLevel(save, 'village_goldenThrone', 1);
    save = raiseUpgradeLevel(save, 'school_student', 4);

    return save;
}
