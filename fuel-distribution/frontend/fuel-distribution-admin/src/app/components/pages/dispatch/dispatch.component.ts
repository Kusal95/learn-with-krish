import { Order } from './../../../model/order';
import { NotifyService } from './../../../services/notify.service';
import { StompService } from './../../../services/stomp.service';
import { DispatchService } from './../../../services/dispatch.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss'],
})
export class DispatchComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
    private dispatchService: DispatchService,
    private stompService: StompService,
    private notifyService: NotifyService
  ) {}

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }

  ngOnInit(): void {
    this.getOrdersToDispatch();
    this.stompService.subscribe(
      '/topic/order-status',
      (message: string): void => {
        this.getOrdersToDispatch();
        this.notifyService.notifySuccess(message);
      }
    );
  }

  getOrdersToDispatch() {
    this.orderService.getOrdersToDispatch().subscribe((resp) => {
      this.orders = resp;
    });
  }

  onSubmit(key: string, id?: number) {
    if (id !== undefined) {
      const data = {
        key: key,
        orderId: id,
      };
      this.dispatchService
        .dispatch(data)
        .subscribe((resp) => console.log(resp));
    }
  }
}
