export default {
    unlock: 'hordeAreaLoveIsland',
    icon: 'mdi-heart-multiple',
    color: 'babypink',
    zones: {
        sign_4: {
            x: -3.25,
            y: 5.5,
            unlockedBy: null,
            type: 'sign'
        },
        1: {
            x: -0.7,
            y: 5,
            unlockedBy: null,
            type: 'regular',
            difficulty: 78,
            enemyType: ['seal', 'guineaPig']
        },
        2: {
            x: -3.5,
            y: 2.5,
            unlockedBy: '1',
            type: 'regular',
            difficulty: 81,
            enemyType: ['seal', 'guineaPig', 'puppy']
        },
        3: {
            x: -6.25,
            y: -0.25,
            unlockedBy: '2',
            type: 'regular',
            difficulty: 84,
            enemyType: ['guineaPig', 'puppy']
        },
        4: {
            x: -7,
            y: -3.5,
            unlockedBy: '3',
            type: 'regular',
            difficulty: 87,
            enemyType: ['puppy', 'rabbit']
        },
        5: {
            x: -5.25,
            y: -5.5,
            unlockedBy: '4',
            type: 'regular',
            difficulty: 90,
            enemyType: ['guineaPig', 'puppy', 'rabbit']
        },
        6: {
            x: -3,
            y: -6,
            unlockedBy: '5',
            type: 'regular',
            difficulty: 93,
            enemyType: ['rabbit', 'kitten']
        },
        7: {
            x: -1,
            y: -4.5,
            unlockedBy: '6',
            type: 'regular',
            difficulty: 96,
            enemyType: ['seal', 'rabbit', 'puppy', 'kitten']
        },
        8: {
            x: 0,
            y: -2.5,
            unlockedBy: '7',
            type: 'regular',
            difficulty: 99,
            enemyType: ['puppy', 'kitten']
        },
        9: {
            x: 1,
            y: -4.5,
            unlockedBy: '8',
            type: 'regular',
            difficulty: 102,
            enemyType: ['seal', 'guineaPig', 'kitten']
        },
        10: {
            x: 3,
            y: -6,
            unlockedBy: '9',
            type: 'regular',
            difficulty: 105,
            enemyType: ['puppy', 'rabbit', 'kitten']
        },
        11: {
            x: 5.25,
            y: -5.5,
            unlockedBy: '10',
            type: 'regular',
            difficulty: 108,
            enemyType: ['kitten', 'piglet']
        },
        12: {
            x: 7,
            y: -3.5,
            unlockedBy: '11',
            type: 'regular',
            difficulty: 111,
            enemyType: ['piglet', 'guineaPig']
        },
        13: {
            x: 6.25,
            y: -0.25,
            unlockedBy: '12',
            type: 'regular',
            difficulty: 114,
            enemyType: ['seal', 'panda']
        },
        14: {
            x: 3.5,
            y: 2.5,
            unlockedBy: '13',
            type: 'regular',
            difficulty: 117,
            enemyType: ['piglet', 'panda', 'koala']
        },
        boss_1: {
            x: 0,
            y: 3.6,
            unlockedBy: '14',
            type: 'boss',
            difficulty: 120,
            boss: ['mina'],
            reward: 'hordeEndOfContent'
        },
        endless: {
            x: 0.7,
            y: 5,
            unlockedBy: '14',
            type: 'endless',
            difficulty: 120,
            enemyType: ['seal', 'guineaPig', 'puppy', 'rabbit', 'kitten', 'piglet', 'panda', 'koala']
        }
    },
    decoration: [
        {x: 0, y: 3.75, rotate: 0, icon: 'mdi-seat', size: 2},
        {x: -8.5, y: 1.2, rotate: 0, icon: 'mdi-home-variant', size: 3},
        {x: -8.5, y: 1.9, rotate: -20, icon: 'mdi-dog', size: 0.75},
        {x: -6, y: 2.2, rotate: 0, icon: 'mdi-dog-side', size: 1},
        {x: -8, y: 3.2, rotate: -30, icon: 'mdi-bone', size: 0.6},
        {x: -7.6, y: 3.5, rotate: 20, icon: 'mdi-bone', size: 0.5},
        {x: -7.9, y: -1, rotate: 70, icon: 'mdi-tennis-ball', size: 0.4},
        {x: 0.4, y: -6.3, rotate: 0, icon: 'mdi-inbox', size: 2},
        {x: 0.4, y: -6.45, rotate: 0, icon: 'mdi-cat', size: 1},
        {x: -7.5, y: -5.7, rotate: 0, icon: 'mdi-grass', size: 1.25},
        {x: -7.4, y: -6.35, rotate: 15, icon: 'mdi-rabbit-variant', size: 0.7},
        {x: -8.7, y: -4, rotate: 0, icon: 'mdi-rabbit', size: 0.8},
        {x: -8, y: -3.83, rotate: 70, icon: 'mdi-carrot', size: 0.6},
        {x: 6.6, y: -6.1, rotate: 0, icon: 'mdi-pig-variant', size: 0.6},
        {x: 8.5, y: -6.4, rotate: 0, icon: 'mdi-pig-variant', size: 0.65},
        {x: 7.7, y: -5.5, rotate: 0, icon: 'mdi-pig-variant', size: 0.8},
        {x: 8.4, y: -5.33, rotate: 70, icon: 'mdi-carrot', size: 0.6},
        {x: 7, y: 3.1, rotate: 0, icon: 'mdi-palm-tree', size: 2.5},
        {x: 7.4, y: 2, rotate: 40, icon: 'mdi-koala', size: 1},
        {x: 8.1, y: -1, rotate: 0, icon: 'mdi-panda', size: 1.2},
        {x: 8.1, y: 0, rotate: 0, icon: 'mdi-package', size: 1.5},
    ]
}
