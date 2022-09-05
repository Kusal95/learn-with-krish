import { Module } from '@nestjs/common';
import { OrderScheduleModule } from './order-schedule/order-schedule.module';
import { KafkaModule } from './kafka/kafka.module';
import { ScheduleConsumer } from './kafka/schedule.consumer';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderScheduleEntity } from './order-schedule/order-schedule.entity';
import { OrderScheduleService } from './order-schedule/order-schedule.service';

@Module({
  imports: [OrderScheduleModule, KafkaModule,
    ConfigModule.forRoot({
       isGlobal: true,
    }),
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '1234',
      database: 'schedule_service',
      entities: [OrderScheduleEntity],
      synchronize: true,
    }),
  ],
  providers:[ScheduleConsumer]
})
export class AppModule {}
