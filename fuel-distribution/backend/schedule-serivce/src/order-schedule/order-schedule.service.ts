import { OrderData } from 'src/model/orderData';
import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ProducerService } from 'src/kafka/producer.service';
import { OrderScheduleEntity } from './order-schedule.entity';
import { OrderScheduleServiceRepository } from './order-schedule-repository';

@Injectable()
export class OrderScheduleService {
  private readonly Logger = new Logger(OrderScheduleService.name);

  constructor(
    private orderScheduleRepository: OrderScheduleServiceRepository,
  ) {}

  async newOrderSchedule(orderData: OrderData, generatedKey: string) {
    const randomDay = Math.floor(Math.random() * 7) + 1;
    const scheduledDate = dayjs().add(randomDay, 'day').format('YYYY-MM-DD');

    const orderScheduleEntity = new OrderScheduleEntity();
    orderScheduleEntity.orderId = orderData.orderId;
    orderScheduleEntity.generatedKey = generatedKey;
    orderScheduleEntity.scheduledDate = new Date(scheduledDate);

    const response = this.orderScheduleRepository
      .createScheduleOrder(orderScheduleEntity)
      .catch((err) => {
        this.Logger.error(err);
      });
    this.Logger.log('scheduled date inserted into DB');
    return response;
  }

  async getOrderScheduleByKey(generatedKey: string) {
    return this.orderScheduleRepository
      .findOneByGeneratedKey(generatedKey)
      .catch((err) => {
        this.Logger.error(err);
      });
  }
}
