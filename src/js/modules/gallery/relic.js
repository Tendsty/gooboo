import store from "../../../store";
import { GALLERY_SHAPES_GRID_HEIGHT, GALLERY_SHAPES_GRID_WIDTH } from "../../constants";
import { randomElem, randomInt } from "../../utils/random";

export default {
    lightbulb: {icon: 'mdi-lightbulb', color: 'pale-yellow', effect() {return [
        {name: 'gallery_epiphany', type: 'keepUpgrade', value: true},
        {name: 'galleryInspirationStart', type: 'base', value: 1}
    ];}, glyph() {return {paper: 4};}},
    fishbowl: {icon: 'mdi-fishbowl', color: 'pale-blue', effect() {return [
        {name: 'galleryShapeGain', type: 'mult', value: 1.5},
        {name: 'beExcited', type: 'galleryIdea', value: true}
    ];}, glyph() {return {blossom: 1, leaf: 3};}},
    pencil: {icon: 'mdi-lead-pencil', color: 'pale-red', effect() {return [
        {name: 'galleryShapeGain', type: 'mult', value: 1.5},
        {name: 'buyPen', type: 'galleryIdea', value: true}
    ];}, glyph() {return {leaf: 1, paper: 3};}},
    smallBrush: {icon: 'mdi-brush', color: 'pale-pink', effect() {return [
        {name: 'galleryShapeGain', type: 'mult', value: 1.5},
        {name: 'buyBrush', type: 'galleryIdea', value: true}
    ];}, glyph() {return {leaf: 4};}, active: {
        cost: {relic_power: 2},
        feature: 'gallery',
        params() {
            return [];
        },
        description() {
            return [];
        },
        disabled() {
            return store.state.cryolab.gallery.active || store.getters['gallery/shapeSpecialWeights'].length <= 0 || store.state.gallery.shapeGrid.reduce((a, b) => a + b.reduce((c, d) => c + (store.state.gallery.shape[d].isSpecial ? 1 : 0), 0), 0) > 0;
        },
        trigger() {
            let rngGen = store.getters['system/getRng']('gallery_randomShape');
            store.commit('gallery/updateShapeCell', {x: randomInt(0, GALLERY_SHAPES_GRID_WIDTH - 1, rngGen()), y: randomInt(0, GALLERY_SHAPES_GRID_HEIGHT - 1, rngGen()), value: randomElem(store.getters['gallery/shapeSpecialWeights'], rngGen())});
            store.commit('system/nextRng', {name: 'gallery_randomShape', amount: 1}, {root: true});
        }
    }},
    strangePills: {icon: 'mdi-pill-multiple', color: 'pale-red', effect() {return [
        {name: 'galleryShapeGain', type: 'mult', value: 1.5},
        {name: 'hyperfocus', type: 'galleryIdea', value: true}
    ];}, glyph() {return {blossom: 3, paper: 2};}},
    printingPress: {icon: 'mdi-arrow-collapse-vertical', color: 'brown', effect() {return [
        {name: 'currencyGalleryCashGain', type: 'mult', value: 1.5},
        {name: 'printNewspaper', type: 'galleryIdea', value: true}
    ];}, glyph() {return {blossom: 5};}},
}
