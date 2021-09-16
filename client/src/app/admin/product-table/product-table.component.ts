import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  displayedColumns: string[] = ['name', 'category', 'price'];
  dataSource: MatTableDataSource<Product>;
  products: Product[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.data.products;
      this.dataSource = new MatTableDataSource(res.data.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: {
        row,
      },
      minWidth: 150,
      maxWidth: 400,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.pristine || res?.untouched) {
        console.log('UNCHANGED');
      } else {
        this.productService.update(row._id, res.value).subscribe((res: any) => {
          console.log(res);
        });
      }
    });
  }

  createProduct() {
    const row = { name: '', category: '', price: '' };
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: {
        row,
      },
      minWidth: 150,
      maxWidth: 400,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.pristine || res?.untouched) {
        console.log('UNCHANGED');
      } else {
        this.productService.create(res.value).subscribe((res: any) => {
          console.log(res);
        });
      }
    });
  }
}
