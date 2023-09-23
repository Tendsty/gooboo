// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
