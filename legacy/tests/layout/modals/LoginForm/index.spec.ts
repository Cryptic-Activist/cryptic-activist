import { test } from '@playwright/test';

test('Open login', async ({ page }) => {
	await page.goto('http://localhost:3000');

	const loginButton = await page.getByTestId('navbar-login-button');

	await loginButton.click();

	const loginForm = await page.getByTestId('login-form');
});

test('Fill out Login form', async ({ page }) => {
	await page.goto('http://localhost:3000');

	const usernameInput = await page.getByTestId('login-form-input-username');
	await usernameInput.fill('user-test');

	const passwordInput = await page.getByTestId('login-form-input-password');
	await passwordInput.fill('password123');
});
