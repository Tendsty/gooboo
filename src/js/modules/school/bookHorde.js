import store from "../../../store";

export default {
    bookTraining: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_training.highestLevel >= 50;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 28)};
    }, effect: [
        {name: 'upgradeHordeTrainingCap', type: 'base', value: lvl => lvl}
    ]},
    bookCooling: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_cooling.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 70)};
    }, effect: [
        {name: 'upgradeHordeCoolingCap', type: 'base', value: lvl => lvl}
    ]},
    bookLuckyStrike: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_luckyStrike.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 85)};
    }, effect: [
        {name: 'upgradeHordeLuckyStrikeCap', type: 'base', value: lvl => lvl}
    ]},
    bookLooting: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_looting.highestLevel >= 50;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 140)};
    }, effect: [
        {name: 'upgradeHordeLootingCap', type: 'base', value: lvl => lvl}
    ]},
    bookSurvivalGuide: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_survivalGuide.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 190)};
    }, effect: [
        {name: 'upgradeHordeSurvivalGuideCap', type: 'base', value: lvl => lvl}
    ]},
    bookCarving: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_carving.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 310)};
    }, effect: [
        {name: 'upgradeHordeCarvingCap', type: 'base', value: lvl => lvl}
    ]},
    bookWhitePaint: {type: 'book', requirement() {
        return store.state.upgrade.item.horde_whitePaint.highestLevel >= 25;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 475)};
    }, effect: [
        {name: 'upgradeHordeWhitePaintCap', type: 'base', value: lvl => lvl}
    ]},
}
