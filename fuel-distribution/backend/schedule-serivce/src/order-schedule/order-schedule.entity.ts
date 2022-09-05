import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_schedule')
export class OrderScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  generatedKey: string;

  @Column()
  scheduledDate: Date;
}
