import store from "../../../../store";

export default {
    theme_autumnForest: {
        type: 'theme',
        item: 'autumnForest',
        pool: {
            nightHunt: {price: {event_nightHuntToken: 200}}
        }
    },
    relic_massiveGrain: {
        type: 'relic',
        item: 'massiveGrain',
        requirement() {
            return store.state.unlock.farmFeature.see;
        },
        pool: {
            nightHunt: {price: {event_nightHuntToken: 170}}
        }
    },
    relic_enchantedBottle: {
        type: 'relic',
        item: 'enchantedBottle',
        requirement() {
            return store.state.unlock.miningResin.see;
        },
        pool: {
            nightHunt: {price: {event_nightHuntToken: 175}}
        }
    },
    cardPack_midnightAnomaly: {
        type: 'cardPack',
        item: 'midnightAnomaly',
        pool: {
            nightHunt: {price: {event_nightHuntToken: 30}}
        }
    },
    farm_fieldBlessing: {
        type: 'consumable',
        item: 'farm_fieldBlessing',
        amount: 20,
        requirement() {
            return store.state.unlock.farmFertilizer.see;
        },
        pool: {
            nightHunt: {price: {event_nightHuntToken: 1}}
        }
    }
}
