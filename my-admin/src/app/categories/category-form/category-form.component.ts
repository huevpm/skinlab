import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../libs/products/src/services/categories.service1';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required], // Assuming 'name' is a required field
    icon: ['',Validators.required], // Assuming 'icon' is a required field
  });
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, 
  private categoriesService: CategoriesService,
  private messageService: MessageService,
  private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    this.categoriesService.createCategory(category).subscribe((response: Category) => {
      this.messageService.add({severity:'success',
      summary:'Success', 
      detail:'Đã tạo danh mục ${category.name}thành công'});
      timer(1000).toPromise().then ((done) => {
        this.location.back();
        })
    },

    (error: Category) => {
      this.messageService.add({severity:'error', 
      summary:'Error',
      detail:'Không tạo được danh mục'});
    }
    );

  }

  get categoryForm() {
    return this.form.controls;
  }
}
