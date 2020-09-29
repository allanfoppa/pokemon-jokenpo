describe('Cadastro', () => {
    it('Acessa a página de cadastro', () => {
        cy.visitPage('http://localhost:3000/cadastrar')
    })

    it('Realizar o cadastro com sucesso', () => {
        cy.basicForm('ash', '123')
    })
})