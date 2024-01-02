import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../../orders/orders-list/orders.service';
import { ProductsService } from '../../products/products-list/products.service';
import { UsersService } from '../../users/users-list/users.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [0, 0, 0, 0];
  private endsubs$ = new Subject<void>();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),       // Should return Observable<number>
      this.productService.getProductsCount(),    // Should return Observable<number>
      this.userService.getUsersCount(),          // Should return Observable<number>
      this.ordersService.getTotalSales()         // Should return Observable<number>
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe(([ordersCount, productsCount, usersCount, totalsales]) => {
        this.statistics = [ordersCount.orderCount, productsCount.productCount, usersCount, totalsales];
      });
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}



