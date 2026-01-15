describe('API Barriga - Autenticação e Contas', () => {

    let contaId;
    let usuario;

    before(() => {
        cy.fixture('usuario-api').then(dados => {
            usuario = dados;

            cy.loginApi(usuario.email, usuario.senha)
        });
    });

    it.skip('Deve autenticar o usuário e obter token JWT', () => {
        cy.request({
            method: 'POST',
            url: `/signin`,
            body: {
                email: usuario.email,
                senha: usuario.senha
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            token = response.body.token;
        });
    });

    it('Deve criar uma nova conta', () => {
        cy.request({
            method: 'POST',
            url: `/contas`,
            headers: {
                Authorization: `JWT ${Cypress.env('token')}`
            },
            body: {
                nome: usuario.conta.nome
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.nome).to.eq(usuario.conta.nome);

            contaId = response.body.id;
        });
    });

    it('Deve listar as contas do usuário', () => {
        cy.request({
            method: 'GET',
            url: `/contas`,
            headers: {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            const conta = response.body.find(c => c.id === contaId);
            expect(conta).to.exist;
        });
    });

    it('Deve atualizar o nome da conta', () => {
        cy.request({
            method: 'PUT',
            url: `/contas/${contaId}`,
            headers: {
                Authorization: `JWT ${Cypress.env('token')}`
            },
            body: {
                nome: 'Conta Cypress API Atualizada'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.eq('Conta Cypress API Atualizada');
        });
    });

    it('Deve remover a conta criada', () => {
        cy.request({
            method: 'DELETE',
            url: `/contas/${contaId}`,
            headers: {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

});
