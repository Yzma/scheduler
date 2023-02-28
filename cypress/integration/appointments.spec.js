describe("Appointment", () => {
  it("should book an interview", () => {
    cy.visit("/");
    cy.contains("Monday")
  });

  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});