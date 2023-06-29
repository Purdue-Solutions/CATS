import React from 'react'
import Login from './Login'


describe('<Login>', () => {
  it('renders login', () => {
    cy.mount(<Login />)

    // Logo
    cy.get('[alt="CATS Logo"]')
    .should('be.visible')
    
    // Title
    cy.get('#welcome-back')
    .should('contain.text', 'Welcome back!')
    
    // create account button
    cy.get('#create-account')
    .should('contain.text', 'Create account')
    .should('have.attr', 'href', '/register')

    // email text input
    cy.get('#email-inpu')
    .should('have.attr', 'placeholder', 'pete@purdue.edu')

    // password input
    cy.get('#password-input')
    .should('have.attr', 'placeholder', 'Your password')

    // forgot password button
    cy.get('#forgot-password')
    .should('contain.text', 'Forgot password?')

    cy.get('#log-in')
    .should('contain.text', 'Sign in')
  })
})