import { Stock } from "./../types/stock";
import mysqlConnection from "../config/mysql-conection";
import logger from "../logger/logger";
import { RowDataPacket } from "mysql2";

export const create = (stock: Stock, callback: Function) => {
  const queryString = "INSERT INTO stock (stockQuantity, fuelType) VALUES ?";
  var values = [[stock.stockQuantity, stock.fuelType]];
  mysqlConnection.query(queryString, [values], (err: any, result: any) => {
    if (err) {
      callback(err);
    }
    callback(null, result);
    logger.info("Saving new stock to the database");
  });
};

export const getAll = (callback: Function) => {
  const queryString = "SELECT * FROM stock";

  mysqlConnection.query(queryString, (err: any, result: any) => {
    if (err) {
      callback(err);
    }
    callback(null, result);
  });
};

export const findOneByFuelType = (fuelType: string, callback: Function) => {
  const queryString = "SELECT * FROM stock WHERE fuelType=?";

  mysqlConnection.query(queryString, fuelType, (err: any, result: any) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    if (row) {
      const stock: Stock = {
        idstock: row.idstock,
        stockQuantity: row.stockQuantity,
        fuelType: row.fuelType,
      };

      callback(null, stock);
    } else {
      callback(null, undefined);
    }
  });
};

export const findOneById = (stockId: number, callback: Function) => {
  const queryString = "SELECT * FROM stock WHERE idstock=?";

  mysqlConnection.query(queryString, stockId, (err: any, result: any) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const stock: Stock = {
      idstock: row.idstock,
      stockQuantity: row.stockQuantity,
      fuelType: row.fuelType,
    };

    callback(null, stock);
  });
};

export const update = (
  stockId: number,
  newStock: number,
  callback: Function
) => {
  const queryString = "UPDATE stock SET stockQuantity =? WHERE idstock = ?";
  const values = [newStock, stockId];
  mysqlConnection.query(queryString, values, (err: any, result: any) => {
    if (err) throw err;
    logger.info("stock updated");
    callback(result);
  });
};
