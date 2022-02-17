import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDialogComponent } from 'src/app/print/invoice-dialog/invoice-dialog.component';
import { Constants } from '../config/constants';

interface OrderResponse {
  data: {
    products: CartItem[];
  };
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  endpoint = Constants.API_CART_ENDPOINT;
  baseUrlOrder = Constants.API_ORDER_ENDPOINT;
  cartUpdate$: Observable<any>;
  private cartSubject: Subject<any>;
  @Output() status = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.cartSubject = new Subject<any>();
    this.cartUpdate$ = this.cartSubject.asObservable();
  }

  add(product: string, amount: number, price: number) {
    return this.httpClient
      .post(`${this.endpoint}/add`, {
        product,
        amount,
        price,
      })
      .subscribe((res) => {
        this.cartSubject.next(res);
      });
  }

  clear() {
    this.cartSubject.next([]);
  }

  //* Get full cart
  getAllItems() {
    return this.httpClient.get<OrderResponse>(this.baseUrlOrder);
  }

  getOrder(id) {
    return this.httpClient.get(`${this.baseUrlOrder}/invoice/${id}`);
  }

  getTotalCarts() {
    return this.httpClient.get(`${this.endpoint}/sum`);
  }

  completeOrder(body) {
    return this.httpClient
      .post(`${this.baseUrlOrder}/finish`, body)
      .subscribe((res: any) => {
        //TODO: handle error
        if (res.message !== 'success') return;
        this.clear();
        this.openInvoiceDialog(res.data.order._id);
        this.router.navigate(['products']);
      });
  }

  openInvoiceDialog(id) {
    this.dialog.open(InvoiceDialogComponent, {
      data: {
        orderId: id,
      },
    });
  }

  //TODO: check if this needs changing, they effect the cart subject
  updateAmount(id, amount: number) {
    return this.httpClient.patch(`${this.endpoint}/${id}`, { amount });
  }

  deleteItem(id) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  existsInCart(id) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
}
