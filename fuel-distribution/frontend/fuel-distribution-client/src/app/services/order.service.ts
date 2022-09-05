import { OrderStatus } from './../model/order-status';
import { Order } from './../model/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/order-api/v1/order';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrder(key: string): Observable<Order> {
    const url = `${this.apiUrl}/order-key/${key}`;
    return this.http.get<Order>(url);
  }

  getOrderStatus(key: string): Observable<OrderStatus> {
    const url = `${this.apiUrl}/status/${key}`;
    let headers = new HttpHeaders().set('access-control-allow-origin', url);
    return this.http.get<OrderStatus>(url);
  }

  getOrdersByStationNumber(stationNumber: string): Observable<Order[]> {
    const url = `${this.apiUrl}/orders/${stationNumber}`;
    return this.http.get<Order[]>(url);
  }

  setOrderReceived(key: string, dateTime: string): Observable<Order> {
    const url = `${this.apiUrl}/received/${key}?receivedDateTime=${dateTime}`;
    return this.http.put<Order>(url, {});
  }
}
