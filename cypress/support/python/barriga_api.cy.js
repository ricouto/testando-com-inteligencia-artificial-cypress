/// <reference types="cypress" />

// Testes de API para barriga_api.py

describe('API Barriga', () => {
  let token = '';
  const baseUrl = 'http://localhost:5000';

  before(() => {
    // Login para obter token
    cy.request('POST', `${baseUrl}/signin`, {
      email: 'user@mail.com',
      senha: '123456',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      token = response.body.token;
    });
  });

  beforeEach(() => {
    // Resetar contas antes de cada teste
    cy.request({
      method: 'GET',
      url: `${baseUrl}/reset`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve criar uma conta', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta Teste' },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.nome).to.eq('Conta Teste');
    });
  });

  it('Não deve criar conta duplicada', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta Duplicada' },
    });
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta Duplicada' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Conta já existe');
    });
  });

  it('Deve listar contas', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta 1' },
    });
    cy.request({
      method: 'GET',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('Deve atualizar uma conta', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta Atualizar' },
    }).then((res) => {
      const id = res.body.id;
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/contas/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        body: { nome: 'Conta Atualizada' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('Conta Atualizada');
      });
    });
  });

  it('Deve remover uma conta', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/contas`,
      headers: { Authorization: `Bearer ${token}` },
      body: { nome: 'Conta Remover' },
    }).then((res) => {
      const id = res.body.id;
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/contas/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });

  it('Não deve remover conta inexistente', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/contas/999`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error', 'Conta não encontrada');
    });
  });

  it('Não deve acessar sem token', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/contas`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Token inválido');
    });
  });
});
