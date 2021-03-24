/**
    * Abre a Url
    * @param {string} page - Vai até a página indicada: ex: '/' -> index, '/cliente/entrar' -> tela de login.
**/
Cypress.Commands.add("visitPage", (page) => {
    cy.visit(page)
})