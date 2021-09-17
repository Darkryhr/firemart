import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError, Subject } from 'rxjs';

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
  productUpdate$: Observable<any>;
  private productSubject: Subject<any>;

  constructor(private http: HttpClient) {
    this.productSubject = new Subject<any>();
    this.productUpdate$ = this.productSubject.asObservable();
  }

  getProducts() {
    return this.http.get<productResponse>('http://localhost:3000/products');
  }

  getProduct(id) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  getCategories() {
    return this.http.get('http://localhost:3000/products/categories');
  }

  update(id, body) {
    return this.http
      .patch(`http://localhost:3000/products/${id}`, body)
      .subscribe((res: any) => {
        this.productSubject.next(res);
      });
  }

  create(body) {
    return this.http.post(`http://localhost:3000/products`, body);
  }
}
