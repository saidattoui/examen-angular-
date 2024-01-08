import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/Product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    const addProductUrl = `${this.apiUrl}/products`;
    return this.http.post(addProductUrl, product);
  }
  getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/products`;
    return this.http.get<Product[]>(url);
  }
  deleteProduct(productId: number): Observable<void> {
    const apiUrl = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(apiUrl);
  }
  updateProduct(product: Product): Observable<Product> {
    const updateUrl = `${this.apiUrl}/products/${product.id}`;
    return this.http.put<Product>(updateUrl, product);
  }
  addProductToCart(product: any): Observable<any> {
    const cartUrl = `${this.apiUrl}/cart`;
    return this.http.post(cartUrl, product);
  }
  getCarts(): Observable<Product[]> {
    const url = `${this.apiUrl}/cart`;
    return this.http.get<Product[]>(url);
  }
  getProductById(productId: string): Observable<any> {
    const productUrl = `${this.apiUrl}/products/${productId}`;
    return this.http.get<any>(productUrl);
  }
}
