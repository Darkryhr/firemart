import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss'],
})
export class ShippingInfoComponent implements OnInit {
  form: FormGroup;
  cities = ['Ashdod', 'Tel-Aviv'];
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.minLength(6), Validators.required]],
      delivery: ['', [Validators.required]],
      credit: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  get credit() {
    return this.form.get('credit');
  }

  get street() {
    return this.form.get('street');
  }

  get delivery() {
    return this.form.get('delivery');
  }

  onSubmit() {
    this.orderService.completeOrder(this.form.value);
  }

  //? sends user to print out his invoice
  // onPrintInvoice() {
  //* replace this line with the orders id
  //   const invoiceIds = ['101', '102'];
  //   this.printService
  //     .printDocument('invoice', invoiceIds);
  // }
}
