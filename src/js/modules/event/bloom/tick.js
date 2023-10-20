import store from "../../../../store";
import { capitalize } from "../../../utils/format";
import { chance, randomElem } from "../../../utils/random";

function breedFlower(breeder, amount = 1) {
    const flower = breeder.type;
    const maxTier = breeder.tier;
    let blossoms = 0;

    const geneChance = breeder.gene.includes('mutating') ? 0.2 : 0.1;
    const canSplit = breeder.gene.includes('splitting');
    const baseTierChance = store.getters['mult/get'](`bloom${ capitalize(flower) }Chance`,
        (breeder.gene.includes('resistant') ? 0.1 : 0) + maxTier * 0.05);

    while (amount > 0) {
        let tier = -1;
        let addTier = true;
        let flowerAmount = 1;

        let rngGen = store.getters['system/getRng']('bloom_flower');
        const tierChance = rngGen();
        while (addTier && tier < maxTier) {
            tier++;
            if (!chance(baseTierChance - tier * 0.2, tierChance)) {
                addTier = false;
            }
        }

        if (canSplit && chance(0.25, rngGen())) {
            flowerAmount++;
        }

        let gene = [];
        if (chance(geneChance, rngGen())) {
            gene.push(randomElem(Object.keys(store.state.bloom.gene), rngGen()));
        }
        store.commit('system/nextRng', {name: 'bloom_flower', amount: 1});

        for (let i = 0; i < flowerAmount; i++) {
            if (store.getters['bloom/hasInventorySpace']) {
                store.dispatch('bloom/addFlower', store.getters['bloom/buildFlower']({type: flower, tier, gene}));
                store.dispatch('note/find', 'event_12');
            } else {
                // Try to find a worse flower and sell it
                let slotTier = -1;
                let slotToSell = null;
                store.state.bloom.inventory.forEach((invFlower, slot) => {
                    if (flower === invFlower.type && tier > invFlower.tier && (invFlower.tier > slotTier)) {
                        slotTier = invFlower.tier;
                        slotToSell = slot;
                    }
                });

                if (slotToSell !== null) {
                    store.dispatch('bloom/sellFlower', 'inventory_' + slotToSell);
                    store.dispatch('bloom/addFlower', store.getters['bloom/buildFlower']({type: flower, tier, gene}));
                } else {
                    // No worse flower found, sell the new one
                    blossoms += store.getters['bloom/flowerValue'](flower, tier, gene);
                }
            }
        }
        amount--;
    }

    return blossoms;
}

function advanceBreeders(seconds) {
    let blossoms = 0;

    store.state.bloom.breeder.forEach((breeder, key) => {
        let amount = 0;
        let newTime = breeder.time + seconds;

        const timeNeeded = store.getters['mult/get'](`bloom${ capitalize(breeder.type) }BreedTime`);
        amount += Math.floor(newTime / timeNeeded);
        newTime -= amount * timeNeeded;

        store.commit('bloom/updateSubkey', {key: 'breeder', subkey: key, value: {...breeder, time: newTime}});
        if (amount > 0) {
            blossoms += breedFlower(breeder, amount);
        }
    });

    return blossoms;
}

export default function(seconds) {
    let secondsLeft = seconds;
    let blossoms = 0;

    while (secondsLeft > 0) {
        if (store.getters['bloom/hasInventorySpace']) {
            let timeToNext = null;
            store.state.bloom.breeder.forEach(breeder => {
                const timeNeeded = store.getters['mult/get'](`bloom${ capitalize(breeder.type) }BreedTime`) - breeder.time;
                if (timeToNext === null || timeNeeded < timeToNext) {
                    timeToNext = timeNeeded;
                }
            });
            if (timeToNext !== null) {
                if (timeToNext > secondsLeft) {
                    timeToNext = secondsLeft;
                }
                blossoms += advanceBreeders(timeToNext);
                secondsLeft -= timeToNext;
            } else {
                // No breeders, skip all
                secondsLeft = 0;
            }
        } else {
            blossoms += advanceBreeders(secondsLeft);

            secondsLeft = 0;
        }
    }

    if (blossoms > 0) {
        store.dispatch('currency/gain', {feature: 'event', name: 'blossom', amount: blossoms});
        store.dispatch('note/find', 'event_13');
    }
}
