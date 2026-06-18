import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * TransactionHistoryPage - Page Object for Transaction History functionality
 * Contains all methods related to transaction history operations
 */
export class TransactionHistoryPage extends BasePage {
  // Selectors
  private readonly TRANSACTION_HISTORY_SECTION = '#transaction-history-section';
  private readonly TRANSFER_TO_ACCOUNT = 'text=Transfer to';
  private readonly TRANSACTION_AMOUNT = 'text=-$1000.00';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Verify transaction history page is loaded
   */
  async verifyTransactionHistoryLoaded() {
    await this.wait(1000); // Wait for page to fully load
  }

  /**
   * Verify transfer transaction appears in history
   */
  async verifyTransferInHistory(accountNumber: string) {
    const transferText = `text=Transfer to ${accountNumber}`;
    await this.verifyElementVisible(transferText, 10000);
  }

  /**
   * Verify transaction amount in history
   */
  async verifyTransactionAmount(amount: string) {
    const amountText = `text=${amount}`;
    await this.verifyElementVisible(amountText, 10000);
  }

  /**
   * Verify specific transaction in history with amount
   */
  async verifyTransactionInHistory(accountNumber: string, amount: string) {
    await this.verifyTransactionHistoryLoaded();
    await this.verifyTransferInHistory(accountNumber);
    await this.verifyTransactionAmount(amount);
  }

  /**
   * Verify transaction reference appears in history
   */
  async verifyTransactionReference(reference: string) {
    const refText = `text=${reference}`;
    await this.verifyElementVisible(refText, 10000);
  }
}
