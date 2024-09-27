const needsEnergy = true;
const needsMana = true;

export default {
    vitality: {color: 'green', icon: 'mdi-heart', effect: [
        {name: 'hordeHealth', type: 'base', value: lvl => lvl * 70 + 30}
    ]},
    energy: {color: 'amber', icon: 'mdi-lightning-bolt', needsEnergy, effect: [
        {name: 'hordeEnergy', type: 'base', value: lvl => lvl * 35 + 20}
    ]},
    magic: {color: 'blue', icon: 'mdi-water', needsMana, effect: [
        {name: 'hordeMana', type: 'base', value: lvl => lvl * 25 + 15}
    ]},
    fists: {
        color: 'orange-red',
        icon: 'mdi-arm-flex',
        needsEnergy,
        cooldown: () => 15,
        activeCost: () => {return {energy: 25};},
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.4 + 3.1, str: 0.15}
            ];
        },
        activeType: 'combat'
    },
    sparks: {
        color: 'light-blue',
        icon: 'mdi-shimmer',
        rarity: 10,
        needsMana,
        cooldown: () => 9,
        activeCost: () => {return {mana: 5};},
        active(lvl) {
            return [
                {type: 'damageMagic', value: lvl * 0.55 + 3.65, int: 0.2}
            ];
        },
        activeType: 'combat'
    },
    haste: {color: 'pale-yellow', icon: 'mdi-timer-sand', rarity: 20, effect: [
        {name: 'hordeHaste', type: 'base', value: lvl => lvl * 4 + 8}
    ]},
    precision: {color: 'orange', icon: 'mdi-bullseye', rarity: 30, effect: [
        {name: 'hordeCritChance', type: 'base', value: lvl => lvl * 0.03 + 0.07}
    ]},
    wrath: {color: 'orange-red', icon: 'mdi-emoticon-angry', rarity: 40, effect: [
        {name: 'hordeCritMult', type: 'base', value: lvl => lvl * 0.08 + 0.3}
    ]},
    strength: {color: 'red', icon: 'mdi-arm-flex', rarity: 50, effect: [
        {name: 'hordeStrength', type: 'base', value: lvl => lvl * 3 + 5}
    ]},
    toxins: {
        color: 'light-green',
        icon: 'mdi-clouds',
        rarity: 60,
        cooldown: () => 135,
        activeCost: () => {return {};},
        active(lvl) {
            return [
                {type: 'maxdamageBio', value: lvl * 0.015 + 0.09},
                {type: 'removeAttack', value: lvl * 0.005 + 0.05}
            ];
        },
        activeType: 'combat'
    },
    wisdom: {color: 'indigo', icon: 'mdi-lightbulb-on', rarity: 70, effect: [
        {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 3 + 5}
    ]},
    extraction: {color: 'red', icon: 'mdi-water', rarity: 80, effect: [
        {name: 'currencyHordeBloodGain', type: 'mult', value: lvl => lvl * 0.04 + 1.16}
    ]},
    learning: {color: 'deep-purple', icon: 'mdi-school', rarity: 90, isTimeless: true, effect: [
        {name: 'hordeSkillPointsPerLevel', type: 'base', value: () => 1}
    ]},
    preservation: {color: 'red', icon: 'mdi-iv-bag', rarity: 100, effect: [
        {name: 'currencyHordeBloodCap', type: 'mult', value: lvl => lvl * 0.06 + 1.24}
    ]},
    energize: {
        color: 'amber',
        icon: 'mdi-battery',
        rarity: 110,
        isTimeless: true,
        needsEnergy,
        cooldown: () => 270,
        activeCost: () => {return {};},
        active() {
            return [
                {type: 'refillEnergy', value: 1}
            ];
        },
        activeType: 'combat'
    },
    automation: {color: 'dark-grey', icon: 'mdi-cogs', rarity: 120, isTimeless: true, effect: [
        {name: 'hordeAutocast', type: 'base', value: () => 1}
    ]},
    cure: {
        color: 'teal',
        icon: 'mdi-heart',
        rarity: 130,
        isTimeless: true,
        cooldown: () => 45,
        activeCost: () => {return {};},
        active() {
            return [
                {type: 'heal', value: 0.05, int: 0.0005},
                {type: 'removeStun', value: null}
            ];
        },
        usableInStun: true,
        activeType: 'combat'
    },

    // Boss-specific trinkets
    duality: {color: 'purple', icon: 'mdi-call-split', rarity: 75, uniqueToBoss: 'chriz2', effect: [
        {name: 'hordeStrength', type: 'base', value: lvl => lvl * 2 + 4},
        {name: 'hordeIntelligence', type: 'base', value: lvl => lvl * 2 + 4}
    ]},
    love: {
        color: 'babypink',
        icon: 'mdi-heart-multiple',
        rarity: 120,
        uniqueToBoss: 'mina',
        cooldown: () => 70,
        activeCost: () => {return {};},
        active(lvl) {
            return [
                {type: 'damageBio', value: lvl * 0.9 + 8.7},
                {type: 'buff', value: lvl + 14, effect: [
                    {type: 'mult', name: 'hordeBioAttack', value: 1.35},
                ]}
            ];
        },
        activeType: 'combat'
    },
}
