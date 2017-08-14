'use strict'

const fs = require('fs-extra')
const path = require('path')
const { parse } = require('php-array-parser')

const phpArrayToJson = {
  convert(file) {
    const dest = file.replace(/\.[^\.]+$/, '.json')
    return fs.readFile(file)
      .then((source) => source.toString())
      .then((contents) => extractReturningPhpArray(contents))
      .then((phpArray) => parse(phpArray))
      .then((obj) => fs.writeJSON(dest, obj))
  }
}

function extractReturningPhpArray(contents) {
  // Remove left part of return expression and any ending `?>`.
  const ret = contents.indexOf('return') + 'return'.length
  contents = contents.substr(ret)
  contents = contents.replace(/\?>\s*$/, '_')
  return contents
}

module.exports = phpArrayToJson
