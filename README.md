# Mobily SMS NodeJs
An unofficial nodeJs library for Implementation of [Mobily SMS Gateway](https://www.mobily.ws).

## Installation
Install using npm:
```sh
npm install mobily-sms --save
```

## Usage
Require library
```javascript
var mobilySms = require('mobily-sms')('username','password');
```

Check Send Status
```javascript
mobilySms.sendStatus(function(err,data){
  /*
   *This API provides you with the ability to check the sending process status in Mobily.ws,
   *so you know if you can send your SMS now or later.
   */
});
```

Sending Sms
```javascript
mobilySms.sendSms('Hello there! How are you?',['966566666666','919999666666'],sender,option,function(error,data){
  /*
   * option is an optional attribute which will be an object
   * option can have the following attribute
   *  - domainName
   *    Your webiste url, by default www.mobily.ws will be taken
   *  - MsgID
   *    Random number that will be attached with the posting, just in case you want to send same message in less than one hour from the first one
   *    Mobily prevents recurrence send the same message within one hour of being sent, except in the case of sending a different value with each send operation
   *  - timeSend
   *    Determine the send time, 0 means send now
   *    Standard time format is hh:mm:ss
   *  - dateSend
   *    Determine the send date, 0 means send now
   *    Standard time format is mm:dd:yyyy
   *  - deleteKey
   *    Use this value to delete message using delete potal
   *    You can specify one number for group of messages to delete
   *  - lang
   *    When you send message without encoding you must sent Lang parameter with 3 as its value
   */
  /*
   *ErrorCode:0 => Not connect to server
   *ErrorCode:1 => SMS sent successfully
   *ErrorCode:2 => Your balance is 0
   *ErrorCode:3 => Your balance is not enough.
   *ErrorCode:4 => Invalid mobile number (or invalid username).
   *ErrorCode:5 => Invalid password.
   *ErrorCode:6 => SMS-API not responding, please try again.
   *ErrorCode:10 => SMS counts don’t match mobiles numbers count.
   *ErrorCode:13 => Mobile number is not active as a Sender Name.
   *ErrorCode:14 => Sender name is not active from Mobily.ws and mobile telecommunications companies
   *ErrorCode:15 => Mobile number(s) is not specified or incorrect.
   *ErrorCode:16 => Sender name is not specified.
   *ErrorCode:17 => Message text is not specified or not encoded properly with Mobily.ws Unicode.
   */
});
```

## Other available methods
Change Password
```javascript
mobilySms.changePassword(newPassword,function(err,data){
  /*
   *This API provides you the ability to change your Mobily.ws account password
   */
});
```
Forget Password
```javascript
mobilySms.forgetPassword(function(err,data){
  /*
   *This API provides you with the ability to retrieve your password back, in case you forget it.
   */
});
```
getBalance
```javascript
mobilySms.getBalance(function(err,data){
  /*
   *This API provides you with the ability to check your balance, in any time.
   */
});
```
deleteMsg
```javascript
mobilySms.deleteMsg(deleteKey,function(err,data){
  /*
   * This API provides you with the ability to delete schedule SMS, before its send time.
   */
});
```
Request a license for mobile number as a sender name:
```javascript
mobilySms.addSender(sender,function(err,data){
  /*
   *This API provides you with the ability to request a license for mobile number as a sender name,
   *you should notice that the mobile number you used to register with Mobily.
   *ws will be licensed as a sender name automatically,
   *but if you need to use another mobile number as a sender name for your SMS,
   *you should request a license for it, the new mobile number will be defined by Mobily.ws and telecommunications companies,
   *this API will return a request number called senderId as #XXXX,
   *and will sent a check code to the new mobile number,
   *those information are important to the next API “activate mobile number as a sender name”.
   */
});
```
Activate mobile number as sender name:
```javascript
mobilySms.activeSender(senderId,activeKey,function(err,data){
  /*
   *This API provides you with the ability to activate a mobile number which was requested in the previous API
   *“Request a license for mobile number as a sender name” as a sender name.
   */
});
```
Check sender name activation status:
```javascript
mobilySms.checkSender(senderId,function(err,data){
  /*
   *This API provides you with the ability to check the activation status of a mobile number as a sender name,
   *you can use this API after using “Activate mobile number as sender name” API
   *to confirm that the mobile number is activated as a sender name.
   */
});
```
Request a license for alphabets names as sender name:
```javascript
mobilySms.addAlphaSender(sender,function(err,data){
  /*
   *This API provides you with the ability to activate alphabets names as a sender name
   */
});
```
Check alphabets sender name activation status:
```javascript
mobilySms.checkAlphasSender(function(err,data){
  /*
   *This API provides you with the ability to check the activation status of an alphabets sender name,
   *also its will return all the senders’ names activation status in your account.
   */
});
```
msgSendWK (Coming soon)
