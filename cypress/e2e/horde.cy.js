describe('Horde feature loads properly', () => {
    it('horde fights passively and loots bones', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('hordeFeature');
        cy.contains('1m').click();

        cy.toFeature('Horde');
        cy.contains('5.000M');
    });

    it('prestige option can be unlocked', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('hordeFeature');
        cy.giveUnlock('hordePrestige');

        cy.toFeature('Horde');
        cy.contains('Souls').click();
        cy.contains('Prestige');
    });
});
