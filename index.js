var mobily = require('./src/mobily.js');

function init(username, password) {
  if(!username){
    throw new Error('Username not defined');
    return false;
  }
  if(!password){
    throw new Error('Password not defined');
    return false;
  }

  mobily.username=username;
  mobily.password=password;

  return mobily;
};

module.exports = init;