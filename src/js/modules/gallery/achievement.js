import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    beauty: {value: () => store.state.stat.gallery_beauty.total, milestones: lvl => Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'T'), relic: {2: 'sackOfGold', 6: 'imageAlbum'}},
    converter: {value: () => store.state.stat.gallery_converter.total, milestones: lvl => Math.pow(20, lvl) * buildNum(200, 'K'), relic: {0: 'printer', 2: 'shredder'}},
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
    ].reduce((a, b) => a + (b > 0 ? 1 : 0), 0), milestones: lvl => lvl + 2, relic: {2: 'redBalloon', 3: 'orangeBalloon', 4: 'yellowBalloon', 5: 'greenBalloon', 6: 'blueBalloon', 7: 'purpleBalloon'}},
    highestTierIdea: {value: () => store.state.stat.gallery_highestTierIdea.total, milestones: lvl => lvl + 2, relic: {0: 'lightbulb', 1: 'simpleCalculator', 3: 'strangeScroll'}},
    cash: {value: () => store.state.stat.gallery_cash.total, milestones: lvl => Math.pow(100, lvl) * 100, relic: {1: 'oldTV', 5: 'printingPress'}},
    packageMax: {value: () => store.state.stat.gallery_packageMax.total, milestones: lvl => Math.pow(3, lvl) * 100, relic: {0: 'worryingMail', 1: 'creditCard'}},
    redDrumMax: {value: () => store.state.stat.gallery_redDrumMax.total, milestones: lvl => lvl > 0 ? (Math.pow(2, lvl) * 25) : 20, relic: {2: 'redprint', 4: 'orangeprint', 6: 'yellowprint', 9: 'greenprint', 12: 'blueprint'}},
    shapeComboTotal: {value: () => store.state.stat.gallery_shapeComboTotal.total, milestones: lvl => Math.round(Math.pow(lvl + 2, 2) * Math.pow(1.2, lvl) * 25), relic: {2: 'fishbowl', 4: 'smallBrush', 7: 'strangePills'}},
    shapeComboHighest: {value: () => store.state.stat.gallery_shapeComboHighest.total, cap: 7, milestones: lvl => lvl * 5 + 10, relic: {2: 'pencil'}},
    canvasLevelTotal: {value: () => store.state.stat.gallery_canvasLevelTotal.total, milestones: lvl => getSequence(2, lvl + 1) * 10, relic: {0: 'woodenHanger', 2: 'bedsheet'}},
    hourglassHighest: {value: () => store.state.stat.gallery_hourglassHighest.total, secret: true, display: 'time', cap: 1, milestones: () => 86400},
}
