import store from "../../../../store";

export default {
    theme_candlelight: {
        type: 'theme',
        item: 'candlelight',
        pool: {
            cinders: {price: {event_cindersToken: 170}}
        }
    },
    relic_geode: {
        type: 'relic',
        item: 'geode',
        pool: {
            cinders: {price: {event_cindersToken: 140}}
        }
    },
    relic_birthdayCake: {
        type: 'relic',
        item: 'birthdayCake',
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            cinders: {price: {event_cindersToken: 180}}
        }
    },
    cardPack_sparksOfJoy: {
        type: 'cardPack',
        item: 'sparksOfJoy',
        pool: {
            cinders: {price: {event_cindersToken: 30}}
        }
    },
    farm_sunshine: {
        type: 'consumable',
        item: 'farm_sunshine',
        amount: 20,
        requirement() {
            return store.state.unlock.farmFertilizer.see;
        },
        pool: {
            cinders: {price: {event_cindersToken: 1}}
        }
    }
}
