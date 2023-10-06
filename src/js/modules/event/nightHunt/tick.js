import store from "../../../../store";
import { NIGHT_HUNT_GL_BOOST } from "../../../constants";
import { chance } from "../../../utils/random";

export default function(seconds) {
    const changeAmount = Math.min(20, Math.floor(Math.sqrt(store.state.currency.event_magic.value))) - Object.keys(store.state.nightHunt.changedCurrency).length;
    let addAmount = 0;
    let secondsLeft = seconds;
    while (secondsLeft > 0 && addAmount < changeAmount) {
        const percent = 0.01 * (changeAmount - addAmount);
        const secondsNeeded = Math.ceil(1 / percent);
        if (secondsLeft >= secondsNeeded) {
            addAmount++;
            secondsLeft -= secondsNeeded;
        } else {
            if (chance(percent)) {
                addAmount++;
            }
            secondsLeft = 0;
        }
    }
    if (addAmount > 0) {
        store.dispatch('nightHunt/addChangedCurrency', addAmount);
        store.dispatch('currency/spend', {feature: 'event', name: 'magic', amount: addAmount});
    }

    const essenceGain = store.getters['mult/get']('currencyEventEssenceGain') * Math.pow(NIGHT_HUNT_GL_BOOST, store.getters['meta/globalEventLevel']);
    if (essenceGain > 0) {
        store.dispatch('currency/gain', {feature: 'event', name: 'essence', amount: essenceGain * seconds});
    }
}
