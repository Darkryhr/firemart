import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  totalCarts: number;
  totalProducts: number;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.totalProducts = res.result;
    });
    this.orderService.getTotalCarts().subscribe((res: any) => {
      this.totalCarts = res.data;
    });
  }
}
