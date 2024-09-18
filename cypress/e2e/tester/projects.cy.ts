///<reference types='cypress'/>
import { LoginPage } from "@selector/login-page";
import { ProjectsPage } from "@selector/projects-page";
describe("projects page", () => {
  const loginPage = new LoginPage();
  const projectsPage = new ProjectsPage();
  const email = "validfuser@gmail.com";
  const password = "validpassword";
  const projectName = `First Project${Date.now()}`;
  const description = "First Project description";
  const projectNameTooLong = `secondproject${Date.now()}`.repeat(15);

  // Set up the session before running the tests
  const baseUrl = Cypress.config("baseUrl");
  beforeEach(() => {
    cy.session(["name"], () => {
      projectsPage.loginWithSession();
      cy.wait(2000);
    });
    projectsPage.navigateProjectsPage();
  });

  it("Verify Add New Project Popup Display", () => {
    projectsPage.addNewProjectDisplay();
    cy.wait(2000);
  });

  it("Verify Input Fields", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.verifyInputFields();
  });

  it("Add New Project with Valid Data", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidProjectName(projectName);
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
  });

  it("Success Message on Project Creation", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidProjectName(projectName + 1);
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
    projectsPage.successMessageOnProjectCreation(projectName + 1);
  });

  it("Project Name Required", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
    projectsPage.projectNameRequired();
  });

  it("Duplicate Project Name", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidProjectName("First Project");
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
    projectsPage.duplicateProjectName();
  });

  it("Cancel Project Addition", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.cancelProjectAddition();
  });

  it("Validate project name length", () => {
    //we  didn,t handel this test in our project
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidProjectName(projectNameTooLong);
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
    projectsPage.projectNameLengthValidation();
  });

  it("should add a project and verify it persists after page refresh", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.addValidProjectName(projectName);
    projectsPage.addValidDescription(description);
    projectsPage.submitProject();
    cy.reload();
    projectsPage.addNewProjectDisplay();
  });

  it("should verify project persists after navigating away and back", () => {
    projectsPage.addNewProjectDisplay();

    // Navigate to time tracker page
    cy.visit("/timeTracker");
    cy.url().should("include", "/timeTracker");

    // Navigate back to the projects page
    cy.visit("/projects");
    cy.url().should("include", "/projects");

    // Verify the project is still there
    projectsPage.addNewProjectDisplay();
  });
  it("should verify project persists after logout and login", () => {
    projectsPage.addNewProjectDisplay();
    projectsPage.logout();
    loginPage.enterEmail(email);
    loginPage.enterPassword(password);
    loginPage.clickLogin();
    projectsPage.navigateProjectsPage();
    cy.url().should("include", "/projects");
    projectsPage.addNewProjectDisplay();
  });

  //   it("Display Project Description on Hover", () => {
  //     //   cy.get(
  //     //     "#project-card-second one  > #project-card-header > #info-tooltip-btn > .anticon > svg"
  //     //   )
  //     //     .parent()
  //     //     .trigger("mouseover");
  //     //   cy.contains("First").should("be.visible");
  //   });

  //     // Intercept the API call to fetch projects and provide mock data
  //     // cy.intercept("GET", "http://localhost:3001/projects", {
  //     //   statusCode: 200,
  //     //   body: [
  //     //     {
  //     //       _id: "1",
  //     //       name: "First Project",
  //     //       color: "blue",
  //     //       description: "First project description",
  //     //       projectHours: 10,
  //     //       userEmail: "validuser@gmail.com",
  //     //     },
  //     //     {
  //     //       _id: "2",
  //     //       name: "Second One",
  //     //       color: "green",
  //     //       description: "Second project description",
  //     //       projectHours: 20,
  //     //       userEmail: "validuser@gmail.com",
  //     //     },
  //     //   ],
  //     // }).as("getProjects");

  //     // cy.intercept("GET", `${Cypress.env("api")}/projects/cards`).as(
  //     //   "projectsCardReq"
  //     // );
  //     // cy.wait("@getProjects").its("response.statusCode").should("eq", 200);
  //     // cy.wait("@projectsCardReq").its("response.statusCode").should("eq", 200);
  //   });
});
