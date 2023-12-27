import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../libs/products/src/services/categories.service';
import { Category } from '../../models/category';
@Component({
  selector: 'admin-category',
  templateUrl: './category-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories = [
    {
      id: 1,
      name: 'danh mục 1',
      icon: 'icon-1',
    },
    {
      id: 2,
      name: 'danh mục 2',
      icon: 'icon-2',
    },
    {
      id: 3,
      name: 'danh mục 3',
      icon:'icon-3',
    },
  ];

  constructor(privite categoriesService: CategoriesService) {}
  ngOnInit(): void {}
      
}