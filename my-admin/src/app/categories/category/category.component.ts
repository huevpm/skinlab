import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Category } from '../../models/category';
@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoriesService: CategoriesService) { }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
