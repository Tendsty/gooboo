import { getSequence } from "../../utils/math";

export default {
    power: {
        icon: 'mdi-dumbbell',
        color: 'deep-orange',
        stats: lvl => {
            return {
                attack: {type: 'mult', amount: Math.pow(1.4, lvl)},
            };
        }
    },
    health: {
        icon: 'mdi-heart',
        color: 'red',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.5, lvl)},
            };
        }
    },
    bashing: {
        minZone: 22,
        icon: 'mdi-hammer',
        color: 'pale-red',
        active: {
            effect(lvl) {
                return [
                    {type: 'stun', value: lvl + 3}
                ];
            },
            cooldown: () => 5,
            startCooldown: () => 0,
            uses: lvl => lvl
        }
    },
    recovery: {
        minZone: 24,
        icon: 'mdi-medical-bag',
        color: 'green',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.12, lvl)},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.05 + 0.3}
                ];
            },
            cooldown: () => 20,
            startCooldown: () => 10,
            uses: lvl => lvl
        }
    },
    toughness: {
        minZone: 26,
        icon: 'mdi-shield-sword',
        color: 'cherry',
        stats: lvl => {
            return {
                physicTaken: {type: 'mult', amount: Math.pow(0.4, lvl)},
            };
        },
        exclude: ['wisdom']
    },
    strength: {
        minZone: 28,
        icon: 'mdi-arm-flex',
        color: 'red',
        stats: lvl => {
            return {
                physicAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 1.5 + 1.25}
                ];
            },
            cooldown: () => 8,
            startCooldown: () => 4,
            uses: () => null
        }
    },
    magic: {
        minZone: 30,
        icon: 'mdi-magic-staff',
        color: 'deep-purple',
        stats: lvl => {
            return {
                firstStrike: {type: 'base', amount: 2.25 * lvl},
                magicConversion: {type: 'base', amount: 1.5 * lvl},
            };
        }
    },
    magicBolt: {
        minZone: 32,
        icon: 'mdi-motion',
        color: 'indigo',
        stats: lvl => {
            return {
                magicAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
                magicConversion: {type: 'base', amount: 0.4 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 1.5 + 4}
                ];
            },
            cooldown: () => 13,
            startCooldown: () => 3,
            uses: lvl => lvl
        }
    },
    fireball: {
        minZone: 34,
        icon: 'mdi-fire-circle',
        color: 'orange',
        stats: lvl => {
            return {
                magicAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
                magicConversion: {type: 'base', amount: 0.4 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 1.75 + 3.5},
                    {type: 'stun', value: 2}
                ];
            },
            cooldown: () => 16,
            startCooldown: () => 5,
            uses: lvl => lvl
        }
    },
    incorporeal: {
        minZone: 36,
        icon: 'mdi-ghost',
        color: 'pink',
        stats: lvl => {
            return {
                loot: {type: 'mult', amount: Math.pow(0.25, lvl)},
            };
        }
    },
    focus: {
        minZone: 38,
        icon: 'mdi-image-filter-center-focus',
        color: 'red-pink',
        stats: lvl => {
            return {
                physicAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damagePhysic', value: getSequence(3, lvl) * 10}
                ];
            },
            cooldown: () => 28,
            startCooldown: () => 28,
            uses: () => 1
        }
    },
    wisdom: {
        minZone: 40,
        icon: 'mdi-shield-star',
        color: 'dark-blue',
        stats: lvl => {
            return {
                magicTaken: {type: 'mult', amount: Math.pow(0.4, lvl)},
            };
        },
        exclude: ['resilience']
    },
    sparks: {
        minZone: 42,
        icon: 'mdi-flash',
        color: 'yellow',
        stats: lvl => {
            return {
                magicConversion: {type: 'base', amount: 0.3 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.9 + 1.7}
                ];
            },
            cooldown: () => 5,
            startCooldown: () => 2,
            uses: lvl => lvl * 3
        }
    },
    protection: {
        minZone: 44,
        icon: 'mdi-shield',
        color: 'blue',
        stats: lvl => {
            return {
                divisionShield: {type: 'base', amount: 5 * lvl},
            };
        }
    },
    shielding: {
        minZone: 46,
        icon: 'mdi-circle-slice-8',
        color: 'teal',
        stats: lvl => {
            return {
                divisionShield: {type: 'base', amount: 3 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'divisionShield', value: lvl + 2}
                ];
            },
            cooldown: () => 11,
            startCooldown: () => 9,
            uses: lvl => lvl + 1
        }
    },
    resistance: {
        minZone: 48,
        icon: 'mdi-circle-half-full',
        color: 'brown',
        stats: lvl => {
            return {
                stunResist: {type: 'base', amount: getSequence(2, lvl)},
            };
        },
        active: {
            effect() {
                return [
                    {type: 'removeStun', value: null}
                ];
            },
            cooldown: () => 7,
            startCooldown: () => 2,
            uses: lvl => lvl
        }
    },
    precision: {
        minZone: 50,
        icon: 'mdi-bullseye-arrow',
        color: 'orange',
        stats: lvl => {
            return {
                critChance: {type: 'base', amount: 0.4 * lvl},
                critMult: {type: 'base', amount: 0.35 * lvl},
            };
        }
    },
    screaming: {
        minZone: 52,
        icon: 'mdi-bullhorn',
        color: 'cyan',
        active: {
            effect() {
                return [
                    {type: 'silence', value: 6}
                ];
            },
            cooldown: () => 10,
            startCooldown: () => 0,
            uses: lvl => lvl
        }
    },
    cure: {
        minZone: 54,
        icon: 'mdi-tea',
        color: 'lime',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.1, lvl)},
                bioTaken: {type: 'mult', amount: Math.pow(0.8, lvl)},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.025 + 0.075},
                    {type: 'antidote', value: 1}
                ];
            },
            cooldown: () => 16,
            startCooldown: () => 12,
            uses: lvl => lvl
        }
    },
    sharp: {
        minZone: 56,
        icon: 'mdi-nail',
        color: 'purple',
        stats: lvl => {
            return {
                cutting: {type: 'base', amount: 0.002 * lvl},
                bioConversion: {type: 'base', amount: 1.5 * lvl},
            };
        }
    },
    spitting: {
        minZone: 56,
        icon: 'mdi-water-opacity',
        color: 'light-green',
        stats: lvl => {
            return {
                bioAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
                bioConversion: {type: 'base', amount: 0.4 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageBio', value: lvl * 1.4 + 2}
                ];
            },
            cooldown: () => 15,
            startCooldown: () => 11,
            uses: () => null
        }
    },
    burst: {
        minZone: 58,
        icon: 'mdi-liquid-spot',
        color: 'pale-green',
        stats: lvl => {
            return {
                bioConversion: {type: 'base', amount: 0.3 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageBio', value: getSequence(2, lvl) * 1.5 + 4.5},
                    {type: 'poison', value: lvl * 0.15 + 0.25}
                ];
            },
            cooldown: () => 26,
            startCooldown: () => 18,
            uses: () => 2
        }
    },
    resilience: {
        minZone: 60,
        icon: 'mdi-shield-bug',
        color: 'green',
        stats: lvl => {
            return {
                bioTaken: {type: 'mult', amount: Math.pow(0.4, lvl)},
            };
        },
        exclude: ['toughness']
    },
    growing: {
        minZone: 62,
        icon: 'mdi-resize',
        color: 'beige',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.3, lvl)},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'raiseAttack', value: lvl * 0.05 + 0.2}
                ];
            },
            cooldown: () => 15,
            startCooldown: () => 15,
            uses: lvl => lvl + 2
        }
    },
    cold: {
        minZone: 64,
        icon: 'mdi-snowflake',
        color: 'dark-blue',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.2, lvl)},
                magicConversion: {type: 'base', amount: 0.25 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 2.5 + 2.75},
                    {type: 'stun', value: lvl * 2 + 6}
                ];
            },
            cooldown: () => 22,
            startCooldown: () => 14,
            uses: lvl => lvl
        }
    },
    angelic: {
        minZone: 66,
        icon: 'mdi-cross',
        color: 'yellow',
        stats: lvl => {
            return {
                revive: {type: 'base', amount: lvl},
                health: {type: 'mult', amount: 0.15 * lvl + 0.5},
            };
        }
    },
    fury: {
        minZone: 68,
        icon: 'mdi-emoticon-angry',
        color: 'amber',
        stats: lvl => {
            return {
                critChance: {type: 'base', amount: 0.55 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.6 + 1.55},
                    {type: 'raiseAttack', value: 0.03}
                ];
            },
            cooldown: () => 4,
            startCooldown: () => 2,
            uses: lvl => lvl * 4 + 2
        }
    },
    toxic: {
        minZone: 70,
        icon: 'mdi-bottle-tonic-skull',
        color: 'light-green',
        stats: lvl => {
            return {
                toxic: {type: 'base', amount: 0.01 * lvl},
                bioConversion: {type: 'base', amount: 1.5 * lvl},
            };
        }
    },
    foulBreath: {
        minZone: 80,
        icon: 'mdi-cloud-alert',
        color: 'green',
        stats: lvl => {
            return {
                bioAttack: {type: 'mult', amount: Math.pow(1.2, lvl)},
                bioConversion: {type: 'base', amount: 0.4 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'poison', value: lvl * 0.02 + 0.02}
                ];
            },
            cooldown: () => 11,
            startCooldown: () => 3,
            uses: lvl => lvl + 1
        }
    },
    nuke: {
        minZone: 90,
        icon: 'mdi-nuke',
        color: 'orange-red',
        cap: 5,
        active: {
            effect(lvl) {
                return [
                    {type: 'damagePhysic', value: Math.pow(2, lvl) * 250},
                    {type: 'damageMagic', value: Math.pow(2, lvl) * 250},
                    {type: 'damageBio', value: Math.pow(2, lvl) * 250},
                ];
            },
            cooldown: lvl => 75 - lvl * 5,
            startCooldown: lvl => 75 - lvl * 5,
            uses: () => 1
        }
    },
    rainbow: {
        minZone: 100,
        icon: 'mdi-looks',
        color: 'pink',
        cap: 1,
        stats: lvl => {
            return {
                magicConversion: {type: 'base', amount: lvl},
                bioConversion: {type: 'base', amount: lvl},
            };
        }
    },
    drain: {
        minZone: 110,
        icon: 'mdi-hvac',
        color: 'lime',
        stats: lvl => {
            return {
                health: {type: 'mult', amount: Math.pow(1.1, lvl)},
                divisionShield: {type: 'base', amount: 2 * lvl},
            };
        },
        active: {
            effect(lvl) {
                return [
                    {type: 'damageMagic', value: lvl * 0.2 + 0.85},
                    {type: 'damageBio', value: lvl * 0.2 + 0.85},
                    {type: 'heal', value: lvl * 0.01 + 0.05},
                ];
            },
            cooldown: () => 14,
            startCooldown: () => 10,
            uses: lvl => lvl + 2
        }
    },

    // Fallback sigil
    generic: {
        minZone: Infinity,
        icon: 'mdi-heart-flash',
        color: 'grey',
        stats: lvl => {
            return {
                attack: {type: 'mult', amount: Math.pow(1.2, lvl)},
                health: {type: 'mult', amount: Math.pow(1.2, lvl)},
            };
        }
    }
}
