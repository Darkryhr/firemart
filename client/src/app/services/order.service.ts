import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000/cart';
  cartUpdate$: Observable<any>;
  private cartSubject: Subject<any>;
  @Output() status = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.cartSubject = new Subject<any>();
    this.cartUpdate$ = this.cartSubject.asObservable();
  }

  add(product: Product, amount: number) {
    return this.httpClient
      .post(`${this.baseUrl}/add`, {
        product,
        amount,
      })
      .subscribe((res) => {
        this.cartSubject.next(res);
      });
    // const res = this.httpClient.post(this.baseUrl.concat(`/${userId}`), {});
    //* emit success event if added to backend, informing order to update list
  }
}
