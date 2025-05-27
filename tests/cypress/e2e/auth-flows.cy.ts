import { handleLogin } from "../support/utils";

describe('UX with login', () => {
  beforeEach(() => {
    handleLogin('tester@gmail.com', 'tester_1234123')
  });

  it('user can login', () => {
    cy.get('[data-testid="Navbar"]').click();
  });

  it('user can logout', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="AvatarDropdown"]').click();
    cy.get('[data-testid="manageUserLogOut"]').click();
  });

  it('user can access personal control page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="AvatarDropdown"]').click();
    cy.get('[data-testid="manageUser"]').click();
    cy.get('[data-testid="cancel"]').click();
  });
});

describe('UX without login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('recover password flow', () => {
    cy.get('[data-testid="recoverPassword"]').click();
    cy.get('[data-testid="email"]');
    cy.get('[data-testid="returnToLogin"]').click();
  });

  it('create account flow', () => {
    cy.get('[data-testid="noAccount"]').click();
    cy.get('[data-testid="email"]');
    cy.get('[data-testid="name"]');
    cy.get('[data-testid="password"]');
    cy.get('[data-testid="confirmPassword"]');
    cy.get('[data-testid="registerButton"]');
    cy.get('[data-testid="returnToLogin"]').click();
  });
  
  it('restore account flow', () => {
    cy.get('[data-testid="noAccount"]').click();
    cy.get('[data-testid="restoreAccount"]').click();
    cy.get('[data-testid="email"]');
    cy.get('[data-testid="returnToLogin"]').click();
  });
})