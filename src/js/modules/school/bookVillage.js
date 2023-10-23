import store from "../../../store";

export default {
    bookWallet: {type: 'book', raiseOtherCap: 'village_wallet', requirement() {
        return store.state.upgrade.item.village_wallet.highestLevel >= 12;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 10)};
    }, effect: [
        {name: 'upgradeVillageWalletCap', type: 'base', value: lvl => lvl * 2}
    ]},
    bookResourceBag: {type: 'book', raiseOtherCap: 'village_resourceBag', requirement() {
        return store.state.upgrade.item.village_resourceBag.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 15)};
    }, effect: [
        {name: 'upgradeVillageResourceBagCap', type: 'base', value: lvl => lvl * 2}
    ]},
    bookMetalBag: {type: 'book', raiseOtherCap: 'village_metalBag', requirement() {
        return store.state.upgrade.item.village_metalBag.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 16)};
    }, effect: [
        {name: 'upgradeVillageMetalBagCap', type: 'base', value: lvl => lvl}
    ]},
    bookTreasury: {type: 'book', raiseOtherCap: 'village_treasury', requirement() {
        return store.state.upgrade.item.village_treasury.highestLevel >= 10;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 30)};
    }, effect: [
        {name: 'upgradeVillageTreasuryCap', type: 'base', value: lvl => lvl}
    ]},
    bookStorage: {type: 'book', raiseOtherCap: 'village_storage', requirement() {
        return store.state.upgrade.item.village_storage.highestLevel >= 20;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 90)};
    }, effect: [
        {name: 'upgradeVillageStorageCap', type: 'base', value: lvl => lvl}
    ]},
    bookShed: {type: 'book', raiseOtherCap: 'village_shed', requirement() {
        return store.state.upgrade.item.village_shed.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 110)};
    }, effect: [
        {name: 'upgradeVillageShedCap', type: 'base', value: lvl => lvl}
    ]},
    bookSchool: {type: 'book', raiseOtherCap: 'village_school', requirement() {
        return store.state.upgrade.item.village_school.highestLevel >= 5;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 180)};
    }, effect: [
        {name: 'upgradeVillageSchoolCap', type: 'base', value: lvl => lvl}
    ]},
    bookBigStorage: {type: 'book', raiseOtherCap: 'village_bigStorage', requirement() {
        return store.state.upgrade.item.village_bigStorage.highestLevel >= 20;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 480)};
    }, effect: [
        {name: 'upgradeVillageBigStorageCap', type: 'base', value: lvl => lvl}
    ]},
}
