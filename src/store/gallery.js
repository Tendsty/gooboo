import Vue from "vue"
import { buildNum, capitalize } from "../js/utils/format";
import { logBase } from "../js/utils/math";
import { chance, randomElem, randomRound } from "../js/utils/random";
import { GALLERY_CONVERTER_EXPONENT, GALLERY_MOTIVATION_BUY_AMOUNT, GALLERY_MOTIVATION_BUY_COST, GALLERY_REROLL_COST, GALLERY_SHAPES_GRID_HEIGHT, GALLERY_SHAPES_GRID_WIDTH } from "../js/constants";
import { buildArray } from "../js/utils/array";

export default {
    namespaced: true,
    state: {
        color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'deep-orange', 'amber', 'light-green', 'teal', 'light-blue', 'pink', 'brown', 'lime', 'pink-purple', 'grey'],
        colorData: {},
        inspirationTime: 0,
        inspirationAmount: 0,
        idea: {},
        shape: {},
        shapeGrid: null,
        hourglassCombo: 0,
        canvasSpace: []
    },
    getters: {
        availableColors: (state, getters, rootState) => {
            let arr = state.color.filter(color => rootState.stat[`gallery_${color}`].total > 0);

            if (rootState.unlock.galleryConversion.see && arr.length < state.color.length) {
                arr.push(state.color[arr.length]);
            }

            return arr;
        },
        conversionColorPrice: (state) => (toColor) => {
            const index = state.color.findIndex(c => c === toColor);
            const fromColor = index < 1 ? 'beauty' : state.color[index - 1];
            return {
                name: `gallery_${fromColor}`,
                amount: Math.pow(10, index) * 1000,
            };
        },
        conversionPrice: (state) => (toColor) => {
            const index = state.color.findIndex(c => c === toColor);
            const fromColor = index < 1 ? 'beauty' : state.color[index - 1];
            return {
                [`gallery_${fromColor}`]: Math.pow(10, index) * 1000,
                gallery_converter: Math.pow(16, index) * 10
            };
        },
        converterOverload: (state, getters, rootState) => (toColor) => {
            const colorPrice = getters.conversionColorPrice(toColor);
            const price = getters.conversionPrice(toColor);

            const converterPercent = rootState.currency.gallery_converter.value / price.gallery_converter;
            const colorPercent = rootState.currency[colorPrice.name].value / colorPrice.amount;
            return Math.max(Math.pow(converterPercent / colorPercent, 0.25), 1);
        },
        conversionGain: (state, getters, rootState, rootGetters) => (toColor) => {
            const colorPrice = getters.conversionColorPrice(toColor);
            const price = getters.conversionPrice(toColor);

            return Math.min(
                rootState.currency.gallery_converter.value / price.gallery_converter,
                rootState.currency[colorPrice.name].value / colorPrice.amount
            ) * getters.converterOverload(toColor) * rootGetters['mult/get'](`gallery${ capitalize(toColor) }Conversion`);
        },
        prestigeGainBase: (state, getters, rootState) => {
            if (rootState.stat.gallery_beauty.value < buildNum(1, 'T')) {
                return 0;
            }
            return Math.pow(10, Math.pow(logBase(rootState.stat.gallery_beauty.value / buildNum(100, 'B'), 8), 0.7));
        },
        prestigeGain: (state, getters, rootState, rootGetters) => {
            if (rootState.stat.gallery_beauty.value < buildNum(1, 'T')) {
                return 0;
            }
            return Math.floor(rootGetters['mult/get']('currencyGalleryCashGain', getters.prestigeGainBase));
        },
        inspirationTimeNeeded: (state, getters, rootState, rootGetters) => (amount) => {
            return Math.ceil(Math.pow(rootGetters['mult/get']('galleryInspirationIncrement') + 1, amount) * rootGetters['mult/get']('galleryInspirationBase'));
        },
        inspirationTimeNeededCurrent: (state, getters) => {
            return getters.inspirationTimeNeeded(state.inspirationAmount);
        },
        canAccessIdea: (state) => (tier) => {
            if (tier === 1) {
                return true;
            }

            let previousTierCount = 0;
            let currentTierCount = 1;
            for (const [, elem] of Object.entries(state.idea)) {
                if (elem.tier === (tier - 1)) {
                    previousTierCount += elem.level;
                } else if (elem.tier === tier) {
                    currentTierCount += elem.level;
                }
            }

            return previousTierCount >= (currentTierCount * 2);
        },
        shapeWeights: (state) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state.shape)) {
                if (!elem.isSpecial) {
                    arr.push(key);
                    if (elem.unlocked) {
                        arr.push(key);
                    }
                }
            }
            return arr;
        },
        shapeSpecialWeights: (state) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state.shape)) {
                if (elem.isSpecial && elem.unlocked) {
                    arr.push(key);
                }
            }
            return arr;
        },
        shapeHasHourglass: (state) => {
            return state.shapeGrid.findIndex(row => row.findIndex(cell => cell === 'hourglass') !== -1) !== -1;
        },
        hourglassTime: (state) => {
            return Math.round(state.hourglassCombo * 3.7 + 30);
        },
        canvasDifficulty: (state) => (name, level) => {
            const index = state.color.findIndex(c => c === name);
            return Math.pow(3.25, index) * Math.pow(1.75, level) * buildNum(1, 'M');
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateColorDataKey(state, o) {
            Vue.set(state.colorData[o.name], o.key, o.value);
        },
        updateIdeaKey(state, o) {
            Vue.set(state.idea[o.name], o.key, o.value);
        },
        updateShapeKey(state, o) {
            Vue.set(state.shape[o.name], o.key, o.value);
        },
        updateShapeCell(state, o) {
            Vue.set(state.shapeGrid[o.y], o.x, o.value);
        },
        initColorData(state, o) {
            Vue.set(state.colorData, o.name, {
                progress: 0,
                cacheSpace: 0
            });
        },
        initIdea(state, o) {
            Vue.set(state.idea, o.name, {
                owned: o.owned ?? false,
                ownedDefault: o.owned ?? false,
                icon: o.icon ?? 'mdi-lightbulb',
                color: o.color ?? 'primary',
                tier: o.tier,
                level: 0,
                effect: o.effect ?? []
            });
        },
        initShape(state, o) {
            Vue.set(state.shape, o.name, {
                unlocked: o.unlocked ?? false,
                unlockedDefault: o.unlocked ?? false,
                isSpecial: o.isSpecial ?? false,
                icon: o.icon ?? 'mdi-shape',
                color: o.color ?? 'primary'
            });
        },
        initShapeGrid(state) {
            Vue.set(state, 'shapeGrid', []);
            let arr = ['circle'];
            for (const [key, elem] of Object.entries(state.shape)) {
                if (!elem.isSpecial) {
                    arr.push(key);
                }
            }
            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                state.shapeGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(() => randomElem(arr)));
            }
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'inspirationTime', value: 0});
            commit('updateKey', {key: 'inspirationAmount', value: 0});
            for (const [key, elem] of Object.entries(state.idea)) {
                commit('updateIdeaKey', {name: key, key: 'level', value: 0});
                commit('updateIdeaKey', {name: key, key: 'owned', value: elem.ownedDefault});
            }
            for (const [key, elem] of Object.entries(state.shape)) {
                commit('updateShapeKey', {name: key, key: 'unlocked', value: elem.unlockedDefault});
            }
            for (const [key] of Object.entries(state.colorData)) {
                commit('updateColorDataKey', {name: key, key: 'progress', value: 0});
                commit('updateColorDataKey', {name: key, key: 'cacheSpace', value: 0});
            }
            commit('updateKey', {key: 'shapeGrid', value: null});
            commit('updateKey', {key: 'hourglassCombo', value: 0});
            commit('updateKey', {key: 'canvasSpace', value: []});
        },
        prestige({ state, getters, rootGetters, commit, dispatch }) {
            commit('stat/increaseTo', {feature: 'gallery', name: 'bestPrestige', value: getters.prestigeGain}, {root: true});
            commit('stat/add', {feature: 'gallery', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'gallery', name: 'cash', amount: getters.prestigeGain}, {root: true});

            commit('updateKey', {key: 'inspirationTime', value: 0});
            commit('updateKey', {key: 'inspirationAmount', value: 0});
            for (const [key, elem] of Object.entries(state.idea)) {
                if (elem.level > 0) {
                    commit('updateIdeaKey', {name: key, key: 'level', value: 0});
                    dispatch('applyIdeaReset', key);
                }
            }
            commit('updateKey', {key: 'canvasSpace', value: []});
            for (const [key] of Object.entries(state.colorData)) {
                commit('updateColorDataKey', {name: key, key: 'cacheSpace', value: 0});
            }

            dispatch('upgrade/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('card/activateCards', 'gallery', {root: true});

            const inspirationStart = rootGetters['mult/get']('galleryInspirationStart');
            if (inspirationStart > 0) {
                dispatch('currency/gain', {feature: 'gallery', name: 'inspiration', amount: inspirationStart}, {root: true});
            }
        },
        convertColor({ getters, rootGetters, dispatch }, o) {
            const price = getters.conversionPrice(o.toColor);
            if (rootGetters['currency/canAfford'](price)) {
                dispatch('currency/gain', {
                    feature: 'gallery',
                    name: o.toColor,
                    amount: getters.conversionGain(o.toColor)
                }, {root: true});
                for (const [key, elem] of Object.entries(price)) {
                    if (key === 'gallery_converter') {
                        dispatch('currency/spendAll', {feature: key.split('_')[0], name: key.split('_')[1]}, {root: true});
                    } else {
                        dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem}, {root: true});
                    }
                }
            }
        },
        applyIdea({ state, dispatch }, o) {
            let trigger = o.onBuy ?? false;
            state.idea[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `galleryIdea_${o.name}`, value: eff.value(state.idea[o.name].level), trigger}, {root: true});
            });
        },
        applyIdeaReset({ state, dispatch }, name) {
            state.idea[name].effect.forEach(eff => {
                dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `galleryIdea_${name}`}, {root: true});
            });
        },
        buyIdea({ state, getters, rootGetters, commit, dispatch }, name) {
            if (rootGetters['currency/value']('gallery_inspiration') >= 1 && getters.canAccessIdea(state.idea[name].tier)) {
                dispatch('currency/spend', {feature: 'gallery', name: 'inspiration', amount: 1}, {root: true});
                commit('updateIdeaKey', {name, key: 'level', value: state.idea[name].level + 1});
                commit('stat/increaseTo', {feature: 'gallery', name: 'highestTierIdea', value: state.idea[name].tier}, {root: true});
                dispatch('applyIdea', {name, onBuy: true});
            }
        },
        openPackages({ state, rootState, rootGetters, commit, dispatch }) {
            const amount = Math.floor(rootState.currency.gallery_package.value);
            if (amount > 0) {
                let rngGen = rootGetters['system/getRng']('gallery_package');
                let num = amount;
                [...state.color].map(color => {
                    num = randomRound(rootGetters['mult/get'](`gallery${ capitalize(color) }DrumChance`) * num, rngGen());
                    return {color, amount: num};
                }).reverse().forEach(obj => {
                    if (obj.amount > 0) {
                        dispatch('currency/gain', {feature: 'gallery', name: obj.color + 'Drum', amount: obj.amount}, {root: true});
                    }
                });
                commit('system/nextRng', {name: 'gallery_package', amount: 1}, {root: true});
                dispatch('currency/spend', {feature: 'gallery', name: 'package', amount}, {root: true});
            }
        },
        switchShape({ state, rootGetters, commit, dispatch }, o) {
            const fromTile = state.shapeGrid[o.fromY][o.fromX];
            const toTile = state.shapeGrid[o.toY][o.toX];
            if (rootGetters['currency/canAfford']({gallery_motivation: 1})) {
                commit('updateShapeCell', {x: o.fromX, y: o.fromY, value: toTile});
                commit('updateShapeCell', {x: o.toX, y: o.toY, value: fromTile});
                dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: 1}, {root: true});
            }
        },
        clickShape({ state, rootState, getters, rootGetters, commit, dispatch }, o) {
            if (rootGetters['currency/canAfford']({gallery_motivation: 1})) {
                const shapeName = state.shapeGrid[o.y][o.x];
                if (state.shape[shapeName].isSpecial) {
                    const specialMult = rootGetters['mult/get']('gallerySpecialShapeMult');
                    switch (shapeName) {
                        case 'bomb': {
                            let connectedGrid = [];
                            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => x === o.x || y === o.y));
                            }
                            connectedGrid.forEach((row, y) => {
                                row.forEach((cell, x) => {
                                    const cellName = state.shapeGrid[y][x];
                                    if (cell && state.shape[cellName].unlocked && !state.shape[cellName].isSpecial) {
                                        dispatch('currency/gain', {feature: 'gallery', name: cellName, gainMult: true, amount: specialMult}, {root: true});
                                        commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: 1}, {root: true});
                                    }
                                });
                            });
                            dispatch('rerollShapes', connectedGrid);
                            break;
                        }
                        case 'dice': {
                            const selectedCell = state.shapeGrid[o.y <= 0 ? (o.y + 1) : (o.y - 1)][o.x];
                            const connectedGrid = state.shapeGrid.map(row => row.map(cell => cell !== selectedCell));
                            dispatch('rerollShapes', connectedGrid);
                            break;
                        }
                        case 'accelerator': {
                            let connectedGrid = [];
                            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => Math.abs(x - o.x) <= 1 && Math.abs(y - o.y) <= 1));
                            }
                            const targetShape = (o.x > 0 && o.y > 0) ? state.shapeGrid[o.y - 1][o.x - 1] : null;
                            let sameAmount = 0;
                            connectedGrid.forEach((row, y) => {
                                row.forEach((cell, x) => {
                                    const cellName = state.shapeGrid[y][x];
                                    if (cell && state.shape[cellName].unlocked && !state.shape[cellName].isSpecial) {
                                        if (cellName === targetShape) {
                                            sameAmount++;
                                        }
                                        dispatch('currency/gain', {feature: 'gallery', name: cellName, gainMult: true, amount: specialMult}, {root: true});
                                        commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: 1}, {root: true});
                                    }
                                });
                            });
                            if (sameAmount >= 8) {
                                const motivation = Math.floor(rootState.currency.gallery_motivation.value);
                                dispatch('currency/gain', {feature: 'gallery', name: targetShape, gainMult: true, amount: (motivation / 5 + 1) * specialMult}, {root: true});
                                dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: motivation}, {root: true});
                            }
                            dispatch('rerollShapes', connectedGrid);
                            break;
                        }
                        case 'sparkles': {
                            let coords = [];
                            if (o.x > 0) {
                                coords.push({x: o.x - 1, y: o.y});
                            }
                            if (o.y > 0) {
                                coords.push({x: o.x, y: o.y - 1});
                            }
                            if (o.x < (GALLERY_SHAPES_GRID_WIDTH - 1)) {
                                coords.push({x: o.x + 1, y: o.y});
                            }
                            if (o.y < (GALLERY_SHAPES_GRID_HEIGHT - 1)) {
                                coords.push({x: o.x, y: o.y + 1});
                            }
                            let combinedGrid = [];
                            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                combinedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => x === o.x && y === o.y));
                            }
                            coords.forEach(coord => {
                                let connectedGrid = [];
                                for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                    connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => x === coord.x && y === coord.y));
                                }
                                let changed = true;
                                while (changed) {
                                    changed = false;
                                    connectedGrid.forEach((row, y) => {
                                        row.forEach((cell, x) => {
                                            if (!cell) {
                                                if (
                                                    (x > 0 && connectedGrid[y][x - 1] && state.shapeGrid[y][x] === state.shapeGrid[y][x - 1]) ||
                                                    (y > 0 && connectedGrid[y - 1][x] && state.shapeGrid[y][x] === state.shapeGrid[y - 1][x]) ||
                                                    (x < (GALLERY_SHAPES_GRID_WIDTH - 1) && connectedGrid[y][x + 1] && state.shapeGrid[y][x] === state.shapeGrid[y][x + 1]) ||
                                                    (y < (GALLERY_SHAPES_GRID_HEIGHT - 1) && connectedGrid[y + 1][x] && state.shapeGrid[y][x] === state.shapeGrid[y + 1][x])
                                                ) {
                                                    connectedGrid[y][x] = true;
                                                    changed = true;
                                                }
                                            }
                                        });
                                    });
                                }
                                const amount = connectedGrid.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0);
                                if (amount >= 5) {
                                    connectedGrid.forEach((row, y) => {
                                        row.forEach((cell, x) => {
                                            if (cell) {
                                                combinedGrid[y][x] = true;
                                            }
                                        });
                                    });
                                }
                            });
                            const totalAmount = combinedGrid.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0) - 1;
                            combinedGrid.forEach((row, y) => {
                                row.forEach((cell, x) => {
                                    if (cell) {
                                        const thisShapeName = state.shapeGrid[y][x];
                                        if (state.shape[thisShapeName].unlocked && !state.shape[thisShapeName].isSpecial) {
                                            dispatch('currency/gain', {feature: 'gallery', name: thisShapeName, gainMult: true, amount: totalAmount}, {root: true});
                                        }
                                    }
                                });
                            });
                            commit('stat/increaseTo', {feature: 'gallery', name: 'shapeComboHighest', value: totalAmount}, {root: true});
                            commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: totalAmount}, {root: true});
                            dispatch('rerollShapes', combinedGrid);
                            break;
                        }
                        case 'hourglass': {
                            commit('stat/increaseTo', {feature: 'gallery', name: 'hourglassHighest', value: getters.hourglassTime}, {root: true});
                            dispatch('packageAndConverterTick', getters.hourglassTime);
                            commit('updateKey', {key: 'hourglassCombo', value: 0});
                            let connectedGrid = [];
                            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => o.x === x && o.y === y));
                            }
                            dispatch('rerollShapes', connectedGrid);
                            break;
                        }
                        case 'chest': {
                            let connectedGrid = [];
                            for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                                connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => (Math.abs(x - o.x) <= 1 && Math.abs(y - o.y) <= 1) || (Math.abs(x - o.x) === 2 && Math.abs(y - o.y) === 0)));
                            }
                            let shapeList = [];
                            connectedGrid.forEach((row, y) => {
                                row.forEach((cell, x) => {
                                    const cellName = state.shapeGrid[y][x];
                                    if (cell && !state.shape[cellName].isSpecial) {
                                        if (!shapeList.includes(cellName)) {
                                            shapeList.push(cellName);
                                        }
                                    }
                                });
                            });
                            const chestFull = shapeList.length >= 10;
                            connectedGrid.forEach((row, y) => {
                                row.forEach((cell, x) => {
                                    const cellName = state.shapeGrid[y][x];
                                    if (cell && !state.shape[cellName].isSpecial) {
                                        if (state.shape[cellName].unlocked) {
                                            dispatch('currency/gain', {feature: 'gallery', name: cellName, gainMult: true, amount: chestFull ? Math.pow(specialMult, 1.5) : specialMult}, {root: true});
                                            commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: 1}, {root: true});
                                        }
                                    }
                                });
                            });
                            if (chestFull) {
                                dispatch('currency/gain', {feature: 'gallery', name: 'mysteryShape', amount: rootGetters['mult/get']('currencyGalleryMysteryShapeGain')}, {root: true});
                            }
                            dispatch('rerollShapes', connectedGrid);
                            break;
                        }
                        default:
                            console.warn(`Unknown shape: ${ shapeName }`);
                            break;
                    }
                    if (rootGetters['currency/canAfford']({gallery_motivation: 1})) {
                        dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: 1}, {root: true});
                    }
                } else {
                    let connectedGrid = [];
                    for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                        connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(x => x === o.x && y === o.y));
                    }
                    let changed = true;
                    while (changed) {
                        changed = false;
                        connectedGrid.forEach((row, y) => {
                            row.forEach((cell, x) => {
                                if (!cell) {
                                    if (
                                        (x > 0 && connectedGrid[y][x - 1] && state.shapeGrid[y][x] === state.shapeGrid[y][x - 1]) ||
                                        (y > 0 && connectedGrid[y - 1][x] && state.shapeGrid[y][x] === state.shapeGrid[y - 1][x]) ||
                                        (x < (GALLERY_SHAPES_GRID_WIDTH - 1) && connectedGrid[y][x + 1] && state.shapeGrid[y][x] === state.shapeGrid[y][x + 1]) ||
                                        (y < (GALLERY_SHAPES_GRID_HEIGHT - 1) && connectedGrid[y + 1][x] && state.shapeGrid[y][x] === state.shapeGrid[y + 1][x])
                                    ) {
                                        connectedGrid[y][x] = true;
                                        changed = true;
                                    }
                                }
                            });
                        });
                    }
                    const amount = connectedGrid.reduce((a, b) => a + b.reduce((c, d) => c + (d ? 1 : 0), 0), 0);
                    if (amount >= 5) {
                        if (state.shape[shapeName].unlocked && !state.shape[shapeName].isSpecial) {
                            dispatch('currency/gain', {feature: 'gallery', name: shapeName, gainMult: true, amount: Math.pow(amount, 2)}, {root: true});
                            commit('stat/increaseTo', {feature: 'gallery', name: 'shapeComboHighest', value: amount}, {root: true});
                            commit('stat/add', {feature: 'gallery', name: 'shapeComboTotal', value: amount}, {root: true});
                        }
                        dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: 1}, {root: true});
                        if (getters.shapeHasHourglass) {
                            commit('updateKey', {key: 'hourglassCombo', value: state.hourglassCombo + amount});
                        }
                        dispatch('rerollShapes', connectedGrid);
                    }
                }
            }
        },
        buyShapeReroll({ rootGetters, dispatch }) {
            if (rootGetters['currency/canAfford']({gallery_motivation: GALLERY_REROLL_COST})) {
                let connectedGrid = [];
                for (let y = 0; y < GALLERY_SHAPES_GRID_HEIGHT; y++) {
                    connectedGrid.push(buildArray(GALLERY_SHAPES_GRID_WIDTH).map(() => true));
                }
                dispatch('rerollShapes', connectedGrid);
                dispatch('currency/spend', {feature: 'gallery', name: 'motivation', amount: GALLERY_REROLL_COST}, {root: true});
            }
        },
        rerollShapes({ state, getters, rootGetters, commit }, grid) {
            const weights = getters.shapeWeights;
            const specialWeights = getters.shapeSpecialWeights;
            let hasSpecial = specialWeights.length > 0 && state.shapeGrid.reduce((a, b) => a + b.reduce((c, d) => c + (state.shape[d].isSpecial ? 1 : 0), 0), 0) <= 0;
            const specialChance = rootGetters['mult/get']('gallerySpecialShapeChance');
            grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        if (hasSpecial && chance(specialChance)) {
                            commit('updateShapeCell', {x, y, value: randomElem(specialWeights)});
                            hasSpecial = false;
                        } else {
                            commit('updateShapeCell', {x, y, value: randomElem(weights)});
                        }
                    }
                });
            });
        },
        packageAndConverterTick({ rootState, rootGetters, dispatch }, seconds) {
            if (rootState.unlock.galleryConversion.use) {
                let secondsLeft = seconds;
                const baseGain = rootGetters['mult/get']('currencyGalleryConverterGain');
                const amount = rootGetters['currency/value']('gallery_converter');
                const cap = rootState.currency.gallery_converter.cap;
                let gain = amount;
                while (secondsLeft > 0) {
                    const nextGain = gain * Math.pow(1 + GALLERY_CONVERTER_EXPONENT, 100) + baseGain * 100 + (baseGain * 50) * 0.268999110;
                    if (secondsLeft < 100 || nextGain >= cap) {
                        break;
                    }
                    gain = nextGain;
                    secondsLeft -= 100;
                }
                while (secondsLeft > 0) {
                    if (gain > cap) {
                        gain += secondsLeft * (baseGain + cap * GALLERY_CONVERTER_EXPONENT);
                        secondsLeft = 0;
                    } else {
                        gain += baseGain + Math.min(gain, cap) * GALLERY_CONVERTER_EXPONENT;
                        secondsLeft--;
                    }
                }
                if (gain > amount) {
                    dispatch('currency/gain', {feature: 'gallery', name: 'converter', amount: gain - amount}, {root: true});
                }
            }
            if (rootState.unlock.galleryDrums.use) {
                dispatch('currency/gain', {feature: 'gallery', name: 'package', amount: seconds * rootGetters['mult/get']('currencyGalleryPackageGain')}, {root: true});
            }
        },
        addCanvasSpace({ state, rootGetters, commit }, name) {
            if (state.canvasSpace.length < rootGetters['mult/get']('galleryCanvasSize')) {
                commit('updateKey', {key: 'canvasSpace', value: [...state.canvasSpace, name]});
                commit('updateColorDataKey', {name, key: 'cacheSpace', value: state.colorData[name].cacheSpace + 1});
            }
        },
        removeCanvasSpace({ state, commit }, name) {
            if (state.colorData[name].cacheSpace > 0) {
                let arr = [...state.canvasSpace].reverse();
                const colorIndex = arr.findIndex(elem => elem === name);
                if (colorIndex !== -1) {
                    arr.splice(colorIndex, 1);
                    commit('updateKey', {key: 'canvasSpace', value: arr.reverse()});
                }
                commit('updateColorDataKey', {name, key: 'cacheSpace', value: state.colorData[name].cacheSpace - 1});
            }
        },
        applyCanvasLevel({ state, dispatch }, o) {
            let trigger = o.onLevel ?? false;
            const level = Math.floor(state.colorData[o.name].progress);
            if (level > 0) {
                dispatch('system/applyEffect', {type: 'mult', name: `currencyGallery${ capitalize(o.name) }Gain`, multKey: `galleryCanvas_${o.name}`, value: Math.pow(2, level), trigger}, {root: true});
                dispatch('system/applyEffect', {type: 'mult', name: `gallery${ capitalize(o.name) }Conversion`, multKey: `galleryCanvas_${o.name}`, value: Math.pow(2, level), trigger}, {root: true});
                dispatch('system/applyEffect', {type: 'base', name: `currencyGallery${ capitalize(o.name) }DrumCap`, multKey: `galleryCanvas_${o.name}`, value: 10 * level, trigger}, {root: true});
            } else {
                dispatch('system/resetEffect', {type: 'mult', name: `currencyGallery${ capitalize(o.name) }Gain`, multKey: `galleryCanvas_${o.name}`}, {root: true});
                dispatch('system/resetEffect', {type: 'mult', name: `gallery${ capitalize(o.name) }Conversion`, multKey: `galleryCanvas_${o.name}`}, {root: true});
                dispatch('system/resetEffect', {type: 'base', name: `currencyGallery${ capitalize(o.name) }DrumCap`, multKey: `galleryCanvas_${o.name}`}, {root: true});
            }
        },
        buyMotivation({ rootGetters, commit, dispatch }) {
            if (rootGetters['currency/value']('gem_sapphire') >= GALLERY_MOTIVATION_BUY_COST) {
                commit('currency/add', {feature: 'gallery', name: 'motivation', amount: GALLERY_MOTIVATION_BUY_AMOUNT}, {root: true});
                commit('stat/add', {feature: 'gallery', name: 'motivation', value: GALLERY_MOTIVATION_BUY_AMOUNT}, {root: true});
                dispatch('currency/spend', {feature: 'gem', name: 'sapphire', amount: GALLERY_MOTIVATION_BUY_COST}, {root: true});
            }
        }
    }
}
