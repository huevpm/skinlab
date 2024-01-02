import { Component,OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrdersService } from '../orders-list/orders.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit{
orders: Order[] = [];

constructor(private ordersService: OrdersService,
  private Router: Router,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  ) {}

  showOrder(orderId: any) {
    this.Router.navigateByUrl(`orders/${orderId}`);
  }
  
  deleteOrder(orderId: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa đơn hàng',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(() => {
          this._getOrders();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is deleted',
          });
        });
      },
    });
  }

ngOnInit(): void {
    this._getOrders();
}


_getOrders(): void {
  this.ordersService.getOrders().subscribe((orders) => {
    this.orders = orders;
  });
}
  


}
