const connection = require("../connection");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const functions = require("../Functions/functions.js");

module.exports.login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const requestBody = JSON.parse(event.body);
  const data = {
    mobile_phone: requestBody.mobile_phone,
    password: requestBody.password,
  };

  //Decodifica campos
  const mobilePhoneDecodificado = decodeURIComponent(data.mobile_phone);
  const passwordDecodificado = decodeURIComponent(data.password);

  //Encripta con md5
  const passworEncriptado = crypto
    .createHash("md5")
    .update(passwordDecodificado)
    .digest("hex");

  //Genera token jwt
  const token = jwt.sign(data, "secreto");

  const sql =
    "SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users WHERE mobile_phone = ? AND password = ?";
  connection.query(
    sql,
    [mobilePhoneDecodificado, passworEncriptado],
    (error, row) => {
      //Validacion de campos tipo y longitud
      const validateMobilePhone = functions.validateType(
        "varchar",
        requestBody.mobile_phone
      );
      const validatePassword = functions.validateLength(
        120,
        requestBody.password
      );
      if (!validateMobilePhone || !validatePassword) {
        callback(null, {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
          body: JSON.stringify({
            success: false,
            data: JSON.stringify("Invalid mobile or password"),
          }),
        });
      }

      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error),
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
          body: JSON.stringify({
            success: true,
            data: row,
            access_token: token,
            token_type: "bearer",
          }),
        });
      }
    }
  );
};

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const sql =
    "SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users";
  connection.query(sql, (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({
          success: true,
          data: row,
        }),
      });
    }
  });
};

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql =
    "SELECT id, first_name, last_name, date_birth, email, mobile_phone, password, address FROM users WHERE id = ?";
  connection.query(sql, [event.pathParameters.id_user], (error, row) => {
    //Validacion de campo tipo
    const validateId = functions.validateType(
      "int",
      event.pathParameters.id_user
    );
    if (!validateId) {
      callback(null, {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({
          success: false,
          data: JSON.stringify('Invalid id_user'),
        }),
      });
    }

    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({
          success: true,
          data: row,
        }),
      });
    }
  });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const requestBody = JSON.parse(event.body);
  const data = {
    first_name: requestBody.first_name,
    last_name: requestBody.last_name,
    date_birth: requestBody.date_birth,
    mobile_phone: requestBody.mobile_phone,
    email: requestBody.email,
    password: requestBody.password,
    address: requestBody.address,
  };

  //Encripta con md5
  const passworEncriptado = crypto
    .createHash("md5")
    .update(requestBody.password)
    .digest("hex");

  const sql =
    "INSERT INTO users (first_name, last_name, date_birth, mobile_phone, email, password, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      data.first_name,
      data.last_name,
      data.date_birth,
      data.mobile_phone,
      data.email,
      passworEncriptado,
      data.address,
    ],
    (error, row) => {
      //Validacion de campos tipo y longitud
      const validateFirstName = functions.validateType(
        "varchar",
        data.first_name
      );
      const validateLastName = functions.validateType(
        "varchar",
        data.last_name
      );
      const validatePassword = functions.validateLength(
        120,
        requestBody.password
      );
      const validateMobilePhone = functions.validateType(
        "varchar",
        requestBody.mobile_phone
      );
      const validateEmail = functions.validateType(
        "varchar",
        requestBody.email
      );
      if (
        !validateFirstName ||
        !validateLastName ||
        !validatePassword ||
        !validateMobilePhone ||
        !validateEmail
      ) {
        callback(null, {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
          body: JSON.stringify({
            success: false,
            data: JSON.stringify(
              "The parameters do not meet the required data type or length"
            ),
          }),
        });
      }

      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error),
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
          body: JSON.stringify({
            success: true,
            data: data,
          }),
        });
      }
    }
  );
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const requestBody = JSON.parse(event.body);
  const data = {
    first_name: requestBody.first_name,
    last_name: requestBody.last_name,
    date_birth: requestBody.date_birth,
    mobile_phone: requestBody.mobile_phone,
    email: requestBody.email,
    password: requestBody.password,
    address: requestBody.address,
  };

  //Encripta con md5
  const passworEncriptado = crypto
    .createHash("md5")
    .update(requestBody.password)
    .digest("hex");

  const sql =
    "UPDATE users SET first_name = ?, last_name = ?, date_birth = ?, mobile_phone = ?, email = ?, password = ?, address = ? WHERE id = ?";
  connection.query(
    sql,
    [
      data.first_name,
      data.last_name,
      data.date_birth,
      data.mobile_phone,
      data.email,
      passworEncriptado,
      data.address,
      event.pathParameters.id_user,
    ],
    (error, row) => {
      //Validacion de campos tipo y longitud
      const validateId = functions.validateType(
        "int",
        event.pathParameters.id_user
      );
      const validateFirstName = functions.validateType(
        "varchar",
        data.first_name
      );
      const validateLastName = functions.validateType(
        "varchar",
        data.last_name
      );
      const validatePassword = functions.validateLength(
        120,
        requestBody.password
      );
      const validateMobilePhone = functions.validateType(
        "varchar",
        requestBody.mobile_phone
      );
      const validateEmail = functions.validateType(
        "varchar",
        requestBody.email
      );
      if (
        !validateId ||
        !validateFirstName ||
        !validateLastName ||
        !validatePassword ||
        !validateMobilePhone ||
        !validateEmail
      ) {
        callback(null, {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
          body: JSON.stringify({
            success: false,
            data: JSON.stringify(
              "The parameters do not meet the required data type or length"
            ),
          }),
        });
      }

      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error),
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT",
          },
          body: JSON.stringify({
            success: true,
            data: data,
          }),
        });
      }
    }
  );
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "DELETE FROM users WHERE id = ?";
  connection.query(sql, [event.pathParameters.id_user], (error, row) => {
    //Validacion de campo tipo
    const validateId = functions.validateType(
      "int",
      event.pathParameters.id_user
    );
    if (!validateId) {
      callback(null, {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({
          success: false,
          data: JSON.stringify("Invalid id_user"),
        }),
      });
    }

    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE",
        },
        body: JSON.stringify({
          success: true,
          data: row,
        }),
      });
    }
  });
};
