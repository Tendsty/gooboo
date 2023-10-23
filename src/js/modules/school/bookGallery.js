import store from "../../../store";

export default {
    bookRedPower: {type: 'book', raiseOtherCap: 'gallery_redPower', requirement() {
        return store.state.upgrade.item.gallery_redPower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 60)};
    }, effect: [
        {name: 'upgradeGalleryRedPowerCap', type: 'base', value: lvl => lvl}
    ]},
    bookOrangePower: {type: 'book', raiseOtherCap: 'gallery_orangePower', requirement() {
        return store.state.upgrade.item.gallery_orangePower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 88)};
    }, effect: [
        {name: 'upgradeGalleryOrangePowerCap', type: 'base', value: lvl => lvl}
    ]},
    bookYellowPower: {type: 'book', raiseOtherCap: 'gallery_yellowPower', requirement() {
        return store.state.upgrade.item.gallery_yellowPower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 132)};
    }, effect: [
        {name: 'upgradeGalleryYellowPowerCap', type: 'base', value: lvl => lvl}
    ]},
    bookGreenPower: {type: 'book', raiseOtherCap: 'gallery_greenPower', requirement() {
        return store.state.upgrade.item.gallery_greenPower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 200)};
    }, effect: [
        {name: 'upgradeGalleryGreenPowerCap', type: 'base', value: lvl => lvl}
    ]},
    bookBluePower: {type: 'book', raiseOtherCap: 'gallery_bluePower', requirement() {
        return store.state.upgrade.item.gallery_bluePower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 275)};
    }, effect: [
        {name: 'upgradeGalleryBluePowerCap', type: 'base', value: lvl => lvl}
    ]},
    bookPurplePower: {type: 'book', raiseOtherCap: 'gallery_purplePower', requirement() {
        return store.state.upgrade.item.gallery_purplePower.highestLevel >= 15;
    }, price(lvl) {
        return {school_book: Math.round(Math.pow(1.15, lvl) * (lvl + 5) * 380)};
    }, effect: [
        {name: 'upgradeGalleryPurplePowerCap', type: 'base', value: lvl => lvl}
    ]},
}
