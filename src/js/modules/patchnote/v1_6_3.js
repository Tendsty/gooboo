export default {
    day: '2026-02-11',
    content: {
        mining: [
            {
                unlock: 'miningSmeltery',
                type: 'bugfix',
                text: '659'
            },
            {
                unlock: 'miningLuxuryCardPack',
                type: 'bugfix',
                text: '660'
            },
            {
                unlock: 'miningLuxuryCardPack',
                type: 'info',
                text: '661'
            },
            {
                unlock: 'miningResin',
                type: 'bugfix',
                text: '662'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalReplicator',
                content: [
                    {
                        text: 'mining_crystalGreen',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.12',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalExplosives',
                content: [
                    {text: '675'},
                ],
            },
        ],
        horde: [
            {
                type: 'bugfix',
                text: '653'
            },
            {
                type: 'bugfix',
                text: '654'
            },
            {
                unlock: 'hordeChessEquipment',
                type: 'bugfix',
                text: '655'
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'goldenStaff',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+60%',
                        after: '+50%'
                    },
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+5%',
                        after: '+3%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'cloudStaff',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+50%',
                        after: '+30%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'doubleEdgedSword',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+75%',
                        after: '+80%'
                    },
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+5%',
                        after: '+4%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'spellbook',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+50%',
                        after: '+60%'
                    },
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+5%',
                        after: '+3%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'knight',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+50%',
                        after: '+40%'
                    },
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+10%',
                        after: '+2%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0041',
                content: [
                    {
                        text: 'hordeSpellblade',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+125%',
                        after: '+75%'
                    }
                ],
            },
        ],
        card: [
            {
                type: 'bugfix',
                text: '669'
            },
        ],
        farm: [
            {
                unlock: 'farmFertilizer',
                type: 'bugfix',
                text: '663'
            },
            {
                unlock: 'farmCare',
                type: 'bugfix',
                text: '645'
            },
            {
                type: 'bugfix',
                text: '665'
            },
            {
                unlock: 'farmCropExp',
                type: 'bugfix',
                text: '667'
            },
            {
                unlock: 'farmCropExp',
                type: 'balance',
                text: '664'
            },
        ],
        event: [
            {
                type: 'bugfix',
                text: '670',
                issue: '110'
            },
        ],
        treasure: [
            {
                unlock: 'treasureDual',
                type: 'bugfix',
                text: '668'
            },
            {
                unlock: 'treasureDual',
                type: 'balance',
                text: '673',
                balance: 'nerf',
                before: '60%',
                after: '55%'
            },
            {
                unlock: 'treasurePrestigious',
                type: 'balance',
                text: '671',
                balance: 'nerf',
                before: '3',
                after: '2'
            },
        ],
        cryolab: [
            {
                unlock: 'farmCropExp',
                type: 'balance',
                text: '676',
                balance: 'nerf',
                before: '500/d',
                after: '200/d'
            },
        ],
        gallery: [
            {
                unlock: 'galleryShape',
                type: 'change',
                text: '651'
            },
            {
                unlock: 'galleryShape',
                type: 'bugfix',
                text: '652',
                issue: '106'
            },
        ],
        horde_1: [
            {
                type: 'bugfix',
                text: '656'
            },
            {
                type: 'bugfix',
                text: '657'
            },
            {
                type: 'balance',
                text: '674',
                balance: 'nerf',
                before: '+0.05x',
                after: '+0.02x'
            },
            {
                type: 'balance',
                text: '605',
                balance: 'nerf',
                before: 'x1.4',
                after: 'x1.3'
            },
            {
                type: 'balance',
                text: '606',
                balance: 'nerf',
                before: 'x1.5',
                after: 'x1.4'
            },
            {
                type: 'balance',
                text: '607',
                balance: 'nerf',
                before: 'x1.3',
                after: 'x1.2'
            },
            {
                unlock: 'hordeClassAssassin',
                type: 'bugfix',
                text: '658'
            },
            {
                unlock: 'hordeMonsterToothMonkeyJungle',
                type: 'new',
                text: '672'
            },
        ],
    }
}
