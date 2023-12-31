import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiUrl+'orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

 updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }


  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<{ orderCount: number}> {
    return this.http.get<{ orderCount: number}> (`${this.apiURLOrders}/get/count`).pipe();
  }
  
  getTotalSales(): Observable<{ totalSales: number}> {
    return this.http.get<{ totalSales: number}>(`${this.apiURLOrders}/get/totalsales`).pipe();
  }
}
