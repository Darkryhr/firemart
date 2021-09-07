import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  showFiller = false;
  value = 'Search for Product';

  products = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => (this.products = res));
  }

  get productCategories() {
    const categorySet = [
      ...new Set(this.products.map((product) => product.category)),
    ];
    return categorySet;
  }
}
