const connection = require('../connection.js');
const functions = require('../Functions/functions.js');
const LambdaResponse = require('../Common/LambdaResponse.js');
const UsersGetDTO = require('../Dto/UsersGetDTO.js');
const UsersCreateDTO = require('../Dto/UsersCreateDTO.js');
const UsersUpdateDTO = require('../Dto/UsersUpdateDTO.js');
const UsersDeleteDTO = require('../Dto/UsersDeleteDTO.js');
const JwtTokenGenerator = require('../Common/JwtTokenGenerator.js');
const PasswordEncryptor = require('../Common/PasswordEncryptor.js');

class UsersQueryHandler {
  constructor(sql, params, callback, method) {
    this.sql = sql;
    this.params = params;
    this.callback = callback;
    this.method = method;
  }

  handleLogin() {
    //Genera token jwt
    const payload = { mobile_phone: this.params[0], password: this.params[1] };
    let token = new JwtTokenGenerator('secret',payload);
    token = token.generate();

    //Decodifica campos
    this.params[0] = decodeURIComponent(this.params[0]);
    this.params[1] = decodeURIComponent(this.params[1]); 

    // Validación de campos tipo y longitud
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

    //Encripta con md5
    const passwordEncryptor = new PasswordEncryptor(this.params[1]);
    this.params[1] = passwordEncryptor.encrypt();

    connection.query(this.sql, this.params, (error, data) => {
      if (error) {
        const response = new LambdaResponse(500, error);
        return this.callback(response);
      }

      const user = {
        user : data,
        access_token : token,
        token_type: 'bearer'
      }

      const response = new LambdaResponse(200, { success: true, data: user }, this.method);
      this.callback(null, response);
    });
  }

  handleGet() {
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

  handleGetUser() {
    const validateId = functions.validateType('int', this.params[0]);
    if (!validateId) {
      const response = new LambdaResponse(400, { success: false, data: 'Invalid id_user' }, this.method);
      return this.callback(null, response);
    }

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

  handleCreate() {
    // Validación de campos tipo y longitud
    const validations = [
      { func: functions.validateType, args: ['varchar', this.params[0]] },
      { func: functions.validateType, args: ['varchar', this.params[1]] },
      { func: functions.validateLength, args: [120, this.params[5]] },
      { func: functions.validateType, args: ['varchar', this.params[4]] },
      { func: functions.validateType, args: ['varchar', this.params[3]] }
    ];
    const isValid = validations.every(validation => validation.func(...validation.args));
    if (!isValid) {
      const response = new LambdaResponse(400, {
        success: false,
        data: 'The parameters do not meet the required data type or length'
      }, this.method);
      return this.callback(null, response);
    }

    const password = this.params[5];

    //Encripta con md5
    this.params[5] = crypto.createHash('md5').update(this.params[5]).digest('hex');
  
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
        password,
        this.params[6]
      );
  
      const users = UsersCreateDTO.mapUserCreateData(user);
  
      const response = new LambdaResponse(200, { success: true, data: users }, this.method);
      this.callback(null, response);
    });
  }  

  handleUpdate() {
    // Validación de campos tipo y longitud
    const validations = [
      { func: functions.validateType, args: ['varchar', this.params[0]] },
      { func: functions.validateType, args: ['varchar', this.params[1]] },
      { func: functions.validateLength, args: [120, this.params[5]] },
      { func: functions.validateType, args: ['varchar', this.params[4]] },
      { func: functions.validateType, args: ['varchar', this.params[3]] }
    ];
    const isValid = validations.every(validation => validation.func(...validation.args));
    if (!isValid) {
      const response = new LambdaResponse(400, {
        success: false,
        data: 'The parameters do not meet the required data type or length'
      }, this.method);
      return this.callback(null, response);
    }

    const password = this.params[5];

    //Encripta con md5
    this.params[5] = crypto.createHash('md5').update(this.params[5]).digest('hex');
  
    connection.query(this.sql, this.params, (error, data) => {
      if (error) {
        const response = new LambdaResponse(500, error);
        return this.callback(response);
      }

      const user = new UsersUpdateDTO(
        this.params[0],
        this.params[1],
        this.params[2],
        this.params[3],
        this.params[4],
        password,
        this.params[6]
      );
  
      const users = UsersUpdateDTO.mapUserUpdateData(user);
  
      const response = new LambdaResponse(200, { success: true, data: users }, this.method);
      this.callback(null, response);
    });
  } 

  handleDelete() {
    const validateId = functions.validateType('int', this.params[0]);
    if (!validateId) {
      const response = new LambdaResponse(400, { success: false, data: 'Invalid id_user' }, this.method);
      return this.callback(null, response);
    }

    const sql = 'SELECT first_name, last_name, date_birth, mobile_phone, password, address FROM users WHERE id = ?'
    connection.query(sql, this.params[0], (error, data) => {
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

module.exports = UsersQueryHandler;