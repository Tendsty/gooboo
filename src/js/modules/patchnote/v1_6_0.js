export default {
    day: '2025-11-03',
    content: {
        meta: [
            {
                type: 'appearance',
                text: '443'
            },
            {
                type: 'clarity',
                text: '448'
            },
            {
                type: 'appearance',
                text: '495',
                issue: '59'
            },
            {
                type: 'appearance',
                text: '497'
            },
            {
                type: 'appearance',
                text: '507'
            },
            {
                type: 'appearance',
                text: '515'
            },
            {
                type: 'clarity',
                text: '518'
            },
            {
                type: 'clarity',
                text: '519'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'balance',
                text: '623'
            },
            {
                unlock: 'miningGasSubfeature',
                type: 'bugfix',
                text: '630'
            },
        ],
        mining: [
            {
                type: 'new',
                text: 'addedUpgrade',
                params: [14]
            },
            {
                unlock: 'miningDepthDweller',
                type: 'new',
                text: 'addedPrestigeUpgrade',
                params: [2]
            },
            {
                unlock: 'achievementFeature',
                type: 'new',
                text: 'addedAchievement',
                params: [1]
            },
            {
                unlock: 'achievementFeature',
                type: 'remove',
                text: 'removedAchievement',
                params: [1]
            },
            {
                unlock: 'cardFeature',
                type: 'balance',
                text: 'miningPrestigeIncome',
                textType: 'mult',
                textPer: 'cardPower',
                balance: 'nerf',
                before: 'x1.05',
                after: 'x1.02'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_drillFuel',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '30'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_oreShelf',
                content: [
                    {
                        text: 'mining_oreTin',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1'
                    },
                    {
                        text: 'miningOreCap',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_furnace',
                content: [
                    {
                        text: 'miningOreGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.05x',
                        after: '+0.04x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_ironCache',
                content: [
                    {
                        text: 'mining_oreIron',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1',
                        after: '+2'
                    },
                    {
                        text: 'miningOreQuality',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.2'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'buff',
                        before: '3',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_oreWashing',
                content: [
                    {
                        text: 'miningOreQuality',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.05'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_masterForge',
                content: [
                    {
                        text: 'miningDamage',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'change',
                        before: '+0.15x',
                        after: 'x1.12'
                    },
                    {
                        text: 'miningToughness',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '/1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_starForge',
                content: [
                    {
                        text: 'mining_crystalGreen',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'change',
                        before: '+0.075x',
                        after: 'x1.06'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_warehouse',
                content: [
                    {
                        text: 'miningOreCap',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x4096',
                        after: 'x8'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_corrosiveFumes',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'buff',
                        before: '6',
                        after: '15'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_gunpowder',
                content: [
                    {
                        text: 'miningDamage',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.15'
                    },
                    {
                        text: 'mining_scrap',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.15',
                        after: '+0.1x'
                    },
                    {
                        text: 'miningToughness',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '/1.15',
                        after: '/1.25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_metalDetector',
                content: [
                    {
                        text: 'mining_scrap',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.1',
                        after: 'x1.08'
                    },
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.3',
                        after: 'x1.25'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'buff',
                        before: '12',
                        after: '14'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_scanning',
                content: [
                    {
                        text: 'miningOreGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.18'
                    },
                    {
                        text: 'miningRareEarthGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_titaniumForge',
                content: [
                    {
                        text: 'miningPickaxeCraftingPower',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.17',
                        after: 'x1.1'
                    },
                    {
                        text: 'mining_oreTitanium',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1x',
                        after: '+0.25x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_platinumExpansion',
                content: [
                    {
                        text: 'mining_oreTitanium',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.5',
                        after: 'x2'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        before: '5',
                        after: '4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_colossalOreStorage',
                content: [
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x3'
                    },
                    {
                        text: 'miningOreCap',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x100',
                        after: 'x3'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_undergroundRadar',
                content: [
                    {
                        text: 'miningRareEarthGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.13'
                    },
                    {
                        text: 'miningDepthDwellerSpeed',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.05x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_iridiumExpansion',
                content: [
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.11',
                        after: '+0.05x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_iridiumTreetap',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_iridiumBombs',
                content: [
                    {
                        text: 'miningDamage',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.23',
                        after: '+0.1x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_osmiumExpansion',
                content: [
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: '+0.2x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_darkBombs',
                content: [
                    {
                        text: 'miningDamage',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.55',
                        after: '+0.05x'
                    },
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.75',
                        after: '+0.1x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        before: '10',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_leadExpansion',
                content: [
                    {
                        text: 'miningOreCap',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.2x',
                        after: '+0.05x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'buff',
                        before: '5',
                        after: '8'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'MI-0019',
                content: [
                    {
                        text: 'miningDepthDwellerSpeed',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.3'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'MI-0021',
                content: [
                    {
                        text: 'miningDepthDwellerSpeed',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.5',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'MI-0025',
                content: [
                    {
                        text: 'miningDepthDwellerSpeed',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.1',
                        after: 'x1.15'
                    },
                ],
            },
            {
                unlock: 'miningDepthDweller',
                type: 'balance',
                text: '558',
                balance: 'buff',
                before: '16',
                after: '20'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'balance',
                text: '559',
                balance: 'nerf',
                before: '+0.25x',
                after: '+0.2x'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'balance',
                text: '561'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalDrill',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        before: '90',
                        after: '53'
                    },
                    {text: '562'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalExplosives',
                content: [
                    {text: '563'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalTreetap',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalBottle',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalEngine',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '50'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalCoal',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalTruck',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalExpansion',
                content: [
                    {
                        text: 'miningOreCap',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1000',
                        after: 'x10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalNiter',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                unlock: 'miningPickaxeCrafting',
                type: 'qol',
                text: '483'
            },
            {
                unlock: 'miningSmeltery',
                type: 'change',
                text: '488'
            },
            {
                unlock: 'miningSmeltery',
                type: 'new',
                text: '489'
            },
            {
                unlock: 'miningGasSubfeature',
                type: 'new',
                text: '490'
            },
            {
                unlock: 'miningEnhancement',
                type: 'change',
                text: '484'
            },
            {
                unlock: 'miningEnhancement',
                type: 'new',
                text: '485'
            },
            {
                unlock: 'miningEnhancement',
                type: 'change',
                text: '486'
            },
            {
                unlock: 'miningEnhancement',
                type: 'balance',
                text: '487'
            },
            {
                unlock: 'miningEnhancement',
                type: 'new',
                text: '491'
            },
            {
                unlock: 'miningEnhancement',
                type: 'clarity',
                text: '492'
            },
            {
                unlock: 'miningResin',
                type: 'new',
                text: '493'
            },
            {
                type: 'qol',
                text: '496',
                issue: '58'
            },
            {
                unlock: 'miningEnhancement',
                type: 'qol',
                text: '591'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'context',
                text: '635'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'balance',
                text: '624'
            },
        ],
        gem: [
            {
                unlock: 'achievementFeature',
                type: 'balance',
                text: '531',
                balance: 'nerf',
                before: '+1%',
                after: '+0.5%'
            },
            {
                unlock: 'gemDiamond',
                type: 'new',
                text: '453'
            },
        ],
        village: [
            {
                unlock: 'villageOffering1',
                type: 'change',
                text: '516'
            },
            {
                unlock: 'villageOffering1',
                type: 'new',
                text: '517'
            },
            {
                unlock: 'cardFeature',
                type: 'balance',
                text: 'villagePrestigeIncome',
                textType: 'mult',
                textPer: 'cardPower',
                balance: 'nerf',
                before: 'x1.05',
                after: 'x1.02'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_cemetery',
                content: [
                    {
                        text: 'villageOfferingPower',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.5x',
                        after: '+0.4x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_pyramid',
                content: [
                    {
                        text: 'villageLootQuality',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+2',
                        after: '+5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_ambition',
                content: [
                    {
                        text: 'villageLootQuality',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+3',
                        after: '+1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_monk',
                content: [
                    {
                        text: 'village_knowledge',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.2x',
                        after: '+0.05x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_holyLab',
                content: [
                    {
                        text: 'village_science',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.2x',
                        after: '+0.05x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'village_charity',
                content: [
                    {
                        text: 'village_joy',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.2x',
                        after: '+0.05x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'VI-0034',
                content: [
                    {
                        text: 'villageWorker',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.1',
                        after: 'x1.05'
                    },
                ],
            },
        ],
        achievement: [
            {
                type: 'new',
                text: '535'
            },
        ],
        school: [
            {
                unlock: 'schoolArtSubfeature',
                type: 'balance',
                text: '498'
            },
            {
                type: 'balance',
                text: '499'
            },
            {
                type: 'change',
                text: '500'
            },
            {
                type: 'change',
                text: '504'
            },
            {
                type: 'change',
                text: '633'
            },
            {
                type: 'balance',
                text: '634',
                balance: 'buff',
                before: '35',
                after: '20'
            },
            {
                unlock: 'schoolHistorySubfeature',
                type: 'change',
                text: '506'
            },
            {
                type: 'new',
                text: '508'
            },
            {
                unlock: 'schoolLibrarySubfeature',
                type: 'context',
                text: '636'
            },
            {
                unlock: 'schoolLibrarySubfeature',
                type: 'change',
                text: '501'
            },
            {
                unlock: 'schoolLibrarySubfeature',
                type: 'change',
                text: '502'
            },
            {
                unlock: 'schoolLibrarySubfeature',
                type: 'change',
                text: '503'
            },
            {
                unlock: 'schoolChemistrySubfeature',
                type: 'new',
                text: '505'
            },
        ],
        relic: [
            {
                type: 'new',
                text: '454'
            },
            {
                unlock: 'relicMuseum',
                type: 'new',
                text: '455'
            },
        ],
        horde: [
            {
                unlock: 'hordeEquipment',
                type: 'new',
                text: 'addedHordeEquipment',
                params: [16]
            },
            {
                type: 'new',
                text: 'addedHordeTower',
                params: [1]
            },
            {
                type: 'new',
                text: 'addedUpgrade',
                params: [13]
            },
            {
                unlock: 'hordePrestige',
                type: 'new',
                text: 'addedPrestigeUpgrade',
                params: [7]
            },
            {
                unlock: 'hordeForestTower',
                type: 'new',
                text: '461'
            },
            {
                unlock: 'hordePrestige',
                type: 'change',
                text: '462'
            },
            {
                unlock: 'hordePrestige',
                type: 'change',
                text: '599'
            },
            {
                unlock: 'hordePrestige',
                type: 'balance',
                text: '609'
            },
            {
                unlock: 'hordePrestige',
                type: 'balance',
                text: '610'
            },
            {
                unlock: 'hordePrestige',
                type: 'balance',
                text: '84',
                balance: 'nerf',
                before: 'x1.16',
                after: 'x1.1'
            },
            {
                unlock: 'hordeRaidboss',
                type: 'context',
                text: '637'
            },
            {
                unlock: 'hordeRaidboss',
                type: 'new',
                text: '463'
            },
            {
                unlock: 'hordeRaidboss',
                type: 'new',
                text: '471'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_anger',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.18',
                        after: 'x1.2'
                    },
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_luckyStrike',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.14',
                        after: 'x1.19'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_hoarding',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.08',
                        after: 'x1.12'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_thickSkin',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.08',
                        after: 'x1.12'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.17',
                        after: 'x1.22'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_stabbingGuide',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.46',
                        after: 'x1.48'
                    },
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_targetDummy',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '100'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_milestone',
                content: [
                    {
                        text: 'horde_bone',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_strangePower',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.25'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.25'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_collector',
                content: [
                    {
                        text: 'horde_bone',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.65',
                        after: 'x1.35'
                    },
                    {
                        text: 'horde_bone',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.85',
                        after: 'x1.5'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_butcher',
                content: [
                    {
                        text: 'hordeBossRequirement',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '-1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_beginnerLuck',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.08x',
                        after: '+0.05x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_advancedLuck',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_soulCage',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.05x',
                        after: '+0.04x'
                    },
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'change',
                        before: 'x1.4',
                        after: 'x1.43 - x1.31'
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
                        balance: 'nerf',
                        before: 'x1.03',
                        after: 'x1.02'
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
                        balance: 'nerf',
                        before: 'x1.075',
                        after: 'x1.05'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_spiritLure',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.08x',
                        after: '+0.06x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_mysticalCondenser',
                content: [
                    {
                        text: 'horde_mysticalShard',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1',
                        after: '+2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_royalSecret',
                content: [
                    {
                        text: 'horde_mysticalShard',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1',
                        after: '+2'
                    },
                ],
            },
            {
                unlock: 'cardFeature',
                type: 'balance',
                text: 'hordePrestigeIncome',
                textType: 'mult',
                textPer: 'cardPower',
                balance: 'nerf',
                before: 'x1.05',
                after: 'x1.02'
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0010',
                content: [
                    {
                        text: 'cardPower',
                        balance: 'nerf',
                        before: '2',
                        after: '0'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0031',
                content: [
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'change',
                        before: '/1.1',
                        after: '-30%'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0032',
                content: [
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'change',
                        before: '/1.05',
                        after: '-15%'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0033',
                content: [
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0034',
                content: [
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+15%'
                    },
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0035',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.3'
                    },
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyCap',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.3'
                    },
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0036',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x2',
                        after: 'x1.25'
                    },
                    {
                        text: 'hordeRevive',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+1'
                    },
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0037',
                content: [
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'change',
                subtype: 'card',
                name: 'HO-0038',
                content: [{text: '593'}],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0039',
                content: [
                    {
                        text: 'hordeFirstStrike',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+675%'
                    },
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'HO-0040',
                content: [
                    {
                        text: 'hordeCorruption',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.15',
                        after: 'x1.1'
                    }
                ],
            },
            {
                type: 'change',
                subtype: 'card',
                name: 'HO-0041',
                content: [{text: '594'}],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'dagger',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+4',
                        after: '+5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'shirt',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+800',
                        after: '+1000'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'starShield',
                content: [
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+3',
                        after: '+10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'longsword',
                content: [
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+30%',
                        after: '+20%'
                    },
                    {
                        text: 'hordeCritMult',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+25%',
                        after: '+30%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'boots',
                content: [
                    {
                        text: 'hordeFirstStrike',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+250%',
                        after: '+300%'
                    },
                    {
                        text: 'hordeFirstStrike',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+10%',
                        after: '+15%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'clover',
                content: [
                    {
                        text: 'hordeEquipmentChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.75',
                        after: 'x1.1'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'fireOrb',
                content: [
                    {
                        text: 'hordeCritMult',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+40%',
                        after: '+45%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'campfire',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+500',
                        after: '+600'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'snowflake',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+800',
                        after: '+900'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'wizardHat',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+3',
                        after: '+4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'redStaff',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+3',
                        after: '+5'
                    },
                    {
                        text: 'hordeFirstStrike',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+75%'
                    },
                    {
                        text: 'hordeFirstStrike',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+5%'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'marblePillar',
                content: [
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+2',
                        after: '+8'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'toxicSword',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+140',
                        after: '+84'
                    },
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+10',
                        after: '+8'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'mailbreaker',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+20',
                        after: '+24'
                    },
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+2',
                        after: '+3'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'club',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.01x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'forbiddenSword',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35'
                    },
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+25%',
                        after: '+10%'
                    },
                    {
                        text: 'hordeCritMult',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+40%',
                        after: '+10%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'antidote',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+600',
                        after: '+750'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'forbiddenShield',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'dangerShield',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+400',
                        after: '+450'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'experimentalVaccine',
                content: [
                    {
                        text: '621',
                        issue: '92'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'moltenShield',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.3'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+2000'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+1000'
                    },
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+15'
                    },
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'book',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/2'
                    },
                    {
                        text: 'hordeEquipmentMasteryGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.06'
                    },
                    {
                        text: 'hordeEquipmentMasteryGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.03x'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'chocolateMilk',
                content: [
                    {
                        text: 'horde_bone',
                        textType: 'currencyGain',
                        balance: 'nerf',
                        before: 'x1.3',
                        after: 'x1.1'
                    },
                    {
                        text: 'horde_monsterPart',
                        textType: 'currencyGain',
                        balance: 'buff',
                        before: '/1.5'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'bigHammer',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.25',
                        after: '/1.2'
                    },
                    {
                        text: 'hordeCritMult',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+110%',
                        after: '+70%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'strangeChemical',
                content: [
                    {
                        text: 'horde_monsterPart',
                        textType: 'currencyGain',
                        balance: 'nerf',
                        before: 'x1.3',
                        after: 'x1.1'
                    },
                    {
                        text: 'horde_bone',
                        textType: 'currencyGain',
                        balance: 'buff',
                        before: '/4'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'forbiddenHeartShield',
                content: [
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+36',
                        after: '+30'
                    },
                    {
                        text: 'hordeStatusResist',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+12',
                        after: '+6'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'cloudStaff',
                content: [
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+2',
                        after: '+5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'leechingStaff',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+115',
                        after: '+120'
                    },
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+3',
                        after: '+4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'shatteredGem',
                content: [
                    {
                        text: 'hordeHeirloomChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+1%',
                        after: '+0.5%'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/2'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'hourglass',
                content: [
                    {
                        text: 'hordeHaste',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+15',
                        after: '+30'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'firework',
                content: [
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+20%',
                        after: '+15%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'bowTie',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+9000',
                        after: '+9600'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+400',
                        after: '+550'
                    },
                    {
                        text: 'hordeDivisionShield',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+11',
                        after: '+30'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'mysticalAccelerator',
                content: [
                    {
                        text: 'hordeShardChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.5',
                        after: 'x1.1'
                    },
                    {
                        text: 'hordeShardChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.05x'
                    },
                    {text: '596'},
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'armor',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+11200',
                        after: '+12500'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+400',
                        after: '+500'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'energyDrink',
                content: [
                    {
                        text: 'hordeHaste',
                        textType: 'mult',
                        balance: 'change',
                        before: 'x1.5',
                        after: '+60'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'prism',
                content: [
                    {
                        text: 'horde_mysticalShard',
                        textType: 'currencyCap',
                        balance: 'buff',
                        before: '+1',
                        after: '+26'
                    },
                    {
                        text: 'horde_mysticalShard',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1',
                        after: '+2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'mine',
                content: [
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+50%',
                        after: '+20%'
                    },
                    {
                        text: '597',
                        balance: 'buff',
                        before: '30%',
                        after: '40%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'equipment',
                name: 'maskOfJoy',
                content: [
                    {
                        text: 'hordeCritChance',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+15%',
                        after: '+30%'
                    },
                    {
                        text: '598',
                        balance: 'buff',
                        before: '10%',
                        after: '25%'
                    }
                ],
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '595'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '464'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: 'hordeCritMult',
                textType: 'mult',
                balance: 'change',
                before: '+50%',
                after: '+75%'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '465'
            },
            {
                unlock: 'hordeEquipment',
                type: 'change',
                text: '617'
            },
            {
                unlock: 'hordePrestige',
                type: 'bugfix',
                text: '466'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '467',
                balance: 'nerf',
                before: '100%',
                after: '25%'
            },
            {
                unlock: 'hordeEquipmentMastery',
                type: 'balance',
                text: '468'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '469',
                balance: 'buff',
                before: '5%',
                after: '100%'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '470',
                balance: 'nerf',
                before: '1x',
                after: '10x'
            },
            {
                unlock: 'hordeHeirlooms',
                type: 'balance',
                text: '472',
                balance: 'nerf',
                before: '3x',
                after: '2x'
            },
            {
                unlock: 'hordeHeirlooms',
                type: 'clarity',
                text: '473'
            },
            {
                unlock: 'hordeFireTower',
                type: 'bugfix',
                text: '474'
            },
            {
                unlock: 'hordeHeirlooms',
                type: 'balance',
                text: '475'
            },
            {
                unlock: 'hordeEquipmentMastery',
                type: 'balance',
                text: '523',
                balance: 'change',
                before: '5 (+2)',
                after: '3 (+3)'
            },
            {
                type: 'balance',
                text: '524',
                balance: 'nerf',
                before: 'x1.5',
                after: 'x2'
            },
            {
                type: 'balance',
                text: '525'
            },
            {
                type: 'bugfix',
                text: '526'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '527'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '528'
            },
            {
                unlock: 'hordeEquipment',
                type: 'balance',
                text: '529',
                balance: 'buff',
                before: '5%',
                after: '10%'
            },
            {
                unlock: 'hordeBrickTower',
                type: 'balance',
                text: '344',
                balance: 'nerf',
                before: 'x1.02',
                after: 'x1.008'
            },
            {
                unlock: 'hordeSacrifice',
                type: 'balance',
                text: '615'
            },
            {
                unlock: 'hordeCorruptedFlesh',
                type: 'balance',
                text: '616'
            },
        ],
        card: [
            {
                unlock: 'cardShiny',
                type: 'new',
                text: '444'
            },
            {
                type: 'new',
                text: 'addedCard',
                params: [103]
            },
            {
                type: 'new',
                text: 'addedCardPack',
                params: [12]
            },
            {
                type: 'qol',
                text: '445'
            },
            {
                type: 'qol',
                text: '446'
            },
            {
                type: 'qol',
                text: '482'
            },
            {
                unlock: 'eventFeature',
                type: 'balance',
                text: '585',
                balance: 'buff',
                before: '20',
                after: '50'
            },
            {
                unlock: 'eventFeature',
                type: 'balance',
                text: '539',
                balance: 'buff',
                before: '5',
                after: '10'
            },
            {
                unlock: 'eventFeature',
                type: 'balance',
                text: '540',
                balance: 'buff',
                before: '50',
                after: '150'
            },
            {
                unlock: 'eventFeature',
                type: 'balance',
                text: '541'
            },
            {
                unlock: 'farmAdvancedCardPack',
                type: 'balance',
                text: '628',
                balance: 'buff',
                before: '90',
                after: '70'
            },
            {
                unlock: 'farmLuxuryCardPack',
                type: 'balance',
                text: '629',
                balance: 'buff',
                before: '200',
                after: '130'
            },
        ],
        general: [
            {
                type: 'new',
                text: '456'
            },
            {
                type: 'new',
                text: 'addedQuestline',
                params: [9]
            },
            {
                unlock: 'generalOrladeeSubfeature',
                type: 'new',
                text: '457'
            },
            {
                type: 'clarity',
                text: '458'
            },
            {
                type: 'qol',
                text: '480'
            },
            {
                type: 'clarity',
                text: '587'
            },
        ],
        farm: [
            {
                type: 'new',
                text: 'addedCrop',
                params: [14]
            },
            {
                type: 'new',
                text: 'addedFertilizer',
                params: [5]
            },
            {
                type: 'new',
                text: 'addedAchievement',
                params: [1]
            },
            {
                type: 'new',
                text: 'addedRelic',
                params: [1]
            },
            {
                type: 'remove',
                text: 'removedRelic',
                params: [2]
            },
            {
                type: 'new',
                text: 'addedUpgrade',
                params: [23]
            },
            {
                type: 'clarity',
                text: '449'
            },
            {
                type: 'qol',
                text: '622'
            },
            {
                type: 'balance',
                text: '618',
                balance: 'nerf',
                before: '/12',
                after: '/10'
            },
            {
                type: 'balance',
                text: '619',
                balance: 'nerf',
                before: '/8',
                after: '/10'
            },
            {
                unlock: 'farmDisableEarlyGame',
                type: 'balance',
                text: '450',
                balance: 'nerf',
                before: 'x2',
                after: 'x1.5'
            },
            {
                unlock: 'farmCare',
                type: 'new',
                text: '451'
            },
            {
                type: 'new',
                text: '452'
            },
            {
                unlock: 'eventFeature',
                type: 'remove',
                text: '538',
            },
            {
                unlock: 'eventFeature',
                type: 'new',
                text: '549',
            },
            {
                unlock: 'farmCropExp',
                type: 'context',
                text: '638'
            },
            {
                type: 'change',
                text: '550'
            },
            {
                type: 'new',
                text: '551'
            },
            {
                unlock: 'farmLuxuryCardPack',
                type: 'remove',
                text: '552'
            },
            {
                type: 'balance',
                text: 'farmCropGain',
                textType: 'mult',
                textPer: 'cardPower',
                balance: 'nerf',
                before: 'x1.08',
                after: 'x1.06'
            },
            {
                unlock: 'farmCropExp',
                type: 'balance',
                text: 'farmExperience',
                textType: 'mult',
                textPer: 'cardPower',
                balance: 'nerf',
                before: '+0.08',
                after: '+0.05'
            },
            {
                type: 'balance',
                text: '571'
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0003',
                content: [
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.15',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0006',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0007',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0008',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0009',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.35',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0010',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: 'x1.1',
                        after: 'x1.15'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0011',
                content: [
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.25',
                        after: 'x1.15'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0014',
                before: {rareDrop: [{name: 'farm_grass', type: 'currency', value: 4, chance: 0.2, mult: 0.4}]},
                after: {rareDrop: [{name: 'farm_grass', type: 'currency', value: 4, chance: 0.4, mult: 0.4}]},
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0015',
                content: [
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.1',
                        after: 'x1.06'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'card',
                name: 'FA-0023',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '+175%',
                        after: '+75%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'carrot',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '40',
                        after: '130'
                    },
                ],
                before: {rareDrop: [null]},
                after: {rareDrop: [{name: 'farm_oldRoot', type: 'currency', chance: -1, value: 5}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'blueberry',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '70',
                        after: '250'
                    },
                ],
                before: {rareDrop: [null]},
                after: {rareDrop: [{name: 'farm_oldRoot', type: 'currency', chance: -1, value: 9}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'wheat',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '120',
                        after: '480'
                    },
                ],
                before: {rareDrop: [null]},
                after: {rareDrop: [{name: 'farm_oldRoot', type: 'currency', chance: -1, value: 16}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'tulip',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '200',
                        after: '850'
                    },
                ],
                before: {rareDrop: [null]},
                after: {rareDrop: [{name: 'farm_oldRoot', type: 'currency', chance: -1, value: 28}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'potato',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '640',
                        after: '1600'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'raspberry',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '300',
                        after: '680'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'barley',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '230',
                        after: '1050'
                    },
                ],
                before: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: 0.06, value: 1}]},
                after: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: 0.18, value: 10}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'dandelion',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '160',
                        after: '230'
                    },
                ],
                before: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: 0.15, value: 2}]},
                after: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: 0.15, value: 1}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'corn',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '550',
                        after: '2600'
                    },
                ],
                before: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: 0.02, value: 2}]},
                after: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: 0.12, value: 15}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'watermelon',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '1100',
                        after: '1250'
                    },
                ],
                before: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: 0.1, value: 10}]},
                after: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: 0.1, value: 6}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'rice',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '1200',
                        after: '2200'
                    },
                ],
                before: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: 0.05, value: 12}, {name: 'farm_ladybug', type: 'currency', chance: -0.05, value: 4}]},
                after: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: 0.05, value: 24}, {name: 'farm_ladybug', type: 'currency', chance: -0.05, value: 12}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'rose',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '4500',
                        after: '3500'
                    },
                ],
                before: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: 0, value: 12}, {name: 'farm_ladybug', type: 'currency', chance: -0.08, value: 10}]},
                after: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: 0, value: 32}, {name: 'farm_ladybug', type: 'currency', chance: -0.08, value: 24}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'leek',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '780',
                        after: '490'
                    },
                ],
                before: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.1, value: 3}, {name: 'farm_ladybug', type: 'currency', chance: -0.15, value: 3}]},
                after: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.1, value: 2}, {name: 'farm_ladybug', type: 'currency', chance: -0.15, value: 2}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'honeymelon',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '800',
                        after: '3875'
                    },
                ],
                before: {rareDrop: [{name: 'farm_butterfly', type: 'currency', chance: -0.12, value: 2}, {name: 'farm_spider', type: 'currency', chance: -0.3, value: 1, mult: 0.5}]},
                after: {rareDrop: [{name: 'farm_butterfly', type: 'currency', chance: -0.12, value: 7}, {name: 'farm_spider', type: 'currency', chance: -0.3, value: 1}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'rye',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '875',
                        after: '1050'
                    },
                ],
                before: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: -0.16, value: 20}]},
                after: {rareDrop: [{name: 'farm_seedHull', type: 'currency', chance: -0.16, value: 7}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'daisy',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '2350',
                        after: '1700'
                    },
                ],
                before: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: -0.18, value: 12}, {name: 'farm_butterfly', type: 'currency', chance: -0.21, value: 10}, {name: 'farm_bee', type: 'currency', chance: -0.25, value: 10}]},
                after: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: -0.18, value: 9}, {name: 'farm_butterfly', type: 'currency', chance: -0.21, value: 2}, {name: 'farm_bee', type: 'currency', chance: -0.25, value: 28}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'cucumber',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '1000',
                        after: '560'
                    },
                ],
                before: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.24, value: 4}]},
                after: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.24, value: 1}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'grapes',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '1700',
                        after: '950'
                    },
                ],
                before: {rareDrop: [{name: 'farm_ladybug', type: 'currency', chance: -0.23, value: 7}]},
                after: {rareDrop: [{name: 'farm_ladybug', type: 'currency', chance: -0.23, value: 3}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'hops',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '550',
                        after: '340'
                    },
                ],
                before: {rareDrop: [{name: 'farm_spider', type: 'currency', chance: -0.32, value: 1, mult: 0.5}]},
                after: {rareDrop: [{name: 'farm_spider', type: 'currency', chance: -0.32, value: 1, mult: 0.25}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'violet',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '970',
                        after: '4600'
                    },
                ],
                before: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: -0.3, value: 3}, {name: 'farm_bee', type: 'currency', chance: -0.33, value: 3}]},
                after: {rareDrop: [{name: 'farm_petal', type: 'currency', chance: -0.3, value: 24}, {name: 'farm_bee', type: 'currency', chance: -0.33, value: 72}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'sweetPotato',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '3300',
                        after: '2300'
                    },
                ],
                before: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.36, value: 8}]},
                after: {rareDrop: [{name: 'farm_bug', type: 'currency', chance: -0.36, value: 6}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'strawberry',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '875',
                        after: '4100'
                    },
                ],
                before: {rareDrop: [{name: 'farm_ladybug', type: 'currency', chance: -0.4, value: 8}, {name: 'farm_bee', type: 'currency', chance: -0.45, value: 5}]},
                after: {rareDrop: [{name: 'farm_ladybug', type: 'currency', chance: -0.4, value: 14}, {name: 'farm_bee', type: 'currency', chance: -0.45, value: 54}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'sesame',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '1500',
                        after: '1125'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'sweetPotato',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '8300',
                        after: '4650'
                    },
                ],
                before: {rareDrop: [null, {name: 'farm_petal', type: 'currency', chance: -0.53, value: 4}]},
                after: {rareDrop: [null, {name: 'farm_petal', type: 'currency', chance: -0.53, value: 18}]},
            },
            {
                type: 'balance',
                subtype: 'crop',
                name: 'spinach',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '1425',
                        after: '1600'
                    },
                ],
            },
            {
                type: 'change',
                subtype: 'crop',
                name: 'goldenRose',
                content: [{text: '556'}],
            },
            {
                type: 'remove',
                subtype: 'fertilizer',
                name: 'basic',
            },
            {
                type: 'remove',
                subtype: 'fertilizer',
                name: 'flower',
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'speedGrow',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+250%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'richSoil',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '/1.25'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+125%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x2',
                        after: 'x1.4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'shiny',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '/1.25'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+125%'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.3'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.6',
                        after: 'x1.4'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'potatoWater',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '/1.25'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+125%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.65',
                        after: 'x1.3'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'roseWater',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '/1.25'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+125%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.3',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'weedKiller',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+100%'
                    },
                    {text: '557'}
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'turboGrow',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '/2',
                        after: '/1.75'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+375%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.15'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.15'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.15'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.75',
                        after: '/1.5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'premium',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        before: '/1.25',
                        after: '/1.5'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+250%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.75',
                        after: 'x1.35'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'superJuicy',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '/1.75'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+375%'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x2.5',
                        after: 'x1.5'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.5',
                        after: 'x1.2'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'fertilizer',
                name: 'pellets',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.25',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.25',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.15',
                        after: 'x1.1'
                    },
                ],
            },
            {
                unlock: 'farmCropExp',
                type: 'balance',
                text: '602'
            },
            {
                type: 'remove',
                subtype: 'gene',
                name: 'basics',
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'yield',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.3',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.1x',
                        after: '+0.05x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'gold',
                content: [
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.4',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.05x',
                        after: '+0.04x'
                    },
                    {text: '560'},
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'exp',
                content: [
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.175',
                        after: 'x1.15'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.15',
                        after: '+0.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'rareDrop',
                content: [
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x1.25',
                        after: 'x1.2'
                    },
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.09x',
                        after: '+0.04x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'grow',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '/1.25',
                        after: '/1.2'
                    },
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.01/',
                        after: '+0.02/'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.1'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'overgrow',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x2.5',
                        after: 'x1.5'
                    },
                    {
                        text: 'farmAllGain',
                        textType: 'mult',
                        balance: 'buff',
                        after: 'x1.1'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+15%',
                        after: '+20%'
                    },
                ],
            },
            {
                type: 'change',
                subtype: 'gene',
                name: 'mutate',
                content: [
                    {text: '566'},
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'grass',
                content: [
                    {
                        text: '567',
                        balance: 'buff',
                        before: '+1',
                        after: '+2'
                    },
                ],
                before: {rareDrop: [{name: 'farm_grass', type: 'currency', value: 8, chance: 0.2}]},
                after: {rareDrop: [{name: 'farm_grass', type: 'currency', value: 10, chance: 0.4}]},
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'dna',
                content: [
                    {text: '613'},
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'gnome',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.06x'
                    },
                    {
                        text: 'farmGoldChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.01x'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.05',
                        after: '+0.08'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'lonely',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '/2',
                        after: '/1.3'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        after: '+150%'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+12%',
                        after: '+15%'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'mystery',
                before: {rareDrop: [{name: 'farm_mysteryStone', type: 'currency', value: 1, chance: -0.1, mult: 0.01}]},
                after: {rareDrop: [{name: 'farm_mysteryStone', type: 'currency', value: 1, chance: -0.1, mult: 0.02}]},
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'conversion',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.06x',
                        after: '+0.03x'
                    },
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.05',
                        after: '+0.07'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'change',
                subtype: 'gene',
                name: 'prestige',
                content: [
                    {text: '568'},
                ],
            },
            {
                type: 'change',
                subtype: 'gene',
                name: 'rareDropChance',
                content: [
                    {text: '568'},
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'finalize',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.12x',
                        after: '+0.1x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'selfless',
                content: [
                    {
                        text: 'farmCropGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.05x',
                        after: '+0.08x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'unyielding',
                content: [
                    {
                        text: 'farmExperience',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.08',
                        after: '+0.07'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'teamwork',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'hunter',
                content: [
                    {
                        text: 'farmHuntChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.15',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'gene',
                name: 'patient',
                content: [
                    {
                        text: 'farmAllGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.02x',
                        after: '+0.01x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '5'
                    },
                ],
            },
            {
                type: 'bugfix',
                subtype: 'gene',
                name: 'patient',
                content: [
                    {text: '553'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_overgrowth',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+10%',
                        after: '+40%'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+5%',
                        after: '+10%'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        before: '9',
                        after: '7'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_groundSeeds',
                content: [
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1%',
                        after: '+2%'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '50'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_sprinkler',
                content: [
                    {
                        text: 'farmGrow',
                        textType: 'mult',
                        balance: 'nerf',
                        before: '/1.5',
                        after: '/1.4'
                    },
                    {
                        text: 'farmOvergrow',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+150%',
                        after: '+200%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_hayBales',
                content: [
                    {
                        text: 'farm_grass',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+100',
                        after: '+200'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '50'
                    },
                    {text: '554'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_anthill',
                content: [
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+1.5%',
                        after: '+1%'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                    {text: '554'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_bugPowder',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_perfume',
                content: [
                    {
                        text: 'farm_berry',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.15x'
                    },
                    {
                        text: 'farm_bug',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+10'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        before: '25',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_stompedSeeds',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_goldenTools',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_fertileGround',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_pinwheel',
                content: [
                    {
                        text: 'farmRareDropChance',
                        textType: 'mult',
                        balance: 'buff',
                        before: '+0.015x',
                        after: '+0.025x'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_mysticGround',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_wormBait',
                content: [
                    {
                        text: 'farm_vegetable',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.05x',
                        after: '+0.1x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_shinySoil',
                content: [
                    {
                        text: 'farm_berry',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+0.05x',
                        after: '+0.1x'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_openSesame',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'farm_flowerPainting',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                unlock: 'farmFertilizer',
                type: 'qol',
                text: '592'
            },
        ],
        event: [
            {
                type: 'bugfix',
                text: '601',
            },
            {
                unlock: 'summerFestivalEvent',
                type: 'bugfix',
                text: '532',
            },
            {
                unlock: 'nightHuntEvent',
                type: 'balance',
                text: '533',
            },
            {
                unlock: 'snowdownEvent',
                type: 'balance',
                text: '611',
            },
            {
                type: 'context',
                text: '639'
            },
            {
                unlock: 'treasureFeature',
                type: 'remove',
                text: '542'
            },
            {
                unlock: 'cardFeature',
                type: 'new',
                text: '543'
            },
            {
                type: 'remove',
                text: '544'
            },
            {
                type: 'remove',
                text: '545'
            },
            {
                type: 'remove',
                text: '546'
            },
            {
                type: 'new',
                text: '547'
            },
            {
                type: 'new',
                text: '548'
            },
            {
                unlock: 'bankEvent',
                type: 'balance',
                text: '586',
                balance: 'nerf',
                before: '300',
                after: '200'
            },
        ],
        treasure: [
            {
                type: 'qol',
                text: '481'
            },
            {
                unlock: 'treasureDual',
                type: 'new',
                text: 'addedTreasureType',
                params: [2]
            },
            {
                type: 'new',
                text: '509'
            },
            {
                type: 'change',
                text: '510'
            },
            {
                type: 'new',
                text: '511'
            },
            {
                type: 'new',
                text: '512'
            },
            {
                type: 'balance',
                text: '513'
            },
            {
                type: 'balance',
                text: '612'
            },
            {
                type: 'new',
                text: '514'
            },
            {
                type: 'qol',
                text: '520'
            },
            {
                type: 'appearance',
                text: '521'
            },
            {
                type: 'appearance',
                text: '522'
            },
            {
                unlock: 'miningGasSubfeature',
                type: 'remove',
                text: '564'
            },
            {
                unlock: 'miningDepthDweller',
                type: 'new',
                text: '565'
            },
            {
                type: 'change',
                text: '569'
            },
            {
                type: 'remove',
                text: '570'
            },
            {
                type: 'remove',
                text: '572'
            },
            {
                unlock: 'hordeCorruptedFlesh',
                type: 'new',
                text: '573'
            },
            {
                unlock: 'hordeBrickTower',
                type: 'new',
                text: '575'
            },
            {
                unlock: 'galleryDrums',
                type: 'remove',
                text: '577'
            },
            {
                unlock: 'galleryFeature',
                type: 'new',
                text: '578'
            },
            {
                unlock: 'galleryShape',
                type: 'new',
                text: '588'
            },
            {
                unlock: 'galleryCanvas',
                type: 'new',
                text: '590'
            },
        ],
        cryolab: [
            {
                unlock: 'miningGasSubfeature',
                type: 'clarity',
                text: '447'
            },
            {
                type: 'balance',
                text: '536',
                balance: 'buff',
                before: '+0.1x',
                after: 'x1.15'
            },
            {
                type: 'balance',
                text: '537'
            },
            {
                type: 'qol',
                text: '627'
            },
        ],
        gallery: [
            {
                unlock: 'galleryAuction',
                type: 'balance',
                text: 'gallery_cash',
                textType: 'currencyGain',
                textPer: 'cardPower',
                balance: 'nerf',
                before: 'x1.05',
                after: 'x1.02'
            },
            {
                unlock: 'galleryShape',
                type: 'balance',
                text: 'gallery_motivation',
                textType: 'currencyGain',
                balance: 'nerf',
                before: '0.2/s',
                after: '0.01/s'
            },
            {
                unlock: 'galleryShape',
                type: 'new',
                text: '576'
            },
            {
                unlock: 'galleryShape',
                type: 'change',
                text: '603'
            },
            {
                unlock: 'galleryShape',
                type: 'change',
                text: '604'
            },
            {
                unlock: 'galleryShape',
                type: 'balance',
                text: '579',
                balance: 'nerf',
                before: '20',
                after: '10'
            },
            {
                unlock: 'galleryCanvas',
                type: 'balance',
                text: 'galleryCanvasSpeed',
                textType: 'mult',
                balance: 'nerf',
                before: '1 (+0.1)',
                after: '1'
            },
            {
                unlock: 'galleryCanvas',
                type: 'bugfix',
                text: '574'
            },
            {
                type: 'balance',
                subtype: 'idea',
                name: 'beExcited',
                content: [
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.02/s',
                        after: '+0.001/s'
                    },
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+35',
                        after: '+70'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'idea',
                name: 'calculateOdds',
                content: [
                    {
                        text: 'galleryColorDrumChance',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.4x',
                        after: '+0.1x'
                    },
                ],
            },
            {
                type: 'change',
                subtype: 'idea',
                name: 'thinkHarder',
                content: [
                    {text: '580'},
                ],
            },
            {
                type: 'balance',
                subtype: 'idea',
                name: 'hyperfocus',
                content: [
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.08/s',
                        after: '+0.008/s'
                    },
                ],
            },
            {
                unlock: 'galleryDrums',
                type: 'balance',
                text: '581',
                balance: 'nerf',
                before: '2%',
                after: '1%'
            },
            {
                unlock: 'galleryDrums',
                type: 'balance',
                text: '582',
                balance: 'buff',
                before: '40',
                after: '80'
            },
            {
                unlock: 'galleryDrums',
                type: 'balance',
                text: '583'
            },
            {
                type: 'balance',
                text: '584'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_artAcademy',
                content: [
                    {
                        text: 'gallery_beauty',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.3',
                        after: 'x1.35'
                    },
                    {text: '626'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_investment',
                content: [
                    {text: '626'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_bigCircle',
                content: [
                    {
                        text: 'galleryShapeGain',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.25',
                        after: 'x1.3'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_bigRectangle',
                content: [
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+1',
                        after: '+5'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_creativity',
                content: [
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '+0.005/s'
                    },
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'gallery_bigHeart',
                content: [
                    {
                        text: 'gallery_motivation',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: '+2',
                        after: '+10'
                    },
                ],
            },
        ],
        mining_1: [
            {
                type: 'new',
                text: 'addedUpgrade',
                params: [12]
            },
            {
                type: 'new',
                text: 'addedPrestigeUpgrade',
                params: [8]
            },
            {
                type: 'new',
                text: 'addedAchievement',
                params: [2]
            },
            {
                type: 'new',
                text: 'addedRareEarth',
                params: [3]
            },
            {
                type: 'balance',
                text: '608'
            },
            {
                type: 'balance',
                text: '625'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_giantCrate',
                content: [
                    {
                        text: 'mining_scrap',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x7',
                        after: 'x6'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_morePressure',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_gasDweller',
                content: [
                    {
                        text: 'miningDepthDwellerSpeed',
                        textType: 'mult',
                        balance: 'nerf',
                        before: 'x3'
                    },
                    {
                        text: 'miningDepthDwellerMax',
                        textType: 'mult',
                        balance: 'nerf',
                        after: '/1.25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_piston',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_vent',
                content: [
                    {
                        text: 'miningDamage',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.05'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_harvester',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_enrichedCrystal',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_smoker',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalSmoke',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '20'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalFusion',
                content: [
                    {
                        text: 'mining_crystalYellow',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.05',
                        after: 'x1.3'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalTunnel',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'mining_crystalDust',
                content: [
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '10'
                    },
                ],
            },
            {
                type: 'balance',
                text: '534',
                balance: 'nerf',
                before: '+0.4%',
                after: '+0.2%'
            },
            {
                type: 'balance',
                text: '555',
                balance: 'buff',
                after: '+30'
            },
            {
                unlock: 'miningSmoke',
                type: 'balance',
                text: '494'
            },
        ],
        horde_1: [
            {
                unlock: 'hordeMonsterToothWarzone',
                type: 'new',
                text: '459'
            },
            {
                type: 'bugfix',
                text: '460'
            },
            {
                type: 'change',
                text: '476'
            },
            {
                type: 'change',
                text: '477'
            },
            {
                type: 'qol',
                text: '478'
            },
            {
                type: 'new',
                text: 'addedHordeClass',
                params: [2]
            },
            {
                type: 'new',
                text: 'addedAchievement',
                params: [4]
            },
            {
                type: 'new',
                text: 'addedTrinket',
                params: [1]
            },
            {
                type: 'new',
                text: 'addedUpgrade',
                params: [6]
            },
            {
                type: 'new',
                text: 'addedPrestigeUpgrade',
                params: [4]
            },
            {
                type: 'new',
                text: 'addedGemUpgrade',
                params: [3]
            },
            {
                type: 'new',
                text: '479'
            },
            {
                type: 'balance',
                text: '530',
                balance: 'nerf',
                before: '5%',
                after: '3%'
            },
            {
                type: 'balance',
                text: '631',
                balance: 'buff',
                before: '1',
                after: '2'
            },
            {
                type: 'bugfix',
                text: '589',
                issue: '93'
            },
            {
                type: 'balance',
                text: '600'
            },
            {
                type: 'clarity',
                text: '614'
            },
            {
                type: 'clarity',
                text: '620',
                issue: '94'
            },
            {
                type: 'balance',
                text: '605',
                balance: 'nerf',
                before: 'x1.5',
                after: 'x1.4'
            },
            {
                type: 'balance',
                text: '606',
                balance: 'buff',
                before: 'x1.3',
                after: 'x1.5'
            },
            {
                type: 'balance',
                text: '607',
                balance: 'nerf',
                before: 'x1.4',
                after: 'x1.3'
            },
            {
                unlock: 'hordeAreaMonkeyJungle',
                type: 'change',
                text: '632'
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_protectiveShell',
                content: [
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.14',
                        after: 'x1.11'
                    },
                    {
                        text: 'hordeRecovery',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: '+0.1%'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_fistFight',
                content: [
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.23',
                        after: 'x1.1'
                    },
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_determination',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.08',
                        after: 'x1.05'
                    },
                    {
                        text: 'horde_courage',
                        textType: 'currencyGain',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.08',
                        after: 'x1.1'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_bloodChamber',
                content: [
                    {
                        text: 'horde_blood',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        before: 'x1.5',
                        after: 'x2.25'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_stoneSkin',
                content: [
                    {text: '640'},
                    {
                        text: 'hordeHealth',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.5',
                        after: 'x1.2'
                    },
                    {
                        text: 'hordeHealing',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        before: '/1.2'
                    },
                    {
                        text: 'horde_blood',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.5'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '30'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_university',
                content: [
                    {
                        text: 'hordeExpIncrement',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: '/1.1',
                        after: '/1.1 - /1.05'
                    },
                    {text: '554'},
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_discovery',
                content: [
                    {
                        text: 'horde_soulCorrupted',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.4+'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '40'
                    },
                ],
            },
            {
                type: 'balance',
                subtype: 'upgrade',
                name: 'horde_innerFocus',
                content: [
                    {
                        text: 'hordeHealing',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'nerf',
                        before: 'x1.1'
                    },
                    {
                        text: 'hordeAttack',
                        textType: 'mult',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.2'
                    },
                    {
                        text: 'horde_blood',
                        textType: 'currencyCap',
                        textPer: 'level',
                        balance: 'buff',
                        after: 'x1.5'
                    },
                    {
                        text: 'maximumLevel',
                        balance: 'nerf',
                        after: '30'
                    },
                ],
            },
        ],
    }
}
