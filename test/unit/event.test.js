import store from '../../src/store';

const dataset = [
    {
        name: 'Big event starts',
        start: '2020-01-01',
        end: '2020-03-15',
        startEvent: null,
        endEvent: 'bloom',
        isBigEvent: true,
        isSameEvent: false,
        startedBankEvent: true,
        startedBigEvent: true
    },
    {
        name: 'Small event starts',
        start: '2020-01-01',
        end: '2020-01-11',
        startEvent: null,
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: true,
        startedBigEvent: false
    },
    {
        name: 'No events',
        start: '2020-01-01',
        end: '2020-01-03',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Detect missing big event',
        start: '2020-01-13',
        end: '2020-02-13',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: true
    },
    {
        name: 'Detect missing bank event',
        start: '2020-01-01',
        end: '2020-01-08',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: true,
        startedBigEvent: false
    },
    {
        name: 'Bank event only counts missing event',
        start: '2020-01-01',
        end: '2020-02-15',
        startEvent: null,
        endEvent: 'bank',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: true
    },
    {
        name: 'Big event after start does not count',
        start: '2020-01-15',
        end: '2020-02-05',
        startEvent: 'cinders',
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Bank after start does not count',
        start: '2020-01-04',
        end: '2020-01-11',
        startEvent: 'bank',
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Same big event is detected',
        start: '2020-01-15',
        end: '2020-01-30',
        startEvent: 'cinders',
        endEvent: 'cinders',
        isBigEvent: true,
        isSameEvent: true,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Same small event is detected',
        start: '2020-01-11',
        end: '2020-01-12',
        startEvent: 'merchant',
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: true,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Different year big event is detected',
        start: '2020-01-15',
        end: '2021-01-30',
        startEvent: 'cinders',
        endEvent: 'cinders',
        isBigEvent: true,
        isSameEvent: false,
        startedBankEvent: true,
        startedBigEvent: true
    },
    {
        name: 'Different week small event is detected',
        start: '2020-04-04',
        end: '2020-04-26',
        startEvent: 'merchant',
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: true,
        startedBigEvent: false
    },
    {
        name: 'Big event starts [reverse]',
        start: '2020-04-15',
        end: '2020-03-15',
        startEvent: null,
        endEvent: 'bloom',
        isBigEvent: true,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: true
    },
    {
        name: 'Small event starts [reverse]',
        start: '2020-01-07',
        end: '2019-12-21',
        startEvent: null,
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'No events [reverse]',
        start: '2020-01-03',
        end: '2020-01-01',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Don\'t detect missing big event [reverse]',
        start: '2020-02-13',
        end: '2020-01-13',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Don\'t detect missing bank event [reverse]',
        start: '2020-01-08',
        end: '2020-01-01',
        startEvent: null,
        endEvent: null,
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Same big event is detected [reverse]',
        start: '2020-01-30',
        end: '2020-01-15',
        startEvent: 'cinders',
        endEvent: 'cinders',
        isBigEvent: true,
        isSameEvent: true,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Same small event is detected [reverse]',
        start: '2020-01-12',
        end: '2020-01-11',
        startEvent: 'merchant',
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: true,
        startedBankEvent: false,
        startedBigEvent: false
    },
    {
        name: 'Different year big event is detected [reverse]',
        start: '2021-01-30',
        end: '2020-01-15',
        startEvent: 'cinders',
        endEvent: 'cinders',
        isBigEvent: true,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: true
    },
    {
        name: 'Different week small event is detected [reverse]',
        start: '2020-04-26',
        end: '2020-04-04',
        startEvent: 'merchant',
        endEvent: 'merchant',
        isBigEvent: false,
        isSameEvent: false,
        startedBankEvent: false,
        startedBigEvent: false
    },
];

dataset.forEach(data => {
    test(`event has correct stats (${ data.name })`, () => {
        const result = store.getters['event/dayStats'](data.start, data.end);
        ['startEvent', 'endEvent', 'isBigEvent', 'isSameEvent', 'startedBankEvent', 'startedBigEvent'].forEach(key => {
            expect(result[key]).toBe(data[key]);
        });
    });
});
