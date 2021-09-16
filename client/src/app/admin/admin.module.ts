import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table/product-table.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductTableComponent, AdminDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
