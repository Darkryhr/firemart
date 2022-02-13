import { Product } from './../../models/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() deleteItem = new EventEmitter();
  productInfo: Product;
  _value: number = 0;
  _step: number = 1;
  _min: number = 0;
  _max: number = Infinity;
  _wrap: boolean = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    if (this.cartItem) {
      this.productService
        .getProduct(this.cartItem?.product)
        .subscribe((res: Product) => {
          this.productInfo = res;
        });
    }
  }

  onChangeAmount(e) {
    if (this.cartItem?.amount !== e._value) return true;
    else return false;
  }

  onUpdate(e) {
    if (e._value === 0) {
      //* delete item
      this.orderService.deleteItem(this.cartItem._id).subscribe((res: any) => {
        this.deleteItem.emit(this.cartItem._id);
      });
    } else {
      //* update amount
      this.orderService
        .updateAmount(this.cartItem._id, +e._value)
        .subscribe((res: any) => {
          this.cartItem.amount = res.data.updatedItem.amount;
        });
    }
  }
}
