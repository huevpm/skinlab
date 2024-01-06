import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Category } from '../../models/category';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'admin-category',
  templateUrl: './category-list.component.html',
  styles: [],
})

export class CategoryComponent implements OnInit {
  categories: Category[] = [];


  constructor(private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategory(categoryId: string): void {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh mục này?',
      header: 'Xóa danh mục',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(() => {
          this._getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Đã xóa danh mục thành công'
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
      },
      reject: () => { }
    });
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories
    })
  }
}

