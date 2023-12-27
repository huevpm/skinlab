import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../libs/products/src/services/categories.service';
import { Category } from '../../models/category';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'admin-category',
  templateUrl: './category-list.component.html',
  styles: [],
})
export class CategoryListComponent implements OnInit {
  categories = Category[] = [];
    

  constructor(private categoriesService: CategoriesService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {}
  ngOnInit(): void {
    this._getCategories()
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh mục này?',
      header: 'Xóa danh mục',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: (type) => {}
      }
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats
    })
  }
}