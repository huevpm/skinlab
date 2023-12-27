import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../libs/products/src/services/categories.service';
import { Category } from '../../models/category';
@Component({
  selector: 'admin-category',
  templateUrl: './category-list.component.html',
  styles: [],
})
export class CategoryListComponent implements OnInit {
  categories = Category[] = [];
    

  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
      
}