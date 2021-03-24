
describe('Procura um pokemon através do número na pokedex', () => {

    it('Digita o número e pressiona buscar', () => {
        cy.get('[data-cy="search-pokemon-by-number"]').type('8')
        cy.screenshot('digitando-o-numero')
        cy.pressButton()
        cy.screenshot('pokemon buscado')
    })
})