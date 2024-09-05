/// <reference types="cypress" />
import { LoginPage } from "@selector/login-page";

describe("login page", () => {
  const loginPage = new LoginPage();
  const userInfo = [
    { email: "validfuser@gmail.com", password: "validpassword" }, //valid credential
    { email: "invaliduser@gmail.com", password: "validpassword" }, //not found email
    { email: "invaliduser", password: "validpassword" }, //invalid format for email
    { email: "validfuser@gmail.com", password: "123" }, //incorrect password
    { email: " ", password: " " }, //empty fields??not work cause the cy,type not accept the empty data
  ];

  beforeEach(() => {
    cy.visit("/login");
  });

  it("login with valid credentials", () => {
    cy.intercept("POST", `${Cypress.env("api")}/signin`).as("loginReq"); //intercept the API call
    loginPage.enterEmail(userInfo[0].email);
    loginPage.enterPassword(userInfo[0].password);
    loginPage.clickLogin();
    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
    // Assert that the page contains the welcome message
    cy.contains("welcome back!").should("be.visible");
  });

  it("login with invalid email", () => {
    cy.intercept("POST", `${Cypress.env("api")}/signin`).as("invalidEmail");
    loginPage.enterEmail(userInfo[1].email);
    loginPage.enterPassword(userInfo[1].password);
    loginPage.clickLogin();
    cy.wait("@invalidEmail")
      .its("response.statusCode")
      .should("be.oneOf", [401, 400]);
    // Assert that the page contains the error message
    cy.contains("email/password combination is not valid").should("be.visible");
  });

  it("login with incorrect password", () => {
    cy.intercept("POST", `${Cypress.env("api")}/signin`).as(
      "incorrectPassword"
    );
    loginPage.enterEmail(userInfo[3].email);
    loginPage.enterPassword(userInfo[3].password);
    loginPage.clickLogin();
    cy.wait("@incorrectPassword")
      .its("response.statusCode")
      .should("be.oneOf", [401, 400]);
    // Assert that the page contains the error message
    cy.contains("email/password combination is not valid").should("be.visible");
  });

  it("Login with Empty Fields", () => {
    loginPage.enterEmail(userInfo[4].email);
    loginPage.enterPassword(userInfo[4].password);
    loginPage.clickLogin();

    // Check for validation messages for required fields
    cy.get("#email-input").then(($input) => {
      cy.wrap($input)
        .invoke("prop", "validationMessage")
        .should("eq", "Please fill out this field.");

      //     // Check for validation messages
      // loginPage.checkValidationMessage('#email-input', 'Please fill out this field.');
    });
  });

  it("Show Password Functionality", () => {
    loginPage.enterPassword(userInfo[0].password);
    loginPage.showPassword();
    loginPage.hidesPassword();
  });
  it("Navigation to Sign Up Page", () => {
    loginPage.navigateSignUp();
    // Verify that the URL is correct
    cy.url().should("include", "/signup");
  });
});
