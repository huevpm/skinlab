import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLCategories = environment.apiUrl + 'products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLCategories);
    }

    createProduct(productData: FormData): Observable<Product>{
        return this.http.post<Product[]>(this.apiURLCategories, productData);
    }

    getProduct(productId: string): Observable<Product>{
        return this.http.get<Product[]>(`${this.apiURLCategories}/ ${productId}`);
    }
    updateProduct(productData: FormData, productid: string): Observable<Product>{
        return this.http.put<Product[]>(`${this.apiURLCategories}/ ${productid}`, productData);

    }

    deleteProduct(productId: string): Observable<any>{
        return this.http.delete<any>(`${this.apiURLCategories}/ ${productId}`);

    }

    getProductsCount(): Observable<number> {
        return this.http.get<number> (`${this.apiURLCategories}/get/count`) .pipe(map(objectValue : any) => objectValue.orderCount));
    }

}