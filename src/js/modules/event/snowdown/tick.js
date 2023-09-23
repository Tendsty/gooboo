import store from "../../../../store";

const producers = {
    rollingPin: 'dough',
    forest: 'sapling',
    spiceJar: 'cinnamon',
    tap: 'water',
    snowCannon: 'snow',
    shepherd: 'yarn'
};

export default function(seconds) {
    for (const [key, elem] of Object.entries(producers)) {
        const amount = store.state.snowdown.item[key].amount;
        if (amount > 0) {
            store.dispatch('currency/gain', {
                feature: 'event',
                name: elem,
                amount: Math.pow(2, amount) * Math.pow(amount + 1, 2) * 0.01 * Math.pow(1.01, store.getters['meta/globalEventLevel']) * seconds
            });
        }
    }
}
