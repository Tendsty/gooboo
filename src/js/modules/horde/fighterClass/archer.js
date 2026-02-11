import { HORDE_STACKING_COOLDOWN } from "../../../constants";

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
    courageMult: 1.5,
    skills: {
        critMult: {type: 'stat', max: 1, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 3.5}
        ]},
        energyOnCrit: {
            type: 'passive',
            color: 'amber',
            icon: 'mdi-lightning-bolt',
            max: 1,
            effect: [
                {name: 'hordeEnergyOnCrit', type: 'tag', value: lvl => [lvl * 15]}
            ]
        },
        longshot: {
            type: 'active',
            color: 'skyblue',
            icon: 'mdi-arrow-projectile',
            max: 1,
            cooldown: () => 10,
            activeCost: () => {return {energy: 50};},
            active() {
                return [
                    {type: 'damagePhysic', value: 3.25, str: 0.45, canCrit: 0.75}
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
            activeCost: () => {return {energy: 100};},
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
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.2}
        ]},
        energy: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        recovery: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 80},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.004}
        ]},
        fireArrows: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-fire',
            max: 5,
            cost: 20,
            cooldown: () => 90,
            activeCost: () => {return {energy: 125};},
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
            cooldown: () => 56,
            activeCost: () => {return {energy: 140};},
            active(lvl) {
                return [
                    {type: 'poison', value: lvl * 0.15 + 0.35, int: 0.02}
                ];
            },
            activeType: 'combat'
        },
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.2}
        ]},
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
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4},
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 10}
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
        shockArrow: {
            type: 'active',
            color: 'light-blue',
            icon: 'mdi-flash-alert',
            max: 5,
            cost: 20,
            cooldown: () => 24,
            activeCost: () => {return {energy: 110};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 1.3 + 4.1, int: 0.55, canCrit: lvl * 0.1},
                    {type: 'silence', value: lvl + 5}
                ];
            },
            activeType: 'combat'
        },
        critChance_2: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        energy_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.75}
        ]},
        sharpArrow: {
            type: 'active',
            color: 'red',
            icon: 'mdi-arrow-projectile-multiple',
            max: 5,
            cost: 20,
            cooldown: () => 7,
            activeCost: () => {return {energy: 30};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.4 + 1.2, str: 0.2, canCrit: lvl * 0.15},
                    {type: 'removeDivisionShield', value: 1}
                ];
            },
            activeType: 'combat'
        },
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        health_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4}
        ]},
        sharpMind: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-motion',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeCritMult_base', value: lvl * 0.02 + 0.02}
                ];
            },
            activeType: 'utility'
        },
        forestBlessing: {
            type: 'active',
            color: 'green',
            icon: 'mdi-tree',
            max: 5,
            cost: 20,
            cooldown: () => 300,
            activeCost: () => {return {energy: 500};},
            active(lvl) {
                return [
                    {type: 'buff', value: lvl * 10 + 40, effect: [
                        {type: 'base', name: 'hordeStrength', value: lvl * 4},
                        {type: 'base', name: 'hordeIntelligence', value: lvl * 4},
                        {type: 'base', name: 'hordeEnergyRegen', value: 20},
                        {type: 'base', name: 'hordeHaste', value: 100},
                        {type: 'base', name: 'hordeRecovery', value: 0.15},
                    ]}
                ];
            },
            activeType: 'combat'
        },
        critChance_3: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.2}
        ]},
        courage: {type: 'stat', max: 10, cost: 15, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        damage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.2}
        ]},
        health_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        critMult_3: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.2}
        ]},
        strength_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        recovery_2: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 80},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.004}
        ]},
        damage_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.2}
        ]},
        health_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 60}
        ]},
        critChance_4: {type: 'stat', max: 5, cost: 20, effect: [
            {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03}
        ]},
        intelligence_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.75}
        ]},
        haste_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4}
        ]},
        energy_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['critMult', 'energyOnCrit', 'longshot']},
        {level: 1, items: ['eagleEye', 'strength', 'critMult_2', 'energy', 'recovery']},
        {level: 10, items: ['fireArrows', 'poisonArrow', 'damage', 'critChance', 'intelligence']},
        {isChoice: true, level: 20, items: [['healOnCrit', 'health'], ['reduceCooldownOnCrit', 'haste'], ['bloodOnCrit', 'blood']]},
        {level: 30, items: ['shockArrow', 'critChance_2', 'energy_2', 'health_2', 'intelligence_2']},
        {level: 40, items: ['sharpArrow', 'sharpMind', 'strength_2', 'health_3', 'haste_2']},
        {level: 50, items: ['forestBlessing', 'critChance_3', 'damage_2', 'courage']},
        {level: 75, items: ['damage_3', 'health_4', 'critMult_3', 'strength_3', 'recovery_2']},
        {level: 100, items: ['damage_4', 'health_5', 'critChance_4', 'intelligence_3', 'haste_3', 'energy_3']},
    ],
    quests: {
        stat: [
            {stat: 'hordeCritMult', type: 'total', value: 7},
            {stat: 'hordeCritChance', type: 'total', value: 0.6},
            {stat: 'hordeHealth', type: 'base', value: 1250},
            {stat: 'hordeIntelligence', type: 'total', value: 35},
            {stat: 'hordeHaste', type: 'total', value: 120},
            {stat: 'hordeCritChance', type: 'total', value: 1.1},
            {stat: 'hordeStrength', type: 'total', value: 85},
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
