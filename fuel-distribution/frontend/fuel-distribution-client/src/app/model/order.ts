import { OrderStatus } from './order-status';
export interface Order {
  orderId?: number;
  stationNumber: string;
  fuelType: string;
  generatedKey: string;
  quantity: number;
  orderDate: Date;
  orderStatus?: OrderStatus;
}
