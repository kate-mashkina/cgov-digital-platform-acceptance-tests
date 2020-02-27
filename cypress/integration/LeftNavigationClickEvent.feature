Feature: Common Google Analytics Load events properties are captured across all content types

    Scenario: Click Events for left navigation Learning to relax

        Given user is navigating to "/about-cancer/coping/feelings"
        Then user is clicking on a menu section with href "/about-cancer/coping/feelings/relaxation"
        Then the common click event properties are captured
        And the following props should be captured
            | v43    | Section Menu     |
            | events | event33          |
            | pev2   | SectionLinkClick |

    Scenario: Click Events for left navigation Feelings

        Given user is navigating to "/about-cancer/coping"
        Then user is clicking on a menu section with href "/about-cancer/coping/feelings"
        Then the common click event properties are captured
        And the following props should be captured
            | v43    | Section Menu     |
            | events | event33          |
            | pev2   | SectionLinkClick |


    Scenario: Click Events for Feature Card number 1

        Given user is navigating to "/"
        Then user is clicking on a feature card at position 1 with href "/about-cancer/coping/feelings"
        Then the common click event properties are captured
        And the following props should be captured
            | c59    | Feature:1           |
            | events | event27             |
            | pev2   | CardClick           |
            | link   | CardClick           |
            | c57    | Feelings and Cancer |
            | c58    | Feelings and Cancer |

     Scenario: Click Events for Feature Card number 2

        Given user is navigating to "/"
        Then user is clicking on a feature card at position 2 with href "/about-cancer/coping/feelings"
        Then the common click event properties are captured
        And the following props should be captured
            | c59    | Feature:2           |
            | events | event27             |
            | pev2   | CardClick           |
            | link   | CardClick           |
            | c57    | Overridden Title |
            | c58    | Overridden Title |

        Scenario: Click Events for External Feature Card number 1

        Given user is navigating to "/"
        Then user is clicking on a external feature card at position 1 with href "https://www.google.com"
        Then the common click event properties are captured
        And the following props should be captured
            | c59    | Feature:3          |
            | events | event27             |
            | pev2   | CardClick           |
            | link   | CardClick           |
            | c57    | External Card Title |
            | c58    | External Card Title |

    Scenario Outline: Hover over mega menu

        Given user is navigating to "/"
        Then user hovering over mega menu with href "<href>"
        Then the common hover event properties are captured
        And the following props should be captured
            | events | event28               |
            | pev2   | MegaMenuDesktopReveal |
            | v43    | Mega Menu             |

        Examples:
            | href             |
            | /about-cancer    |
            | /types           |
            | /research        |
            | /grants-training |
            | /news-events     |
            | /about-nci       |

