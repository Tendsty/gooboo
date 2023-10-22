describe('Village feature loads properly', () => {
    it('basic resources can be gained over time and used to buy buildings', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('villageFeature');

        cy.toFeature('Village');
        cy.get('[data-cy=village-job-collector-add]').click();

        cy.toFeature('Debug');
        cy.contains('1m').click();

        cy.toFeature('Village');
        cy.contains('2000');

        cy.get('[data-cy=upgrade-village_campfire-buy]').click();

        cy.toFeature('Debug');
        cy.contains('1m').click();

        cy.toFeature('Village');
        cy.contains('Hut');
    });

    it('praying offers prestige option', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('villageFeature');
        cy.changeMult('currencyVillageFaithGain', 'base', 1);
        cy.contains('1m').click();

        cy.toFeature('Village');
        cy.contains('Pray').click();
        cy.contains('Prestige');
    });

    it('offerings unlocks new tab', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('villageFeature');
        cy.giveUnlock('villageOffering1');

        cy.toFeature('Village');
        cy.contains('Offerings').click();
        cy.contains('Sacrifice');
    });

    it('policies are shown in a new tab', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('villageFeature');
        cy.changeMult('villagePolicyTaxes', 'base', 1);

        cy.toFeature('Village');
        cy.contains('Policies').click();
        cy.contains('0 / 1');
    });
});
