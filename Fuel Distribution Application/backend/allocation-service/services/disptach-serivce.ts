import mysqlConnection from "../config/mysql-conection";
import logger from "../logger/logger";

export const create = (
  orderId: number,
  dispatchDate: Date,
  quantity: number
) => {
  const queryString =
    "INSERT INTO dispatch(dispatchedDate,order_id,quantity) VALUES ?";
  var values = [[dispatchDate, orderId, quantity]];
  mysqlConnection.query(queryString, [values], (err: any, result: any) => {
    if (err) throw err;
    logger.info("Saving dispatched order to the database");
  });
};
