export default {
    power: {color: 'red', icon: 'mdi-sword', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    fortitude: {color: 'green', icon: 'mdi-heart', effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    wealth: {color: 'amber', icon: 'mdi-circle-multiple', effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    spirit: {minZone: 40, color: 'purple', icon: 'mdi-ghost', effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.06 + 1}
    ]},
    sharpsight: {minZone: 50, color: 'cyan', icon: 'mdi-magnify', effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    reaping: {minZone: 60, color: 'pink', icon: 'mdi-skull', effect: [
        {name: 'currencyHordeCorruptedFleshGain', type: 'base', value: lvl => lvl * 0.03}
    ]},
    remembrance: {minZone: 70, color: 'deep-purple', icon: 'mdi-grave-stone', effect: [
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    holding: {minZone: 80, color: 'brown', icon: 'mdi-dresser', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    expertise: {minZone: 100, color: 'light-blue', icon: 'mdi-book-open-variant', effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    mystery: {minZone: 120, color: 'teal', icon: 'mdi-help-box', effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},

    // Tower-exclusive heirlooms
    brick: {minZone: Infinity, color: 'cherry', icon: 'mdi-wall', effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'hordeCritMult', type: 'base', value: lvl => (Math.pow(lvl / 10 + 1, 0.4) - 1) * 0.01}
    ]},
    heat: {minZone: Infinity, color: 'orange-red', icon: 'mdi-fire', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'hordeCritChance', type: 'base', value: lvl => Math.log(lvl / 10 + 1) * 0.008}
    ]},
    ice: {minZone: Infinity, color: 'skyblue', icon: 'mdi-snowflake-variant', effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.05 + 1},
        {name: 'hordeRecovery', type: 'base', value: lvl => Math.log(lvl / 10 + 1) * 0.003}
    ]},
    crystal: {minZone: Infinity, color: 'indigo', icon: 'mdi-billiards-rack', effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => lvl * 0.001 + 1},
        {name: 'currencyHordeMysticalShardCap', type: 'base', value: lvl => Math.floor(Math.log(lvl + 2))}
    ]},
    vitality: {minZone: Infinity, color: 'light-green', icon: 'mdi-heart-multiple', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl * 0.001 + 1},
        {name: 'hordeHealing', type: 'mult', value: lvl => Math.log(lvl + 1) * 0.1 + 1}
    ]},
}
