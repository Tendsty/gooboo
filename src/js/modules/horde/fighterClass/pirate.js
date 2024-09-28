import { SECONDS_PER_HOUR } from "../../../constants";
import { buildNum } from "../../../utils/format";
import { getSequence } from "../../../utils/math";

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
    courageMult: 35,
    skills: {
        challenge: {
            type: 'passive',
            color: 'orange-red',
            icon: 'mdi-ticket',
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
            cooldown: () => 60,
            activeCost: () => {return {mana: 20};},
            active() {
                return [
                    {type: 'blood', value: 10}
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
            cooldown: () => 180,
            activeCost: () => {return {mana: 55};},
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
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(3, lvl) * 0.08 + 1}
        ]},
        courage: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
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
        blood_2: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(3, lvl) * 0.08 + 1}
        ]},
        blood_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.1 + 1)}
        ]},
        lockpick: {type: 'stat', max: 4, cost: 15, effect: [
            {name: 'currencyHordeLockpickGain', type: 'base', value: lvl => lvl / buildNum(2, 'M')}
        ]},
        blood_4: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(3, lvl) * 0.05 + 1},
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => getSequence(3, lvl) * 0.05 + 1}
        ]},
        courage_2: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
        ]},
        trinket: {type: 'stat', max: 20, cost: 10, effect: [
            {name: 'hordeTrinketGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
        ]},
        invigoratingBottle: {
            type: 'active',
            color: 'amber',
            icon: 'mdi-bottle-tonic',
            max: 5,
            cost: 20,
            cooldown: (lvl) => 210 - 30 * lvl,
            activeCost: (lvl) => {return {mana: 50 - 5 * lvl};},
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
        blood_5: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.1 + 1)}
        ]},
        courage_3: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeCourageGain', type: 'mult', value: lvl => lvl * 0.08 + 1}
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
            cooldown: () => 22 * SECONDS_PER_HOUR,
            activeCost: () => {return {};},
            active(lvl) {
                return [
                    {type: 'permanentStat', stat: 'currencyHordeBloodGain_mult', value: lvl * 0.07 + 0.07}
                ];
            },
            activeType: 'utility'
        },
        blood_6: {type: 'stat', max: 15, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.15, lvl) * (getSequence(3, lvl) * 0.1 + 1)}
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
        haste: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'hordeHaste', type: 'base', value: lvl => lvl * 3}
        ]},
        blood_7: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => getSequence(3, lvl) * 0.08 + 1}
        ]},
        blood_8: {type: 'stat', max: 10, cost: 10, effect: [
            {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.1 + 1)}
        ]},
    },
    skillTree: [
        {isInnate: true, level: 0, items: ['challenge', 'parrotAttack', 'plunder']},
        {level: 1, items: ['bottleOBrew', 'energy', 'mana', 'blood', 'courage']},
        {level: 10, items: ['bombToss', 'health', 'blood_2', 'blood_3', 'lockpick']},
        {isChoice: true, level: 20, items: [['blood_4'], ['courage_2'], ['trinket']]},
        {level: 30, items: ['invigoratingBottle', 'damage', 'blood_5', 'courage_3', 'lockpick_2']},
        {isChoice: true, level: 40, items: [['treasureChest', 'blood_6'], ['bountyBoard', 'lockpick_3'], ['trinket_2']]},
        {level: 50, items: ['haste', 'blood_7', 'blood_8']},
    ],
    quests: {
        stat: [
            {stat: 'hordeHealth', type: 'base', value: 1200},
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
