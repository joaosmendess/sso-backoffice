describe('Login Test', () => {
    it('Should log in with valid credentials', () => {
      
  
      // Visita a página de login com o nome da empresa
      cy.visit(`/login`);
  
      // Entra com o email e senha válidos
      cy.get('#usuario').type('pde.teste');
      cy.get('#senha').type('12345678');
  
      // Clica no botão de login
      cy.get('button[type=submit]').click();
  
      // Verifica se foi redirecionado para a página de seleção de produtos com o nome da empresa
      cy.url().should('include', `/painel`);
    });
  
   /* it('Should show error with invalid credentials', () => {
      // Define o nome da empresa
      const companyName = 'OFM%20LTDA'; // Certifique-se de que a codificação está correta
  
      // Visita a página de login com o nome da empresa
      cy.visit(`/login/${companyName}`);
  
      // Entra com o email e senha inválidos
      cy.get('#userNameInput').type('invaliduser@example.com');
      cy.get('#passwordInput').type('invalidpassword');
  
      // Clica no botão de login
      cy.get('#loginButton').click();
  
      // Verifica se a mensagem de erro é exibida
      cy.get('.MuiAlert-message').should('be.visible').and('contain', 'Falha no login. Verifique suas credenciais.');
  
      // Verifica se não foi redirecionado para a página de seleção de produtos
      cy.url().should('include', `/login/${companyName}`);
    });
    */
  });
  