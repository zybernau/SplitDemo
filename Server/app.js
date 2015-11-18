var express = require('express');
var app = express();
var request = require('request');
var qs = require('querystring');

var CONSUMER_KEY = '7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt';
var CONSUMER_SECRET ='FhnZWUbVtn2b4G9XgD3MuptCke14vn0wD1zfqGqG';
var req_token_uri ='https://secure.splitwise.com/api/v3.0/get_request_token';
var access_token_uri ='https://secure.splitwise.com/api/v3.0/get_access_token';
var auth_uri = 'https://secure.splitwise.com/authorize';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var standardRes = { value: {msg: 'test', rest:'some'}};
var dummy = {test:'test'};
app.get('/callBack', function (req, res) {
  console.log('got the callback response' + res);
});

app.get('/sample', function (req, res) {
  res.header('Content-type','application/json');
  res.header('Charset','utf8');
  //callapi();
  
  // OAuth1.0 - 3-legged server side flow (Twitter example)
// step 1

  var oauth =
    { callback: 'http://localhost:3000/callback/'
    , consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    }
  , url = req_token_uri
  ;
  var errorObj = { status : 'error', message: 'generic'};
  var result = {};
request.post({url:url, oauth:oauth}, function (error, response, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.

  // step 2

  //console.log('error is' + error);
  // console.log('res is' + response);
  // console.log('body is' + req_data.oauth_token);
  // test 
  
  // check for the Error
  if(error)
  {
    console.log('Error happen');
    errorObj.message = error.toString(); 
    result = errorObj;
  }
  else
  {
      var req_data = qs.parse(body);
      var oauth_token = req_data.oauth_token,
      oauth_secret =req_data.oauth_token_secret;
      result = {'oauth_token' : oauth_token, 'oauth_secret': oauth_secret};
      console.log('t test' + result.oauth_token);
  }
 
  var uri = auth_uri
    + '?' + qs.stringify({oauth_token: oauth_token})
  // redirect the user to the authorize uri

  // step 3
  // after the user is redirected back to your server
  /*var auth_data = qs.parse(body)
    , oauth =
      { consumer_key: CONSUMER_KEY
      , consumer_secret: CONSUMER_SECRET
      , token: auth_data.oauth_token
      , token_secret: oauth_secret
      , verifier: auth_data.oauth_verifier
      }
    , url = access_token_uri
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    // ready to make signed requests on behalf of the user
    var perm_data = qs.parse(body)
      , oauth =
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: perm_data.oauth_token
        , token_secret: perm_data.oauth_token_secret
        }
      , url = 'https://secure.splitwise.com/api/v3.0/get_current_user'
      , qs =
        { 
        }
      ;
    request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
      console.log(user.first_name);
    })*/
  })
   res.jsonp(result);
  console.log('got a response %s', result.oauth_secret);
  res.end();
});




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
  console.log('default message is: ' + standardRes.value.rest);
});