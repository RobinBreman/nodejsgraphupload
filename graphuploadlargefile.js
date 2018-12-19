var request = require('request');
var fs = require('fs');
var async = require('async');
var Q = require('q');
var config = require('./config');

var graph = {};

// @name uploadLargeBinaryFile
// @desc uploads a large binary file with the Microsoft Graph.
graph.uploadSmallTextFile = function (token) {
  var deferred = Q.defer();
  var filenamedatepart = new Date().valueOf();

  request.put('https://graph.microsoft.com/v1.0/drives/'+config.driveID+'/root:/nodejsdemo' + filenamedatepart + '.txt:/content', {
    auth: {
      bearer: token
    },
    body: "dummy content"
  }, function (err, response, body) {
    var parsedBody = JSON.parse(body);

    if (err) {
      deferred.reject(err);
    } else if (parsedBody.error) {

      deferred.reject(parsedBody.error.message);
      console.log('>>> Application error: ' +parsedBody.error.message);

    } else {
      // Driveitem returned from the graph call.
      deferred.resolve(parsedBody.value);
      console.log(parsedBody)
    }
  });

  return deferred.promise;
};



// @name uploadLargeBinaryFile
// @desc uploads a large binary file with the Microsoft Graph.
graph.uploadLargeFile = function (token) {
  var deferred = Q.defer();


  request.post({
    url: 'https://graph.microsoft.com/v1.0/drives/'+config.driveID+'/root:/' + config.filename + ':/createUploadSession',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + token
    },
    body: '{"item": {"@microsoft.graph.conflictBehavior": "rename", "name": "' + config.filename+ '"}}',
  }, function (err, response, body) {

    if (err) {
      console.error('>>> Application error: ' + err);
    }

    uploadFile(JSON.parse(body).uploadUrl);
  });

  return deferred.promise;
};


uploadFile = function (uploadUrl) { // Here, it uploads the file by every chunk.
  async.eachSeries(getparams(), function (st, callback) {
    setTimeout(function () {
      fs.readFile("./" + config.filename, function read(e, f) {
        request.put({
          url: uploadUrl,
          headers: {
            'Content-Length': st.clen,
            'Content-Range': st.cr,
          },
          body: f.slice(st.bstart, st.bend + 1),
        }, function (er, re, body) {

          // Driveitem returned from the graph call.
          console.log(body);
        });
      });
      callback();
    }, st.stime);
  });
}

getparams = function () {
  var allsize = fs.statSync("./" + config.filename).size;
  var sep = allsize < (60 * 1024 * 1024) ? allsize : (60 * 1024 * 1024) - 1;
  var ar = [];
  for (var i = 0; i < allsize; i += sep) {
    var bstart = i;
    var bend = i + sep - 1 < allsize ? i + sep - 1 : allsize - 1;
    var cr = 'bytes ' + bstart + '-' + bend + '/' + allsize;
    var clen = bend != allsize - 1 ? sep : allsize - i;
    var stime = allsize < (60 * 1024 * 1024) ? 5000 : 10000;
    ar.push({
      bstart: bstart,
      bend: bend,
      cr: cr,
      clen: clen,
      stime: stime,
    });
  }
  return ar;
}


module.exports = graph;
