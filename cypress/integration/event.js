describe('Events load properly', () => {
    it('event calendar shows', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('eventFeature');

        cy.toFeature('Event');
        cy.contains('Calendar');
    });
});
