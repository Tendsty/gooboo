import { SECONDS_PER_DAY, SECONDS_PER_HOUR } from "../../constants";
import { buildNum } from "../../utils/format";

export default {
    aluminium: {
        price: {
            mining_oreAluminium: {base: 1000, increment: 50},
            mining_granite: {base: 800, increment: 800}
        },
        output: 'mining_barAluminium',
        timeNeeded: 300,
        minTemperature: 100
    },
    bronze: {
        price: {
            mining_oreCopper: {base: 900, increment: 45},
            mining_oreTin: {base: 100, increment: 5},
            mining_salt: {base: 150, increment: 50}
        },
        output: 'mining_barBronze',
        timeNeeded: SECONDS_PER_HOUR,
        minTemperature: 275
    },
    steel: {
        price: {
            mining_oreIron: {base: 1000, increment: 50},
            mining_coal: {base: 2, increment: 0}
        },
        output: 'mining_barSteel',
        timeNeeded: 8 * SECONDS_PER_HOUR,
        minTemperature: 500
    },
    titanium: {
        price: {
            mining_oreTitanium: {base: 1000, increment: 50},
            mining_sulfur: {base: 200, increment: 10},
            mining_niter: {base: 50, increment: 0}
        },
        output: 'mining_barTitanium',
        timeNeeded: 3 * SECONDS_PER_DAY,
        minTemperature: 800
    },
    shiny: {
        price: {
            mining_orePlatinum: {base: 1000, increment: 50},
            mining_obsidian: {base: buildNum(2, 'M'), increment: buildNum(100, 'K')}
        },
        output: 'mining_barShiny',
        timeNeeded: 30 * SECONDS_PER_DAY,
        minTemperature: 1200
    },
    iridium: {
        price: {
            mining_oreIridium: {base: 1000, increment: 50},
            mining_helium: {base: buildNum(10, 'K'), increment: 2500}
        },
        output: 'mining_barIridium',
        timeNeeded: 365 * SECONDS_PER_DAY,
        minTemperature: 1750
    },
    darkIron: {
        price: {
            mining_oreIron: {base: buildNum(10, 'M'), increment: buildNum(500, 'K')},
            mining_oreOsmium: {base: 1000, increment: 50},
            mining_deeprock: {base: buildNum(100, 'M'), increment: buildNum(25, 'M')},
            mining_neon: {base: buildNum(10, 'K'), increment: 2500}
        },
        output: 'mining_barDarkIron',
        timeNeeded: 5000 * SECONDS_PER_DAY,
        minTemperature: 2500
    },
}
