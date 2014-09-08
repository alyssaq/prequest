'use strict';

var Promise = require('bluebird');
var request = require('request');

function prequest(url, options) {
  options = options || {};
  if (typeof url === 'string') {
    options.url = url;
  } else {
    options = url;
  }
  options.json = options.hasOwnProperty('json') ? options.json : true;

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else if (response.statusCode >= 400) {
        reject(response);
      } else if (options.arrayResponse) {
        resolve([response, body]);
      } else {
        resolve(body);
      }
    });
  });
}

module.exports = prequest;