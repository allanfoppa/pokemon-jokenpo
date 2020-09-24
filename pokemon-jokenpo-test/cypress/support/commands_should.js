Cypress.Commands.add("shouldHaveClass", (dataAttribute, className) => {
    cy.get(dataAttribute).should('have.class', className)
})