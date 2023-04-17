const connection = require('../connection.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const FieldValidatorGetUser = require('../Validation/FieldValidatorGetUser.js');
const UsersGetDTO = require('../Dto/UsersGetDTO.js');

class GetUserHandler {
    constructor(sql, params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
      this.sql = sql;
    }
  
    handle() {
      this.validateFields();
      this.executeQuery();
    }
  
    validateFields() {
      const validator = new FieldValidatorGetUser(this.params, this.method, this.callback);
      validator.validate();
    }
  
    executeQuery() {
      connection.query(this.sql, this.params, (error, data) => {
        if (error) {
          const response = new LambdaResponse(500, error);
          return this.callback(response);
        }
  
        const users = UsersGetDTO.mapUsersGetData(data);
  
        const response = new LambdaResponse(200, { success: true, data: users }, this.method);
        this.callback(null, response);
      });
    }
  }
  
module.exports = GetUserHandler;