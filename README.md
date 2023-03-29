# APIpruebaSenior
Prueba Técnica de Conocimientos Desarrollador Senior

# Prueba de los Endpoints

1. En la carpeta Postman importar las collection de los Endpoints y el Environment.
2. En el Enviroment estan las variables {{path}} que contiene la ruta de consumo, y {{token}} que contiene
   el APIKEY utilizado en algunos endpoints.
3. En cada uno de los Endpoint dar click en enviar o send para probarlos.
4. Los endpoints GetUser, CreateUser, UpdateUser, DeleteUser utilizan token 'x-api-key', este se encuentra
   en el Environment como variable {{token}}

# Tecnologias utilizadas

1. Lambdas de AWS
2. Node.js
3. Serverless (Framework para despliegue con AWS)
4. RDS (Instancia de MYSQL)
5. jsonwebtoken -> Para crear token tipo JWT
6. crypto -> Encriptacion tipo MD5 para contraseña
7. jest -> Pruebas unitarias

# Proceso para desplegar (Si se quiere volver a desplegar)

1. Descargar repositorio
2. Tener previamente instalado Node.js
3. Ejecutar en la terminal -> npm install
4. En el archivo serverless.yml se encuentran las opciones de despliegue (profile, stage, functions)
5. Si se desea crear la BD en la carpeta scripts archivo BD.sql se encuentra el script
6. Si cambian los datos de conexion al RDS en la carpeta connection archivo connection.js se configuran
5. Ejecutar en la terminal -> sls deploy o serverless deploy

# Oportunidades de mejora

1. Se pueden crear funciones transversales para la validacion de los campos por ejemplo con libreria Joi
2. Se pueden crear funciones transversales para los callback
3. Se puede Dockerizar
4. Cubrir todos los metodos de las unitarias