import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence, splicedLinear } from "../../utils/math";

export default {
    maxZone: {value: () => store.state.stat.horde_maxZone.total, default: 1, cap: 30, milestones: lvl => splicedLinear(10, 20, 20, lvl + 1), reward: {
        7: [{name: 'horde_stabbingGuide', type: 'keepUpgrade', value: true}, {name: 'horde_dodgingGuide', type: 'keepUpgrade', value: true}],
        11: [{name: 'horde_looting', type: 'keepUpgrade', value: true}],
    }},
    maxZoneSpeedrun: {value: () => store.state.stat.horde_maxZoneSpeedrun.total, default: 1, cap: 10, milestones: lvl => lvl * 5 + 10, reward: {
        8: [{name: 'horde_training', type: 'keepUpgrade', value: true}],
    }},
    maxDamage: {value: () => store.state.stat.horde_maxDamage.total, cap: 30, milestones: lvl => Math.pow(lvl * 250 + 7500, lvl) * 10, reward: {
        3: [{name: 'horde_boneBag', type: 'keepUpgrade', value: true}, {name: 'horde_anger', type: 'keepUpgrade', value: true}],
        6: [{name: 'horde_hoarding', type: 'keepUpgrade', value: true}, {name: 'horde_plunderSecret', type: 'keepUpgrade', value: true}],
    }},
    bone: {value: () => store.state.stat.horde_bone.total, cap: 30, milestones: lvl => Math.pow(2, getSequence(10, lvl) - 10) * buildNum(1, 'M'), reward: {
        2: [{name: 'horde_resilience', type: 'keepUpgrade', value: true}, {name: 'horde_rest', type: 'keepUpgrade', value: true}],
    }},
    monsterPart: {value: () => store.state.stat.horde_monsterPart.total, cap: 30, milestones: lvl => Math.pow(16, lvl) * 50, relic: {3: 'energyDrink'}, reward: {
        5: [{name: 'horde_thickSkin', type: 'keepUpgrade', value: true}],
    }},
    soulCorrupted: {value: () => store.state.stat.horde_soulCorrupted.total, cap: 30, milestones: lvl => Math.pow(7 + lvl, lvl) * 1000, reward: {
        4: [{name: 'horde_luckyStrike', type: 'keepUpgrade', value: true}],
    }},
    maxCorruptionKill: {value: () => store.state.stat.horde_maxCorruptionKill.total, display: 'percent', milestones: lvl => lvl + 1},
    maxMastery: {value: () => store.state.stat.horde_maxMastery.total, milestones: lvl => lvl + 1},
    totalMastery: {value: () => store.state.stat.horde_totalMastery.total, milestones: lvl => Math.round((lvl + 1) * 25 * (lvl * 0.2 + 1))},
    blood: {value: () => store.state.stat.horde_blood.total, milestones: lvl => Math.pow(2, getSequence(10, lvl) - 10) * buildNum(1, 'B'), reward: {
        3: [{name: 'horde_transfusion', type: 'keepUpgrade', value: true}],
        5: [{name: 'horde_protectiveShell', type: 'keepUpgrade', value: true}],
        8: [{name: 'horde_bloodStorage', type: 'keepUpgrade', value: true}],
    }},
    courage: {value: () => store.state.stat.horde_courage.total, milestones: lvl => Math.pow(18 + lvl * 6, lvl) * 1000, reward: {
        6: [{name: 'horde_secondChance', type: 'keepUpgrade', value: true}],
    }},
    trinket: {value: () => store.getters['horde/trinketLevels'], milestones: lvl => Math.round((lvl + 1) * 3 * (lvl * 0.2 + 1))},
    infiniteScore: {value: () => store.state.stat.horde_warzoneInfiniteScore.total +
        store.state.stat.horde_monkeyJungleInfiniteScore.total +
        store.state.stat.horde_loveIslandInfiniteScore.total, milestones: lvl => Math.round((lvl + 1) * 200 * Math.pow(1.15, lvl))
    },
    unlucky: {value: () => store.state.stat.horde_unlucky.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1},
}
