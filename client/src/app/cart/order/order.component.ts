import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private orderService: OrderService) {
    this.orderService.cartUpdate$.subscribe((data) => {
      console.log(data);
    });
  }
  // order will have an array of all products, on cartupdate, it will push or change a value in that array
  ngOnInit(): void {}
}
