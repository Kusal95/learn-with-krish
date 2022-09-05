import { Router } from "express";
import dispatchRouter from "./routes/dispatch";
import stockRouter from "./routes/stock";
const routes = Router();

const apiUrl = "/allocation-api/v1";

routes.use(`${apiUrl}/disptach`, dispatchRouter);
routes.use(`${apiUrl}/stock`, stockRouter);

export default routes;
