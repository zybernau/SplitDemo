var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var standardRes = { value: {msg: 'test', rest:'some'}};
var dummy = {test:'test'};
app.get('/sample', function (req, res) {
  res.header('Content-type','application/json');
  res.header('Charset','utf8');
  res.jsonp(dummy);
  console.log('got a request %s', req[1]);
  res.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
  console.log('default message is: ' + standardRes.value.rest);
});