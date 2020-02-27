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
    cy.wait(1500);
});

Then('the common click event properties are captured', () => {
    let clickBeacon = getClickBeacon();

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
    let clickBeacon = getClickBeacon();
   
    for (let j = 0; j < rawTable.length; j++) {
        var row = rawTable[j];
        expect(clickBeacon.get(row[0])).to.be.equal(row[1]);
    }
});


Then('user is clicking on a feature card at position {int} with href {string}', (index, hrefAttr) => {
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
    let locator = '.feature-card a[href="' + hrefAttr + '"]';
    cy.get(locator).eq(index-1).click();
    cy.wait(1500)
});




Then('user is clicking on a external feature card at position {int} with href {string}', (index, hrefAttr) => {
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
    let locator = '.feature-card a[href="' + hrefAttr + '"]';
    cy.get(locator).eq(index-1).click();
    cy.wait(1500)
});

Then('user hovering over mega menu with href {string}', (href) => {
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
    let locator = ".nav-item-title a[href='"+href + "']"
    cy.get(locator).trigger('mouseover');
    cy.wait(1500)
});


Then('the common hover event properties are captured', () => {
    let clickBeacon = getClickBeacon();

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

function getClickBeacon() {
let clickBeacon;
    for (let i = 0; i < cy.AnalyticsStorage.length; i++) {
        let singleBeacon = cy.AnalyticsStorage[i].getParams();
        if (!(singleBeacon.get('pe') === undefined)) {
            if (singleBeacon.get('pe').includes('lnk_o') && !singleBeacon.get('pev2').includes('ResizedToDesktop')) {
                clickBeacon = singleBeacon;
            }
        }else continue;
    }
return clickBeacon;
}
