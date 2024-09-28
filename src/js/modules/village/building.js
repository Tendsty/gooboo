import store from "../../../store";
import { buildNum } from "../../utils/format";
import { getSequence, splicedLinear, splicedPowLinear } from "../../utils/math";

export default {
    // Tier 0 buildings
    campfire: {cap: 1, persistent: true, icon: 'mdi-campfire', note: 'village_1', price() {
        return {village_wood: 5, village_stone: 5};
    }, timeNeeded() {
        return 5;
    }, effect: [
        {name: 'villageBuildings1', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 1 buildings
    hut: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-tent', note: 'village_2', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.35, lvl) * 15, village_wood: Math.pow(1.32, lvl) * 10};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 10);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    farm: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-tractor', note: 'village_3', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * 200, village_stone: Math.pow(1.65, lvl) * 400};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 40);
    }, effect: [
        {name: 'farmer', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillagePlantFiberCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    plantation: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-forest', note: 'village_4', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.65, lvl) * 750, village_stone: Math.pow(1.65, lvl) * 430};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 50);
    }, effect: [
        {name: 'harvester', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageWoodCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    mine: {cap: 10, capMult: true, persistent: true, subtype: 'workstation', icon: 'mdi-tunnel', note: 'village_5', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * 1150};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 60);
    }, effect: [
        {name: 'miner', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageStoneCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    communityCenter: {cap: 1, persistent: true, icon: 'mdi-home-account', note: 'village_6', requirement() {
        return store.state.unlock.villageBuildings1.use;
    }, timeNeeded() {
        return 750;
    }, price() {
        return {village_wood: 1800, village_stone: 1650, village_metal: 100};
    }, effect: [
        {name: 'villageBuildings2', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 2 buildings
    smallHouse: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-variant', note: 'village_7', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.35, lvl) * 2750, village_metal: Math.pow(1.35, lvl) * 250, village_water: Math.pow(1.5, lvl) * 400};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 210);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    crane: {cap: 20, icon: 'mdi-crane', note: 'village_31', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.2, lvl) * 45);
    }, price(lvl) {
        return {village_wood: Math.pow(1.5, lvl) * 580, village_metal: Math.pow(1.35, lvl) * 275};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'base', value: lvl => lvl}
    ]},
    treasury: {cap: 10, hasDescription: true, capMult: true, icon: 'mdi-treasure-chest', note: 'village_9', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        let obj = {village_plantFiber: Math.pow(1.25, Math.max(0, lvl - 9)) * Math.pow(1.5, lvl) * 2600};
        if (lvl <= 0) {
            obj.village_fruit = 325;
            obj.village_grain = 550;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.4, lvl) * 240);
    }, effect: [
        {name: 'villageCoinUpgrades', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageTaxRate', type: 'base', value: lvl => splicedLinear(0.025, 0.01, 10, lvl)}
    ]},
    storage: {cap: 20, capMult: true, icon: 'mdi-database', note: 'village_8', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        let obj = {village_plantFiber: Math.pow(lvl * 0.02 + 1.15, lvl) * 900, village_wood: Math.pow(lvl * 0.02 + 1.15, lvl) * 900, village_stone: Math.pow(lvl * 0.02 + 1.18, lvl) * 1400};
        if (lvl <= 0) {
            obj.village_coin = 50;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * 225);
    }, effect: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 20, lvl)},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 20, lvl)},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 20, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl > 5 ? splicedPowLinear(1.2, 0.1, 15, lvl - 5) : null}
    ]},
    forge: {cap: 20, icon: 'mdi-anvil', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_stone: Math.pow(lvl * 0.02 + 1.25, lvl) * 2750, village_metal: Math.pow(lvl * 0.02 + 1.18, lvl) * 250};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 180);
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageMetalCap', type: 'base', value: lvl => lvl * 200}
    ]},
    safe: {cap: 20, icon: 'mdi-safe', note: 'village_10', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_metal: Math.pow(lvl * 0.02 + 1.2, lvl) * 900, village_coin: Math.pow(lvl * 0.02 + 1.18, lvl) * 150};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 270);
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 100},
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    well: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-water-well', note: 'village_11', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.65, lvl) * 6800, village_wood: Math.pow(1.65, lvl) * 4500, village_stone: Math.pow(1.65, lvl) * 5000};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 300);
    }, effect: [
        {name: 'wellWorker', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageWaterCap', type: 'base', value: lvl => lvl > 1 ? (1000 * Math.min(lvl - 1, 9)) : null},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl > 1 ? Math.pow(1.5, Math.min(lvl - 1, 9)) : null}
    ]},
    garden: {cap: 20, icon: 'mdi-flower', note: 'village_12', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.25, lvl) * 8750, village_water: Math.pow(1.33, lvl) * 500};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 480);
    }, effect: [
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyVillageCoinCap', type: 'base', value: lvl => lvl * 50}
    ]},
    townHall: {cap: 1, persistent: true, icon: 'mdi-town-hall', note: 'village_13', requirement() {
        return store.state.unlock.villageBuildings2.use;
    }, timeNeeded() {
        return buildNum(14.4, 'K');
    }, price() {
        return {village_wood: buildNum(12.8, 'K'), village_stone: buildNum(10.5, 'K'), village_metal: 3150, village_water: 2900};
    }, effect: [
        {name: 'villageBuildings3', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 3 buildings
    house: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home', note: 'village_14', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.35, lvl) * buildNum(17.8, 'K'),
            village_wood: Math.pow(1.35, lvl) * buildNum(16, 'K'),
            village_metal: Math.pow(1.35, lvl) * 2600,
            village_knowledge: lvl * 5 + 75
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 900);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl}
    ]},
    shed: {icon: 'mdi-home-analytics', cap: 5, capMult: true, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * 1600);
    }, price(lvl) {
        return {village_wood: Math.pow(1.8, lvl) * buildNum(14.5, 'K'), village_stone: Math.pow(2.05, lvl) * 9000, village_metal: Math.pow(1.7, lvl) * 5200};
    }, effect: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'villageUpgradeScythe', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeHatchet', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradePickaxe', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeWateringCan', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeInvestment', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    tunnel: {icon: 'mdi-tunnel', cap: 15, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 1350);
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.35, lvl) * buildNum(12, 'K'), village_water: Math.pow(1.5, lvl) * 850};
    }, effect: [
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    sawmill: {icon: 'mdi-saw-blade', cap: 15, requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 1500);
    }, price(lvl) {
        return {village_metal: Math.pow(1.3, lvl) * 3200, village_water: Math.pow(1.5, lvl) * 1150};
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => lvl * 0.2 + 1}
    ]},
    library: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-book', note: 'village_15', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {village_wood: Math.pow(1.65, lvl) * buildNum(15, 'K'), village_water: Math.pow(1.85, lvl) * 6100};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 2100);
    }, effect: [
        {name: 'librarian', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl > 1 ? (5 * (lvl - 1)) : null}
    ]},
    aquarium: {icon: 'mdi-fishbowl', cap: 20, note: 'village_16', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 2400);
    }, price(lvl) {
        return {village_water: Math.pow(1.5, lvl) * 4400, village_knowledge: lvl * 10 + 35};
    }, effect: [
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => lvl * 0.15 + 1}
    ]},
    glassBlowery: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-glass-wine', note: 'village_17', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {village_metal: Math.pow(1.65, lvl) * buildNum(12, 'K'), village_water: Math.pow(1.85, lvl) * buildNum(24, 'K')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * 3000);
    }, effect: [
        {name: 'glassblower', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageGlassCap', type: 'base', value: lvl => lvl > 1 ? (250 * (lvl - 1)) : null}
    ]},
    knowledgeTower: {cap: 50, icon: 'mdi-wizard-hat', note: 'village_19', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.5, lvl) * buildNum(44, 'K'),
            village_stone: Math.pow(1.5, lvl) * buildNum(35, 'K'),
            village_glass: Math.pow(1.5, lvl) * 450,
            village_knowledge: Math.ceil(lvl * 8 * Math.pow(1.05, lvl) + 50)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.24, lvl) * 3300);
    }, effect: [
        {name: 'currencyVillageGlassCap', type: 'base', value: lvl => lvl * 250},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => lvl * 0.2 + 1},
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 3}
    ]},
    miniatureSmith: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-fireplace', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(60, 'K'),
            village_stone: Math.pow(1.65, lvl) * buildNum(35, 'K'),
            village_glass: Math.pow(1.4, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 2500);
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'villageWorker', type: 'base', value: lvl => lvl > 4 ? Math.floor(lvl / 5) : null}
    ]},
    church: {cap: 25, hasDescription: true, icon: 'mdi-church', note: 'village_18', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(65, 'K'),
            village_stone: Math.pow(1.65, lvl) * buildNum(85, 'K'),
            village_glass: Math.pow(1.5, lvl) * 1700
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * 4800);
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'base', value: lvl => getSequence(1, lvl) * 0.02}
    ]},
    school: {icon: 'mdi-school', cap: 5, capMult: true, note: 'village_20', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.25, lvl) * buildNum(400, 'K'),
            village_metal: Math.pow(2.25, lvl) * buildNum(45, 'K'),
            village_glass: Math.pow(2.1, lvl) * 4800,
            village_coin: Math.pow(1.85, lvl) * buildNum(70, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.6, lvl) * 3600);
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 5},
        {name: 'villageUpgradeBasics', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeProcessing', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradePump', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeSand', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeBook', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    localGovernment: {cap: 1, note: 'village_21', persistent: true, icon: 'mdi-city-variant', requirement() {
        return store.state.unlock.villageBuildings3.use;
    }, timeNeeded() {
        return buildNum(240, 'K');
    }, price() {
        return {village_plantFiber: buildNum(1.02, 'M'), village_wood: buildNum(975, 'K'), village_glass: buildNum(16, 'K'), village_coin: buildNum(280, 'K')};
    }, effect: [
        {name: 'villageBuildings4', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 4 buildings
    apartment: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-city', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(20, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(29.5, 'K'),
            village_hardwood: Math.pow(1.3, lvl) * 1500,
            village_gem: Math.pow(1.35, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * 7200);
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 2}
    ]},
    temple: {cap: 30, icon: 'mdi-temple-hindu', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_glass: Math.pow(1.25, lvl) * 8000,
            village_water: Math.pow(1.5, lvl) * buildNum(2, 'M'),
            village_coin: Math.pow(1.45, lvl) * buildNum(100, 'K'),
            village_knowledge: 15 * lvl + 125,
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(62.5, 'K'));
    }, effect: [
        {name: 'currencyVillageFaithCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    obelisk: {cap: 0, capMult: true, icon: 'mdi-tower-fire', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_coin: Math.pow(4.5, lvl) * buildNum(50, 'K')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.45, lvl) * buildNum(50, 'K'));
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    offeringPedestal: {cap: 4, hasDescription: true, note: 'village_23', icon: 'mdi-table-furniture', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(3, lvl) * buildNum(32.5, 'K'));
    }, price(lvl) {
        return [
            {village_plantFiber: buildNum(2, 'M'), village_wood: buildNum(2, 'M'), village_stone: buildNum(2, 'M')},
            {village_coin: buildNum(10, 'M'), village_metal: buildNum(3, 'M'), village_water: buildNum(5, 'M')},
            {village_glass: buildNum(120, 'K'), village_hardwood: buildNum(40, 'K'), village_gem: buildNum(40, 'K')},
            {village_knowledge: 600, village_science: 200, village_joy: 750}
        ][lvl];
    }, effect: [
        {name: 'villageOffering1', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageOffering2', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageOffering3', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageOffering4', type: 'unlock', value: lvl => lvl >= 4}
    ]},
    theater: {cap: 5, capMult: true, note: 'village_24', subtype: 'workstation', icon: 'mdi-drama-masks', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        let obj = {village_stone: Math.pow(2.15, lvl) * buildNum(3, 'M'), village_glass: Math.pow(1.8, lvl) * buildNum(14.8, 'K')};
        if (lvl >= 1) {
            obj.village_hardwood = Math.pow(1.75, lvl - 1) * 2000;
        }
        if (lvl >= 2) {
            obj.village_gem = Math.pow(1.75, lvl - 2) * 2750;
        }
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(60, 'K'));
    }, effect: [
        {name: 'entertainer', type: 'villageJob', value: lvl => lvl}
    ]},
    lumberjackHut: {cap: 10, capMult: true, note: 'village_25', subtype: 'workstation', icon: 'mdi-axe', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_plantFiber: Math.pow(1.85, lvl) * buildNum(7.7, 'M'), village_metal: Math.pow(1.85, lvl) * buildNum(1.35, 'M')};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(10, 'K'));
    }, effect: [
        {name: 'lumberjack', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageHardwoodCap', type: 'base', value: lvl => lvl > 1 ? (200 * (lvl - 1)) : null}
    ]},
    deepMine: {cap: 10, capMult: true, note: 'village_26', subtype: 'workstation', icon: 'mdi-tunnel', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(13, 'M'),
            village_knowledge: lvl * 10 + 165,
            village_hardwood: Math.pow(1.65, lvl) * 500
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(12, 'K'));
    }, effect: [
        {name: 'blastMiner', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageGemCap', type: 'base', value: lvl => lvl > 1 ? (200 * (lvl - 1)) : null}
    ]},
    bigStorage: {cap: 20, capMult: true, icon: 'mdi-database-settings', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {village_hardwood: Math.pow(lvl * 0.03 + 1.25, lvl) * 900, village_gem: Math.pow(lvl * 0.03 + 1.25, lvl) * 900};
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(15, 'K'));
    }, effect: [
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => splicedPowLinear(1.25, 0.2, 20, lvl)},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 20, lvl)},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => splicedPowLinear(1.2, 0.1, 20, lvl)}
    ]},
    luxuryHouse: {cap: 25, capMult: true, note: 'village_27', subtype: 'housing', icon: 'mdi-bank', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.65, lvl) * buildNum(7, 'M'),
            village_hardwood: Math.pow(1.35, lvl) * 4000,
            village_gem: Math.pow(1.3, lvl) * 9200,
            village_coin: Math.pow(2.15, lvl) * buildNum(25, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(18, 'K'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.002}
    ]},
    lake: {cap: 10, capMult: true, note: 'village_28', subtype: 'workstation', icon: 'mdi-waves', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_water: Math.pow(2.25, lvl) * buildNum(50, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(60, 'K'),
            village_gem: Math.pow(1.65, lvl) * buildNum(11, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(20, 'K'));
    }, effect: [
        {name: 'fisherman', type: 'villageJob', value: lvl => lvl}
    ]},
    gemSawBlade: {icon: 'mdi-saw-blade', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(30, 'K'));
    }, price(lvl) {
        return {village_stone: Math.pow(1.85, lvl) * buildNum(75, 'M'), village_gem: Math.ceil(Math.pow(1.5, lvl) * buildNum(15, 'K'))};
    }, effect: [
        {name: 'queueSpeedVillageBuilding', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    miniatureGlassblowery: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-glass-tulip', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.5, lvl) * buildNum(125, 'M'),
            village_water: Math.pow(1.85, lvl) * buildNum(120, 'M'),
            village_hardwood: Math.pow(1.3, lvl) * buildNum(12.5, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(14, 'K'));
    }, effect: [
        {name: 'currencyVillageGlassGain', type: 'mult', value: lvl => lvl * 0.1 + 1},
        {name: 'villageWorker', type: 'base', value: lvl => lvl > 4 ? Math.floor(lvl / 5) : null}
    ]},
    lostPages: {icon: 'mdi-script-text', cap: 10, note: 'village_29', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.5, lvl) * buildNum(80, 'K'));
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.85, lvl) * buildNum(185, 'M'),
            village_wood: Math.pow(1.85, lvl) * buildNum(140, 'M'),
            village_knowledge: lvl * 15 + 220,
            village_hardwood: Math.pow(1.65, lvl) * buildNum(22, 'K')
        };
    }, effect: [
        {name: 'currencyVillageKnowledgeCap', type: 'base', value: lvl => lvl * 8},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 20},
        {name: 'villageUpgradeAxe', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradeBomb', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeToll', type: 'unlock', value: lvl => lvl >= 6},
        {name: 'villageUpgradeFishingRod', type: 'unlock', value: lvl => lvl >= 8},
        {name: 'villageUpgradeHolyBook', type: 'unlock', value: lvl => lvl >= 10}
    ]},
    playground: {cap: 5, note: 'village_30', icon: 'mdi-slide', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.15, lvl) * buildNum(140, 'K'));
    }, price(lvl) {
        return {village_water: Math.pow(4, lvl) * buildNum(250, 'M'), village_coin: Math.pow(3, lvl) * buildNum(50, 'M')};
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.01}
    ]},
    government: {cap: 1, persistent: true, icon: 'mdi-city', requirement() {
        return store.state.unlock.villageBuildings4.use;
    }, timeNeeded() {
        return buildNum(1.5, 'M');
    }, price() {
        return {village_hardwood: buildNum(50, 'K'), village_gem: buildNum(50, 'K'), village_coin: buildNum(150, 'M'), village_knowledge: 260};
    }, effect: [
        {name: 'villageBuildings5', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 5 buildings
    modernHouse: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-home-modern', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.65, lvl) * buildNum(330, 'M'),
            village_glass: Math.pow(1.65, lvl) * buildNum(240, 'K'),
            village_hardwood: Math.pow(1.3, lvl) * buildNum(77.5, 'K'),
            village_gem: Math.pow(1.35, lvl) * buildNum(18, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(200, 'K'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 3}
    ]},
    fountain: {cap: 10, icon: 'mdi-fountain', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(275, 'K'));
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.65, lvl) * buildNum(1.7, 'B'),
            village_stone: Math.pow(1.65, lvl) * buildNum(1.35, 'B'),
            village_metal: Math.pow(1.65, lvl) * buildNum(290, 'M'),
            village_coin: Math.pow(1.85, lvl) * buildNum(650, 'M')
        };
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageWaterCap', type: 'mult', value: lvl => Math.pow(2, lvl)}
    ]},
    laboratory: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-flask', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.85, lvl) * buildNum(70, 'M'),
            village_glass: Math.pow(1.85, lvl) * buildNum(475, 'K'),
            village_gem: Math.pow(1.85, lvl) * buildNum(140, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(300, 'K'));
    }, effect: [
        {name: 'scientist', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl > 2 ? ((lvl - 2) * 5) : null},
        {name: 'villageUpgradeBreakthrough', type: 'unlock', value: lvl => lvl >= 2}
    ]},
    court: {cap: 2, hasDescription: true, icon: 'mdi-gavel', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.85, lvl) * buildNum(280, 'K'),
            village_knowledge: Math.round(Math.pow(1.15, lvl) * 290),
            village_science: lvl * 20 + 30
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.5, lvl) * buildNum(480, 'K'));
    }, effect: [
        {name: 'villagePolicyTaxes', type: 'base', value: lvl => lvl >= 1 ? 1 : null},
        {name: 'villagePolicyImmigration', type: 'base', value: lvl => lvl >= 2 ? 1 : null}
    ]},
    greenhouse: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-greenhouse', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.85, lvl) * buildNum(1.15, 'B'),
            village_glass: Math.pow(1.85, lvl) * buildNum(900, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(550, 'K'));
    }, effect: [
        {name: 'gardener', type: 'villageJob', value: lvl => lvl}
    ]},
    fullBasket: {cap: 8, icon: 'mdi-basket', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.4, lvl) * buildNum(2.4, 'B'),
            village_joy: Math.ceil(Math.pow(1.35, lvl) * 70)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(1.5, 'M'));
    }, effect: [
        {name: 'villageFoodGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.25 + 1)},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 32}
    ]},
    storageHall: {cap: 20, icon: 'mdi-warehouse', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(4.5, 'B'),
            village_metal: Math.pow(1.65, lvl) * buildNum(360, 'M'),
            village_hardwood: Math.pow(1.5, lvl) * buildNum(575, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(700, 'K'));
    }, effect: [
        {name: 'currencyVillageWoodCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillagePlantFiberCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillageStoneCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl * 8}
    ]},
    bioLab: {cap: 5, icon: 'mdi-dna', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(2.3, lvl) * buildNum(580, 'M'),
            village_gem: Math.pow(1.85, lvl) * buildNum(695, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(1, 'M'));
    }, effect: [
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => Math.pow(1.5, lvl)},
        {name: 'villageUpgradeModifiedPlants', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeDopamine', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeAdrenaline', type: 'unlock', value: lvl => lvl >= 5}
    ]},
    taxOffice: {cap: 3, icon: 'mdi-office-building', requirement() {
        return store.state.unlock.villageBuildings5.use && store.state.upgrade.item.village_court.level >= 1;
    }, price(lvl) {
        return {
            village_stone: Math.pow(6, lvl) * buildNum(10.5, 'B'),
            village_water: Math.pow(15, lvl) * buildNum(75, 'B'),
            village_knowledge: lvl * 75 + 350,
            village_coin: Math.pow(3.5, lvl) * buildNum(6, 'B')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(2.5, lvl) * buildNum(1.2, 'M'));
    }, effect: [
        {name: 'villagePolicyTaxes', type: 'base', value: lvl => lvl}
    ]},
    festival: {icon: 'mdi-party-popper', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_joy: Math.ceil(Math.pow(1.15, lvl) * 100)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.35, lvl) * buildNum(750, 'K'));
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.003},
        {name: 'villageTaxRate', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    cemetery: {cap: 10, icon: 'mdi-grave-stone', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(lvl * 0.1 + 1.85, lvl) * buildNum(20, 'B'),
            village_stone: Math.pow(lvl * 0.1 + 1.85, lvl) * buildNum(27.5, 'B')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(1.5, 'M'));
    }, effect: [
        {name: 'villageOfferingPower', type: 'mult', value: lvl => lvl * 0.5 + 1},
        {name: 'currencyVillageFaithCap', type: 'base', value: lvl => lvl * 32}
    ]},
    mosque: {cap: 25, icon: 'mdi-mosque', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(2.12, lvl) * buildNum(155, 'B'),
            village_glass: Math.pow(1.9, lvl) * buildNum(40, 'M'),
            village_gem: Math.pow(1.55, lvl) * buildNum(17, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(3.2, 'M'));
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'base', value: lvl => getSequence(2, lvl)}
    ]},
    waterTower: {cap: 12, icon: 'mdi-tower-beach', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.45, lvl) * buildNum(260, 'B'),
            village_knowledge: lvl * 125 + 700
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(8, 'M'));
    }, effect: [
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.2, lvl) * (lvl * 0.5 + 1)}
    ]},
    outdoorPump: {cap: 5, icon: 'mdi-water-pump', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_water: Math.pow(3.3, lvl) * buildNum(1.6, 'T'),
            village_joy: lvl * 180 + 720
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(18.5, 'M'));
    }, effect: [
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => lvl * 0.4 + 1}
    ]},
    bankVault: {cap: 12, icon: 'mdi-safe-square', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.85, lvl) * buildNum(7.35, 'B'),
            village_science: lvl * 45 + 270
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.65, lvl) * buildNum(40, 'M'));
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.6, lvl)}
    ]},
    steamEngine: {cap: 1, persistent: true, icon: 'mdi-turbine', requirement() {
        return store.state.unlock.villageBuildings5.use;
    }, timeNeeded() {
        return buildNum(600, 'M');
    }, price() {
        return {
            village_metal: buildNum(27.6, 'B'),
            village_water: buildNum(45, 'T'),
            village_hardwood: buildNum(175, 'M'),
            village_coin: buildNum(3.5, 'T'),
            village_science: 440,
            village_joy: 1500
        };
    }, effect: [
        {name: 'villageBuildings6', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 6 buildings
    mansion: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-balcony', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.65, lvl) * buildNum(63, 'T'),
            village_marble: Math.pow(1.35, lvl) * 600
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(140, 'M'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 4}
    ]},
    oilRig: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-tower-fire', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(2.35, lvl) * buildNum(1.32, 'T'),
            village_water: Math.pow(4.1, lvl) * buildNum(90, 'T'),
            village_knowledge: lvl * 500 + 1500
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(320, 'M'));
    }, effect: [
        {name: 'oilWorker', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageOilCap', type: 'base', value: lvl => lvl > 1 ? ((lvl - 1) * 400) : null}
    ]},
    generator: {hasDescription: true, icon: 'mdi-engine', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.45, lvl) * buildNum(1.93, 'T'),
            village_metal: Math.pow(1.2, lvl) * buildNum(84, 'B'),
            village_oil: Math.pow(1.25, lvl) * 1400
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.2, lvl) * buildNum(550, 'M'));
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl * 3},
        {name: 'villagePollution', type: 'base', value: lvl => lvl * 2}
    ]},
    lighthouse: {cap: 25, icon: 'mdi-lighthouse', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(lvl * 0.06 + 1.6, lvl) * buildNum(3.68, 'T'),
            village_gem: Math.pow(lvl * 0.04 + 1.4, lvl) * buildNum(480, 'M'),
            village_oil: Math.pow(lvl * 0.05 + 1.5, lvl) * 2800
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(650, 'M'));
    }, effect: [
        {name: 'currencyVillageFaithGain', type: 'mult', value: lvl => Math.pow(1.225, lvl)}
    ]},
    lobby: {icon: 'mdi-account-group', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_coin: Math.pow(lvl * 0.05 + 1.35, lvl) * buildNum(13.5, 'T')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(750, 'M'));
    }, effect: [
        {name: 'villagePollutionTolerance', type: 'base', value: lvl => lvl}
    ]},
    oilStorage: {cap: 20, icon: 'mdi-barrel', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.55, lvl) * buildNum(1.05, 'B'),
            village_glass: Math.pow(1.6, lvl) * buildNum(2.25, 'B')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(1.1, 'B'));
    }, effect: [
        {name: 'currencyVillageMetalGain', type: 'mult', value: lvl => Math.pow(1.1, lvl)},
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)}
    ]},
    artGallery: {cap: 10, capMult: true, subtype: 'workstation', icon: 'mdi-palette-advanced', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(2.9, lvl) * buildNum(198, 'T'),
            village_oil: Math.pow(2.2, lvl) * buildNum(264, 'K'),
            village_joy: lvl * 400 + 2200
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.33, lvl) * buildNum(1.6, 'B'));
    }, effect: [
        {name: 'sculptor', type: 'villageJob', value: lvl => lvl},
        {name: 'currencyVillageMarbleCap', type: 'base', value: lvl => lvl > 1 ? ((lvl - 1) * 100) : null}
    ]},
    excavator: {icon: 'mdi-excavator', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.35, lvl) * buildNum(5.28, 'B'),
            village_oil: Math.pow(1.6, lvl) * buildNum(360, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(2.2, 'B'));
    }, effect: [
        {name: 'currencyVillageWoodGain', type: 'mult', value: lvl => Math.pow(1.25, lvl) * (0.25 * lvl + 1)},
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: lvl => Math.pow(1.25, lvl) * (0.25 * lvl + 1)},
        {name: 'currencyVillageStoneGain', type: 'mult', value: lvl => Math.pow(1.25, lvl) * (0.25 * lvl + 1)},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},
    oilTruck: {icon: 'mdi-tanker-truck', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_gem: Math.pow(1.45, lvl) * buildNum(7.8, 'B')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(3, 'B'));
    }, effect: [
        {name: 'currencyVillageOilCap', type: 'mult', value: lvl => Math.pow(2, lvl)},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},
    oldLibrary: {icon: 'mdi-book-clock', cap: 2, requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(7.1, lvl) * buildNum(1.68, 'Qa'),
            village_marble: Math.pow(4.5, lvl) * 7500,
            village_knowledge: lvl * 600 + 2800
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(10, lvl) * buildNum(4, 'B'));
    }, effect: [
        {name: 'currencyVillageScienceCap', type: 'base', value: lvl => lvl * 20},
        {name: 'villageUpgradeSprinkler', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeGreed', type: 'unlock', value: lvl => lvl >= 2}
    ]},
    immigrationOffice: {cap: 3, icon: 'mdi-office-building', requirement() {
        return store.state.unlock.villageBuildings6.use && store.state.upgrade.item.village_court.level >= 2;
    }, price(lvl) {
        return {
            village_knowledge: lvl * 2000 + 4500,
            village_science: lvl * 750 + 1500,
            village_coin: Math.pow(10, lvl) * buildNum(1.5, 'Qa')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(8, lvl) * buildNum(5, 'B'));
    }, effect: [
        {name: 'villagePolicyImmigration', type: 'base', value: lvl => lvl}
    ]},
    marbleStatue: {cap: 10, icon: 'mdi-human-female-dance', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_marble: Math.pow(1.65, lvl) * 2250
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.75, lvl) * buildNum(120, 'B'));
    }, effect: [
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * 0.004},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)},
        {name: 'currencyVillageKnowledgeCap', type: 'mult', value: lvl => lvl * 0.1 + 1}
    ]},
    darkCult: {cap: 4, hasDescription: true, icon: 'mdi-pentagram', requirement() {
        return store.state.unlock.villageBuildings6.use && store.state.upgrade.item.village_court.level >= 2;
    }, price(lvl) {
        return {
            village_gem: Math.pow(6.25, lvl) * buildNum(82, 'B'),
            village_oil: Math.pow(5.5, lvl) * buildNum(55, 'M'),
            village_marble: Math.pow(2.5, lvl) * buildNum(50, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(6, lvl) * buildNum(11, 'B'));
    }, effect: [
        {name: 'villagePolicyReligion', type: 'base', value: lvl => lvl}
    ]},
    slaughterhouse: {icon: 'mdi-cow', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, price(lvl) {
        return {
            village_plantFiber: Math.pow(1.5, lvl) * buildNum(15.4, 'Qa'),
            village_wood: Math.pow(1.5, lvl) * buildNum(12, 'Qa'),
            village_hardwood: Math.pow(1.35, lvl) * buildNum(140, 'B'),
            village_water: Math.pow(1.9, lvl) * buildNum(9.5, 'Qi')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(16, 'B'));
    }, effect: [
        {name: 'currencyVillageMeatGain', type: 'base', value: lvl => getSequence(4, lvl) * 100},
        {name: 'villagePollution', type: 'base', value: lvl => lvl}
    ]},
    ecoCouncil: {cap: 1, persistent: true, icon: 'mdi-earth', requirement() {
        return store.state.unlock.villageBuildings6.use;
    }, timeNeeded() {
        return buildNum(250, 'B');
    }, price() {
        return {village_oil: buildNum(96, 'M'), village_marble: buildNum(500, 'K'), village_coin: buildNum(14, 'Qa'), village_science: 2000, village_joy: 6000};
    }, effect: [
        {name: 'villageBuildings7', type: 'unlock', value: lvl => lvl >= 1}
    ]},

    // Tier 7 buildings
    treehouse: {cap: 25, capMult: true, subtype: 'housing', icon: 'mdi-tree-outline', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.45, lvl) * buildNum(162.5, 'B'),
            village_loot0: Math.ceil(Math.pow(1.2, lvl) * 5)
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(45, 'B'));
    }, effect: [
        {name: 'villageWorker', type: 'base', value: lvl => lvl * 6}
    ]},
    rainforest: {icon: 'mdi-forest', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_hardwood: Math.pow(1.35, lvl) * buildNum(185, 'B'),
            village_water: Math.pow(1.9, lvl) * buildNum(12.5, 'Qi')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(250, 'B'));
    }, effect: [
        {name: 'villagePollution', type: 'base', value: lvl => lvl * -1}
    ]},
    luxuryStorage: {cap: 20, icon: 'mdi-warehouse', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_wood: Math.pow(1.85, lvl) * buildNum(121, 'Qa'),
            village_stone: Math.pow(1.85, lvl) * buildNum(143, 'Qa'),
            village_oil: Math.pow(1.6, lvl) * buildNum(234, 'M')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.3, lvl) * buildNum(60, 'B'));
    }, effect: [
        {name: 'currencyVillageMetalCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'currencyVillageGlassCap', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'currencyVillageHardwoodCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyVillageGemCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
        {name: 'currencyVillageMarbleCap', type: 'mult', value: lvl => Math.pow(1.25, lvl)},
    ]},
    pyramid: {cap: 10, hasDescription: true, capMult: true, subtype: 'workstation', icon: 'mdi-pyramid', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_stone: Math.pow(3.75, lvl) * buildNum(375, 'Qa'),
            village_marble: Math.pow(2.45, lvl) * buildNum(2.85, 'M'),
            village_joy: lvl * 4000 + buildNum(15.5, 'K')
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.45, lvl) * buildNum(100, 'B'));
    }, effect: [
        {name: 'explorer', type: 'villageJob', value: lvl => lvl},
        {name: 'villageLootQuality', type: 'base', value: lvl => lvl > 1 ? ((lvl - 1) * 2) : null}
    ]},
    trophyCase: {cap: 6, icon: 'mdi-gradient-vertical', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        let obj = {};
        obj[`village_loot${ lvl }`] = 1;
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(2.5, lvl) * buildNum(150, 'B'));
    }, effect: [
        {name: 'villageMaterialGain', type: 'mult', value: lvl => Math.pow(1.4, lvl)},
        {name: 'villageMaterialCap', type: 'mult', value: lvl => Math.pow(1.2, lvl)}
    ]},
    antiquarian: {icon: 'mdi-store', cap: 12, requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        let obj = {
            village_coin: Math.pow(2.5, lvl) * buildNum(32.5, 'Qa')
        };
        obj[`village_loot${ Math.floor(lvl / 2) }`] = Math.pow(10, lvl % 2) * 10;
        return obj;
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(3, lvl) * buildNum(200, 'B'));
    }, effect: [
        {name: 'currencyVillageCoinCap', type: 'mult', value: lvl => Math.pow(1.3, lvl)},
        {name: 'villageUpgradeAmbition', type: 'unlock', value: lvl => lvl >= 1},
        {name: 'villageUpgradeUnderstanding', type: 'unlock', value: lvl => lvl >= 2},
        {name: 'villageUpgradeCuriosity', type: 'unlock', value: lvl => lvl >= 3},
        {name: 'villageUpgradeWorship', type: 'unlock', value: lvl => lvl >= 4},
        {name: 'villageUpgradeBartering', type: 'unlock', value: lvl => lvl >= 5},
        {name: 'villageUpgradeSparks', type: 'unlock', value: lvl => lvl >= 6},
    ]},
    windTurbine: {cap: 20, icon: 'mdi-wind-turbine', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_metal: Math.pow(1.65, lvl) * buildNum(1.25, 'Qa'),
            village_loot1: Math.ceil(Math.pow(1.15, lvl) * (3 + lvl))
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(240, 'B'));
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl},
        {name: 'villageLootGain', type: 'mult', value: lvl => lvl * 0.05 + 1}
    ]},
    radar: {cap: 10, hasDescription: true, icon: 'mdi-satellite-uplink', requirement() {
        return store.state.unlock.villageBuildings7.use && store.state.upgrade.item.village_court.level >= 2;
    }, price(lvl) {
        return {
            village_metal: Math.pow(3.15, lvl) * buildNum(6.57, 'Qa'),
            village_marble: Math.pow(2.4, lvl) * buildNum(41.5, 'M'),
            village_science: lvl * 650 + 3500
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(3, lvl) * buildNum(333, 'B'));
    }, effect: [
        {name: 'villagePolicyScanning', type: 'base', value: lvl => lvl}
    ]},
    waterTurbine: {cap: 20, icon: 'mdi-hydro-power', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_water: Math.pow(2.2, lvl) * buildNum(200, 'Qi'),
            village_glass: Math.pow(1.65, lvl) * buildNum(6.8, 'T'),
            village_loot2: Math.ceil(Math.pow(1.14, lvl) * (2 + lvl))
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(420, 'B'));
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl},
        {name: 'currencyVillageWaterGain', type: 'mult', value: lvl => Math.pow(1.15, lvl)}
    ]},
    solarPanel: {cap: 20, icon: 'mdi-solar-panel', requirement() {
        return store.state.unlock.villageBuildings7.use;
    }, price(lvl) {
        return {
            village_gem: Math.pow(1.55, lvl) * buildNum(9, 'T'),
            village_oil: Math.pow(1.8, lvl) * buildNum(30.4, 'B'),
            village_loot3: Math.ceil(Math.pow(1.13, lvl) * (1 + lvl))
        };
    }, timeNeeded(lvl) {
        return Math.ceil(Math.pow(1.25, lvl) * buildNum(550, 'B'));
    }, effect: [
        {name: 'villagePower', type: 'base', value: lvl => lvl * 2}
    ]},
}
