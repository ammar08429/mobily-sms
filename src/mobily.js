"use strict"

exports.username= '';
exports.password= '';

var jsonApiUrl='http://mobily.ws/api/json/index.php';

var request = require('request');

exports.sendStatus = function (cb){
	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}
	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"sendStatus"
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.sendSms = function (msg,numbers,sender,options, cb) {

	if(!cb){
		if (typeof options === "function") {
			cb=options;
			options={};
		} else {
			cb = function(message,code){
				console.log('You haven\'t provided a call back function hence just printing here about the result');
				console.log(message,code);
			}
		}
	}
	if(!options){
		options={};
	}

	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(Array.isArray(numbers)){
		numbers=numbers.join(',');
	}

	if(!msg){
		return cb('noTextMessageGiven',407)
	}

	if(!numbers){
		return cb('noMobileNumberGiven',408)
	}


	var MsgID = options.MsgID || getRandomArbitrary(1, 99999);
	//Random number that will be attached with the posting, just in case you want to send same message in less than one hour from the first one
	//Mobily prevents recurrence send the same message within one hour of being sent, except in the case of sending a different value with each send operation

	var timeSend = options.timeSend || 0;
	//Determine the send time, 0 means send now
	//Standard time format is hh:mm:ss

	var dateSend = options.dateSend || 0;
	//Determine the send date. 0:now
	//Standard date format is mm:dd:yyyy

	var deleteKey = options.deleteKey || 152485;
	//use this value to delete message using delete potal.
	//you can specify one number for group of messages to delete

	var lang = options.lang || 3;
	//when you send message without encoding you must sent Lang parameter with 3 as its value


	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data: {
				Method: "msgSend",
				Params: {
					'numbers': numbers,
					'sender': sender,
					'msg': msg,
					'dateSend': dateSend,
					'timeSend': timeSend,
					'deleteKey': deleteKey,
					'lang': lang,
					'msgId': MsgID,
					'applicationType': '24',
					'domainName': options.domainName || 'www.mobily.ws'
				},
				Auth: {
					mobile: mobile,
					password: password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.changePassword = function (newPassword,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"changePassword",
				Params:{
					newPassword:newPassword
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.forgetPassword = function (cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"forgetPassword",
				Params:{
					type:"2"
				},
				Auth:{
					mobile:mobile
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.getBalance = function (cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"balance",
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.deleteMsg = function (deleteKey,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"deleteMsg",
				Params:{
					deleteKey:deleteKey
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.addSender = function (sender,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"addSender",
				Params:{
					sender:sender
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.activeSender = function (senderId,activeKey,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"activeSender",
				Params:{
					senderId:senderId,
					activeKey:activeKey
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.addAlphaSender = function (sender,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"addAlphaSender",
				Params:{
					sender:sender
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.checkSender = function (senderId,cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"checkSender",
				Params:{
					senderId:senderId
				},
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};

exports.checkAlphasSender = function (cb){
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account

	if(!cb){
		cb = function(err,data){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(err,data);
		}
	}

	request({
		url: jsonApiUrl,
		method: "POST",
		json:  {
			Data:{
				Method:"checkAlphasSender",
				Auth:{
					mobile:mobile,
					password:password
				}
			}
		}
	}, function (error, response, body) {
		if(!error && body && body.Error){
			error=body.Error;
		}
		cb(error,body);
	});
};


function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}