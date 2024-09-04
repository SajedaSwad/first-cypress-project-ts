/// <reference types="cypress" />
export class LoginPage {
  emailId = "#email-input";
  passwordId = "#password-input";
  loginbutId = "#login-button";
  checkboxId = "#show-password-checkbox";

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
  }
  hidesPassword() {
    cy.get(this.checkboxId).uncheck();
  }
}
