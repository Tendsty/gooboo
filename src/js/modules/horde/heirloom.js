export default {
    power: {color: 'red', icon: 'mdi-sword', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    fortitude: {color: 'blue', icon: 'mdi-heart', effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    wealth: {color: 'amber', icon: 'mdi-circle-multiple', effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyHordeMonsterPartGain', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    spirit: {minZone: 40, color: 'purple', icon: 'mdi-ghost', effect: [
        {name: 'hordeSoulGain', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    sharpsight: {minZone: 50, color: 'cyan', icon: 'mdi-magnify', effect: [
        {name: 'hordeItemChance', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    reaping: {minZone: 60, color: 'pink', icon: 'mdi-skull', effect: [
        {name: 'currencyHordeCorruptedFleshGain', type: 'base', value: lvl => lvl * 0.01}
    ]},
    holding: {minZone: 80, color: 'brown', icon: 'mdi-dresser', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    expertise: {minZone: 100, color: 'light-blue', icon: 'mdi-book-open-variant', effect: [
        {name: 'hordeItemMasteryGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
}
