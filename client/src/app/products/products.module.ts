import { CartModule } from './../cart/cart.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCardComponent, ProductPageComponent],
  imports: [CommonModule, SharedModule, CartModule, FormsModule],
})
export class ProductsModule {}
