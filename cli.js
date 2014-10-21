#!/usr/bin/env node
var bio = require('./')
var argv = require('minimist')(process.argv.slice(2))
var spawn = require('child_process').spawn

var component = argv._[0]
var path = __dirname + '/node_modules/bionode-' + component + '/cli.js'
var args = process.argv.slice(3)
var cli = spawn(path, args)

cli.stdout.pipe(process.stdout)
cli.stderr.pipe(process.stderr)

if (argv._[argv._.length - 1] === '-') {
  process.stdin.pipe(cli.stdin)
} else {
  cli.stdin.end()
}
