import store from "../../../../store";
import { buildNum } from "../../../utils/format";

export default {
    moonglow: {type: 'cinders', price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1000, lvl) * buildNum(1, 'M'))};
    }, effect: [
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => Math.pow(3, lvl)}
    ]},

    // 25 + 50x milestones
    burningFly: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_firefly.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.15, lvl >= 1 ? (lvl * 50) : 25) * 5000)};
    }, effect: [
        {name: 'cindersProductionFirefly', type: 'base', value: lvl => lvl < 2 ? [0, 1][lvl] : 4},
        {name: 'cindersProductionFirefly', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    moreSpores: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_glowshroom.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.16, lvl >= 1 ? (lvl * 50) : 25) * buildNum(250, 'M'))};
    }, effect: [
        {name: 'cindersProductionGlowshroom', type: 'base', value: lvl => lvl < 2 ? [0, 60][lvl] : 225},
        {name: 'cindersProductionGlowshroom', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    fins: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_glowfish.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.17, lvl >= 1 ? (lvl * 50) : 25) * buildNum(15, 'T'))};
    }, effect: [
        {name: 'cindersProductionGlowfish', type: 'base', value: lvl => lvl < 2 ? [0, 3500][lvl] : buildNum(14, 'K')},
        {name: 'cindersProductionGlowfish', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    lamppost: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_lantern.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.18, lvl >= 1 ? (lvl * 50) : 25) * buildNum(1.2, 'Qi'))};
    }, effect: [
        {name: 'cindersProductionLantern', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(150, 'K')][lvl] : buildNum(600, 'K')},
        {name: 'cindersProductionLantern', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    campfireStories: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_campfire.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.19, lvl >= 1 ? (lvl * 50) : 25) * buildNum(120, 'Sx'))};
    }, effect: [
        {name: 'cindersProductionCampfire', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(10, 'M')][lvl] : buildNum(40, 'M')},
        {name: 'cindersProductionCampfire', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    sponge: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_coral.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.2, lvl >= 1 ? (lvl * 50) : 25) * buildNum(18, 'O'))};
    }, effect: [
        {name: 'cindersProductionCoral', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(700, 'M')][lvl] : buildNum(2.2, 'B')},
        {name: 'cindersProductionCoral', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    longerTentacles: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_jellyfish.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.25, lvl >= 1 ? (lvl * 50) : 25) * buildNum(3.6, 'D'))};
    }, effect: [
        {name: 'cindersProductionJellyfish', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(30, 'B')][lvl] : buildNum(120, 'B')},
        {name: 'cindersProductionJellyfish', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    nightTime: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_nightbloom.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.3, lvl >= 1 ? (lvl * 50) : 25) * buildNum(900, 'UD'))};
    }, effect: [
        {name: 'cindersProductionNightbloom', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(1.1, 'T')][lvl] : buildNum(4.5, 'T')},
        {name: 'cindersProductionNightbloom', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    city: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_neonlight.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.35, lvl >= 1 ? (lvl * 50) : 25) * buildNum(270, 'TD'))};
    }, effect: [
        {name: 'cindersProductionNeonlight', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(30, 'T')][lvl] : buildNum(110, 'T')},
        {name: 'cindersProductionNeonlight', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},
    moreHelium: {type: 'cinders', requirement(lvl) {
        return store.state.upgrade.item.event_sun.level >= store.getters['mult/get']('cindersUpgradeProducerRequirement', lvl >= 1 ? (lvl * 50) : 25);
    }, price(lvl) {
        return {event_light: store.getters['mult/get']('cindersUpgradeLightCost', Math.pow(1.5, lvl >= 1 ? (lvl * 50) : 25) * buildNum(135, 'QiD'))};
    }, effect: [
        {name: 'cindersProductionSun', type: 'base', value: lvl => lvl < 2 ? [0, buildNum(1, 'Qa')][lvl] : buildNum(4, 'Qa')},
        {name: 'cindersProductionSun', type: 'mult', value: lvl => lvl > 2 ? Math.pow(5, lvl - 2) : null}
    ]},

    // soot upgrades
    furiousFly: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_firefly.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 4 + 20};
    }, effect: [
        {name: 'cindersProductionFirefly', type: 'base', value: lvl => lvl * 2}
    ]},
    mycelium: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_glowshroom.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 5 + 25};
    }, effect: [
        {name: 'cindersProductionGlowshroom', type: 'base', value: lvl => lvl * 60}
    ]},
    gills: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_glowfish.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 6 + 30};
    }, effect: [
        {name: 'cindersProductionGlowfish', type: 'base', value: lvl => lvl * 4300}
    ]},
    dimmer: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_lantern.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 7 + 35};
    }, effect: [
        {name: 'cindersProductionLantern', type: 'base', value: lvl => lvl * buildNum(160, 'K')}
    ]},
    marshmallows: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_campfire.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 8 + 40};
    }, effect: [
        {name: 'cindersProductionCampfire', type: 'base', value: lvl => lvl * buildNum(10.4, 'M')}
    ]},
    anemone: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_coral.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 9 + 45};
    }, effect: [
        {name: 'cindersProductionCoral', type: 'base', value: lvl => lvl * buildNum(600, 'M')}
    ]},
    toxin: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_jellyfish.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 10 + 50};
    }, effect: [
        {name: 'cindersProductionJellyfish', type: 'base', value: lvl => lvl * buildNum(31, 'B')}
    ]},
    fullMoon: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_nightbloom.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 11 + 55};
    }, effect: [
        {name: 'cindersProductionNightbloom', type: 'base', value: lvl => lvl * buildNum(1.2, 'T')}
    ]},
    ads: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_neonlight.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 12 + 60};
    }, effect: [
        {name: 'cindersProductionNeonlight', type: 'base', value: lvl => lvl * buildNum(30, 'T')}
    ]},
    lessDistance: {type: 'cinders', cap: 6, requirement() {
        return store.state.upgrade.item.event_sun.level > 0;
    }, price(lvl) {
        return {event_soot: lvl * 13 + 65};
    }, effect: [
        {name: 'cindersProductionSun', type: 'base', value: lvl => lvl * buildNum(1, 'Qa')}
    ]},

    // enlightenments
    fireflyEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_firefly.level > 0;
    }, price() {
        return {gem_topaz: 400};
    }, effect: [
        {name: 'cindersProductionFirefly', type: 'mult', value: lvl => lvl >= 1 ? 10 : null}
    ]},
    glowshroomEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_glowshroom.level > 0;
    }, price() {
        return {gem_topaz: 500};
    }, effect: [
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    glowfishEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_glowfish.level > 0;
    }, price() {
        return {gem_topaz: 600};
    }, effect: [
        {name: 'cindersFirstProducerCost', type: 'mult', value: lvl => lvl >= 1 ? 0.25 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    lanternEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_lantern.level > 0;
    }, price() {
        return {gem_topaz: 700};
    }, effect: [
        {name: 'currencyEventSootGain', type: 'mult', value: lvl => lvl >= 1 ? 2 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    campfireEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_campfire.level > 0;
    }, price() {
        return {gem_topaz: 800};
    }, effect: [
        {name: 'currencyEventCindersTokenGain', type: 'mult', value: lvl => lvl >= 1 ? 1.05 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    coralEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_coral.level > 0;
    }, price() {
        return {gem_topaz: 900};
    }, effect: [
        {name: 'cindersUpgradeProducerRequirement', type: 'base', value: lvl => lvl >= 1 ? -10 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    jellyfishEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_jellyfish.level > 0;
    }, price() {
        return {gem_topaz: 1000};
    }, effect: [
        {name: 'cindersCandlePower', type: 'mult', value: lvl => lvl >= 1 ? 2 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    nightbloomEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_nightbloom.level > 0;
    }, price() {
        return {gem_topaz: 1100};
    }, effect: [
        {name: 'cindersNonFirstProducerCost', type: 'mult', value: lvl => lvl >= 1 ? 0.5 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    neonlightEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_neonlight.level > 0;
    }, price() {
        return {gem_topaz: 1200};
    }, effect: [
        {name: 'cindersUpgradeLightCost', type: 'mult', value: lvl => lvl >= 1 ? 0.5 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]},
    sunEnlightened: {type: 'cinders', cap: 1, requirement() {
        return store.state.upgrade.item.event_sun.level > 0;
    }, price() {
        return {gem_topaz: 1300};
    }, effect: [
        {name: 'cindersProductionFirefly', type: 'mult', value: lvl => lvl >= 1 ? 2 : null},
        {name: 'cindersProductionGlowshroom', type: 'mult', value: lvl => lvl >= 1 ? 1.9 : null},
        {name: 'cindersProductionGlowfish', type: 'mult', value: lvl => lvl >= 1 ? 1.8 : null},
        {name: 'cindersProductionLantern', type: 'mult', value: lvl => lvl >= 1 ? 1.7 : null},
        {name: 'cindersProductionCampfire', type: 'mult', value: lvl => lvl >= 1 ? 1.6 : null},
        {name: 'cindersProductionCoral', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null},
        {name: 'cindersProductionJellyfish', type: 'mult', value: lvl => lvl >= 1 ? 1.4 : null},
        {name: 'cindersProductionNightbloom', type: 'mult', value: lvl => lvl >= 1 ? 1.3 : null},
        {name: 'cindersProductionNeonlight', type: 'mult', value: lvl => lvl >= 1 ? 1.2 : null},
        {name: 'cindersProductionSun', type: 'mult', value: lvl => lvl >= 1 ? 1.1 : null},
        {name: 'currencyEventLightGain', type: 'mult', value: lvl => lvl >= 1 ? 1.5 : null}
    ]}
}
