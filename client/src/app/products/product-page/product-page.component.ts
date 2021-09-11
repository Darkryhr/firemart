import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  showFiller = false;
  value = 'Search';
  user = {};

  products = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.productService
      .getProducts()
      .subscribe((res) => (this.products = res.data.products));
  }

  get productCategories() {
    const categorySet = [
      ...new Set(this.products.map((product) => product.category)),
    ];
    return categorySet;
  }
}
