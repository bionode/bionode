#!/usr/bin/env node
// USAGE:
// Set environment var GH_TOKEN
// node contributions-generate.js organization

var pumpify = require('pumpify')
var requestStream = require('requesturl-stream')
var ts = require('tool-stream')
var through = require('through2')
var request = require('request')

var excludedRepos = []

var contributorsUsernames = []
var contributorsCount = {}

var TOKEN = process.env.GH_TOKEN

var APIROOT = 'https://api.github.com/'
var organization = process.argv[2]
var membersURL = APIROOT + 'orgs/' + organization + '/teams'

var requestOptions = {
  json: true,
  headers: {
    'Authorization': 'token ' + TOKEN,
    'User-Agent': 'request'
  }
}

var createRepoURL = through.obj(function (repoName, enc, next) {
  if (excludedRepos.indexOf(repoName) >= 0) { return next() }
  this.push(APIROOT + `repos/${organization}/${repoName}/stats/contributors?per_page=100`)
  next()
})

var requestWithResponse = through.obj(function (repoURL, enc, next) {
  var options = requestOptions
  options.url = repoURL
  request(options, (err, res, json) => {
    if (err) { console.error(err) }
    if (json === undefined) { return next() }
    json.repo = res.request.uri.path.split('/')[3]
    this.push(json)
    next()
  })
})

var incrementContributors = through.obj(function (contributors, enc, next) {
  contributors.forEach((contributor) => {
    var user = contributor.author.login
    if (contributorsUsernames.indexOf(user) === -1) { return }
    var repo = contributors.repo
    if (contributorsCount[user] === undefined) { contributorsCount[user] = {} }
    contributorsCount[user][repo] = contributor.total
  })
  this.push(contributors)
  next()
})

var pipeline = pumpify.obj(
  requestStream(requestOptions),
  ts.arraySplit(),
  ts.extractProperty('name'),
  createRepoURL,
  requestWithResponse,
  incrementContributors
)

var options = requestOptions
options.url = APIROOT + `orgs/${organization}/members?per_page=100`
request(options, (err, res, json) => {
  if (err) { console.error(err) }
  json.forEach((user) => contributorsUsernames.push(user.login))
  pipeline.write(APIROOT + `orgs/${organization}/repos?per_page=100`)
})

process.on('exit', () => { 
  var total = {}

  // Count total contributions per user
  Object.keys(contributorsCount).forEach((user) => {
    if (total[user] === undefined) {total[user] = 0}
    Object.entries(contributorsCount[user]).forEach((entry) => {
      total[user] += entry[1]
    })
  })

  // Sort users by total contribution
  var users = Object.keys(total).sort(function(a,b){return total[b] - total[a]})

  // Print markdown
  console.log(`# Contributors commits per repository`)
  users.forEach((user) =>{
    console.log(`## contributions-${user}`)
    // Sort repos by total contribution
    var repos = Object.keys(contributorsCount[user]).sort(function(a,b){return contributorsCount[user][b] - contributorsCount[user][a]})
    repos.forEach((repo) => {
      console.log(`[${repo}: ${contributorsCount[user][repo]}](https://github.com/bionode/${repo}/commits?author=${user})  `)
    })
  })
})
