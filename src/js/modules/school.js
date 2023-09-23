import store from "../../store";
import { SCHOOL_BOOK_BASE_GAIN, SCHOOL_GRADE_DECAY } from "../constants";
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";

const MINUTES_PER_HOUR = 60;

export default {
    name: 'school',
    tickspeed: 60,
    unlockNeeded: 'schoolFeature',
    tick(minutes) {
        let books = 0;
        for (const [key, elem] of Object.entries(store.state.school)) {
            if (elem.unlock === null || store.state.unlock[elem.unlock].see) {
                let minutesLeft = minutes;
                let grade = elem.grade;
                while (grade >= 100 && minutesLeft > 0) {
                    books += (SCHOOL_BOOK_BASE_GAIN + Math.floor(grade / 100)) / MINUTES_PER_HOUR;
                    grade -= SCHOOL_GRADE_DECAY / MINUTES_PER_HOUR;
                    minutesLeft--;
                }
                books += SCHOOL_BOOK_BASE_GAIN * minutesLeft / MINUTES_PER_HOUR;
                grade = Math.max(0, grade - SCHOOL_GRADE_DECAY * minutesLeft / MINUTES_PER_HOUR);
                store.commit('school/updateKey', {name: key, key: 'grade', value: grade});
            }
        }
        if (books > 0) {
            store.dispatch('currency/gain', {feature: 'school', name: 'book', amount: books});
            store.dispatch('note/find', 'school_2');
        }
    },
    unlock: ['schoolFeature', 'schoolLiteratureSubfeature', 'schoolHistorySubfeature', 'schoolArtSubfeature'],
    stat: {
        highestGrade: {display: 'grade'}
    },
    currency: {
        book: {color: 'brown', icon: 'mdi-book'},
        goldenDust: {color: 'amber', icon: 'mdi-timer-sand', overcapMult: 0, capMult: {baseValue: buildNum(10, 'K')}}
    },
    note: buildArray(5).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries({
            math: {},
            literature: {unlock: 'schoolLiteratureSubfeature'},
            history: {unlock: 'schoolHistorySubfeature'},
            art: {unlock: 'schoolArtSubfeature'}
        })) {
            store.commit('school/init', {name: key, ...elem});
        }
    },
    saveGame() {
        let obj = {};
        for (const [key, elem] of Object.entries(store.state.school)) {
            if (elem.elo > 0 || elem.grade > 0) {
                obj[key] = {elo: elem.elo, grade: elem.grade};
            }
        }
        return obj;
    },
    loadGame(data) {
        for (const [key, elem] of Object.entries(data)) {
            if (store.state.school[key] !== undefined) {
                store.commit('school/updateKey', {name: key, key: 'elo', value: elem.elo});
                store.commit('school/updateKey', {name: key, key: 'grade', value: elem.grade});
            }
        }
    }
}
