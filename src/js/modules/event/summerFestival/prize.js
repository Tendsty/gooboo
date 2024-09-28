import store from "../../../../store";

export default {
    theme_waves: {
        type: 'theme',
        item: 'waves',
        pool: {
            summerFestival: {price: {event_summerFestivalToken: 240}}
        }
    },
    relic_tropicalTent: {
        type: 'relic',
        item: 'tropicalTent',
        requirement() {
            return store.state.unlock.villageFeature.see;
        },
        pool: {
            summerFestival: {price: {event_summerFestivalToken: 150}}
        }
    },
    relic_fruitBasket: {
        type: 'relic',
        item: 'fruitBasket',
        requirement() {
            return store.state.unlock.farmFeature.see;
        },
        pool: {
            summerFestival: {price: {event_summerFestivalToken: 170}}
        }
    },
    cardPack_charmingShip: {
        type: 'cardPack',
        item: 'charmingShip',
        pool: {
            summerFestival: {price: {event_summerFestivalToken: 30}}
        }
    },
    farm_tropicalWater: {
        type: 'consumable',
        item: 'farm_tropicalWater',
        amount: 20,
        requirement() {
            return store.state.unlock.farmFertilizer.see;
        },
        pool: {
            summerFestival: {price: {event_summerFestivalToken: 1}}
        }
    }
}
