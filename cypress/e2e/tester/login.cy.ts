/// <reference types="cypress" />

import { LoginPage } from "@selector/login-page";

describe("login page", () => {
  const loginPage = new LoginPage();
  const userInfo = {
    email: "sajedaswad3@gmail.com",
    password: "sa.sajedaswad",
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("login with valid credentials", () => {
    loginPage.enterEmail(userInfo.email);
    loginPage.enterPassword(userInfo.password);
    loginPage.clickLogin();
  });
});
