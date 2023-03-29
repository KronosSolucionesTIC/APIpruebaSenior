const lambda = require("../Crud/users.js"); // Importa el archivo que contiene la función a probar

describe("update", () => {
  test("should update a user", () => {
    const event = {
      pathParameters: { id_user: "1" },
      body: JSON.stringify({
        first_name: "John",
        last_name: "Doe",
        date_birth: "1990-01-01",
        mobile_phone: "1234567890",
        email: "john.doe@example.com",
        password: "password123",
        address: "123 Main St",
      }),
    };
    const context = {};
    const callback = (error, response) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.first_name).toBe("John");
      expect(body.data.last_name).toBe("Doe");
      expect(body.data.date_birth).toBe("1990-01-01");
      expect(body.data.mobile_phone).toBe("1234567890");
      expect(body.data.email).toBe("john.doe@example.com");
      expect(body.data.password).not.toBe("password123");
      expect(body.data.address).toBe("123 Main St");
    };

    lambda.update(event, context, callback);
  });
});