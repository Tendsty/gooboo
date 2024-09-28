import store from "../../../../store";
import { NIGHT_HUNT_GL_BOOST } from "../../../constants";
import { chance } from "../../../utils/random";

export default function(seconds) {
    let magicValue = store.state.currency.event_magic.value / 10;
    let addAmount = 0;
    let sackAmount = 0;
    let secondsLeft = seconds;
    while (secondsLeft > 0) {
        const changeAmount = Math.min(20, Math.floor(Math.sqrt(magicValue))) - Object.keys(store.state.nightHunt.changedCurrency).length - addAmount - sackAmount;
        const percent = 0.002 * changeAmount;
        const sackPercent = 0.002 * magicValue - 0.2;
        const secondsNeeded = percent > 0 ? Math.ceil(1 / percent) : Infinity;
        if (changeAmount <= 0) {
            secondsLeft = 0;
        } else if (secondsLeft >= secondsNeeded) {
            if (chance(sackPercent)) {
                sackAmount++;
                magicValue -= 10;
            } else {
                addAmount++;
                magicValue--;
            }
            secondsLeft -= secondsNeeded;
        } else {
            if (chance(percent)) {
                if (chance(sackPercent)) {
                    sackAmount++;
                } else {
                    addAmount++;
                }
            }
            secondsLeft = 0;
        }
    }
    if (addAmount > 0 || sackAmount > 0) {
        store.dispatch('nightHunt/addChangedCurrency', {random: addAmount, sack: sackAmount});
        store.dispatch('currency/spend', {feature: 'event', name: 'magic', amount: addAmount * 10 + sackAmount * 100});
    }

    const essenceGain = store.getters['mult/get']('currencyEventEssenceGain') * Math.pow(NIGHT_HUNT_GL_BOOST, store.getters['meta/globalEventLevel']);
    if (essenceGain > 0) {
        store.dispatch('currency/gain', {feature: 'event', name: 'essence', amount: essenceGain * seconds});
    }
}
