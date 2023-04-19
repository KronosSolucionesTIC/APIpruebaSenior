const Joi = require('joi');
const LambdaResponse = require('../Common/LambdaResponse.js');

class FieldValidatorDelete {
    constructor(params, method, callback) {
      this.params = params;
      this.method = method;
      this.callback = callback;
    }
    
    validate() {
      const schema = Joi.object({
        id_user: Joi.number().required()
      });
      const { error } = schema.validate({ id_user: this.params[0] });
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
  
module.exports = FieldValidatorDelete;