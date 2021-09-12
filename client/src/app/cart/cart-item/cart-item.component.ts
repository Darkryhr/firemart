import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  productInfo: Product;
  _value: number = 0;
  _step: number = 1;
  _min: number = 0;
  _max: number = Infinity;
  _wrap: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProduct(this.cartItem.product)
      .subscribe((res: any) => {
        this.productInfo = res.data.product;
      });
  }
}
