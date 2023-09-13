const fs = require('fs')
const path = require('path')
var relativePath = path.resolve(__dirname, '../node_modules')
var relativeTargetPath = path.resolve(__dirname, './frontend/node_modules')

if (!fs.existsSync(relativeTargetPath)) {
    fs.symlinkSync(relativePath, relativeTargetPath, 'dir')
}
