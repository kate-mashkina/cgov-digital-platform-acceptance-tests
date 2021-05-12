/// <reference types="Cypress" />
import { And, Then } from "cypress-cucumber-preprocessor/steps";

Then("the page displays pager info {string}", (pagerInfo) => {
    const regex = new RegExp(pagerInfo.replaceAll('N', '\\d+'));
    cy.get('.paging-section__page-info').invoke('text').then((text) => {
        const newText = text.replaceAll('\n', ' ').replaceAll('\t', '');
        expect(newText).to.match(regex)
    })
});
Then('the {int} pager is displayed with the following {string}', (pager, pagerItems) => {
    //convert passed string of pager items into an array
    const expectedPagerItems = pagerItems.split(',');
    let index = 0;
    //only yield visible pager items and verify the count
    cy.get('.pager__navigation').eq(pager - 1).find('li:visible').as('allPages').should('have.length', expectedPagerItems.length)
    //assert that expected pager items are displayed 
    cy.get('@allPages').each(($link) => {
        expect(expectedPagerItems[index]).to.eq($link.text());
        index++;
    });

});
Then('the page {string} is highlighted', (pageNum) => {
    cy.get('button[class="pager__button active"]').first().should('have.text', pageNum)
});
Then('each result displays the trial title with a link in the following format {string}', (linkFormat) => {
    cy.get('.ct-list-item a').should('have.attr', 'href').then((link) => {
        expect(link).to.include(linkFormat)
    })
});
Then('each result displays the trial summary', () => {
    cy.get('.ct-list-item p').should('not.be.empty')
});

Then('each result displays {string} below the summary', (locationStr) => {
    cy.get('.location-info').each((location) => {
        expect(location.text()).to.include(locationStr);
    })
});

When('user clicks on {string} button', (pagerItem) => {
    cy.get('button[class*="pager"]').contains(pagerItem).click();
})

Then('the url has path {string} with query {string}', (path, query) => {
    cy.location('pathname').should('eq', `${path}/`);
    cy.location('search').should('eq', query);
})

When('the user navigates to {string} with non-existent page {string}', (path, pageNum) => {
    cy.visit(`${path}/?${pageNum}`);
})

Then('the text {string} appears', (text) => {
    cy.get('#NCI-trial-listing-app-root p').should('have.text', text)
})

When('user clicks on {int} result', (resultNum) => {
    cy.get('a.ct-list-item__title')
        .eq(resultNum - 1)
        .trigger('click', { followRedirect: false });
});

And('the pager is not displayed', () => {
    cy.get('.pager__navigation').should('not.exist');
});

And('intro text {int} paragraph is {string}', (num, text) => {
    cy.get('.intro-text').find('p').eq(num - 1).should('have.text',text);
    

});

And('{string} link has href {string}', (link, href) => {
    cy.get('a').contains(link).should('have.attr', 'href', href);
});