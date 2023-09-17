/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('/');
    // click link to about page
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('equal', '/about');

    // go back
    cy.go('back');

    // check we are on home page
    cy.location('pathname').should('equal', '/');

    // check home button works
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('equal', '/');
  });
});