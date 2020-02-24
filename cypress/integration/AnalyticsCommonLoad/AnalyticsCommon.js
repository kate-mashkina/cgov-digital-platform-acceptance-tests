import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('user is navigating to {string}', (a) => {
   cy.visit(a);
});

Then('the common load event properties are captured',()  => {
   
 cy.window().then((win) => {
    //create a map of request being sent of
    var networkrequests = win.performance.getEntries().map(r => r.name);
    //list of URLs collected
    var urlList = new Array();
    for(var i=0; i<networkrequests.length; i++){
       var temp = networkrequests[i].toString()
     if(temp.includes('b/ss')){
        //find the GA url and store it
         urlList.push(networkrequests[i]);
      }
    }   
    //get the last GA url and create an URL object of it
   var url = new URL(urlList[urlList.length-1]);
   //this variable will hold URLSearchParams - used to search for any query parameter
  var urlParams = new URLSearchParams(url.search);
 
  //Assertions:
cy.url().should('be.eq',urlParams.get('c1'));
cy.location('pathname').should('be.eq',urlParams.get('c3'));
cy.title().should('be.eq',urlParams.get('c10'));
cy.get("meta[name='dcterms.isPartOf']").invoke('attr','content').should('be.eq',urlParams.get('c44'));
expect(urlParams.get('c42')).to.be.equal('Normal');
expect(urlParams.get('c65')).to.match(/^\d{1,4}$/);
expect(urlParams.get('c26')).to.match(/^\d{4}\|\d{1,2}\|\d{1,2}\|\d{1,2}$/);
expect(urlParams.get('c29')).to.match(/^\d{1,2}:\d{2} (AM|PM)\|[a-zA-z]+day$/);
expect(urlParams.get('events')).to.contain('event1');
expect(urlParams.get('events')).to.contain('event47');

//global variable to convert the language captured in meta tag with language emitted by GA
win.LANGUAGE;

//get the language emitted
var intermidiate = urlParams.get('c8');

//to dynamically compare values, c8 event capture language as 'english' or 'spanish'
//whereas metatag holds 'en' and 'es' 
if (intermidiate==='english'){
win.LANGUAGE = 'en';
}
else if(intermidiate==='spanish'){
win.LANGUAGE = 'es';
}
cy.get("meta[http-equiv='content-language'").invoke('attr','content').should('be.equal',win.LANGUAGE);
 })
});
