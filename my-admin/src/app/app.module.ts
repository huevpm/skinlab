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
import { CategoryComponent } from './categories/categorylist/category-list.component';
import { CategoriesService } from './categories/categorylist/categories.service';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { ProductsService } from './products/products-list/products.service';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { LoginComponent } from './login/login.component';
import { UsersService } from './users/users-list/users.service';
// import { UsersModule } from './login/users.module';


// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { RouterModule } from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import {OrdersListComponent} from './orders/orders-list/orders-list.component'
import {OrdersDetailComponent} from './orders/orders-detail/orders-detail.component'
import {FieldsetModule} from 'primeng/fieldset'
import {TagModule} from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ShellComponent,
    CategoryComponent,
    CategoryFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    ConfirmDialogModule,
    ColorPickerModule,
    FieldsetModule,
    RouterModule,
    TagModule,
    InputMaskModule,
  ],
  providers: [CategoriesService, MessageService, ConfirmationService, ProductsService,
    Location,UsersService],
  bootstrap: [AppComponent]
})

export class AppModule { }
