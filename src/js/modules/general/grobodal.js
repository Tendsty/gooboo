export default {
    quests: {
        diggingDeeper: {
            reward: 'torch',
            stageLength: 5,
            stages: [
                {note: 'general_1', isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_oreAluminium', operator: '>=', value: 4}
                ]},
                {note: 'general_2', tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 185}
                ]},
                {note: 'general_3', tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 5}
                ]},
                {note: 'general_4', tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_school', operator: '>=', value: 1}
                ]},
                {note: 'general_5', isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 42}
                ]},

                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_oreTin', operator: '>=', value: 4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 485}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 30}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_lostPages', operator: '>=', value: 5}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 75}
                ]},

                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_oreIron', operator: '>=', value: 4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 685}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 60}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_lostPages', operator: '>=', value: 10}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 110}
                ]},

                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_oreTitanium', operator: '>=', value: 4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 935}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 95}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_taxOffice', operator: '>=', value: 3}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 160}
                ]},

                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_orePlatinum', operator: '>=', value: 4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 1185}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 130}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_darkCult', operator: '>=', value: 4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 240}
                ]},

                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_oreIridium', operator: '>=', value: 4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 1435}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_depthDwellerCap0', operator: '>=', value: 170}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_radar', operator: '>=', value: 10}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 325}
                ]},
            ]
        },
        combatTraining: {
            reward: 'purpleHeart',
            stageLength: 6,
            stages: [
                {note: 'general_6', tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 35}
                ]},
                {note: 'general_7', isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'horde', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'horde_totalDamage', operator: '>=', value: 5e9},
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '<=', value: 1}
                ]},
                {note: 'general_8', isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 40},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 0}
                ]},
                {note: 'general_9', tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 48}
                ]},
                {note: 'general_10', tasks: [
                    {type: 'unlock', name: 'villageBuildings4', feature: 'village'}
                ]},
                {note: 'general_11', tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_soulCorrupted', operator: '>=', value: 1e7}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 75}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'horde', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'horde_totalDamage', operator: '>=', value: 5e21},
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '<=', value: 1}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 65},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 0}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 96}
                ]},
                {tasks: [
                    {type: 'unlock', name: 'villageBuildings5', feature: 'village'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_soulCorrupted', operator: '>=', value: 1e14}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 115}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'horde', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'horde_totalDamage', operator: '>=', value: 5e33},
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '<=', value: 1}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 100},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 0}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 144}
                ]},
                {tasks: [
                    {type: 'unlock', name: 'villageBuildings6', feature: 'village'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_soulCorrupted', operator: '>=', value: 1e21}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 165}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'horde', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'horde_totalDamage', operator: '>=', value: 5e45},
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '<=', value: 1}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 145},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 0}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 192}
                ]},
                {tasks: [
                    {type: 'unlock', name: 'villageBuildings7', feature: 'village'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_soulCorrupted', operator: '>=', value: 1e28}
                ]},
            ]
        },
        searchingTheArchives: {
            reward: 'dustyBook',
            stageLength: 3,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'school_goldenDustMax', operator: '>=', value: 1e4},
                    {type: 'stat', subtype: 'total', name: 'school_totalPoints', operator: '>=', value: 3e4},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth0', operator: '>=', value: 85},
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 275},
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 60},
                ]},
                {tasks: [
                    {type: 'unlock', name: 'miningEnhancement', feature: 'mining'}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'school_goldenDustMax', operator: '>=', value: 2e4},
                    {type: 'stat', subtype: 'total', name: 'school_totalPoints', operator: '>=', value: 1.5e5},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth0', operator: '>=', value: 145},
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 550},
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 100},
                ]},
                {tasks: [
                    {type: 'unlock', name: 'miningResin', feature: 'mining'}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'school_goldenDustMax', operator: '>=', value: 3e4},
                    {type: 'stat', subtype: 'total', name: 'school_totalPoints', operator: '>=', value: 5e5},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth0', operator: '>=', value: 225},
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 1000},
                    {type: 'stat', subtype: 'total', name: 'horde_maxZone', operator: '>=', value: 175},
                ]},
                {tasks: [
                    {type: 'unlock', name: 'miningSmoke', feature: 'mining'}
                ]},
            ]
        },
        gardening: {
            reward: 'rottenLeaf',
            unlock: 'farmCropExp',
            stageLength: 5,
            stages: [
                {note: 'general_12', tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'potato', operator: '>=', value: 3}
                ]},
                {note: 'general_13', tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_garden', operator: '>=', value: 20}
                ]},
                {note: 'general_14', tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bestPrestige', operator: '>=', value: 7}
                ]},
                {note: 'general_15', tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 10}
                ]},
                {note: 'general_16', tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'farm_seedBox', operator: '>=', value: 8}
                ]},

                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'potato', operator: '>=', value: 11}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_lake', operator: '>=', value: 20}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bestPrestige', operator: '>=', value: 15}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 25}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'farm_seedBox', operator: '>=', value: 14}
                ]},

                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'potato', operator: '>=', value: 16}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_greenhouse', operator: '>=', value: 10}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bestPrestige', operator: '>=', value: 20}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 40}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'farm_seedBox', operator: '>=', value: 19}
                ]},

                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'potato', operator: '>=', value: 21}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_waterTower', operator: '>=', value: 12}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_bestPrestige', operator: '>=', value: 25}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 55}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'farm_seedBox', operator: '>=', value: 24}
                ]},
            ]
        },
        pitchBlack: {
            reward: 'stonepiercer',
            unlock: 'miningSmeltery',
            stageLength: 4,
            stages: [
                {note: 'general_17', tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_graniteHardening', operator: '>=', value: 6}
                ]},
                {note: 'general_18', isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 85},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 5}
                ]},
                {note: 'general_19', isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'village', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'village_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'village_stone', operator: '>=', value: 5e5}
                ]},
                {note: 'general_20', tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_coalMax', operator: '>=', value: 300}
                ]},

                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_titaniumCache', operator: '>=', value: 5}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 125},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 5}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'village', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'village_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'village_stone', operator: '>=', value: 5e6}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_coalMax', operator: '>=', value: 1500}
                ]},

                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_platinumExpansion', operator: '>=', value: 4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 175},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 5}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'village', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'village_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'village_stone', operator: '>=', value: 5e8}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_coalMax', operator: '>=', value: 6000}
                ]},

                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_iridiumCache', operator: '>=', value: 4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 280},
                    {type: 'stat', subtype: 'current', name: 'mining_craftingCount', operator: '<=', value: 5}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'subfeature', name: 'village', operator: '==', value: 0},
                    {type: 'stat', subtype: 'current', name: 'village_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'village_stone', operator: '>=', value: 5e10}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_coalMax', operator: '>=', value: 1.8e4}
                ]},
            ]
        },
        masterOfTheSystem: {
            reward: 'consolationPrize',
            unlock: 'hordeEquipmentMastery',
            stageLength: 6,
            stages: [
                {note: 'general_21', tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxMastery', operator: '>=', value: 2},
                    {type: 'stat', subtype: 'total', name: 'horde_totalMastery', operator: '>=', value: 18}
                ]},
                {note: 'general_22', tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 12}
                ]},
                {note: 'general_23', tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 525}
                ]},
                {note: 'general_24', tasks: [
                    {type: 'equipmentMastery', name: 'milkCup', operator: '>=', value: 3},
                    {type: 'equipmentMastery', name: 'corruptEye', operator: '>=', value: 2},
                    {type: 'equipmentMastery', name: 'luckyCharm', operator: '>=', value: 1}
                ]},
                {note: 'general_25', tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_offeringMax', operator: '>=', value: 4500}
                ]},
                {note: 'general_26', isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 110},
                    {type: 'stat', subtype: 'current', name: 'horde_maxItems', operator: '<=', value: 1}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxMastery', operator: '>=', value: 7},
                    {type: 'stat', subtype: 'total', name: 'horde_totalMastery', operator: '>=', value: 200}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 30}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 975}
                ]},
                {tasks: [
                    {type: 'equipmentMastery', name: 'glowingEye', operator: '>=', value: 8},
                    {type: 'equipmentMastery', name: 'book', operator: '>=', value: 7},
                    {type: 'equipmentMastery', name: 'spookyPumpkin', operator: '>=', value: 6}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_offeringMax', operator: '>=', value: 9000}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 150},
                    {type: 'stat', subtype: 'current', name: 'horde_maxItems', operator: '<=', value: 1}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxMastery', operator: '>=', value: 12},
                    {type: 'stat', subtype: 'total', name: 'horde_totalMastery', operator: '>=', value: 550}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 50}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 1300}
                ]},
                {tasks: [
                    {type: 'equipmentMastery', name: 'forbiddenHeartShield', operator: '>=', value: 13},
                    {type: 'equipmentMastery', name: 'secretWeapon', operator: '>=', value: 12},
                    {type: 'equipmentMastery', name: 'leechingStaff', operator: '>=', value: 11}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_offeringMax', operator: '>=', value: 1.5e4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 210},
                    {type: 'stat', subtype: 'current', name: 'horde_maxItems', operator: '<=', value: 1}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'horde_maxMastery', operator: '>=', value: 17},
                    {type: 'stat', subtype: 'total', name: 'horde_totalMastery', operator: '>=', value: 1000}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_maxOvergrow', operator: '>=', value: 75}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_maxBuilding', operator: '>=', value: 1600}
                ]},
                {tasks: [
                    {type: 'equipmentMastery', name: 'blazingStaff', operator: '>=', value: 18},
                    {type: 'equipmentMastery', name: 'armor', operator: '>=', value: 17},
                    {type: 'equipmentMastery', name: 'evergrowingVine', operator: '>=', value: 16}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_offeringMax', operator: '>=', value: 2.25e4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 300},
                    {type: 'stat', subtype: 'current', name: 'horde_maxItems', operator: '<=', value: 1}
                ]},
            ]
        },
        thinkPlayerThink: {
            reward: 'prettyLamp',
            unlock: 'galleryAuction',
            stageLength: 5,
            stages: [
                {note: 'general_27', tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_inspirationMax', operator: '>=', value: 12}
                ]},
                {note: 'general_28', tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_greenMax', operator: '>=', value: 1e4}
                ]},
                {note: 'general_29', tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_redDrumMax', operator: '>=', value: 250}
                ]},
                {note: 'general_30', tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_theater', operator: '>=', value: 12}
                ]},
                {note: 'general_31', tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_bestPrestige', operator: '>=', value: 1e11}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_inspirationMax', operator: '>=', value: 30}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_amberMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_redDrumMax', operator: '>=', value: 2.5e4}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_artGallery', operator: '>=', value: 12}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_bestPrestige', operator: '>=', value: 1e23}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_inspirationMax', operator: '>=', value: 60}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_light-blueMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_redDrumMax', operator: '>=', value: 1e5}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_marbleStatue', operator: '>=', value: 10}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_bestPrestige', operator: '>=', value: 1e35}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_inspirationMax', operator: '>=', value: 90}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_limeMax', operator: '>=', value: 1e4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_redDrumMax', operator: '>=', value: 3e5}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_antiquarian', operator: '>=', value: 12}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_bestPrestige', operator: '>=', value: 1e47}
                ]},
            ]
        },
        discoveringTheMystery: {
            reward: 'museumKey',
            unlock: 'farmGeneLevel15',
            stageLength: 7,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_totalMystery', operator: '>=', value: 10}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_obsidian', operator: '>=', value: 1e6}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_mysteryStone', operator: '>=', value: 1}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_joyMax', operator: '>=', value: 2.5e4}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_hexagon', operator: '>=', value: 1e10}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 110},
                    {type: 'cardEquipped', name: 'HO-0042', feature: 'horde', giveCard: true}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_mysteryShape', operator: '>=', value: 1}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_totalMystery', operator: '>=', value: 100}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_obsidian', operator: '>=', value: 1e12}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_mysteryStone', operator: '>=', value: 5}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_joyMax', operator: '>=', value: 2.5e5}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_hexagon', operator: '>=', value: 1e25}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 175},
                    {type: 'cardEquipped', name: 'HO-0042', feature: 'horde'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_mysteryShape', operator: '>=', value: 10}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_totalMystery', operator: '>=', value: 300}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_obsidian', operator: '>=', value: 1e20}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_mysteryStone', operator: '>=', value: 20}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'village_joyMax', operator: '>=', value: 2.5e6}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_hexagon', operator: '>=', value: 1e45}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 260},
                    {type: 'cardEquipped', name: 'HO-0042', feature: 'horde'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_mysteryShape', operator: '>=', value: 100}
                ]},
            ]
        },
        prettyAndPeaceful: {
            reward: 'ribbon',
            unlock: 'galleryCanvas',
            stageLength: 5,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_canvasLevelTotal', operator: '>=', value: 15}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_butterflyMax', operator: '>=', value: 100}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'gallery_red', operator: '>=', value: 1e25}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_deep-orangeMax', operator: '>=', value: 1e7}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'honeymelon', operator: '>=', value: 8}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_canvasLevelTotal', operator: '>=', value: 60}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_butterflyMax', operator: '>=', value: 250}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'gallery_green', operator: '>=', value: 1e25}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_light-greenMax', operator: '>=', value: 1e7}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'sweetPotato', operator: '>=', value: 8}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_canvasLevelTotal', operator: '>=', value: 175}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_butterflyMax', operator: '>=', value: 400}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'gallery_deep-orange', operator: '>=', value: 1e25}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'gallery_light-blueMax', operator: '>=', value: 1e7}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'redwheat', operator: '>=', value: 8}
                ]},
            ]
        },
        doubleTrouble: {
            reward: 'copier',
            unlock: 'miningSmoke',
            stageLength: 6,
            stages: [
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth1', operator: '>=', value: 30}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_vegetable', operator: '>=', value: 6e12},
                    {type: 'stat', subtype: 'total', name: 'farm_flower', operator: '>=', value: 6e12},
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_joyMax', operator: '>=', value: 1000},
                    {type: 'cardEquipped', name: 'VI-0063', feature: 'village', giveCard: true}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'rose', operator: '>=', value: 10},
                    {type: 'cropLevel', subtype: 'total', name: 'daisy', operator: '>=', value: 5},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth1', operator: '>=', value: 22}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_darkCult', operator: '>=', value: 2}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth1', operator: '>=', value: 100}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_vegetable', operator: '>=', value: 6e20},
                    {type: 'stat', subtype: 'total', name: 'farm_flower', operator: '>=', value: 6e20},
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_joyMax', operator: '>=', value: 1e5},
                    {type: 'cardEquipped', name: 'VI-0063', feature: 'village'}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'daisy', operator: '>=', value: 10},
                    {type: 'cropLevel', subtype: 'total', name: 'violet', operator: '>=', value: 5},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth1', operator: '>=', value: 82}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_pyramid', operator: '>=', value: 2}
                ]},

                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'mining_maxDepth1', operator: '>=', value: 180}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_vegetable', operator: '>=', value: 6e28},
                    {type: 'stat', subtype: 'total', name: 'farm_flower', operator: '>=', value: 6e28},
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'village_joyMax', operator: '>=', value: 1e7},
                    {type: 'cardEquipped', name: 'VI-0063', feature: 'village'}
                ]},
                {tasks: [
                    {type: 'cropLevel', subtype: 'total', name: 'violet', operator: '>=', value: 10},
                    {type: 'cropLevel', subtype: 'total', name: 'sunflower', operator: '>=', value: 5},
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_timeSpent', operator: '<=', value: 900},
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth1', operator: '>=', value: 142}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_antiquarian', operator: '>=', value: 12}
                ]},
            ]
        },
        allIn: {
            reward: 'deckOfCards',
            unlock: 'villageSpecialIngredient',
            stageLength: 6,
            stages: [
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_chalkboard', operator: '>=', value: 5}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_glassBin', operator: '>=', value: 1}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 150},
                    {type: 'cardEquipped', name: 'HO-0043', feature: 'horde', giveCard: true}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_grassMax', operator: '>=', value: 1e4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_beauty', operator: '>=', value: 1e65},
                    {type: 'cardEquipped', name: 'GA-0039', feature: 'gallery', giveCard: true}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 240},
                    {type: 'cardEquipped', name: 'MI-0059', feature: 'mining', giveCard: true}
                ]},

                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'mining_matches', operator: '>=', value: 10}
                ]},
                {tasks: [
                    {type: 'upgrade', subtype: 'total', name: 'village_gemBin', operator: '>=', value: 3}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'horde_maxZone', operator: '>=', value: 240},
                    {type: 'cardEquipped', name: 'HO-0043', feature: 'horde'}
                ]},
                {tasks: [
                    {type: 'stat', subtype: 'total', name: 'farm_grassMax', operator: '>=', value: 2e4}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'gallery_beauty', operator: '>=', value: 1e100},
                    {type: 'cardEquipped', name: 'GA-0039', feature: 'gallery'}
                ]},
                {isChallenge: true, tasks: [
                    {type: 'stat', subtype: 'current', name: 'mining_maxDepth0', operator: '>=', value: 325},
                    {type: 'cardEquipped', name: 'MI-0059', feature: 'mining'}
                ]},
            ]
        },
    }
}
