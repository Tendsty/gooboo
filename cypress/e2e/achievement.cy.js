describe('Achievements load properly', () => {
    it('achievements show their categories and stats', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('achievementFeature');
        cy.contains('1m').click();

        cy.toFeature('Achievements');
        cy.contains('Game');
        cy.contains('Mining').click();
        cy.contains('This is deep');
    });
});
