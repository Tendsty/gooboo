import { buildNum } from "../../utils/format";

export default {
    quests: {
        diggingDeeper: {
            reward: 'torch',
            stages: [
                {note: 'general_1', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 1800},
                    {type: 'stat', subtype: 'current', name: 'mining_oreAluminium', operator: '>=', value: 25}
                ]},
                {note: 'general_2', tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_maxBuilding', operator: '>=', value: 200}
                ]},
                {note: 'general_3', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_depthDwellerCap0', operator: '>=', value: 5}
                ]},
                {note: 'general_4', tasks: [
                    {type: 'upgrade', subtype: 'current', name: 'village_school', operator: '>=', value: 1}
                ]},
                {note: 'general_5', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_scrap', operator: '>=', value: buildNum(10, 'B')}
                ]},
            ]
        },
        combatTraining: {
            reward: 'purpleHeart',
            stages: [
                {note: 'general_6', tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 35}
                ]},
                {note: 'general_7', tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_totalDamage', operator: '>=', value: buildNum(5, 'B')},
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '<=', value: 1}
                ]},
                {note: 'general_8', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 40},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 0}
                ]},
                {note: 'general_9', tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 48}
                ]},
                {note: 'general_10', tasks: [
                    {type: 'unlock', name: 'villageBuildings4', feature: 'village'}
                ]},
                {note: 'general_11', tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_soulCorrupted', operator: '>=', value: buildNum(10, 'M')}
                ]},
            ]
        },
        gardening: {
            reward: 'rottenLeaf',
            unlock: 'farmCropExp',
            stages: [
                {note: 'general_12', tasks: [
                    {type: 'cropLevel', subtype: 'current', name: 'potato', operator: '>=', value: 1}
                ]},
                {note: 'general_13', tasks: [
                    {type: 'upgrade', subtype: 'current', name: 'village_garden', operator: '>=', value: 20}
                ]},
                {note: 'general_14', tasks: [
                    {type: 'stat', subtype: 'current', name: 'farm_bestPrestige', operator: '>=', value: 7}
                ]},
                {note: 'general_15', tasks: [
                    {type: 'stat', subtype: 'current', name: 'farm_maxOvergrow', operator: '>=', value: 7}
                ]},
                {note: 'general_16', tasks: [
                    {type: 'upgrade', subtype: 'current', name: 'farm_seedBox', operator: '>=', value: 7}
                ]},
            ]
        },
        pitchBlack: {
            reward: 'stonepiercer',
            unlock: 'miningSmeltery',
            stages: [
                {note: 'general_17', tasks: [
                    {type: 'upgrade', subtype: 'current', name: 'mining_graniteHardening', operator: '>=', value: 6}
                ]},
                {note: 'general_18', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 95},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 5}
                ]},
                {note: 'general_19', tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'village_stone', operator: '>=', value: buildNum(500, 'K')}
                ]},
                {note: 'general_20', tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_coalMax', operator: '>=', value: 30}
                ]},
            ]
        },
        masterOfTheSystem: {
            reward: 'consolationPrize',
            unlock: 'hordeItemMastery',
            stages: [
                {note: 'general_21', tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxMastery', operator: '>=', value: 2},
                    {type: 'stat', subtype: 'total', name: 'horde_totalMastery', operator: '>=', value: 18}
                ]},
                {note: 'general_22', tasks: [
                    {type: 'stat', subtype: 'current', name: 'farm_maxOvergrow', operator: '>=', value: 15}
                ]},
                {note: 'general_23', tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_maxBuilding', operator: '>=', value: 575}
                ]},
                {note: 'general_24', tasks: [
                    {type: 'equipmentMastery', name: 'milkCup', operator: '>=', value: 3},
                    {type: 'equipmentMastery', name: 'corruptEye', operator: '>=', value: 2},
                    {type: 'equipmentMastery', name: 'luckyCharm', operator: '>=', value: 1}
                ]},
                {note: 'general_25', tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_offeringMax', operator: '>=', value: 4500}
                ]},
                {note: 'general_26', tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 110},
                    {type: 'stat', subtype: 'current', name: 'horde_maxItems', operator: '<=', value: 1}
                ]},
            ]
        },
        thinkPlayerThink: {
            reward: 'prettyLamp',
            unlock: 'galleryAuction',
            stages: [
                {note: 'general_27', tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_inspirationMax', operator: '>=', value: 12}
                ]},
                {note: 'general_28', tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_greenMax', operator: '>=', value: buildNum(10, 'K')}
                ]},
                {note: 'general_29', tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_redDrumMax', operator: '>=', value: 250}
                ]},
                {note: 'general_30', tasks: [
                    {type: 'upgrade', subtype: 'current', name: 'village_theater', operator: '>=', value: 12}
                ]},
                {note: 'general_31', tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_bestPrestige', operator: '>=', value: buildNum(100, 'K')}
                ]},
            ]
        }
    }
}
