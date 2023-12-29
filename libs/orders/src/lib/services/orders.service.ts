import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders/');
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>('http://localhost:3000/api/v1/orders/${orderId}');
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/orders/', order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>('http://localhost:3000/api/v1/orders/' + order.id, order);
  }

  deleteOrder(orderId: Order): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/v1/orders/', order);
  }
}
