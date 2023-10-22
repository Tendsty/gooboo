describe('Cards load properly', () => {
    it('card packs can be bought and give cards', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('cardFeature');
        cy.giveCurrency('gem_emerald', 25);

        cy.toFeature('Cards');
        cy.get('[data-cy=card-pack-selector]').vselect('Into darkness');
        cy.contains('Buy').click();
        cy.get('[data-cy=confirm-action-confirm]').click();
        cy.contains('Card pack content');
        cy.contains('NEW!');
    });
});
