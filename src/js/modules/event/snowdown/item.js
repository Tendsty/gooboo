export default {
    // Producers
    forest: {
        type: 'producer',
        icon: 'mdi-forest',
        effect: [
            {name: 'currencyEventSaplingGain', type: 'base', value: lvl => Math.pow(2, lvl) * Math.pow(lvl + 1, 2) * 0.01}
        ]
    },
    shepherd: {
        type: 'producer',
        icon: 'mdi-sheep',
        effect: [
            {name: 'currencyEventYarnGain', type: 'base', value: lvl => Math.pow(2, lvl) * Math.pow(lvl + 1, 2) * 0.01}
        ]
    },
    rollingPin: {
        type: 'producer',
        icon: 'mdi-arrow-top-right-bottom-left-bold',
        effect: [
            {name: 'currencyEventDoughGain', type: 'base', value: lvl => Math.pow(2, lvl) * Math.pow(lvl + 1, 2) * 0.01}
        ]
    },
    snowCannon: {
        type: 'producer',
        icon: 'mdi-snowflake-alert',
        effect: [
            {name: 'currencyEventSnowGain', type: 'base', value: lvl => Math.pow(2, lvl) * Math.pow(lvl + 1, 2) * 0.01}
        ]
    },

    // Pets
    snowOwl: {
        type: 'pet',
        icon: 'mdi-owl',
        max: 1
    },
    dog: {
        type: 'pet',
        icon: 'mdi-dog',
        max: 1
    },
    cat: {
        type: 'pet',
        icon: 'mdi-cat',
        max: 1
    },
    penguin: {
        type: 'pet',
        icon: 'mdi-penguin',
        max: 1
    },
    rabbit: {
        type: 'pet',
        icon: 'mdi-rabbit',
        max: 1
    },
    turtle: {
        type: 'pet',
        icon: 'mdi-tortoise',
        max: 1
    },

    // Pet boosts
    animalTooth: {
        type: 'petBoost',
        icon: 'mdi-tooth',
        effect: [
            {name: 'snowdownPetAttack', type: 'base', value: lvl => lvl * 0.5},
            {name: 'snowdownPetAttack', type: 'mult', value: lvl => lvl * 0.1 + 1},
        ]
    },
    collar: {
        type: 'petBoost',
        icon: 'mdi-dog-service',
        effect: [
            {name: 'snowdownPetHealth', type: 'base', value: lvl => lvl * 5},
            {name: 'snowdownPetHealth', type: 'mult', value: lvl => lvl * 0.1 + 1},
        ]
    },
    chili: {
        type: 'petBoost',
        icon: 'mdi-chili-mild',
        effect: [
            {name: 'snowdownCritRating', type: 'base', value: lvl => lvl * 8},
            {name: 'snowdownPetCritRating', type: 'base', value: lvl => lvl * 10},
        ]
    },
    drumstick: {
        type: 'petBoost',
        icon: 'mdi-food-drumstick',
        effect: [
            {name: 'snowdownPetAttack', type: 'mult', value: lvl => lvl * 0.1 + 1},
            {name: 'snowdownPetHealth', type: 'mult', value: lvl => lvl * 0.1 + 1},
            {name: 'snowdownPetBlockRating', type: 'base', value: lvl => lvl * 5},
        ]
    },
    mouse: {
        type: 'petBoost',
        icon: 'mdi-rodent',
        max: 5
        // Heal the player 1 on pet attack
    },
    bone: {
        type: 'petBoost',
        icon: 'mdi-bone',
        max: 5
        // Pets heal 1 on attack
    },
    gravestone: {
        type: 'petBoost',
        icon: 'mdi-grave-stone',
        max: 3
        // Pet deaths heal the player and other pets 15
    },
    spikedCollar: {
        type: 'petBoost',
        icon: 'mdi-decagram-outline',
        max: 1
        // 30 crit and block rating on random pet, transfers to another random pet on death
    },
    heartCollar: {
        type: 'petBoost',
        icon: 'mdi-heart-outline',
        max: 3
        // Random pet gets 1 revive with full health
    },
    treatBag: {
        type: 'petBoost',
        icon: 'mdi-sack'
        // Heal the pet for 50% max health. Consumes pet action. Limit of 3
    },
    tennisBall: {
        type: 'petBoost',
        icon: 'mdi-tennis-ball',
        max: 1
        // All pets get revived when the player dies
    },

    // Tank build items
    appleJuice: {
        type: 'tank',
        icon: 'mdi-cup'
        // Heal the player for 50% max health. Consumes player action. Limit of 1
    },
    hotWater: {
        type: 'tank',
        icon: 'mdi-needle',
        max: 1
        // Revive the player once with 25% max health
    },
    dumbbell: {
        type: 'tank',
        icon: 'mdi-dumbbell',
        max: 5
        // 0.5 attack on attack
    },
    target: {
        type: 'tank',
        icon: 'mdi-bullseye',
        max: 5
        // 4 crit on attack
    },
    gloves: {
        type: 'tank',
        icon: 'mdi-hand-back-left',
        max: 5
        // 0.2 attack and 1 crit when attacked
    },

    // Crit build items
    snowboard: {
        type: 'crit',
        icon: 'mdi-snowboard',
        max: 1
        // First 5 attacks crit
    },
    tea: {
        type: 'crit',
        icon: 'mdi-tea',
        max: 3
        // On enemy death, heal 25 and the next attack crits
    },
    starShield: {
        type: 'crit',
        icon: 'mdi-shield-star',
        max: 1
        // 5 armor in the first 3 turns
    },
    coffee: {
        type: 'crit',
        icon: 'mdi-coffee',
        max: 3
        // Crits heal 8
    },
    pebbles: {
        type: 'crit',
        icon: 'mdi-chart-bubble',
        max: 1
        // Crits stun the target for 1 turn
    },

    // Filler items
    sunShield: {
        icon: 'mdi-shield-sun',
        effect: [
            {name: 'snowdownDefense', type: 'base', value: lvl => lvl * 2}
        ]
    },
    moonShield: {
        icon: 'mdi-shield-moon',
        effect: [
            {name: 'snowdownDefense', type: 'base', value: lvl => lvl},
            {name: 'snowdownBlockRating', type: 'base', value: lvl => lvl * 5}
        ]
    },
    fireplace: {
        icon: 'mdi-fireplace',
        effect: [
            {name: 'snowdownHealth', type: 'base', value: lvl => lvl * 10},
            {name: 'snowdownHealth', type: 'mult', value: lvl => lvl * 0.1 + 1}
        ]
    },
    specialSnowflake: {
        icon: 'mdi-snowflake-variant',
        effect: [
            {name: 'snowdownAttack', type: 'mult', value: lvl => lvl * 0.1 + 1},
            {name: 'snowdownCritRating', type: 'base', value: lvl => lvl * 5}
        ]
    },
    candyCane: {
        icon: 'mdi-candycane',
        effect: [
            {name: 'snowdownHealth', type: 'base', value: lvl => lvl * 15},
            {name: 'snowdownBlockRating', type: 'base', value: lvl => lvl * 5}
        ]
    },
    shovel: {
        icon: 'mdi-shovel',
        effect: [
            {name: 'snowdownAttack', type: 'base', value: lvl => lvl},
            {name: 'snowdownAttack', type: 'mult', value: lvl => lvl * 0.1 + 1}
        ]
    },
    turkey: {
        icon: 'mdi-food-turkey',
        effect: [
            {name: 'snowdownAttack', type: 'base', value: lvl => lvl},
            {name: 'snowdownHealth', type: 'mult', value: lvl => lvl * 0.1 + 1}
        ]
    },
}
