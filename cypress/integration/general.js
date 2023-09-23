describe('Generals load properly', () => {
    it('generals are shown with quests', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('generalFeature');

        cy.toFeature('Generals');
        cy.contains('Grobodal');
        cy.contains('1 / 5');

        cy.contains('Digging deeper').click();
        cy.contains('Completion reward');
        cy.contains('Time spent at most 30m 00s');
    });
});
