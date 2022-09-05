import { NotifyService } from './../../../services/notify.service';
import { OrderStatus } from './../../../model/order-status';
import { OrderService } from './../../../services/order.service';
import { StompService } from './../../../services/stomp.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from './../../../model/order';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  key: string = '';
  faHourglassHalf = faHourglassHalf;
  faCircleCheck = faCircleCheck;
  orderStatus: OrderStatus | undefined;
  order: Order | undefined;

  constructor(
    private stompService: StompService,
    private orderService: OrderService,
    private notifyService: NotifyService
  ) {}
  ngOnDestroy(): void {
    this.stompService.disconnect();
  }

  ngOnInit(): void {
    this.stompService.subscribe(
      '/topic/order-status',
      (message: string): void => {
        this.getOrderStatus();
        this.notifyService.notifySuccess(message);
      }
    );
  }

  async getOrderStatus() {
    this.orderService
      .getOrderStatus(this.key)
      .subscribe((resp: OrderStatus) => (this.orderStatus = { ...resp }));
  }

  async getOrder() {
    this.orderService
      .getOrder(this.key)
      .subscribe((resp: Order) => (this.order = { ...resp }));
  }

  onSubmit() {
    if (!this.key) {
      alert('Please enter order key');
    }
    this.getOrderStatus();
    this.getOrder();
  }
}
