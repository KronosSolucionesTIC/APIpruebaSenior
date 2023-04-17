const functions = require('../Functions/functions.js');
const LambdaResponse = require('../Common/LambdaResponse.js');

class FieldValidatorLogin {
    constructor(params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
    }
    
    validate() {
      const validations = [
        { func: functions.validateType, args: ['varchar', this.params[0]] },
        { func: functions.validateLength, args: [120, this.params[1]] },
      ];
      const isValid = validations.every(validation => validation.func(...validation.args));
      if (!isValid) {
        const response = new LambdaResponse(400, {
          success: false,
          data: 'Invalid mobile or password'
        }, this.method);
        return this.callback(null, response);
      }
      return true;
    }
  }
  
module.exports = FieldValidatorLogin;