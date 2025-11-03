import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    beauty: {value: () => store.state.stat.gallery_beauty.total, milestones: lvl => Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'T'), reward: {
        2: [{name: 'observeRainbow', type: 'galleryIdea', value: true}],
        6: [{name: 'gallery_paintDrumStorage', type: 'keepUpgrade', value: true}, {name: 'paintForFun', type: 'galleryIdea', value: true}],
    }},
    converter: {value: () => store.state.stat.gallery_converter.total, milestones: lvl => Math.pow(20, lvl) * buildNum(200, 'K'), reward: {
        0: [
            {name: 'gallery_newStyle', type: 'keepUpgrade', value: true},
            {name: 'gallery_recycling', type: 'keepUpgrade', value: true},
            {name: 'sortWaste', type: 'galleryIdea', value: true},
        ],
        2: [
            {name: 'gallery_filters', type: 'keepUpgrade', value: true},
            {name: 'gallery_trashCan', type: 'keepUpgrade', value: true},
            {name: 'buildComposter', type: 'galleryIdea', value: true},
        ],
    }},
    colorVariety: {value: () => [
        store.state.stat.gallery_red.total,
        store.state.stat.gallery_orange.total,
        store.state.stat.gallery_yellow.total,
        store.state.stat.gallery_green.total,
        store.state.stat.gallery_blue.total,
        store.state.stat.gallery_purple.total,
        store.state.stat["gallery_deep-orange"].total,
        store.state.stat.gallery_amber.total,
        store.state.stat["gallery_light-green"].total,
        store.state.stat.gallery_teal.total,
        store.state.stat["gallery_light-blue"].total,
        store.state.stat.gallery_pink.total
    ].reduce((a, b) => a + (b > 0 ? 1 : 0), 0), milestones: lvl => lvl + 2, reward: {
        2: [{name: 'gallery_redPower', type: 'keepUpgrade', value: true}, {name: 'gallery_redConversion', type: 'keepUpgrade', value: true}],
        3: [{name: 'gallery_orangePower', type: 'keepUpgrade', value: true}, {name: 'gallery_orangeConversion', type: 'keepUpgrade', value: true}],
        4: [{name: 'gallery_yellowPower', type: 'keepUpgrade', value: true}, {name: 'gallery_yellowConversion', type: 'keepUpgrade', value: true}],
        5: [{name: 'gallery_greenPower', type: 'keepUpgrade', value: true}, {name: 'gallery_greenConversion', type: 'keepUpgrade', value: true}],
        6: [{name: 'gallery_bluePower', type: 'keepUpgrade', value: true}, {name: 'gallery_blueConversion', type: 'keepUpgrade', value: true}],
        7: [{name: 'gallery_purplePower', type: 'keepUpgrade', value: true}, {name: 'gallery_purpleConversion', type: 'keepUpgrade', value: true}],
    }},
    highestTierIdea: {value: () => store.state.stat.gallery_highestTierIdea.total, milestones: lvl => lvl + 2, relic: {0: 'lightbulb'}, reward: {
        1: [{name: 'calculateOdds', type: 'galleryIdea', value: true}],
        3: [{name: 'beMysterious', type: 'galleryIdea', value: true}],
    }},
    cash: {value: () => store.state.stat.gallery_cash.total, milestones: lvl => Math.pow(100, lvl) * 100, relic: {5: 'printingPress'}, reward: {
        1: [{name: 'advertise', type: 'galleryIdea', value: true}],
    }},
    packageMax: {value: () => store.state.stat.gallery_packageMax.total, milestones: lvl => Math.pow(3, lvl) * 100, reward: {
        0: [{name: 'beImpatient', type: 'galleryIdea', value: true}],
        1: [{name: 'orderMassiveSafe', type: 'galleryIdea', value: true}],
    }},
    redDrumMax: {value: () => store.state.stat.gallery_redDrumMax.total, milestones: lvl => lvl > 0 ? (Math.pow(2, lvl) * 25) : 20, reward: {
        2: [{name: 'gallery_redRage', type: 'keepUpgrade', value: true}, {name: 'buildRedReservoir', type: 'galleryIdea', value: true}],
        4: [{name: 'gallery_redLuck', type: 'keepUpgrade', value: true}, {name: 'buildOrangeReservoir', type: 'galleryIdea', value: true}],
        6: [{name: 'gallery_orangeLuck', type: 'keepUpgrade', value: true}, {name: 'buildYellowReservoir', type: 'galleryIdea', value: true}],
        9: [{name: 'gallery_yellowLuck', type: 'keepUpgrade', value: true}, {name: 'buildGreenReservoir', type: 'galleryIdea', value: true}],
        12: [{name: 'gallery_greenLuck', type: 'keepUpgrade', value: true}, {name: 'buildBlueReservoir', type: 'galleryIdea', value: true}],
    }},
    shapeComboTotal: {value: () => store.state.stat.gallery_shapeComboTotal.total, cap: 10, milestones: lvl => Math.round(Math.pow(lvl + 2, 2) * Math.pow(1.2, lvl) * 25), relic: {2: 'fishbowl', 4: 'smallBrush', 7: 'strangePills'}},
    shapeComboHighest: {value: () => store.state.stat.gallery_shapeComboHighest.total, cap: 7, milestones: lvl => lvl * 5 + 10, relic: {2: 'pencil'}},
    canvasLevelTotal: {value: () => store.state.stat.gallery_canvasLevelTotal.total, milestones: lvl => getSequence(2, lvl + 1) * 10, reward: {
        0: [{name: 'paintFaster', type: 'galleryIdea', value: true}],
        2: [{name: 'expandCanvas', type: 'galleryIdea', value: true}],
    }},
    hourglassHighest: {value: () => store.state.stat.gallery_hourglassHighest.total, secret: true, display: 'time', cap: 1, milestones: () => 86400},
}
