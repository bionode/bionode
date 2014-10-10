#!/usr/bin/env node
var bio = require('./')
var spawn = require('child_process').spawn

var module = process.argv[2]
var cli = spawn(__dirname + '/node_modules/bionode-' + module + '/cli.js', process.argv.slice(3))

cli.stdout.pipe(process.stdout)

cli.stderr.pipe(process.stderr)
