import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoriesService } from "../../categories/category/categories.service";

@Component ({
    selector: 'bluebits-products-form',
    templateUrl: '.products-form.component.html',
    styles: [

    ]
})
export class ProductsFormComponent implements OnInit {
    editmode = false;
    form: FormGroup
    isSubmitted = false;
    catagories = [];

    constructor(private formBuilder: FormBuilder. private categoriesService : CategoriesService) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();

    }

    private_initForm() {
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
        this.categoriesService.getCategories().subscribe(categories => {
            this.catagories = categories;
        })
    }
    get productForm() {
        return this.form.controls;
    }
}