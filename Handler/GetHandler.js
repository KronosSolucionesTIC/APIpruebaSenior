const connection = require('../connection.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const UsersGetDTO = require('../Dto/UsersGetDTO.js');

class GetHandler {
    constructor(sql, params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
      this.sql = sql;
    }
  
    handle() {
      this.executeQuery();
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
  
module.exports = GetHandler;