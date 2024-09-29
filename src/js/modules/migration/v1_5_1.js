export default function(save) {
    // Use new school subject format
    if (save.school) {
        for (const [key, elem] of Object.entries(save.school)) {
            save.school[key] = [elem.grade, elem.currentGrade, elem.progress];
        }
    }

    // Use new smeltery format
    if (save.mining && save.mining.smeltery) {
        for (const [key, elem] of Object.entries(save.mining.smeltery)) {
            save.mining.smeltery[key] = [elem.progress, elem.stored, elem.total];
        }
    }

    // Use new offering format
    if (save.village && save.village.offering) {
        for (const [key, elem] of Object.entries(save.village.offering)) {
            save.village.offering[key] = [elem.offeringBought, elem.upgradeBought];
        }
    }

    return save;
}
