Cypress.Commands.add("typeThePassword", (pw) => {
    cy.get('[data-cy="password-login"]').type(pw)
})

Cypress.Commands.add("typeTheEmail", (email) => {
    cy.get('[data-cy="email-login"]').type(email)
})

Cypress.Commands.add("pressLoginButton", () => {
    cy.get('[data-cy="enter-login"]').click()
})

Cypress.Commands.add("pressRegisterButton", () => {
    cy.get('[data-cy="enter-register"]').click()
})