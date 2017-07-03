var request = require('request');
var fs = require('fs');
var args = process.argv;

var GITHUB_USER = 'alexandrasophielevy'
var GITHUB_TOKEN = '6238442fe70fb4afdebb862ccf75e464416ffaa2'

var Owner = args[2]
var Name = args[3]

function getRepoContributors(repoOwner, repoName, cb) {
  var URL = 'https://'
  URL += GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors'
  var options = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    },
    url: URL
  }
  request(options, function(err, response, body) {
    var jsonBody = JSON.parse(body)
    cb(err, jsonBody)
  })
}

getRepoContributors(Owner, Name, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  for(var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, 'avatars/' + result[i].login + '.jpg')
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err) {
    throw err;
  })
  .on('response', function(response) {
    console.log('Response Status Message: ', response.statusMessage)
    console.log('Reponse Content Type: ', response.headers['content-type'])
  })
  .pipe(fs.createWriteStream(filePath));
}
