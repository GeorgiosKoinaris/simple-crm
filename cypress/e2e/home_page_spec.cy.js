describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/user');
        cy.get('#mat-input-0').type('Hans');
    })
})