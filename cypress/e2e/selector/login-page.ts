/// <reference types="cypress" />

export class LoginPage {
  emailId = "#email-input";
  passwordId = "#password-input";
  loginbutId = "#login-button";

  enterEmail(email: string) {
    cy.get(this.emailId).type(email);
  }
  enterPassword(password: string) {
    cy.get(this.passwordId).type(password);
  }
  clickLogin() {
    cy.get(this.loginbutId).click();
  }
}
