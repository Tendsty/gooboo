export default {
    unlock: null,
    icon: 'mdi-sign-caution',
    color: 'orange',
    zones: {
        1: {
            x: -9.5,
            y: 1.5,
            unlockedBy: null,
            type: 'regular',
            difficulty: 0,
            enemyType: ['soldier_1', 'officer_1']
        },
        2: {
            x: -8,
            y: -1,
            unlockedBy: '1',
            type: 'regular',
            difficulty: 3,
            enemyType: ['soldier_1', 'officer_1']
        },
        3: {
            x: -5,
            y: -2,
            unlockedBy: '2',
            type: 'regular',
            difficulty: 6,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'officer_1', 'officer_2', 'officer_3']
        },
        4: {
            x: -3,
            y: -4,
            unlockedBy: '3',
            type: 'regular',
            difficulty: 9,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'officer_1', 'officer_2', 'officer_3']
        },
        sign_1: {
            x: -4.25,
            y: -5.25,
            unlockedBy: '4',
            type: 'sign'
        },
        5: {
            x: -1,
            y: -5,
            unlockedBy: '4',
            type: 'regular',
            difficulty: 12,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'hunter']
        },
        6: {
            x: 4,
            y: -4.5,
            unlockedBy: '5',
            type: 'regular',
            difficulty: 15,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'officer_1']
        },
        7: {
            x: 6,
            y: -2,
            unlockedBy: '6',
            type: 'regular',
            difficulty: 18,
            enemyType: ['officer_1', 'officer_2', 'officer_3', 'sniper']
        },
        sign_2: {
            x: 7.5,
            y: -2.5,
            unlockedBy: '7',
            type: 'sign'
        },
        8: {
            x: 7,
            y: 1.5,
            unlockedBy: '7',
            type: 'regular',
            difficulty: 21,
            enemyType: ['officer_1', 'officer_2', 'officer_3', 'soldier_1']
        },
        9: {
            x: 5.5,
            y: 4,
            unlockedBy: '8',
            type: 'regular',
            difficulty: 24,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'officer_1', 'officer_2', 'officer_3']
        },
        10: {
            x: 2,
            y: 2,
            unlockedBy: '9',
            type: 'regular',
            difficulty: 27,
            enemyType: ['soldier_1', 'officer_1', 'hunter', 'sniper']
        },
        sign_3: {
            x: 2.5,
            y: 0.5,
            unlockedBy: '10',
            type: 'sign'
        },
        boss_1: {
            x: 0,
            y: 0,
            unlockedBy: '10',
            type: 'boss',
            difficulty: 30,
            boss: ['ohilio_guard1', 'ohilio_guard2', 'ohilio'],
            reward: 'hordeAreaMonkeyJungle'
        },
        endless: {
            x: -1,
            y: 5,
            unlockedBy: '10',
            type: 'endless',
            difficulty: 30,
            enemyType: ['soldier_1', 'soldier_2', 'soldier_3', 'officer_1', 'officer_2', 'officer_3', 'hunter', 'sniper']
        }
    },
    decoration: [
        {x: 0, y: -0.5, rotate: 0, icon: 'mdi-tent', size: 3},
        {x: -8, y: 5, rotate: 0, icon: 'mdi-forest', size: 3},
        {x: -6.5, y: 3, rotate: 0, icon: 'mdi-forest', size: 2.25},
        {x: 4, y: -2, rotate: 0, icon: 'mdi-pine-tree-variant', size: 1.9},
        {x: -2, y: -5.5, rotate: 0, icon: 'mdi-truck-cargo-container', size: 1.2},
        {x: -8, y: 1, rotate: 0, icon: 'mdi-flag-variant', size: 1.75},
        {x: -6, y: -2.2, rotate: 160, icon: 'mdi-pistol', size: 0.75},
        {x: -5, y: -2.5, rotate: 110, icon: 'mdi-magazine-pistol', size: 0.5},
        {x: 1.5, y: -4.75, rotate: 0, icon: 'mdi-bridge', size: 1.5},
        {x: 6.5, y: -2.6, rotate: 80, icon: 'mdi-magazine-rifle', size: 0.5},
        {x: 6.5, y: 5, rotate: 0, icon: 'mdi-truck', size: 1.3},
        {x: 5.55, y: 5.25, rotate: 270, icon: 'mdi-ammunition', size: 0.5},
        {x: 5.6, y: 4.85, rotate: 0, icon: 'mdi-ammunition', size: 0.45},
        {x: 5.1, y: 5.1, rotate: 20, icon: 'mdi-ammunition', size: 0.7},
        {x: 1.9, y: -7.15, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 1.65, y: -6.4, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 1.5, y: -5.65, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 1.5, y: -4, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 1.3, y: -3.25, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 0.9, y: -2.5, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: 0, y: -2.1, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -0.9, y: -2.3, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -1.8, y: -2.2, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -2.7, y: -1.8, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.2, y: -1.05, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.5, y: -0.4, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.6, y: 0.35, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.7, y: 1.1, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.4, y: 1.85, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.2, y: 2.6, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.5, y: 3.35, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -3.6, y: 4.1, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -4, y: 4.85, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -4.5, y: 5.6, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -4.8, y: 6.35, rotate: 0, icon: 'mdi-waves', size: 1},
        {x: -4.9, y: 7.1, rotate: 0, icon: 'mdi-waves', size: 1},
    ]
}
