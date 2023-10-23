Cypress.Commands.add('vselect', { prevSubject: 'element' }, (subject, option) => {
    subject.click();
    cy.get('.v-menu__content.menuable__content__active').contains(option).click();
});

Cypress.Commands.add('toFeature', name => {
    cy.contains('Features').click();
    cy.get('[data-cy=feature-list]').contains(name).click();
});

Cypress.Commands.add('giveUnlock', name => {
    cy.get('[data-cy=debug-unlock-input]').type(name.slice(0, -1));
    cy.contains(name).click();
    cy.get('[data-cy=debug-unlock-unlock]').click();
});

Cypress.Commands.add('changeMult', (name, type = 'base', amount = 1) => {
    cy.get('[data-cy=debug-mult-input]').type(name.slice(0, -1));
    cy.contains(name).click();
    cy.get('[data-cy=debug-mult-amount]').type('{backspace}' + amount);
    cy.get('[data-cy=debug-mult-type]').vselect(type);
    cy.get('[data-cy=debug-mult-apply]').click();
});

Cypress.Commands.add('giveCurrency', (name, amount = 1)=> {
    cy.get('[data-cy=debug-currency-input]').type(name.slice(0, -1));
    cy.contains(name).click();
    cy.get('[data-cy=debug-currency-amount]').type('{backspace}' + amount);
    cy.get('[data-cy=debug-currency-gain]').click();
});
