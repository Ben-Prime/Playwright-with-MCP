import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import * as config from '../config.json';
import * as transferTestData from '../test-data/Transfer_TestData.json';

test.describe('Banking Application Tests', () => {
  const BASE_URL = config.url;
  const USERNAME = config.username;
  const PASSWORD = config.password;
  const APP_NAME = config.appName;
  const TRANSFER_ACCOUNT = transferTestData.transferAccount;
  const TRANSACTION_AMOUNT = transferTestData.transactionAmount;
  const TRANSACTION_DESCRIPTION = transferTestData.transactionDescription;

  let loginPage: LoginPage;
  let homePage: HomePage;
  let quickTransactionPage: QuickTransactionPage;
  let transactionHistoryPage: TransactionHistoryPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    quickTransactionPage = new QuickTransactionPage(page);
    transactionHistoryPage = new TransactionHistoryPage(page);

    // Perform login
    await loginPage.login(BASE_URL, USERNAME, PASSWORD, APP_NAME);
    await loginPage.verifyLoginSuccess();
  });

  test('verify tab names in the homepage', async () => {
    await homePage.verifyHomePageLoadedSuccessfully();
    await homePage.verifyBankingTabsVisible();
  });

  test('Verify Quick Transactions Flow', async ({ page }) => {
    // Increase test timeout to 90 seconds for slower networks
    test.setTimeout(90000);

    // ===== VERIFY HOME PAGE ELEMENTS =====
    console.log('📋 Verifying home page elements...');
    await homePage.verifyHomePageElements();

    // ===== NAVIGATE TO QUICK TRANSACTIONS =====
    console.log('🔄 Navigating to Quick Transactions...');
    await homePage.navigateToQuickTransactions();

    // ===== FILL IN TRANSACTION DETAILS =====
    console.log('📝 Filling transaction details...');
    await quickTransactionPage.fillTransactionDetails(
      'Transfer',
      TRANSACTION_AMOUNT,
      TRANSACTION_DESCRIPTION,
      TRANSFER_ACCOUNT
    );

    // ===== SUBMIT AND CONFIRM TRANSACTION =====
    console.log('✅ Submitting and confirming transaction...');
    const transactionRef = await quickTransactionPage.completeTransaction(
      'Transfer',
      TRANSACTION_AMOUNT,
      TRANSACTION_DESCRIPTION,
      TRANSFER_ACCOUNT
    );

    console.log(`✓ Transaction Reference: ${transactionRef}`);

    // ===== NAVIGATE TO TRANSACTION HISTORY AND VERIFY =====
    console.log('📊 Navigating to Transaction History...');
    await homePage.navigateToTransactionHistory();

    console.log('🔍 Verifying transaction in history...');
    await transactionHistoryPage.verifyTransactionInHistory(
      TRANSFER_ACCOUNT,
      `-$${TRANSACTION_AMOUNT}.00`
    );

    console.log('✓ Test completed successfully!');
    console.log(`✓ Transaction ${transactionRef?.trim()} verified in history`);
  });
});


