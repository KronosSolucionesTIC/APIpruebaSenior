const lambda = require('../Crud/users.js'); // Importar el archivo que contiene la función a probar

// Crear un objeto de contexto simulando el contexto de ejecución de la función
const context = {
    callbackWaitsForEmptyEventLoop: true
  };

describe('get function', () => {
  test('should return all users', () => {

    lambda.get(context, (err, response) => {
      expect(err).toBe(null);
      expect(response.statusCode).toBe(200);

      const responseBody = JSON.parse(response.body);
      expect(responseBody.success).toBe(true);

      done(); // Indicar que la prueba ha finalizado
    });
  });
});