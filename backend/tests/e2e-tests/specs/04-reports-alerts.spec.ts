import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

/**
 * TASK-016.1: Reports & Alerts E2E Tests
 * Tests dashboard KPIs, reports, and alert functionality
 */

test.describe('Reports & Alerts', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${BASE_URL}/frontend/tela-login.html`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'Test@12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  });

  test('should display dashboard KPIs', async ({ page }) => {
    // Navigate to dashboard
    await page.goto(`${BASE_URL}/frontend/tela-dashboard.html`);
    await page.waitForLoadState('networkidle');
    
    // Check for KPI cards
    const totalCard = page.locator('[class*="kpi"], [class*="card"]').locator('text=/Total|total/i').first();
    const balanceCard = page.locator('[class*="kpi"], [class*="card"]').locator('text=/Saldo|balance/i').first();
    const biggestCard = page.locator('[class*="kpi"], [class*="card"]').locator('text=/Maior|Biggest|highest/i').first();
    
    // At least one KPI should be visible
    const anyKpi = totalCard.or(balanceCard).or(biggestCard);
    await expect(anyKpi).toBeVisible();
    
    // Check that values are numbers (not loading state)
    const kpiValue = page.locator('[class*="value"], [class*="amount"]').first();
    await expect(kpiValue).toContainText(/[0-9]/);
  });

  test('should navigate to reports page and display data', async ({ page }) => {
    // Navigate to relatórios page
    await page.goto(`${BASE_URL}/frontend/tela-relatorios.html`);
    await page.waitForLoadState('networkidle');
    
    // Check page title
    const pageTitle = page.locator('h1, h2');
    await expect(pageTitle).toContainText(/Relatório|Report/i);
    
    // Check for report elements (KPI cards, filters, etc)
    const reportElements = page.locator('[class*="report"], [class*="card"]');
    const count = await reportElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter reports by period', async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend/tela-relatorios.html`);
    await page.waitForLoadState('networkidle');
    
    // Look for date filters
    const startDateInput = page.locator('input[name="startDate"], input[name="data-inicio"]');
    const endDateInput = page.locator('input[name="endDate"], input[name="data-fim"]');
    
    if (await startDateInput.isVisible() && await endDateInput.isVisible()) {
      // Set date range (last 30 days)
      const today = new Date();
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      await startDateInput.fill(thirtyDaysAgo.toISOString().split('T')[0]);
      await endDateInput.fill(today.toISOString().split('T')[0]);
      
      // Wait for data to update
      await page.waitForLoadState('networkidle');
      
      // Check that report updated
      const reportData = page.locator('[class*="report"], [class*="data"]');
      await expect(reportData.first()).toBeVisible();
    }
  });

  test('should display alerts page', async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend/tela-alertas.html`);
    await page.waitForLoadState('networkidle');
    
    // Check page title
    const pageTitle = page.locator('h1, h2');
    await expect(pageTitle).toContainText(/Alerta|Alert/i);
    
    // Alerts container should exist (may be empty)
    const alertsContainer = page.locator('[class*="alerts"], [class*="list"]');
    await expect(alertsContainer).toBeVisible();
  });

  test('should mark alert as read', async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend/tela-alertas.html`);
    await page.waitForLoadState('networkidle');
    
    // Look for unread alerts
    const alertItems = page.locator('[class*="alert-item"], [class*="card"]');
    const count = await alertItems.count();
    
    if (count > 0) {
      // Find mark as read button on first alert
      const markReadButton = alertItems.first().locator('button:has-text("Lido"), button:has-text("Mark Read")');
      
      if (await markReadButton.isVisible()) {
        await markReadButton.click();
        
        // Check for success message
        const successToast = page.locator('[role="alert"]:has-text("atualizado|updated|lido|read")');
        await expect(successToast).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should display insights recommendations', async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend/tela-insights.html`);
    await page.waitForLoadState('networkidle');
    
    // Check page title
    const pageTitle = page.locator('h1, h2');
    await expect(pageTitle).toContainText(/Insight|Recomendação|Economia/i);
    
    // Check for insight cards
    const insightCards = page.locator('[class*="insight"], [class*="card"]');
    await expect(insightCards.first()).toBeVisible();
  });
});
