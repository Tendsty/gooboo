import { SECONDS_PER_HOUR } from "../../../constants";

export default {
    unlock: 'hordeClassArcher',
    icon: 'mdi-bow-arrow',
    baseStats: {
        attack: 7,
        health: 325,
        energy: 150,
        energyRegen: 1.25
    },
    exp: {
        base: 720,
        increment: 1.22
    },
    courageMult: 2,
    skills: {
        critMult: {type: 'stat', max: 1, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 1.75}
        ]},
        energyOnCrit: {
            type: 'passive',
            color: 'amber',
            icon: 'mdi-lightning-bolt',
            max: 1,
            effect: [
                {name: 'hordeEnergyOnCrit', type: 'tag', value: lvl => [lvl * 10]}
            ]
        },
        longshot: {
            type: 'active',
            color: 'skyblue',
            icon: 'mdi-arrow-projectile',
            max: 1,
            cooldown: () => 30,
            activeCost: () => {return {energy: 70};},
            active() {
                return [
                    {type: 'damagePhysic', value: 4.25, str: 0.65, canCrit: 0.75}
                ];
            },
            activeType: 'combat'
        },
        eagleEye: {
            type: 'active',
            color: 'light-green',
            icon: 'mdi-eye',
            max: 5,
            cost: 20,
            cooldown: () => 45,
            activeCost: () => {return {energy: 50};},
            active(lvl) {
                return [
                    {type: 'buff', value: 12, effect: [
                        {type: 'base', name: 'hordeCritChance', value: lvl * 0.05 + 0.05}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        strength: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        critMult_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.1}
        ]},
        fireArrows: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-fire',
            max: 5,
            cost: 20,
            cooldown: () => 90,
            activeCost: () => {return {energy: 110};},
            active(lvl) {
                return [
                    {type: 'buff', value: 30, effect: [
                        {type: 'mult', name: 'hordeAttack', value: lvl * 0.05 + 1.25},
                        {type: 'base', name: 'hordeMagicConversion', value: 1.75}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        poisonArrow: {
            type: 'active',
            color: 'lime',
            icon: 'mdi-bottle-tonic-skull',
            max: 5,
            cost: 20,
            cooldown: () => 16,
            activeCost: () => {return {energy: 50};},
            active(lvl) {
                return [
                    {type: 'poison', value: lvl * 0.05 + 0.25, int: 0.01}
                ];
            },
            activeType: 'combat'
        },
        critChance: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.75}
        ]},
        healOnCrit: {
            type: 'passive',
            color: 'light-green',
            icon: 'mdi-heart-plus',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeHealOnCrit', type: 'tag', value: lvl => [lvl * 0.03]}
            ]
        },
        health: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 65}
        ]},
        reduceCooldownOnCrit: {
            type: 'passive',
            color: 'pale-orange',
            icon: 'mdi-timer-sand-paused',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeRestoreCooldownOnCrit', type: 'tag', value: lvl => [lvl]}
            ]
        },
        haste: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4}
        ]},
        bloodOnCrit: {
            type: 'passive',
            color: 'cherry',
            icon: 'mdi-diabetes',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeBloodOnCrit', type: 'tag', value: lvl => [lvl * 0.15]}
            ]
        },
        blood: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => lvl * 0.13 + 1}
        ]},
        critChance_2: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        energy: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 30}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        sharpArrow: {
            type: 'active',
            color: 'red',
            icon: 'mdi-arrow-projectile-multiple',
            max: 5,
            cost: 20,
            cooldown: () => 7,
            activeCost: () => {return {energy: 25};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.4 + 1.2, str: 0.2},
                    {type: 'removeDivisionShield', value: 1}
                ];
            },
            activeType: 'combat'
        },
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        sharpMind: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-motion',
            max: 5,
            cost: 20,
            cooldown: () => 22 * SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeCritMult_base', value: lvl * 0.02 + 0.02}
                ];
            },
            activeType: 'utility'
        },
        critChance_3: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        courage: {type: 'stat', max: 10, cost: 15, effect: [
            {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['critMult', 'energyOnCrit', 'longshot']},
        {level: 1, items: ['eagleEye', 'strength', 'critMult_2']},
        {level: 10, items: ['fireArrows', 'poisonArrow', 'critChance', 'intelligence']},
        {isChoice: true, level: 20, items: [['healOnCrit', 'health'], ['reduceCooldownOnCrit', 'haste'], ['bloodOnCrit', 'blood']]},
        {level: 30, items: ['critChance_2', 'energy', 'health_2']},
        {level: 40, items: ['sharpArrow', 'sharpMind', 'strength_2']},
        {level: 50, items: ['critChance_3', 'courage']},
    ],
    quests: {
        stat: [
            {stat: 'hordeIntelligence', type: 'total', value: 10},
            {stat: 'hordeHaste', type: 'total', value: 80},
            {stat: 'hordeCritChance', type: 'total', value: 0.5},
        ],
        zone: [
            {area: 'warzone', zone: '4'},
            {area: 'warzone', zone: '8'},
            {area: 'monkeyJungle', zone: '5'},
            {area: 'monkeyJungle', zone: '12'},
            {area: 'monkeyJungle', zone: '16'},
            {area: 'loveIsland', zone: '3'},
            {area: 'loveIsland', zone: '11'},
        ],
        level: [10, 20, 35, 50, 70, 95, 120, 145, 170, 195],
        boss: [
            {boss: 'ohilio', difficulty: 7},
            {boss: 'chriz2', difficulty: 10},
            {boss: 'mina', difficulty: 10},
        ]
    }
}
