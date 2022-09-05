
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
      private readonly kafka=new Kafka({
         brokers: [process.env.BROKER_URL]
    });

    private readonly consumers:Consumer[]=[];

    async consume(topic:ConsumerSubscribeTopic,config:ConsumerRunConfig){
        const consumer=this.kafka.consumer({groupId:process.env.CONSUMER_GROUP});
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect
        }
    }
}