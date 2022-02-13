import { Product } from './../../models/product';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  productResponse,
  ProductService,
} from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price'];
  dataSource: MatTableDataSource<Product>;
  products: Product[] = [];
  updatingProduct: Product;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productService
      .getProductsSubject()
      .subscribe((res: productResponse) => {
        this.products = res.data.products;
        this.dataSource = new MatTableDataSource(res.data.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    // this.productService.getProducts().subscribe((res: any) => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateProduct(row) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: {
        row,
      },
      minWidth: 150,
      maxWidth: 400,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.pristine || res?.untouched) {
      } else {
        if (!res.value.image) res.value.image = row?.image;
        this.productService.update(row._id, res?.value);
        this.productService.productUpdate$.subscribe((res) => {
          this.updatingProduct = res.data;
          this.products.forEach((product) => {
            if (product._id === this.updatingProduct._id) {
              return this.updatingProduct;
            } else {
              return product;
            }
          });
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
        // this.productService.create(res.value);
        this.productService.create(res.value).subscribe((res: any) => {
          this.products = [...this.products, res.data.product];
          this.dataSource.data = this.products;
        });
      }
    });
  }

  ngOnInit() {
    this.productService.productUpdate$.subscribe((res) => {
      const newArr = this.products.filter(
        (product) => product._id !== res.data.product._id
      );
      this.products = [...newArr, res.data.product];
      this.dataSource.data = this.products;
    });
  }
}
