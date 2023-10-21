export default function(save) {
    // Delete all rng prerolls because of the new seeded rng
    save.rng = {};

    // New unlock format
    for (const [key, elem] of Object.entries(save.unlock)) {
        save.unlock[key] = elem.use;
    }

    // New stat format
    for (const [key, elem] of Object.entries(save.stat)) {
        save.stat[key] = [elem.value, elem.total];
    }

    // New upgrade format
    for (const [key, elem] of Object.entries(save.upgrade)) {
        save.upgrade[key] = elem.bought === undefined ? [elem.collapse, elem.level, elem.highestLevel] : [elem.collapse, elem.level, elem.highestLevel, elem.bought, elem.timeProgress];
    }

    return save;
}
