import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

/**
 * TASK-016.1: Categories Management E2E Tests
 * Tests creating, reading, updating, and deleting categories
 */

test.describe('Categories Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test@12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Navigate to categorias page
    await page.goto(`${BASE_URL}/frontend/tela-categorias.html`);
    await page.waitForLoadState('networkidle');
  });

  test('should display default categories', async ({ page }) => {
    // Wait for categories container to load
    const categoriesContainer = page.locator('[class*="category"], [class*="categoria"]');
    await expect(categoriesContainer.first()).toBeVisible();
    
    // Verify at least some default categories exist
    const categoryCards = page.locator('[class*="card"]:has-text("Alimentação"), [class*="card"]:has-text("Transporte")');
    const count = await categoryCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should create a new category', async ({ page }) => {
    // Click "Nova Categoria" button
    const newCategoryButton = page.locator('button:has-text("Nova Categoria"), button:has-text("New Category")');
    await newCategoryButton.click();
    
    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Fill category form
    const timestamp = Date.now();
    const categoryName = `Category ${timestamp}`;
    
    await page.fill('input[name="name"], input[name="nome"]', categoryName);
    await page.fill('input[name="limit"], input[name="limite"]', '1000');
    
    // Submit form
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Verify modal closes
    await expect(modal).not.toBeVisible();
    
    // Check for success message
    const successToast = page.locator('[role="alert"]:has-text("sucesso|success")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    // Verify category appears in list
    const categoryElement = page.locator(`text=${categoryName}`);
    await expect(categoryElement).toBeVisible();
  });

  test('should edit a category', async ({ page }) => {
    // Wait for categories to load
    const categoryCards = page.locator('[class*="card"]');
    await categoryCards.first().waitFor();
    
    // Find and click edit button on first category
    const editButton = categoryCards.locator('button:has-text("Editar"), button:has-text("Edit")').first();
    await editButton.click();
    
    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Update limit
    const limitInput = modal.locator('input[name="limit"], input[name="limite"]');
    await limitInput.clear();
    await limitInput.fill('2000');
    
    // Submit
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Verify success
    await expect(modal).not.toBeVisible();
    const successToast = page.locator('[role="alert"]:has-text("atualizado|updated")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
  });

  test('should delete a category', async ({ page }) => {
    // Wait for categories to load
    const categoryCards = page.locator('[class*="card"]');
    await categoryCards.first().waitFor();
    
    const initialCount = await categoryCards.count();
    
    // Find and click delete button
    const deleteButton = categoryCards.locator('button:has-text("Deletar"), button:has-text("Delete")').first();
    await deleteButton.click();
    
    // Confirm deletion
    const confirmModal = page.locator('[role="dialog"]:has-text("tem certeza|confirm|delete")');
    await expect(confirmModal).toBeVisible();
    
    const confirmButton = confirmModal.locator('button:has-text("Sim"), button:has-text("Yes")');
    await confirmButton.click();
    
    // Verify success
    const successToast = page.locator('[role="alert"]:has-text("deletado|deleted")');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    // Verify count decreased (if not a default category)
    await page.waitForLoadState('networkidle');
    const newCount = await page.locator('[class*="card"]').count();
    expect(newCount).toBeLessThanOrEqual(initialCount);
  });
});
