import { Kafka, Partitioners, Producer } from "kafkajs";
import logger from "../logger/logger";
import { Event } from "../types/event";
import dotenv from "dotenv";

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKER_URL || "localhost:9092"],
});

const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

const kafkaProducer = async (topic: string, payload: Event, key?: string) => {
  await producer
    .connect()
    .catch((e) => console.error("error on connecting kafka", e));

  if (key) {
    logger.info(
      `sending message to : ${topic} : message : ${JSON.stringify(payload)}`
    );
    await new Promise((f) => setTimeout(f, 5000));
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
};
export default kafkaProducer;
