import { Router, Request, Response } from "express";
import kafkaProducer from "../kafka/kafka-producer";
import { Event } from "../types/event";

const dispatchRouter = Router();

dispatchRouter.post("/", (req: Request, res: Response) => {
  const key = req.body.key;
  const scheduleEvent: Event = {
    from: process.env.SERVICE_NAME || "error",
    type: "NEW-DISPATCH",
    key: key,
    status: "PENDING",
    message: "",
    data: "{}",
  };
  kafkaProducer(process.env.SCHEDULE_TOPIC || "", scheduleEvent, key);

  res.send("POST request to the homepage");
});

export default dispatchRouter;
