export default function(save) {
    // Update offering stats
    if (save.stat.village_offering) {
        save.stat.village_offeringAmount = save.stat.village_offering;
    }
    return save;
}
