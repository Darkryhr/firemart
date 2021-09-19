import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snack: SnackService
  ) {}

  ngOnInit() {}

  // addToCart(e) {
  //   this.orderService.add(this.authService.currentUser._id, this.product._id);
  // }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        product: this.product,
      },
      minWidth: 400,
      minHeight: 450,
    });
    dialogRef.afterClosed().subscribe((res) => {
      let amount = res._value;
      this.orderService.existsInCart(this.product._id).subscribe((res: any) => {
        console.log(res);
        if (res.data) {
          // add snack message here
          this.snack.onProductDuplicate();
          return;
        } else {
          if (amount) {
            this.orderService.add(this.product._id, amount, this.product.price);
          }
        }
      });
    });
  }
}
