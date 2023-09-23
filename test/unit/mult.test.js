import store from '../../src/store';

// get a clean store state
beforeEach(() => {
    store.state.mult.items = {};
});

test('a mult has a neutral value by default', () => {
    store.commit('mult/init', {name: 'test'});

    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.getters['mult/get']('test', 1)).toBeCloseTo(1, 5);
});

test('a mult can have a base value', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(5, 5);
    expect(store.getters['mult/get']('test', 1)).toBeCloseTo(6, 5);
    expect(store.getters['mult/get']('test', 0, 2)).toBeCloseTo(10, 5);
    expect(store.getters['mult/get']('test', 0, 2, 2)).toBeCloseTo(12, 5);
});

test('a non-existing mult returns null', () => {
    expect(store.getters['mult/get']('test')).toBe(null);
});

test('a mult can have a minimum value', () => {
    store.commit('mult/init', {name: 'test', min: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(5, 5);
    expect(store.getters['mult/get']('test', 8)).toBeCloseTo(8, 5);
});

test('a mult can have a maximum value', () => {
    store.commit('mult/init', {name: 'test', max: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.getters['mult/get']('test', 8)).toBeCloseTo(5, 5);
});

test('a mult can be rounded', () => {
    store.commit('mult/init', {name: 'test', round: true});

    expect(store.getters['mult/get']('test')).toBeCloseTo(0, 5);
    expect(store.getters['mult/get']('test', 3.1)).toBeCloseTo(3, 5);
    expect(store.getters['mult/get']('test', 6.66)).toBeCloseTo(7, 5);
    expect(store.getters['mult/get']('test', 8)).toBeCloseTo(8, 5);
});

test('a mult can have its values changed', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});
    store.dispatch('mult/setBase', {name: 'test', key: 'test', value: 15});

    expect(store.getters['mult/get']('test')).toBeCloseTo(20, 5);

    store.dispatch('mult/setMult', {name: 'test', key: 'test', value: 2});

    expect(store.getters['mult/get']('test')).toBeCloseTo(40, 5);

    store.dispatch('mult/setBonus', {name: 'test', key: 'test', value: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(45, 5);
});

test('base keys are unique and the effect stacks', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});
    store.dispatch('mult/setBase', {name: 'test', key: 'test', value: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(10, 5);

    store.dispatch('mult/setBase', {name: 'test', key: 'foo', value: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(15, 5);

    store.dispatch('mult/setBase', {name: 'test', key: 'test', value: 10});

    expect(store.getters['mult/get']('test')).toBeCloseTo(20, 5);
});

test('mult keys are unique and the effect stacks', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});
    store.dispatch('mult/setMult', {name: 'test', key: 'test', value: 2});

    expect(store.getters['mult/get']('test')).toBeCloseTo(10, 5);

    store.dispatch('mult/setMult', {name: 'test', key: 'foo', value: 2});

    expect(store.getters['mult/get']('test')).toBeCloseTo(20, 5);

    store.dispatch('mult/setMult', {name: 'test', key: 'test', value: 3});

    expect(store.getters['mult/get']('test')).toBeCloseTo(30, 5);
});

test('bonus keys are unique and the effect stacks', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});
    store.dispatch('mult/setBonus', {name: 'test', key: 'test', value: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(10, 5);

    store.dispatch('mult/setBonus', {name: 'test', key: 'foo', value: 5});

    expect(store.getters['mult/get']('test')).toBeCloseTo(15, 5);

    store.dispatch('mult/setBonus', {name: 'test', key: 'test', value: 10});

    expect(store.getters['mult/get']('test')).toBeCloseTo(20, 5);
});

test('keys can be removed', () => {
    store.commit('mult/init', {name: 'test', baseValue: 5});
    store.dispatch('mult/setBase', {name: 'test', key: 'test', value: 3});
    store.dispatch('mult/setBase', {name: 'test', key: 'foo', value: 2});
    store.dispatch('mult/setMult', {name: 'test', key: 'test', value: 3});
    store.dispatch('mult/setMult', {name: 'test', key: 'foo', value: 2});
    store.dispatch('mult/setBonus', {name: 'test', key: 'test', value: 3});
    store.dispatch('mult/setBonus', {name: 'test', key: 'foo', value: 2});

    expect(store.getters['mult/get']('test')).toBeCloseTo(65, 5);

    store.dispatch('mult/removeKey', {type: 'base', name: 'test', key: 'foo'});

    expect(store.getters['mult/get']('test')).toBeCloseTo(53, 5);

    store.dispatch('mult/removeKey', {type: 'mult', name: 'test', key: 'foo'});

    expect(store.getters['mult/get']('test')).toBeCloseTo(29, 5);

    store.dispatch('mult/removeKey', {type: 'bonus', name: 'test', key: 'foo'});

    expect(store.getters['mult/get']('test')).toBeCloseTo(27, 5);
});
