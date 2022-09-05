import { Order } from './../../../model/order';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  stationNumber!: string;
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.stationNumber) {
      alert('Please add station number');
      return;
    }
    this.orderService
      .getOrdersByStationNumber(this.stationNumber)
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
}
