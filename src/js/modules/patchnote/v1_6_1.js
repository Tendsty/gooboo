export default {
    day: '2025-11-09',
    content: {
        meta: [
            {
                type: 'bugfix',
                text: '428'
            },
        ],
        note: [
            {
                type: 'change',
                text: '441'
            },
        ],
        school: [
            {
                type: 'clarity',
                text: '643'
            },
            {
                unlock: 'schoolHistorySubfeature',
                type: 'bugfix',
                text: '642'
            },
            {
                unlock: 'schoolLibrarySubfeature',
                type: 'bugfix',
                text: '644',
                issue: '99'
            },
        ],
        horde: [
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_targetDummy',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.16'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.16'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_combatLesson',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.25',
                        after: 'x1.3'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.22',
                        after: 'x1.25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_balance',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.12',
                        after: 'x1.13'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.12',
                        after: 'x1.13'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_candleCircle',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.02',
                        after: 'x1.03'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_mausoleum',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.05',
                        after: 'x1.06'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_deepHatred',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.1 - x1.17',
                        after: 'x1.12 - x1.19'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.05 - x1.08',
                        after: 'x1.06 - x1.09'
                    },
                ],
            },
        ],
        general: [
            {
                type: 'balance',
                text: '641'
            },
        ],
        farm: [
            {
                unlock: 'farmCare',
                type: 'bugfix',
                text: '645'
            },
        ],
        treasure: [
            {
                type: 'bugfix',
                text: '647'
            },
        ],
        village_1: [
            {
                type: 'bugfix',
                text: '646'
            },
        ],
    }
}
