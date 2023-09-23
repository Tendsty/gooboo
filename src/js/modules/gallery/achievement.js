import store from "../../../store";
import { buildNum } from "../../utils/format";

export default {
    beauty: {value: () => store.state.stat.gallery_beauty.total, milestones: lvl => Math.pow(buildNum(1, 'M'), lvl) * buildNum(1, 'T'), relic: {2: 'sackOfGold'}},
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
    ].reduce((a, b) => a + (b > 0 ? 1 : 0), 0), milestones: lvl => lvl + 2, relic: {2: 'redBalloon', 3: 'orangeBalloon', 4: 'yellowBalloon'}},
    highestTierIdea: {value: () => store.state.stat.gallery_highestTierIdea.total, milestones: lvl => lvl + 2, relic: {0: 'lightbulb', 1: 'simpleCalculator'}},
    cash: {value: () => store.state.stat.gallery_cash.total, milestones: lvl => Math.pow(10, lvl) * 100, relic: {1: 'oldTV'}},
    packageMax: {value: () => store.state.stat.gallery_packageMax.total, milestones: lvl => Math.pow(3, lvl) * 100, relic: {0: 'worryingMail', 1: 'creditCard'}},
    redDrumMax: {value: () => store.state.stat.gallery_redDrumMax.total, milestones: lvl => lvl > 0 ? (Math.pow(2, lvl) * 25) : 20, relic: {2: 'redprint', 4: 'orangeprint'}},
}
