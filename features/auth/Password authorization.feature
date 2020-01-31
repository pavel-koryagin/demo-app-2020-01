Feature: Password authorization

##################################################################################################
# Positive scenarios #############################################################################
##################################################################################################

  Scenario: Register
    Given I am at /register/

    When I submit the form
      | Email            | new-user@example.com |
      | Password         | 123                  |
      | Confirm Password | 123                  |
      | First Name       | John                 |
      | Last Name        | Smith                |
    Then I am redirected to /

    # Let's ensure new credentials work
    When I take a new device
    And I am at /login/

    When I submit the form
      | Email    | new-user@example.com |
      | Password | 123                  |
    Then I am redirected to /


##################################################################################################
# Negative scenarios #############################################################################
##################################################################################################
