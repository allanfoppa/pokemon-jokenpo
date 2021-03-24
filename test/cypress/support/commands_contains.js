Cypress.Commands.add("contem", (dataAttribute, target) => {
    cy.get(dataAttribute).contains(target)
})