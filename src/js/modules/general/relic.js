import store from "../../../store";
import { MINING_NITER_DEPTH } from "../../constants";
import { formatNum } from "../../utils/format";

export default {
    // grobodal
    torch: {icon: 'mdi-torch', feature: ['general', 'mining', 'village'], color: 'orange', effect() {return [
        {name: 'miningCardCap', type: 'base', value: 1},
        {name: 'villageCardCap', type: 'base', value: 1},
    ];}, glyph() {return {heat: 2, wood: 2};}, active: {
        cost: {relic_power: 40},
        params: () => [],
        description: () => [],
        formula: () => [],
        disabled(params, option) {
            return store.state.system.features.mining.currentSubfeature !== 0 || store.state.cryolab.mining.active || store.state.mining.torchDepths.includes(parseInt(option));
        },
        trigger(params, option) {
            store.commit('mining/addTorchDepth', parseInt(option));
        }
    }},
    purpleHeart: {icon: 'mdi-heart', feature: ['general', 'horde'], color: 'purple', effect() {return [
        {name: 'hordeHealth', type: 'mult', value: 1.5},
        {name: 'currencyHordeSoulCorruptedGain', type: 'mult', value: 1.2},
    ];}, glyph() {return {spike: 1, dream: 3};}},
    dustyBook: {icon: 'mdi-book', feature: ['general', 'school'], color: 'beige', effect() {return [
        {name: 'schoolLibrarySubfeature', type: 'unlock', value: true},
        {name: 'schoolMultipass', type: 'base', value: 2},
        {name: 'currencySchoolGoldenDustCap', type: 'base', value: 1e4},
    ];}, glyph() {return {dust: 2, book: 3};}},
    rottenLeaf: {icon: 'mdi-leaf', feature: ['general', 'farm'], color: 'brown', effect() {return [
        {name: 'farmCropGain', type: 'mult', value: 1.75},
        {name: 'farmExperience', type: 'mult', value: 1.2},
        {name: 'farmOvergrow', type: 'base', value: 0.2},
    ];}, glyph() {return {rain: 2, sun: 3, cloud: 1};}},
    stonepiercer: {icon: 'mdi-screwdriver', feature: ['general', 'mining'], color: 'cherry', effect() {return [
        {name: 'miningDamage', type: 'mult', value: 2.25},
    ];}, glyph() {return {dust: 4, clay: 1};}, active: {
        cost: {relic_power: 35},
        params() {
            let increases = 0;
            let niter = 0;
            store.state.mining.breaks.forEach((amount, index) => {
                const highest = Math.max(...store.state.mining.breaks.slice(index));
                if (highest > amount) {
                    increases++;

                    if (store.state.system.features.mining.currentSubfeature === 0 && (index + 1) >= MINING_NITER_DEPTH) {
                        let breaksMult = 0;
                        let currentBreaks = amount;
                        while (currentBreaks < highest) {
                            const breaksBase = currentBreaks > 0 ? Math.floor(Math.log10(currentBreaks)) : -1;
                            const nextStep = Math.pow(10, breaksBase + 1);
                            currentBreaks = Math.min(highest, nextStep);
                            if (currentBreaks === nextStep) {
                                breaksMult++;
                            }
                        }
                        niter += store.getters['mining/rareDropFinal']('niter') * breaksMult;
                    }
                }
            });
            return [increases, niter];
        },
        description: () => [],
        formula: params => [formatNum(params[1])],
        disabled(params) {
            return store.state.cryolab.mining.active || params[0] <= 0;
        },
        trigger(params) {
            let highest = 0;
            store.commit('mining/updateKey', {key: 'breaks', value: [...store.state.mining.breaks].reverse().map(el => {
                if (el > highest) {
                    highest = el;
                }
                return highest;
            }).reverse()});
            store.dispatch('currency/gain', {feature: 'mining', name: 'niter', amount: params[1]});
        }
    }},
    consolationPrize: {icon: 'mdi-seal-variant', feature: ['general', 'village', 'horde', 'farm'], color: 'lighter-grey', effect() {return [
        {name: 'villageResourceGain', type: 'mult', value: 1.4},
        {name: 'hordeEquipmentMasteryGain', type: 'mult', value: 1.4},
        {name: 'farmExperience', type: 'mult', value: 1.4},
    ];}, glyph() {return {stone: 2, clover: 2, cloud: 2};}},
    prettyLamp: {icon: 'mdi-vanity-light', feature: ['general', 'gallery'], color: 'light-blue', effect() {return [
        {name: 'galleryInspirationStart', type: 'base', value: 3},
        {name: 'thinkHarder', type: 'galleryIdea', value: true},
    ];}, glyph() {return {blossom: 2, paper: 4};}},
    museumKey: {icon: 'mdi-key', feature: ['general', 'relic'], color: 'deep-purple', effect() {return [
        {name: 'relicMuseum', type: 'unlock', value: true},
    ];}, glyph() {return {cloud: 2, paper: 2, coin: 3};}},
    ribbon: {icon: 'mdi-ribbon', feature: ['general', 'farm', 'gallery'], color: 'babypink', effect() {return [
        {name: 'farmCardCap', type: 'base', value: 1},
        {name: 'galleryCardCap', type: 'base', value: 1},
    ];}, glyph() {return {rain: 2, sun: 2, blossom: 4};}},
    copier: {icon: 'mdi-printer', feature: ['general', 'treasure'], color: 'blue-grey', effect() {return [
        {name: 'treasureDual', type: 'unlock', value: true},
        {name: 'treasureSlots', type: 'base', value: 2},
    ];}, glyph() {return {coin: 3, paper: 3};}},
    deckOfCards: {icon: 'mdi-cards-playing', feature: ['general', 'card'], color: 'teal', effect() {return [
        {name: 'cardShiny', type: 'unlock', value: true},
    ];}, glyph() {return {coin: 4, card: 3};}},

    // orladee
    chessboard: {icon: 'mdi-checkerboard', feature: ['general', 'horde'], color: 'grey', effect() {return [
        {name: 'hordeChessEquipment', type: 'unlock', value: true},
    ];}, glyph() {return {clover: 5};}},
    iridiscentFlower: {icon: 'mdi-flower-pollen', feature: ['general', 'cryolab'], color: 'pink', effect() {return [
        {name: 'cryolabMaxFeatures', type: 'base', value: 1},
        {name: 'relicPedestal2', type: 'base', value: 1},
    ];}, glyph() {return {book: 5, blossom: 2};}},
    scienceBook: {icon: 'mdi-book-education', feature: ['general', 'treasure'], color: 'pale-blue', effect() {return [
        {name: 'treasurePrestigious', type: 'unlock', value: true},
        {name: 'schoolMultipass', type: 'base', value: 4},
    ];}, glyph() {return {book: 3, coin: 5};}},
    hugeDiamond: {icon: 'mdi-diamond-outline', feature: ['general', 'gem'], color: 'cyan', effect() {return [
        {name: 'gemDiamond', type: 'unlock', value: true},
    ];}, glyph() {return {dust: 5, stone: 4};}},
}
