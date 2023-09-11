
// npm dependencies
const { runErrorServer } = require('../node_modules/govuk-prototype-kit/lib/errorServer')
const { verboseLog } = require('../node_modules/govuk-prototype-kit/lib/utils/verboseLogger')

const config = require('../node_modules/govuk-prototype-kit/lib/config.js').getConfig(null, false)

try {
  // local dependencies
  const syncChanges = require('../node_modules/govuk-prototype-kit/lib/sync-changes')
  const server = require('./server.js')
  const { generateAssetsSync } = require('../node_modules/govuk-prototype-kit/lib/build')

  const port = config.port
  const proxyPort = port - 50

  generateAssetsSync()

  if (config.isTest) {
    server.listen()
  } else {
    console.log('The Prototype Kit is now running at:')
    console.log(`http://localhost:${port}`)
    console.log('')

    if (config.isProduction || !config.useBrowserSync) {
      server.listen(port)
    } else {
      server.listen(proxyPort, () => {
        syncChanges.sync({
          port,
          proxyPort,
          files: ['.tmp/public/**/*.*', 'app/views/**/*.*', 'app/assets/**/*.*', 'app/config.json']
        })
      })
    }
  }
} catch (e) {
  if (config.isDevelopment) {
    verboseLog('************************ STARTING ERROR SERVER ***************************')
    runErrorServer(e)
  } else {
    throw e
  }
}
