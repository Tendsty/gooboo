describe('Relics load properly', () => {
    it('relics can be gained and show in the list', () => {
        cy.get('[data-cy=settings-button]').click();
        cy.contains('Automation').click();
        cy.get('[data-cy=setting-automation-progressMining]').type('90');

        cy.toFeature('Debug');
        cy.giveUnlock('relicFeature');
        cy.changeMult('miningDamage', 'mult', 1000000000000);
        cy.contains('1h').click();

        cy.contains('Features').click();
        cy.contains('Relics').click();
        cy.contains('Friendly bat');
    });
});
