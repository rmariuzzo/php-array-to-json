'use strict'

const fs = require('fs-extra')
const path = require('path')

const lib = require('..')

describe('lib', () => {
  it('does conversion', () => {
    const input = path.resolve(__dirname, 'fixtures/a.php')
    const output = path.resolve(__dirname, 'fixtures/a.json')

    expect.assertions(1)

    return lib.convert(input)
      .then(() => {
        expect(fs.readJSONSync(output)).toMatchObject({ 'key-1': 'value-1' })
      })
      .catch(fail)
  })
})
