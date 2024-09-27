import { newGame } from '../../src/js/init';
import { cleanStore, getSavefile, loadFile } from '../../src/js/savefile';
import store from '../../src/store';

test('game sets up everything correctly', () => {
    newGame(false);

    // General systems
    const unlocks = Object.keys(store.state.unlock).length;
    const stats = Object.keys(store.state.stat).length;
    const mults = Object.keys(store.state.mult.items).length;
    const currencies = Object.keys(store.state.currency).length;
    const upgrades = Object.keys(store.state.upgrade.item).length;
    const relics = Object.keys(store.state.relic.item).length;
    const achievements = Object.keys(store.state.achievement).length;

    // Specific systems
    const cards = Object.keys(store.state.card.card).length;
    const cardCollections = Object.keys(store.state.card.collection).length;
    const cardPacks = Object.keys(store.state.card.pack).length;

    // Feature systems
    const hordeItems = Object.keys(store.state.horde.items).length;
    const farmCrops = Object.keys(store.state.farm.crop).length;
    const farmBuildings = Object.keys(store.state.farm.building).length;
    const farmFertilizers = Object.keys(store.state.farm.fertilizer).length;

    expect(unlocks).toBeGreaterThan(0);
    expect(stats).toBeGreaterThan(0);
    expect(mults).toBeGreaterThan(0);
    expect(currencies).toBeGreaterThan(0);
    expect(upgrades).toBeGreaterThan(0);
    expect(relics).toBeGreaterThan(0);
    expect(achievements).toBeGreaterThan(0);
    expect(cards).toBeGreaterThan(0);
    expect(cardCollections).toBeGreaterThan(0);
    expect(cardPacks).toBeGreaterThan(0);
    expect(hordeItems).toBeGreaterThan(0);
    expect(farmCrops).toBeGreaterThan(0);
    expect(farmBuildings).toBeGreaterThan(0);
    expect(farmFertilizers).toBeGreaterThan(0);

    // Show some cool stats about the game
    console.info({
        unlocks, stats, mults, currencies, upgrades, relics, achievements,
        cards, cardCollections, cardPacks,
        hordeItems, farmCrops, farmBuildings, farmFertilizers
    });
});

test('game can be reset to a clean state', () => {
    newGame(false);

    cleanStore();
});

test('savefile can be saved and loaded', () => {
    newGame(false);

    const file = getSavefile();

    loadFile(file);
});
