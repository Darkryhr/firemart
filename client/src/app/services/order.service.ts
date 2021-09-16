import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Router } from '@angular/router';
import { SnackService } from './snack.service';

interface OrderResponse {
  data: {
    products: CartItem[];
  };
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000/cart';
  baseUrlOrder = 'http://localhost:3000/order';
  cartUpdate$: Observable<any>;
  private cartSubject: Subject<any>;
  @Output() status = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snack: SnackService
  ) {
    this.cartSubject = new Subject<any>();
    this.cartUpdate$ = this.cartSubject.asObservable();
  }

  add(product: string, amount: number, price: number) {
    return this.httpClient
      .post(`${this.baseUrl}/add`, {
        product,
        amount,
        price,
      })
      .subscribe((res) => {
        this.cartSubject.next(res);
      });
    // const res = this.httpClient.post(this.baseUrl.concat(`/${userId}`), {});
    //* emit success event if added to backend, informing order to update list
  }

  clear() {
    this.cartSubject.next([]);
  }

  getAllItems() {
    return this.httpClient.get<OrderResponse>(this.baseUrlOrder);
  }

  getTotalCarts() {
    return this.httpClient.get(`${this.baseUrl}/sum`);
  }

  completeOrder() {
    return this.httpClient
      .get(`${this.baseUrlOrder}/finish`)
      .subscribe((res: any) => {
        if (res.message === 'success') {
          // on success response, clear order
          this.cartSubject.next([]);
          // open thank you dialog or snackbar
          this.snack.onOrderComplete();
          // send back to front page
          this.router.navigate(['products']);
        } else {
          // send error
        }
      });
  }
}
