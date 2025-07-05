import { test, expect } from '@playwright/test'

test.beforeEach(async({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting', async ({ page }) => {
    const successButtton = page.locator('.bg-success')

    await successButtton.click()

    //const text = await successButtton.textContent()
    //await successButtton.waitFor({state: "attached"})
    const text = await successButtton.allTextContents()

    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButtton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async ({ page }) => {
    const successButtton = page.locator('.bg-success')

    //___ wait for element
    // await page.waitForSelector('.bg-success')

    //___ wait for a particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    //const text = await successButtton.allTextContents()
    //expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async ({ page }) => {
    
    // test.setTimeout(10000)
    // test.slow()
    const successButtton = page.locator('.bg-success')
    await successButtton.click()
})

