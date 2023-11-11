import { buildNum } from "../../utils/format";

export default {
    oreAluminium: {
        power: 15,
        impurity: 1.5,
        minDepth: 15,
        maxDepth: 45,
        modulo: 3,
        baseAmount: 0.02,
        amountMult: 1.05
    },
    oreCopper: {
        power: 50,
        impurity: 2,
        minDepth: 30,
        maxDepth: 68,
        modulo: 4,
        baseAmount: 0.004,
        amountMult: 1.05
    },
    oreTin: {
        power: 240,
        impurity: 2.5,
        minDepth: 50,
        maxDepth: 100,
        modulo: 5,
        baseAmount: 0.0008,
        amountMult: 1.05
    },
    oreIron: {
        power: 1300,
        impurity: 3,
        minDepth: 80,
        maxDepth: 140,
        modulo: 7,
        baseAmount: 0.00016,
        amountMult: 1.05
    },
    oreTitanium: {
        power: 7000,
        impurity: 3.5,
        minDepth: 120,
        maxDepth: 200,
        modulo: 11,
        baseAmount: 0.000032,
        amountMult: 1.05
    },
    orePlatinum: {
        power: buildNum(40, 'K'),
        impurity: 4,
        minDepth: 175,
        maxDepth: 295,
        modulo: 13,
        baseAmount: 0.0000064,
        amountMult: 1.05
    },
    oreIridium: {
        power: buildNum(250, 'K'),
        impurity: 5,
        minDepth: 260,
        maxDepth: 420,
        modulo: 17,
        baseAmount: 0.00000128,
        amountMult: 1.05
    }
}
