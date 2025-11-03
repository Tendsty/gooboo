import cardList from "./cardList";

export default {
    feature: {
        prefix: 'GE',
        reward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 50}],
        shinyReward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 50}],
        unlock: 'gemFeature'
    },
    collection: {
        preciousJewelry: {reward: [
            {name: 'currencyGemTopazCap', type: 'base', value: 500}
        ]},
    },
    pack: {},
    card: cardList
}
