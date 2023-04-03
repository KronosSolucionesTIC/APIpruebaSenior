class LambdaResponse {
    constructor(statusCode, body, headers = {}) {
      this.statusCode = statusCode;
      this.body = JSON.stringify(body);
      this.headers = headers;
    }
  }

module.exports = LambdaResponse;