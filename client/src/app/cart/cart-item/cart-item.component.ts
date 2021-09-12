import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem;
  _value: number = 0;
  _step: number = 1;
  _min: number = 0;
  _max: number = Infinity;
  _wrap: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
