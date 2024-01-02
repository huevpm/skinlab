import {Component, OnInit, Input } from '@angular/core';
import {Product} from '../../models/product'
import { CartService, CartItem } from '@bluebits/orders'

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;

    constructor(private cartService: CartService) {}

    ngOnInit(): void{}

    addProductToCart() {
        const cartItem:  CartItem = {
            productId: this.product.id
        }
        this.cartService.setCartItem()

    }

}