export const handleLogin=(email: string, password: string) => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="loginButton"]').click();
}
  