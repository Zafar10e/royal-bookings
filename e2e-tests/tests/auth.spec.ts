import { test, expect } from '@playwright/test'

const UI_URL = 'http://localhost:5173'

test('should allow user to sign in', async ({ page }) => {

 await page.goto(UI_URL)

 //get the sign in button
 await page.getByRole('link', { name: 'Sign-in' }).click()

 await expect(page.getByRole('heading', { name: 'Sign-in' })).toBeVisible()

 await page.locator('[name=email]').fill('a@ali.com')
 await page.locator('[name=password]').fill('ali123')

 await page.getByRole('button', { name: 'Login' }).click()

 expect(page.getByText('Sign in successful!'))
 await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
 await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
 await expect(page.getByRole('button', { name: 'Sign-out' })).toBeVisible()
})


test('should allow user to register', async ({ page }) => {
 const testEmail = `testEmail_${Math.floor(Math.random() * 90000) + 10000}@ali.com`


 await
  page.goto(UI_URL)

 await page.getByRole('link', { name: 'Sign-in' }).click()
 await page.getByRole('link', { name: 'Create an account here!' }).click()
 await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()


 await page.locator('[name=firstName]').fill('ali')
 await page.locator('[name=lastName]').fill('ali')
 await page.locator('[name=email]').fill(testEmail)
 await page.locator('[name=password]').fill('ali123')
 await page.locator('[name=confirmPassword]').fill('ali123')

 await page.getByRole('button', { name: 'Create Account' }).click()

 expect(page.getByText('Registration Successful!')).toBeVisible()
 await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible()
 await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible()
 await expect(page.getByRole('button', { name: 'Sign-out' })).toBeVisible()
})