import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object for Login functionality
 * Contains all methods related to login operations
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly USERNAME_INPUT = 'input[placeholder="Username"]';
  private readonly PASSWORD_INPUT = 'input[placeholder="Password"]';
  private readonly APP_NAME_DROPDOWN = '#appName';
  private readonly LOGIN_BUTTON = 'button[onclick="login()"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(baseUrl: string) {
    await this.goto(baseUrl, 'domcontentloaded');
    await this.wait(6000); // Extended wait for network stability and WebKit compatibility
  }

  /**
   * Fill username field
   */
  async enterUsername(username: string) {
    await this.fillInput(this.USERNAME_INPUT, username, 20000);
  }

  /**
   * Fill password field
   */
  async enterPassword(password: string) {
    await this.fillInput(this.PASSWORD_INPUT, password, 20000);
  }

  /**
   * Select application from dropdown
   */
  async selectApplication(appName: string) {
    await this.selectOption(this.APP_NAME_DROPDOWN, appName, 10000);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.click(this.LOGIN_BUTTON, 15000);
  }

  /**
   * Perform complete login flow
   */
  async login(baseUrl: string, username: string, password: string, appName: string) {
    await this.navigateToLoginPage(baseUrl);
    await this.enterUsername(username);
    await this.wait(500); // Small wait between actions
    await this.enterPassword(password);
    await this.wait(500); // Small wait between actions
    await this.selectApplication(appName);
    await this.wait(500); // Small wait before clicking login
    await this.clickLoginButton();
    await this.waitForPageLoad('domcontentloaded', 20000);
  }

  /**
   * Verify login was successful
   */
  async verifyLoginSuccess() {
    await this.verifyUrlMatches(/Banking-Project-Demo\.html/, 15000);
    await this.wait(1000); // Wait for page content to load
  }
}
