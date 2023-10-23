describe('Mining feature loads properly', () => {
    it('scrap can be gained over time', () => {
        cy.toFeature('Debug');
        cy.contains('1m').click();

        cy.toFeature('Mining');
        cy.contains('10.00K');
    });

    it('crafting unlock shows craft button', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('miningPickaxeCrafting');

        cy.toFeature('Mining');
        cy.contains('Craft');
    });

    it('depth dweller offers prestige option', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('miningDepthDweller');

        cy.toFeature('Mining');
        cy.contains('Depth dweller').click();
        cy.contains('Prestige');
    });

    it('smeltery unlocks access to temperature', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('miningSmeltery');

        cy.toFeature('Mining');
        cy.contains('100°C');
        cy.contains('275°C');
    });

    it('resin can be used in crafting', () => {
        cy.toFeature('Debug');
        cy.giveUnlock('miningPickaxeCrafting');
        cy.giveUnlock('miningResin');

        cy.toFeature('Mining');
        cy.get('[data-cy=mining-resin-input]');
    });
});
