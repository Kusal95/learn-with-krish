import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'src/kafka/kafka.module';
import { OrderScheduleServiceRepository } from './order-schedule-repository';
import { OrderScheduleEntity } from './order-schedule.entity';
import { OrderScheduleService } from './order-schedule.service';

@Module({
  imports:[TypeOrmModule.forFeature([OrderScheduleEntity])],
  providers: [OrderScheduleService,OrderScheduleServiceRepository],
  exports:[OrderScheduleService]
})
export class OrderScheduleModule {}
