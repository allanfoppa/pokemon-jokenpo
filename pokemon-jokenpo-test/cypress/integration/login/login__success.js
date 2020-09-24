describe('Login', function() {
    it('Acessa a página', () => {
		cy.visitPage('http://localhost:3000/');
	})

    it('Realizar o login com sucesso', () => {
        cy.login('allan', '147')
    })
})