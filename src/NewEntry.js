import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
import {Router} from 'aurelia-router';
//import 'fetch';

@inject(HttpClient, Router)
export class NewEntry {
    


	heading = "New Entry";
	cost=0;
	BaseURL = "http://localhost:3000/";
	getaccessURL = "http://localhost:3000/accesstoken";
	resKey = {};
    oauth_token =undefined;
    oauth_verifier = undefined;
    payment = false;
    amount = 0;
    groupId = "";
    groups = [];
    group = {};
	resultText = 'Yet to get the result';
    //key_res = {};
	constructor(http, router) {
		console.log("in cons" + Date.now().toString());
        this.router = router;
		this.http = http
		.configure(x => {
			x.withBaseUrl(this.BaseURL);

		});
        

	}
	
	success(oauth_token, oauth_secret) {
		console.log("Success, go home.");
	}
	
	activate(params,qus,routeConfig) {
		// return this.http.post('get_request_token')
		// .then(success);
        this.oauth_token = routeConfig.queryParams.oauth_token;
        this.oauth_verifier = routeConfig.queryParams.oauth_verifier;
        console.log("HOOOOOREEEY... token: " + routeConfig.queryParams.oauth_token + " verif: " + routeConfig.queryParams.oauth_verifier);
        if(this.oauth_token && this.oauth_verifier)
        {
            // call get access method.
            this.getAccess();
            // get the groups. currency. etc
            this.getGroupInfo();
            // once authorized, hide authorize button.
        }
        else if(!this.oauth_token)
        {
            this.initSplitwise();
        }
	}
	
    getGroupInfo() {
        // get the group info. and bind in the html.
        
    }
	getAccess() {
		console.log("Key Res: " + this.key_res);
		
		var urlGetAccess = "accesstoken" + "?oauth_token=" + this.oauth_token + "&oauth_verifier=" + this.oauth_verifier;
		return this.http.jsonp(urlGetAccess, 'callback').then (
			response => {
				console.log('got the other response, hurrak... ' + response.response.body);
			}
			, err => {
				console.log('got the error' + err);
			}
		);
	}
	getAuthed() {
        console.log('app is ' + this.router);
        
       this.router.navigate('welcome', { oauth_token:this.key_res.oauth_token}, {replace: true}); 
    }
	initSplitwise() {
		return this.http.jsonp('init', 'callback').then(
		response => {
			//this.resultText = response.response.request_url;
			console.log('Got the response, hurrah...' + response.response.body );
			this.oauth_token = response.response.oauth_token;
            this.resKey = response.response;
		}
		, err => {
			console.log("error occured while sending dodebentain tontabentain: " + err);
		});
     }
    submitEntry() {
        var urlEntry = "";
        urlEntry = "submitEntry" + "?ver=" + this.oauth_verifier + "&payment=" + this.payment.toString() + "&amount=" + this.amount + "&group=" + this.groupId
        return this.http.jsonp(urlEntry, 'callback').then(
		response => {
			//this.resultText = response.response.request_url;
			console.log('Got the response, hurrah...' + response.response.body );
			this.key_res = response.response;
            this.resKey = response.response;
		}
		, err => {
			console.log("error occured while sending dodebentain tontabentain: " + err);
		});
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