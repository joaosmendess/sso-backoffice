describe('Register Test', () => {
    it('Should register a new user and send a link to the email', () => {
      // Define o nome da empresa
      const companyName = 'ofm';
  
      // Visita a página de registro com o nome da empresa
      cy.visit(`/register/${companyName}`);
  
      // Entra com o nome, usuário, email e senha
      cy.get('#nameInput').type('Frontend user');
      cy.get('#userNameInput').type('frontend@ofm.com.br');
      cy.get('#emailInput').type('frontend@ofm.com.br');
      cy.get('#passwordInput').type('123456789');
  
      // Clica no botão de registrar
      cy.get('#registerButton').click();
  
      // Verifica se foi redirecionado para a página de login com a empresa
      cy.url().should('include', `/login/${companyName}`);
  
      // Verifica se uma mensagem de sucesso foi exibida
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Verifique seu email para o link de confirmação.');
    });
  });
  