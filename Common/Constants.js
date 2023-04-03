function createHeaders(method) {
    return {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": method
    };
  }
  
  const headersGet = createHeaders("GET");
  const headersPost = createHeaders("POST");
  const headersPut = createHeaders("PUT");
  const headersDelete = createHeaders("DELETE");
  
  module.exports = {
    headersGet,
    headersPost,
    headersPut,
    headersDelete
  };