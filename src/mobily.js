"use strict"

var soap = require('soap');
var parseString = require('xml2js').parseString;

exports.username= '';
exports.password= '';
exports.sender= '';
exports.domainName= '';
exports.options= {};
exports.client= 'http://www.mobilywebservices.com:86/SMSWebService/SMSIntegration.asmx?wsdl';

exports.sendSms = function (msg,numbers, cb) {
	if(!cb){
		cb = function(message,code){
			console.log('You haven\'t provided a call back function hence just printing here about the result');
			console.log(message,code);
		}
	}
	var mobile = this.username;
	//Mobile number (or username) of your Mobily.ws account
	var password = this.password;
	//Password of your Mobily.ws account
	var sender = this.sender;
	//The sender name that will be shown when the message is delivered , it will be encrypted automatically to (urlencode)

	var options = this.options;

	if(Array.isArray(numbers)){
		numbers=numbers.join(',');
	}

	if(!msg){
		return cb('noTextMessageGiven',407)
	}

	if(!numbers){
		return cb('noMobileNumberGiven',408)
	}

	soap.createClient(this.client, function(err, client) {
		if(err){
			console.log({
				func: 'soap createClient',
				err: err
			});
			return cb(err.message,500);
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
		var sendSMSParam = {
			'userName': mobile,
			'password': password,
			'numbers': numbers,
			'sender': sender,
			'message': msg,
			'dateSend': dateSend,
			'timeSend': timeSend,
			'deleteKey': deleteKey,
			'lang': lang,
			'messageId': MsgID,
			'applicationType': '24',
			'domainName': options.domainName || 'www.mobily.ws'
		};

		client.SendSMS(sendSMSParam, function(err, result) {
			if(err){
				console.log({
					controller: 'sms libraray',
					func: 'sendMobilySms',
					inner_func: 'client.SendSMS',
					err: err
				});
				return cb(err.message,500);
			}
			parseString(result.SendSMSWithLangAndNotRepeatResult, function (err, jsonRes) {
				if(err){
					console.log({
						func: 'parseString',
						err: err
					});
					return cb(err.message,500);
				}
				if(jsonRes.MobilySMS.Status=='تم الإرسال'){
					return cb('smsSuccessfullySent',200)
				} else if(jsonRes.MobilySMS.Status=='الأقام المرسل ها غير صحيحه أو فارغه') {
					return cb('invalidMobileNumber',400)
				} else if(jsonRes.MobilySMS.Status=='كلمة المرور خاطئه') {
					return cb('autheticationFailed',401)
				}  else if(jsonRes.MobilySMS.Status=='رقم الجوال غير متوفر') {
					return cb('userNotFound',404)
				} else if(jsonRes.MobilySMS.Status=='نص الرساله غير مشفر بالشكل الصحيح') {
					return cb('invalidTextMessage',405)
				} else if(jsonRes.MobilySMS.Status=='إسم المرسل المستخدم في الإرساليه غير معرف') {
					return cb('invalidSenderName',406)
				} else {
					return cb(jsonRes.MobilySMS.Status,500)
				}
			});
		});
	});
};

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}