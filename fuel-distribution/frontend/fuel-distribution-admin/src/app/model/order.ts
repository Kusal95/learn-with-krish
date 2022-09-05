import { OrderStatus } from './order-status';
export interface Order {
  orderId?: number;
  stationNumber: string;
  fuelType: string;
  quantity: number;
  orderDate: Date;
  generatedKey: string;
  orderStatus?: OrderStatus;
}
