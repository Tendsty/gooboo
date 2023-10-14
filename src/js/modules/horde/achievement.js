import store from "../../../store";
import { buildNum } from "../../utils/format";

export default {
    maxZone: {value: () => store.state.stat.horde_maxZone.total, default: 1, milestones: lvl => lvl * 10 + 10, relic: {6: 'ultimateGuide'}},
    maxZoneSpeedrun: {value: () => store.state.stat.horde_maxZoneSpeedrun.total, default: 1, milestones: lvl => lvl * 5 + 10, relic: {3: 'dumbbell', 5: 'bandage'}},
    totalDamage: {value: () => store.state.stat.horde_totalDamage.total, milestones: lvl => Math.pow(lvl * 250 + 7500, lvl) * buildNum(10, 'K'), relic: {4: 'energyDrink'}},
    maxDamage: {value: () => store.state.stat.horde_maxDamage.total, milestones: lvl => Math.pow(lvl * 250 + 7500, lvl) * 10, relic: {3: 'burningSkull'}},
    bone: {value: () => store.state.stat.horde_bone.total, milestones: lvl => Math.pow(buildNum(100, 'K'), lvl) * buildNum(1, 'M'), relic: {3: 'forgottenShield', 5: 'newBackpack'}},
    monsterPart: {value: () => store.state.stat.horde_monsterPart.total, milestones: lvl => Math.pow(16, lvl) * 50, relic: {3: 'luckyDice', 5: 'crackedSafe'}},
    soulCorrupted: {value: () => store.state.stat.horde_soulCorrupted.total, milestones: lvl => Math.pow(8, lvl) * 35},
    maxMastery: {value: () => store.state.stat.horde_maxMastery.total, milestones: lvl => lvl + 1},
    totalMastery: {value: () => store.state.stat.horde_totalMastery.total, milestones: lvl => Math.round((lvl + 1) * 25 * (lvl * 0.2 + 1))},
    unlucky: {value: () => store.state.stat.horde_unlucky.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1},
}
