import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from 'src/app/services/image.service';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  readonly maxSize = 104857600;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        this.data.row.name,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      category: [
        this.data.row.category,
        [Validators.required, Validators.pattern('^[a-zA-Z& ]*$')],
      ],
      price: [
        this.data.row.price,
        [
          Validators.required,
          Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$'),
        ],
      ],
      image: [null, [FileValidator.maxContentSize(this.maxSize)]],
    });

    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data.categories;
    });
  }

  get name() {
    return this.form.get('name');
  }

  get category() {
    return this.form.get('category');
  }

  get price() {
    return this.form.get('price');
  }

  onSubmit() {
    if (this.form.pristine || this.form.untouched) {
      //* do nothing, as admin has not changed any value
      return;
    } else {
      console.log(this.form.value);
    }
  }
}
