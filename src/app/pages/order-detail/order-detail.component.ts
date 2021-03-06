import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedServiceService } from 'app/services/sharedService/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'app/services/orders/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrdersService, SharedServiceService]
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  orderId;
  orderData;
  items;

  constructor(
    private orderApi: OrdersService,
    private sharedService: SharedServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.activatedroute.snapshot.params['id']) {
      this.activatedroute.params.subscribe(params => {
        this.orderId = params['id'];
      });
    }
    this.orderData = this.sharedService.fetchData();
    console.log(this.orderData);
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderApi.orderDetails(this.orderId).subscribe((res: any) => {
      console.log(res);
      this.items = res.message
    })
  }
  orderReadyToShip() {
    const data = {
      order_id: this.orderId
    }
    this.spinner.show();
    this.orderApi.readyToship(data).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.toastr.success('Order shipped successfully', 'Order Shipped');
    }, err => {
      console.log(err);
      this.spinner.hide();
      if (err.status === 200) {
        this.toastr.success('Order shipped successfully', 'Order Shipped');
      } else {
        this.toastr.error('Something went wrong', 'Failure', {
          timeOut: 3000
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.sharedService.sendData(null);
  }
}
