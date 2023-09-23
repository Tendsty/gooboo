describe('Gallery feature loads properly', () => {
    it('beauty is generated on its own', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('galleryFeature');
        cy.contains('1m').click();

        cy.toFeature('Gallery');
        cy.contains('60');
    });

    it('prestige option can be unlocked', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('galleryFeature');
        cy.giveUnlock('galleryAuction');

        cy.toFeature('Gallery');
        cy.contains('Auction').click();
        cy.contains('Prestige');
    });
});
