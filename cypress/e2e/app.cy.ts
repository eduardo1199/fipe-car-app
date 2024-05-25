describe('FipeCarSearch Page', () => {
  it('should be navigate to the search fipe car', () => {
    cy.visit('/')
    cy.wait(3000)

    cy.get('[data-cy=brands]').click()
      .focused().type('Au')
    cy.contains('Audi')
      .should('be.visible')
      .and('have.class', 'MuiAutocomplete-option')
      .click()

    cy.wait(3000)

    cy.get('[data-cy=models]').click()
      .focused().type('80')
    cy.contains('80 2.0')
      .should('be.visible')
      .and('have.class', 'MuiAutocomplete-option')
      .click()

    cy.wait(3000)

    cy.get('[data-cy=yearsCars]').click()
      .focused().type('1995')
    cy.contains('1995-1')
      .should('be.visible')
      .and('have.class', 'MuiAutocomplete-option')
      .click()
    
    cy.get('[data-cy=button-submit]').should('not.be.disabled').click()

    cy.wait(3000)

    cy.get('[data-cy=value-fipe-car]').should('be.visible')
  })
})