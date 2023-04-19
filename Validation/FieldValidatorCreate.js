const Joi = require('joi');
const LambdaResponse = require('../Common/LambdaResponse.js');

class FieldValidatorLogin {
    constructor(params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
    }
    
    validate() {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_birth: Joi.string().required(),
        mobile_phone: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
      });

      const { error } = schema.validate({ 
        first_name: this.params[0], 
        last_name: this.params[1],
        date_birth: this.params[2],
        mobile_phone: this.params[3],
        email: this.params[4],
        password: this.params[5],
        address: this.params[6],
      });
      if (error) {
        const response = new LambdaResponse(400, {
          success: false,
          data: error["message"]
        }, this.method);
        return this.callback(null, response);
      }
      return true;
    }
  }
  
module.exports = FieldValidatorLogin;