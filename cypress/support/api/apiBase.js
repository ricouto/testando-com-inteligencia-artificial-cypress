class ApiBase {

  static get(url, headers = {}) {
    return cy.request({
      method: 'GET',
      url,
      headers: this._authHeaders(headers)
    });
  }

  static post(url, body = {}, headers = {}) {
    return cy.request({
      method: 'POST',
      url,
      body,
      headers: this._authHeaders(headers)
    });
  }

  static put(url, body = {}, headers = {}) {
    return cy.request({
      method: 'PUT',
      url,
      body,
      headers: this._authHeaders(headers)
    });
  }

  static delete(url, headers = {}) {
    return cy.request({
      method: 'DELETE',
      url,
      headers: this._authHeaders(headers)
    });
  }

  static _authHeaders(headers) {
    const token = Cypress.env('token');

    if (token) {
      return {
        ...headers,
        Authorization: `JWT ${token}`
      };
    }

    return headers;
  }
}

export default ApiBase;