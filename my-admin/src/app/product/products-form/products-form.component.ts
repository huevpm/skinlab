import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this._initForm();
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
    get productForm() {
        return this.form.controls;
    }
}