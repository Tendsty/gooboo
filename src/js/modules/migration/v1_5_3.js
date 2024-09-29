export default function(save) {
  
    // Fix offerings
    if (save.village && save.village.offering && save.currency.village_offering === undefined) {
        let currentAmount = save.stat.village_offering[1];
        ['plantFiber', 'wood', 'stone'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                currentAmount -= save.village.offering[elem][1];
            }
        });
        ['coin', 'metal', 'water'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                currentAmount -= save.village.offering[elem][1] * 3;
            }
        });
        ['glass', 'hardwood', 'gem'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                currentAmount -= save.village.offering[elem][1] * 8;
            }
        });

        let minCurrentAmount = 0;
        ['knowledge', 'science', 'joy'].forEach(elem => {
            if (save.village.offering[elem] !== undefined) {
                minCurrentAmount += save.village.offering[elem][1] * 20;
            }
        });

        currentAmount = Math.max(currentAmount, minCurrentAmount); //if stat have any problems
        
        save.currency.village_offering = currentAmount;
        
        if (save.village.offering.knowledge !== undefined) {
            save.village.offering.knowledge[1] = 0;
        }
        if (save.village.offering.science !== undefined) {
            save.village.offering.science[1] = 0;
        }
        if (save.village.offering.joy !== undefined) {
            save.village.offering.joy[1] = 0;
        }
        
    }

    //Fix Merchant items
    if (save.event && save.event.shop_merchant.length > 0){
         save.event.shop_merchant.forEach(elem => {
            if (elem.data !== null && elem.data.effect.length > 0) {
                elem.data.effect.forEach(effect => {
                    effect.replace("currencyFarmFruitGain","currencyFarmBerryGain")
                });
            }
        });
    }

    //some might have bought it
    if (save.treasure && save.treasure.newItem && save.treasure.newItem.effect.length > 0 ){
        save.treasure.newItem.effect.forEach(effect => {
            effect.replace("currencyFarmFruitGain","currencyFarmBerryGain")
        });
    }    

    return save;
}
