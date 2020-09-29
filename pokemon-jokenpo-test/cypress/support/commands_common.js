Cypress.Commands.add("typeTheEmail", (email) => {
    cy.get('[data-cy="email-login"]').type(email)
})

Cypress.Commands.add("typeThePassword", (pw) => {
    cy.get('[data-cy="password-login"]').type(pw)
})

Cypress.Commands.add("pressButton", () => {
    cy.get('[data-cy="press-button"]').click()
})