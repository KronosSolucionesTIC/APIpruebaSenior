const lambda = require('../Crud/users.js'); // Importa el archivo que contiene la función a probar

describe('update', () => {
  test('should return user data when valid id_user is provided', () => {
    const event = { pathParameters: { id_user: '1' } }
    const context = {}
    const callback = (error, response) => {
      expect(error).toBeNull()
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeDefined()
      expect(Array.isArray(body.data)).toBe(true)
      expect(body.data.length).toBe(0)
      const user = body.data[0]
      expect(user).toHaveProperty('fieldCount')
      expect(user).toHaveProperty('affectedRows')
      expect(user).toHaveProperty('insertId')
      expect(user).toHaveProperty('serverStatus')
      expect(user).toHaveProperty('warningCount')
      expect(user).toHaveProperty('message')
      expect(user).toHaveProperty('protocol41')
      expect(user).toHaveProperty('changedRows')
    }

    lambda.delete(event, context, callback)
  })
});