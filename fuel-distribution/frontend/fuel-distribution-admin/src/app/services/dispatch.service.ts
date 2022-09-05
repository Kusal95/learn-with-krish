import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DispatchService {
  private apiUrl = 'http://localhost:3000/allocation-api/v1/disptach';

  constructor(private http: HttpClient) {}

  dispatch(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      responseType: 'text',
    });
  }
  // getOrderStatus(key: string): Observable<any> {
  //   const url = `${this.apiUrl}/status/${key}`;
  //   return this.http.get<OrderStatus>(url);
  // }
}
