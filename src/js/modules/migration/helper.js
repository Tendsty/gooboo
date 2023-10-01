export { addCurrencyToSave, raiseUpgradeLevel }

function addCurrencyToSave(save, currency, amount) {
    if (save.currency[currency] === undefined) {
        save.currency[currency] = 0;
    }
    save.currency[currency] += amount;

    if (save.stat[currency] === undefined) {
        save.stat[currency] = {value: 0, total: 0};
    }
    save.stat[currency].value += amount;
    save.stat[currency].total += amount;

    const maxStatName = currency + 'Max';

    if (save.stat[maxStatName] === undefined) {
        save.stat[maxStatName] = {value: 0, total: 0};
    }
    save.stat[maxStatName].value = Math.max(amount, save.stat[maxStatName].value);
    save.stat[maxStatName].total = Math.max(amount, save.stat[maxStatName].total);

    return save;
}

function raiseUpgradeLevel(save, name, amount) {
    if (save.upgrade && save.upgrade[name] !== undefined) {
        save.upgrade[name].level += amount;
        save.upgrade[name].highestLevel = Math.max(save.upgrade[name].level, save.upgrade[name].highestLevel);
    }

    return save;
}
