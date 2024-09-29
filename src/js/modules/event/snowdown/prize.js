import store from "../../../../store";

export default {
    theme_frozen: {
        type: 'theme',
        item: 'frozen',
        pool: {
            snowdown: {price: {event_snowdownToken: 225}}
        }
    },
    relic_moneyGift: {
        type: 'relic',
        item: 'moneyGift',
        requirement() {
            return store.state.unlock.villageFeature.see;
        },
        pool: {
            snowdown: {price: {event_snowdownToken: 155}}
        }
    },
    relic_frozenCarrot: {
        type: 'relic',
        item: 'frozenCarrot',
        requirement() {
            return store.state.unlock.farmFeature.see;
        },
        pool: {
            snowdown: {price: {event_snowdownToken: 170}}
        }
    },
    cardPack_icyWonderland: {
        type: 'cardPack',
        item: 'icyWonderland',
        pool: {
            snowdown: {price: {event_snowdownToken: 30}}
        }
    },
    farm_cinnamonBag: {
        type: 'consumable',
        item: 'farm_cinnamonBag',
        amount: 20,
        requirement() {
            return store.state.unlock.farmFertilizer.see;
        },
        pool: {
            snowdown: {price: {event_snowdownToken: 1}}
        }
    }
}
