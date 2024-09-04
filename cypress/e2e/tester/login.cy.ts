/// <reference types="cypress" />
import { LoginPage } from "@selector/login-page";

describe("login page", () => {
  const loginPage = new LoginPage();
  const userInfo = [
    { email: "validfuser@gmail.com", password: "validpassword" }, //valid credential
    { email: "invaliduser@gmail.com", password: "validpassword" }, //not found email
    { email: "invaliduser", password: "validpassword" }, //invalid format for email
    { email: "validfuser@gmail.com", password: "123" }, //incorrect password
    { email: "", password: "" }, //empty fields??not work cause the cy,type not accept the empty data
  ];

  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it.skip("login with valid credentials", () => {
    loginPage.enterEmail(userInfo[0].email);
    loginPage.enterPassword(userInfo[0].password);
    loginPage.clickLogin();
    cy.wait(3000);
  });

  it.skip("login with invalid email", () => {
    loginPage.enterEmail(userInfo[1].email);
    loginPage.enterPassword(userInfo[1].password);
    loginPage.clickLogin();
    cy.wait(3000);
  });

  it.skip("login with incorrect password", () => {
    loginPage.enterEmail(userInfo[3].email);
    loginPage.enterPassword(userInfo[3].password);
    loginPage.clickLogin();
    cy.wait(3000);
  });

  it.skip("Login with Empty Fields", () => {
    loginPage.enterEmail(userInfo[4].email);
    loginPage.enterPassword(userInfo[4].password);
    loginPage.clickLogin();
    cy.wait(3000);
  });

  it.skip("Show Password Functionality", () => {
    loginPage.enterPassword(userInfo[0].password);
    loginPage.showPassword();
    cy.wait(3000);
    loginPage.hidesPassword();
    cy.wait(3000);
  });
  it("Navigation to Sign Up Page", () => {
    cy.wait(3000);
    loginPage.navigateSignUp();
    cy.wait(3000);
  });
});
