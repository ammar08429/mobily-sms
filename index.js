var mobily = require('./src/mobily.js');

function init(username, password, sender, options) {
  if(!username){
    throw new Error('Username not defined');
    return false;
  }
  if(!password){
    throw new Error('Password not defined');
    return false;
  }
  if(!sender){
    throw new Error('Sender name not defined');
    return false;
  }
  if(!options){
    options={};
  }

  mobily.username=username;
  mobily.password=password;
  mobily.sender=sender;
  mobily.options=options.options || {};

  return mobily;
};

module.exports = init;