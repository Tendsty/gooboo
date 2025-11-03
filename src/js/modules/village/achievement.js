import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    maxBuilding: {value: () => store.state.stat.village_maxBuilding.total, milestones: lvl => Math.round(lvl * 25 * Math.pow(1.15, lvl) + 35), relic: {3: 'mudBrick', 4: 'keychain'}, reward: {
        5: [{name: 'village_house', type: 'keepUpgrade', value: true}, {name: 'village_miniatureSmith', type: 'keepUpgrade', value: true}],
    }},
    basicResources: {value: () => Math.max(
        store.state.stat.village_woodMax.total,
        store.state.stat.village_plantFiberMax.total,
        store.state.stat.village_stoneMax.total
    ), milestones: lvl => Math.pow(10, lvl) * buildNum(10, 'K'), reward: {
        4: [{name: 'village_scythe', type: 'keepUpgrade', value: true}],
        5: [{name: 'village_hatchet', type: 'keepUpgrade', value: true}],
        6: [{name: 'village_pickaxe', type: 'keepUpgrade', value: true}],
        7: [{name: 'village_wateringCan', type: 'keepUpgrade', value: true}],
        11: [{name: 'village_investment', type: 'keepUpgrade', value: true}],
    }, relic: {3: 'sapling'}},
    metal: {value: () => store.state.stat.village_metalMax.total, milestones: lvl => Math.pow(10, lvl) * 5000, relic: {3: 'screwdriver'}},
    coin: {value: () => store.state.stat.village_coin.total, milestones: lvl => Math.pow(16, lvl) * 2000, reward: {
        4: [
            {name: 'village_treasury', type: 'keepUpgrade', value: true},
            {name: 'village_wallet', type: 'keepUpgrade', value: true},
            {name: 'village_resourceBag', type: 'keepUpgrade', value: true},
            {name: 'village_metalBag', type: 'keepUpgrade', value: true},
        ],
    }},
    water: {value: () => store.state.stat.village_waterMax.total, milestones: lvl => Math.pow(20, lvl) * 5000, reward: {
        3: [{name: 'village_garden', type: 'keepUpgrade', value: true}, {name: 'village_well', type: 'keepUpgrade', value: true}],
    }},
    knowledge: {value: () => store.state.stat.village_knowledgeMax.total, milestones: lvl => Math.round(getSequence(2, lvl + 1) * Math.pow(1.2, Math.max(lvl - 10, 0)) * 250), reward: {
        2: [{name: 'village_library', type: 'keepUpgrade', value: true}, {name: 'village_glassBlowery', type: 'keepUpgrade', value: true}],
        3: [{name: 'village_school', type: 'keepUpgrade', value: true}],
        4: [{name: 'village_basics', type: 'keepUpgrade', value: true}],
        5: [{name: 'village_processing', type: 'keepUpgrade', value: true}],
        6: [{name: 'village_pump', type: 'keepUpgrade', value: true}],
        7: [{name: 'village_sand', type: 'keepUpgrade', value: true}],
        8: [{name: 'village_book', type: 'keepUpgrade', value: true}],
    }},
    advancedResources: {value: () => Math.max(
        store.state.stat.village_hardwoodMax.total,
        store.state.stat.village_gemMax.total
    ), milestones: lvl => Math.pow(6, lvl) * buildNum(10, 'K'), reward: {
        3: [{name: 'village_sawmill', type: 'keepUpgrade', value: true}, {name: 'village_tunnel', type: 'keepUpgrade', value: true}],
    }},
    blessing: {value: () => store.state.stat.village_blessing.total, milestones: lvl => Math.pow(9, lvl) * 1000},
    offering: {value: () => store.state.stat.village_offering.total, milestones: lvl => Math.round(Math.pow(2.5, lvl) * 500)},
    sacrifice: {value: () => store.getters['village/offeringCount'], milestones: lvl => getSequence(6, lvl + 1) * 5},
    oil: {value: () => store.state.stat.village_oilMax.total, milestones: lvl => Math.pow(10, lvl) * buildNum(100, 'K')},
    highestPower: {value: () => store.state.stat.village_highestPower.total, milestones: lvl => getSequence(2, lvl + 1) * 10},
    minHappiness: {value: () => store.state.stat.village_minHappiness.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1}
}
