import store from "../../store";
import { SECONDS_PER_DAY } from "../constants";
import themes from "../theme/themes";
import { buildArray } from "../utils/array";
import { getSequence } from "../utils/math";
import v1_0_0 from "./patchnote/v1_0_0";
import v1_0_1 from "./patchnote/v1_0_1";
import v1_1_0 from "./patchnote/v1_1_0";
import v1_1_1 from "./patchnote/v1_1_1";
import v1_1_2 from "./patchnote/v1_1_2";
import v1_2_0 from "./patchnote/v1_2_0";
import v1_3_0 from "./patchnote/v1_3_0";
import v1_3_1 from "./patchnote/v1_3_1";
import v1_3_2 from "./patchnote/v1_3_2";
import v1_3_3 from "./patchnote/v1_3_3";
import v1_3_4 from "./patchnote/v1_3_4";
import v1_3_5 from "./patchnote/v1_3_5";
import v1_4_0 from "./patchnote/v1_4_0";
import v1_3_6 from "./patchnote/v1_3_6";
import v1_4_1 from "./patchnote/v1_4_1";
import v1_5_0 from "./patchnote/v1_5_0";
import v1_4_2 from "./patchnote/v1_4_2";
import v1_5_1 from "./patchnote/v1_5_1";
import v1_5_2 from "./patchnote/v1_5_2";
import v1_5_3 from "./patchnote/v1_5_3";
import v1_5_4 from "./patchnote/v1_5_4";
import v1_5_5 from "./patchnote/v1_5_5";
import v1_5_6 from "./patchnote/v1_5_6";
import v1_5_7 from "./patchnote/v1_5_7";
import v1_5_8 from "./patchnote/v1_5_8";

export default {
    name: 'meta',
    tickspeed: 5,
    unlockNeeded: null,
    tick() {
        for (const [key, elem] of Object.entries(store.state.system.tutorial)) {
            if (!elem.active && !elem.completed && (elem.screen === null || elem.screen === store.state.system.screen) && elem.enableCondition()) {
                if (elem.currentDelay >= elem.delay) {
                    store.commit('system/updateTutorialKey', {name: key, key: 'active', value: true});
                } else {
                    store.commit('system/updateTutorialKey', {name: key, key: 'currentDelay', value: elem.currentDelay + 1});
                }
            }
        }
    },
    unlock: ['debugFeature'],
    stat: {
        longestOfflineTime: {display: 'time'}
    },
    achievement: {
        totalLevel: {
            value: () => store.getters['achievement/totalLevel'] - store.state.achievement.meta_totalLevel.level,
            milestones: lvl => getSequence(5, lvl + 1) * 10,
            relic: {0: 'excavator', 1: 'redCard', 2: 'briefcase', 3: 'strangePlant', 4: 'beneficialVirus'}
        },
        highestGrade: {value: () => store.state.stat.school_highestGrade.total, secret: true, display: 'grade', cap: 5, milestones: lvl => (lvl + 1) * 3 - 2},
        longestOfflineTime: {value: () => store.state.stat.meta_longestOfflineTime.total, secret: true, display: 'time', cap: 3, milestones: lvl => [SECONDS_PER_DAY * 7, SECONDS_PER_DAY * 30, SECONDS_PER_DAY * 365][lvl]}
    },
    note: [...buildArray(6).map(() => 'g'), ...buildArray(2).map(() => 'system')],
    init() {
        for (const [key, elem] of Object.entries(themes)) {
            store.commit('system/initTheme', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries({
            '1.5.8': v1_5_8,
            '1.5.7': v1_5_7,
            '1.5.6': v1_5_6,
            '1.5.5': v1_5_5,
            '1.5.4': v1_5_4,
            '1.5.3': v1_5_3,
            '1.5.2': v1_5_2,
            '1.5.1': v1_5_1,
            '1.5.0': v1_5_0,
            '1.4.2': v1_4_2,
            '1.4.1': v1_4_1,
            '1.4.0': v1_4_0,
            '1.3.6': v1_3_6,
            '1.3.5': v1_3_5,
            '1.3.4': v1_3_4,
            '1.3.3': v1_3_3,
            '1.3.2': v1_3_2,
            '1.3.1': v1_3_1,
            '1.3.0': v1_3_0,
            '1.2.0': v1_2_0,
            '1.1.2': v1_1_2,
            '1.1.1': v1_1_1,
            '1.1.0': v1_1_0,
            '1.0.1': v1_0_1,
            '1.0.0': v1_0_0,
        })) {
            store.commit('system/initPatchnote', {name: key, ...elem});
        }
        for (const [key, elem] of Object.entries({
            miningDepth: {
                screen: 'mining',
                delay: 3,
                cssDesktop: 'top: 135px; left: calc(12.5% - 2px);',
                cssTablet: 'top: 135px; left: calc(50% - 2px);',
                cssMobile: 'top: 127px; left: calc(50% - 2px);'
            },
            miningUpgrade: {
                screen: 'mining',
                enableCondition: () => store.state.stat.mining_maxDepth0.total >= 5,
                delay: 0,
                cssDesktop: 'top: 296px; right: 12px;',
                cssTablet: 'top: 92px; left: calc(75% - 36px);',
                cssMobile: 'top: 84px; left: calc(83.3333% - 36px);'
            },
            viewFeature: {
                enableCondition: () => store.state.unlock.gemFeature.see,
                delay: 5,
                cssDesktop: 'top: 30px; left: 100px; rotate: -30deg;',
                cssTablet: 'top: 30px; left: 100px; rotate: -30deg;',
                cssMobile: 'top: 26px; left: 12px; rotate: -30deg;'
            },
            villageJob: {
                screen: 'village',
                delay: 3,
                cssDesktop: 'top: 208px; left: calc(50% - 107px);',
                cssTablet: 'top: 208px; right: 107px;',
                cssMobile: 'top: 84px; left: calc(37.5% - 36px);'
            }
        })) {
            store.commit('system/initTutorial', {name: key, ...elem});
        }
    }
}
