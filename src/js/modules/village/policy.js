export default {
    taxes: {mult: 'villagePolicyTaxes', icon: 'mdi-cash-register', effect: [
        {name: 'villageTaxRate', type: 'mult', value: lvl => lvl * 0.25 + 1},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * (lvl > 0 ? -0.05 : -0.03)}
    ]},
    immigration: {mult: 'villagePolicyImmigration', icon: 'mdi-account-group', effect: [
        {name: 'villageWorker', type: 'mult', value: lvl => lvl * 0.15 + 1},
        {name: 'villageHappiness', type: 'base', value: lvl => lvl * (lvl > 0 ? -0.05 : -0.1)}
    ]}
}
