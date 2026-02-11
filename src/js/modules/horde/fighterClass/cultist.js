import { HORDE_STACKING_COOLDOWN, SECONDS_PER_HOUR } from "../../../constants";

export default {
    unlock: 'hordeClassCultist',
    icon: 'mdi-pentagram',
    baseStats: {
        attack: 1.3,
        health: 450
    },
    exp: {
        base: 4500,
        increment: 1.7
    },
    courageMult: 50,
    skills: {
        combatStance: {
            type: 'stance',
            color: 'green',
            icon: 'mdi-sword-cross',
            max: 1,
            effect: [
                {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 1.5 + 1},
                {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 1.5 + 1},
            ]
        },
        lootingStance: {
            type: 'stance',
            color: 'orange',
            icon: 'mdi-sack',
            max: 1,
            effect: [
                {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => lvl * 7 + 1},
                {name: 'hordeRareLootTime', type: 'base', value: lvl => lvl * -30},
            ]
        },
        learningStance: {
            type: 'stance',
            color: 'blue',
            icon: 'mdi-school',
            max: 1,
            effect: [
                {name: 'hordeExpBase', type: 'mult', value: lvl => 1 / (lvl * 0.5 + 1)},
            ]
        },
        crimsonPact: {
            type: 'passive',
            color: 'red',
            icon: 'mdi-file-sign',
            max: 1,
            effect: [
                {name: 'hordeAttackPerMissingHealth', type: 'tag', value: lvl => [lvl * 0.01]}
            ]
        },
        crimsonRitual: {
            type: 'active',
            color: 'red',
            icon: 'mdi-pentagram',
            max: 1,
            cooldown: () => 8,
            activeCost: () => {return {health: 0.03};},
            active() {
                return [
                    {type: 'damageMagic', value: 7.25, str: 0.3, int: 0.5}
                ];
            },
            activeType: 'combat'
        },
        reincarnation: {
            type: 'active',
            color: 'light-blue',
            icon: 'mdi-weather-sunset-up',
            max: 5,
            cost: 20,
            cooldown: lvl => 33 - lvl * 3,
            activeCost: () => {return {};},
            active() {
                return [
                    {type: 'heal', value: 0.4, int: 0.012},
                ];
            },
            activeType: 'combat'
        },
        strength: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        blood: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
        ]},
        corruption: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCorruption', type: 'bonus', value: lvl => lvl * -0.01}
        ]},
        crimsonCurse: {
            type: 'active',
            color: 'pink-purple',
            icon: 'mdi-skull',
            max: 5,
            cost: 20,
            cooldown: () => 35,
            activeCost: () => {return {health: 0.08};},
            active(lvl) {
                return [
                    {type: 'poison', value: lvl * 0.15 + 0.65, int: 0.015},
                ];
            },
            activeType: 'combat'
        },
        sacrificialDagger: {
            type: 'active',
            color: 'wooden',
            icon: 'mdi-knife-military',
            max: 5,
            cost: 20,
            cooldown: () => 22,
            activeCost: () => {return {health: 0.05};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 1.8 + 10, str: 0.6, canCrit: 0.8},
                ];
            },
            activeType: 'combat'
        },
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.04}
        ]},
        recovery: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 25},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.003}
        ]},
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        blood_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
        ]},
        crimsonHeart: {
            type: 'passive',
            color: 'red',
            icon: 'mdi-heart-pulse',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordePassiveRecovery', type: 'tag', value: lvl => [lvl * 0.2]}
            ]
        },
        recovery_2: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.006}
        ]},
        despair: {
            type: 'passive',
            color: 'dark-blue',
            icon: 'mdi-emoticon-cry',
            max: 3,
            cost: 50,
            effect: [
                {name: 'hordeStrIntPerMissingHealth', type: 'tag', value: lvl => [lvl * 0.1]}
            ]
        },
        healing: {type: 'stat', max: 5, cost: 10, effect: [
            {name: 'hordeHealing', type: 'base', value: lvl => lvl * 0.02}
        ]},
        drainLife: {
            type: 'active',
            color: 'orange',
            icon: 'mdi-vector-line',
            max: 5,
            cost: 20,
            cooldown: lvl => 52 - lvl * 4,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 1.1 + 6.2, str: 0.75},
                    {type: 'heal', value: 0.24, int: 0.009},
                ];
            },
            activeType: 'combat'
        },
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4}
        ]},
        hex: {
            type: 'active',
            color: 'deep-purple',
            icon: 'mdi-wizard-hat',
            max: 5,
            cost: 20,
            cooldown: lvl => 260 - lvl * 30,
            activeCost: () => {return {health: 0.5};},
            active(lvl) {
                return [
                    {type: 'maxdamageBio', value: 0.5},
                    {type: 'buff', value: lvl + 1, effect: [
                        {type: 'base', name: 'hordeCutting', value: 0.4},
                    ]},
                ];
            },
            activeType: 'combat'
        },
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        recovery_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 25},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.003}
        ]},
        blood_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.08, lvl)}
        ]},
        corruption_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCorruption', type: 'bonus', value: lvl => lvl * -0.01}
        ]},
        darkRitual: {
            type: 'active',
            color: 'black',
            icon: 'mdi-pentagram',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeAttack_base', value: lvl * 0.01 + 0.01}
                ];
            },
            activeType: 'utility'
        },
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.05}
        ]},
        occultRestoration: {
            type: 'active',
            color: 'babypink',
            icon: 'mdi-heart-multiple',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeHealing_base', value: lvl * 0.005 + 0.005}
                ];
            },
            activeType: 'utility'
        },
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70}
        ]},
        harvest: {
            type: 'active',
            color: 'red',
            icon: 'mdi-water',
            max: 5,
            cost: 20,
            cooldown: () => 2 * SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'blood', value: lvl * 15 + 45}
                ];
            },
            activeType: 'utility'
        },
        blood_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.1, lvl)}
        ]},
        summonAbomination: {
            type: 'active',
            color: 'green',
            icon: 'mdi-halloween',
            max: 5,
            cost: 20,
            cooldown: () => 426,
            activeCost: () => {return {health: 0.3};},
            active(lvl) {
                return [
                    {type: 'divisionShield', value: lvl * 3 + 9},
                    {type: 'buff', value: lvl * 3 + 9, effect: [
                        {type: 'base', name: 'hordeAttack', value: lvl + 3},
                        {type: 'base', name: 'hordeCritChance', value: 0.1 * lvl},
                        {type: 'base', name: 'hordeCritMult', value: 0.25 * lvl},
                        {type: 'base', name: 'hordeToxic', value: 0.25},
                        {type: 'base', name: 'hordeCutting', value: 0.05},
                    ]},
                ];
            },
            activeType: 'combat'
        },
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.5}
        ]},
        occultThunder: {
            type: 'active',
            color: 'purple',
            icon: 'mdi-flash',
            max: 5,
            cost: 20,
            cooldown: () => 45,
            activeCost: () => {return {health: 0.15};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.45 + 3.75, str: 0.7},
                    {type: 'damageMagic', value: lvl * 1.15 + 8.75, int: 1.1},
                    {type: 'stun', value: lvl * 3 + 5},
                ];
            },
            activeType: 'combat'
        },
        intelligence_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        recovery_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 25},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.003}
        ]},
        corruption_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCorruption', type: 'bonus', value: lvl => lvl * -0.01}
        ]},
        courage: {type: 'stat', max: 10, cost: 15, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        damage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.04}
        ]},
        health_3: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        intelligence_4: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        haste_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        damage_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.04}
        ]},
        health_4: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        strength_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        intelligence_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        recovery_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 25},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.003}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['combatStance', 'lootingStance', 'learningStance', 'crimsonPact', 'crimsonRitual']},
        {level: 1, items: ['reincarnation', 'strength', 'intelligence', 'health', 'blood', 'corruption']},
        {level: 10, items: ['crimsonCurse', 'sacrificialDagger', 'damage', 'recovery', 'haste', 'blood_2']},
        {isChoice: true, level: 20, items: [['crimsonHeart', 'recovery_2'], ['despair', 'healing'], ['drainLife', 'haste_2']]},
        {level: 30, items: ['hex', 'intelligence_2', 'recovery_3', 'blood_3', 'corruption_2']},
        {isChoice: true, level: 40, items: [['darkRitual', 'damage_2'], ['occultRestoration', 'health_2'], ['harvest', 'blood_4'], ['summonAbomination', 'strength_2']]},
        {level: 50, items: ['occultThunder', 'intelligence_3', 'recovery_4', 'corruption_3', 'courage']},
        {level: 75, items: ['damage_3', 'health_3', 'intelligence_4', 'haste_3']},
        {level: 100, items: ['damage_4', 'health_4', 'strength_3', 'intelligence_5', 'recovery_5']},
    ],
    quests: {
        stat: [],
        zone: [
            {area: 'loveIsland', zone: '10'},
        ],
        level: [25, 40, 55, 70, 95, 120, 150, 185],
        boss: [
            {boss: 'chriz2', difficulty: 75},
            {boss: 'mina', difficulty: 50},
        ]
    }
}
