import {Component, OnInit } from '@angular/gli';
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