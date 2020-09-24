describe('Campo e-mail é obrigatório', function() {
    it('Acessa a página', () => {
		cy.visit('/cliente/entrar');
	})
	  
    it('Preenche o campo de senha e submete o formulário', () => {
        cy.typeThePassword('equipe.teste')
        cy.pressLoginButton()

            cy.shouldHaveClass('[data-cy="email-login"]', 'border-color--red-error')
            cy.contem('.input-message', 'Este campo é obrigatório. Por favor, preencher.')
    })
})