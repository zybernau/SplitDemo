import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
//import 'fetch';

@inject(HttpClient)
export class NewEntry {
	heading = "New Entry";
	cost=0;
	
	resKeys;
	constructor(http) {
		this.client1 = new HttpClient()
		.configure(x => {
			x.withBaseUrl('https://secure.splitwise.com/api/v3.0/')
			x.withHeader('Authorization', 'oauth_callback=oob; oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt; oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg; oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D; oauth_signature_method=HMAC-SHA1; oauth_timestamp=1324583039; oauth_version=1.0;')
		})
		// http.configure(config => {
		// 	config
		// 		.useStandardConfiguration()
		// 		.withBaseUrl('https://secure.splitwise.com/api/v3.0/')
		// 		.withHeader('Authorization', 'oauth_callback=“oob”; oauth_consumer_key=“7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt”;oauth_nonce=“mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg”;oauth_signature=“NiFRzuOnBluHzjvepGGdpCyOnhc%3D”;oauth_signature_method=“HMAC-SHA1”oauth_timestamp=“1324583039”;oauth_version=“1.0” ');
		// });
		
		/*http.defaultRequestHeaders.add('Authorization', 'oauth_callback=oob; oauth_consumer_key=7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt; oauth_nonce=mN9HrBRniRcEF1EnY4X9JSZJ26MclAqjr9tMIlMQmg; oauth_signature=NiFRzuOnBluHzjvepGGdpCyOnhc%3D; oauth_signature_method=HMAC-SHA1; oauth_timestamp=1324583039; oauth_version=1.0;');*/
		this.http = http;
	}
	
	success(oauth_token, oauth_secret) {
		console.log("Success, go home.");
	}
	
	activate() {
		// return this.http.post('get_request_token')
		// .then(success);
	}

	submitEntry() {
		return this.client1.post('get_request_token').then(
		response => {
			this.resKey = response;
		}
		, err => {
			console.log("error occured while sending dodebentain tontabentain: " + err);
		});
		
		
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