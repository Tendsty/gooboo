export default {
    // warzone
    soldier_1: {
        attack: 1.75,
        health: 50,
        sigil: {
            rifle_gun: 1
        }
    },
    soldier_2: {
        attack: 1.75,
        health: 45,
        sigil: {
            rifle_gun: 1,
            war_grenade: 1
        }
    },
    soldier_3: {
        attack: 1.6,
        health: 50,
        sigil: {
            rifle_gun: 1,
            war_bandage: 1
        }
    },
    officer_1: {
        attack: 1,
        health: 80,
        sigil: {
            pistol_gun: 1
        }
    },
    officer_2: {
        attack: 1,
        health: 72.5,
        sigil: {
            pistol_gun: 1,
            war_grenade: 1
        }
    },
    officer_3: {
        attack: 0.9,
        health: 80,
        sigil: {
            pistol_gun: 1,
            war_bandage: 1
        }
    },
    hunter: {
        attack: 1.2,
        health: 55,
        sigil: {
            shotgun_gun: 1,
            war_grenade: 2,
            war_bandage: 2
        }
    },
    sniper: {
        attack: 1.5,
        health: 40,
        stats: {
            critChance_base: 0.25,
            critMult_base: 0.5
        },
        sigil: {
            sniper_gun: 1
        }
    },

    // monkey jungle
    strongMonkey: {
        attack: 2.5,
        health: 40,
        stats: {
            physicTaken_mult: 1.25,
            magicTaken_mult: 0.75,
        },
        sigil: {}
    },
    angryMonkey: {
        attack: 1.7,
        health: 35,
        stats: {
            physicTaken_mult: 1.25,
            magicTaken_mult: 0.75,
            critChance_base: 0.4,
            critMult_base: 1.25,
        },
        sigil: {}
    },
    dartMonkey: {
        attack: 1.8,
        health: 45,
        stats: {
            physicTaken_mult: 1.25,
            magicTaken_mult: 0.75,
        },
        sigil: {
            monkey_dart: 1
        }
    },
    monkeyWizard_1: {
        attack: 1.75,
        health: 50,
        stats: {
            physicTaken_mult: 0.75,
            magicTaken_mult: 1.25,
        },
        sigil: {
            monkey_fire: 1
        }
    },
    monkeyWizard_2: {
        attack: 1.75,
        health: 50,
        stats: {
            physicTaken_mult: 0.75,
            magicTaken_mult: 1.25,
        },
        sigil: {
            monkey_ice: 1
        }
    },
    monkeyWizard_3: {
        attack: 1.75,
        health: 50,
        stats: {
            physicTaken_mult: 0.75,
            magicTaken_mult: 1.25,
        },
        sigil: {
            monkey_lightning: 1
        }
    },
    monkeyDefender: {
        attack: 2,
        health: 50,
        stats: {
            physicTaken_mult: 0.1,
            magicTaken_mult: 1.5,
        },
        sigil: {}
    },
    monkeyMonk: {
        attack: 2,
        health: 50,
        stats: {
            physicTaken_mult: 1.5,
            magicTaken_mult: 0.1,
        },
        sigil: {}
    },

    // love island
    puppy: {
        attack: 1.4,
        health: 60,
        sigil: {
            cute_bark: 1,
            cute_bite: 1,
        }
    },
    kitten: {
        attack: 2.8,
        health: 30,
        sigil: {
            cute_claws: 1,
        }
    },
    seal: {
        attack: 1.6,
        health: 60,
        sigil: {
            cute_ram: 1,
        }
    },
    piglet: {
        attack: 0.8,
        health: 90,
        sigil: {
            cute_ram: 1,
            cute_eatCarrot: 1,
        }
    },
    panda: {
        attack: 2.5,
        health: 35,
        sigil: {
            cute_ram: 2,
        }
    },
    koala: {
        attack: 2.2,
        health: 40,
        sigil: {
            cute_kick: 1,
            cute_bite: 1,
        }
    },
    rabbit: {
        attack: 1.1,
        health: 70,
        sigil: {
            cute_kick: 1,
            cute_eatCarrot: 1,
        }
    },
    guineaPig: {
        attack: 1.6,
        health: 70,
        sigil: {}
    },
}
