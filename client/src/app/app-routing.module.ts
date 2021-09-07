import { ProductPageComponent } from './products/product-page/product-page.component';
import { LoginComponent } from './users/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PaymentPageComponent } from './cart/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'test', component: PaymentPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
