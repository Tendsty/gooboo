import store from "../../../store";
import cindersPrize from "./cinders/prize";
import bloomPrize from "./bloom/prize";
import weatherChaosPrize from "./weatherChaos/prize";
import summerFestivalPrize from "./summerFestival/prize";
import nightHuntPrize from "./nightHunt/prize";
import snowdownPrize from "./snowdown/prize";
import big from "./big";

function bigEvents(data, tokenPrice = null) {
    let obj = {};
    for (const [key, elem] of Object.entries(big)) {
        let price = {};
        price[`event_${ elem.token }`] = tokenPrice;
        obj[key] = tokenPrice !== null ? {...data, price} : data;
    }
    return obj;
}

export default {
    // Card packs
    cardPack_goodDeal: {
        type: 'cardPack',
        item: 'goodDeal',
        weight: 5,
        cap: 10,
        pool: {
            merchant: {price: {gem_topaz: 75}}
        }
    },
    cardPack_connectedLine: {
        type: 'cardPack',
        item: 'connectedLine',
        weight: 2,
        pool: {
            bingo2: {amount: 2},
            bingo3: {amount: 6},
            bingo4: {amount: 15, weight: 0.75}
        }
    },
    cardPack_feelingLucky: {
        type: 'cardPack',
        item: 'feelingLucky',
        weight: 2,
        pool: {
            wheelOfFortune2: {amount: 2},
            wheelOfFortune3: {amount: 6},
            wheelOfFortune4: {amount: 15, weight: 0.75}
        }
    },
    card_unowned: {
        type: 'card',
        item: 'unowned',
        cap: 1,
        requirement() {
            return store.getters['card/missingObtainableCards'].length > 0;
        },
        pool: {
            merchant: {price: {gem_emerald: 1000}}
        }
    },
    card_quest: {
        type: 'card',
        item: 'quest',
        cap: 5,
        requirement() {
            return Object.keys(store.getters['card/missingQuestCards']).length > 0;
        },
        pool: {
            merchant: {price: {gem_topaz: 100}}
        }
    },

    // Relics
    relic_hundredDollarBill: {
        type: 'relic',
        item: 'hundredDollarBill',
        weight: 1,
        requirement() {
            return store.state.unlock.villageFeature.see;
        },
        pool: {
            merchant: {price: {gem_topaz: 800}}
        }
    },
    relic_hotAirBalloon: {
        type: 'relic',
        item: 'hotAirBalloon',
        weight: 1,
        requirement() {
            return store.state.unlock.miningSmeltery.see;
        },
        pool: {
            merchant: {price: {gem_topaz: 800}}
        }
    },
    relic_largeClover: {
        type: 'relic',
        item: 'largeClover',
        weight: 1,
        requirement() {
            return store.state.unlock.hordeEquipment.see;
        },
        pool: {
            bingo4: {}
        }
    },
    relic_eightBall: {
        type: 'relic',
        item: 'eightBall',
        weight: 1,
        pool: {
            bingo4: {}
        }
    },
    relic_youngPig: {
        type: 'relic',
        item: 'youngPig',
        weight: 1,
        requirement() {
            return store.state.unlock.hordeHeirlooms.see;
        },
        pool: {
            wheelOfFortune4: {}
        }
    },
    relic_silverHorseshoe: {
        type: 'relic',
        item: 'silverHorseshoe',
        weight: 1,
        requirement() {
            return store.state.unlock.farmCropExp.see;
        },
        pool: {
            wheelOfFortune4: {}
        }
    },

    // Shared relics
    relic_tinfoilHat: {
        type: 'relic',
        item: 'tinfoilHat',
        weight: 0.5,
        requirement() {
            return store.state.stat.mining_maxDepth0.total >= store.state.mining.ingredient.oreAluminium.minDepth;
        },
        pool: {
            merchant: {price: {gem_topaz: 600}},
            bingo4: {},
            wheelOfFortune4: {}
        }
    },
    relic_cupOfWater: {
        type: 'relic',
        item: 'cupOfWater',
        weight: 0.5,
        requirement() {
            return store.state.upgrade.item.village_glassBlowery.highestLevel >= 1;
        },
        pool: {
            merchant: {price: {gem_topaz: 600}},
            bingo4: {},
            wheelOfFortune4: {}
        }
    },
    relic_combatStrategy: {
        type: 'relic',
        item: 'combatStrategy',
        weight: 0.5,
        requirement() {
            return store.state.unlock.hordeEquipmentMastery.see;
        },
        pool: {
            merchant: {price: {gem_topaz: 600}},
            bingo4: {},
            wheelOfFortune4: {}
        }
    },
    relic_bronzeTools: {
        type: 'relic',
        item: 'bronzeTools',
        weight: 0.5,
        requirement() {
            return store.state.stat.mining_maxDepth0.total >= store.state.mining.ingredient.oreTin.minDepth;
        },
        pool: {
            ...bigEvents({}, 70)
        }
    },
    relic_minersHat: {
        type: 'relic',
        item: 'minersHat',
        weight: 0.5,
        requirement() {
            return store.state.stat.mining_maxDepth0.total >= store.state.mining.ingredient.oreTitanium.minDepth;
        },
        pool: {
            ...bigEvents({}, 100)
        }
    },
    relic_dictionary: {
        type: 'relic',
        item: 'dictionary',
        weight: 0.5,
        requirement() {
            return store.state.upgrade.item.village_library.highestLevel >= 1;
        },
        pool: {
            ...bigEvents({}, 75)
        }
    },
    relic_expertTools: {
        type: 'relic',
        item: 'expertTools',
        weight: 0.5,
        requirement() {
            return store.state.upgrade.item.village_deepMine.highestLevel >= 1;
        },
        pool: {
            ...bigEvents({}, 90)
        }
    },
    relic_bloodBag: {
        type: 'relic',
        item: 'bloodBag',
        weight: 0.5,
        requirement() {
            return store.state.stat.gallery_red.total > 0;
        },
        pool: {
            ...bigEvents({}, 115)
        }
    },

    // Basic currencies
    school_goldenDust: {
        type: 'currency',
        item: 'school_goldenDust',
        weight: 4,
        pool: {
            bingo0: {amount: 200},
            bingo1: {amount: 600},
            bingo2: {amount: 1750},
            wheelOfFortune0: {amount: 200},
            wheelOfFortune1: {amount: 600},
            wheelOfFortune2: {amount: 1750}
        }
    },
    farm_mixedSeeds: {
        type: 'currency',
        item: 'farm_mixedSeeds',
        weight: 1.5,
        amount: 10,
        requirement() {
            return store.state.farm.crop.wildflower.found;
        },
        pool: {
            bingo0: {},
            bingo1: {amount: 30},
            wheelOfFortune0: {},
            wheelOfFortune1: {amount: 30},
            merchant: {cap: 10, price: {gem_topaz: 50}},
            ...bigEvents({cap: 25}, 1)
        }
    },
    farm_cactusSeed: {
        type: 'currency',
        item: 'farm_cactusSeed',
        amount: 3,
        requirement() {
            return store.state.farm.crop.cactus.found;
        },
        pool: {
            ...bigEvents({cap: 40}, 2)
        }
    },
    farm_ancientSeed: {
        type: 'currency',
        item: 'farm_ancientSeed',
        weight: 0.5,
        requirement() {
            return store.state.farm.crop.ancientFern.found;
        },
        pool: {
            merchant: {cap: 1, price: {gem_topaz: 1000}},
        }
    },

    // Premium currencies
    school_examPass: {
        type: 'currency',
        item: 'school_examPass',
        weight: 1,
        requirement() {
            return store.state.unlock.schoolFeature.see;
        },
        roundAmount: true,
        pool: {
            merchant: {cap: 5, price: {gem_topaz: 90}},
            bingo1: {amount: 2},
            bingo2: {amount: 8},
            wheelOfFortune1: {amount: 2},
            wheelOfFortune2: {amount: 8}
        }
    },
    treasure_fragment: {
        type: 'currency',
        item: 'treasure_fragment',
        weight: 1,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        roundAmount: true,
        amountMult: () => store.getters['treasure/averageFragments'],
        pool: {
            bingo0: {},
            bingo1: {amount: 4},
            wheelOfFortune0: {},
            wheelOfFortune1: {amount: 4}
        }
    },
    horde_towerKey: {
        type: 'currency',
        item: 'horde_towerKey',
        weight: 0.75,
        requirement() {
            return store.state.unlock.hordeBrickTower.see;
        },
        roundAmount: true,
        pool: {
            merchant: {cap: 3, price: {gem_topaz: 450}},
            bingo2: {amount: 1},
            bingo3: {amount: 4},
            bingo4: {amount: 20},
            wheelOfFortune2: {amount: 1},
            wheelOfFortune3: {amount: 4},
            wheelOfFortune4: {amount: 20}
        }
    },

    // Consumables
    mining_goldenHammer: {
        type: 'consumable',
        item: 'mining_goldenHammer',
        weight: 1,
        requirement() {
            return store.state.unlock.miningPickaxeCrafting.see;
        },
        pool: {
            merchant: {price: {gem_topaz: 60}},
            bingo1: {},
            bingo2: {amount: 4},
            wheelOfFortune1: {},
            wheelOfFortune2: {amount: 4}
        }
    },
    gem_prestigeStone: {
        type: 'consumable',
        item: 'gem_prestigeStone',
        weight: 0.25,
        pool: {
            merchant: {amount: 1, cap: 1, price: {gem_sapphire: 750}},
            bingo2: {},
            bingo3: {weight: 0.5, amount: 3},
            bingo4: {weight: 1, amount: 10},
            wheelOfFortune2: {},
            wheelOfFortune3: {weight: 0.5, amount: 3},
            wheelOfFortune4: {weight: 1, amount: 10},
            ...bigEvents({weight: 0.5, amount: 1, cap: 2}, 35)
        }
    },
    farm_speedGrow: {
        type: 'consumable',
        item: 'farm_speedGrow',
        weight: 0.25,
        requirement() {
            return store.state.consumable.farm_speedGrow.found;
        },
        pool: {
            merchant: {amount: 25, price: {gem_topaz: 50}},
            bingo1: {amount: 25},
            bingo2: {amount: 100},
            wheelOfFortune1: {amount: 25},
            wheelOfFortune2: {amount: 100}
        }
    },
    farm_richSoil: {
        type: 'consumable',
        item: 'farm_richSoil',
        weight: 0.25,
        requirement() {
            return store.state.consumable.farm_richSoil.found;
        },
        pool: {
            merchant: {amount: 25, price: {gem_topaz: 50}},
            bingo1: {amount: 25},
            bingo2: {amount: 100},
            wheelOfFortune1: {amount: 25},
            wheelOfFortune2: {amount: 100}
        }
    },
    farm_shiny: {
        type: 'consumable',
        item: 'farm_shiny',
        weight: 0.25,
        requirement() {
            return store.state.consumable.farm_shiny.found;
        },
        pool: {
            merchant: {amount: 25, price: {gem_topaz: 50}},
            bingo1: {amount: 25},
            bingo2: {amount: 100},
            wheelOfFortune1: {amount: 25},
            wheelOfFortune2: {amount: 100}
        }
    },
    farm_turboGrow: {
        type: 'consumable',
        item: 'farm_turboGrow',
        weight: 0.25,
        requirement() {
            return store.state.consumable.farm_turboGrow.found;
        },
        pool: {
            merchant: {amount: 25, price: {gem_topaz: 50}},
            bingo1: {amount: 25},
            bingo2: {amount: 100},
            wheelOfFortune1: {amount: 25},
            wheelOfFortune2: {amount: 100}
        }
    },
    farm_premium: {
        type: 'consumable',
        item: 'farm_premium',
        weight: 0.25,
        requirement() {
            return store.state.consumable.farm_premium.found;
        },
        pool: {
            merchant: {amount: 20, price: {gem_topaz: 80}},
            bingo2: {amount: 50},
            wheelOfFortune2: {amount: 50}
        }
    },
    treasure_eventStar: {
        type: 'consumable',
        item: 'treasure_eventStar',
        cap: 3,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            ...bigEvents({}, 50)
        }
    },

    ...cindersPrize,
    ...bloomPrize,
    ...weatherChaosPrize,
    ...summerFestivalPrize,
    ...nightHuntPrize,
    ...snowdownPrize
}
