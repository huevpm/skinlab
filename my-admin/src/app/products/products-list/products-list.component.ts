import { Component, OnInit } from "@angular/core";
import { ProductsService } from './products.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products)
    });
  }
  updateProduct(productid: string) {
    this.router.navigateByUrl(`/products/form/${productid}`);
  }
  deleteProduct(productid: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productid).subscribe(() => {
          this._getProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Đã xóa sản phẩm thành công'
          });
        },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Đã xảy ra lỗi'
            });
          }
        );
      }
    })
  }
}