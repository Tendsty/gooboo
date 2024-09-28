import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence } from "../../utils/math";

export default {
    cashRegister: {subfeature: 1, price(lvl) {
        return {village_copperCoin: Math.pow(lvl * 0.25 + 2, lvl) * 2000};
    }, effect: [
        {name: 'villageCounter', type: 'base', value: lvl => lvl},
        {name: 'currencyVillageCopperCoinCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    decoration: {subfeature: 1, price(lvl) {
        return {village_copperCoin: Math.pow(1.75, lvl) * 900};
    }, effect: [
        {name: 'currencyVillageCopperCoinGain', type: 'mult', value: lvl => Math.pow(1.175, lvl)}
    ]},
    plantFiberBin: {subfeature: 1, price(lvl) {
        if (lvl === 0) {
            return {};
        }
        return {village_copperCoin: Math.pow(3, lvl) * 100};
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.1},
        {name: 'rope', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    woodBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_plantFiberBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * 200};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.1},
        {name: 'woodenPlanks', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    stoneBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_woodBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * 500};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.1},
        {name: 'brick', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    metalBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_stoneBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(50, 'K')};
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.075},
        {name: 'screws', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    waterBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_metalBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(600, 'K')};
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.06},
        {name: 'waterBottle', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    glassBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_waterBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(14.5, 'M')};
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.05},
        {name: 'cocktailGlass', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    hardwoodBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_glassBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(900, 'M')};
    }, effect: [
        {name: 'currencyVillageHardwoodGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.025},
        {name: 'boomerang', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    gemBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_hardwoodBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(85, 'B')};
    }, effect: [
        {name: 'currencyVillageGemGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.025},
        {name: 'polishedGem', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    oilBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_gemBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(9.6, 'T')};
    }, effect: [
        {name: 'currencyVillageOilGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.015},
        {name: 'oilLamp', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
    marbleBin: {subfeature: 1, requirement() {
        return store.state.upgrade.item.village_oilBin.highestLevel >= 1;
    }, price(lvl) {
        return {village_copperCoin: Math.pow(3, lvl) * buildNum(1.44, 'Qa')};
    }, effect: [
        {name: 'currencyVillageMarbleGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.01},
        {name: 'shower', type: 'villageCraft', value: lvl => lvl >= 1}
    ]},
}
