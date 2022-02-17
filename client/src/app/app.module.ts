import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './services/auth.interceptor';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { InvoiceComponent } from './print/invoice/invoice.component';
import { InvoiceDialogComponent } from './print/invoice-dialog/invoice-dialog.component';
import { Constants } from './config/constants';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PrintLayoutComponent,
    InvoiceComponent,
    InvoiceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UsersModule,
    ProductsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
