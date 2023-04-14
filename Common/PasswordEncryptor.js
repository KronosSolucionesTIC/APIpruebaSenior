const crypto = require('crypto');

class PasswordEncryptor {
    constructor(password) {
        this.password = password;
      }

    encrypt() {
      return crypto.createHash('md5').update(this.password).digest('hex');
    }
  }

module.exports = PasswordEncryptor;