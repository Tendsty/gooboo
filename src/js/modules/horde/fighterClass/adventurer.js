import { SECONDS_PER_HOUR } from "../../../constants";
import { getSequence } from "../../../utils/math";

export default {
    icon: 'mdi-bag-personal',
    baseStats: {
        attack: 5,
        health: 500,
        energy: 200,
        energyRegen: 1,
        mana: 120,
        manaRegen: 0.01
    },
    exp: {
        base: 600,
        increment: 1.2
    },
    skills: {
        energyConvert: {
            type: 'passive',
            color: 'amber',
            icon: 'mdi-lightning-bolt',
            max: 1,
            effect: [
                {name: 'hordeEnergyToStr', type: 'tag', value: lvl => [lvl * 0.02]},
                {name: 'hordeEnergyToEnergyReg', type: 'tag', value: lvl => [lvl * 0.005]}
            ]
        },
        stab: {
            type: 'active',
            color: 'red',
            icon: 'mdi-knife',
            max: 1,
            cooldown: () => 8,
            activeCost: () => {return {energy: 30};},
            active() {
                return [
                    {type: 'damagePhysic', value: 2, str: 0.1, int: 0.05}
                ];
            },
            activeType: 'combat'
        },
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70}
        ]},
        strength: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.3}
        ]},
        energy: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        brawl: {
            type: 'active',
            color: 'orange',
            icon: 'mdi-arm-flex',
            max: 5,
            cost: 20,
            cooldown: () => 60,
            activeCost: () => {return {energy: 140};},
            active(lvl) {
                return [
                    {type: 'buff', value: 18, effect: [
                        {type: 'base', name: 'hordeStrength', value: 10 * lvl},
                        {type: 'mult', name: 'hordeAttack', value: 1.3}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        strength_2: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.5}
        ]},
        spark: {
            type: 'active',
            color: 'light-blue',
            icon: 'mdi-flare',
            max: 5,
            cost: 20,
            cooldown: () => 6,
            activeCost: () => {return {mana: 12};},
            active() {
                return [
                    {type: 'damageMagic', value: 2.5, int: 0.35}
                ];
            },
            activeType: 'combat'
        },
        intelligence: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.8}
        ]},
        smash: {
            type: 'active',
            color: 'brown',
            icon: 'mdi-anvil',
            max: 5,
            cost: 20,
            cooldown: () => 22,
            activeCost: () => {return {energy: 60};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: 2.75},
                    {type: 'stun', value: lvl + 5}
                ];
            },
            activeType: 'combat'
        },
        haste: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4}
        ]},
        lootSearch: {
            type: 'active',
            color: 'light-green',
            icon: 'mdi-sack',
            max: 5,
            cost: 20,
            cooldown: () => 300,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'blood', value: 9 + lvl}
                ];
            },
            activeType: 'utility'
        },
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.15}
        ]},
        energy_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.15}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70}
        ]},
        recovery: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 25},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.008}
        ]},
        combatHeal: {
            type: 'active',
            color: 'green',
            icon: 'mdi-medication',
            max: 5,
            cost: 20,
            cooldown: () => 45,
            activeCost: () => {return {mana: 55};},
            active(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.05 + 0.125, int: 0.004}
                ];
            },
            activeType: 'combat'
        },
        energy_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        mana: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 20}
        ]},
        blood: {type: 'stat', max: 20, cost: 15, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(3, lvl) * 0.05 + 1},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => getSequence(3, lvl) * 0.05 + 1}
        ]},
        courage: {type: 'stat', max: 20, cost: 15, effect: [
            {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
        ]},
        supercharge: {
            type: 'active',
            color: 'amber',
            icon: 'mdi-lightning-bolt',
            max: 5,
            cost: 20,
            cooldown: () => 22 * SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeEnergy_base', value: lvl * 5 + 5}
                ];
            },
            activeType: 'utility'
        },
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['energyConvert', 'stab']},
        {level: 1, items: ['health', 'strength', 'energy']},
        {isChoice: true, level: 10, items: [['brawl', 'strength_2'], ['spark', 'intelligence'], ['smash', 'haste']]},
        {level: 20, items: ['lootSearch', 'damage', 'energy_2']},
        {level: 30, items: ['damage_2', 'health_2', 'recovery']},
        {level: 40, items: ['combatHeal', 'energy_3', 'mana']},
        {isChoice: true, level: 50, items: [['blood'], ['courage'], ['supercharge']]},
    ],
    quests: {
        stat: [
            {stat: 'hordeHealth', type: 'base', value: 1000},
            {stat: 'hordeIntelligence', type: 'total', value: 20},
            {stat: 'hordeStrength', type: 'total', value: 90},
        ],
        zone: [
            {area: 'warzone', zone: '1'},
            {area: 'warzone', zone: '3'},
            {area: 'warzone', zone: '5'},
            {area: 'warzone', zone: '10'},
            {area: 'monkeyJungle', zone: '7'},
            {area: 'monkeyJungle', zone: '14'},
            {area: 'loveIsland', zone: '1'},
            {area: 'loveIsland', zone: '8'},
        ],
        level: [7, 15, 25, 40, 60, 80, 100, 125, 150, 175, 200],
        boss: [
            {boss: 'ohilio', difficulty: 3},
            {boss: 'chriz2', difficulty: 5},
            {boss: 'mina', difficulty: 15},
        ]
    }
}
