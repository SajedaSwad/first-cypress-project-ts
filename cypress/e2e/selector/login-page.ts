/// <reference types="cypress" />
export class LoginPage {
  emailId = "#email-input";
  passwordId = "#password-input";
  loginbutId = "#login-button";
  checkboxId = "#show-password-checkbox";
  haveaccountID = "#signup-link";

  enterEmail(email: string) {
    cy.get(this.emailId).clear().type(email);
  }
  enterPassword(password: string) {
    cy.get(this.passwordId).clear().type(password);
  }
  clickLogin() {
    cy.get(this.loginbutId).click();
  }
  showPassword() {
    cy.get(this.checkboxId).check();
    cy.get(this.passwordId).should("have.attr", "type", "text");
  }
  hidesPassword() {
    cy.get(this.checkboxId).uncheck();
    cy.get(this.passwordId).should("have.attr", "type", "password");
  }
  navigateSignUp() {
    cy.get(this.haveaccountID).click();
  }
  // // Method to check validation messages
  // checkValidationMessage(field: string, message: string) {
  //   cy.get(field).then(($input) => {
  //     cy.wrap($input).invoke('prop', 'validationMessage').should('equal', message);
  //   });
}
