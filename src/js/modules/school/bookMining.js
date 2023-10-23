import store from "../../../store";

export default {
    bookAluminiumHardening: {type: 'book', raiseOtherCap: 'mining_aluminiumHardening', requirement() {
        return store.state.upgrade.item.mining_aluminiumHardening.highestLevel >= 6;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 7)};
    }, effect: [
        {name: 'upgradeMiningAluminiumHardeningCap', type: 'base', value: lvl => lvl}
    ]},
    bookAluminiumTanks: {type: 'book', raiseOtherCap: 'mining_aluminiumTanks', requirement() {
        return store.state.upgrade.item.mining_aluminiumTanks.highestLevel >= 8;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 5)};
    }, effect: [
        {name: 'upgradeMiningAluminiumTanksCap', type: 'base', value: lvl => lvl}
    ]},
    bookRefinery: {type: 'book', raiseOtherCap: 'mining_refinery', requirement() {
        return store.state.upgrade.item.mining_refinery.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 40)};
    }, effect: [
        {name: 'upgradeMiningRefineryCap', type: 'base', value: lvl => lvl}
    ]},
    bookFurnace: {type: 'book', raiseOtherCap: 'mining_furnace', requirement() {
        return store.state.upgrade.item.mining_furnace.highestLevel >= 25;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 60)};
    }, effect: [
        {name: 'upgradeMiningFurnaceCap', type: 'base', value: lvl => lvl}
    ]},
    bookIronExpansion: {type: 'book', raiseOtherCap: 'mining_ironExpansion', requirement() {
        return store.state.upgrade.item.mining_ironExpansion.highestLevel >= 3;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 120)};
    }, effect: [
        {name: 'upgradeMiningIronExpansionCap', type: 'base', value: lvl => lvl}
    ]},
    bookMagnet: {type: 'book', raiseOtherCap: 'mining_magnet', requirement() {
        return store.state.upgrade.item.mining_magnet.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 160)};
    }, effect: [
        {name: 'upgradeMiningMagnetCap', type: 'base', value: lvl => lvl}
    ]},
    bookMetalDetector: {type: 'book', raiseOtherCap: 'mining_metalDetector', requirement() {
        return store.state.upgrade.item.mining_metalDetector.highestLevel >= 12;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 250)};
    }, effect: [
        {name: 'upgradeMiningMetalDetectorCap', type: 'base', value: lvl => lvl}
    ]},
}
