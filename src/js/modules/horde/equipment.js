import { SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "../../constants";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    dagger: {
        findZone: 0,
        found: true,
        price(lvl) {
            return Math.pow(2, lvl - 1) * 10;
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 4 + 6}
            ];
        },
        active(lvl) {
            return [
                {type: 'buff', value: 40, effect: [
                    {type: 'base', name: 'hordeAttack', value: lvl * 5 + 30}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 300,
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
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 800 + 1200}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 0.225, int: 0.01}
            ];
        },
        activeType: 'combat',
        cooldown: () => 80,
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
                {type: 'reviveAll', value: null}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => SECONDS_PER_HOUR * 8 - lvl * 1800,
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
                {type: 'bone', value: 2.3 + lvl * 0.15}
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
            return Math.pow(16, getSequence(1, lvl - 1)) * 80;
        },
        cap: 4,
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: lvl + 2}
            ];
        },
        active() {
            return [
                {type: 'stun', value: 8}
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
                {type: 'damagePhysic', value: 7.5, str: 0.1, canCrit: 0.1 * lvl}
            ];
        },
        activeType: 'combat',
        cooldown: () => 35,
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
        active() {
            return [
                {type: 'damageMagic', value: 4.5, int: 0.08},
                {type: 'heal', value: 0.03, int: 0.002}
            ];
        },
        activeType: 'combat',
        cooldown: () => 16,
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
                {type: 'permanentStat', stat: 'hordeItemChance_mult', value: 0.25}
            ];
        },
        activeType: 'utility',
        cooldown: () => 7200,
        icon: 'mdi-clover',
        activeIcon: 'mdi-clover',
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
                {type: 'monsterPart', value: 9.75 + lvl * 0.25}
            ];
        },
        activeType: 'utility',
        cooldown: () => 45,
        icon: 'mdi-stomach',
        activeIcon: 'mdi-stomach',
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
        active() {
            return [
                {type: 'damageMagic', value: 13.5, int: 0.18},
                {type: 'buff', value: 20, effect: [
                    {type: 'base', name: 'hordeCritChance', value: 0.5}
                ]}
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
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 500 + 1000},
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.04}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 0.65, int: 0.02},
                {type: 'buff', value: 210, effect: [
                    {type: 'base', name: 'hordeRecovery', value: 0.15}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 1800,
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
                {type: 'removeAttack', value: 0.4}
            ];
        },
        activeType: 'combat',
        cooldown: () => 1200,
        icon: 'mdi-snowflake',
        activeIcon: 'mdi-snowflake',
        activeColor: 'light-blue'
    },
    oppressor: {
        findZone: 22,
        findChance: 1 / buildNum(55, 'K'),
        price(lvl) {
            return Math.pow(6, lvl - 1) * 360;
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeEnemyActiveStart', value: 0.5}
            ];
        },
        active() {
            return [
                {type: 'silence', value: 10}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 80 - lvl * 5,
        icon: 'mdi-robot-angry',
        activeIcon: 'mdi-emoticon-devil',
        activeColor: 'pale-purple'
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
                {type: 'buff', value: 5, effect: [
                    {type: 'mult', name: 'hordePhysicTaken', value: 0}
                ]}
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
                {isPositive: true, type: 'base', name: 'hordeMinibossTime', value: -20}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageBio', value: 4.25 + lvl * 0.25, int: 0.1},
                {type: 'poison', value: 0.2, int: 0.01}
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
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 3 + 29},
                {isPositive: true, type: 'base', name: 'hordeMagicAttack', value: 0.15}
            ];
        },
        active() {
            return [
                {type: 'damageMagic', value: 25, int: 0.4}
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
                {type: 'permanentStat', stat: 'hordeAttack_mult', value: 0.1}
            ];
        },
        activeType: 'utility',
        cooldown: () => 2700,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-pentagram',
        activeColor: 'red'
    },
    brokenStopwatch: {
        findZone: 31,
        findChance: 1 / buildNum(25, 'K'),
        price(lvl) {
            return Math.pow(6, lvl - 1) * 3000;
        },
        cap: 5,
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeNostalgia', value: 0}
            ];
        },
        active(lvl) {
            return [
                {type: 'stun', value: 7 + lvl}
            ];
        },
        activeType: 'combat',
        cooldown: () => 60,
        icon: 'mdi-timer',
        activeIcon: 'mdi-timer',
        activeColor: 'skyblue'
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
        active() {
            return [
                {type: 'maxdamagePhysic', value: 0.05, str: 0.0004},
                {type: 'divisionShield', value: 8},
                {type: 'stun', value: 3}
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
            return Math.pow(3, lvl - 1) * 6000;
        },
        cap: 11,
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.15},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 1},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 1},
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.05 + 1.75},
                {type: 'damageMagic', value: lvl * 0.05 + 1.75},
                {type: 'damageBio', value: lvl * 0.05 + 1.75}
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
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.02},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'poison', value: lvl * 0.01 + 0.19, int: 0.01}
            ];
        },
        activeType: 'combat',
        cooldown: () => 16,
        icon: 'mdi-bottle-tonic-skull',
        activeIcon: 'mdi-bottle-tonic-skull',
        activeColor: 'light-green'
    },
    cleansingSpring: {
        findZone: 40,
        findChance: 1 / buildNum(200, 'K'),
        price(lvl) {
            return Math.pow(5, lvl - 1) * buildNum(10, 'K');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeStunResist', value: 1}
            ];
        },
        active() {
            return [
                {type: 'removeStun', value: null}
            ];
        },
        activeType: 'combat',
        usableInStun: true,
        cooldown: lvl => 32 - lvl * 2,
        icon: 'mdi-waterfall',
        activeIcon: 'mdi-water-opacity',
        activeColor: 'cyan'
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
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'damageBio', value: 2.6, int: 0.05},
                {type: 'poison', value: 0.1, int: 0.005}
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
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'currencyHordeSoulCorruptedGain', value: 1 / 1.5},
                {isPositive: true, type: 'base', name: 'hordeHeirloomChance', value: lvl * 0.001 + 0.004}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'heal', value: 1},
                {type: 'antidote', value: 1},
                {type: 'removeStun', value: null}
            ];
        },
        activeType: 'combat',
        usableInStun: true,
        cooldown: () => 1200,
        icon: 'mdi-necklace',
        activeIcon: 'mdi-flare',
        activeColor: 'lime'
    },
    mailbreaker: {
        findZone: 46,
        findChance: 1 / buildNum(375, 'K'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(18, 'K');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 2 + 18},
                {isPositive: true, type: 'base', name: 'hordeShieldbreak', value: 1}
            ];
        },
        active() {
            return [
                {type: 'removeDivisionShield', value: 1},
                {type: 'stun', value: 15}
            ];
        },
        activeType: 'combat',
        cooldown: () => 750,
        icon: 'mdi-sword',
        activeIcon: 'mdi-circle-off-outline',
        activeColor: 'pale-blue'
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
        active() {
            return [
                {type: 'damagePhysic', value: 7.35, str: 0.12}
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
        active() {
            return [
                {type: 'damagePhysic', value: 0.8, str: 0.04},
                {type: 'damageMagic', value: 3.4, int: 0.08},
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
            return Math.pow(4, lvl - 1) * buildNum(28, 'K');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.2},
                {isPositive: false, type: 'base', name: 'hordePhysicConversion', value: 2.5},
                {isPositive: true, type: 'base', name: 'hordePhysicAttack', value: 0.15}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.25 + 4.5, str: 0.1},
                {type: 'stun', value: 3}
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
            return Math.pow(4, lvl - 1) * buildNum(35, 'K');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.02},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.5}
            ];
        },
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.2 + 2.3, str: 0.04},
                {type: 'maxdamageBio', value: 0.05, int: 0.0004}
            ];
        },
        activeType: 'combat',
        cooldown: () => 15,
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
                {type: 'bone', value: 51 + lvl * 3}
            ];
        },
        activeType: 'utility',
        cooldown: () => 6 * SECONDS_PER_HOUR,
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
                {type: 'heal', value: 0.01 * lvl + 0.44, int: 0.02},
                {type: 'removeStun', value: null},
                {type: 'stun', value: 20}
            ];
        },
        activeType: 'combat',
        usableInStun: true,
        cooldown: () => 220,
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
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.125},
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 0.25},
                {isPositive: true, type: 'base', name: 'hordeBioAttack', value: 0.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'heal', value: 0.14 + lvl * 0.0075, int: 0.008},
                {type: 'buff', value: 12, effect: [
                    {type: 'mult', name: 'hordeToxic', value: 2}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 130,
        icon: 'mdi-bird',
        activeIcon: 'mdi-feather',
        activeColor: 'skyblue'
    },
    shieldDissolver: {
        findZone: 61,
        findChance: 1 / buildNum(1.4, 'M'),
        price(lvl) {
            return Math.pow(7, lvl - 1) * buildNum(90, 'K');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeShieldbreak', value: 3},
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 1 / 1.1},
                {isPositive: false, type: 'mult', name: 'hordeDivisionShield', value: 0}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'removeDivisionShield', value: 0.3}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 17 - lvl,
        icon: 'mdi-shield-off',
        activeIcon: 'mdi-shield-remove',
        activeColor: 'deep-orange'
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
                {isPositive: true, type: 'bonus', name: 'hordeCorruption', value: -0.09 - lvl * 0.01},
                {isPositive: true, type: 'base', name: 'hordeNostalgia', value: 10}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.25},
                {type: 'stun', value: 50}
            ];
        },
        activeType: 'combat',
        cooldown: () => 3 * SECONDS_PER_HOUR,
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
        cap: 16,
        stats(lvl) {
            return [
                {isPositive: true, type: 'bonus', name: 'hordeCorruption', value: -0.23 - lvl * 0.02}
            ];
        },
        active() {
            return [
                {type: 'removeAttack', value: 0.1},
                {type: 'heal', value: 0.15, int: 0.007}
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
        active() {
            return [
                {type: 'damagePhysic', value: 6.66, str: 0.0666, int: 0.0666}
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
                {isPositive: true, type: 'mult', name: 'currencyHordeBoneGain', value: 2.25},
                {isPositive: true, type: 'mult', name: 'currencyHordeMonsterPartGain', value: 1.2},
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
                {type: 'removeAttack', value: 0.8},
                {type: 'silence', value: 90},
                {type: 'buff', value: 300, effect: [
                    {type: 'base', name: 'hordeCritChance', value: 0.75},
                    {type: 'base', name: 'hordeCritMult', value: 3},
                    {type: 'base', name: 'hordeSpellblade', value: 6.5},
                    {type: 'base', name: 'hordeCutting', value: 0.2},
                    {type: 'base', name: 'hordeShieldbreak', value: 15},
                    {type: 'base', name: 'hordeStunResist', value: 15},
                    {type: 'base', name: 'hordeRecovery', value: 0.25}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => SECONDS_PER_DAY - (lvl - 1) * SECONDS_PER_HOUR,
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
                {type: 'heal', value: 0.75, int: 0.03},
                {type: 'revive', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 320,
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
                {type: 'heal', value: 0.04, int: 0.002},
                {type: 'removeAttack', value: 0.02},
                {type: 'stun', value: 2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 22,
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
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.05},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'poison', value: lvl * 0.04 + 0.16, int: 0.01}
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
                {isPositive: true, type: 'mult', name: 'currencyHordeSoulCorruptedGain', value: 1.05},
                {isPositive: true, type: 'mult', name: 'hordeHeirloomChance', value: 1.05},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'maxdamageBio', value: 0.12, int: 0.001},
                {type: 'damageBio', value: 5 + lvl * 0.3}
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
                {isPositive: true, type: 'mult', name: 'hordeCorruption', value: 1 / 1.2}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'buff', value: lvl * 2 + 14, effect: [
                    {type: 'mult', name: 'hordeAttack', value: 1.5},
                    {type: 'mult', name: 'hordeHealth', value: 1.5}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 110,
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
                {type: 'buff', value: 5, effect: [
                    {type: 'mult', name: 'hordeMagicTaken', value: 0}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 90 - lvl * 6,
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
        active() {
            return [
                {type: 'buff', value: 5, effect: [
                    {type: 'mult', name: 'hordeBioTaken', value: 0}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 90 - lvl * 6,
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
                {type: 'permanentStat', stat: 'hordeHealth_mult', value: 0.15}
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
                {type: 'maxdamageBio', value: 0.08, str: 0.0007},
                {type: 'damageBio', value: 1.68 + lvl * 0.02, int: 0.03}
            ];
        },
        activeType: 'combat',
        cooldown: () => 30,
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
                {type: 'damageMagic', value: 3.18 + lvl * 0.02},
                {type: 'stun', value: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 10,
        icon: 'mdi-book',
        activeIcon: 'mdi-book-alert',
        activeColor: 'indigo'
    },
    chocolateMilk: {
        findZone: 107,
        findChance: 1 / buildNum(40, 'M'),
        price(lvl) {
            return Math.pow(5, lvl - 1) * buildNum(4, 'M');
        },
        cap: 11,
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'currencyHordeBoneGain', value: lvl * 0.01 + 1.29},
                {isPositive: false, type: 'mult', name: 'currencyHordeMonsterPartGain', value: 1 / 1.5}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'permanentStat', stat: 'currencyHordeBoneGain_mult', value: 0.18}
            ];
        },
        activeType: 'utility',
        cooldown: () => 4200,
        icon: 'mdi-beer',
        activeIcon: 'mdi-beer',
        activeColor: 'brown'
    },
    bigHammer: {
        findZone: 114,
        findChance: 1 / buildNum(80, 'M'),
        price(lvl) {
            return Math.pow(7, lvl - 1) * buildNum(7, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.25},
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.15},
                {isPositive: true, type: 'base', name: 'hordeCritMult', value: lvl * 0.02 + 1.08}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'damagePhysic', value: 18.5},
                {type: 'stun', value: 8},
                {type: 'silence', value: 25}
            ];
        },
        activeType: 'combat',
        cooldown: () => 260,
        icon: 'mdi-hammer',
        activeIcon: 'mdi-hammer',
        activeColor: 'pale-blue'
    },
    spookyPumpkin: {
        findZone: 121,
        findChance: 1 / buildNum(160, 'M'),
        price(lvl) {
            return Math.pow(9, lvl - 1) * buildNum(12, 'M');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeStunResist', value: 4},
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 1 / 1.25},
                {isPositive: false, type: 'base', name: 'hordeMagicTaken', value: 0.75}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'heal', value: 0.1, int: 0.005},
                {type: 'antidote', value: 1},
                {type: 'removeStun', value: null}
            ];
        },
        activeType: 'combat',
        usableInStun: true,
        cooldown: lvl => 53 - 3 * lvl,
        icon: 'mdi-halloween',
        activeIcon: 'mdi-pumpkin',
        activeColor: 'orange'
    },
    strangeChemical: {
        findZone: 128,
        findChance: 1 / buildNum(320, 'M'),
        price(lvl) {
            return Math.pow(5, lvl - 1) * buildNum(20, 'M');
        },
        cap: 11,
        stats(lvl) {
            return [
                {isPositive: true, type: 'mult', name: 'currencyHordeMonsterPartGain', value: lvl * 0.01 + 1.29},
                {isPositive: false, type: 'mult', name: 'currencyHordeBoneGain', value: 1 / 4},
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'permanentStat', stat: 'currencyHordeMonsterPartGain_mult', value: 0.225}
            ];
        },
        activeType: 'utility',
        cooldown: () => 18 * SECONDS_PER_HOUR,
        icon: 'mdi-test-tube',
        activeIcon: 'mdi-test-tube',
        activeColor: 'pink-purple'
    },
    forbiddenHeartShield: {
        findZone: 135,
        findChance: 1 / buildNum(640, 'M'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(35, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: lvl * 2 + 34},
                {isPositive: true, type: 'base', name: 'hordeStunResist', value: 12},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'heal', value: 0.12, int: 0.006},
                {type: 'divisionShield', value: lvl + 11}
            ];
        },
        activeType: 'combat',
        cooldown: () => 140,
        icon: 'mdi-heart-half-full',
        activeIcon: 'mdi-heart-pulse',
        activeColor: 'deep-purple'
    },
    cloudStaff: {
        findZone: 142,
        findChance: 1 / buildNum(1.2, 'B'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(60, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeFirstStrike', value: lvl * 0.04 + 1.76},
                {isPositive: true, type: 'base', name: 'hordeSpellblade', value: lvl * 0.01 + 0.49},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: 2}
            ];
        },
        active() {
            return [
                {type: 'damageMagic', value: 3.65, int: 0.11},
                {type: 'divisionShield', value: 2}
            ];
        },
        activeType: 'combat',
        cooldown: () => 12,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-cloud',
        activeColor: 'skyblue'
    },
    secretWeapon: {
        findZone: 149,
        findChance: 1 / buildNum(2.4, 'B'),
        price(lvl) {
            return Math.pow(8, lvl - 1) * buildNum(110, 'M');
        },
        cap: 21,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.1},
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.06},
                {isPositive: false, type: 'mult', name: 'hordeRecovery', value: 0},
                {isPositive: false, type: 'mult', name: 'hordeDivisionShield', value: 0},
                {isPositive: false, type: 'mult', name: 'hordeRevive', value: 0}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'poison', value: 24, str: 0.25, int: 0.25},
                {type: 'silence', value: lvl + 29},
                {type: 'buff', value: 35, effect: [
                    {type: 'base', name: 'hordeCutting', value: 0.1}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 720,
        icon: 'mdi-eyedropper',
        activeIcon: 'mdi-virus',
        activeColor: 'lime'
    },
    bomb: {
        findZone: 156,
        findChance: 1 / buildNum(4.8, 'B'),
        price(lvl) {
            return Math.pow(5, lvl - 1) * buildNum(175, 'M');
        },
        cap: 11,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeAttack', value: 1.5},
                {isPositive: true, type: 'mult', name: 'hordeHealth', value: 1.35},
                {isPositive: false, type: 'mult', name: 'currencyHordeBoneGain', value: 0},
                {isPositive: false, type: 'mult', name: 'currencyHordeMonsterPartGain', value: 0}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'damageMagic', value: 38, int: 0.75}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 3090 - 90 * lvl,
        icon: 'mdi-bomb',
        activeIcon: 'mdi-bomb',
        activeColor: 'red'
    },
    leechingStaff: {
        findZone: 163,
        findChance: 1 / buildNum(10, 'B'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(320, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 3 + 112},
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.03}
            ];
        },
        active() {
            return [
                {type: 'maxdamageBio', value: 0.125},
                {type: 'heal', value: 0.125}
            ];
        },
        activeType: 'combat',
        cooldown: () => 52,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-swap-horizontal',
        activeColor: 'light-green'
    },
    shatteredGem: {
        findZone: 170,
        findChance: 1 / buildNum(20, 'B'),
        price(lvl) {
            return Math.pow(10, lvl - 1) * buildNum(550, 'M');
        },
        stats(lvl) {
            return [
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 0.5},
                {isPositive: true, type: 'base', name: 'hordeHeirloomChance', value: lvl * 0.001 + 0.009}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'permanentStat', stat: 'currencyHordeSoulCorruptedGain_mult', value: 0.03}
            ];
        },
        activeType: 'utility',
        cooldown: () => 36 * SECONDS_PER_HOUR,
        icon: 'mdi-rhombus-split',
        activeIcon: 'mdi-rhombus',
        activeColor: 'light-blue'
    },
    hourglass: {
        findZone: 177,
        findChance: 1 / buildNum(40, 'B'),
        price(lvl) {
            return Math.pow(4, lvl - 1) * buildNum(975, 'M');
        },
        cap: 11,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeHaste', value: 15}
            ];
        },
        active(lvl) {
            return [
                {type: 'buff', value: 45, effect: [
                    {type: 'base', name: 'hordeHaste', value: 50},
                    {type: 'base', name: 'hordeSpellblade', value: lvl * 0.05 + 1.45}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 20 * SECONDS_PER_MINUTE,
        icon: 'mdi-timer-sand',
        activeIcon: 'mdi-timer-sand-complete',
        activeColor: 'pale-yellow'
    },
    glue: {
        findZone: 184,
        findChance: 1 / buildNum(80, 'B'),
        price(lvl) {
            return Math.pow(8, lvl - 1) * buildNum(1.75, 'B');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeAttack', value: 1.35},
                {isPositive: false, type: 'base', name: 'hordeHaste', value: -30}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'maxdamageBio', value: 0.3, int: 0.0025},
                {type: 'damageMagic', value: lvl * 0.5 + 7, int: 0.1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 40,
        icon: 'mdi-bottle-tonic',
        activeIcon: 'mdi-liquid-spot',
        activeColor: 'pale-green'
    },
    firework: {
        findZone: 191,
        findChance: 1 / buildNum(160, 'B'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(3, 'B');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeAttack', value: lvl * 2 + 68},
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.2},
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.01}
            ];
        },
        active() {
            return [
                {type: 'damageBio', value: 18, int: 0.35},
                {type: 'poison', value: 2.75, int: 0.13},
                {type: 'buff', value: 15, effect: [
                    {type: 'base', name: 'hordeCritMult', value: 5.75}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 290,
        icon: 'mdi-firework',
        activeIcon: 'mdi-firework',
        activeColor: 'pink-purple'
    },
    bowTie: {
        findZone: 198,
        findChance: 1 / buildNum(320, 'B'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(5, 'B');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 400 + 8600},
                {isPositive: true, type: 'base', name: 'hordeDivisionShield', value: lvl + 10},
                {isPositive: false, type: 'mult', name: 'hordeRecovery', value: 0}
            ];
        },
        masteryBoost: 0.25,
        active() {
            return [
                {type: 'heal', value: 0.07, int: 0.003},
                {type: 'divisionShield', value: 10}
            ];
        },
        activeType: 'combat',
        cooldown: () => 28,
        icon: 'mdi-bow-tie',
        activeIcon: 'mdi-bow-tie',
        activeColor: 'beige'
    },
    forbiddenStopwatch: {
        findZone: 205,
        findChance: 1 / buildNum(640, 'B'),
        price(lvl) {
            return Math.pow(6, lvl - 1) * buildNum(8, 'B');
        },
        cap: 6,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeHaste', value: 70},
                {isPositive: false, type: 'mult', name: 'hordeCorruption', value: 1.15}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'stun', value: lvl + 34}
            ];
        },
        activeType: 'combat',
        cooldown: () => 360,
        icon: 'mdi-timer',
        activeIcon: 'mdi-timer',
        activeColor: 'purple'
    },
    mysticalAccelerator: {
        findZone: 212,
        findChance: 1 / buildNum(1.25, 'T'),
        price(lvl) {
            return Math.pow(14, lvl - 1) * buildNum(12.5, 'B');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeShardChance', value: 1.5}
            ];
        },
        active() {
            return [
                {type: 'permanentStat', stat: 'hordeShardChance_mult', value: 0.35}
            ];
        },
        activeType: 'utility',
        cooldown: lvl => (19 - lvl) * SECONDS_PER_HOUR,
        icon: 'mdi-rotate-orbit',
        activeIcon: 'mdi-rotate-orbit',
        activeColor: 'teal'
    },
    blazingStaff: {
        findZone: 219,
        findChance: 1 / buildNum(2.5, 'T'),
        price(lvl) {
            return Math.pow(25, lvl - 1) * buildNum(18, 'B');
        },
        cap: 4,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeAttack', value: 2.5},
                {isPositive: false, type: 'mult', name: 'hordeHealth', value: 0.5}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damageMagic', value: lvl * 3 + 25, str: 0.6},
                {type: 'buff', value: 12, effect: [
                    {type: 'mult', name: 'hordeAttack', value: 1.4}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: lvl => 85 - lvl * 5,
        icon: 'mdi-magic-staff',
        activeIcon: 'mdi-fire-alert',
        activeColor: 'orange'
    },
    shield: {
        findZone: 226,
        findChance: 1 / buildNum(5, 'T'),
        price(lvl) {
            return Math.pow(25, lvl - 1) * buildNum(25, 'B');
        },
        cap: 4,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeDefense', value: 0.004}
            ];
        },
        active() {
            return [
                {type: 'buff', value: 8, effect: [
                    {type: 'mult', name: 'hordePhysicTaken', value: 0.25},
                    {type: 'mult', name: 'hordeMagicTaken', value: 0.25},
                    {type: 'mult', name: 'hordeBioTaken', value: 0.25}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: (lvl) => 90 - lvl * 5,
        icon: 'mdi-shield',
        activeIcon: 'mdi-shield-plus',
        activeColor: 'pale-blue'
    },
    armor: {
        findZone: 233,
        findChance: 1 / buildNum(10, 'T'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(35, 'B');
        },
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeHealth', value: lvl * 400 + buildNum(10.8, 'K')},
                {isPositive: true, type: 'base', name: 'hordeDefense', value: 0.0025}
            ];
        },
        active() {
            return [
                {type: 'divisionShield', value: 20}
            ];
        },
        activeType: 'combat',
        cooldown: () => 55,
        icon: 'mdi-tshirt-crew',
        activeIcon: 'mdi-shield-half-full',
        activeColor: 'indigo'
    },
    natureStone: {
        findZone: 240,
        findChance: 1 / buildNum(20, 'T'),
        price(lvl) {
            return Math.pow(20, lvl - 1) * buildNum(50, 'B');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.01},
                {isPositive: true, type: 'base', name: 'hordeHealing', value: 0.3}
            ];
        },
        active(lvl) {
            return [
                {type: 'maxdamageBio', value: 0.15, int: 0.0012},
                {type: 'heal', value: lvl * 0.04 + 0.3, int: 0.025}
            ];
        },
        activeType: 'combat',
        cooldown: () => 130,
        icon: 'mdi-alpha-x-circle',
        activeIcon: 'mdi-heart-circle',
        activeColor: 'light-green'
    },
    evergrowingVine: {
        findZone: 247,
        findChance: 1 / buildNum(40, 'T'),
        price(lvl) {
            return Math.pow(100, lvl - 1) * buildNum(75, 'B');
        },
        cap: 3,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeHealth', value: 1.5},
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: 0.2},
                {isPositive: false, type: 'mult', name: 'hordeDefense', value: 0},
                {isPositive: false, type: 'mult', name: 'hordeDivisionShield', value: 0},
                {isPositive: true, type: 'tag', name: 'hordePassiveRecovery', value: [0.1]}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'buff', value: lvl * 3 + 21, effect: [
                    {type: 'base', name: 'hordeHealing', value: 0.25}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 150,
        icon: 'mdi-lasso',
        activeIcon: 'mdi-heart-multiple',
        activeColor: 'green'
    },
    energyDrink: {
        findZone: 254,
        findChance: 1 / buildNum(80, 'T'),
        price(lvl) {
            return Math.pow(100, lvl - 1) * buildNum(140, 'B');
        },
        cap: 3,
        stats() {
            return [
                {isPositive: true, type: 'mult', name: 'hordeHaste', value: 1.5},
                {isPositive: false, type: 'mult', name: 'hordeCritMult', value: 0.5}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'buff', value: lvl + 7, effect: [
                    {type: 'base', name: 'hordeCritChance', value: 0.35},
                    {type: 'base', name: 'hordeCritMult', value: 0.8}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 48,
        icon: 'mdi-beer',
        activeIcon: 'mdi-lightning-bolt',
        activeColor: 'amber'
    },
    dragonheart: {
        findZone: 261,
        findChance: 1 / buildNum(160, 'T'),
        price(lvl) {
            return Math.pow(2, lvl - 1) * buildNum(225, 'B');
        },
        cap: 21,
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'hordeRecovery', value: lvl * 0.001 + 0.039},
                {isPositive: true, type: 'base', name: 'hordeDefense', value: 0.002}
            ];
        },
        active() {
            return [
                {type: 'buff', value: 14, effect: [
                    {type: 'base', name: 'hordeDefense', value: 0.05}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: () => 160,
        icon: 'mdi-heart',
        activeIcon: 'mdi-heart',
        activeColor: 'pink-purple'
    },
    prism: {
        findZone: 268,
        findChance: 1 / buildNum(320, 'T'),
        price(lvl) {
            return Math.pow(12, lvl - 1) * buildNum(400, 'B');
        },
        cap: 8,
        stats(lvl) {
            return [
                {isPositive: true, type: 'base', name: 'currencyHordeMysticalShardCap', value: lvl}
            ];
        },
        active() {
            return [
                {type: 'maxdamageBio', value: 0.3, str: 0.002},
                {type: 'damagePhysic', value: 15, str: 0.32},
                {type: 'poison', value: 1.25, int: 0.06}
            ];
        },
        activeCost: () => {
            return {mysticalShard: 1};
        },
        activeType: 'combat',
        cooldown: () => 330,
        icon: 'mdi-mirror-variant',
        activeIcon: 'mdi-mirror-variant',
        activeColor: 'teal'
    },
    deathsword: {
        findZone: 275,
        findChance: 1 / buildNum(640, 'T'),
        price(lvl) {
            return Math.pow(25, lvl - 1) * buildNum(700, 'B');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeExecute', value: 0.06}
            ];
        },
        active() {
            return [
                {type: 'buff', value: 5, effect: [
                    {type: 'base', name: 'hordeCutting', value: 0.15}
                ]}
            ];
        },
        activeType: 'combat',
        cooldown: (lvl) => 170 - 10 * lvl,
        icon: 'mdi-sword',
        activeIcon: 'mdi-skull',
        activeColor: 'darker-grey'
    },
    needle: {
        findZone: 282,
        findChance: 1 / buildNum(1.25, 'Qa'),
        price(lvl) {
            return Math.pow(25, lvl - 1) * buildNum(1.2, 'T');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeExecute', value: 0.04},
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.01}
            ];
        },
        active() {
            return [
                {type: 'maxdamageBio', value: 0.45, str: 0.003}
            ];
        },
        activeType: 'combat',
        activeCost: () => {
            return {health: 0.1};
        },
        cooldown: (lvl) => 275 - 15 * lvl,
        icon: 'mdi-nail',
        activeIcon: 'mdi-nail',
        activeColor: 'pale-purple'
    },
    mine: {
        findZone: 289,
        findChance: 1 / buildNum(2.5, 'Qa'),
        price(lvl) {
            return Math.pow(8, lvl - 1) * buildNum(2, 'T');
        },
        cap: 9,
        stats() {
            return [
                {isPositive: false, type: 'mult', name: 'hordeAttack', value: 1 / 1.25},
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.5},
                {isPositive: true, type: 'base', name: 'hordeHaste', value: 20},
                {isPositive: true, type: 'tag', name: 'hordeActiveDamageCrit', value: [0.3]}
            ];
        },
        masteryBoost: 0.25,
        active(lvl) {
            return [
                {type: 'damagePhysic', value: lvl * 0.25 + 4.25, str: 0.13, canCrit: 1}
            ];
        },
        activeType: 'combat',
        cooldown: () => 42,
        icon: 'mdi-mine',
        activeIcon: 'mdi-mine',
        activeColor: 'deep-orange'
    },
    maskOfJoy: {
        findZone: 296,
        findChance: 1 / buildNum(5, 'Qa'),
        price(lvl) {
            return Math.pow(25, lvl - 1) * buildNum(3.3, 'T');
        },
        cap: 5,
        stats() {
            return [
                {isPositive: true, type: 'base', name: 'hordeCritChance', value: 0.15},
                {isPositive: true, type: 'base', name: 'hordeHealing', value: 0.1},
                {isPositive: true, type: 'tag', name: 'hordeActiveHealCrit', value: [0.1]}
            ];
        },
        active() {
            return [
                {type: 'heal', value: 0.1, int: 0.005, canCrit: 0.4}
            ];
        },
        activeType: 'combat',
        cooldown: (lvl) => 275 - 15 * lvl,
        icon: 'mdi-drama-masks',
        activeIcon: 'mdi-drama-masks',
        activeColor: 'pale-green'
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
        active() {
            return [
                {type: 'damagePhysic', value: 2.7, str: 0.08}
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
        active() {
            return [
                {type: 'damageMagic', value: 4.15, int: 0.1},
                {type: 'stun', value: 2}
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
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.01},
                {isPositive: true, type: 'base', name: 'hordeCutting', value: 0.01}
            ];
        },
        active() {
            return [
                {type: 'maxdamageBio', value: 0.15, str: 0.0012},
                {type: 'poison', value: 0.2, int: 0.01}
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
                {type: 'removeAttack', value: 0.12},
                {type: 'stun', value: 10}
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
                {isPositive: true, type: 'base', name: 'hordeToxic', value: 0.005},
                {isPositive: false, type: 'base', name: 'hordeMagicConversion', value: 0.4},
                {isPositive: false, type: 'base', name: 'hordeBioConversion', value: 0.4}
            ];
        },
        active() {
            return [
                {type: 'damagePhysic', value: 3.4},
                {type: 'damageMagic', value: 3.4},
                {type: 'damageBio', value: 3.4},
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
