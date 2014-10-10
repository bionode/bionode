var fs = require('fs')
var glob = require('glob')
var jsdom = require('jsdom')
var async = require('async')

var jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')
var list = '<ul>'
var template = ''

glob("node_modules/bionode-*/**/docs/*.html", null, function(err, files) {
  async.each(files, processFile, done)
  function processFile(file, cb) {
    if (file.split('/').length > 5) { return cb() }
    var html = fs.readFileSync(file, 'utf8')
    jsdom.env({html: html, src: [jquery], done: function(err, window) {
      window.$('.sections').each(function() {
        window.$(this).find('.content').remove()
        list += window.$(this).html()
      })
      if (template === '') {
        window.$('.sections').remove()
        template = '<html><head>' + window.$('head').html() + '</head>'
      }
      cb()
    }})
  }
  function done() {
    list += '</ul>'
    console.log(template + '<body><div id="container">' + list + '</div></body></html>')
  }
})
