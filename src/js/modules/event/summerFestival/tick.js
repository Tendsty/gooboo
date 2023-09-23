import store from "../../../../store";
import { capitalize } from "../../../utils/format";
import { randomElem, randomRound } from "../../../utils/random";

export default function(seconds) {
    // Handle build queue
    if (store.state.summerFestival.buildQueue.length > 0) {
        let secondsLeft = seconds;
        const speed = store.getters['mult/get']('summerFestivalBuildQueueSpeed');
        let newQueue = [];
        store.state.summerFestival.buildQueue.forEach(elem => {
            if (secondsLeft > 0) {
                const key = Math.abs(elem);
                const building = store.state.summerFestival.placedBuilding[key];
                const nextTimeLeft = building.timeLeft - secondsLeft * speed;
                if (nextTimeLeft > 0) {
                    store.commit('summerFestival/updatePlacedBuildingKey', {id: key, key: 'timeLeft', value: nextTimeLeft});
                    secondsLeft = 0;
                    newQueue.push(elem);
                } else {
                    secondsLeft -= Math.ceil(building.timeLeft / speed);
                    if (elem > 0) {
                        store.dispatch('summerFestival/finishBuilding', key);
                    } else {
                        store.dispatch('summerFestival/finishBuildingDeletion', key);
                    }
                }
            } else {
                newQueue.push(elem);
            }
        });
        store.commit('summerFestival/updateKey', {key: 'buildQueue', value: newQueue});
    }

    // Create random resource drops
    if (store.state.summerFestival.island !== null) {
        let allCells = [];
        store.state.summerFestival.island.forEach((row, y) => {
            row.forEach((cell, x) => {
                allCells.push({...cell, x, y});
            });
        });
        for (let i = 0, n = randomRound(seconds / 10); i < n; i++) {
            const chosenCell = randomElem(allCells);
            const cellType = store.state.summerFestival.cellType[chosenCell.tile];
            if (chosenCell.unlocked && !chosenCell.building && cellType.produces && chosenCell.drop < store.getters['mult/get']('summerFestivalMaterialStackCap')) {
                if (chosenCell.cacheAutocollect === null) {
                    chosenCell.drop++;
                    store.commit('summerFestival/updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'drop', value: chosenCell.drop});
                } else {
                    store.dispatch('currency/gain', {
                        feature: 'event',
                        name: cellType.produces,
                        amount: chosenCell.cacheAutocollect * store.getters['mult/get']('summerFestivalMaterialGain') * Math.pow(1.01, store.getters['meta/globalEventLevel'])
                    });
                }
            }
        }
    }

    // Award currency gains
    ['music', 'sand', 'freshWater', 'coal', 'salt', 'pepper', 'honey', 'vegetable', 'citrusFruit', 'rawFish', 'rawMeat'].forEach(elem => {
        const gain = store.getters['mult/get'](`currencyEvent${ capitalize(elem) }Gain`);
        if (gain > 0) {
            store.dispatch('currency/gain', {feature: 'event', name: elem, amount: gain * seconds});
        }
    });

    // Handle building actions
    for (const [id, building] of Object.entries(store.state.summerFestival.placedBuilding)) {
        if (building.timeLeft <= 0 && building.selectedAction !== null) {
            const action = store.state.summerFestival.building[building.type].action[building.selectedAction];
            let newTime = building.actionTime + action.speed(building.level - 1) * seconds;

            if (newTime >= 1) {
                let maxAfford = Math.floor(newTime);
                for (const [key, elem] of Object.entries(action.input)) {
                    maxAfford = Math.min(maxAfford, Math.floor(store.state.currency[key].value / elem));
                }

                if (maxAfford > 0) {
                    for (const [key, elem] of Object.entries(action.input)) {
                        const split = key.split('_');
                        store.dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem * maxAfford});
                    }
                    for (const [key, elem] of Object.entries(action.output)) {
                        const split = key.split('_');
                        store.dispatch('currency/gain', {feature: split[0], name: split[1], amount: elem * maxAfford});
                    }
                    store.state.summerFestival.building[building.type].effect.forEach(eff => {
                        if (eff.name === 'pearlChance') {
                            const pearlAmount = randomRound(maxAfford * eff.value(building.level - 1));
                            if (pearlAmount > 0) {
                                store.dispatch('currency/gain', {feature: 'event', name: 'pearl', amount: pearlAmount});
                            }
                        }
                    });
                    newTime -= maxAfford;
                }
            }

            store.commit('summerFestival/updatePlacedBuildingKey', {id, key: 'actionTime', value: Math.max(0, Math.min(newTime, 1))});
        }
    }
}
