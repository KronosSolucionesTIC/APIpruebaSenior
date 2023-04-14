const lambda = require("../Crud/users.js"); // Importa el archivo que contiene la función a probar

describe("Login", () => {
  test("should return user data when valid mobile_phone and password is provided", () => {
    const event = {
      body: JSON.stringify({
        mobile_phone: "prueba", 
        password: "prueba"
      }),
    };
    const context = {};
    const callback = (error, response) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.data).toBeDefined();
      expect(Array.isArray(body.data)).toBe(false);
      expect(body.data.length).toBe(15);
      const user = body.data;
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("first_name");
      expect(user).toHaveProperty("last_name");
      expect(user).toHaveProperty("date_birth");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("mobile_phone");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("address");
    };

    lambda.login(event, context, callback);
  });
});