import store from "../../../../store";

export default {
    theme_colorful: {
        type: 'theme',
        item: 'colorful',
        pool: {
            bloom: {price: {event_bloomToken: 180}}
        }
    },
    relic_colorfulFlower: {
        type: 'relic',
        item: 'colorfulFlower',
        requirement() {
            return store.state.unlock.farmFeature.see;
        },
        pool: {
            bloom: {price: {event_bloomToken: 170}}
        }
    },
    relic_heatingBulb: {
        type: 'relic',
        item: 'heatingBulb',
        requirement() {
            return store.state.unlock.galleryInspiration.see;
        },
        pool: {
            bloom: {price: {event_bloomToken: 200}}
        }
    },
    cardPack_greenThumb: {
        type: 'cardPack',
        item: 'greenThumb',
        pool: {
            bloom: {price: {event_bloomToken: 30}}
        }
    },
    farm_superFlower: {
        type: 'consumable',
        item: 'farm_superFlower',
        amount: 20,
        requirement() {
            return store.state.unlock.farmFertilizer.see;
        },
        pool: {
            bloom: {price: {event_bloomToken: 1}}
        }
    }
}
