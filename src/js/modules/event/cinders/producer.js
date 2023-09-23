import store from "../../../../store";
import { buildNum } from "../../../utils/format";

export default {
    firefly: {type: 'cindersProducer', icon: 'mdi-bee', price(lvl) {
        return lvl > 0 ? {event_light: store.getters['mult/get']('cindersNonFirstProducerCost', 1000 * Math.pow(1.15, lvl))} : {};
    }},
    glowshroom: {type: 'cindersProducer', icon: 'mdi-mushroom', requirement() {
        return store.state.upgrade.item.event_firefly.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(50, 'M') * Math.pow(1.16, lvl))};
    }},
    glowfish: {type: 'cindersProducer', icon: 'mdi-fish', requirement() {
        return store.state.upgrade.item.event_glowshroom.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(3, 'T') * Math.pow(1.17, lvl))};
    }},
    lantern: {type: 'cindersProducer', icon: 'mdi-lamp', requirement() {
        return store.state.upgrade.item.event_glowfish.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(240, 'Qa') * Math.pow(1.18, lvl))};
    }},
    campfire: {type: 'cindersProducer', icon: 'mdi-campfire', requirement() {
        return store.state.upgrade.item.event_lantern.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(24, 'Sx') * Math.pow(1.19, lvl))};
    }},
    coral: {type: 'cindersProducer', icon: 'mdi-spa', requirement() {
        return store.state.upgrade.item.event_campfire.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(3.6, 'O') * Math.pow(1.2, lvl))};
    }},
    jellyfish: {type: 'cindersProducer', icon: 'mdi-jellyfish', requirement() {
        return store.state.upgrade.item.event_coral.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(720, 'N') * Math.pow(1.25, lvl))};
    }},
    nightbloom: {type: 'cindersProducer', icon: 'mdi-flower', requirement() {
        return store.state.upgrade.item.event_jellyfish.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(180, 'UD') * Math.pow(1.3, lvl))};
    }},
    neonlight: {type: 'cindersProducer', icon: 'mdi-ruler', requirement() {
        return store.state.upgrade.item.event_nightbloom.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(54, 'TD') * Math.pow(1.35, lvl))};
    }},
    sun: {type: 'cindersProducer', icon: 'mdi-white-balance-sunny', requirement() {
        return store.state.upgrade.item.event_neonlight.level > 0;
    }, price(lvl) {
        return {event_light: store.getters['mult/get'](lvl > 0 ? 'cindersNonFirstProducerCost' : 'cindersFirstProducerCost', buildNum(27, 'QiD') * Math.pow(1.5, lvl))};
    }}
}
