import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

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
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.product);
  }

  // addToCart(e) {
  //   this.orderService.add(this.authService.currentUser._id, this.product._id);
  // }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        product: this.product,
      },
      minWidth: 480,
      minHeight: 480,
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('RESULT: ' + res);
    });
  }
}
