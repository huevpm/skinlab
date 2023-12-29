import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // Ensure this file defines and exports a routing module
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Import only the components and services that are required
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoriesService } from '../../../libs/products/src/services/orders.service';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { ProductsFormComponent } from './product/products-form/products-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CategoryListComponent } from './categories/categorylist/category-list.component';
import { AuthGuard, UsersModule} from '@bluebits/users';

// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import {OrdersListComponent} from './pages/dashboard/orders/orders-list/orders-list.component'
import {OrdersDetailComponent} from './pages/dashboard/orders/orders-detail/orders-detail.component'
import {FieldsetModule} from 'primeng/fieldset'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ShellComponent,
    CategoryComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // This should include your RouterModule configuration
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    AccordionModule,
    TableModule,
    CardModule,
    ToolbarModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
    UsersModule,
    ConfirmDialogModule,
    ColorPickerModule,
    FieldsetModule
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})

const routes: Routes = [
  {
    path: ' ',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsListComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoryFormComponent
      },

      { 
      path: 'users',
      component: UsersListComponent
      },

      {
        path: 'users/form',
        component: UsersFormComponent
      },

      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },

      {
        path: 'orders',
        component: OrdersListComponent
      },

      {
        path: 'orders/:id',
        component: OrdersDetailComponent
      }
    ]
  }


],
export class AppModule { }
