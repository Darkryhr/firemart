import { CartModule } from './../cart/cart.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../category.pipe';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ImgFallbackDirective } from '../img-fallback.directive';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductPageComponent,
    CategoryPipe,
    ProductDialogComponent,
    ImgFallbackDirective,
  ],
  entryComponents: [ProductDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductsRoutingModule,
    SharedModule,
    CartModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class ProductsModule {}
