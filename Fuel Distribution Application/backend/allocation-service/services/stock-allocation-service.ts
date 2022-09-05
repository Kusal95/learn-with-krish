import { StockAllocation } from "./../types/stock-allocation";
import mysqlConnection from "../config/mysql-conection";
import logger from "../logger/logger";
import { RowDataPacket } from "mysql2";
import console from "console";

export const findOne = (orderId: number, callback: Function) => {
  const queryString = "SELECT * FROM stock_allocation WHERE order_id=?";

  mysqlConnection.query(queryString, orderId, (err: any, result: any) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];

    const allocatedOrder: StockAllocation = {
      idstockallocation: row.idstockallocation,
      idstock: row.idstock,
      order_id: row.order_id,
      quantity: row.quantity,
    };
    callback(null, allocatedOrder);
  });
};

export const create = (
  stockAllocation: StockAllocation,
  callback: Function
) => {
  const queryString =
    "INSERT INTO stock_allocation (idstock, order_id, quantity) VALUES ?";
  var values = [
    [
      stockAllocation.idstock,
      stockAllocation.order_id,
      stockAllocation.quantity,
    ],
  ];
  mysqlConnection.query(queryString, [values], (err: any, result: any) => {
    if (err) {
      callback(err);
    }
    callback(null, result);
    logger.info("Saving allocated order to the database");
  });
};

export const sumOfAllocatedStock = (idstock: number, callback: Function) => {
  const queryString =
    "SELECT SUM(quantity) AS allocatedStock FROM stock_allocation WHERE idstock=?";
  mysqlConnection.query(queryString, idstock, (err: any, result: any) => {
    if (err) {
      callback(err);
    }

    const allocatedStock = result[0].allocatedStock;
    callback(null, allocatedStock);
  });
};

export const deleteAllocation = (orderId: number) => {
  const queryString = "DELETE FROM stock_allocation WHERE order_id=?";
  mysqlConnection.query(queryString, orderId, function (err: any, result: any) {
    if (err) throw err;
    logger.info("Removing allocated order from database");
  });
};
