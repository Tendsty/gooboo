describe('Gems load properly', () => {
    it('gems generate passively', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('gemFeature');
        cy.contains('1d').click();

        cy.toFeature('Gems');
        cy.contains('24');
    });

    it('achievements show accelerated gem gain', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('gemFeature');
        cy.giveUnlock('achievementFeature');

        cy.toFeature('Gems');
        cy.contains('+0%');
    });

    it('new gem upgrades show with event feature', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('gemFeature');
        cy.giveUnlock('eventFeature');

        cy.toFeature('Gems');
        cy.get('[data-cy=gem-upgrade-feature]').vselect('Gems');
    });
});
