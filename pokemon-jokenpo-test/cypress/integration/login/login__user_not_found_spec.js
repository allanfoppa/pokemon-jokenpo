describe('Usuário não encontrado', function() {
    it('Acessa a página', () => {
		cy.visit('/cliente/entrar');
	})
	  
    it('Insere um usuário inválido e senha correta', () => {
        cy.typeTheEmail('equipe.teste@teste.com')
        cy.typeThePassword('equipe.teste')
        cy.pressLoginButton()

            cy.shouldHaveClass('[data-cy="email-login"]', 'border-color--red-error')
            cy.contem('.input-message', 'Usuário não Encontrado')
    })
})