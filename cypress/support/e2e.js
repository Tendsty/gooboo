import './commands'

beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:8080');
    cy.get('input[type=file]').selectFile('debug.json', {force: true});
});
