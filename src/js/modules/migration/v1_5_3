export default function(save) {
  
    // Fix offerings
    if (save.village && save.village.offering) {
        for (const [key, elem] of Object.entries(save.village.offering)) {
            save.village.offering[key] = [elem.offeringBought, elem.upgradeBought];
        }
    }

    return save;
}
