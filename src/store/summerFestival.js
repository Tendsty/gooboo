import Vue from "vue";
import quest from "../js/modules/event/summerFestival/quest";
import { buildArray } from "../js/utils/array";
import { randomInt } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        cellType: {
            beach: {
                icon: 'mdi-umbrella-beach',
                color: 'beige',
                produces: 'shell',
                isLand: true,
                terraform: {}
            },
            water: {
                icon: null,
                color: 'blue',
                produces: null,
                isLand: false,
                terraform: {}
            },
            palm: {
                icon: 'mdi-palm-tree',
                color: 'pale-green',
                produces: 'coconut',
                isLand: true,
                terraform: {
                    plain: {price: {}, reward: {event_coal: 400}}
                }
            },
            forest: {
                icon: 'mdi-tree',
                color: 'green',
                produces: 'log',
                isLand: true,
                terraform: {
                    plain: {price: {}, reward: {event_coal: 400}}
                }
            },
            mountain: {
                icon: 'mdi-image-filter-hdr',
                color: 'grey',
                produces: 'stoneBlock',
                isLand: false,
                terraform: {}
            },
            plain: {
                icon: null,
                color: 'light-green',
                produces: null,
                isLand: true,
                terraform: {
                    forest: {price: {event_cocktail: 150}, reward: {}},
                    palm: {price: {event_cocktail: 175}, reward: {}}
                }
            }
        },
        building: {},
        placedBuilding: {},
        buildQueue: [],
        selectedBuilding: null,
        nextBuildingId: 1,
        buildingRotate: 0,
        island: null,
        selectedCell: null,
        freeExpansion: 0,
        topazExpansion: 0,
        quest,
        questsCompleted: 0
    },
    getters: {
        eventMult: (state, getters, rootState, rootGetters) => {
            return Math.pow(1.005, rootGetters['meta/globalEventLevel']);
        },
        topazExpansionCost: (state) => {
            if (state.topazExpansion >= 20) {
                return null;
            }
            return state.topazExpansion * 10 + 100;
        },
        timeSkipCost: () => (seconds) => {
            return Math.ceil(Math.pow(seconds / 10, 0.5));
        },
        selectedCellIsConnected: (state) => {
            if (state.island === null || state.selectedCell === null) {
                return false;
            }
            let connectedCells = [];

            // Same row
            if (state.selectedCell.x > 0) {
                connectedCells.push(state.island[state.selectedCell.y][state.selectedCell.x - 1]);
            }
            if (state.selectedCell.x < (state.island[state.selectedCell.y].length - 1)) {
                connectedCells.push(state.island[state.selectedCell.y][state.selectedCell.x + 1]);
            }

            // Row above
            if (state.selectedCell.y > 0) {
                if (state.selectedCell.y > 3) {
                    connectedCells.push(state.island[state.selectedCell.y - 1][state.selectedCell.x]);
                    connectedCells.push(state.island[state.selectedCell.y - 1][state.selectedCell.x + 1]);
                } else {
                    if (state.selectedCell.x > 0) {
                        connectedCells.push(state.island[state.selectedCell.y - 1][state.selectedCell.x - 1]);
                    }
                    if (state.selectedCell.x < state.island[state.selectedCell.y - 1].length) {
                        connectedCells.push(state.island[state.selectedCell.y - 1][state.selectedCell.x]);
                    }
                }
            }

            // Row below
            if (state.selectedCell.y < (state.island.length - 1)) {
                if (state.selectedCell.y < 3) {
                    connectedCells.push(state.island[state.selectedCell.y + 1][state.selectedCell.x]);
                    connectedCells.push(state.island[state.selectedCell.y + 1][state.selectedCell.x + 1]);
                } else {
                    if (state.selectedCell.x > 0) {
                        connectedCells.push(state.island[state.selectedCell.y + 1][state.selectedCell.x - 1]);
                    }
                    if (state.selectedCell.x < state.island[state.selectedCell.y + 1].length) {
                        connectedCells.push(state.island[state.selectedCell.y + 1][state.selectedCell.x]);
                    }
                }
            }

            return connectedCells.findIndex(elem => elem.unlocked) !== -1;
        },
        buildingRequirementBase: (state) => (shape, cell, ignoreRotate = false) => {
            let cells = [];
            for (const [key, elem] of Object.entries(shape)) {
                const intKey = parseInt(key);
                const buildingPos = intKey > 0 ? (((intKey + (ignoreRotate ? 0 : state.buildingRotate) - 1) % 6) + 1) : 0;
                switch (buildingPos) {
                    case 0: {
                        // Center tile
                        cells.push({x: cell.x, y: cell.y, value: elem});
                        break;
                    }
                    case 1: {
                        // Right tile
                        if (cell.x < (state.island[cell.y].length - 1)) {
                            cells.push({x: cell.x + 1, y: cell.y, value: elem});
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                    case 2: {
                        // Bottom right tile
                        if (cell.y < (state.island.length - 1)) {
                            if (cell.y < 3) {
                                cells.push({x: cell.x + 1, y: cell.y + 1, value: elem});
                            } else if (cell.x < state.island[cell.y + 1].length) {
                                cells.push({x: cell.x, y: cell.y + 1, value: elem});
                            } else {
                                cells.push({value: null});
                            }
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                    case 3: {
                        // Bottom left tile
                        if (cell.y < (state.island.length - 1)) {
                            if (cell.y < 3) {
                                cells.push({x: cell.x, y: cell.y + 1, value: elem});
                            } else if (cell.x > 0) {
                                cells.push({x: cell.x - 1, y: cell.y + 1, value: elem});
                            } else {
                                cells.push({value: null});
                            }
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                    case 4: {
                        // Left tile
                        if (cell.x > 0) {
                            cells.push({x: cell.x - 1, y: cell.y, value: elem});
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                    case 5: {
                        // Top left tile
                        if (cell.y > 0) {
                            if (cell.y > 3) {
                                cells.push({x: cell.x, y: cell.y - 1, value: elem});
                            } else if (cell.x > 0) {
                                cells.push({x: cell.x - 1, y: cell.y - 1, value: elem});
                            } else {
                                cells.push({value: null});
                            }
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                    case 6: {
                        // Top right tile
                        if (cell.y > 0) {
                            if (cell.y > 3) {
                                cells.push({x: cell.x + 1, y: cell.y - 1, value: elem});
                            } else if (cell.x < state.island[cell.y - 1].length) {
                                cells.push({x: cell.x, y: cell.y - 1, value: elem});
                            } else {
                                cells.push({value: null});
                            }
                        } else {
                            cells.push({value: null});
                        }
                        break;
                    }
                }
            }
            return cells;
        },
        buildingRequirement: (state, getters) => {
            if (state.selectedCell === null || state.selectedBuilding === null) {
                return [];
            }
            return getters.buildingRequirementBase(state.building[state.selectedBuilding].shape, state.selectedCell);
        },
        canPlaceBuilding: (state, getters, rootState, rootGetters) => {
            if (state.selectedBuilding === null || state.buildQueue.length >= rootGetters['mult/get']('summerFestivalBuildQueueSlots')) {
                return false;
            }
            for (const [key, elem] of Object.entries(state.building[state.selectedBuilding].price(0))) {
                if (rootGetters['currency/value'](key) < elem) {
                    return false;
                }
            }
            const req = getters.buildingRequirement;
            return req.length > 0 && req.findIndex(elem => {
                if (elem.value === null) {
                    return true;
                }
                const cell = state.island[elem.y][elem.x];
                return !cell.unlocked || cell.building !== null || (elem.value === 'land' ? !state.cellType[cell.tile].isLand : (elem.value !== cell.tile));
            }) === -1;
        },
        canUpgradeBuilding: (state, getters, rootState, rootGetters) => (id) => {
            const placedBuilding = state.placedBuilding[id];
            const building = state.building[placedBuilding.type];
            if (building.timeLeft > 0 || state.buildQueue.length >= rootGetters['mult/get']('summerFestivalBuildQueueSlots')) {
                return false;
            }
            for (const [key, elem] of Object.entries(building.price(placedBuilding.level))) {
                if (rootGetters['currency/value'](key) < elem) {
                    return false;
                }
            }
            return true;
        },
        currentQuest: (state) => {
            return state.questsCompleted < state.quest.length ? state.quest[state.questsCompleted] : null;
        },
        questTokenGain: (state) => {
            return Math.floor(Math.pow(state.questsCompleted * 0.35, 1.12) + 4);
        },
        questIsComplete: (state, getters, rootState, rootGetters) => {
            if (getters.currentQuest === null) {
                return false;
            }
            return getters.currentQuest.findIndex(elem => {
                switch (elem.type) {
                    case 'currency':
                        return rootGetters['currency/value'](elem.name) < elem.amount;
                    case 'building': {
                        let amount = 0;
                        for (const [, building] of Object.entries(state.placedBuilding)) {
                            if (building.type === elem.name && building.timeLeft <= 0 && building.level >= elem.level) {
                                amount++;
                            }
                        }
                        return amount < elem.amount;
                    }
                    default:
                        console.warn(`Quest type ${ elem.type } not found`);
                        break;
                }
                return true;
            }) === -1;
        }
    },
    mutations: {
        initBuilding(state, o) {
            Vue.set(state.building, o.name, {
                icon: o.icon ?? 'mdi-home',
                shape: o.shape ?? {0: 'land'},
                timeNeeded: o.timeNeeded ?? (lvl => 3600 * (lvl + 1)),
                price: o.price ?? (() => {return {};}),
                effect: o.effect ?? [],
                action: o.action ?? {},
                maxLevel: o.maxLevel ?? null,
                maxAmount: o.maxAmount ?? null,
                stageLevel: o.stageLevel ?? 0
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.key], o.subkey, o.value);
        },
        pushKey(state, o) {
            state[o.key].push(o.value);
        },
        updateIslandKey(state, o) {
            Vue.set(state.island[o.y][o.x], o.key, o.value);
        },
        updatePlacedBuildingKey(state, o) {
            Vue.set(state.placedBuilding[o.id], o.key, o.value);
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'placedBuilding', value: {}});
            commit('updateKey', {key: 'buildQueue', value: []});
            commit('updateKey', {key: 'selectedBuilding', value: null});
            commit('updateKey', {key: 'nextBuildingId', value: 1});
            commit('updateKey', {key: 'island', value: null});
            commit('updateKey', {key: 'selectedCell', value: null});
            commit('updateKey', {key: 'freeExpansion', value: 0});
            commit('updateKey', {key: 'topazExpansion', value: 0});
            commit('updateKey', {key: 'questsCompleted', value: 0});
            commit('updateKey', {key: 'buildingRotate', value: 0});
        },
        generateIsland({ state, getters, commit }) {
            // Fill island with planes
            let island = [];
            for (let y = 0; y < 7; y++) {
                island.push([]);
                for (let x = 0, n = 7 - Math.abs(y - 3); x < n; x++) {
                    island[y].push({
                        tile: 'plain',
                        drop: 0,
                        building: null,
                        unlocked: y >= 2 && y <= 4 && x >= 2 && (x <= 3 || (y === 3 && x === 4)),
                        cacheAutocollect: null,
                        cacheConnect0: false,
                        cacheConnect1: false,
                        cacheConnect2: false
                    });
                }
            }
            commit('updateKey', {key: 'island', value: island});

            // Define ring cells
            let outerRing = [
                {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},
                {x: 0, y: 1}, {x: 4, y: 1},
                {x: 0, y: 2}, {x: 5, y: 2},
                {x: 0, y: 3}, {x: 6, y: 3},
                {x: 0, y: 4}, {x: 5, y: 4},
                {x: 0, y: 5}, {x: 4, y: 5},
                {x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6},
            ];
            let middleRing = [
                {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
                {x: 1, y: 2}, {x: 4, y: 2},
                {x: 1, y: 3}, {x: 5, y: 3},
                {x: 1, y: 4}, {x: 4, y: 4},
                {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5},
            ];
            let innerRing = [
                {x: 2, y: 2}, {x: 3, y: 2},
                {x: 2, y: 3}, {x: 4, y: 3},
                {x: 2, y: 4}, {x: 3, y: 4},
            ];

            let cells = {
                water: 8,
                mountain: 3,
                beach: 4,
                palm: 4,
                forest: 4
            };

            // Generate inner ring
            ['palm', 'forest', 'forest'].forEach(elem => {
                const chosenIndex = randomInt(0, innerRing.length - 1);
                const chosenCell = innerRing[chosenIndex];
                commit('updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'tile', value: elem});
                innerRing.splice(chosenIndex, 1);
            });

            // Generate water first
            buildArray(randomInt(2, 5)).forEach(() => {
                const chosenIndex = randomInt(0, outerRing.length - 1);
                const chosenCell = outerRing[chosenIndex];
                commit('updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'tile', value: 'water'});
                outerRing.splice(chosenIndex, 1);
                cells.water--;
            });
            buildArray(cells.water).forEach(() => {
                let eligible = middleRing.map((elem, index) => {
                    return {...elem, index};
                }).filter(pos => {
                    return getters.buildingRequirementBase({1: 'land', 2: 'land', 3: 'land', 4: 'land', 5: 'land', 6: 'land'}, pos).filter(elem => elem.value !== null).findIndex(elem => {
                        return state.island[elem.y][elem.x].tile === 'water';
                    }) !== -1;
                });
                const chosenIndex = randomInt(0, eligible.length - 1);
                const chosenCell = eligible[chosenIndex];
                commit('updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'tile', value: 'water'});
                middleRing.splice(chosenCell.index, 1);
            });

            let otherRing = [...outerRing, ...middleRing];
            // Generate beach tiles next to water
            buildArray(cells.beach).forEach(() => {
                let eligible = otherRing.map((elem, index) => {
                    return {...elem, index};
                }).filter(pos => {
                    return getters.buildingRequirementBase({1: 'land', 2: 'land', 3: 'land', 4: 'land', 5: 'land', 6: 'land'}, pos).filter(elem => elem.value !== null).findIndex(elem => {
                        return state.island[elem.y][elem.x].tile === 'water';
                    }) !== -1;
                });
                const chosenIndex = randomInt(0, eligible.length - 1);
                const chosenCell = eligible[chosenIndex];
                commit('updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'tile', value: 'beach'});
                otherRing.splice(chosenCell.index, 1);
            });

            // Generate other tiles
            ['mountain', 'palm', 'forest'].forEach(cell => {
                buildArray(cells[cell]).forEach(() => {
                    const chosenIndex = randomInt(0, otherRing.length - 1);
                    const chosenCell = otherRing[chosenIndex];
                    commit('updateIslandKey', {x: chosenCell.x, y: chosenCell.y, key: 'tile', value: cell});
                    otherRing.splice(chosenIndex, 1);
                });
            });
        },
        collectDrop({ state, getters, rootGetters, commit, dispatch }, o) {
            const cell = state.island[o.y][o.x];
            const cellType = state.cellType[cell.tile];
            if (cell.drop > 0 && cellType.produces) {
                dispatch('currency/gain', {
                    feature: 'event',
                    name: cellType.produces,
                    amount: cell.drop * rootGetters['mult/get']('summerFestivalMaterialGain') * getters.eventMult
                }, {root: true});
                commit('updateIslandKey', {x: o.x, y: o.y, key: 'drop', value: 0});
            }
        },
        buyIslandCell({ state, getters, rootGetters, commit, dispatch }, o) {
            const cell = state.island[o.y][o.x];
            if (!cell.unlocked) {
                if (state.freeExpansion > 0) {
                    commit('updateIslandKey', {x: o.x, y: o.y, key: 'unlocked', value: true});
                    commit('updateKey', {key: 'freeExpansion', value: state.freeExpansion - 1});
                } else if (getters.topazExpansionCost !== null && rootGetters['currency/value']('gem_topaz') >= getters.topazExpansionCost) {
                    commit('updateIslandKey', {x: o.x, y: o.y, key: 'unlocked', value: true});
                    dispatch('currency/spend', {feature: 'gem', name: 'topaz', amount: getters.topazExpansionCost}, {root: true});
                    commit('updateKey', {key: 'topazExpansion', value: state.topazExpansion + 1});
                }
            }
        },
        placeBuilding({ state, getters, rootGetters, commit, dispatch }) {
            if (getters.canPlaceBuilding && state.buildQueue.length < rootGetters['mult/get']('summerFestivalBuildQueueSlots')) {
                const building = state.building[state.selectedBuilding];
                for (const [key, elem] of Object.entries(building.price(0))) {
                    const split = key.split('_');
                    dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem}, {root: true});
                }
                commit('updateSubkey', {key: 'placedBuilding', subkey: state.nextBuildingId, value: {
                    type: state.selectedBuilding,
                    timeLeft: building.timeNeeded(0),
                    level: 0,
                    selectedAction: null,
                    actionTime: 0
                }});
                switch (state.selectedBuilding) {
                    case 'collector':
                        dispatch('note/find', 'event_20', {root: true});
                        break;
                    case 'mainStage':
                        dispatch('note/find', 'event_22', {root: true});
                        break;
                    case 'sawmill':
                    case 'kitchen':
                        dispatch('note/find', 'event_24', {root: true});
                        break;
                }
                getters.buildingRequirement.forEach(elem => {
                    commit('updateIslandKey', {x: elem.x, y: elem.y, key: 'drop', value: 0});
                    commit('updateIslandKey', {x: elem.x, y: elem.y, key: 'building', value: state.nextBuildingId});
                });
                commit('pushKey', {key: 'buildQueue', value: state.nextBuildingId});
                commit('updateKey', {key: 'nextBuildingId', value: state.nextBuildingId + 1});
                commit('updateKey', {key: 'selectedBuilding', value: null});
                dispatch('calculateConnectCaches');
            }
        },
        upgradeBuilding({ state, getters, rootGetters, commit, dispatch }, id) {
            if (getters.canUpgradeBuilding && state.buildQueue.length < rootGetters['mult/get']('summerFestivalBuildQueueSlots')) {
                const placedBuilding = state.placedBuilding[id];
                const building = state.building[placedBuilding.type];
                for (const [key, elem] of Object.entries(building.price(placedBuilding.level))) {
                    const split = key.split('_');
                    dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem}, {root: true});
                }
                commit('updatePlacedBuildingKey', {id, key: 'timeLeft', value: building.timeNeeded(placedBuilding.level)});
                commit('pushKey', {key: 'buildQueue', value: id});
            }
        },
        destroyBuilding({ state, rootGetters, commit }, id) {
            if (state.buildQueue.length < rootGetters['mult/get']('summerFestivalBuildQueueSlots')) {
                const placedBuilding = state.placedBuilding[id];
                const building = state.building[placedBuilding.type];
                commit('updatePlacedBuildingKey', {id, key: 'timeLeft', value: building.timeNeeded(0)});
                commit('pushKey', {key: 'buildQueue', value: 0 - id});
            }
        },
        finishBuilding({ state, commit, dispatch }, id) {
            commit('updatePlacedBuildingKey', {id, key: 'timeLeft', value: 0});
            commit('updatePlacedBuildingKey', {id, key: 'level', value: state.placedBuilding[id].level + 1});
            dispatch('applyBuildingEffects', id);
        },
        finishBuildingDeletion({ state, commit, dispatch }, id) {
            // Remove from island
            state.island.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell.building === id) {
                        commit('updateIslandKey', {x, y, key: 'building', value: null});
                    }
                });
            });
            const name = state.placedBuilding[id].type;

            // Remove effects
            dispatch('resetBuildingEffects', id);
            dispatch('calculateConnectCaches');

            // Remove from placed buildings object
            // eslint-disable-next-line no-unused-vars
            const {[id]: _, ...newObj} = state.placedBuilding;
            commit('updateKey', {key: 'placedBuilding', value: newObj});

            // Reset collectors
            if (name === 'collector') {
                state.island.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        commit('updateIslandKey', {x, y, key: 'cacheAutocollect', value: null});
                    });
                });
                for (const [key, elem] of Object.entries(state.placedBuilding)) {
                    if (elem.type === 'collector') {
                        dispatch('applyBuildingEffects', parseInt(key));
                    }
                }
            }
        },
        skipBuilding({ state, getters, rootGetters, commit, dispatch }, id) {
            const cost = getters.timeSkipCost(state.placedBuilding[id].timeLeft / rootGetters['mult/get']('summerFestivalBuildQueueSpeed'));
            if (rootGetters['currency/value']('event_cocktail') >= cost) {
                dispatch('currency/spend', {feature: 'event', name: 'cocktail', amount: cost}, {root: true});
                if (state.buildQueue.findIndex(elem => elem === id) !== -1) {
                    commit('updateKey', {key: 'buildQueue', value: state.buildQueue.filter(elem => elem !== id)});
                    dispatch('finishBuilding', id);
                } else {
                    commit('updateKey', {key: 'buildQueue', value: state.buildQueue.filter(elem => elem !== (0 - id))});
                    dispatch('finishBuildingDeletion', id);
                }
            }
        },
        applyBuildingEffects({ state, getters, commit, dispatch }, id) {
            const name = state.placedBuilding[id].type;
            let baseObj = {};
            let multObj = {};
            state.building[name].effect.forEach(eff => {
                const value = eff.value(state.placedBuilding[id].level - 1);
                switch (eff.type) {
                    case 'summerFestivalBuildingBase':
                        baseObj[eff.name] = value;
                        break;
                    case 'summerFestivalBuildingMult':
                        multObj[eff.name] = value;
                        break;
                    default:
                        dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `summerFestivalBuilding_${name}_${id}`, value, trigger: true}, {root: true});
                        break;
                }
            });

            if (name === 'collector') {
                let pos = null;
                state.island.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell.building === id) {
                            pos = {x, y};
                        }
                    });
                });
                if (pos) {
                    getters.buildingRequirementBase({1: 'land', 2: 'land', 3: 'land', 4: 'land', 5: 'land', 6: 'land'}, pos).filter(elem => elem.value !== null).forEach(cell => {
                        if (state.island[cell.y][cell.x].cacheAutocollect === null || state.island[cell.y][cell.x].cacheAutocollect < multObj.autocollectMult) {
                            commit('updateIslandKey', {x: cell.x, y: cell.y, key: 'cacheAutocollect', value: multObj.autocollectMult});
                            dispatch('collectDrop', {x: cell.x, y: cell.y});
                        }
                    });
                }
            } else if (name === 'mainStage') {
                commit('stat/increaseTo', {feature: 'event', name: 'summerFestivalMaxStage', value: state.placedBuilding[id].level}, {root: true});
            }
        },
        resetBuildingEffects({ state, dispatch }, id) {
            const name = state.placedBuilding[id].type;
            state.building[name].effect.forEach(eff => {
                if (!['summerFestivalBuildingBase', 'summerFestivalBuildingMult'].includes(eff.type)) {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `summerFestivalBuilding_${name}_${id}`}, {root: true});
                }
            });
        },
        completeQuest({ state, getters, commit, dispatch }) {
            if (getters.questIsComplete) {
                getters.currentQuest.forEach(elem => {
                    if (elem.type === 'currency') {
                        const split = elem.name.split('_');
                        dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem.amount}, {root: true});
                    }
                });
                dispatch('event/giveTokens', {event: 'summerFestival', amount: getters.questTokenGain}, {root: true});
                commit('updateKey', {key: 'questsCompleted', value: state.questsCompleted + 1});
                if (state.questsCompleted <= 50 && state.questsCompleted % 5 === 0) {
                    commit('updateKey', {key: 'freeExpansion', value: state.freeExpansion + 1});
                    dispatch('note/find', 'event_23', {root: true});
                }
                if (state.questsCompleted >= 4) {
                    dispatch('note/find', 'event_21', {root: true});
                }
                dispatch('note/find', 'event_25', {root: true});
            }
        },
        calculateConnectCaches({ state, getters, commit }) {
            state.island.forEach((row, y) => {
                row.forEach((cell, x) => {
                    getters.buildingRequirementBase({1: 'land', 2: 'land', 3: 'land'}, {x, y}, true).forEach((elem, index) => {
                        commit('updateIslandKey', {x, y, key: 'cacheConnect' + index, value: cell.building !== null && elem.value !== null && state.island[elem.y][elem.x].building === cell.building});
                    });
                });
            });
        },
        terraformTile({ state, rootGetters, commit, dispatch }, o) {
            const tile = state.island[o.y][o.x];
            const terraform = state.cellType[tile.tile].terraform[o.tile];
            if (tile.unlocked && tile.building === null) {
                let canAfford = true;
                for (const [key, elem] of Object.entries(terraform.price)) {
                    if (rootGetters['currency/value'](key) < elem) {
                        canAfford = false;
                    }
                }
                if (canAfford) {
                    commit('updateIslandKey', {x: o.x, y: o.y, key: 'drop', value: 0});
                    commit('updateIslandKey', {x: o.x, y: o.y, key: 'tile', value: o.tile});
                    for (const [key, elem] of Object.entries(terraform.price)) {
                        const split = key.split('_');
                        dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem}, {root: true});
                    }
                    for (const [key, elem] of Object.entries(terraform.reward)) {
                        const split = key.split('_');
                        dispatch('currency/gain', {feature: split[0], name: split[1], amount: elem}, {root: true});
                    }
                }
            }
        }
    }
}
