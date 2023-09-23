describe('Notes load properly', () => {
    it('notes can be viewed', () => {
        cy.toFeature('Debug');
        cy.contains('1m').click();

        cy.contains('Read').click();
        cy.contains('Use pickaxe');
    });
});
