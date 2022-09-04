const { FakeBrowser } = require('fakebrowser')
    , sleep = require('sleep-promise')
    , path = require('path')


!(async () => {
    const windowsDD = require('./node_modules/fakebrowser/device-hub-demo/Windows.json')
    const userDataDir = path.resolve(__dirname, './user/fakeBrowserUserData'+Math.random())

    FakeBrowser.globalConfig.internalHttpServerPort = 17311 + parseInt(Math.random() * 10000)

    const builder = new FakeBrowser.Builder()
        .deviceDescriptor(windowsDD)
        .displayUserActionLayer(true)
        .vanillaLaunchOptions({
          headless: false,
          executablePath: '/Users/stas/Work/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
          userDataDir
        })
        .userDataDir(userDataDir);

    const fakeBrowser = await builder.launch();

    const oldPage = await fakeBrowser.getActivePage()
    const page = await fakeBrowser.vanillaBrowser.newPage()
    await oldPage.close()

    global.userAction = fakeBrowser.userAction

    await page.goto('https://walmart.com')

    await page.goto('https://github.com')

    await sleep(15000)

    const button = await page.$('a[aria-label="Homepage"]');

    await userAction.simClickElement(button)

    await sleep(15000)

    const link = await page.$('a[href="/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"]');

    await userAction.simClickElement(link)

    await page.goto('https://prohetamine.ru')
})()
