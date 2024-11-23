import store from "../../../../store";

export default function(seconds) {
    ['sapling', 'yarn', 'dough', 'snow'].forEach(name => {
        const gain = store.getters['mult/get'](store.getters['currency/gainMultName']('event', name));
        if (gain > 0) {
            store.dispatch('currency/gain', {feature: 'event', name, amount: gain * seconds});
        }
    });
}
