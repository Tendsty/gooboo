import store from "../../../../store";
import { buildNum } from "../../../utils/format";
import { logBase } from "../../../utils/math";

export default function(seconds) {
    const candleDuration = store.state.cinders.activeCandle ? store.state.cinders.activeCandle.duration : 0
    const candleTime = Math.min(candleDuration, seconds);
    const lightGain = store.getters['cinders/totalProduction'] * Math.pow(1.015, store.getters['meta/globalEventLevel']);

    let totalLight = lightGain * (seconds - candleTime);
    if (candleTime > 0) {
        totalLight += lightGain * store.getters['mult/get']('cindersCandlePower', store.state.cinders.candle[store.state.cinders.activeCandle.name].lightMult - 1, 1, 1) * candleTime;
        const newCandleDuration = candleDuration - candleTime;
        if (newCandleDuration > 0) {
            store.commit('cinders/updateCandleKey', {key: 'duration', value: newCandleDuration});
        } else {
            store.dispatch('currency/gain', {feature: 'event', name: 'soot', gainMult: true, amount: store.state.cinders.candle[store.state.cinders.activeCandle.name].soot});
            store.commit('cinders/updateKey', {key: 'activeCandle', value: null});
        }
    }
    if (lightGain > 0) {
        store.dispatch('currency/gain', {
            feature: 'event',
            name: 'light',
            gainMult: true,
            amount: totalLight
        });
        store.dispatch('note/find', 'event_8');

        const lightGained = store.state.stat.event_light.value;
        const totalTokens = Math.floor(store.getters['mult/get']('currencyEventCindersTokenGain', logBase(lightGained / buildNum(10, 'K'), 1.2)));
        const collectedTokens = store.state.stat.event_cindersToken.value;
        if (totalTokens > collectedTokens) {
            store.dispatch('event/giveTokens', {event: 'cinders', amount: totalTokens - collectedTokens});
            store.dispatch('note/find', 'event_10');
        }
    }
}
