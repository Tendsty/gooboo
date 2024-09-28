import { SECONDS_PER_HOUR } from "../../../constants";

export default {
    unlock: 'hordeClassMage',
    icon: 'mdi-wizard-hat',
    baseStats: {
        attack: 4,
        health: 575,
        mana: 400,
        manaRegen: 0.1
    },
    exp: {
        base: 840,
        increment: 1.24
    },
    courageMult: 4,
    skills: {
        manaRest: {
            type: 'passive',
            color: 'blue',
            icon: 'mdi-sleep',
            max: 1,
            effect: [
                {name: 'hordeManaRest', type: 'tag', value: lvl => [15, lvl * 1.2]}
            ]
        },
        autocast: {
            type: 'passive',
            color: 'pink',
            icon: 'mdi-cached',
            max: 3,
            cost: 75,
            effect: [
                {name: 'hordeAutocast', type: 'base', value: lvl => lvl}
            ]
        },
        magicMissile: {
            type: 'active',
            color: 'indigo',
            icon: 'mdi-motion',
            max: 1,
            cooldown: () => 6,
            activeCost: () => {return {mana: 10};},
            active() {
                return [
                    {type: 'damageMagic', value: 2.2, int: 0.16}
                ];
            },
            activeType: 'combat'
        },
        fireball: {
            type: 'active',
            color: 'orange',
            icon: 'mdi-fire-circle',
            max: 5,
            cost: 14,
            cooldown: () => 13,
            activeCost: () => {return {mana: 22};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.1 + 3.3, int: 0.24, canCrit: lvl * 0.1 + 0.5}
                ];
            },
            activeType: 'combat'
        },
        shockBlast: {
            type: 'active',
            color: 'yellow',
            icon: 'mdi-flash',
            max: 5,
            cost: 14,
            cooldown: () => 28,
            activeCost: () => {return {mana: 30};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.3 + 4.5, int: 0.3},
                    {type: 'silence', value: lvl * 2 + 4}
                ];
            },
            activeType: 'combat'
        },
        heal: {
            type: 'active',
            color: 'green',
            icon: 'mdi-medical-bag',
            max: 5,
            cost: 14,
            cooldown: (lvl) => 55 - lvl * 5,
            activeCost: () => {return {mana: 65};},
            active() {
                return [
                    {type: 'heal', value: 0.6, int: 0.01}
                ];
            },
            activeType: 'combat'
        },
        mana: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 50}
        ]},
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.4}
        ]},
        barrier: {
            type: 'active',
            color: 'light-grey',
            icon: 'mdi-circle-outline',
            max: 5,
            cost: 16,
            cooldown: () => 36,
            activeCost: () => {return {mana: 40};},
            active(lvl) {
                return [
                    {type: 'divisionShield', value: lvl * 3 + 1}
                ];
            },
            activeType: 'combat'
        },
        earthquake: {
            type: 'active',
            color: 'brown',
            icon: 'mdi-landslide',
            max: 5,
            cost: 16,
            cooldown: () => 30,
            activeCost: () => {return {mana: 48};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: 3.75, int: 0.22},
                    {type: 'stun', value: lvl + 3}
                ];
            },
            activeType: 'combat'
        },
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.4}
        ]},
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70}
        ]},
        manasteal: {
            type: 'passive',
            color: 'teal',
            icon: 'mdi-water-plus',
            max: 3,
            cost: 40,
            effect: [
                {name: 'hordeManasteal', type: 'tag', value: lvl => [lvl * 5]}
            ]
        },
        waterBolt: {
            type: 'active',
            color: 'light-blue',
            icon: 'mdi-waves',
            max: 5,
            cost: 18,
            cooldown: () => 75,
            activeCost: () => {return {mana: 130};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.6 + 8, int: 0.36},
                    {type: 'heal', value: lvl * 0.025 + 0.075, int: 0.006}
                ];
            },
            activeType: 'combat'
        },
        iceBlast: {
            type: 'active',
            color: 'cyan',
            icon: 'mdi-snowflake-alert',
            max: 5,
            cost: 18,
            cooldown: (lvl) => 38 - lvl * 4,
            activeCost: () => {return {mana: 85};},
            active(lvl) {
                return [
                    {type: 'stun', value: lvl * 2 + 6},
                    {type: 'removeAttack', value: lvl * 0.02 + 0.1}
                ];
            },
            activeType: 'combat'
        },
        mana_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 50}
        ]},
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        autocast_2: {
            type: 'passive',
            color: 'pink',
            icon: 'mdi-cached',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeAutocast', type: 'base', value: lvl => lvl}
            ]
        },
        mana_3: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 40},
            {name: 'hordeManaRegen', type: 'base', value: lvl => lvl * 0.08}
        ]},
        spellblade: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeSpellblade', type: 'base', value: lvl => lvl * 0.2}
        ]},
        focus: {
            type: 'active',
            color: 'purple',
            icon: 'mdi-crystal-ball',
            max: 5,
            cost: 20,
            cooldown: () => 180,
            activeCost: () => {return {mana: 125};},
            active(lvl) {
                return [
                    {type: 'buff', value: 60, effect: [
                        {type: 'base', name: 'hordeIntelligence', value: 8 * lvl}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        smite: {
            type: 'active',
            color: 'red',
            icon: 'mdi-nuke',
            max: 5,
            cost: 20,
            cooldown: (lvl) => 95 - lvl * 5,
            activeCost: () => {return {mana: 250};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 4 + 18, int: 0.8}
                ];
            },
            activeType: 'combat'
        },
        intelligence_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.4}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70}
        ]},
        autocast_3: {
            type: 'passive',
            color: 'pink',
            icon: 'mdi-cached',
            max: 1,
            cost: 50,
            effect: [
                {name: 'hordeAutocast', type: 'base', value: lvl => lvl}
            ]
        },
        conjure: {
            type: 'active',
            color: 'red-pink',
            icon: 'mdi-sack',
            max: 5,
            cost: 20,
            cooldown: () => 900,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'blood', value: lvl * 5 + 25}
                ];
            },
            activeType: 'utility'
        },
        ascend: {
            type: 'active',
            color: 'amber',
            icon: 'mdi-star-face',
            max: 5,
            cost: 20,
            cooldown: (lvl) => 8100 - lvl * 900,
            activeCost: () => {return {mana: 1000};},
            active(lvl) {
                return [
                    {type: 'buff', value: 150, effect: [
                        {type: 'mult', name: 'hordeAttack', value: lvl * 0.15 + 1.25},
                        {type: 'mult', name: 'hordeHealth', value: lvl * 0.15 + 1.25},
                        {type: 'base', name: 'hordeRecovery', value: lvl * 0.03 + 0.05},
                        {type: 'base', name: 'hordeManaRegen', value: lvl * 2 + 10},
                    ]}
                ];
            },
            activeType: 'combat'
        },
        deepFocus: {
            type: 'active',
            color: 'blue',
            icon: 'mdi-water',
            max: 5,
            cost: 20,
            cooldown: () => 22 * SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeMana_base', value: lvl * 10 + 10}
                ];
            },
            activeType: 'utility'
        },
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['manaRest', 'autocast', 'magicMissile']},
        {level: 1, items: ['fireball', 'shockBlast', 'heal', 'mana', 'intelligence']},
        {level: 10, items: ['barrier', 'earthquake', 'intelligence_2', 'haste', 'health']},
        {level: 20, items: ['manasteal', 'waterBolt', 'iceBlast', 'mana_2', 'haste_2']},
        {isChoice: true, level: 30, items: [['autocast_2'], ['mana_3'], ['spellblade']]},
        {level: 40, items: ['focus', 'smite', 'intelligence_3', 'health_2']},
        {isChoice: true, level: 50, items: [['autocast_3'], ['conjure'], ['ascend'], ['deepFocus']]},
    ],
    quests: {
        stat: [
            {stat: 'hordeMana', type: 'total', value: 1000},
            {stat: 'hordeHaste', type: 'total', value: 60},
            {stat: 'hordeMana', type: 'total', value: 2500},
        ],
        zone: [
            {area: 'warzone', zone: '7'},
            {area: 'monkeyJungle', zone: '4'},
            {area: 'monkeyJungle', zone: '11'},
            {area: 'monkeyJungle', zone: '17'},
            {area: 'loveIsland', zone: '5'},
            {area: 'loveIsland', zone: '13'},
        ],
        level: [15, 30, 45, 60, 85, 110, 135, 160, 185],
        boss: [
            {boss: 'ohilio', difficulty: 12},
            {boss: 'chriz2', difficulty: 3},
            {boss: 'mina', difficulty: 25},
        ]
    }
}
