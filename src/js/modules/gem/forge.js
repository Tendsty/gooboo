import store from "../../../store";

export default {
    diamondPickaxe: {relic: 'diamondPickaxe', price: 50},
    diamondHammer: {relic: 'diamondHammer', price: 50},
    diamondSword: {relic: 'diamondSword', price: 50},
    diamondShovel: {relic: 'diamondShovel', price: 50},
    diamondBrush: {relic: 'diamondBrush', price: 50},
    redCard_1: {relic: 'redCard', type: 'upgrade', upgradeLevel: 1, price: 10},
    briefcase_1: {relic: 'briefcase', type: 'upgrade', upgradeLevel: 1, price: 35},
    diamondPillar_0: {relic: 'diamondPillar', price: 40},
    diamondPillar_1: {relic: 'diamondPillar', condition: () => store.getters['mult/get']('relicPedestal0') >= 2, type: 'upgrade', upgradeLevel: 1, price: 100},
}
