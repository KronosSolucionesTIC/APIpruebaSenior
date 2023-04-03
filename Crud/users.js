const connection = require('../connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const functions = require('../Functions/functions.js');
const { headersPost, headersGet, headersPut, headersDelete } = require('../Common/Constants.js');
const LambdaResponse = require('../Common/LambdaResponse.js');

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const requestBody = JSON.parse(event.body);
    const data = {
        mobile_phone : requestBody.mobile_phone,
        password : requestBody.password
    }

    //Decodifica campos
    const mobilePhoneDecodificado = decodeURIComponent(data.mobile_phone);
    const passwordDecodificado = decodeURIComponent(data.password); 

    //Encripta con md5
    const passworEncriptado = crypto.createHash('md5').update(passwordDecodificado).digest('hex');

    //Genera token jwt
    const token = jwt.sign(data, 'secreto');

    const sql = 'SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users WHERE mobile_phone = ? AND password = ?';
    connection.query(sql, [mobilePhoneDecodificado, passworEncriptado], (error, row) => {

        //Validacion de campos tipo y longitud
        const validateMobilePhone = functions.validateType('varchar', requestBody.mobile_phone)
        const validatePassword = functions.validateLength(120, requestBody.password)
        if (!validateMobilePhone || !validatePassword) {
            const response = new LambdaResponse(400, { 
                success: true, 
                data: 'Invalid mobile or password' 
            }, headersPost);
            callback(null, response);
        }

        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { 
                success: true, 
                data: row,
                access_token : token,
                token_type: "bearer" 
            }, headersPost);
            callback(null, response);
          }
    });
};

module.exports.get = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const sql = 'SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users';
    connection.query(sql, (error, row) => {
        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { success: true, data: row }, headersGet);
            callback(null, response);
          }
    });
}

module.exports.getUser = (event, context, callback) => {  
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users WHERE id = ?';
    connection.query(sql, [event.pathParameters.id_user], (error, row) => {

        //Validacion de campo tipo
        const validateId = functions.validateType('int', event.pathParameters.id_user)
        if (!validateId) {
            const response = new LambdaResponse(400, { 
                success: true, 
                data: 'Invalid id_user' 
            }, headersGet);
            callback(null, response);
        }

        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { success: true, data: row }, headersGet);
            callback(null, response);
          }
    });
}

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const requestBody = JSON.parse(event.body);
    const data = {
        first_name : requestBody.first_name,
        last_name : requestBody.last_name,
        date_birth : requestBody.date_birth,
        mobile_phone: requestBody.mobile_phone,
        email: requestBody.email,
        password : requestBody.password,
        address: requestBody.address
    }

    //Encripta con md5
    const passworEncriptado = crypto.createHash('md5').update(requestBody.password).digest('hex')

    const sql = 'INSERT INTO users (first_name, last_name, date_birth, mobile_phone, email, password, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [data.first_name, data.last_name, data.date_birth, data.mobile_phone, data.email, passworEncriptado, data.address], (error, row) => {
        
        //Validacion de campos tipo y longitud
        const validateFirstName = functions.validateType('varchar', data.first_name)
        const validateLastName = functions.validateType('varchar', data.last_name)
        const validatePassword = functions.validateLength(120, requestBody.password)
        const validateMobilePhone = functions.validateType('varchar', requestBody.mobile_phone)
        const validateEmail = functions.validateType('varchar', requestBody.email)
        if (!validateFirstName || !validateLastName || !validatePassword || !validateMobilePhone || !validateEmail) {
            const response = new LambdaResponse(400, { 
                success: true, 
                data: 'The parameters do not meet the required data type or length' 
            }, headersPost);
            callback(null, response);
        }

        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { success: true, data: data }, headersPost);
            callback(null, response);
          }
    });
};

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const requestBody = JSON.parse(event.body);
    const data = {
        first_name : requestBody.first_name,
        last_name : requestBody.last_name,
        date_birth : requestBody.date_birth,
        mobile_phone: requestBody.mobile_phone,
        email: requestBody.email,
        password : requestBody.password,
        address: requestBody.address
    }

    //Encripta con md5
    const passworEncriptado = crypto.createHash('md5').update(requestBody.password).digest('hex')

    const sql = 'UPDATE users SET first_name = ?, last_name = ?, date_birth = ?, mobile_phone = ?, email = ?, password = ?, address = ? WHERE id = ?';
    connection.query(sql, [data.first_name, data.last_name, data.date_birth, data.mobile_phone, data.email, passworEncriptado, data.address, event.pathParameters.id_user], (error, row) => {
        
        //Validacion de campos tipo y longitud
        const validateId = functions.validateType('int', event.pathParameters.id_user)
        const validateFirstName = functions.validateType('varchar', data.first_name)
        const validateLastName = functions.validateType('varchar', data.last_name)
        const validatePassword = functions.validateLength(120, requestBody.password)
        const validateMobilePhone = functions.validateType('varchar', requestBody.mobile_phone)
        const validateEmail = functions.validateType('varchar', requestBody.email)
        if (!validateId || !validateFirstName || !validateLastName || !validatePassword || !validateMobilePhone || !validateEmail) {
            const response = new LambdaResponse(400, { 
                success: true, 
                data: 'The parameters do not meet the required data type or length' 
            }, headersPut);
            callback(null, response);
        }

        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { success: true, data: data }, headersPut);
            callback(null, response);
          }
    });
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql, [event.pathParameters.id_user], (error, row) => {

        //Validacion de campo tipo
        const validateId = functions.validateType('int', event.pathParameters.id_user)
        if (!validateId) {
            const response = new LambdaResponse(400, { 
                success: true, 
                data: 'Invalid id_user' 
            }, headersDelete);
            callback(null, response);
        }
        
        if (error) {
            const response = new LambdaResponse(500, error);
            callback(response);
          } else {
            const response = new LambdaResponse(200, { success: true, data: row }, headersDelete);
            callback(null, response);
          }
    });
};