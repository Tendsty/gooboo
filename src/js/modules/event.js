import store from "../../store";
import relic from "./event/relic";
import item from "./event/snowdown/item";
import cindersTick from "./event/cinders/tick";
import bloomTick from "./event/bloom/tick";
import weatherChaosTick from "./event/weatherChaos/tick";
import summerFestivalTick from "./event/summerFestival/tick";
import nightHuntTick from "./event/nightHunt/tick";
import snowdownTick from "./event/snowdown/tick";
import cindersUpgrade from "./event/cinders/upgrade";
import cindersProducer from "./event/cinders/producer";
import bloomUpgrade from "./event/bloom/upgrade";
import weatherChaosUpgrade from "./event/weatherChaos/upgrade";
import summerFestivalUpgrade from "./event/summerFestival/upgrade";
import nightHuntUpgrade from "./event/nightHunt/upgrade";
import snowdownUpgrade from "./event/snowdown/upgrade";
import project from "./event/bank/project";
import { buildNum } from "../utils/format";
import { getDay } from "../utils/date";
import ingredientStat from "./event/nightHunt/ingredientStat";
import potion from "./event/nightHunt/potion";
import building from "./event/summerFestival/building";
import weather from "./event/weatherChaos/weather";
import fishingRod from "./event/weatherChaos/fishingRod";
import location from "./event/weatherChaos/location";
import fish from "./event/weatherChaos/fish";
import bait from "./event/weatherChaos/bait";
import prize from "./event/prize";
import { buildArray } from "../utils/array";

const eventTicks = {
    cinders: cindersTick,
    bloom: bloomTick,
    weatherChaos: weatherChaosTick,
    summerFestival: summerFestivalTick,
    nightHunt: nightHuntTick,
    snowdown: snowdownTick
};

export default {
    name: 'event',
    tickspeed: 1,
    unlockNeeded: 'eventFeature',
    tick(seconds, oldTime, newTime) {
        const currentEvent = store.getters['event/currentEvent'];
        if (oldTime === 0 || store.state.event.force_event !== null) {
            if (currentEvent && store.getters['event/eventIsBig'](currentEvent)) {
                eventTicks[currentEvent](seconds, oldTime, newTime);
            }
        } else {
            const oldDate = new Date(oldTime * 1000);
            const newDate = new Date(newTime * 1000);
            const oldDay = getDay(oldDate);
            const newDay = getDay(newDate);
            const stats = store.getters['event/dayStats'](oldDay, newDay);

            // Tick old event
            if (!stats.isSameEvent && !stats.startedBigEvent && stats.startEvent !== null && store.getters['event/eventIsBig'](stats.startEvent)) {
                const newTicks = Math.floor(Math.min(
                    new Date(`${oldDate.getFullYear()}-${store.state.event.big[stats.startEvent].end}T23:59:59`).getTime(),
                    newDate.getTime()
                ) / 1000);
                eventTicks[stats.startEvent](newTicks - oldTime, oldTime, newTicks);
            }

            if (oldDay !== newDay) {
                store.dispatch('event/dayChange', {start: oldDay, end: newDay});
            }

            // Tick new event
            if (stats.isBigEvent) {
                const oldTicks = Math.floor(Math.max(
                    new Date(`${newDate.getFullYear()}-${store.state.event.big[currentEvent].start}T00:00:00`).getTime(),
                    oldDate.getTime()
                ) / 1000);
                eventTicks[currentEvent](newTime - oldTicks, oldTicks, newTime);
            }
        }
    },
    unlock: [
        'eventFeature', 'bloomPoppyFlower', 'bloomIrisFlower', 'bloomLilyFlower', 'bloomOrchidFlower', 'bloomCornflowerFlower', 'summerFestivalTerraform',
        'cindersEvent', 'bloomEvent', 'weatherChaosEvent', 'summerFestivalEvent', 'nightHuntEvent', 'snowdownEvent',
        'merchantEvent', 'bingoCasinoEvent', 'wheelOfFortuneCasinoEvent', 'bankEvent',
    ],
    stat: {
        bloomMaxDaisy: {type: 'bloom'},
        bloomMaxPoppy: {type: 'bloom'},
        bloomMaxIris: {type: 'bloom'},
        bloomMaxLily: {type: 'bloom'},
        summerFestivalMaxStage: {type: 'summerFestival'},
        cindersHighscore: {type: 'cinders'},
        bloomHighscore: {type: 'bloom'},
        weatherChaosHighscore: {type: 'weatherChaos'},
        summerFestivalHighscore: {type: 'summerFestival'},
        nightHuntHighscore: {type: 'nightHunt'},
        snowdownHighscore: {type: 'snowdown'},
    },
    mult: {
        // shop mults
        merchantOffers: {baseValue: 6, round: true},

        // bank mults
        bankInvestmentSize: {baseValue: 500, round: true},
        bankLoanSize: {baseValue: 500, round: true},
        bankCardPackChance: {display: 'percent'},

        // cinders mults
        cindersProductionFirefly: {baseValue: 1},
        cindersProductionGlowshroom: {baseValue: 75},
        cindersProductionGlowfish: {baseValue: 4000},
        cindersProductionLantern: {baseValue: buildNum(200, 'K')},
        cindersProductionCampfire: {baseValue: buildNum(12, 'M')},
        cindersProductionCoral: {baseValue: buildNum(800, 'M')},
        cindersProductionJellyfish: {baseValue: buildNum(35, 'B')},
        cindersProductionNightbloom: {baseValue: buildNum(1.5, 'T')},
        cindersProductionNeonlight: {baseValue: buildNum(40, 'T')},
        cindersProductionSun: {baseValue: buildNum(1, 'Qa')},
        cindersFirstProducerCost: {},
        cindersNonFirstProducerCost: {},
        cindersUpgradeLightCost: {},
        cindersUpgradeProducerRequirement: {},
        cindersCandlePower: {},

        // bloom mults
        bloomInventorySize: {baseValue: 5, round: true},
        bloomBreederSize: {baseValue: 1, round: true},
        bloomDaisyChance: {baseValue: 0.3, display: 'percent'},
        bloomPoppyChance: {baseValue: 0.25, display: 'percent'},
        bloomIrisChance: {baseValue: 0.2, display: 'percent'},
        bloomLilyChance: {baseValue: 0.15, display: 'percent'},
        bloomOrchidChance: {baseValue: 0.1, display: 'percent'},
        bloomCornflowerChance: {baseValue: 0.05, display: 'percent'},
        bloomDaisyBreedTime: {baseValue: 300, display: 'time', min: 1, round: true}, // 5m
        bloomPoppyBreedTime: {baseValue: 900, display: 'time', min: 1, round: true}, // 15m -> 10m
        bloomIrisBreedTime: {baseValue: 2400, display: 'time', min: 1, round: true}, // 40m -> 20m
        bloomLilyBreedTime: {baseValue: 6000, display: 'time', min: 1, round: true}, // 1h40m -> 40m
        bloomOrchidBreedTime: {baseValue: 14400, display: 'time', min: 1, round: true}, // 4h -> 1h20m
        bloomCornflowerBreedTime: {baseValue: 28800, display: 'time', min: 1, round: true}, // 8h -> 2h40m

        // weather chaos mults
        weatherChaosFishingPower: {},
        weatherChaosFishSizeMax: {min: 1},
        weatherChaosFishSizeAverage: {baseValue: 1},
        weatherChaosFishingTime: {baseValue: 300, display: 'time', min: 1, round: true},
        weatherChaosFishDoubleChance: {display: 'percent', min: 0, max: 1},
        weatherChaosIgnoreWeather: {display: 'percent', min: 0, max: 1},
        weatherChaosFishChance: {baseValue: 0.25, display: 'percent', min: 0, max: 1},
        weatherChaosTreasureChance: {baseValue: 0.05, display: 'percent', min: 0, max: 1},
        weatherChaosAlgaeWeight: {baseValue: 1},
        weatherChaosDriftwoodWeight: {baseValue: 1},
        weatherChaosPlasticWeight: {baseValue: 1},
        weatherChaosTrashGain: {group: ['currencyEventAlgaeGain', 'currencyEventDriftwoodGain', 'currencyEventPlasticGain']},

        // summer festival mults
        summerFestivalBuildQueueSlots: {baseValue: 3, round: true},
        summerFestivalBuildQueueSpeed: {baseValue: 1},
        summerFestivalMaterialGain: {baseValue: 100},
        summerFestivalMaterialStackCap: {baseValue: 10},

        // night hunt mults
        nightHuntFindableIngredients: {baseValue: 4, round: true},
        nightHuntIngredientSize: {baseValue: 8, round: true},
        nightHuntFavouriteIngredientSize: {round: true},
        nightHuntMaxIngredients: {baseValue: 1, round: true},
        nightHuntBonusIngredientCount: {round: true},
        nightHuntBonusIngredientAmount: {baseValue: 1, round: true},
        nightHuntRitualStability: {display: 'percent', min: -1, max: 2},
        nightHuntRitualSuccessChance: {display: 'percent', min: 0, max: 1},
        nightHuntRitualHintChance: {display: 'percent', min: 0, max: 1},
        nightHuntRitualFamiliarity: {display: 'percent', min: 0},

        // snowdown mults
        snowdownAttack: {baseValue: 4},
        snowdownHealth: {baseValue: 40, round: true},
        snowdownDefense: {round: true},
        snowdownCritRating: {},
        snowdownBlockRating: {},
        snowdownPetAttack: {},
        snowdownPetHealth: {round: true},
        snowdownPetDefense: {round: true},
        snowdownPetCritRating: {},
        snowdownPetBlockRating: {},
        snowdownAllAttack: {group: ['snowdownAttack', 'snowdownPetAttack']},
        snowdownAllHealth: {group: ['snowdownHealth', 'snowdownPetHealth']},
        snowdownAllDefense: {group: ['snowdownDefense', 'snowdownPetDefense']},
        snowdownRevengeStats: {display: 'percent'},
        snowdownRevengeCrit: {},
        snowdownRevengeBlock: {},
        snowdownResourceGain: {},
    },
    multGroup: [
        {mult: 'snowdownResourceGain', name: 'currencyGain', subtype: 'snowdownResource'},
    ],
    currency: {
        // cinders currencies
        light: {type: 'cinders', color: 'yellow', icon: 'mdi-lightbulb-on', gainMult: {}},
        soot: {type: 'cinders', color: 'darker-grey', icon: 'mdi-liquid-spot', gainMult: {}},

        // bloom currencies
        blossom: {type: 'bloom', color: 'pale-pink', icon: 'mdi-flower-poppy', gainMult: {}},

        // weather chaos currencies
        algae: {type: 'weatherChaos', color: 'green', icon: 'mdi-grass', gainMult: {}},
        driftwood: {type: 'weatherChaos', color: 'wooden', icon: 'mdi-tree', gainMult: {}},
        plastic: {type: 'weatherChaos', color: 'pale-pink', icon: 'mdi-delete-variant', gainMult: {}},
        slime: {type: 'weatherChaos', color: 'lime', icon: 'mdi-liquid-spot', gainMult: {}},

        // summer festival currencies
        log: {type: 'summerFestival', color: 'wooden', icon: 'mdi-tray-full'},
        stoneBlock: {type: 'summerFestival', color: 'grey', icon: 'mdi-cube'},
        coconut: {type: 'summerFestival', color: 'brown', icon: 'mdi-bowling'},
        shell: {type: 'summerFestival', color: 'pale-pink', icon: 'mdi-set-all'},
        music: {type: 'summerFestival', color: 'pink', icon: 'mdi-music', gainMult: {}, showGainMult: true},
        sand: {type: 'summerFestival', color: 'beige', icon: 'mdi-dots-triangle', gainMult: {}, showGainMult: true},
        freshWater: {type: 'summerFestival', color: 'light-blue', icon: 'mdi-water', gainMult: {}, showGainMult: true},
        coal: {type: 'summerFestival', color: 'darker-grey', icon: 'mdi-chart-bubble', gainMult: {}, showGainMult: true},
        metalPart: {type: 'summerFestival', color: 'blue-grey', icon: 'mdi-scatter-plot', gainMult: {}, showGainMult: true},
        pearl: {type: 'summerFestival', color: 'skyblue', icon: 'mdi-circle-opacity', gainMult: {}, showGainMult: true},
        salt: {type: 'summerFestival', color: 'lighter-grey', icon: 'mdi-shaker', gainMult: {}, showGainMult: true},
        pepper: {type: 'summerFestival', color: 'dark-grey', icon: 'mdi-shaker', gainMult: {}, showGainMult: true},
        honey: {type: 'summerFestival', color: 'amber', icon: 'mdi-beehive-outline', gainMult: {}, showGainMult: true},
        vegetable: {type: 'summerFestival', color: 'green', icon: 'mdi-leek', gainMult: {}, showGainMult: true},
        citrusFruit: {type: 'summerFestival', color: 'yellow', icon: 'mdi-fruit-citrus', gainMult: {}, showGainMult: true},
        rawFish: {type: 'summerFestival', color: 'teal', icon: 'mdi-fish', gainMult: {}, showGainMult: true},
        cookedFish: {type: 'summerFestival', color: 'pale-orange', icon: 'mdi-fish'},
        rawMeat: {type: 'summerFestival', color: 'red', icon: 'mdi-food-steak', gainMult: {}, showGainMult: true},
        cookedMeat: {type: 'summerFestival', color: 'brown', icon: 'mdi-food-steak'},

        // Crafted items
        solidPlate: {type: 'summerFestival', color: 'light-grey', icon: 'mdi-layers'},
        sandstone: {type: 'summerFestival', color: 'pale-yellow', icon: 'mdi-wall'},
        hardSteel: {type: 'summerFestival', color: 'dark-grey', icon: 'mdi-gold'},
        compositePlate: {type: 'summerFestival', color: 'pale-orange', icon: 'mdi-pillar'},

        // Cooked meals
        coconutSalad: {type: 'summerFestival', color: 'pale-green', icon: 'mdi-bowl-mix'},
        saltyShell: {type: 'summerFestival', color: 'pale-red', icon: 'mdi-set-all'},
        lemonCandy: {type: 'summerFestival', color: 'yellow', icon: 'mdi-candy'},
        steak: {type: 'summerFestival', color: 'wooden', icon: 'mdi-food-steak'},
        fishSticks: {type: 'summerFestival', color: 'pale-orange', icon: 'mdi-tally-mark-4'},

        // night hunt currencies
        essence: {type: 'nightHunt', color: 'pink', icon: 'mdi-flask-round-bottom', gainMult: {display: 'perSecond'}, showGainMult: true},
        lavender: {type: 'nightHunt', color: 'pale-purple', icon: 'mdi-grass'},
        mapleLeaf: {type: 'nightHunt', color: 'orange', icon: 'mdi-leaf-maple'},
        fourLeafClover: {type: 'nightHunt', color: 'pale-green', icon: 'mdi-clover'},
        charredSkull: {type: 'nightHunt', color: 'dark-grey', icon: 'mdi-skull'},
        mysticalWater: {type: 'nightHunt', color: 'cyan', icon: 'mdi-flask-round-bottom-outline'},
        cheese: {type: 'nightHunt', color: 'yellow', icon: 'mdi-cheese'},
        spiderWeb: {type: 'nightHunt', color: 'light-grey', icon: 'mdi-spider-web'},
        strangeEgg: {type: 'nightHunt', color: 'orange-red', icon: 'mdi-egg-easter'},
        puzzlePiece: {type: 'nightHunt', color: 'red-pink', icon: 'mdi-puzzle'},
        wizardHat: {type: 'nightHunt', color: 'indigo', icon: 'mdi-wizard-hat'},
        cactus: {type: 'nightHunt', color: 'green', icon: 'mdi-cactus'},
        feather: {type: 'nightHunt', color: 'skyblue', icon: 'mdi-feather'},

        // snowdown currencies
        sapling: {type: 'snowdown', subtype: 'snowdownResource', color: 'green', icon: 'mdi-sprout', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true},
        yarn: {type: 'snowdown', subtype: 'snowdownResource', color: 'red', icon: 'mdi-link', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true},
        dough: {type: 'snowdown', subtype: 'snowdownResource', color: 'beige', icon: 'mdi-liquid-spot', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true},
        snow: {type: 'snowdown', subtype: 'snowdownResource', color: 'light-blue', icon: 'mdi-snowflake', gainMult: {display: 'perSecond'}, showGainMult: true, showGainTimer: true},

        // topaz drop replacement currencies
        wax: {type: 'cinders', color: 'pale-yellow', icon: 'mdi-beehive-outline'},
        humus: {type: 'bloom', color: 'brown', icon: 'mdi-gradient-vertical'},
        cloud: {type: 'weatherChaos', color: 'skyblue', icon: 'mdi-cloud'},
        cocktail: {type: 'summerFestival', color: 'amber', icon: 'mdi-glass-cocktail'},
        magic: {type: 'nightHunt', color: 'pink-purple', icon: 'mdi-auto-fix'},
        snowball: {type: 'snowdown', color: 'skyblue', icon: 'mdi-circle'},

        // reward tokens
        cindersToken: {type: 'token', color: 'amber', icon: 'mdi-poker-chip', gainMult: {}},
        bloomToken: {type: 'token', color: 'light-green', icon: 'mdi-poker-chip'},
        weatherChaosToken: {type: 'token', color: 'grey', icon: 'mdi-poker-chip'},
        summerFestivalToken: {type: 'token', color: 'red', icon: 'mdi-poker-chip'},
        nightHuntToken: {type: 'token', color: 'purple', icon: 'mdi-poker-chip'},
        snowdownToken: {type: 'token', color: 'blue', icon: 'mdi-poker-chip'}
    },
    upgrade: {
        ...cindersUpgrade,
        ...cindersProducer,
        ...bloomUpgrade,
        ...weatherChaosUpgrade,
        ...summerFestivalUpgrade,
        ...nightHuntUpgrade,
        ...snowdownUpgrade
    },
    relic,
    note: buildArray(34).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries(weather)) {
            store.commit('weatherChaos/initWeather', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(fishingRod)) {
            store.commit('weatherChaos/initFishingRod', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(location)) {
            store.commit('weatherChaos/initLocation', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(fish)) {
            store.commit('weatherChaos/initFish', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(bait)) {
            store.commit('weatherChaos/initBait', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(building)) {
            store.commit('summerFestival/initBuilding', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(ingredientStat)) {
            store.commit('nightHunt/initIngredientStat', {name: key, effect: elem});
        }
        for (const [key, elem] of Object.entries(potion)) {
            store.commit('nightHunt/initPotion', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(item)) {
            store.commit('snowdown/initItem', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(prize)) {
            store.commit('event/initPrize', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries(project)) {
            store.commit('event/initBankProject', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {};

        if (store.state.event.force_event !== null) {
            obj.force_event = store.state.event.force_event;
        }
        if (store.state.event.shop_merchant.length > 0) {
            obj.shop_merchant = store.state.event.shop_merchant;
        }
        if (store.state.event.shop_big.length > 0) {
            obj.shop_big = store.state.event.shop_big;
        }
        if (store.state.event.casino_type !== null) {
            obj.casino_type = store.state.event.casino_type;
        }
        if (store.state.event.casino_bingo_bought) {
            obj.casino_bingo_bought = true;
        }
        if (store.state.event.casino_bingo_card !== null) {
            obj.casino_bingo_card = store.state.event.casino_bingo_card;
        }
        if (store.state.event.casino_bingo_draws.length > 0) {
            obj.casino_bingo_draws = store.state.event.casino_bingo_draws;
        }
        if (store.state.event.casino_bingo_boosts.length > 0) {
            obj.casino_bingo_boosts = store.state.event.casino_bingo_boosts;
        }
        if (store.state.event.casino_bingo_prize_1 !== null) {
            obj.casino_bingo_prize_1 = store.state.event.casino_bingo_prize_1;
        }
        if (store.state.event.casino_bingo_prize_2 !== null) {
            obj.casino_bingo_prize_2 = store.state.event.casino_bingo_prize_2;
        }
        if (store.state.event.casino_bingo_prize_3 !== null) {
            obj.casino_bingo_prize_3 = store.state.event.casino_bingo_prize_3;
        }
        if (store.state.event.casino_wheel_segments.length > 0) {
            obj.casino_wheel_segments = store.state.event.casino_wheel_segments;
        }
        if (store.state.event.casino_wheel_rotation > 0) {
            obj.casino_wheel_rotation = store.state.event.casino_wheel_rotation;
        }

        let bankProjects = {};
        let hasBankProject = false;
        for (const [key, elem] of Object.entries(store.state.event.bank_project)) {
            if (elem.level > 0 || elem.spent > 0) {
                bankProjects[key] = {level: elem.level, spent: elem.spent};
                hasBankProject = true;
            }
        }

        if (hasBankProject) {
            obj.bank_project = bankProjects;
        }

        if (store.state.event.bank_project_current !== null) {
            obj.bank_project_current = store.state.event.bank_project_current;
        }
        if (store.state.event.bank_investment > 0) {
            obj.bank_investment = store.state.event.bank_investment;
        }
        if (store.state.event.bank_loan > 0) {
            obj.bank_loan = store.state.event.bank_loan;
        }
        if (store.state.event.bank_action) {
            obj.bank_action = true;
        }

        // cinders stuff
        if (store.state.cinders.activeCandle !== null) {
            obj.cinders_candle = store.state.cinders.activeCandle;
        }

        // bloom stuff
        if (store.state.bloom.inventory.length > 0) {
            obj.bloom_inventory = store.state.bloom.inventory;
        }
        if (store.state.bloom.breeder.length > 0) {
            obj.bloom_breeder = store.state.bloom.breeder;
        }

        // weather chaos stuff
        if (store.state.weatherChaos.currentLocation !== 'pond') {
            obj.weatherChaos_currentLocation = store.state.weatherChaos.currentLocation;
        }
        if (store.state.weatherChaos.currentFishingRod !== 'basic') {
            obj.weatherChaos_currentFishingRod = store.state.weatherChaos.currentFishingRod;
        }
        if (store.state.weatherChaos.currentBait !== null) {
            obj.weatherChaos_currentBait = store.state.weatherChaos.currentBait;
        }
        if (store.state.weatherChaos.nextWeather.length > 0) {
            obj.weatherChaos_nextWeather = store.state.weatherChaos.nextWeather;
        }
        if (store.state.weatherChaos.fishingProgress > 0) {
            obj.weatherChaos_fishingProgress = store.state.weatherChaos.fishingProgress;
        }
        if (store.state.weatherChaos.treasureRods > 0) {
            obj.weatherChaos_treasureRods = store.state.weatherChaos.treasureRods;
        }
        if (store.state.weatherChaos.boughtRods > 0) {
            obj.weatherChaos_boughtRods = store.state.weatherChaos.boughtRods;
        }

        let weatherChaosFishingRod = [];
        for (const [key, elem] of Object.entries(store.state.weatherChaos.fishingRod)) {
            if (elem.owned && !elem.ownedDefault) {
                weatherChaosFishingRod.push(key);
            }
        }
        if (weatherChaosFishingRod.length > 0) {
            obj.weatherChaos_fishingRod = weatherChaosFishingRod;
        }

        let weatherChaosLocation = [];
        for (const [key, elem] of Object.entries(store.state.weatherChaos.location)) {
            if (elem.owned && !elem.ownedDefault) {
                weatherChaosLocation.push(key);
            }
        }
        if (weatherChaosLocation.length > 0) {
            obj.weatherChaos_location = weatherChaosLocation;
        }

        let weatherChaosBait = {};
        for (const [key, elem] of Object.entries(store.state.weatherChaos.bait)) {
            if (elem.owned > 0) {
                weatherChaosBait[key] = elem.owned;
            }
        }
        if (Object.keys(weatherChaosBait).length > 0) {
            obj.weatherChaos_bait = weatherChaosBait;
        }

        let weatherChaosFish = {};
        for (const [key, elem] of Object.entries(store.state.weatherChaos.fish)) {
            if (elem.catchRecord !== null) {
                weatherChaosFish[key] = elem.catchRecord;
            }
        }
        if (Object.keys(weatherChaosFish).length > 0) {
            obj.weatherChaos_fish = weatherChaosFish;
        }

        // summer festival stuff
        if (Object.keys(store.state.summerFestival.placedBuilding).length > 0) {
            obj.summerFestival_placedBuilding = store.state.summerFestival.placedBuilding;
        }
        if (store.state.summerFestival.buildQueue.length > 0) {
            obj.summerFestival_buildQueue = store.state.summerFestival.buildQueue;
        }
        if (store.state.summerFestival.nextBuildingId > 1) {
            obj.summerFestival_nextBuildingId = store.state.summerFestival.nextBuildingId;
        }
        if (store.state.summerFestival.island !== null) {
            obj.summerFestival_island = store.state.summerFestival.island.map(row => row.map(cell => {
                return {
                    tile: cell.tile,
                    drop: cell.drop,
                    building: cell.building,
                    unlocked: cell.unlocked,
                };
            }));
        }
        if (store.state.summerFestival.freeExpansion > 0) {
            obj.summerFestival_freeExpansion = store.state.summerFestival.freeExpansion;
        }
        if (store.state.summerFestival.topazExpansion > 0) {
            obj.summerFestival_topazExpansion = store.state.summerFestival.topazExpansion;
        }
        if (store.state.summerFestival.questsCompleted > 0) {
            obj.summerFestival_questsCompleted = store.state.summerFestival.questsCompleted;
        }

        // night hunt stuff
        if (Object.keys(store.state.nightHunt.changedCurrency).length > 0) {
            obj.nightHunt_changedCurrency = store.state.nightHunt.changedCurrency;
        }
        if (store.state.nightHunt.ritualIngredients.length > 0) {
            obj.nightHunt_ritualIngredients = store.state.nightHunt.ritualIngredients;
        }
        if (store.state.nightHunt.bonusIngredients.length > 0) {
            obj.nightHunt_bonusIngredients = store.state.nightHunt.bonusIngredients;
        }
        if (store.state.nightHunt.performedRituals.length > 0) {
            obj.nightHunt_performedRituals = store.state.nightHunt.performedRituals;
        }
        if (Object.keys(store.state.nightHunt.ritualFamiliarity).length > 0) {
            obj.nightHunt_ritualFamiliarity = store.state.nightHunt.ritualFamiliarity;
        }
        if (Object.keys(store.state.nightHunt.ritualHint).length > 0) {
            obj.nightHunt_ritualHint = store.state.nightHunt.ritualHint;
        }
        if (store.state.nightHunt.favouriteIngredient !== 'copy') {
            obj.nightHunt_favouriteIngredient = store.state.nightHunt.favouriteIngredient;
        }

        let potions = {};
        let hasPotions = false;
        for (const [key, elem] of Object.entries(store.state.nightHunt.potion)) {
            if (elem.recipe !== null || elem.level > 0) {
                potions[key] = {recipe: elem.recipe, level: elem.level};
                hasPotions = true;
            }
        }

        if (hasPotions) {
            obj.nightHunt_potion = potions;
        }

        // snowdown stuff
        if (store.state.snowdown.fight > 0) {
            obj.snowdown_fight = store.state.snowdown.fight;
        }
        if (store.state.snowdown.rewardProducer) {
            obj.snowdown_rewardProducer = true;
        }
        if (store.state.snowdown.rewardItem !== null) {
            obj.snowdown_rewardItem = store.state.snowdown.rewardItem;
        }
        if (store.state.snowdown.itemsBought > 0) {
            obj.snowdown_itemsBought = store.state.snowdown.itemsBought;
        }
        if (store.state.snowdown.itemsBoughtTopaz > 0) {
            obj.snowdown_itemsBoughtTopaz = store.state.snowdown.itemsBoughtTopaz;
        }
        if (store.state.snowdown.revenge > 0) {
            obj.snowdown_revenge = store.state.snowdown.revenge;
        }

        let items = {};
        let hasItems = false;
        for (const [key, elem] of Object.entries(store.state.snowdown.item)) {
            if (elem.amount > 0) {
                items[key] = elem.amount;
                hasItems = true;
            }
        }

        if (hasItems) {
            obj.snowdown_item = items;
        }

        return obj;
    },
    loadGame(data) {
        if (data.force_event !== undefined) {
            store.commit('event/updateKey', {key: 'force_event', value: data.force_event});
        }
        if (data.shop_merchant !== undefined) {
            store.commit('event/updateKey', {key: 'shop_merchant', value: data.shop_merchant});
        }
        if (data.shop_big !== undefined) {
            store.commit('event/updateKey', {key: 'shop_big', value: data.shop_big});
        }
        if (data.casino_type !== undefined) {
            store.commit('event/updateKey', {key: 'casino_type', value: data.casino_type});
        }
        if (data.casino_bingo_bought !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_bought', value: data.casino_bingo_bought});
        }
        if (data.casino_bingo_card !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_card', value: data.casino_bingo_card});
        }
        if (data.casino_bingo_draws !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_draws', value: data.casino_bingo_draws});
        }
        if (data.casino_bingo_boosts !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_boosts', value: data.casino_bingo_boosts});
        }
        if (data.casino_bingo_prize_1 !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_prize_1', value: data.casino_bingo_prize_1});
        }
        if (data.casino_bingo_prize_2 !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_prize_2', value: data.casino_bingo_prize_2});
        }
        if (data.casino_bingo_prize_3 !== undefined) {
            store.commit('event/updateKey', {key: 'casino_bingo_prize_3', value: data.casino_bingo_prize_3});
        }
        if (data.casino_wheel_segments !== undefined) {
            store.commit('event/updateKey', {key: 'casino_wheel_segments', value: data.casino_wheel_segments});
        }
        if (data.casino_wheel_rotation !== undefined) {
            store.commit('event/updateKey', {key: 'casino_wheel_rotation', value: data.casino_wheel_rotation});
        }
        if (data.bank_project_current !== undefined) {
            store.commit('event/updateKey', {key: 'bank_project_current', value: data.bank_project_current});
        }
        if (data.bank_project !== undefined) {
            for (const [key, elem] of Object.entries(data.bank_project)) {
                store.commit('event/updateBankProjectKey', {name: key, key: 'spent', value: elem.spent});
                if (elem.level > 0) {
                    store.commit('event/updateBankProjectKey', {name: key, key: 'level', value: elem.level});
                    store.dispatch('event/bankProjectApply', {name: key, onBuy: false});
                }
            }
        }
        if (data.bank_investment !== undefined) {
            store.commit('event/updateKey', {key: 'bank_investment', value: data.bank_investment});
        }
        if (data.bank_loan !== undefined) {
            store.commit('event/updateKey', {key: 'bank_loan', value: data.bank_loan});
        }
        if (data.bank_action !== undefined) {
            store.commit('event/updateKey', {key: 'bank_action', value: data.bank_action});
        }
        if (data.cinders_candle !== undefined) {
            store.commit('cinders/updateKey', {key: 'activeCandle', value: data.cinders_candle});
        }
        if (data.bloom_inventory !== undefined) {
            store.commit('bloom/updateKey', {key: 'inventory', value: data.bloom_inventory});
        }
        if (data.bloom_breeder !== undefined) {
            store.commit('bloom/updateKey', {key: 'breeder', value: data.bloom_breeder});
        }
        if (data.weatherChaos_currentLocation !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'currentLocation', value: data.weatherChaos_currentLocation});
            store.dispatch('weatherChaos/applyLocationEffects', data.weatherChaos_currentLocation);
        }
        if (data.weatherChaos_currentFishingRod !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'currentFishingRod', value: data.weatherChaos_currentFishingRod});
            store.dispatch('weatherChaos/applyFishingRodEffects', data.weatherChaos_currentFishingRod);
        }
        if (data.weatherChaos_currentBait !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'currentBait', value: data.weatherChaos_currentBait});
            store.dispatch('weatherChaos/applyBaitEffects', data.weatherChaos_currentBait);
        }
        if (data.weatherChaos_nextWeather !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'nextWeather', value: data.weatherChaos_nextWeather});
        }
        if (data.weatherChaos_fishingProgress !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'fishingProgress', value: data.weatherChaos_fishingProgress});
        }
        if (data.weatherChaos_treasureRods !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'treasureRods', value: data.weatherChaos_treasureRods});
        }
        if (data.weatherChaos_boughtRods !== undefined) {
            store.commit('weatherChaos/updateKey', {key: 'boughtRods', value: data.weatherChaos_boughtRods});
        }
        if (data.weatherChaos_fishingRod !== undefined) {
            data.weatherChaos_fishingRod.forEach(key => {
                store.commit('weatherChaos/updateSubkey', {name: 'fishingRod', key, subkey: 'owned', value: true});
            });
        }
        if (data.weatherChaos_location !== undefined) {
            data.weatherChaos_location.forEach(key => {
                store.commit('weatherChaos/updateSubkey', {name: 'location', key, subkey: 'owned', value: true});
            });
        }
        if (data.weatherChaos_bait !== undefined) {
            for (const [key, elem] of Object.entries(data.weatherChaos_bait)) {
                store.commit('weatherChaos/updateSubkey', {name: 'bait', key, subkey: 'owned', value: elem});
            }
        }
        if (data.weatherChaos_fish !== undefined) {
            for (const [key, elem] of Object.entries(data.weatherChaos_fish)) {
                store.commit('weatherChaos/updateSubkey', {name: 'fish', key, subkey: 'catchRecord', value: elem});
            }
        }
        if (data.summerFestival_buildQueue !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'buildQueue', value: data.summerFestival_buildQueue});
        }
        if (data.summerFestival_nextBuildingId !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'nextBuildingId', value: data.summerFestival_nextBuildingId});
        }
        if (data.summerFestival_island !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'island', value: data.summerFestival_island.map(row => row.map(cell => {
                return {
                    ...cell,
                    cacheAutocollect: null,
                };
            }))});
        }
        if (data.summerFestival_freeExpansion !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'freeExpansion', value: data.summerFestival_freeExpansion});
        }
        if (data.summerFestival_topazExpansion !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'topazExpansion', value: data.summerFestival_topazExpansion});
        }
        if (data.summerFestival_questsCompleted !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'questsCompleted', value: data.summerFestival_questsCompleted});
        }
        if (data.summerFestival_placedBuilding !== undefined) {
            store.commit('summerFestival/updateKey', {key: 'placedBuilding', value: data.summerFestival_placedBuilding});
            for (const [key, elem] of Object.entries(data.summerFestival_placedBuilding)) {
                if (elem.level > 0) {
                    store.dispatch('summerFestival/applyBuildingEffects', parseInt(key));
                }
            }
            store.dispatch('summerFestival/calculateConnectCaches');
        }
        if (data.nightHunt_changedCurrency !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'changedCurrency', value: data.nightHunt_changedCurrency});
        }
        if (data.nightHunt_ritualIngredients !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'ritualIngredients', value: data.nightHunt_ritualIngredients});
        }
        if (data.nightHunt_bonusIngredients !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'bonusIngredients', value: data.nightHunt_bonusIngredients});
        }
        if (data.nightHunt_performedRituals !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'performedRituals', value: data.nightHunt_performedRituals});
        }
        if (data.nightHunt_ritualFamiliarity !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'ritualFamiliarity', value: data.nightHunt_ritualFamiliarity});
        }
        if (data.nightHunt_ritualHint !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'ritualHint', value: data.nightHunt_ritualHint});
        }
        if (data.nightHunt_favouriteIngredient !== undefined) {
            store.commit('nightHunt/updateKey', {key: 'favouriteIngredient', value: data.nightHunt_favouriteIngredient});
        }
        if (data.nightHunt_potion !== undefined) {
            for (const [key, elem] of Object.entries(data.nightHunt_potion)) {
                store.commit('nightHunt/updatePotionKey', {name: key, key: 'recipe', value: elem.recipe});
                if (elem.level > 0) {
                    store.commit('nightHunt/updatePotionKey', {name: key, key: 'level', value: elem.level});
                    store.dispatch('nightHunt/applyPotionEffects', key);
                }
            }
        }
        if (data.snowdown_fight !== undefined) {
            store.commit('snowdown/updateKey', {key: 'fight', value: data.snowdown_fight});
        }
        if (data.snowdown_rewardProducer !== undefined) {
            store.commit('snowdown/updateKey', {key: 'rewardProducer', value: data.snowdown_rewardProducer});
        }
        if (data.snowdown_rewardItem !== undefined) {
            store.commit('snowdown/updateKey', {key: 'rewardItem', value: data.snowdown_rewardItem});
        }
        if (data.snowdown_itemsBought !== undefined) {
            store.commit('snowdown/updateKey', {key: 'itemsBought', value: data.snowdown_itemsBought});
        }
        if (data.snowdown_itemsBoughtTopaz !== undefined) {
            store.commit('snowdown/updateKey', {key: 'itemsBoughtTopaz', value: data.snowdown_itemsBoughtTopaz});
        }
        if (data.snowdown_revenge !== undefined) {
            store.commit('snowdown/updateKey', {key: 'revenge', value: data.snowdown_revenge});
            store.dispatch('snowdown/applyRevengeEffect');
        }
        if (data.snowdown_item !== undefined) {
            for (const [key, elem] of Object.entries(data.snowdown_item)) {
                store.commit('snowdown/updateItemKey', {name: key, key: 'amount', value: elem});
                store.dispatch('snowdown/applyItemEffects', key);
            }
        }
    }
}
