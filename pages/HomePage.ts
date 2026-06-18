import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page Object for Home/Banking Application page
 * Contains all methods related to home page operations after successful login
 */
export class HomePage extends BasePage {
  // Selectors
  private readonly PAGE_HEADER = 'h1:has-text("Sample Banking Application")';
  private readonly WELCOME_TEXT = 'text=Welcome to the Testers Talk Banking Application';
  private readonly QUICK_TRANSACTIONS_LINK = 'a:text("Quick Transactions")';
  private readonly TRANSACTION_HISTORY_LINK = 'a:text("Transaction History")';
  private readonly TRANSFERS_TAB_NAME = 'Transfers';
  private readonly BILL_PAYMENTS_TAB_NAME = 'Bill Payments';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Verify page header is visible
   */
  async verifyPageHeader() {
    await this.verifyElementVisible(this.PAGE_HEADER, 5000);
  }

  /**
   * Verify welcome text is present
   */
  async verifyWelcomeText() {
    await this.verifyTextPresent('Welcome to the Testers Talk Banking Application', 5000);
  }

  /**
   * Verify home page elements are displayed
   */
  async verifyHomePageElements() {
    this.verifyUrlContains('Banking-Project-Demo.html');
    await this.verifyPageHeader();
    await this.verifyWelcomeText();
  }

  /**
   * Verify home page loaded successfully after login
   */
  async verifyHomePageLoadedSuccessfully() {
    await this.verifyHomePageElements();
  }

  /**
   * Verify the homepage banking tabs are visible
   */
  async verifyBankingTabsVisible() {
    await expect(this.page.getByRole('button', { name: this.TRANSFERS_TAB_NAME })).toBeVisible();
    await expect(this.page.getByRole('button', { name: this.BILL_PAYMENTS_TAB_NAME })).toBeVisible();
  }

  /**
   * Navigate to Quick Transactions
   */
  async navigateToQuickTransactions() {
    await this.click(this.QUICK_TRANSACTIONS_LINK, 10000);
    await this.wait(1500);
  }

  /**
   * Navigate to Transaction History
   */
  async navigateToTransactionHistory() {
    await this.clickElementByOnclick('viewTransactionHistory()');
    await this.wait(1500);
  }
}
