import { Order } from './../model/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/order-api/v1/order';

  constructor(private http: HttpClient) {}

  getOrdersToDispatch(): Observable<Order[]> {
    const url = `${this.apiUrl}/dispatch`;
    return this.http.get<Order[]>(url);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
