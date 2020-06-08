/// <reference types="Cypress" />
import { When, Then } from "cypress-cucumber-preprocessor/steps";

When('user click on the link with href {string}',(href)=>{

  // const clickEventHandlerMock = cy.stub()
  // cy.get(`a.definition[href='${href}']`).then(input => {
  //   input.on('click', clickEventHandlerMock)

  //   cy.get(`a.definition[href='${href}']`)
  //     .click()
  //     .then(() => {
  //       expect(clickEventHandlerMock).to.be.calledOnce;
  //     console.log(clickEventHandlerMock)
  //     })
  // })

 
  cy.server()
    cy.route({
      method: "GET",
      url: '/glossary/v1/Terms/Cancer.gov/Patient/en/45214'
    }).as('firstLink');
  cy.get(`a.definition[href='${href}']`)
  .click();
  cy.wait('@firstLink').then((xhr) => {
    assert.isNotNull(xhr.response.headers, '1st API call has data')
  })
  
});

Then('the call is stub', () => {
   
});