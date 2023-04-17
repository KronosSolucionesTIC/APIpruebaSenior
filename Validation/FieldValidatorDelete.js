const functions = require('../Functions/functions.js');
const LambdaResponse = require('../Common/LambdaResponse.js');

class FieldValidatorDelete {
    constructor(params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
    }
    
    validate() {
      const validations = [
        { func: functions.validateType, args: ['int', this.params[0]] }
      ];
      const isValid = validations.every(validation => validation.func(...validation.args));
      if (!isValid) {
        const response = new LambdaResponse(400, {
          success: false,
          data: 'Invalid id_user'
        }, this.method);
        return this.callback(null, response);
      }
      return true;
    }
  }
  
module.exports = FieldValidatorDelete;