import store from '../../src/store';

// get a clean store state
beforeEach(() => {
    store.state.unlock = {};
});

test('an unlock is locked by default', () => {
    store.commit('unlock/init', 'test');

    expect(store.state.unlock.test.see).toBe(false);
    expect(store.state.unlock.test.use).toBe(false);
});

test('an unlocked unlock can be seen and used', () => {
    store.commit('unlock/init', 'test');
    store.commit('unlock/unlock', 'test');

    expect(store.state.unlock.test.see).toBe(true);
    expect(store.state.unlock.test.use).toBe(true);
});

test('a reset unlock can be seen, but not used', () => {
    store.commit('unlock/init', 'test');
    store.commit('unlock/unlock', 'test');
    store.commit('unlock/reset', 'test');

    expect(store.state.unlock.test.see).toBe(true);
    expect(store.state.unlock.test.use).toBe(false);
});

test('a reset unlock that was never unlocked can neither be seen nor used', () => {
    store.commit('unlock/init', 'test');
    store.commit('unlock/reset', 'test');

    expect(store.state.unlock.test.see).toBe(false);
    expect(store.state.unlock.test.use).toBe(false);
});

test('an locked unlock can neither be seen nor used', () => {
    store.commit('unlock/init', 'test');
    store.commit('unlock/unlock', 'test');
    store.commit('unlock/lock', 'test');

    expect(store.state.unlock.test.see).toBe(false);
    expect(store.state.unlock.test.use).toBe(false);
});
