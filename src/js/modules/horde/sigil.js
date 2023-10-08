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
        icon: 'mdi-hammer',
        color: 'pale-red',
        active: {
            effect() {
                return [
                    {type: 'stun', value: 3}
                ];
            },
            cooldown: () => 12,
            startCooldown: () => 0,
            uses: lvl => lvl
        }
    },
    recovery: {
        icon: 'mdi-medical-bag',
        color: 'green',
        active: {
            effect() {
                return [
                    {type: 'heal', value: 0.3}
                ];
            },
            cooldown: () => 20,
            startCooldown: () => 10,
            uses: lvl => lvl
        }
    },
    toughness: {
        minZone: 25,
        icon: 'mdi-shield-sword',
        color: 'cherry',
        stats: lvl => {
            return {
                physicTaken: {type: 'mult', amount: Math.pow(0.4, lvl)},
            };
        },
        exclude: ['wisdom']
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
    incorporeal: {
        minZone: 35,
        icon: 'mdi-ghost',
        color: 'pink',
        stats: lvl => {
            return {
                loot: {type: 'mult', amount: Math.pow(0.25, lvl)},
            };
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
    protection: {
        minZone: 45,
        icon: 'mdi-shield',
        color: 'blue',
        stats: lvl => {
            return {
                divisionShield: {type: 'base', amount: 5 * lvl},
            };
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
    sharp: {
        minZone: 55,
        icon: 'mdi-nail',
        color: 'purple',
        stats: lvl => {
            return {
                cutting: {type: 'base', amount: 0.002 * lvl},
                bioConversion: {type: 'base', amount: 1.5 * lvl},
            };
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
    angelic: {
        minZone: 65,
        icon: 'mdi-cross',
        color: 'yellow',
        stats: lvl => {
            return {
                revive: {type: 'base', amount: lvl},
                health: {type: 'mult', amount: 0.15 * lvl + 0.5},
            };
        }
    },
    toxic: {
        minZone: 70,
        icon: 'mdi-bottle-tonic-skull',
        color: 'light-green',
        stats: lvl => {
            return {
                toxic: {type: 'base', amount: 0.02 * lvl},
                bioConversion: {type: 'base', amount: 1.5 * lvl},
            };
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
