export default {
    unlock: 'generalOrladeeSubfeature',
    quests: {
        beautyOfThisWorld: {
            reward: 'chessboard',
            stages: [
                {note: 'general_32', tasks: [
                    {type: 'stat', subtype: 'current', name: 'farm_bugMax', operator: '>=', value: 250},
                    {type: 'stat', subtype: 'current', name: 'farm_ladybugMax', operator: '>=', value: 250},
                    {type: 'stat', subtype: 'current', name: 'farm_butterflyMax', operator: '>=', value: 50}
                ]},
                {note: 'general_33', tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_redDrumMax', operator: '>=', value: 1200}
                ]},
            ]
        }
    }
}
