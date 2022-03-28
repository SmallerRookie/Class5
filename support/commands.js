// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
/// <reference types="cypress" />
Cypress.Commands.add("LoginAPI",function(){
    cy.request("POST","http://cms.chtoma.com/api/login",
    {
      "role": "manager",
      "email": "manager@admin.com",
      "remember": true,
      "password": "U2FsdGVkX1+p8A19EvP4KBi233rk7Y/+cIIUqWerAG8="
      
    }).then(function(response){
        expect(response.status).to.eq(201)
        Cypress.env('cms',response.body.data.token);
    })
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-file-upload";