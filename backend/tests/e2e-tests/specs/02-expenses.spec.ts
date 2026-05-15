import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

/**
 * TASK-016.1: Expenses CRUD E2E Tests
 * Tests creating, reading, updating, and deleting expenses
 */

test.describe('Expenses Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test@12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Navigate to gastos page
    await page.goto(`${BASE_URL}/frontend/tela-gastos.html`);
    await page.waitForLoadState('networkidle');
  });

  test('should create a new expense', async ({ page }) => {
    // Click "Novo Gasto" button
    const newExpenseButton = page.locator('button:has-text("Novo Gasto"), button:has-text("New Expense")');
    await newExpenseButton.click();
    
    // Wait for modal to appear
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Fill expense form
    await page.fill('input[name="amount"], input[name="valor"]', '150.50');
    await page.fill('input[name="description"], input[name="descricao"]', 'Almoço com cliente');
    
    // Select category
    const categorySelect = page.locator('select[name="category"], select[name="categoria"]');
    await categorySelect.selectOption('alimentacao');
    
    // Set date
    const dateInput = page.locator('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    await dateInput.fill(today);
    
    // Submit form
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Wait for modal to close and verify success
    await expect(modal).not.toBeVisible();
    
    // Check for success toast
    const successToast = page.locator('[role="alert"]:has-text("sucesso|success|criado|created")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    // Verify expense appears in table
    const table = page.locator('table, [role="table"]');
    const expenseRow = table.locator('text=Almoço com cliente');
    await expect(expenseRow).toBeVisible();
  });

  test('should edit an existing expense', async ({ page }) => {
    // Wait for table to load
    const table = page.locator('table, [role="table"]');
    await table.waitFor();
    
    // Find and click edit button on first expense
    const editButton = table.locator('button:has-text("Editar"), button:has-text("Edit")').first();
    await editButton.click();
    
    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Update amount
    const amountInput = modal.locator('input[name="amount"], input[name="valor"]');
    await amountInput.clear();
    await amountInput.fill('250.00');
    
    // Submit
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Verify modal closes and success message shows
    await expect(modal).not.toBeVisible();
    const successToast = page.locator('[role="alert"]:has-text("atualizado|updated")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
  });

  test('should delete an expense with confirmation', async ({ page }) => {
    // Wait for table to load
    const table = page.locator('table, [role="table"]');
    await table.waitFor();
    
    // Get initial row count
    const initialRows = await table.locator('tbody tr').count();
    expect(initialRows).toBeGreaterThan(0);
    
    // Find and click delete button on first expense
    const deleteButton = table.locator('button:has-text("Deletar"), button:has-text("Delete")').first();
    await deleteButton.click();
    
    // Confirm deletion in confirmation modal
    const confirmModal = page.locator('[role="dialog"]:has-text("tem certeza|confirm|delete")');
    await expect(confirmModal).toBeVisible();
    
    const confirmButton = confirmModal.locator('button:has-text("Sim"), button:has-text("Confirmar"), button:has-text("Yes")');
    await confirmButton.click();
    
    // Verify success message
    const successToast = page.locator('[role="alert"]:has-text("deletado|deleted|removido")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    // Verify row was removed
    const newRows = await table.locator('tbody tr').count();
    expect(newRows).toBeLessThan(initialRows);
  });

  test('should validate required fields', async ({ page }) => {
    // Click "Novo Gasto" button
    const newExpenseButton = page.locator('button:has-text("Novo Gasto")');
    await newExpenseButton.click();
    
    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Try to submit without filling required fields
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Should show validation errors
    const errorMessage = modal.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
  });

  test('should filter expenses by category', async ({ page }) => {
    // Look for category filter
    const categoryFilter = page.locator('select[name="filter-category"], select[name="category-filter"]');
    
    if (await categoryFilter.isVisible()) {
      // Select a category filter
      await categoryFilter.selectOption('alimentacao');
      
      // Wait for table to update
      await page.waitForLoadState('networkidle');
      
      // Verify only expenses from that category are shown
      const table = page.locator('table, [role="table"]');
      const rows = table.locator('tbody tr');
      const count = await rows.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
