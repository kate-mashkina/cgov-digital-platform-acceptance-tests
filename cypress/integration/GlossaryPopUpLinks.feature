Feature: Glossary pop ups 

  Scenario: When user clicks on the link
  Given user is navigating to "/test/dictionary-link-test"
  When user click on the link with href "/Common/PopUps/popDefinition.aspx?id=CDR0000045214&version=Patient&language=English"
  Then the call is stub