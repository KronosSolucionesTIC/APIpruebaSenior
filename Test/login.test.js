const lambda = require('../Crud/users.js'); // Importar el archivo que contiene la función a probar
const jwt = require('jsonwebtoken');

// Crear un objeto de prueba simulando el evento que activa la función
const event = {
  body: JSON.stringify({
    mobile_phone: 'prueba',
    password: 'prueba'
  })
};

// Crear un objeto de contexto simulando el contexto de ejecución de la función
const context = {
  callbackWaitsForEmptyEventLoop: true
};

describe('Login', () => {
  test('should return 200 status code and access token on successful login', (done) => {
    const expectedToken = jwt.sign({ mobile_phone: 'prueba', password: 'prueba' }, 'secreto');

    lambda.login(event, context, (err, response) => {
      expect(err).toBe(null);
      expect(response.statusCode).toBe(200);

      const responseBody = JSON.parse(response.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.access_token).toBe(expectedToken);
      expect(responseBody.token_type).toBe('bearer');

      done(); // Indicar que la prueba ha finalizado
    });
  });
});