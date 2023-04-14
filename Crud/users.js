const { headersPost, headersGet, headersPut, headersDelete } = require('../Common/Constants.js');
const UsersQueryHandler = require('../Handler/UsersQueryHandler.js');

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const requestBody = JSON.parse(event.body);
    const data = {
        mobile_phone : requestBody.mobile_phone,
        password : requestBody.password
    }

    const sql = 'SELECT id, first_name, last_name, session_active, date_birth, email, mobile_phone, password, address FROM users WHERE mobile_phone = ? AND password = ?';
    const result = new UsersQueryHandler(sql, [data.mobile_phone, data.password, 1], callback, headersPost)
    result.handleLogin();
};

module.exports.get = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT id, document_type_id, document_number, first_name, last_name, date_birth, mobile_phone, email, address, city_id, session_active FROM users';
    const result = new UsersQueryHandler(sql, [1], callback, headersGet);
    result.handleGet();
}

module.exports.getUser = (event, context, callback) => {  
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT id, document_type_id, document_number, first_name, last_name, date_birth, mobile_phone, email, address, city_id, session_active FROM users WHERE id = ?';
    const result = new UsersQueryHandler(sql, [ event.pathParameters.id_user, 1 ], callback, headersGet);
    result.handleGetUser();
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

    const sql = 'INSERT INTO users (first_name, last_name, date_birth, mobile_phone, email, password, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const result = new UsersQueryHandler(sql, [data.first_name, data.last_name, data.date_birth, data.mobile_phone, data.email, data.password, data.address, 1], callback, headersPost)
    result.handleCreate();
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

    const sql = 'UPDATE users SET first_name = ?, last_name = ?, date_birth = ?, mobile_phone = ?, email = ?, password = ?, address = ? WHERE id = ?';
    const result = new UsersQueryHandler(sql, [data.first_name, data.last_name, data.date_birth, data.mobile_phone, data.email, data.password, data.address, event.pathParameters.id_user], callback, headersPut)
    result.handleUpdate();
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = new UsersQueryHandler(sql, [ event.pathParameters.id_user, 1 ], callback, headersDelete);
    result.handleDelete();
};