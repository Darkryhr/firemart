import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  form: FormGroup;
  cities = ['Ashdod', 'Tel-Aviv'];
  today: Date = new Date();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.today);
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
    console.log(this.form.value);
  }
}
