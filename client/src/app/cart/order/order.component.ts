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
  constructor(private orderService: OrderService, private router: Router) {
    this.orderService.cartUpdate$.subscribe((res) => {
      this.cartItems = [...this.cartItems, res.data.newItem];
    });
  }
  // order will have an array of products, on cartupdate, it will push or change a value in that array
  ngOnInit(): void {
    this.orderService.getAllItems().subscribe((res: any) => {
      this.cartItems = res.data.products;
    });
  }

  toPayment() {
    this.router.navigate(['test']);
  }
}
