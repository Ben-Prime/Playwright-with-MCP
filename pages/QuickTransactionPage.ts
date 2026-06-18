import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * QuickTransactionPage - Page Object for Quick Transactions functionality
 * Contains all methods related to quick transaction operations
 */
export class QuickTransactionPage extends BasePage {
  // Selectors
  private readonly TRANSACTION_TYPE_DROPDOWN = '#transactionType';
  private readonly TRANSACTION_AMOUNT = '#transactionAmount';
  private readonly TRANSACTION_DESCRIPTION = 'input[placeholder="Transaction description"]';
  private readonly TRANSFER_ACCOUNT = 'input[placeholder="Enter account number"]';
  private readonly SUBMIT_BUTTON = 'button[onclick="validateAndShowTransactionConfirmation()"]';
  private readonly CONFIRMATION_SECTION = '#confirmation-section';
  private readonly SUCCESS_REFERENCE = '#successReference';
  private readonly SUCCESS_MESSAGE = 'text=Transaction Completed Successfully';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Select transaction type
   */
  async selectTransactionType(type: string) {
    await this.selectOption(this.TRANSACTION_TYPE_DROPDOWN, type, 10000);
  }

  /**
   * Enter transaction amount
   */
  async enterTransactionAmount(amount: string) {
    await this.fillInput(this.TRANSACTION_AMOUNT, amount, 10000);
  }

  /**
   * Enter transaction description
   */
  async enterTransactionDescription(description: string) {
    await this.fillInput(this.TRANSACTION_DESCRIPTION, description, 10000);
  }

  /**
   * Enter transfer to account number
   */
  async enterTransferAccount(accountNumber: string) {
    await this.fillInput(this.TRANSFER_ACCOUNT, accountNumber, 10000);
  }

  /**
   * Click submit button
   */
  async clickSubmitButton() {
    await this.verifyElementVisible(this.SUBMIT_BUTTON, 10000);
    await this.click(this.SUBMIT_BUTTON, 10000);
  }

  /**
   * Wait for confirmation section to appear
   */
  async waitForConfirmationSection() {
    await this.verifyElementVisible(this.CONFIRMATION_SECTION, 15000);
  }

  /**
   * Confirm transaction by clicking confirm button
   */
  async confirmTransaction() {
    await this.clickElementByOnclick('confirmAndProcessTransaction()');
    await this.wait(2000);
  }

  /**
   * Get transaction reference number
   */
  async getTransactionReference(): Promise<string | null> {
    await this.verifyElementVisible(this.SUCCESS_REFERENCE, 5000);
    return await this.getText(this.SUCCESS_REFERENCE, 5000);
  }

  /**
   * Verify success message
   */
  async verifySuccessMessage() {
    await this.verifyElementVisible(this.SUCCESS_MESSAGE, 5000);
  }

  /**
   * Fill all transaction details for Transfer
   */
  async fillTransactionDetails(
    type: string,
    amount: string,
    description: string,
    transferAccount: string
  ) {
    await this.selectTransactionType(type);
    await this.enterTransactionAmount(amount);
    await this.enterTransactionDescription(description);
    await this.enterTransferAccount(transferAccount);
  }

  /**
   * Complete full transaction flow (fill, submit, confirm)
   */
  async completeTransaction(
    type: string,
    amount: string,
    description: string,
    transferAccount: string
  ): Promise<string | null> {
    await this.fillTransactionDetails(type, amount, description, transferAccount);
    await this.clickSubmitButton();
    await this.waitForConfirmationSection();
    await this.confirmTransaction();
    await this.verifySuccessMessage();
    return await this.getTransactionReference();
  }
}
