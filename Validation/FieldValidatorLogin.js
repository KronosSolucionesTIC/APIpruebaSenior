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
      mobile: Joi.string().required(),
      password: Joi.string().required().max(120)
    });
    
    const { error } = schema.validate({ mobile: this.params[0], password: this.params[1] });
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

  
module.exports = FieldValidatorLogin;