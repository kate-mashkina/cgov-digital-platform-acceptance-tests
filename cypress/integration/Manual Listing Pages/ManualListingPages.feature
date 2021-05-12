Feature: All manual pages

    Scenario Outline: All manual trial listing page components are displayed (with pagers)
        Given screen breakpoint is set to "<screen breakpoint>"
        When user is navigating to "<path>"
        Then page title is "<page title>"
        And the page displays pager info "Trials 1-N of N"
        And the 1 pager is displayed with the following "<pager items>"
        And the page "1" is highlighted
        And each result displays the trial title with a link in the following format "/clinicaltrials/NCI-"
        And each result displays the trial summary
        And each result displays 'Location: ' below the summary
        And the 2 pager is displayed with the following "<pager items>"

        Examples:
            | screen breakpoint | path                                                   | page title                                                             | pager items  |
            | desktop           | /about-cancer/treatment/clinical-trials/cam-procedures | Clinical Trials for Complementary or Alternative Medicine Procedure(s) | 1,2,3,Next > |
            | mobile            | /about-cancer/treatment/clinical-trials/cam-procedures | Clinical Trials for Complementary or Alternative Medicine Procedure(s) | 1,2,3,Next > |


    Scenario Outline: All manual trial listing page components are displayed (without pagers)
        Given screen breakpoint is set to "<screen breakpoint>"
        When user is navigating to "<path>"
        Then page title is "<page title>"
        And the page displays pager info "Trials 1-N of N"
        And the pager is not displayed
        And each result displays the trial title with a link in the following format "/clinicaltrials/NCI-"
        And each result displays the trial summary
        And each result displays 'Location: ' below the summary
        Examples:
            | screen breakpoint | path                                                       | page title                                  |
            | desktop           | /about-cancer/treatment/clinical-trials/adult-brain-tumors | Clinical Trials to Treat Adult Brain Tumors |
            | mobile            | /about-cancer/treatment/clinical-trials/adult-brain-tumors | Clinical Trials to Treat Adult Brain Tumors |

    Scenario Outline: manual trial listing page  with intro text
        Given screen breakpoint is set to "<screen breakpoint>"
        When user is navigating to "/about-cancer/treatment/clinical-trials/covid-19"
        Then page title is "NCI-Supported Clinical Trials for Coronavirus"
        And intro text 1 paragraph is "Clinical trials are research studies that involve people. Through clinical trials, doctors find new ways to improve treatments and the quality of life for people with disease."
        And intro text 2 paragraph is "NCI supports clinical trials to test promising treatments for patients with coronavirus disease 2019 (COVID-19) and to learn more about the disease's effects on the body. Some of the trials are specifically for patients with cancer. Your doctor can help you decide if a trial is right for you."
        And "Clinical trials" link has href "/publications/dictionaries/cancer-terms/def/clinical-trial"
        And "quality of life" link has href "/publications/dictionaries/cancer-terms/def/quality-of-life"

        Examples:
            | screen breakpoint |
            | desktop           |
            | mobile            |


    Scenario Outline: Pager functionality
        Given screen breakpoint is set to "<screen breakpoint>"
        When user is navigating to "<path>"
        And the page displays pager info "Trials 1-N of N"
        And the 1 pager is displayed with the following "<pager items>"
        And the page "1" is highlighted
        When user clicks on "Next >" button
        Then the url has path "<path>" with query "?pn=2"
        And the page "2" is highlighted
        When the user navigates to "<path>" with non-existent page "pn=900"
        Then the text "There are currently no available trials." appears

        Examples:
            | screen breakpoint | path                                                   | pager items  |
            | desktop           | /about-cancer/treatment/clinical-trials/cam-procedures | 1,2,3,Next > |

    Scenario Outline: Meta Tags
        When user is navigating to "<path>"
        Then page title is "<page title>"
        Then the title tag should be "<title tag>"
        And the page contains meta tags with the following properties
            | property       | content          |
            | og:title       | <og:title>       |
            | og:url         | <og:url>         |
            | og:description | <og:description> |
        And the page contains meta tags with the following names
            | name        | content       |
            | description | <description> |
        And there is a canonical link with the href "<canonical link>"

        Examples:
            | path                                                   | page title                                                             | title tag                                                                                          | og:title                                                               | og:url                                                                         | og:description                                                                                                                                                                                                | description                                                                                                                                                                                                   | canonical link                                                                 |
            | /about-cancer/treatment/clinical-trials/cam-procedures | Clinical Trials for Complementary or Alternative Medicine Procedure(s) | Clinical Trials for Complementary or Alternative Medicine Procedure(s) - National Cancer Institute | Clinical Trials for Complementary or Alternative Medicine Procedure(s) | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures | Find clinical trials for complementary or alternative medicine procedures.                                                                                                                                    | Find clinical trials for complementary or alternative medicine procedures.                                                                                                                                    | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures |
            | /about-cancer/treatment/clinical-trials/covid-19       | NCI-Supported Clinical Trials for Coronavirus                          | NCI-Supported Clinical Trials for Coronavirus - National Cancer Institute                          | NCI-Supported Clinical Trials for Coronavirus                          | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/covid-19       | List of ongoing clinical trials for coronavirus disease 2019 (COVID-19) supported by the National Cancer Institute. Some trials may be specifically for people with cancer who also have coronavirus disease. | List of ongoing clinical trials for coronavirus disease 2019 (COVID-19) supported by the National Cancer Institute. Some trials may be specifically for people with cancer who also have coronavirus disease. | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/covid-19       |
    Scenario: Analytics
        When user is navigating to "/about-cancer/treatment/clinical-trials/cam-procedures" with added wait
        Then page load request is sent
        And the following parameters should be captured
            | parameter | value                                                                                              |
            | prop6     | Clinical Trials for Complementary or Alternative Medicine Procedure(s)                             |
            | prop10    | Clinical Trials for Complementary or Alternative Medicine Procedure(s) - National Cancer Institute |
            | prop44    | Clinical Trials                                                                                    |
            | prop3     | /about-cancer/treatment/clinical-trials/cam-procedures/                                            |
            | prop26    | /^\d{4}\|\d{1,2}\|\d{1,2}\|\d{1,2}$/                                                               |
            | prop29    |                                                                                                    |
            | prop62    | Clinical Trials: Custom                                                                            |
            | prop20    | /^manual parameters\|\d{1,2}/                                                                      |
            | prop11    | clinicaltrials_custom                                                                              |
            | prop8     | english                                                                                            |
            | evar44    | D=c44                                                                                              |
            | evar11    | D=c11                                                                                              |
            | evar20    | D=c20                                                                                              |
            | evar47    | clinicaltrials_custom                                                                              |
            | evar62    | D=c62                                                                                              |
            | pageName  | {CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures                             |
            | pageURL   | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures                     |
            | event2    |                                                                                                    |
            | event1    |                                                                                                    |
            | channel   | About Cancer                                                                                       |

    Scenario: Analytics click event
        When user is navigating to "/about-cancer/treatment/clinical-trials/cam-procedures"
        Then page title is "Clinical Trials for Complementary or Alternative Medicine Procedure(s)"
        When user clicks on 1 result
        Then page click request is sent
        And the following parameters should be captured
            | parameter | value                                                                          |
            | prop4     | D=pev1                                                                         |
            | prop67    | D=pageName                                                                     |
            | prop13    | 1\|page 1                                                                      |
            | prop12    | clinicaltrials_custom                                                          |
            | prop8     | english                                                                        |
            | evar2     | D=c8                                                                           |
            | evar12    | D=c12                                                                          |
            | pageName  | {CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures         |
            | pageURL   | https://{CANONICAL_HOST}/about-cancer/treatment/clinical-trials/cam-procedures |
            | event42   |                                                                                |
            | channel   | About Cancer                                                                   |
            | pev2      | CTSLink                                                                        |
            | linkType  | lnk_o                                                                          |