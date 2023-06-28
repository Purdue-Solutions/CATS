import React from 'react'
import { Hero } from './Hero'


describe('<Hero></Hero>', () => {
  it('renders hero', () => {
    cy.mount(<Hero />)
    cy.get('[alt="Black cat on orange background"]')
    .should('be.visible')
    
    cy.get('#learn-more')
    .should('contain.text', 'Learn More')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'href', 'https://www.purduesolutions.org')

    cy.get('#title')
    .should('contain.text', 'Interested in Purdue Solutions ?')

    cy.get('#subtext')
    .find('div')
    .should('contain.text', 'Consulting Applicant Tracking System (CATS)')
  })
})