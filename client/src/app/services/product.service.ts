import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

interface productResponse {
  status: string;
  result: number;
  data: {
    products: Product[];
  };
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<productResponse>('http://localhost:3000/products');
  }

  getProduct(id) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  getCategories() {
    return this.http.get('http://localhost:3000/products/categories');
  }

  updateProduct(id, body) {
    return this.http.patch(`http://localhost:3000/products/${id}`, body);
  }
}
