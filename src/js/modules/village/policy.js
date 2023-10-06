export default {
    taxes: {mult: 'villagePolicyTaxes', icon: 'mdi-cash-register', effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * (lvl > 0 ? -0.05 : -0.03)}
    ]},
    immigration: {mult: 'villagePolicyImmigration', icon: 'mdi-account-group', effect: [
        {name: 'villageWorker', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * (lvl > 0 ? -0.05 : -0.1)}
    ]},
    religion: {mult: 'villagePolicyReligion', icon: 'mdi-hands-pray', effect: [
        {name: 'villageResourceGain', type: 'mult', value: lvl => lvl * (lvl > 0 ? -0.25 : -0.1) + 1},
        {name: 'currencyVillageFaithGain', type: 'mult', value: lvl => lvl * 0.25 + 1}
    ]},
    scanning: {mult: 'villagePolicyScanning', icon: 'mdi-magnify-scan', effect: [
        {name: 'villageLootGain', type: 'mult', value: lvl => 1 - lvl * (lvl > 0 ? 0.1 : 0.05)},
        {name: 'villageLootQuality', type: 'base', value: lvl => Math.max(lvl, 0)},
        {name: 'villageLootQuality', type: 'mult', value: lvl => Math.min(1 + lvl * 0.1, 1)}
    ]}
}
