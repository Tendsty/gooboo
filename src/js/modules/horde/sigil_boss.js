import { buildNum } from "../../utils/format";

export default {
    // Regular enemy actives
    pistol_gun: {
        minZone: Infinity,
        icon: 'mdi-pistol',
        color: 'blue',
        active: {
            effect() {
                return [
                    {type: 'damagePhysic', value: 3.35}
                ];
            },
            cooldown: () => 4,
            startCooldown: () => 4,
            uses: lvl => lvl * 4
        }
    },
    rifle_gun: {
        minZone: Infinity,
        icon: 'mdi-pistol',
        color: 'orange',
        active: {
            effect() {
                return [
                    {type: 'damagePhysic', value: 2},
                    {type: 'damageMagic', value: 0.75}
                ];
            },
            cooldown: () => 2,
            startCooldown: () => 2,
            uses: lvl => lvl * 6
        }
    },
    shotgun_gun: {
        minZone: Infinity,
        icon: 'mdi-pistol',
        color: 'green',
        active: {
            effect() {
                return [
                    {type: 'damagePhysic', value: 2.6},
                    {type: 'damageMagic', value: 2.6},
                    {type: 'damageBio', value: 2.6}
                ];
            },
            cooldown: () => 13,
            startCooldown: () => 13,
            uses: lvl => lvl * 2
        }
    },
    sniper_gun: {
        minZone: Infinity,
        icon: 'mdi-target',
        color: 'purple',
        active: {
            effect() {
                return [
                    {type: 'damagePhysic', value: 11.5, canCrit: 8}
                ];
            },
            cooldown: () => 25,
            startCooldown: () => 25,
            uses: lvl => lvl * 1
        }
    },
    war_grenade: {
        minZone: Infinity,
        icon: 'mdi-bomb',
        color: 'pale-green',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 2.75},
                    {type: 'stun', value: 2},
                    {type: 'silence', value: 8}
                ];
            },
            cooldown: () => 12,
            startCooldown: () => 6,
            uses: lvl => lvl
        }
    },
    war_bandage: {
        minZone: Infinity,
        icon: 'mdi-bandage',
        color: 'pale-orange',
        active: {
            effect() {
                return [
                    {type: 'heal', value: 0.4}
                ];
            },
            cooldown: () => 8,
            startCooldown: () => 4,
            uses: lvl => lvl
        }
    },
    monkey_dart: {
        minZone: Infinity,
        icon: 'mdi-arrow-projectile',
        color: 'orange',
        active: {
            effect(lvl) {
                return [
                    {type: 'damagePhysic', value: lvl * 0.5 + 2.25},
                ];
            },
            cooldown: () => 5,
            startCooldown: () => 3,
            uses: () => null
        }
    },
    monkey_fire: {
        minZone: Infinity,
        icon: 'mdi-fire',
        color: 'orange',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 4.5},
                ];
            },
            cooldown: () => 8,
            startCooldown: () => 4,
            uses: lvl => lvl * 4
        }
    },
    monkey_ice: {
        minZone: Infinity,
        icon: 'mdi-snowflake',
        color: 'cyan',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 6.75},
                    {type: 'stun', value: 3},
                ];
            },
            cooldown: () => 14,
            startCooldown: () => 7,
            uses: lvl => lvl * 2
        }
    },
    monkey_lightning: {
        minZone: Infinity,
        icon: 'mdi-flash',
        color: 'yellow',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 5.1},
                    {type: 'silence', value: 3},
                ];
            },
            cooldown: () => 10,
            startCooldown: () => 5,
            uses: lvl => lvl * 3
        }
    },
    cute_ram: {
        minZone: Infinity,
        icon: 'mdi-arrow-collapse-right',
        color: 'red',
        active: {
            effect(lvl) {
                return [
                    {type: 'damageBio', value: lvl + 3.5},
                    {type: 'stun', value: 3},
                    {type: 'gainStat', stat: 'bioAttack_mult', value: 1.2},
                ];
            },
            cooldown: () => 12,
            startCooldown: () => 8,
            uses: lvl => lvl * 3
        }
    },
    cute_eatCarrot: {
        minZone: Infinity,
        icon: 'mdi-carrot',
        color: 'orange',
        active: {
            effect(lvl) {
                return [
                    {type: 'heal', value: lvl * 0.05 + 0.4},
                    {type: 'gainStat', stat: 'attack_mult', value: 1.1},
                ];
            },
            cooldown: () => 16,
            startCooldown: () => 12,
            uses: lvl => lvl * 2
        }
    },
    cute_bark: {
        minZone: Infinity,
        icon: 'mdi-volume-high',
        color: 'cyan',
        active: {
            effect() {
                return [
                    {type: 'maxdamageBio', value: 0.06},
                    {type: 'removeDivisionShield', value: 1},
                ];
            },
            cooldown: () => 11,
            startCooldown: () => 6,
            uses: lvl => lvl
        }
    },
    cute_bite: {
        minZone: Infinity,
        icon: 'mdi-tooth',
        color: 'brown',
        active: {
            effect(lvl) {
                return [
                    {type: 'damageBio', value: lvl * 1.5 + 5},
                ];
            },
            cooldown: () => 22,
            startCooldown: () => 8,
            uses: () => null
        }
    },
    cute_kick: {
        minZone: Infinity,
        icon: 'mdi-seat-legroom-extra',
        color: 'amber',
        active: {
            effect(lvl) {
                return [
                    {type: 'damageBio', value: lvl * 0.3 + 2.5},
                    {type: 'silence', value: 2},
                ];
            },
            cooldown: () => 6,
            startCooldown: () => 0,
            uses: lvl => lvl * 8
        }
    },
    cute_claws: {
        minZone: Infinity,
        icon: 'mdi-nail',
        color: 'light-green',
        active: {
            effect(lvl) {
                return [
                    {type: 'maxdamageBio', value: 0.1},
                    {type: 'damageBio', value: lvl * 1.3 + 4.5},
                ];
            },
            cooldown: () => 15,
            startCooldown: () => 10,
            uses: lvl => lvl * 3
        }
    },

    // Boss actives
    ohilio_megagun: {
        minZone: Infinity,
        icon: 'mdi-pistol',
        color: 'orange-red',
        active: {
            effect() {
                return [
                    {type: 'damagePhysic', value: buildNum(1, 'M')},
                    {type: 'damageMagic', value: buildNum(1, 'M')},
                    {type: 'damageBio', value: buildNum(1, 'M')}
                ];
            },
            cooldown: () => 5,
            startCooldown: () => 5,
            uses: () => null
        }
    },
    chriz_magicMissile: {
        minZone: Infinity,
        icon: 'mdi-motion',
        color: 'indigo',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 3},
                ];
            },
            cooldown: () => 6,
            startCooldown: () => 0,
            uses: () => 25
        }
    },
    chriz_fireball: {
        minZone: Infinity,
        icon: 'mdi-fire',
        color: 'orange',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 11.5},
                ];
            },
            cooldown: () => 22,
            startCooldown: () => 4,
            uses: () => null
        }
    },
    chriz_iceBlast: {
        minZone: Infinity,
        icon: 'mdi-snowflake',
        color: 'cyan',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 6},
                    {type: 'stun', value: 8},
                ];
            },
            cooldown: () => 30,
            startCooldown: () => 10,
            uses: () => null
        }
    },
    chriz_lightningStrike: {
        minZone: Infinity,
        icon: 'mdi-flash',
        color: 'yellow',
        active: {
            effect() {
                return [
                    {type: 'damageMagic', value: 7.25},
                    {type: 'silence', value: 5},
                ];
            },
            cooldown: () => 15,
            startCooldown: () => 15,
            uses: () => null
        }
    },
    chriz_heal: {
        minZone: Infinity,
        icon: 'mdi-medical-bag',
        color: 'light-green',
        active: {
            effect() {
                return [
                    {type: 'heal', value: 0.4},
                ];
            },
            cooldown: () => 45,
            startCooldown: () => 45,
            uses: () => 3
        }
    },
    mina_charm: {
        minZone: Infinity,
        icon: 'mdi-heart',
        color: 'pink',
        active: {
            effect() {
                return [
                    {type: 'silence', value: 5},
                    {type: 'gainStat', stat: 'bioAttack_mult', value: 1.6},
                    {type: 'gainStat', stat: 'execute_base', value: 0.05},
                ];
            },
            cooldown: () => 30,
            startCooldown: () => 15,
            uses: () => null
        }
    },
}
