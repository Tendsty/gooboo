import store from "../../../store";
import cindersPrize from "./cinders/prize";
import bloomPrize from "./bloom/prize";
import weatherChaosPrize from "./weatherChaos/prize";
import summerFestivalPrize from "./summerFestival/prize";
import nightHuntPrize from "./nightHunt/prize";
import snowdownPrize from "./snowdown/prize";
import big from "./big";

const gemPool = {
    bingo1: {amount: 50},
    bingo2: {amount: 200},
    bingo3: {amount: 750},
    bingo4: {amount: 3000},
    wheelOfFortune1: {amount: 50},
    wheelOfFortune2: {amount: 200},
    wheelOfFortune3: {amount: 750},
    wheelOfFortune4: {amount: 3000}
};

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

    // Treasure
    treasure_empoweredN5: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -10,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.45, price: {gem_topaz: 160}},
            bingo1: {weight: 0.4},
            wheelOfFortune1: {weight: 0.4}
        }
    },
    treasure_empoweredN4: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -9,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.4, price: {gem_topaz: 195}},
            bingo1: {weight: 0.8},
            wheelOfFortune1: {weight: 0.8}
        }
    },
    treasure_empoweredN3: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -8,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.35, price: {gem_topaz: 230}},
            bingo1: {weight: 0.4},
            bingo2: {weight: 0.4},
            wheelOfFortune1: {weight: 0.4},
            wheelOfFortune2: {weight: 0.4}
        }
    },
    treasure_empoweredN2: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -7,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.3, price: {gem_topaz: 270}},
            bingo2: {weight: 0.8},
            wheelOfFortune2: {weight: 0.8}
        }
    },
    treasure_empoweredN1: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -6,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.25, price: {gem_topaz: 310}},
            bingo2: {weight: 0.4},
            bingo3: {weight: 0.4},
            wheelOfFortune2: {weight: 0.4},
            wheelOfFortune3: {weight: 0.4},
            ...bigEvents({weight: 0.2}, 80)
        }
    },
    treasure_empowered: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -5,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.2, price: {gem_topaz: 355}},
            bingo3: {weight: 0.8},
            wheelOfFortune3: {weight: 0.8},
            ...bigEvents({weight: 0.3}, 95)
        }
    },
    treasure_empoweredP1: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -4,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.15, price: {gem_topaz: 400}},
            bingo3: {weight: 0.4},
            bingo4: {weight: 0.4},
            wheelOfFortune3: {weight: 0.4},
            wheelOfFortune4: {weight: 0.4},
            ...bigEvents({weight: 0.4}, 110)
        }
    },
    treasure_empoweredP2: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -3,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.1, price: {gem_topaz: 450}},
            bingo4: {weight: 0.8},
            wheelOfFortune4: {weight: 0.8},
            ...bigEvents({weight: 0.5}, 130)
        }
    },
    treasure_empoweredP3: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -2,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            merchant: {weight: 0.05, price: {gem_topaz: 500}},
            bingo4: {weight: 0.4},
            wheelOfFortune4: {weight: 0.4},
            ...bigEvents({weight: 0.4}, 150)
        }
    },
    treasure_empoweredP4: {
        type: 'treasure',
        item: 'empowered',
        bonusTier: -1,
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            ...bigEvents({weight: 0.3}, 175)
        }
    },
    treasure_empoweredP5: {
        type: 'treasure',
        item: 'empowered',
        requirement() {
            return store.state.unlock.treasureFeature.see;
        },
        pool: {
            ...bigEvents({weight: 0.2}, 200)
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
            return store.state.unlock.hordeItems.see;
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
            return store.state.unlock.hordeItemMastery.see;
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
    mining_scrap: {
        type: 'currency',
        item: 'mining_scrap',
        weight: 1,
        amountMult: () => store.getters['mining/depthScrap'](store.state.stat[`mining_maxDepth${ store.state.system.features.mining.currentSubfeature }`].value),
        pool: {
            bingo0: {amount: 500},
            wheelOfFortune0: {amount: 500}
        }
    },
    mining_ember: {
        type: 'currency',
        item: 'mining_ember',
        weight: 1,
        requirement() {
            return store.state.stat.mining_ember.total > 0;
        },
        roundAmount: true,
        amountMult: () => store.getters['mult/get']('currencyMiningEmberCap'),
        pool: {
            bingo0: {amount: 0.01},
            bingo1: {amount: 0.04},
            bingo2: {amount: 0.15},
            wheelOfFortune0: {amount: 0.01},
            wheelOfFortune1: {amount: 0.04},
            wheelOfFortune2: {amount: 0.15}
        }
    },
    mining_resin: {
        type: 'currency',
        item: 'mining_resin',
        weight: 1,
        requirement() {
            return store.state.stat.mining_resin.total > 0;
        },
        pool: {
            bingo0: {amount: 2},
            bingo1: {amount: 10},
            wheelOfFortune0: {amount: 2},
            wheelOfFortune1: {amount: 10}
        }
    },
    village_offering: {
        type: 'currency',
        item: 'village_offering',
        weight: 1,
        requirement() {
            return store.state.unlock.villageOffering1.see;
        },
        roundAmount: true,
        amountMult: () => store.getters['village/offeringScore'],
        pool: {
            bingo0: {amount: 0.15},
            bingo1: {amount: 0.5},
            bingo2: {amount: 1.75},
            wheelOfFortune0: {amount: 0.15},
            wheelOfFortune1: {amount: 0.5},
            wheelOfFortune2: {amount: 1.75}
        }
    },
    horde_bone: {
        type: 'currency',
        item: 'horde_bone',
        weight: 1,
        requirement() {
            return store.state.unlock.hordeFeature.see;
        },
        amountMult: () => store.getters['mult/get']('currencyHordeBoneGain', store.getters['horde/enemyBone'](store.state.stat.horde_maxZone.value)),
        pool: {
            bingo0: {amount: 500},
            wheelOfFortune0: {amount: 500}
        }
    },
    gallery_beauty: {
        type: 'currency',
        item: 'gallery_beauty',
        weight: 1,
        requirement() {
            return store.state.unlock.galleryFeature.see;
        },
        amountMult: () => store.getters['mult/get']('currencyGalleryBeautyGain'),
        pool: {
            bingo0: {amount: 500},
            wheelOfFortune0: {amount: 500}
        }
    },

    // Premium currencies
    gem_ruby: {
        type: 'currency',
        item: 'gem_ruby',
        weight: 0.5,
        requirement() {
            return store.state.unlock.gemFeature.see;
        },
        pool: gemPool
    },
    gem_emerald: {
        type: 'currency',
        item: 'gem_emerald',
        weight: 0.5,
        requirement() {
            return store.state.unlock.gemFeature.see;
        },
        pool: gemPool
    },
    gem_sapphire: {
        type: 'currency',
        item: 'gem_sapphire',
        weight: 0.5,
        requirement() {
            return store.state.unlock.gemFeature.see;
        },
        pool: gemPool
    },
    gem_amethyst: {
        type: 'currency',
        item: 'gem_amethyst',
        weight: 0.5,
        requirement() {
            return store.state.unlock.gemFeature.see;
        },
        pool: gemPool
    },
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
            merchant: {price: {gem_topaz: 1000}},
            bingo2: {},
            bingo3: {weight: 0.5, amount: 3},
            bingo4: {weight: 1, amount: 10},
            wheelOfFortune2: {},
            wheelOfFortune3: {weight: 0.5, amount: 3},
            wheelOfFortune4: {weight: 1, amount: 10}
        }
    },
    farm_speedGrow: {
        type: 'consumable',
        item: 'farm_speedGrow',
        weight: 1,
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
        weight: 1,
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
        weight: 1,
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
        weight: 1,
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
        weight: 1,
        requirement() {
            return store.state.consumable.farm_premium.found;
        },
        pool: {
            merchant: {amount: 20, price: {gem_topaz: 80}},
            bingo2: {amount: 50},
            wheelOfFortune2: {amount: 50}
        }
    },

    // Prestiges
    mining_prestige: {
        type: 'currency',
        item: 'mining_crystalGreen',
        weight: 1,
        requirement() {
            return store.state.stat.mining_prestigeCount.total >= 1;
        },
        amountMult: () => store.state.stat.mining_bestPrestige0.total,
        pool: {
            bingo1: {amount: 0.1},
            bingo2: {amount: 0.4},
            bingo3: {amount: 2.5},
            wheelOfFortune1: {amount: 0.1},
            wheelOfFortune2: {amount: 0.4},
            wheelOfFortune3: {amount: 2.5}
        }
    },
    village_prestige: {
        type: 'currency',
        item: 'village_blessing',
        weight: 1,
        requirement() {
            return store.state.stat.village_prestigeCount.total >= 1;
        },
        amountMult: () => store.state.stat.village_bestPrestige0.total,
        pool: {
            bingo1: {amount: 0.1},
            bingo2: {amount: 0.4},
            bingo3: {amount: 2.5},
            wheelOfFortune1: {amount: 0.1},
            wheelOfFortune2: {amount: 0.4},
            wheelOfFortune3: {amount: 2.5}
        }
    },
    horde_prestige: {
        type: 'currency',
        item: 'horde_soulEmpowered',
        weight: 1,
        requirement() {
            return store.state.stat.horde_prestigeCount.total >= 1;
        },
        amountMult: () => store.state.stat.horde_bestPrestige0.total,
        pool: {
            bingo1: {amount: 0.1},
            bingo2: {amount: 0.4},
            bingo3: {amount: 2.5},
            wheelOfFortune1: {amount: 0.1},
            wheelOfFortune2: {amount: 0.4},
            wheelOfFortune3: {amount: 2.5}
        }
    },
    gallery_prestige: {
        type: 'currency',
        item: 'gallery_cash',
        weight: 1,
        requirement() {
            return store.state.stat.gallery_prestigeCount.total >= 1;
        },
        amountMult: () => store.state.stat.gallery_bestPrestige.total,
        pool: {
            bingo1: {amount: 0.1},
            bingo2: {amount: 0.4},
            bingo3: {amount: 2.5},
            wheelOfFortune1: {amount: 0.1},
            wheelOfFortune2: {amount: 0.4},
            wheelOfFortune3: {amount: 2.5}
        }
    },
    ...cindersPrize,
    ...bloomPrize,
    ...weatherChaosPrize,
    ...summerFestivalPrize,
    ...nightHuntPrize,
    ...snowdownPrize
}
