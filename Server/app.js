var express = require('express');
var app = express();
var request = require('request');
var qs = require('querystring');
var conf = require('config.json');


var CONSUMER_KEY = '7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt';
var CONSUMER_SECRET ='FhnZWUbVtn2b4G9XgD3MuptCke14vn0wD1zfqGqG';
var req_token_uri ='https://secure.splitwise.com/api/v3.0/get_request_token';
var access_token_uri ='https://secure.splitwise.com/api/v3.0/get_access_token';
var auth_uri = 'https://secure.splitwise.com/authorize';
var callback_def = 'http://localhost:9000/#/returnPage/';
var groups_url = "https://secure.splitwise.com/api/v3.0/get_groups"

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var standardRes = { value: {msg: 'test', rest:'some'}};
var dummy = {test:'test'};
var result = {};
var errorObj = { 'status' : 'error', 'message': 'generic'};

app.get('/callBack', function (req, res) {
  console.log('got the callback response' + res.query);
  
});

app.get('/init', function (req, res) {
    res.header('Content-type','application/json');
    res.header('Charset','utf8');
    var oauth =
        { callback: callback_def
        , consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        }
    , url = req_token_uri
    ;
    request.post({url:url, oauth:oauth}, function (error, response, body) {
    console.log('body init' + body);
    if(error)
    {
        console.log('Error happen' + error);
        errorObj.message = error.toString(); 
        result = errorObj;
    }
    else
    {
        var req_data = qs.parse(body);
        var oauth_token = req_data.oauth_token,
        oauth_secret = req_data.oauth_token_secret;
        result = {};
        result =  { 'body' : body, 'oauth_token' : oauth_token, 'oauth_secret' : oauth_secret };
    }
    res.jsonp(result);
                res.end();
    });
    
    console.log('got a response-- %s', result.oauth_secret);
  
});

app.get('/accesstoken', function (req, res) {
    
  res.header('Content-type','application/json');
  res.header('Charset','utf8');
  console.log(" request query : " + req.query.oauth_verifier); 
  var auth_token = req.query.oauth_token;
  var auth_secret = req.query.oauth_verifier;
  //console.log("at: " + auth_token + " as: " + auth_secret);

  var oauth =
    { callback: callback_def
    , consumer_key: CONSUMER_KEY
    , token: auth_token
    , verifier: auth_secret 
    };

  request.post({url:access_token_uri, oauth:oauth}, function (error, response, body) {
     console.log('body get access token. ' + body);
  if(error)
  {
    console.log("error: " + error);
  }
    result = {};
    result.body = body.toString();
    result.error = "error while retrieving data.";
    res.jsonp(result);
    res.end();
  });
  
});




// -------------------------------//
// server part.                   //
// -------------------------------//
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
  //console.log('default message is: ' + standardRes.value.rest);
});