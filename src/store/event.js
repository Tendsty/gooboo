import Vue from "vue";
import { BANK_INVESTMENT_INTEREST_LARGE, BANK_INVESTMENT_INTEREST_SMALL, BANK_LOAN_INTEREST, CASINO_BINGO_CARD_COST, CASINO_WHEEL_COST } from "../js/constants";
import { buildArray, shuffleArray } from "../js/utils/array";
import { getDay, getWeek } from "../js/utils/date";
import { chance, randomElem, randomFloat, weightSelect } from "../js/utils/random";
import big from "../js/modules/event/big";

export default {
    namespaced: true,
    state: {
        big,
        small: ['merchant', 'casino', 'bank'],
        force_event: null,
        shop_merchant: [],
        shop_big: [],
        prize: {},
        casino_types: ['bingo', 'wheelOfFortune'],
        casino_type: null,
        casino_bingo_bought: false,
        casino_bingo_card: null,
        casino_bingo_draws: [],
        casino_bingo_boosts: [],
        casino_bingo_prize_1: null,
        casino_bingo_prize_2: null,
        casino_bingo_prize_3: null,
        casino_wheel_segments: [],
        casino_wheel_rotation: 0,
        bank_project: {},
        bank_project_current: null,
        bank_investment: 0,
        bank_loan: 0,
        bank_action: false,
        prize_fleeting: ['relic', 'treasure', 'theme']
    },
    getters: {
        currentEvent: (state, getters, rootState) => {
            return getters.eventOnDay(rootState.system.currentDay);
        },
        eventOnDay: (state, getters) => (day) => {
            if (state.force_event !== null) {
                return state.force_event;
            }
            let event = null;
            const now = new Date(`${day}T12:00:00`);

            getters.calendar(day).forEach(elem => {
                if (elem.start.getTime() < now.getTime() && elem.end.getTime() > now.getTime()) {
                    event = elem.name;
                }
            });

            return event;
        },
        eventIsBig: (state) => (name) => {
            for (const [key] of Object.entries(state.big)) {
                if (name === key) {
                    return true;
                }
            }
            return false;
        },
        calendar: (state, getters, rootState) => (day = null) => {
            let arr = [];

            const now = new Date(`${day ?? rootState.system.currentDay}T00:00:00`);
            const min = new Date(now.getFullYear(), now.getMonth(), 1);
            const max = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const firstday = new Date(min.setDate(min.getDate() - (min.getDay() === 0 ? 6 : min.getDay() - 1)));
            const lastday = new Date(max.setDate(max.getDate() - (max.getDay() === 0 ? 6 : max.getDay() - 1) + 6));
            const year = now.getFullYear();
            const month = now.getMonth() + 1;

            // Get all big events
            for (const [key, elem] of Object.entries(state.big)) {
                if (month >= parseInt(elem.start.substring(0, 2)) && month <= parseInt(elem.end.substring(0, 2))) {
                    arr.push({
                        name: key,
                        color: elem.color,
                        start: new Date(`${year}-${elem.start}T00:00:00`),
                        end: new Date(`${year}-${elem.end}T23:59:59`)
                    });
                }
            }

            // Create an array for each week in the current month
            let timestamp = getDay(firstday);
            let weeks = [];
            while ((new Date(`${timestamp}T00:00:00`)) <= lastday) {
                weeks.push(timestamp);
                let newDate = new Date(`${timestamp}T00:00:00`);
                newDate.setDate(newDate.getDate() + 7)
                timestamp = getDay(newDate);
            }

            // Add random events to the weekend
            weeks.forEach(week => {
                let startCompare = new Date(`${week}T00:00:00`);
                startCompare.setDate(startCompare.getDate() + 4);
                let startDate = new Date(`${week}T00:00:00`);
                startDate.setDate(startDate.getDate() + 5);
                let endCompare = new Date(`${week}T23:59:59`);
                endCompare.setDate(endCompare.getDate() + 7);
                let endDate = new Date(`${week}T23:59:59`);
                endDate.setDate(endDate.getDate() + 6);
                if (arr.findIndex(el => el.start <= endCompare && el.end >= startCompare) === -1) {
                    arr.push({
                        name: state.small[getWeek(startDate) % state.small.length],
                        start: startDate,
                        end: endDate
                    });
                }
            });

            return arr;
        },
        shopData: (state) => (pool, index) => {
            const shop = state[pool === 'merchant' ? 'shop_merchant' : 'shop_big'][index];
            const prize = state.prize[shop.prize];
            return {...prize, ...prize.pool[pool], ...shop};
        },
        maxAffordShop: (state, getters, rootState, rootGetters) => (pool, index) => {
            const shop = getters.shopData(pool, index);
            let maxAfford = shop.cap === null ? Infinity : (shop.cap - shop.taken);
            for (const [key, elem] of Object.entries(shop.price)) {
                if (rootGetters['currency/value'](key) < elem) {
                    maxAfford = 0;
                } else {
                    maxAfford = Math.min(maxAfford, Math.floor(rootState.currency[key].value / elem));
                }
            }
            return maxAfford;
        },
        eventReward: (state, getters, rootState) => {
            const currentEvent = getters.currentEvent;
            for (const [key, elem] of Object.entries(state.big)) {
                if (currentEvent === key || rootState.currency['event_' + elem.token].value > 0) {
                    return key;
                }
            }
            return null;
        },
        casinoMultipliersAvailable: (state) => {
            let available = 0;
            if (state.casino_bingo_draws.length >= 22) {
                available = 6;
            } else if (state.casino_bingo_draws.length >= 17) {
                available = 4;
            } else if (state.casino_bingo_draws.length >= 12) {
                available = 2;
            }
            return available - state.casino_bingo_boosts.length;
        },
        casinoMultiplierNext: (state, getters) => {
            if (getters.casinoMultipliersAvailable === 0) {
                return null;
            }
            return Math.floor(state.casino_bingo_boosts.length / 2 + 3);
        },
        getRandomPrize: (state, getters, rootState, rootGetters) => (pool, amount = 1) => {
            let rngGen = rootGetters['system/getRng']('event_prizePool_' + pool);
            let eligible = [];
            let eligibleWeights = [];
            let chosen = [];
            let treasureRng = {};
            for (const [key, elem] of Object.entries(state.prize)) {
                if (elem.requirement() && elem.pool[pool]) {
                    const elemBase = {...elem, ...elem.pool[pool]};
                    if (elemBase.weight !== null && !(
                        (elemBase.type === 'relic' && rootState.relic.item[elemBase.item].found) ||
                        (elemBase.type === 'theme' && rootState.system.themes[elemBase.item].owned)
                    )) {
                        for (let i = 0; i < elem.times; i++) {
                            eligible.push(key);
                            eligibleWeights.push(elemBase.weight);
                        }
                    }
                }
            }
            for (let i = 0; i < amount; i++) {
                if (eligible.length > 0) {
                    const chosenIndex = weightSelect(eligibleWeights, rngGen());
                    const prize = state.prize[eligible[chosenIndex]];
                    const isTreasure = prize.type === 'treasure';
                    if (isTreasure && treasureRng[prize.item] === undefined) {
                        treasureRng[prize.item] = 0;
                    }
                    chosen.push(getters.getNewPrize(eligible[chosenIndex], isTreasure ? treasureRng[prize.item] : 0, prize.bonusTier));
                    eligible.splice(chosenIndex, 1);
                    eligibleWeights.splice(chosenIndex, 1);
                    if (isTreasure) {
                        treasureRng[prize.item]++;
                    }
                }
            }
            return chosen;
        },
        getNewPrize: (state, getters, rootState, rootGetters) => (name, rngSkip = 0, bonusTier = 0) => {
            const prize = state.prize[name];
            return {prize: name, taken: 0, data: prize.type === 'treasure' ? rootGetters['treasure/generateItem'](prize.item, 0, true, rngSkip, bonusTier) : null};
        },
        getBingoCount: (state) => {
            if (state.casino_bingo_card === null) {
                return null;
            }

            let drawn = [];
            state.casino_bingo_card.forEach((column, x) => {
                column.forEach((cell, y) => {
                    if (state.casino_bingo_draws.includes(cell.value)) {
                        drawn.push(y * 5 + x);
                    }
                });
            });

            let bingos = 0;
            [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24],
                [0, 5, 10, 15, 20],
                [1, 6, 11, 16, 21],
                [2, 7, 12, 17, 22],
                [3, 8, 13, 18, 23],
                [4, 9, 14, 19, 24],
                [0, 6, 12, 18, 24],
                [4, 8, 12, 16, 20]
            ].forEach(elem => {
                if (elem.reduce((a, b) => a + (drawn.includes(b) ? 1 : 0), 0) >= 5) {
                    bingos++;
                }
            });

            return bingos;
        },
        getWheelSegment: (state) => {
            const rotate = 360 - (state.casino_wheel_rotation % 360);
            let offset = 0;
            return state.casino_wheel_segments.findIndex(segment => {
                offset += segment.width;
                return rotate < offset;
            });
        },
        dayStats: (state, getters) => (start, end) => {
            const startEvent = getters.eventOnDay(start);
            const endEvent = getters.eventOnDay(end);
            const startDay = new Date(start);
            const endDay = new Date(end);
            const isBigEvent = endEvent === null ? false : getters.eventIsBig(endEvent);
            const isSameEvent = endEvent !== null && startEvent === endEvent && (
                (isBigEvent && start.slice(0, 4) === end.slice(0, 4)) ||                          // Big events need to be in the same year
                (!isBigEvent && Math.abs(endDay.getTime() - startDay.getTime()) < (4 * 86400000)) // Small events need to be less than 4 days apart
            );
            let startedBankEvent = false;

            // Check if a passed bank event needs to resolve investments
            if (endEvent !== 'bank') {
                const startTimestamp = startDay.getTime();
                let offset = 21 - (Math.floor(startTimestamp / 86400000 + 5) % 21);
                const maxOffset = Math.floor(endDay.getTime() / 86400000) - Math.floor(startDay.getTime() / 86400000);
                while (!startedBankEvent && offset < maxOffset) {
                    if (getters.eventOnDay(getDay(new Date(startTimestamp + offset * 86400000))) === 'bank') {
                        startedBankEvent = true;
                    }
                    offset += 21;
                }
            }

            let startedBigEvent = endEvent !== null && !isSameEvent && isBigEvent;
            if (!startedBigEvent) {
                let nextEventStart = null;
                const year = startDay.getFullYear();
                const timestamp = startDay.getTime();
                for (const [, elem] of Object.entries(state.big)) {
                    const startTimeBase = (new Date(`${year}-${elem.start}`)).getTime();
                    const realYear = startTimeBase > timestamp ? year : year + 1;
                    const startTime = startTimeBase > timestamp ? startTimeBase : (new Date(`${year + 1}-${elem.start}`)).getTime();
                    if (nextEventStart === null || startTime < (new Date(nextEventStart)).getTime()) {
                        nextEventStart = realYear + '-' + elem.start;
                    }
                }
                if (nextEventStart !== null && endDay.getTime() >= (new Date(nextEventStart)).getTime()) {
                    startedBigEvent = true;
                }
            }

            return {
                startEvent,
                endEvent,
                isBigEvent,
                isSameEvent,
                startedBankEvent,
                startedBigEvent,
                triggerLock: startDay.getTime() > endDay.getTime() && startEvent !== endEvent
            };
        },
        bingoCellIsRare: () => (index) => {
            return [1, 3, 5, 9, 15, 19, 21, 23].includes(index);
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.key], o.subkey, o.value);
        },
        updateIndex(state, o) {
            Vue.set(state[o.name][o.key], o.subkey, o.value);
        },
        pushKey(state, o) {
            state[o.key].push(o.value);
        },
        removeKey(state, o) {
            state[o.key].splice(o.index, 1);
        },
        updateBankProjectKey(state, o) {
            Vue.set(state.bank_project[o.name], o.key, o.value);
        },
        initPrize(state, o) {
            Vue.set(state.prize, o.name, {
                type: o.type,
                item: o.item,
                weight: o.weight ?? null,
                requirement: o.requirement ?? (() => true),
                times: o.times ?? 1,
                bonusTier: o.bonusTier ?? 0,
                amount: o.amount ?? 1,
                roundAmount: o.roundAmount ?? false,
                amountMult: o.amountMult ?? (() => 1),
                cap: o.cap ?? null,
                pool: o.pool ?? null
            });
        },
        initBankProject(state, o) {
            Vue.set(state.bank_project, o.name, {
                level: 0,
                spent: 0,
                price: o.price ?? (() => 1000),
                effect: o.effect ?? (() => { return {}; })
            });
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'force_event', value: null});
            commit('updateKey', {key: 'shop_merchant', value: []});
            commit('updateKey', {key: 'shop_big', value: []});
            commit('updateKey', {key: 'casino_type', value: null});
            commit('updateKey', {key: 'casino_bingo_bought', value: false});
            commit('updateKey', {key: 'casino_bingo_card', value: null});
            commit('updateKey', {key: 'casino_bingo_draws', value: []});
            commit('updateKey', {key: 'casino_bingo_boosts', value: []});
            commit('updateKey', {key: 'casino_bingo_prize_1', value: null});
            commit('updateKey', {key: 'casino_bingo_prize_2', value: null});
            commit('updateKey', {key: 'casino_bingo_prize_3', value: null});
            commit('updateKey', {key: 'casino_wheel_segments', value: []});
            commit('updateKey', {key: 'casino_wheel_rotation', value: 0});
            commit('updateKey', {key: 'bank_project_current', value: null});
            commit('updateKey', {key: 'bank_investment', value: 0});
            commit('updateKey', {key: 'bank_loan', value: 0});
            commit('updateKey', {key: 'bank_action', value: false});
            for (const [key] of Object.entries(state.bank_project)) {
                commit('updateBankProjectKey', {name: key, key: 'level', value: 0});
                commit('updateBankProjectKey', {name: key, key: 'spent', value: 0});
            }
        },
        start({ state, getters, rootGetters, commit, dispatch }, name) {
            switch (name) {
                case 'merchant': {
                    dispatch('generateShops', 'merchant');
                    dispatch('note/find', 'event_3', {root: true});
                    break;
                }
                case 'casino': {
                    let rngGen = rootGetters['system/getRng']('casino_type');
                    commit('system/nextRng', {name: 'casino_type', amount: 1}, {root: true});
                    commit('updateKey', {key: 'casino_type', value: randomElem(state.casino_types, rngGen())});
                    switch (state.casino_type) {
                        case 'bingo': {
                            dispatch('casinoBingoCardGenerate');
                            dispatch('note/find', 'event_4', {root: true});
                            break;
                        }
                        case 'wheelOfFortune': {
                            dispatch('casinoWheelGenerate');
                            dispatch('note/find', 'event_5', {root: true});
                            break;
                        }
                    }
                    break;
                }
                case 'bank': {
                    // Cash in investment
                    dispatch('bankCashInInvestment');
                    let rngGen = rootGetters['system/getRng']('bank_project');
                    commit('system/nextRng', {name: 'bank_project', amount: 1}, {root: true});
                    commit('updateKey', {key: 'bank_project_current', value: randomElem(Object.keys(state.bank_project), rngGen())});
                    commit('updateKey', {key: 'bank_investment', value: 0});
                    commit('updateKey', {key: 'bank_action', value: true});
                    dispatch('note/find', 'event_6', {root: true});
                    break;
                }
                case 'cinders': {
                    dispatch('note/find', 'event_7', {root: true});
                    break;
                }
                case 'bloom': {
                    dispatch('bloom/addFlower', rootGetters['bloom/buildFlower']({type: 'daisy'}), {root: true});
                    dispatch('note/find', 'event_11', {root: true});
                    break;
                }
                case 'weatherChaos': {
                    dispatch('weatherChaos/initWeatherCycle', null, {root: true});
                    dispatch('note/find', 'event_15', {root: true});
                    break;
                }
                case 'summerFestival': {
                    dispatch('summerFestival/generateIsland', null, {root: true});
                    dispatch('note/find', 'event_19', {root: true});
                    break;
                }
                case 'nightHunt': {
                    dispatch('nightHunt/seedRecipes', null, {root: true});
                    dispatch('note/find', 'event_26', {root: true});
                    break;
                }
                case 'snowdown': {
                    dispatch('note/find', 'event_30', {root: true});
                    break;
                }
            }
            commit('unlock/unlock', name === 'casino' ? `${ state.casino_type }CasinoEvent` : `${ name }Event`, {root: true});
            if (getters.eventIsBig(name)) {
                dispatch('generateShops', name);
                dispatch('note/find', 'event_1', {root: true});
            }
        },
        end({ rootState, getters, commit, dispatch }, name) {
            switch (name) {
                case 'cinders': {
                    commit('cinders/updateKey', {key: 'activeCandle', value: null}, {root: true});
                    dispatch('upgrade/reset', {feature: 'event', type: 'cindersProducer'}, {root: true});
                    break;
                }
                case 'bloom': {
                    commit('bloom/updateKey', {key: 'inventory', value: []}, {root: true});
                    commit('bloom/updateKey', {key: 'breeder', value: []}, {root: true});
                    break;
                }
                case 'weatherChaos': {
                    for (const [key, elem] of Object.entries(rootState.weatherChaos.fishingRod)) {
                        commit('weatherChaos/updateSubkey', {name: 'fishingRod', key, subkey: 'owned', value: elem.ownedDefault}, {root: true});
                    }
                    for (const [key, elem] of Object.entries(rootState.weatherChaos.location)) {
                        commit('weatherChaos/updateSubkey', {name: 'location', key, subkey: 'owned', value: elem.ownedDefault}, {root: true});
                    }
                    for (const [key] of Object.entries(rootState.weatherChaos.fish)) {
                        commit('weatherChaos/updateSubkey', {name: 'fish', key, subkey: 'catchRecord', value: null}, {root: true});
                    }
                    for (const [key] of Object.entries(rootState.weatherChaos.bait)) {
                        commit('weatherChaos/updateSubkey', {name: 'bait', key, subkey: 'owned', value: 0}, {root: true});
                    }
                    commit('weatherChaos/updateKey', {key: 'currentLocation', value: 'pond'}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'currentFishingRod', value: 'basic'}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'currentBait', value: null}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'nextWeather', value: []}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'fishingProgress', value: 0}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'treasureRods', value: 0}, {root: true});
                    commit('weatherChaos/updateKey', {key: 'boughtRods', value: 0}, {root: true});
                    break;
                }
                case 'summerFestival': {
                    for (const [id] of Object.entries(rootState.summerFestival.placedBuilding)) {
                        dispatch('summerFestival/resetBuildingEffects', id, {root: true});
                    }
                    commit('summerFestival/updateKey', {key: 'placedBuilding', value: {}}, {root: true});
                    commit('summerFestival/updateKey', {key: 'buildQueue', value: []}, {root: true});
                    commit('summerFestival/updateKey', {key: 'selectedBuilding', value: null}, {root: true});
                    commit('summerFestival/updateKey', {key: 'nextBuildingId', value: 1}, {root: true});
                    commit('summerFestival/updateKey', {key: 'island', value: null}, {root: true});
                    commit('summerFestival/updateKey', {key: 'selectedCell', value: null}, {root: true});
                    commit('summerFestival/updateKey', {key: 'freeExpansion', value: 0}, {root: true});
                    commit('summerFestival/updateKey', {key: 'topazExpansion', value: 0}, {root: true});
                    commit('summerFestival/updateKey', {key: 'questsCompleted', value: 0}, {root: true});
                    commit('summerFestival/updateKey', {key: 'buildingRotate', value: 0}, {root: true});
                    break;
                }
                case 'nightHunt': {
                    commit('nightHunt/updateKey', {key: 'changedCurrency', value: {}}, {root: true});
                    commit('nightHunt/updateKey', {key: 'ritualIngredients', value: []}, {root: true});
                    commit('nightHunt/updateKey', {key: 'bonusIngredients', value: []}, {root: true});
                    commit('nightHunt/updateKey', {key: 'performedRituals', value: []}, {root: true});
                    commit('nightHunt/updateKey', {key: 'ritualFamiliarity', value: {}}, {root: true});
                    commit('nightHunt/updateKey', {key: 'ritualHint', value: {}}, {root: true});
                    commit('nightHunt/updateKey', {key: 'favouriteIngredient', value: 'copy'}, {root: true});
                    for (const [key, elem] of Object.entries(rootState.nightHunt.potion)) {
                        commit('nightHunt/updatePotionKey', {name: key, key: 'recipe', value: null}, {root: true});
                        if (elem.level > 0) {
                            commit('nightHunt/updatePotionKey', {name: key, key: 'level', value: 0}, {root: true});
                            dispatch('nightHunt/resetPotionEffects', key, {root: true});
                        }
                    }
                    break;
                }
                case 'snowdown': {
                    commit('snowdown/updateKey', {key: 'fight', value: 0}, {root: true});
                    commit('snowdown/updateKey', {key: 'result', value: null}, {root: true});
                    commit('snowdown/updateKey', {key: 'rewardProducer', value: false}, {root: true});
                    commit('snowdown/updateKey', {key: 'rewardItem', value: null}, {root: true});
                    commit('snowdown/updateKey', {key: 'itemsBought', value: 0}, {root: true});
                    for (const [key, elem] of Object.entries(rootState.snowdown.item)) {
                        if (elem.amount > 0) {
                            commit('snowdown/updateItemKey', {name: key, key: 'amount', value: 0}, {root: true});
                            dispatch('snowdown/applyItemEffects', key, {root: true});
                        }
                    }
                    break;
                }
                case 'merchant': {
                    commit('updateKey', {key: 'shop_merchant', value: []});
                    break;
                }
                case 'casino': {
                    commit('updateKey', {key: 'casino_bingo_card', value: null});
                    commit('updateKey', {key: 'casino_bingo_draws', value: []});
                    commit('updateKey', {key: 'casino_bingo_boosts', value: []});
                    commit('updateKey', {key: 'casino_bingo_prize_1', value: null});
                    commit('updateKey', {key: 'casino_bingo_prize_2', value: null});
                    commit('updateKey', {key: 'casino_bingo_prize_3', value: null});
                    commit('updateKey', {key: 'casino_wheel_segments', value: []});
                    commit('updateKey', {key: 'casino_wheel_rotation', value: 0});
                    break;
                }
                case 'bank': {
                    commit('updateKey', {key: 'bank_project_current', value: null});
                    commit('updateKey', {key: 'bank_action', value: false});
                    break;
                }
            }
            if (getters.eventIsBig(name)) {
                // Reset all event currencies
                dispatch('currency/reset', {feature: 'event', type: name}, {root: true});

                // Reset all event upgrades
                dispatch('upgrade/reset', {feature: 'event', type: name}, {root: true});

                // Reset all event stats
                dispatch('stat/reset', {feature: 'event', type: name}, {root: true});
            }
        },
        dayChange({ getters, dispatch }, o) {
            const stats = getters.dayStats(o.start, o.end);

            if (stats.startedBankEvent) {
                dispatch('bankCashInInvestment');
            }

            if (stats.startedBigEvent) {
                // Remaining event tokens are cleared when a new big event starts
                dispatch('currency/reset', {feature: 'event', type: 'token'}, {root: true});
            }
            if (!stats.isSameEvent && stats.startEvent !== null) {
                dispatch('end', stats.startEvent);
            }
            if (!stats.isSameEvent && stats.endEvent !== null) {
                dispatch('start', stats.endEvent);
            }
        },
        buyShop({ state, getters, commit, dispatch }, o) {
            const shop = getters.shopData(o.pool, o.index);
            const maxAfford = getters.maxAffordShop(o.pool, o.index);
            if (maxAfford >= 1) {
                const shopName = o.pool === 'merchant' ? 'shop_merchant' : 'shop_big';
                const amount = o.max ? maxAfford : 1;

                // Pay for the upgrade
                for (const [key, elem] of Object.entries(shop.price)) {
                    dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem * amount}, {root: true});
                }

                // Give shop item(s)
                dispatch('winPrize', {pool: o.pool, prize: shop, amount});

                // Track amount and handle empty shops
                const taken = shop.taken + amount;
                if (!state.prize_fleeting.includes(shop.type) && (shop.cap === null || taken < shop.cap)) {
                    commit('updateIndex', {name: shopName, key: o.index, subkey: 'taken', value: taken});
                } else {
                    commit('removeKey', {key: shopName, index: o.index});
                }
            }
        },
        bankProjectApply({ state, dispatch }, o) {
            const trigger = o.onBuy ?? false;
            const level = state.bank_project[o.name].level;
            state.bank_project[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `bankProject_${o.name}`, value: eff.value(level), trigger}, {root: true});
            });
        },
        bankProjectFund({ state, rootGetters, commit, dispatch }, amount) {
            if (state.bank_action && state.bank_project_current !== null && rootGetters['currency/value']('gem_topaz') >= amount) {
                const project = state.bank_project[state.bank_project_current];
                const newSpent = project.spent + amount;

                if (newSpent >= project.price(project.level)) {
                    commit('updateBankProjectKey', {name: state.bank_project_current, key: 'spent', value: 0});
                    commit('updateBankProjectKey', {name: state.bank_project_current, key: 'level', value: project.level + 1});
                    dispatch('bankProjectApply', {name: state.bank_project_current, onBuy: true});
                } else {
                    commit('updateBankProjectKey', {name: state.bank_project_current, key: 'spent', value: newSpent});
                }
                commit('updateKey', {key: 'bank_action', value: false});
                dispatch('bankRollForCardPack');
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount}, {root: true});
            }
        },
        bankInvest({ state, rootGetters, commit, dispatch }, amount) {
            if (state.bank_action && state.bank_investment <= 0 && rootGetters['currency/value']('gem_topaz') >= amount) {
                commit('updateKey', {key: 'bank_investment', value: amount});
                commit('updateKey', {key: 'bank_action', value: false});
                dispatch('bankRollForCardPack');
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount}, {root: true});
            }
        },
        bankLoanRepay({ state, rootGetters, commit, dispatch }, amount) {
            if (state.bank_loan >= amount && rootGetters['currency/value']('gem_topaz') >= amount) {
                commit('updateKey', {key: 'bank_loan', value: state.bank_loan - amount});
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount}, {root: true});
            }
        },
        bankLoanBorrow({ state, rootGetters, commit, dispatch }, amount) {
            if (state.bank_action && (state.bank_loan + amount) <= rootGetters['mult/get']('bankLoanSize')) {
                commit('updateKey', {key: 'bank_loan', value: state.bank_loan + Math.ceil(amount * (BANK_LOAN_INTEREST + 1))});
                commit('updateKey', {key: 'bank_action', value: false});
                dispatch('bankRollForCardPack');
                dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount}, {root: true});
            }
        },
        bankRollForCardPack({ rootGetters, commit, dispatch}) {
            let rngGen = rootGetters['system/getRng']('bank_cardPack');
            commit('system/nextRng', {name: 'bank_cardPack', amount: 1}, {root: true});
            if (chance(rootGetters['mult/get']('bankCardPackChance'), rngGen())) {
                dispatch('card/openPack', {name: 'investorsDream', notify: true, amount: 1}, {root: true});
            }
        },
        bankCashInInvestment({ state, rootGetters, dispatch }) {
            if (state.bank_investment > 0) {
                const interestLimit = rootGetters['mult/get']('bankInvestmentSize');
                let interest = Math.min(state.bank_investment, interestLimit) * BANK_INVESTMENT_INTEREST_LARGE;
                if (state.bank_investment > interestLimit) {
                    interest += (state.bank_investment - interestLimit) * BANK_INVESTMENT_INTEREST_SMALL;
                }
                if (interest >= 1) {
                    dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount: Math.floor(interest)}, {root: true});
                }
                dispatch('currency/gain', {feature: 'gem', name: 'topaz', amount: state.bank_investment, refund: true}, {root: true});
            }
        },
        casinoBingoCardGenerate({ state, getters, rootGetters, commit }) {
            let bingoCard = [];
            let rngGen = rootGetters['system/getRng']('bingo_generate');
            commit('system/nextRng', {name: 'bingo_generate', amount: 1}, {root: true});
            for (let i = 0; i < 5; i++) {
                bingoCard.push(shuffleArray(buildArray(15).map(n => n + i * 15 + 1), rngGen).slice(0, 5).map(elem => {return {value: elem, prize: null, isRare: false};}));
            }
            shuffleArray([...buildArray(12), ...buildArray(12).map(i => i + 13)], rngGen).slice(0, 6).forEach(num => {
                const pool = 'bingo' + (getters.bingoCellIsRare(num) ? 1 : 0);
                const prize = getters.getRandomPrize(pool)[0];
                commit('system/nextRng', {name: 'event_prizePool_' + pool, amount: 1}, {root: true});
                const prizeData = state.prize[prize.prize];
                if (prizeData.type === 'treasure') {
                    commit('system/nextRng', {name: 'treasure_' + prizeData.item, amount: 1}, {root: true});
                }
                bingoCard[Math.floor(num / 5)][num % 5].prize = prize;
                if (getters.bingoCellIsRare(num)) {
                    bingoCard[Math.floor(num / 5)][num % 5].isRare = true;
                }
            });
            commit('updateKey', {key: 'casino_bingo_card', value: bingoCard});
            commit('updateKey', {key: 'casino_bingo_draws', value: []});
            commit('updateKey', {key: 'casino_bingo_boosts', value: []});
            for (let i = 0; i < 3; i++) {
                const pool = 'bingo' + (i + 2);
                const prize = getters.getRandomPrize(pool)[0];
                commit('system/nextRng', {name: 'event_prizePool_' + pool, amount: 1}, {root: true});
                const prizeData = state.prize[prize.prize];
                if (prizeData.type === 'treasure') {
                    commit('system/nextRng', {name: 'treasure_' + prizeData.item, amount: 1}, {root: true});
                }
                commit('updateKey', {key: 'casino_bingo_prize_' + (i + 1), value: prize});
            }
        },
        casinoBingoCardDraw({ state, getters, rootGetters, commit, dispatch }) {
            let weights = buildArray(75).map(elem => {
                const num = elem + 1;
                if (state.casino_bingo_draws.includes(num)) {
                    return 0;
                }
                const boostIndex = state.casino_bingo_boosts.findIndex(boost => boost === num);
                return boostIndex === -1 ? 1 : Math.floor(boostIndex / 2 + 3);
            });

            const oldBingos = getters.getBingoCount;

            // Set draw goal based on drawn numbers
            let drawGoal = 12;
            if (state.casino_bingo_draws.length >= 22) {
                drawGoal = 25;
            } else if (state.casino_bingo_draws.length >= 17) {
                drawGoal = 22;
            } else if (state.casino_bingo_draws.length >= 12) {
                drawGoal = 17;
            }

            let rngGen = rootGetters['system/getRng']('bingo_draw');
            commit('system/nextRng', {name: 'bingo_draw', amount: 1}, {root: true});
            while (state.casino_bingo_draws.length < drawGoal) {
                const drawnNum = weightSelect(weights, rngGen());
                weights[drawnNum] = 0;
                commit('pushKey', {key: 'casino_bingo_draws', value: drawnNum + 1});

                // Award cell prizes
                state.casino_bingo_card.forEach(column => {
                    column.forEach(cell => {
                        if (cell.value === (drawnNum + 1) && cell.prize !== null) {
                            dispatch('winPrize', {prize: cell.prize, pool: 'bingo' + (cell.isRare ? 1 : 0), notify: true});
                        }
                    });
                });
            }

            const newBingos = getters.getBingoCount;

            // Award bingo prizes
            if (newBingos >= 1 && oldBingos < 1) {
                dispatch('winPrize', {prize: state.casino_bingo_prize_1, pool: 'bingo2', notify: true});
            }
            if (newBingos >= 2 && oldBingos < 2) {
                dispatch('winPrize', {prize: state.casino_bingo_prize_2, pool: 'bingo3', notify: true});
            }
            if (newBingos >= 3 && oldBingos < 3) {
                dispatch('winPrize', {prize: state.casino_bingo_prize_3, pool: 'bingo4', notify: true});
            }
        },
        casinoApplyMultiplier({ state, getters, commit }, num) {
            if (getters.casinoMultipliersAvailable > 0 && !state.casino_bingo_boosts.includes(num)) {
                commit('pushKey', {key: 'casino_bingo_boosts', value: num});
            }
        },
        casinoBingoBuy({ state, rootGetters, commit, dispatch }) {
            if (!state.casino_bingo_bought && rootGetters['currency/value']('gem_topaz') >= CASINO_BINGO_CARD_COST) {
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount: CASINO_BINGO_CARD_COST}, {root: true});
                commit('updateKey', {key: 'casino_bingo_bought', value: true});
            }
        },
        winPrize({ state, commit, dispatch }, o) {
            if (o.notify) {
                commit('system/addNotification', {color: 'success', timeout: 10000, message: {
                    type: 'prize',
                    pool: o.pool,
                    value: o.prize
                }}, {root: true});
            }
            const prizeBase = state.prize[o.prize.prize];
            const prize = {...prizeBase, ...prizeBase.pool[o.pool], ...o.prize};
            let amount = (o.amount ?? 1) * prize.amount * prize.amountMult();
            if (prize.roundAmount) {
                amount = Math.round(amount);
            }
            switch (prize.type) {
                case 'currency':
                    dispatch('currency/gain', {feature: prize.item.split('_')[0], name: prize.item.split('_')[1], amount}, {root: true});
                    break;
                case 'consumable':
                    dispatch('consumable/gain', {name: prize.item, amount}, {root: true});
                    break;
                case 'relic':
                    dispatch('relic/find', prize.item, {root: true});
                    break;
                case 'theme':
                    commit('system/updateThemeKey', {name: prize.item, key: 'owned', value: true}, {root: true});
                    break;
                case 'cardPack':
                    dispatch('card/openPack', {name: prize.item, notify: true, amount}, {root: true});
                    break;
                case 'treasure':
                    dispatch('treasure/winItem', prize.data, {root: true});
                    break;
                default:
                    console.warn('Unknown prize type: ' + prize.type);
                    break;
            }
        },
        casinoWheelGenerate({ state, getters, rootGetters, commit }) {
            const rareSegments = [
                {rarity: 4, percent: 1},
                {rarity: 2, percent: 4},
                {rarity: 3, percent: 3},
                {rarity: 2, percent: 4},
            ];
            let rngGen = rootGetters['system/getRng']('wheel_generate');
            commit('system/nextRng', {name: 'wheel_generate', amount: 1}, {root: true});
            const commonSegments = shuffleArray([
                [{rarity: 0, percent: 12}, {rarity: 1, percent: 8}],
                [{rarity: 0, percent: 12}],
                [{rarity: 0, percent: 12}, {rarity: 1, percent: 12}, {rarity: 0, percent: 12}],
                [{rarity: 1, percent: 8}, {rarity: 0, percent: 12}]
            ], rngGen);
            let segments = [];
            for (let i = 0; i < 4; i++) {
                segments.push(rareSegments[i], ...commonSegments[i]);
            }
            segments = segments.map(segment => {
                const pool = 'wheelOfFortune' + segment.rarity;
                const prize = getters.getRandomPrize(pool)[0];
                commit('system/nextRng', {name: 'event_prizePool_' + pool, amount: 1}, {root: true});
                const prizeData = state.prize[prize.prize];
                if (prizeData.type === 'treasure') {
                    commit('system/nextRng', {name: 'treasure_' + prizeData.item, amount: 1}, {root: true});
                }
                return {width: segment.percent * 3.6, rarity: segment.rarity, prize};
            });
            commit('updateKey', {key: 'casino_wheel_segments', value: segments});
            let rngGenSpin = rootGetters['system/getRng']('wheel_spin');
            commit('updateKey', {key: 'casino_wheel_rotation', value: randomFloat(0, 360, rngGenSpin())});
            commit('system/nextRng', {name: 'wheel_spin', amount: 1}, {root: true});
        },
        casinoWheelSpin({ state, getters, rootGetters, commit, dispatch }) {
            if (rootGetters['currency/value']('gem_topaz') >= CASINO_WHEEL_COST) {
                dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount: CASINO_WHEEL_COST}, {root: true});
                let rngGen = rootGetters['system/getRng']('wheel_spin');
                commit('updateKey', {key: 'casino_wheel_rotation', value: state.casino_wheel_rotation + randomFloat(3 * 360, 6 * 360, rngGen())});
                commit('system/nextRng', {name: 'wheel_spin', amount: 1}, {root: true});
                const segment = getters.getWheelSegment;
                if (segment !== -1) {
                    const pool = 'wheelOfFortune' + state.casino_wheel_segments[segment].rarity;
                    dispatch('winPrize', {prize: state.casino_wheel_segments[segment].prize, pool, notify: true}).then(() => {
                        const prize = getters.getRandomPrize(pool)[0];
                        commit('system/nextRng', {name: 'event_prizePool_' + pool, amount: 1}, {root: true});
                        const prizeData = state.prize[prize.prize];
                        if (prizeData.type === 'treasure') {
                            commit('system/nextRng', {name: 'treasure_' + prizeData.item, amount: 1}, {root: true});
                        }
                        commit('updateIndex', {name: 'casino_wheel_segments', key: segment, subkey: 'prize', value: prize});
                    });
                }
            }
        },
        generateShops({ state, rootState, getters, rootGetters, commit }, pool) {
            let chosen = [];
            for (const [key, elem] of Object.entries(state.prize)) {
                const elemBase = {...elem, ...elem.pool[pool]};
                if (elem.requirement() && elem.pool[pool] && elemBase.weight === null && !(
                    (elemBase.type === 'relic' && rootState.relic.item[elemBase.item].found) ||
                    (elemBase.type === 'theme' && rootState.system.themes[elemBase.item].owned)
                )) {
                    for (let i = 0; i < elemBase.times; i++) {
                        const prize = getters.getNewPrize(key, 0, elemBase.bonusTier);
                        const prizeData = state.prize[prize.prize];
                        chosen.push(prize);
                        if (prizeData.type === 'treasure') {
                            commit('system/nextRng', {name: 'treasure_' + prizeData.item, amount: 1}, {root: true});
                        }
                        commit('system/nextRng', {name: 'event_prizePool', amount: 1}, {root: true});
                    }
                }
            }
            const randomPrizes = getters.getRandomPrize(pool, pool === 'merchant' ? rootGetters['mult/get']('merchantOffers') : 3);
            commit('system/nextRng', {name: 'event_prizePool_' + pool, amount: 1}, {root: true});
            randomPrizes.forEach(prize => {
                if (prize.type === 'treasure') {
                    commit('system/nextRng', {name: 'treasure_' + prize.item, amount: 1}, {root: true});
                }
            });
            commit('updateKey', {key: pool === 'merchant' ? 'shop_merchant' : 'shop_big', value: [...chosen, ...randomPrizes]});
        },
        giveTokens({ commit, dispatch }, o) {
            dispatch('currency/gain', {feature: 'event', name: o.event + 'Token', amount: o.amount}, {root: true});
            commit('stat/add', {feature: 'event', name: o.event + 'Highscore', value: o.amount}, {root: true});
        }
    }
}
