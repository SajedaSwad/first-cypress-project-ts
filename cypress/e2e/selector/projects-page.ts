/// <reference types = "cypress"/>
import { LoginPage } from "@selector/login-page";
export class ProjectsPage {
  loginPage = new LoginPage();
  email = "validfuser@gmail.com";
  password = "validpassword";
  ////aded helper
  newProjectId = "#new-project-btn > .ant-btn";
  inputFieldsId = [
    "#project-form-name-input",
    "#project-form-description-input",
  ];
  colorPickerId = "#project-form-color-input";
  submitProjectId = "#project-form-submit-btn";
  closeSymbol = ".ant-modal-close";
  cancelForm = "#project-form-cancel-btn";
  baseUrl = Cypress.config("baseUrl");
  loginWithSession() {
    if (!this.baseUrl) {
      throw new Error("Base URL is not defined");
    }
    cy.visit(this.baseUrl);
    cy.visit("/login");
    this.loginPage.enterEmail(this.email);
    this.loginPage.enterPassword(this.password);
    this.loginPage.clickLogin();
  }
  navigateProjectsPage() {
    cy.visit("http://localhost:3000/projects");
  }
  addNewProjectDisplay() {
    cy.get(this.newProjectId).click();
    cy.contains("Create a New Project").should("be.visible");
  }
  verifyInputFields() {
    this.inputFieldsId.forEach((selector) => {
      // Check if the input field is visible
      cy.get(selector).should("be.visible");

      // Check if the input field is editable
      cy.get(selector).should("not.be.disabled");
    });
    cy.get(this.colorPickerId).should("be.visible");
  }
  addValidProjectName(projectName: string) {
    cy.get(this.inputFieldsId[0])
      .type(projectName)
      .should("have.value", projectName);
  }
  addValidDescription(description: string) {
    cy.get(this.inputFieldsId[1])
      .type(description)
      .should("have.value", description);
  }
  // submitProject(projectName: string, expectedOrder: string[]) {
  submitProject() {
    cy.get(this.submitProjectId).click();
    // expectedOrder.push(projectName);
  }
  successMessageOnProjectCreation(projectName: string) {
    cy.contains(`Project "${projectName}" was created`).should("be.visible");
  }
  projectNameRequired() {
    // Check for validation messages for required fields
    cy.get(this.inputFieldsId[0]).then(($input) => {
      cy.wrap($input)
        .invoke("prop", "validationMessage")
        .should("eq", "Please fill in this field.");
    });
  }
  duplicateProjectName() {
    cy.contains("Project name already exists").should("be.visible");
  }
  cancelProjectAddition() {
    //test tow way
    cy.get(this.closeSymbol).click();
    // cy.get(this.cancelForm).click();
  }
  projectNameLengthValidation() {
    cy.contains("Project name must be at most 50 characters long").should(
      "be.visible"
    );
  }
  logout() {
    cy.get("#logout-button").click();
    cy.url().should("include", "/login");
  }
}
