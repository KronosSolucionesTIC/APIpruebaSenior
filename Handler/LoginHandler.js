const connection = require('../connection.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const JwtTokenGenerator = require('../Common/JwtTokenGenerator.js');
const PasswordEncryptor = require('../Common/PasswordEncryptor.js');
const DecodeFields = require('../Common/DecodeFields.js');
const FieldValidatorLogin = require('../Validation/FieldValidatorLogin.js');

class LoginHandler {
    constructor(sql, params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
      this.sql = sql;
    }
  
    handle() {
      this.validateFields();
      this.decodeFields();
      const token = this.generateToken();
      this.encryptPassword();
      this.executeQuery(token);
    }
  
    validateFields() {
      const validator = new FieldValidatorLogin(this.params, this.method, this.callback);
      validator.validate();
    }
  
    decodeFields() {
      this.params = new DecodeFields(this.params).decode();
    }
  
    generateToken() {
      return new JwtTokenGenerator('secret', { mobile_phone: this.params[0], password: this.params[1] }).generate();
    }
  
    encryptPassword() {
      this.params[1] = new PasswordEncryptor(this.params[1]).encrypt();
    }
  
    executeQuery(token) {
      connection.query(this.sql, this.params, (error, data) => {
        if (error) {
          const response = new LambdaResponse(500, error);
          return this.callback(response);
        }
  
        const user = {
          user: data,
          access_token: token,
          token_type: 'bearer'
        };
  
        const response = new LambdaResponse(200, { success: true, data: user }, this.method);
        this.callback(null, response);
      });
    }
  }
  
module.exports = LoginHandler;