import store from "../../../store";
import { formatInt, formatNum } from "../../utils/format";

export default {
    lightningRod: {icon: 'mdi-home-lightning-bolt-outline', color: 'deep-orange', effect() {return [
        {name: 'currencyFarmRainwaterCap', type: 'base', value: 30}
    ];}, glyph() {return {cloud: 3};}, active: {
        cost: {relic_power: 5},
        params() {
            const rainwaterMult = 1.5;
            let careApplied = 0;

            store.state.farm.field.forEach(row => {
                row.forEach(cell => {
                    if (cell !== null && cell.type === 'crop' && cell.cache.careWeight > 0) {
                        const geneStats = store.getters['farm/cropGeneStats'](cell.crop, cell.fertilizer);
                        store.state.farm.careCanMax.forEach(elem => {
                            if (geneStats.care[elem] && cell.care[elem] < geneStats.care[elem].max) {
                                const crop = store.state.farm.crop[cell.crop];
                                const growDiv = Math.sqrt((cell.giant ? crop.giantGrow : crop.grow) / 10) * 8;
                                careApplied += Math.ceil((geneStats.care[elem].max - cell.care[elem]) * growDiv / geneStats.care[elem].amount);
                            }
                        });
                    }
                });
            });

            return [Math.ceil(careApplied * rainwaterMult), rainwaterMult, careApplied];
        },
        description() {
            return [];
        },
        formula(params) {
            return [formatInt(params[0]), formatNum(params[1] * 100)];
        },
        disabled(params) {
            return store.state.cryolab.farm.active || params[2] <= 0 || store.state.currency.farm_rainwater.value < params[0];
        },
        trigger(params) {
            store.dispatch('currency/spend', {feature: 'farm', name: 'rainwater', amount: params[0]});

            store.state.farm.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && cell.cache.careWeight > 0) {
                        const geneStats = store.getters['farm/cropGeneStats'](cell.crop, cell.fertilizer);
                        store.state.farm.careCanMax.forEach(elem => {
                            if (geneStats.care[elem] && cell.care[elem] < geneStats.care[elem].max) {
                                store.commit('farm/updateFieldCare', {x, y, key: elem, value: geneStats.care[elem].max});
                            }
                        });
                    }
                });
            });

            store.commit('stat/add', {feature: 'farm', name: 'care', value: params[2]});
        }
    }},
    goldenCarrot: {icon: 'mdi-carrot', color: 'amber', effect() {return [
        {name: 'currencyFarmVegetableGain', type: 'mult', value: 1.4}
    ];}, glyph() {return {rain: 4};}},
    goldenApple: {icon: 'mdi-food-apple', color: 'amber', effect() {return [
        {name: 'currencyFarmBerryGain', type: 'mult', value: 1.4}
    ];}, glyph() {return {sun: 3, cloud: 1};}},
    popcorn: {icon: 'mdi-popcorn', color: 'pale-yellow', effect() {return [
        {name: 'currencyFarmGrainGain', type: 'mult', value: 1.4}
    ];}, glyph() {return {cloud: 4};}},
    roseQuartz: {icon: 'mdi-crystal-ball', color: 'pale-pink', effect() {return [
        {name: 'currencyFarmFlowerGain', type: 'mult', value: 1.4}
    ];}, glyph() {return {rain: 2, cloud: 3};}},
    goldenSeed: {icon: 'mdi-seed', color: 'amber', effect() {return [
        {name: 'goldenRose', type: 'farmSeed', value: true}
    ];}, glyph() {return {sun: 6};}},
}
