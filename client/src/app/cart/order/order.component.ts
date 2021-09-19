import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.orderService.getAllItems().subscribe((res: any) => {
      this.cartItems = res.data.products || [];
    });

    this.orderService.cartUpdate$.subscribe((res) => {
      if (res === []) {
        this.cartItems = [];
      }
      this.cartItems = [...this.cartItems, res?.data?.newItem];
    });
  }

  toPayment() {
    this.router.navigate(['test']);
  }

  itemDeleted(e) {
    this.cartItems = this.cartItems.filter((item) => item._id !== e);
  }
}
