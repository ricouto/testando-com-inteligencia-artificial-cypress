import LoginPage from '../pages/LoginPage';

describe('Login - Fluxos sucesso e negativos aplicando Fixtures', () => {

  let usuario;

  before(() => {
    cy.fixture('usuario').then(dados => {
      usuario = dados;
    });
  });

  it('Login com sucesso', () => {
    LoginPage.realizarLogin(usuario.email, usuario.senha);
    LoginPage.validarRedirecionamento();
    LoginPage.validarMensagemSucesso(usuario.nome);
  });

  it('Login inválido - email incorreto', () => {
    LoginPage.realizarLogin(usuario.email_incorreta, usuario.senha);
    LoginPage.validarMensagemErroLogin();
  });

  it('Login inválido - senha incorreta', () => {
    LoginPage.realizarLogin(usuario.email, usuario.senha_incorreta);
    LoginPage.validarMensagemErroLogin();
  });

  it('Email obrigatório', () => {
    LoginPage.realizarLogin('', usuario.senha);
    LoginPage.validarMensagemEmailObrigatorio();
  });

  it('Senha obrigatória', () => {
    LoginPage.realizarLogin(usuario.email, '');
    LoginPage.validarMensagemSenhaObrigatoria();
  });

  it('Campos obrigatórios', () => {
    const alerts = [
      'Email é um campo obrigatório',
      'Senha é um campo obrigatório'
    ];

    LoginPage.realizarLogin();

    alerts.forEach(alert => {
      LoginPage.validarAlertaErro(alert);
    });
  });
});
