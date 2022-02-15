import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, find, mergeAll, pluck, shareReplay } from 'rxjs/operators';

export interface productResponse {
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
  private allProducts$ = new BehaviorSubject<productResponse>({
    status: null,
    result: null,
    data: { products: [] },
  });

  constructor(private http: HttpClient) {
    this.productSubject = new Subject<any>();
    this.productUpdate$ = this.productSubject.asObservable();
    this.getProducts().subscribe((val) => this.allProducts$.next(val));
  }

  getProducts() {
    return this.http
      .get<productResponse>('http://localhost:3000/products')
      .pipe(shareReplay());
  }

  getProductsSubject() {
    return this.allProducts$.asObservable();
  }

  getProduct(id) {
    return this.allProducts$.pipe(
      pluck('data', 'products'),
      mergeAll(),
      find((product) => product._id === id)
    );
  }

  getCategories() {
    return this.http
      .get('http://localhost:3000/products/categories')
      .pipe(shareReplay());
  }

  update(id, body) {
    return this.http
      .patch(`http://localhost:3000/products/${id}`, body)
      .subscribe((res: any) => {
        this.productSubject.next(res);
      });
  }

  create(body) {
    const { name, image, price, category } = body;
    if (image) {
      this.uploadFile(image.files[0]);
    }
    return this.http
      .post(`http://localhost:3000/products`, {
        name,
        price,
        category,
        image: image ? image.files[0].name : '',
      })
      .pipe(catchError(this.handleError));
  }

  uploadFile(image) {
    const formData: FormData = new FormData();
    formData.append('filekey', image, image.name);
    return this.http
      .post(`http://localhost:3000/products/gallery`, formData)
      .subscribe();
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    msg = error.error.message;
    return throwError(msg);
  }
}
