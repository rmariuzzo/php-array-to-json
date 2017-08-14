#!/usr/bin/env node
'use strict'

const glob = require('glob')
const meow = require('meow')
const path = require('path')
const lib = require('.')

const cli = meow(`
  Usage
    $ php-array-to-json <file|pattern>
`)

if (cli.input.length === 0) {
  console.error('Missing: file or pattern.')
  cli.showHelp(1)
}

glob(cli.input[0] || '', (error, files) => {
  files.map((file) => {
    file = path.resolve(__dirname, file)
    lib.convert(file)
      .then(() => console.log(`Converted: ${file}.`))
      .catch((error) => console.error(`Error converting: ${file}.`, error))
  })
})
