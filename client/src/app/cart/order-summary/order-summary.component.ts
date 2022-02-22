import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  displayedColumns: string[] = ['product', 'amount', 'cost'];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  allItems: any[];

  ngOnInit(): void {
    this.orderService.getAllItems().subscribe((res) => {
      this.allItems = res.data.products;
      this.allItems.forEach((item) => {
        this.productService.getProduct(item.product).subscribe((res: any) => {
          item.name = res.name;
        });
      });
    });
  }

  getTotalSum() {
    return this.allItems
      ?.map((item) => +item.price * +item.amount)
      .reduce((acc, a) => acc + a, 0);
  }
}
