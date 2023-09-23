import store from '../../src/store';

// get a clean store state
beforeEach(() => {
    store.state.stat = {};
});

test('a stat has the value zero by default', () => {
    store.commit('stat/init', {feature: 'test', name: 'test'});

    expect(store.state.stat.test_test.feature).toBe('test');
    expect(store.state.stat.test_test.default).toBe(0);
    expect(store.state.stat.test_test.value).toBe(0);
    expect(store.state.stat.test_test.total).toBe(0);
});

test('default feature is meta', () => {
    store.commit('stat/init', {name: 'test'});

    expect(store.state.stat.meta_test.feature).toBe('meta');
});

test('a stat can have a different default value', () => {
    store.commit('stat/init', {feature: 'test', name: 'test', value: 3});

    expect(store.state.stat.test_test.default).toBe(3);
    expect(store.state.stat.test_test.value).toBe(3);
    expect(store.state.stat.test_test.total).toBe(3);
});

test('a stat can be added to', () => {
    store.commit('stat/init', {feature: 'test', name: 'test'});
    store.commit('stat/add', {feature: 'test', name: 'test', value: 3});

    expect(store.state.stat.test_test.value).toBeCloseTo(3, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(3, 5);

    store.commit('stat/add', {feature: 'test', name: 'test', value: 10});

    expect(store.state.stat.test_test.value).toBeCloseTo(13, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(13, 5);
});

test('a stat can be increased to a specific value', () => {
    store.commit('stat/init', {feature: 'test', name: 'test'});
    store.commit('stat/increaseTo', {feature: 'test', name: 'test', value: 3});

    expect(store.state.stat.test_test.value).toBeCloseTo(3, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(3, 5);

    store.commit('stat/increaseTo', {feature: 'test', name: 'test', value: 10});

    expect(store.state.stat.test_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(10, 5);

    store.commit('stat/increaseTo', {feature: 'test', name: 'test', value: 3});

    expect(store.state.stat.test_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(10, 5);
});

test('a stat can be reset by feature', () => {
    store.commit('stat/init', {feature: 'test', name: 'test'});
    store.commit('stat/init', {feature: 'test', name: 'bar', value: 3});
    store.commit('stat/init', {feature: 'foo', name: 'test'});

    store.commit('stat/add', {feature: 'test', name: 'test', value: 10});
    store.commit('stat/add', {feature: 'test', name: 'bar', value: 5});
    store.commit('stat/increaseTo', {feature: 'foo', name: 'test', value: 10});

    expect(store.state.stat.test_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(10, 5);
    expect(store.state.stat.test_bar.value).toBeCloseTo(8, 5);
    expect(store.state.stat.test_bar.total).toBeCloseTo(8, 5);
    expect(store.state.stat.foo_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.foo_test.total).toBeCloseTo(10, 5);

    store.dispatch('stat/reset', {feature: 'test', type: 'regular'});

    expect(store.state.stat.test_test.value).toBeCloseTo(0, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(10, 5);
    expect(store.state.stat.test_bar.value).toBeCloseTo(3, 5);
    expect(store.state.stat.test_bar.total).toBeCloseTo(8, 5);
    expect(store.state.stat.foo_test.value).toBeCloseTo(10, 5);
    expect(store.state.stat.foo_test.total).toBeCloseTo(10, 5);

    store.commit('stat/add', {feature: 'test', name: 'test', value: 5});
    store.commit('stat/increaseTo', {feature: 'test', name: 'bar', value: 5});
    store.commit('stat/increaseTo', {feature: 'foo', name: 'test', value: 15});

    expect(store.state.stat.test_test.value).toBeCloseTo(5, 5);
    expect(store.state.stat.test_test.total).toBeCloseTo(15, 5);
    expect(store.state.stat.test_bar.value).toBeCloseTo(5, 5);
    expect(store.state.stat.test_bar.total).toBeCloseTo(8, 5);
    expect(store.state.stat.foo_test.value).toBeCloseTo(15, 5);
    expect(store.state.stat.foo_test.total).toBeCloseTo(15, 5);
});
