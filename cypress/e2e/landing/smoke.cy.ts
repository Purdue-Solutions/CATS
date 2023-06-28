describe('Verify Page Load', () => {
  it('Checks all static routes', () => {
    cy.visit('http://localhost:3000')
    cy.title().should("eq", "Purdue Solutions CATS")
  })
})