import { Kafka } from "kafkajs";
import logger from "../logger/logger";
import { Event } from "../types/event";
import dayjs from "dayjs";
import * as stockAllocationService from "../services/stock-allocation-service";
import * as dispatchService from "../services/disptach-serivce";
import * as stockService from "../services/stock-service";
import { StockAllocation } from "../types/stock-allocation";
import { Stock } from "../types/stock";
import kafkaProducer from "./kafka-producer";

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKER_URL || "localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: process.env.ALLOCATION_RESPONSE_CONSUMER_GROUP || "default",
});

const allocationResponseListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.ALLOCATION_RESPONSE_TOPIC || "error",
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      logger.info(
        `Allocation response topic listener received message from ${topic}: message : ${message.value?.toString()}`
      );

      const messageValue: Event = JSON.parse(message.value?.toString() || "{}");
      const type: string = messageValue.type;

      if (type == "SCHEDULED") {
        const key: string = messageValue.key;
        const scheduledData = JSON.parse(messageValue.data);
        const orderId = scheduledData.orderId;
        const today = dayjs().format("YYYY-MM-DD");

        stockAllocationService.findOne(
          orderId,
          (err: Error, allocatedStock: StockAllocation) => {
            if (allocatedStock) {
              dispatchService.create(
                orderId,
                new Date(today),
                allocatedStock.quantity
              );

              stockService.findOneById(
                allocatedStock.idstock,
                (err: Error, stock: Stock) => {
                  if (stock) {
                    const updatedStock =
                      stock.stockQuantity - allocatedStock.quantity;
                    stockService.update(
                      stock.idstock || 0,
                      updatedStock,
                      (result: any) => {
                        stockAllocationService.deleteAllocation(orderId);
                      }
                    );
                  }
                }
              );
            }
          }
        );

        produceEvent(
          process.env.SERVICE_NAME || "error",
          "DISPATCH_COMPLETE",
          key,
          "SUCCESS",
          "Order dispatched",
          JSON.stringify({
            dispatchedDate: today,
          }),
          process.env.ORDER_RESPONSE_TOPIC || "error"
        );
      }

      await consumer.commitOffsets([
        {
          topic,
          partition,
          offset: (Number(message.offset) + 1).toString(),
        },
      ]);
    },
  });
};

const produceEvent = async (
  from: string,
  type: string,
  key: string,
  status: string,
  message: string,
  data: string,
  topic: string
) => {
  const event: Event = {
    from: from,
    type: type,
    key: key,
    status: status,
    message: message,
    data: data,
  };

  kafkaProducer(topic, event, key);
};

export default allocationResponseListener;
