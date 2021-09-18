import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PrintService } from 'src/app/services/print.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  orderId: string;
  orderDetails: any;

  constructor(
    private printService: PrintService,
    private orderService: OrderService,
    route: ActivatedRoute
  ) {
    this.orderId = route.snapshot.params['orderId'];
    this.orderService.getOrder(this.orderId).subscribe((res: any) => {
      this.orderDetails = res.data.order;
      this.printService.onDataReady();
    });
  }

  ngOnInit() {}
}
