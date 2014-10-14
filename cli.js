#!/usr/bin/env node
var bio = require('./')
var spawn = require('child_process').spawn

var component = process.argv[2]
var path = __dirname + '/node_modules/bionode-' + component + '/cli.js'
var args = process.argv.slice(3)
var cli = spawn(path, args)

cli.stdout.pipe(process.stdout)
cli.stderr.pipe(process.stderr)

if (!process.stdin.isTTY) { process.stdin.pipe(cli.stdin) }
else { cli.stdin.end() }
