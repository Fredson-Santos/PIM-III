import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

/**
 * TASK-016.2: Complete User Flow E2E Test
 * Full journey: Register → Setup Categories → Add Expenses → View Reports → Receive Alerts
 */

test.describe('Complete User Journey', () => {
  let newUserEmail: string;
  let newUserPassword: string;

  test.beforeAll(() => {
    // Generate unique credentials
    const timestamp = Date.now();
    newUserEmail = `newuser${timestamp}@example.com`;
    newUserPassword = 'NewUser@12345';
  });

  test('should complete full user journey', async ({ page }) => {
    // Step 1: Register new user
    console.log('Step 1: Registering new user...');
    await page.goto(`${BASE_URL}/frontend/tela-cadastro.html`);
    
    await page.fill('input[name="email"]', newUserEmail);
    await page.fill('input[name="password"]', newUserPassword);
    await page.fill('input[name="confirmPassword"]', newUserPassword);
    
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ timeout: 10000 });
    
    // Verify registration (may redirect to login or dashboard)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/login|dashboard/);
    
    // Step 2: Login with new account
    console.log('Step 2: Logging in...');
    if (currentUrl.includes('login')) {
      await page.fill('input[type="email"]', newUserEmail);
      await page.fill('input[type="password"]', newUserPassword);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
    }
    
    // Step 3: Verify dashboard loads
    console.log('Step 3: Verifying dashboard...');
    await expect(page).toHaveURL(/dashboard/);
    const dashboardTitle = page.locator('h1, h2');
    await expect(dashboardTitle).toContainText(/Dashboard|Bem-vindo|Welcome/i);
    
    // Step 4: Create some categories
    console.log('Step 4: Creating categories...');
    await page.goto(`${BASE_URL}/frontend/tela-categorias.html`);
    await page.waitForLoadState('networkidle');
    
    const categories = ['Alimentação', 'Transporte', 'Entretenimento'];
    for (const category of categories) {
      const newCategoryBtn = page.locator('button:has-text("Nova Categoria")');
      await newCategoryBtn.click();
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      
      await page.fill('input[name="name"], input[name="nome"]', category);
      await page.fill('input[name="limit"], input[name="limite"]', '500');
      
      const submitBtn = modal.locator('button[type="submit"]');
      await submitBtn.click();
      
      // Wait for modal to close
      await expect(modal).not.toBeVisible({ timeout: 5000 });
      
      // Small delay between creations
      await page.waitForTimeout(500);
    }
    
    // Step 5: Add expenses
    console.log('Step 5: Adding expenses...');
    await page.goto(`${BASE_URL}/frontend/tela-gastos.html`);
    await page.waitForLoadState('networkidle');
    
    const expenses = [
      { amount: '50.00', description: 'Café da manhã', category: 'alimentacao' },
      { amount: '25.50', description: 'Uber para trabalho', category: 'transporte' },
      { amount: '150.00', description: 'Cinema', category: 'entretenimento' },
    ];
    
    for (const expense of expenses) {
      const newExpenseBtn = page.locator('button:has-text("Novo Gasto")');
      await newExpenseBtn.click();
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      
      await page.fill('input[name="amount"], input[name="valor"]', expense.amount);
      await page.fill('input[name="description"], input[name="descricao"]', expense.description);
      
      const categorySelect = modal.locator('select[name="category"], select[name="categoria"]');
      const categoryOptions = await categorySelect.locator('option').allTextContents();
      // Find matching category
      const categoryValue = categoryOptions.find(opt => opt.toLowerCase().includes(expense.category))
        || categoryOptions[1]; // fallback to second option
      
      if (categoryValue) {
        await categorySelect.selectOption({ label: categoryValue });
      }
      
      const dateInput = modal.locator('input[type="date"]');
      const today = new Date().toISOString().split('T')[0];
      await dateInput.fill(today);
      
      const submitBtn = modal.locator('button[type="submit"]');
      await submitBtn.click();
      
      await expect(modal).not.toBeVisible({ timeout: 5000 });
      await page.waitForTimeout(500);
    }
    
    // Verify expenses appear in table
    const table = page.locator('table, [role="table"]');
    await expect(table.locator('text=Café')).toBeVisible();
    await expect(table.locator('text=Uber')).toBeVisible();
    
    // Step 6: View dashboard with data
    console.log('Step 6: Viewing updated dashboard...');
    await page.goto(`${BASE_URL}/frontend/tela-dashboard.html`);
    await page.waitForLoadState('networkidle');
    
    // Check that KPI values are updated
    const kpiValue = page.locator('[class*="value"], [class*="amount"]').first();
    const valueText = await kpiValue.textContent();
    expect(valueText).not.toMatch(/loading|carregando/i);
    expect(valueText).toMatch(/[0-9]/);
    
    // Step 7: View reports
    console.log('Step 7: Viewing reports...');
    await page.goto(`${BASE_URL}/frontend/tela-relatorios.html`);
    await page.waitForLoadState('networkidle');
    
    // Verify report displays expense data
    const reportTitle = page.locator('h1, h2');
    await expect(reportTitle).toContainText(/Relatório|Report/i);
    
    // Step 8: Check alerts
    console.log('Step 8: Checking alerts...');
    await page.goto(`${BASE_URL}/frontend/tela-alertas.html`);
    await page.waitForLoadState('networkidle');
    
    // Alerts container should exist
    const alertsContainer = page.locator('[class*="alerts"], [class*="list"]');
    await expect(alertsContainer).toBeVisible();
    
    console.log('✅ Complete user journey test passed!');
  });

  test('should handle multi-step transaction editing', async ({ page }) => {
    // Login with test account
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test@12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Navigate to expenses
    await page.goto(`${BASE_URL}/frontend/tela-gastos.html`);
    await page.waitForLoadState('networkidle');
    
    // Create expense
    const newExpenseBtn = page.locator('button:has-text("Novo Gasto")');
    await newExpenseBtn.click();
    
    const modal = page.locator('[role="dialog"]');
    await page.fill('input[name="amount"], input[name="valor"]', '100.00');
    await page.fill('input[name="description"], input[name="descricao"]', 'Test Expense');
    
    const submitBtn = modal.locator('button[type="submit"]');
    await submitBtn.click();
    
    await expect(modal).not.toBeVisible();
    
    // Edit it
    const table = page.locator('table, [role="table"]');
    const editBtn = table.locator('button:has-text("Editar")').first();
    await editBtn.click();
    
    await expect(modal).toBeVisible();
    
    // Change amount
    const amountInput = modal.locator('input[name="amount"], input[name="valor"]');
    await amountInput.clear();
    await amountInput.fill('200.00');
    
    const submitBtn2 = modal.locator('button[type="submit"]');
    await submitBtn2.click();
    
    // Verify updated
    await expect(modal).not.toBeVisible();
    const successMsg = page.locator('[role="alert"]');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });
});
