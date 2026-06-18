import { Page, expect } from '@playwright/test';

/**
 * BasePage - Contains common actions and methods for all pages
 * This class provides reusable functionality across all page objects
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded') {
    await this.page.goto(url, { waitUntil });
  }

  /**
   * Wait for timeout (in milliseconds)
   */
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Fill input field with text
   */
  async fillInput(selector: string, text: string, timeout = 15000) {
    const locator = this.page.locator(selector);
    await locator.click({ timeout });
    await this.wait(300);
    await locator.fill(text, { timeout });
  }

  /**
   * Click on an element
   */
  async click(selector: string, timeout = 10000) {
    await this.page.locator(selector).click({ timeout });
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector: string, value: string, timeout = 10000) {
    await this.page.locator(selector).selectOption([value], { timeout });
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string, timeout = 5000): Promise<string | null> {
    return await this.page.locator(selector).textContent({ timeout });
  }

  /**
   * Verify element is visible
   */
  async verifyElementVisible(selector: string, timeout = 5000) {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Verify page URL contains text
   */
  verifyUrlContains(text: string) {
    expect(this.page.url()).toContain(text);
  }

  /**
   * Verify page URL matches regex pattern
   */
  async verifyUrlMatches(pattern: RegExp, timeout = 10000) {
    await expect(this.page).toHaveURL(pattern, { timeout });
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded', timeout = 20000) {
    await this.page.waitForLoadState(state, { timeout }).catch(() => {
      // If load state times out, proceed anyway
      return Promise.resolve();
    });
  }

  /**
   * Execute JavaScript on the page
   */
  async executeScript(script: string) {
    return await this.page.evaluate(script);
  }

  /**
   * Click element using JavaScript (for elements that might be blocked by other elements)
   */
  async clickElementByJS(selector: string) {
    await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (element) {
        (element as HTMLElement).click();
      }
    }, selector);
  }

  /**
   * Click element by onclick attribute using JavaScript
   */
  async clickElementByOnclick(onclick: string) {
    await this.page.evaluate((onclickAttr) => {
      const btn = document.querySelector(`button[onclick="${onclickAttr}"]`);
      if (btn) {
        (btn as HTMLElement).click();
      }
    }, onclick);
  }

  /**
   * Get current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Verify text is present on page
   */
  async verifyTextPresent(text: string, timeout = 5000) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible({ timeout });
  }
}
