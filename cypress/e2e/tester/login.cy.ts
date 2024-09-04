/// <reference types="cypress" />
import { LoginPage } from "@selector/login-page";

describe("login page", () => {
  const loginPage = new LoginPage();
  const userInfo = [
    { email: "validfuser@gmail.com", password: "validpassword" },
    { email: "invaliduser@gmail.com", password: "validpassword" }, //not found
    { email: "invaliduser", password: "validpassword" }, //invalid format
  ];

  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("login with valid credentials", () => {
    loginPage.enterEmail(userInfo[2].email);
    loginPage.enterPassword(userInfo[2].password);
    loginPage.clickLogin();
  });
});
