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
        //No need to reapply to those 3
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

    return save;
}
