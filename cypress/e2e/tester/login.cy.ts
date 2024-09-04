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

  it("login with valid credentials", () => {
    loginPage.enterEmail(userInfo[4].email);
    loginPage.enterPassword(userInfo[4].password);
    loginPage.clickLogin();
  });
});
