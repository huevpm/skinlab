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
import { CategoryComponent } from './categories/category/category.component';
import { CategoriesService } from './categories/category/categories.service';

// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
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
    ToastModule
  ],
  providers: [CategoriesService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
