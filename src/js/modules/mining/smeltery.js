export default {
    aluminium: {
        price: {
            mining_oreAluminium: {base: 1000, increment: 50},
            mining_granite: {base: 800, increment: 800}
        },
        output: 'mining_barAluminium',
        timeNeeded: 60,
        minTemperature: 100
    },
    bronze: {
        price: {
            mining_oreCopper: {base: 900, increment: 45},
            mining_oreTin: {base: 100, increment: 5},
            mining_salt: {base: 150, increment: 50}
        },
        output: 'mining_barBronze',
        timeNeeded: 600,
        minTemperature: 275
    },
    steel: {
        price: {
            mining_oreIron: {base: 1000, increment: 50},
            mining_coal: {base: 2, increment: 0}
        },
        output: 'mining_barSteel',
        timeNeeded: 3600,
        minTemperature: 500
    },
    titanium: {
        price: {
            mining_oreTitanium: {base: 1000, increment: 50},
            mining_sulfur: {base: 200, increment: 10},
            mining_niter: {base: 50, increment: 0}
        },
        output: 'mining_barTitanium',
        timeNeeded: 18000,
        minTemperature: 800
    },
    shiny: {
        price: {
            mining_orePlatinum: {base: 1000, increment: 50},
            mining_obsidian: {base: 200, increment: 10}
        },
        output: 'mining_barShiny',
        timeNeeded: 86400,
        minTemperature: 1200
    }
}
