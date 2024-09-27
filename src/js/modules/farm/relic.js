export default {
    goldenCarrot: {icon: 'mdi-carrot', color: 'amber', effect: [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.4}
    ]},
    goldenApple: {icon: 'mdi-food-apple', color: 'amber', effect: [
        {name: 'currencyFarmBerryGain', type: 'mult', value: 1.4}
    ]},
    popcorn: {icon: 'mdi-popcorn', color: 'pale-yellow', effect: [
        {name: 'currencyFarmGrainGain', type: 'mult', value: 1.4}
    ]},
    roseQuartz: {icon: 'mdi-crystal-ball', color: 'pale-pink', effect: [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: 1.4}
    ]},
    goldenSeed: {icon: 'mdi-seed', color: 'amber', effect: [
        {name: 'goldenRose', type: 'farmSeed', value: true}
    ]},
    trellis: {icon: 'mdi-fence', color: 'brown', effect: [
        {name: 'farmOvergrow', type: 'base', value: 0.05}
    ]},
    brickWall: {icon: 'mdi-wall', color: 'cherry', effect: [
        {name: 'farmOvergrow', type: 'base', value: 0.05}
    ]},
}
