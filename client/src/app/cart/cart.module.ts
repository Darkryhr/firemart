import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderComponent } from './order/order.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartItemComponent, OrderComponent, PaymentPageComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [OrderComponent],
})
export class CartModule {}
