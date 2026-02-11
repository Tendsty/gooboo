import { HORDE_STACKING_COOLDOWN } from "../../../constants";

export default {
    unlock: 'hordeClassAssassin',
    icon: 'mdi-robber',
    baseStats: {
        attack: 8.5,
        health: 275,
        mana: 90,
        manaRegen: 0.01
    },
    exp: {
        base: 2700,
        increment: 1.5
    },
    courageMult: 20,
    skills: {
        sneak: {
            type: 'passive',
            color: 'pale-light-blue',
            icon: 'mdi-shoe-sneaker',
            max: 1,
            effect: [
                {name: 'hordeRespawnFaster', type: 'text', value: lvl => lvl >= 1}
            ]
        },
        elementOfSurprise: {
            type: 'passive',
            color: 'red',
            icon: 'mdi-account-question',
            max: 3,
            cost: 50,
            effect: [
                {name: 'hordeFirstAttacksCrit', type: 'tag', value: lvl => [lvl]}
            ]
        },
        backstab: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-knife-military',
            max: 1,
            cooldown: () => 5,
            activeCost: () => {return {mana: 1};},
            active() {
                return [
                    {type: 'damageMagic', value: 3.25, str: 0.2, int: 0.4, canCrit: 0.5}
                ];
            },
            activeType: 'combat'
        },
        smokeBomb: {
            type: 'active',
            color: 'dark-grey',
            icon: 'mdi-smoke',
            max: 5,
            cost: 20,
            cooldown: () => 50,
            activeCost: () => {return {mana: 5};},
            active(lvl) {
                return [
                    {type: 'buff', value: lvl + 5, canCrit: lvl * 0.05 + 0.25, effect: [
                        {type: 'mult', name: 'hordePhysicTaken', value: 0.125},
                        {type: 'mult', name: 'hordeMagicTaken', value: 0.5}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        firstStrike: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeFirstStrike', type: 'base', value: lvl => lvl * 0.2}
        ]},
        critMult: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.1}
        ]},
        mana: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 15}
        ]},
        comboStrike: {
            type: 'passive',
            color: 'amber',
            icon: 'mdi-fencing',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeManasteal', type: 'tag', value: lvl => [lvl]}
            ]
        },
        spellblade: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeSpellblade', type: 'base', value: lvl => lvl * 0.2}
        ]},
        cursedDagger: {
            type: 'active',
            color: 'deep-purple',
            icon: 'mdi-skull',
            max: 5,
            cost: 20,
            cooldown: () => 220,
            activeCost: () => {return {mana: 10};},
            active(lvl) {
                return [
                    {type: 'buff', value: lvl * 5 + 15, canCrit: lvl * 0.05 + 0.25, effect: [
                        {type: 'mult', name: 'hordeAttack', value: lvl * 0.05 + 1.25},
                        {type: 'base', name: 'hordeMagicConversion', value: 2.5}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        magicAttack: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeMagicAttack', type: 'mult', value: lvl => lvl * 0.06 + 1}
        ]},
        swiftStrike: {
            type: 'active',
            color: 'deep-orange',
            icon: 'mdi-karate',
            max: 5,
            cost: 20,
            cooldown: () => 18,
            activeCost: () => {return {mana: 3};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.7 + 6.7, str: 0.5, canCrit: lvl * 0.05 + 0.25}
                ];
            },
            activeType: 'combat'
        },
        strength: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.6}
        ]},
        shuriken: {
            type: 'active',
            color: 'light-blue',
            icon: 'mdi-shuriken',
            max: 5,
            cost: 20,
            cooldown: () => 15,
            activeCost: () => {return {mana: 12};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.9 + 8.7, str: 0.3, int: 0.7, canCrit: lvl * 0.05 + 0.25}
                ];
            },
            activeType: 'combat'
        },
        knockout: {
            type: 'passive',
            color: 'brown',
            icon: 'mdi-bell-sleep',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeStunOnCrit', type: 'tag', value: lvl => [lvl * 3]}
            ]
        },
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.5}
        ]},
        critMult_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.1}
        ]},
        mana_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 15}
        ]},
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 35}
        ]},
        hiddenExplosive: {
            type: 'active',
            color: 'pink',
            icon: 'mdi-bomb',
            max: 5,
            cost: 20,
            cooldown: lvl => 115 - lvl * 10,
            activeCost: () => {return {mana: 20};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 2.2 + 18.8, int: 1.5, canCrit: lvl * 0.075 + 0.375}
                ];
            },
            activeType: 'combat'
        },
        herbTea: {
            type: 'active',
            color: 'light-green',
            icon: 'mdi-tea',
            max: 5,
            cost: 20,
            cooldown: lvl => 40 - lvl * 4,
            activeCost: () => {return {mana: 14};},
            active(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.025 + 0.175, int: 0.005, canCrit: lvl * 0.05 + 0.25},
                    {type: 'buff', value: lvl + 7, effect: [
                        {type: 'base', name: 'hordeRecovery', value: lvl * 0.02 + 0.1}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.5}
        ]},
        firstStrike_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeFirstStrike', type: 'base', value: lvl => lvl * 0.2}
        ]},
        spellblade_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeSpellblade', type: 'base', value: lvl => lvl * 0.15}
        ]},
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        meditation: {
            type: 'active',
            color: 'blue',
            icon: 'mdi-meditation',
            max: 5,
            cost: 20,
            cooldown: () => 390,
            activeCost: () => {return {mana: 25};},
            active(lvl) {
                return [
                    {type: 'buff', value: lvl * 5 + 25, canCrit: lvl * 0.05 + 0.25, effect: [
                        {type: 'base', name: 'hordeIntelligence', value: lvl * 6},
                        {type: 'base', name: 'hordeFirstStrike', value: lvl * 0.5 + 1},
                        {type: 'base', name: 'hordeSpellblade', value: lvl * 0.3 + 0.3}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        intelligence_3: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.7}
        ]},
        flow: {
            type: 'passive',
            color: 'cyan',
            icon: 'mdi-waterfall',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeManaToHaste', type: 'tag', value: lvl => [lvl * 0.1]}
            ]
        },
        mana_3: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 20}
        ]},
        pickpocket: {
            type: 'passive',
            color: 'cherry',
            icon: 'mdi-hand-extended',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeFastKillBonusBlood', type: 'tag', value: lvl => [lvl * 1.25]}
            ]
        },
        blood: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => lvl * 0.13 + 1}
        ]},
        secretTechnique: {
            type: 'active',
            color: 'pink-purple',
            icon: 'mdi-spear',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeFirstStrike_base', value: lvl * 0.05 + 0.05}
                ];
            },
            activeType: 'utility'
        },
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.25}
        ]},
        intelligence_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.5}
        ]},
        critMult_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.1}
        ]},
        courage: {type: 'stat', max: 10, cost: 15, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.25}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 35}
        ]},
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.4}
        ]},
        intelligence_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.5}
        ]},
        mana_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 15}
        ]},
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        damage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.25}
        ]},
        health_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 35}
        ]},
        critMult_4: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.1}
        ]},
        firstStrike_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeFirstStrike', type: 'base', value: lvl => lvl * 0.2}
        ]},
        spellblade_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeSpellblade', type: 'base', value: lvl => lvl * 0.15}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['sneak', 'elementOfSurprise', 'backstab']},
        {level: 1, items: ['smokeBomb', 'firstStrike', 'critMult', 'mana']},
        {isChoice: true, level: 10, items: [['comboStrike', 'spellblade'], ['cursedDagger', 'magicAttack'], ['swiftStrike', 'strength']]},
        {level: 20, items: ['shuriken', 'knockout', 'intelligence', 'critMult_2', 'mana_2', 'health']},
        {level: 30, items: ['hiddenExplosive', 'herbTea', 'intelligence_2', 'firstStrike_2', 'spellblade_2', 'haste']},
        {isChoice: true, level: 40, items: [['meditation', 'intelligence_3'], ['flow', 'mana_3'], ['pickpocket', 'blood']]},
        {level: 50, items: ['secretTechnique', 'damage', 'intelligence_4', 'critMult_3', 'courage']},
        {level: 75, items: ['damage_2', 'health_2', 'strength_2', 'intelligence_5', 'mana_4', 'haste_2']},
        {level: 100, items: ['damage_3', 'health_3', 'critMult_4', 'firstStrike_3', 'spellblade_3']},
    ],
    quests: {
        stat: [
            {stat: 'hordeFirstStrike', type: 'total', value: 5},
            {stat: 'hordeStrength', type: 'total', value: 40},
            {stat: 'hordeCritMult', type: 'total', value: 4.25},
            {stat: 'hordeSpellblade', type: 'total', value: 5.5},
            {stat: 'hordeHaste', type: 'total', value: 160},
            {stat: 'hordeIntelligence', type: 'total', value: 105},
            {stat: 'hordeHaste', type: 'total', value: 215},
        ],
        zone: [
            {area: 'monkeyJungle', zone: '8'},
            {area: 'monkeyJungle', zone: '19'},
            {area: 'loveIsland', zone: '6'},
            {area: 'loveIsland', zone: '11'},
        ],
        level: [30, 45, 60, 75, 100, 130, 160],
        boss: [
            {boss: 'ohilio', difficulty: 50},
            {boss: 'chriz2', difficulty: 35},
            {boss: 'mina', difficulty: 18},
        ]
    }
}
