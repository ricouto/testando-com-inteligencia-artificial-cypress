import ApiBase from '../../support/api/apiBase';

describe('API Barriga - Contas (ApiBase)', () => {

    let contaId;
    let usuario;

    before(() => {
        cy.fixture('usuario-api').then(dados => {
            usuario = dados;

            cy.loginApi(usuario.email, usuario.senha);
        });
    });

    it('Deve criar uma conta', () => {
        ApiBase.post('/contas', {
            nome: 'Conta via ApiBase'
        }).then((response) => {
            expect(response.status).to.eq(201);
            contaId = response.body.id;
        });
    });

    it('Deve listar contas', () => {
        ApiBase.get('/contas')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
            });
    });

    it('Deve atualizar a conta', () => {
        ApiBase.put(`/contas/${contaId}`, {
            nome: 'Conta atualizada via ApiBase'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Deve remover a conta', () => {
        ApiBase.delete(`/contas/${contaId}`)
            .then((response) => {
                expect(response.status).to.eq(204);
            });
    });

});
