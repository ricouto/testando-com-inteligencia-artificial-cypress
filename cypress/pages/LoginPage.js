import { MENSAGENS_ALERTA } from '../support/mensagensAlerta';

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

    validarMensagemSucesso(nomeUsuario) {
        cy.get('div.alert.alert-success')
            .should('be.visible')
            .and('have.text', `Bem vindo, ${nomeUsuario}!`);
    }

    validarAlertaErro(mensagem) {
        cy.get('div.alert.alert-danger')
            .should('be.visible')
            .and('contain.text', mensagem);
    }

    validarMultiplosAlertas(mensagensEsperadas = []) {
        cy.get('div.alert.alert-danger')
            .should('have.length.at.least', mensagensEsperadas.length)
            .then(($alertas) => {
                const textosAlertas = [...$alertas].map(alerta => alerta.innerText);

                mensagensEsperadas.forEach((mensagem) => {
                    expect(textosAlertas).to.include(mensagem);
                });
            });
    }

    validarMensagemErroLogin() {
        this.validarMultiplosAlertas([MENSAGENS_ALERTA.LOGIN_INVALIDO]);
    }

    validarMensagemEmailObrigatorio() {
        this.validarMultiplosAlertas([MENSAGENS_ALERTA.EMAIL_OBRIGATORIO]);
    }

    validarMensagemSenhaObrigatoria() {
        this.validarMultiplosAlertas([MENSAGENS_ALERTA.SENHA_OBRIGATORIA]);
    }

}

export default new LoginPage();