
Cypress.Commands.add("login", (userName, userPW) => {
    cy.typeTheEmail(userName)
    cy.typeThePassword(userPW)
    cy.pressLoginButton()
})