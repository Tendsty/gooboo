import store from "../../../store";
import { buildNum } from "../../utils/format";
import { splicedLinear } from "../../utils/math";

export default {
    maxDepth0: {value: () => store.state.stat.mining_maxDepth0.total, default: 1, milestones: lvl => lvl * 25 + 25},
    maxDepth1: {value: () => store.state.stat.mining_maxDepth1.total, default: 1, milestones: lvl => lvl > 0 ? (lvl * 20) : 10},
    maxDepthSpeedrun: {value: () => store.state.stat.mining_maxDepthSpeedrun.total, default: 1, cap: 10, milestones: lvl => lvl > 0 ? (lvl * 10 + 10) : 15, reward: {
        1: [{name: 'mining_depthDweller', type: 'keepUpgrade', value: true}],
        2: [{name: 'mining_compressor', type: 'keepUpgrade', value: true}],
        3: [{name: 'mining_oreSlots', type: 'keepUpgrade', value: true}],
        5: [{name: 'mining_graniteHardening', type: 'keepUpgrade', value: true}],
        9: [{name: 'mining_oreWashing', type: 'keepUpgrade', value: true}],
    }},
    maxDamage: {value: () => store.state.stat.mining_maxDamage.total, milestones: lvl => Math.pow(buildNum(80, 'K'), lvl) * buildNum(10, 'K'), reward: {
        3: [{name: 'mining_hullbreaker', type: 'keepUpgrade', value: true}],
        6: [{name: 'mining_bronzeCache', type: 'keepUpgrade', value: true}],
    }},
    scrap: {value: () => store.state.stat.mining_scrap.total, milestones: lvl => Math.pow(8000, lvl) * buildNum(5, 'M'), reward: {
        3: [{name: 'mining_aluminiumExpansion', type: 'keepUpgrade', value: true}, {name: 'mining_copperExpansion', type: 'keepUpgrade', value: true}],
        4: [{name: 'mining_tinCache', type: 'keepUpgrade', value: true}],
    }},
    oreTotal: {value: () => [
        store.state.stat.mining_oreAluminium.total,
        store.state.stat.mining_oreCopper.total,
        store.state.stat.mining_oreTin.total,
        store.state.stat.mining_oreIron.total,
        store.state.stat.mining_oreTitanium.total,
        store.state.stat.mining_orePlatinum.total,
        store.state.stat.mining_oreIridium.total,
        store.state.stat.mining_oreOsmium.total,
        store.state.stat.mining_oreLead.total,
    ].reduce((a, b) => a + b, 0), milestones: lvl => Math.pow(10, lvl) * 100, reward: {
        2: [{name: 'mining_aluminiumCache', type: 'keepUpgrade', value: true}, {name: 'mining_aluminiumHardening', type: 'keepUpgrade', value: true}],
        3: [{name: 'mining_copperCache', type: 'keepUpgrade', value: true}],
        4: [{name: 'mining_aluminiumTanks', type: 'keepUpgrade', value: true}, {name: 'mining_aluminiumAnvil', type: 'keepUpgrade', value: true}],
        5: [{name: 'mining_magnet', type: 'keepUpgrade', value: true}, {name: 'mining_warehouse', type: 'keepUpgrade', value: true}],
        6: [{name: 'mining_titaniumExpansion', type: 'keepUpgrade', value: true}, {name: 'mining_titaniumCache', type: 'keepUpgrade', value: true}],
    }},
    oreVariety: {value: () => [
        // Ore
        store.state.stat.mining_oreAluminium.total,
        store.state.stat.mining_oreCopper.total,
        store.state.stat.mining_oreTin.total,
        store.state.stat.mining_oreIron.total,
        store.state.stat.mining_oreTitanium.total,
        store.state.stat.mining_orePlatinum.total,
        store.state.stat.mining_oreIridium.total,
        store.state.stat.mining_oreOsmium.total,
        store.state.stat.mining_oreLead.total,

        // Rare earth
        store.state.stat.mining_granite.total,
        store.state.stat.mining_salt.total,
        store.state.stat.mining_coal.total,
        store.state.stat.mining_sulfur.total,
        store.state.stat.mining_niter.total,
        store.state.stat.mining_obsidian.total,
        store.state.stat.mining_deeprock.total,
        store.state.stat.mining_glowshard.total,
        store.state.stat.mining_limestone.total,
        store.state.stat.mining_moonshard.total,
        store.state.stat.mining_phosphorus.total,

        // Gasses
        store.state.stat.mining_helium.total,
        store.state.stat.mining_neon.total,
        store.state.stat.mining_argon.total,
        store.state.stat.mining_krypton.total,
        store.state.stat.mining_xenon.total,
        store.state.stat.mining_radon.total,
    ].reduce((a, b) => a + (b > 0 ? 1 : 0), 0), milestones: lvl => splicedLinear(1, 2, 8, lvl) + 2, reward: {
        1: [{name: 'mining_copperTanks', type: 'keepUpgrade', value: true}],
        3: [{name: 'mining_refinery', type: 'keepUpgrade', value: true}],
        5: [
            {name: 'mining_ironExpansion', type: 'keepUpgrade', value: true},
            {name: 'mining_ironHardening', type: 'keepUpgrade', value: true},
            {name: 'mining_ironFilter', type: 'keepUpgrade', value: true},
        ],
    }, descriptionCustom() {
        return store.state.unlock.miningGasSubfeature.see ? 2 : store.state.stat.mining_maxDepth0.total >= 50 ? 1 : 0;
    }},
    depthDwellerCap0: {value: () => store.state.stat.mining_depthDwellerCap0.total, cap: 10, milestones: lvl => lvl * 10 + (lvl === 0 ? 5 : 0), reward: {
        0: [{name: 'mining_craftingStation', type: 'keepUpgrade', value: true}],
        9: [{name: 'mining_drillFuel', type: 'keepUpgrade', value: true}],
    }},
    depthDwellerCap1: {value: () => store.state.stat.mining_depthDwellerCap1.total, cap: 10, milestones: lvl => lvl * 10 + (lvl === 0 ? 5 : 0)},
    coal: {value: () => store.state.stat.mining_coal.total, milestones: lvl => Math.pow(2.5, lvl) * 100, reward: {
        2: [{name: 'mining_furnace', type: 'keepUpgrade', value: true}],
    }},
    enhancementHighest: {value: () => store.state.stat.mining_enhancementHighest.total, cap: 5, milestones: lvl => (lvl + 1) * 2},
    resin: {value: () => store.state.stat.mining_resin.total, milestones: lvl => Math.pow(2, lvl) * 50, relic: {3: 'honeyPot'}},
    gasTotal: {value: () => [
        store.state.stat.mining_heliumMax.total,
        store.state.stat.mining_neonMax.total,
        store.state.stat.mining_argonMax.total,
        store.state.stat.mining_kryptonMax.total,
        store.state.stat.mining_xenonMax.total,
        store.state.stat.mining_radonMax.total,
    ].reduce((a, b) => a + (b < 1 ? 0 : Math.floor(Math.log10(b))), 0), milestones: lvl => (lvl + 1) * 4},
    smoke: {value: () => store.state.stat.mining_smokeMax.total, milestones: lvl => Math.pow(64, lvl) * 100},
    craftingWasted: {value: () => store.state.stat.mining_craftingWasted.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1},
    dwellerCapHit: {value: () => store.state.stat.mining_dwellerCapHit.total, secret: true, display: 'boolean', cap: 1, milestones: () => 1},
    craftingLuck: {value: () => store.state.stat.mining_craftingLuck.total, default: 1, secret: true, cap: 1, milestones: () => buildNum(1, 'M')},
}
