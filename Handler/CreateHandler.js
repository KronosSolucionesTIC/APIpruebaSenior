const connection = require('../connection.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const PasswordEncryptor = require('../Common/PasswordEncryptor.js');
const UsersCreateDTO = require('../Dto/UsersCreateDTO.js');
const FieldValidatorCreate = require('../Validation/FieldValidatorCreate.js');

class CreateHandler {
    constructor(sql, params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
      this.sql = sql;
      this.password = '';
    }
  
    handle() {
      this.validateFields();
      this.asignPassword();
      this.encryptPassword();
      this.executeQuery();
    }
  
    validateFields() {
      const validator = new FieldValidatorCreate(this.params, this.method, this.callback);
      validator.validate();
    }

    asignPassword(){
      this.password = this.params[5]; //Asigna password original
    }
  
    encryptPassword() {
      this.params[5] = new PasswordEncryptor(this.params[5]).encrypt();
    }
  
    executeQuery() {
      connection.query(this.sql, this.params, (error, data) => {
        if (error) {
          const response = new LambdaResponse(500, error);
          return this.callback(response);
        }
  
        const user = new UsersCreateDTO(
          this.params[0],
          this.params[1],
          this.params[2],
          this.params[4],
          this.params[3],
          this.password,
          this.params[6]
        );
    
        const users = UsersCreateDTO.mapUserCreateData(user);
  
        const response = new LambdaResponse(200, { success: true, data: users }, this.method);
        this.callback(null, response);
      });
    }
  }
  
module.exports = CreateHandler;