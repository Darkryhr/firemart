import {
  productResponse,
  ProductService,
} from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  showFiller = false;
  value: string = 'Search';
  user = {};
  searchText;
  products: Product[] = [];
  categories = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data.categories;
    });

    this.productService
      .getProductsSubject()
      .subscribe((res: productResponse) => (this.products = res.data.products));
  }
}
