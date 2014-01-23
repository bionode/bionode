var lr = require('tiny-lr')
var gulp = require('gulp')
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')
var server = lr()
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')

gulp.task('build', function() {
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err)
    gutil.log('[build]', stats.toString({ colors: true }))
    gulp.src('./lib/bionode.js').pipe(livereload(server))
  })
})

gulp.task('watch', function () {
  server.listen(35729, function(err) {
    if (err) return console.log(err)
    gulp.watch('./lib/bionode.js', function() {
      gulp.run('build')
    })
  })
})
