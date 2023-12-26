import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'admin-products-list',
    template: './product-lists.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    product = [];

    constructor(private productsService : ProductsService) {}
    ngOnInit(): void {
        this._getProducts();
    }

        private _getProducts() {
            this.productsService.getProducts().subcribe((products) => {
                this.products = products;  
            });

        }
        
    }
}