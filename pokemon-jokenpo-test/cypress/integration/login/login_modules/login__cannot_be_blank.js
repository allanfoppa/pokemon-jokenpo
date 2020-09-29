describe('Campo senha e email obrigatórios', function() {
    it('Acessa a página', () => {
		cy.visit('/cliente/entrar');
	})
	  
    it('Submete o formulário em branco e espera as validações de erro', () => {
        cy.pressButton()
        
        cy.get('.input-message').each(function () {
              cy.contem('.input-message', 'Este campo é obrigatório. Por favor, preencher.')
        })
    })
})