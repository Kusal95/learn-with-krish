import { Stock } from "../types/stock";
import { orderData } from "../types/order-data";
import { Kafka } from "kafkajs";
import kafkaProducer from "./kafka-producer";
import { Event } from "../types/event";

import * as stockService from "../services/stock-service";
import * as stockAllocationService from "../services/stock-allocation-service";
import { StockAllocation } from "../types/stock-allocation";
import logger from "../logger/logger";

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKER_URL || "localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: process.env.ALLOCATION_CONSUMER_GROUP || "default",
});

const allocationListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.ALLOCATION_TOPIC || "error",
    fromBeginning: true,
  });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      logger.info(
        `Allocation topic listener received message from ${topic}: message : ${message.value?.toString()}`
      );

      const messageValue: Event = JSON.parse(message.value?.toString() || "{}");
      const type: string = messageValue.type;

      //   if event type is new order
      if (type == "NEW-ORDER") {
        const key: string = messageValue.key;
        const orderData: orderData = JSON.parse(messageValue.data);
        const orderId: number = orderData.orderId;
        const fuelType: string = orderData.fuelType;
        const quantity: number = orderData.quantity;

        //check stock availability
        stockService.findOneByFuelType(fuelType, (err: Error, stock: Stock) => {
          //if available
          if (stock) {
            //check the sum of allocated stock for specific fuel type
            stockAllocationService.sumOfAllocatedStock(
              stock.idstock || 0,
              (err: Error, totalAllocatedStock: number) => {
                const availableStockForAllocation =
                  totalAllocatedStock === null
                    ? stock.stockQuantity
                    : stock.stockQuantity - totalAllocatedStock;

                // if requested quantity is less than avaiable stock,then order will be allocated
                if (quantity <= availableStockForAllocation) {
                  const stockAllocation: StockAllocation = {
                    idstock: stock.idstock || 0,
                    order_id: orderId,
                    quantity: quantity,
                  };

                  stockAllocationService.create(
                    stockAllocation,
                    (err: Error, result: any) => {
                      produceEvent(
                        process.env.SERVICE_NAME || "error",
                        "ALLOCATION_COMPLETE",
                        key,
                        "SUCCESS",
                        "Order allocated",
                        "{}",
                        process.env.ORDER_RESPONSE_TOPIC || "error"
                      );

                      produceEvent(
                        process.env.SERVICE_NAME || "error",
                        "NEW-SCHEDULE",
                        key,
                        "PENDING",
                        "",
                        JSON.stringify(orderData),
                        process.env.SCHEDULE_TOPIC || "error"
                      );
                    }
                  );
                } else {
                  produceEvent(
                    process.env.SERVICE_NAME || "error",
                    "ALLOCATION_FAILED",
                    key,
                    "FAILED",
                    "Not enought stock for allocate",
                    JSON.stringify(orderData),
                    process.env.ORDER_RESPONSE_TOPIC || "error"
                  );
                }
              }
            );
          } else {
            produceEvent(
              process.env.SERVICE_NAME || "error",
              "ALLOCATION_FAILED",
              key,
              "FAILED",
              "No stock for allocate",
              JSON.stringify(orderData),
              process.env.ORDER_RESPONSE_TOPIC || "error"
            );
          }
        });
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

export default allocationListener;
