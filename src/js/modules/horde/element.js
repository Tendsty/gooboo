import { getApproaching } from "../../utils/math";

export default {
    ice: {
        minZone: 350,
        enemyStats: power => {
            return {
                attack: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 3)},
                health: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 7)},
            };
        },
        enemyActives: power => {
            let obj = {};
            if (power > 0) {
                obj.permafrost = {
                    icon: 'mdi-landslide',
                    color: 'skyblue',
                    effect: [
                        {type: 'removeAttack', value: getApproaching(0.01, 1, power)}
                    ],
                    cooldown: 10,
                    startCooldown: 10,
                    uses: null
                };
            }
            if (power >= 20) {
                obj.freeze = {
                    icon: 'mdi-snowflake',
                    color: 'dark-blue',
                    effect: [
                        {type: 'damageMagic', value: power * 0.1 + 0.75},
                        {type: 'stun', value: Math.floor(power / 5) + 1}
                    ],
                    cooldown: 22,
                    startCooldown: Math.max(0, 42 - power),
                    uses: power - 19
                };
            }
            return obj;
        },
        playerElemental: lvl => {
            return [
                {type: 'tag', name: 'hordeReduceAttackOnAttack', value: [0.04, lvl]}
            ];
        },
        playerUpgrade: lvl => {
            return [
                {type: 'mult', name: 'hordeHealth', value: Math.pow(1.1, lvl)}
            ];
        },
    },
    thunder: {
        minZone: 375,
        enemyStats: power => {
            return {
                attack: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 7)},
                health: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 3)},
            };
        },
        enemyActives: power => {
            let obj = {};
            if (power > 0) {
                obj.shock = {
                    icon: 'mdi-flash',
                    color: 'orange',
                    effect: [
                        {type: 'damageMagic', value: power * 0.1 + 2.65}
                    ],
                    cooldown: 1,
                    startCooldown: 0,
                    uses: power
                };
            }
            if (power >= 20) {
                obj.shockwave = {
                    icon: 'mdi-decagram-outline',
                    color: 'yellow',
                    effect: [
                        {type: 'damageMagic', value: power * 0.6 - 3.5},
                        {type: 'silence', value: Math.floor(power / 4) + 2}
                    ],
                    cooldown: 18,
                    startCooldown: Math.max(0, 38 - power),
                    uses: power - 19
                };
            }
            return obj;
        },
        playerElemental: lvl => {
            return [
                {type: 'base', name: 'hordeFirstStrike', value: lvl * 0.35}
            ];
        },
        playerUpgrade: lvl => {
            return [
                {type: 'mult', name: 'hordeAttack', value: Math.pow(1.1, lvl)}
            ];
        },
    },
    water: {
        minZone: 400,
        enemyStats: power => {
            return {
                attack: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 5)},
                health: {type: 'mult', amount: Math.pow(1.01, (power + 10) * 5)},
            };
        },
        enemyActives: power => {
            let obj = {};
            if (power > 0) {
                obj.waterBolt = {
                    icon: 'mdi-vector-line',
                    color: 'blue',
                    effect: [
                        {type: 'damageMagic', value: power * 0.3 + 2},
                        {type: 'heal', value: power * 0.01 + 0.05}
                    ],
                    cooldown: 14,
                    startCooldown: 14,
                    uses: power
                };
            }
            if (power >= 20) {
                obj.wave = {
                    icon: 'mdi-waves',
                    color: 'dark-blue',
                    effect: [
                        {type: 'damageMagic', value: power * 0.8 - 2}
                    ],
                    cooldown: 27,
                    startCooldown: Math.max(0, 47 - power),
                    uses: power - 19
                };
            }
            return obj;
        },
        playerElemental: lvl => {
            return [
                {type: 'base', name: 'hordeRecovery', value: lvl * 0.008}
            ];
        },
        playerUpgrade: lvl => {
            return [
                {type: 'mult', name: 'currencyHordeBoneGain', value: Math.pow(1.15, lvl)}
            ];
        },
    },
}
