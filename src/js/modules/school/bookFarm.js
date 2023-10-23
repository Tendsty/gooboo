import store from "../../../store";

export default {
    bookSmallCrate: {type: 'book', raiseOtherCap: 'farm_smallCrate', requirement() {
        return store.state.upgrade.item.farm_smallCrate.highestLevel >= 7;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 72)};
    }, effect: [
        {name: 'upgradeFarmSmallCrateCap', type: 'base', value: lvl => lvl}
    ]},
    bookScarecrow: {type: 'book', raiseOtherCap: 'farm_scarecrow', requirement() {
        return store.state.upgrade.item.farm_scarecrow.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 96)};
    }, effect: [
        {name: 'upgradeFarmScarecrowCap', type: 'base', value: lvl => lvl}
    ]},
    bookShed: {type: 'book', raiseOtherCap: 'farm_shed', requirement() {
        return store.state.upgrade.item.farm_shed.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 144)};
    }, effect: [
        {name: 'upgradeFarmShedCap', type: 'base', value: lvl => lvl}
    ]},
    bookMediumCrate: {type: 'book', raiseOtherCap: 'farm_mediumCrate', requirement() {
        return store.state.upgrade.item.farm_mediumCrate.highestLevel >= 8;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 185)};
    }, effect: [
        {name: 'upgradeFarmMediumCrateCap', type: 'base', value: lvl => lvl}
    ]},
    bookInsectParadise: {type: 'book', raiseOtherCap: 'farm_insectParadise', requirement() {
        return store.state.upgrade.item.farm_insectParadise.highestLevel >= 6;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 330)};
    }, effect: [
        {name: 'upgradeFarmInsectParadiseCap', type: 'base', value: lvl => lvl}
    ]},
    bookBigCrate: {type: 'book', raiseOtherCap: 'farm_bigCrate', requirement() {
        return store.state.upgrade.item.farm_bigCrate.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.25, lvl) * (lvl + 5) * 525)};
    }, effect: [
        {name: 'upgradeFarmBigCrateCap', type: 'base', value: lvl => lvl}
    ]},
}
