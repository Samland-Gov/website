const fs = require('fs')
const path = require('path')

function makeSymlink(source, target) {
    var relativePath = path.resolve(__dirname, source)
    var relativeTargetPath = path.resolve(__dirname, target)

    if (!fs.existsSync(relativeTargetPath)) {
        fs.symlinkSync(relativePath, relativeTargetPath, 'dir')
    }
}

makeSymlink('../node_modules', './frontend/node_modules')
makeSymlink('../docs', '../content/government/organisations/department-for-digital/developers/services/website')
