import { buildNum } from "../../utils/format";

export default {
    dagger: {
        findZone: 0,
        found: true,
        price(lvl) {
            return Math.pow(2, lvl - 1) * 10;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 5 + 5}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.15 + 3.45}
            ];
        },
        activeType: 'combat',
        cooldown: () => 6,
        icon: 'mdi-knife-military',
        activeIcon: 'mdi-knife-military',
        activeColor: 'red'
    },
    shirt: {
        findZone: 0,
        found: true,
        price(lvl) {
            return Math.pow(2, lvl - 1) * 10;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 1000 + 1000}
            ];
        },
        active(lvl) {
            return [
                {type: 'heal', value: lvl * 0.005 + 0.145}
            ];
        },
        activeType: 'combat',
        cooldown: () => 45,
        icon: 'mdi-tshirt-v',
        activeIcon: 'mdi-medical-bag',
        activeColor: 'green'
    },
    guardianAngel: {
        findZone: 5,
        findChance: 1 / buildNum(10, 'K'),
        price(lvl) {
            return Math.pow(10, lvl - 1) * 100;
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeRevive', value: 1}
            ];
        },
        active() {
            return [
                {type: 'revive', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 390 - lvl * 30,
        icon: 'mdi-cross',
        activeIcon: 'mdi-flare',
        activeColor: 'yellow'
    },
    milkCup: {
        findZone: 6,
        findChance: 1 / 2000,
        price(lvl) {
            return Math.pow(4, lvl - 1) * 20;
        },
        cap: 9,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'currencyHordeBoneGain', value: 1.2}
            ];
        },
        active(lvl) {
            return [
                {type: 'bone', value: 4.75 + lvl * 0.25}
            ];
        },
        activeType: 'utility',
        cooldown: () => 90,
        icon: 'mdi-cup',
        activeIcon: 'mdi-bone',
        activeColor: 'lighter-grey'
    },
    starShield: {
        findZone: 8,
        findChance: 1 / 4000,
        price(lvl) {
            return Math.pow(8, lvl - 1) * 80;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: lvl + 2}
            ];
        },
        active() {
            return [
                {type: 'stun', value: 5}
            ];
        },
        activeType: 'combat',
        cooldown: () => 25,
        icon: 'mdi-shield-star',
        activeIcon: 'mdi-octagram-outline',
        activeColor: 'blue'
    },
    longsword: {
        findZone: 10,
        findChance: 1 / 8000,
        price(lvl) {
            return Math.pow(4, lvl - 1) * 40;
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.3},
                {isPositive: true, type: 'base', name: 'hordeCritMult', value: 0.25}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: 24 + lvl}
            ];
        },
        activeType: 'combat',
        cooldown: () => 20,
        icon: 'mdi-sword',
        activeIcon: 'mdi-sword',
        activeColor: 'orange'
    },
    boots: {
        findZone: 12,
        findChance: 1 / buildNum(14, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 75;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeFirstStrike', value: lvl * 0.1 + 2.4}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageMagic', value: lvl * 0.6 + 10.4},
                {type: 'heal', value: 0.06}
            ];
        },
        activeType: 'combat',
        cooldown: () => 33,
        icon: 'mdi-shoe-cleat',
        activeIcon: 'mdi-shoe-cleat',
        activeColor: 'light-blue'
    },
    clover: {
        findZone: 14,
        findChance: 1 / buildNum(20, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 100;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'hordeItemChance', value: lvl * 0.05 + 1.7}
            ];
        },
        active() {
            return [
                {type: 'bone', value: 35}
            ];
        },
        activeType: 'utility',
        cooldown: () => 1800,
        icon: 'mdi-clover',
        activeIcon: 'mdi-bone',
        activeColor: 'light-green'
    },
    liver: {
        findZone: 15,
        findChance: 1 / buildNum(100, 'K'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * 120;
        },
        cap: 11,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'currencyHordeMonsterPartGain', value: 1.2}
            ];
        },
        active(lvl) {
            return [
                {type: 'bone', value: 2.9 + lvl * 0.1}
            ];
        },
        activeType: 'utility',
        cooldown: () => 45,
        icon: 'mdi-stomach',
        activeIcon: 'mdi-bone',
        activeColor: 'cherry'
    },
    fireOrb: {
        findZone: 16,
        findChance: 1 / buildNum(25, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 150;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 2 + 8},
                {isPositive: true, type: 'base', name: 'hordeCritMult', value: 0.4},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageMagic', value: lvl * 1.75 + 20.75},
                {type: 'stun', value: 10}
            ];
        },
        activeType: 'combat',
        cooldown: () => 78,
        icon: 'mdi-fire-circle',
        activeIcon: 'mdi-fire',
        activeColor: 'deep-orange'
    },
    campfire: {
        findZone: 18,
        findChance: 1 / buildNum(35, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 200;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 750 + 2250},
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.04}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 0.01},
                {type: 'stun', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 7,
        icon: 'mdi-campfire',
        activeIcon: 'mdi-campfire',
        activeColor: 'orange-red'
    },
    snowflake: {
        findZone: 20,
        findChance: 1 / buildNum(45, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 300;
        },
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.6},
                {isPositive: true, type: 'mult', name: 'hordeHealth', value: 1.6},
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 800 + 6200}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'removeAttack', value: 0.2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 25,
        icon: 'mdi-snowflake',
        activeIcon: 'mdi-snowflake',
        activeColor: 'light-blue'
    },
    meatShield: {
        findZone: 23,
        findChance: 1 / buildNum(60, 'K'),
        price(lvl) {
            return Math.pow(3, lvl - 1) * 400;
        },
        cap: 6,
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'hordePhysicTaken', value: 1 / (lvl * 0.1 + 1.15)},
                {isPositive: false, type: 'base', name: 'hordeMagicTaken', value: 0.3},
                {isPositive: false, type: 'base', name: 'hordeBioTaken', value: 0.3}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'heal', value: 0.12},
                {type: 'stun', value: 6}
            ];
        },
        activeType: 'combat',
        cooldown: () => 54,
        icon: 'mdi-food-steak',
        activeIcon: 'mdi-octagram-outline',
        activeColor: 'pale-red'
    },
    corruptEye: {
        findZone: 25,
        findChance: 1 / buildNum(300, 'K'),
        price(lvl) {
            return Math.pow(10, lvl - 1) * 5000;
        },
        cap: 5,
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 0.7},
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 0.7},
                {isPositive: true, type: 'base', name: 'hordeSoulChance', value: 0.075}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageBio', value: 14.75 + lvl * 1.25},
                {type: 'poison', value: 0.2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 30,
        icon: 'mdi-eye',
        activeIcon: 'mdi-laser-pointer',
        activeColor: 'purple'
    },
    wizardHat: {
        findZone: 27,
        findChance: 1 / buildNum(80, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 1500;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 4 + 38},
                {isPositive: true, type: 'base', name: 'hordeMagicAttack', value: 0.15}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageMagic', value: 2 * lvl + 40}
            ];
        },
        activeType: 'combat',
        cooldown: () => 125,
        icon: 'mdi-wizard-hat',
        activeIcon: 'mdi-shimmer',
        activeColor: 'deep-purple'
    },
    redStaff: {
        findZone: 30,
        findChance: 1 / buildNum(100, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 2500;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 3 + 27},
                {isPositive: true, type: 'base', name: 'hordeFirstStrike', value: lvl * 0.05 + 0.7}
            ];
        },
        active() {
            return [
                {type: 'permanentAttack', value: 0.1}
            ];
        },
        activeType: 'utility',
        cooldown: () => 2700,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-pentagram',
        activeColor: 'red'
    },
    marblePillar: {
        findZone: 33,
        findChance: 1 / buildNum(125, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 4000;
        },
        cap: 16,
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'hordeMagicAttack', value: 0.25},
                {isPositive: true, type: 'mult', name: 'hordeMagicTaken', value: 1 / (lvl * 0.05 + 2.2)},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: 2}
            ];
        },
        active(lvl) {
            return [
                {type: 'removeAttack', value: 0.005 * lvl + 0.07},
                {type: 'stun', value: 6}
            ];
        },
        activeType: 'combat',
        cooldown: () => 44,
        icon: 'mdi-pillar',
        activeIcon: 'mdi-pillar',
        activeColor: 'pale-yellow'
    },
    rainbowStaff: {
        findZone: 35,
        findChance: 1 / buildNum(450, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 6000;
        },
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.15},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 1},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 1},
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.15 + 4.85},
                {type: 'damageMagic', value: lvl * 0.15 + 4.85},
                {type: 'damageBio', value: lvl * 0.15 + 4.85}
            ];
        },
        activeType: 'combat',
        cooldown: () => 25,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-looks',
        activeColor: 'pink'
    },
    toxin: {
        findZone: 37,
        findChance: 1 / buildNum(160, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * 7000;
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.05},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'poison', value: lvl * 0.01 + 0.19}
            ];
        },
        activeType: 'combat',
        cooldown: () => 16,
        icon: 'mdi-bottle-tonic-skull',
        activeIcon: 'mdi-bottle-tonic-skull',
        activeColor: 'light-green'
    },
    brokenStopwatch: {
        findZone: 40,
        findChance: 1 / buildNum(200, 'K'),
        price(lvl) {
            return Math.pow(20, lvl - 1) * buildNum(10, 'K');
        },
        cap: 3,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeNostalgia', value: 2}
            ];
        },
        active(lvl) {
            return [
                {type: 'removeAttack', value: 0.15},
                {type: 'stun', value: 4 + lvl}
            ];
        },
        activeType: 'combat',
        cooldown: () => 60,
        icon: 'mdi-timer',
        activeIcon: 'mdi-timer',
        activeColor: 'skyblue'
    },
    toxicSword: {
        findZone: 43,
        findChance: 1 / buildNum(275, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(12, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 10 + 130},
                {isPositive: false, type: 'mult', name: 'hordeCritMult', value: 0.8}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageBio', value: lvl * 0.25 + 2.75},
                {type: 'poison', value: 0.1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 10,
        icon: 'mdi-sword',
        activeIcon: 'mdi-bottle-tonic-skull',
        activeColor: 'green'
    },
    luckyCharm: {
        findZone: 45,
        findChance: 1 / buildNum(1.4, 'M'),
        price(lvl) {
            return Math.pow(10, lvl - 1) * buildNum(15, 'K');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.1},
                {isPositive: true, type: 'mult', name: 'hordeItemChance', value: 1.5},
                {isPositive: true, type: 'base', name: 'hordeHeirloomChance', value: 0.01}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 1},
                {type: 'antidote', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 390 - lvl * 30,
        icon: 'mdi-necklace',
        activeIcon: 'mdi-flare',
        activeColor: 'lime'
    },
    club: {
        findZone: 47,
        findChance: 1 / buildNum(400, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(20, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 10 + 110},
                {isPositive: true, type: 'mult', name: 'hordeAttack', value: lvl * 0.01 + 1.19},
                {isPositive: false, type: 'mult', name: 'hordeCritChance', value: 0}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 2 + 28}
            ];
        },
        activeType: 'combat',
        cooldown: () => 26,
        icon: 'mdi-mace',
        activeIcon: 'mdi-mace',
        activeColor: 'cherry'
    },
    goldenStaff: {
        findZone: 49,
        findChance: 1 / buildNum(500, 'K'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(24, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeSpellblade', value: lvl * 0.05 + 0.55},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: 1.25},
                {type: 'damageMagic', value: lvl * 0.5 + 3.5},
            ];
        },
        activeType: 'combat',
        cooldown: () => 10,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-sword',
        activeColor: 'amber'
    },
    mace: {
        findZone: 51,
        findChance: 1 / buildNum(650, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(28, 'K');
        },
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.2},
                {isPositive: false, type: 'base', name: 'hordePhysicConversion', value: 2.5},
                {isPositive: true, type: 'base', name: 'hordePhysicAttack', value: 0.15}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.25 + 6.25},
                {type: 'stun', value: 2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 18,
        icon: 'mdi-mace',
        activeIcon: 'mdi-mace',
        activeColor: 'red'
    },
    scissors: {
        findZone: 53,
        findChance: 1 / buildNum(850, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(35, 'K');
        },
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.02},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.05 + 1.7},
                {type: 'damageBio', value: lvl * 0.1 + 3.4}
            ];
        },
        activeType: 'combat',
        cooldown: () => 5,
        icon: 'mdi-content-cut',
        activeIcon: 'mdi-content-cut',
        activeColor: 'blue-grey'
    },
    cat: {
        findZone: 55,
        findChance: 1 / buildNum(4.25, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(45, 'K');
        },
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 1 / 3},
                {isPositive: true, type: 'base', name: 'hordeRevive', value: 8},
                {isPositive: true, type: 'mult', name: 'hordeRecovery', value: 4}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'bone', value: 1.95 + lvl * 0.05}
            ];
        },
        activeType: 'utility',
        cooldown: () => 40,
        icon: 'mdi-cat',
        activeIcon: 'mdi-cat',
        activeColor: 'lighter-grey'
    },
    healthyFruit: {
        findZone: 57,
        findChance: 1 / buildNum(1.1, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(55, 'K');
        },
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeCritChance', value: 0.5},
                {isPositive: true, type: 'mult', name: 'hordeBioTaken', value: 1 / 2.5},
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.03}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'heal', value: 0.01 * lvl + 0.29},
                {type: 'stun', value: 4}
            ];
        },
        activeType: 'combat',
        cooldown: () => 70,
        icon: 'mdi-fruit-cherries',
        activeIcon: 'mdi-fruit-cherries',
        activeColor: 'cherry'
    },
    deadBird: {
        findZone: 60,
        findChance: 1 / buildNum(1.3, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(85, 'K');
        },
        cap: 8,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.35},
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 0.25},
                {isPositive: true, type: 'base', name: 'hordeBioAttack', value: 0.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'heal', value: 0.07 + lvl * 0.01}
            ];
        },
        activeType: 'combat',
        cooldown: () => 13,
        icon: 'mdi-bird',
        activeIcon: 'mdi-feather',
        activeColor: 'skyblue'
    },
    calmingPill: {
        findZone: 63,
        findChance: 1 / buildNum(1.5, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(100, 'K');
        },
        cap: 11,
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'hordeCorruption', value: 0.955 - lvl * 0.005},
                {isPositive: true, type: 'mult', name: 'hordeNostalgia', value: 1.25}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.175}
            ];
        },
        activeType: 'combat',
        cooldown: () => 38,
        icon: 'mdi-pill',
        activeIcon: 'mdi-pill',
        activeColor: 'pale-red'
    },
    cleansingFluid: {
        findZone: 65,
        findChance: 1 / buildNum(7.5, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(120, 'K');
        },
        cap: 11,
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'hordeCorruption', value: 0.91 - lvl * 0.01}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.25},
                {type: 'heal', value: 0.2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 65,
        icon: 'mdi-bottle-tonic',
        activeIcon: 'mdi-bottle-tonic',
        activeColor: 'cyan'
    },
    forbiddenSword: {
        findZone: 67,
        findChance: 1 / buildNum(1.8, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(200, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 15 + 210},
                {isPositive: true, type: 'mult', name: 'hordeAttack', value: 1.35},
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.25},
                {isPositive: true, type: 'base', name: 'hordeCritMult', value: 0.4},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.5 + 6.5}
            ];
        },
        activeType: 'combat',
        cooldown: () => 15,
        icon: 'mdi-sword',
        activeIcon: 'mdi-sword',
        activeColor: 'deep-purple'
    },
    antidote: {
        findZone: 70,
        findChance: 1 / buildNum(2, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(250, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 600 + 8400},
                {isPositive: true, type: 'mult', name: 'hordeBioTaken', value: 1 / 1.25}
            ];
        },
        active() {
            return [
                {type: 'antidote', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 25,
        icon: 'mdi-bottle-tonic-plus',
        activeIcon: 'mdi-bottle-tonic-plus',
        activeColor: 'light-blue'
    },
    corruptedBone: {
        findZone: 73,
        findChance: 1 / buildNum(2.2, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(300, 'K');
        },
        cap: 7,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'currencyHordeBoneGain', value: 1.75},
                {isPositive: true, type: 'mult', name: 'hordeSoulGain', value: 1.15},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'bone', value: 11.5 + lvl * 0.5}
            ];
        },
        activeType: 'utility',
        cooldown: () => 270,
        icon: 'mdi-bone',
        activeIcon: 'mdi-bone',
        activeColor: 'pink-purple'
    },
    plaguebringer: {
        findZone: 75,
        findChance: 1 / buildNum(11, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(400, 'K');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeCorruption', value: 2}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.5}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 115 - lvl * 5,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-flare',
        activeColor: 'black'
    },
    forbiddenShield: {
        findZone: 77,
        findChance: 1 / buildNum(2.7, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(500, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 750 + 6750},
                {isPositive: true, type: 'mult', name: 'hordeHealth', value: 1.35},
                {isPositive: true, type: 'base', name: 'hordeRevive', value: 1},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'heal', value: 0.5},
                {type: 'revive', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 160,
        icon: 'mdi-shield',
        activeIcon: 'mdi-shield',
        activeColor: 'deep-purple'
    },
    dangerShield: {
        findZone: 80,
        findChance: 1 / buildNum(3.1, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(550, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 400 + 4600},
                {isPositive: true, type: 'mult', name: 'hordePhysicTaken', value: 1 / 1.2},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: 1}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 0.02},
                {type: 'removeAttack', value: 0.02},
                {type: 'stun', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 11,
        icon: 'mdi-shield-alert',
        activeIcon: 'mdi-alert-octagram',
        activeColor: 'wooden'
    },
    forbiddenToxin: {
        findZone: 83,
        findChance: 1 / buildNum(3.5, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(600, 'K');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.15},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'poison', value: lvl * 0.04 + 0.16}
            ];
        },
        activeType: 'combat',
        cooldown: () => 20,
        icon: 'mdi-bottle-tonic-skull',
        activeIcon: 'mdi-bottle-tonic-skull',
        activeColor: 'deep-purple'
    },
    glowingEye: {
        findZone: 85,
        findChance: 1 / buildNum(17.5, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(750, 'K');
        },
        cap: 10,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeSoulChance', value: 0.1},
                {isPositive: true, type: 'base', name: 'hordeHeirloomChance', value: 0.04},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageBio', value: 60 + lvl * 4}
            ];
        },
        activeType: 'combat',
        cooldown: () => 70,
        icon: 'mdi-eye',
        activeIcon: 'mdi-laser-pointer',
        activeColor: 'pink'
    },
    experimentalVaccine: {
        findZone: 87,
        findChance: 1 / buildNum(7, 'M'),
        price(lvl) {
            return Math.pow(20, lvl - 1) * buildNum(1, 'M');
        },
        cap: 3,
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.5},
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 1 / 1.5},
                {isPositive: true, type: 'mult', name: 'hordeCorruption', value: 1 / 1.5}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'removeAttack', value: 0.07 + lvl * 0.01}
            ];
        },
        activeType: 'combat',
        cooldown: () => 5,
        icon: 'mdi-needle',
        activeIcon: 'mdi-needle',
        activeColor: 'cyan'
    },
    glasses: {
        findZone: 90,
        findChance: 1 / buildNum(9, 'M'),
        price(lvl) {
            return Math.pow(5, lvl - 1) * buildNum(1.25, 'M');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeMagicTaken', value: 1 / 1.75},
                {isPositive: false, type: 'base', name: 'hordePhysicTaken', value: 0.3},
                {isPositive: false, type: 'base', name: 'hordeBioTaken', value: 0.3}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'stun', value: 40}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 280 - lvl * 10,
        icon: 'mdi-glasses',
        activeIcon: 'mdi-magnify',
        activeColor: 'pale-blue'
    },
    microscope: {
        findZone: 93,
        findChance: 1 / buildNum(12, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(1.5, 'M');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeBioTaken', value: 1 / 1.75},
                {isPositive: false, type: 'base', name: 'hordePhysicTaken', value: 0.3},
                {isPositive: false, type: 'base', name: 'hordeMagicTaken', value: 0.3}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageBio', value: 41.5 + lvl * 3.5},
                {type: 'poison', value: 0.45}
            ];
        },
        activeType: 'combat',
        cooldown: () => 96,
        icon: 'mdi-microscope',
        activeIcon: 'mdi-microscope',
        activeColor: 'teal'
    },
    moltenShield: {
        findZone: 95,
        findChance: 1 / buildNum(60, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(1.8, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 1 / 1.3},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: lvl + 14}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'permanentHealth', value: 0.15}
            ];
        },
        activeType: 'utility',
        cooldown: () => 3300,
        icon: 'mdi-shield-half-full',
        activeIcon: 'mdi-sun-wireless',
        activeColor: 'orange-red'
    },
    cutter: {
        findZone: 97,
        findChance: 1 / buildNum(16, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(2.2, 'M');
        },
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 2.5},
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.05},
                {isPositive: false, type: 'mult', name: 'hordeRecovery', value: 0.5}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageBio', value: 0.68 + lvl * 0.02}
            ];
        },
        activeType: 'combat',
        cooldown: () => 2,
        icon: 'mdi-box-cutter',
        activeIcon: 'mdi-box-cutter',
        activeColor: 'wooden'
    },
    book: {
        findZone: 100,
        findChance: 1 / buildNum(20, 'M'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(2.75, 'M');
        },
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 0.5},
                {isPositive: true, type: 'mult', name: 'hordeItemMasteryGain', value: 1.4}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageMagic', value: 4.2 + lvl * 0.2},
                {type: 'stun', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 10,
        icon: 'mdi-book',
        activeIcon: 'mdi-book-alert',
        activeColor: 'indigo'
    },

    pawn: {
        findZone: 50,
        findChance: 1 / buildNum(10, 'M'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(1, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 10 + 90},
                {isPositive: true, type: 'base', name: 'hordeFirstStrike', value: 1.25}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.15 + 3.85}
            ];
        },
        activeType: 'combat',
        cooldown: () => 5,
        icon: 'mdi-chess-pawn',
        activeIcon: 'mdi-chess-pawn',
        activeColor: 'beige'
    },
    knight: {
        findZone: 80,
        findChance: 1 / buildNum(100, 'M'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(4, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeSpellblade', value: lvl * 0.1 + 0.4},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: 7}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageMagic', value: lvl * 0.75 + 14.25},
                {type: 'stun', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 12,
        icon: 'mdi-chess-knight',
        activeIcon: 'mdi-chess-knight',
        activeColor: 'orange'
    },
    bishop: {
        findZone: 110,
        findChance: 1 / buildNum(1, 'B'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(16, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 500 + 7000},
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.025},
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.01}
            ];
        },
        active(lvl) {
            return [
                {type: 'damageBio', value: 16 + lvl * 1.5},
                {type: 'poison', value: 0.2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 39,
        icon: 'mdi-chess-bishop',
        activeIcon: 'mdi-chess-bishop',
        activeColor: 'green'
    },
    rook: {
        findZone: 140,
        findChance: 1 / buildNum(10, 'B'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(64, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.05},
                {isPositive: true, type: 'base', name: 'hordeCritMult', value: lvl * 0.02 + 0.58}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.18},
                {type: 'stun', value: 7}
            ];
        },
        activeType: 'combat',
        cooldown: () => 64,
        icon: 'mdi-chess-rook',
        activeIcon: 'mdi-chess-rook',
        activeColor: 'brown'
    },
    queen: {
        findZone: 170,
        findChance: 1 / buildNum(100, 'B'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(256, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 2 + 28},
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 200 + 2800},
                {isPositive: true, type: 'base', name: 'hordeFirstStrike', value: 0.6},
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.01},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 0.4},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.4}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: 9 + lvl},
                {type: 'damageMagic', value: 9 + lvl},
                {type: 'damageBio', value: 9 + lvl},
                {type: 'poison', value: 0.25},
                {type: 'heal', value: 0.1},
                {type: 'stun', value: 4}
            ];
        },
        activeType: 'combat',
        cooldown: () => 70,
        icon: 'mdi-chess-queen',
        activeIcon: 'mdi-chess-queen',
        activeColor: 'indigo'
    },
    king: {
        findZone: 200,
        findChance: 1 / buildNum(1, 'T'),
        unlock: 'hordeChessItems',
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(1.024, 'B');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 2000 + 4000},
                {isPositive: true, type: 'base', name: 'hordeRevive', value: 1}
            ];
        },
        active(lvl) {
            return [
                {type: 'heal', value: 1},
                {type: 'antidote', value: 1},
                {type: 'revive', value: 1},
                {type: 'stun', value: lvl + 24}
            ];
        },
        activeType: 'combat',
        cooldown: () => 540,
        icon: 'mdi-chess-king',
        activeIcon: 'mdi-chess-king',
        activeColor: 'red'
    },
}
