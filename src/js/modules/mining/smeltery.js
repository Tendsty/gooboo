import { MINING_SMELTERY_ORE_INCREMENT, SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_YEAR } from "../../constants";

export default {
    aluminium: {
        price(lvl) {
            return {
                mining_oreAluminium: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_granite: Math.pow(1.1, lvl) * 7500,
            };
        },
        output: 'mining_barAluminium',
        timeNeeded: 300,
        minTemperature: 100
    },
    bronze: {
        price(lvl) {
            return {
                mining_oreCopper: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 900,
                mining_oreTin: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 100,
                mining_salt: Math.pow(1.06, lvl) * 800,
            };
        },
        output: 'mining_barBronze',
        timeNeeded: SECONDS_PER_HOUR,
        minTemperature: 275
    },
    steel: {
        price(lvl) {
            return {
                mining_oreIron: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_coal: 5,
            };
        },
        output: 'mining_barSteel',
        timeNeeded: 8 * SECONDS_PER_HOUR,
        minTemperature: 500
    },
    titanium: {
        price(lvl) {
            return {
                mining_oreTitanium: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_sulfur: Math.pow(1.06, lvl) * 200,
                mining_niter: 100,
            };
        },
        output: 'mining_barTitanium',
        timeNeeded: 3 * SECONDS_PER_DAY,
        minTemperature: 800
    },
    shiny: {
        price(lvl) {
            return {
                mining_orePlatinum: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_obsidian: Math.pow(1.1, lvl) * 2e6,
            };
        },
        output: 'mining_barShiny',
        timeNeeded: 30 * SECONDS_PER_DAY,
        minTemperature: 1250
    },
    iridium: {
        price(lvl) {
            return {
                mining_oreIridium: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_helium: Math.pow(1.1, lvl) * 1e4,
            };
        },
        output: 'mining_barIridium',
        timeNeeded: SECONDS_PER_YEAR,
        minTemperature: 2000
    },
    darkIron: {
        price(lvl) {
            return {
                mining_oreIron: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1e7,
                mining_oreOsmium: Math.pow(MINING_SMELTERY_ORE_INCREMENT, lvl) * 1000,
                mining_deeprock: Math.pow(1.1, lvl) * 1e8,
                mining_neon: Math.pow(1.1, lvl) * 1e4,
            };
        },
        output: 'mining_barDarkIron',
        timeNeeded: 15 * SECONDS_PER_YEAR,
        minTemperature: 3000
    },
}
