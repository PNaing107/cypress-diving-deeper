/// <reference types="Cypress" />

describe('contact form', () => {
    beforeEach(() => {
        cy.visit('/about');
    });
    it('should submit form', () => {
        cy.get('[data-cy="contact-input-message"]').type('Hello world!');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-input-email"]').type('test@example.com');
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        cy.submitForm();

        // after submitting it should display loading state & button should also be disabled
        cy.get('[data-cy="contact-btn-submit"]').contains('Sending...').and('have.attr', 'disabled');
        // this is an alternative syntax
        /*
        cy.get('[data-cy="contact-btn-submit"]').then((el)) => {
            expect(el.attr('disabled')).to.be.defined;
            expect(el.text()).to.eq('Sending...');
        }
        */
    });

    it('should validate the form input', () => {
        cy.submitForm();
        cy.get('[data-cy="contact-btn-submit"]').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).not.eq('Sending...');
        });
        // when the input field loses focus an invalid styling should be applied
        cy.get('[data-cy="contact-input-message"]').focus().blur();
        cy.get('[data-cy="contact-input-message"]').parent().should('have.attr', 'class').and('match', /invalid/);
        cy.get('[data-cy="contact-input-name"]').focus().blur();
        cy.get('[data-cy="contact-input-name"]').parent().should('have.attr', 'class').and('match', /invalid/); // this is another way of testing for the class attribute using regex and it doesn't fail when using the Cypress test runner
    });
});