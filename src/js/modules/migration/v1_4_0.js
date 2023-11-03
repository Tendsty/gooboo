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

    return save;
}
