import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories/categorylist/categories.service';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ProductsService } from '../products-list/products.service';
import { Product } from '../../models/product';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'app-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editmode = false;
    form!: FormGroup;
    isSubmitted = false;
    productData: any = {};
    categories: Category[] = [];
    imageDisplay: string | ArrayBuffer | undefined;
    currentProductId: string = '';

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    onImageUpload(event: any): void {
        const file = event.target.files[0];
        if (file) {
          this.form.patchValue({ image: file });
          this.form.get('image')?.updateValueAndValidity();
    
          const fileReader = new FileReader();
          fileReader.onload = () => {
            this.imageDisplay = fileReader.result as
              | string
              | ArrayBuffer
              | undefined;
          };
          fileReader.readAsDataURL(file);
        }
      }

    private _initForm():void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['',Validators.required],
            price: ['', Validators.required],
            category: ['',Validators.required],
            countInStock: ['', Validators.required],
            description: ['',Validators.required],
            richDescription: [''],
            image: [''],
            isFeatured: [''],
        });
    }

    private _getCategories(){
        this.categoriesService.getCategories().subscribe((categories: any[]) => {
            this.categories = categories;
        })
    }

    private _addProduct(productData: FormData) {
        this.productsService.createProduct(productData).subscribe(
          (product: Product) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product ${product.name} is created!`,
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.location.back();
              });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not created!',
            });
          }
        );
      }

      private _updateProduct(productFormData: FormData) {
        this.productsService
          .updateProduct(productFormData, this.currentProductId)
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is updated!',
              });
              timer(2000)
                .toPromise()
                .then(() => {
                  this.location.back();
                });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not updated!',
              });
            }
          );
      }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();
        
        Object.keys(this.productForm).map((key) => {
        productFormData.append(key, this.productForm[key].value);
        this.productData[key] = this.productForm[key].value;
        });
        if (this.editmode) {
        this._updateProduct(this.productData);
        } else {
        this._addProduct(this.productData);
        }
    }

    onCancle() {
        this.location.back();
    }

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private productsService: ProductsService,
        private location: Location,
        private route: ActivatedRoute
      ) {}


      private _checkEditMode() {
        this.route.params.subscribe((params) => {
          if (params['id']) {
            this.editmode = true;
            this.currentProductId = params['id'];
            this.productsService.getProduct(params['id']).subscribe((product) => {
              this.productForm['name'].setValue(product.name);
              this.productForm['price'].setValue(product.price);
              this.productForm['category'].setValue(product.category?.id); // Added null check
              this.productForm['countInStock'].setValue(product.countInStock);
              this.productForm['description'].setValue(product.description);
              this.imageDisplay = product.image;
            });
          }
        });
      }

      get productForm() {
        return this.form.controls;
      }
}