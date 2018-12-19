
var auth = require('./auth');

var graphlargefile = require('./graphuploadlargefile');

// Get an access token for the app.
auth.getAccessToken().then(function (token) {

  //upload a small <4Mb file, by a single put request

  graphlargefile.uploadSmallTextFile(token);

  graphlargefile.uploadLargeFile(token);


}, function (error) {
  console.error('>>> Error getting access token: ' + error);
});
