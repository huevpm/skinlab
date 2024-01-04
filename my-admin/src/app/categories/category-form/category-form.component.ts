import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../categorylist/categories.service';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required], // Assuming 'name' is a required field
  });
  isSubmitted: boolean= false;
  editmode: boolean = false;
  currentCategoryId: string = '';

  constructor(private formBuilder: FormBuilder, 
  private categoriesService: CategoriesService,
  private messageService: MessageService,
  private location: Location,
  private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
    
    this._checkEditMode();
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
    };
    if(this.editmode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }

  }


  private _addCategory(category: Category):void {
    this.categoriesService.createCategory(category).subscribe((category) => {
      this.messageService.add({
        severity:'success',
        summary:'Success', 
        detail:`Đã tạo danh mục ${category.name}thành công`});
      timer(1000)
        .toPromise()
        .then (() => {
          this.location.back();
        })
    },

    (error) => {
      this.messageService.add({severity:'error', 
      summary:'Error',
      detail:'Không tạo được danh mục'});
    }
    );
  }

  private _updateCategory(category: Category):void {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Đã chỉnh sửa danh mục ${category.name} thành công`
        });
        timer(1000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Chỉnh sửa danh mục không thành công'
        });
      }
    );
  }
  

  onCancel() {
    this.location.back();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id']
        this.categoriesService.getCategory(params['id']).subscribe(category => {
          this.categoryForm['name'].setValue(category.name);
      })
    }
  })
  }


  get categoryForm() {
    return this.form.controls;
  }
}
