import { Stock } from "./../types/stock";
import { Router, Request, Response } from "express";
import * as stockService from "../services/stock-service";

const stockRouter = Router();

stockRouter.post("/", (req: Request, res: Response) => {
  const newStock: Stock = req.body;

  stockService.findOneByFuelType(
    newStock.fuelType,
    (err: Error, stock: Stock) => {
      if (stock) {
        const newQuantity = stock.stockQuantity + newStock.stockQuantity;
        stockService.update(
          stock.idstock || 0,
          newQuantity,
          (err: Error, stock: Stock) => {
            res.send(stock);
          }
        );
      } else {
        stockService.create(newStock, (err: Error, stock: Stock) => {
          res.send(stock);
        });
      }
    }
  );
});

stockRouter.get("/", (req: Request, res: Response) => {
  stockService.getAll((err: Error, result: Stock[]) => {
    res.send(result);
  });
});

export default stockRouter;
