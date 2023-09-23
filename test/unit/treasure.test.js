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
