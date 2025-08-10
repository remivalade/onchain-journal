from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the main heading to be visible
        expect(page.get_by_role("heading", name="On-Chain Journal")).to_be_visible()

        # Scroll to the bottom of the page
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait for the "Latest Mints" heading to be visible
        expect(page.get_by_role("heading", name="Latest Mints")).to_be_visible()

        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()
