# Mobily SMS NodeJs
An unofficial nodeJs library for Implementation of [Mobily SMS Gateway](https://www.mobily.ws).

## Installation
Install using npm:
```sh
npm install mobily-sms
```

## Usage
Require library
```javascript
var mobilySms = require('mobily-sms')('username','password','sender',option);

/*
 * option is an optional attribute which will be an object
 * option can have the following attribute
 *  - domainName
 *    Your webiste url, by default www.mobily.ws will be taken
 *
 *  - MsgID
 *    Random number that will be attached with the posting, just in case you want to send same message in less than one hour from the first one
 *    Mobily prevents recurrence send the same message within one hour of being sent, except in the case of sending a different value with each send operation
 *
 *  - timeSend
 *    Determine the send time, 0 means send now
 *    Standard time format is hh:mm:ss
 *
 *  - dateSend
 *    Determine the send date, 0 means send now
 *    Standard time format is mm:dd:yyyy
 *
 *  - deleteKey
 *    Use this value to delete message using delete potal
 *    You can specify one number for group of messages to delete
 *
 *  - lang
 *    When you send message without encoding you must sent Lang parameter with 3 as its value
 */
```

Sending Sms
```javascript
mobilySms.sendSms('kkk',['966560217980'],function(message,code){
  /* Different types of message and code
   * smsSuccessfullySent(200) => Sms was successfully sent
   * invalidMobileNumber(400) => Recipient Mobile number given is wrong
   * autheticationFailed(401) => Password is wrong
   * userNotFound(404) => Username give can not be found in the database
   * invalidTextMessage(405) => Text message has invalid encoding
   * invalidSenderName(406) => Give sender name doesn't match what was registered in the system
   * noTextMessageGiven(407) => Text message is not there
   * noMobileNumberGiven(408) => No Mobile number given
   * others(500) => These are un catched error so you will probably get message in arabic language
   */
});
```

