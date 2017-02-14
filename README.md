# Mobily SMS NodeJs
An unofficial nodeJs library for Implementation of [Mobily SMS Gateway](https://www.mobily.ws).

## Installation
Install using npm: (coming soon)
```sh
npm install mobily-sms
```

## Usage
Require library
```javascript
var mobilySms = require('mobily-sms')('username','password','sender');

mobilySms.sendSms('kkk',['966560217980'],function(message,code){
  /* Different types of message and code
   * smsSuccessfullySent(200) => Sms was successfully sent
   * invalidMobileNumber(400) => Recipinet Mobile number given is wrong
   * autheticationFailed(401) => Password is wrong
   * userNotFound(404) => Usename give can not be found in the database
   * invalidTextMessage(405) => Text message is either not there or has invalide encoding
   * invalidSenderName(406) => Give sender name doesn't match what was registered in the system
   * others(500) => These are un catched error so you will probably get message in arabic language
   */
});
```

