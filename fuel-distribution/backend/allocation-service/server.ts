import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./logger/logger";
import kafkaListener from "./kafka/kafka-consumer";
import routes from "./routes";

dotenv.config();
const port = process.env.SERVICE_PORT;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
// console.log(listEndpoints(app));

kafkaListener().catch((e) => logger.error("error on subscribing to topic"));

app.listen(port, () => {
  logger.info(`New Connection service running on port ${port}`);
});
