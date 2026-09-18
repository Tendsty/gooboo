import { clearRemoteConfig, getRemoteConfig, getRemoteSave, isRemoteConfigured, setRemoteConfig } from '../../src/js/remoteSave';

const storage = {};

global.localStorage = {
    getItem: jest.fn(key => storage[key] ?? null),
    setItem: jest.fn((key, value) => {
        storage[key] = String(value);
    }),
    removeItem: jest.fn(key => {
        delete storage[key];
    }),
    clear: jest.fn(() => {
        Object.keys(storage).forEach(key => delete storage[key]);
    })
};

describe('remote save configuration', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('stores remote configuration locally', () => {
        setRemoteConfig('https://example.com/save', 'secret');

        expect(isRemoteConfigured()).toBe(true);
        expect(getRemoteConfig()).toEqual({
            url: 'https://example.com/save',
            token: 'secret'
        });

        clearRemoteConfig();
        expect(isRemoteConfigured()).toBe(false);
    });

    test('reads a remote save with bearer authentication', async () => {
        setRemoteConfig('https://example.com/save', 'secret');
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({exists: true, revision: 4, timestamp: 123, saveData: 'abc'})
        });

        const result = await getRemoteSave();

        expect(result.revision).toBe(4);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://example.com/save',
            expect.objectContaining({
                method: 'GET',
                headers: {Authorization: 'Bearer secret'}
            })
        );
    });

    test('supports endpoints without authentication', async () => {
        setRemoteConfig('https://example.com/save');
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({exists: false, revision: 0})
        });

        await getRemoteSave();

        expect(global.fetch).toHaveBeenCalledWith(
            'https://example.com/save',
            expect.objectContaining({
                headers: {}
            })
        );
    });

    test('treats 404 as an empty remote save', async () => {
        setRemoteConfig('https://example.com/save');
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: async () => ({})
        });

        await expect(getRemoteSave()).resolves.toEqual({exists: false, revision: 0});
    });
});
