import { generateId } from "../support/generateId";
import { handleLogin } from "../support/utils";

describe('board experience with access/permissions', () => {
  beforeEach(() => {
    handleLogin('tester@gmail.com', 'tester_1234123')
  });

  it('user can create a new board', () => {
    cy.get('[data-testid="toggleCreateBoardModal"]').click();
    cy.get('[data-testid="createBoardName"]').type('Board_' + generateId(8));
    cy.get('[data-testid="accessType_public"]').click();
    cy.get('[data-testid="createBoardDescription"]').type('some test description');
    cy.get('[data-testid="CreateBoardModal_submit"]').click();
    
    cy.wait(3000);
    cy.get('[data-testid="boardHeader"]').click();

    cy.url().then((url) => {
      Cypress.env('boardUrl', url);
      console.log(url);
    });
  });

  it('user can create a new group + a ticket', () => {
    const boardUrl = Cypress.env('boardUrl');
    expect(boardUrl).to.exist;
    cy.visit(boardUrl);

    const groupName = 'Group_' + generateId(8);
    cy.get('[data-testid="createGroup_formShowBtn"]').click();
    cy.get('[data-testid="createGroup_formInput"]').type(groupName);
    cy.get('[data-testid="createGroup_formSubmitBtn"]').click();

    const ticketName = 'Ticket_' + generateId(8);
    cy.get(`[data-testid="createTicket_${groupName}_formShowBtn"]`).click();
    cy.get('[data-testid="createTicket_formInput"]').type(ticketName);
    cy.get('[data-testid="createTicket_formSubmitBtn"]').click();
  });




  
});

describe('board experience cross access/permissions', () => {
    it('owner creates a new private board', () => {
        handleLogin('tester@gmail.com', 'tester_1234123')
        cy.get('[data-testid="toggleCreateBoardModal"]').click();
        cy.get('[data-testid="createBoardName"]').type('Board_' + generateId(8));
        cy.get('[data-testid="accessType_private"]').click();
        cy.get('[data-testid="createBoardDescription"]').type('some test description');
        cy.get('[data-testid="CreateBoardModal_submit"]').click();
        
        cy.url().then((url) => {
            Cypress.env('boardUrl', url);
        });
      });

    it('uninvated user wants to access a private board', () => {
      handleLogin('user@gmail.com', 'tester_1234123');
      cy.wait(3000);

      const boardUrl = Cypress.env('boardUrl');
      expect(boardUrl).to.exist;
      cy.visit(boardUrl);

      cy.wait(3000);
      
      cy.get('[data-testid="ErrorPanel"]').click();
    });
  });