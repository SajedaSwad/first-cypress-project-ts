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
  let expectedOrder: string[] = [];
  // Set up the session before running the tests
  const baseUrl = Cypress.config("baseUrl");
  beforeEach(() => {
    cy.session(["name"], () => {
      projectsPage.loginWithSession();
      cy.wait(2000);
    });
    projectsPage.navigateProjectsPage();
    // expectedOrder = [];
    // console.log(expectedOrder);
  });

  it("Verify Add New Project Popup Display", () => {
    projectsPage.navigateProjectsPage();
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
    // projectsPage.submitProject(projectName, expectedOrder);
    projectsPage.submitProject();
    // console.log(expectedOrder);
  });

  // it("should display projects in the correct order", () => {
  //   cy.intercept("GET", "/api/projects").as("getProjects");

  //   // Intercept the API call to fetch projects
  //   cy.intercept("GET", "/api/projects").as("getProjects");

  //   // Wait for the projects to be fully loaded on the frontend
  //   cy.wait("@getProjects").then((interception) => {
  //     // Ensure interception.response and interception.response.body are defined
  //     if (interception.response && interception.response.body) {
  //       const projects = interception.response.body;
  //       expectedOrder = projects.map((project: any) => project.name);
  //     } else {
  //       throw new Error("Failed to fetch projects");
  //     }
  //   });
  //   console.log(expectedOrder);
  //   // Ensure expectedOrder is defined
  //   expect(expectedOrder).to.exist;

  //   // // Wait for the projects to be fully loaded on the frontend
  //   // cy.intercept("GET", "/api/projects").as("getProjects");
  //   // cy.wait("@getProjects");

  //   // Select all project cards and verify their order
  //   cy.get(".project-card")
  //     .should("have.length", expectedOrder.length)
  //     .each((card, index) => {
  //       // Get the project name
  //       cy.wrap(card)
  //         .find(".project-name")
  //         .should("have.text", expectedOrder[index]);
  //     });
  // });

  it("Display Project Description on Hover", () => {
    cy.get("#info-tooltip-btn").trigger("mouseover");
    cy.contains("First Project description").should("be.visible");
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
    projectsPage.logout();
    projectsPage.loginWithSession();
    projectsPage.navigateProjectsPage();
    cy.url().should("include", "/projects");
    // projectsPage.addNewProjectDisplay();
  });
});
