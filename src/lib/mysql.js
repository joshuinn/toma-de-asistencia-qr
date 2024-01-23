// Importar la biblioteca mysql2/promise para interactuar con la base de datos de MySQL de manera asincrónica.
import mysql from "mysql2/promise";

// Crear una conexión a la base de datos utilizando la información de conexión proporcionada a través de variables de entorno.
export const conn = await mysql.createConnection({
  host: process.env.HOST_DB,          // Host de la base de datos
  user: process.env.USER_DB,          // Usuario de la base de datos
  password: process.env.PASSWORD_DB,  // Contraseña de la base de datos
  port: process.env.PORT_DB,          // Puerto de la base de datos
  database: process.env.DATABASE,     // Nombre de la base de datos
});

// Nota: Asegúrate de haber configurado correctamente las variables de entorno antes de ejecutar este código.
// Estas variables deben contener la información de conexión necesaria para acceder a tu base de datos MySQL.
