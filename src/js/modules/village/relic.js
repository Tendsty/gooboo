export default {
    mudBrick: {icon: 'mdi-wall', color: 'brown', effect: [
        {name: 'village_hut', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageWaterGain', type: 'mult', value: 1.5}
    ]},
    sapling: {icon: 'mdi-sprout', color: 'light-green', effect: [
        {name: 'village_shed', type: 'keepUpgrade', value: true},
        {name: 'currencyVillagePlantFiberGain', type: 'mult', value: 1.5},
    ]},
    keychain: {icon: 'mdi-key-chain', color: 'light-grey', effect: [
        {name: 'village_smallHouse', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageWoodGain', type: 'mult', value: 1.5}
    ]},
    treasureChest: {icon: 'mdi-treasure-chest', color: 'amber', effect: [
        {name: 'village_treasury', type: 'keepUpgrade', value: true},
        {name: 'village_wallet', type: 'keepUpgrade', value: true},
        {name: 'village_resourceBag', type: 'keepUpgrade', value: true},
        {name: 'village_metalBag', type: 'keepUpgrade', value: true}
    ]},
    screwdriver: {icon: 'mdi-screwdriver', color: 'indigo', effect: [
        {name: 'village_crane', type: 'keepUpgrade', value: true},
        {name: 'currencyVillageStoneGain', type: 'mult', value: 1.5}
    ]},
    rose: {icon: 'mdi-flower', color: 'red', effect: [
        {name: 'village_garden', type: 'keepUpgrade', value: true},
        {name: 'village_well', type: 'keepUpgrade', value: true}
    ]},
    goldenKey: {icon: 'mdi-key-chain', color: 'amber', effect: [
        {name: 'village_house', type: 'keepUpgrade', value: true},
        {name: 'village_miniatureSmith', type: 'keepUpgrade', value: true}
    ]},
    supervisor: {icon: 'mdi-account-tie', color: 'indigo', effect: [
        {name: 'village_sawmill', type: 'keepUpgrade', value: true},
        {name: 'village_tunnel', type: 'keepUpgrade', value: true}
    ]},
    globe: {icon: 'mdi-globe-model', color: 'green', effect: [
        {name: 'village_library', type: 'keepUpgrade', value: true},
        {name: 'village_glassBlowery', type: 'keepUpgrade', value: true}
    ]},
}
