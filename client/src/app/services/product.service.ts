import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

interface productResponse {
  status: string;
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

  addToCart() {}

  createNewCart() {}
}
