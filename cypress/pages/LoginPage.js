class LoginPage {

    acessar() {
        cy.viewport(1440, 900);
        cy.visit('https://seubarriga.wcaquino.me/login');
    }

    preencherEmail(email) {
        cy.get('input[name="email"]')
            .should('be.visible')
            .type(email);
    }

    preencherSenha(senha) {
        cy.get('input[name="senha"]')
            .should('be.visible')
            .type(senha);
    }

    clicarEntrar() {
        cy.get('button[type="submit"]')
            .should('contain.text', 'Entrar')
            .click();
    }

    realizarLogin(email = '', senha = '') {
        this.acessar();

        if (email) this.preencherEmail(email);
        if (senha) this.preencherSenha(senha);

        this.clicarEntrar();
    }

    validarRedirecionamento() {
        cy.url().should('include', '/logar');
    }

    validarAlertaErro(texto) {
        cy.get('div.alert.alert-danger')
            .should('contain.text', texto);
    }

    validarMensagemSucesso(nomeUsuario) {
        cy.get('div.alert.alert-success')
            .should('be.visible')
            .and('have.text', `Bem vindo, ${nomeUsuario}!`);
    }

    validarMensagemErro() {
        cy.get('div.alert.alert-danger')
            .should('be.visible')
            .and('have.text', 'Problemas com o login do usuário');
    }

    validarMensagemSenhaObrigatoria() {
        cy.get('div.alert.alert-danger')
            .should('be.visible')
            .and('have.text', 'Senha é um campo obrigatório');
    }

    validarMensagemEmailObrigatorio() {
        cy.get('div.alert.alert-danger')
            .should('be.visible')
            .and('have.text', 'Email é um campo obrigatório');
    }
}

export default new LoginPage();