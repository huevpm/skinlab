import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../category/categories.service';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required], // Assuming 'name' is a required field
    icon: ['',Validators.required], // Assuming 'icon' is a required field
  });
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, 
  private categoriesService: CategoriesService,
  private messageService: MessageService,
  private location: Location
     
     ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    this.categoriesService.createCategory(category).subscribe((category) => {
      this.messageService.add({severity:'success',
      summary:'Success', 
      detail:'Đã tạo danh mục thành công'});
      timer(1000).toPromise().then (done => {
        this.location.back()
        })
    },

    (error) => {
      this.messageService.add({severity:'error', 
      summary:'Error',
      detail:'Đã xảy ra lỗi'});
    }
    );

  }

  get categoryForm() {
    return this.form.controls;
  }
}
