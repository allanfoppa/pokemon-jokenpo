describe('Campo senha é obrigatório', function() {
    it('Acessa a página', () => {
		cy.visit('/cliente/entrar');
	})
	  
    it('Preenche o campo e-mail e submete o formulário', () => {
        cy.typeTheEmail('equipe.teste@teste.com')
        cy.pressButton()

            cy.shouldHaveClass('[data-cy="password-login"]', 'border-color--red-error')
            cy.contem('.input-message', 'Este campo é obrigatório. Por favor, preencher.')
    })
})