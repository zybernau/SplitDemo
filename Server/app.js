var express = require('express');
var app = express();
var request = require('request');
var qs = require('querystring');
var conf = require('config.json');
var OAuth = require('oauth').OAuth;


var CONSUMER_KEY = '57juq9zI0Epc1FPk7w64F91UUewHyFQKjxdnVaD4';
var CONSUMER_SECRET ='3SIzRMdPz1nWAdAaiMrkdK836Wv19IvgwHLqTqZ6';
var req_token_uri ='https://secure.splitwise.com/api/v3.0/get_request_token';
//var req_token_uri ='http://term.ie/oauth/example/request_token.php';
var access_token_uri ='https://secure.splitwise.com/api/v3.0/get_access_token';
//var access_token_uri ='http://term.ie/oauth/example/access_token.php';
var auth_uri = 'https://secure.splitwise.com/authorize';
var callback_def = 'http://www.zybernau.in:3000/accesstoken/';
var groups_url = "https://secure.splitwise.com/api/v3.0/get_groups"

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));

var standardRes = { value: {msg: 'test', rest:'some'}};
var dummy = {test:'test'};
var result = {};
var errorObj = { 'status' : 'error', 'message': 'generic'};

var oa = new OAuth(
	"https://secure.splitwise.com/api/v3.0/get_request_token",
	"https://secure.splitwise.com/api/v3.0/get_access_token",
	"7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt",
	"FhnZWUbVtn2b4G9XgD3MuptCke14vn0wD1zfqGqG",
	"1.0",
	"http://www.zybernau.in:3000/callback",
	"HMAC-SHA1"
);


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
  

  var oauth =
    { /*consumer_key: CONSUMER_KEY
    , nonce: "oVnT0q6VBYeYD2wAXuZww1N8Hk7qSJi8uU1szIrOAvA"
    , signature: "testOneTest"
    , signature_method: 'HMAC-SHA1'*/
     token: auth_token
    , verifier: auth_secret
    };

 
        
  request.post({url:access_token_uri, oauth:oauth}, function (error, response, body) {
     console.log('bodY:. ' + body);
     console.log('Response: ' + response);
     console.log("Error: " + error);
  if(error)
  {
    console.log("error: " + error);
  }
    result = {};
    result.body = body.toString();
    result.statusCode = response.statusCode;        
    result.error = error;
    result.response = response;
    res.jsonp(result);
    res.end();
  });
  
  /*res.header('Content-type','application/json');
  res.header('Charset','utf8');
  result = {};
  console.log(" request query : " + req.query.oauth_verifier); 
  var auth_token = req.query.oauth_token;
  var auth_secret = req.query.oauth_verifier;
  oa.getOAuthAccessToken(auth_token, auth_secret, function (error, oauth_access_token, oauth_access_token_secret, results) {
      if (error){
                result.body = error;
                result.error = "error while retrieving data.";
				console.log(error);
				//res.send("yeah something broke.");
			} else {
				result.body = results;
				console.log(results);
				//res.send("worked. nice one.");
			}
  });
  
   
    res.jsonp(result);
    res.end();*/
  
});

app.get('/auth', function(req, res){
    res.header('Content-type','application/json');
  res.header('Charset','utf8');
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		if (error) {
			console.log(error);
			res.send("yeah no. didn't work.")
		}
		else {
            console.log(results);
			req.oauth = {};
			req.oauth.token = oauth_token;
			console.log('oauth.token: ' + req.oauth.token);
			req.oauth.token_secret = oauth_token_secret;
			console.log('oauth.token_secret: ' + req.oauth.token_secret);
            //add secret in session
            //req.session.oauth_token_secret = oauth_token_secret;
			//res.redirect('https://secure.splitwise.com/authorize?oauth_token='+oauth_token)
            result = {};
            result.body = results.toString();
            result.oauth_token = oauth_token;
            result.oauth_secret = oauth_token_secret;
            result.redurl = 'https://secure.splitwise.com/authorize?oauth_token='+oauth_token;
            console.log('oauth: ' + result.oauth_token);
            res.status(200);
            res.jsonp(result);
            //res.redirect(200,'https://secure.splitwise.com/authorize?oauth_token='+oauth_token);
            res.end();
	}
	});
});

app.get('/callback', function(req, res, next){
   // console.log("query" + req.query.oauth_verifier + "oauth " + req.session.oauth.token);
	if (req.query.oauth_verifier) {
		
		var oauth = {};
        oauth.token = req.query.oauth_token;
        oauth.verifier = req.query.oauth_verifier;
        
        result = {};
        var testAcUrl = "http://term.ie/oauth/example/access_token.php?oauth_version=1.0&oauth_nonce=8605062873abb4530864811e508d80af&oauth_timestamp="+Date.now().toString()+"&oauth_consumer_key="+CONSUMER_KEY+"&oauth_token="+oauth.token+"&oauth_signature_method=HMAC-SHA1&oauth_signature=WG%2BJ8ugbkpoUpKBl5iuoZE78O40%3D";
        request.post({url:testAcUrl}, function (error, response, body) {
            if(error)
            {
                console.log("Error: " + error.error);
                console.log("body: " + body);
            }
            else
            {
                console.log("response:" + response + "Body: " + body);
            }
        });
		oa.getOAuthAccessToken(oauth.token,oauth.verifier, 
		function(error, oauth_access_token, oauth_access_token_secret, results){
			if (error){
				console.log('Error :' + error);
				res.send("yeah something broke.");
			} else {
				req.oauth.access_token = oauth_access_token;
				req.oauth.access_token_secret = oauth_access_token_secret;
                
				console.log("results: " + results);
				res.send("worked. nice one.");
			}
		}
		);
	} else
		next(new Error("you're not supposed to be here."))
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