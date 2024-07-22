describe('Register and Verify Email Test', () => {
  it('Should register a new user and verify the confirmation email', () => {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID');
    const emailAddress = `joao.silva@${Cypress.env('MAILOSAUR_SERVER_DOMAIN')}`;
    const companyName = 'ofm';

    // Visita a página de registro com o nome da empresa
    cy.visit(`/register/${companyName}`);

    // Preenche os campos de registro
    cy.get('#nameInput').type('João Silva');
    cy.get('#usernameInput').type('joao.silva@ofm.com.br');
    cy.get('#emailInput').type(emailAddress);
    cy.get('#passwordInput').type('123456789');

    // Clica no botão de registrar
    cy.get('#registerButton').click();

    // Verifica se foi redirecionado para a página de login com a empresa
    cy.url().should('include', `/login/${companyName}`);

    // Espera alguns segundos para o e-mail ser entregue
    cy.wait(10000); // Ajuste o tempo conforme necessário

    // Busca o último e-mail no Mailosaur
    cy.mailosaurGetMessage(serverId, {
      sentTo: emailAddress
    }).then(email => {
      // Verifica o conteúdo do e-mail
      expect(email.subject).to.contain('Confirmação de Registro');
      expect(email.to[0].email).to.equal(emailAddress);

      // Extrai o link de confirmação do e-mail
      const confirmationLink = email.html.links[0].href;
      cy.visit(confirmationLink);

      // Verifica se a página de confirmação foi acessada com sucesso
      cy.contains('Seu registro foi confirmado com sucesso').should('be.visible');
    });
  });
});
