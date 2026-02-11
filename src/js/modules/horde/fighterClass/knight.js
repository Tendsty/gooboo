import { HORDE_STACKING_COOLDOWN } from "../../../constants";

export default {
    unlock: 'hordeClassKnight',
    icon: 'mdi-shield',
    baseStats: {
        attack: 2.5,
        health: 900,
        energy: 160,
        energyRegen: 1.5
    },
    exp: {
        base: 1200,
        increment: 1.3
    },
    courageMult: 4,
    skills: {
        damageRamp: {
            type: 'passive',
            color: 'red',
            icon: 'mdi-chart-line',
            max: 1,
            effect: [
                {name: 'hordeAttackAfterTime', type: 'tag', value: lvl => [lvl * 0.75]}
            ]
        },
        revive: {type: 'statBig', max: 1, effect: [
            {name: 'hordeRevive', type: 'base', value: lvl => lvl}
        ]},
        heavyHit: {
            type: 'active',
            color: 'orange-red',
            icon: 'mdi-sword',
            max: 1,
            cooldown: () => 70,
            activeCost: () => {return {energy: 140};},
            active() {
                return [
                    {type: 'damagePhysic', value: 8, str: 0.6},
                    {type: 'damageMagic', value: 8, int: 0.75}
                ];
            },
            activeType: 'combat'
        },
        shieldBash: {
            type: 'active',
            color: 'brown',
            icon: 'mdi-shield',
            max: 5,
            cost: 20,
            cooldown: () => 16,
            activeCost: () => {return {energy: 100};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.25 + 2.25, str: 0.2},
                    {type: 'stun', value: lvl + 2}
                ];
            },
            activeType: 'combat'
        },
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 120}
        ]},
        defense: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeDefense', type: 'base', value: lvl => lvl * 0.001}
        ]},
        energy_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 35}
        ]},
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        statRamp: {
            type: 'passive',
            color: 'pink-purple',
            icon: 'mdi-chart-line',
            max: 5,
            cost: 40,
            effect: [
                {name: 'hordeStrIntAfterTime', type: 'tag', value: lvl => [lvl * 8]}
            ]
        },
        defense_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeDefense', type: 'base', value: lvl => lvl * 0.0012}
        ]},
        toxic: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeToxic', type: 'base', value: lvl => lvl * 0.005}
        ]},
        magicTaken: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMagicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.09, lvl)}
        ]},
        cutting: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeCutting', type: 'base', value: lvl => lvl * 0.002}
        ]},
        physicTaken: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordePhysicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.09, lvl)}
        ]},
        refuge: {
            type: 'active',
            color: 'green',
            icon: 'mdi-medical-cotton-swab',
            max: 5,
            cost: 20,
            cooldown: () => 50,
            activeCost: () => {return {energy: 120};},
            active(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.05 + 0.15, int: 0.006},
                    {type: 'buff', value: lvl * 2 + 8, effect: [
                        {type: 'mult', name: 'hordePhysicTaken', value: 1 / 1.4},
                        {type: 'mult', name: 'hordeMagicTaken', value: 1 / 1.4},
                        {type: 'mult', name: 'hordeBioTaken', value: 1 / 1.4}
                    ]}
                ];
            },
            activeType: 'combat'
        },
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 120}
        ]},
        recovery: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 35},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.01}
        ]},
        physicTaken_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordePhysicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.08, lvl)}
        ]},
        strength: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.2}
        ]},
        consecrate: {
            type: 'active',
            color: 'amber',
            icon: 'mdi-shimmer',
            max: 5,
            cost: 20,
            cooldown: () => 28,
            activeCost: () => {return {energy: 50};},
            active(lvl) {
                return [
                    {type: 'removeAttack', value: lvl * 0.02 + 0.06},
                    {type: 'stun', value: lvl + 4},
                ];
            },
            activeType: 'combat'
        },
        energy: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        blessing: {
            type: 'active',
            color: 'yellow',
            icon: 'mdi-cross-outline',
            max: 5,
            cost: 20,
            cooldown: (lvl) => 3600 - lvl * 400,
            activeCost: () => {return {energy: 160};},
            active(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.3 + 0.9, int: 0.02},
                    {type: 'revive', value: 2},
                ];
            },
            activeType: 'combat'
        },
        revive_2: {type: 'statBig', max: 3, cost: 50, effect: [
            {name: 'hordeRevive', type: 'base', value: lvl => lvl}
        ]},
        fortify: {
            type: 'active',
            color: 'pale-green',
            icon: 'mdi-heart',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'hordeHealth_base', value: lvl * 30 + 30}
                ];
            },
            activeType: 'utility'
        },
        bioTaken: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeBioTaken', type: 'mult', value: lvl => Math.pow(1 / 1.09, lvl)}
        ]},
        parry: {
            type: 'active',
            color: 'deep-purple',
            icon: 'mdi-fencing',
            max: 5,
            cost: 20,
            cooldown: () => 26,
            activeCost: () => {return {energy: 60};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.7 + 3.9, str: 0.35},
                    {type: 'divisionShield', value: lvl + 1}
                ];
            },
            activeType: 'combat'
        },
        health_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 120}
        ]},
        magicTaken_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMagicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.08, lvl)}
        ]},
        divisionShield: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeDivisionShield', type: 'base', value: lvl => lvl}
        ]},
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        smite2: {
            type: 'active',
            color: 'blue-grey',
            icon: 'mdi-weather-lightning',
            max: 5,
            cost: 20,
            cooldown: () => 135,
            activeCost: () => {return {energy: 200};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 2 + 11, int: 1.1, canCrit: lvl * 0.15 + 0.25},
                    {type: 'heal', value: lvl * 0.01 + 0.05, int: 0.001}
                ];
            },
            activeType: 'combat'
        },
        recovery_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 35},
            {name: 'hordeRecovery', type: 'base', value: lvl => lvl * 0.01}
        ]},
        defense_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeDefense', type: 'base', value: lvl => lvl * 0.001}
        ]},
        courage: {type: 'stat', max: 10, cost: 15, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.08}
        ]},
        health_4: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 120}
        ]},
        physicTaken_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordePhysicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.08, lvl)}
        ]},
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.2}
        ]},
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.08}
        ]},
        health_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 120}
        ]},
        magicTaken_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMagicTaken', type: 'mult', value: lvl => Math.pow(1 / 1.08, lvl)}
        ]},
        divisionShield_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeDivisionShield', type: 'base', value: lvl => lvl}
        ]},
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        energy_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 35}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['damageRamp', 'revive', 'heavyHit']},
        {level: 1, items: ['shieldBash', 'health', 'defense', 'energy_2', 'haste']},
        {isChoice: true, level: 10, items: [['statRamp', 'defense_2'], ['toxic', 'physicTaken'], ['cutting', 'magicTaken']]},
        {level: 20, items: ['refuge', 'health_2', 'recovery', 'physicTaken_2', 'strength']},
        {isChoice: true, level: 30, items: [['consecrate', 'energy'], ['blessing', 'revive_2'], ['fortify', 'bioTaken']]},
        {level: 40, items: ['parry', 'health_3', 'magicTaken_2', 'divisionShield', 'intelligence']},
        {level: 50, items: ['smite2', 'recovery_2', 'defense_3', 'courage']},
        {level: 75, items: ['damage', 'health_4', 'physicTaken_3', 'strength_2', 'haste_2']},
        {level: 100, items: ['damage_2', 'health_5', 'magicTaken_3', 'divisionShield_2', 'intelligence_2', 'energy_3']},
    ],
    quests: {
        stat: [
            {stat: 'hordeEnergy', type: 'total', value: 500},
            {stat: 'hordeCutting', type: 'total', value: 0.03},
            {stat: 'hordeHealth', type: 'base', value: 3000},
            {stat: 'hordeRevive', type: 'total', value: 7},
            {stat: 'hordeHealth', type: 'base', value: 6000},
            {stat: 'hordeDefense', type: 'total', value: 0.03},
            {stat: 'hordeHaste', type: 'total', value: 105},
        ],
        zone: [
            {area: 'warzone', zone: '9'},
            {area: 'monkeyJungle', zone: '6'},
            {area: 'monkeyJungle', zone: '13'},
            {area: 'monkeyJungle', zone: '19'},
            {area: 'loveIsland', zone: '6'},
            {area: 'loveIsland', zone: '14'},
        ],
        level: [20, 35, 50, 70, 90, 115, 140, 165, 190],
        boss: [
            {boss: 'ohilio', difficulty: 20},
            {boss: 'chriz2', difficulty: 15},
            {boss: 'mina', difficulty: 2},
        ]
    }
}
