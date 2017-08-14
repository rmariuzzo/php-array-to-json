'use strict'

const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')

describe('cli', () => {
  const cli = path.resolve(__dirname, '../cli.js')
  const input = path.resolve(__dirname, 'fixtures/a.php')
  const output = path.resolve(__dirname, 'fixtures/a.json')

  it('does conversion', (done) => {
    exec(`${cli} ${input}`, (error, stdout, stderr) => {
      expect(error).toBeNull()
      expect(stderr).toBe('')
      expect(stdout).not.toBe('')
      done()
    })
  })

  it('validate required arguments', (done) => {
    exec(`${cli}`, (error, stdout, stderr) => {
      expect(error).not.toBeNull()
      expect(stderr).not.toBe('')
      expect(stdout).not.toBe('')
      done()
    })
  })
})
