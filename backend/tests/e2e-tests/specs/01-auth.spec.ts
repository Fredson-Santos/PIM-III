import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';
const API_URL = 'http://localhost:5000/api';

/**
 * TASK-016.1: Authentication E2E Tests
 * Tests login, cadastro, and JWT token flow
 */

test.describe('Authentication Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    // Navigate to cadastro page
    await page.goto(`${BASE_URL}/frontend/tela-cadastro.html`);
    
    // Check if page loaded
    await expect(page).toHaveTitle(/cadastro|signup/i);
    
    // Fill registration form
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'TestPass123!';
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message or redirect
    await page.waitForNavigation({ url: /login|dashboard/ });
    
    // Verify user was created (check localStorage for token or redirect)
    const token = await page.evaluate(() => localStorage.getItem('token'));
    if (!token) {
      // If not redirected directly, check for success message
      const successMessage = page.locator('[role="alert"]');
      await expect(successMessage).toContainText(/sucesso|success|registered/i);
    }
  });

  test('should login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    
    // Check if page loaded
    await expect(page).toHaveTitle(/login|entrar/i);
    
    // Use test credentials (created in previous test or seeded)
    const email = 'test@example.com';
    const password = 'Test@12345';
    
    // Fill login form
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForNavigation({ url: /dashboard/ });
    
    // Verify we're on dashboard
    await expect(page).toHaveURL(/dashboard/);
    
    // Check that JWT token is stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test@12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Click logout button
    const logoutButton = page.locator('button:has-text("Sair"), button:has-text("Logout")');
    await logoutButton.click();
    
    // Verify redirect to login
    await page.waitForNavigation({ url: /login/ });
    await expect(page).toHaveURL(/login/);
    
    // Check token is cleared
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
  });

  test('should reject invalid login credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    
    // Use invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message
    const errorMessage = page.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/invalid|error|incorrect/i);
    
    // Should not redirect
    await expect(page).toHaveURL(/login/);
  });
});
