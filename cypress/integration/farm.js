describe('Farm feature loads properly', () => {
    it('crops can be planted and harvested', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('farmFeature');

        cy.toFeature('Farm');
        cy.get('[data-cy=farm-crop-carrot]').click();
        cy.get('[data-cy=farm-plant-all]').click();

        cy.toFeature('Debug');
        cy.contains('10m').click();

        cy.toFeature('Farm');
        cy.get('[data-cy=farm-harvest-all]').click();
        cy.contains('41');
    });
});
