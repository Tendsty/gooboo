import cardList from "./cardList";

// Shared drop tables for event packs
const gemTable = {'GE-0001': 0.375, 'GE-0002': 0.375, 'GE-0003': 0.375, 'GE-0004': 0.375, 'GE-0005': 0.1};
const smallTable = {'EV-0001': 0.6, 'EV-0002': 0.6, 'EV-0003': 0.6, 'EV-0004': 0.6};
const summerTable = {'EV-0014': 0.6, 'EV-0015': 0.6, 'EV-0016': 0.6, 'EV-0017': 0.6};
const winterTable = {'EV-0024': 0.6, 'EV-0025': 0.6, 'EV-0026': 0.6, 'EV-0027': 0.6};

export default {
    feature: {
        prefix: 'EV',
        reward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 5}],
        shinyReward: [{name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 5}],
        unlock: 'eventFeature'
    },
    collection: {
        weekendTrip: {reward: [
            {name: 'currencyGemTopazCap', type: 'base', value: 50}
        ]},
        tropicalParadise: {reward: [
            {name: 'currencyGemTopazCap', type: 'base', value: 50}
        ]},
        coldTimes: {reward: [
            {name: 'currencyGemTopazCap', type: 'base', value: 50}
        ]},
    },
    pack: {
        goodDeal: {unlock: 'merchantEvent', amount: 1, content: {
            ...gemTable,
            ...smallTable,
            'EV-0005': 2, 'EV-0006': 2, 'EV-0007': 2,
        }},
        connectedLine: {unlock: 'bingoCasinoEvent', amount: 1, content: {
            ...gemTable,
            ...smallTable,
            'EV-0008': 6,
        }},
        feelingLucky: {unlock: 'wheelOfFortuneCasinoEvent', amount: 1, content: {
            ...gemTable,
            ...smallTable,
            'EV-0009': 6,
        }},
        investorsDream: {unlock: 'bankEvent', amount: 3, content: {
            ...gemTable,
            ...smallTable,
            'EV-0011': 2, 'EV-0012': 2, 'EV-0013': 2,
        }},
        greenThumb: {unlock: 'bloomEvent', amount: 1, content: {
            ...gemTable,
            ...summerTable,
            'EV-0018': 3, 'EV-0019': 3,
        }},
        fishingForFun: {unlock: 'weatherChaosEvent', amount: 1, content: {
            ...gemTable,
            ...summerTable,
            'EV-0020': 3, 'EV-0021': 3,
        }},
        charmingShip: {unlock: 'summerFestivalEvent', amount: 1, content: {
            ...gemTable,
            ...summerTable,
            'EV-0022': 3, 'EV-0023': 3,
        }},
        midnightAnomaly: {unlock: 'nightHuntEvent', amount: 1, content: {
            ...gemTable,
            ...winterTable,
            'EV-0028': 3, 'EV-0029': 3,
        }},
        icyWonderland: {unlock: 'snowdownEvent', amount: 1, content: {
            ...gemTable,
            ...winterTable,
            'EV-0030': 3, 'EV-0031': 3,
        }},
        sparksOfJoy: {unlock: 'cindersEvent', amount: 1, content: {
            ...gemTable,
            ...winterTable,
            'EV-0032': 3, 'EV-0033': 3,
        }},
    },
    card: cardList
}
