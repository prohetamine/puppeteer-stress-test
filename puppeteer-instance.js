const puppeteer = require('puppeteer')

;(async () => {
  setTimeout(() => {
    process.exit()
  }, 120000)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://example.com')
})()
