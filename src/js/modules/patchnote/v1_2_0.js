export default {
    day: '2023-10-06',
    content: {
        meta: [
            {
                type: 'clarity',
                text: '100',
            },
            {
                type: 'clarity',
                text: '101',
            }
        ],
        mining: [
            {
                unlock: 'miningDepthDweller',
                type: 'bugfix',
                text: '97',
            },
            {
                unlock: 'miningDepthDweller',
                type: 'qol',
                text: '98',
            }
        ],
        village: [
            {
                type: 'new',
                text: 'addedBuilding',
                params: [30]
            },
            {
                unlock: 'villageCoinUpgrades',
                type: 'new',
                text: 'addedUpgrade',
                params: [8]
            },
            {
                unlock: 'villagePrestige',
                type: 'new',
                text: 'addedPrestigeUpgrade',
                params: [5]
            },
            {
                unlock: 'achievementFeature',
                type: 'new',
                text: 'addedAchievement',
                params: [2]
            },
            {
                unlock: 'achievementFeature',
                type: 'new',
                text: 'secretAchievement',
                params: [1]
            },
            {
                unlock: 'villageBuildings5',
                type: 'balance',
                text: '96',
            },
            {
                unlock: 'villageCoinUpgrades',
                type: 'qol',
                text: '99',
            }
        ],
        school: [
            {
                unlock: 'schoolHistorySubfeature',
                type: 'accessibility',
                text: '103',
            }
        ],
        horde: [
            {
                unlock: 'hordeCorruptedFlesh',
                type: 'bugfix',
                text: '90',
            },
            {
                unlock: 'hordeItems',
                type: 'bugfix',
                text: '91',
            },
            {
                type: 'clarity',
                text: '93',
            },
            {
                unlock: 'hordeItems',
                type: 'bugfix',
                text: '94',
            }
        ],
        farm: [
            {
                type: 'qol',
                text: '102',
            }
        ],
        event: [
            {
                unlock: 'nightHuntEvent',
                type: 'clarity',
                text: '104',
            },
            {
                unlock: 'farmFertilizer',
                type: 'clarity',
                text: '107',
            },
            {
                unlock: 'nightHuntEvent',
                type: 'bugfix',
                text: '108',
            }
        ],
        treasure: [
            {
                type: 'bugfix',
                text: '92',
            },
            {
                type: 'bugfix',
                text: '95',
            },
            {
                type: 'appearance',
                text: '105',
            },
            {
                type: 'clarity',
                text: '106',
            }
        ]
    }
}
