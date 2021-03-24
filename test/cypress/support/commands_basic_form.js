
Cypress.Commands.add("basicForm", (userName, userPW) => {
    cy.typeTheEmail(userName)
    cy.typeThePassword(userPW)
    cy.pressButton()
})