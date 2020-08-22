/// <reference types="cypress" />

context("Pokedex", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it("Loads the table", () => {
        // Confirm the count
        cy.get(".pokemon-count")
            .should("have.text", "Total Pokemon: 151 Pokemon.");

        // Should not be able to page back
        cy.get(".pagination-toolbar svg.fa-arrow-up")
            .should("have.class", "disabled-button");

        // Should be be able to page forward
        cy.get(".pagination-toolbar svg.fa-arrow-down")
            .should("not.have.class", "disabled-button");

        // First row is correct
        cy.get("#root > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)")
            .should("have.text", "1");
        cy.get("#root > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)")
            .should("have.text", "Bulbasaur");
    });

    it("Can request pages", () => {
        // Go to the next page
        cy.get(".pagination-toolbar svg.fa-arrow-down")
            .should("not.have.class", "disabled-button")
            .click();

        // Confirm data updated
        cy.get("#root > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)")
            .should("have.text", "11");

        // Go to the previous page
        cy.get(".pagination-toolbar svg.fa-arrow-up")
            .should("not.have.class", "disabled-button")
            .click();

        // Confirm data updated
        cy.get("#root > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)")
            .should("have.text", "1");

    });

    it("Can toggle favorites", () => {
        // Charmander is #1!
        cy.get("#root > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(5) > svg")
            .should("have.class", "not-favorite")
            .click()
            .should("have.class", "favorite")
            .click()
            .should("have.class", "not-favorite");
    });
});
