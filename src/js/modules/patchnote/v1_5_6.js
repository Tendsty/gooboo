export default {
    day: '2025-01-19',
    content: {
        meta: [
            {
                type: 'bugfix',
                text: '434'
            }
        ],
        village: [
            {
                unlock: 'villageOffering1',
                type: 'remove',
                text: '429'
            },
            {
                unlock: 'villageOffering1',
                type: 'balance',
                text: '430'
            },
            {
                unlock: 'villageOffering1',
                type: 'balance',
                text: '431',
                balance: 'buff',
                before: '0.01/h',
                after: '0.02/h'
            },
            {
                unlock: 'villageOffering1',
                type: 'change',
                text: '432'
            },
            {
                unlock: 'villageOffering1',
                type: 'change',
                text: '433'
            },
        ],
        horde: [
            {
                unlock: 'hordeSacrifice',
                type: 'bugfix',
                text: '436'
            },
        ],
        event: [
            {
                unlock: 'cindersEvent',
                type: 'bugfix',
                text: '437'
            },
            {
                unlock: 'cindersEvent',
                type: 'balance',
                text: '438',
                balance: 'buff',
                before: 'x1.01',
                after: 'x1.015'
            },
            {
                unlock: 'cindersEvent',
                type: 'balance',
                text: '439'
            },
        ],
        gallery: [
            {
                unlock: 'galleryDrums',
                type: 'balance',
                text: '399',
                balance: 'buff',
                before: '+2',
                after: '+3'
            },
            {
                unlock: 'galleryDrums',
                type: 'balance',
                text: '401',
                balance: 'buff',
                before: '+0.35x',
                after: '+0.4x'
            },
        ],
        horde_1: [
            {
                type: 'bugfix',
                text: '435'
            }
        ]
    }
}
