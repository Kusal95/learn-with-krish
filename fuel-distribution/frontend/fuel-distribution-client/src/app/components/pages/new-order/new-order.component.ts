import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from './../../../services/notify.service';

import { Order } from './../../../model/order';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { ClipboardService } from 'ngx-clipboard';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  stationNumber!: string;
  fuelType: string = '';
  quantity!: number;
  orders: Order[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private clipboard: ClipboardService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  onSubmit() {
    if (!this.stationNumber) {
      alert('Please add station number');
      return;
    }
    if (this.fuelType === '') {
      alert('Please select fuel type');
      return;
    }
    if (!this.quantity) {
      alert('Please add fuel quantity');
      return;
    }
    const date = dayjs(dayjs()).toDate();

    const newOrder: Order = {
      stationNumber: this.stationNumber,
      fuelType: this.fuelType,
      quantity: this.quantity,
      orderDate: date,
      generatedKey: '',
    };

    this.notifyService.confirm(
      'Confirm',
      'Do you want to place the order',
      () => {
        this.orderService.addOrder(newOrder).subscribe((order) => {
          const key: string = order.generatedKey;
          this.notifyService.ReportSuccess(
            'Order placed successfully',
            `Your order key is : ${key}`,
            'Copy order key',
            () => {
              this.clipboard.copy(key);
            }
          );

          this.orders.push(order);
          this.stationNumber = '';
          this.fuelType = '';
          this.quantity = 0;
        });
      }
    );
  }
  Received(key: string) {
    this.orderService
      .setOrderReceived(key, dayjs(new Date()).toISOString())
      .subscribe((order) => {
        this.orders = this.orders.map((o) => {
          if (order.orderId === o.orderId) {
            return order;
          } else {
            return o;
          }
        });
      });
  }
}
