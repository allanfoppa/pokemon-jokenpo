describe('Login', () => {
    it('Acessa a página de login', () => {
		cy.visitPage('http://localhost:3000/')
	})

    it('Realizar o login com sucesso', () => {
        cy.basicForm('allan', '147')
    })
})