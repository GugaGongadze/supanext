describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Logs in successfully", () => {
    cy.get("[data-cy=sign-in]").click();

    cy.get('[data-cy="email-input"]').type("gugongadze@gmail.com");
    cy.get('[data-cy="password-input"]').type("asdf1234");

    cy.get('[data-cy="sign-in-button"]').click();

    cy.url().should("include", "/protected");
  });

  it("Fails to log in", () => {
    cy.get("[data-cy=sign-in]").click();

    cy.get('[data-cy="email-input"]').type("gugongadze@gmail.com");
    cy.get('[data-cy="password-input"]').type("incorrect");

    cy.get('[data-cy="sign-in-button"]').click();

    cy.url().should("not.include", "/protected");
  });

  it("logs users out", () => {
    cy.get("[data-cy=sign-in]").click();

    cy.get('[data-cy="email-input"]').type("gugongadze@gmail.com");
    cy.get('[data-cy="password-input"]').type("asdf1234");

    cy.get('[data-cy="sign-in-button"]').click();

    cy.url().should("include", "/protected");

    cy.get("[data-cy=sign-out]").click();

    cy.url().should("include", "/sign-in");
  });
});
