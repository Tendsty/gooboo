export default [
    {id: 1, collection: 'dangersInTheDark', power: 3, color: 'green', icons: [
        {"x": -0.1, "y": 0.1, "rotate": -20, "size": 2.5, "icon": "mdi-chart-bubble"},
        {"x": 0.85, "y": 0.1, "rotate": 0, "size": 1.5, "icon": "mdi-snake"},
        {"x": -0.85, "y": 0.05, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"}
    ]},
    {id: 2, collection: 'dangersInTheDark', power: 2, reward: [
        {name: 'hordeBossRequirement', type: 'base', value: -5},
    ], color: 'darker-grey', icons: [
        {"x": 0, "y": 0.1, "rotate": 0, "size": 3, "icon": "mdi-ellipse-outline"},
        {"x": -0.85, "y": 0.9, "rotate": 0, "size": 1.4, "icon": "mdi-grass"},
        {"x": 0.85, "y": 0.75, "rotate": 0, "size": 1.2, "icon": "mdi-grass"},
        {"x": 0.85, "y": -0.8, "rotate": 0, "size": 1, "icon": "mdi-grass"},
        {"x": 0, "y": -1, "rotate": 0, "size": 0.9, "icon": "mdi-grass"}
    ]},
    {id: 3, collection: 'dangersInTheDark', power: 1, reward: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: 1.2},
        {name: 'currencyHordeBoneCap', type: 'mult', value: 1.35},
    ], color: 'orange-red', icons: [
        {"x": 0, "y": 0.8, "rotate": 0, "size": 3, "icon": "mdi-image-filter-hdr"},
        {"x": 0.15, "y": 0.55, "rotate": 0, "size": 1, "icon": "mdi-fountain"},
        {"x": 0.55, "y": -0.2, "rotate": -60, "size": 0.7, "icon": "mdi-motion"},
        {"x": -0.6, "y": -0.15, "rotate": -140, "size": 0.95, "icon": "mdi-motion"},
        {"x": -0.1, "y": -0.75, "rotate": -100, "size": 1.15, "icon": "mdi-motion"}
    ]},
    {id: 4, collection: 'dangersInTheDark', power: 2, reward: [
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: 50},
    ], color: 'deep-purple', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": -0.3, "y": -0.7, "rotate": -30, "size": 0.75, "icon": "mdi-help"},
        {"x": 0.55, "y": -0.3, "rotate": 0, "size": 1, "icon": "mdi-map-legend"},
        {"x": -0.7, "y": 0.85, "rotate": 75, "size": 1.75, "icon": "mdi-chart-bubble"}
    ]},
    {id: 5, collection: 'dangersInTheDark', power: 2, reward: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: 1.25},
    ], color: 'cyan', icons: [
        {"x": 0.6, "y": 0.2, "rotate": 0, "size": 2.5, "icon": "mdi-mirror-rectangle"},
        {"x": 0.65, "y": 0.5, "rotate": 0, "size": 1, "icon": "mdi-human-greeting"},
        {"x": 0.65, "y": 0.25, "rotate": 0, "size": 0.5, "icon": "mdi-skull"},
        {"x": -0.4, "y": 0.65, "rotate": 0, "size": 1.1, "icon": "mdi-human-handsdown"},
        {"x": -0.3, "y": 0.05, "rotate": 15, "size": 0.75, "icon": "mdi-exclamation-thick"}
    ]},
    {id: 6, collection: 'dangersInTheDark', power: 2, reward: [
        {name: 'hordeDivisionShield', type: 'base', value: 4},
    ], color: 'red', icons: [
        {"x": -0.95, "y": 0.8, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
        {"x": -0.3, "y": 0.8, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
        {"x": 0.3, "y": 0.8, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
        {"x": 0.95, "y": 0.8, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
        {"x": 0, "y": 0.46, "rotate": 0, "size": 1, "icon": "mdi-swim"},
        {"x": -0.7, "y": -0.15, "rotate": 0, "size": 1.8, "icon": "mdi-scent"},
        {"x": 0.7, "y": -0.55, "rotate": 0, "size": 1.9, "icon": "mdi-scent"},
        {"x": -0.05, "y": 0.1, "rotate": -20, "size": 0.8, "icon": "mdi-fire"}
    ]},

    {id: 7, collection: 'maintainingSafety', power: 2, reward: [
        {name: 'hordeEquipmentChance', type: 'mult', value: 1.6},
    ], color: 'pale-yellow', icons: [
        {"x": 0, "y": 1, "rotate": 90, "size": 2, "icon": "mdi-rectangle"},
        {"x": 0, "y": 0.35, "rotate": 0, "size": 1, "icon": "mdi-bag-personal"},
        {"x": 0.55, "y": 0.75, "rotate": 0, "size": 1.6, "icon": "mdi-human-greeting"},
        {"x": -0.9, "y": 0.75, "rotate": 0, "size": 1.55, "icon": "mdi-human-handsdown"}
    ]},
    {id: 8, collection: 'maintainingSafety', power: 2, reward: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: 1.2},
        {name: 'currencyHordeMonsterPartCap', type: 'base', value: 30},
    ], color: 'cherry', icons: [
        {"x": -0.1, "y": 0.55, "rotate": 0, "size": 1.25, "icon": "mdi-wall"},
        {"x": 0.45, "y": 0.55, "rotate": 0, "size": 1.25, "icon": "mdi-wall"},
        {"x": 1, "y": 0.55, "rotate": 0, "size": 1.25, "icon": "mdi-wall"},
        {"x": -0.5, "y": 0.2, "rotate": -15, "size": 0.8, "icon": "mdi-hammer"},
        {"x": -0.85, "y": 0.45, "rotate": 0, "size": 1.6, "icon": "mdi-walk"}
    ]},
    {id: 9, collection: 'maintainingSafety', power: 2, reward: [
        {name: 'hordeHealth', type: 'mult', value: 1.3},
    ], color: 'indigo', icons: [
        {"x": -0.7, "y": 0, "rotate": 0, "size": 2.5, "icon": "mdi-home"},
        {"x": 0.7, "y": 0, "rotate": 0, "size": 2.5, "icon": "mdi-home"},
        {"x": 0.3, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-cctv"}
    ]},
    {id: 10, collection: 'maintainingSafety', power: 0, reward: [
        {name: 'hordeRevive', type: 'base', value: 1},
    ], color: 'green', icons: [
        {"x": -0.75, "y": 0, "rotate": 20, "size": 0.75, "icon": "mdi-leaf"},
        {"x": 0.85, "y": 0.5, "rotate": -45, "size": 0.8, "icon": "mdi-leaf"},
        {"x": -0.4, "y": -0.05, "rotate": -105, "size": 0.85, "icon": "mdi-leaf"},
        {"x": 0.3, "y": -0.6, "rotate": 0, "size": 1.25, "icon": "mdi-mushroom"},
        {"x": -0.3, "y": 0.7, "rotate": 0, "size": 2, "icon": "mdi-book-open-page-variant-outline"},
        {"x": -0.55, "y": 0.7, "rotate": 0, "size": 0.6, "icon": "mdi-mushroom-off"}
    ]},
    {id: 11, collection: 'maintainingSafety', power: 2, reward: [
        {name: 'hordeRespawn', type: 'base', value: -60},
    ], color: 'yellow', icons: [
        {"x": 0, "y": 0.24, "rotate": 0, "size": 1.55, "icon": "mdi-fence-electric"},
        {"x": -0.75, "y": 0.24, "rotate": 0, "size": 1.5, "icon": "mdi-fence"},
        {"x": 0.75, "y": 0.24, "rotate": 0, "size": 1.5, "icon": "mdi-fence"},
        {"x": 0.7, "y": -0.35, "rotate": 0, "size": 1.25, "icon": "mdi-horse"},
        {"x": -0.55, "y": -0.45, "rotate": 0, "size": 1.25, "icon": "mdi-donkey"},
        {"x": 0.3, "y": -1, "rotate": 0, "size": 0.9, "icon": "mdi-dog-side"}
    ]},

    {id: 12, collection: 'dangerousWeapons', power: 2, reward: [
        {name: 'hordeCritChance', type: 'base', value: 0.05},
        {name: 'hordeCritMult', type: 'base', value: 0.1},
    ], color: 'deep-orange', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-bomb"},
        {"x": -0.55, "y": -0.4, "rotate": -25, "size": 1.25, "icon": "mdi-bomb"},
        {"x": -0.8, "y": 0.2, "rotate": -140, "size": 1.25, "icon": "mdi-bomb"},
        {"x": -0.65, "y": 0.65, "rotate": -125, "size": 1.25, "icon": "mdi-bomb"},
        {"x": -0.1, "y": 0.95, "rotate": 135, "size": 1.25, "icon": "mdi-bomb"},
        {"x": 0.45, "y": 0.85, "rotate": 95, "size": 1.25, "icon": "mdi-bomb"},
        {"x": 0.75, "y": 0.3, "rotate": 20, "size": 1.25, "icon": "mdi-bomb"}
    ]},
    {id: 13, collection: 'dangerousWeapons', power: 1, reward: [
        {name: 'hordeAttack', type: 'mult', value: 1.15},
        {name: 'hordeCritMult', type: 'base', value: 0.35},
    ], color: 'purple', icons: [
        {"x": -0.5, "y": 0.6, "rotate": 0, "size": 1.65, "icon": "mdi-triangle"},
        {"x": 0, "y": 0.25, "rotate": 15, "size": 2.1, "icon": "mdi-firework"},
        {"x": 0.1, "y": 0.7, "rotate": 0, "size": 1, "icon": "mdi-human-handsup"}
    ]},
    {id: 14, collection: 'dangerousWeapons', power: 2, reward: [
        {name: 'hordeAttack', type: 'mult', value: 1.05},
        {name: 'hordeBossRequirement', type: 'base', value: -3},
    ], color: 'light-blue', icons: [
        {"x": 0, "y": 0, "rotate": 15, "size": 2.75, "icon": "mdi-sword"},
        {"x": -0.45, "y": -0.2, "rotate": -70, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.55, "y": 0.15, "rotate": -70, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.68, "y": 0.48, "rotate": -160, "size": 0.6, "icon": "mdi-triangle"}
    ]},
    {id: 15, collection: 'dangerousWeapons', power: 3, reward: [
        {name: 'hordeToxic', type: 'base', value: 0.01},
    ], color: 'green', icons: [
        {"x": -0.85, "y": 0.45, "rotate": 0, "size": 1.25, "icon": "mdi-bottle-tonic-skull"},
        {"x": 0.3, "y": 0, "rotate": 0, "size": 2.1, "icon": "mdi-bow-arrow"},
        {"x": 0.8, "y": -0.1, "rotate": 0, "size": 0.65, "icon": "mdi-water"}
    ]},
    {id: 16, collection: 'dangerousWeapons', power: 3, reward: [
        {name: 'hordeFirstStrike', type: 'base', value: 0.8},
    ], color: 'pink', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 1.75, "icon": "mdi-rocket-launch"},
        {"x": -0.5, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-rocket-launch"},
        {"x": 0.5, "y": 0.5, "rotate": 0, "size": 1, "icon": "mdi-rocket-launch"},
        {"x": -0.2, "y": -0.4, "rotate": 45, "size": 1.25, "icon": "mdi-minus-thick"},
        {"x": 0.4, "y": 0.2, "rotate": 45, "size": 1, "icon": "mdi-minus-thick"}
    ]},
    {id: 17, collection: 'dangerousWeapons', power: 2, reward: [
        {name: 'hordeAttack', type: 'mult', value: 1.35},
    ], color: 'red', icons: [
        {"x": 0, "y": 0.55, "rotate": 0, "size": 2.75, "icon": "mdi-human-handsup"},
        {"x": -0.35, "y": -0.3, "rotate": 0, "size": 1.25, "icon": "mdi-axe-battle"},
        {"x": -0.6, "y": 0, "rotate": 180, "size": 1.25, "icon": "mdi-axe-battle"},
        {"x": 0.35, "y": -0.3, "rotate": 270, "size": 1.25, "icon": "mdi-axe-battle"},
        {"x": 0.65, "y": 0, "rotate": 90, "size": 1.25, "icon": "mdi-axe-battle"}
    ]},
    {id: 18, collection: 'dangerousWeapons', power: 3, reward: [
        {name: 'hordeCritChance', type: 'base', value: 0.1},
        {name: 'hordeEquipmentChance', type: 'mult', value: 1.25},
    ], color: 'pale-yellow', icons: [
        {"x": 0, "y": 0.65, "rotate": 0, "size": 2, "icon": "mdi-book-open-variant"},
        {"x": -0.2, "y": -0.3, "rotate": 20, "size": 1.65, "icon": "mdi-hand-front-left"},
        {"x": 0.4, "y": -0.4, "rotate": -60, "size": 2, "icon": "mdi-pen"}
    ]},
    {id: 19, collection: 'dangerousWeapons', power: 3, reward: [
        {name: 'hordeBossRequirement', type: 'base', value: -2},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.12},
    ], color: 'brown', icons: [
        {"x": -0.7, "y": 0, "rotate": 0, "size": 1, "icon": "mdi-bowl"},
        {"x": -0.2, "y": 0.15, "rotate": 0, "size": 2, "icon": "mdi-minus"},
        {"x": 0.45, "y": 0.15, "rotate": 0, "size": 2, "icon": "mdi-minus"},
        {"x": 0.2, "y": -0.4, "rotate": 90, "size": 1, "icon": "mdi-rectangle"},
        {"x": 0.2, "y": -0.05, "rotate": 90, "size": 1, "icon": "mdi-rectangle"},
        {"x": 0.2, "y": 0.1, "rotate": 90, "size": 1, "icon": "mdi-rectangle"},
        {"x": -0.1, "y": 0.3, "rotate": 0, "size": 0.5, "icon": "mdi-circle"},
        {"x": 0.45, "y": 0.3, "rotate": 0, "size": 0.5, "icon": "mdi-circle"},
        {"x": -0.7, "y": -0.2, "rotate": 0, "size": 1, "icon": "mdi-circle"}
    ]},
    {id: 20, collection: 'dangerousWeapons', power: 3, reward: [
        {name: 'hordeEquipmentChance', type: 'mult', value: 1.25},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: 1.15},
    ], color: 'pale-pink', icons: [
        {"x": -0.15, "y": 0.2, "rotate": 0, "size": 2, "icon": "mdi-human"},
        {"x": 0.4, "y": 0, "rotate": 0, "size": 1, "icon": "mdi-pistol"},
        {"x": 0.42, "y": -0.2, "rotate": 45, "size": 1, "icon": "mdi-knife-military"}
    ]},
    {id: 21, collection: 'dangerousWeapons', power: 2, reward: [
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: 1.3},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.2},
    ], color: 'amber', icons: [
        {"x": 0.3, "y": -0.85, "rotate": 0, "size": 1.45, "icon": "mdi-white-balance-sunny"},
        {"x": -0.3, "y": -0.25, "rotate": -45, "size": 2, "icon": "mdi-minus"},
        {"x": -0.75, "y": 0.1, "rotate": 0, "size": 1, "icon": "mdi-mirror"},
        {"x": -0.3, "y": 0.45, "rotate": 45, "size": 2, "icon": "mdi-minus"},
        {"x": 0.2, "y": 0.55, "rotate": 10, "size": 1, "icon": "mdi-fire"}
    ]},
    {id: 22, collection: 'dangerousWeapons', power: 2, reward: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.22},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: 1.22},
    ], color: 'cherry', icons: [
        {"x": -0.85, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-logout"},
        {"x": 0, "y": 0, "rotate": 0, "size": 1.25, "icon": "mdi-saw-blade"},
        {"x": 0.9, "y": 0, "rotate": 25, "size": 1.25, "icon": "mdi-saw-blade"}
    ]},
    {id: 23, collection: 'dangerousWeapons', power: 0, reward: [
        {name: 'hordeToxic', type: 'base', value: 0.025},
    ], color: 'lime', icons: [
        {"x": 0, "y": -0.2, "rotate": 0, "size": 2.5, "icon": "mdi-flask-empty"},
        {"x": 0.05, "y": 0.45, "rotate": -90, "size": 1.25, "icon": "mdi-motion"},
        {"x": -0.3, "y": 0.45, "rotate": -90, "size": 1, "icon": "mdi-motion"},
        {"x": 0.35, "y": 0.45, "rotate": -90, "size": 0.75, "icon": "mdi-motion"}
    ]},

    {id: 24, collection: 'supplyAndSupport', power: 3, reward: [
        {name: 'hordePhysicTaken', type: 'mult', value: 1 / 1.25},
    ], color: 'wooden', icons: [
        {"x": 0, "y": -0.2, "rotate": 0, "size": 3, "icon": "mdi-tree"},
        {"x": 0.03, "y": 0.5, "rotate": 90, "size": 3, "icon": "mdi-minus"},
        {"x": -0.2, "y": 0.55, "rotate": 0, "size": 1.25, "icon": "mdi-hiking"},
        {"x": -0.65, "y": 1.2, "rotate": -150, "size": 0.8, "icon": "mdi-arrow-projectile"}
    ]},
    {id: 25, collection: 'supplyAndSupport', power: 5, reward: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.2},
    ], color: 'green', icons: [
        {"x": 0.1, "y": -0.15, "rotate": 0, "size": 1.25, "icon": "mdi-meditation"},
        {"x": 0.85, "y": 0.15, "rotate": 0, "size": 1.95, "icon": "mdi-tree"},
        {"x": -0.3, "y": -0.75, "rotate": 0, "size": 1.5, "icon": "mdi-tree"},
        {"x": -0.7, "y": 0.05, "rotate": 0, "size": 1.8, "icon": "mdi-pine-tree"},
        {"x": 0.5, "y": -0.75, "rotate": 0, "size": 0.6, "icon": "mdi-grass"},
        {"x": -0.35, "y": 0.85, "rotate": 0, "size": 0.8, "icon": "mdi-grass"},
        {"x": 0.4, "y": 0.75, "rotate": 0, "size": 0.75, "icon": "mdi-grass"}
    ]},
    {id: 26, collection: 'supplyAndSupport', power: 3, reward: [
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: 1.1},
        {name: 'currencyHordeBoneCap', type: 'mult', value: 1.15},
    ], color: 'light-grey', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-human-handsdown"},
        {"x": 0.4, "y": 0.1, "rotate": 80, "size": 1.75, "icon": "mdi-minus"},
        {"x": 0.5, "y": 0.45, "rotate": 0, "size": 1, "icon": "mdi-minus-thick"},
        {"x": 0.6, "y": 0.3, "rotate": 0, "size": 0.4, "icon": "mdi-alarm-light"},
        {"x": 0.6, "y": -0.05, "rotate": 0, "size": 0.75, "icon": "mdi-exclamation-thick"},
        {"x": -0.45, "y": 0.95, "rotate": 0, "size": 0.75, "icon": "mdi-mine"}
    ]},
    {id: 27, collection: 'supplyAndSupport', power: 4, reward: [
        {name: 'hordeNostalgia', type: 'base', value: 20},
    ], color: 'dark-blue', icons: [
        {"x": -0.65, "y": 0.25, "rotate": 0, "size": 1.55, "icon": "mdi-walk"},
        {"x": -0.2, "y": 0.1, "rotate": -10, "size": 1, "icon": "mdi-shield"},
        {"x": 0.6, "y": -0.15, "rotate": 160, "size": 1, "icon": "mdi-motion"}
    ]},
    {id: 28, collection: 'supplyAndSupport', power: 4, reward: [
        {name: 'hordeHeirloomChance', type: 'base', value: 0.03},
    ], color: 'yellow', icons: [
        {"x": 0, "y": 0.25, "rotate": 180, "size": 5, "icon": "mdi-dome-light"},
        {"x": -0.2, "y": 0.15, "rotate": 0, "size": 1.25, "icon": "mdi-human-handsdown"},
        {"x": 0.3, "y": 0.2, "rotate": 0, "size": 1.15, "icon": "mdi-human-greeting"}
    ]},
    {id: 29, collection: 'supplyAndSupport', power: 4, reward: [
        {name: 'hordeCritMult', type: 'base', value: 0.25},
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.3},
    ], color: 'pink-purple', icons: [
        {"x": 0, "y": 0.4, "rotate": 0, "size": 3, "icon": "mdi-desktop-classic"},
        {"x": 0, "y": 0.12, "rotate": 20, "size": 1, "icon": "mdi-radar"},
        {"x": 0.25, "y": -0.6, "rotate": 0, "size": 1.25, "icon": "mdi-antenna"}
    ]},
    {id: 30, collection: 'supplyAndSupport', power: 3, reward: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.15},
        {name: 'hordeHeirloomChance', type: 'base', value: 0.04},
    ], color: 'dark-grey', icons: [
        {"x": -0.15, "y": 0.5, "rotate": 0, "size": 2.5, "icon": "mdi-human-handsdown"},
        {"x": -0.15, "y": -0.2, "rotate": 0, "size": 1.75, "icon": "mdi-incognito"},
        {"x": 0.5, "y": 0.55, "rotate": 15, "size": 1.2, "icon": "mdi-binoculars"}
    ]},

    {id: 31, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeCorruption', type: 'base', value: -0.3}
    ], color: 'red', icons: [
        {"x": 0, "y": 0.6, "rotate": 0, "size": 2.5, "icon": "mdi-sign-pole"},
        {"x": 0, "y": -0.5, "rotate": -20, "size": 1.3, "icon": "mdi-liquid-spot"},
        {"x": 0, "y": -0.5, "rotate": 0, "size": 2.5, "icon": "mdi-cancel"}
    ]},
    {id: 32, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.1},
        {name: 'hordeCorruption', type: 'base', value: -0.15},
    ], color: 'pale-green', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-filter"},
        {"x": 0, "y": -0.55, "rotate": -85, "size": 1.25, "icon": "mdi-liquid-spot"},
        {"x": 0, "y": 0.7, "rotate": 0, "size": 1, "icon": "mdi-dots-vertical"}
    ]},
    {id: 33, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeEquipmentChance', type: 'mult', value: 2.5},
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.75},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'skyblue', icons: [
        {"x": -0.5, "y": 0.4, "rotate": 0, "size": 1.75, "icon": "mdi-washing-machine"},
        {"x": 0.5, "y": 0.4, "rotate": 0, "size": 1.75, "icon": "mdi-tumble-dryer"},
        {"x": -0.5, "y": -0.25, "rotate": 0, "size": 1, "icon": "mdi-basket"},
        {"x": -0.5, "y": -0.4, "rotate": 20, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0.5, "y": -0.2, "rotate": 0, "size": 1, "icon": "mdi-tray-full"}
    ]},
    {id: 34, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeAttack', type: 'mult', value: 1.25},
        {name: 'hordeCritMult', type: 'base', value: 0.4},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'orange', icons: [
        {"x": 0, "y": 0.5, "rotate": 30, "size": 1.5, "icon": "mdi-liquid-spot"},
        {"x": 0.4, "y": 0.5, "rotate": -45, "size": 1.5, "icon": "mdi-liquid-spot"},
        {"x": 0.2, "y": 0.05, "rotate": 0, "size": 1.75, "icon": "mdi-ghost"},
        {"x": -0.25, "y": -0.5, "rotate": -20, "size": 1.2, "icon": "mdi-fire"},
        {"x": -0.6, "y": 0.25, "rotate": 30, "size": 1.95, "icon": "mdi-torch"}
    ]},
    {id: 35, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.3},
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: 1.3},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'pink', icons: [
        {"x": -0.65, "y": 0.4, "rotate": 180, "size": 3, "icon": "mdi-alpha-t"},
        {"x": -0.45, "y": 0, "rotate": 120, "size": 2, "icon": "mdi-flashlight"},
        {"x": 0.35, "y": 0.4, "rotate": 30, "size": 2, "icon": "mdi-minus"},
        {"x": 0.65, "y": 0.55, "rotate": 0, "size": 1, "icon": "mdi-liquid-spot"}
    ]},
    {id: 36, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeHealth', type: 'mult', value: 1.25},
        {name: 'hordeDivisionShield', type: 'base', value: 10},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'pale-purple', icons: [
        {"x": 0, "y": -0.9, "rotate": 0, "size": 1.5, "icon": "mdi-arrow-collapse-down"},
        {"x": 0, "y": 0.15, "rotate": 15, "size": 1.25, "icon": "mdi-liquid-spot"},
        {"x": -0.5, "y": 0.5, "rotate": 0, "size": 3, "icon": "mdi-minus"},
        {"x": 0.5, "y": 0.5, "rotate": 0, "size": 3, "icon": "mdi-minus"}
    ]},
    {id: 37, collection: 'againstTheCorruption', power: 7, reward: [
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'brown', icons: [
        {"x": 0.25, "y": -0.6, "rotate": 0, "size": 1.75, "icon": "mdi-truck-cargo-container"},
        {"x": -0.7, "y": 0.45, "rotate": 0, "size": 1.5, "icon": "mdi-trash-can"},
        {"x": -0.15, "y": 0.45, "rotate": 0, "size": 1.5, "icon": "mdi-delete-empty"},
        {"x": 0.45, "y": 0.6, "rotate": 0, "size": 0.8, "icon": "mdi-sack"},
        {"x": 0.85, "y": 0.6, "rotate": 0, "size": 0.8, "icon": "mdi-sack"}
    ]},
    {id: 38, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeRevive', type: 'base', value: 1},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'yellow', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-television-ambient-light"},
        {"x": 0, "y": 0.08, "rotate": 10, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0, "y": 0.8, "rotate": 90, "size": 1, "icon": "mdi-rectangle"},
        {"x": 0, "y": 1.2, "rotate": 90, "size": 1, "icon": "mdi-rectangle"}
    ]},
    {id: 39, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeBossRequirement', type: 'base', value: -25},
        {name: 'hordeRespawn', type: 'mult', value: 0.2},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'cyan', icons: [
        {"x": 0.3, "y": -0.1, "rotate": 0, "size": 2, "icon": "mdi-vacuum"},
        {"x": -0.5, "y": -0.1, "rotate": 0, "size": 2, "icon": "mdi-walk"},
        {"x": 0.85, "y": 0.55, "rotate": 25, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0.6, "y": 0.65, "rotate": 150, "size": 1, "icon": "mdi-liquid-spot"}
    ]},
    {id: 40, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeHeirloomChance', type: 'base', value: 0.1},
        {name: 'hordeNostalgia', type: 'mult', value: 2},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'light-green', icons: [
        {"x": -0.2, "y": -0.6, "rotate": 125, "size": 2.5, "icon": "mdi-flask-round-bottom-empty"},
        {"x": 0.25, "y": -0.05, "rotate": 0, "size": 0.8, "icon": "mdi-water"},
        {"x": 0.25, "y": 0.4, "rotate": 0, "size": 0.6, "icon": "mdi-water"},
        {"x": 0.45, "y": 0.9, "rotate": 50, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0.25, "y": 0.9, "rotate": -65, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0, "y": 0.9, "rotate": 20, "size": 1, "icon": "mdi-liquid-spot"}
    ]},
    {id: 41, collection: 'againstTheCorruption', power: 5, reward: [
        {name: 'hordeFirstStrike', type: 'base', value: 3},
        {name: 'hordeSpellblade', type: 'base', value: 1.25},
        {name: 'hordeCorruption', type: 'mult', value: 1.1},
    ], color: 'teal', icons: [
        {"x": -0.5, "y": 0.1, "rotate": 90, "size": 1.5, "icon": "mdi-sword"},
        {"x": 0.5, "y": 0.1, "rotate": 0, "size": 1.5, "icon": "mdi-bow-arrow"},
        {"x": -0.5, "y": 0.4, "rotate": 0, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0.25, "y": -0.05, "rotate": -65, "size": 1, "icon": "mdi-liquid-spot"}
    ]},

    {id: 42, collection: 'specialGadgets', power: 'adaptive', reward: [
        {name: 'hordeCorruption', type: 'mult', value: 2},
    ], color: 'purple', icons: [
        {"x": -0.39, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-pot-mix"},
        {"x": -0.39, "y": 0.65, "rotate": 0, "size": 2.35, "icon": "mdi-square-rounded"},
        {"x": -0.4, "y": -0.3, "rotate": -20, "size": 1, "icon": "mdi-mushroom"},
        {"x": -0.75, "y": -0.1, "rotate": -45, "size": 1, "icon": "mdi-feather"},
        {"x": 0.8, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-candle"}
    ]},
    {id: 43, collection: 'specialGadgets', power: 'adaptive', reward: [
        {name: 'hordeCorruption', type: 'mult', value: 5},
    ], color: 'orange-red', icons: [
        {"x": 0, "y": 0.2, "rotate": 0, "size": 3, "icon": "mdi-microwave"},
        {"x": -0.25, "y": 0.4, "rotate": -170, "size": 1, "icon": "mdi-liquid-spot"},
        {"x": 0, "y": -0.5, "rotate": 0, "size": 1, "icon": "mdi-alert"}
    ]},

    {id: 44, collection: 'artOfWar', power: 5, reward: [
        {name: 'hordeEquipmentChance', type: 'mult', value: 1.85},
        {name: 'hordeCorruption', type: 'base', value: -0.2},
    ], color: 'deep-purple', icons: [
        {"x": -0.5, "y": 0.1, "rotate": 0, "size": 2.5, "icon": "mdi-run"},
        {"x": -0.4, "y": -0.6, "rotate": 0, "size": 1.25, "icon": "mdi-ninja"},
        {"x": 0.05, "y": 0.05, "rotate": 30, "size": 1, "icon": "mdi-shuriken"},
        {"x": 0.95, "y": 0.05, "rotate": 60, "size": 1, "icon": "mdi-shuriken"}
    ]},
    {id: 45, collection: 'artOfWar', power: 6, reward: [
        {name: 'hordeAttack', type: 'mult', value: 1.18},
    ], color: 'orange-red', icons: [
        {"x": 0.1, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-karate"},
        {"x": 0.8, "y": -0.15, "rotate": 60, "size": 1.4, "icon": "mdi-human-handsup"},
        {"x": -0.85, "y": 0.2, "rotate": -90, "size": 1.6, "icon": "mdi-walk"}
    ]},
    {id: 46, collection: 'artOfWar', power: 6, reward: [
        {name: 'hordeHealth', type: 'mult', value: 1.18},
    ], color: 'light-green', icons: [
        {"x": 0, "y": -0.3, "rotate": 0, "size": 4, "icon": "mdi-temple-buddhist"},
        {"x": -0.05, "y": 0.75, "rotate": 0, "size": 2, "icon": "mdi-meditation"},
        {"x": 1, "y": 0.9, "rotate": 0, "size": 0.45, "icon": "mdi-grass"}
    ]},
    {id: 47, collection: 'artOfWar', power: 6, reward: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.35},
    ], color: 'beige', icons: [
        {"x": 0, "y": -0.65, "rotate": 0, "size": 8, "icon": "mdi-chevron-up"},
        {"x": 0.5, "y": 0.25, "rotate": 0, "size": 1.2, "icon": "mdi-bulletin-board"},
        {"x": -0.25, "y": 0.05, "rotate": 0, "size": 1.4, "icon": "mdi-map-legend"},
        {"x": 0, "y": 1, "rotate": 0, "size": 1.55, "icon": "mdi-human-greeting"},
        {"x": -0.4, "y": 0.6, "rotate": 15, "size": 1, "icon": "mdi-minus"},
        {"x": -0.75, "y": 0.55, "rotate": 15, "size": 1, "icon": "mdi-strategy"}
    ]},
    {id: 48, collection: 'artOfWar', power: 4, reward: [
        {name: 'hordeDefense', type: 'base', value: 0.001},
    ], color: 'indigo', icons: [
        {"x": -0.8, "y": 0.8, "rotate": 0, "size": 2, "icon": "mdi-walk"},
        {"x": -0.15, "y": 0.7, "rotate": -105, "size": 1.75, "icon": "mdi-car-windshield"},
        {"x": -0.3, "y": 0.1, "rotate": 0, "size": 2, "icon": "mdi-walk"},
        {"x": 0.35, "y": 0, "rotate": -105, "size": 1.75, "icon": "mdi-car-windshield"},
        {"x": 0.2, "y": -0.6, "rotate": 0, "size": 2, "icon": "mdi-walk"},
        {"x": 0.85, "y": -0.7, "rotate": -105, "size": 1.75, "icon": "mdi-car-windshield"}
    ]},
    {id: 49, collection: 'artOfWar', power: 6, reward: [
        {name: 'hordeExecute', type: 'base', value: 0.09},
    ], color: 'brown', icons: [
        {"x": 0, "y": -0.6, "rotate": 180, "size": 0.9, "icon": "mdi-network-strength-4"},
        {"x": 0, "y": -0.8, "rotate": 0, "size": 2, "icon": "mdi-minus"},
        {"x": -0.3, "y": -0.45, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": 0.3, "y": -0.45, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": -0.3, "y": 0.2, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": 0.3, "y": 0.2, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": -0.3, "y": 0.85, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": 0.3, "y": 0.85, "rotate": 90, "size": 2, "icon": "mdi-minus"},
        {"x": 0, "y": 0.45, "rotate": 0, "size": 1, "icon": "mdi-tray"},
        {"x": 0, "y": 0.6, "rotate": 0, "size": 1.3, "icon": "mdi-minus-thick"},
        {"x": 0, "y": 1, "rotate": 0, "size": 0.8, "icon": "mdi-bowl"}
    ]},
    {id: 50, collection: 'artOfWar', power: 7, reward: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: 1.3},
    ], color: 'red', icons: [
        {"x": 0, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-knife"},
        {"x": 0.52, "y": -0.3, "rotate": -35, "size": 1.3, "icon": "mdi-stairs"},
        {"x": 0.3, "y": 0.2, "rotate": -15, "size": 1.3, "icon": "mdi-stairs"}
    ]},
    {id: 51, collection: 'artOfWar', power: 7, reward: [
        {name: 'currencyHordeBloodCap', type: 'mult', value: 1.25},
    ], color: 'cherry', icons: [
        {"x": 0, "y": 0.3, "rotate": 0, "size": 2, "icon": "mdi-car-coolant-level"},
        {"x": 0.37, "y": -0.48, "rotate": 0, "size": 1.3, "icon": "mdi-water-pump"},
        {"x": -0.35, "y": 0.85, "rotate": 0, "size": 0.3, "icon": "mdi-circle"},
        {"x": 0.35, "y": 0.85, "rotate": 0, "size": 0.3, "icon": "mdi-circle"}
    ]},

    {id: 52, collection: 'versatile', power: 7, reward: [
        {name: 'hordeStrength', type: 'base', value: 3},
        {name: 'hordeIntelligence', type: 'base', value: 3},
    ], color: 'pale-green', icons: [
        {"x": 0, "y": 0.25, "rotate": 0, "size": 3, "icon": "mdi-human-greeting"},
        {"x": -0.5, "y": -0.5, "rotate": -50, "size": 1.15, "icon": "mdi-dumbbell"},
        {"x": 0.6, "y": 0.1, "rotate": 0, "size": 1.25, "icon": "mdi-book-open-variant"}
    ]},
    {id: 53, collection: 'versatile', power: 7, reward: [
        {name: 'hordeEnergy', type: 'base', value: 80},
        {name: 'hordeMana', type: 'base', value: 40},
    ], color: 'purple', icons: [
        {"x": -0.6, "y": 0.2, "rotate": 0, "size": 3, "icon": "mdi-cupboard"},
        {"x": 0.6, "y": 0.2, "rotate": 0, "size": 3, "icon": "mdi-cupboard"},
        {"x": 0.5, "y": 0.1, "rotate": 0, "size": 0.5, "icon": "mdi-test-tube"},
        {"x": -0.45, "y": -0.25, "rotate": 0, "size": 0.5, "icon": "mdi-beaker-outline"},
        {"x": -0.55, "y": -0.75, "rotate": 0, "size": 1, "icon": "mdi-flask-outline"},
        {"x": 0.8, "y": 0.1, "rotate": 0, "size": 0.5, "icon": "mdi-flask-round-bottom"},
        {"x": -0.7, "y": 0.1, "rotate": 0, "size": 0.5, "icon": "mdi-bottle-tonic"},
        {"x": 0.65, "y": -0.25, "rotate": 0, "size": 0.5, "icon": "mdi-flask-outline"},
        {"x": 0.8, "y": -0.7, "rotate": 0, "size": 0.75, "icon": "mdi-flask-round-bottom"}
    ]},
    {id: 54, collection: 'versatile', power: 6, reward: [
        {name: 'hordeSkillPointsPerLevel', type: 'base', value: 1},
        {name: 'hordeExpBase', type: 'mult', value: 1 / 1.05},
    ], color: 'pale-yellow', icons: [
        {"x": -0.35, "y": 0.35, "rotate": 0, "size": 2.5, "icon": "mdi-table-furniture"},
        {"x": 0.25, "y": 0.02, "rotate": 0, "size": 3, "icon": "mdi-human-greeting"},
        {"x": -0.75, "y": -0.2, "rotate": 0, "size": 1, "icon": "mdi-lamp"},
        {"x": -0.35, "y": -0.1, "rotate": 0, "size": 0.65, "icon": "mdi-book"},
        {"x": 0.8, "y": 0.55, "rotate": 0, "size": 1, "icon": "mdi-watering-can"}
    ]},
    {id: 55, collection: 'versatile', power: 7, reward: [
        {name: 'hordeHaste', type: 'base', value: 10},
        {name: 'hordeAutocast', type: 'base', value: 1},
    ], color: 'blue-grey', icons: [
        {"x": -0.5, "y": 0.15, "rotate": 0, "size": 3, "icon": "mdi-human-handsdown"},
        {"x": 0.5, "y": 0.15, "rotate": 0, "size": 3, "icon": "mdi-human-male"},
        {"x": 0.5, "y": -0.7, "rotate": 0, "size": 1.75, "icon": "mdi-robot"}
    ]},

    {id: 56, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeStrength', type: 'base', value: 5},
    ], color: 'red', icons: [
        {"x": -0.65, "y": 0.15, "rotate": 0, "size": 2, "icon": "mdi-weight-lifter"},
        {"x": 0.7, "y": 0.25, "rotate": 0, "size": 1.75, "icon": "mdi-human-greeting"},
        {"x": 0.4, "y": -0.2, "rotate": -50, "size": 1, "icon": "mdi-dumbbell"},
        {"x": 1.1, "y": 0.3, "rotate": -80, "size": 1, "icon": "mdi-dumbbell"}
    ]},
    {id: 57, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeIntelligence', type: 'base', value: 5},
    ], color: 'purple', icons: [
        {"x": -0.85, "y": 0.6, "rotate": 0, "size": 1.75, "icon": "mdi-human-handsdown"},
        {"x": -0.4, "y": 0.7, "rotate": 0, "size": 0.75, "icon": "mdi-script-text"},
        {"x": 0.4, "y": 0.9, "rotate": 0, "size": 0.55, "icon": "mdi-skull"},
        {"x": 0.7, "y": 0.95, "rotate": 70, "size": 0.55, "icon": "mdi-skull"},
        {"x": 0.75, "y": -0.4, "rotate": 0, "size": 4.25, "icon": "mdi-flash"}
    ]},
    {id: 58, collection: 'skillfulCombat', power: 5, reward: [
        {name: 'hordeSkillPointsPerLevel', type: 'base', value: 2},
    ], color: 'orange', icons: [
        {"x": -0.8, "y": 0, "rotate": 0, "size": 1.5, "icon": "mdi-bullseye-arrow"},
        {"x": -0.8, "y": 0.7, "rotate": 90, "size": 1.75, "icon": "mdi-minus"},
        {"x": 0.9, "y": 0.55, "rotate": 0, "size": 2, "icon": "mdi-human-greeting"},
        {"x": 0.5, "y": 0.2, "rotate": -70, "size": 1, "icon": "mdi-bow-arrow"}
    ]},
    {id: 59, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeHaste', type: 'base', value: 15},
    ], color: 'green', icons: [
        {"x": 0.35, "y": 0.25, "rotate": 0, "size": 2, "icon": "mdi-horse-human"},
        {"x": -0.55, "y": 0.15, "rotate": 0, "size": 2, "icon": "mdi-horse-human"},
        {"x": -0.45, "y": 1, "rotate": 0, "size": 0.6, "icon": "mdi-grass"},
        {"x": 0.5, "y": -0.6, "rotate": 0, "size": 2, "icon": "mdi-tree"}
    ]},
    {id: 60, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeEnergy', type: 'base', value: 120},
    ], color: 'light-blue', icons: [
        {"x": -0.4, "y": -0.35, "rotate": 0, "size": 2.3, "icon": "mdi-tree"},
        {"x": 0.3, "y": 0.9, "rotate": 70, "size": 2, "icon": "mdi-minus"},
        {"x": 0.3, "y": 0.25, "rotate": 0, "size": 1, "icon": "mdi-flag-checkered"},
        {"x": -0.6, "y": 0.85, "rotate": 0, "size": 1.4, "icon": "mdi-run-fast"}
    ]},
    {id: 61, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeMana', type: 'base', value: 60},
    ], color: 'pale-purple', icons: [
        {"x": 0, "y": 0.4, "rotate": 0, "size": 2.5, "icon": "mdi-human-handsup"},
        {"x": 0, "y": -0.45, "rotate": 0, "size": 0.8, "icon": "mdi-wizard-hat"},
        {"x": -0.8, "y": -0.4, "rotate": 0, "size": 0.8, "icon": "mdi-fire-circle"},
        {"x": 0.3, "y": -0.9, "rotate": 0, "size": 0.8, "icon": "mdi-lightning-bolt-circle"},
        {"x": 0.7, "y": -0.2, "rotate": 0, "size": 0.8, "icon": "mdi-water-circle"}
    ]},
    {id: 62, collection: 'skillfulCombat', power: 7, reward: [
        {name: 'hordeExpBase', type: 'mult', value: 1 / 1.1},
    ], color: 'light-green', icons: [
        {"x": -0.85, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-tree"},
        {"x": 0.15, "y": 0.05, "rotate": 0, "size": 1.75, "icon": "mdi-tree"},
        {"x": 0.65, "y": 0, "rotate": 0, "size": 2, "icon": "mdi-tree"},
        {"x": -0.5, "y": -0.65, "rotate": 0, "size": 1, "icon": "mdi-home"},
        {"x": -0.7, "y": 0.8, "rotate": 0, "size": 1.25, "icon": "mdi-horse-human"},
        {"x": 0.35, "y": 0.25, "rotate": 0, "size": 1, "icon": "mdi-grass"},
        {"x": 0.85, "y": 0.32, "rotate": 0, "size": 0.5, "icon": "mdi-grass"},
        {"x": -1.2, "y": 0.32, "rotate": 0, "size": 0.5, "icon": "mdi-grass"},
        {"x": -1.05, "y": 0.32, "rotate": 0, "size": 0.5, "icon": "mdi-grass"},
        {"x": -0.7, "y": 0.32, "rotate": 0, "size": 0.5, "icon": "mdi-grass"}
    ]},
    {id: 63, collection: 'skillfulCombat', power: 8, reward: [
        {name: 'hordeAutocast', type: 'base', value: 2},
    ], color: 'blue-grey', icons: [
        {"x": 0, "y": 0.1, "rotate": 0, "size": 3, "icon": "mdi-human"},
        {"x": -0.7, "y": -0.18, "rotate": -45, "size": 0.75, "icon": "mdi-wrench"},
        {"x": 0.7, "y": -0.18, "rotate": 135, "size": 0.75, "icon": "mdi-wrench"}
    ]},
    {id: 64, collection: 'skillfulCombat', power: 9, reward: [], color: 'amber', icons: [
        {"x": -0.55, "y": 0.8, "rotate": 0, "size": 1, "icon": "mdi-square"},
        {"x": 0, "y": 0.8, "rotate": 0, "size": 1, "icon": "mdi-square"},
        {"x": 0, "y": 0.4, "rotate": 0, "size": 1, "icon": "mdi-square"},
        {"x": 0.55, "y": 0.8, "rotate": 0, "size": 1, "icon": "mdi-square"},
        {"x": 0.55, "y": 0.6, "rotate": 0, "size": 1, "icon": "mdi-square"},
        {"x": 0, "y": -0.25, "rotate": 0, "size": 1.75, "icon": "mdi-human-handsup"},
        {"x": 0.5, "y": -0.65, "rotate": -15, "size": 1, "icon": "mdi-trophy"}
    ]},
    {id: 65, collection: 'skillfulCombat', power: 6, reward: [
        {name: 'hordeTrinketGain', type: 'mult', value: 1.11},
    ], color: 'babypink', icons: [
        {"x": -0.7, "y": 0.15, "rotate": 0, "size": 2.5, "icon": "mdi-human-handsdown"},
        {"x": -0.05, "y": 0.25, "rotate": 110, "size": 1, "icon": "mdi-magnet"},
        {"x": 0.7, "y": 0.6, "rotate": 80, "size": 0.75, "icon": "mdi-medal"},
        {"x": 1.1, "y": 0.6, "rotate": 0, "size": 0.75, "icon": "mdi-trophy"}
    ]},
];
