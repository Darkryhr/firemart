import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000/order';
  @Output() status = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  add(userId, productId) {
    console.log(userId, productId);
    // const res = this.httpClient.post(this.baseUrl.concat(`/${userId}`), {});
    //* emit success event if added to backend, informing order to update list
  }
}
