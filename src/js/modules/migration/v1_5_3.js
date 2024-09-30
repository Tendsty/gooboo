import { deltaLinear } from "../../utils/math";
import { replaceTreasureEffect } from "./helper";

export default function(save) {
    // Repeat offering respec for bugged savefiles
    if (save.village && save.village.offering) {
        let spent = 0;
        let spentWithoutT4 = 0;
        ['plantFiber', 'wood', 'stone'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem][1];
                spentWithoutT4 += save.village.offering[elem][1];
            }
        });
        ['coin', 'metal', 'water'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem][1] * 3;
                spentWithoutT4 += save.village.offering[elem][1] * 3;
            }
        });
        ['glass', 'hardwood', 'gem'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += save.village.offering[elem][1] * 8;
                spentWithoutT4 += save.village.offering[elem][1] * 8;
            }
        });
        ['knowledge', 'science', 'joy'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                spent += deltaLinear(20, 1, save.village.offering[elem][1]);
            }
        });
        let missing = save.stat.village_offering[1] - spent;
        if (missing < 0) {
            // Reset T4 offerings only if you do not have enough offerings to pay for them
            if (save.village.offering.knowledge !== undefined) {
                save.village.offering.knowledge[1] = 0;
            }
            if (save.village.offering.science !== undefined) {
                save.village.offering.science[1] = 0;
            }
            if (save.village.offering.joy !== undefined) {
                save.village.offering.joy[1] = 0;
            }
            missing = save.stat.village_offering[1] - spentWithoutT4;
        }
        save.currency.village_offering = missing;
    }

    // Fix event shops selling old treasure effect
    if (save.event && save.event.shop_merchant) {
        for (const [key, elem] of Object.entries(save.event.shop_merchant)) {
            if (elem.data && elem.data.effect) {
                const index = elem.data.effect.indexOf("currencyFarmFruitGain");
                if (index !== -1) {
                    save.event.shop_merchant[key].data.effect[index] = "currencyFarmBerryGain";
                }
            }
        }
    }
    if (save.event && save.event.shop_big) {
        for (const [key, elem] of Object.entries(save.event.shop_big)) {
            if (elem.data && elem.data.effect) {
                const index = elem.data.effect.indexOf("currencyFarmFruitGain");
                if (index !== -1) {
                    save.event.shop_big[key].data.effect[index] = "currencyFarmBerryGain";
                }
            }
        }
    }
    save = replaceTreasureEffect(save, 'currencyFarmFruitGain', 'currencyFarmBerryGain');

    return save;
}
