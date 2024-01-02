import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiUrl + 'products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

   getProduct(productId: string): Observable<Product>{
     return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
   }

  updateProduct(productData: FormData, productid:string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
  }
  
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

  getProductsCount(): Observable<{ productCount: number}> {
    return this.http.get<{ productCount: number}> (`${this.apiURLProducts}/get/count`).pipe();
  }

  // deleteCategory(categoryId: string): Observable<any> {
  //   return this.http.delete<any>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  // }
}
