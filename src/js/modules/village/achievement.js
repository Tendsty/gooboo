import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    maxBuilding: {value: () => store.state.stat.village_maxBuilding.total, milestones: lvl => Math.round(lvl * 25 * Math.pow(1.2, lvl) + 35), relic: {3: 'mudBrick', 4: 'keychain', 5: 'goldenKey'}},
    basicResources: {value: () => Math.max(
        store.state.stat.village_woodMax.total,
        store.state.stat.village_plantFiberMax.total,
        store.state.stat.village_stoneMax.total
    ), milestones: lvl => Math.pow(10, lvl) * buildNum(10, 'K'), relic: {3: 'sapling'}},
    metal: {value: () => store.state.stat.village_metalMax.total, milestones: lvl => Math.pow(10, lvl) * 5000, relic: {3: 'screwdriver'}},
    coin: {value: () => store.state.stat.village_coin.total, milestones: lvl => Math.pow(16, lvl) * 2000, relic: {4: 'treasureChest'}},
    water: {value: () => store.state.stat.village_waterMax.total, milestones: lvl => Math.pow(20, lvl) * 5000, relic: {3: 'rose'}},
    knowledge: {value: () => store.state.stat.village_knowledgeMax.total, milestones: lvl => getSequence(2, lvl + 1) * 250, relic: {2: 'globe'}},
    advancedResources: {value: () => Math.max(
        store.state.stat.village_hardwoodMax.total,
        store.state.stat.village_gemMax.total
    ), milestones: lvl => Math.pow(6, lvl) * buildNum(10, 'K'), relic: {3: 'supervisor'}},
    blessing: {value: () => store.state.stat.village_blessing.total, milestones: lvl => Math.pow(9, lvl) * 1000},
    totalOffering: {value: () => store.state.stat.village_totalOffering.total, milestones: lvl => Math.pow(4, lvl) * 30},
    bestOffering: {value: () => store.state.stat.village_bestOffering.total, milestones: lvl => Math.round(lvl * 10 * Math.pow(1.4, lvl) + 10)},
    oil: {value: () => store.state.stat.village_oilMax.total, milestones: lvl => Math.pow(10, lvl) * buildNum(100, 'K')},
    highestPower: {value: () => store.state.stat.village_highestPower.total, milestones: lvl => getSequence(2, lvl + 1) * 10},
    minHappiness: {value: () => store.state.stat.village_minHappiness.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1}
}
