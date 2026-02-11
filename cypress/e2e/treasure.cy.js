describe('Treasures load properly', () => {
    it('treasure can be bought, upgraded and deleted', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('treasureFeature');
        cy.giveCurrency('gem_emerald', 130);

        cy.toFeature('Treasure');
        cy.get('[data-cy=treasure-buy-regular]').click();
        cy.get('[data-cy=confirm-action-confirm]').click();
        cy.get('[data-cy=treasure-slot-0]').click();

        cy.get('[data-cy=treasure-buy-fragment]').click();
        cy.get('[data-cy=confirm-action-confirm]').click();

        cy.get('[data-cy=treasure-slot-0]').click();
        cy.get('[data-cy=treasure-upgrade-button]').click();
        cy.contains('Level 1');
        cy.get('[data-cy=treasure-dialog-close]').click();
        cy.contains('49');

        cy.get('[data-cy=treasure-slot-0]').click();
        cy.get('[data-cy=treasure-upgrade-button]').click();
        cy.get('[data-cy=treasure-upgrade-button]').click();
        cy.contains('Level 3');

        cy.get('[data-cy=treasure-delete-button]').click();
        cy.get('[data-cy=confirm-action-confirm]').click();
        cy.contains('67');
    });
});
