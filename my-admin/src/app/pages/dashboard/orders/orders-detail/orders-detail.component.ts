import {Component, OnInit} from '@angular/core';
import {OrdersService} from '@bluebits/orders';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: [

    ]
})

export class OrdersDetailComponent implements OnInit {
    constructor(private orderService: OrdersService, private route: ActivatedRoute) {} 

    ngOnInit(): void {
        this._getOrder();
    }

    private _getOrder() {
        this.route.params.subscribe(params => {
            if(params.id) {
                this.orderService.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                });
            }
        })
    }
}