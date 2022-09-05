import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderScheduleEntity } from './order-schedule.entity';


@Injectable()
export class OrderScheduleServiceRepository {

    constructor(@InjectRepository(OrderScheduleEntity)
        private orderScheduleRepository: Repository<OrderScheduleEntity>,
    ){}


    findAll(): Promise<OrderScheduleEntity[]> {
        return this.orderScheduleRepository.find();      
    }

    findOneByGeneratedKey(key:string): Promise<OrderScheduleEntity[]>{
        return this.orderScheduleRepository.find({
            where:{
                generatedKey: key
            }
        });
    }

    createScheduleOrder(orderSchedule: OrderScheduleEntity): Promise<OrderScheduleEntity> {
       return this.orderScheduleRepository.save(orderSchedule)
    }

}
