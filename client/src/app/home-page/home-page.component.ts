import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  totalCarts: number;
  totalProducts: number;
  user: boolean = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.totalProducts = res.result;
    });
    this.orderService.getTotalCarts().subscribe((res: any) => {
      console.log(res);
      this.totalCarts = res.data;
    });

    if (this.authService.getToken()) {
      this.user = true;
    }
  }
}
