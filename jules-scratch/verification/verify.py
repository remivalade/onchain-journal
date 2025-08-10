from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for the component to be visible
            expect(page.locator('.latest-mints-container')).to_be_visible(timeout=30000)

            page.screenshot(path="jules-scratch/verification/initial_state.png")

            # Click the button
            button = page.locator('text="discover the latest mints"')
            expect(button).to_be_visible()
            button.click()

            # Wait for the gallery to be visible
            expect(page.locator('.latest-mints-gallery')).to_be_visible()

            page.screenshot(path="jules-scratch/verification/open_state.png")

            # Hover over the first mint item
            mint_item = page.locator('.mint-item').first
            mint_item.hover()

            # Wait for the transition to complete
            page.wait_for_timeout(500)

            page.screenshot(path="jules-scratch/verification/hover_state.png")
        finally:
            browser.close()

run()
