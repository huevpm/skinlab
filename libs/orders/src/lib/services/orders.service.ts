import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>('http://localhost:3000/api/v1/orders/${orderId}', orderStatus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/v1/orders/${orderId}');
  }

  getOrdersCount(): Observable<number>{
    return this.http.get< number>('http://localhost:3000/api/v1/orders/get/count').pipe(map(objectValue : any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<{ totalsales: number }>{
    return this.http.get<{ totalsales: number}>('http://localhost:3000/api/v1/orders/get/totalsales').pipe(map(objectValue : any) => objectValue.total));;
  }
}
