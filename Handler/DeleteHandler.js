const connection = require('../connection.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const UsersDeleteDTO = require('../Dto/UsersDeleteDTO.js');
const FieldValidatorDelete = require('../Validation/FieldValidatorDelete.js');

class DeleteHandler {
    constructor(sql, params, method, callback, sqlSelect) {
      this.params = params;
      this.method = method;
      this.callback = callback;
      this.sql = sql;
      this.sqlSelect = sqlSelect;
    }
  
    handle() {
      this.validateFields();
      this.executeQuery();
    }
  
    validateFields() {
      const validator = new FieldValidatorDelete(this.params, this.method, this.callback);
      validator.validate();
    }
  
    executeQuery() {
      connection.query(this.sqlSelect, this.params[0], (error, data) => {
        if (error) {
          const response = new LambdaResponse(500, error);
          return this.callback(response);
        }
  
        const users = UsersDeleteDTO.mapUsersDeleteData(data);
  
        const response = new LambdaResponse(200, { success: true, data: users }, this.method);
        this.callback(null, response);
      });
  
      connection.query(this.sql, this.params, (error, data) => {
        if (error) {
          const response = new LambdaResponse(500, error);
          return this.callback(response);
        }
      });
    }
  }
  
module.exports = DeleteHandler;