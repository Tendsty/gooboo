export default {
    unlock: 'generalOrladeeSubfeature',
    quests: {
        beautyOfThisWorld: {
            reward: 'chessboard',
            stageLength: 6,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bugMax', operator: '>=', value: 2500},
                    {type: 'stat', subtype: 'total', name: 'farm_ladybugMax', operator: '>=', value: 4000},
                    {type: 'stat', subtype: 'total', name: 'farm_butterflyMax', operator: '>=', value: 280}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_redDrumMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'equipmentMastery', name: 'shatteredGem', operator: '>=', value: 8}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_marbleStatue', operator: '>=', value: 1}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_mysticalShardMax', operator: '>=', value: 250}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 225}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bugMax', operator: '>=', value: 4000},
                    {type: 'stat', subtype: 'total', name: 'farm_ladybugMax', operator: '>=', value: 6000},
                    {type: 'stat', subtype: 'total', name: 'farm_butterflyMax', operator: '>=', value: 450}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_yellowDrumMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'equipmentMastery', name: 'prism', operator: '>=', value: 8}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_trophyCase', operator: '>=', value: 5}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_mysticalShardMax', operator: '>=', value: 500}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 330}
                ]},
            ]
        },
        colorVariety: {
            reward: 'iridiscentFlower',
            stageLength: 5,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_marble', operator: '>=', value: 1e7}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_flower', operator: '>=', value: 1e21}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_bone', operator: '>=', value: 1e110}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_gem', operator: '>=', value: 1e12}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_petalMax', operator: '>=', value: 2000}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_marble', operator: '>=', value: 1e9}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_flower', operator: '>=', value: 1e31}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_bone', operator: '>=', value: 1e180}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_gem', operator: '>=', value: 1e16}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_petalMax', operator: '>=', value: 4000}
                ]},
            ]
        },
        fieldTesting: {
            reward: 'scienceBook',
            unlock: 'hordeClassesSubfeature',
            stageLength: 7,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_blood', operator: '>=', value: 3.5e9}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_neonMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_canvasLevelTotal', operator: '>=', value: 100}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_circle', operator: '>=', value: 8e15}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_obsidian', operator: '>=', value: 4e11}
                ]},
                {tasks: [
                    {type: 'unlock', name: 'hordeAreaMonkeyJungle', feature: 'horde'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_barIridium', operator: '>=', value: 1}
                ]},
            ]
        },
        shiningBright: {
            reward: 'hugeDiamond',
            unlock: 'hordeMonsterToothWarzone',
            stageLength: 4,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_monsterToothWarzoneMax', operator: '>=', value: 25}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_gemBin', operator: '>=', value: 1}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_barShinyMax', operator: '>=', value: 150}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_light-blue', operator: '>=', value: 1}
                ]},
            ]
        }
    }
}
