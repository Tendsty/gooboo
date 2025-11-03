import store from "../../store";
import { SECONDS_PER_DAY } from "../constants";
import { buildArray } from "../utils/array";
import bookFarm from "./school/bookFarm";
import bookGallery from "./school/bookGallery";
import bookHorde from "./school/bookHorde";
import bookMining from "./school/bookMining";
import bookVillage from "./school/bookVillage";
import relic from "./school/relic";
import upgradePremium from "./school/upgradePremium";

export default {
    name: 'school',
    tickspeed: 1,
    unlockNeeded: 'schoolFeature',
    tick(seconds, oldTime, newTime) {
        const dayDiff = Math.floor(newTime / SECONDS_PER_DAY) - Math.floor(oldTime / SECONDS_PER_DAY);
        if (dayDiff > 0) {
            store.dispatch('currency/gain', {feature: 'school', name: 'examPass', amount: dayDiff});
        }
        if (store.state.school.bonusDust > 0 && store.state.currency.school_goldenDust.value < store.state.currency.school_goldenDust.cap) {
            const amount = Math.min(seconds, store.state.school.bonusDust, store.state.currency.school_goldenDust.cap - store.state.currency.school_goldenDust.value);
            store.commit('school/updateKey', {key: 'bonusDust', value: store.state.school.bonusDust - amount});
            store.dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount});
        }
    },
    unlock: ['schoolFeature', 'schoolLiteratureSubfeature', 'schoolHistorySubfeature', 'schoolArtSubfeature', 'schoolChemistrySubfeature', 'schoolLibrarySubfeature'],
    stat: {
        highestGrade: {display: 'grade'},
        totalPoints: {display: 'int'},
    },
    mult: {
        schoolBook: {round: true},
        schoolMultipass: {round: true, baseValue: 1},
    },
    currency: {
        goldenDust: {color: 'amber', icon: 'mdi-timer-sand', display: 'int', overcapMult: 0, overcapFunction(amount) {
            store.commit('school/updateKey', {key: 'bonusDust', value: store.state.school.bonusDust + amount});
        }, capMult: {baseValue: 8000}},
        examPass: {color: 'pale-blue', icon: 'mdi-ticket-account', display: 'int'}
    },
    upgrade: upgradePremium,
    relic,
    note: buildArray(5).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries({
            math: {scoreGoal: 14},
            literature: {unlock: 'schoolLiteratureSubfeature', scoreGoal: 8},
            history: {unlock: 'schoolHistorySubfeature', scoreGoal: 8},
            art: {unlock: 'schoolArtSubfeature', scoreGoal: 10},
            chemistry: {unlock: 'schoolChemistrySubfeature', scoreGoal: 100}
        })) {
            store.commit('school/initSubject', {name: key, ...elem});
        }
        for (const [feature, items] of Object.entries({
            mining: bookMining,
            village: bookVillage,
            horde: bookHorde,
            farm: bookFarm,
            gallery: bookGallery,
        })) {
            for (const [key, elem] of Object.entries(items)) {
                store.commit('school/initBook', {name: key, feature, ...elem});
            }
        }
    },
    saveGame() {
        let obj = {
            subject: {}
        };
        for (const [key, elem] of Object.entries(store.state.school.subject)) {
            if (elem.grade > 0 || elem.progress > 0 || elem.pointsTotal > 0) {
                obj.subject[key] = [elem.grade, elem.currentGrade, elem.progress, elem.pointsTotal];
                if (elem.booksSkipped > 0) {
                    obj.subject[key].push(elem.booksSkipped);
                }
            }
        }
        for (const [key, elem] of Object.entries(store.state.school.book)) {
            if (elem.owned) {
                if (obj.books === undefined) {
                    obj.books = [];
                }
                obj.books.push(key);
            }
        }
        if (store.state.school.bonusDust > 0) {
            obj.bonusDust = store.state.school.bonusDust;
        }
        if (store.state.school.multipass > 1) {
            obj.multipass = store.state.school.multipass;
        }
        return obj;
    },
    loadGame(data) {
        if (data.subject) {
            for (const [key, elem] of Object.entries(data.subject)) {
                if (store.state.school.subject[key] !== undefined) {
                    store.commit('school/updateSubjectKey', {name: key, key: 'grade', value: elem[0]});
                    store.commit('school/updateSubjectKey', {name: key, key: 'currentGrade', value: elem[1]});
                    store.commit('school/updateSubjectKey', {name: key, key: 'progress', value: elem[2]});
                    store.commit('school/updateSubjectKey', {name: key, key: 'pointsTotal', value: elem[3]});

                    if (elem.length > 4) {
                        store.commit('school/updateSubjectKey', {name: key, key: 'booksSkipped', value: elem[4]});
                    }

                    store.dispatch('school/applySubjectBooks', key);
                }
            }
        }
        if (data.books) {
            data.books.forEach(elem => {
                store.commit('school/updateBookKey', {name: elem, key: 'owned', value: true});
            });
        }
        if (data.bonusDust) {
            store.commit('school/updateKey', {key: 'bonusDust', value: data.bonusDust});
        }
        if (data.multipass) {
            store.commit('school/updateKey', {key: 'multipass', value: data.multipass});
        }
    }
}
