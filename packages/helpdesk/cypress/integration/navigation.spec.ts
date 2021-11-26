import cypress from 'cypress';

describe('Navigation', () => {
  it('should be possible to log-in as employee 00001 and navigate through the pages', () => {
    cy.visit('https://bluejay-helpdesk.herokuapp.com');
    cy.contains('Customer Support');
    cy.get('[data-cy=employee-id-input]').should('be.visible').type('00001');
    cy.get('[data-cy=employee-password-input]').type('JenniferTestPassword1');
    cy.get('[data-cy=employee-login-button]').click();
    cy.contains('Pending Tickets');
    // cy.wait(5000);
    // cy.get('[data-cy=data-button]').should('be.visible').click();
    // cy.contains('Ticket Reports');
    cy.get('[data-cy=logout-button]').should('be.visible').click();
    cy.contains('Customer Support');
  });
});
