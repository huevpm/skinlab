import {Component, OnInit } from '@angular/core';
import {Order} from '@bluebits/orders';

@Component ({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: [

    ]
})

export class OrdersListComponent implements OnInit {
    
    orders: Order[] =[];

    constructor() { }

    ngOnInit(): void {

    }
}