export default {
    power: {color: 'red', icon: 'mdi-sword', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    fortitude: {minZone: 40, color: 'green', icon: 'mdi-heart', effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    wealth: {minZone: 50, color: 'amber', icon: 'mdi-circle-multiple', effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    spirit: {minZone: 60, color: 'purple', icon: 'mdi-ghost', effect: [
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    sharpsight: {minZone: 70, color: 'cyan', icon: 'mdi-magnify', effect: [
        {name: 'hordeEquipmentChance', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    reaping: {minZone: 80, color: 'pink', icon: 'mdi-skull', effect: [
        {name: 'currencyHordeCorruptedFleshGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    remembrance: {minZone: 90, color: 'deep-purple', icon: 'mdi-grave-stone', effect: [
        {name: 'currencyHordeSoulCorruptedCap', type: 'mult', value: lvl => lvl * 0.03 + 1}
    ]},
    expertise: {minZone: 100, color: 'light-blue', icon: 'mdi-book-open-variant', effect: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    holding: {minZone: 110, color: 'brown', icon: 'mdi-dresser', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl * 0.02 + 1}
    ]},
    mystery: {minZone: 120, color: 'teal', icon: 'mdi-help-box', effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},
    freezing: {minZone: 130, color: 'dark-blue', icon: 'mdi-fridge', effect: [
        {name: 'currencyHordeMonsterPartCap', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},

    // Tower-exclusive heirlooms
    brick: {minZone: Infinity, color: 'cherry', icon: 'mdi-wall', effect: [
        {name: 'currencyHordeBoneGain', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    heat: {minZone: Infinity, color: 'orange-red', icon: 'mdi-fire', effect: [
        {name: 'hordeAttack', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    ice: {minZone: Infinity, color: 'skyblue', icon: 'mdi-snowflake-variant', effect: [
        {name: 'hordeHealth', type: 'mult', value: lvl => lvl * 0.01 + 1}
    ]},
    crystal: {minZone: Infinity, color: 'indigo', icon: 'mdi-billiards-rack', effect: [
        {name: 'hordeShardChance', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},
    vitality: {minZone: Infinity, color: 'light-green', icon: 'mdi-heart-multiple', effect: [
        {name: 'currencyHordeBoneCap', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},
    nature: {minZone: Infinity, color: 'lime', icon: 'mdi-leaf', effect: [
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: lvl => lvl * 0.001 + 1}
    ]},
}
