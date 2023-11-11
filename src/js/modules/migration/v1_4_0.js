import { deltaLinear } from "../../utils/math";

export default function(save) {
    if (save.farm?.field) {
        let newField = {};
        save.farm.field.forEach(cell => {
            let content = {...cell.content};
            if (content.type === 'crop') {
                content.grow = 0;
                content.time = 0;
                content.buildingEffect = {};
            }
            newField[cell.y * 7 + cell.x] = content;
        });
        save.farm.field = newField;
    }

    if (save.farm?.crop) {
        for (const [, elem] of Object.entries(save.farm.crop)) {
            elem.dna = deltaLinear(14, 4, elem.level);
            elem.genes = [];
            elem.genesBlocked = [];
            elem.cardSelected = [];
            elem.cardEquipped = [];
            elem.upgrades = {};
        }
    }

    // Update dweller cap stats
    if (save.stat.mining_depthDweller0) {
        save.stat.mining_depthDwellerCap0 = save.stat.mining_depthDweller0;
    }
    if (save.stat.mining_depthDweller1) {
        save.stat.mining_depthDwellerCap1 = save.stat.mining_depthDweller1;
    }
    if (save.achievement?.mining_depthDweller0) {
        save.achievement.mining_depthDwellerCap0 = save.achievement.mining_depthDweller0;
    }
    if (save.achievement?.mining_depthDweller1) {
        save.achievement.mining_depthDwellerCap1 = save.achievement.mining_depthDweller1;
    }

    return save;
}
