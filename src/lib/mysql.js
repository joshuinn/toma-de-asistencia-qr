import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  database: process.env.DATABASE,
});

/*
No permite la minimizacion para el build
import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: "",
        port: 3306,
        database: process.env.DATABASE
    }
})
*/
