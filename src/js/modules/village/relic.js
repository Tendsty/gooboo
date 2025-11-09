import store from "../../../store";
import { VILLAGE_COINS_PER_FOOD } from "../../constants";
import { formatNum } from "../../utils/format";

export default {
    mudBrick: {icon: 'mdi-wall', color: 'brown', effect() {return [
        {name: 'village_hut', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageWaterGain', type: 'mult', value: 1.5}
    ];}, glyph() {return {wood: 4};}},
    sapling: {icon: 'mdi-sprout', color: 'light-green', effect() {return [
        {name: 'village_shed', type: 'keepUpgrade', value: true},
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: 1.5},
    ];}, glyph() {return {flow: 3, stone: 1};}},
    keychain: {icon: 'mdi-key-chain', color: 'light-grey', effect() {return [
        {name: 'village_smallHouse', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageWoodGain', type: 'mult', value: 1.5}
    ];}, glyph() {return {wood: 2, stone: 3};}, active: {
        cost: {relic_power: 6},
        feature: 'village',
        params() {
            const maxPart = Math.pow(store.state.stat.village_coinMax.total, 0.5);
            const happinessMult = store.getters['mult/get']('villageHappiness', 0.03 * store.state.village.job.entertainer.max, 1, 0, ['villageJob', 'villagePolicy']) / store.getters['mult/get']('villageHappiness');
            const taxPart = store.getters['mult/get']('villageWorker', 0, 1, 0, ['villagePolicy']) * store.getters['mult/get']('villageTaxRate', 0, 1, 0, ['villagePolicy']);
            let foodPart = 0;
            store.getters['currency/list']('village', 'regular', 'food').forEach(foodName => {
                const food = foodName.split('_')[1];
                let foodBase = 0;
                switch (food) {
                    case 'grain':
                        foodBase = 0.5 * store.state.village.job.farmer.max;
                        break;
                    case 'fruit':
                        foodBase = 0.5 * store.state.village.job.harvester.max;
                        break;
                    case 'fish':
                        foodBase = 30 * store.state.village.job.fisherman.max;
                        break;
                    case 'vegetable':
                        foodBase = 40 * store.state.village.job.gardener.max;
                        break;
                }
                foodPart += Math.min(taxPart, store.getters['mult/get'](store.getters['currency/gainMultName']('village', food), foodBase, 1, 0, ['villageJob', 'villagePolicy']));
            });
            const timePart = foodPart * happinessMult * VILLAGE_COINS_PER_FOOD * 600;
            return [maxPart, timePart, maxPart + timePart];
        },
        description(params) {
            return [formatNum(params[2])];
        },
        formula(params) {
            return [formatNum(params[0]), formatNum(params[1])];
        },
        disabled() {
            return store.state.system.features.village.currentSubfeature !== 0 || store.state.cryolab.village.active;
        },
        trigger(params) {
            store.dispatch('currency/gain', {feature: 'village', name: 'coin', amount: params[2]});
        }
    }},
    screwdriver: {icon: 'mdi-screwdriver', color: 'indigo', effect() {return [
        {name: 'village_crane', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageStoneGain', type: 'mult', value: 1.5}
    ];}, glyph() {return {wood: 1, flow: 1, stone: 3};}},
}
