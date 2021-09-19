import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError, Subject } from 'rxjs';
import { FileInput } from 'ngx-material-file-input';

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
    console.log('CREATING PRODUCT');
    const { name, image, price, category } = body;
    if (image) {
      this.uploadFile(image.files[0]);
    }
    return this.http.post(`http://localhost:3000/products`, {
      name,
      price,
      category,
      image: image ? image.files[0].name : '',
    });
  }

  uploadFile(image) {
    const formData: FormData = new FormData();
    formData.append('filekey', image, image.name);
    return this.http
      .post(`http://localhost:3000/products/gallery`, formData)
      .subscribe();
  }
}
