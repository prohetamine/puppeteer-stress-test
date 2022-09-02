const { spawn } = require('child_process')
    , args = require('yargs/yargs')(process.argv.slice(2)).argv
    , path = require('path')

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

let i = 0
  , c = 0

setInterval(() => {
  i++
  c++
  const ls = spawn('node', [path.join(__dirname, 'puppeteer-instance.js')])

  ls.on('close', () => (i -= 1))

  const memoryData = process.memoryUsage()

  const memoryUsage = {
    rss: formatMemoryUsage(memoryData.rss),
    heapTotal: formatMemoryUsage(memoryData.heapTotal),
    heapUsed: formatMemoryUsage(memoryData.heapUsed),
    external: formatMemoryUsage(memoryData.external),
  }

  console.log(`#${c} instance: ${i} | memory: [rss ${memoryUsage.rss}] [heapTotal ${memoryUsage.heapTotal}] [heapUsed ${memoryUsage.heapUsed}] | [external ${memoryUsage.external}]`)

  if (i >= (args.maxIteration || 10)) {
    console.log('Max iteration')
    process.exit()
  }
}, args.speed || 10000)
