import cypress from 'cypress';

describe('Navigation', () => {
  it('should be possible to log-in as employee 00001 and navigate through the pages', () => {
    cy.visit('https://bluejay-helpdesk.herokuapp.com');
    // cy.visit('http://localhost:3000');
    cy.contains('Customer Support');
    cy.get('[data-cy=employee-id-input]').should('be.visible').type('00001');
    cy.get('[data-cy=employee-password-input]').type('JenniferTestPassword1');
    cy.get('[data-cy=employee-login-button]').click();
    cy.contains('Pending Tickets');
    cy.wait(10000);
    cy.get('[data-cy=data-button]').should('be.visible').click();
    cy.contains('Ticket Reports');
  });
  //   it('should be possible to buy a product, change its quantity in the cart and delete it again from there (verifying cookie)', () => {
  //     cy.visit('http://localhost:3000');
  //     cy.get('[data-cy=logo-link]').click();
  //     cy.contains('Apples');
  //     cy.get(`[data-cy=product-${randomProductId}]`).click();
  //     cy.contains('Amounts to');
  //     cy.get('[data-cy=buy-product-button]').click();
  //     cy.wait(1000);
  //     cy.contains('Apples');
  //     cy.get('[data-cy=link-to-cart]').click();
  //     cy.contains('Delete all');
  //     cy.getCookie('cart').should(
  //       'have.property',
  //       'value',
  //       `[{%22id%22:${randomProductId}%2C%22amount%22:1}]`,
  //     );
  //     cy.get(`[data-cy=cart-input-field-${randomProductId}]`).type('9');
  //     cy.getCookie('cart').should(
  //       'have.property',
  //       'value',
  //       `[{%22id%22:${randomProductId}%2C%22amount%22:9}]`,
  //     );
  //     cy.get(`[data-cy=cart-delete-field-${randomProductId}]`).click();
  //     cy.getCookie('cart').should('have.property', 'value', '[]');
  //   });
});
