import { buildNum } from "../../utils/format";

export default {
    plantFiber: {unlock: 'villageOffering1', cost: lvl => Math.pow(1.5, lvl) * buildNum(1, 'M'), effect: 200},
    wood: {unlock: 'villageOffering1', cost: lvl => Math.pow(1.5, lvl) * buildNum(1, 'M'), effect: 200},
    stone: {unlock: 'villageOffering1', cost: lvl => Math.pow(1.5, lvl) * buildNum(1, 'M'), effect: 200},

    coin: {unlock: 'villageOffering2', amount: 3, cost: lvl => Math.pow(1.75, lvl) * buildNum(10, 'M'), effect: 200},
    metal: {unlock: 'villageOffering2', amount: 3, cost: lvl => Math.pow(1.5, lvl) * buildNum(3, 'M'), effect: 200},
    water: {unlock: 'villageOffering2', amount: 3, cost: lvl => Math.pow(2, lvl) * buildNum(5, 'M'), effect: 500},

    glass: {unlock: 'villageOffering3', amount: 8, cost: lvl => Math.pow(1.5, lvl) * buildNum(120, 'K'), effect: 100},
    hardwood: {unlock: 'villageOffering3', amount: 8, cost: lvl => Math.pow(1.5, lvl) * buildNum(40, 'K'), effect: 100},
    gem: {unlock: 'villageOffering3', amount: 8, cost: lvl => Math.pow(1.5, lvl) * buildNum(40, 'K'), effect: 100},

    knowledge: {unlock: 'villageOffering4', amount: 20, increment: 1, cost: lvl => Math.pow(1.25, lvl) * 250, effect: 2},
    science: {unlock: 'villageOffering4', amount: 20, increment: 1, cost: lvl => Math.pow(1.25, lvl) * 100, effect: 1},
    joy: {unlock: 'villageOffering4', amount: 20, increment: 1, cost: lvl => Math.pow(1.25, lvl) * 750, effect: 5},
}
