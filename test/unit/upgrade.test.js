import store from '../../src/store';

// get a clean store state
beforeEach(() => {
    store.state.currency = {};
    store.state.upgrade.item = {};
    store.state.upgrade.queue = {};
    store.state.upgrade.cache = {};

    store.dispatch('currency/init', {name: 'test'});
});

test('an upgrade can be created and has default values', () => {
    store.dispatch('upgrade/init', {name: 'test'});

    expect(store.state.upgrade.item.meta_test.feature).toBe('meta');
    expect(store.state.upgrade.item.meta_test.subfeature).toBe(0);
    expect(store.state.upgrade.item.meta_test.type).toBe('regular');
    expect(store.state.upgrade.item.meta_test.subtype).toBe(null);
    expect(store.state.upgrade.item.meta_test.icon).toBe(null);
    expect(store.state.upgrade.item.meta_test.mode).toBe('instant');
    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(0);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.state.upgrade.item.meta_test.cap).toBe(null);
    expect(store.state.upgrade.item.meta_test.requirement()).toBe(true);
    expect(store.state.upgrade.item.meta_test.requirementStat).toBe(null);
    expect(store.state.upgrade.item.meta_test.requirementValue).toBe(null);
    expect(store.state.upgrade.item.meta_test.price()).toEqual({});
    expect(store.state.upgrade.item.meta_test.effect).toEqual([]);
    expect(store.state.upgrade.item.meta_test.timeNeeded()).toBe(1);
    expect(store.state.upgrade.item.meta_test.timeProgress).toBe(0);
    expect(store.state.upgrade.item.meta_test.persistent).toBe(false);
    expect(store.state.upgrade.item.meta_test.collapse).toBe(false);
    expect(store.state.upgrade.item.meta_test.note).toBe(null);
    expect(store.state.upgrade.item.meta_test.hideCap).toBe(false);
});

test('an upgrade can be bought', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 50});
    store.dispatch('upgrade/init', {name: 'test', price(lvl) {
        return {meta_test: Math.pow(2, lvl) * 10};
    }, effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(0);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 10});
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(50, 5);

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(1);
    expect(store.state.upgrade.item.meta_test.bought).toBe(1);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(1);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 20});
    expect(store.getters['mult/get']('test')).toBeCloseTo(1, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(40, 5);

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(2);
    expect(store.state.upgrade.item.meta_test.bought).toBe(2);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(2);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 40});
    expect(store.getters['mult/get']('test')).toBeCloseTo(2, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(20, 5);

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(2);
    expect(store.state.upgrade.item.meta_test.bought).toBe(2);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(2);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 40});
    expect(store.getters['mult/get']('test')).toBeCloseTo(2, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(20, 5);
});

test('an upgrade can be bought max', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 100});
    store.dispatch('upgrade/init', {name: 'test', price(lvl) {
        return {meta_test: Math.pow(2, lvl) * 10};
    }, effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});

    store.dispatch('upgrade/buyMax', {name: 'test', feature: 'meta'});
    expect(store.state.upgrade.item.meta_test.level).toBe(3);
    expect(store.getters['mult/get']('test')).toBeCloseTo(3, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(30, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 300});

    store.dispatch('upgrade/buyMax', {name: 'test', feature: 'meta'});
    expect(store.state.upgrade.item.meta_test.level).toBe(5);
    expect(store.getters['mult/get']('test')).toBeCloseTo(5, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(90, 5);
});

test('an upgrade can be in queue mode', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 50});
    store.dispatch('upgrade/init', {name: 'test', mode: 'queue', price(lvl) {
        return {meta_test: Math.pow(2, lvl) * 10};
    }, effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(0);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 10});
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(50, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual([]);

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(1);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 20});
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(40, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual(['meta_test']);

    store.dispatch('upgrade/tickQueue', {key: 'meta_regular', seconds: 1});

    expect(store.state.upgrade.item.meta_test.level).toBe(1);
    expect(store.state.upgrade.item.meta_test.bought).toBe(1);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(1);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 20});
    expect(store.getters['mult/get']('test')).toBeCloseTo(1, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(40, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual([]);
});

test('the upgrade queue ticks in order', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('upgrade/init', {name: 'aaa', mode: 'queue', effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});
    store.dispatch('upgrade/init', {name: 'bbb', mode: 'queue', effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 10}
    ]});
    store.dispatch('upgrade/init', {name: 'ccc', mode: 'queue', effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 100}
    ]});

    store.dispatch('upgrade/buy', {name: 'aaa', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'bbb', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'ccc', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'aaa', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'aaa', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'bbb', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'ccc', feature: 'meta'});

    expect(store.state.upgrade.queue.meta_regular).toEqual(['meta_aaa', 'meta_bbb', 'meta_ccc', 'meta_aaa', 'meta_aaa', 'meta_bbb', 'meta_ccc']);

    store.dispatch('upgrade/tickQueue', {key: 'meta_regular', seconds: 1});

    expect(store.state.upgrade.item.meta_aaa.level).toBe(1);
    expect(store.state.upgrade.item.meta_bbb.level).toBe(0);
    expect(store.state.upgrade.item.meta_ccc.level).toBe(0);
    expect(store.getters['mult/get']('test')).toBeCloseTo(1, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual(['meta_bbb', 'meta_ccc', 'meta_aaa', 'meta_aaa', 'meta_bbb', 'meta_ccc']);

    store.dispatch('upgrade/tickQueue', {key: 'meta_regular', seconds: 2});

    expect(store.state.upgrade.item.meta_aaa.level).toBe(1);
    expect(store.state.upgrade.item.meta_bbb.level).toBe(1);
    expect(store.state.upgrade.item.meta_ccc.level).toBe(1);
    expect(store.getters['mult/get']('test')).toBeCloseTo(111, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual(['meta_aaa', 'meta_aaa', 'meta_bbb', 'meta_ccc']);

    store.dispatch('upgrade/tickQueue', {key: 'meta_regular', seconds: 100});

    expect(store.state.upgrade.item.meta_aaa.level).toBe(3);
    expect(store.state.upgrade.item.meta_bbb.level).toBe(2);
    expect(store.state.upgrade.item.meta_ccc.level).toBe(2);
    expect(store.getters['mult/get']('test')).toBeCloseTo(223, 5);
    expect(store.state.upgrade.queue.meta_regular).toEqual([]);
});

test('an upgrade can be in delay mode', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 50});
    store.dispatch('upgrade/init', {name: 'test', mode: 'delay', price(lvl) {
        return {meta_test: Math.pow(2, lvl) * 10};
    }, effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(0);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 10});
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(50, 5);

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_test.bought).toBe(1);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(0);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 20});
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(40, 5);

    store.dispatch('upgrade/tickDelay', {feature: 'meta', type: 'regular', seconds: 1});

    expect(store.state.upgrade.item.meta_test.level).toBe(1);
    expect(store.state.upgrade.item.meta_test.bought).toBe(1);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(1);
    expect(store.getters['upgrade/priceList']('meta', 'test')).toEqual({meta_test: 20});
    expect(store.getters['mult/get']('test')).toBeCloseTo(1, 5);
    expect(store.state.currency.meta_test.value).toBeCloseTo(40, 5);
});

test('upgrades can be reset by type and feature', () => {
    store.commit('mult/init', {name: 'test'});

    store.dispatch('upgrade/init', {name: 'test', effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});
    store.dispatch('upgrade/init', {name: 'foo', type: 'other', effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 10}
    ]});
    store.dispatch('upgrade/init', {name: 'bar', feature: 'other', effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 100}
    ]});

    store.dispatch('upgrade/buy', {name: 'test', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'foo', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'bar', feature: 'other'});

    expect(store.state.upgrade.item.meta_test.level).toBe(1);
    expect(store.state.upgrade.item.meta_foo.level).toBe(1);
    expect(store.state.upgrade.item.other_bar.level).toBe(1);
    expect(store.getters['mult/get']('test')).toBeCloseTo(111, 5);

    store.dispatch('upgrade/reset', {type: 'regular', feature: 'meta'});

    expect(store.state.upgrade.item.meta_test.level).toBe(0);
    expect(store.state.upgrade.item.meta_foo.level).toBe(1);
    expect(store.state.upgrade.item.other_bar.level).toBe(1);
    expect(store.state.upgrade.item.meta_test.bought).toBe(0);
    expect(store.state.upgrade.item.meta_test.highestLevel).toBe(1);
    expect(store.getters['mult/get']('test')).toBeCloseTo(110, 5);

    store.dispatch('upgrade/reset', {type: 'other', feature: 'meta'});

    expect(store.state.upgrade.item.meta_foo.level).toBe(0);
    expect(store.getters['mult/get']('test')).toBeCloseTo(100, 5);

    store.dispatch('upgrade/reset', {type: 'regular', feature: 'other'});

    expect(store.state.upgrade.item.other_bar.level).toBe(0);
    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
});

test('upgrades can be made persistent to avoid reset', () => {
    store.commit('mult/init', {name: 'test'});

    store.dispatch('upgrade/init', {name: 'aaa', effect: [
        {name: 'test', type: 'base', value: lvl => lvl}
    ]});
    store.dispatch('upgrade/init', {name: 'bbb', persistent: true, effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 10}
    ]});
    store.dispatch('upgrade/init', {name: 'ccc', effect: [
        {name: 'test', type: 'base', value: lvl => lvl * 100}
    ]});

    store.dispatch('upgrade/buy', {name: 'aaa', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'bbb', feature: 'meta'});
    store.dispatch('upgrade/buy', {name: 'ccc', feature: 'meta'});

    expect(store.state.upgrade.item.meta_aaa.level).toBe(1);
    expect(store.state.upgrade.item.meta_bbb.level).toBe(1);
    expect(store.state.upgrade.item.meta_ccc.level).toBe(1);
    expect(store.getters['mult/get']('test')).toBeCloseTo(111, 5);

    store.dispatch('upgrade/makePersistent', 'meta_ccc');
    store.dispatch('upgrade/reset', {type: 'regular', feature: 'meta'});

    expect(store.state.upgrade.item.meta_aaa.level).toBe(0);
    expect(store.state.upgrade.item.meta_bbb.level).toBe(1);
    expect(store.state.upgrade.item.meta_ccc.level).toBe(1);
    expect(store.getters['mult/get']('test')).toBeCloseTo(110, 5);
});
