const jwt = require('jsonwebtoken');

class JwtTokenGenerator {
    constructor(secret, payload) {
      this.secret = secret;
      this.payload = payload;
    }
  
    generate() {
      return jwt.sign(this.payload, this.secret);
    }
  }

module.exports = JwtTokenGenerator