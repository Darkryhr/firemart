import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  allItems: CartItem[];
  itemInfo: Product[] = [];

  ngOnInit(): void {
    this.orderService.getAllItems().subscribe((res) => {
      this.allItems = res.data.products;
      res.data.products.forEach((item) => {
        this.getProduct(item.product).subscribe((res: any) => {
          this.itemInfo = [...this.itemInfo, res.data.product];
        });
      });
    });
    // this.allItems.forEach();
  }

  getProduct(id) {
    console.log('CALL TO PRODUCT FROM ORDER SUMMARY: ' + id);
    return this.productService.getProduct(id);
  }
}
