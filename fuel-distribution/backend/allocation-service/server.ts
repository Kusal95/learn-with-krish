import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./logger/logger";
import routes from "./routes";
import allocationListener from "./kafka/allocation-consumer";
import allocationResponseListener from "./kafka/allocation-response-consumer";

dotenv.config();
const port = process.env.SERVICE_PORT;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
// console.log(listEndpoints(app));

allocationListener().catch((e) =>
  logger.error("error on subscribing to topic")
);
allocationResponseListener().catch((e) =>
  logger.error("error on subscribing to topic")
);

app.listen(port, () => {
  logger.info(`New Connection service running on port ${port}`);
});
