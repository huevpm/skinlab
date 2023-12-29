import {Component, OnInit } from '@angular/core';
import {Order} from '@bluebits/orders';
import { Router } from 'express';
import {ORDER_STATUS} from '../order.constants';
const ORDER_STATUS =  {
    0 : {
        label: 'Chưa xử lý',
        color: 'primary'
    },
    1: {
        label: 'Đang xử lý',
        color: 'warning'
    },
    2: {
        label: 'Đã giao cho đơn vị vận chuyển',
        color: 'warning'
    },
    3: {
        label: 'Đã giao hàng thanh công',
        color: 'success'
    },
    4: {
        label: 'Đơn hàng chưa thành công',
        color: 'danger'
    }
};

@Component ({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: [

    ]
})

export class OrdersListComponent implements OnInit {
    
    orders: Order[] =[];
    orderStatus = ORDER_STATUS;

    constructor(private ordersService: OrdersService, private router: Router) { }

    ngOnInit(): void {
        this._getOrders();
    }

    _getOrders() {
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders;
        });
    }

    showOrder(orderId){
        this.router.navigateByUrl(`orders/${orderId}`)

    }

    deleteOrder(orderId){

    }
}