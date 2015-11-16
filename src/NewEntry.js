import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
//import 'fetch';

@inject(HttpClient)
export class NewEntry {
	heading = "New Entry";
	cost=0;
	
	//BaseURL = 'http://jsonplaceholder.typicode.com';
	//BaseURL = 'https://secure.splitwise.com/api/v3.0/test?oauth_callback=oob&oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt&oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg&oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+Date.now().toString()+'&oauth_version=1.0';
	//BaseURL = 'https://secure.splitwise.com/api/v3.0/get_request_token?oauth_callback=oob&oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt&oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg&oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+Date.now().toString()+'&oauth_version=1.0';
	
	BaseURL = "http://localhost:3000/sample"
	//timeStamp = Date.now().toString();
	//BaseURL = 'http://term.ie/oauth/example/request_token.php?oauth_version=1.0&oauth_nonce=2c08b15e169dd79f1b58b111895710ef&oauth_timestamp='+Date.now().toString()+'&oauth_consumer_key=key&oauth_signature_method=HMAC-SHA1&oauth_signature=/R3UO7ZeIyP4C47gVfpxU0p7EUY=';
	//Working ->
	//BaseURL = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mountain&tagmode=any&format=json';
	resKey = {};
	resultText = 'Yet to get the result';
	constructor(http) {
		console.log(Date.now().toString());
		this.http = http
		.configure(x => {
			x.withBaseUrl(this.BaseURL);
			//x.withInterceptor(new ResponseInterceptor());
			//x.withHeader('Content-Type', 'application/json');
			//x.withHeader('DataType' , 'jsonp');
			//x.withHeader('Authorization', 'bearer oauth_callback=oob; oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt; oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg; oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D; oauth_signature_method=HMAC-SHA1; oauth_timestamp=1324583039; oauth_version=1.0;')
			
			//x.withHeader('Method', 'post');
		})
		// http.configure(config => {
		// 	config
		// 		.useStandardConfiguration()
		// 		.withBaseUrl('https://secure.splitwise.com/api/v3.0/')
		// 		.withHeader('Authorization', 'oauth_callback=“oob”; oauth_consumer_key=“7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt”;oauth_nonce=“mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg”;oauth_signature=“NiFRzuOnBluHzjvepGGdpCyOnhc%3D”;oauth_signature_method=“HMAC-SHA1”oauth_timestamp=“1324583039”;oauth_version=“1.0” ');
		// });
		
		/*this.client1.defaultRequestHeaders.add('Authorization', 'oauth_callback=oob; oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt; oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg; oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D; oauth_signature_method=HMAC-SHA1; oauth_timestamp=1324583039; oauth_version=1.0;');*/
		//this.http = http;
	}
	
	success(oauth_token, oauth_secret) {
		console.log("Success, go home.");
	}
	
	activate() {
		// return this.http.post('get_request_token')
		// .then(success);
	}

	submitEntry() {
		return this.http.jsonp('', 'callback').then(
		response => {
			//this.resultText = response.response.request_url;
			console.log('Got the response, hurrah...' + response.response.test );
		}
		, err => {
			console.log("error occured while sending dodebentain tontabentain: " + err);
		});
		
		/*$.ajax({
  type: "GET",
  url: 'http://localhost:3000/sample',
  success: this.success,
  dataType: 'jsonp'
});*/
		
		
		// .then(success);
	}
	failure(errors) {
		console.log("don't go home, " + errors.toString());
	}
	canDeactivate() {
		if (this.fullName !== this.previousValue) {
		return confirm('Are you sure you want to leave?');
		}
	}
	
	
}

class ResponseInterceptor {
  response(message) {
    // do something with the message
    //return message;
	console.log('there is some response. '+ message);
  }

  responseError(error) {
	console.log('there is some error. '+ error);  
	throw error;
   // throw error; // or return an HttpResponseMessage to recover from the error
  }
}