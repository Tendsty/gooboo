export default [
    {id: 1, collection: 'caveLocations', power: 2, reward: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageStoneCap', type: 'mult', value: 1.1}
    ], color: 'teal', icons: [
        {"x": 0.9, "y": 0.7, "rotate": 0, "size": 0.5, "icon": "mdi-human-handsdown"},
        {"x": -1, "y": 0, "rotate": 10, "size": 1.8, "icon": "mdi-chart-bubble"},
        {"x": -0.6, "y": 0.5, "rotate": -15, "size": 2, "icon": "mdi-chart-bubble"},
        {"x": -0.1, "y": -0.15, "rotate": -115, "size": 2.2, "icon": "mdi-chart-bubble"},
        {"x": 0, "y": 0.5, "rotate": 75, "size": 2.3, "icon": "mdi-chart-bubble"},
        {"x": -1.2, "y": 0.6, "rotate": 0, "size": 0.8, "icon": "mdi-circle"}
    ]},
    {id: 2, collection: 'caveLocations', power: 3, reward: [
        {name: 'currencyVillageGemGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageGemCap', type: 'mult', value: 1.1}
    ], color: 'pink-purple', icons: [
        {"x": -0.9, "y": 0.65, "rotate": -20, "size": 1.8, "icon": "mdi-chart-bubble"},
        {"x": -0.4, "y": -0.2, "rotate": -30, "size": 2, "icon": "mdi-chart-bubble"},
        {"x": -0.05, "y": 0.75, "rotate": -135, "size": 2.1, "icon": "mdi-chart-bubble"},
        {"x": -0.3, "y": 0.3, "rotate": 65, "size": 0.75, "icon": "mdi-diamond-stone"},
        {"x": 0.85, "y": 0.55, "rotate": 0, "size": 1.75, "icon": "mdi-human-handsdown"}
    ]},
    {id: 3, collection: 'caveLocations', power: 2, reward: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageWaterCap', type: 'mult', value: 1.1}
    ], color: 'blue-grey', icons: [
        {"x": -0.4, "y": -0.95, "rotate": 0, "size": 2, "icon": "mdi-nail"},
        {"x": 0.65, "y": -1.05, "rotate": 0, "size": 1.6, "icon": "mdi-nail"},
        {"x": 0, "y": 1.2, "rotate": 0, "size": 1, "icon": "mdi-triangle"},
        {"x": 0.65, "y": 0, "rotate": 0, "size": 0.8, "icon": "mdi-water"}
    ]},
    {id: 4, collection: 'caveLocations', power: 2, reward: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageMetalCap', type: 'mult', value: 1.1}
    ], color: 'cherry', icons: [
        {"x": -0.8, "y": 0.8, "rotate": 75, "size": 2.75, "icon": "mdi-chart-bubble"},
        {"x": 0.75, "y": 0.85, "rotate": 40, "size": 2.2, "icon": "mdi-chart-bubble"},
        {"x": -0.1, "y": -0.35, "rotate": -25, "size": 1.55, "icon": "mdi-chart-bubble"},
        {"x": -0.55, "y": -0.85, "rotate": 20, "size": 2.15, "icon": "mdi-chart-bubble"},
        {"x": 0.5, "y": -0.8, "rotate": -95, "size": 2.75, "icon": "mdi-chart-bubble"}
    ]},
    {id: 5, collection: 'caveLocations', power: 2, reward: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: 1.2},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: 1.1}
    ], color: 'green', icons: [
        {"x": 0.4, "y": 0.7, "rotate": -25, "size": 2.15, "icon": "mdi-chart-bubble"},
        {"x": -0.45, "y": 0.5, "rotate": 40, "size": 2.55, "icon": "mdi-chart-bubble"},
        {"x": -0.05, "y": -0.15, "rotate": 230, "size": 2.15, "icon": "mdi-chart-bubble"},
        {"x": -0.2, "y": -0.65, "rotate": -15, "size": 0.75, "icon": "mdi-flower"},
        {"x": 0.4, "y": -0.4, "rotate": 45, "size": 0.65, "icon": "mdi-flower"}
    ]},

    {id: 6, collection: 'neighborhood', power: 2, reward: [
        {name: 'villageWorker', type: 'base', value: 8}
    ], color: 'green', icons: [
        {"x": 0, "y": -0.2, "rotate": 0, "size": 2.5, "icon": "mdi-tent"},
        {"x": 0.8, "y": -0.3, "rotate": 0, "size": 1, "icon": "mdi-grass"},
        {"x": -0.75, "y": 0.7, "rotate": 0, "size": 1.2, "icon": "mdi-grass"},
        {"x": 0.2, "y": 0.8, "rotate": 0, "size": 1.3, "icon": "mdi-grass"}
    ]},
    {id: 7, collection: 'neighborhood', power: 2, reward: [
        {name: 'villageTaxRate', type: 'mult', value: 1.25}
    ], color: 'pale-yellow', icons: [
        {"x": -0.75, "y": -0.2, "rotate": 0, "size": 1.75, "icon": "mdi-slide"},
        {"x": 0.75, "y": 0, "rotate": 0, "size": 1.75, "icon": "mdi-seesaw"},
        {"x": -0.25, "y": 0.85, "rotate": 0, "size": 1.5, "icon": "mdi-layers-outline"},
        {"x": 0.25, "y": 0.95, "rotate": 0, "size": 1, "icon": "mdi-human-child"},
        {"x": -0.65, "y": -0.25, "rotate": -30, "size": 1, "icon": "mdi-human-child"}
    ]},
    {id: 8, collection: 'neighborhood', power: 2, reward: [
        {name: 'villageFoundationMaterialGain', type: 'mult', value: 1.2}
    ], color: 'skyblue', icons: [
        {"x": -0.8, "y": -0.3, "rotate": 0, "size": 1.75, "icon": "mdi-home"},
        {"x": 0.8, "y": -0.3, "rotate": 0, "size": 1.75, "icon": "mdi-home"},
        {"x": -0.05, "y": -0.3, "rotate": 0, "size": 1.5, "icon": "mdi-tree"},
        {"x": -0.7, "y": 0.6, "rotate": 90, "size": 1.5, "icon": "mdi-road"},
        {"x": 0, "y": 0.6, "rotate": 90, "size": 1.5, "icon": "mdi-road"},
        {"x": 0.7, "y": 0.6, "rotate": 90, "size": 1.5, "icon": "mdi-road"}
    ]},
    {id: 9, collection: 'neighborhood', power: 3, reward: [
        {name: 'villageMentalGain', type: 'mult', value: 1.1}
    ], color: 'red', icons: [
        {"x": -0.85, "y": 0, "rotate": 0, "size": 1.7, "icon": "mdi-fence"},
        {"x": 0, "y": 0, "rotate": 0, "size": 1.7, "icon": "mdi-fence"},
        {"x": 0.85, "y": 0, "rotate": 0, "size": 1.7, "icon": "mdi-fence"},
        {"x": -0.35, "y": 0.15, "rotate": 0, "size": 2, "icon": "mdi-human-greeting"},
        {"x": 0.65, "y": -0.2, "rotate": 0, "size": 1.8, "icon": "mdi-human-handsdown"},
        {"x": -0.6, "y": -0.6, "rotate": -20, "size": 1, "icon": "mdi-exclamation-thick"},
        {"x": -0.35, "y": -0.65, "rotate": 0, "size": 1, "icon": "mdi-exclamation-thick"},
        {"x": -0.1, "y": -0.6, "rotate": 20, "size": 1, "icon": "mdi-exclamation-thick"},
        {"x": 0.65, "y": -1, "rotate": 0, "size": 1, "icon": "mdi-help"},
        {"x": 0.35, "y": 0.85, "rotate": 0, "size": 1, "icon": "mdi-football"}
    ]},
    {id: 10, collection: 'neighborhood', power: 2, reward: [
        {name: 'villageFoundationMaterialCap', type: 'mult', value: 1.1}
    ], color: 'lime', icons: [
        {"x": -0.7, "y": -0.1, "rotate": 0, "size": 2.5, "icon": "mdi-home"},
        {"x": 0, "y": 0.2, "rotate": 0, "size": 1, "icon": "mdi-fence"},
        {"x": 0.5, "y": 0.2, "rotate": 0, "size": 1, "icon": "mdi-gate"},
        {"x": 1, "y": 0.2, "rotate": 0, "size": 1, "icon": "mdi-fence"},
        {"x": 0.75, "y": 0.75, "rotate": 0, "size": 1, "icon": "mdi-flower"},
        {"x": -0.8, "y": 0.9, "rotate": 0, "size": 2, "icon": "mdi-tree"}
    ]},
    {id: 11, collection: 'neighborhood', power: 2, reward: [
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: 1.2}
    ], color: 'cherry', icons: [
        {"x": 0, "y": -0.65, "rotate": 0, "size": 4, "icon": "mdi-home-roof"},
        {"x": -0.75, "y": 0.25, "rotate": 90, "size": 3, "icon": "mdi-minus"},
        {"x": 0.75, "y": 0.25, "rotate": 90, "size": 3, "icon": "mdi-minus"},
        {"x": -0.35, "y": -0.2, "rotate": 0, "size": 1, "icon": "mdi-track-light"},
        {"x": 0.3, "y": 0.9, "rotate": 0, "size": 2, "icon": "mdi-tow-truck"},
        {"x": -0.6, "y": 1, "rotate": 0, "size": 1, "icon": "mdi-wall"}
    ]},
    {id: 12, collection: 'neighborhood', power: 3, color: 'pale-green', icons: [
        {"x": -0.5, "y": 0, "rotate": 0, "size": 1.75, "icon": "mdi-rv-truck"},
        {"x": 0.15, "y": 0.6, "rotate": 0, "size": 1.25, "icon": "mdi-campfire"},
        {"x": -0.8, "y": 0.9, "rotate": 0, "size": 1.4, "icon": "mdi-tree"},
        {"x": -0.3, "y": -0.7, "rotate": 0, "size": 1.25, "icon": "mdi-tree"},
        {"x": 0.85, "y": 0.5, "rotate": 0, "size": 1.6, "icon": "mdi-tree"},
        {"x": 0.4, "y": -0.25, "rotate": 0, "size": 1.1, "icon": "mdi-pine-tree"},
        {"x": 0.9, "y": -0.6, "rotate": 0, "size": 1.5, "icon": "mdi-pine-tree"}
    ]},
    {id: 13, collection: 'neighborhood', power: 4, reward: [
        {name: 'villageWorker', type: 'base', value: 6},
        {name: 'villageHappiness', type: 'base', value: 0.01}
    ], color: 'deep-purple', icons: [
        {"x": -0.3, "y": -0.85, "rotate": 0, "size": 1.25, "icon": "mdi-window-open"},
        {"x": 0.1, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-sofa"},
        {"x": 0.9, "y": -0.4, "rotate": 0, "size": 1, "icon": "mdi-television-classic"},
        {"x": -0.85, "y": -0.1, "rotate": 0, "size": 1.75, "icon": "mdi-lamps"},
        {"x": 0, "y": 0.8, "rotate": 0, "size": 2, "icon": "mdi-rug"},
        {"x": 0.9, "y": 0.1, "rotate": 0, "size": 1, "icon": "mdi-dresser"}
    ]},
    {id: 14, collection: 'neighborhood', power: 2, reward: [
        {name: 'villageFoodGain', type: 'mult', value: 1.2}
    ], color: 'light-green', icons: [
        {"x": -0.55, "y": 0, "rotate": 0, "size": 2.5, "icon": "mdi-home"},
        {"x": -0.05, "y": 0.8, "rotate": 0, "size": 1.4, "icon": "mdi-dog-side"},
        {"x": 0.8, "y": 0.4, "rotate": 0, "size": 0.75, "icon": "mdi-soccer"},
        {"x": 0.4, "y": 0.2, "rotate": 0, "size": 0.5, "icon": "mdi-tennis-ball"}
    ]},

    {id: 15, collection: 'plantsInTheCity', power: 2, reward: [
        {name: 'currencyVillageGrainGain', type: 'mult', value: 1.6}
    ], color: 'light-blue', icons: [
        {"x": 0, "y": 0.4, "rotate": 0, "size": 3, "icon": "mdi-home-city"},
        {"x": 0, "y": -0.55, "rotate": 0, "size": 1, "icon": "mdi-flower"},
        {"x": 0.7, "y": -0.55, "rotate": 0, "size": 1, "icon": "mdi-flower-tulip"},
        {"x": 0.35, "y": -1, "rotate": 0, "size": 1.3, "icon": "mdi-tree"},
        {"x": 0.38, "y": -0.5, "rotate": 90, "size": 1.3, "icon": "mdi-minus"}
    ]},
    {id: 16, collection: 'plantsInTheCity', power: 2, reward: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageWoodCap', type: 'mult', value: 1.1}
    ], color: 'beige', icons: [
        {"x": 0, "y": -0.1, "rotate": 0, "size": 4, "icon": "mdi-tree"},
        {"x": 0, "y": 0.8, "rotate": 0, "size": 1, "icon": "mdi-triangle"},
        {"x": 0.45, "y": 0.85, "rotate": 0, "size": 0.5, "icon": "mdi-sign-text"},
        {"x": -0.8, "y": 0.8, "rotate": 0, "size": 0.75, "icon": "mdi-human-male-female-child"}
    ]},
    {id: 17, collection: 'plantsInTheCity', power: 2, reward: [
        {name: 'villageResourceGain', type: 'mult', value: 1.1}
    ], color: 'cherry', icons: [
        {"x": 0.45, "y": 0.15, "rotate": 0, "size": 3, "icon": "mdi-truck-flatbed"},
        {"x": 0.1, "y": -0.1, "rotate": -50, "size": 2, "icon": "mdi-tree"},
        {"x": -0.85, "y": 0.45, "rotate": 0, "size": 1.25, "icon": "mdi-human-handsup"},
        {"x": -0.6, "y": 0.05, "rotate": -55, "size": 1, "icon": "mdi-axe"}
    ]},
    {id: 18, collection: 'plantsInTheCity', power: 2, reward: [
        {name: 'currencyVillageFruitGain', type: 'mult', value: 1.6}
    ], color: 'green', icons: [
        {"x": -0.65, "y": 0.65, "rotate": 0, "size": 2, "icon": "mdi-layers-outline"},
        {"x": -0.65, "y": 0.25, "rotate": 0, "size": 1.25, "icon": "mdi-flower"},
        {"x": 0.65, "y": 0.65, "rotate": 0, "size": 2, "icon": "mdi-layers-outline"},
        {"x": 0.65, "y": 0.1, "rotate": 0, "size": 2, "icon": "mdi-tree"},
        {"x": 0, "y": -0.4, "rotate": 0, "size": 2, "icon": "mdi-layers-outline"},
        {"x": 0, "y": -0.8, "rotate": 0, "size": 1.25, "icon": "mdi-flower-tulip"}
    ]},
    {id: 19, collection: 'plantsInTheCity', power: 1, reward: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: 1.75}
    ], color: 'light-green', icons: [
        {"x": -0.7, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": -0.3, "y": 0.15, "rotate": -60, "size": 1.2, "icon": "mdi-shovel"},
        {"x": 0.3, "y": 0.3, "rotate": 0, "size": 0.8, "icon": "mdi-sprout"},
        {"x": 0.9, "y": 0.3, "rotate": 0, "size": 0.8, "icon": "mdi-sprout"}
    ]},

    {id: 20, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageHardwoodGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: 1.1}
    ], color: 'cherry', icons: [
        {"x": 0.6, "y": 0.4, "rotate": 55, "size": 3, "icon": "mdi-tree"},
        {"x": -0.3, "y": 0.8, "rotate": 90, "size": 0.5, "icon": "mdi-rectangle"},
        {"x": -0.95, "y": 0.5, "rotate": 0, "size": 1.5, "icon": "mdi-human-handsdown"},
        {"x": -0.55, "y": 0.5, "rotate": 0, "size": 0.9, "icon": "mdi-axe"}
    ]},
    {id: 21, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: 1.15},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: 1.15}
    ], color: 'brown', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 4, "icon": "mdi-truck-flatbed"},
        {"x": -0.85, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.5, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.15, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.85, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.5, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.15, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.85, "y": -0.9, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.5, "y": -0.9, "rotate": 0, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.15, "y": -0.9, "rotate": 0, "size": 1, "icon": "mdi-rectangle"}
    ]},
    {id: 22, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageKnowledgeCap', type: 'mult', value: 1.1}
    ], color: 'pale-purple', icons: [
        {"x": -0.5, "y": -0.3, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.5, "y": -0.3, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": -0.5, "y": 0.6, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.5, "y": 0.6, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.3, "y": 0.35, "rotate": 0, "size": 1, "icon": "mdi-beaker"},
        {"x": -0.45, "y": -0.6, "rotate": 0, "size": 1, "icon": "mdi-flask"},
        {"x": 0.2, "y": -0.6, "rotate": 0, "size": 1, "icon": "mdi-bottle-tonic"},
        {"x": 0.55, "y": -0.6, "rotate": 0, "size": 1, "icon": "mdi-bottle-tonic"},
        {"x": -0.2, "y": 0.5, "rotate": 45, "size": 0.5, "icon": "mdi-pencil"}
    ]},
    {id: 23, collection: 'industrialRevolution', power: 4, reward: [
        {name: 'currencyVillageScienceGain', type: 'mult', value: 1.3}
    ], color: 'cyan', icons: [
        {"x": -0.3, "y": 0.3, "rotate": 0, "size": 1, "icon": "mdi-test-tube"},
        {"x": 0, "y": 0.3, "rotate": 0, "size": 1, "icon": "mdi-test-tube-empty"},
        {"x": 0.3, "y": 0.3, "rotate": 0, "size": 1, "icon": "mdi-test-tube-empty"},
        {"x": -0.1, "y": -0.3, "rotate": 0, "size": 1, "icon": "mdi-eyedropper"}
    ]},
    {id: 24, collection: 'industrialRevolution', power: 2, reward: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageGlassCap', type: 'mult', value: 1.1}
    ], color: 'lime', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 4, "icon": "mdi-microscope"},
        {"x": 0.4, "y": 0, "rotate": -90, "size": 0.7, "icon": "mdi-bacteria"},
        {"x": 0.75, "y": 0, "rotate": 0, "size": 0.7, "icon": "mdi-virus"}
    ]},
    {id: 25, collection: 'industrialRevolution', power: 2, reward: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: 1.18}
    ], color: 'amber', icons: [
        {"x": -0.4, "y": -0.05, "rotate": 70, "size": 2, "icon": "mdi-bowl-mix"},
        {"x": 0.5, "y": 0.5, "rotate": 0, "size": 2, "icon": "mdi-gold"}
    ]},
    {id: 26, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: 1.2}
    ], color: 'light-grey', icons: [
        {"x": -0.5, "y": 0.35, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.5, "y": 0.35, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-arrow-collapse-down"},
        {"x": 0, "y": -1, "rotate": 90, "size": 1, "icon": "mdi-minus"},
        {"x": 0, "y": -0.7, "rotate": 90, "size": 1, "icon": "mdi-minus"},
        {"x": 0, "y": -0.4, "rotate": 90, "size": 1, "icon": "mdi-minus"},
        {"x": -0.65, "y": 0.05, "rotate": 0, "size": 1, "icon": "mdi-gold"},
        {"x": 0.15, "y": 0.2, "rotate": 80, "size": 1, "icon": "mdi-nail"},
        {"x": 0.8, "y": 0.05, "rotate": 180, "size": 1, "icon": "mdi-nail"}
    ]},
    {id: 27, collection: 'industrialRevolution', power: 2, reward: [
        {name: 'currencyVillageKnowledgeGain', type: 'mult', value: 1.3}
    ], color: 'pale-orange', icons: [
        {"x": -0.55, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": -0.05, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": 0.55, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": -0.55, "y": 0.75, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": 0.05, "y": 0.75, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": 0.55, "y": 0.75, "rotate": 0, "size": 1.5, "icon": "mdi-bookshelf"},
        {"x": 0.5, "y": -0.85, "rotate": 0, "size": 1.25, "icon": "mdi-book"},
        {"x": -0.2, "y": -0.8, "rotate": 0, "size": 1, "icon": "mdi-candle"}
    ]},
    {id: 28, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageFaithCap', type: 'mult', value: 1.25}
    ], color: 'blue-grey', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 1.75, "icon": "mdi-cog"},
        {"x": -0.7, "y": -0.25, "rotate": 10, "size": 1.5, "icon": "mdi-cog"},
        {"x": -1, "y": 0.35, "rotate": 0, "size": 1.25, "icon": "mdi-cog"},
        {"x": 0.8, "y": 0, "rotate": 30, "size": 1.6, "icon": "mdi-cog"}
    ]},
    {id: 29, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageFishGain', type: 'mult', value: 1.6}
    ], color: 'pale-blue', icons: [
        {"x": 0.6, "y": 0.6, "rotate": 0, "size": 2, "icon": "mdi-stove"},
        {"x": 0.4, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-pot-mix"},
        {"x": -0.4, "y": -0.25, "rotate": 0, "size": 2, "icon": "mdi-robot-industrial"},
        {"x": -0.35, "y": 0.3, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.15, "y": -0.55, "rotate": 40, "size": 0.75, "icon": "mdi-food-apple"}
    ]},
    {id: 30, collection: 'industrialRevolution', power: 2, reward: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: 1.25},
        {name: 'currencyVillageFaithCap', type: 'mult', value: 1.3}
    ], color: 'grey', icons: [
        {"x": 0, "y": -0.6, "rotate": 0, "size": 3, "icon": "mdi-garage-open"},
        {"x": -0.15, "y": 0.65, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": 0.3, "y": 0.6, "rotate": 15, "size": 0.75, "icon": "mdi-remote"},
        {"x": 0, "y": -0.25, "rotate": 0, "size": 1, "icon": "mdi-car"}
    ]},
    {id: 31, collection: 'industrialRevolution', power: 3, reward: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: 1.12},
        {name: 'villageResourceGain', type: 'mult', value: 1.05}
    ], color: 'pale-red', icons: [
        {"x": 0, "y": 0.5, "rotate": 0, "size": 3.5, "icon": "mdi-square-outline"},
        {"x": 0, "y": 0.85, "rotate": 0, "size": 1, "icon": "mdi-power-socket"},
        {"x": 0, "y": 0.05, "rotate": 0, "size": 2.25, "icon": "mdi-engine"},
        {"x": 0.45, "y": -0.9, "rotate": -65, "size": 1.5, "icon": "mdi-fuel"},
        {"x": -0.05, "y": -0.55, "rotate": 0, "size": 0.4, "icon": "mdi-water"}
    ]},
    {id: 32, collection: 'industrialRevolution', power: 4, reward: [
        {name: 'currencyVillageVegetableGain', type: 'mult', value: 1.6}
    ], color: 'yellow', icons: [
        {"x": 0, "y": 0.25, "rotate": 0, "size": 3, "icon": "mdi-home"},
        {"x": 0.3, "y": -0.5, "rotate": 45, "size": 1, "icon": "mdi-solar-panel"},
        {"x": 0.7, "y": -0.1, "rotate": 45, "size": 1, "icon": "mdi-solar-panel"},
        {"x": -0.85, "y": 1, "rotate": 0, "size": 2, "icon": "mdi-chart-line-variant"}
    ]},
    {id: 33, collection: 'industrialRevolution', power: 4, reward: [
        {name: 'currencyVillageJoyGain', type: 'mult', value: 1.3}
    ], color: 'indigo', icons: [
        {"x": 0, "y": 0.2, "rotate": 0, "size": 4, "icon": "mdi-car-side"},
        {"x": 0.2, "y": -0.1, "rotate": 0, "size": 0.5, "icon": "mdi-robot"},
        {"x": 0, "y": -0.6, "rotate": 0, "size": 1, "icon": "mdi-antenna"}
    ]},

    {id: 34, collection: 'maintainingSafety', power: 2, reward: [
        {name: 'villageWorker', type: 'mult', value: 1.05}
    ], color: 'orange', icons: [
        {"x": 0.6, "y": 0.2, "rotate": 0, "size": 2.5, "icon": "mdi-home"},
        {"x": 0.85, "y": -0.4, "rotate": 20, "size": 1, "icon": "mdi-fire"},
        {"x": 1.15, "y": -0.15, "rotate": 20, "size": 1, "icon": "mdi-fire"},
        {"x": 0.15, "y": -0.4, "rotate": 0, "size": 1.4, "icon": "mdi-smoke"},
        {"x": -0.65, "y": 0.6, "rotate": 0, "size": 2, "icon": "mdi-fire-truck"}
    ]},
    {id: 35, collection: 'maintainingSafety', power: 4, reward: [
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: 1.15},
        {name: 'currencyVillageGemCap', type: 'mult', value: 1.15}
    ], color: 'dark-blue', icons: [
        {"x": 0.5, "y": -0.4, "rotate": 0, "size": 2, "icon": "mdi-police-station"},
        {"x": -0.6, "y": -0.05, "rotate": 0, "size": 1.25, "icon": "mdi-car-emergency"},
        {"x": 0.05, "y": 0.65, "rotate": 0, "size": 1.25, "icon": "mdi-horse-human"}
    ]},
    {id: 36, collection: 'maintainingSafety', power: 4, reward: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: 1.2}
    ], color: 'cyan', icons: [
        {"x": 0.75, "y": 0.8, "rotate": 35, "size": 2.3, "icon": "mdi-chart-bubble"},
        {"x": 0.75, "y": 0, "rotate": 45, "size": 2.5, "icon": "mdi-chart-bubble"},
        {"x": 0, "y": 0.5, "rotate": 10, "size": 1.9, "icon": "mdi-chart-bubble"},
        {"x": -0.15, "y": 1, "rotate": -65, "size": 1.4, "icon": "mdi-chart-bubble"},
        {"x": 0.65, "y": -0.65, "rotate": 0, "size": 2, "icon": "mdi-lighthouse-on"},
        {"x": -0.85, "y": 1, "rotate": 0, "size": 1.75, "icon": "mdi-waves"},
        {"x": -0.85, "y": 0.1, "rotate": 0, "size": 1.75, "icon": "mdi-ferry"}
    ]},
    {id: 37, collection: 'maintainingSafety', power: 4, reward: [
        {name: 'currencyVillageStoneCap', type: 'mult', value: 1.18},
        {name: 'currencyVillageMetalCap', type: 'mult', value: 1.12}
    ], color: 'wooden', icons: [
        {"x": 0, "y": -0.4, "rotate": 0, "size": 3, "icon": "mdi-tree"},
        {"x": 0.025, "y": 0.75, "rotate": 90, "size": 3, "icon": "mdi-minus"},
        {"x": -0.15, "y": 0.5, "rotate": 20, "size": 1.3, "icon": "mdi-minus"},
        {"x": 0.45, "y": 0.4, "rotate": -5, "size": 2.45, "icon": "mdi-minus"},
        {"x": 0.6, "y": 0.15, "rotate": -5, "size": 0.75, "icon": "mdi-dog-side"},
        {"x": -0.8, "y": 0.85, "rotate": 0, "size": 1.3, "icon": "mdi-fire-truck"},
        {"x": 0.55, "y": 1, "rotate": 0, "size": 0.9, "icon": "mdi-human-handsup"}
    ]},
    {id: 38, collection: 'maintainingSafety', power: 4, reward: [
        {name: 'villageTaxRate', type: 'mult', value: 1.15},
        {name: 'currencyVillageCoinCap', type: 'mult', value: 1.1}
    ], color: 'red', icons: [
        {"x": 0.5, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-ambulance"},
        {"x": -0.1, "y": -0.05, "rotate": 0, "size": 1.35, "icon": "mdi-human-baby-changing-table"},
        {"x": -0.7, "y": 0.75, "rotate": 0, "size": 1.35, "icon": "mdi-human-male-female-child"}
    ]},
    {id: 39, collection: 'maintainingSafety', power: 3, reward: [
        {name: 'currencyVillageMetalCap', type: 'mult', value: 1.15},
        {name: 'currencyVillageGlassCap', type: 'mult', value: 1.25}
    ], color: 'beige', icons: [
        {"x": -0.7, "y": 0.2, "rotate": 0, "size": 2, "icon": "mdi-tower-beach"},
        {"x": -0.8, "y": 0.95, "rotate": 0, "size": 1.9, "icon": "mdi-ellipse"},
        {"x": -0.15, "y": 1, "rotate": 0, "size": 1.8, "icon": "mdi-ellipse"},
        {"x": 0.6, "y": 0.9, "rotate": 0, "size": 1, "icon": "mdi-waves"},
        {"x": 1, "y": 0.9, "rotate": 0, "size": 1, "icon": "mdi-waves"}
    ]},

    {id: 40, collection: 'localBusiness', power: 5, reward: [
        {name: 'villageWorker', type: 'base', value: 20}
    ], color: 'pale-red', icons: [
        {"x": -0.45, "y": 0.4, "rotate": 0, "size": 3, "icon": "mdi-store"},
        {"x": -0.45, "y": -0.35, "rotate": 0, "size": 1, "icon": "mdi-sale"},
        {"x": 0.4, "y": 0.8, "rotate": 0, "size": 0.75, "icon": "mdi-cart"},
        {"x": 0.7, "y": 0.8, "rotate": 0, "size": 0.75, "icon": "mdi-cart"},
        {"x": 1, "y": 0.8, "rotate": 0, "size": 0.75, "icon": "mdi-cart"}
    ]},
    {id: 41, collection: 'localBusiness', power: 5, reward: [
        {name: 'villageIndustrialMaterialCap', type: 'mult', value: 1.1}
    ], color: 'pale-yellow', icons: [
        {"x": -0.45, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-factory"},
        {"x": 0.8, "y": 0.35, "rotate": 0, "size": 2, "icon": "mdi-tree"},
        {"x": 0.5, "y": 0.65, "rotate": 0, "size": 0.6, "icon": "mdi-grass"},
        {"x": -0.9, "y": 1, "rotate": 0, "size": 0.75, "icon": "mdi-grass"},
        {"x": -0.4, "y": 0.95, "rotate": 0, "size": 0.75, "icon": "mdi-grass"},
        {"x": -0.1, "y": 1.1, "rotate": 0, "size": 0.75, "icon": "mdi-grass"},
        {"x": 0.5, "y": 1, "rotate": 0, "size": 0.75, "icon": "mdi-grass"},
        {"x": 0.65, "y": -0.7, "rotate": 0, "size": 1.3, "icon": "mdi-home-variant"},
        {"x": 0.7, "y": -0.35, "rotate": 0, "size": 0.45, "icon": "mdi-grass"}
    ]},
    {id: 42, collection: 'localBusiness', power: 6, reward: [], color: 'skyblue', icons: [
        {"x": 0, "y": 0.65, "rotate": 0, "size": 1, "icon": "mdi-office-building"},
        {"x": 0, "y": 0.25, "rotate": 0, "size": 1, "icon": "mdi-office-building"},
        {"x": 0, "y": -0.15, "rotate": 0, "size": 1, "icon": "mdi-office-building"},
        {"x": 0, "y": -0.55, "rotate": 0, "size": 1, "icon": "mdi-office-building"},
        {"x": 0.7, "y": 0.73, "rotate": 0, "size": 0.65, "icon": "mdi-tree"},
        {"x": -0.95, "y": 0.8, "rotate": 0, "size": 0.25, "icon": "mdi-car-side"},
        {"x": -0.7, "y": 0.8, "rotate": 0, "size": 0.25, "icon": "mdi-car-side"},
        {"x": -0.8, "y": -0.65, "rotate": 0, "size": 1, "icon": "mdi-cloud"},
        {"x": 0.75, "y": -0.75, "rotate": 0, "size": 0.7, "icon": "mdi-cloud"}
    ]},
    {id: 43, collection: 'localBusiness', power: 5, reward: [
        {name: 'villageLuxuryMaterialCap', type: 'mult', value: 1.1}
    ], color: 'babypink', icons: [
        {"x": -0.8, "y": -0.1, "rotate": 0, "size": 1.5, "icon": "mdi-bed-king"},
        {"x": 0, "y": -0.05, "rotate": 0, "size": 1, "icon": "mdi-dresser"},
        {"x": 0, "y": -0.45, "rotate": 0, "size": 0.7, "icon": "mdi-lamp"},
        {"x": 0.8, "y": -0.25, "rotate": 0, "size": 1.75, "icon": "mdi-wardrobe"},
        {"x": -0.45, "y": 0, "rotate": 0, "size": 1.75, "icon": "mdi-human-handsdown"},
        {"x": -0.6, "y": 0.85, "rotate": 0, "size": 2, "icon": "mdi-sofa"},
        {"x": 0.55, "y": 0.8, "rotate": 0, "size": 2, "icon": "mdi-table-chair"}
    ]},
    {id: 44, collection: 'localBusiness', power: 5, reward: [
        {name: 'villageIndustrialMaterialGain', type: 'mult', value: 1.1},
        {name: 'villageLuxuryMaterialGain', type: 'mult', value: 1.1}
    ], color: 'brown', icons: [
        {"x": 0.8, "y": 0.7, "rotate": 0, "size": 1.25, "icon": "mdi-anvil"},
        {"x": 0.88, "y": 0.4, "rotate": 0, "size": 1.6, "icon": "mdi-human-handsdown"},
        {"x": 0.55, "y": 0.25, "rotate": -55, "size": 0.7, "icon": "mdi-hammer"},
        {"x": -0.55, "y": 0.65, "rotate": 135, "size": 1, "icon": "mdi-pickaxe"},
        {"x": -0.85, "y": 0.65, "rotate": -15, "size": 1, "icon": "mdi-shovel"},
        {"x": -0.25, "y": 0.7, "rotate": 85, "size": 1, "icon": "mdi-axe"}
    ]},
    {id: 45, collection: 'localBusiness', power: 4, reward: [
        {name: 'villagePower', type: 'base', value: 2}
    ], color: 'purple', icons: [
        {"x": -0.35, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-human-handsdown"},
        {"x": -0.9, "y": 0.3, "rotate": 0, "size": 1, "icon": "mdi-generator-portable"},
        {"x": 0.85, "y": 0.42, "rotate": 0, "size": 1.5, "icon": "mdi-mower"}
    ]},
    {id: 46, collection: 'localBusiness', power: 5, reward: [
        {name: 'villagePollutionTolerance', type: 'base', value: 3}
    ], color: 'orange', icons: [
        {"x": 0, "y": 0.2, "rotate": 0, "size": 4, "icon": "mdi-home-sound-in-outline"},
        {"x": -0.3, "y": 0.25, "rotate": 0, "size": 1, "icon": "mdi-air-filter"},
        {"x": 0.25, "y": 0.55, "rotate": 0, "size": 1, "icon": "mdi-human-handsup"}
    ]},
    {id: 47, collection: 'localBusiness', power: 5, reward: [
        {name: 'currencyVillageOilGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageOilCap', type: 'mult', value: 1.1}
    ], color: 'pale-green', icons: [
        {"x": 0, "y": 0.2, "rotate": 0, "size": 3.5, "icon": "mdi-ferry"},
        {"x": -0.35, "y": -0.1, "rotate": 0, "size": 0.65, "icon": "mdi-barrel"},
        {"x": 0, "y": -0.1, "rotate": 0, "size": 0.65, "icon": "mdi-barrel"},
        {"x": 0.35, "y": -0.1, "rotate": 0, "size": 0.65, "icon": "mdi-barrel"}
    ]},
    {id: 48, collection: 'localBusiness', power: 4, reward: [
        {name: 'villageTaxRate', type: 'mult', value: 1.5}
    ], color: 'red-pink', icons: [
        {"x": 0.6, "y": 0.45, "rotate": 0, "size": 2.25, "icon": "mdi-desk"},
        {"x": 0.4, "y": 0.58, "rotate": 0, "size": 1, "icon": "mdi-desktop-tower"},
        {"x": 0.45, "y": -0.1, "rotate": 0, "size": 1, "icon": "mdi-monitor"},
        {"x": 0.95, "y": 0, "rotate": 0, "size": 0.5, "icon": "mdi-note-text"},
        {"x": -0.75, "y": 0.2, "rotate": 0, "size": 2.5, "icon": "mdi-human-handsdown"},
        {"x": -0.2, "y": 0, "rotate": 70, "size": 1, "icon": "mdi-magnify"}
    ]},
    {id: 49, collection: 'localBusiness', power: 5, reward: [
        {name: 'currencyVillageMarbleGain', type: 'mult', value: 1.2},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: 1.1}
    ], color: 'pale-blue', icons: [
        {"x": -0.1, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-home"},
        {"x": -0.85, "y": 0.05, "rotate": 0, "size": 1, "icon": "mdi-human-female-dance"},
        {"x": -0.85, "y": 0.35, "rotate": 0, "size": 1, "icon": "mdi-minus-thick"},
        {"x": 1, "y": 0.15, "rotate": 0, "size": 1, "icon": "mdi-fountain"},
        {"x": -0.65, "y": 0.8, "rotate": 0, "size": 0.4, "icon": "mdi-grass"},
        {"x": 0.2, "y": 1, "rotate": 0, "size": 0.4, "icon": "mdi-grass"},
        {"x": 0.5, "y": 0.7, "rotate": 0, "size": 0.4, "icon": "mdi-grass"}
    ]},
    {id: 50, collection: 'localBusiness', power: 5, reward: [
        {name: 'currencyVillageMeatGain', type: 'mult', value: 1.75}
    ], color: 'light-green', icons: [
        {"x": -1.1, "y": 0.55, "rotate": 0, "size": 1.1, "icon": "mdi-fence"},
        {"x": -0.55, "y": 0.55, "rotate": 0, "size": 1.1, "icon": "mdi-fence"},
        {"x": 0, "y": 0.55, "rotate": 0, "size": 1.1, "icon": "mdi-fence"},
        {"x": 0.55, "y": 0.55, "rotate": 0, "size": 1.1, "icon": "mdi-fence"},
        {"x": 1.1, "y": 0.55, "rotate": 0, "size": 1.1, "icon": "mdi-fence"},
        {"x": 0.5, "y": 0.1, "rotate": 0, "size": 0.5, "icon": "mdi-grass"},
        {"x": -0.95, "y": 0, "rotate": 0, "size": 0.45, "icon": "mdi-grass"},
        {"x": -0.25, "y": -0.55, "rotate": 0, "size": 0.35, "icon": "mdi-grass"},
        {"x": -0.3, "y": -0.1, "rotate": 0, "size": 0.6, "icon": "mdi-pig-variant"},
        {"x": 0.7, "y": -0.3, "rotate": 0, "size": 0.55, "icon": "mdi-pig-variant"}
    ]},
    {id: 51, collection: 'localBusiness', power: 4, reward: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: 1.35}
    ], color: 'amber', icons: [
        {"x": 0, "y": -0.85, "rotate": 180, "size": 2, "icon": "mdi-weather-hazy"},
        {"x": -0.5, "y": 0.65, "rotate": 0, "size": 1.5, "icon": "mdi-human-handsup"},
        {"x": 0.5, "y": 0.65, "rotate": 0, "size": 1.6, "icon": "mdi-human-handsup"},
        {"x": -0.8, "y": 0.3, "rotate": 0, "size": 0.7, "icon": "mdi-baguette"},
        {"x": 0.8, "y": 0.15, "rotate": -20, "size": 0.55, "icon": "mdi-food-apple"},
        {"x": -0.25, "y": 0.15, "rotate": -65, "size": 0.45, "icon": "mdi-food-drumstick"},
        {"x": 0.1, "y": 0.3, "rotate": -20, "size": 0.7, "icon": "mdi-sausage"}
    ]},
    {id: 52, collection: 'localBusiness', power: 6, reward: [
        {name: 'villagePower', type: 'base', value: 1},
        {name: 'villagePollutionTolerance', type: 'base', value: 2}
    ], color: 'indigo', icons: [
        {"x": 0.6, "y": 0, "rotate": 0, "size": 1, "icon": "mdi-solar-panel-large"},
        {"x": 0.6, "y": 0.65, "rotate": 0, "size": 2, "icon": "mdi-store"},
        {"x": -1, "y": 1, "rotate": 0, "size": 1.5, "icon": "mdi-hydro-power"},
        {"x": -0.25, "y": -0.65, "rotate": 0, "size": 1.35, "icon": "mdi-wind-turbine"},
        {"x": -0.9, "y": -0.4, "rotate": 0, "size": 1.45, "icon": "mdi-wind-turbine"}
    ]},

    {id: 53, collection: 'versatile', power: 5, reward: [
        {name: 'currencyVillageCoinGain', type: 'mult', value: 1.5},
        {name: 'currencyVillageCopperCoinGain', type: 'mult', value: 1.25}
    ], color: 'amber', icons: [
        {"x": 0.75, "y": 0.4, "rotate": 0, "size": 2.5, "icon": "mdi-human-handsdown"},
        {"x": 0.05, "y": 0.2, "rotate": -20, "size": 1.3, "icon": "mdi-magnify"},
        {"x": -0.05, "y": 0.77, "rotate": 0, "size": 1.25, "icon": "mdi-table-furniture"},
        {"x": -0.05, "y": 0.58, "rotate": 0, "size": 0.3, "icon": "mdi-circle"},
        {"x": -0.8, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-book-open-blank-variant"},
        {"x": -0.72, "y": -0.05, "rotate": 0, "size": 0.3, "icon": "mdi-circle"},
        {"x": -0.55, "y": -0.05, "rotate": 0, "size": 0.3, "icon": "mdi-circle"},
        {"x": -0.72, "y": 0.1, "rotate": 0, "size": 0.3, "icon": "mdi-circle"}
    ]},
    {id: 54, collection: 'versatile', power: 7, reward: [
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: 1.15},
        // TODO: Add missing stat
    ], color: 'dark-blue', icons: [
        {"x": -0.7, "y": 0.5, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": -0.7, "y": -0.1, "rotate": 0, "size": 0.6, "icon": "mdi-hard-hat"},
        {"x": 0.7, "y": 0.5, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": 0.7, "y": -0.1, "rotate": 0, "size": 0.6, "icon": "mdi-hard-hat"},
        {"x": 0.2, "y": 0.85, "rotate": 35, "size": 1, "icon": "mdi-hammer"},
        {"x": -0.2, "y": 0.82, "rotate": 15, "size": 1, "icon": "mdi-screwdriver"}
    ]},
    {id: 55, collection: 'versatile', power: 6, reward: [
        {name: 'villageWorker', type: 'base', value: 28},
        {name: 'villageArtisan', type: 'base', value: 1}
    ], color: 'pale-light-green', icons: [
        {"x": -0.5, "y": 0.15, "rotate": 0, "size": 4, "icon": "mdi-office-building"},
        {"x": -0.1, "y": 0.75, "rotate": 0, "size": 0.5, "icon": "mdi-account-tie"},
        {"x": 0.45, "y": 0.87, "rotate": 0, "size": 0.7, "icon": "mdi-human-handsdown"},
        {"x": 0.75, "y": 0.87, "rotate": 0, "size": 0.7, "icon": "mdi-human-handsdown"},
        {"x": 1.1, "y": 0.87, "rotate": 0, "size": 0.7, "icon": "mdi-human-handsdown"}
    ]},
    {id: 56, collection: 'versatile', power: 7, reward: [
        {name: 'villageMentalGain', type: 'mult', value: 1.1},
        {name: 'villageCounter', type: 'base', value: 2}
    ], color: 'brown', icons: [
        {"x": -0.1, "y": 0.3, "rotate": 0, "size": 2.25, "icon": "mdi-human-greeting"},
        {"x": -0.7, "y": -0.15, "rotate": 15, "size": 1, "icon": "mdi-book-alphabet"},
        {"x": 0.85, "y": 0.57, "rotate": 0, "size": 1.35, "icon": "mdi-package"},
        {"x": 0.85, "y": 0.3, "rotate": 0, "size": 0.8, "icon": "mdi-book"}
    ]},

    {id: 57, collection: 'handmade', power: 7, reward: [
        {name: 'currencyVillageCopperCoinGain', type: 'mult', value: 1.1}
    ], color: 'orange-red', icons: [
        {"x": 0.35, "y": -0.05, "rotate": 0, "size": 1.5, "icon": "mdi-cash-register"},
        {"x": 0, "y": 0.55, "rotate": 0, "size": 3, "icon": "mdi-table-furniture"},
        {"x": -0.4, "y": -0.2, "rotate": 0, "size": 1.75, "icon": "mdi-cup-outline"},
        {"x": -0.45, "y": 0.05, "rotate": 0, "size": 0.5, "icon": "mdi-circle-multiple"},
        {"x": -0.25, "y": -0.1, "rotate": 60, "size": 0.5, "icon": "mdi-circle-multiple"},
        {"x": -0.5, "y": -0.15, "rotate": 85, "size": 0.5, "icon": "mdi-cash"},
        {"x": -0.4, "y": -0.4, "rotate": 15, "size": 0.5, "icon": "mdi-circle-multiple"}
    ]},
    {id: 58, collection: 'handmade', power: 8, reward: [
        {name: 'villageArtisan', type: 'base', value: 1}
    ], color: 'pale-purple', icons: [
        {"x": 0.5, "y": -0.35, "rotate": -125, "size": 1, "icon": "mdi-lasso"},
        {"x": 0.9, "y": -0.5, "rotate": 195, "size": 1, "icon": "mdi-arrow-projectile"},
        {"x": 0.95, "y": -0.35, "rotate": 215, "size": 1, "icon": "mdi-arrow-projectile"},
        {"x": 0, "y": 0.35, "rotate": 0, "size": 3.5, "icon": "mdi-rug"}
    ]},
    {id: 59, collection: 'handmade', power: 7, reward: [
        {name: 'villageCounter', type: 'base', value: 3}
    ], color: 'amber', icons: [
        {"x": -0.8, "y": 1, "rotate": 0, "size": 1.2, "icon": "mdi-sack"},
        {"x": -0.25, "y": 0.93, "rotate": 0, "size": 1.5, "icon": "mdi-sack"},
        {"x": 0.55, "y": 1, "rotate": 0, "size": 1.2, "icon": "mdi-sack"},
        {"x": 0.2, "y": 0, "rotate": 0, "size": 2.25, "icon": "mdi-human-handsup"},
        {"x": -0.55, "y": -0.8, "rotate": 35, "size": 1, "icon": "mdi-cash"},
        {"x": 1, "y": -0.6, "rotate": -20, "size": 1, "icon": "mdi-cash"}
    ]},
    {id: 60, collection: 'handmade', power: 7, reward: [
        {name: 'villageHappiness', type: 'base', value: 0.05}
    ], color: 'pale-green', icons: [
        {"x": -0.8, "y": -0.85, "rotate": 0, "size": 2.3, "icon": "mdi-tree"},
        {"x": -0.95, "y": 0.9, "rotate": 0, "size": 0.75, "icon": "mdi-flower"},
        {"x": -0.55, "y": 0.9, "rotate": 0, "size": 0.75, "icon": "mdi-flower-tulip"},
        {"x": -0.2, "y": 0.9, "rotate": 0, "size": 0.75, "icon": "mdi-flower"},
        {"x": 1, "y": 0.9, "rotate": 0, "size": 0.75, "icon": "mdi-flower"},
        {"x": 0.55, "y": -0.4, "rotate": 0, "size": 1, "icon": "mdi-slide"}
    ]},
    {id: 61, collection: 'handmade', power: 9, reward: [], color: 'pink', icons: [
        {"x": -0.7, "y": -0.05, "rotate": 0, "size": 0.75, "icon": "mdi-ring"},
        {"x": -0.5, "y": -0.1, "rotate": 0, "size": 0.75, "icon": "mdi-ring"},
        {"x": -0.6, "y": -0.45, "rotate": 0, "size": 2.5, "icon": "mdi-mirror-rectangle"},
        {"x": -0.6, "y": 0.55, "rotate": 0, "size": 2.75, "icon": "mdi-rectangle"},
        {"x": 0.65, "y": 0.35, "rotate": 0, "size": 2.75, "icon": "mdi-human-male-female"}
    ]},
    {id: 62, collection: 'handmade', power: 8, reward: [
        // TODO: Add missing stat
    ], color: 'indigo', icons: [
        {"x": 0, "y": 0.7, "rotate": 180, "size": 3, "icon": "mdi-window-open-variant"},
        {"x": -0.1, "y": 0.3, "rotate": -45, "size": 0.8, "icon": "mdi-screwdriver"},
        {"x": 0.1, "y": 0.3, "rotate": 125, "size": 0.8, "icon": "mdi-hand-saw"},
        {"x": 0, "y": 1.05, "rotate": 135, "size": 1, "icon": "mdi-hammer"}
    ]},

    {id: 63, collection: 'specialGadgets', power: 'adaptive', reward: [
        {name: 'villageHappiness', type: 'base', value: -0.4}
    ], color: 'pink', icons: [
        {"x": 0, "y": 0.4, "rotate": 0, "size": 2, "icon": "mdi-human-handsup"},
        {"x": -0.3, "y": -0.35, "rotate": 0, "size": 1, "icon": "mdi-sign-text"},
        {"x": 0.45, "y": -0.25, "rotate": -15, "size": 1, "icon": "mdi-bullhorn"},
        {"x": -0.7, "y": 0.4, "rotate": 0, "size": 2, "icon": "mdi-human"},
        {"x": 0.7, "y": 0.4, "rotate": 0, "size": 2, "icon": "mdi-human"}
    ]},
    {id: 64, collection: 'specialGadgets', power: 'adaptive', reward: [
        {name: 'villageHappiness', type: 'base', value: -1.5}
    ], color: 'beige', icons: [
        {"x": -0.7, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-crop-landscape"},
        {"x": -0.85, "y": -0.5, "rotate": 0, "size": 0.7, "icon": "mdi-wall"},
        {"x": -0.55, "y": 0.1, "rotate": -80, "size": 0.5, "icon": "mdi-seat"},
        {"x": 0.7, "y": 0.55, "rotate": 165, "size": 1, "icon": "mdi-car-side"},
        {"x": 0.6, "y": 0.35, "rotate": 0, "size": 0.5, "icon": "mdi-fire"},
        {"x": 0.45, "y": -0.7, "rotate": 0, "size": 1, "icon": "mdi-weather-tornado"},
        {"x": -0.4, "y": 0.85, "rotate": 0, "size": 0.65, "icon": "mdi-human-male-female-child"}
    ]},
];
