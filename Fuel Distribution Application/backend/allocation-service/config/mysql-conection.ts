import logger from "../logger/logger";
const mysql = require("mysql2");
require("dotenv").config();

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "allocation_service",
  port: "3307",
  multipleStatements: true,
});

mysqlConnection.connect((err: any) => {
  if (!err) {
    logger.info("Mysql Connected");
  } else {
    logger.error("Mysql Connection Failed");
  }
});

export default mysqlConnection;
