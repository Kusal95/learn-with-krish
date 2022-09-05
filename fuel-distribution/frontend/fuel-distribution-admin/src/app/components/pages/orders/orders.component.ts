import { OrderService } from './../../../services/order.service';
import { Order } from './../../../model/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService
      .getAllOrders()
      .subscribe((orders: Order[]) => (this.orders = orders));
  }
}
