Cypress.Commands.add('typeSearchValue', (value) => {
    cy.get('[data-cy="keyword-input"]').type(value)
})

Cypress.Commands.add('buttonSearchValue', () => {
    cy.get('[data-cy="keyword-button"]').click()
})