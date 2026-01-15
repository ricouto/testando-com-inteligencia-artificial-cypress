import LoginPage from '../pages/LoginPage';

describe('Login - Caminho Feliz com Fixtures', () => {

  let usuario;

  before(() => {
    cy.fixture('usuario').then((dados) => {
      usuario = dados;
    });
  });

  it('Deve realizar login com sucesso usando dados do fixture', () => {

    LoginPage.acessar();
    LoginPage.preencherEmail(usuario.email);
    LoginPage.preencherSenha(usuario.senha);
    LoginPage.clicarEntrar();

    LoginPage.validarRedirecionamento();
    LoginPage.validarMensagemSucesso(usuario.nome);

  });

  it('Deve exibir mensagem de erro ao tentar login com email incorreto', () => {

    LoginPage.acessar();
    LoginPage.preencherEmail(usuario.email_incorreta);
    LoginPage.preencherSenha(usuario.senha);
    LoginPage.clicarEntrar();

    // Validação da mensagem de erro
    LoginPage.validarMensagemErro();

  });

  it('Deve exibir mensagem de erro ao tentar login com senha incorreta', () => {

    LoginPage.acessar();
    LoginPage.preencherEmail(usuario.email);
    LoginPage.preencherSenha(usuario.senha_incorreta);
    LoginPage.clicarEntrar();

    // Validação da mensagem de erro
    LoginPage.validarMensagemErro();

  });

  it('Deve exibir erro ao tentar login sem informar o email', () => {

    LoginPage.acessar();
    LoginPage.preencherSenha(usuario.senha);
    LoginPage.clicarEntrar();

    LoginPage.validarMensagemEmailObrigatorio();

  });

  it('Deve exibir erro ao tentar login sem informar a senha', () => {

    LoginPage.acessar();
    LoginPage.preencherEmail(usuario.email);
    LoginPage.clicarEntrar();

    LoginPage.validarMensagemSenhaObrigatoria();

  });

  it('Deve exibir mensagens de obrigatoriedade ao tentar login sem preencher email e senha', () => {

    const alerts = [
      'Senha é um campo obrigatório',
      'Email é um campo obrigatório'
    ]

    // Acessar a página de login
    LoginPage.acessar();

    // Clicar em Entrar sem preencher os campos
    LoginPage.clicarEntrar();

    // Validar mensagens de obrigatoriedade
    alerts.forEach((alert) => {
      cy.alertErrorHaveText(alert)
    })

    // LoginPage.validarMensagemEmailObrigatorio();
    // LoginPage.validarMensagemSenhaObrigatoria();

  });
});
