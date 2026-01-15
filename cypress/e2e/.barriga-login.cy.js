describe('Login - Caminho Feliz (Seu Barriga)', () => {

  it('Deve realizar login com sucesso e redirecionar corretamente', () => {

    // Acessar a página de login
    cy.visit('https://seubarriga.wcaquino.me/login');

    // Preencher o campo Email
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('a@a');

    // Preencher o campo Senha
    cy.get('input[name="senha"]')
      .should('be.visible')
      .type('a');

    // Clicar no botão Entrar
    cy.get('button[type="submit"]')
      .should('contain.text', 'Entrar')
      .click();

    // Validar redirecionamento para /logar
    cy.url().should('include', '/logar');

    // Validar mensagem de sucesso conforme HTML informado
    cy.get('div.alert.alert-success')
      .should('be.visible')
      .and('have.text', 'Bem vindo, a!');

  });

});
