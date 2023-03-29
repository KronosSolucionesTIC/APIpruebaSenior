const lambda = require("../Crud/users.js"); // Importa el archivo que contiene la función a probar

describe("getUser", () => {
  test("should return user data when valid id_user is provided", () => {
    const event = { pathParameters: { id_user: "2" } };
    const context = {};
    const callback = (error, response) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data).toBeDefined();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBe(1);
      const user = body.data[0];
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("first_name");
      expect(user).toHaveProperty("last_name");
      expect(user).toHaveProperty("date_birth");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("mobile_phone");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("address");
    };

    lambda.getUser(event, context, callback);
  });

  test("should return error when invalid id_user is provided", () => {
    const event = { pathParameters: { id_user: "abc" } };
    const context = {};
    const callback = (error, response) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeDefined();
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.data).toBe('Invalid id_user');
    };

    lambda.getUser(event, context, callback);
  });
});