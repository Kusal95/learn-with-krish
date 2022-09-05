import { forwardRef, Module } from '@nestjs/common';
import { OrderScheduleModule } from 'src/order-schedule/order-schedule.module';
import { ConsumerService } from './consmer.service';
import { ProducerService } from './producer.service';

@Module({
    imports:[OrderScheduleModule],
    providers:[ProducerService,ConsumerService],
    exports:[ProducerService,ConsumerService]
})
export class KafkaModule {}
