/// <reference types="Cypress" />

import { Then } from "cypress-cucumber-preprocessor/steps";

Then('user is clicking on a menu section with href {string}', (hrefAttr) => {
    cy.Beacons = [];
    cy.document().then($document => {
        $document.addEventListener('click', (e) => { e.preventDefault(); return false; })
    })
    // Make the browser desktop viewport so left nav shows.
    // Do this BEFORE tracking analytics call since it also
    // makes a call.
    cy.viewport(1025, 600);
    // Click the left nav to trigger the event, which the above eventListener
    // will listen for.
    let locator = '#nvcgSlSectionNav a[href="' + hrefAttr + '"]';
    cy.get(locator).click();
});

Then('the common click event properties are captured', () => {


    let clickBeacon;
    for (let i = 0; i < cy.AnalyticsStorage.length; i++) {
        let singleBeacon = cy.AnalyticsStorage[i].getParams();
        if (!(singleBeacon.get('pe') === undefined)) {
            if (singleBeacon.get('pe').includes('lnk_o') && !singleBeacon.get('pev2').includes('ResizedToDesktop')) {
                clickBeacon = singleBeacon;
            }
        }
    }

    cy.url().should('be.eq', clickBeacon.get('g'));
    cy.url().should('contain', clickBeacon.get('pageName'));
    expect(clickBeacon.get('v2')).to.be.equal(clickBeacon.get('c8'));
    expect(clickBeacon.get('c67')).to.be.equal('D=pageName');
    expect(clickBeacon.get('c4')).to.be.equal('D=pev1');
    var intermidiate = clickBeacon.get('c8');
    let language;
    //to dynamically compare values, c8 event capture language as 'english' or 'spanish'
    //whereas metatag holds 'en' and 'es' 
    if (intermidiate === 'english') {
        language = 'en';
    }
    else if (intermidiate === 'spanish') {
        language = 'es';
    }
    cy.get("meta[http-equiv='content-language'").invoke('attr', 'content').should('be.equal', language)
    ;

});

Then('the following props should be captured', dataTable => {
    var rawTable = dataTable.rawTable.slice();
    let clickBeacon;
    for (let k = 0; k < cy.AnalyticsStorage.length; k++) {
        let singleBeacon = cy.AnalyticsStorage[k].getParams();
        if (!(singleBeacon.get('pe') === undefined)) {
            if (singleBeacon.get('pe').includes('lnk_o') && !singleBeacon.get('pev2').includes('ResizedToDesktop')) {
                clickBeacon = singleBeacon;
            }
        }
    }
    for (let j = 0; j < rawTable.length; j++) {
        var row = rawTable[j];
        expect(clickBeacon.get(row[0])).to.be.equal(row[1]);
    }


});






