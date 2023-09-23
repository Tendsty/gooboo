import { getSequence } from "../../../utils/math";

export default {
    expandVault: {
        price: lvl => getSequence(2, lvl) * 500 + 2000,
        effect: [
            {name: 'currencyGemTopazCap', type: 'base', value: lvl => lvl * 300}
        ]
    },
    persuadeInvestors: {
        price: lvl => getSequence(2, lvl) * 500 + 2000,
        effect: [
            {name: 'currencySchoolGoldenDustCap', type: 'base', value: lvl => lvl * 4000}
        ]
    },
    improveCreditScore: {
        price: lvl => getSequence(2, lvl) * 500 + 2000,
        effect: [
            {name: 'bankInvestmentSize', type: 'base', value: lvl => lvl * 200},
            {name: 'bankLoanSize', type: 'base', value: lvl => lvl * 200}
        ]
    },
    businessMarketing: {
        price: lvl => getSequence(2, lvl) * 500 + 2000,
        effect: [
            {name: 'merchantOffers', type: 'base', value: lvl => lvl}
        ]
    },
    cardTournament: {
        price: lvl => getSequence(2, lvl) * 500 + 2000,
        effect: [
            {name: 'bankCardPackChance', type: 'base', value: lvl => 0.5 - Math.pow(0.8, lvl) * 0.5}
        ]
    }
}
