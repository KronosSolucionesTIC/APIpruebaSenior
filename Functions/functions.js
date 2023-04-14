/**
 * Valida un valor proporcionado según un tipo de dato especificado.
 *
 * @param {string} type - El tipo de dato esperado (debe ser "int" o "varchar").
 * @param {any} value - El valor que se desea validar.
 * @returns {boolean} `true` si el valor proporcionado es del tipo especificado, `false` en caso contrario.
 */
module.exports.validateType = function (type, value) {
  switch (type) {
    case "int":
      if (!value || isNaN(parseInt(value))) {
        return false;
      }
      return true;
    case "varchar":
      if (typeof value === "string") {
        return true;
      }
      return false;
    default:
      return true;
  }
};

/**
 * Valida si un valor dado tiene una longitud menor o igual a la longitud especificada.
 *
 * @param {number} length - La longitud máxima permitida.
 * @param {string} value - El valor a ser validado.
 * @returns {boolean} - True si el valor es menor o igual a la longitud especificada, de lo contrario false.
 */
module.exports.validateLength = function (length, value) {
  return value.length <= length;
};