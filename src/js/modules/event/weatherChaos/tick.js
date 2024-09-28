import store from "../../../../store";
import { SECONDS_PER_HOUR } from "../../../constants";

export default function(seconds, oldTime, newTime) {
    let step = oldTime;
    while (step < newTime) {
        const oldStep = step;
        step = Math.min(Math.floor((step + SECONDS_PER_HOUR) / SECONDS_PER_HOUR) * SECONDS_PER_HOUR, newTime);
        if (step % SECONDS_PER_HOUR === 0) {
            store.dispatch('weatherChaos/nextWeatherStep');
        }
        if (step > oldStep) {
            singleTick(step - oldStep);
        }
    }
}

function singleTick(seconds) {
    if (store.getters['weatherChaos/currentWeather'] !== undefined) {
        const timeNeeded = store.getters['mult/get']('weatherChaosFishingTime');
        let newTime = store.state.weatherChaos.fishingProgress + seconds;
        let catches = Math.floor(newTime / timeNeeded);
        if (catches > 0) {
            // Catch with bait first
            const currentBait = store.state.weatherChaos.currentBait;
            const bait = currentBait ? store.state.weatherChaos.bait[currentBait] : null;
            if (bait) {
                const baitCatches = Math.min(catches, bait.owned);
                store.dispatch('weatherChaos/getCatch', baitCatches);
                store.commit('weatherChaos/updateSubkey', {name: 'bait', key: currentBait, subkey: 'owned', value: bait.owned - baitCatches});
                newTime -= baitCatches * timeNeeded;

                // Unequip bait if none is left
                if (store.state.weatherChaos.bait[currentBait].owned <= 0) {
                    store.dispatch('weatherChaos/resetBaitEffects', currentBait);
                    store.commit('weatherChaos/updateKey', {key: 'currentBait', value: null});
                }
            }

            // Then catch without bait
            const timeNeededNew = store.getters['mult/get']('weatherChaosFishingTime');
            catches = Math.floor(newTime / timeNeededNew);
            if (catches > 0) {
                store.dispatch('weatherChaos/getCatch', catches);
                newTime -= catches * timeNeededNew;
            }
        }
        store.commit('weatherChaos/updateKey', {key: 'fishingProgress', value: newTime});
    }
}
