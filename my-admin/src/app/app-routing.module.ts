import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoryComponent } from './categories/categorylist/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
    {
    path: '', 
    component: ShellComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'categories/form', component: CategoryFormComponent },
      { path: 'categories/form/:id', component: CategoryFormComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'products/form', component: ProductsFormComponent },
      { path: 'products/form/:id', component: ProductsFormComponent },
      { path:'users',component:UsersListComponent},
      { path:'users/form',component:UsersFormComponent},
      { path:'users/form/:id',component:UsersFormComponent},
      { path:'orders',component:OrdersListComponent},
      { path:'orders/:id',component:OrdersDetailComponent},
      { path:'login',component:LoginComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
