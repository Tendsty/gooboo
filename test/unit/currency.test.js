import store from '../../src/store';

// get a clean store state
beforeEach(() => {
    store.state.stat = {};
    store.state.currency = {};
});

test('a currency gets its default values and a stat', () => {
    store.dispatch('currency/init', {name: 'test'});

    expect(store.state.currency.meta_test.feature).toBe('meta');
    expect(store.state.currency.meta_test.type).toBe('regular');
    expect(store.state.currency.meta_test.value).toBeCloseTo(0, 5);
    expect(store.state.currency.meta_test.alwaysVisible).toBe(false);
    expect(store.state.currency.meta_test.cap).toBe(null);
    expect(store.state.currency.meta_test.currencyMult).toBe(null);
    expect(store.state.currency.meta_test.overcapMult).toBeCloseTo(0.25, 5);
    expect(store.state.currency.meta_test.overcapScaling).toBeCloseTo(0.5, 5);
    expect(store.state.currency.meta_test.color).toBe('#808080');
    expect(store.state.currency.meta_test.icon).toBe('mdi-sack');

    expect(store.state.stat.meta_test.feature).toBe('meta');
    expect(store.state.stat.meta_test.default).toBe(0);
    expect(store.state.stat.meta_test.value).toBe(0);
    expect(store.state.stat.meta_test.total).toBe(0);
});

test('a currency can be gained', () => {
    store.dispatch('currency/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 10});

    expect(store.state.currency.meta_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.meta_test.value).toBeCloseTo(10, 5);
    expect(store.getters['currency/value']('meta_test')).toBeCloseTo(10, 5);
});

test('a currency can be spent', () => {
    store.dispatch('currency/init', {name: 'test'});
    store.dispatch('currency/gain', {name: 'test', amount: 10});
    store.dispatch('currency/spend', {name: 'test', amount: 6});

    expect(store.state.currency.meta_test.value).toBeCloseTo(4, 5);
    expect(store.getters['currency/value']('meta_test')).toBeCloseTo(4, 5);

    store.dispatch('currency/spendAll', {name: 'test'});

    expect(store.state.currency.meta_test.value).toBe(0);
    expect(store.getters['currency/value']('meta_test')).toBe(0);
});

test('a currency can be reset', () => {
    store.dispatch('currency/init', {feature: 'test', name: 'test'});
    store.dispatch('currency/init', {feature: 'test', name: 'foo', type: 'special'});
    store.dispatch('currency/init', {feature: 'bar', name: 'test'});
    store.dispatch('currency/gain', {feature: 'test', name: 'test', amount: 10});
    store.dispatch('currency/gain', {feature: 'test', name: 'foo', amount: 10});
    store.dispatch('currency/gain', {feature: 'bar', name: 'test', amount: 10});
    store.dispatch('currency/reset', {feature: 'test', type: 'regular'});

    expect(store.state.currency.test_test.value).toBeCloseTo(0, 5);
    expect(store.state.currency.test_foo.value).toBeCloseTo(10, 5);
    expect(store.state.currency.bar_test.value).toBeCloseTo(10, 5);
});

test('a currency value can exceed its cap, but not for the getter', () => {
    store.dispatch('currency/init', {name: 'test', capMult: {baseValue: 100}});
    store.dispatch('currency/gain', {name: 'test', amount: 50});

    expect(store.state.currency.meta_test.value).toBeCloseTo(50, 5);
    expect(store.getters['currency/value']('meta_test')).toBeCloseTo(50, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 100});

    expect(store.state.currency.meta_test.value).toBeCloseTo(112.5, 5);
    expect(store.getters['currency/value']('meta_test')).toBeCloseTo(100, 5);
});

test('a currency cap can be exceeded more than once', () => {
    store.dispatch('currency/init', {name: 'test', capMult: {baseValue: 100}});
    store.dispatch('currency/gain', {name: 'test', amount: 300});

    expect(store.state.currency.meta_test.value).toBeCloseTo(150, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 600});

    expect(store.state.currency.meta_test.value).toBeCloseTo(250, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 1200});

    expect(store.state.currency.meta_test.value).toBeCloseTo(350, 5);
});

test('the overcap values can be changed', () => {
    store.dispatch('currency/init', {name: 'test', capMult: {baseValue: 100}, overcapMult: 0.5, overcapScaling: 0.1});
    store.dispatch('currency/gain', {name: 'test', amount: 200});

    expect(store.state.currency.meta_test.value).toBeCloseTo(150, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 1100});

    expect(store.state.currency.meta_test.value).toBeCloseTo(250, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 11000});

    expect(store.state.currency.meta_test.value).toBeCloseTo(350, 5);
});

test('the cap can be hard by setting overcapMult to zero', () => {
    store.dispatch('currency/init', {name: 'test', capMult: {baseValue: 100}, overcapMult: 0});
    store.dispatch('currency/gain', {name: 'test', amount: 200});

    expect(store.state.currency.meta_test.value).toBeCloseTo(100, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 999999});

    expect(store.state.currency.meta_test.value).toBeCloseTo(100, 5);
});

test('currencies can have a mult that changes based on its value', () => {
    store.commit('mult/init', {name: 'test'});
    store.dispatch('currency/init', {name: 'test', capMult: {baseValue: 100}, currencyMult: {test: {type: 'mult', value: val => val * 0.1 + 1}}});

    expect(store.state.mult.items.test.multValues.currencyMult_meta_test).toBeUndefined();

    store.dispatch('currency/gain', {name: 'test', amount: 50});

    expect(store.state.mult.items.test.multValues.currencyMult_meta_test).toBeCloseTo(6, 5);

    store.dispatch('currency/gain', {name: 'test', amount: 150});

    expect(store.state.mult.items.test.multValues.currencyMult_meta_test).toBeCloseTo(11, 5);

    store.dispatch('currency/spend', {name: 'test', amount: 50});

    expect(store.state.mult.items.test.multValues.currencyMult_meta_test).toBeCloseTo(8.5, 5);

    store.dispatch('currency/spend', {name: 'test', amount: 75});

    expect(store.state.mult.items.test.multValues.currencyMult_meta_test).toBeUndefined();
});

test('currencies can be listed by feature', () => {
    store.dispatch('currency/init', {name: 'aaa'});
    store.dispatch('currency/init', {name: 'bbb', type: 'test'});
    store.dispatch('currency/init', {name: 'ccc', subtype: 'test'});
    store.dispatch('currency/init', {name: 'ddd', feature: 'test'});
    store.dispatch('currency/init', {name: 'eee', feature: 'test', type: 'test', subtype: 'test'});

    expect(store.getters['currency/list']('meta')).toEqual(['meta_aaa', 'meta_bbb', 'meta_ccc']);
    expect(store.getters['currency/list']('test')).toEqual(['test_ddd', 'test_eee']);
    expect(store.getters['currency/list']('meta', 'test')).toEqual(['meta_bbb']);
    expect(store.getters['currency/list']('meta', 'regular', 'test')).toEqual(['meta_ccc']);
});

test('you can check if a price contains a currency type', () => {
    store.dispatch('currency/init', {name: 'test', feature: 'test'});
    store.dispatch('currency/init', {name: 'ruby', feature: 'gem'});
    store.dispatch('currency/init', {name: 'sapphire', feature: 'gem'});
    store.dispatch('currency/init', {name: 'cindersToken', feature: 'event'});

    expect(store.getters['currency/contains']({test_test: 100, gem_ruby: 50, gem_sapphire: 30, event_cindersToken: 10})).toBe(true);
    expect(store.getters['currency/contains']({test_test: 100, gem_ruby: 50, event_cindersToken: 10})).toBe(true);
    expect(store.getters['currency/contains']({test_test: 100, gem_sapphire: 30, event_cindersToken: 10})).toBe(true);
    expect(store.getters['currency/contains']({test_test: 100, event_cindersToken: 10})).toBe(false);
    expect(store.getters['currency/contains']({test_test: 100, gem_ruby: 50, gem_sapphire: 30, event_cindersToken: 10}, 'eventToken')).toBe(true);
    expect(store.getters['currency/contains']({test_test: 100, gem_ruby: 50, gem_sapphire: 30}, 'eventToken')).toBe(false);
});

test('currencies can be filtered by price', () => {
    store.dispatch('currency/init', {name: 'test', feature: 'test'});
    store.dispatch('currency/init', {name: 'ruby', feature: 'gem'});
    store.dispatch('currency/init', {name: 'sapphire', feature: 'gem'});
    store.dispatch('currency/init', {name: 'cindersToken', feature: 'event'});

    const price = {test_test: 100, gem_ruby: 50, gem_sapphire: 30, event_cindersToken: 10};

    expect(store.getters['currency/filterPrice'](price)).toEqual({gem_ruby: 50, gem_sapphire: 30});
    expect(store.getters['currency/filterPrice'](price, 'eventToken')).toEqual({event_cindersToken: 10});
});

test('you can check if you can afford something with currencies', () => {
    store.dispatch('currency/init', {name: 'test'});
    store.dispatch('currency/init', {name: 'other', capMult: {baseValue: 100}});

    store.dispatch('currency/gain', {name: 'test', amount: 50});
    store.dispatch('currency/gain', {name: 'other', amount: 900});

    expect(store.getters['currency/canAfford']({meta_test: 20, meta_other: 50})).toBe(true);
    expect(store.getters['currency/canAfford']({meta_test: 200})).toBe(false);
    expect(store.getters['currency/canAfford']({meta_other: 240})).toBe(true);
    expect(store.getters['currency/canAfford']({meta_other: 260})).toBe(false);

    expect(store.getters['currency/canAfford']({meta_test: 20, meta_other: 50}, {meta_test: 20, meta_other: 50})).toBe(true);
    expect(store.getters['currency/canAfford']({meta_test: 20, meta_other: 250}, {meta_test: 20, meta_other: 100})).toBe(true);
    expect(store.getters['currency/canAfford']({meta_test: 20, meta_other: 250}, {meta_test: 20, meta_other: 110})).toBe(false);
});
