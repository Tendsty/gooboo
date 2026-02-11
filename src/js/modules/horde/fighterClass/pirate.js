import { HORDE_STACKING_COOLDOWN, SECONDS_PER_HOUR } from "../../../constants";
import { buildNum } from "../../../utils/format";

export default {
    unlock: 'hordeClassPirate',
    icon: 'mdi-pirate',
    baseStats: {
        attack: 3.3,
        health: 285,
        energy: 150,
        energyRegen: 1,
        mana: 100,
        manaRegen: 0.01
    },
    exp: {
        base: 1800,
        increment: 1.4
    },
    courageMult: 8.5,
    skills: {
        challenge: {
            type: 'passive',
            color: 'orange-red',
            icon: 'mdi-screwdriver',
            max: 1,
            effect: [
                {name: 'currencyHordeLockpickGain', type: 'base', value: lvl => lvl / buildNum(100, 'K')}
            ]
        },
        parrotAttack: {
            type: 'active',
            color: 'cyan',
            icon: 'mdi-bird',
            max: 1,
            cooldown: () => 14,
            activeCost: () => {return {energy: 50};},
            active() {
                return [
                    {type: 'maxdamageBio', value: 0.2, int: 0.001},
                    {type: 'damagePhysic', value: 2.6, str: 0.5}
                ];
            },
            activeType: 'combat'
        },
        plunder: {
            type: 'active',
            color: 'light-green',
            icon: 'mdi-sack',
            max: 1,
            cooldown: () => SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active() {
                return [
                    {type: 'blood', value: 80}
                ];
            },
            activeType: 'utility'
        },
        bottleOBrew: {
            type: 'active',
            color: 'pink',
            icon: 'mdi-bottle-tonic',
            max: 5,
            cost: 20,
            cooldown: () => 120,
            activeCost: () => {return {mana: 7};},
            active(lvl) {
                return [
                    {type: 'buff', value: 30, effect: [
                        {type: 'mult', name: 'hordeAttack', value: lvl * 0.25 + 1.75},
                        {type: 'base', name: 'hordeCritChance', value: 0.4},
                        {type: 'base', name: 'hordeCritMult', value: 1.5},
                        {type: 'mult', name: 'hordePhysicTaken', value: 1 / (lvl * 0.25 + 1.75)},
                        {type: 'mult', name: 'hordeMagicTaken', value: 1 / (lvl * 0.25 + 1.75)},
                        {type: 'mult', name: 'hordeBioTaken', value: 1 / (lvl * 0.25 + 1.75)},
                        {type: 'base', name: 'hordeRecovery', value: 0.25},
                        {type: 'base', name: 'hordeDefense', value: 0.02},
                    ]}
                ];
            },
            activeType: 'combat'
        },
        energy: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        mana: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 25}
        ]},
        blood: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        courage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        bombToss: {
            type: 'active',
            color: 'grey',
            icon: 'mdi-bomb',
            max: 5,
            cost: 20,
            cooldown: () => 22,
            activeCost: () => {return {energy: 70};},
            active(lvl) {
                return [
                    {type: 'damageMagic', value: lvl + 6.5, int: 0.8}
                ];
            },
            activeType: 'combat'
        },
        health: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 40}
        ]},
        energy_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        blood_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        lockpick: {type: 'stat', max: 4, cost: 15, effect: [
            {name: 'currencyHordeLockpickGain', type: 'base', value: lvl => lvl / buildNum(2, 'M')}
        ]},
        blood_3: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.025, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.05, lvl)},
        ]},
        courage_2: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.03 + 1}
        ]},
        trinket: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeTrinketGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
        ]},
        cannonball: {
            type: 'active',
            color: 'dark-grey',
            icon: 'mdi-circle-slice-8',
            max: 5,
            cost: 20,
            cooldown: () => 35,
            activeCost: () => {return {energy: 120};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 1.2 + 7.8, str: 0.9},
                    {type: 'stun', value: lvl + 3}
                ];
            },
            activeType: 'combat'
        },
        invigoratingBottle: {
            type: 'active',
            color: 'amber',
            icon: 'mdi-bottle-tonic',
            max: 5,
            cost: 20,
            cooldown: lvl => 210 - 30 * lvl,
            activeCost: lvl => {return {mana: 7 - lvl};},
            active() {
                return [
                    {type: 'refillEnergy', value: 1}
                ];
            },
            activeType: 'combat'
        },
        damage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.1}
        ]},
        blood_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        courage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        lockpick_2: {type: 'stat', max: 4, cost: 15, effect: [
            {name: 'currencyHordeLockpickGain', type: 'base', value: lvl => lvl / buildNum(2, 'M')}
        ]},
        treasureChest: {
            type: 'active',
            color: 'wooden',
            icon: 'mdi-treasure-chest',
            max: 5,
            cost: 20,
            cooldown: () => HORDE_STACKING_COOLDOWN,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'currencyHordeBloodGain_mult', value: lvl * 0.07 + 0.07}
                ];
            },
            activeType: 'utility'
        },
        blood_5: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.025 + 1)}
        ]},
        bountyBoard: {
            type: 'passive',
            color: 'orange-red',
            icon: 'mdi-screwdriver',
            max: 1,
            cost: 100,
            effect: [
                {name: 'currencyHordeLockpickGain', type: 'mult', value: lvl => lvl * 0.25 + 1},
                {name: 'currencyHordeLockpickCap', type: 'base', value: lvl => lvl * 21},
            ]
        },
        lockpick_3: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'currencyHordeLockpickGain', type: 'base', value: lvl => lvl / buildNum(2.5, 'M')}
        ]},
        trinket_2: {type: 'stat', max: 25, cost: 10, effect: [
            {name: 'hordeTrinketGain', type: 'mult', value: lvl => Math.pow(1.05, lvl) * (lvl * 0.08 + 1)},
            {name: 'hordeTrinketQuality', type: 'base', value: lvl => lvl * -1},
        ]},
        pirateShip: {
            type: 'active',
            color: 'brown',
            icon: 'mdi-ship-wheel',
            max: 5,
            cost: 20,
            cooldown: lvl => 570 - 60 * lvl,
            activeCost: () => {return {energy: 250, mana: 30};},
            active(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 3 + 18, str: 1.8},
                    {type: 'damageMagic', value: lvl * 2 + 14.5, int: 2.35},
                    {type: 'buff', value: lvl * 5 + 25, effect: [
                        {type: 'mult', name: 'hordeAttack', value: lvl * 0.35 + 2.25},
                        {type: 'base', name: 'hordeCutting', value: 0.15},
                        {type: 'mult', name: 'hordeRespawn', value: 0.01},
                    ]}
                ];
            },
            activeType: 'combat'
        },
        strength: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.1}
        ]},
        intelligence: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        mana_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 25}
        ]},
        haste_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        blood_6: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        damage_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.1}
        ]},
        health_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 40}
        ]},
        blood_7: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        strength_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeStrength', type: 'base', value: lvl => lvl * 1.1}
        ]},
        energy_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 40}
        ]},
        damage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeAttack', type: 'base', value: lvl => lvl * 0.1}
        ]},
        health_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHealth', type: 'base', value: lvl => lvl * 40}
        ]},
        blood_8: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => Math.pow(1.02, lvl)},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.04, lvl)},
        ]},
        courage_4: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeCourageScore', type: 'mult', value: lvl => lvl * 0.02 + 1}
        ]},
        intelligence_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 1.3}
        ]},
        mana_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeMana', type: 'base', value: lvl => lvl * 25}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['challenge', 'parrotAttack', 'plunder']},
        {level: 1, items: ['bottleOBrew', 'energy', 'mana', 'blood', 'courage']},
        {level: 10, items: ['bombToss', 'health', 'energy_2', 'haste', 'blood_2', 'lockpick']},
        {isChoice: true, level: 20, items: [['blood_3'], ['courage_2'], ['trinket']]},
        {level: 30, items: ['cannonball', 'invigoratingBottle', 'damage', 'blood_4', 'courage_3', 'lockpick_2']},
        {isChoice: true, level: 40, items: [['treasureChest', 'blood_5'], ['bountyBoard', 'lockpick_3'], ['trinket_2']]},
        {level: 50, items: ['pirateShip', 'strength', 'intelligence', 'mana_2', 'haste_2', 'blood_6']},
        {level: 75, items: ['damage_2', 'health_2', 'blood_7', 'strength_2', 'energy_3']},
        {level: 100, items: ['damage_3', 'health_3', 'blood_8', 'courage_4', 'intelligence_2', 'mana_3']},
    ],
    quests: {
        stat: [
            {stat: 'hordeMana', type: 'total', value: 490},
            {stat: 'hordeEnergy', type: 'total', value: 1200},
            {stat: 'hordeHaste', type: 'total', value: 70},
            {stat: 'hordeAttack', type: 'base', value: 4.25},
            {stat: 'hordeHealth', type: 'base', value: 925},
            {stat: 'hordeIntelligence', type: 'total', value: 35},
            {stat: 'hordeStrength', type: 'total', value: 44},
        ],
        zone: [
            {area: 'monkeyJungle', zone: '2'},
            {area: 'monkeyJungle', zone: '8'},
            {area: 'monkeyJungle', zone: '18'},
            {area: 'loveIsland', zone: '4'},
            {area: 'loveIsland', zone: '10'},
        ],
        level: [25, 40, 55, 75, 95, 120, 150, 180],
        boss: [
            {boss: 'ohilio', difficulty: 30},
            {boss: 'chriz2', difficulty: 20},
            {boss: 'mina', difficulty: 5},
        ]
    }
}
