import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    maxZone: {value: () => store.state.stat.horde_maxZone.total, default: 1, cap: 30, milestones: lvl => lvl * 10 + 10, relic: {7: 'ultimateGuide', 11: 'crackedSafe'}},
    maxZoneSpeedrun: {value: () => store.state.stat.horde_maxZoneSpeedrun.total, default: 1, cap: 10, milestones: lvl => lvl * 5 + 10, relic: {8: 'dumbbell'}},
    totalDamage: {value: () => store.state.stat.horde_totalDamage.total, milestones: lvl => Math.pow(lvl * 250 + 7500, lvl) * buildNum(10, 'K'), relic: {6: 'newBackpack'}},
    maxDamage: {value: () => store.state.stat.horde_maxDamage.total, milestones: lvl => Math.pow(lvl * 250 + 7500, lvl) * 10, relic: {3: 'burningSkull'}},
    bone: {value: () => store.state.stat.horde_bone.total, milestones: lvl => Math.pow(2, getSequence(10, lvl) - 10) * buildNum(1, 'M'), relic: {2: 'forgottenShield'}},
    monsterPart: {value: () => store.state.stat.horde_monsterPart.total, milestones: lvl => Math.pow(16, lvl) * 50, relic: {3: 'energyDrink', 5: 'bandage'}},
    soulCorrupted: {value: () => store.state.stat.horde_soulCorrupted.total, milestones: lvl => Math.pow(7 + lvl, lvl) * 1000, relic: {4: 'luckyDice'}},
    maxCorruptionKill: {value: () => store.state.stat.horde_maxCorruptionKill.total, display: 'percent', milestones: lvl => lvl + 1},
    maxMastery: {value: () => store.state.stat.horde_maxMastery.total, milestones: lvl => lvl + 1},
    totalMastery: {value: () => store.state.stat.horde_totalMastery.total, milestones: lvl => Math.round((lvl + 1) * 25 * (lvl * 0.2 + 1))},
    unlucky: {value: () => store.state.stat.horde_unlucky.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1},
}
