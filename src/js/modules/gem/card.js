import cardList from "./cardList";

export default {
    feature: {
        prefix: 'GE',
        reward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 20}],
        shinyReward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 20}],
        unlock: 'gemFeature'
    },
    collection: {
        preciousJewelry: {reward: [
            {name: 'currencyGemTopazCap', type: 'base', value: 160}
        ]},
    },
    pack: {},
    card: cardList
}
