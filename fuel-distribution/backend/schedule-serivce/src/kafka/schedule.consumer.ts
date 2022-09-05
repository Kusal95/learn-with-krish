import { ScheduleData } from './../model/scheduleData';
import {
  Injectable,
  OnModuleInit,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Event } from 'src/model/event';
import { OrderScheduleService } from 'src/order-schedule/order-schedule.service';
import { ConsumerService } from './consmer.service';
import { OrderData } from 'src/model/orderData';
import { ProducerService } from './producer.service';
import { OrderScheduleEntity } from 'src/order-schedule/order-schedule.entity';

@Injectable()
export class ScheduleConsumer implements OnModuleInit {
  private readonly Logger = new Logger(ScheduleConsumer.name);

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly orderScheduleService: OrderScheduleService,
    private readonly producerService: ProducerService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: process.env.SCHEDULE_TOPIC },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const newMessage: Event = JSON.parse(
            message.value?.toString() || '{}',
          );
          if (newMessage.from !== process.env.SERVICE_NAME) {
            this.Logger.log(`Listener received : ${message.value?.toString()}`);

            if (newMessage.type == 'NEW-SCHEDULE') {
              const orderData: OrderData = JSON.parse(newMessage.data);
              const response = this.orderScheduleService.newOrderSchedule(
                orderData,
                newMessage.key,
              );
              this.scheduleOrder(response);
            } else if (newMessage.type == 'NEW-DISPATCH') {
              const response = this.orderScheduleService.getOrderScheduleByKey(
                newMessage.key,
              );
              this.isOrderScheduled(response);
            }
          } else {
            this.Logger.log(
              `Listener received : Event is not related. process ignored`,
            );
          }
        },
      },
    );
  }

  async scheduleOrder(response) {
    await response.then((result: OrderScheduleEntity) => {
      if (result) {
        const scheduleData: ScheduleData = {
          scheduleId: result.id,
          scheduledDate: result.scheduledDate.toISOString().split('T')[0],
        };
        const event: Event = {
          from: process.env.SERVICE_NAME,
          type: 'SCHEDULE_COMPLETE',
          key: result.generatedKey,
          status: 'SUCCESS',
          message: 'Order Scheduled',
          data: JSON.stringify(scheduleData),
        };
        this.producerService.produce({
          topic: process.env.ORDER_RESPONSE_TOPIC,
          messages: [{ value: JSON.stringify(event) }],
        });
      }
    });
  }

  async isOrderScheduled(response) {
    await response.then((result: OrderScheduleEntity[]) => {
      if (result) {
        const event: Event = {
          from: process.env.SERVICE_NAME,
          type: 'SCHEDULED',
          key: result[0].generatedKey,
          status: 'SUCCESS',
          message: '',
          data: JSON.stringify(result[0]),
        };
        this.producerService.produce({
          topic: process.env.ALLOCATION_RESPONSE_TOPIC,
          messages: [{ value: JSON.stringify(event) }],
        });
      }
    });
  }
}
