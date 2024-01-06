import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrdersService } from '../orders-list/orders.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css'
})
export class OrdersDetailComponent implements OnInit {
  order!: Order;

  constructor(private orderService: OrdersService
    , private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this._getOrder();

  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService
          .getOrder(params['id'])
          .subscribe((order) => {
            console.log(order);
            this.order = order;
          });
      }
    });
  }

}
