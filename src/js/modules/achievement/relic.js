import store from "../../../store";
import { GALLERY_SHAPES_AUTOCOLLECT_MAX } from "../../constants";
import { formatInt } from "../../utils/format";

export default {
    excavator: {icon: 'mdi-excavator', feature: ['achievement', 'mining'], color: 'orange', effect() {return [
        {name: 'currencyMiningScrapGain', type: 'mult', value: 2},
        {name: 'currencyMiningScrapCap', type: 'mult', value: 2}
    ];}, glyph() {return {dust: 3};}},
    redCard: {icon: 'mdi-cards', feature: ['achievement', 'horde'], color: 'red', effect(lvl) {
        if (lvl === 2) {
            return [
                {name: 'currencyHordeMonsterPartCap', type: 'bonus', value: 1e12},
                {name: 'hordeCardCap', type: 'base', value: 1}
            ];
        }
        return [
            {name: 'currencyHordeMonsterPartCap', type: 'bonus', value: 1e4},
            {name: 'hordeCardCap', type: 'base', value: 1}
        ];
    }, glyph(lvl) {
        if (lvl === 2) {
            return {spike: 2, dream: 3, clover: 3};
        }
        return {spike: 1, dream: 2, clover: 2};
    }},
    briefcase: {icon: 'mdi-briefcase', feature: ['achievement', 'treasure'], color: 'pale-blue', effect(lvl) {
        if (lvl === 2) {
            return [{name: 'treasureSlots', type: 'base', value: 12}];
        }
        return [{name: 'treasureSlots', type: 'base', value: 8}];
    }, glyph(lvl) {
        if (lvl === 2) {
            return {coin: 5};
        }
        return {coin: 3};
    }},
    strangePlant: {icon: 'mdi-sprout', feature: ['achievement', 'village', 'farm'], color: 'pale-purple', effect() {return [
        {name: 'villageMaterialGain', type: 'mult', value: 2},
        {name: 'farmCropGain', type: 'mult', value: 2}
    ];}, glyph() {return {flow: 2, rain: 2, sun: 2};}},
    beneficialVirus: {icon: 'mdi-virus', feature: ['achievement', 'mining', 'horde'], color: 'pale-green', effect() {return [
        {name: 'miningToughness', type: 'mult', value: 0.5},
        {name: 'hordeCorruption', type: 'bonus', value: -0.5}
    ];}, glyph() {return {heat: 3, spike: 3};}},
    shapeCollection: {icon: 'mdi-shape-plus', feature: ['achievement', 'gallery'], color: 'babypink', effect() {return [
        {name: 'galleryShapeGain', type: 'mult', value: 4},
        {name: 'gallerySpecialShapeChance', type: 'base', value: 0.005}
    ];}, glyph() {return {leaf: 5, paper: 1};}, active: {
        cost: {relic_power: 1},
        feature: 'gallery',
        params() {
            return [Math.floor(Math.min(store.state.currency.gallery_motivation.value, GALLERY_SHAPES_AUTOCOLLECT_MAX) / 10)];
        },
        description(params) {
            return [formatInt(params[0])];
        },
        formula(params) {
            return [formatInt(params[0] * 10), formatInt(GALLERY_SHAPES_AUTOCOLLECT_MAX), formatInt(params[0])];
        },
        disabled(params) {
            return store.state.cryolab.gallery.active || params[0] <= 0;
        },
        trigger(params) {
            for (const [key, elem] of Object.entries(store.state.gallery.shape)) {
                if (elem.unlocked && !elem.isSpecial) {
                    store.dispatch('currency/gain', {feature: 'gallery', name: key, gainMult: true, amount: params[0]}, {root: true});
                }
            }
            store.commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: params[0]}, {root: true});
            store.dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: params[0] * 10}, {root: true});
        }
    }},
    stonePillar: {icon: 'mdi-pillar', feature: ['achievement', 'relic'], color: 'grey', effect() {return [
        {name: 'relicPedestal0', type: 'base', value: 1}
    ];}, glyph() {return {stone: 4, clay: 4};}},
    fieryRuby: {icon: 'mdi-rhombus', feature: ['achievement', 'gem'], color: 'orange-red', effect() {return [
        {name: 'currencyGemRubyGain', type: 'base', value: 1}
    ];}, glyph() {return {heat: 6};}},
}
