const LoginHandler = require('../Handler/LoginHandler.js');
const GetHandler = require('../Handler/GetHandler.js');
const GetUserHandler = require('../Handler/GetUserHandler.js');
const CreateHandler = require('../Handler/CreateHandler.js');
const UpdateHandler = require('../Handler/UpdateHandler.js');
const DeleteHandler = require('../Handler/DeleteHandler.js');

class UsersQueryHandler {
  constructor(sql, params, callback, method) {
    this.sql = sql;
    this.params = params;
    this.callback = callback;
    this.method = method;
  }

  handleLogin() {
    const loginHandler = new LoginHandler(this.sql, this.params, this.method, this.callback);
    loginHandler.handle();
  }

  handleGet() {
    const getHandler = new GetHandler(this.sql, this.params, this.method, this.callback);
    getHandler.handle();
  }

  handleGetUser() {
    const getUserHandler = new GetUserHandler(this.sql, this.params, this.method, this.callback);
    getUserHandler.handle();
  }

  handleCreate() {
    const createHandler = new CreateHandler(this.sql, this.params, this.method, this.callback);
    createHandler.handle();
  }  

  handleUpdate() {
    const updateHandler = new UpdateHandler(this.sql, this.params, this.method, this.callback);
    updateHandler.handle();
  } 

  handleDelete() {
    const sql = 'SELECT first_name, last_name, date_birth, mobile_phone, password, address FROM users WHERE id = ?'
    const deleteHandler = new DeleteHandler(this.sql, this.params, this.method, this.callback, sql);
    deleteHandler.handle();
  } 
}

module.exports = UsersQueryHandler;