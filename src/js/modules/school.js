import store from "../../store";
import { MINUTES_PER_HOUR, SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";
import upgradePremium from "./school/upgradePremium";

export default {
    name: 'school',
    tickspeed: 60,
    unlockNeeded: 'schoolFeature',
    tick(minutes, oldTime, newTime) {
        store.dispatch('currency/gain', {feature: 'school', name: 'book', amount: store.getters['mult/get']('currencySchoolBookGain', store.getters['school/subjectsBookGain']) * minutes / MINUTES_PER_HOUR});
        store.dispatch('note/find', 'school_2');
        const dayDiff = Math.floor(newTime / SECONDS_PER_DAY) - Math.floor(oldTime / SECONDS_PER_DAY);
        if (dayDiff > 0) {
            store.dispatch('currency/gain', {feature: 'school', name: 'examPass', amount: dayDiff}, {root: true});
        }
    },
    unlock: ['schoolFeature', 'schoolLiteratureSubfeature', 'schoolHistorySubfeature', 'schoolArtSubfeature'],
    stat: {
        highestGrade: {display: 'grade'}
    },
    currency: {
        book: {color: 'brown', icon: 'mdi-book', gainMult: {display: 'perHour'}, showGainMult: true, gainTimerFunction() {
            return store.getters['mult/get']('currencySchoolBookGain', store.getters['school/subjectsBookGain']);
        }},
        goldenDust: {color: 'amber', icon: 'mdi-timer-sand', overcapMult: 0, capMult: {baseValue: buildNum(10, 'K')}},
        examPass: {color: 'pale-blue', icon: 'mdi-ticket-account'}
    },
    upgrade: upgradePremium,
    note: buildArray(5).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries({
            math: {scoreGoal: 12},
            literature: {unlock: 'schoolLiteratureSubfeature', scoreGoal: 8},
            history: {unlock: 'schoolHistorySubfeature', scoreGoal: 5},
            art: {unlock: 'schoolArtSubfeature', scoreGoal: 10}
        })) {
            store.commit('school/init', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {};
        for (const [key, elem] of Object.entries(store.state.school)) {
            if (elem.grade > 0 || elem.progress > 0) {
                obj[key] = [elem.grade, elem.currentGrade, elem.progress];
            }
        }
        return obj;
    },
    loadGame(data) {
        for (const [key, elem] of Object.entries(data)) {
            if (store.state.school[key] !== undefined) {
                store.commit('school/updateKey', {name: key, key: 'grade', value: elem[0]});
                store.commit('school/updateKey', {name: key, key: 'currentGrade', value: elem[1]});
                store.commit('school/updateKey', {name: key, key: 'progress', value: elem[2]});
            }
        }
    }
}
