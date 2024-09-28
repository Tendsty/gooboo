import store from "../../../store";
import { getSequence } from "../../utils/math";

export default {
    harvests: {value: () => store.state.stat.farm_harvests.total, milestones: lvl => Math.round(Math.pow(lvl + 1, 2) * Math.pow(1.5, lvl) * 10)},
    maxOvergrow: {value: () => store.state.stat.farm_maxOvergrow.total, display: 'percent', milestones: lvl => getSequence(1, lvl + 1), relic: {2: 'trellis', 4: 'brickWall'}},
    bestPrestige: {value: () => store.state.stat.farm_bestPrestige.total, milestones: lvl => lvl * 2 + 4},
    vegetable: {value: () => store.state.stat.farm_vegetable.total, milestones: lvl => Math.pow(81, lvl) * 250, relic: {2: 'goldenCarrot'}},
    berry: {value: () => store.state.stat.farm_berry.total, milestones: lvl => Math.pow(81, lvl) * 750, relic: {3: 'goldenApple'}},
    grain: {value: () => store.state.stat.farm_grain.total, milestones: lvl => Math.pow(81, lvl) * 2250, relic: {4: 'popcorn'}},
    flower: {value: () => store.state.stat.farm_flower.total, milestones: lvl => Math.pow(81, lvl) * 6750, relic: {5: 'roseQuartz'}},
    gold: {value: () => store.state.stat.farm_gold.total, milestones: lvl => Math.round(Math.pow(lvl + 2, 2) * Math.pow(2.25, lvl) * 2.5), relic: {6: 'goldenSeed'}}
}
